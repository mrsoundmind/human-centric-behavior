import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, Palette, MousePointer2, Zap, AlertTriangle, Layers, Type, Focus } from "lucide-react";

interface StageProps {
    hoveredChoice: string | null;
}

export const Stage1_LocalPeak = ({ hoveredChoice }: StageProps) => {
    return (
        <div className="rounded-[40px] border border-white/[0.08] bg-[#0A0A0B] overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-pink-500/10 flex items-center justify-center">
                        <Layout className="w-4 h-4 text-pink-400" />
                    </div>
                    <div>
                        <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Canvas Viewport</p>
                        <p className="text-[13px] font-bold text-white tracking-tight">Onboarding Screen Revision (v4.2)</p>
                    </div>
                </div>
            </div>

            {/* Content Area - The "Canvas" */}
            <div className="flex-1 p-8 grid grid-cols-12 gap-8 bg-black/40 relative">
                {/* Main UI Mockup */}
                <div className="col-span-8 flex items-center justify-center relative">
                    <div className="w-full max-w-sm aspect-[3/4] rounded-3xl border border-white/10 bg-[#16161A] shadow-2xl overflow-hidden relative group">
                        {/* Mock App Content */}
                        <div className="p-6 space-y-6">
                            <div className="flex justify-between items-center h-4">
                                <div className="w-12 h-2 bg-white/5 rounded" />
                                <div className="w-4 h-4 rounded-full bg-white/5" />
                            </div>

                            <div className="space-y-2">
                                <div className="w-32 h-4 bg-white/10 rounded" />
                                <div className="w-full h-2 bg-white/5 rounded" />
                                <div className="w-2/3 h-2 bg-white/5 rounded" />
                            </div>

                            {/* The "Conflict" Component */}
                            <motion.div
                                animate={{
                                    scale: hoveredChoice === 'fix' ? 1.05 : 1,
                                    borderColor: hoveredChoice === 'fix' ? "rgba(236,72,153,0.5)" : "rgba(255,255,255,0.05)"
                                }}
                                className="p-5 rounded-2xl border bg-white/[0.02] space-y-3 relative"
                            >
                                <div className="flex justify-between">
                                    <div className="w-20 h-3 bg-white/10 rounded" />
                                    <AnimatePresence>
                                        {hoveredChoice === 'fix' && (
                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                                <Zap className="w-3 h-3 text-pink-400 fill-pink-400" />
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                                <div className="w-full h-8 rounded-lg bg-pink-500/10 border border-pink-500/20 flex items-center px-3">
                                    <span className="text-[10px] font-bold text-pink-400 italic">Submit Details</span>
                                </div>

                                {hoveredChoice === 'fix' && (
                                    <motion.div
                                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                        className="absolute -right-8 top-1/2 -translate-y-1/2 w-48 p-3 rounded-xl bg-pink-600 border border-pink-400 shadow-2xl z-20"
                                    >
                                        <p className="text-[10px] font-bold text-white uppercase mb-1 flex items-center gap-1">
                                            <Focus className="w-3 h-3" /> Visual Peak
                                        </p>
                                        <p className="text-[9px] text-pink-100 leading-tight">Applied 12px border radius just to this button. Inconsistent with global 8px system.</p>
                                    </motion.div>
                                )}
                            </motion.div>

                            <div className="grid grid-cols-2 gap-3 pt-4">
                                <div className="h-10 rounded-xl bg-white/5 border border-white/5" />
                                <div className="h-10 rounded-xl bg-white/5 border border-white/5" />
                            </div>
                        </div>

                        {/* Overlay Indicators */}
                        <div className="absolute inset-0 border-2 border-transparent pointer-events-none group-hover:border-white/5 rounded-3xl" />
                    </div>
                </div>

                {/* System Specs Column */}
                <div className="col-span-4 space-y-4">
                    <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-4">Design Tokens</p>
                    <TokenRow label="Global Radius" value="8px" status="locked" />
                    <TokenRow label="Accent Palette" value="Indigo-600" status="locked" />
                    <TokenRow
                        label="Component Delta"
                        value={hoveredChoice === 'fix' ? 'CRITICAL' : '0.0'}
                        status={hoveredChoice === 'fix' ? 'at-risk' : 'stable'}
                    />

                    <div className="pt-8 border-t border-white/5">
                        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-4">System Impact</p>
                        <AnimatePresence mode="wait">
                            {hoveredChoice ? (
                                <motion.div
                                    key={hoveredChoice}
                                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                    className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]"
                                >
                                    <p className="text-[12px] text-white/50 leading-relaxed italic">
                                        {hoveredChoice === 'fix' ? "Fixing the visual friction for one client creates a 'Local Peak.' Maintenance cost for future screens triples." :
                                            hoveredChoice === 'educate' ? "Explaining why 8px is the 'System Standard' protects the app's Coherent Experience. Client trusts you as a leader, not just a tool." :
                                                "Aligning the request with an existing pattern might take 5 mins more, but prevents the 'Frankenstein UI' effect."}
                                    </p>
                                </motion.div>
                            ) : (
                                <div className="opacity-10 p-4 border border-dashed border-white/10 rounded-2xl text-[11px] font-mono italic">Select design approach...</div>
                            )}
                        </AnimatePresence>
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
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${hoveredChoice === 'fix' ? 'bg-red-500/20 text-red-400' :
                                        hoveredChoice === 'educate' ? 'bg-green-500/20 text-green-400' :
                                            'bg-indigo-500/20 text-indigo-400'
                                    }`}>
                                    {hoveredChoice === 'fix' ? <AlertTriangle className="w-6 h-6" /> :
                                        hoveredChoice === 'educate' ? <Type className="w-6 h-6" /> :
                                            <Layers className="w-6 h-6" />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-white mb-1">
                                        {hoveredChoice === 'fix' ? "The Local Peak Trap" :
                                            hoveredChoice === 'educate' ? "The Strategic Liaison" :
                                                "Design System Stewardship"}
                                    </p>
                                    <p className="text-[12px] text-white/50 leading-relaxed text-left">
                                        {hoveredChoice === 'fix' ? "Solving localized UI pain by breaking global rules leads to a product that 'feels broken' despite being beautiful. It adds hidden cognitive load for users." :
                                            hoveredChoice === 'educate' ? "Your role is to translate 'Visual Preference' into 'Systemic Value.' Educating the client on consistency builds long-term authority." :
                                                "A Design System is a contract between Design and Dev. Every 'one-off' fix is a breach of that contract that Devs will eventually pay for in effort."}
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

const TokenRow = ({ label, value, status }: any) => (
    <div className="p-4 rounded-2xl border border-white/[0.03] bg-white/[0.01] flex items-center justify-between group">
        <div>
            <p className="text-[9px] font-mono text-white/20 uppercase tracking-tighter leading-none mb-1">{label}</p>
            <p className={`text-[12px] font-bold ${status === 'at-risk' ? 'text-pink-400' : 'text-white'}`}>{value}</p>
        </div>
        <div className={`w-1.5 h-1.5 rounded-full ${status === 'locked' ? 'bg-white/20' :
                status === 'at-risk' ? 'bg-pink-500 animate-pulse' : 'bg-green-500/40'
            }`} />
    </div>
);
