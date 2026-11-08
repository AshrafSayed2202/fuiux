import { useEffect, useRef, useState } from "react";
import { useTransform } from "framer-motion";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

import personDiffuse from "../assets/images/person-diffuse.png";
import alphaMap from "../assets/images/AlphaMas.png";
import depthMap from "../assets/images/depth.png";
import normalMap from "../assets/images/normal.png";
import helmetUrl from "../assets/images/helmet.glb?url";
import topBg from "../assets/images/top-background.jpg";
import bottomBg from "../assets/images/bottom-background.jpg";

// Number of stored trail points (one is added per frame). It was 40; raised
// to 64 so the auto sweep can have a longer trail. The hover look is
// rescaled below so it behaves exactly as before.
const SAMPLES = 64;

/* ------------------------------------------------------------------ */
/*  Character placement                                                */
/*                                                                     */
/*  The character is scaled from its BOTTOM edge, so it always starts  */
/*  at the bottom of the screen and grows upward.                      */
/*  BOTTOM_BLEED = how far the image bottom sits below the screen edge */
/*  (hides any seam / gap). Raise it if you ever see a thin gap.       */
/* ------------------------------------------------------------------ */
const BOTTOM_BLEED = 0.0;

/* ------------------------------------------------------------------ */
/*  Idle auto-sweep (Z shape)                                          */
/* ------------------------------------------------------------------ */
const IDLE_MS = 3000; // idle time before a sweep / between sweeps
const SWEEP_MS = 1100; // how long one sweep takes (smaller = faster)

// Z path in NDC: top-left -> top-right -> bottom-left -> bottom-right
const Z_PTS = [
  [-0.9, 0.8],
  [0.9, 0.8],
  [-0.9, -0.8],
  [0.9, -0.8],
];
const Z_SPLIT = [0.28, 0.72]; // share of time per segment (diagonal is longest)

function zPath(s) {
  let i, t;
  if (s < Z_SPLIT[0]) {
    i = 0;
    t = s / Z_SPLIT[0];
  } else if (s < Z_SPLIT[1]) {
    i = 1;
    t = (s - Z_SPLIT[0]) / (Z_SPLIT[1] - Z_SPLIT[0]);
  } else {
    i = 2;
    t = (s - Z_SPLIT[1]) / (1 - Z_SPLIT[1]);
  }
  const a = Z_PTS[i];
  const b = Z_PTS[i + 1];
  return { x: a[0] + (b[0] - a[0]) * t, y: a[1] + (b[1] - a[1]) * t };
}

/* ------------------------------------------------------------------ */
/*  Blob look: HOVER (real mouse) vs AUTO (idle sweep)                 */
/*                                                                     */
/*  HOVER is exactly what you had before. AUTO is blended in only      */
/*  while the idle sweep is running.                                   */
/*                                                                     */
/*  radius : size of the blob head                                     */
/*  trail  : trail length in FRAMES (max SAMPLES - 1)                  */
/*  taper  : < 1 = fat body, > 1 = thin pointy tail                    */
/*  follow : how tightly the blob chases the pointer (0..1)            */
/* ------------------------------------------------------------------ */
const HOVER_LOOK = {
  radius: 0.30,
  trail: 35.1, // = old uLength 0.9 * 39 samples
  taper: 0.72,
  follow: 0.18,
};
const AUTO_LOOK = {
  radius: 0.45, // bigger blob
  trail: 46, // longer trail
  taper: 0.55, // fatter body so the long trail reads as thick
  follow: 0.28, // keeps up with the faster movement
};

const mixv = (a, b, m) => a + (b - a) * m;

// Hovering the small mask wipes the real helmet in from top to bottom.
const WIPE_MS = 900; // how long the wipe takes (and the way back up)

