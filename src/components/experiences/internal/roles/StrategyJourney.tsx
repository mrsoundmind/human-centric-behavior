import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    GenericStageWrapper,
    GenericDebriefOverlay,
    GenericBriefingOverlay,
    GradientBackground
} from "../RoleJourney";

// Import Exploded Stages
import { Stage1_Pilot } from "./strategy/Stage1_Pilot";
import { Stage2_KPI } from "./strategy/Stage2_KPI";
import { Stage3_Report } from "./strategy/Stage3_Report";

// ============================================================
// STRATEGY JOURNEY DATA (Updated for High Digestibility)
// ============================================================

const STAGES = [
    {
        id: "pilot-scale-risk",
        title: "The Pilot Paradox",
        story: "Maharashtra pilot is 'successful.' 5 SME hubs are using the digital portal. But the staff in these hubs are manually overriding errors instead of reporting them. Now, you need to decide: scale to 50 hubs immediately, or halt and audit the 'Silent Friction'?",
        uxConnection: "A small pilot hides systemic failures. Scaling a broken process just makes the disaster larger and more expensive to fix later.",
        choices: [
            { type: "scale", label: "Scale Aggressively", sublabel: "Meet target • Risk crash" },
            { type: "standard", label: "Standard Rollout", sublabel: "Baseline growth • Safe" },
            { type: "audit", label: "Deep Friction Audit", sublabel: "Halt growth • Find truth" },
        ],
        outcomes: {
            scale: {
                impact: { decisionClarity: -15, teamTrust: -10, userImpact: -30 },
                debrief: {
                    title: "The Scaling Disaster",
                    what: "• Scaled to 40 hubs in 3 weeks • Week 4: 28 hubs stopped using the portal entirely • Manual overrides led to ₹2 Cr in reconciliation errors",
                    why: "• Optimized for 'Rollout Velocity' over 'Operational Stability' • Scaled the 'Friction' along with the 'Feature'",
                    how: "• Pilot terminated by the client in Week 6 • Digital transformation labelled a 'Failure' by SMEs",
                    who: "• 'The Velocity Trap': Thinks that shipping more is synonymous with winning more.",
                    tomorrow: "Never scale until the 'Unit Behavior' is stable. If users are overriding the system, the system is broken.",
                },
            },
            standard: {
                impact: { decisionClarity: 10, teamTrust: 10, userImpact: 5 },
                debrief: {
                    title: "The Plateau of Safety",
                    what: "• Growth remained steady at 5 hubs • Errors didn't increase, but neither did the 'Learning' • Strategic impact was minimal",
                    why: "• Played it too safe and missed the 'Stress Test' window • Success in a vacuum is not proof of a global solution",
                    how: "• Expansion funding was deferred to Q4 • Competitors started a more 'Active' pilot",
                    who: "• 'The Status Quo Strategist': Wins the battle of metrics but loses the war of transformation.",
                    tomorrow: "Use 'Managed Stress.' Scale to 3x your current size to see where the plumbing breaks.",
                },
            },
            audit: {
                impact: { decisionClarity: 30, teamTrust: 30, userImpact: 20 },
                debrief: {
                    title: "The Architect of Reality",
                    what: "• Found that staff were doing 'Double Data Entry' • Fixed the UI to match their actual workflow • Scaled to 50 hubs with 98% adoption",
                    why: "• Realized that 'Pilot Success' was a mask for 'Operational Debt' • Corrected the behavior before it became an expensive habit",
                    how: "• Transformation ROI jumped by 300% • Client hailed the project as a 'Benchmark' for rural tech",
                    who: "• 'The System Thinker': Finds the hidden friction that kills the scale.",
                    tomorrow: "Measure 'Shadow Work.' If users are using paper alongside the app, your app hasn't won yet.",
                },
            },
        },
    },
    {
        id: "kpi-transformation-delta",
        title: "The Digital Veneer Trap",
        story: "Report shows '100% Digital Adoption.' Every merchant is using the app. But 'Lead Cycle Time' hasn't dropped. You realize the staff are just 'mirroring' their old physical steps in the app. The transformation is only skin-deep.",
        uxConnection: "Software is a tool for behavior change. If the behavior doesn't change, the software is just a digital layer of inefficiency.",
        choices: [
            { type: "digital", label: "Digitalize Old Process", sublabel: "Zero friction • Low impact" },
            { type: "deep", label: "Systemic Rewiring", sublabel: "High friction • High ROI" },
            { type: "ignore", label: "Ignore & Report 'Success'", sublabel: "Fake KPI • Risk audit" },
        ],
        outcomes: {
            digital: {
                impact: { decisionClarity: 5, teamTrust: 10, userImpact: -20 },
                debrief: {
                    title: "A Faster Shovel for a Bigger Hole",
                    what: "• 100% adoption achieved • Cycle time remained 14 days • ROI was 0% after software costs",
                    why: "• Confused 'Usage' with 'Value' • Digitalized a broken workflow instead of fixing it",
                    how: "• Management asked why we spent millions with no result • Project seen as a 'Technical Expense' rather than a 'Strategic Investment'",
                    who: "• 'The Veneer Designer': Paints the old house and calls it new.",
                    tomorrow: "Change the 'Metric of Success' from 'Logins' to 'Result Realized.'",
                },
            },
            deep: {
                impact: { decisionClarity: 30, teamTrust: 20, userImpact: 25 },
                debrief: {
                    title: "The True Transformation",
                    what: "• Overhauled the incentive structure to favor 'Speed over Steps' • Cycle time dropped from 14 days to 4 hours • ROI verified at 420%",
                    why: "• Realized that tech is only 20% of the solution; 80% is the 'System Behavior' • Forced a rewrite of the 'Operational DNA'",
                    how: "• SME lending volume doubled • Industry award for 'Operational Innovation'",
                    who: "• 'The Structural Strategist': Rewires the business, not just the app.",
                    tomorrow: "If the 'Unit Economics' haven't changed, the transformation hasn't started.",
                },
            },
            ignore: {
                impact: { decisionClarity: -30, teamTrust: -10, userImpact: -40 },
                debrief: {
                    title: "The Strategic Liability",
                    what: "• Reported 'Success' at the Board level • 6 months later: Project shut down after a financial audit showed zero value • Your credibility as a Strategist destroyed",
                    why: "• Optimized for 'Executive Approval' over 'Product Truth' • Ignored the fundamental failure of the strategy",
                    how: "• Massive revenue loss • Team morale collapsed after the 'sudden' shutdown",
                    who: "• 'The KPI Manipulator': Believes that if the chart is green, the reality doesn't matter.",
                    tomorrow: "A green chart on a failing project is a career-ending move. Be the first to shout when the ROI is flat.",
                },
            },
        },
    },
    {
        id: "strategic-report-delivery",
        title: "The Executive Liaison",
        story: "Final Audit is due. You have 400 pages of data showing the pilot's success and failures. The CEO has 5 minutes. Do you give them the 'Full Data Deep-dive' or a '3-Action Flash Insight'?",
        uxConnection: "Reporting is the 'UX of Strategy.' If the decision-maker can't find the 'Next Action' in 30 seconds, your strategy is just a history lesson.",
        choices: [
            { type: "data", label: "Provide Full Data Pack", sublabel: "Transparency • Zero bias" },
            { type: "insight", label: "3-Action Flash Insight", sublabel: "Decision led • Selective" },
            { type: "summary", label: "Standard Summary", sublabel: "Safe • Balanced" },
        ],
        outcomes: {
            data: {
                impact: { decisionClarity: -10, teamTrust: 5, userImpact: -10 },
                debrief: {
                    title: "Analysis Paralysis",
                    what: "• CEO deferred the decision to 'Read the pack later' • 3 months pass with no action • Project stuck in 'Review Hell'",
                    why: "• Overwhelmed the stakeholder with 'Facts' instead of 'Direction' • Failed to perform the 'Strategist's Filter' role",
                    how: "• Opportunity cost grew daily • Competitors moved ahead in the SME space",
                    who: "• 'The Data Fetcher': Thinks their job is to show the work, not solve the problem.",
                    tomorrow: "Data is the ingredient; Insight is the meal. Don't make the CEO cook.",
                },
            },
            insight: {
                impact: { decisionClarity: 35, teamTrust: 25, userImpact: 20 },
                debrief: {
                    title: "The Strategic Advisor",
                    what: "• CEO signed off on the 'Regional Expansion' in 10 minutes • Focused on the 3 'Friction Points' that needed funding • Project received a ₹20 Cr budget boost",
                    why: "• Targeted the 'Highest Leverage' decisions • Valued the CEO's 'Decision Capacity' over your 'Documentation Effort'",
                    how: "• Transformation speed tripled • You were invited to join the 'Strategic Steering Committee'",
                    who: "• 'The Trusted Advisor': Knows that one 'Yes' is worth more than 100 'Facts'.",
                    tomorrow: "Every report should answer: 'What happened?', 'Why?', and 'What do we do now?'",
                },
            },
            summary: {
                impact: { decisionClarity: 5, teamTrust: 10, userImpact: 5 },
                debrief: {
                    title: "The Polite Irrelevance",
                    what: "• Summary received 'Positive' feedback but no change happened • Project continued at its current (slow) pace • No strategic pivoting possible",
                    why: "• Too 'Balanced' to be 'Decisive' • Didn't highlight the 'Risks' enough to cause a reaction",
                    how: "• Project faded into 'Business as Usual' • Zero breakthrough impact",
                    who: "• 'The Passive Reporter': Watches the project happen but doesn't influence its path.",
                    tomorrow: "If your summary doesn't make someone 'Uncomfortable,' it's probably not useful.",
                },
            },
        },
    },
];

