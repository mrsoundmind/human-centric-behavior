import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ArrowRight, CheckCircle2, AlertCircle, Zap, Shield, Search, Terminal } from "lucide-react";

interface StageProps {
    hoveredChoice: string | null;
}

export const Stage2_Ambiguity = ({ hoveredChoice }: StageProps) => {
    return (
        <div className="rounded-[40px] border border-white/[0.08] bg-[#0A0A0B] overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                        <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Logic Translation</p>
                        <p className="text-[13px] font-bold text-white tracking-tight">Requirement Extraction: Loan Eligibility</p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 grid grid-cols-12 gap-8 bg-black/20 relative">
                {/* Input vs Output Translation UI */}
                <div className="col-span-12 h-64 grid grid-cols-2 gap-8 items-center">
                    {/* The "Client Noise" */}
                    <div className="p-6 rounded-3xl border border-white/5 bg-white/[0.02] space-y-4">
                        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest leading-none">Client Feedback</p>
                        <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 italic text-[12px] text-red-200/60 leading-relaxed">
                            &quot;The system is too slow for our agents. They need some way to just 'know' if the merchant is good without clicking everywhere! Fix this!&quot;
                        </div>
                    </div>

                    {/* The "Logic Filter" */}
                    <div className="relative group">
                        <div className="p-6 rounded-3xl border border-blue-500/20 bg-blue-500/5 min-h-[140px] flex flex-col justify-center">
                            <AnimatePresence mode="wait">
                                {hoveredChoice === 'translate' ? (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                        className="space-y-3 font-mono"
                                    >
                                        <p className="text-[11px] text-blue-400 font-bold tracking-tighter uppercase">Parsed Logic:</p>
                                        <div className="space-y-1 text-[10px] text-blue-200/60">
                                            <p>• IF merchant_credit_score &gt; 700</p>
                                            <p>• AND merchant_vintage &gt; 2yr</p>
                                            <p>• THEN flag = 'PRE_APPROVED'</p>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="text-center space-y-2 opacity-20"
                                    >
                                        <Search className="w-8 h-8 mx-auto text-white" />
                                        <p className="text-[10px] font-bold uppercase tracking-widest">Waiting for Translation</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                        <div className="absolute -left-4 top-1/2 -translate-y-1/2 bg-white/10 w-8 h-8 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md">
                            <ArrowRight className="w-4 h-4 text-white" />
                        </div>
                    </div>
                </div>

                {/* Analysis Stats Row */}
                <div className="col-span-12 grid grid-cols-3 gap-6 pt-4 border-t border-white/5">
                    <BAStat label="Signal to Noise" value={hoveredChoice === 'translate' ? '100%' : '5%'} color={hoveredChoice === 'translate' ? 'text-blue-400' : 'text-red-400'} />
                    <BAStat label="Dev Clarity" value={hoveredChoice === 'translate' ? 'Absolute' : 'Confused'} color={hoveredChoice === 'translate' ? 'text-green-400' : 'text-amber-400'} />
                    <BAStat label="Technical Risk" value={hoveredChoice === 'translate' ? 'Low' : 'Extreme'} color={hoveredChoice === 'translate' ? 'text-indigo-400' : 'text-red-400'} />
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
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${hoveredChoice === 'pass' ? 'bg-red-500/20 text-red-400' :
                                        hoveredChoice === 'translate' ? 'bg-blue-500/20 text-blue-400' :
                                            'bg-indigo-500/20 text-indigo-400'
                                    }`}>
                                    {hoveredChoice === 'pass' ? <AlertCircle className="w-6 h-6" /> :
                                        hoveredChoice === 'translate' ? <Terminal className="w-6 h-6" /> :
                                            <Shield className="w-6 h-6" />}
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-bold text-white mb-1">
                                        {hoveredChoice === 'pass' ? "The 'Messenger' Error" :
                                            hoveredChoice === 'translate' ? "The Logic Architect" :
                                                "Ambiguity Filtering"}
                                    </p>
                                    <p className="text-[12px] text-white/50 leading-relaxed text-left">
                                        {hoveredChoice === 'pass' ? "Passing raw client complaints to Developers creates chaos. Devs don't know what to 'Fix,' so they build a random feature that doesn't solve the root problem. You become a bottleneck of noise." :
                                            hoveredChoice === 'translate' ? "A great BA hears 'Help me' and writes 'Pre-approval Logic.' By translating emotion into structured rules, you give the Engineering team a target they can actually hit. You protect the 'Dev Capacity' from waste." :
                                                "Requirements aren't 'found'; they are 'designed.' If you aren't defining the logic, you aren't doing BA work; you're just taking dictation."}
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

const BAStat = ({ label, value, color }: any) => (
    <div className="p-4 rounded-2xl border border-white/[0.03] bg-white/[0.01]">
        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className={`text-[15px] font-bold ${color}`}>{value}</p>
    </div>
);
