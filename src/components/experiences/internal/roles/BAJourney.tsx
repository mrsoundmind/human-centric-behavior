import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    GenericStageWrapper,
    GenericDebriefOverlay,
    GenericBriefingOverlay,
    GradientBackground
} from "../RoleJourney";

// Import Exploded Stages
import { Stage1_Trace } from "./ba/Stage1_Trace";
import { Stage1_Pilot } from "./strategy/Stage1_Pilot"; // Reusing visuals if applicable, but BA has its own Stage1
import { Stage2_Ambiguity } from "./ba/Stage2_Ambiguity";
import { Stage3_Conflict } from "./ba/BAStage3_Conflict"; // Consistency check: the file I created was Stage3_Conflict.tsx

// Re-importing to ensure correct paths
import { Stage3_Conflict as BAConflict } from "./ba/Stage3_Conflict";

// ============================================================
// BA JOURNEY DATA (Updated for High Digestibility)
// ============================================================

const STAGES = [
    {
        id: "requirement-ripples",
        title: "The Traceability Ripple",
        story: "The Business wants to change the 'Interest Calculation' logic for the Pune cooperative bank. It sounds like a simple 1-line code change. But as a BA, you know this ripples through the FRD, the API, the Audit Logs, and the PDF generator.",
        uxConnection: "Requirements are an ecosystem. A BA's job is 'Impact Visualization'—protecting the system from unexpected regressions caused by 'Simple' requests.",
        choices: [
            { type: "map", label: "Trace All Dependencies", sublabel: "Full impact map • Safe build" },
            { type: "document", label: "Update FRD Only", sublabel: "Theoretical check • FAST" },
            { type: "ignore", label: "Trust the Devs", sublabel: "Zero tracking • Risky" },
        ],
        outcomes: {
            map: {
                impact: { decisionClarity: 30, teamTrust: 25, userImpact: 20 },
                debrief: {
                    title: "The Master Architect",
                    what: "• Identified that the change affects the 'Tax Reporting' module • Dev team was warned 48 hours BEFORE starting code • Zero regressions found during integration testing",
                    why: "• Understood that 'Simple' is a dangerous word in software • Realized that a BA's value is in the 'Ripples' they prevent",
                    how: "• Pune pilot launched on time with 100% data accuracy • Stakeholders trust your estimates because they are grounded in reality",
                    who: "• 'The Impact Mapper': Sees the invisible threads connecting business and code.",
                    tomorrow: "Always ask 'Where else is this logic used?' before saying 'It's easy'.",
                },
            },
            document: {
                impact: { decisionClarity: 10, teamTrust: 5, userImpact: -10 },
                debrief: {
                    title: "The Paper Fortress",
                    what: "• 40-page FRD update was signed off • Devs missed the 'Audit Log' implication because the FRD was too long to read • App launched but GST reports were broken for 2 days",
                    why: "• Confused 'Documentation' with 'Communication' • Spent too much time on words and not enough on system flows",
                    how: "• Hotfix required on Day 2 of the pilot • Morale dipped due to the 'Surprise' bug",
                    who: "• 'The Manual Writer': Thinks that a signed document equals a working product.",
                    tomorrow: "Prioritize 'Visual Flows' over 'Dense Paragraphs'. Devs read maps, not novels.",
                },
            },
            ignore: {
                impact: { decisionClarity: -30, teamTrust: -15, userImpact: -40 },
                debrief: {
                    title: "The Integration Disaster",
                    what: "• Left the impact analysis to the Devs • API was updated but the UI dashboard crashed • Pune bank manager reported ₹4 Lakh in calculation errors",
                    why: "• Abdicated the BA's primary role as 'Logic Guardian' • Assumed that 'Coding' and 'Requirement Analysis' are the same thing",
                    how: "• Project suspended for a 1-week sanity check • Team lost 2 months of credibility in 1 hour",
                    who: "• 'The Passive Passenger': Thinks the BA's job ends at the meeting room door.",
                    tomorrow: "Never trust a 'Simple Change.' Verify the logic yourself before the first line of code is written.",
                },
            },
        },
    },
    {
        id: "ambiguity-filter-logic",
        title: "The Signal vs. Noise",
        story: "Client says: 'The app feels clunky. I want it to be smarter about merchant leads.' This is noise. Your job is to extract the signal. Do you ask for 'Screenshots of clunky parts' or 'Design the eligibility logic'?",
        uxConnection: "A BA is a 'Filter for Ambiguity.' If you don't define the logic, you force the Developer to guess. And Developers guess differently than Clients.",
        choices: [
            { type: "translate", label: "Design Logic Rules", sublabel: "Translate noise to signal" },
            { type: "collect", label: "Collect UI Screenshots", sublabel: "Visual focus • Partial" },
            { type: "pass", label: "Pass 'Clunky' to Devs", sublabel: "Direct relay • Dangerous" },
        ],
        outcomes: {
            translate: {
                impact: { decisionClarity: 35, teamTrust: 30, userImpact: 25 },
                debrief: {
                    title: "The Logic Alchemist",
                    what: "• Translated 'Clunky' into 'Predictive Merchant Flagging' • Devs built a rule-engine that saves agents 40 minutes a day • Adoption rate jumped to 94%",
                    why: "• Realized that 'UX Issues' are often 'Logic Issues' in disguise • Gave the team a concrete goal (Signal) instead of a vibe (Noise)",
                    how: "• Client was stunned that the system 'understood' their pain • Engineering velocity increased because instructions were binary",
                    who: "• 'The Signal Architect': Filters the chaos into clear system logic.",
                    tomorrow: "When a client complains, look for the 'Data Gap' behind the 'Emotion'.",
                },
            },
            collect: {
                impact: { decisionClarity: 10, teamTrust: 15, userImpact: 5 },
                debrief: {
                    title: "The Surface Fixer",
                    what: "• Fixed 14 button alignments and 2 colors • App looks better, but still feels 'Clunky' to use • Lead processing speed remains unchanged",
                    why: "• Focused on the 'Interface' (Skin) but ignored the 'Intelligence' (Brain) • Solved the symptoms, not the disease",
                    how: "• Project progress stabled but no 'Wow' factor realized • Client feels we are 'polishing a broken car'",
                    who: "• 'The UI Courier': Thinks all digital problems are visual problems.",
                    tomorrow: "Dig deeper. If the workflow is slow, no amount of 'White Space' will fix it.",
                },
            },
            pass: {
                impact: { decisionClarity: -25, teamTrust: -30, userImpact: -20 },
                debrief: {
                    title: "The Confusion Relay",
                    what: "• Devs spent 3 days arguing about what 'Clunky' means • Built a feature that made the app even more complex • Total waste of 80 combined hours",
                    why: "• Refused to 'Process' information; became a mere 'Postman' • Left the hardest part of the job (Translation) to the people meant for (Execution)",
                    how: "• Massive friction between BA and Engineering • Project delayed by 2 weeks due to rework",
                    who: "• 'The Postman BA': Just delivers messages without reading the address.",
                    tomorrow: "If you can't write a recursive 'IF/THEN' for it, you haven't analyzed it yet.",
                },
            },
        },
    },
    {
        id: "uat-stakeholder-gap",
        title: "The UAT Conflict",
        story: "Demo Day. The Client sees the dashboard and says 'But I thought it would show GST data!'. Engineering says 'You never asked for it.' As a BA, this gap is your responsibility. Do you choose conflict or negotiation?",
        uxConnection: "UAT is the 'Court of Human Truth.' A BA's job is to ensure the witness (the build) and the judge (the client) are speaking the same language.",
        choices: [
            { type: "negotiate", label: "Negotiate Phase 2", sublabel: "Launch now • Build later" },
            { type: "conflict", label: "Defend the FRD", sublabel: "Contract literal • Hostile" },
            { type: "crunch", label: "Force Day 1 GST", sublabel: "Scope blow-up • High risk" },
        ],
        outcomes: {
            negotiate: {
                impact: { decisionClarity: 25, teamTrust: 30, userImpact: 20 },
                debrief: {
                    title: "The Scope Diplomat",
                    what: "• Agreed to launch Phase 1 (no GST) to get merchants on board • Scheduled GST for a 2-week follow-up • Project went 'Live' on time",
                    why: "• Valued 'Momentum' over 'Argument' • Realized that 'Perfect' is the enemy of 'Launched'",
                    how: "• Client felt 'Heard' and Engineering felt 'Protected' • Trust remained high for the rest of the year",
                    who: "• 'The Strategic Negotiator': Balances user greed with engineering capacity.",
                    tomorrow: "Acknowledge the gap, but protect the deadline. Negotiate for and/or, never vs.",
                },
            },
            conflict: {
                impact: { decisionClarity: -10, teamTrust: 10, userImpact: -15 },
                debrief: {
                    title: "The Contractual Victory",
                    what: "• Proved the client was wrong using the signed FRD • Meeting ended in an 'Angry Silence' • No signatures on the UAT sign-off sheet",
                    why: "• Won the argument but lost the relationship • Forgot that software is a 'Service' built of trust, not just a 'Contract' built of paper",
                    how: "• Deployment was blocked by the client's CFO • Entire account is now at risk of moving to a competitor",
                    who: "• 'The Literal BA': Prefers being 'Right' to being 'Successful'.",
                    tomorrow: "The FRD is a guide, not a weapon. Use it to clarify, not to blame.",
                },
            },
            crunch: {
                impact: { decisionClarity: 10, teamTrust: -40, userImpact: -10 },
                debrief: {
                    title: "The Scope Explosion",
                    what: "• Engineering worked 24/7 to add GST by tomorrow • System crashed 4 times on launch day due to unoptimized queries • GST data was only 20% accurate",
                    why: "• Sacrificed 'System Integrity' for 'Stakeholder Appeasement' • Allowed 'Scope Creep' to kill the 'QA Cycle'",
                    how: "• Total loss of trust in system accuracy • Engineering lead threatened to resign",
                    who: "• 'The Yes-Man': Thinks avoiding conflict today is worth the fire tomorrow.",
                    tomorrow: "If it wasn't in the trace, it doesn't go in the build. Say 'No' to protect the 'UX Baseline'.",
                },
            },
        },
    },
];

