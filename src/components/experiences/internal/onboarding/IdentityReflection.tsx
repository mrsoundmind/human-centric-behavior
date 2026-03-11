import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Clock, Users, Shield, Activity, ArrowRight, UserCircle2 } from "lucide-react";

interface IdentityReflectionProps {
    onContinue: () => void;
}

const INSTINCTS = [
    {
        id: "timeline",
        label: "Get it done on time",
        icon: <Clock className="w-6 h-6" />,
        color: "from-blue-500 to-cyan-500",
        shadow: "shadow-blue-500/20",
        description: "Even if the output isn't perfect. Speed is a form of respect.",
        selfReflect: "You absorb pressure to protect others from stress."
    },
    {
        id: "relationship",
        label: "Keep everyone happy",
        icon: <Users className="w-6 h-6" />,
        color: "from-purple-500 to-pink-500",
        shadow: "shadow-purple-500/20",
        description: "Even if it means working extra hours or expanding scope quietly.",
        selfReflect: "You say yes to preserve the relationship, not the plan."
    },
    {
        id: "scope",
        label: "Stick to what was agreed",
        icon: <Shield className="w-6 h-6" />,
        color: "from-emerald-500 to-teal-500",
        shadow: "shadow-emerald-500/20",
        description: "Even if the client asks for more. Boundaries protect everyone.",
        selfReflect: "You protect the system, even when it creates short-term friction."
    },
    {
        id: "quality",
        label: "Build it right",
        icon: <Activity className="w-6 h-6" />,
        color: "from-orange-500 to-amber-500",
        shadow: "shadow-orange-500/20",
        description: "Even if it takes longer. Rushing leads to rework that costs more.",
        selfReflect: "You push back on deadlines before shipping something imperfect."
    },
];

export const IdentityReflection = ({ onContinue }: IdentityReflectionProps) => {
    const [selectedId, setSelectedId] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-[#030305] text-white flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden font-sans">
            {/* Ambient Background */}
            <AnimatePresence>
                {selectedId && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        exit={{ opacity: 0 }}
                        className={`absolute inset-0 bg-gradient-to-t ${INSTINCTS.find(i => i.id === selectedId)?.color} blur-[120px] pointer-events-none transition-colors duration-1000`}
                    />
                )}
            </AnimatePresence>
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

            <div className="max-w-5xl w-full z-10 relative">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md mb-8">
                        <UserCircle2 className="w-4 h-4 text-purple-400" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400">Step 3: Identity Calibration</span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-6">
                        Under pressure,<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">what do you automatically protect?</span>
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        This is your instinct — not your job title. There is no right answer. Just your real default setting when things get tense.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
                    {INSTINCTS.map((instinct, index) => {
                        const isSelected = selectedId === instinct.id;
                        return (
                            <motion.button
                                key={instinct.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setSelectedId(instinct.id)}
                                className={`text-left p-6 rounded-2xl border transition-all duration-500 relative overflow-hidden group ${isSelected
                                        ? "bg-[#111115] border-white/20 scale-[1.02]"
                                        : "bg-[#0a0a0c] border-white/[0.05] hover:border-white/[0.1] hover:bg-[#111115]"
                                    }`}
                            >
                                {/* Glowing border for selected state */}
                                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${instinct.color} transition-opacity duration-300 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                                <div className={`absolute inset-0 bg-gradient-to-br ${instinct.color} opacity-0 transition-opacity duration-500 blur-2xl -z-10 ${isSelected ? 'opacity-5' : 'group-hover:opacity-[0.02]'}`} />

                                <div className="flex items-center gap-4 mb-4 relative z-10">
                                    <div className={`p-3 rounded-xl transition-colors duration-300 ${isSelected ? `bg-gradient-to-br ${instinct.color} text-white` : 'bg-white/[0.03] text-gray-400 group-hover:text-white'}`}>
                                        {instinct.icon}
                                    </div>
                                    <h3 className={`text-xl font-bold transition-colors duration-300 ${isSelected ? 'text-white' : 'text-gray-300'}`}>{instinct.label}</h3>
                                </div>

                                <p className="text-sm text-gray-500 leading-relaxed relative z-10 mb-4 h-10">
                                    {instinct.description}
                                </p>

                                <AnimatePresence>
                                    {isSelected && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="pt-4 border-t border-white/[0.05] mt-4"
                                        >
                                            <p className="text-sm font-mono text-purple-300/80 italic">
                                                <span className="text-purple-400 font-bold not-italic">Hidden Truth: </span>
                                                {instinct.selfReflect}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        );
                    })}
                </div>

                <div className="flex justify-center h-20">
                    <AnimatePresence>
                        {selectedId && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                            >
                                <button
                                    onClick={onContinue}
                                    className={`group relative px-10 py-5 bg-white text-black rounded-full font-black text-sm uppercase tracking-[0.2em] transition-all hover:scale-105 overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.15)]`}
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-r ${INSTINCTS.find(i => i.id === selectedId)?.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                    <span className="relative z-10 flex items-center justify-center gap-3 mix-blend-difference text-white">
                                        Confirm Identity & Begin Role <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
};
