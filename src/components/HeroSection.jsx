import { useEffect, useRef } from "react";

import topImage from "../assets/images/charcter-1.jpg";
import revealImage from "../assets/images/charcter-2.jpg";

export default function HeroSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { willReadFrequently: false });

    const topImg = new Image();
    const bottomImg = new Image();

    const particles = [];
    const trailPoints = [];

    const mouse = {
      x: 0,
      y: 0,
      prevX: 0,
      prevY: 0,
      vx: 0,
      vy: 0,
    };

    let animationId;
    let lastTime = 0;

    // Parameters (tuned from your specs)
    const params = {
      radius: 75,
      strength: 0.92,        // 80 -> normalized
      hardness: 0.35,        // controls gradient falloff
      tail: 140,              // max trail length
      fluidity: 0.70,        // lerp speed
      dissipation: 0.018,    // base fade per frame
      chromatic: 56,         // subtle color shift on edges (0-100)
      momentum: 0.62,        // mouse velocity influence
    };

    //--------------------------------------------------
    // Resize
    //--------------------------------------------------
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    //--------------------------------------------------
    // Particle
    //--------------------------------------------------
    function createParticle(x, y, vx, vy) {
      const spread = 12;
      particles.push({
        x: x + (Math.random() - 0.5) * spread,
        y: y + (Math.random() - 0.5) * spread,
        vx: vx * (0.6 + Math.random() * 0.8),
        vy: vy * (0.6 + Math.random() * 0.8),
        radius: params.radius * (0.6 + Math.random() * 0.8),
        alpha: 0.95 + Math.random() * 0.05,
        life: 1.0,
        shrink: 0.08 + Math.random() * 0.12,
      });
    }

    //--------------------------------------------------
    // Draw Reveal Brush
    //--------------------------------------------------
    function drawRevealBrush(x, y, radius, alpha) {
      const grad = ctx.createRadialGradient(x, y, radius * params.hardness, x, y, radius);

      // Core erase
      grad.addColorStop(0, `rgba(0,0,0,${alpha * params.strength})`);
      grad.addColorStop(0.45, `rgba(0,0,0,${alpha * params.strength * 0.75})`);
      grad.addColorStop(0.85, `rgba(0,0,0,${alpha * 0.15})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();

      // Optional chromatic edge (subtle glow)
      if (params.chromatic > 10) {
        ctx.save();
        ctx.globalAlpha = alpha * (params.chromatic / 300);
        const chromaGrad = ctx.createRadialGradient(x - 4, y - 4, radius * 0.6, x + 6, y + 6, radius * 1.1);
        chromaGrad.addColorStop(0, "rgba(255,80,200,0.6)");
        chromaGrad.addColorStop(1, "rgba(80,180,255,0)");
        ctx.fillStyle = chromaGrad;
        ctx.beginPath();
        ctx.arc(x, y, radius * 1.05, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    //--------------------------------------------------
    // Animation
    //--------------------------------------------------
    function animate(timestamp) {
      if (!lastTime) lastTime = timestamp;
      const dt = Math.min((timestamp - lastTime) / 16, 2.5); // frame time normalization
      lastTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw top image
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(topImg, 0, 0, canvas.width, canvas.height);

      // Reveal using destination-out
      ctx.globalCompositeOperation = "destination-out";

      // Update & draw trail points
      for (let i = trailPoints.length - 1; i >= 0; i--) {
        const p = trailPoints[i];
        p.life -= params.dissipation * dt * 1.1;
        if (p.life <= 0) {
          trailPoints.splice(i, 1);
          continue;
        }

        const alpha = p.life * p.life; // quadratic fade
        drawRevealBrush(p.x, p.y, p.radius * p.life * 0.95, alpha);
      }

      // Update & draw dynamic particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= params.dissipation * 1.4 * dt;
        p.radius += p.shrink * dt;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = p.life * 0.9;
        drawRevealBrush(p.x, p.y, p.radius, alpha);
      }

      ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(animate);
    }

    //--------------------------------------------------
    // Mouse Trail Handler
    //--------------------------------------------------
    function handleMove(e) {
      const rect = canvas.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;

      // Momentum / velocity
      mouse.vx = (newX - mouse.prevX) * params.momentum;
      mouse.vy = (newY - mouse.prevY) * params.momentum;

      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = newX;
      mouse.y = newY;

      // Add to persistent trail
      trailPoints.push({
        x: mouse.x,
        y: mouse.y,
        radius: params.radius * (0.9 + Math.random() * 0.2),
        life: 1.0,
      });

      // Limit trail length
      if (trailPoints.length > params.tail) {
        trailPoints.shift();
      }

      // Emit burst of particles (fluid feel)
      const emitCount = 4 + Math.floor(Math.random() * 3);
      for (let i = 0; i < emitCount; i++) {
        createParticle(mouse.x, mouse.y, mouse.vx * 0.8, mouse.vy * 0.8);
      }
    }

    //--------------------------------------------------
    // Load images
    //--------------------------------------------------
    let loaded = 0;
    function imageLoaded() {
      loaded++;
      if (loaded === 2) {
        resize();
        animate(0);
      }
    }

    topImg.onload = imageLoaded;
    bottomImg.onload = imageLoaded;

    topImg.src = topImage;
    bottomImg.src = revealImage;

    //--------------------------------------------------
    // Events
    //--------------------------------------------------
    canvas.addEventListener("mousemove", handleMove);
    window.addEventListener("resize", resize);

    // Touch support
    canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const fakeEvent = { clientX: touch.clientX, clientY: touch.clientY };
      handleMove(fakeEvent);
    }, { passive: false });

    //--------------------------------------------------
    // Cleanup
    //--------------------------------------------------
    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background / Reveal Image */}
      <img
        src={revealImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      {/* Top Image + Interactive Canvas Mask */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full "
        style={{ mixBlendMode: "normal" }}
      />
    </div>
  );
}