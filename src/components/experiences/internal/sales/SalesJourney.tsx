
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Users, TrendingUp, Info, Activity } from "lucide-react";// Import Stages
import { Stage1_LeadGen } from "./Stage1_LeadGen";
import { Stage2_Meeting } from "./Stage2_Meeting";
import { Stage3_Proposal } from "./Stage3_Proposal";
import { Stage4_Closing } from "./Stage4_Closing";
import { Stage5_Handover } from "./Stage5_Handover";

type SalesStage = "prospecting" | "diagnostic" | "alignment" | "partnership" | "ltv" | "complete";

interface SystemState {
    externalTrust: number; // Client Relationship Depth
    internalCapital: number; // Team & PM Relationship (Morale)
    retainedValue: number; // Sustainability / Margin of the deal
}

interface Debrief {
    title: string;
    why: string;
    what: string;
    how: string;
    who: string;
    tomorrow?: string;
}

interface Briefing {
    title: string;
    scenario: string;
    story: string;
    whyUX: string;
    realLife: string;
    businessValue: string; // The "Why are we doing this?"
    uxAnchor: string;      // The exact UX script to use
}

const STAGE_BRIEFINGS: Record<SalesStage, Briefing | null> = {
    prospecting: {
        title: "The Top of Funnel",
        scenario: "Prospecting & The Authority Anchor",
        story: "Marketing wants you to blast a generic 'Feature List' email to 1,000 prospects to hit quota. You are drafting an email to James Dalton, CTO of GLS.",
        whyUX: "A generic automated email is a terrible User Experience for the buyer (high noise, low signal). Insight selling designs a premium top-of-funnel UX.",
        realLife: "If you sound like a spam bot, executives will block you. Elevating your initial outreach UX determines if you get a meeting.",
        businessValue: "Generate Pipeline that actually closes. A premium first-touch UX filters out price-shoppers and attracts strategic partners.",
        uxAnchor: "\"Our goal isn't just to deploy software; it's to design a frictionless onboarding UX that reduces your team's time-to-value by 30%.\""
    },
    diagnostic: {
        title: "The Discovery",
        scenario: "The Consultative Diagnostic",
        story: "You secured the Zoom meeting. James mentions a 14% efficiency drop. Sarah, your Pre-Sales Engineer, immediately starts demoing technical features.",
        whyUX: "Pitching technical features before understanding the problem creates high cognitive load (Bad UX). Socratic discovery centers the user's specific workflow.",
        realLife: "Selling features creates price-shoppers. Selling business outcomes creates premium partnerships.",
        businessValue: "Protecting Deal Value. If you let engineers feature-dump, the client compares you on price. If you diagnose the pain, you compare on value.",
        uxAnchor: "\"Before we jump into the UI, let's map out your current workflow. What is the biggest UX bottleneck your team faces today?\""
    },
    alignment: {
        title: "The Proposal",
        scenario: "Strategic Alignment & Bureaucracy",
        story: "James wants the pilot live in 4 weeks. Your VP says 'Say yes to get the signature.' Your PM says '4 weeks is impossible, the team will quit.'",
        whyUX: "Agreeing to an impossible timeline guarantees a broken delivery UX down the line. A Phased Approach designs a sustainable user journey.",
        realLife: "A 'Yes' that you can't deliver destroys Lifetime Value. Elite reps negotiate boundaries to protect the client's long-term experience.",
        businessValue: "Ensuring Sustainability. Winning a deal that your delivery team cannot fulfill destroys both Client Trust and Internal Morale.",
        uxAnchor: "\"I can get a signature today for a 4-week delivery, but that guarantees a rushed, broken rollout experience. Let's design a Phase 1 that guarantees success.\""
    },
    partnership: {
        title: "The Close",
        scenario: "The Mutual Success Agreement",
        story: "The deal is blocked in Legal. Your internal counsel refuses to accept the client's uncapped liability redlines. The VP wants you to force it through.",
        whyUX: "Procurement friction is directly inversely proportional to speed-to-value. Designing a smooth legal experience reduces the client's time-to-value.",
        realLife: "Treating your internal Legal team as an enemy means they will scrutinize every deal you bring. You must be the 'Executive Grease'.",
        businessValue: "Accelerating Time-to-Revenue. Legal gridlock kills momentum. Acting as the Executive Bridge gets contracts signed faster without risking company liability.",
        uxAnchor: "\"We aren't just selling a tool; we are building a long-term partnership. Let's design a procurement experience that protects both our entities.\""
    },
    ltv: {
        title: "Handover",
        scenario: "Relationship Stewardship",
        story: "The contract is signed. It's time to hand the account over to Mike, the Lead PM. Mike resents Sales for 'throwing things over the fence.'",
        whyUX: "The handover is the most critical UX touchpoint of the lifecycle. Transferring relationship capital ensures the user feels safe transitioning to Delivery.",
        realLife: "If delivery fails due to poor context, your 'win' becomes a churn statistic. Elite RMs sell the success of their PMs.",
        businessValue: "Maximizing Lifetime Value. A deal isn't won at signature; it's won when the client renews. Securing the handover UX secures the renewal.",
        uxAnchor: "\"Mike isn't just an implementer; he's the chief architect of your ongoing User Experience. I am transferring all my executive capital to him.\""
    },
    complete: null
};

