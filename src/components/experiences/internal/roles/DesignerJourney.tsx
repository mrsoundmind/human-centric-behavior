import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    GenericStageWrapper,
    GenericDebriefOverlay,
    GenericBriefingOverlay,
    GradientBackground
} from "../RoleJourney";

// Import Exploded Stages
import { Stage1_LocalPeak } from "./designer/Stage1_LocalPeak";
import { Stage2_Handover } from "./designer/Stage2_Handover";
import { Stage3_Feedback } from "./designer/Stage3_Feedback";

// ============================================================
// DESIGNER JOURNEY DATA (Updated for High Digestibility)
// ============================================================

const STAGES = [
    {
        id: "local-peak-vs-system",
        title: "The 'One-Off' Temptation",
        story: "Client says the 'Submit' button on the onboarding screen is 'hard to find'. They want you to make it big, pink, and glowing. But your design system uses 8px rounded corners and a strict indigo brand color. Making this one button 'pop' breaks the system.",
        uxConnection: "UX is a system, not a screen. A 'local fix' that violates global rules creates a product that feels broken and amateur over time.",
        choices: [
            { type: "fix", label: "Make it Pop (Local Fix)", sublabel: "Submit to client • Break system" },
            { type: "educate", label: "Educate & Align", sublabel: "Explain consistency • Win trust" },
            { type: "pattern", label: "Apply Global Pattern", sublabel: "Use system tools • Scale easily" },
        ],
        outcomes: {
            fix: {
                impact: { decisionClarity: -15, teamTrust: -10, userImpact: -15 },
                debrief: {
                    title: "The Frankenstein UI Begins",
                    what: "• Client was happy for 1 hour • Engineering complained about 'CSS Hacks' in the PR • 2 weeks later: The app has 4 different button styles, confusing users",
                    why: "• Sacrificed 'Systemic Integrity' for 'Visual Appeasement' • Failed to defend the 'User's Cognitive Load' (which increases with inconsistency)",
                    how: "• App started feeling 'jumbled' to power users • Maintenance cost for UI updates doubled",
                    who: "• 'The Yes-Man Designer': Values a quick approval over a professional product.",
                    tomorrow: "Never fix a screen by breaking a system. If the button is 'hidden', look at 'Visual Hierarchy' across the whole flow.",
                },
            },
            educate: {
                impact: { decisionClarity: 20, teamTrust: 25, userImpact: 20 },
                debrief: {
                    title: "Design Leadership Unlocked",
                    what: "• Explained to the client how 'Predictable UI' builds trust • Re-designed the header to give the button more 'Negative Space' • Client praised your 'strategic' approach to the brand",
                    why: "• Understood that the client's 'Want' (Pink Button) was a symptom of a 'Need' (Visibility) • Provided a solution that respected the 'Whole' over the 'Part'",
                    how: "• Project stayed on tracks with the Design System • Gained 'Expert Authority' in the client's eyes",
                    who: "• 'The Strategic Liaison': Translates visual preferences into systemic value.",
                    tomorrow: "Use 'Negative Space' and 'Type Weight' before you use 'Color' to solve visibility problems.",
                },
            },
            pattern: {
                impact: { decisionClarity: 15, teamTrust: 15, userImpact: 10 },
                debrief: {
                    title: "The Efficiency Expert",
                    what: "• Used a 'Primary Action' pattern already in the library • Added a 'Pulse' animation (standard in the system) to guide the eye • Shipped in 10 minutes",
                    why: "• Leveraged existing 'System Intelligence' to solve the friction • Prevented technical debt while satisfying the requirement",
                    how: "• Build remained 'Clean' and 'Theme-Ready' • Client felt the response was 'Fast and Polished'",
                    who: "• 'The System Steward': Protects the contract between Design and Dev.",
                    tomorrow: "Before drawing a new component, check if the existing library can do 90% of the work.",
                },
            },
        },
    },
    {
        id: "developer-handover-drift",
        title: "The Handover Gap",
        story: "You finished the 'Merchant Dashboard'. It's pixel-perfect in Figma. You sent the link to the Dev. 2 days later, the build looks 'off'. The spacing is random, and colors are slightly muted. You realized you didn't define 'Design Tokens'—just hex codes and pixels.",
        uxConnection: "A design is only as good as the code that represents it. Handover is not a 'Delivery'; it's a 'Continuity' exercise.",
        choices: [
            { type: "pixels", label: "Fix via Redlines", sublabel: "Manual checks • Slow process" },
            { type: "spec", label: "Enforce Token Specs", sublabel: "Systemic fix • High speed" },
            { type: "collab", label: "Pair with Dev", sublabel: "Immediate loop • Build trust" },
        ],
        outcomes: {
            pixels: {
                impact: { decisionClarity: 5, teamTrust: 5, userImpact: -5 },
                debrief: {
                    title: "Manual Quality is Fragile Quality",
                    what: "• Fixed the spacing on 4 screens • Found 12 more issues in the next module • Dev team felt micromanaged by 'redline' comments",
                    why: "• Treated the symptom (Visual Drift) not the cause (Spec Ambiguity) • Pixels change; Tokens are forever",
                    how: "• App is 'Better' but not 'Stable' • Every new feature creates more 'Bug Bash' sessions",
                    who: "• 'The Pixel Matcher': Spends time on the result, not the process.",
                    tomorrow: "Stop specifying '24px'. Specify 'Spacing-XL'. Let the system do the math.",
                },
            },
            spec: {
                impact: { decisionClarity: 25, teamTrust: 20, userImpact: 20 },
                debrief: {
                    title: "The Architect of Scale",
                    what: "• Converted Figma styles into a 'Token JSON' • Dev team imported it and 'Fixed All' screens in 10 minutes • Future themes (Dark mode) now work automatically",
                    why: "• Created a 'Common Language' for Design and Dev • Quality became an inherent property of the build, not an audit item",
                    how: "• 60% reduction in 'UI Regression' bugs • Devs became advocates for your design vision",
                    who: "• 'The System Architect': Builds the engine that generates the UI.",
                    tomorrow: "Your Figma file should be 'Inspect-Ready.' Use auto-layout for everything.",
                },
            },
            collab: {
                impact: { decisionClarity: 20, teamTrust: 30, userImpact: 15 },
                debrief: {
                    title: "Relationship-Led Quality",
                    what: "• Sat with the Dev for 1 hour to fix CSS • Discovered that the Dev didn't know the 'Brand Palette' existed • Found a faster way to implement the 'Shadow' effects",
                    why: "• Realized that 'Handover' is a communication failure point • Built personal rapport that prevents future sloppy builds",
                    how: "• Shipped a 'Pixel-Perfect' build on time • Team morale and speed increased massively",
                    who: "• 'The Collaborative Lead': Knows that code is written by people, not exports.",
                    tomorrow: "Do a 'Handover Loom' video for every major feature. Explain the 'Why' of the spacing.",
                },
            },
        },
    },
    {
        id: "feedback-bounce-resilience",
        title: "Subjective Feedback Bounce",
        story: "Client Lead says: 'I don't like this blue. It feels too cold. Can we try something warmer, like Orange?' Your user research shows that the 'Blue' creates a 'Financial Trust' feeling for Indian SMEs. Orange might feel too 'Low-Budget'.",
        uxConnection: "Subjective feedback is the enemy of User-Centered Design. Your job is to ground the client's 'Taste' in 'User Data.'",
        choices: [
            { type: "accept", label: "Accept the 'Orange'", sublabel: "Client is King • Zero friction" },
            { type: "ground", label: "Ground in User Data", sublabel: "Research-led • High authority" },
            { type: "compromise", label: "Find a Mid-Point", sublabel: "Mix styles • Confused UX" },
        ],
        outcomes: {
            accept: {
                impact: { decisionClarity: -20, teamTrust: 5, userImpact: -25 },
                debrief: {
                    title: "The 'Yes-Man' UX Trap",
                    what: "• Shipped the 'Orange' theme • User testing: SMEs reported the app felt 'Untrustworthy' and 'Scammy' • Conversion rate dropped by 12%",
                    why: "• Valued 'Client Ego' above 'User Performance' • You are the expert; if you agree with every whim, you're just a hand with a mouse",
                    how: "• Redesign required in 2 months • Client blamed Design for the 'poor performance'",
                    who: "• 'The Order Taker': Draws what they are told, not what is right.",
                    tomorrow: "Never argue about 'Beauty.' Argue about 'Conversion,' 'Accessibility,' and 'Cognitive Load.'",
                },
            },
            ground: {
                impact: { decisionClarity: 30, teamTrust: 25, userImpact: 20 },
                debrief: {
                    title: "The Evidence-Based Designer",
                    what: "• Showed 3 competitor audits using the 'Trust Blue' • Presented user testing results showing higher completion rates with current color • Client apologized and withdrew the request",
                    why: "• Removed 'Subjectivity' from the room • Proved that design decisions are 'Technical,' not 'Artistic'",
                    how: "• Design integrity preserved • Client started asking for 'Data' before suggesting any more changes",
                    who: "• 'The Data-Driven Designer': Protects the user with a shield of evidence.",
                    tomorrow: "Always have 'One Slide of Evidence' ready for every major design choice.",
                },
            },
            compromise: {
                impact: { decisionClarity: 10, teamTrust: 10, userImpact: -10 },
                debrief: {
                    title: "The Muddled Experience",
                    what: "• Used a 'Warm Blue' that looked muddy • Satisfied neither the client nor the research • App looked 'Unrefined' and lacked a clear brand voice",
                    why: "• Tried to 'Split the Difference' and lost the 'Vision' • Middle-ground design is usually the weakest design",
                    how: "• Feature launched with apathy • No clear 'Wow' factor in the UI",
                    who: "• 'The Diplomat': Trades quality for harmony and loses both.",
                    tomorrow: "Pick a side. Design is about making a 'Commitment' to a user path.",
                },
            },
        },
    },
];