const STAGE_BRIEFINGS = [
    {
        title: "The Pilot Paradox",
        scenario: "Pilot Scaling • Silent Friction • Organizational Debt",
        story: "Maharashtra pilot looks successful. But is it? Or are users just manually patching a broken system? Your scale decision determines everything.",
        uxConnection: "Transformation is not about software; it's about behavior. If humans are overriding the tech, the tech hasn't won.",
        realLifeImpact: "• ₹2+ Cr in scaling reconciliation errors • Failed digital adoption in rural hubs • Total project termination risk",
    },
    {
        title: "The Digital Veneer Trap",
        scenario: "KPI Transformation • ROI Analysis • Behavior Change",
        story: "Usage is 100%. Impact is 0%. Why? Because people are just mirrors of their old selves in new screens. Time to rewire.",
        uxConnection: "A digital layer over a legacy process is just 'Digital Debt.' True strategy rewires the incentive, not just the UI.",
        realLifeImpact: "• Zero ROI on high-cost software spends • Executive disillusionment with 'Digital' • Stagnant business cycle times",
    },
    {
        title: "The Executive Liaison",
        scenario: "Strategic Reporting • Decision Facilitation • Executive Trust",
        story: "Final audit is due. CEO has 5 minutes. 400 pages of data. Do you dump the data or drive the decision?",
        uxConnection: "Reporting is the strategy's final UX. If they can't decide, you haven't succeeded.",
        realLifeImpact: "• Strategic paralysis (3+ month delays) • Missed market opportunities • Loss of strategic consulting authority",
    },
];

export const StrategyJourney = ({ onComplete }: { onComplete?: () => void }) => {
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
            <GradientBackground color1="#10b981" color2="#059669" />

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
                                    {currentStageIdx === 0 && <Stage1_Pilot hoveredChoice={hoveredChoice} />}
                                    {currentStageIdx === 1 && <Stage2_KPI hoveredChoice={hoveredChoice} />}
                                    {currentStageIdx === 2 && <Stage3_Report hoveredChoice={hoveredChoice} />}
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
