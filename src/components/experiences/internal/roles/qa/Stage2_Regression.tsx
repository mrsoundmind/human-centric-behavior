import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, Bug, Zap, AlertTriangle, CheckCircle2, GitBranch, RefreshCcw, Activity } from "lucide-react";

interface StageProps {
    hoveredChoice: string | null;
}

export const Stage2_Regression = ({ hoveredChoice }: StageProps) => {
    return (
        <div className="rounded-[40px] border border-white/[0.08] bg-[#0A0A0B] overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
                        <Network className="w-4 h-4 text-pink-400" />
                    </div>
                    <div>
                        <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Dependency Mapper</p>
                        <p className="text-[13px] font-bold text-white tracking-tight">System Ripple Analysis</p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 relative flex items-center justify-center bg-black/40">
                <div className="w-full h-full relative border border-white/5 rounded-3xl overflow-hidden bg-[#0F0F12]">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />

                    {/* Node Graph */}
                    <div className="relative w-full h-full flex items-center justify-center">
                        <Node label="Auth Module" x="-30%" y="-20%" status="stable" />
                        <Node label="Billing Engine" x="30%" y="-20%" status={hoveredChoice === 'hotfix' ? 'broken' : 'stable'} />
                        <Node label="Onboarding UI" x="0" y="0%" status="active" isTarget />
                        <Node label="DMS Store" x="-30%" y="25%" status={hoveredChoice === 'hotfix' ? 'broken' : 'stable'} />
                        <Node label="Email Svc" x="30%" y="25%" status={hoveredChoice === 'hotfix' ? 'broken' : 'stable'} />

                        {/* Connections */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            <Connection start={{ x: '50%', y: '40%' }} end={{ x: '35%', y: '30%' }} isBroken={hoveredChoice === 'hotfix'} />
                            <Connection start={{ x: '50%', y: '40%' }} end={{ x: '65%', y: '30%' }} isBroken={hoveredChoice === 'hotfix'} />
                            <Connection start={{ x: '50%', y: '60%' }} end={{ x: '35%', y: '75%' }} isBroken={hoveredChoice === 'hotfix'} />
                            <Connection start={{ x: '50%', y: '60%' }} end={{ x: '65%', y: '75%' }} isBroken={hoveredChoice === 'hotfix'} />
                        </svg>
                    </div>

                    {/* Simulation Message */}
                    <AnimatePresence>
                        {hoveredChoice === 'hotfix' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full border border-red-500/20 bg-red-500/10 backdrop-blur-md flex items-center gap-2"
                            >
                                <AlertTriangle className="w-3.5 h-3.5 text-red-500" />
                                <span className="text-[10px] font-bold text-red-200 uppercase tracking-widest">3 Regressions Detected!</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Reality Context Overlay */}
                <AnimatePresence>
                    {hoveredChoice && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="absolute bottom-8 left-8 right-8 p-6 rounded-3xl border border-white/10 bg-[#0F0F12] shadow-2xl"
                        >
                            <div className="flex gap-4 items-center">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${hoveredChoice === 'hotfix' ? 'bg-red-500/20 text-red-400' :
                                        hoveredChoice === 'cycles' ? 'bg-amber-500/20 text-amber-400' :
                                            'bg-green-500/20 text-green-400'
                                    }`}>
                                    {hoveredChoice === 'hotfix' ? <Activity className="w-6 h-6" /> :
                                        hoveredChoice === 'cycles' ? <GitBranch className="w-6 h-6" /> :
                                            <CheckCircle2 className="w-6 h-6" />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-white mb-1">
                                        {hoveredChoice === 'hotfix' ? "The 'Localized Fix' Delusion" :
                                            hoveredChoice === 'cycles' ? "The Regression Safety Net" :
                                                "Zero-Regression Architecture"}
                                    </p>
                                    <p className="text-[12px] text-white/50 leading-relaxed text-left">
                                        {hoveredChoice === 'hotfix' ? "Applying a fix to the UI layer without checking shared services breaks Billing and Emails. You fixed a typo but accidentally stopped the cash flow." :
                                            hoveredChoice === 'cycles' ? "By running impact cycles, you find that the 'obvious' fix in module A actually causes a data-race in module D. 8 hours of finding = 80 hours of saving." :
                                                "Spending time building automated regression suites is the only way to ship at scale. Without them, every sprint is just a dice roll on production stability."}
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

const Node = ({ label, x, y, status, isTarget }: any) => (
    <motion.div
        style={{ left: `calc(50% + ${x})`, top: `calc(50% + ${y})` }}
        className={`absolute -translate-x-1/2 -translate-y-1/2 p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-colors ${isTarget ? 'bg-blue-600/20 border-blue-500/40 z-10' :
                status === 'broken' ? 'bg-red-500/10 border-red-500/30' :
                    'bg-white/[0.03] border-white/5'
            }`}
    >
        <div className={`w-1.5 h-1.5 rounded-full ${status === 'stable' ? 'bg-green-500/50' :
                status === 'broken' ? 'bg-red-500 animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]' :
                    'bg-blue-400'
            }`} />
        <span className={`text-[9px] font-mono uppercase tracking-tighter ${status === 'broken' ? 'text-red-400' : 'text-white/40'
            }`}>{label}</span>
        {status === 'broken' && <Bug className="absolute -top-1 -right-1 w-3 h-3 text-red-500" />}
    </motion.div>
);

const Connection = ({ start, end, isBroken }: any) => (
    <motion.line
        x1={start.x} y1={start.y} x2={end.x} y2={end.y}
        stroke={isBroken ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.05)"}
        strokeWidth="1" strokeDasharray={isBroken ? "None" : "4 4"}
        animate={{ stroke: isBroken ? "rgba(239,68,68,0.5)" : "rgba(255,255,255,0.05)" }}
    />
);
