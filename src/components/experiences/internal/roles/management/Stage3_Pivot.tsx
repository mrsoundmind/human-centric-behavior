import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, Scale, Zap, AlertCircle, TrendingUp, Compass, Target, Globe } from "lucide-react";

interface StageProps {
    hoveredChoice: string | null;
}

export const Stage3_Pivot = ({ hoveredChoice }: StageProps) => {
    return (
        <div className="rounded-[40px] border border-white/[0.08] bg-[#0A0A0B] overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                        <Compass className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                        <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Strategic Steering</p>
                        <p className="text-[13px] font-bold text-white tracking-tight">Organization Roadmap v2.0</p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 grid grid-cols-12 gap-8 bg-black/20 relative">
                {/* Strategic Roadmap Visual */}
                <div className="col-span-12 h-64 relative flex items-center justify-center p-12">
                    <div className="w-full h-2 bg-white/5 rounded-full relative">
                        {/* Milestone Pins */}
                        <Milestone x="10%" label="Pilot" active />
                        <Milestone x="40%" label="Scaling" active />
                        <Milestone x="70%" label="Expansion" active={hoveredChoice !== 'pivot'} />
                        <Milestone x="90%" label="Stability" active={hoveredChoice !== 'pivot'} />

                        {/* The Pivot Deviation */}
                        <AnimatePresence>
                            {hoveredChoice === 'pivot' && (
                                <motion.div
                                    initial={{ pathLength: 0, opacity: 0 }}
                                    animate={{ pathLength: 1, opacity: 1 }}
                                    className="absolute left-[40%] top-0 overflow-visible pointer-events-none"
                                >
                                    <svg width="200" height="100" viewBox="0 0 200 100" fill="none" className="overflow-visible">
                                        <motion.path
                                            d="M 0 0 C 50 0, 100 80, 200 80"
                                            stroke="#ef4444" strokeWidth="4" strokeDasharray="8 8"
                                        />
                                    </svg>
                                    <div className="absolute left-[180px] top-[70px] whitespace-nowrap">
                                        <p className="text-[10px] font-bold text-red-500 uppercase tracking-tighter">Custom Pivot</p>
                                        <p className="text-[8px] text-red-400/60 uppercase font-mono tracking-widest">Client Specific</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Outcome Stats Row */}
                <div className="col-span-12 grid grid-cols-3 gap-6 pt-4 border-t border-white/5">
                    <PivotStat
                        icon={Target} label="Market Alignment"
                        value={hoveredChoice === 'pivot' ? 'Low' : hoveredChoice === 'negotiate' ? 'High' : 'Medium'}
                        color={hoveredChoice === 'pivot' ? 'text-red-400' : 'text-green-400'}
                    />
                    <PivotStat
                        icon={Globe} label="Product Generality"
                        value={hoveredChoice === 'pivot' ? 'Customized' : 'SaaS Standard'}
                        color={hoveredChoice === 'pivot' ? 'text-amber-400' : 'text-indigo-400'}
                    />
                    <PivotStat
                        icon={TrendingUp} label="Enterprise Value"
                        value={hoveredChoice === 'pivot' ? '-₹4 Cr' : '+₹12 Cr'}
                        color={hoveredChoice === 'pivot' ? 'text-red-500' : 'text-green-500'}
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
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${hoveredChoice === 'pivot' ? 'bg-red-500/20 text-red-400' :
                                        hoveredChoice === 'negotiate' ? 'bg-green-500/20 text-green-400' :
                                            'bg-indigo-500/20 text-indigo-400'
                                    }`}>
                                    {hoveredChoice === 'pivot' ? <AlertCircle className="w-6 h-6" /> :
                                        hoveredChoice === 'negotiate' ? <Scale className="w-6 h-6" /> :
                                            <Share2 className="w-6 h-6" />}
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-sm font-bold text-white mb-1">
                                        {hoveredChoice === 'pivot' ? "The 'Custom Feature' Trap" :
                                            hoveredChoice === 'negotiate' ? "Strategic Scaling" :
                                                "Market-Driven Management"}
                                    </p>
                                    <p className="text-[12px] text-white/50 leading-relaxed">
                                        {hoveredChoice === 'pivot' ? "Saying 'Yes' to every custom request from a large client turns your SaaS company into a 'Services' shop. You lose the ability to scale, and your product becomes a mess of toggle-switches." :
                                            hoveredChoice === 'negotiate' ? "Negotiating for the 'General Case' ensures that what you build for client A benefits clients B, C, and D. You protect the 'Product Equity' while satisfying the immediate revenue goal." :
                                                "A great manager protects the 'Product Narrative.' When you pivot for one person, you're betting the entire organization's future on their specific (and often temporary) whim."}
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

const Milestone = ({ x, label, active }: any) => (
    <div className="absolute top-1/2 -translate-y-1/2 flex flex-col items-center" style={{ left: x }}>
        <div className={`w-3 h-3 rounded-full border-2 border-black ${active ? 'bg-indigo-500' : 'bg-white/5 border-white/20'}`} />
        <span className={`mt-2 text-[10px] font-mono uppercase tracking-tighter ${active ? 'text-white/60' : 'text-white/10'}`}>{label}</span>
    </div>
);

const PivotStat = ({ icon: Icon, label, value, color }: any) => (
    <div className="p-4 rounded-2xl border border-white/[0.03] bg-white/[0.01]">
        <Icon className={`w-4 h-4 ${color} mb-3`} />
        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className={`text-[15px] font-bold ${color}`}>{value}</p>
    </div>
);
