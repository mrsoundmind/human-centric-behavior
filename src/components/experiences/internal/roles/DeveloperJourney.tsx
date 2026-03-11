import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    GenericStageWrapper,
    GenericDebriefOverlay,
    GenericBriefingOverlay,
    GradientBackground
} from "../RoleJourney";

// Import Exploded Stages
import { Stage1_Terminal } from "./dev/Stage1_Terminal";
import { Stage2_Debt } from "./dev/Stage2_Debt";
import { Stage3_Interface } from "./dev/Stage3_Interface";

// ============================================================
// DEVELOPER JOURNEY DATA (Updated for High Digestibility)
// ============================================================

const STAGES = [
    {
        id: "hotfix-dependency",
        title: "The Circular 'Quick Fix'",
        story: "Production high-priority incident: Reconciliation timing out for 5% of users. You found the line. It's a missing check in the 'reconcile_logic.py'. You could fix it in 5 mins by importing the 'Auth' module, but 'Auth' already imports this module. PM is asking for a fix in 2 hours.",
        uxConnection: "A 'Quick Fix' that creates a circular dependency is a hidden UX trap. It fixes one button but freezes the entire app's loading state.",
        choices: [
            { type: "fix", label: "Perform quick import fix", sublabel: "Resolve incident • Risk boot-loop" },
            { type: "warn", label: "Warn PM of tech debt", sublabel: "Buy time • Maintain debt" },
            { type: "isolate", label: "Isolate into Utility module", sublabel: "Stabilize core • 2hr delay" },
        ],
        outcomes: {
            fix: {
                impact: { decisionClarity: -10, teamTrust: -15, userImpact: -25 },
                debrief: {
                    title: "You Fixed the Line and Broke the System",
                    what: "• Timeout issue resolved in 10 mins • 30 mins later, 100% of users see a white screen on login • App cannot boot due to circular dependency",
                    why: "• Optimized for a 'Ticket Resolution' metric over 'System Integrity' • Ignored architectural boundaries for a short-term win",
                    how: "• The 'Quick Fix' cost 4 hours of emergency rollback • Lost users' confidence during a critical window",
                    who: "• 'The Firefighter': Puts out the small fire by flooding the server room.",
                    tomorrow: "Never import a 'higher level' module into a 'lower level' one. Use a shared 'utils' or 'types' library.",
                },
            },
            warn: {
                impact: { decisionClarity: 5, teamTrust: 5, userImpact: -5 },
                debrief: {
                    title: "Status Quo with a Warning Label",
                    what: "• Incident left open for 2 hours • Fixed without circular debt, but with manual hacks • Team velocity for next sprint dropped 15%",
                    why: "• Managed the risk but didn't fix the underlying cause • Left a 'Technical landmine' for someone else to step on",
                    how: "• PM is happy but Engineering Lead flagged the code in PR • Debt compounded by another 20 hours",
                    who: "• 'The Negotiator': Saves the day but leaves a bill for the next month.",
                    tomorrow: "When warning about debt, provide a 'Cleanup Ticket' ID immediately. Don't just talk — track.",
                },
            },
            isolate: {
                impact: { decisionClarity: 20, teamTrust: 25, userImpact: 15 },
                debrief: {
                    title: "You Stabilized the Core for Good",
                    what: "• Refactored the check into 'validation_utils.py' • Incident fixed in 3 hours • Zero regression bugs found in UAT",
                    why: "• Decoupled logic from heavy modules • Invested 1 extra hour to save 10 hours of future debugging",
                    how: "• The fix became the new standard for the team • PM used the 'Architecture Pause' to manage client expectations",
                    who: "• 'The Craftsman': Understands that the fastest way is actually the right way.",
                    tomorrow: "If you see a Circular Dependency error, it's a signal that your module is doing too much. Extract.",
                },
            },
        },
    },
    {
        id: "velocity-debt",
        title: "The Sprint 0 Velocity Trap",
        story: "Client wants 12 features in 4 weeks. Engineering Lead says 'We need Sprint 0 for infrastructure.' PM says 'We don't have budget for a month of no features.' Founder is watching the burn rate.",
        uxConnection: "Infrastructure is the 'UX of the Codebase.' Without it, the app feels fast today but becomes frustratingly buggy in 3 months.",
        choices: [
            { type: "bypass", label: "Bypass Sprint 0 basics", sublabel: "Ship features now • Accumulate debt" },
            { type: "negotiate", label: "Hybrid Infrastructure", sublabel: "50% debt • 50% feature" },
            { type: "refactor", label: "Hard-stop for Foundation", sublabel: "Delay 1 week • High velocity" },
        ],
        outcomes: {
            bypass: {
                impact: { decisionClarity: -15, teamTrust: -10, userImpact: -20 },
                debrief: {
                    title: "The Velocity Crash of Month 3",
                    what: "• Month 1: 12 features shipped (Hero!) • Month 3: 1 feature shipped • Month 4: 100% bug fixing",
                    why: "• Traded sustainability for a 'Month 1' illusion • Lack of CI/CD and testing meant every new fix broke two others",
                    how: "• Developer morale hit rock bottom • Client asked why the 'best team' suddenly slowed down",
                    who: "• 'The Sprinter': Wins the start but never finishes the marathon.",
                    tomorrow: "Never skip Sprint 0. Define it as 'UX Reliability Setup' so non-technical stakeholders understand its value.",
                },
            },
            negotiate: {
                impact: { decisionClarity: 5, teamTrust: 5, userImpact: 5 },
                debrief: {
                    title: "The Middle Ground Muddle",
                    what: "• Shipped 6 features and 50% of infrastructure • Deployment is still manual (2 hours/dev) • Velocity stayed average",
                    why: "• Tried to please everyone and achieved mediocre results for all • Technical debt is moderate but predictable",
                    how: "• Reliability is 'okay' but manual errors happen once a week • Sustainable but not scalable",
                    who: "• 'The Compromiser': Keeps the peace but misses the chance for excellence.",
                    tomorrow: "Use 'Enabling Constraints' — if you ship a feature, it MUST have a unit test. No exceptions.",
                },
            },
            refactor: {
                impact: { decisionClarity: 25, teamTrust: 20, userImpact: 18 },
                debrief: {
                    title: "Slowing Down to Speed Up",
                    what: "• Zero features in week 1 • Week 4 onwards: 2x faster than the 'bypass' team • 99.9% uptime in production",
                    why: "• Automated testing and CI/CD reduced the cost of change • Quality became a 'by-product' of the environment",
                    how: "• PM eventually saw the value as 'TDR' (Ticket Delivery Rate) climbed • Board impressed by reliability",
                    who: "• 'The Platform Thinker': Builds the machine that builds the product.",
                    tomorrow: "Quantify 'Cost of Manual Work' for PMs. Show them how much dev time is wasted on non-feature work.",
                },
            },
        },
    },
    {
        id: "api-stability",
        title: "The 'Ready' API Illusion",
        story: "SAP team says 'API is Ready.' Your integration takes 3 days. But their Sandbox is down every 2 hours. PM wants to 'Go Live' in the morning because the code is 'finished'.",
        uxConnection: "A 'finished' integration that lacks error-handling is a UX lie. To the user, it doesn't matter whose fault it is — the app is just broken.",
        choices: [
            { type: "rely", label: "Trust the 'Ready' status", sublabel: "Ship on time • Risk production" },
            { type: "mock", label: "Use Static Mock data", sublabel: "Safe demo • Useless reality" },
            { type: "resilience", label: "Architect for Instability", sublabel: "Add Retries • 3-day delay" },
        ],
        outcomes: {
            rely: {
                impact: { decisionClarity: -15, teamTrust: -5, userImpact: -30 },
                debrief: {
                    title: "The Live Environment Meltdown",
                    what: "• App went live at 9 AM • 9:15 AM: 502 Bad Gateway for 80% of users • 11:00 AM: Manual Rollback performed",
                    why: "• Confused 'Connectivity' with 'Stability' • Failed to account for the 'Real World' behavior of external systems",
                    how: "• Client called it a 'disastrous launch' • PM apologized to the board publicly",
                    who: "• 'The Optimist': Assumes the sun always shines on a production server.",
                    tomorrow: "Assume every 3rd party API will fail. Build 'Graceful Degradation' into every integration.",
                },
            },
            mock: {
                impact: { decisionClarity: -5, teamTrust: 5, userImpact: -10 },
                debrief: {
                    title: "The Demo that Fooled the Client",
                    what: "• UAT went perfectly (with fake data) • Production failed immediately • Team spent the next 2 weeks rewriting core logic",
                    why: "• Hid the problem instead of solving it • Created a 'False Green' status for stakeholders",
                    how: "• Trust dropped when the 'working app' died on Day 1 • CTO questioned the team's testing rigor",
                    who: "• 'The Illusionist': Makes it look good today, pays the price tomorrow.",
                    tomorrow: "Mocks are for development, NOT for UAT. Use 'Staging with real latency' to test stability.",
                },
            },
            resilience: {
                impact: { decisionClarity: 25, teamTrust: 25, userImpact: 20 },
                debrief: {
                    title: "You Built a Bulletproof Bridge",
                    what: "• Delayed launch by 3 days • Added exponential backoff and retry queues • Users experienced 0% failure despite SAP flapping",
                    why: "• Treated external instability as a core feature requirement • Built for resilience, not just connectivity",
                    how: "• Client congratulated the team on 'The smoothest SAP integration ever' • No emergency patches needed",
                    who: "• 'The Resilience Engineer': Knows that uptime is a design choice, not an accident.",
                    tomorrow: "Implement 'Circuit Breakers' for every external service. If it's down, don't keep trying.",
                },
            },
        },
    },
];

