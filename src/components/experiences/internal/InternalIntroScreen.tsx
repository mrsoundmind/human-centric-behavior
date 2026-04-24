import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Target, Zap } from "lucide-react";
import { useEffect, useState } from "react";

interface InternalIntroScreenProps {
    onStart: () => void;
}

export const InternalIntroScreen = ({ onStart }: InternalIntroScreenProps) => {
    const [step, setStep] = useState(0);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { currentTarget, clientX, clientY } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        mouseX.set((clientX - left) / width);
        mouseY.set((clientY - top) / height);
    };

    const gradientX = useTransform(mouseX, [0, 1], ["0%", "100%"]);
    const gradientY = useTransform(mouseY, [0, 1], ["0%", "100%"]);

    useEffect(() => {
        const timer1 = setTimeout(() => setStep(1), 1500);
        const timer2 = setTimeout(() => setStep(2), 3500);
        const timer3 = setTimeout(() => setStep(3), 5000);
        return () => { clearTimeout(timer1); clearTimeout(timer2); clearTimeout(timer3); };
    }, []);

    return (
        <motion.div
            onMouseMove={handleMouseMove}
            className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8 relative overflow-hidden font-sans selection:bg-primary/30"
        >
            {/* Brand ambient gradient that follows cursor */}
            <motion.div
                className="absolute inset-0 opacity-40 blur-[120px] pointer-events-none transition-opacity duration-1000"
                style={{
                    background: `radial-gradient(circle at ${gradientX.get()} ${gradientY.get()}, hsl(var(--primary) / 0.35), hsl(var(--accent) / 0.10), transparent 50%)`
                }}
            />

            <div className="max-w-5xl w-full flex flex-col items-center justify-center text-center z-10 relative">

                {/* Eyebrow */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-card border border-border backdrop-blur-md mb-12"
                    style={{ boxShadow: "0 0 30px hsl(var(--primary) / 0.10)" }}
                >
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ boxShadow: "0 0 10px hsl(var(--primary) / 0.8)" }} />
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary/80">Human-Centric Lab</span>
                </motion.div>

                {/* Progressive Text Reveal */}
                <div className="space-y-4 mb-16 relative">
                    <motion.h1
                        initial={{ opacity: 0, filter: "blur(10px)" }}
                        animate={{ opacity: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1.2 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground/40"
                    >
                        You already make
                    </motion.h1>

                    <motion.h1
                        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                        animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 20, filter: step >= 1 ? "blur(0px)" : "blur(10px)" }}
                        transition={{ duration: 1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent drop-shadow-2xl"
                    >
                        UX decisions.
                    </motion.h1>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: step >= 2 ? 1 : 0, scale: step >= 2 ? 1 : 0.95 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-foreground"
                    >
                        Daily.
                    </motion.h1>
                </div>

                {/* Value Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 40 }}
                    transition={{ duration: 1 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-16"
                >
                    {[
                        { icon: Target, title: "The Mirror", desc: "No theory. Just your actual daily scenarios reflecting back at you." },
                        { icon: Zap, title: "The Consequence", desc: "See the hidden UX impact of choices made under extreme pressure." },
                        { icon: Sparkles, title: "The Upgrade", desc: "15 minutes to acquire a new lens for navigating internal friction." }
                    ].map((item, i) => (
                        <div key={i} className="group relative rounded-2xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative h-full bg-card p-6 rounded-2xl border border-border hover:border-primary/30 transition-colors flex flex-col items-center text-center">
                                <div className="p-3 bg-primary/10 rounded-xl mb-4 text-primary group-hover:scale-110 transition-transform">
                                    <item.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-foreground font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* CTA — solid violet, no gradient */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: step >= 3 ? 1 : 0, scale: step >= 3 ? 1 : 0.9 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <button
                        onClick={onStart}
                        className="px-10 py-5 bg-primary text-primary-foreground font-black text-sm uppercase tracking-[0.2em] rounded-full transition-all duration-300"
                    >
                        <span className="flex items-center gap-3">
                            Begin the Experience
                            <ArrowRight className="w-4 h-4" />
                        </span>
                    </button>
                    <p className="mt-6 text-[10px] text-muted-foreground font-mono uppercase tracking-widest">No login · No quizzes · No grades</p>
                </motion.div>

            </div>
        </motion.div>
    );
};
