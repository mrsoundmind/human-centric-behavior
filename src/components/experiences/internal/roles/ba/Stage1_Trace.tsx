import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitGraph, Share2, AlertCircle, CheckCircle2, Target, Zap, Layout, Layers } from "lucide-react";

interface StageProps {
    hoveredChoice: string | null;
}

export const Stage1_Trace = ({ hoveredChoice }: StageProps) => {
    return (
        <div className="rounded-[40px] border border-white/[0.08] bg-[#0A0A0B] overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <GitGraph className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                        <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Requirement Traceability</p>
                        <p className="text-[13px] font-bold text-white tracking-tight">Impact Map: Loan Approval Logic Change</p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 grid grid-cols-12 gap-8 bg-black/20 relative">
                {/* Dependency Graph */}
                <div className="col-span-12 h-64 relative flex items-center justify-center p-12 overflow-hidden rounded-3xl border border-white/5 bg-[#16161A]">
                    {/* Central Change Node */}
                    <div className="relative z-10">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 ${hoveredChoice === 'map' ? 'bg-blue-600 border-blue-400 animate-pulse' : 'bg-white/5 border-white/10'}`}>
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[8px] font-mono text-white/40 uppercase">Change Request</p>
                    </div>

                    {/* Dependent Nodes */}
                    <DependencyNode x="-120px" y="-40px" label="UI Dashboard" active={hoveredChoice === 'map'} />
                    <DependencyNode x="120px" y="-40px" label="API Endpoint" active={hoveredChoice === 'map'} />
                    <DependencyNode x="-60px" y="80px" label="Audit Logs" active={hoveredChoice === 'map'} />
                    <DependencyNode x="60px" y="80px" label="Notification Service" active={hoveredChoice === 'map'} />

                    {/* Connecting Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                        <line x1="50%" y1="50%" x2="38%" y2="35%" stroke="white" strokeWidth="1" />
                        <line x1="50%" y1="50%" x2="62%" y2="35%" stroke="white" strokeWidth="1" />
                        <line x1="50%" y1="50%" x2="44%" y2="65%" stroke="white" strokeWidth="1" />
                        <line x1="50%" y1="50%" x2="56%" y2="65%" stroke="white" strokeWidth="1" />
                    </svg>
                </div>

                {/* Analysis Stats Row */}
                <div className="col-span-12 grid grid-cols-3 gap-6 pt-4 border-t border-white/5">
                    <BAStat label="Scope Clarity" value={hoveredChoice === 'map' ? 'High' : 'Theoretical'} color={hoveredChoice === 'map' ? 'text-blue-400' : 'text-white/40'} />
                    <BAStat label="Regression Risk" value={hoveredChoice === 'map' ? 'Identified' : 'Untracked'} color={hoveredChoice === 'map' ? 'text-green-400' : 'text-red-400'} />
                    <BAStat label="Dev Estimate Accuracy" value={hoveredChoice === 'map' ? '92%' : '40%'} color={hoveredChoice === 'map' ? 'text-indigo-400' : 'text-amber-400'} />
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
                            <div className="flex gap-4 items-center line-clamp-2">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${hoveredChoice === 'document' ? 'bg-amber-500/20 text-amber-400' :
                                        hoveredChoice === 'map' ? 'bg-blue-500/20 text-blue-400' :
                                            'bg-indigo-500/20 text-indigo-400'
                                    }`}>
                                    {hoveredChoice === 'document' ? <AlertCircle className="w-6 h-6" /> :
                                        hoveredChoice === 'map' ? <Share2 className="w-6 h-6" /> :
                                            <Layout className="w-6 h-6" />}
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-bold text-white mb-1">
                                        {hoveredChoice === 'document' ? "The FRD Trap" :
                                            hoveredChoice === 'map' ? "The Dependency Engine" :
                                                "Impact Analysis"}
                                    </p>
                                    <p className="text-[12px] text-white/50 leading-relaxed">
                                        {hoveredChoice === 'document' ? "Writing a 40-page Functional Requirement Document (FRD) feels productive, but it hides the 'Ripples.' One change in logic can break five unrelated services. If you don't trace it, nobody knows it's broken until UAT." :
                                            hoveredChoice === 'map' ? "Mapping 'Dependency Ripples' is the BA's super-power. When you show Devs exactly which API endpoints are affected, you move from 'Writer' to 'Architect'. You kill ambiguity before it reaches the code." :
                                                "A high-value BA is the 'Human-Machine Translator.' Your job is to ensure that what the Business thinks they said is what the Code actually does."}
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

const DependencyNode = ({ x, y, label, active }: any) => (
    <div className="absolute transition-all duration-500" style={{ transform: `translate(${x}, ${y})` }}>
        <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${active ? 'bg-blue-600/20 border-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.3)]' : 'bg-white/5 border-white/10'}`}>
            <Layers className={`w-5 h-5 ${active ? 'text-blue-400' : 'text-white/20'}`} />
        </div>
        <p className={`absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[7px] font-bold uppercase tracking-tight ${active ? 'text-blue-300' : 'text-white/10'}`}>{label}</p>
    </div>
);

const BAStat = ({ label, value, color }: any) => (
    <div className="p-4 rounded-2xl border border-white/[0.03] bg-white/[0.01]">
        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className={`text-[15px] font-bold ${color}`}>{value}</p>
    </div>
);
