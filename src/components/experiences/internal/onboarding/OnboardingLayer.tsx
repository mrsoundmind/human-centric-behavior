
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, AlertTriangle, TrendingUp, Shield, Activity } from "lucide-react";
import { Designation } from "../DesignationSelect";

type OnboardingPhase = 0 | 1 | 2 | 3 | 4 | 5;

interface OnboardingLayerProps {
    onComplete: (role: Designation) => void;
}

// --- REFINED PHASE COMPONENTS (SDLC STYLE) ---

const ProjectBrief = ({ onContinue }: { onContinue: () => void }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, y: -20 }}
        className="max-w-2xl w-full bg-black/40 border border-white/10 rounded-2xl p-10 backdrop-blur-xl shadow-2xl relative overflow-hidden"
    >
        {/* Neon Accent Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50" />

        <div className="flex justify-between items-start mb-8">
            <div>
                <h2 className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Activity className="w-4 h-4" /> System Entry Protocol
                </h2>
                <h1 className="text-4xl font-display font-bold text-white tracking-tight">Project Horizon</h1>
            </div>
            <div className="bg-red-500/10 text-red-400 px-3 py-1 rounded-full text-xs font-mono border border-red-500/20 animate-pulse">
                LIVE ENVIRONMENT
            </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-10">
            <div className="space-y-1">
                <div className="text-xs text-gray-500 uppercase tracking-wider">Client</div>
                <div className="font-bold text-lg text-white">RetailGiant Corp</div>
            </div>
            <div className="space-y-1">
                <div className="text-xs text-gray-500 uppercase tracking-wider">Structure</div>
                <div className="font-bold text-white font-mono">Fixed Bid ($1.2M)</div>
            </div>
            <div className="space-y-1">
                <div className="text-xs text-gray-500 uppercase tracking-wider">Timeline</div>
                <div className="font-bold text-white font-mono">4 Months (Hard Launch)</div>
            </div>
            <div className="space-y-1">
                <div className="text-xs text-gray-500 uppercase tracking-wider">Target Margin</div>
                <div className="font-bold text-green-400 font-mono text-xl">22%</div>
            </div>
        </div>

        <button
            onClick={onContinue}
            className="w-full py-4 bg-white text-black font-bold text-lg rounded-xl hover:bg-gray-200 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
        >
            Acknowledge Context <ArrowRight className="w-5 h-5" />
        </button>
    </motion.div>
);

const SlackWarRoom = ({ onContinue }: { onContinue: (choice: string) => void }) => {
    const [timeLeft, setTimeLeft] = useState(20);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [timeLeft]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl w-full"
        >
            <div className="bg-[#1A1D21] border border-gray-800 rounded-lg overflow-hidden shadow-2xl relative">
                {/* Header */}
                <div className="h-14 bg-[#2D2D2D] border-b border-black flex items-center px-4 justify-between">
                    <div className="font-bold text-gray-200 flex items-center gap-2">
                        <span className="text-gray-500">#</span> launch-war-room
                    </div>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                </div>

                {/* Chat Area */}
                <div className="p-6 space-y-6 bg-[#1A1D21] min-h-[300px]">
                    {/* Message 1 */}
                    <div className="flex gap-4 group">
                        <div className="w-10 h-10 rounded bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/20">
                            CM
                        </div>
                        <div className="flex-1">
                            <div className="flex items-baseline gap-2 mb-1">
                                <span className="font-bold text-gray-200">Client Manager</span>
                                <span className="text-xs text-gray-500">10:42 AM</span>
                            </div>
                            <div className="text-gray-300 bg-[#222529] p-3 rounded-r-xl rounded-bl-xl inline-block border border-gray-700/50 relative">
                                <span className="text-red-400 bg-red-500/10 px-1.5 py-0.5 rounded text-xs font-mono mr-2 border border-red-500/20">@channel</span>
                                Launch completed. Conversion lift is <span className="text-red-400 font-bold">2%</span>. We promised <span className="text-green-400 font-bold">15%</span>. What happened?
                            </div>
                        </div>
                    </div>

                    {/* Message 2 */}
                    <div className="flex gap-4 opacity-60 group">
                        <div className="w-10 h-10 rounded bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-emerald-500/20">
                            PM
                        </div>
                        <div className="flex-1">
                            <div className="flex items-baseline gap-2 mb-1">
                                <span className="font-bold text-gray-200">Product Lead</span>
                                <span className="text-xs text-gray-500">10:43 AM</span>
                            </div>
                            <div className="text-gray-400 bg-[#222529] p-3 rounded-r-xl rounded-bl-xl inline-block border border-gray-700/50">
                                We delivered all scoped features. The ticket queue is clear.
                            </div>
                        </div>
                    </div>

                    {/* Message 3 */}
                    <div className="flex gap-4 opacity-60 group">
                        <div className="w-10 h-10 rounded bg-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-purple-500/20">
                            QA
                        </div>
                        <div className="flex-1">
                            <div className="flex items-baseline gap-2 mb-1">
                                <span className="font-bold text-gray-200">QA Lead</span>
                                <span className="text-xs text-gray-500">10:43 AM</span>
                            </div>
                            <div className="text-gray-400 bg-[#222529] p-3 rounded-r-xl rounded-bl-xl inline-block border border-gray-700/50">
                                All user stories passed acceptance criteria. 0 Critical bugs.
                            </div>
                        </div>
                    </div>
                </div>

                {/* Input Area (Choices) */}
                <div className="p-4 bg-[#222529] border-t border-black">
                    <div className="flex justify-between items-center mb-3 text-xs text-gray-400 uppercase font-mono tracking-wider">
                        <span>Your Response Required</span>
                        <span className={`flex items-center gap-1 font-bold ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-blue-400'}`}>
                            <Clock className="w-3 h-3" /> 00:{timeLeft.toString().padStart(2, '0')}
                        </span>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                        <button
                            onClick={() => onContinue("defensive")}
                            className="p-4 text-left bg-[#2D2D2D] hover:bg-[#363636] hover:border-blue-500/50 rounded-lg border border-gray-700 text-sm text-gray-300 transition-all duration-200 flex items-center gap-3 group"
                        >
                            <span className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center text-xs text-gray-500 group-hover:border-blue-500 group-hover:text-blue-500 transition-colors">A</span>
                            "The scope was approved by your team. We delivered exactly that."
                        </button>
                        <button
                            onClick={() => onContinue("investigative")}
                            className="p-4 text-left bg-[#2D2D2D] hover:bg-[#363636] hover:border-blue-500/50 rounded-lg border border-gray-700 text-sm text-gray-300 transition-all duration-200 flex items-center gap-3 group"
                        >
                            <span className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center text-xs text-gray-500 group-hover:border-blue-500 group-hover:text-blue-500 transition-colors">B</span>
                            "Let's look at the user session data. Something is blocking them."
                        </button>
                    </div>
                </div>
            </div>

            {/* Metrics Overlay */}
            <div className="flex justify-between mt-8 max-w-lg mx-auto text-center px-4">
                <div className="bg-red-500/10 border border-red-500/20 px-4 py-2 rounded-lg">
                    <div className="text-2xl font-bold text-red-500 font-mono">+42h</div>
                    <div className="text-[10px] text-red-400 uppercase tracking-wider">Unplanned Rework</div>
                </div>
                <div className="bg-orange-500/10 border border-orange-500/20 px-4 py-2 rounded-lg">
                    <div className="text-2xl font-bold text-orange-500 font-mono">14%</div>
                    <div className="text-[10px] text-orange-400 uppercase tracking-wider">Margin Projection</div>
                </div>
            </div>
        </motion.div>
    );
};