/* ------------------------------------------------------------------ */
/*  Head (person) shaders                                              */
/* ------------------------------------------------------------------ */
const headVertex = `
  uniform float uExtend;
  varying vec2 vUv;
  void main() {
    vUv = vec2(uv.x, 1.0 - (1.0 - uv.y) * (1.0 + uExtend));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const headFragment = `
  uniform sampler2D uDiffuse;
  uniform sampler2D uDepth;
  uniform sampler2D uAlpha;
  uniform sampler2D uNormal;
  uniform vec2 uParallax;
  uniform float uReveal;
  uniform float uDepthScale;
  uniform float uRelight;
  varying vec2 vUv;
  void main() {
    float depth = texture2D(uDepth, vUv).r;
    vec2 offset = uParallax * (depth - 0.5) * uDepthScale;
    vec2 uv = vUv + offset;
    vec4 color = texture2D(uDiffuse, uv);
    float alpha = texture2D(uAlpha, uv).r;
    vec3 normal = normalize(texture2D(uNormal, uv).rgb * 2.0 - 1.0);
    vec3 lightDir = normalize(vec3(uParallax * 1.6, 1.0));
    float lambert = max(dot(normal, lightDir), 0.0) - 0.72;
    vec3 lit = color.rgb * (1.0 + lambert * uRelight);
    gl_FragColor = vec4(clamp(lit, 0.0, 1.0), alpha * uReveal);
  }
`;

/* ------------------------------------------------------------------ */
/*  Ghost "scanned" helmet shaders                                     */
/*  A flat white copy of the helmet at ~0.1 opacity, with a bright     */
/*  band travelling top -> bottom like a scanner.                      */
/* ------------------------------------------------------------------ */
const ghostVertex = `
  uniform mat4 uInv;
  varying vec3 vLocal;
  varying vec3 vN;
  varying vec3 vView;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vLocal = (uInv * world).xyz;
    vN = normalize(normalMatrix * normal);
    vec4 mv = viewMatrix * world;
    vView = -mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;

const ghostFragment = `
  uniform float uMinY;
  uniform float uMaxY;
  uniform float uTime;
  uniform float uBase;
  uniform float uBandStrength;
  uniform float uBandWidth;
  varying vec3 vLocal;
  varying vec3 vN;
  varying vec3 vView;
  void main() {
    float t = clamp((vLocal.y - uMinY) / max(uMaxY - uMinY, 1e-4), 0.0, 1.0);

    // scan band travelling top -> bottom, then a pause before repeating
    // (t = 1 is the top of the helmet, t = 0 the bottom)
    float pos = 1.08 - fract(uTime * 0.5) * 1.16;
    float band = smoothstep(uBandWidth, 0.0, abs(t - pos));

    // faint scanlines + soft rim so the silhouette reads as a hologram
    float lines = 0.5 + 0.5 * sin(t * 220.0 - uTime * 2.0);
    float rim = pow(1.0 - abs(dot(normalize(vN), normalize(vView))), 2.0);

    float a = uBase + band * uBandStrength + lines * 0.02;
    gl_FragColor = vec4(1.0, 1.0, 1.0, a);
  }
`;

