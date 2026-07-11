import { useEffect, useRef } from "react";

export default function SmokeReveal() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;

            // Cover the image with a solid layer
            ctx.globalCompositeOperation = "source-over";
            ctx.fillStyle = "#111";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        };

        resize();
        window.addEventListener("resize", resize);

        const erase = (x, y) => {
            ctx.globalCompositeOperation = "destination-out";

            const gradient = ctx.createRadialGradient(x, y, 0, x, y, 70);

            gradient.addColorStop(0, "rgba(0,0,0,1)");
            gradient.addColorStop(1, "rgba(0,0,0,0)");

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(x, y, 70, 0, Math.PI * 2);
            ctx.fill();
        };

        const handleMove = (e) => {
            const rect = canvas.getBoundingClientRect();

            erase(
                e.clientX - rect.left,
                e.clientY - rect.top
            );
        };

        canvas.addEventListener("mousemove", handleMove);

        return () => {
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", handleMove);
        };
    }, []);

    return (
        <div className="relative overflow-hidden rounded-xl">
            {/* Hidden image */}
            <img
                src="/photo.jpg"
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Cover layer */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />
        </div>
    );
}