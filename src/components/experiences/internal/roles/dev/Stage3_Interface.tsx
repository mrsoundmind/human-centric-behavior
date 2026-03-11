import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Server, Link, ShieldAlert, Cpu, AlertTriangle, CheckCircle2, WifiOff } from "lucide-react";

interface StageProps {
    hoveredChoice: string | null;
}

export const Stage3_Interface = ({ hoveredChoice }: StageProps) => {
    return (
        <div className="rounded-[40px] border border-white/[0.08] bg-[#0A0A0B] overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Globe className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                        <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">External Gateway</p>
                        <p className="text-[13px] font-bold text-white tracking-tight">GSTN / SAP Connector</p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-12 relative flex items-center justify-between">
                {/* Internal Server */}
                <div className="w-40 h-56 rounded-3xl border border-white/5 bg-white/[0.02] flex flex-col items-center justify-center relative p-6 text-center space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                        <Server className="w-6 h-6 text-blue-400" />
                    </div>
                    <p className="text-[12px] font-bold text-white">Your Core Engine</p>
                    <div className="flex gap-1">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-4 h-1 bg-green-500/40 rounded-full" />
                        ))}
                    </div>
                </div>

                {/* Connection Line */}
                <div className="flex-1 flex items-center justify-center relative h-1">
                    <div className="w-full h-px bg-white/5 dashed" />
                    <AnimatePresence>
                        {hoveredChoice && (
                            <motion.div
                                className={`absolute inset-0 flex items-center justify-center`}
                                initial={{ width: 0 }} animate={{ width: "100%" }}
                            >
                                <motion.div
                                    className={`w-3 h-3 rounded-full shadow-[0_0_15px_currentColor] ${hoveredChoice === 'rely' ? 'bg-red-500 text-red-500' :
                                            hoveredChoice === 'mock' ? 'bg-amber-500 text-amber-500' : 'bg-green-500 text-green-500'
                                        }`}
                                    animate={{ left: ["0%", "100%"] }}
                                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                                    style={{ position: 'absolute' }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* External API */}
                <div className="w-40 h-56 rounded-3xl border border-white/5 bg-white/[0.02] flex flex-col items-center justify-center relative p-6 text-center space-y-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${hoveredChoice === 'rely' ? 'bg-red-500/20 animate-pulse' : 'bg-white/5'
                        }`}>
                        <Globe className={`w-6 h-6 ${hoveredChoice === 'rely' ? 'text-red-400' : 'text-white/20'}`} />
                    </div>
                    <p className={`text-[12px] font-bold transition-colors ${hoveredChoice === 'rely' ? 'text-red-400' : 'text-white/40'}`}>GSTN Sandbox</p>

                    {hoveredChoice === 'rely' && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                            className="bg-red-500/20 px-3 py-1 rounded-full border border-red-500/30 flex items-center gap-1.5"
                        >
                            <WifiOff className="w-3 h-3 text-red-400" />
                            <span className="text-[9px] font-bold text-red-400">UNSTABLE</span>
                        </motion.div>
                    )}
                </div>

                {/* Context Overlay */}
                <AnimatePresence>
                    {hoveredChoice && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute bottom-8 left-8 right-8 p-6 rounded-3xl border border-white/10 bg-[#0F0F12] shadow-2xl"
                        >
                            <div className="flex gap-4 items-center">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${hoveredChoice === 'rely' ? 'bg-red-500/20 text-red-400' :
                                        hoveredChoice === 'mock' ? 'bg-amber-500/20 text-amber-400' :
                                            'bg-green-500/20 text-green-400'
                                    }`}>
                                    {hoveredChoice === 'rely' ? <AlertTriangle className="w-6 h-6" /> :
                                        hoveredChoice === 'mock' ? <Link className="w-6 h-6" /> :
                                            <CheckCircle2 className="w-6 h-6" />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-white mb-1">
                                        {hoveredChoice === 'rely' ? "The Dependency Fragility" :
                                            hoveredChoice === 'mock' ? "The 'Green Path' Illusion" :
                                                "Integrated Resilience"}
                                    </p>
                                    <p className="text-[12px] text-white/50 leading-relaxed text-left">
                                        {hoveredChoice === 'rely' ? "Sandbox goes down 4 times a day. Your engine crashes during UAT. Milestone missed even though 'your' code is fine." :
                                            hoveredChoice === 'mock' ? "Development is fast, but you'll hit a 'Stability Wall' on day 1 of production. 80% error rate expected." :
                                                "Spending 3 extra days on a Retry-Queue architecture prevents 2 weeks of production emergency fixes."}
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
