import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    GenericStageWrapper,
    GenericDebriefOverlay,
    GenericBriefingOverlay,
    GradientBackground
} from "../RoleJourney";

// Import Exploded Stages
import { Stage1_Buffer } from "./crm/Stage1_Buffer";
import { Stage2_Filter } from "./crm/Stage2_Filter";
import { Stage3_Health } from "./crm/Stage3_Health";

// ============================================================
// CRM JOURNEY DATA (Updated for High Digestibility)
// ============================================================

const STAGES = [
    {
        id: "client-escalation-crisis",
        title: "The GST Validation Crisis",
        story: "Your largest client (Mumbai L&D) is furious. Their vendor onboarding is blocked because the new GST check is too 'strict'. They've CC'd your CEO on an email. Engineering says it's technically correct but strict by design. PM wants you to 'handle' the client while they re-evaluate.",
        uxConnection: "CRM is the 'UX of Communication.' Your tone and speed determine if a technical friction remains a 'Minor Bug' or becomes a 'Total Relationship Failure.'",
        choices: [
            { type: "absorb", label: "Absorb & Personalize", sublabel: "Empathize • Buy time" },
            { type: "defend", label: "Defend Technical Scope", sublabel: "Strict logic • Professional distance" },
            { type: "deflect", label: "Deflect to Internal Team", sublabel: "Blame Dev • Preserve self" },
        ],
        outcomes: {
            absorb: {
                impact: { decisionClarity: 15, teamTrust: 20, userImpact: 10 },
                debrief: {
                    title: "You Converted a Bug into a Trust Milestone",
                    what: "• Client felt 'heard' within 15 minutes • CEO de-escalated after seeing your proactive 'Ownership' email • Engineering worked on a fix without the stress of direct client heat",
                    why: "• Optimized for the 'Client's Emotional Safety' first • Recognized that a 'strict bug' is a workflow disruption for them, not a logic problem",
                    how: "• Relationship NPS jumped from 4 to 9 in one week • Client eventually agreed to the strict rules after your patient explanation",
                    who: "• 'The Relationship Bridge': Acts as the safe harbor during technical storms.",
                    tomorrow: "Never start an email with 'The system is working as intended.' Start with 'I understand this is blocking your onboarding.'",
                },
            },
            defend: {
                impact: { decisionClarity: 5, teamTrust: 5, userImpact: -15 },
                debrief: {
                    title: "Technically Right, Emotionally Bankrupt",
                    what: "• Client felt you were 'robotic' and 'unhelpful' • Escalated again to the VP calling the partnership 'too rigid' • Eventually built a custom hack to satisfy them",
                    why: "• Confused 'Technical Compliance' with 'Solutioning' • Indian enterprise culture values 'Liaison' over 'Literalism'",
                    how: "• Cost of management increased by 20 hours • Trust capital was burned for a minor logic point",
                    who: "• 'The Manual Follower': Follows the spec while the building is on fire.",
                    tomorrow: "Reframe 'No' as 'Yes, but here's how we manage the transition.'",
                },
            },
            deflect: {
                impact: { decisionClarity: -10, teamTrust: -25, userImpact: -10 },
                debrief: {
                    title: "You Escaped the Heat and Burnt the House",
                    what: "• Client now thinks your Dev team is 'incompetent' • Engineering Lead refused to join your next client call • General air of 'unprofessionalism' reported to CEO",
                    why: "• Sacrificed organizational trust for personal 'Escapism' • Client loses faith in the product if they don't trust the people building it",
                    how: "• Renewal is now 50% less likely • Internal team culture disrupted",
                    who: "• 'The Deflector': Thinks they are a 'Third Party' between the client and the company.",
                    tomorrow: "Use 'We' in every escalation. 'We found an edge case,' 'We are fixing it.' Never 'The Devs broke it.'",
                },
            },
        },
    },
    {
        id: "feedback-translation",
        title: "The Emotional Feedback Loop",
        story: "Client says: 'We want Google Sheets sync! This app is too slow!' (They actually mean: Their non-system regional managers can't see vendor data easily). If you just forward 'Sync with Google Sheets' to PM, it will be rejected. How do you translate this noise into a signal?",
        uxConnection: "Feedback is 'Encoded Friction.' CRM's job is to decode the scream for help into a requirement for change.",
        choices: [
            { type: "forward", label: "Forward Raw Feedback", sublabel: "Speed first • Zero filtering" },
            { type: "distill", label: "Distill JTBD Signal", sublabel: "Find the 'Job' • Map to feature" },
            { type: "silent", label: "Monitor Silently", sublabel: "Avoid noise • Risk blindness" },
        ],
        outcomes: {
            forward: {
                impact: { decisionClarity: -15, teamTrust: -10, userImpact: -15 },
                debrief: {
                    title: "Signal Lost in the Noise",
                    what: "• PM ignored the request as 'un-prioritized feature creep' • Client felt their 'Major Need' was ignored • Dev team felt overwhelmed by 'another random request'",
                    why: "• Failed to find the 'Why' behind the 'What' • Raw feedback is actionable by no one",
                    how: "• Product debt increased but user problem remained • Account sentiment turned 'Cold'",
                    who: "• 'The Postman': Delivers the mail but doesn't care what's inside.",
                    tomorrow: "Never forward a feature request. Forward a 'Problem Report' with a proposed 'Value Signal.'",
                },
            },
            distill: {
                impact: { decisionClarity: 25, teamTrust: 25, userImpact: 20 },
                debrief: {
                    title: "The Strategic Translator",
                    what: "• Identified that the need was 'External Visibility' • PM prioritized a 'Shareable Link' feature instead of a full sync • Client was delighted because it solved the 'Actual' problem in 10% of the time",
                    why: "• Understood that 'Google Sheets' was a solution they imagined, not the only solution • Saved the team 120 hours of dev work",
                    how: "• Engineering respected your 'technical' feedback • Account became a 'High Adoption' case study",
                    who: "• 'The Product Partner': Translates business frustration into product evolution.",
                    tomorrow: "Ask the 'Magic Question': 'If you had this today, what's the first thing you'd do that you can't do now?'",
                },
            },
            silent: {
                impact: { decisionClarity: -5, teamTrust: 5, userImpact: -20 },
                debrief: {
                    title: "The Silent Account Death",
                    what: "• No noise = No friction (You thought) • 3 months later: Client cancels renewal because 'It doesn't work for our managers' • You missed the signal entirely",
                    why: "• Confused 'Silence' with 'Success' • Failed to pro-actively mine for friction points",
                    how: "• Zero opportunity to save the account • Burn rate for recruitment increased due to lost client revenue",
                    who: "• 'The Ostrich': Hides from the noise and misses the opportunity.",
                    tomorrow: "No feedback is negative feedback. Reach out to 'Silent Accounts' once every 30 days with a usage insight.",
                },
            },
        },
    },
    {
        id: "renewal-crisis-negotiation",
        title: "The Renewal Runway",
        story: "Renewal is in 45 days. Account Health is 'Yellow.' 3 features you promised in Q1 are delayed. PROCUREMENT wants a 15% discount because of 'Performance Issues.' Your quarterly bonus depends on this renewal at full price.",
        uxConnection: "Renewal is the 'Final Exam' of UX. If the daily experience was painful, the cost of 'Renewing' feels like a tax, not an investment.",
        choices: [
            { type: "discount", label: "Givce the 15% Discount", sublabel: "Safe renewal • Lower revenue" },
            { type: "fix", label: "Focus on 'Trust-Fixes'", sublabel: "Prioritize stability • High effort" },
            { type: "delay", label: "Delay for Q3 Promise", sublabel: "Sell the future • High risk" },
        ],
        outcomes: {
            discount: {
                impact: { decisionClarity: 5, teamTrust: -5, userImpact: -15 },
                debrief: {
                    title: "The Revenue Capitulation",
                    what: "• Renewal signed at 85% price • CEO asked why we are 'Discounting at Scale' • Procurement lead now knows they can squeeze us every year",
                    why: "• Used 'Money' to solve a 'Quality' problem • Didn't address the reason for the friction (The delays)",
                    how: "• Profit margin dropped • Team seen as 'Vendor' instead of 'Partner'",
                    who: "• 'The Price Cutter': Buys the renewal instead of earning it.",
                    tomorrow: "Never lead with a discount. Lead with a 'Commitment to Quality Roadmap.'",
                },
            },
            fix: {
                impact: { decisionClarity: 25, teamTrust: 25, userImpact: 20 },
                debrief: {
                    title: "Trust Rebuilt through Result",
                    what: "• Got Engineering to ship a 'Stability Patch' in 1 week • Proved that the platform is worth the full price • Renewal signed at 100% with no escalation",
                    why: "• Understood that 'Value' is the best negotiation tool • Focused on the Day-to-Day frustration points during the renewal window",
                    how: "• Procurement lead: 'We appreciate the focus on our specific issues' • High-yield renewal case study",
                    who: "• 'The Value Keeper': Protects the product's worth through constant iteration.",
                    tomorrow: "Renewal preparation starts on Day 1 of the contract. Track 'Value Realized' every month.",
                },
            },
            delay: {
                impact: { decisionClarity: -15, teamTrust: -10, userImpact: -30 },
                debrief: {
                    title: "The Over-Promise Crash",
                    what: "• Account didn't renew • Procurement: 'We can't keep paying for promises that are always in the next quarter' • 100% Churn",
                    why: "• Sold 'Vision' to a person with 'Utility' pain • You can't fix a broken floor by showing them a picture of a new roof",
                    how: "• Significant revenue loss • Team morale hit as they felt they were 'always failing' the client",
                    who: "• 'The Vision Seller': Sells the future because they are afraid of the present.",
                    tomorrow: "Fix the 'Floor' first. If basic features aren't stable, nobody cares about your AI Roadmap.",
                },
            },
        },
    },
];

