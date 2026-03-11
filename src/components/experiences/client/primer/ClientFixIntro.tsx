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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600/20 blur-[100px] rounded-full mix-blend-screen" />
            </div>

            <div className="relative z-10 text-center space-y-12 max-w-5xl mx-auto px-6">

                {/* 1. Dramatic Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono tracking-[0.2em] uppercase"
                >
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
                    Phase 4: Optimization
                </motion.div>

                {/* 2. Main Title */}
                <div className="space-y-2">
                    <motion.h2
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, type: "spring", duration: 1.5 }}
                        className="text-7xl md:text-9xl font-display font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-indigo-200 to-indigo-400 tracking-tight leading-[0.9]"
                    >
                        THE TURNAROUND.
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="text-white/50 text-sm font-mono tracking-widest uppercase"
                    >
                        From Friction to Flow
                    </motion.p>
                </div>

                {/* 3. Narrative */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto font-light"
                >
                    We identified the leaks. We measured the cost.<br />
                    Now, let's watch what happens when we <span className="text-white font-bold border-b-2 border-indigo-500">respect the user</span>.
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
                        className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 bg-white text-indigo-950 rounded-full font-bold text-xl tracking-wide hover:scale-105 transition-all duration-300 shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)] hover:shadow-[0_0_80px_-10px_rgba(255,255,255,0.5)] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-white opacity-0 group-hover:opacity-100 transition-opacity" />

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
                    <div className="mt-4 text-xs text-gray-500 font-mono">
                        Deploying User-Centric Principles...
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
