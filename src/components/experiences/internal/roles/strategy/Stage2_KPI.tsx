import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Activity, BarChart3, LineChart, Target, Zap, AlertCircle, RefreshCw } from "lucide-react";

interface StageProps {
    hoveredChoice: string | null;
}

export const Stage2_KPI = ({ hoveredChoice }: StageProps) => {
    return (
        <div className="rounded-[40px] border border-white/[0.08] bg-[#0A0A0B] overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                        <LineChart className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                        <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Impact Analytics</p>
                        <p className="text-[13px] font-bold text-white tracking-tight">Transformation Value: Quarter over Quarter</p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 grid grid-cols-12 gap-8 bg-black/20">
                {/* Main Delta Chart */}
                <div className="col-span-8 flex flex-col justify-center gap-8 px-4">
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Operational Efficiency</p>
                            <p className={`text-[12px] font-bold ${hoveredChoice === 'deep' ? 'text-green-400' : 'text-amber-400'}`}>
                                {hoveredChoice === 'deep' ? '+42% Impact' : '+5% (Local Peak)'}
                            </p>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full relative overflow-hidden">
                            <motion.div
                                initial={{ width: "5%" }}
                                animate={{ width: hoveredChoice === 'deep' ? "42%" : "5%" }}
                                className="h-full bg-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.5)]"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <KPICard label="Adoption Rate" value={hoveredChoice === 'deep' ? '94%' : '12%'} icon={Zap} color="text-indigo-400" />
                        <KPICard label="Transformation ROI" value={hoveredChoice === 'deep' ? '4.2x' : '0.8x'} icon={TrendingUp} color="text-emerald-400" />
                    </div>
                </div>

                {/* KPI Sidebar */}
                <div className="col-span-4 border-l border-white/5 pl-8 flex flex-col justify-center space-y-6">
                    <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-2">Strategy Signal</p>
                    <div className="space-y-4">
                        <SignalNode label="Tech Integration" status={hoveredChoice === 'deep' ? 'done' : 'warn'} />
                        <SignalNode label="Behavior Change" status={hoveredChoice === 'deep' ? 'done' : 'fail'} />
                        <SignalNode label="Value Realized" status={hoveredChoice === 'deep' ? 'done' : 'fail'} />
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
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${hoveredChoice === 'digital' ? 'bg-amber-500/20 text-amber-400' :
                                        hoveredChoice === 'deep' ? 'bg-green-500/20 text-green-400' :
                                            'bg-indigo-500/20 text-indigo-400'
                                    }`}>
                                    {hoveredChoice === 'digital' ? <AlertCircle className="w-6 h-6" /> :
                                        hoveredChoice === 'deep' ? <Target className="w-6 h-6" /> :
                                            <RefreshCw className="w-6 h-6" />}
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-bold text-white mb-1">
                                        {hoveredChoice === 'digital' ? "The Digital Veneer" :
                                            hoveredChoice === 'deep' ? "Systemic Rewiring" :
                                                "Transformation Audit"}
                                    </p>
                                    <p className="text-[12px] text-white/50 leading-relaxed">
                                        {hoveredChoice === 'digital' ? "Simply 'Digitalizing' an old process just makes a bad habit faster. You spend millions on software but the ROI is flat because the 'Behavior' remains legacy." :
                                            hoveredChoice === 'deep' ? "Strategic transformation involves changing the 'Unit Economics' of the workflow. You don't just fix the app; you fix the incentive structure that uses the app." :
                                                "A high-value Strategist measures success by 'Unused Potential.' If the tech is 100% stable but only 5% of users have changed their behavior, the strategy is a failure."}
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

const KPICard = ({ label, value, icon: Icon, color }: any) => (
    <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] group">
        <Icon className={`w-4 h-4 mb-3 ${color}`} />
        <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest mb-1">{label}</p>
        <p className={`text-[16px] font-bold text-white`}>{value}</p>
    </div>
);

const SignalNode = ({ label, status }: any) => (
    <div className="flex items-center gap-3">
        <div className={`w-2 h-2 rounded-full ${status === 'done' ? 'bg-green-500' :
                status === 'warn' ? 'bg-amber-500 animate-pulse' : 'bg-red-500 opacity-20'
            }`} />
        <span className={`text-[11px] font-mono uppercase tracking-tight ${status === 'fail' ? 'text-white/20' : 'text-white/60'}`}>
            {label}
        </span>
    </div>
);
