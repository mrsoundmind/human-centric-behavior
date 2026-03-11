import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, ChevronRight, AlertCircle, Zap, Shield } from "lucide-react";

// ============================================================
// ROLE JOURNEY DATA TYPES
// ============================================================
export interface RoleStageChoice {
    label: string;
    sublabel: string;
    type: string;
}

export interface RoleStageOutcome {
    impact: { decisionClarity: number; teamTrust: number; userImpact: number };
    debrief: {
        title: string;
        what: string | string[]; // Support bullets
        why: string | string[];
        how: string | string[];
        who: string | string[];
        tomorrow: string;
    };
}

interface GenericStageProps {
    stageNumber: number;
    totalStages: number;
    title: string;
    story: string;
    uxConnection: string;
    choices: RoleStageChoice[];
    onChoice: (type: string) => void;
    children: React.ReactNode | ((hoveredChoice: string | null) => React.ReactNode);
}

// ============================================================
// MOUSE-FOLLOWING GRADIENT BACKGROUND
// ============================================================
export const GradientBackground = ({ color1 = "#7c3aed", color2 = "#1e40af" }: { color1?: string; color2?: string }) => {
    const [mouse, setMouse] = useState({ x: 50, y: 50 });
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            setMouse({ x, y });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div ref={ref} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div
                className="absolute w-[80vw] h-[80vh] rounded-full opacity-[0.12] blur-[120px] transition-all duration-1000 ease-out"
                style={{
                    background: `radial-gradient(circle, ${color1}, transparent 70%)`,
                    left: `${mouse.x - 40}%`,
                    top: `${mouse.y - 40}%`,
                }}
            />
            <div
                className="absolute w-[60vw] h-[60vh] rounded-full opacity-[0.08] blur-[100px] transition-all duration-1500 ease-out"
                style={{
                    background: `radial-gradient(circle, ${color2}, transparent 70%)`,
                    left: `${100 - mouse.x - 30}%`,
                    top: `${100 - mouse.y - 30}%`,
                }}
            />
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />
        </div>
    );
};

// Helper for rendering content (bullets or text)
const ContentRenderer = ({ content, className = "" }: { content: string | string[], className?: string }) => {
    const items = Array.isArray(content) ? content : [content];
    if (items.length > 1 || items[0].includes("•")) {
        const bulletItems = Array.isArray(content) ? content : content.split("•").filter(Boolean).map(s => s.trim());
        return (
            <ul className={`space-y-3 ${className}`}>
                {bulletItems.map((item, i) => (
                    <li key={i} className="flex gap-3 items-start group">
                        <div className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2 shrink-0 group-hover:bg-white/50 transition-colors" />
                        <span className="text-white/70 leading-relaxed font-light">{item}</span>
                    </li>
                ))}
            </ul>
        );
    }
    return <p className={`text-white/70 leading-relaxed font-light ${className}`}>{items[0]}</p>;
};

