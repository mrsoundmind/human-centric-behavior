import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    GenericStageWrapper,
    GenericDebriefOverlay,
    GenericBriefingOverlay,
    GradientBackground
} from "../RoleJourney";

// Import Exploded Stages
import { Stage1_Timeline } from "./pm/Stage1_Timeline";
import { Stage2_Founder } from "./pm/Stage2_Founder";
import { Stage3_Done } from "./pm/Stage3_Done";

// ============================================================
// PM JOURNEY DATA (Updated for High Digestibility)
// ============================================================

const STAGES = [
    {
        id: "ceo-announcement",
        title: "The IBC Commitment Crash",
        story: "Your CTO announced AI-powered reconciliation goes live March 31. You found out from a LinkedIn post. Engineering says 10 weeks minimum. You have 3 weeks left. Sales already sent 2 enterprise proposals quoting the date.",
        uxConnection: "Product commitments made without engineering validation are UX promises made without capacity. The gap between 'Announcement' and 'Reality' is where user trust dies.",
        choices: [
            { type: "cut", label: "Scope to 3-week MVP", sublabel: "Ship the gap • Manage fallout" },
            { type: "cover", label: "Brief clients privately", sublabel: "Protect relations • Delay conflict" },
            { type: "brief", label: "Prepare CTO Decision Brief", sublabel: "Create real choice • Fix quality" },
        ],
        outcomes: {
            cut: {
                impact: { decisionClarity: -5, teamTrust: -15, userImpact: -20 },
                debrief: {
                    title: "You Shipped an Accuracy Gap",
                    what: "• Launched on March 31 with 67% accuracy • Manual process was 91% • Support volume spiked 300% in week 1",
                    why: "• Optimized for a public date over a user outcome • Sacrificed the 'Baseline Experience' (Accuracy) for a PR win",
                    how: "• TCS Finance head called: 'This is worse than our current spreadsheet.' • Credibility drop among enterprise early adopters",
                    who: "• 'Date-First' Culture: Ships on time but spends the next 6 months fixing the reputational damage.",
                    tomorrow: "Write a 'Day 1 UX Minimums' document before any commitment. If accuracy is below manual baseline, the feature isn't ready.",
                },
            },
            cover: {
                impact: { decisionClarity: 5, teamTrust: -10, userImpact: -5 },
                debrief: {
                    title: "Information Silos Protected the Client, Not the Roadmap",
                    what: "• Proactive notice appreciated by 2 clients • CTO found out via a client email loop • Internal trust between PM and CTO damaged",
                    why: "• Managed the 'symptom' (client delay) but ignored the 'cause' (CTO's announcement pattern) • Used information control instead of communication",
                    how: "• The next IBC announcement will likely repeat the pattern • Team is still working under invisible pressure",
                    who: "• 'The Buffer PM': Protects the team and clients from the top, but fails to fix the structural planning issues.",
                    tomorrow: "Brief upward within 24 hours of any roadmap shock. Quantify the delay cost immediately.",
                },
            },
            brief: {
                impact: { decisionClarity: 20, teamTrust: 20, userImpact: 18 },
                debrief: {
                    title: "You Converted Bad News into Quality Leadership",
                    what: "• CTO read the brief comparing 67% vs 94% accuracy • Personally called clients to move the date • Engineering morale spiked — they felt 'seen'",
                    why: "• Gave a decision-maker a choice between 'Poor Quality' and 'Quality Delay' • Most leaders choose quality when the gap is quantified",
                    how: "• Both clients agreed instantly because a C-level executive called personally • Set a new standard for how roadmap conflicts are handled",
                    who: "• 'The Strategic Orchestrer': Uses data to move the goalposts when the goal is unrealistic.",
                    tomorrow: "Use a 'Decision Brief' template: 3-week version vs. 10-week version user impact. Make the trade-off visible.",
                },
            },
        },
    },
    {
        id: "feature-request-political",
        title: "The Founder's Custom Request",
        story: "A ₹40Cr edtech client's Founder asked your VP for a 'Google Sheets Export.' Engineering says 4 sprints. 52 items are above it. VP says: 'What's the plan?' 3 other clients have similar export needs but in different formats.",
        uxConnection: "Building for organizational weight instead of user need creates 'Format Sprawl.' One-off features are usually signals of unmet generic needs.",
        choices: [
            { type: "build", label: "Prioritize specific format", sublabel: "Save account • Add debt" },
            { type: "reject", label: "Reject based on vision", sublabel: "Protect roadmap • Risk burnout" },
            { type: "abstract", label: "Perform pattern discovery", sublabel: "Find the job • Build once" },
        ],
        outcomes: {
            build: {
                impact: { decisionClarity: -8, teamTrust: 5, userImpact: -12 },
                debrief: {
                    title: "You Saved the Account and Added Support Debt",
                    what: "• Shipped Google Sheets export in 8 weeks • Used by 6 people globally • 3 other clients now asking for Excel, PDF, and CSV",
                    why: "• Built a solution (the file format) instead of solving the problem (sharing data) • Allowed a single client to distort the global roadmap",
                    how: "• Maintenance cost increased by 30% • Roadmaps became reactive instead of strategic",
                    who: "• 'The Reactive PM': Builds a collection of client negotiation results instead of a product.",
                    tomorrow: "Never accept a 'solution request' (e.g. Google Sheets) without a Discovery Call to find the 'workflow gap.'",
                },
            },
            reject: {
                impact: { decisionClarity: 8, teamTrust: -12, userImpact: 5 },
                debrief: {
                    title: "You Protected the Roadmap but Lost the Room",
                    what: "• VP escalated your 'No' to the CPO • Founder called the CEO • Feature was built anyway under emergency panic",
                    why: "• 'No' is a relationship event, not just a product decision • Rejection without discovery feels like obstruction to leadership",
                    how: "• Discovery was skipped entirely because of the rush • The L&D lead's actual need was never investigated",
                    who: "• 'The Fortress PM': Defends the backlog so hard they lose the political capital to actually lead it.",
                    tomorrow: "Replace 'Reject' with 'Discovery.' If you can't say yes, say 'Let's find out what workflow this solves.'",
                },
            },
            abstract: {
                impact: { decisionClarity: 20, teamTrust: 20, userImpact: 20 },
                debrief: {
                    title: "You Found the Pattern Under the Pressure",
                    what: "• Discovery revealed people needed 'Shareable Links' for non-system users • Built a generic 'Share' feature in 2 sprints instead of 4",
                    why: "• Abstracted a custom request into a market-wide feature • Edtech Founder delighted; they didn't know a link was an option",
                    how: "• Zero format debt • Solved the needs of the other 3 clients simultaneously",
                    who: "• 'The Product Architect': Finds the generic solution that satisfies the specific pressure.",
                    tomorrow: "Add a 'Job to be Done' field to every feature intake. The request is the clue, the JTBD is the ticket.",
                },
            },
        },
    },
    {
        id: "definition-of-done",
        title: "The 'Done' State Delusion",
        story: "Engineering marks 'onboarding' as done. Acceptance criteria met. But the empty state is just a blank white box. Contract milestone is in 2 days. The PROCUREMENT client tracks your delivery score strictly.",
        uxConnection: "Empty states are the moments of highest user uncertainty. A blank box says 'Broken' to a user, even if it's 'Finished' to an engineer.",
        choices: [
            { type: "ship", label: "Ship technical completion", sublabel: "Hit milestone • Accept gap" },
            { type: "delay", label: "Delay for quality fix", sublabel: "Fix UX • Risk scorecard" },
            { type: "bridge", label: "Ship intentional 'Bridge' UX", sublabel: "Meet date • Design trust" },
        ],
        outcomes: {
            ship: {
                impact: { decisionClarity: -8, teamTrust: 5, userImpact: -18 },
                debrief: {
                    title: "You Hit the Date and Lost the Onboarding",
                    what: "• 18 support tickets: 'Is this page broken?' • 4 major vendors abandoned the platform • Client scorecard: 'Interface needs work'",
                    why: "• Accepted 'Technical Done' as 'User Done' • Empty states were missing from acceptance criteria",
                    how: "• Vendors in India's ecosystem default to 'it's broken' when a page is blank • Rushed delivery created long-term support noise",
                    who: "• 'The Ticket Pusher': Thinks checking boxes is the same as delivering value.",
                    tomorrow: "Add 'Empty State' and 'Error State' as mandatory fields in every UI ticket's definition of done.",
                },
            },
            delay: {
                impact: { decisionClarity: 10, teamTrust: -5, userImpact: 15 },
                debrief: {
                    title: "Correct Quality, Poor Communication",
                    what: "• Fixed the empty state over 2 days • Client logged a 'Yellow Flag' for delay • Scorecard took a hit for lack of explanation",
                    why: "• 'Delay for quality' is too vague for enterprise clients • The gap between shipping and explaining was too large",
                    how: "• You solved the UX issue but created a Procurement issue • Quality was improved in isolation",
                    who: "• 'The Perfectionist': Understands the user but fails to manage the business environment.",
                    tomorrow: "Frame every quality delay in user impact terms: 'Delaying 2 days to prevent X% drop-off.'",
                },
            },
            bridge: {
                impact: { decisionClarity: 20, teamTrust: 20, userImpact: 18 },
                debrief: {
                    title: "You Designed Meaning into the Deadline",
                    what: "• Added an upload icon and one-line guide in 3 hours • Shipped on schedule • Support tickets from empty states: 0",
                    why: "• Differentiated between 'Nothing here yet' and 'Something is broken' • Managed the milestone without abandoning the user",
                    how: "• Minimal effort, high user signal • Scheduled the 'full' fix for next sprint with accountability",
                    who: "• 'The Pragmatic Leader': Knows when a 3-hour fix is better than a 3-day delay.",
                    tomorrow: "Create a 'Known Experience Register' for UI bridges. Turn 'fix it later' into an actual plan.",
                },
            },
        },
    },
];

