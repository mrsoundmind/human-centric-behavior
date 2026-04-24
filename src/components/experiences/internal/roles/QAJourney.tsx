import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    GenericStageWrapper,
    GenericDebriefOverlay,
    GenericBriefingOverlay,
    GradientBackground
} from "../RoleJourney";

// Import Exploded Stages
import { Stage1_Checklist } from "./qa/Stage1_Checklist";
import { Stage2_Regression } from "./qa/Stage2_Regression";
import { Stage3_UAT } from "./qa/Stage3_UAT";

// ============================================================
// QA JOURNEY DATA (Updated for High Digestibility)
// ============================================================

const STAGES = [
    {
        id: "acceptance-criteria-vs-stress",
        title: "The 'Happy Path' Illusion",
        story: "Dev team says onboarding flow is 'Ready for QA.' Acceptance criteria are simple: can login, can upload GST. You have 24 hours. PM is pushing for a sign-off to show the client. But the GST field allows any file type right now.",
        uxConnection: "A 'Green' status on weak tests is a UX deception. If you don't break the app in QA, the users will break it in Production.",
        choices: [
            { type: "sign", label: "Sign-off on Criteria", sublabel: "Meet deadline • Ignore edge cases" },
            { type: "cycle", label: "Create Sanity Cycle", sublabel: "Partial debt • High speed" },
            { type: "stress", label: "Run Exploratory Stress Test", sublabel: "Find bugs now • 4hr delay" },
        ],
        outcomes: {
            sign: {
                impact: { decisionClarity: -15, teamTrust: 5, userImpact: -25 },
                debrief: {
                    title: "You Shipped a Fragile Experience",
                    what: "• Sign-off given at 5 PM • 9 AM next day: 12 vendors uploaded .exe files, crashing the parser • Onboarding flow disabled for 48 hours",
                    why: "• Optimized for 'Green' scorecard status over 'Product Stability' • Confusion between 'Meeting Criteria' and 'Delivering Quality'",
                    how: "• Procurement lead called it an 'amateur launch' • PM apologized to the board for the 'unforeseen' error",
                    who: "• 'The Box Ticker': Thinks quality is a checklist instead of a boundary protection.",
                    tomorrow: "Never sign off on just 'Functional' criteria. Add 'Negative Testing' (What happens if I enter trash data?) to every ticket.",
                },
            },
            cycle: {
                impact: { decisionClarity: 5, teamTrust: 5, userImpact: -5 },
                debrief: {
                    title: "Status Quo with Moderate Risk",
                    what: "• Fixed the file type error • Missed the 'Special character in name' bug • 2 vendors reported login issues in UAT",
                    why: "• Balanced speed with basic safety but didn't push deep enough • Left 'low probability' bugs that eventually hit real users",
                    how: "• App is stable but feels 'buggy' to power users • Support tickets are manageable but constant",
                    who: "• 'The Pragmatist': Prevents the fire but leaves the smoke.",
                    tomorrow: "Prioritize tests by 'User Frequency.' If 80% of users do X, test X to a 100% stress level.",
                },
            },
            stress: {
                impact: { decisionClarity: 25, teamTrust: 20, userImpact: 20 },
                debrief: {
                    title: "You Protected the Baseline Trust",
                    what: "• Found a critical SQL injection risk in the PAN field • Prevented a potential data breach on Day 1 • Dev team fixed it in 1 hour",
                    why: "• Assumed the user is an adversary, not a friend • Quality is about finding the 'unspoken failure' points",
                    how: "• Launched with 100% stability • Client commended the 'polished' feel of the onboarding flow",
                    who: "• 'The Boundary Protector': Finds the leaks before the ship leaves the dock.",
                    tomorrow: "Build a 'Wall of Shame' for common edge cases. If it happened in module A, check for it in module B immediately.",
                },
            },
        },
    },
    {
        id: "regression-ripple",
        title: "The Localized Fix Ripple",
        story: "Dev fixed a small typo in the DMS (Document Store). Engineering says 'Zero regression risk.' You have 1 hour before the demo. Do you trust them and do a quick check, or run a full dependency sweep?",
        uxConnection: "Software is an ecosystem. A 'localized' change in one node often sends a ripple of failure to three others.",
        choices: [
            { type: "trust", label: "Trust the 'No Risk' claim", sublabel: "Spot check • Speed first" },
            { type: "hotfix", label: "Local Module Test", sublabel: "Check DMS only • Moderate risk" },
            { type: "cycles", label: "Run Impact Cycles", sublabel: "Full sweep • High confidence" },
        ],
        outcomes: {
            trust: {
                impact: { decisionClarity: -20, teamTrust: 5, userImpact: -25 },
                debrief: {
                    title: "Technical Trust, Experience Failure",
                    what: "• Spot check PASSED • 10 mins into client demo: 'Save' button freezes • Typo fix accidentally broke the Billing module's listener",
                    why: "• Ignored the 'System Ripple' principle • Software architecture is rarely as 'independent' as devs think",
                    how: "• Demo terminated early • PM lost credibility during the feature walkthrough",
                    who: "• 'The Optimist QA': Thinks if the engine sounds good, the brakes must work too.",
                    tomorrow: "Never accept 'No Risk.' Ask 'Which modules consume this data?' and test the furthest one away.",
                },
            },
            hotfix: {
                impact: { decisionClarity: 5, teamTrust: 5, userImpact: -10 },
                debrief: {
                    title: "The Illusion of Safety",
                    what: "• DMS tested and works • Billing module (untested) failed in production 2 hours later • Blocked 4 payments",
                    why: "• Checked the 'Room' (module) but not the 'Plumbing' (data flow) • Limited testing to where the code changed, not where it impacts",
                    how: "• Incident required an emergency patch • Team stayed up until 2 AM fixing the ripple",
                    who: "• 'The Silo Tester': Only looks at the tree, misses the forest fire.",
                    tomorrow: "Use 'Impact Analysis' — list the 3 most critical business flows and test them for EVERY release.",
                },
            },
            cycles: {
                impact: { decisionClarity: 25, teamTrust: 25, userImpact: 20 },
                debrief: {
                    title: "The Architect of Confidence",
                    what: "• Found that the typo fix changed an ID format used by Billing • Stopped the release 30 mins before demo • Fixed the ID mapping",
                    why: "• Understood the 'Data-Flow' dependencies • Realized a 30-min delay is better than a 3-hour demo disaster",
                    how: "• Shipped a truly stable build • PM was grateful for the 'save' after you explained the risk",
                    who: "• 'The System Thinker': Sees the invisible connections that hold the product together.",
                    tomorrow: "Map your 'Ripple Paths.' Know which modules are 'Connected' vs. 'Isolated.'",
                },
            },
        },
    },
    {
        id: "uat-pressure",
        title: "The 'Skip UAT' Gamble",
        story: "Milestone is in 2 days. Procurement client is tracking you. Dev finished 1 hour ago. PM says 'Let's skip UAT and ship to Production directly. We checked it ourselves.' 8 critical flows are untested in the live environment.",
        uxConnection: "Skipping UAT is surrendering the user to the unknown. Production is not a testing environment; it's a reputation environment.",
        choices: [
            { type: "skip", label: "Skip UAT for Milestone", sublabel: "Hit date • Blind launch" },
            { type: "warn", label: "Warn & Minimal UAT", sublabel: "4hr check • Risk date" },
            { type: "cycle", label: "Mandatory UAT Cycle", sublabel: "Quality first • Reschedule" },
        ],
        outcomes: {
            skip: {
                impact: { decisionClarity: -25, teamTrust: -10, userImpact: -40 },
                debrief: {
                    title: "The 'On-Time' Disaster",
                    what: "• Milestone reached on schedule • Day 1: 42% of users couldn't finish onboarding • Procurement client issued a 'formal warning'",
                    why: "• Optimized for a business 'Date' over a user 'Reality' • The date was hit, but the product was unusable",
                    how: "• Rollback required on Day 2 • Reputation as a 'Reliable Partner' destroyed",
                    who: "• 'The Surrender QA': Gave up the gatekeeper role under pressure.",
                    tomorrow: "A milestone is only 'Hit' if the software is usable. Defend the definition of 'Done'.",
                },
            },
            warn: {
                impact: { decisionClarity: -10, teamTrust: 5, userImpact: -5 },
                debrief: {
                    title: "Managed Mediocrity",
                    what: "• Done 4 hours of UAT • Found 2 bugs • Ignored 'Edge Case' UAT • 3 users still faced data corruption",
                    why: "• Tried to satisfy both sides and failed to guarantee safety • 'Minimal' testing is often just 'Theatrical' testing",
                    how: "• Support load stayed high for 2 weeks • Team felt the release was 'unstable'",
                    who: "• 'The Compromiser': Trade quality for harmony and lost both.",
                    tomorrow: "Never say 'Minimal UAT.' Say 'Limited Scope UAT' and explicitly state what is UNTESTED.",
                },
            },
            cycle: {
                impact: { decisionClarity: 25, teamTrust: 25, userImpact: 20 },
                debrief: {
                    title: "The Gatekeeper's Victory",
                    what: "• Delayed launch by 24 hours • Found a data-loss bug in the 'Final Submit' step • Fixed before any user touched it",
                    why: "• Realized the cost of success is measured in Uptime, not Deadlines • Protected the Procurement lead from their own pressure",
                    how: "• Launched with 100% success rate • Procurement lead thanked you for the 'rigor' after the bug was disclosed",
                    who: "• 'The Quality Lead': Knows that their 'No' is the only thing protecting the 'Yes' of the business.",
                    tomorrow: "Use 'Launch Readiness' heatmaps to show stakeholders the risk they are taking when skipping steps.",
                },
            },
        },
    },
];

