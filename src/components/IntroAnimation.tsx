import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroAnimationProps {
    onComplete: () => void;
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [phase, setPhase] = useState<"in" | "hold" | "out">("in");
    const [done, setDone] = useState(false);

    /* ── Phase sequencer ── */
    useEffect(() => {
        const t1 = setTimeout(() => setPhase("hold"), 2000);
        const t2 = setTimeout(() => setPhase("out"), 3200);
        const t3 = setTimeout(() => setDone(true), 4200);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    useEffect(() => {
        if (done) onComplete();
    }, [done, onComplete]);

    /* ── Canvas: soft aurora light field ── */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        let t = 0;
        const tick = () => {
            t += 0.004;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Soft aurora blobs
            const blobs = [
                { cx: 0.2 + 0.1 * Math.sin(t * 1.1), cy: 0.4 + 0.08 * Math.cos(t * 0.9), r: 0.35, a: 0.055 },
                { cx: 0.75 + 0.08 * Math.cos(t * 0.8), cy: 0.55 + 0.1 * Math.sin(t * 1.2), r: 0.40, a: 0.045 },
                { cx: 0.5 + 0.06 * Math.sin(t * 1.4), cy: 0.3 + 0.06 * Math.cos(t * 1.0), r: 0.28, a: 0.035 },
            ];

            blobs.forEach(({ cx, cy, r, a }) => {
                const px = cx * canvas.width;
                const py = cy * canvas.height;
                const rad = r * Math.max(canvas.width, canvas.height);
                const grd = ctx.createRadialGradient(px, py, 0, px, py, rad);
                grd.addColorStop(0, `rgba(150,150,160,${a})`);
                grd.addColorStop(0.5, `rgba(100,100,120,${a * 0.5})`);
                grd.addColorStop(1, "rgba(0,0,0,0)");
                ctx.fillStyle = grd;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            });

            // Very faint grid of dots
            if (canvas.width > 0) {
                const cols = Math.ceil(canvas.width / 60);
                const rows = Math.ceil(canvas.height / 60);
                for (let i = 0; i <= cols; i++) {
                    for (let j = 0; j <= rows; j++) {
                        const x = i * 60;
                        const y = j * 60;
                        const pulse = 0.06 + 0.04 * Math.sin(t * 2 + i * 0.5 + j * 0.3);
                        ctx.beginPath();
                        ctx.arc(x, y, 0.7, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(255,255,255,${pulse})`;
                        ctx.fill();
                    }
                }
            }

            animId = requestAnimationFrame(tick);
        };
        tick();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    if (done) return null;

    const isOut = phase === "out";

    return (
        <AnimatePresence>
            {!done && (
                <motion.div
                    key="apple-intro"
                    className="fixed inset-0 flex items-center justify-center"
                    style={{ zIndex: 9999, background: "#000000" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Aurora canvas */}
                    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />

                    {/* Vignette */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background:
                                "radial-gradient(ellipse at center, transparent 40%, #000 100%)",
                        }}
                    />

                    {/* Main content */}
                    <div className="relative z-10 flex flex-col items-center gap-5 text-center px-6">

                        {/* Eyebrow */}
                        <motion.p
                            className="text-white/40 text-xs tracking-[0.45em] uppercase font-light"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isOut ? 0 : 1 }}
                            transition={{ duration: isOut ? 0.4 : 0.9, delay: isOut ? 0 : 0.5 }}
                        >
                            Portfolio
                        </motion.p>

                        {/* Name — shimmer reveal */}
                        <motion.h1
                            className="font-semibold leading-none tracking-tight select-none"
                            style={{
                                fontSize: "clamp(2.6rem, 8vw, 7rem)",
                                background:
                                    "linear-gradient(135deg, #ffffff 0%, #a0aab8 40%, #ffffff 60%, #c8d0dc 100%)",
                                backgroundSize: "200% auto",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                                letterSpacing: "-0.03em",
                            }}
                            initial={{ opacity: 0, y: 24, filter: "blur(16px)" }}
                            animate={
                                isOut
                                    ? { opacity: 0, y: -20, filter: "blur(20px)" }
                                    : { opacity: 1, y: 0, filter: "blur(0px)" }
                            }
                            transition={
                                isOut
                                    ? { duration: 0.6, ease: "easeIn" }
                                    : { duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }
                            }
                        >
                            Prasanna Hari
                        </motion.h1>

                        {/* Tagline */}
                        <motion.p
                            className="text-white/50 font-light tracking-wide"
                            style={{
                                fontSize: "clamp(0.85rem, 2vw, 1.1rem)",
                                fontFamily: "'Inter', -apple-system, sans-serif",
                            }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: isOut ? 0 : 0.7, y: 0 }}
                            transition={{ duration: isOut ? 0.4 : 0.9, delay: isOut ? 0 : 1.0 }}
                        >
                            Full Stack Developer &amp; AI Product Builder
                        </motion.p>

                        {/* Thin divider */}
                        <motion.div
                            className="rounded-full"
                            style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)", height: "1px" }}
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: isOut ? 0 : 200, opacity: isOut ? 0 : 1 }}
                            transition={{ duration: isOut ? 0.3 : 0.8, delay: isOut ? 0 : 1.3, ease: "easeOut" }}
                        />

                        {/* Progress bar — Apple loading line */}
                        <motion.div
                            className="relative overflow-hidden rounded-full"
                            style={{ width: 120, height: 2, background: "rgba(255,255,255,0.08)" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isOut ? 0 : 1 }}
                            transition={{ delay: isOut ? 0 : 1.4, duration: 0.4 }}
                        >
                            <motion.div
                                style={{ height: "100%", background: "rgba(255,255,255,0.5)", borderRadius: 9999 }}
                                initial={{ width: "0%" }}
                                animate={{ width: isOut ? "100%" : "75%" }}
                                transition={{ duration: isOut ? 0.3 : 1.5, delay: isOut ? 0 : 1.4, ease: "easeInOut" }}
                            />
                        </motion.div>

                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default IntroAnimation;
