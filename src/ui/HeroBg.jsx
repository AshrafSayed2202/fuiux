import { useEffect, useRef, useState } from "react";
import { motion, useTransform } from "framer-motion";
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

const SAMPLES = 56;

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

export default function HeroBg({ mouseEnabled, scrollYProgress }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isMouseActive, setIsMouseActive] = useState(true);

  useEffect(() => {
    const unsubscribe = mouseEnabled.on("change", (value) => {
      setIsMouseActive(value > 0.5);
    });
    return () => unsubscribe();
  }, [mouseEnabled]);

  const characterScale = useTransform(scrollYProgress, [0, 0.3], [1, 1.5]);

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
    let aspect = 1;
    let ready = false;
    let startTime = null;

    /* ---------------- blob tuning ---------------- */
    const revealUniforms = {
      uTrail: { value: trail },
      uPace: { value: 0 },
      uAspect: { value: 1 },
      uRadius: { value: 0.30 }, // size of the blob head
      uLength: { value: 0.70 }, // how long the tail is (0..1)
      uTaper: { value: 0.72 }, // < 1 = fat body, > 1 = thin pointy tail
      uNoiseAmp: { value: 1.0 }, // how lumpy / irregular the edge is
      uNoiseScale: { value: 2.7 }, // size of the lumps (higher = smaller lumps)
      uEdge: { value: 0.03 }, // edge softness (smaller = crisper)
      uTime: { value: 0 },
    };

    let headMesh, helmetGroup, headMaterial;

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

        // BOTTOM background: only seen through the blob
        const bottomMat = new THREE.MeshBasicMaterial({
          map: bottomTex,
          transparent: false,
          toneMapped: false, // same raw colors as the top image
        });
        const bottomMesh = new THREE.Mesh(new THREE.PlaneGeometry(16, 9), bottomMat);
        bottomMesh.position.z = -2.4;
        scene.add(bottomMesh);

        // TOP background: visible by default, the blob cuts it away
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
        const topBgMesh = new THREE.Mesh(new THREE.PlaneGeometry(16, 9), topMat);
        topBgMesh.position.z = -1.5;
        scene.add(topBgMesh);

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
        scene.add(headMesh);

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
          mat.onBeforeCompile = (shader) => {
            Object.assign(shader.uniforms, revealUniforms);
            shader.vertexShader = shader.vertexShader
              .replace("#include <common>", "#include <common>\nvarying vec4 vRevealClip;")
              .replace("#include <project_vertex>", "#include <project_vertex>\nvRevealClip = gl_Position;");
            shader.fragmentShader = shader.fragmentShader
              .replace("#include <common>", `#include <common>\nvarying vec4 vRevealClip;\n${trailChunk}`)
              .replace("#include <alphamap_fragment>", `
                #include <alphamap_fragment>
                vec2 revealNdc = vRevealClip.xy / vRevealClip.w;
                diffuseColor.a *= revealMask(revealNdc);
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
        scene.add(helmetGroup);

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
    }

    function onPointer(e) {
      if (!isMouseActive) return;
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    }

    let raf;
    function animate(time) {
      if (!startTime) startTime = time;
      const t = (time - startTime) / 1000;

      if (ready) {
        smoothed.x += (pointer.x - smoothed.x) * 0.18;
        smoothed.y += (pointer.y - smoothed.y) * 0.18;

        const step = Math.hypot(smoothed.x - trail[0].x, smoothed.y - trail[0].y);
        const target = Math.min(1, step / 0.035);
        pace += (target - pace) * (target > pace ? 0.14 : 0.09);

        if (step < 0.002) pace *= 0.92;

        const oldest = trail.pop();
        oldest.set(smoothed.x, smoothed.y);
        trail.unshift(oldest);

        revealUniforms.uPace.value = pace;
        revealUniforms.uTime.value = t;

        if (headMaterial) {
          headMaterial.uniforms.uParallax.value.set(smoothed.x, smoothed.y);
        }
        if (helmetGroup) {
          helmetGroup.rotation.x = smoothed.y * 0.045;
          helmetGroup.rotation.y = smoothed.x * 0.045;
          helmetGroup.position.x = smoothed.x * 0.012;
          helmetGroup.position.y = 0.42 - smoothed.y * 0.01;
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
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ scale: characterScale }}
      />
    </div>
  );
}