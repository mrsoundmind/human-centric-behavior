import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, FileCode, Scissors, Zap, AlertTriangle, CheckCircle2, Sliders, Box } from "lucide-react";

interface StageProps {
    hoveredChoice: string | null;
}

export const Stage2_Handover = ({ hoveredChoice }: StageProps) => {
    return (
        <div className="rounded-[40px] border border-white/[0.08] bg-[#0A0A0B] overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Box className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                        <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Developer Handover</p>
                        <p className="text-[13px] font-bold text-white tracking-tight">Component Spec: CardPrimary.tsx</p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 grid grid-cols-2 gap-8 bg-black/20">
                {/* Visual Spec Side */}
                <div className="space-y-6 flex flex-col items-center justify-center">
                    <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest absolute top-8">Visual Reference</p>
                    <div className="w-48 h-32 rounded-3xl border border-white/10 bg-[#1A1A1E] flex items-center justify-center relative overflow-hidden group">
                        <div className="w-12 h-12 rounded-xl bg-blue-500/20" />
                        {/* Dimensional Overlays */}
                        <div className="absolute inset-0 pointer-events-none">
                            <div className="absolute top-1/2 left-0 right-0 h-px bg-pink-500/40 dashed" />
                            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-pink-500/40 dashed" />
                            <div className="absolute top-4 left-4 text-[9px] font-mono text-pink-400">P: 24px</div>
                        </div>
                    </div>
                </div>

                {/* Code Implement Side */}
                <div className="font-mono text-[12px] space-y-4">
                    <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-4">Implementation Strategy</p>

                    <div className="rounded-2xl border border-white/5 bg-black/40 p-4 space-y-2 relative">
                        <p className="text-gray-500 text-[11px] font-mono">Style Definition:</p>
                        <AnimatePresence mode="wait">
                            {hoveredChoice === 'spec' ? (
                                <motion.div key="tokens" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-blue-400">
                                    <p>padding: <span className="text-purple-400">var</span>(--spacing-xl);</p>
                                    <p>border-radius: <span className="text-purple-400">var</span>(--radius-lg);</p>
                                    <p>color: <span className="text-purple-400">var</span>(--color-brand-600);</p>
                                </motion.div>
                            ) : (
                                <motion.div key="hardcode" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-amber-400/70">
                                    <p>padding: 24px;</p>
                                    <p>border-radius: 12px;</p>
                                    <p>color: #3b82f6;</p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {hoveredChoice !== 'spec' && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="absolute -right-2 top-2 px-2 py-0.5 rounded bg-amber-500/20 text-amber-500 border border-amber-500/30 text-[9px] font-bold"
                            >
                                HARD-CODED
                            </motion.div>
                        )}
                    </div>

                    <div className="pt-4 space-y-3">
                        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Handover Quality</p>
                        <QualityBar label="Refactor Difficulty" value={hoveredChoice === 'spec' ? 10 : 90} color={hoveredChoice === 'spec' ? 'bg-green-500' : 'bg-red-500'} />
                        <QualityBar label="Theme Compatibility" value={hoveredChoice === 'spec' ? 100 : 0} color={hoveredChoice === 'spec' ? 'bg-green-500' : 'bg-red-500'} />
                    </div>
                </div>

                {/* Reality Context Overlay */}
                <AnimatePresence>
                    {hoveredChoice && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute bottom-4 left-4 right-4 p-6 rounded-3xl border border-white/10 bg-[#0F0F12]/95 backdrop-blur-md shadow-2xl z-20"
                        >
                            <div className="flex gap-4 items-center">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${hoveredChoice === 'spec' ? 'bg-green-500/20 text-green-400' :
                                        hoveredChoice === 'handoff' ? 'bg-amber-500/20 text-amber-400' :
                                            'bg-blue-500/20 text-blue-400'
                                    }`}>
                                    {hoveredChoice === 'spec' ? <Zap className="w-6 h-6" /> :
                                        hoveredChoice === 'handoff' ? <Scissors className="w-6 h-6" /> :
                                            <FileCode className="w-6 h-6" />}
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-bold text-white mb-1">
                                        {hoveredChoice === 'spec' ? "Tokenized Handover" :
                                            hoveredChoice === 'handoff' ? "The 'Visual-Only' Gap" :
                                                "Automated Spec Sync"}
                                    </p>
                                    <p className="text-[12px] text-white/50 leading-relaxed">
                                        {hoveredChoice === 'spec' ? "Specifying 'Tokens' instead of 'Pixels' means one global update fixes every screen. You reduce developer friction and future bug-reports by 60%." :
                                            hoveredChoice === 'handoff' ? "A beautiful design with poor technical specs results in a 'Frankenstein App.' Devs will guess the values, and the build will drift from your vision every week." :
                                                "Integrated spec tools like Storybook or Figma Dev Mode are not enough; you must verify that the implementation matches the Token intent in the final PR."}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

const QualityBar = ({ label, value, color }: any) => (
    <div className="space-y-1">
        <div className="flex justify-between text-[9px] font-mono text-white/20 uppercase">
            <span>{label}</span>
            <span>{value}%</span>
        </div>
        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
                initial={{ width: 0 }} animate={{ width: `${value}%` }}
                className={`h-full ${color}`}
            />
        </div>
    </div>
);