const STAGE_BRIEFINGS = [
    {
        title: "The GST Validation Crisis",
        scenario: "Client Relationship • Escalation • Communication Tone",
        story: "Your biggest client is blocked and furious. CEO is watching. Engineering says it's 'correct' but strict. PM wants you to lead.",
        uxConnection: "Technical errors are just facts. How you 'frame' them determines if the client trusts you or fires you.",
        realLifeImpact: "• CEO-level escalations • 24/7 client panic calls • Damaged brand reputation in the SME ecosystem",
    },
    {
        title: "The Emotional Feedback Loop",
        scenario: "Insight Discovery • Product Translation • Prioritization",
        story: "Client is screaming for 'Google Sheets'. Engineering will say no. You need to find the actual pain point.",
        uxConnection: "A client request is just an 'Encoded scream'. Your job is to find the feature that stops the scream.",
        realLifeImpact: "• 120+ hours of wasted dev work on wrong features • Features shipped that zero users actually use • Internal PM vs CRM wars",
    },
    {
        title: "The Renewal Runway",
        scenario: "Account Health • Negotiation • Business Growth",
        story: "Renewal is 45 days away. Health is 'Yellow'. Promised features are delayed. Procurement wants a discount.",
        uxConnection: "Renewal is the final outcome of the sum of every UX touchpoint. If it was hard to use, it's hard to pay for.",
        realLifeImpact: "• 15-30% loss in annual contract value (ACV) • High account churn rate • Loss of personal quarterly bonuses",
    },
];

export const CRMJourney = ({ onComplete }: { onComplete?: () => void }) => {
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
            <GradientBackground color1="#6366f1" color2="#4f46e5" />

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
                                    {currentStageIdx === 0 && <Stage1_Buffer hoveredChoice={hoveredChoice} />}
                                    {currentStageIdx === 1 && <Stage2_Filter hoveredChoice={hoveredChoice} />}
                                    {currentStageIdx === 2 && <Stage3_Health hoveredChoice={hoveredChoice} />}
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