const SystemReaction = ({ onContinue }: { onContinue: () => void }) => (
    <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center max-w-4xl"
    >
        <h2 className="text-xs font-mono text-red-500 uppercase mb-12 tracking-[0.3em] flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4" /> System Reaction Detected
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="p-8 bg-black/40 rounded-2xl border border-orange-500/20 shadow-[0_0_30px_-5px_rgba(249,115,22,0.1)] backdrop-blur-sm relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <TrendingUp className="w-10 h-10 text-orange-500 mx-auto mb-6" />
                <div className="text-3xl font-bold mb-2 text-white">Scope Drift</div>
                <div className="text-sm text-orange-400 font-mono uppercase tracking-wider">Critical (+20%)</div>
            </div>

            <div className="p-8 bg-black/40 rounded-2xl border border-red-500/20 shadow-[0_0_30px_-5px_rgba(239,68,68,0.1)] backdrop-blur-sm relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Activity className="w-10 h-10 text-red-500 mx-auto mb-6" />
                <div className="text-3xl font-bold mb-2 text-white">Team Morale</div>
                <div className="text-sm text-red-400 font-mono uppercase tracking-wider">Low (Burnout risk)</div>
            </div>

            <div className="p-8 bg-black/40 rounded-2xl border border-yellow-500/20 shadow-[0_0_30px_-5px_rgba(234,179,8,0.1)] backdrop-blur-sm relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Shield className="w-10 h-10 text-yellow-500 mx-auto mb-6" />
                <div className="text-3xl font-bold mb-2 text-white">Client Trust</div>
                <div className="text-sm text-yellow-400 font-mono uppercase tracking-wider">Eroding Fast</div>
            </div>
        </div>

        <p className="text-3xl font-light text-white mb-10 leading-relaxed font-display">
            "Small decisions move systems."
        </p>

        <button
            onClick={onContinue}
            className="px-8 py-4 bg-white text-black hover:scale-105 rounded-full text-sm font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
        >
            Zoom Out to Protocol
        </button>
    </motion.div>
);

