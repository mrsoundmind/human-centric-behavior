import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Activity, AlertCircle, CheckCircle2, RefreshCw, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface StageProps {
    hoveredChoice: string | null;
}

export const Stage3_Health = ({ hoveredChoice }: StageProps) => {
    return (
        <div className="rounded-[40px] border border-white/[0.08] bg-[#0A0A0B] overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                        <Heart className="w-4 h-4 text-red-400" />
                    </div>
                    <div>
                        <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Account Portfolio</p>
                        <p className="text-[13px] font-bold text-white tracking-tight">Renewal Health Radar</p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 grid grid-cols-12 gap-8 bg-black/20 relative overflow-hidden">
                {/* Health Radial (Simulated) */}
                <div className="col-span-12 h-64 relative flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center justify-center">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="absolute border border-white/5 rounded-full" style={{ width: i * 140, height: i * 140 }} />
                        ))}
                    </div>

                    <motion.div
                        initial={{ scale: 0.8 }}
                        animate={{
                            scale: hoveredChoice === 'fix' ? 1.1 : hoveredChoice === 'delay' ? 0.9 : 0.8,
                            opacity: hoveredChoice ? 1 : 0.2
                        }}
                        className={`w-32 h-32 rounded-full flex flex-col items-center justify-center shadow-2xl transition-all duration-700 ${hoveredChoice === 'fix' ? 'bg-green-500/20 shadow-[0_0_50px_rgba(34,197,94,0.3)] border border-green-500/30' :
                                hoveredChoice === 'delay' ? 'bg-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.3)] border border-red-500/30' :
                                    'bg-white/5 border border-white/10'
                            }`}
                    >
                        <p className="text-[10px] font-mono text-white/40 uppercase mb-1">Health</p>
                        <p className={`text-[24px] font-bold ${hoveredChoice === 'fix' ? 'text-green-400' :
                                hoveredChoice === 'delay' ? 'text-red-400' : 'text-white/40'
                            }`}>
                            {hoveredChoice === 'fix' ? '94%' : hoveredChoice === 'delay' ? '42%' : '--'}
                        </p>
                    </motion.div>

                    {/* Drifting Satellites */}
                    <Satellite label="Uptime" angle={45} isActive={hoveredChoice === 'fix'} />
                    <Satellite label="Support" angle={135} isActive={hoveredChoice === 'fix'} />
                    <Satellite label="Adoption" angle={225} isActive={hoveredChoice === 'fix'} />
                    <Satellite label="Renewal" angle={315} isActive={hoveredChoice === 'fix'} />
                </div>

                {/* Account Details Row */}
                <div className="col-span-12 grid grid-cols-3 gap-6 pt-4 border-t border-white/5">
                    <HealthStat
                        icon={DollarSign} label="Renewal Value"
                        value="₹2.4 Cr" sub="Due in 45 days"
                        color="text-indigo-400"
                    />
                    <HealthStat
                        icon={Activity} label="Product Usage"
                        value={hoveredChoice === 'fix' ? '+20%' : hoveredChoice === 'delay' ? '-45%' : 'Flat'}
                        sub="Relative to Baseline"
                        color={hoveredChoice === 'fix' ? 'text-green-400' : hoveredChoice === 'delay' ? 'text-red-400' : 'text-white/40'}
                    />
                    <HealthStat
                        icon={AlertCircle} label="Risk Tags"
                        value={hoveredChoice === 'delay' ? 'Critical churn' : 'None'}
                        sub="Sentiment analysis"
                        color={hoveredChoice === 'delay' ? 'text-red-500' : 'text-green-400'}
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
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${hoveredChoice === 'fix' ? 'bg-green-500/20 text-green-400' :
                                        hoveredChoice === 'delay' ? 'bg-red-500/20 text-red-400 font-bold' :
                                            'bg-indigo-500/20 text-indigo-400'
                                    }`}>
                                    {hoveredChoice === 'fix' ? <RefreshCw className="w-6 h-6 animate-spin-slow" /> :
                                        hoveredChoice === 'delay' ? <TrendingDown className="w-6 h-6" /> :
                                            <CheckCircle2 className="w-6 h-6" />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-white mb-1">
                                        {hoveredChoice === 'fix' ? "Account Resuscitation" :
                                            hoveredChoice === 'delay' ? "The Renewal Death Spiral" :
                                                "Strategic Alignment"}
                                    </p>
                                    <p className="text-[12px] text-white/50 leading-relaxed text-left">
                                        {hoveredChoice === 'fix' ? "By resolving the core friction, you move the account from 'At Risk' to 'Advocate.' Renewal becomes a formality instead of a negotiation fight." :
                                            hoveredChoice === 'delay' ? "Missing the renewal window while issues remain open is a 100% churn signal. Every day without a fix costs ₹53,000 in account equity." :
                                                "Aligning the feature to the client's next quarterly goal ensures they can't imagine Q3 without your product."}
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

const Satellite = ({ label, angle, isActive }: any) => (
    <motion.div
        animate={{
            opacity: isActive ? 1 : 0.2,
            rotate: angle,
        }}
        className="absolute w-[280px] h-0 pointer-events-none"
    >
        <div className={`absolute right-0 w-3 h-3 rounded-full border border-white/20 flex items-center justify-center ${isActive ? 'bg-indigo-500' : 'bg-white/5'}`}>
            <div className="absolute left-6 whitespace-nowrap text-[9px] font-mono text-white tracking-widest uppercase -rotate-45 origin-left">
                {label}
            </div>
        </div>
    </motion.div>
);

const HealthStat = ({ icon: Icon, label, value, sub, color }: any) => (
    <div className="p-4 rounded-2xl border border-white/[0.03] bg-white/[0.01]">
        <Icon className={`w-4 h-4 ${color} mb-3`} />
        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest leading-none mb-1">{label}</p>
        <p className={`text-[16px] font-bold ${color}`}>{value}</p>
        <p className="text-[9px] font-mono text-white/20 uppercase mt-1 opacity-40">{sub}</p>
    </div>
);