// ============================================================
// GENERIC STAGE WRAPPER — Now with hover interactivity
// ============================================================
export const GenericStageWrapper = ({
    stageNumber, totalStages, title, story, uxConnection, choices, onChoice, children
}: GenericStageProps) => {
    const [selected, setSelected] = useState<string | null>(null);
    const [hoveredChoice, setHoveredChoice] = useState<string | null>(null);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setRevealed(true), 100);
        return () => clearTimeout(t);
    }, []);

    const handleChoice = (type: string) => {
        if (selected) return;
        setSelected(type);
        setTimeout(() => onChoice(type), 300);
    };

    return (
        <div className="max-w-7xl mx-auto relative z-10">
            {/* Header / Progress */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between mb-8 px-1"
            >
                <div className="flex items-center gap-4">
                    <span className="text-[11px] font-mono text-white/30 uppercase tracking-[0.25em]">
                        Scenario {String(stageNumber).padStart(2, "0")} Handled
                    </span>
                    <div className="h-px w-8 bg-white/10" />
                    <span className="text-[13px] font-semibold text-white/60">{title}</span>
                </div>
                <div className="flex gap-1.5">
                    {Array.from({ length: totalStages }).map((_, i) => (
                        <div key={i} className={`h-0.5 w-4 rounded-full ${i < stageNumber ? "bg-white" : "bg-white/15"}`} />
                    ))}
                </div>
            </motion.div>

            <div className="grid grid-cols-12 gap-8">
                {/* Left: Interactive Visualizer */}
                <motion.div
                    className="col-span-7 flex flex-col justify-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: revealed ? 1 : 0, x: revealed ? 0 : -20 }}
                >
                    {typeof children === 'function' ? children(hoveredChoice) : children}
                </motion.div>

                {/* Right: Decision Panel */}
                <div className="col-span-5 flex flex-col gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 20 }}
                        className="rounded-3xl p-8 border border-white/[0.08]"
                        style={{ background: "rgba(255,255,255,0.02)", backdropFilter: "blur(20px)" }}
                    >
                        <p className="text-[10px] font-mono text-white/25 uppercase tracking-[0.3em] mb-6">The Situation</p>
                        <p className="text-[15px] text-white/80 leading-relaxed font-light mb-6">
                            {story}
                        </p>
                        <div className="pt-6 border-t border-white/[0.05]">
                            <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] mb-2 italic">UX Connection</p>
                            <p className="text-[13px] text-white/40 leading-relaxed">{uxConnection}</p>
                        </div>
                    </motion.div>

                    <motion.div className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                        <p className="text-[10px] font-mono text-white/25 uppercase tracking-[0.3em] ml-2">Your Move</p>
                        {choices.map((choice, idx) => (
                            <motion.button
                                key={choice.type}
                                onMouseEnter={() => setHoveredChoice(choice.type)}
                                onMouseLeave={() => setHoveredChoice(null)}
                                onClick={() => handleChoice(choice.type)}
                                disabled={!!selected}
                                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${selected === choice.type ? "border-white/50 bg-white/10 scale-[1.02]" :
                                    selected ? "opacity-30 border-white/[0.02] grayscale" : "border-white/[0.06] hover:border-white/30 hover:bg-white/[0.03]"
                                    }`}
                            >
                                <div className="flex gap-4 items-start relative z-10">
                                    <div className={`mt-0.5 text-[11px] font-mono ${selected === choice.type ? "text-white" : "text-white/20"}`}>
                                        {String.fromCharCode(65 + idx)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[14px] font-bold text-white mb-1">{choice.label}</p>
                                        <p className="text-[11px] text-white/30 uppercase tracking-widest font-mono">{choice.sublabel}</p>
                                    </div>
                                    <ChevronRight className={`w-4 h-4 mt-0.5 transition-transform ${selected === choice.type ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"}`} />
                                </div>
                            </motion.button>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

// ============================================================
// GENERIC DEBRIEF OVERLAY — Premium "System Scan" UI
// ============================================================
export const GenericDebriefOverlay = ({ debrief, onNext, isLastStage }: DebriefOverlayProps) => {
    if (!debrief) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-[100] bg-[#050507] overflow-y-auto overflow-x-hidden selection:bg-red-500/30 font-sans"
            >
                {/* Tactical Grid Background */}
                <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
                <div className="fixed inset-0 bg-gradient-to-b from-red-500/5 via-transparent to-transparent pointer-events-none" />

                <div className="min-h-screen flex items-center justify-center p-6 md:p-12 relative">
                    <div className="max-w-6xl w-full">

                        {/* Header Section */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="mb-12 border-l-2 border-red-500/50 pl-8 py-2"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="px-2 py-0.5 rounded bg-red-500/10 border border-red-500/20 text-[10px] font-mono text-red-400 uppercase tracking-[0.2em]">Post-Decision Analysis</div>
                                <div className="h-px w-12 bg-white/10" />
                                <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">System State: 0x4F2</span>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-black text-white leading-[1.1] tracking-tight">{debrief.title}</h2>
                        </motion.div>

                        {/* Analysis Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

                            {/* Left Side: Reality & Ripples */}
                            <div className="space-y-8">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 backdrop-blur-md relative overflow-hidden group hover:border-white/10 transition-colors"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <AlertCircle className="w-12 h-12" />
                                    </div>
                                    <p className="text-[11px] font-mono text-red-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2 font-bold">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> The Visible Reality
                                    </p>
                                    <ContentRenderer content={debrief.what} className="text-lg text-white/80 leading-relaxed font-light" />
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-8 backdrop-blur-md relative overflow-hidden group hover:border-white/10 transition-colors"
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <Zap className="w-12 h-12" />
                                    </div>
                                    <p className="text-[11px] font-mono text-orange-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2 font-bold">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" /> The Invisible Ripples
                                    </p>
                                    <ContentRenderer content={debrief.how} className="text-lg text-white/80 leading-relaxed font-light" />
                                </motion.div>
                            </div>

                            {/* Right Side: Logic & Action */}
                            <div className="space-y-8">
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="bg-white/[0.03] border border-white/[0.1] rounded-3xl p-8 backdrop-blur-md h-full flex flex-col"
                                >
                                    <div className="flex-1 mb-12">
                                        <p className="text-[11px] font-mono text-white/30 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                                            <Shield className="w-4 h-4" /> Root Cause Breakdown
                                        </p>
                                        <div className="pl-6 border-l border-white/10">
                                            <ContentRenderer content={debrief.why} className="text-base text-white/50 leading-relaxed font-light space-y-4" />
                                        </div>
                                    </div>

                                    <div className="p-8 rounded-2xl bg-white text-black relative group overflow-hidden shadow-[0_20px_50px_rgba(255,255,255,0.1)]">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-black opacity-[0.03] rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                                        <p className="text-[10px] font-mono text-black/40 uppercase tracking-[0.3em] mb-4">Mastery Commitment</p>
                                        <p className="text-[20px] leading-tight font-black italic">"{debrief.tomorrow}"</p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>

                        {/* Footer / CTA */}
                        <div className="flex justify-between items-center border-t border-white/5 pt-12">
                            <div className="hidden md:block">
                                <p className="text-[10px] font-mono text-white/10 uppercase tracking-widest whitespace-nowrap">Encryption Level: Standard Corporate-Grade</p>
                            </div>
                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                onClick={onNext}
                                className="group relative flex items-center gap-6 text-white overflow-hidden py-4 px-10 rounded-full border border-white/20 hover:border-white transition-all bg-white/[0.02] hover:bg-white text-black"
                            >
                                <span className="relative z-10 text-[12px] font-black uppercase tracking-[0.4em] group-hover:text-black transition-colors">
                                    {isLastStage ? "Generate Profile Analysis" : "Next Scenario"}
                                </span>
                                <div className="relative z-10 w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-black/5 transition-all">
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform group-hover:text-black" />
                                </div>
                            </motion.button>
                        </div>

                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

// ============================================================
// GENERIC BRIEFING OVERLAY — High-Impact Mission Start
// ============================================================
export const GenericBriefingOverlay = ({ title, scenario, story, uxConnection, realLifeImpact, onStart }: BriefingOverlayProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98, filter: "blur(20px)" }}
            className="fixed inset-0 z-[200] bg-[#030303] overflow-y-auto font-sans text-white selection:bg-blue-500/30"
        >
            {/* Cinematic Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[60vw] h-[60vw] rounded-full bg-blue-600/10 blur-[150px] animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] rounded-full bg-purple-600/5 blur-[120px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] mix-blend-overlay" />
            </div>

            <div className="min-h-screen flex items-center justify-center p-6 md:p-12 relative z-10">
                <div className="max-w-5xl w-full">

                    {/* Mission Header */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-3 mb-8">
                            <div className="px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] font-mono text-blue-400 uppercase tracking-[0.3em]">Operational Readiness</div>
                            <div className="h-px w-16 bg-white/10" />
                        </div>
                        <h1 className="text-6xl md:text-[84px] font-black leading-[0.85] tracking-tighter mb-8 italic uppercase outline-text">
                            {title}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/50 font-light tracking-wide max-w-2xl leading-relaxed">
                            {scenario}
                        </p>
                    </motion.div>

                    {/* Information Cluster */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        {[
                            { label: "The Scenario", content: story, icon: AlertCircle, color: "red" },
                            { label: "UX Connection", content: uxConnection, icon: Zap, color: "blue" },
                            { label: "High-Stakes Cost", content: realLifeImpact, icon: Shield, color: "orange" },
                        ].map((card, i) => (
                            <motion.div
                                key={card.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-white shadow-xl rounded-[2rem] -rotate-1 opacity-0 group-hover:opacity-[0.03] transition-all duration-500" />
                                <div className="p-10 rounded-[2rem] border border-white/[0.05] bg-white/[0.02] backdrop-blur-xl h-full flex flex-col relative z-10 transition-all duration-300 group-hover:translate-y-[-4px] group-hover:border-white/10">
                                    <div className={`w-12 h-12 rounded-2xl bg-${card.color}-500/10 flex items-center justify-center mb-8 border border-${card.color}-500/20 group-hover:scale-110 transition-transform`}>
                                        <card.icon className={`w-6 h-6 text-${card.color}-400`} />
                                    </div>
                                    <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.4em] mb-6">{card.label}</p>
                                    <div className="flex-1">
                                        <ContentRenderer content={card.content} className="text-[15px] leading-relaxed text-white/70 font-light" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Action */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="flex flex-col md:flex-row items-center gap-10"
                    >
                        <button
                            onClick={onStart}
                            className="group relative px-12 py-6 bg-white text-black rounded-full font-black text-sm uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.15)] overflow-hidden"
                        >
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-black/10 transition-all group-hover:h-full group-hover:opacity-5" />
                            <span className="relative z-10 flex items-center gap-4">
                                Enter Simulation <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </span>
                        </button>
                        <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em] max-w-[200px] leading-relaxed">
                            Decisions will impact role-specific mastery metrics in real-time.
                        </p>
                    </motion.div>
                </div>
            </div>

            <style>{`
                .outline-text {
                    color: white;
                    text-shadow: 0 0 20px rgba(255,255,255,0.1);
                }
            `}</style>
        </motion.div>
    );
};


interface BriefingOverlayProps {
    title: string;
    scenario: string;
    story: string | string[];
    uxConnection: string | string[];
    realLifeImpact: string | string[];
    onStart: () => void;
}

interface DebriefOverlayProps {
    debrief: RoleStageOutcome["debrief"] | null;
    onNext: () => void;
    isLastStage: boolean;
}
