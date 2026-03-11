import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Split, Scale, CheckCircle2, AlertCircle, Zap, FastForward, Users } from "lucide-react";

interface StageProps {
    hoveredChoice: string | null;
}

export const Stage3_Conflict = ({ hoveredChoice }: StageProps) => {
    return (
        <div className="rounded-[40px] border border-white/[0.08] bg-[#0A0A0B] overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                        <Scale className="w-4 h-4 text-red-400" />
                    </div>
                    <div>
                        <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Conflict Resolution</p>
                        <p className="text-[13px] font-bold text-white tracking-tight">UAT Session: Maharashtra Hub</p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 grid grid-cols-12 gap-8 bg-black/20 relative">
                {/* The Conflict Visualizer */}
                <div className="col-span-12 h-64 relative flex items-center justify-around p-12 overflow-hidden rounded-3xl border border-white/5 bg-[#16161A]">
                    {/* Perspective A: Business */}
                    <PerspectiveCard label="Business Stakeholder" color="text-amber-400" bubble="&quot;But I thought the report would also show GST data!&quot;" active={hoveredChoice === 'negotiate' || hoveredChoice === 'conflict'} />

                    {/* The "Gap" Connector */}
                    <div className="flex flex-col items-center gap-2">
                        <div className={`h-[2px] w-24 ${hoveredChoice === 'negotiate' ? 'bg-indigo-500' : 'bg-red-500 animate-pulse'}`} />
                        <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest">Expectation Gap</p>
                    </div>

                    {/* Perspective B: Engineering */}
                    <PerspectiveCard label="Engineering Lead" color="text-blue-400" bubble="&quot;The FRD only mentioned basic merchant profiles.&quot;" active={hoveredChoice === 'negotiate' || hoveredChoice === 'conflict'} />
                </div>

                {/* Conflict Stats Row */}
                <div className="col-span-12 grid grid-cols-3 gap-6 pt-4 border-t border-white/5">
                    <BAStat label="Project Delay" value={hoveredChoice === 'negotiate' ? 'Low' : '8 Weeks'} color={hoveredChoice === 'negotiate' ? 'text-green-400' : 'text-red-400'} />
                    <BAStat label="Build Integrity" value={hoveredChoice === 'negotiate' ? 'Maintained' : 'Compromised'} color={hoveredChoice === 'negotiate' ? 'text-indigo-400' : 'text-amber-400'} />
                    <BAStat label="Client Trust" value={hoveredChoice === 'negotiate' ? 'Secured' : 'Broken'} color={hoveredChoice === 'negotiate' ? 'text-green-400' : 'text-red-400'} />
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
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${hoveredChoice === 'conflict' ? 'bg-red-500/20 text-red-400' :
                                        hoveredChoice === 'negotiate' ? 'bg-indigo-500/20 text-indigo-400' :
                                            'bg-green-500/20 text-green-400'
                                    }`}>
                                    {hoveredChoice === 'conflict' ? <ShieldAlert className="w-6 h-6" /> :
                                        hoveredChoice === 'negotiate' ? <FastForward className="w-6 h-6" /> :
                                            <Users className="w-6 h-6" />}
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-bold text-white mb-1">
                                        {hoveredChoice === 'conflict' ? "The 'Passivity' Trap" :
                                            hoveredChoice === 'negotiate' ? "The Scope Architect" :
                                                "UAT Management"}
                                    </p>
                                    <p className="text-[12px] text-white/50 leading-relaxed text-left">
                                        {hoveredChoice === 'conflict' ? "Allowing the conflict to fester between Business and Engineering is a BA failure. If you don't negotiate a middle ground, the project enters a 'Deadlock' where nothing moves and everyone blames the 'Requirement Gap'." :
                                            hoveredChoice === 'negotiate' ? "A great BA owns the gap. You negotiate a Phase 2 for the GST data while ensuring Phase 1 launches tomorrow. You protect the 'Build Cycle' from bloating. You manage the disappointment today to ensure the success tomorrow." :
                                                "Conflict in UAT is rarely about bad code; it's about missing 'Sign-off' checkpoints. Your job is to make the stakeholders' assumptions visible long before the demo day."}
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

const PerspectiveCard = ({ label, bubble, color, active }: any) => (
    <div className={`w-48 transition-all duration-500 ${active ? 'opacity-100' : 'opacity-20'}`}>
        <div className={`p-3 rounded-xl border bg-white/[0.02] border-white/5 text-[10px] italic leading-tight mb-3 ${color}`}>
            {bubble}
        </div>
        <p className="text-center text-[10px] font-mono uppercase tracking-widest text-white/40">{label}</p>
    </div>
);

const BAStat = ({ label, value, color }: any) => (
    <div className="p-4 rounded-2xl border border-white/[0.03] bg-white/[0.01]">
        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className={`text-[15px] font-bold ${color}`}>{value}</p>
    </div>
);