export const SalesJourney = ({ onComplete }: { onComplete?: () => void }) => {
    const [currentStage, setCurrentStage] = useState<SalesStage>("prospecting");
    const [showDebrief, setShowDebrief] = useState(false);
    const [showBriefing, setShowBriefing] = useState(true);
    const [lastDebrief, setLastDebrief] = useState<Debrief | null>(null);

    // Initial System State (Elite Baseline)
    const [systemState, setSystemState] = useState<SystemState>({
        externalTrust: 50,
        internalCapital: 70,
        retainedValue: 60
    });

    const handleStageComplete = (stage: SalesStage, result: { impact: Partial<SystemState>, debrief: Debrief }) => {
        // Update Metrics
        setSystemState(prev => ({
            externalTrust: Math.max(0, Math.min(100, prev.externalTrust + (result.impact.externalTrust || 0))),
            internalCapital: Math.max(0, Math.min(100, prev.internalCapital + (result.impact.internalCapital || 0))),
            retainedValue: Math.max(0, Math.min(100, prev.retainedValue + (result.impact.retainedValue || 0)))
        }));

        setLastDebrief(result.debrief);
        setShowDebrief(true);
    };

    const nextStage = () => {
        setShowDebrief(false);
        if (currentStage === "prospecting") { setCurrentStage("diagnostic"); setShowBriefing(true); }
        else if (currentStage === "diagnostic") { setCurrentStage("alignment"); setShowBriefing(true); }
        else if (currentStage === "alignment") { setCurrentStage("partnership"); setShowBriefing(true); }
        else if (currentStage === "partnership") { setCurrentStage("ltv"); setShowBriefing(true); }
        else if (currentStage === "ltv") {
            setCurrentStage("complete");
            onComplete?.();
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">            {/* Stage Orchestrator */}
            <main className="pt-32 pb-12 px-6">
                <AnimatePresence mode="wait">
                    {currentStage === "prospecting" && (
                        <motion.div key="stage1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Stage1_LeadGen onComplete={(res) => handleStageComplete("prospecting", res)} />
                        </motion.div>
                    )}
                    {currentStage === "diagnostic" && (
                        <motion.div key="stage2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Stage2_Meeting onComplete={(res) => handleStageComplete("diagnostic", res)} />
                        </motion.div>
                    )}
                    {currentStage === "alignment" && (
                        <motion.div key="stage3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Stage3_Proposal onComplete={(res) => handleStageComplete("alignment", res)} />
                        </motion.div>
                    )}
                    {currentStage === "partnership" && (
                        <motion.div key="stage4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Stage4_Closing onComplete={(res) => handleStageComplete("partnership", res)} />
                        </motion.div>
                    )}
                    {currentStage === "ltv" && (
                        <motion.div key="stage5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <Stage5_Handover onComplete={(res) => handleStageComplete("ltv", res)} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Debrief Overlay — Premium Monochrome */}
            <AnimatePresence>
                {showDebrief && lastDebrief && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-background overflow-y-auto"
                    >
                        <div className="max-w-2xl mx-auto px-6 py-20">
                            {/* Label */}
                            <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted-foreground/70 mb-8">Decision Analysis</p>

                            {/* Title */}
                            <h2 className="text-3xl font-black tracking-tight text-foreground mb-10 leading-tight">{lastDebrief.title}</h2>

                            {/* Sections */}
                            <div className="space-y-0 divide-y divide-border">
                                {[
                                    { label: "What happened", content: lastDebrief.what },
                                    { label: "Why it matters", content: lastDebrief.why },
                                    { label: "The UX consequence", content: lastDebrief.how },
                                    { label: "The pattern this creates", content: lastDebrief.who },
                                ].map((s, i) => (
                                    <div key={i} className="py-7">
                                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/70 mb-3">{s.label}</p>
                                        <p className="text-[15px] text-muted-foreground leading-relaxed font-light">{s.content}</p>
                                    </div>
                                ))}

                                {lastDebrief.tomorrow && (
                                    <div className="py-7">
                                        <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/70 mb-3">Try this tomorrow</p>
                                        <p className="text-[15px] text-foreground leading-relaxed font-light border-l border-primary/30 pl-5">{lastDebrief.tomorrow}</p>
                                    </div>
                                )}
                            </div>

                            <div className="pt-12">
                                <button
                                    onClick={nextStage}
                                    className="w-full py-4 bg-primary text-primary-foreground text-[12px] font-mono uppercase tracking-[0.2em] rounded-xl transition-all"
                                >
                                    {currentStage === "ltv" ? "Complete journey →" : "Next scenario →"}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Pre-Stage Briefing Overlay — Premium Monochrome */}
            <AnimatePresence>
                {showBriefing && currentStage !== "complete" && STAGE_BRIEFINGS[currentStage] && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] bg-background overflow-y-auto"
                    >
                        <div className="max-w-2xl mx-auto px-6 py-20">
                            {/* Eyebrow */}
                            <p className="text-[10px] font-mono uppercase tracking-[0.35em] text-muted-foreground/70 mb-6">Sales · {STAGE_BRIEFINGS[currentStage]?.scenario}</p>

                            {/* Title */}
                            <h1 className="text-4xl font-black tracking-tight text-foreground mb-6 leading-tight">{STAGE_BRIEFINGS[currentStage]?.title}</h1>

                            {/* Divider */}
                            <div className="h-px bg-border mb-8" />

                            {/* Story */}
                            <div className="mb-8">
                                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/70 mb-3">The situation</p>
                                <p className="text-[16px] text-muted-foreground leading-relaxed font-light">{STAGE_BRIEFINGS[currentStage]?.story}</p>
                            </div>

                            {/* UX Anchor */}
                            <div className="mb-8 border border-border rounded-xl p-6">
                                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/70 mb-3">UX anchor — what to say</p>
                                <p className="text-[15px] text-muted-foreground leading-relaxed italic">{STAGE_BRIEFINGS[currentStage]?.uxAnchor}</p>
                            </div>

                            {/* Why matters */}
                            <div className="mb-10">
                                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted-foreground/70 mb-3">Why this matters</p>
                                <p className="text-[14px] text-muted-foreground leading-relaxed font-light">{STAGE_BRIEFINGS[currentStage]?.realLife}</p>
                            </div>

                            <button
                                onClick={() => setShowBriefing(false)}
                                className="w-full py-4 bg-primary text-primary-foreground text-[12px] font-mono uppercase tracking-[0.2em] rounded-xl transition-all"
                            >
                                Enter the scenario →
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

