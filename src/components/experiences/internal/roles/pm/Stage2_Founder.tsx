import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileSpreadsheet, Layers, Users, Zap, AlertTriangle, CheckCircle2, Search } from "lucide-react";

interface Stage2Props {
    hoveredChoice: string | null;
}

export const Stage2_Founder = ({ hoveredChoice }: Stage2Props) => {
    return (
        <div className="rounded-[40px] border border-white/[0.08] bg-[#0A0A0B] overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <Layers className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                        <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Backlog Analysis</p>
                        <p className="text-[13px] font-bold text-white tracking-tight">Requirement Abstraction View</p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 relative flex flex-col">
                <div className="grid grid-cols-2 gap-8 flex-1">
                    {/* Left: Format Sprawl Visualizer */}
                    <div className="space-y-4">
                        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-4">Current Requests</p>
                        <RequestCard
                            client="Bengaluru EdTech"
                            request="Google Sheets Export"
                            isActive={hoveredChoice === 'build' || hoveredChoice === 'abstract'}
                            isResolved={hoveredChoice === 'abstract'}
                        />
                        <RequestCard
                            client="Delhi FinTech"
                            request="CSV Automated Sync"
                            isActive={hoveredChoice === 'abstract'}
                            isResolved={hoveredChoice === 'abstract'}
                        />
                        <RequestCard
                            client="Chennai Retail"
                            request="PDF Performance Recap"
                            isActive={hoveredChoice === 'abstract'}
                            isResolved={hoveredChoice === 'abstract'}
                        />

                        <AnimatePresence>
                            {hoveredChoice === 'build' && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                                    className="p-4 rounded-2xl border border-red-500/20 bg-red-500/5 mt-6"
                                >
                                    <div className="flex gap-3">
                                        <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-1" />
                                        <p className="text-[12px] text-red-200/70 leading-relaxed">
                                            Building specific formats creates <span className="text-red-400 font-bold">Format Sprawl</span>.
                                            Maintenance cost increases by 30% per format added.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Right: Solution Architecture */}
                    <div className="relative">
                        <div className="absolute inset-0 border border-white/5 rounded-3xl bg-white/[0.01] flex flex-col items-center justify-center p-8 text-center">
                            <AnimatePresence mode="wait">
                                {hoveredChoice === 'abstract' ? (
                                    <motion.div
                                        key="abstract"
                                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                                        className="space-y-6"
                                    >
                                        <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                                            <Zap className="w-8 h-8 text-green-400" />
                                        </div>
                                        <div>
                                            <p className="text-[16px] font-bold text-white mb-2">Internal "Share Link" Engine</p>
                                            <p className="text-[12px] text-white/50 leading-relaxed">
                                                One feature solves 4 different requests. Minimal maintenance, maximum reach.
                                            </p>
                                        </div>
                                        <div className="flex justify-center gap-2">
                                            <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-[10px] text-green-400 font-mono">2 Sprints</div>
                                            <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] text-blue-400 font-mono">General Availability</div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="default"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="space-y-4 opacity-30 grayscale"
                                    >
                                        <Search className="w-12 h-12 text-white/20 mx-auto" />
                                        <p className="text-[12px] text-white/40">Looking for the "Pattern Under the Request"</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Connecting Lines (Simulated) */}
                        {hoveredChoice === 'abstract' && (
                            <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                                <motion.path
                                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                                    d="M-40,80 L80,180 M-40,140 L80,200 M-40,200 L80,220"
                                    stroke="rgba(34,197,94,0.3)" strokeWidth="1" fill="none"
                                />
                            </svg>
                        )}
                    </div>
                </div>

                {/* Hover Feedback Overlay */}
                <AnimatePresence>
                    {hoveredChoice && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            className="mt-8 p-6 rounded-3xl border border-white/10 bg-[#0F0F12] shadow-2xl"
                        >
                            <div className="flex gap-4 items-center">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${hoveredChoice === 'abstract' ? 'bg-green-500/20 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.15)]' :
                                        hoveredChoice === 'build' ? 'bg-amber-500/20 text-amber-400' :
                                            'bg-red-500/20 text-red-400'
                                    }`}>
                                    {hoveredChoice === 'abstract' ? <Zap className="w-6 h-6" /> :
                                        hoveredChoice === 'build' ? <AlertTriangle className="w-6 h-6" /> :
                                            <XCircle className="w-6 h-6" />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-white mb-1">
                                        {hoveredChoice === 'abstract' ? "Finding the Job-to-be-Done" :
                                            hoveredChoice === 'build' ? "Reactive Roadmap Mode" :
                                                "Vision Boundary Maintenance"}
                                    </p>
                                    <p className="text-[12px] text-white/50 leading-relaxed">
                                        {hoveredChoice === 'abstract' ? "By discovering that the need was 'Syncing with non-system users,' you avoid building 4 separate export tools." :
                                            hoveredChoice === 'build' ? "Building exactly what the Founder asked for saves the relationship today, but adds 80 hours of tech debt per year." :
                                                "Declining without discovery prevents the debt, but leaves the user frustrated with a real unmet need."}
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

const RequestCard = ({ client, request, isActive, isResolved }: any) => (
    <motion.div
        animate={{
            opacity: isActive ? 1 : 0.3,
            x: isActive ? 10 : 0,
            borderColor: isResolved ? "rgba(34,197,94,0.3)" : "rgba(255,255,255,0.06)"
        }}
        className="p-4 rounded-2xl border bg-white/[0.02] flex items-center justify-between group transition-all"
    >
        <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isResolved ? 'bg-green-500/10' : 'bg-white/[0.05]'}`}>
                <FileSpreadsheet className={`w-4 h-4 ${isResolved ? 'text-green-400' : 'text-white/40'}`} />
            </div>
            <div>
                <p className="text-[11px] font-mono text-white/20 uppercase tracking-tighter leading-none mb-1">{client}</p>
                <p className="text-[13px] font-bold text-white">{request}</p>
            </div>
        </div>
        {isResolved && <CheckCircle2 className="w-4 h-4 text-green-400" />}
    </motion.div>
);

const XCircle = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