const DesignationGate = ({ onSelect }: { onSelect: (role: Designation) => void }) => {
    const roles: { id: Designation, label: string, pressure: string, risk: string }[] = [
        { id: "sales", label: "Closer", pressure: "Revenue Targets", risk: "Scope Inflation" },
        { id: "pm", label: "Organizer", pressure: "Time Compression", risk: "Ambiguity" },
        { id: "developer", label: "Builder", pressure: "Deadlines", risk: "Tech Debt" },
        { id: "qa", label: "Guardian", pressure: "Quality", risk: "Bottlenecking" },
        // ... add others
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-5xl w-full"
        >
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Select Your Point of Entry</h1>
                <p className="text-gray-400">Choose the pressure you carry every day.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {roles.map(role => (
                    <button
                        key={role.id}
                        onClick={() => onSelect(role.id)}
                        className="group relative p-6 bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-500 rounded-xl text-left transition-all duration-300"
                    >
                        <h3 className="text-xl font-bold mb-4 group-hover:text-white">{role.label}</h3>
                        <div className="space-y-3 text-sm">
                            <div>
                                <div className="text-xs text-gray-500 group-hover:text-blue-200 uppercase mb-1">Primary Pressure</div>
                                <div className="font-mono text-gray-300 group-hover:text-white">{role.pressure}</div>
                            </div>
                            <div>
                                <div className="text-xs text-gray-500 group-hover:text-blue-200 uppercase mb-1">System Risk</div>
                                <div className="font-mono text-gray-300 group-hover:text-white">{role.risk}</div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>
        </motion.div>
    );
};

// --- MAIN CONTROLLER ---

export const OnboardingLayer = ({ onComplete }: OnboardingLayerProps) => {
    const [phase, setPhase] = useState<OnboardingPhase>(0);

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-6 relative overflow-hidden">
            {/* Background Texture similar to SDLC FrictionSimulation */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 via-black to-black pointer-events-none" />

            <AnimatePresence mode="wait">
                {phase === 0 && <ProjectBrief onContinue={() => setPhase(1)} />}
                {phase === 1 && <SlackWarRoom onContinue={() => setPhase(2)} />}
                {phase === 2 && <SystemReaction onContinue={() => setPhase(3)} />}
                {phase === 3 && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
                        <div className="flex items-center gap-2 text-blue-400 justify-center mb-4"><Zap className="w-5 h-5" /> PROTOCOL UNLOCKED</div>
                        <h2 className="text-3xl font-bold mb-6">The Yes Trap</h2>
                        <button onClick={() => setPhase(5)} className="px-6 py-3 bg-white text-black rounded font-bold">Continue to Role Selection</button>
                    </motion.div>
                )}
                {/* Phase 5: Designation Selection */}
                {phase === 5 && <DesignationGate onSelect={onComplete} />}
            </AnimatePresence>
        </div>
    );
};
