import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    GenericStageWrapper,
    GenericDebriefOverlay,
    GenericBriefingOverlay,
    GradientBackground
} from "../RoleJourney";

// Import Exploded Stages
import { Stage1_Scorecard } from "./management/Stage1_Scorecard";
import { Stage2_Resource } from "./management/Stage2_Resource";
import { Stage3_Pivot } from "./management/Stage3_Pivot";

// ============================================================
// MANAGEMENT JOURNEY DATA (Updated for High Digestibility)
// ============================================================

const STAGES = [
    {
        id: "scorecard-honesty",
        title: "The 'Green Status' Illusion",
        story: "It's Friday evening. The Maharashtra pilot is 4 days away. You know the API is buggy and the merchant data is 'messy'. But reporting a 'Red' status now will trigger a board meeting. Reporting 'Green' buys you 48 hours for a weekend 'crunch'.",
        uxConnection: "Management is the 'UX of Truth.' A fake Green status is a technical debt that eventually bankrupts the stakeholder's trust in you.",
        choices: [
            { type: "green", label: "Report 'Green' Status", sublabel: "Buy time • Hide friction" },
            { type: "red", label: "Flip to 'Red' Status", sublabel: "Honest risk • Invoke help" },
            { type: "warn", label: "Amber with Caveats", sublabel: "Partial truth • Soft landing" },
        ],
        outcomes: {
            green: {
                impact: { decisionClarity: -20, teamTrust: -15, userImpact: -25 },
                debrief: {
                    title: "The Friday Green, Monday Crash",
                    what: "• Board meeting went 'Smoothly' (The illusion) • Monday 9 AM: Demo failed in front of the Client • Team was exhausted from the weekend 'Crunch' that didn't work",
                    why: "• Optimized for personal 'Ego Safety' over 'Project Reality' • Confused 'Avoiding Conflict' with 'Managing Progress'",
                    how: "• Stakeholders felt 'blindsided' by the sudden failure • Future budgets for the scaling phase were slashed",
                    who: "• 'The Status Quo Manager': Thinks a quiet week is a successful week.",
                    tomorrow: "Never report 'Green' if there is an 'Unsolved P0'. Stakeholders prefer the storm today over the wreck tomorrow.",
                },
            },
            red: {
                impact: { decisionClarity: 25, teamTrust: 30, userImpact: 20 },
                debrief: {
                    title: "Strategic Truth-Telling",
                    what: "• Board and CEO focused on the 'Red' status immediately • Identified a resource gap in the API team • Redirected 2 expert Devs to help the pilot",
                    why: "• Used the 'Honesty Signal' to force organizational alignment • Realized that management is about 'Clearing Paths,' not just 'Mapping' them",
                    how: "• Pilot launched with 99% uptime after the extra help • Team respected your willingness to 'take the heat' for them",
                    who: "• 'The Risk Navigator': Uses the truth as a steering wheel, not a shield.",
                    tomorrow: "A 'Red' status is a request for help. Use it early to protect the final user experience.",
                },
            },
            warn: {
                impact: { decisionClarity: 5, teamTrust: 10, userImpact: -5 },
                debrief: {
                    title: "Managed Mediocrity",
                    what: "• Everyone was 'Slightly Concerned' but no help was given • Pilot launched with 'tolerable' errors • Support load was 3x higher than expected",
                    why: "• Tried to 'play it safe' and ended up with a sub-par product • 'Amber' is often ignored by leadership until it's too late",
                    how: "• Experience felt 'Unfinished' to the merchants • Team morale was 'Neutral' but not inspired",
                    who: "• 'The Hedger': Protects their scorecard more than the product vision.",
                    tomorrow: "If the risk is critical, be brave. Amber is the 'Purgatory of Progress'.",
                },
            },
        },
    },
    {
        id: "resource-debt-explosion",
        title: "The Feature vs. Debt Crunch",
        story: "Marketing wants 4 more features. Engineering says they can only do 2 safely. If you force all 4, they'll ship but with 'Quick and Dirty' code. As a manager, you have the final say on the sprint scope.",
        uxConnection: "A manager's 'Yes' to a feature is often an accidental 'No' to quality. Every shortcut taken today is a bug registered tomorrow.",
        choices: [
            { type: "crunch", label: "Force all 4 Features", sublabel: "Market first • Quality second" },
            { type: "defer", label: "Defer 2 to Q3", sublabel: "Quality first • Resilient build" },
            { type: "delegate", label: "Hire External Help", sublabel: "Scale cost • Complex sync" },
        ],
        outcomes: {
            crunch: {
                impact: { decisionClarity: -15, teamTrust: -25, userImpact: -30 },
                debrief: {
                    title: "The Debt Trap Sprung",
                    what: "• All 4 features shipped on time • 2 weeks later: Feature A broke Feature B • Dev team morale hit rock bottom because of 'dirty code' guilt",
                    why: "• Optimized for 'Feature Quantity' over 'System Velocity' • Technically shipped the specs but failed the 'UX Durability' test",
                    how: "• Future sprints are now 40% slower due to tech debt • High risk of employee churn in the engineering wing",
                    who: "• 'The Output Maximizer': Thinks software development is an assembly line.",
                    tomorrow: "A feature 'shipped' with tech debt is only 'half-shipped.' Protect the team's 'Velocity Ceiling.'",
                },
            },
            defer: {
                impact: { decisionClarity: 25, teamTrust: 30, userImpact: 20 },
                debrief: {
                    title: "The Architecture of Patience",
                    what: "• Shipped 2 high-quality features • Defended the decision to Marketing with a 'Reliability Data' slide • The 2 features have 100% adoption and zero support tickets",
                    why: "• Understood that 'Market Perception' is built on Stability, not just Checklists • Protected the team from burnout",
                    how: "• Engineering team felt 'Supported' and 'Valued' • Long-term velocity remained high for the whole year",
                    who: "• 'The Stewardship Lead': Protects the product's foundation to build more floors later.",
                    tomorrow: "Negotiate for 'Quality Milestones'. If the foundation is weak, stop the building.",
                },
            },
            delegate: {
                impact: { decisionClarity: 5, teamTrust: 10, userImpact: 5 },
                debrief: {
                    title: "The Coordination Overhead",
                    what: "• External agency hired to do the other 2 features • Syncing between teams took 40% of your time • Final build was 'Inconsistent' in UI and Code structure",
                    why: "• Tried to solve a 'Capacity' problem with 'People,' ignoring 'Coordination' costs • Learned that 2+2 is not always 4 in software teams",
                    how: "• Features shipped but the 'Cost per Feature' blossomed • Budget management became the primary task over Product vision",
                    who: "• 'The Scale-at-all-Costs': Thinks throwing money at a problem always speeds it up.",
                    tomorrow: "Before hiring, check for 'Process Leaks.' Are the existing teams wasting time on meetings?",
                },
            },
        },
    },
    {
        id: "strategic-client-pivot",
        title: "The 'Largest Client' Pivot",
        story: "A Fortune 500 client says 'We'll sign the ₹10 Cr deal IF you build this specific custom dashboard for us in 30 days.' This dashboard doesn't fit your SaaS roadmap. It's a services-heavy request. Do you pivot for the money or stay true to the vision?",
        uxConnection: "Strategic pivots are 'DNA changes' for a product. A custom pivot for one client is a 'Genetic Deformity' for all other users.",
        choices: [
            { type: "pivot", label: "Accept the Pivot", sublabel: "Secure ₹10 Cr • High customization" },
            { type: "negotiate", label: "Negotiate General Case", sublabel: "SaaS first • Longer deal cycle" },
            { type: "decline", label: "Decline the Deal", sublabel: "Vision first • Zero pivot" },
        ],
        outcomes: {
            pivot: {
                impact: { decisionClarity: -20, teamTrust: -15, userImpact: -15 },
                debrief: {
                    title: "The Service Shop Slide",
                    what: "• Signed the ₹10 Cr deal • Organization now acts as a 'Custom Dev' shop for this client • Roadmap for other SMEs is now 9 months behind",
                    why: "• Sacrificed 'Scalability' for 'Immediate Revenue' • Product became a 'Mess of Toggles' to support one client's specific process",
                    how: "• Long-term company valuation dropped due to lack of 'Product Generality' • 3 other clients cancelled because their needs were ignored",
                    who: "• 'The Revenue Chaser': Sees the dollar today, misses the platform tomorrow.",
                    tomorrow: "Never build a 'Custom Feature' without asking 'How does Client B use this?'",
                },
            },
            negotiate: {
                impact: { decisionClarity: 30, teamTrust: 25, userImpact: 25 },
                debrief: {
                    title: "Strategic Scaling Victory",
                    what: "• Convinced the client that a 'Standard Data Engine' is better than a 'Custom Dashboard' • deal signed at ₹8 Cr with a platform-first approach • Feature becomes a massive USP for all clients",
                    why: "• Reframed the client's 'Specificity' as a 'General Intelligence' requirement • Protected the 'Single-Codebase' SaaS model",
                    how: "• High valuation growth because the product remains 'Universal' • Engineering appreciated the 'Sanity' in the roadmap",
                    who: "• 'The Platform Visionary': Protects the product's DNA at all costs.",
                    tomorrow: "Be a 'Consultant' for your clients, not just a 'Vendor.' Help them see what is better for their industry.",
                },
            },
            decline: {
                impact: { decisionClarity: 10, teamTrust: 30, userImpact: 10 },
                debrief: {
                    title: "The Cost of Integrity",
                    what: "• Lost the ₹10 Cr deal • Team felt 'Proud' to work for a vision-led company • Focused on shipping features that attracted 50 smaller deals worth ₹15 Cr",
                    why: "• Realized that 'Focus' is the most expensive resource • Avoided the 'Whale Client' trap where one user dictates the whole product",
                    how: "• Product remained clean and easy to use • Growth was slower but more 'Healthy' and 'Scalable'",
                    who: "• 'The Vision Steward': Knows that a 'No' today builds a better 'Yes' tomorrow.",
                    tomorrow: "A client who forces you to pivot is often a client who won't renew when the next 'shiny' thing appears.",
                },
            },
        },
    },
];