const STAGE_BRIEFINGS = [
    {
        title: "The IBC Commitment Crash",
        scenario: "Timeline Crisis • Public Commitment • Conflict Management",
        story: "CTO announced AI reconciliation by March 31 at IBC. You found out via LinkedIn. Reality: 10 weeks needed. You have 3.",
        uxConnection: "Commitments made without asking 'How will it work for the user?' lead to broken baseline experiences.",
        realLifeImpact: "• Contractual penalties for missed dates • Erosion of vendor trust • Engineering burnout and panic-building",
    },
    {
        title: "The Founder's Custom Request",
        scenario: "Scope Creep • Political Pressure • Pattern Discovery",
        story: "A major client Founder wants 'Google Sheets Export' now. VP is pushing. 52 items in backlog. Other clients have similar needs.",
        uxConnection: "Building for a specific client's format instead of their underlying workflow workflow creates 'Product Debt.'",
        realLifeImpact: "• 30% higher maintenance complexity • Reactive roadmap planning • Scaling bottlenecks per major account",
    },
    {
        title: "The 'Done' State Delusion",
        scenario: "Definition of Done • Empty States • Drop-off Risks",
        story: "App is 'complete' technically but looks broken to users when empty. Contractual milestone in 48 hours.",
        uxConnection: "A blank white box is a high-anxiety moment for a user. If it's not intentional, it's a failure.",
        realLifeImpact: "• 18-24% higher onboarding drop-off • Support volume spikes • Damaged reputation with procurement clients",
    },
];

export const PMJourney = ({ onComplete }: { onComplete?: () => void }) => {
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
        <div className="min-h-screen bg-[#050505] text-white font-sans relative overflow-hidden">
            <GradientBackground color1="#0ea5e9" color2="#7c3aed" />

            <main className="relative z-10 pt-32 pb-12 px-6">
                <AnimatePresence mode="wait">
                    <motion.div key={currentStageIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <GenericStageWrapper
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
                                    {currentStageIdx === 0 && <Stage1_Timeline hoveredChoice={hoveredChoice} />}
                                    {currentStageIdx === 1 && <Stage2_Founder hoveredChoice={hoveredChoice} />}
                                    {currentStageIdx === 2 && <Stage3_Done hoveredChoice={hoveredChoice} />}
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
