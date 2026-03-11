import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Bug, Cpu, Zap, AlertCircle, FileCode, CheckCircle2, Scissors } from "lucide-react";

interface StageProps {
    hoveredChoice: string | null;
}

export const Stage1_Terminal = ({ hoveredChoice }: StageProps) => {
    return (
        <div className="rounded-[40px] border border-white/[0.08] bg-[#0A0A0B] overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                        <Terminal className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                        <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Codebase Explorer</p>
                        <p className="text-[13px] font-bold text-white tracking-tight">reconcile_logic.py</p>
                    </div>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/20" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/20" />
                    <div className="w-3 h-3 rounded-full bg-green-500/20" />
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 grid grid-cols-12 gap-8 bg-black/20">
                {/* Code View */}
                <div className="col-span-8 font-mono text-[12px] leading-relaxed relative">
                    <div className="space-y-1 text-white/40">
                        <p><span className="text-purple-400">def</span> <span className="text-blue-400">process_invoice</span>(data):</p>
                        <p className="pl-4">    <span className="text-gray-500"># TODO: Add validation layer</span></p>
                        <p className="pl-4">    recs = data.<span className="text-blue-400">get_entries</span>()</p>

                        <div className="relative group">
                            <motion.div
                                animate={{
                                    backgroundColor: hoveredChoice === 'fix' ? "rgba(239,68,68,0.1)" : "rgba(255,255,255,0.02)",
                                    borderColor: hoveredChoice === 'fix' ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.05)"
                                }}
                                className="pl-4 py-1 border border-transparent rounded transition-colors"
                            >
                                <p>    <span className="text-purple-400">return</span> [<span className="text-blue-400">reconcile</span>(r) <span className="text-purple-400">for</span> r <span className="text-purple-400">in</span> recs]</p>
                            </motion.div>
                            {hoveredChoice === 'fix' && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                    className="absolute -right-4 top-0 bottom-0 w-32 bg-red-500/20 border-l border-red-500/40 flex items-center justify-center"
                                >
                                    <span className="text-[10px] text-red-400 font-bold uppercase tracking-tighter">Circular Dep?</span>
                                </motion.div>
                            )}
                        </div>

                        <p className="pl-4"> </p>
                        <p><span className="text-purple-400">def</span> <span className="text-blue-400">reconcile</span>(entry):</p>
                        <p className="pl-4">    <span className="text-purple-400">if</span> <span className="text-blue-400">is_valid</span>(entry):</p>
                        <p className="pl-8">        <span className="text-purple-400">return</span> <span className="text-blue-400">EntryState</span>.COMPLETE</p>
                    </div>

                    {/* Ripple Visualization */}
                    <AnimatePresence>
                        {hoveredChoice === 'fix' && (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="absolute inset-0 pointer-events-none"
                            >
                                <svg className="w-full h-full">
                                    <motion.circle
                                        cx="50%" cy="30%" r="50" fill="none" stroke="rgba(239,68,68,0.3)" strokeWidth="1"
                                        initial={{ r: 0 }} animate={{ r: 200, opacity: 0 }} transition={{ repeat: Infinity, duration: 2 }}
                                    />
                                </svg>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* System Health Column */}
                <div className="col-span-4 space-y-4">
                    <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-4">Regression Scan</p>
                    <HealthMetric label="Cyclomatic Complexity" value={hoveredChoice === 'fix' ? 'High' : 'Safe'} color={hoveredChoice === 'fix' ? 'text-red-400' : 'text-green-400'} />
                    <HealthMetric label="Test Coverage" value={hoveredChoice === 'fix' ? '62%' : '88%'} color={hoveredChoice === 'fix' ? 'text-amber-400' : 'text-white/40'} />
                    <HealthMetric label="Deploy Risk" value={hoveredChoice === 'fix' ? 'Extreme' : 'Low'} color={hoveredChoice === 'fix' ? 'text-red-400' : 'text-white/40'} />

                    <div className="pt-8 border-t border-white/5 space-y-3">
                        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-2">Impact Insight</p>
                        <AnimatePresence mode="wait">
                            {hoveredChoice ? (
                                <motion.div
                                    key={hoveredChoice}
                                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                                    className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]"
                                >
                                    <p className="text-[12px] text-white/60 leading-relaxed italic">
                                        {hoveredChoice === 'fix' ? "Fixing the symptom in line 14 triggers a circular import in the Auth module. UI will freeze on load." :
                                            hoveredChoice === 'warn' ? "The warning notifies the team, but the technical debt remains. Sprint 4 velocity will drop by 20%." :
                                                "Isolating the module takes 2 days more, but guarantees the production environment stays stable."}
                                    </p>
                                </motion.div>
                            ) : (
                                <div className="p-4 rounded-2xl border border-white/5 bg-white/[0.01] opacity-20">
                                    <p className="text-[11px] text-white/40 italic">Select an action to simulate the code ripple...</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-5 border-t border-white/[0.05] grid grid-cols-2 bg-white/[0.01]">
                <div className="flex items-center gap-2">
                    <AlertCircle className="w-3 h-3 text-red-500" />
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">Incident Root: circular dependency detected</span>
                </div>
                <div className="flex justify-end gap-6 text-[10px] font-mono text-white/20">
                    <span>L: 14</span>
                    <span>Col: 24</span>
                    <span className="text-green-500/50 underline">UTF-8</span>
                </div>
            </div>
        </div>
    );
};

const HealthMetric = ({ label, value, color }: any) => (
    <div className="p-4 rounded-2xl border border-white/[0.03] bg-white/[0.01] flex items-center justify-between group">
        <div>
            <p className="text-[10px] font-mono text-white/20 uppercase tracking-tighter leading-none mb-1">{label}</p>
            <p className={`text-[13px] font-bold ${color}`}>{value}</p>
        </div>
        <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className={`w-1.5 h-1.5 rounded-full ${color.replace('text', 'bg').replace('400', '500')}`}
        />
    </div>
);
