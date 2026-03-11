import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingDown, Activity, FastForward, Timer, AlertTriangle, ShieldAlert, Zap } from "lucide-react";

interface StageProps {
    hoveredChoice: string | null;
}

export const Stage2_Debt = ({ hoveredChoice }: StageProps) => {
    return (
        <div className="rounded-[40px] border border-white/[0.08] bg-[#0A0A0B] overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                        <Activity className="w-4 h-4 text-orange-400" />
                    </div>
                    <div>
                        <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Velocity Analyzer</p>
                        <p className="text-[13px] font-bold text-white tracking-tight">Sprint Projection Loop</p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-12 relative flex flex-col">
                <div className="flex-1 relative border-l border-b border-white/10 ml-12 mb-12">
                    {/* Y-Axis Label */}
                    <div className="absolute -left-12 top-0 bottom-0 flex items-center">
                        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest -rotate-90 origin-center whitespace-nowrap">Output Velocity</p>
                    </div>
                    {/* X-Axis Label */}
                    <div className="absolute left-0 right-0 -bottom-8 flex justify-center">
                        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Sprints (Time)</p>
                    </div>

                    {/* The Curve */}
                    <svg className="absolute inset-0 w-full h-full overflow-visible">
                        {/* Baseline */}
                        <motion.path
                            d="M 0,200 L 400,200"
                            stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="4 4" fill="none"
                        />

                        {/* Interaction Curve */}
                        <motion.path
                            animate={{
                                d: hoveredChoice === 'bypass'
                                    ? "M 0,150 Q 100,20 200,280 T 400,380"
                                    : hoveredChoice === 'refactor'
                                        ? "M 0,150 Q 100,180 200,120 T 400,80"
                                        : "M 0,150 Q 200,150 400,150"
                            }}
                            stroke={hoveredChoice === 'bypass' ? "#ef4444" : hoveredChoice === 'refactor' ? "#22c55e" : "#3b82f6"}
                            strokeWidth="3" fill="none"
                            className="transition-all duration-700"
                        />

                        {/* Point Marker */}
                        <motion.circle
                            animate={{
                                cx: 400,
                                cy: hoveredChoice === 'bypass' ? 380 : hoveredChoice === 'refactor' ? 80 : 150
                            }}
                            r="6" fill={hoveredChoice === 'bypass' ? "#ef4444" : hoveredChoice === 'refactor' ? "#22c55e" : "#3b82f6"}
                            className="transition-all duration-700 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                        />
                    </svg>

                    {/* Stats Overlays */}
                    <AnimatePresence>
                        {hoveredChoice === 'bypass' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                                className="absolute top-10 right-10 p-4 rounded-2xl border border-red-500/20 bg-red-500/5 backdrop-blur-sm max-w-[200px]"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <TrendingDown className="w-4 h-4 text-red-400" />
                                    <span className="text-[11px] font-bold text-red-200 uppercase">Velocity Crash</span>
                                </div>
                                <p className="text-[10px] text-red-200/50 leading-relaxed">
                                    Initial boost is fake. Sprint 4 will be 100% bug-fixing. Zero new features.
                                </p>
                            </motion.div>
                        )}
                        {hoveredChoice === 'refactor' && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                                className="absolute bottom-40 left-1/2 p-4 rounded-2xl border border-green-500/20 bg-green-500/5 backdrop-blur-sm max-w-[200px]"
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <Zap className="w-4 h-4 text-green-400" />
                                    <span className="text-[11px] font-bold text-green-200 uppercase">Sustainable High</span>
                                </div>
                                <p className="text-[10px] text-green-200/50 leading-relaxed">
                                    Short-term slow down allows 2x feature delivery speed in Month 2.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Bottom Stats Drawer */}
                <div className="mt-4 grid grid-cols-3 gap-6">
                    <DebtCard label="Time to Market" value={hoveredChoice === 'bypass' ? '2 Weeks' : '4 Weeks'} sub="Immediate" />
                    <DebtCard label="Future Cost" value={hoveredChoice === 'bypass' ? '8 Weeks' : '1 Week'} sub="Sprint 5+" color="text-red-400" />
                    <DebtCard label="Maintenance" value={hoveredChoice === 'bypass' ? 'Extreme' : 'Low'} sub="Reliability" />
                </div>
            </div>
        </div>
    );
};

const DebtCard = ({ label, value, sub, color = "text-white" }: any) => (
    <div className="p-5 rounded-3xl border border-white/[0.03] bg-white/[0.01]">
        <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-1">{label}</p>
        <p className={`text-[16px] font-bold ${color}`}>{value}</p>
        <p className="text-[9px] font-mono text-white/20 uppercase mt-1 opacity-40">{sub}</p>
    </div>
);