const STAGE_BRIEFINGS = [
    {
        title: "The Circular 'Quick Fix'",
        scenario: "Core Engineering • Technical Debt • Incident Response",
        story: "A critical bug is timing out reconciliation. PM wants a 2-hour fix. The fast way creates a circular dependency.",
        uxConnection: "Technical 'Landmines' hidden in the code eventually explode into user-facing failures.",
        realLifeImpact: "• Increased regression testing time • Inability to scale features • Periodic 'random' production crashes",
    },
    {
        title: "The Sprint 0 Velocity Trap",
        scenario: "Project Kickoff • Foundational Engineering • Business Pressure",
        story: "Stakeholders want features immediately. Infrastructure (CI/CD, Monitoring) is seen as 'overhead'.",
        uxConnection: "Sustainable delivery depends on foundational health. No foundation = No speed in Month 3.",
        realLifeImpact: "• Developer burnout • Exponentially increasing bug counts • Unpredictable delivery dates",
    },
    {
        title: "The 'Ready' API Illusion",
        scenario: "External Integration • Resilience • Error Management",
        story: "External GSTN/SAP systems are 'Ready' but flap constantly. PM wants to ship on schedule.",
        uxConnection: "A system is only as stable as its weakest link. Resilience must be architected, not assumed.",
        realLifeImpact: "• Production instability • 24/7 emergency support on-call • Reputation damage with enterprise partners",
    },
];

export const DeveloperJourney = ({ onComplete }: { onComplete?: () => void }) => {
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
            <GradientBackground color1="#22c55e" color2="#3b82f6" />

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
                                    {currentStageIdx === 0 && <Stage1_Terminal hoveredChoice={hoveredChoice} />}
                                    {currentStageIdx === 1 && <Stage2_Debt hoveredChoice={hoveredChoice} />}
                                    {currentStageIdx === 2 && <Stage3_Interface hoveredChoice={hoveredChoice} />}
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