const STAGE_BRIEFINGS = [
    {
        title: "The 'Happy Path' Illusion",
        scenario: "Quality Gate • Edge Case Discovery • Deadline Pressure",
        story: "Onboarding is 'Ready'. Criteria: Login and Upload. But what if the user uploads a virus? Or a 200MB file? Or trash PAN data?",
        uxConnection: "Weak testing leads to fragile UX. If you don't break the app in QA, the users will break it in Production.",
        realLifeImpact: "• Production crashes on Day 1 • 24/7 support firefighting • High churn during first-use experience",
    },
    {
        title: "The Localized Fix Ripple",
        scenario: "Regression Testing • System Dependency • Confidence Level",
        story: "A 'zero risk' typo fix in module A. Should you trust the dev or run a full sweep? The demo is in 60 minutes.",
        uxConnection: "A system is an ecosystem. One move here causes a tremor there.",
        realLifeImpact: "• Embarrassing demo failures • Data corruption in unrelated modules • Lost engineering trust",
    },
    {
        title: "The 'Skip UAT' Gamble",
        scenario: "Launch Readiness • User Acceptance • Business Milestone",
        story: "Procurement deadline is tomorrow. Dev just finished. PM wants to skip UAT to hit the date. 8 flows are blind.",
        uxConnection: "Production is not for testing; it's for performance. A blind launch is a gamble with the brand.",
        realLifeImpact: "• Damaged reputation with procurement clients • Rollback costs (Time/Money) • User anxiety and loss of trust",
    },
];