/* ------------------------------------------------------------------ */
/*  Shared "liquid blob" mask (used by the top background + helmet)    */
/*                                                                     */
/*  1. For every pixel find how deep it is inside the mouse trail      */
/*     (thick head, thin tail).                                        */
/*  2. Add animated noise to that value -> irregular, lumpy edge with  */
/*     little wispy tails.                                             */
/*  3. Hard (but anti-aliased) cut at 0 -> flat solid shape.           */
/* ------------------------------------------------------------------ */
const trailChunk = `
  uniform vec2 uTrail[${SAMPLES}];
  uniform float uPace;
  uniform float uAspect;
  uniform float uRadius;
  uniform float uLength;
  uniform float uTaper;
  uniform float uNoiseAmp;
  uniform float uNoiseScale;
  uniform float uEdge;
  uniform float uTime;

  float revealHash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float revealNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = revealHash(i);
    float b = revealHash(i + vec2(1.0, 0.0));
    float c = revealHash(i + vec2(0.0, 1.0));
    float d = revealHash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  // > 0 inside the blob, < 0 outside
  float revealField(vec2 ndc) {
    float gate = smoothstep(0.01, 0.12, uPace);
    if (gate <= 0.0) return -1.0;

    vec2 point = vec2(ndc.x * uAspect, ndc.y);
    float span = max(uLength * float(${SAMPLES} - 1), 1.0);
    float best = -1e3;

    for (int i = 0; i < ${SAMPLES} - 1; i++) {
      if (float(i) >= span) break;
      float weight = pow(1.0 - float(i) / span, uTaper);
      vec2 a = vec2(uTrail[i].x * uAspect, uTrail[i].y);
      vec2 b = vec2(uTrail[i + 1].x * uAspect, uTrail[i + 1].y);

      vec2 pa = point - a;
      vec2 ba = b - a;
      float h = clamp(dot(pa, ba) / max(dot(ba, ba), 1e-6), 0.0, 1.0);
      float dist = length(pa - ba * h);

      float r = max(uRadius * weight * gate, 1e-4);
      best = max(best, 1.0 - dist / r);
    }

    // two octaves of slowly moving noise -> lumpy liquid outline
    vec2 q = point * uNoiseScale;
    float n = revealNoise(q + vec2(uTime * 0.35, -uTime * 0.22)) * 0.8
            + revealNoise(q * 2.1 + vec2(-uTime * 0.5, uTime * 0.3)) * 0.2;
    return best + (n - 0.5) * uNoiseAmp * gate;
  }

  float revealMask(vec2 ndc) {
    return smoothstep(-uEdge, uEdge, revealField(ndc));
  }
`;

/* ------------------------------------------------------------------ */
/*  Top background: fully visible, a blob is cut out of it             */
/* ------------------------------------------------------------------ */
const bgVertex = `
  varying vec4 vClip;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vClip = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = vClip;
  }
`;

const bgFragment = `
  uniform sampler2D uMap;
  varying vec4 vClip;
  varying vec2 vUv;
  ${trailChunk}

  void main() {
    vec2 ndc = vClip.xy / vClip.w;
    vec4 color = texture2D(uMap, vUv);
    float cut = revealMask(ndc);
    gl_FragColor = vec4(color.rgb, color.a * (1.0 - cut));
  }
`;

