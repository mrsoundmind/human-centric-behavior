import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Map, MapPin, ShieldAlert, Target, Zap, Waves, TrendingUp, Users } from "lucide-react";

interface StageProps {
    hoveredChoice: string | null;
}

export const Stage1_Pilot = ({ hoveredChoice }: StageProps) => {
    return (
        <div className="rounded-[40px] border border-white/[0.08] bg-[#0A0A0B] overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <Map className="w-4 h-4 text-emerald-400" />
                    </div>
                    <div>
                        <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Geospatial Intelligence</p>
                        <p className="text-[13px] font-bold text-white tracking-tight">Maharashtra Pilot: Adoption Heatmap</p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 grid grid-cols-12 gap-8 bg-black/20 relative overflow-hidden">
                {/* Simulated Map View */}
                <div className="col-span-12 h-64 relative rounded-3xl border border-white/5 bg-[#16161A] overflow-hidden group">
                    <div className="absolute inset-0 opacity-20 pointer-events-none">
                        {/* Map Grid Patterns */}
                        <div className="absolute inset-0 grid grid-cols-12 grid-rows-6">
                            {Array.from({ length: 72 }).map((_, i) => (
                                <div key={i} className="border-[0.5px] border-white/5" />
                            ))}
                        </div>
                    </div>

                    {/* Nodes */}
                    <MapNode x="20%" y="30%" label="Main Hub" intensity="high" active />
                    <MapNode x="60%" y="70%" label="Regional Site A" intensity={hoveredChoice === 'scale' ? 'high' : 'low'} active />
                    <MapNode x="80%" y="20%" label="Regional Site B" intensity={hoveredChoice === 'scale' ? 'high' : 'low'} active />

                    {/* Connecting Waves */}
                    <AnimatePresence>
                        {hoveredChoice === 'scale' && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="absolute inset-0 pointer-events-none"
                            >
                                <svg className="w-full h-full">
                                    <motion.path
                                        d="M 200 80 Q 400 80 550 160"
                                        stroke="#10b981" strokeWidth="2" strokeDasharray="4 4"
                                        animate={{ strokeDashoffset: -20 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    />
                                    <motion.path
                                        d="M 200 80 Q 500 40 700 60"
                                        stroke="#10b981" strokeWidth="2" strokeDasharray="4 4"
                                        animate={{ strokeDashoffset: -20 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    />
                                </svg>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Pilot Health Row */}
                <div className="col-span-12 grid grid-cols-3 gap-6 pt-4 border-t border-white/5">
                    <StrategyStat
                        label="Systemic Resistance"
                        value={hoveredChoice === 'scale' ? 'High' : 'Low'}
                        color={hoveredChoice === 'scale' ? 'text-amber-400' : 'text-green-400'}
                    />
                    <StrategyStat
                        label="Adoption Velocity"
                        value={hoveredChoice === 'scale' ? '12x Normal' : 'Controlled'}
                        color={hoveredChoice === 'scale' ? 'text-indigo-400' : 'text-green-400'}
                    />
                    <StrategyStat
                        label="Success Margin"
                        value={hoveredChoice === 'scale' ? 'Critical' : 'Safe'}
                        color={hoveredChoice === 'scale' ? 'text-red-400' : 'text-green-400'}
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
                            <div className="flex gap-4 items-center line-clamp-2">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${hoveredChoice === 'standard' ? 'bg-indigo-500/20 text-indigo-400' :
                                        hoveredChoice === 'scale' ? 'bg-red-500/20 text-red-400 font-bold' :
                                            'bg-emerald-500/20 text-emerald-400'
                                    }`}>
                                    {hoveredChoice === 'standard' ? <ShieldAlert className="w-6 h-6" /> :
                                        hoveredChoice === 'scale' ? <Zap className="w-6 h-6" /> :
                                            <Target className="w-6 h-6" />}
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-bold text-white mb-1">
                                        {hoveredChoice === 'standard' ? "The Baseline Pilot" :
                                            hoveredChoice === 'scale' ? "The Scaling Shockwave" :
                                                "Strategic Rollout"}
                                    </p>
                                    <p className="text-[12px] text-white/50 leading-relaxed">
                                        {hoveredChoice === 'standard' ? "Keeping the pilot small keeps the 'Project Status' Green, but it hides the systemic failures that will only appear at scale. You are winning the battle but losing the transformation war." :
                                            hoveredChoice === 'scale' ? "Aggressive scaling reveals 'Operational Friction' (Staff pushback, data bottlenecks) immediately. It's painful now, but it's the only way to build a transformation that lasts." :
                                                "A transformation strategy is about 'Managed Stress.' You don't just ship software; you ship a new behavior. If you ignore the people, the software is just an expensive database."}
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

const MapNode = ({ x, y, label, intensity, active }: any) => (
    <div className="absolute flex flex-col items-center" style={{ left: x, top: y }}>
        <div className={`w-4 h-4 rounded-full border-2 border-black flex items-center justify-center ${active ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' : 'bg-white/5'}`}>
            {intensity === 'high' && <div className="w-full h-full rounded-full bg-emerald-500 animate-ping opacity-30" />}
        </div>
        <span className="mt-2 text-[9px] font-mono text-white/40 uppercase tracking-widest">{label}</span>
    </div>
);

const StrategyStat = ({ label, value, color }: any) => (
    <div className="p-4 rounded-2xl border border-white/[0.03] bg-white/[0.01]">
        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className={`text-[15px] font-bold ${color}`}>{value}</p>
    </div>
);
