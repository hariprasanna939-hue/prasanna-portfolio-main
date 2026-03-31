import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
    opacityDir: number;
    color: string;
}

const PARTICLE_CONFIG = [
    { color: "#ff2222", radius: 18, speed: 0.45 },
    { color: "#cc0000", radius: 12, speed: 0.6 },
    { color: "#ff6600", radius: 10, speed: 0.35 },
    { color: "#ff0044", radius: 14, speed: 0.55 },
    { color: "#ffffff", radius: 8, speed: 0.7 },
];

const AnimatedParticles: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        const particles: Particle[] = [];

        const resize = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };

        const initParticles = () => {
            particles.length = 0;
            PARTICLE_CONFIG.forEach((cfg) => {
                const angle = Math.random() * Math.PI * 2;
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: Math.cos(angle) * cfg.speed,
                    vy: Math.sin(angle) * cfg.speed,
                    radius: cfg.radius,
                    color: cfg.color,
                    opacity: 0.4 + Math.random() * 0.4,
                    opacityDir: Math.random() > 0.5 ? 1 : -1,
                });
            });
        };

        const drawParticle = (p: Particle) => {
            const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
            grd.addColorStop(0, hexToRgba(p.color, p.opacity));
            grd.addColorStop(0.3, hexToRgba(p.color, p.opacity * 0.5));
            grd.addColorStop(1, hexToRgba(p.color, 0));
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();

            // Hard bright core
            const core = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
            core.addColorStop(0, hexToRgba("#ffffff", p.opacity));
            core.addColorStop(1, hexToRgba(p.color, 0));
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = core;
            ctx.fill();
        };

        const tick = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw thin web lines between nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 280) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(220, 38, 38, ${0.08 * (1 - dist / 280)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }

            particles.forEach((p) => {
                // Pulse opacity
                p.opacity += p.opacityDir * 0.005;
                if (p.opacity >= 0.85) p.opacityDir = -1;
                if (p.opacity <= 0.2) p.opacityDir = 1;

                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Bounce edges
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                drawParticle(p);
            });

            animId = requestAnimationFrame(tick);
        };

        resize();
        initParticles();
        tick();

        const onResize = () => {
            resize();
            initParticles();
        };
        window.addEventListener("resize", onResize);

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{ zIndex: 0 }}
        />
    );
};

function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
}

export default AnimatedParticles;