export default function HeroBg({ mouseEnabled, scrollYProgress, maskHover }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isMouseActive, setIsMouseActive] = useState(true);

  useEffect(() => {
    const unsubscribe = mouseEnabled.on("change", (value) => {
      setIsMouseActive(value > 0.5);
    });
    return () => unsubscribe();
  }, [mouseEnabled]);

  // Scroll-driven character scale. Kept in a ref so the render loop can read
  // it every frame without re-running the Three.js setup effect.
  // [size at the top of the page, size after scrolling]
  const characterScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.25]);
  const scaleRef = useRef(1);

  useEffect(() => {
    scaleRef.current = characterScale.get();
    const unsub = characterScale.on("change", (v) => {
      scaleRef.current = v;
    });
    return () => unsub();
  }, [characterScale]);

  // Hovering the small mask in the side panel wipes the real helmet in from
  // top to bottom. Kept in a ref (like the scale) so the Three.js setup
  // effect doesn't re-run.
  const maskHoverRef = useRef(0);

  useEffect(() => {
    if (!maskHover) return;
    maskHoverRef.current = maskHover.get();
    const unsub = maskHover.on("change", (v) => {
      maskHoverRef.current = v;
    });
    return () => unsub();
  }, [maskHover]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(1);
    renderer.setClearColor(0x090a0b, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    camera.position.set(0, 0.1, 6.5);

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 1.3);
    key.position.set(2.2, 3.2, 4);
    scene.add(key);

    // Everything that belongs to the character (head plane + helmet + ghost)
    // lives in this group. Scaling it zooms ONLY the character; the
    // backgrounds and the screen-space blob mask stay untouched.
    const characterGroup = new THREE.Group();
    scene.add(characterGroup);

    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("anonymous");

    const loadTex = (url, srgb = false) =>
      new Promise((resolve, reject) => {
        textureLoader.load(
          url,
          (tex) => {
            if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
            tex.minFilter = THREE.LinearMipmapLinearFilter;
            tex.generateMipmaps = true;
            tex.wrapS = THREE.ClampToEdgeWrapping;
            tex.wrapT = THREE.ClampToEdgeWrapping;
            resolve(tex);
          },
          undefined,
          reject
        );
      });

    const trail = Array.from({ length: SAMPLES }, () => new THREE.Vector2(0, 0));
    const pointer = { x: 0, y: 0 };
    const smoothed = { x: 0, y: 0 };
    let pace = 0;
    let wipe = 0; // 0 = helmet only inside the blob, 1 = wipe finished (helmet fully visible)
    let lastFrame = 0;
    let aspect = 1;
    let ready = false;
    let startTime = null;

    // Idle auto-sweep state. A real mouse move cancels it and restarts the
    // idle timer. Sweeps alternate: forward (TL -> BR), then reverse (BR -> TL).
    //   mix     : 0 = hover look, 1 = auto-sweep look (eased every frame)
    //   release : how fast mix falls back to 0 (fast when the mouse takes over)
    const auto = {
      active: false,
      start: 0,
      reverse: false,
      nextAt: performance.now() + IDLE_MS,
      mix: 0,
      release: 0.06,
    };

    /* ---------------- blob tuning ---------------- */
    // radius / length / taper start at the HOVER look and are blended toward
    // the AUTO look inside animate() while a sweep is running.
    const revealUniforms = {
      uTrail: { value: trail },
      uPace: { value: 0 },
      uAspect: { value: 1 },
      uRadius: { value: HOVER_LOOK.radius }, // size of the blob head
      uLength: { value: HOVER_LOOK.trail / (SAMPLES - 1) }, // tail length (0..1)
      uTaper: { value: HOVER_LOOK.taper }, // < 1 = fat body, > 1 = thin pointy tail
      uNoiseAmp: { value: 1.0 }, // how lumpy / irregular the edge is
      uNoiseScale: { value: 4 }, // size of the lumps (higher = smaller lumps)
      uEdge: { value: 0 }, // edge softness (smaller = crisper)
      uTime: { value: 0 },
      uForce: { value: 0 }, // wipe progress 0..1, top -> bottom (small-mask hover)
    };

    // Helmet-space info shared by the ghost and the real helmet shaders:
    //   uInv          = inverse of the helmet group's world matrix (world -> helmet space)
    //   uMinY / uMaxY = the helmet's vertical extent in helmet space
    const helmetSpace = {
      uInv: { value: new THREE.Matrix4() },
      uMinY: { value: 0 },
      uMaxY: { value: 1 },
    };

    let headMesh, helmetGroup, headMaterial, ghostMat;
    let topBgMesh, bottomBgMesh;

    // Bottom edge of the REAL person image (not the extra stretched strip),
    // in the character group's own space. Filled in by init().
    let characterBottom = 0;

    // Stretch a background plane so it exactly fills the visible screen at its
    // depth. The full image is always shown, whatever the window size.
    function fitBackground(mesh) {
      if (!mesh) return;
      const dist = camera.position.z - mesh.position.z;
      const h = 2 * dist * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const w = h * camera.aspect;
      mesh.scale.set(w, h, 1);
      mesh.position.x = camera.position.x;
      mesh.position.y = camera.position.y;
    }
    function fitBackgrounds() {
      fitBackground(topBgMesh);
      fitBackground(bottomBgMesh);
    }

    // World Y of the bottom of the screen at the character's depth (z = 0).
    // The vertical field of view is fixed, so this holds at any window size.
    function screenBottomY() {
      const halfH =
        camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      return camera.position.y - halfH;
    }

    async function init() {
      try {
        const [diffuse, depth, alpha, normal, topTex, bottomTex] = await Promise.all([
          // Not flagged sRGB on purpose: the custom shaders write the texture
          // values straight to the screen, so they must pass through untouched.
          loadTex(personDiffuse, false),
          loadTex(depthMap),
          loadTex(alphaMap),
          loadTex(normalMap),
          loadTex(topBg, false), // custom shader -> no sRGB flag
          loadTex(bottomBg, true), // MeshBasicMaterial handles sRGB itself
        ]);

        // BOTTOM background: only seen through the blob (NOT scaled)
        const bottomMat = new THREE.MeshBasicMaterial({
          map: bottomTex,
          transparent: false,
          toneMapped: false, // same raw colors as the top image
        });
        bottomBgMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), bottomMat);
        bottomBgMesh.position.z = -2.4;
        scene.add(bottomBgMesh);

        // TOP background: visible by default, the blob cuts it away (NOT scaled)
        const topMat = new THREE.ShaderMaterial({
          vertexShader: bgVertex,
          fragmentShader: bgFragment,
          uniforms: {
            uMap: { value: topTex },
            uTrail: revealUniforms.uTrail,
            uPace: revealUniforms.uPace,
            uAspect: revealUniforms.uAspect,
            uRadius: revealUniforms.uRadius,
            uLength: revealUniforms.uLength,
            uTaper: revealUniforms.uTaper,
            uNoiseAmp: revealUniforms.uNoiseAmp,
            uNoiseScale: revealUniforms.uNoiseScale,
            uEdge: revealUniforms.uEdge,
            uTime: revealUniforms.uTime,
          },
          transparent: true,
          depthWrite: false,
        });
        topBgMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), topMat);
        topBgMesh.position.z = -1.5;
        scene.add(topBgMesh);

        fitBackgrounds();

        // Use the REAL aspect ratio of the person image
        const imgW = diffuse.image.naturalWidth || diffuse.image.width || 1920;
        const imgH = diffuse.image.naturalHeight || diffuse.image.height || 950;
        const ASPECT = imgW / imgH;

        const EXTEND = 0.12;
        const targetHeight = 4;
        const targetWidth = targetHeight * ASPECT;
        const planeHeight = targetHeight * (1 + EXTEND);

        headMaterial = new THREE.ShaderMaterial({
          vertexShader: headVertex,
          fragmentShader: headFragment,
          uniforms: {
            uDiffuse: { value: diffuse },
            uDepth: { value: depth },
            uAlpha: { value: alpha },
            uNormal: { value: normal },
            uParallax: { value: new THREE.Vector2() },
            uReveal: { value: 1 },
            uDepthScale: { value: 0.006 },
            uRelight: { value: 0.28 },
            uExtend: { value: EXTEND },
          },
          transparent: true,
        });

        const headGeo = new THREE.PlaneGeometry(targetWidth, planeHeight);
        headMesh = new THREE.Mesh(headGeo, headMaterial);
        headMesh.position.set(0, -0.1 - (targetHeight * EXTEND) / 2, 0);
        characterGroup.add(headMesh); // scaled with the character

        // The plane is taller than the image (the extra EXTEND strip at the
        // bottom is just stretched edge pixels). The real image occupies the
        // top `targetHeight` units, so its bottom edge is here:
        characterBottom = headMesh.position.y + planeHeight / 2 - targetHeight;

        const dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath("https://cdn.jsdelivr.net/npm/three@0.185.0/examples/jsm/libs/draco/gltf/");
        const gltfLoader = new GLTFLoader();
        gltfLoader.setDRACOLoader(dracoLoader);

        const gltf = await gltfLoader.loadAsync(helmetUrl);
        const root = gltf.scene;

        root.traverse((obj) => {
          if (!obj.isMesh) return;
          const mat = obj.material;
          if (mat.map) mat.map.colorSpace = THREE.SRGBColorSpace;
          mat.side = THREE.FrontSide;
          mat.transparent = true;
          mat.depthWrite = false;
          obj.renderOrder = 2; // real helmet draws AFTER (on top of) the ghost
          mat.onBeforeCompile = (shader) => {
            Object.assign(shader.uniforms, revealUniforms);
            Object.assign(shader.uniforms, helmetSpace);
            shader.vertexShader = shader.vertexShader
              .replace("#include <common>", "#include <common>\nvarying vec4 vRevealClip;\nvarying vec3 vHelmetLocal;\nuniform mat4 uInv;")
              .replace("#include <project_vertex>", "#include <project_vertex>\nvRevealClip = gl_Position;\nvHelmetLocal = (uInv * modelMatrix * vec4(transformed, 1.0)).xyz;");
            shader.fragmentShader = shader.fragmentShader
              .replace("#include <common>", `#include <common>\nvarying vec4 vRevealClip;\nvarying vec3 vHelmetLocal;\nuniform float uForce;\nuniform float uMinY;\nuniform float uMaxY;\n${trailChunk}`)
              .replace("#include <alphamap_fragment>", `
                #include <alphamap_fragment>
                vec2 revealNdc = vRevealClip.xy / vRevealClip.w;
                // top -> bottom wipe in helmet space (uForce = progress 0..1)
                float wipeFeather = 0.06; // edge softness (smaller = crisper)
                float wipeT = clamp((vHelmetLocal.y - uMinY) / max(uMaxY - uMinY, 1e-4), 0.0, 1.0);
                float wipeLine = (1.0 + wipeFeather) * (1.0 - uForce);
                float wipeMask = smoothstep(wipeLine - wipeFeather, wipeLine, wipeT);
                diffuseColor.a *= max(revealMask(revealNdc), wipeMask);
              `);
          };
        });

        const box = new THREE.Box3().setFromObject(root);
        const size = box.getSize(new THREE.Vector3());
        const scale = 2.8 / Math.max(size.y, 0.001);
        root.scale.setScalar(scale);
        box.setFromObject(root);
        const center = box.getCenter(new THREE.Vector3());
        root.position.sub(center);
        root.position.set(0.1, -1.8, 0.38);

        helmetGroup = new THREE.Group();
        helmetGroup.add(root);

        // ---- ghost copy of the helmet (white, ~0.1 opacity, scan band) ----
        helmetGroup.updateMatrixWorld(true);
        const ghostBox = new THREE.Box3().setFromObject(root);
        // helmet-local bounds (helmetGroup is not attached yet, so this is
        // simply the inverse of its own matrix)
        ghostBox.applyMatrix4(helmetGroup.matrixWorld.clone().invert());

        // helmet's vertical extent in helmet space (used by the ghost scan
        // AND by the real helmet's top -> bottom wipe)
        helmetSpace.uMinY.value = ghostBox.min.y;
        helmetSpace.uMaxY.value = ghostBox.max.y;

        ghostMat = new THREE.ShaderMaterial({
          vertexShader: ghostVertex,
          fragmentShader: ghostFragment,
          uniforms: {
            uInv: helmetSpace.uInv, // shared with the real helmet's wipe
            uMinY: helmetSpace.uMinY,
            uMaxY: helmetSpace.uMaxY,
            uTime: { value: 0 },
            uBase: { value: 0 }, // resting ghost opacity
            uBandStrength: { value: 0.1 }, // opacity of the scanning light (0..1)
            uBandWidth: { value: 0.07 }, // thickness of the scanning light
          },
          transparent: true,
          depthWrite: false,
          side: THREE.FrontSide,
        });

        const ghost = root.clone(true);
        ghost.traverse((o) => {
          if (o.isMesh) {
            o.material = ghostMat;
            o.renderOrder = 1; // ghost sits underneath the real helmet
          }
        });
        helmetGroup.add(ghost);

        characterGroup.add(helmetGroup); // scaled with the character

        ready = true;
      } catch (err) {
        console.error("[HeroBg] asset load failed", err);
      }
    }

    function resize() {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      aspect = camera.aspect;
      revealUniforms.uAspect.value = aspect;
      fitBackgrounds();
    }

    function onPointer(e) {
      if (!isMouseActive) return;
      // a real mouse move cancels any running sweep and restarts the idle timer
      auto.active = false;
      auto.release = 0.25; // hand the look back to hover quickly
      auto.nextAt = performance.now() + IDLE_MS;
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    }

    let raf;
    function animate(time) {
      if (!startTime) startTime = time;
      const t = (time - startTime) / 1000;

      // Scroll-driven zoom: only the character group is scaled, and it is
      // scaled from its BOTTOM edge: the group is moved so the bottom of the
      // person image always stays glued to the bottom of the screen.
      // (Set before the ready block so the ghost's matrices are current.)
      const s = scaleRef.current;
      characterGroup.scale.setScalar(s);
      characterGroup.position.y = screenBottomY() - BOTTOM_BLEED - characterBottom * s;

      if (ready) {
        // ---- idle Z-sweep: drives the same pointer the mouse drives ----
        if (isMouseActive) {
          if (!auto.active && time >= auto.nextAt) {
            auto.active = true;
            auto.start = time;
            auto.release = 0.06; // gentle fade back to hover when it ends
          }
          if (auto.active) {
            const u = Math.min((time - auto.start) / SWEEP_MS, 1);
            const p = zPath(auto.reverse ? 1 - u : u); // reverse = BR -> TL
            pointer.x = p.x;
            pointer.y = p.y;
            if (u >= 1) {
              auto.active = false;
              auto.reverse = !auto.reverse; // next sweep runs backwards
              auto.nextAt = time + IDLE_MS;
            }
          }
        }

        // ---- blend between the hover look (0) and the auto look (1) ----
        const goal = auto.active ? 1 : 0;
        auto.mix += (goal - auto.mix) * (goal > auto.mix ? 0.12 : auto.release);
        if (auto.mix < 0.001) auto.mix = 0; // snaps to EXACTLY the hover look
        const m = auto.mix;

        revealUniforms.uRadius.value = mixv(HOVER_LOOK.radius, AUTO_LOOK.radius, m);
        revealUniforms.uLength.value =
          mixv(HOVER_LOOK.trail, AUTO_LOOK.trail, m) / (SAMPLES - 1);
        revealUniforms.uTaper.value = mixv(HOVER_LOOK.taper, AUTO_LOOK.taper, m);
        const follow = mixv(HOVER_LOOK.follow, AUTO_LOOK.follow, m);

        smoothed.x += (pointer.x - smoothed.x) * follow;
        smoothed.y += (pointer.y - smoothed.y) * follow;

        const step = Math.hypot(smoothed.x - trail[0].x, smoothed.y - trail[0].y);
        const target = Math.min(1, step / 0.035);
        pace += (target - pace) * (target > pace ? 0.14 : 0.09);

        if (step < 0.002) pace *= 0.92;

        const oldest = trail.pop();
        oldest.set(smoothed.x, smoothed.y);
        trail.unshift(oldest);

        revealUniforms.uPace.value = pace;
        revealUniforms.uTime.value = t;

        // ---- small mask hovered: wipe the real helmet in from top to bottom ----
        // (only while the mouse effect is enabled, so it can't get stuck on
        // after scrolling away). When the hover ends the wipe runs back up.
        const dt = lastFrame ? Math.min((time - lastFrame) / 1000, 0.05) : 0;
        lastFrame = time;
        const wipeDir = isMouseActive && maskHoverRef.current > 0.5 ? 1 : -1;
        wipe = Math.min(1, Math.max(0, wipe + (wipeDir * dt) / (WIPE_MS / 1000)));
        // ease in/out so the overlay accelerates and settles
        revealUniforms.uForce.value = wipe * wipe * (3 - 2 * wipe);

        if (headMaterial) {
          headMaterial.uniforms.uParallax.value.set(smoothed.x, smoothed.y);
        }
        if (helmetGroup) {
          helmetGroup.rotation.x = smoothed.y * 0.045;
          helmetGroup.rotation.y = smoothed.x * 0.045;
          helmetGroup.position.x = smoothed.x * 0.012;
          helmetGroup.position.y = 0.42 - smoothed.y * 0.01;
        }

        // keep the ghost's scan anchored to the helmet's own space
        if (ghostMat && helmetGroup) {
          characterGroup.updateMatrixWorld(true);
          helmetSpace.uInv.value.copy(helmetGroup.matrixWorld).invert();
          ghostMat.uniforms.uTime.value = t;
        }
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    }

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onPointer);
    init();
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointer);
      renderer.dispose();
    };
  }, [isMouseActive]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full" />
    </div>
  );
}