const STAGE_BRIEFINGS = [
    {
        title: "The 'Green Status' Illusion",
        scenario: "Project Reporting • Stakeholder Trust • Technical Debt",
        story: "Pilot is in 4 days. Status is 'Amber' in reality. Reporting 'Green' buys you a weekend to fix it. What do you do?",
        uxConnection: "Reporting is a form of UX. If you lie to the board, you lie to the future of the product.",
        realLifeImpact: "• Blindsided board members • Burnout in the dev team • Massive loss of reputation upon failure",
    },
    {
        title: "The Feature vs. Debt Crunch",
        scenario: "Capacity Planning • Velocity • Team Morale",
        story: "Marketing wants everything. Engineering can do half. Your decision determines the technical density of the next build.",
        uxConnection: "Management pressure is the primary cause of 'Buggy UX.' A manager's job is to protect the build volume.",
        realLifeImpact: "• Feature-rich but unstable app • High engineering attrition • Progressive slowdown of the whole dev engine",
    },
    {
        title: "The 'Largest Client' Pivot",
        scenario: "Strategic Pivot • SaaS vs Services • Revenue Ethics",
        story: "₹10 Cr deal on the table. But they want you to break the roadmap for a custom feature. SaaS or Services?",
        uxConnection: "A custom pivot is a 'Genetic Deformity' for a product system. It breaks accessibility and scalability for all others.",
        realLifeImpact: "• Drift from SaaS scalability • Roadmap paralysis for all other clients • Valuation drop due to 'Services' signal",
    },
];

export const ManagementJourney = ({ onComplete }: { onComplete?: () => void }) => {
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
            <GradientBackground color1="#fb923c" color2="#f97316" />

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
                                    {currentStageIdx === 0 && <Stage1_Scorecard hoveredChoice={hoveredChoice} />}
                                    {currentStageIdx === 1 && <Stage2_Resource hoveredChoice={hoveredChoice} />}
                                    {currentStageIdx === 2 && <Stage3_Pivot hoveredChoice={hoveredChoice} />}
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
