import { useEffect, useRef } from "react";

import topImage from "../assets/images/charcter-1.jpg";
import revealImage from "../assets/images/charcter-2.jpg";

export default function HeroSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const topImg = new Image();
    const bottomImg = new Image();

    const particles = [];

    const mouse = {
      x: 0,
      y: 0,
      moving: false,
    };

    let animationId;

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

    function createParticle(x, y) {
      particles.push({
        x,
        y,

        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,

        radius: 45 + Math.random() * 40,

        alpha: 1,

        shrink: 0.15 + Math.random() * 0.15,

        fade: 0.008 + Math.random() * 0.01,
      });
    }

    //--------------------------------------------------
    // Animation
    //--------------------------------------------------

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      //------------------------------------------------
      // Draw TOP image
      //------------------------------------------------

      ctx.globalCompositeOperation = "source-over";

      ctx.drawImage(topImg, 0, 0, canvas.width, canvas.height);

      //------------------------------------------------
      // Erase using smoke
      //------------------------------------------------

      ctx.globalCompositeOperation = "destination-out";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        p.radius += p.shrink;

        p.alpha -= p.fade;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = p.alpha;

        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          p.radius * 0.15,
          p.x,
          p.y,
          p.radius
        );

        gradient.addColorStop(0, "rgba(0,0,0,1)");
        gradient.addColorStop(0.4, "rgba(0,0,0,0.7)");
        gradient.addColorStop(0.75, "rgba(0,0,0,0.25)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;

      animationId = requestAnimationFrame(animate);
    }

    //--------------------------------------------------
    // Mouse
    //--------------------------------------------------

    function handleMove(e) {
      const rect = canvas.getBoundingClientRect();

      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      for (let i = 0; i < 6; i++) {
        createParticle(
          mouse.x + (Math.random() - 0.5) * 30,
          mouse.y + (Math.random() - 0.5) * 30
        );
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
        animate();
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
      {/* Bottom image */}
      <img
        src={revealImage}
        alt=""
        className="absolute h-full w-full"
        draggable={false}
      />

      {/* Top image mask */}
      <canvas
        ref={canvasRef}
        className="absolute h-full w-full"
      />
    </div>
  );
}