import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, ChevronRight, AlertCircle, Zap, Shield } from "lucide-react";
import { HighlightText } from "./designation-portal/ScenarioRenderer";

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
    allStageLabels?: string[]; // Provides the context for the carousel indicator
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
                    backgroundImage: `linear-gradient(hsl(var(--foreground) / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground) / 0.5) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px",
                }}
            />
        </div>
    );
};

// ============================================================
// PHASE CAROUSEL INDICATOR — Top-level progress with context
// ============================================================
export const PhaseCarouselIndicator = ({ currentIdx, labels }: { currentIdx: number, labels: string[] }) => {
    return (
        <div className="absolute top-8 left-0 right-0 z-50 flex flex-col items-center justify-center pointer-events-none">
            <div className="flex items-center gap-12 bg-background/80 backdrop-blur-xl px-10 py-5 rounded-full border border-border shadow-lg">
                {labels.map((label, idx) => {
                    const isActive = idx === currentIdx;
                    const isPast = idx < currentIdx;
                    return (
                        <div key={idx} className="flex flex-col items-center gap-3 relative">
                            {/* Connecting Line (drawn to the next dot) */}
                            {idx < labels.length - 1 && (
                                <div className="absolute top-[3px] left-[50%] w-full h-px bg-border" style={{ transform: 'translateX(5px)', width: 'calc(100% + 2rem)' }}>
                                    {isPast && (
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: '100%' }}
                                            className="h-full bg-foreground/50"
                                        />
                                    )}
                                </div>
                            )}

                            {/* Dot */}
                            <motion.div
                                animate={{
                                    scale: isActive ? 1.5 : 1,
                                    backgroundColor: isActive ? "hsl(var(--foreground))" : isPast ? "hsl(var(--muted-foreground))" : "hsl(var(--muted))",
                                }}
                                className={`w-2 h-2 rounded-full relative z-10 transition-colors ${isActive ? 'shadow-lg' : ''}`}
                            />

                            {/* Label */}
                            <span
                                className={`absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono tracking-widest uppercase transition-all duration-500 ${
                                    isActive ? "text-foreground opacity-100 font-bold" : isPast ? "text-foreground opacity-40" : "text-foreground opacity-20"
                                }`}
                            >
                                {label}
                            </span>
                        </div>
                    );
                })}
            </div>
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
                        <div className="w-1.5 h-1.5 rounded-full bg-muted mt-2 shrink-0 group-hover:bg-muted-foreground transition-colors" />
                        <span className="text-muted-foreground leading-relaxed font-light"><HighlightText text={item} /></span>
                    </li>
                ))}
            </ul>
        );
    }
    return <p className={`text-muted-foreground leading-relaxed font-light ${className}`}><HighlightText text={items[0]} /></p>;
};

// ============================================================
// GENERIC STAGE WRAPPER — Now with hover interactivity
// ============================================================
export const GenericStageWrapper = ({
    stageNumber, totalStages, title, story, uxConnection, choices, onChoice, children, allStageLabels
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
        <div className="max-w-7xl mx-auto relative z-10 pt-16">
            
            {/* Context-Aware Phase Carousel Indicator */}
            {allStageLabels && (
                <PhaseCarouselIndicator currentIdx={stageNumber - 1} labels={allStageLabels} />
            )}

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 mb-8 px-1"
            >
                <span className="text-[11px] font-mono text-muted-foreground/70 uppercase tracking-[0.25em]">
                    Scenario {String(stageNumber).padStart(2, "0")} Handled
                </span>
                <div className="h-px w-8 bg-border" />
                <span className="text-[13px] font-semibold text-muted-foreground">{title}</span>
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
                        className="rounded-3xl p-8 border border-border bg-muted backdrop-blur-xl"
                    >
                        <p className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-[0.3em] mb-6">The Situation</p>
                        <p className="text-[15px] text-foreground leading-relaxed font-light mb-6">
                            <HighlightText text={story} />
                        </p>
                        <div className="pt-6 border-t border-border">
                            <p className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-[0.2em] mb-2 italic">UX Connection</p>
                            <p className="text-[13px] text-muted-foreground/70 leading-relaxed"><HighlightText text={uxConnection} /></p>
                        </div>
                    </motion.div>

                    <motion.div className="space-y-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                        <p className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-[0.3em] ml-2">Your Move</p>
                        {choices.map((choice, idx) => (
                            <motion.button
                                key={choice.type}
                                onMouseEnter={() => setHoveredChoice(choice.type)}
                                onMouseLeave={() => setHoveredChoice(null)}
                                onClick={() => handleChoice(choice.type)}
                                disabled={!!selected}
                                className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative overflow-hidden group ${selected === choice.type ? "border-primary/30 bg-primary/10 scale-[1.02]" :
                                    selected ? "opacity-30 border-border grayscale" : "border-border hover:border-primary/30 hover:bg-muted"
                                    }`}
                            >
                                <div className="flex gap-4 items-start relative z-10">
                                    <div className={`mt-0.5 text-[11px] font-mono ${selected === choice.type ? "text-foreground" : "text-muted-foreground/70"}`}>
                                        {String.fromCharCode(65 + idx)}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-[14px] font-bold text-foreground mb-1"><HighlightText text={choice.label} /></p>
                                        <p className="text-[11px] text-muted-foreground/70 uppercase tracking-widest font-mono"><HighlightText text={choice.sublabel} /></p>
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
                className="fixed inset-0 z-[100] bg-background overflow-y-auto overflow-x-hidden selection:bg-destructive/30 font-sans"
            >
                {/* Tactical Grid Background */}
                <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
                <div className="fixed inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />

                <div className="min-h-screen flex items-center justify-center p-6 md:p-12 relative">
                    <div className="max-w-4xl w-full">
                        {/* Debrief Analysis Narrative - Unified Card UI */}
                        <div className="bg-muted border border-border rounded-[2rem] p-8 lg:p-12 backdrop-blur-xl relative overflow-hidden shadow-lg">
                            <div className="space-y-10 relative z-10">

                                {/* Header Section */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="px-3 py-1 bg-muted border border-border rounded-full text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] backdrop-blur-sm">
                                            System State: 0x4F2
                                        </div>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black text-foreground leading-[1.1] tracking-tight">
                                        <HighlightText text={debrief.title} />
                                    </h2>
                                </div>

                                {/* Section 1: The Reality */}
                                <div>
                                    <h4 className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" /> The Reality
                                    </h4>
                                    <ContentRenderer content={debrief.what} className="text-[16px] xl:text-[18px] text-foreground leading-relaxed font-light" />
                                </div>

                                {/* Section 2: Mechanism & Root Cause */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border">
                                    <div>
                                        <h4 className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-[0.2em] mb-4 italic">
                                            The Root Cause
                                        </h4>
                                        <ContentRenderer content={debrief.why} className="text-[14px] text-muted-foreground leading-relaxed font-light" />
                                    </div>
                                    <div>
                                        <h4 className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-[0.2em] mb-4 italic">
                                            The Ripple Effect
                                        </h4>
                                        <ContentRenderer content={debrief.how} className="text-[14px] text-muted-foreground leading-relaxed font-light" />
                                    </div>
                                </div>

                                {/* Section 3: Identity Shift (Action) */}
                                <div className="pt-8 border-t border-border">
                                    <h4 className="text-[10px] font-mono text-muted-foreground uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Identity Shift
                                    </h4>
                                    <p className="text-[16px] text-primary leading-relaxed font-medium italic mb-2 relative z-10">
                                        "{debrief.tomorrow}"
                                    </p>
                                </div>

                                {/* Advance Button (End of Reading Flow) */}
                                <div className="pt-8 border-t border-border">
                                    <motion.button
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.8 }}
                                        onClick={onNext}
                                        className="group w-full py-5 bg-primary text-primary-foreground rounded-full font-black text-[12px] uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-4"
                                    >
                                        <span className="relative z-10">
                                            {isLastStage ? "Generate Profile Analysis" : "Next Scenario"}
                                        </span>
                                        <div className="relative z-10 w-6 h-6 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-all">
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </motion.button>
                                </div>

                            </div>
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
            className="fixed inset-0 z-[200] bg-background overflow-y-auto font-sans text-foreground selection:bg-primary/30"
        >
            {/* Cinematic Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[60vw] h-[60vw] rounded-full bg-primary/10 blur-[150px] animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] rounded-full bg-accent/5 blur-[120px]" />
            </div>

            <div className="min-h-screen flex items-center justify-center p-6 md:p-12 relative z-10">
                <div className="max-w-5xl w-full">

                    {/* Mission Header */}
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-16"
                    >
                        <div className="flex items-center gap-4 mb-8">
                            <div className="px-3 py-1 bg-muted border border-border rounded-full text-[10px] font-mono text-muted-foreground uppercase tracking-[0.2em] backdrop-blur-sm">
                                Operational Readiness
                            </div>
                            <div className="h-px w-24 bg-border" />
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-black text-foreground leading-[1.1] tracking-tight drop-shadow-2xl mb-8 uppercase">
                            <HighlightText text={title} />
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide max-w-2xl leading-relaxed">
                            <HighlightText text={scenario} />
                        </p>
                    </motion.div>

                    {/* Information Cluster */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        {[
                            { label: "The Scenario", content: story, icon: AlertCircle, accent: "destructive" as const },
                            { label: "UX Connection", content: uxConnection, icon: Zap, accent: "primary" as const },
                            { label: "High-Stakes Cost", content: realLifeImpact, icon: Shield, accent: "destructive" as const },
                        ].map((card, i) => (
                            <motion.div
                                key={card.label}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 + i * 0.1 }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-foreground shadow-lg rounded-[2rem] -rotate-1 opacity-0 group-hover:opacity-[0.03] transition-all duration-500" />
                                <div className="p-10 rounded-[2rem] border border-border bg-muted backdrop-blur-xl h-full flex flex-col relative z-10 transition-all duration-300 group-hover:translate-y-[-4px] group-hover:border-border">
                                    <div className={`w-12 h-12 rounded-2xl ${card.accent === "primary" ? "bg-primary/10 border-primary/20" : "bg-destructive/10 border-destructive/20"} flex items-center justify-center mb-8 border group-hover:scale-110 transition-transform`}>
                                        <card.icon className={`w-6 h-6 ${card.accent === "primary" ? "text-primary" : "text-destructive"}`} />
                                    </div>
                                    <p className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-[0.4em] mb-6">{card.label}</p>
                                    <div className="flex-1">
                                        <ContentRenderer content={card.content} className="text-[15px] leading-relaxed text-muted-foreground font-light" />
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
                            className="group relative px-12 py-6 bg-primary text-primary-foreground rounded-full font-black text-sm uppercase tracking-[0.3em] hover:scale-105 active:scale-95 transition-all shadow-lg overflow-hidden"
                        >
                            <div className="absolute inset-x-0 bottom-0 h-1 bg-primary-foreground/10 transition-all group-hover:h-full group-hover:opacity-5" />
                            <span className="relative z-10 flex items-center gap-4">
                                Enter Simulation <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                            </span>
                        </button>
                        <p className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-[0.2em] max-w-[200px] leading-relaxed">
                            Decisions will impact role-specific mastery metrics in real-time.
                        </p>
                    </motion.div>
                </div>
            </div>
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
