import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ClientFixIntroProps {
    onNext: () => void;
}

export const ClientFixIntro = ({ onNext }: ClientFixIntroProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-accent/20 blur-[100px] rounded-full" />
            </div>

            <div className="relative z-10 text-center space-y-12 max-w-5xl mx-auto px-6">

                {/* 1. Dramatic Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono tracking-[0.2em] uppercase"
                >
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Phase 4: Optimization
                </motion.div>

                {/* 2. Main Title */}
                <div className="space-y-2">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, type: "spring", duration: 1.5 }}
                        className="text-7xl md:text-9xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-foreground via-primary to-primary tracking-tight leading-[0.9]"
                    >
                        THE TURNAROUND.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-muted-foreground text-sm font-mono tracking-widest uppercase"
                    >
                        From Friction to Flow
                    </motion.p>
                </div>

                {/* 3. Narrative */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto font-light"
                >
                    We identified the leaks. We measured the cost.<br />
                    Now, let's watch what happens when we <span className="text-foreground font-bold border-b-2 border-primary">respect the user</span>.
                </motion.p>

                {/* 4. Action */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.5, type: "spring" }}
                    className="pt-8"
                >
                    <button
                        onClick={onNext}
                        className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 bg-primary text-primary-foreground rounded-full font-bold text-xl tracking-wide hover:scale-105 transition-all duration-300 shadow-lg overflow-hidden"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            APPLY THE FIXES
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ repeat: Infinity, duration: 1.5 }}
                            >
                                🚀
                            </motion.span>
                        </span>
                    </button>
                    <div className="mt-4 text-xs text-muted-foreground font-mono">
                        Deploying User-Centric Principles...
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
