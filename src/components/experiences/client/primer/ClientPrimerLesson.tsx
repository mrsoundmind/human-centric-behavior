import { motion } from "framer-motion";
import React from "react";

interface ClientPrimerLessonProps {
    title: string;
    description: React.ReactNode;
    impactIcon: string;
    impactTitle: string;
    impactDescription: React.ReactNode;
    mechanismTitle?: string;
    mechanismDescription?: React.ReactNode;
    onNext: () => void;
}

export const ClientPrimerLesson = ({
    title,
    description,
    impactIcon,
    impactTitle,
    impactDescription,
    mechanismTitle = "The Mechanism (UX)",
    mechanismDescription = "Users don't read. They scan for signifiers. If the signifier is missing, the action fails.",
    onNext
}: ClientPrimerLessonProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto py-6 px-6 space-y-6"
        >
            {/* 1. HEADER (Outside Grid) */}
            <div className="text-center space-y-3">
                <div className="text-5xl mb-2 filter drop-shadow-2xl grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500 transform hover:scale-110 cursor-pointer">{impactIcon}</div>
                <div className="inline-block px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-[10px] font-bold tracking-widest text-red-500 font-mono uppercase">
                    Risk Assessment
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white">
                    {title}
                </h2>
            </div>

            {/* 2. CONTENT GRID */}
            <div className="grid md:grid-cols-2 gap-4">

                {/* A. THE SCENARIO (Indigo/Purple Subtle Base) */}
                <div className="md:col-span-2 bg-gradient-to-br from-indigo-900/10 to-purple-900/10 rounded-3xl p-6 border border-white/10 relative overflow-hidden group transition-all duration-500 hover:border-indigo-500/50 hover:from-indigo-900/20 hover:to-purple-900/20">
                    {/* Ambient Light */}
                    <div className="absolute top-0 right-0 p-24 bg-indigo-500/5 blur-[60px] rounded-full pointer-events-none"></div>

                    <div className="relative z-10 space-y-3">
                        <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-mono">
                            The Scenario
                        </div>
                        <div className="text-lg md:text-xl text-gray-200 font-light leading-relaxed">
                            {description}
                        </div>
                    </div>
                </div>

                {/* B. THE UX MECHANISM (Cyan/Blue Subtle Base) */}
                <div className="bg-gradient-to-br from-cyan-900/10 to-blue-900/10 rounded-3xl p-6 border border-white/10 flex flex-col justify-center relative overflow-hidden group transition-all duration-500 hover:border-cyan-500/50 hover:from-cyan-900/20 hover:to-blue-900/20">

                    <div className="relative z-10 space-y-2">
                        <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono group-hover:text-cyan-400 transition-colors">
                            {mechanismTitle}
                        </div>
                        <div className="text-base text-gray-400 leading-relaxed group-hover:text-gray-200 transition-colors">
                            {mechanismDescription}
                        </div>
                    </div>
                </div>

                {/* C. THE BUSINESS COST (Red/Pink Subtle Base) */}
                <div className="bg-gradient-to-br from-red-900/10 to-pink-900/10 rounded-3xl p-6 border border-white/10 flex flex-col justify-center relative overflow-hidden group transition-all duration-500 hover:border-red-500/50 hover:from-red-900/20 hover:to-pink-900/20">

                    <div className="relative z-10 space-y-2">
                        <div className="text-[10px] font-bold text-pink-500 uppercase tracking-widest font-mono group-hover:text-pink-300 transition-colors">
                            The Cost (Business)
                        </div>
                        <div className="text-base text-gray-200 leading-relaxed font-bold group-hover:text-white transition-colors">
                            {impactDescription}
                        </div>
                    </div>
                </div>

                {/* ACTION BAR */}
                <div className="md:col-span-2 mt-2 flex justify-center">
                    <button
                        onClick={onNext}
                        className="group relative inline-flex items-center gap-2 px-8 py-3 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
                    >
                        <span>Next Example</span>
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
