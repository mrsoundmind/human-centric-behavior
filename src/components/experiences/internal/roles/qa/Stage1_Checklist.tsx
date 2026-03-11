import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCheck, ShieldCheck, AlertCircle, Search, Terminal, Zap, Bug, CheckSquare } from "lucide-react";

interface StageProps {
    hoveredChoice: string | null;
}

export const Stage1_Checklist = ({ hoveredChoice }: StageProps) => {
    return (
        <div className="rounded-[40px] border border-white/[0.08] bg-[#0A0A0B] overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                        <ClipboardCheck className="w-4 h-4 text-orange-400" />
                    </div>
                    <div>
                        <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Test Suite Alpha</p>
                        <p className="text-[13px] font-bold text-white tracking-tight">Onboarding Flow Validation</p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 grid grid-cols-2 gap-8 relative overflow-hidden">
                {/* Checklist Side */}
                <div className="space-y-4">
                    <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-4">Acceptance Criteria</p>
                    <CheckItem label="User can login" status="done" />
                    <CheckItem label="User can upload GST" status="done" />
                    <CheckItem
                        label="Error on invalid PAN"
                        status={hoveredChoice === 'stress' ? 'done' : 'pending'}
                        isImpacted={hoveredChoice === 'stress'}
                    />
                    <CheckItem
                        label="Handling 'Special Chars' in name"
                        status={hoveredChoice === 'stress' ? 'done' : 'pending'}
                        isImpacted={hoveredChoice === 'stress'}
                    />
                </div>

                {/* Simulation Side */}
                <div className="relative">
                    <div className="absolute inset-0 rounded-3xl border border-white/5 bg-white/[0.01] flex flex-col items-center justify-center p-8 text-center overflow-hidden">
                        <AnimatePresence mode="wait">
                            {hoveredChoice === 'stress' ? (
                                <motion.div
                                    key="stress"
                                    initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                    className="space-y-6"
                                >
                                    <div className="flex justify-center gap-4">
                                        <Bug className="w-8 h-8 text-red-400 animate-bounce" />
                                        <Bug className="w-8 h-8 text-red-400 animate-pulse" />
                                    </div>
                                    <div>
                                        <p className="text-[16px] font-bold text-red-400">7 Edge Cases Found</p>
                                        <p className="text-[12px] text-white/40 leading-relaxed mt-2">
                                            Found a critical failure when PAN contains 'X' as the 5th character.
                                            This would have blocked 800 vendors.
                                        </p>
                                    </div>
                                    <div className="flex flex-wrap justify-center gap-2">
                                        <span className="px-2 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-[9px] text-red-400 font-mono">SQL Injection Risk</span>
                                        <span className="px-2 py-1 rounded-md bg-red-500/10 border border-red-500/20 text-[9px] text-red-400 font-mono">Buffer Overflow</span>
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="idle"
                                    initial={{ opacity: 0 }} animate={{ opacity: 0.3 }}
                                    className="space-y-4 grayscale"
                                >
                                    <Search className="w-12 h-12 text-white/20 mx-auto" />
                                    <p className="text-[12px] text-white/40">Waiting for exploratory sweep...</p>
                                </motion.div>
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
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${hoveredChoice === 'stress' ? 'bg-orange-500/20 text-orange-400' :
                                        hoveredChoice === 'sign' ? 'bg-red-500/20 text-red-400' :
                                            'bg-green-500/20 text-green-400'
                                    }`}>
                                    {hoveredChoice === 'stress' ? <Zap className="w-6 h-6" /> :
                                        hoveredChoice === 'sign' ? <AlertCircle className="w-6 h-6" /> :
                                            <ShieldCheck className="w-6 h-6" />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-white mb-1">
                                        {hoveredChoice === 'stress' ? "Exploratory Deep-Dive" :
                                            hoveredChoice === 'sign' ? "The 'Green Path' Deception" :
                                                "The Boundary Protector"}
                                    </p>
                                    <p className="text-[12px] text-white/50 leading-relaxed text-left">
                                        {hoveredChoice === 'stress' ? "Spending 4 extra hours finding edge cases saves 4 days of production fires. You discover that real-world users don't follow the 'happy path'." :
                                            hoveredChoice === 'sign' ? "Accepting simple criteria results in a 'Working' app that fails on Day 1. The procurement client will see every error as a sign of team amateurism." :
                                                "Creating a reusable 'Stress Test' library reduces future regression time by 40%. A gift to your future self."}
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

const CheckItem = ({ label, status, isImpacted }: any) => (
    <motion.div
        animate={{ opacity: status === 'done' ? 1 : 0.4 }}
        className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.03] bg-white/[0.01]"
    >
        <div className={`w-5 h-5 rounded border flex items-center justify-center ${status === 'done' ? 'bg-orange-500/20 border-orange-500/40' : 'border-white/10'
            }`}>
            {status === 'done' && <CheckSquare className="w-3 h-3 text-orange-400" />}
        </div>
        <p className={`text-[12px] ${status === 'done' ? 'text-white' : 'text-white/40'}`}>
            {label}
            {isImpacted && <span className="ml-2 text-[10px] text-orange-400 font-mono italic">(FOUND ERROR!)</span>}
        </p>
    </motion.div>
);
