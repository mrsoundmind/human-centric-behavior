import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Timer, Package, ArrowUpRight, ArrowDownRight, Zap, Ban, Database } from "lucide-react";

interface StageProps {
    hoveredChoice: string | null;
}

export const Stage2_Resource = ({ hoveredChoice }: StageProps) => {
    return (
        <div className="rounded-[40px] border border-white/[0.08] bg-[#0A0A0B] overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                        <Users className="w-4 h-4 text-red-400" />
                    </div>
                    <div>
                        <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Resource Allocation</p>
                        <p className="text-[13px] font-bold text-white tracking-tight">Capacity Plan: Q2 Sprint 4</p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 grid grid-cols-12 gap-8 bg-black/20 relative">
                {/* Team Capacity Visualizer */}
                <div className="col-span-8 space-y-8 flex flex-col justify-center">
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Team Load</p>
                            <p className={`text-[12px] font-bold ${hoveredChoice === 'crunch' ? 'text-red-400' : 'text-green-400'}`}>
                                {hoveredChoice === 'crunch' ? '145% Overloaded' : '92% (Healthy)'}
                            </p>
                        </div>
                        <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden flex">
                            <motion.div
                                initial={{ width: "92%" }}
                                animate={{ width: hoveredChoice === 'crunch' ? "100%" : "92%" }}
                                className="h-full bg-indigo-500"
                            />
                            <AnimatePresence>
                                {hoveredChoice === 'crunch' && (
                                    <motion.div
                                        initial={{ width: 0 }} animate={{ width: "45%" }} exit={{ width: 0 }}
                                        className="h-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                                    />
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <CapabilityBox label="Technical Debt" value={hoveredChoice === 'crunch' ? '+85%' : 'Stable'} isBad={hoveredChoice === 'crunch'} icon={Database} />
                        <CapabilityBox label="Team Morale" value={hoveredChoice === 'crunch' ? 'Low' : 'Resilient'} isBad={hoveredChoice === 'crunch'} icon={Zap} />
                    </div>
                </div>

                {/* Impact Summary */}
                <div className="col-span-4 space-y-4 pt-12">
                    <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-4">Sprint Forecast</p>
                    <ForecastItem
                        label="Features Shipped"
                        value={hoveredChoice === 'crunch' ? '8/8' : '5/8'}
                        icon={Package}
                        color={hoveredChoice === 'crunch' ? 'text-green-400' : 'text-amber-400'}
                    />
                    <ForecastItem
                        label="Bug Probability"
                        value={hoveredChoice === 'crunch' ? '82%' : '12%'}
                        icon={ArrowUpRight}
                        color={hoveredChoice === 'crunch' ? 'text-red-400' : 'text-green-400'}
                    />
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
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${hoveredChoice === 'crunch' ? 'bg-red-500/20 text-red-400' :
                                        hoveredChoice === 'defer' ? 'bg-green-500/20 text-green-400' :
                                            'bg-indigo-500/20 text-indigo-400'
                                    }`}>
                                    {hoveredChoice === 'crunch' ? <Ban className="w-6 h-6" /> :
                                        hoveredChoice === 'defer' ? <Timer className="w-6 h-6" /> :
                                            <Users className="w-6 h-6" />}
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-bold text-white mb-1">
                                        {hoveredChoice === 'crunch' ? "The 'Yes' Trap" :
                                            hoveredChoice === 'defer' ? "Prioritizing the Core" :
                                                "Predictive Management"}
                                    </p>
                                    <p className="text-[12px] text-white/50 leading-relaxed">
                                        {hoveredChoice === 'crunch' ? "Forcing the team to ship 'everything' leads to a 'Tech Debt Explosion.' You hit the sprint goal, but the product is now so fragile that next month's features will take twice as long to build." :
                                            hoveredChoice === 'defer' ? "Deferring non-critical features protects the 'UX Baseline' and team morale. You ship slightly less now, but you double your long-term velocity." :
                                                "Integrated management means saying 'No' to features to say 'Yes' to stability. You protect the product's ultimate value by managing the organization's appetite."}
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

const CapabilityBox = ({ label, value, isBad, icon: Icon }: any) => (
    <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]">
        <Icon className={`w-4 h-4 mb-3 ${isBad ? 'text-red-400' : 'text-indigo-400'}`} />
        <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-1">{label}</p>
        <p className={`text-[14px] font-bold ${isBad ? 'text-red-400' : 'text-white'}`}>{value}</p>
    </div>
);

const ForecastItem = ({ label, value, icon: Icon, color }: any) => (
    <div className="flex items-center justify-between p-3 rounded-xl border border-white/[0.03] bg-white/[0.01]">
        <div className="flex items-center gap-2">
            <Icon className={`w-3.5 h-3.5 ${color}`} />
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-tight">{label}</span>
        </div>
        <span className={`text-[12px] font-bold ${color}`}>{value}</span>
    </div>
);