const STAGE_BRIEFINGS = [
    {
        title: "The 'One-Off' Temptation",
        scenario: "Design Systems • Consistency • Brand Integrity",
        story: "Client wants a 'Glowing Pink Button'. Your system says 'No'. Do you break the rules for one screen, or protect the system?",
        uxConnection: "A 'local fix' creates 'global debt'. If you can't reuse it, don't build it.",
        realLifeImpact: "• Inconsistent UI across flows • High maintenance costs • Slower development cycles",
    },
    {
        title: "The Handover Gap",
        scenario: "Developer Relations • Design Specs • Tokens",
        story: "Your Figma is a masterpiece. The build is a mess. Why? Because pixels are for artists, but tokens are for engineers.",
        uxConnection: "Design is not a picture; it's a set of instructions. If the instructions are vague, the build will be wrong.",
        realLifeImpact: "• Endless 'QA UI' bugs • Frustrated developers • Feature launches that 'feel' amateur",
    },
    {
        title: "Subjective Feedback Bounce",
        scenario: "Stakeholder Management • User Data • Design Authority",
        story: "Client wants Orange. You know Blue works. How do you stop an argument about 'Taste' from ruining the UX?",
        uxConnection: "Subjective feedback is noise. Data is the signal. A designer's job is to protect the signal.",
        realLifeImpact: "• Lower conversion rates (SME trust) • Product pivots based on ego, not users • Loss of professional credibility",
    },
];

export const DesignerJourney = ({ onComplete }: { onComplete?: () => void }) => {
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
            <GradientBackground color1="#ec4899" color2="#db2777" />

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
                                    {currentStageIdx === 0 && <Stage1_LocalPeak hoveredChoice={hoveredChoice} />}
                                    {currentStageIdx === 1 && <Stage2_Handover hoveredChoice={hoveredChoice} />}
                                    {currentStageIdx === 2 && <Stage3_Feedback hoveredChoice={hoveredChoice} />}
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