const STAGE_BRIEFINGS = [
    {
        title: "The Traceability Ripple",
        scenario: "Impact Analysis • Dependency Management • Scope Clarity",
        story: "A 'small' bank logic change is requested. Is it small? Or does it ripple through the whole ecosystem? Find the threads.",
        uxConnection: "A BA's UX is the 'Mapping of Logic.' If you don't trace the change, the user finds the bug.",
        realLifeImpact: "• ₹4+ Lakh in calculation errors for the Bank • Delayed launches in Bhiwandi and Pune • Loss of organizational clarity",
    },
    {
        title: "The Signal vs. Noise",
        scenario: "Ambiguity Filter • Logic Engineering • Developer Clarity",
        story: "Client says 'It feels clunky.' You need to hear 'Rewrite the Merchant Eligibility logic.' Translate the emotion into binary.",
        uxConnection: "The BA is the 'Human-Machine Translator.' Your logic rules are the blueprint for the Engineering heart.",
        realLifeImpact: "• 80+ hours of wasted dev time on vibes • Technical debt explosion due to 'guessing' • 0% ROI on 'Digitalized' bad processes",
    },
    {
        title: "The UAT Conflict",
        scenario: "Stakeholder Management • Scope Negotiation • UAT Sign-off",
        story: "Demo day. There is a gap between 'What they want' and 'What we have.' Do you fight or facilitate?",
        uxConnection: "UAT is the final UX test. If there is a conflict, the BA represents the 'Truth in Negotiation'.",
        realLifeImpact: "• 8-week project deadlocks • Loss of ₹10+ Cr accounts due to broken trust • Engineering attrition due to 'Uncontrolled Scope'",
    },
];

export const BAJourney = ({ onComplete }: { onComplete?: () => void }) => {
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
                                    {currentStageIdx === 0 && <Stage1_Trace hoveredChoice={hoveredChoice} />}
                                    {currentStageIdx === 1 && <Stage2_Ambiguity hoveredChoice={hoveredChoice} />}
                                    {currentStageIdx === 2 && <BAConflict hoveredChoice={hoveredChoice} />}
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
