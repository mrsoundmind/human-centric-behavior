import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Search, UserCheck, Shield, Zap, Target, TrendingUp, AlertTriangle } from "lucide-react";

interface StageProps {
    hoveredChoice: string | null;
}

export const Stage3_Report = ({ hoveredChoice }: StageProps) => {
    return (
        <div className="rounded-[40px] border border-white/[0.08] bg-[#0A0A0B] overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
                        <FileText className="w-4 h-4 text-pink-400" />
                    </div>
                    <div>
                        <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Executive Summary</p>
                        <p className="text-[13px] font-bold text-white tracking-tight">Post-Pilot Transformation Audit</p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 grid grid-cols-12 gap-8 bg-black/20 relative overflow-hidden">
                {/* Document Mockup */}
                <div className="col-span-12 h-64 rounded-3xl border border-white/5 bg-white/[0.01] p-12 relative flex flex-col justify-center overflow-hidden">
                    <div className="max-w-2xl mx-auto w-full space-y-6">
                        <div className="h-4 w-48 bg-white/10 rounded" />

                        <div className="space-y-3">
                            <SkeletonLine width="100%" />
                            <SkeletonLine width="90%" />
                            <SkeletonLine width="95%" />
                        </div>

                        {/* Interactive Highlight */}
                        <AnimatePresence mode="wait">
                            {hoveredChoice === 'insight' ? (
                                <motion.div
                                    key="insight"
                                    initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
                                    className="p-6 rounded-2xl bg-indigo-600 shadow-2xl border border-indigo-400 relative z-10"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <p className="text-[11px] font-bold text-indigo-100 uppercase tracking-widest flex items-center gap-2">
                                            <Target className="w-3 h-3" /> Flash Insight
                                        </p>
                                        <div className="px-2 py-0.5 rounded bg-white/20 text-white text-[9px] font-bold">CRITICAL</div>
                                    </div>
                                    <p className="text-[14px] font-bold text-white leading-tight">
                                        Adoption is high, but 40% of users are skipping the 'Verification' step.
                                    </p>
                                </motion.div>
                            ) : hoveredChoice === 'data' ? (
                                <motion.div
                                    key="data"
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="p-4 border border-white/10 bg-white/[0.05] rounded-2xl"
                                >
                                    <div className="grid grid-cols-4 gap-4">
                                        {[1, 2, 3, 4].map(i => <div key={i} className="h-12 rounded bg-white/5 border border-white/5" />)}
                                    </div>
                                    <p className="mt-3 text-[10px] text-white/20 font-mono text-center">Data Table Extracted (422 Rows)</p>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Impact Row */}
                <div className="col-span-12 grid grid-cols-3 gap-6 pt-4 border-t border-white/5">
                    <ReportStat label="Executive Attention" value={hoveredChoice === 'insight' ? 'High' : 'Low'} color={hoveredChoice === 'insight' ? 'text-pink-400' : 'text-white/40'} />
                    <ReportStat label="Decision Speed" value={hoveredChoice === 'insight' ? 'Immediate' : 'Delayed'} color={hoveredChoice === 'insight' ? 'text-green-400' : 'text-amber-400'} />
                    <ReportStat label="Strategic Clarity" value={hoveredChoice === 'insight' ? 'High' : 'Low'} color={hoveredChoice === 'insight' ? 'text-indigo-400' : 'text-white/40'} />
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
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${hoveredChoice === 'data' ? 'bg-amber-500/20 text-amber-400' :
                                        hoveredChoice === 'insight' ? 'bg-pink-500/20 text-pink-400' :
                                            'bg-indigo-500/20 text-indigo-400'
                                    }`}>
                                    {hoveredChoice === 'data' ? <AlertTriangle className="w-6 h-6" /> :
                                        hoveredChoice === 'insight' ? <Zap className="w-6 h-6" /> :
                                            <UserCheck className="w-6 h-6" />}
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-bold text-white mb-1">
                                        {hoveredChoice === 'data' ? "The Data Dumping Error" :
                                            hoveredChoice === 'insight' ? "The Executive Liaison" :
                                                "Predictive Reporting"}
                                    </p>
                                    <p className="text-[12px] text-white/50 leading-relaxed text-left">
                                        {hoveredChoice === 'data' ? "Presenting raw metrics without a 'Story' leads to analysis paralysis. Executives will nod, but no decision will be made. You become an expensive data-fetcher." :
                                            hoveredChoice === 'insight' ? "A great Strategist highlights the 'Failure in Success.' By showing where adoption is high but value is low, you force a decision on resource allocation today." :
                                                "Reports shouldn't just summarize the past; they should 'Trigger' the future. If your report doesn't contain a 'Next Action,' it's just a history lesson."}
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

const SkeletonLine = ({ width }: any) => (
    <div className="h-2 bg-white/5 rounded-full" style={{ width }} />
);

const ReportStat = ({ label, value, color }: any) => (
    <div className="p-4 rounded-2xl border border-white/[0.03] bg-white/[0.01]">
        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className={`text-[15px] font-bold ${color}`}>{value}</p>
    </div>
);
