import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageSquare, Send, User, ShieldCheck, AlertCircle, RefreshCcw, Smile } from "lucide-react";

interface StageProps {
    hoveredChoice: string | null;
}

export const Stage1_Buffer = ({ hoveredChoice }: StageProps) => {
    return (
        <div className="rounded-[40px] border border-white/[0.08] bg-[#0A0A0B] overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                        <MessageSquare className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                        <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Communication Hub</p>
                        <p className="text-[13px] font-bold text-white tracking-tight">Client Escalation: Mumbai L&D</p>
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-8 grid grid-cols-12 gap-8 bg-black/20">
                {/* Email Draft Area */}
                <div className="col-span-8 flex flex-col space-y-4">
                    <div className="flex-1 rounded-3xl border border-white/5 bg-[#16161A] p-6 flex flex-col">
                        <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-4">
                            <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center text-[12px] font-bold text-indigo-400">RC</div>
                            <div>
                                <p className="text-[12px] font-bold text-white">To: Rahul Chawla (Client Lead)</p>
                                <p className="text-[10px] text-white/20">Subject: Re: Critical Bug in Onboarding Flow</p>
                            </div>
                        </div>

                        <div className="flex-1 font-mono text-[13px] leading-relaxed relative">
                            <p className="text-white/40 mb-4 italic">Hi Rahul,</p>

                            <AnimatePresence mode="wait">
                                {hoveredChoice === 'absorb' ? (
                                    <motion.p
                                        key="absorb"
                                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                        className="text-white"
                                    >
                                        I've personally met with the engineering lead. We identify that the
                                        <span className="text-indigo-400 font-bold ml-1">GST Validation logic</span> had an edge case
                                        specific to your file types. A fix is already in testing.
                                        I'll update you personally by 4 PM.
                                    </motion.p>
                                ) : hoveredChoice === 'defend' ? (
                                    <motion.p
                                        key="defend"
                                        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                        className="text-red-400/80"
                                    >
                                        The engineering team is currently overloaded with the Q1 roadmap.
                                        This bug was not in the original scope doc. We will look into it
                                        after the current sprint is over next Tuesday.
                                    </motion.p>
                                ) : (
                                    <motion.p
                                        key="idle"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                        className="text-white/10"
                                    >
                                        [Drafting your response strategy...]
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                            <div className="flex gap-2">
                                <div className="w-6 h-6 rounded bg-white/5 border border-white/10" />
                                <div className="w-6 h-6 rounded bg-white/5 border border-white/10" />
                            </div>
                            <button className="px-6 py-2 bg-indigo-600 rounded-full text-[11px] font-bold text-white shadow-lg shadow-indigo-500/20">
                                Send Message
                            </button>
                        </div>
                    </div>
                </div>

                {/* Relationship Metrics */}
                <div className="col-span-4 space-y-4">
                    <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-4">Relational Impact</p>
                    <Metric label="Net Promoter Score" value={hoveredChoice === 'absorb' ? '9.2' : hoveredChoice === 'defend' ? '4.1' : '7.5'} color={hoveredChoice === 'absorb' ? 'text-green-400' : 'text-red-400'} />
                    <Metric label="Account Health" value={hoveredChoice === 'absorb' ? 'Critical Stable' : hoveredChoice === 'defend' ? 'At Risk' : 'Neutral'} color={hoveredChoice === 'absorb' ? 'text-indigo-400' : 'text-amber-400'} />

                    <div className="pt-8 border-t border-white/5">
                        <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest mb-4">The Buffer Strategy</p>
                        <AnimatePresence mode="wait">
                            {hoveredChoice ? (
                                <motion.div
                                    key={hoveredChoice}
                                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                    className="p-4 rounded-2xl border border-white/5 bg-white/[0.02]"
                                >
                                    <p className="text-[12px] text-white/50 leading-relaxed italic">
                                        {hoveredChoice === 'absorb' ? "By owning the problem without naming names, you convert a technical failure into a trust milestone." :
                                            hoveredChoice === 'defend' ? "Defending with 'Scope' sounds logical but feels cold to a client in crisis. You are technically right but emotionally losing." :
                                                "Opening the door to internal team blame creates a 'Fragile Partner' image. Client loses trust in the entire organization."}
                                    </p>
                                </motion.div>
                            ) : (
                                <div className="opacity-10 p-4 border border-dashed border-white/10 rounded-2xl text-[11px] font-mono italic">Select strategy...</div>
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
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${hoveredChoice === 'absorb' ? 'bg-green-500/20 text-green-400' :
                                        hoveredChoice === 'defend' ? 'bg-red-500/20 text-red-400' :
                                            'bg-amber-500/20 text-amber-400'
                                    }`}>
                                    {hoveredChoice === 'absorb' ? <Smile className="w-6 h-6" /> :
                                        hoveredChoice === 'defend' ? <ShieldCheck className="w-6 h-6" /> :
                                            <AlertCircle className="w-6 h-6" />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-white mb-1">
                                        {hoveredChoice === 'absorb' ? "Absorbing the Impact" :
                                            hoveredChoice === 'defend' ? "The Defensive Wall" :
                                                "Internal Deflection"}
                                    </p>
                                    <p className="text-[12px] text-white/50 leading-relaxed text-left">
                                        {hoveredChoice === 'absorb' ? "CRM acting as a bridge protects the Engineering team's focus while giving the Client the 'personal attention' they crave." :
                                            hoveredChoice === 'defend' ? "Strict scope adherence during a crisis is the fastest way to lose an account during renewal season. Indian clients value 'relationship agility' above all." :
                                                "Blaming the 'Dev team' makes the client question who is actually in charge. You protect yourself, but damage the brand."}
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

const Metric = ({ label, value, color }: any) => (
    <div className="p-4 rounded-2xl border border-white/[0.03] bg-white/[0.01] flex items-center justify-between group">
        <div>
            <p className="text-[10px] font-mono text-white/20 uppercase tracking-tighter leading-none mb-1">{label}</p>
            <p className={`text-[13px] font-bold ${color}`}>{value}</p>
        </div>
        <div className={`w-1 h-1 rounded-full ${color.replace('text', 'bg').replace('400', '500')}`} />
    </div>
);
