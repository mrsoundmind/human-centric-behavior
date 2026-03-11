import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, MessageCircle, ArrowRight, Brain, Zap, Target, AlertTriangle, CheckCircle2 } from "lucide-react";

interface StageProps {
    hoveredChoice: string | null;
}

export const Stage2_Filter = ({ hoveredChoice }: StageProps) => {
    return (
        <div className="rounded-[40px] border border-white/[0.08] bg-[#0A0A0B] overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <Filter className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Feedback Intelligence</p>
                        <p className="text-[13px] font-bold text-white tracking-tight">Signal vs Noise Analyzer</p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 relative flex items-center justify-center">
                <div className="w-full h-full grid grid-cols-2 gap-12">
                    {/* Left: Input Noise */}
                    <div className="space-y-4">
                        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-4">Input: Client Transcript</p>
                        <FeedbackCard
                            text="&quot;Our team is frustrated. The login is slow. We need that Google Sheets thing yesterday!&quot;"
                            intensity="high"
                            isActive={hoveredChoice === 'forward' || hoveredChoice === 'distill'}
                        />
                        <FeedbackCard
                            text="&quot;Why is the GST field so strict? It rejects our valid PDF formats.&quot;"
                            intensity="med"
                            isActive={hoveredChoice === 'distill' || hoveredChoice === 'forward'}
                        />
                    </div>

                    {/* Right: Output Signal */}
                    <div className="relative">
                        <div className="absolute inset-0 border border-white/5 rounded-3xl bg-white/[0.01] flex flex-col items-center justify-center p-8 text-center overscroll-contain">
                            <AnimatePresence mode="wait">
                                {hoveredChoice === 'distill' ? (
                                    <motion.div
                                        key="distill"
                                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                        className="space-y-6 w-full"
                                    >
                                        <div className="w-16 h-16 rounded-3xl bg-emerald-500/20 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                                            <Brain className="w-8 h-8 text-emerald-400" />
                                        </div>
                                        <div className="space-y-4 text-left">
                                            <SignalItem label="Feature" value="Generalized Export Engine" icon={Target} />
                                            <SignalItem label="Priority" value="P0: GST Validation Logic" icon={Zap} />
                                            <SignalItem label="Sentiment" value="Managed Friction" icon={CheckCircle2} />
                                        </div>
                                    </motion.div>
                                ) : hoveredChoice === 'forward' ? (
                                    <motion.div
                                        key="forward"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="space-y-4 w-full"
                                    >
                                        <div className="w-16 h-16 rounded-3xl bg-red-500/10 flex items-center justify-center mx-auto">
                                            <AlertTriangle className="w-8 h-8 text-red-400" />
                                        </div>
                                        <p className="text-[14px] font-bold text-red-200 uppercase tracking-tighter">Raw Noise Leak</p>
                                        <p className="text-[12px] text-white/40 leading-relaxed italic">
                                            "Engineering refuses to read the 40-page chat log. Prioritization failed."
                                        </p>
                                    </motion.div>
                                ) : (
                                    <div className="space-y-4 opacity-10 grayscale">
                                        <MessageCircle className="w-12 h-12 text-white mx-auto" />
                                        <p className="text-[12px] text-white">Select processing algorithm...</p>
                                    </div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Connecting Arrows */}
                        <AnimatePresence>
                            {hoveredChoice === 'distill' && (
                                <motion.div
                                    initial={{ width: 0 }} animate={{ width: 60 }}
                                    className="absolute -left-12 top-1/2 -translate-y-1/2 h-1 overflow-visible"
                                >
                                    <ArrowRight className="text-emerald-500/50 w-full" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Reality Context Overlay */}
                <AnimatePresence>
                    {hoveredChoice && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="absolute bottom-4 left-4 right-4 p-6 rounded-3xl border border-white/10 bg-[#0F0F12]/95 backdrop-blur-md shadow-2xl z-20"
                        >
                            <div className="flex gap-4 items-center line-clamp-2">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${hoveredChoice === 'distill' ? 'bg-emerald-500/20 text-emerald-400' :
                                        hoveredChoice === 'forward' ? 'bg-red-500/20 text-red-400' :
                                            'bg-amber-500/20 text-amber-400'
                                    }`}>
                                    {hoveredChoice === 'distill' ? <Brain className="w-6 h-6" /> :
                                        hoveredChoice === 'forward' ? <AlertTriangle className="w-6 h-6" /> :
                                            <MessageCircle className="w-6 h-6" />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-white mb-1">
                                        {hoveredChoice === 'distill' ? "Strategic Translation" :
                                            hoveredChoice === 'forward' ? "The Emotional Payload" :
                                                "The 'Silent Account' Risk"}
                                    </p>
                                    <p className="text-[12px] text-white/50 leading-relaxed text-left">
                                        {hoveredChoice === 'distill' ? "Translating 'Frustration' into 'Workflow Gap' makes you the PM's best ally. You separate the client's emotional volume from their technical need." :
                                            hoveredChoice === 'forward' ? "Forwarding raw complaints overwhelms Devs and causes internal friction. They stop listening to you, and the client feels ignored." :
                                                "Saying 'Nothing new' leads to Renewal Blindness. Silent clients are the most likely to churn. You need to pro-actively mine for friction."}
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

const FeedbackCard = ({ text, intensity, isActive }: any) => (
    <motion.div
        animate={{ opacity: isActive ? 1 : 0.3, x: isActive ? 10 : 0 }}
        className="p-4 rounded-2xl border border-white/5 bg-white/[0.02] relative"
    >
        <p className="text-[12px] text-white/60 leading-relaxed font-serif italic">{text}</p>
        <div className={`mt-3 h-1 w-12 rounded-full ${intensity === 'high' ? 'bg-red-500/40' : 'bg-amber-500/40'}`} />
    </motion.div>
);

const SignalItem = ({ label, value, icon: Icon }: any) => (
    <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
            <Icon className="w-4 h-4 text-emerald-400" />
        </div>
        <div>
            <p className="text-[9px] font-mono text-white/20 uppercase leading-none mb-1">{label}</p>
            <p className="text-[13px] font-bold text-white">{value}</p>
        </div>
    </div>
);
