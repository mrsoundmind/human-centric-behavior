import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Sparkles, AlertCircle, FileText, Upload, MousePointer2, UserMinus } from "lucide-react";

interface Stage3Props {
    hoveredChoice: string | null;
}

export const Stage3_Done = ({ hoveredChoice }: Stage3Props) => {
    return (
        <div className="rounded-[40px] border border-white/[0.08] bg-[#0A0A0B] overflow-hidden shadow-2xl relative h-[560px] flex flex-col">
            {/* Header */}
            <div className="px-8 py-5 border-b border-white/[0.05] flex items-center justify-between bg-white/[0.01]">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center">
                        <Shield className="w-4 h-4 text-orange-400" />
                    </div>
                    <div>
                        <p className="text-[11px] font-mono text-white/40 uppercase tracking-widest leading-none mb-1">Quality Gate</p>
                        <p className="text-[13px] font-bold text-white tracking-tight">Definition of "Done" Simulator</p>
                    </div>
                </div>
            </div>

            {/* Content Area - The "App" Mockup */}
            <div className="flex-1 p-8 relative flex flex-col items-center justify-center bg-black/40">
                <div className="w-full max-w-md aspect-[4/3] rounded-3xl border border-white/10 bg-[#16161A] overflow-hidden shadow-2xl relative group">
                    {/* Mock Browser Header */}
                    <div className="px-4 py-3 bg-white/[0.03] border-b border-white/5 flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-red-500/30" />
                            <div className="w-2 h-2 rounded-full bg-amber-500/30" />
                            <div className="w-2 h-2 rounded-full bg-green-500/30" />
                        </div>
                        <div className="flex-1 h-5 bg-black/40 rounded flex items-center px-3">
                            <p className="text-[9px] text-white/20 font-mono">vendor.onboarding/uploads</p>
                        </div>
                    </div>

                    {/* App Content */}
                    <div className="p-8 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-8">
                            <div className="h-4 w-32 bg-white/5 rounded" />
                            <div className="h-8 w-24 bg-blue-500/20 border border-blue-500/30 rounded-lg" />
                        </div>

                        <div className="flex-1 flex flex-col items-center justify-center">
                            <AnimatePresence mode="wait">
                                {hoveredChoice === 'ship' ? (
                                    <motion.div
                                        key="ship"
                                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                        className="w-full h-full flex flex-col items-center justify-center"
                                    >
                                        {/* The "Nothing" white box */}
                                        <div className="w-full h-48 rounded-2xl border border-white/[0.05] bg-white/[0.01] relative">
                                            <div className="absolute top-4 left-4 h-3 w-40 bg-white/5 rounded" />
                                        </div>
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                            className="mt-6 flex items-center gap-2 text-red-400"
                                        >
                                            <AlertCircle className="w-4 h-4" />
                                            <span className="text-[12px] font-medium italic">"Is it broken? I don't see anything."</span>
                                        </motion.div>
                                    </motion.div>
                                ) : hoveredChoice === 'bridge' || hoveredChoice === 'delay' ? (
                                    <motion.div
                                        key="bridge"
                                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                                        className="w-full h-full flex flex-col items-center justify-center text-center space-y-4"
                                    >
                                        <div className="w-20 h-20 rounded-3xl bg-blue-500/10 flex items-center justify-center mb-2">
                                            <Upload className="w-10 h-10 text-blue-400 opacity-50" />
                                        </div>
                                        <div>
                                            <p className="text-[15px] font-bold text-white">No documents uploaded</p>
                                            <p className="text-[12px] text-white/40 max-w-[200px] mx-auto mt-1">Upload your GST certificate to begin vendor registration.</p>
                                        </div>
                                        <button className="px-6 py-2 bg-blue-600 rounded-full text-[11px] font-bold text-white shadow-lg shadow-blue-500/20">
                                            Add First Document
                                        </button>
                                    </motion.div>
                                ) : (
                                    <motion.div key="idle" className="opacity-10 text-[12px] font-mono">Select a quality approach to see the UI</motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Reality Feedback Overlay */}
                <AnimatePresence>
                    {hoveredChoice && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="mt-8 p-6 rounded-3xl border border-white/10 bg-[#0F0F12] shadow-2xl w-full"
                        >
                            <div className="flex gap-4 items-center">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${hoveredChoice === 'ship' ? 'bg-red-500/20 text-red-400' :
                                        hoveredChoice === 'bridge' ? 'bg-green-500/20 text-green-400' :
                                            'bg-blue-500/20 text-blue-400'
                                    }`}>
                                    {hoveredChoice === 'ship' ? <UserMinus className="w-6 h-6" /> :
                                        hoveredChoice === 'bridge' ? <Sparkles className="w-6 h-6" /> :
                                            <Clock className="w-6 h-6" />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-white mb-1">
                                        {hoveredChoice === 'ship' ? "Functional Completion vs Experience Failure" :
                                            hoveredChoice === 'bridge' ? "The 'Good Enough' UX Bridge" :
                                                "The Quality Pause"}
                                    </p>
                                    <p className="text-[12px] text-white/50 leading-relaxed">
                                        {hoveredChoice === 'ship' ? "Technical criteria: Met. User result: 18% drop-off because they mistake 'empty' for 'broken.'" :
                                            hoveredChoice === 'bridge' ? "A 3-hour intentional fix prevents 14 days of support volume. You protect the milestone AND the user." :
                                                "Stopping for 2 days fixes the issue but creates a scorecard flag. Necessary, but needs expert framing to the client."}
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
