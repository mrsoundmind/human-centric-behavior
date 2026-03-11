import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, TrendingUp, AlertCircle, CheckCircle2, Layout, Activity, Target, Shield } from "lucide-react";

interface StageProps {
    hoveredChoice: string | null;
}

export const Stage1_Scorecard = ({ hoveredChoice }: StageProps) => {
    return (
        <div className="rounded-[40px] border border-white/[0.08] bg-[#0A0A0B] overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                        <BarChart3 className="w-4 h-4 text-orange-400" />
                    </div>
                    <div>
                        <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Executive Dashboard</p>
                        <p className="text-[13px] font-bold text-white tracking-tight">Project Health: SME Lending Pilot</p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 grid grid-cols-12 gap-8 bg-black/20 relative">
                {/* Scorecard View */}
                <div className="col-span-12 h-64 rounded-3xl border border-white/5 bg-[#16161A] p-8 flex flex-col justify-between relative group">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-2">Internal Status</p>
                            <div className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${hoveredChoice === 'green' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`} />
                                <p className="text-[18px] font-bold text-white uppercase tracking-tighter">
                                    {hoveredChoice === 'green' ? 'On Track (Green)' : 'At Risk (Red)'}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <MiniChart label="Velocity" value={hoveredChoice === 'green' ? 92 : 45} color="bg-orange-500" />
                            <MiniChart label="Quality" value={hoveredChoice === 'green' ? 30 : 88} color="bg-indigo-500" />
                        </div>
                    </div>

                    {/* The "Conflict" Markers */}
                    <div className="grid grid-cols-4 gap-4 mt-8">
                        <StatusPill label="Milestone A" status="done" />
                        <StatusPill label="API Sync" status={hoveredChoice === 'green' ? 'done' : 'fail'} />
                        <StatusPill label="UAT Sign-off" status={hoveredChoice === 'green' ? 'done' : 'fail'} />
                        <StatusPill label="Launch Readiness" status={hoveredChoice === 'green' ? 'done' : 'warn'} />
                    </div>

                    {/* Reality Overlay */}
                    <AnimatePresence>
                        {hoveredChoice === 'red' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 bg-red-900/10 backdrop-blur-[2px] rounded-3xl flex items-center justify-center p-12 border border-red-500/20"
                            >
                                <div className="text-center space-y-4 max-w-sm">
                                    <AlertCircle className="w-12 h-12 text-red-400 mx-auto" />
                                    <p className="text-[14px] text-red-100 leading-relaxed font-bold">
                                        &quot;Reporting the raw truth stops the fire before it consumes the budget.&quot;
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Impact Row */}
                <div className="col-span-12 grid grid-cols-3 gap-6 pt-4 border-t border-white/5">
                    <ManagementStat
                        label="Stakeholder Trust"
                        value={hoveredChoice === 'green' ? 'Fragile' : 'Strategic'}
                        color={hoveredChoice === 'green' ? 'text-amber-400' : 'text-green-400'}
                    />
                    <ManagementStat
                        label="Crisis Management"
                        value={hoveredChoice === 'green' ? 'Reactive' : 'Proactive'}
                        color={hoveredChoice === 'green' ? 'text-red-400' : 'text-green-400'}
                    />
                    <ManagementStat
                        label="Future Budget"
                        value={hoveredChoice === 'green' ? 'At Risk' : 'Secured'}
                        color={hoveredChoice === 'green' ? 'text-amber-400' : 'text-green-400'}
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
                            <div className="flex gap-4 items-center line-clamp-2">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${hoveredChoice === 'green' ? 'bg-amber-500/20 text-amber-400' :
                                        hoveredChoice === 'red' ? 'bg-green-500/20 text-green-400' :
                                            'bg-indigo-500/20 text-indigo-400'
                                    }`}>
                                    {hoveredChoice === 'green' ? <Shield className="w-6 h-6" /> :
                                        hoveredChoice === 'red' ? <Target className="w-6 h-6" /> :
                                            <Activity className="w-6 h-6" />}
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-bold text-white mb-1">
                                        {hoveredChoice === 'green' ? "The Illusion of Progress" :
                                            hoveredChoice === 'red' ? "Strategic Honesty" :
                                                "Predictive Reporting"}
                                    </p>
                                    <p className="text-[12px] text-white/50 leading-relaxed">
                                        {hoveredChoice === 'green' ? "Reporting 'Green' while technical debt is piling up is a management failure. You win the week but lose the project. Stakeholders prefer a 'Red' status with a plan over a surprise 'Crash' at launch." :
                                            hoveredChoice === 'red' ? "Flipping to 'Red' causes a temporary storm but forces the organization to allocate resources. It's the only way to protect the 'UX Baseline' of the final product." :
                                                "A high-value manager doesn't just report status; they report 'Risk Curves.' They help stakeholders see the wall before the ship hits it."}
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

const MiniChart = ({ label, value, color }: any) => (
    <div className="text-right space-y-1">
        <p className="text-[9px] font-mono text-white/20 uppercase tracking-tighter">{label}</p>
        <div className="h-1.5 w-24 bg-white/5 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} className={`h-full ${color}`} />
        </div>
    </div>
);

const StatusPill = ({ label, status }: any) => (
    <div className={`p-3 rounded-xl border flex items-center justify-between ${status === 'done' ? 'bg-green-500/5 border-green-500/20 text-green-400' :
            status === 'warn' ? 'bg-amber-500/5 border-amber-500/20 text-amber-400' :
                'bg-red-500/5 border-red-500/20 text-red-500'
        }`}>
        <span className="text-[10px] font-bold uppercase tracking-tight">{label}</span>
        {status === 'done' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
    </div>
);

const ManagementStat = ({ label, value, color }: any) => (
    <div className="p-4 rounded-2xl border border-white/[0.03] bg-white/[0.01]">
        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className={`text-[15px] font-bold ${color}`}>{value}</p>
    </div>
);
