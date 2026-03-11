import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MousePointer2, MessageCircle, BarChart3, Target, Sparkles, AlertCircle, Quote, TrendingUp } from "lucide-react";

interface StageProps {
    hoveredChoice: string | null;
}

export const Stage3_Feedback = ({ hoveredChoice }: StageProps) => {
    return (
        <div className="rounded-[40px] border border-white/[0.08] bg-[#0A0A0B] overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Feedback Loop</p>
                        <p className="text-[13px] font-bold text-white tracking-tight">Client Review: Dashboard v2</p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 grid grid-cols-12 gap-8 bg-black/20">
                {/* Product/Design Canvas */}
                <div className="col-span-12 h-64 relative rounded-3xl border border-white/5 bg-[#16161A] overflow-hidden group">
                    <div className="absolute inset-0 p-8 flex flex-col justify-center items-center">
                        <div className="w-full max-w-lg flex flex-col gap-4">
                            <div className="h-4 w-32 bg-white/5 rounded" />
                            <div className="grid grid-cols-3 gap-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-24 rounded-2xl bg-white/[0.03] border border-white/5 flex flex-col p-4 justify-between">
                                        <div className="w-full h-2 bg-white/5 rounded" />
                                        <div className="w-2/3 h-2 bg-white/5 rounded" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Feedback Comments (Floating) */}
                    <AnimatePresence>
                        {hoveredChoice === 'accept' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                                className="absolute top-12 right-12 p-3 rounded-xl bg-red-600 border border-red-400 shadow-2xl z-20 pointer-events-none"
                            >
                                <div className="flex gap-2 items-start">
                                    <Quote className="w-3 h-3 text-red-100" />
                                    <p className="text-[10px] text-white font-medium leading-tight">
                                        &quot;Can we make the background 'pop' more? Maybe a bright gradient?&quot;
                                    </p>
                                </div>
                            </motion.div>
                        )}
                        {hoveredChoice === 'ground' && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                                className="absolute top-12 left-12 p-4 rounded-xl bg-emerald-600 border border-emerald-400 shadow-2xl z-20 pointer-events-none max-w-[200px]"
                            >
                                <div className="flex gap-2 items-start">
                                    <BarChart3 className="w-4 h-4 text-emerald-100" />
                                    <div>
                                        <p className="text-[10px] text-white font-bold uppercase mb-1">User Insight</p>
                                        <p className="text-[10px] text-emerald-50 text-left leading-tight">
                                            Test data reveals 80% of users are using this in bright sunlight. High contrast accessibility is mandatory.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Feedback Metrics Row */}
                <div className="col-span-12 grid grid-cols-3 gap-6 pt-4 border-t border-white/5">
                    <DesignerStat
                        label="Contrast Ratio"
                        value={hoveredChoice === 'accept' ? '1.4:1' : '15.2:1'}
                        status={hoveredChoice === 'accept' ? 'fail' : 'pass'}
                    />
                    <DesignerStat
                        label="User Trust"
                        value={hoveredChoice === 'accept' ? 'Low' : 'High'}
                        status={hoveredChoice === 'accept' ? 'fail' : 'pass'}
                    />
                    <DesignerStat
                        label="Approval Logic"
                        value={hoveredChoice === 'accept' ? 'Subjective' : 'Data-Driven'}
                        status={hoveredChoice === 'accept' ? 'fail' : 'pass'}
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
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${hoveredChoice === 'accept' ? 'bg-red-500/20 text-red-400' :
                                        hoveredChoice === 'ground' ? 'bg-emerald-500/20 text-emerald-400' :
                                            'bg-indigo-500/20 text-indigo-400'
                                    }`}>
                                    {hoveredChoice === 'accept' ? <AlertTriangle className="w-6 h-6" /> :
                                        hoveredChoice === 'ground' ? <Target className="w-6 h-6" /> :
                                            <Sparkles className="w-6 h-6" />}
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-bold text-white mb-1">
                                        {hoveredChoice === 'accept' ? "The 'Yes-Man' Designer" :
                                            hoveredChoice === 'ground' ? "Evidence-Based Design" :
                                                "Strategic Partnership"}
                                    </p>
                                    <p className="text-[12px] text-white/50 leading-relaxed">
                                        {hoveredChoice === 'accept' ? "Accepting subjective feedback just to 'please the client' always results in a worse product. You've traded user accessibility for a moment of political peace." :
                                            hoveredChoice === 'ground' ? "Grounding your push-back in User Data and Accessibility removes the 'Subjective Clash.' You're no longer arguing about taste; you're arguing for performance." :
                                                "A high-value Designer doesn't just draw; they guide. When you use data to protect the vision, the client stops seeing you as a vendor and starts seeing you as an expert."}
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

const DesignerStat = ({ label, value, status }: any) => (
    <div className="p-4 rounded-2xl border border-white/[0.03] bg-white/[0.01] flex items-center justify-between group">
        <div>
            <p className="text-[9px] font-mono text-white/20 uppercase tracking-tighter leading-none mb-1">{label}</p>
            <p className={`text-[12px] font-bold ${status === 'fail' ? 'text-red-400' : 'text-emerald-400'}`}>{value}</p>
        </div>
        <div className={`w-1 h-1 rounded-full ${status === 'fail' ? 'bg-red-500' : 'bg-emerald-500'}`} />
    </div>
);
