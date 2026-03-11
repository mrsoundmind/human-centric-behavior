import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, AlertTriangle, CheckCircle2, CloudLightning, Timer, ArrowRight, UserCheck, Flame } from "lucide-react";

interface StageProps {
    hoveredChoice: string | null;
}

export const Stage3_UAT = ({ hoveredChoice }: StageProps) => {
    return (
        <div className="rounded-[40px] border border-white/[0.08] bg-[#0A0A0B] overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                        <Flame className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                        <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Launch Readiness</p>
                        <p className="text-[13px] font-bold text-white tracking-tight">Production Risk Heatmap</p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-12 flex items-center gap-12">
                {/* Risk Grid */}
                <div className="w-72 h-72 grid grid-cols-4 grid-rows-4 gap-2 relative">
                    {Array.from({ length: 16 }).map((_, i) => (
                        <RiskCell
                            key={i}
                            intensity={
                                hoveredChoice === 'skip' ? (i > 4 ? 'high' : 'med') :
                                    hoveredChoice === 'cycle' ? (i > 12 ? 'med' : 'low') : 'low'
                            }
                            delay={i * 0.05}
                        />
                    ))}
                    <div className="absolute -left-16 top-0 bottom-0 flex flex-col justify-between text-[10px] font-mono text-white/20 uppercase tracking-tighter">
                        <span>Severe</span>
                        <span>Mild</span>
                    </div>
                    <div className="absolute left-0 right-0 -bottom-8 flex justify-between text-[10px] font-mono text-white/20 uppercase tracking-tighter">
                        <span>Scale</span>
                        <span>High Traffic</span>
                    </div>
                </div>

                {/* Impact Panel */}
                <div className="flex-1 space-y-6">
                    <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] relative overflow-hidden">
                        <p className="text-[11px] font-mono text-white/20 uppercase mb-4 tracking-widest">Risk Summary</p>
                        <AnimatePresence mode="wait">
                            {hoveredChoice ? (
                                <motion.div
                                    key={hoveredChoice}
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                                    className="space-y-4"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full animate-ping ${hoveredChoice === 'skip' ? 'bg-red-500' :
                                                hoveredChoice === 'cycle' ? 'bg-amber-500' : 'bg-green-500'
                                            }`} />
                                        <p className="text-[18px] font-bold text-white">
                                            {hoveredChoice === 'skip' ? 'Critical Failure Imminent' :
                                                hoveredChoice === 'cycle' ? 'Controlled Release' : 'Safe Launch'}
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <ImpactRow label="Rollback Probability" value={hoveredChoice === 'skip' ? '92%' : '15%'} color={hoveredChoice === 'skip' ? 'text-red-400' : 'text-green-400'} />
                                        <ImpactRow label="Support Load" value={hoveredChoice === 'skip' ? '12x Normal' : 'Low'} color={hoveredChoice === 'skip' ? 'text-red-400' : 'text-green-400'} />
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="opacity-20 py-8 text-center border-2 border-dashed border-white/5 rounded-2xl">
                                    <p className="text-[12px] font-mono italic">Simulate release approach...</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Reality Context Overlay */}
                <AnimatePresence>
                    {hoveredChoice && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute bottom-8 left-8 right-8 p-6 rounded-3xl border border-white/10 bg-[#0F0F12] shadow-2xl"
                        >
                            <div className="flex gap-4 items-center">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${hoveredChoice === 'skip' ? 'bg-red-500/20 text-red-400 font-bold' :
                                        hoveredChoice === 'cycle' ? 'bg-amber-500/20 text-amber-400 font-bold' :
                                            'bg-green-500/20 text-green-400 font-bold'
                                    }`}>
                                    {hoveredChoice === 'skip' ? '!' : hoveredChoice === 'cycle' ? '?' : '✓'}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-white mb-1">
                                        {hoveredChoice === 'skip' ? "The 'Fake Deadline' Surrender" :
                                            hoveredChoice === 'cycle' ? "The 'Gold Standard' Quality Sweep" :
                                                "Automated Assurance"}
                                    </p>
                                    <p className="text-[12px] text-white/50 leading-relaxed text-left">
                                        {hoveredChoice === 'skip' ? "Skipping UAT to hit a client date feels 'decisive' but results in a broken app. The procurement lead will remember the failure, not the 'on-time' delivery." :
                                            hoveredChoice === 'cycle' ? "Stopping for 3 cycles uncovers critical data-flow errors. You protect the platform's 'Baseline UX' (Reliability) at the cost of one scorecard flag." :
                                                "Integrated QA means you never have to choose. Tests run continuously, providing 24/7 confidence for every code change."}
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

const RiskCell = ({ intensity, delay }: any) => (
    <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay }}
        className={`rounded-md transition-colors duration-500 ${intensity === 'high' ? 'bg-red-500/40 border border-red-500/40' :
                intensity === 'med' ? 'bg-amber-500/20 border border-amber-500/20' :
                    'bg-white/[0.03] border border-white/5'
            }`}
    />
);

const ImpactRow = ({ label, value, color }: any) => (
    <div className="flex justify-between items-center py-1">
        <span className="text-[11px] text-white/40 uppercase tracking-tighter">{label}</span>
        <span className={`text-[12px] font-bold ${color}`}>{value}</span>
    </div>
);
