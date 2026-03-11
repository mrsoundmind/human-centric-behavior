import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, AlertTriangle, CheckCircle2, XCircle, Info, TrendingDown, Users } from "lucide-react";

interface Stage1Props {
    hoveredChoice: string | null;
}

export const Stage1_Timeline = ({ hoveredChoice }: Stage1Props) => {
    return (
        <div className="rounded-[40px] border border-white/[0.08] bg-[#0A0A0B] overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
            {/* Header / Toolbar */}
            <div className="px-8 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Calendar className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                        <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Product Roadmap</p>
                        <p className="text-[13px] font-bold text-white tracking-tight">AI Reconciliation Launch • Q1</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0A0A0B] bg-white/10" />
                        ))}
                    </div>
                    <span className="text-[10px] font-mono text-white/20">3 Contributors</span>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 overflow-hidden relative">
                {/* Timeline Grid */}
                <div className="absolute inset-0 p-8 pt-16">
                    <div className="h-full w-full border-l border-b border-white/5 relative">
                        {/* Week Markers */}
                        <div className="absolute -top-8 left-0 right-0 flex justify-between text-[10px] font-mono text-white/10 uppercase tracking-tighter">
                            <span>Week 01</span>
                            <span className="text-white/20">Week 03 (Launch)</span>
                            <span>Week 10 (Target)</span>
                        </div>

                        {/* Vertical Grid Lines */}
                        <div className="absolute top-0 bottom-0 left-[30%] w-px bg-white/10 dashed" />
                        <div className="absolute top-0 bottom-0 left-[100%] w-px bg-white/5 dashed" />
                    </div>
                </div>

                {/* Task Bars */}
                <div className="relative z-10 space-y-4 pt-4">
                    <TimelineTask
                        label="AI Parsing Engine"
                        weeks={4}
                        status="at-risk"
                        isImpacted={hoveredChoice === 'cut'}
                        impactLabel="Compressed to 3w (67% accuracy)"
                    />
                    <TimelineTask
                        label="Enterprise Reconcile Logic"
                        weeks={3}
                        status="delayed"
                        isImpacted={hoveredChoice === 'cut'}
                        impactLabel="Features dropped for MVP"
                    />
                    <TimelineTask
                        label="ERP / SAP Integration"
                        weeks={2}
                        status="blocked"
                        isImpacted={hoveredChoice === 'cut'}
                        impactLabel="De-scoped from launch"
                    />
                    <TimelineTask
                        label="Final UAT & Edge Cases"
                        weeks={1}
                        status="pending"
                        isImpacted={hoveredChoice === 'cut'}
                        impactLabel="No edge case coverage"
                    />
                </div>

                {/* Reality Overlay */}
                <AnimatePresence>
                    {hoveredChoice && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-8 left-8 right-8 p-6 rounded-3xl border border-white/10 bg-[#0F0F12]/90 backdrop-blur-md shadow-2xl"
                        >
                            <div className="flex gap-4 items-start">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${hoveredChoice === 'cut' ? 'bg-red-500/20 text-red-400' :
                                        hoveredChoice === 'cover' ? 'bg-amber-500/20 text-amber-400' :
                                            'bg-green-500/20 text-green-400'
                                    }`}>
                                    {hoveredChoice === 'cut' ? <AlertTriangle className="w-5 h-5" /> :
                                        hoveredChoice === 'cover' ? <Info className="w-5 h-5" /> :
                                            <Zap className="w-5 h-5" />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-[14px] font-bold text-white mb-1">
                                        {hoveredChoice === 'cut' ? "The 'Ship at all costs' Ripple" :
                                            hoveredChoice === 'cover' ? "The 'Information Silo' Risk" :
                                                "The 'Strategic Alignment' Gain"}
                                    </p>
                                    <p className="text-[12px] text-white/50 leading-relaxed">
                                        {hoveredChoice === 'cut' ? "Engineering bypasses 27% of accuracy checks. You hit the date, but the dashboard will show broken data to 1 in 3 users." :
                                            hoveredChoice === 'cover' ? "Client relationship is safe, but CTO loses leverage with the board. The same timeline crash will happen next launch." :
                                                "You convert a 'bad news' event into a quality milestone. CTO joins the calls, reinforcing trust despite the delay."}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <MetricBadge label="Trust" value={hoveredChoice === 'brief' ? '+20' : '-10'} color={hoveredChoice === 'brief' ? 'text-green-400' : 'text-red-400'} />
                                    <MetricBadge label="Accuracy" value={hoveredChoice === 'cut' ? '67%' : '94%'} color={hoveredChoice === 'cut' ? 'text-red-400' : 'text-green-400'} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Footer Metrics */}
            <div className="px-8 py-5 border-t border-white/[0.05] grid grid-cols-3 gap-8 bg-white/[0.01]">
                <MiniMetric icon={AlertTriangle} label="Resource Gap" value="7 Weeks" color="text-red-400" />
                <MiniMetric icon={Users} label="Client Risk" value="High" color="text-amber-400" />
                <MiniMetric icon={TrendingDown} label="Baseline Accuracy" value="91%" color="text-white/40" />
            </div>
        </div>
    );
};

const TimelineTask = ({ label, weeks, status, isImpacted, impactLabel }: any) => (
    <div className="flex items-center gap-4">
        <div className="w-32 shrink-0">
            <p className="text-[11px] font-medium text-white/60 truncate">{label}</p>
        </div>
        <div className="flex-1 h-8 bg-white/[0.03] rounded-md relative overflow-hidden flex items-center px-4">
            <motion.div
                className={`absolute left-0 top-0 bottom-0 rounded-md transition-colors duration-500 ${isImpacted ? 'bg-red-500/20' : 'bg-blue-500/10'
                    }`}
                animate={{ width: isImpacted ? '30%' : `${weeks * 10}%` }}
                initial={{ width: `${weeks * 10}%` }}
            />
            <div className="relative z-10 flex items-center justify-between w-full">
                <span className="text-[10px] font-mono text-white/40">{weeks}w Est.</span>
                <AnimatePresence>
                    {isImpacted && (
                        <motion.span
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-[10px] font-mono text-red-400 truncate ml-4"
                        >
                            ⚠ {impactLabel}
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
        </div>
    </div>
);

const MiniMetric = ({ icon: Icon, label, value, color }: any) => (
    <div className="flex items-center gap-3">
        <Icon className={`w-3.5 h-3.5 ${color}`} />
        <div>
            <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest leading-none mb-1">{label}</p>
            <p className={`text-[12px] font-bold ${color}`}>{value}</p>
        </div>
    </div>
);

const MetricBadge = ({ label, value, color }: any) => (
    <div className="flex items-center gap-2 px-2 py-1 rounded-md bg-white/[0.03] border border-white/5">
        <span className="text-[9px] font-mono text-white/20 uppercase">{label}</span>
        <span className={`text-[10px] font-mono font-bold ${color}`}>{value}</span>
    </div>
);