export const QAJourney = ({ onComplete }: { onComplete?: () => void }) => {
    const [currentStageIdx, setCurrentStageIdx] = useState(0);
    const [showBriefing, setShowBriefing] = useState(true);
    const [showDebrief, setShowDebrief] = useState(false);
    const [lastOutcome, setLastOutcome] = useState<any>(null);

    const stage = STAGES[currentStageIdx];
    const briefing = STAGE_BRIEFINGS[currentStageIdx];
    const isLastStage = currentStageIdx === STAGES.length - 1;

    const handleChoice = (type: string) => {
        setLastOutcome(stage.outcomes[type as keyof typeof stage.outcomes]);
        setShowDebrief(true);
    };

    const handleNext = () => {
        setShowDebrief(false);
        if (isLastStage) { onComplete?.(); }
        else { setCurrentStageIdx(p => p + 1); setShowBriefing(true); }
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-sans relative overflow-hidden">
            <GradientBackground color1="#9335AA" color2="#DB5388" />

            <main className="relative z-10 pt-32 pb-12 px-6">
                <AnimatePresence mode="wait">
                    <motion.div key={currentStageIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <GenericStageWrapper allStageLabels={STAGE_BRIEFINGS.map(b => (b.scenario ? b.scenario.split(" • ")[0] : b.title))}
                            stageNumber={currentStageIdx + 1}
                            totalStages={STAGES.length}
                            title={stage.title}
                            story={stage.story}
                            uxConnection={stage.uxConnection}
                            choices={stage.choices}
                            onChoice={handleChoice}
                        >
                            {(hoveredChoice) => (
                                <>
                                    {currentStageIdx === 0 && <Stage1_Checklist hoveredChoice={hoveredChoice} />}
                                    {currentStageIdx === 1 && <Stage2_Regression hoveredChoice={hoveredChoice} />}
                                    {currentStageIdx === 2 && <Stage3_UAT hoveredChoice={hoveredChoice} />}
                                </>
                            )}
                        </GenericStageWrapper>
                    </motion.div>
                </AnimatePresence>
            </main>

            {showDebrief && <GenericDebriefOverlay debrief={lastOutcome?.debrief} onNext={handleNext} isLastStage={isLastStage} />}

            <AnimatePresence>
                {showBriefing && (
                    <GenericBriefingOverlay
                        title={briefing.title}
                        scenario={briefing.scenario}
                        story={briefing.story}
                        uxConnection={briefing.uxConnection}
                        realLifeImpact={briefing.realLifeImpact}
                        onStart={() => setShowBriefing(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
