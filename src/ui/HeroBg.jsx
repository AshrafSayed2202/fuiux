import { useEffect, useRef, useState } from "react";
import { motion, useTransform } from "framer-motion";

import topBg from "../assets/images/top-background.jpg";
import topChar from "../assets/images/charcter-1.png";
import bottomBg from "../assets/images/bottom-background.jpg";
import bottomChar from "../assets/images/charcter-2.png";

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
    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    const container = containerRef.current;

    const topBgImg = new Image();
    const topCharImg = new Image();
    const bottomBgImg = new Image();
    const bottomCharImg = new Image();

    const particles = [];
    const trailPoints = [];

    const mouse = {
      x: 0,
      y: 0,
      prevX: 0,
      prevY: 0,
      vx: 0,
      vy: 0,
      targetTiltX: 0,
      targetTiltY: 0,
      currentTiltX: 0,
      currentTiltY: 0,
    };

    let animationId;
    let lastTime = 0;

    const params = {
      radius: 78,
      strength: 0.94,
      hardness: 0.32,
      tail: 160,
      fluidity: 0.68,
      dissipation: 0.016,
      chromatic: 65,
      momentum: 0.65,

      tiltMax: 7,
      tiltSpeed: 0.11,
      perspective: 1600,
      shineIntensity: 0.4,
    };

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticle(x, y, vx, vy) {
      const spread = 14;
      particles.push({
        x: x + (Math.random() - 0.5) * spread,
        y: y + (Math.random() - 0.5) * spread,
        vx: vx * (0.55 + Math.random() * 0.9),
        vy: vy * (0.55 + Math.random() * 0.9),
        radius: params.radius * (0.55 + Math.random() * 0.95),
        alpha: 0.92 + Math.random() * 0.08,
        life: 1.0,
        shrink: 0.075 + Math.random() * 0.13,
      });
    }

    function drawRevealBrush(x, y, radius, alpha, tiltInfluence = 1) {
      const grad = ctx.createRadialGradient(
        x - tiltInfluence * 4,
        y - tiltInfluence * 5,
        radius * params.hardness,
        x,
        y,
        radius * 1.12
      );

      grad.addColorStop(0, `rgba(0,0,0,${alpha * params.strength})`);
      grad.addColorStop(0.4, `rgba(0,0,0,${alpha * params.strength * 0.8})`);
      grad.addColorStop(0.78, `rgba(0,0,0,${alpha * 0.25})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    const updateTilt = () => {
      if (!container || !isMouseActive) return;

      mouse.currentTiltX = mouse.currentTiltX * 0.9 + mouse.targetTiltX * 0.1;
      mouse.currentTiltY = mouse.currentTiltY * 0.9 + mouse.targetTiltY * 0.1;

      const transform = `
        perspective(${params.perspective}px)
        rotateX(${mouse.currentTiltX}deg)
        rotateY(${mouse.currentTiltY}deg)
        translateZ(8px)
      `;

      container.style.transform = transform;
    };

    function animate(timestamp) {
      if (!lastTime) lastTime = timestamp;
      const dt = Math.min((timestamp - lastTime) / 16, 2.8);
      lastTime = timestamp;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(topBgImg, 0, 0, canvas.width, canvas.height);
      ctx.drawImage(topCharImg, 0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "destination-out";

      for (let i = trailPoints.length - 1; i >= 0; i--) {
        const p = trailPoints[i];
        p.life -= params.dissipation * dt * 1.05;
        if (p.life <= 0) {
          trailPoints.splice(i, 1);
          continue;
        }
        const alpha = p.life * p.life * 1.05;
        drawRevealBrush(p.x, p.y, p.radius * p.life * 0.96, alpha, Math.max(0.5, p.life));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.vx *= 0.955;
        p.vy *= 0.955;
        p.life -= params.dissipation * 1.4 * dt;
        p.radius += p.shrink * dt;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        drawRevealBrush(p.x, p.y, p.radius, p.life * 0.9, p.life * 0.75);
      }

      ctx.globalAlpha = 1;
      updateTilt();
      animationId = requestAnimationFrame(animate);
    }

    function handleMove(e) {
      if (!isMouseActive) return;

      const rect = canvas.getBoundingClientRect();
      const newX = e.clientX - rect.left;
      const newY = e.clientY - rect.top;

      mouse.vx = (newX - mouse.prevX) * params.momentum;
      mouse.vy = (newY - mouse.prevY) * params.momentum;

      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = newX;
      mouse.y = newY;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const normalizedX = (newX - centerX) / centerX;
      const normalizedY = (newY - centerY) / centerY;

      mouse.targetTiltY = normalizedX * params.tiltMax * 0.65;
      mouse.targetTiltX = -normalizedY * params.tiltMax * 0.65;

      trailPoints.push({
        x: mouse.x,
        y: mouse.y,
        radius: params.radius * (0.88 + Math.random() * 0.24),
        life: 1.0,
      });

      if (trailPoints.length > params.tail) trailPoints.shift();

      const emitCount = 4 + Math.floor(Math.random() * 3);
      for (let i = 0; i < emitCount; i++) {
        createParticle(mouse.x, mouse.y, mouse.vx * 0.8, mouse.vy * 0.8);
      }
    }

    let loaded = 0;
    function imageLoaded() {
      loaded++;
      if (loaded === 4) {
        resize();
        animate(0);
      }
    }

    topBgImg.onload = imageLoaded;
    topCharImg.onload = imageLoaded;
    bottomBgImg.onload = imageLoaded;
    bottomCharImg.onload = imageLoaded;

    topBgImg.src = topBg;
    topCharImg.src = topChar;
    bottomBgImg.src = bottomBg;
    bottomCharImg.src = bottomChar;

    canvas.addEventListener("mousemove", handleMove);

    canvas.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const fakeEvent = { clientX: touch.clientX, clientY: touch.clientY };
      handleMove(fakeEvent);
    }, { passive: false });

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animationId);
      canvas.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", resize);
    };
  }, [isMouseActive]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full overflow-hidden"
      style={{
        transformStyle: "preserve-3d",
        willChange: "transform"
      }}
    >
      <motion.img
        src={bottomBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        draggable={false}
      />
      <motion.img
        src={bottomChar}
        alt=""
        className="absolute inset-0 h-full w-full object-cover pointer-events-none"
        draggable={false}
      />

      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ scale: characterScale }}
      />
    </div>
  );
}