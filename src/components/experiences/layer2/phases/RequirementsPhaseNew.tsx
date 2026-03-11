import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSDLC } from "../SDLCContext";
import { Layer2Wrapper } from "../Layer2Wrapper";

// Story Context Component - provides consistent framing across screens
interface StoryContextProps {
    step: number;
    totalSteps: number;
    title: string;
    subtitle: string;
    why: string;
}

const StoryContext = ({ step, totalSteps, title, subtitle, why }: StoryContextProps) => (
    <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 pb-4 border-b border-border/50"
    >
        <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
                <div className="flex gap-1">
                    {Array.from({ length: totalSteps }).map((_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${i < step ? "bg-primary" : i === step ? "bg-primary animate-pulse" : "bg-muted"}`}
                        />
                    ))}
                </div>
                <span className="text-xs text-muted-foreground">Step {step + 1} of {totalSteps}</span>
            </div>
            <div className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">Requirements Phase</div>
        </div>
        <h3 className="text-sm font-medium text-foreground mb-1">{title}</h3>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
        <div className="mt-2 flex items-center gap-2">
            <span className="text-xs text-primary">Why:</span>
            <span className="text-xs text-muted-foreground">{why}</span>
        </div>
    </motion.div>
);

// Screen types
type RequirementsScreen =
    | "storybridge"
    | "thebrief"
    | "spotvagueness"
    | "definewithrahul"
    | "prioritymatrix"
    | "clientpushback"
    | "consequence"
    | "takeaway";

const SCREEN_ORDER: RequirementsScreen[] = [
    "storybridge",
    "thebrief",
    "spotvagueness",
    "definewithrahul",
    "prioritymatrix",
    "clientpushback",
    "consequence",
    "takeaway"
];

// Requirement type with vagueness
interface Requirement {
    id: string;
    name: string;
    vagueDescription: string;
    interpretations: string[];
    userCentricOption: string;
    bloatedOption: string;
    rahulReaction: {
        good: string;
        bad: string;
    };
    effort: number;
}

const REQUIREMENTS: Requirement[] = [
    {
        id: "nav",
        name: "Navigation",
        vagueDescription: "simple, don't want visitors getting lost",
        interpretations: ["3 items? 5 items? 8 items?", "Hamburger menu? Full nav bar?", "Dropdown menus?"],
        userCentricOption: "3 clear items (Home, Services, Contact)",
        bloatedOption: "8 menu items with dropdowns",
        rahulReaction: { good: "Found what I needed in 2 seconds!", bad: "Too many options... where's contact?" },
        effort: 3
    },
    {
        id: "hero",
        name: "Hero Section",
        vagueDescription: "clean, modern look - feel premium",
        interpretations: ["Big video? Static image? Animation?", "One CTA or multiple?", "How much text?"],
        userCentricOption: "Clean headline + single CTA button",
        bloatedOption: "Video background + 3 CTAs + auto-carousel",
        rahulReaction: { good: "Clear message, clicked instantly!", bad: "Too much going on, couldn't focus" },
        effort: 4
    },
    {
        id: "contact",
        name: "Contact Form",
        vagueDescription: "prominent, that's the whole point",
        interpretations: ["How many fields? 3? 7? 12?", "Required validation?", "File uploads?"],
        userCentricOption: "3 fields: Name, Email, Message",
        bloatedOption: "7 fields with phone, company, budget, timeline",
        rahulReaction: { good: "Done in 30 seconds!", bad: "7 fields on mobile? I'll do this later..." },
        effort: 3
    },
    {
        id: "services",
        name: "Services Page",
        vagueDescription: "usual pages - services",
        interpretations: ["Cards? List? Accordion?", "Pricing included?", "Long descriptions?"],
        userCentricOption: "Simple cards with brief descriptions",
        bloatedOption: "Long detailed pages for each service",
        rahulReaction: { good: "Quick overview!", bad: "Wall of text..." },
        effort: 4
    },
    {
        id: "about",
        name: "About Page",
        vagueDescription: "usual pages - about us",
        interpretations: ["Team photos? History? Mission?", "How long?", "Video testimonials?"],
        userCentricOption: "Brief story + team highlights",
        bloatedOption: "Full company history + every team member",
        rahulReaction: { good: "Got the gist!", bad: "I just wanted contact info..." },
        effort: 3
    }
];

interface RequirementsPhaseNewProps {
    onComplete: () => void;
    initialScreen?: RequirementsScreen;
}

export const RequirementsPhaseNew = ({ onComplete, initialScreen }: RequirementsPhaseNewProps) => {
    const [currentScreen, setCurrentScreen] = useState<RequirementsScreen>(initialScreen || "storybridge");
    const [didPushBack, setDidPushBack] = useState<boolean | null>(null);
    const [revealedVagueness, setRevealedVagueness] = useState<string[]>([]);
    const [userChoices, setUserChoices] = useState<Record<string, "user-centric" | "bloated" | null>>({});
    const [priorities, setPriorities] = useState<Record<string, "must" | "should" | "could" | null>>({
        contact: "must" // Contact form already done in Discovery
    });

    const { addDecision, addUXDebt } = useSDLC();

    const goToNextScreen = useCallback(() => {
        const currentIndex = SCREEN_ORDER.indexOf(currentScreen);
        if (currentIndex < SCREEN_ORDER.length - 1) {
            setCurrentScreen(SCREEN_ORDER[currentIndex + 1]);
        }
    }, [currentScreen]);

    const handleRequirementChoice = useCallback((choice: boolean) => {
        setDidPushBack(choice);
        addDecision({
            phase: "requirements",
            choice: choice ? "Stood firm on priorities" : "Gave in to scope creep",
            reasoning: choice ? "Protected user experience" : "Avoided client conflict",
            userImpact: choice ? "positive" : "negative"
        });
        if (!choice) {
            addUXDebt({
                phase: "requirements",
                severity: "high",
                description: "Scope creep accepted - cluttered interface",
                userImpact: "Increased cognitive load for users"
            });
        }
        goToNextScreen();
    }, [addDecision, addUXDebt, goToNextScreen]);

    const getWrapperStage = (): "context" | "interaction" | "reflection" => {
        if (["storybridge", "thebrief"].includes(currentScreen)) return "context";
        if (["spotvagueness", "definewithrahul", "prioritymatrix", "clientpushback"].includes(currentScreen)) return "interaction";
        return "reflection";
    };

    return (
        <Layer2Wrapper stage={getWrapperStage()} phase="Requirements">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentScreen}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="w-full"
                >
                    {currentScreen === "storybridge" && (
                        <StoryBridgeScreen onContinue={goToNextScreen} />
                    )}
                    {currentScreen === "thebrief" && (
                        <TheBriefScreen onContinue={goToNextScreen} />
                    )}
                    {currentScreen === "spotvagueness" && (
                        <SpotVaguenessScreen
                            requirements={REQUIREMENTS}
                            revealed={revealedVagueness}
                            onReveal={(id) => setRevealedVagueness(prev => [...prev, id])}
                            onContinue={goToNextScreen}
                        />
                    )}
                    {currentScreen === "definewithrahul" && (
                        <DefineWithRahulScreen
                            requirements={REQUIREMENTS}
                            choices={userChoices}
                            onChoose={(id, choice) => setUserChoices(prev => ({ ...prev, [id]: choice }))}
                            onContinue={goToNextScreen}
                        />
                    )}
                    {currentScreen === "prioritymatrix" && (
                        <PriorityMatrixScreen
                            requirements={REQUIREMENTS}
                            priorities={priorities}
                            onPrioritize={(id, priority) => setPriorities(prev => ({ ...prev, [id]: priority }))}
                            onContinue={goToNextScreen}
                        />
                    )}
                    {currentScreen === "clientpushback" && (
                        <ClientPushbackScreen onChoice={handleRequirementChoice} />
                    )}
                    {currentScreen === "consequence" && (
                        <ConsequenceScreen didPushBack={didPushBack} onContinue={goToNextScreen} />
                    )}
                    {currentScreen === "takeaway" && (
                        <TakeawayScreen didPushBack={didPushBack} onComplete={onComplete} />
                    )}
                </motion.div>
            </AnimatePresence>
        </Layer2Wrapper>
    );
};

// ============================================
// SCREEN 1: STORY BRIDGE
// ============================================
interface ScreenProps {
    onContinue: () => void;
}

const StoryBridgeScreen = ({ onContinue }: ScreenProps) => {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 300),
            setTimeout(() => setStage(2), 1200),
            setTimeout(() => setStage(3), 2000),
        ];
        return () => timers.forEach(t => clearTimeout(t));
    }, []);

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            {/* Principle Reminder */}
            {stage >= 1 && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <p className="text-xs text-primary uppercase tracking-wide">From Discovery</p>
                    <div className="bg-card border-2 border-primary/30 rounded-xl p-6">
                        <p className="text-xl font-display text-foreground italic">
                            "Discovery isn't about the client.<br />
                            It's about the client's users."
                        </p>
                    </div>
                </motion.div>
            )}

            {/* What you learned */}
            {stage >= 2 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                >
                    <p className="text-center text-muted-foreground text-sm">What you learned:</p>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-card border border-border rounded-xl p-4 text-center space-y-2">
                            <p className="text-sm font-medium text-foreground">Know your user first</p>
                            <p className="text-xs text-muted-foreground">Before designing, understand who you're designing for</p>
                        </div>
                        <div className="bg-card border border-border rounded-xl p-4 text-center space-y-2">
                            <p className="text-sm font-medium text-foreground">User context drives decisions</p>
                            <p className="text-xs text-muted-foreground">Device, time, and mindset shape what works</p>
                        </div>
                        <div className="bg-card border border-border rounded-xl p-4 text-center space-y-2">
                            <p className="text-sm font-medium text-foreground">Discovery prevents rework</p>
                            <p className="text-xs text-muted-foreground">30 minutes of research saves weeks of fixes</p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Transition */}
            {stage >= 3 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4 pt-6"
                >
                    <p className="text-muted-foreground">
                        You handled the <span className="text-primary font-medium">contact form</span>.<br />
                        But the client's email had <span className="text-foreground font-medium">more requirements</span>...
                    </p>
                    <button
                        onClick={onContinue}
                        className="px-8 py-4 bg-primary text-primary-foreground font-display text-lg rounded-md hover:bg-primary/90 transition-colors"
                    >
                        See the Full Brief →
                    </button>
                </motion.div>
            )}
        </div>
    );
};

// ============================================
// SCREEN 2: THE BRIEF (Full Original Email)
// ============================================
const TheBriefScreen = ({ onContinue }: ScreenProps) => {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 300),
            setTimeout(() => setStage(2), 800),
            setTimeout(() => setStage(3), 2000),
        ];
        return () => timers.forEach(t => clearTimeout(t));
    }, []);

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            {/* Header */}
            {stage >= 1 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">Remember this?</p>
                    <h2 className="text-2xl font-display font-semibold text-foreground mt-2">
                        The Original Brief
                    </h2>
                </motion.div>
            )}

            {/* Email Card - Same format as Discovery */}
            {stage >= 2 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-lg overflow-hidden"
                >
                    <div className="p-4 border-b border-border flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                            <span className="text-primary font-bold">VS</span>
                        </div>
                        <div className="flex-1">
                            <p className="font-medium text-foreground">Vikram Shah</p>
                            <p className="text-xs text-muted-foreground">CEO, TechStartup Inc.</p>
                        </div>
                        <p className="text-xs text-muted-foreground">9:14 AM</p>
                    </div>
                    <div className="p-5 space-y-4">
                        <p className="font-medium text-foreground">Website Project - Urgent</p>
                        <div className="text-muted-foreground space-y-3 text-sm">
                            <p>Hi,</p>
                            <p>
                                Quick one - we need a website up and running ASAP. Our current site is
                                embarrassingly outdated and we're losing leads.
                            </p>
                            <p>
                                We're a B2B tech consulting firm. Main goal is to get people to contact us.
                                Think <span className="text-foreground bg-primary/10 px-1 rounded">clean, modern look</span> - like what you see on Stripe or Linear.
                                Nothing too flashy but it should <span className="text-foreground bg-primary/10 px-1 rounded">feel premium</span>.
                            </p>
                            <p>
                                Need the usual pages - home, about us, services, contact. Make sure the
                                <span className="text-foreground bg-primary/10 px-1 rounded"> contact form is prominent</span>, that's the whole point.
                                Navigation should be <span className="text-foreground bg-primary/10 px-1 rounded">simple</span>, don't want visitors getting lost.
                            </p>
                            <p>
                                Oh and it <span className="text-foreground bg-primary/10 px-1 rounded">HAS to work well on mobile</span>. Most of our audience
                                is browsing on phones.
                            </p>
                            <p>
                                Timeline: 4 weeks. We have a big pitch coming up.<br />
                                Budget: ₹2.5 lakhs, flexible if needed.
                            </p>
                            <p>
                                Can we do a quick call tomorrow to kick this off?
                            </p>
                            <p className="pt-2">
                                Thanks,<br />
                                <span className="text-foreground">Vikram</span>
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Problem highlight */}
            {stage >= 3 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center space-y-4"
                >
                    <div className="bg-friction/10 border border-friction/30 rounded-xl p-4">
                        <p className="text-sm text-friction">
                            Notice the highlighted phrases? These are <span className="font-bold">vague</span>.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            "Clean"? "Premium"? "Simple"? — Different people interpret these differently.
                        </p>
                    </div>
                    <button
                        onClick={onContinue}
                        className="px-8 py-4 bg-secondary text-secondary-foreground font-display rounded-md hover:bg-secondary/80 transition-colors"
                    >
                        Explore the Vagueness
                    </button>
                </motion.div>
            )}
        </div>
    );
};

// ============================================
// SCREEN 3: SPOT THE VAGUENESS (Redesigned)
// ============================================

// Email phrases data for the interactive experience
const EMAIL_PHRASES = [
    {
        id: "design",
        phrase: "clean, modern look... feel premium",
        interpretations: [
            "Minimalist white space?",
            "Dark mode with gradients?",
            "Subtle animations?",
            "High-end photography?"
        ]
    },
    {
        id: "nav",
        phrase: "Navigation should be simple",
        interpretations: [
            "3 menu items?",
            "5 menu items?",
            "Hamburger menu?",
            "Sticky header?"
        ]
    },
    {
        id: "contact",
        phrase: "contact form is prominent",
        interpretations: [
            "Above the fold?",
            "Floating button?",
            "Pop-up modal?",
            "Full-page form?"
        ]
    },
    {
        id: "mobile",
        phrase: "HAS to work well on mobile",
        interpretations: [
            "Mobile-first design?",
            "Separate mobile version?",
            "Same content, responsive?",
            "Tap-friendly buttons?"
        ]
    }
];

interface SpotVaguenessScreenProps {
    requirements: Requirement[];
    revealed: string[];
    onReveal: (id: string) => void;
    onContinue: () => void;
}

const SpotVaguenessScreen = ({ revealed, onReveal, onContinue }: SpotVaguenessScreenProps) => {
    const [stage, setStage] = useState(0);
    const [selectedPhrase, setSelectedPhrase] = useState<string | null>(null);
    const allRevealed = revealed.length >= EMAIL_PHRASES.length;

    useEffect(() => {
        setTimeout(() => setStage(1), 300);
    }, []);

    const handlePhraseClick = (id: string) => {
        if (!revealed.includes(id)) {
            setSelectedPhrase(id);
            onReveal(id);
        }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Story Context */}
            <StoryContext
                step={2}
                totalSteps={6}
                title="Vikram's email has hidden traps"
                subtitle="Before building anything, we need to uncover what he actually means"
                why="Vague requirements = different interpretations = wrong deliverables = rework"
            />

            {/* Header */}
            {stage >= 1 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-2"
                >
                    <h2 className="text-2xl font-display font-semibold text-foreground">
                        Spot the Vagueness
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Click the <span className="text-primary">highlighted phrases</span> in Vikram's email to see how many ways they could be interpreted
                    </p>
                </motion.div>
            )}

            {/* Main Content: Email + Interpretations */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Left: Email with clickable phrases */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-card border border-border rounded-xl overflow-hidden"
                >
                    <div className="p-3 border-b border-border flex items-center gap-2">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                            <span className="text-xs text-primary font-bold">VS</span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">Vikram Shah</p>
                            <p className="text-xs text-muted-foreground">CEO, TechStartup Inc.</p>
                        </div>
                    </div>
                    <div className="p-4 space-y-3 text-sm">
                        <p className="text-muted-foreground">Hi,</p>
                        <p className="text-muted-foreground">
                            We're a B2B tech consulting firm. Main goal is to get people to contact us.
                            Think{" "}
                            <button
                                onClick={() => handlePhraseClick("design")}
                                className={`px-1 rounded transition-all ${revealed.includes("design")
                                    ? "bg-friction/20 text-friction"
                                    : "bg-primary/20 text-primary hover:bg-primary/30 cursor-pointer"
                                    }`}
                            >
                                clean, modern look... feel premium
                            </button>
                            .
                        </p>
                        <p className="text-muted-foreground">
                            <button
                                onClick={() => handlePhraseClick("nav")}
                                className={`px-1 rounded transition-all ${revealed.includes("nav")
                                    ? "bg-friction/20 text-friction"
                                    : "bg-primary/20 text-primary hover:bg-primary/30 cursor-pointer"
                                    }`}
                            >
                                Navigation should be simple
                            </button>
                            , don't want visitors getting lost. Make sure the{" "}
                            <button
                                onClick={() => handlePhraseClick("contact")}
                                className={`px-1 rounded transition-all ${revealed.includes("contact")
                                    ? "bg-friction/20 text-friction"
                                    : "bg-primary/20 text-primary hover:bg-primary/30 cursor-pointer"
                                    }`}
                            >
                                contact form is prominent
                            </button>
                            .
                        </p>
                        <p className="text-muted-foreground">
                            It{" "}
                            <button
                                onClick={() => handlePhraseClick("mobile")}
                                className={`px-1 rounded transition-all ${revealed.includes("mobile")
                                    ? "bg-friction/20 text-friction"
                                    : "bg-primary/20 text-primary hover:bg-primary/30 cursor-pointer"
                                    }`}
                            >
                                HAS to work well on mobile
                            </button>
                            .
                        </p>
                    </div>
                </motion.div>

                {/* Right: Interpretation bubbles */}
                <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                        {EMAIL_PHRASES.map((phrase) => {
                            const isRevealed = revealed.includes(phrase.id);
                            if (!isRevealed) return null;

                            return (
                                <motion.div
                                    key={phrase.id}
                                    initial={{ opacity: 0, x: 20, scale: 0.9 }}
                                    animate={{ opacity: 1, x: 0, scale: 1 }}
                                    exit={{ opacity: 0, x: -20, scale: 0.9 }}
                                    className="bg-friction/5 border border-friction/30 rounded-xl p-4"
                                >
                                    <p className="text-xs text-friction uppercase tracking-wide mb-2">
                                        "{phrase.phrase}" could mean:
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {phrase.interpretations.map((interp, j) => (
                                            <motion.span
                                                key={j}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: j * 0.1 }}
                                                className="text-sm bg-card border border-border px-3 py-1.5 rounded-full text-muted-foreground"
                                            >
                                                {interp}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {revealed.length === 0 && (
                        <div className="h-full flex items-center justify-center text-center p-8">
                            <div className="space-y-2">
                                <p className="text-muted-foreground text-sm">
                                    Click a highlighted phrase in the email
                                </p>
                                <p className="text-xs text-muted-foreground/60">
                                    Interpretations will appear here
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 5 Designers Insight */}
            {revealed.length >= 2 && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-friction/5 border border-friction/20 rounded-xl p-4"
                >
                    <div className="flex items-center justify-center gap-6">
                        <div className="flex -space-x-2">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 bg-secondary rounded-full border-2 border-background flex items-center justify-center"
                                >
                                    <span className="text-xs text-muted-foreground">D{i}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm text-friction">
                            5 designers read this email → <span className="font-bold">5 different websites</span>
                        </p>
                    </div>
                </motion.div>
            )}

            {/* Progress and Continue */}
            <div className="text-center space-y-4">
                <div className="flex justify-center gap-2">
                    {EMAIL_PHRASES.map((phrase) => (
                        <div
                            key={phrase.id}
                            className={`w-3 h-3 rounded-full transition-all ${revealed.includes(phrase.id)
                                ? "bg-friction scale-110"
                                : "bg-secondary"
                                }`}
                        />
                    ))}
                </div>
                <p className="text-xs text-muted-foreground">
                    {revealed.length} of {EMAIL_PHRASES.length} phrases explored
                </p>

                {allRevealed && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4 pt-4"
                    >
                        <div className="bg-card border-2 border-friction/30 rounded-xl p-4">
                            <p className="text-foreground text-center">
                                <span className="text-friction font-medium">1 email</span> →{" "}
                                <span className="text-friction font-medium">{EMAIL_PHRASES.length} vague phrases</span> →{" "}
                                <span className="text-friction font-medium">{EMAIL_PHRASES.length * 4}+ possible interpretations</span>
                            </p>
                        </div>
                        <button
                            onClick={onContinue}
                            className="px-8 py-4 bg-primary text-primary-foreground font-display rounded-md hover:bg-primary/90 transition-colors"
                        >
                            Let's Define These with User Context →
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

// ============================================
// SCREEN 4: DEFINE WITH RAHUL (Redesigned with Phone Mockups)
// ============================================

// Phone mockup visual components for each requirement type
const PhoneMockupNav = ({ isSimple }: { isSimple: boolean }) => (
    <div className="bg-background rounded-lg border border-border overflow-hidden w-28 h-44">
        <div className="bg-card p-1 border-b border-border">
            <div className="h-1 w-6 bg-primary/30 rounded mx-auto" />
        </div>
        {isSimple ? (
            <div className="p-2 space-y-1">
                <div className="h-2 bg-primary/30 rounded w-full" />
                <div className="h-2 bg-muted rounded w-full" />
                <div className="h-2 bg-muted rounded w-full" />
            </div>
        ) : (
            <div className="p-1 space-y-0.5">
                <div className="h-1.5 bg-friction/30 rounded w-full" />
                <div className="h-1.5 bg-friction/20 rounded w-full" />
                <div className="h-1.5 bg-friction/20 rounded w-full" />
                <div className="h-1.5 bg-friction/20 rounded w-full" />
                <div className="h-1.5 bg-friction/20 rounded w-full" />
                <div className="h-1.5 bg-friction/20 rounded w-full" />
                <div className="h-1.5 bg-friction/20 rounded w-full" />
                <div className="h-1.5 bg-friction/20 rounded w-full" />
            </div>
        )}
        <div className="p-2 mt-1">
            <div className="h-4 bg-muted rounded" />
        </div>
    </div>
);

const PhoneMockupHero = ({ isClean }: { isClean: boolean }) => (
    <div className="bg-background rounded-lg border border-border overflow-hidden w-28 h-44">
        <div className="bg-card p-1 border-b border-border">
            <div className="h-1 w-6 bg-primary/30 rounded mx-auto" />
        </div>
        {isClean ? (
            <div className="p-2 space-y-2">
                <div className="h-8 bg-gradient-to-r from-primary/20 to-primary/10 rounded" />
                <div className="h-2 bg-muted rounded w-3/4 mx-auto" />
                <div className="h-3 bg-relief/40 rounded w-16 mx-auto" />
            </div>
        ) : (
            <div className="p-1 space-y-1">
                <div className="h-6 bg-friction/20 rounded animate-pulse" />
                <div className="flex gap-0.5">
                    <div className="h-2 bg-friction/30 rounded flex-1" />
                    <div className="h-2 bg-friction/30 rounded flex-1" />
                    <div className="h-2 bg-friction/30 rounded flex-1" />
                </div>
                <div className="h-2 bg-friction/20 rounded" />
                <div className="h-2 bg-friction/20 rounded w-3/4" />
            </div>
        )}
    </div>
);

const PhoneMockupForm = ({ isSimple }: { isSimple: boolean }) => (
    <div className="bg-background rounded-lg border border-border overflow-hidden w-28 h-44">
        <div className="bg-card p-1 border-b border-border">
            <div className="h-1 w-6 bg-primary/30 rounded mx-auto" />
        </div>
        <div className="p-2 space-y-1">
            <div className="h-1.5 bg-muted rounded w-1/2" />
            {isSimple ? (
                <>
                    <div className="h-3 bg-card border border-border rounded" />
                    <div className="h-1.5 bg-muted rounded w-1/2" />
                    <div className="h-3 bg-card border border-border rounded" />
                    <div className="h-1.5 bg-muted rounded w-1/2" />
                    <div className="h-6 bg-card border border-border rounded" />
                    <div className="h-4 bg-relief/40 rounded mt-2" />
                </>
            ) : (
                <>
                    <div className="h-2 bg-card border border-friction/30 rounded" />
                    <div className="h-2 bg-card border border-friction/30 rounded" />
                    <div className="h-2 bg-card border border-friction/30 rounded" />
                    <div className="h-2 bg-card border border-friction/30 rounded" />
                    <div className="h-2 bg-card border border-friction/30 rounded" />
                    <div className="h-2 bg-card border border-friction/30 rounded" />
                    <div className="h-2 bg-card border border-friction/30 rounded" />
                </>
            )}
        </div>
    </div>
);

interface DefineWithRahulScreenProps {
    requirements: Requirement[];
    choices: Record<string, "user-centric" | "bloated" | null>;
    onChoose: (id: string, choice: "user-centric" | "bloated") => void;
    onContinue: () => void;
}

const DefineWithRahulScreen = ({ requirements, choices, onChoose, onContinue }: DefineWithRahulScreenProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const nonContactReqs = requirements.filter(r => r.id !== "contact");
    const currentReq = nonContactReqs[currentIndex];
    const hasChosen = currentReq && choices[currentReq.id] !== undefined && choices[currentReq.id] !== null;
    const allChosen = nonContactReqs.every(r => choices[r.id] !== undefined && choices[r.id] !== null);

    const handleChoice = (choice: "user-centric" | "bloated") => {
        if (currentReq) {
            onChoose(currentReq.id, choice);
        }
    };

    const nextRequirement = () => {
        if (currentIndex < nonContactReqs.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    // Render phone mockup based on requirement type
    const renderPhoneMockup = (reqId: string, isUserCentric: boolean) => {
        if (reqId === "nav") return <PhoneMockupNav isSimple={isUserCentric} />;
        if (reqId === "hero") return <PhoneMockupHero isClean={isUserCentric} />;
        if (reqId === "contact" || reqId === "services" || reqId === "about") {
            return <PhoneMockupForm isSimple={isUserCentric} />;
        }
        return <PhoneMockupNav isSimple={isUserCentric} />;
    };

    if (!currentReq) return null;

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Story Context */}
            <StoryContext
                step={3}
                totalSteps={6}
                title="Now we define each requirement with Rahul in mind"
                subtitle="For each vague phrase, you'll choose how to interpret it"
                why="Different interpretations lead to different websites — we need to pick what's best for Rahul"
            />

            {/* Header with Rahul reminder */}
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs text-muted-foreground">Requirement {nonContactReqs.indexOf(currentReq) + 1} of {nonContactReqs.length}</p>
                    <h2 className="text-2xl font-display font-semibold text-foreground">
                        {currentReq.name}
                    </h2>
                </div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-card border-2 border-primary/30 rounded-xl p-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                            <span className="text-primary font-bold text-lg">R</span>
                        </div>
                        <div className="text-sm">
                            <p className="font-medium text-foreground">Remember Rahul?</p>
                            <p className="text-xs text-muted-foreground">58 years old • Phone user</p>
                            <p className="text-xs text-primary">60 seconds • Hates clutter</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* The vague requirement */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-friction/5 border border-friction/20 rounded-xl p-4"
            >
                <div className="flex items-center justify-center gap-4">
                    <p className="text-xs text-friction uppercase tracking-wide">Vikram said:</p>
                    <p className="text-foreground font-medium">"{currentReq.vagueDescription}"</p>
                </div>
            </motion.div>

            {/* Choice Cards with Phone Mockups */}
            {!hasChosen ? (
                <div className="grid md:grid-cols-2 gap-6">
                    <motion.button
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.02, borderColor: "rgba(255, 255, 255, 0.3)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleChoice("user-centric")}
                        className="p-5 bg-card border-2 border-border rounded-xl text-left hover:border-primary/40 transition-all"
                    >
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                {renderPhoneMockup(currentReq.id, true)}
                            </div>
                            <div className="flex-1 space-y-2">
                                <p className="text-sm text-foreground font-medium">Option A</p>
                                <p className="text-foreground font-medium">{currentReq.userCentricOption}</p>
                                <p className="text-xs text-muted-foreground">Minimal approach</p>
                            </div>
                        </div>
                    </motion.button>

                    <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.02, borderColor: "rgba(255, 255, 255, 0.3)" }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleChoice("bloated")}
                        className="p-5 bg-card border-2 border-border rounded-xl text-left hover:border-primary/40 transition-all"
                    >
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                {renderPhoneMockup(currentReq.id, false)}
                            </div>
                            <div className="flex-1 space-y-2">
                                <p className="text-sm text-foreground font-medium">Option B</p>
                                <p className="text-foreground font-medium">{currentReq.bloatedOption}</p>
                                <p className="text-xs text-muted-foreground">Feature-rich approach</p>
                            </div>
                        </div>
                    </motion.button>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    {/* Rahul's Reaction */}
                    <div className={`p-5 rounded-xl border-2 ${choices[currentReq.id] === "user-centric"
                        ? "bg-relief/10 border-relief/40"
                        : "bg-friction/10 border-friction/40"
                        }`}>
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0">
                                {renderPhoneMockup(currentReq.id, choices[currentReq.id] === "user-centric")}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-10 h-10 bg-card rounded-full flex items-center justify-center">
                                        <span className="text-primary font-bold">R</span>
                                    </div>
                                    <p className="font-medium text-foreground">Rahul's Reaction:</p>
                                </div>
                                <p className={`text-sm ${choices[currentReq.id] === "user-centric" ? "text-relief" : "text-friction"}`}>
                                    "{choices[currentReq.id] === "user-centric" ? currentReq.rahulReaction.good : currentReq.rahulReaction.bad}"
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Next button */}
                    {currentIndex < nonContactReqs.length - 1 ? (
                        <button
                            onClick={nextRequirement}
                            className="w-full py-4 bg-secondary text-secondary-foreground font-display rounded-md hover:bg-secondary/80 transition-colors"
                        >
                            Next Requirement ({currentIndex + 2}/{nonContactReqs.length}) →
                        </button>
                    ) : (
                        <button
                            onClick={onContinue}
                            className="w-full py-4 bg-primary text-primary-foreground font-display rounded-md hover:bg-primary/90 transition-colors"
                        >
                            Continue to Prioritization →
                        </button>
                    )}
                </motion.div>
            )}

            {/* Progress */}
            <div className="flex justify-center gap-3">
                {nonContactReqs.map((req, i) => (
                    <div
                        key={req.id}
                        className={`w-3 h-3 rounded-full transition-all ${i === currentIndex
                            ? "bg-primary scale-125"
                            : choices[req.id]
                                ? choices[req.id] === "user-centric" ? "bg-relief" : "bg-friction"
                                : "bg-secondary"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

// ============================================
// SCREEN 5: PRIORITY MATRIX
// ============================================
interface PriorityMatrixScreenProps {
    requirements: Requirement[];
    priorities: Record<string, "must" | "should" | "could" | null>;
    onPrioritize: (id: string, priority: "must" | "should" | "could") => void;
    onContinue: () => void;
}

const PriorityMatrixScreen = ({ requirements, priorities, onPrioritize, onContinue }: PriorityMatrixScreenProps) => {
    const [stage, setStage] = useState(0);
    const totalEffort = requirements.reduce((sum, r) => sum + r.effort, 0);
    const mustEffort = requirements.filter(r => priorities[r.id] === "must").reduce((sum, r) => sum + r.effort, 0);
    const allPrioritized = requirements.every(r => priorities[r.id] !== null && priorities[r.id] !== undefined);
    const overloaded = mustEffort > totalEffort * 0.5;

    useEffect(() => {
        setTimeout(() => setStage(1), 300);
    }, []);

    const priorityLabels = {
        must: { label: "Must Have", color: "bg-friction/20 border-friction/40 text-friction" },
        should: { label: "Should Have", color: "bg-primary/20 border-primary/40 text-primary" },
        could: { label: "Could Have", color: "bg-secondary border-border text-muted-foreground" }
    };

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Story Context */}
            <StoryContext
                step={4}
                totalSteps={6}
                title="Real projects have limits — time, budget, capacity"
                subtitle="Not everything can be a 'Must Have'. Decide what matters most for Rahul"
                why="Overloading means rushed work → bugs → poor experience → rework"
            />

            {/* Header */}
            {stage >= 1 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-2"
                >
                    <h2 className="text-2xl font-display font-semibold text-foreground">
                        Set Priorities
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        Assign each feature a priority — Not everything can be a "Must"
                    </p>
                </motion.div>
            )}

            {/* Timeline & Budget Constraint Bar */}
            <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                        <div className="text-sm">
                            <p className="text-xs text-muted-foreground uppercase">Timeline</p>
                            <p className="font-medium text-foreground">4 weeks</p>
                        </div>
                        <div className="text-sm">
                            <p className="text-xs text-muted-foreground uppercase">Budget</p>
                            <p className="font-medium text-foreground">₹2.5 lakhs</p>
                        </div>
                        <div className="text-sm">
                            <p className="text-xs text-muted-foreground uppercase">Capacity</p>
                            <p className="font-medium text-foreground">~20 days of work</p>
                        </div>
                    </div>
                    <p className={`text-sm font-medium ${overloaded ? "text-friction" : "text-foreground"}`}>
                        {Math.round((mustEffort / totalEffort) * 100)}% in "Must"
                    </p>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                        className={`h-full ${overloaded ? "bg-friction" : "bg-relief"}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(mustEffort / totalEffort) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
                {overloaded && (
                    <p className="text-xs text-friction mt-2">Too much in "Must Have" — everything becomes rushed!</p>
                )}
            </div>

            {/* Requirements Grid */}
            <div className="grid gap-3">
                {requirements.map((req) => (
                    <div
                        key={req.id}
                        className="bg-card border border-border rounded-xl p-4 flex items-center justify-between gap-4"
                    >
                        <div className="flex-1">
                            <p className="font-medium text-foreground">{req.name}</p>
                            <p className="text-xs text-muted-foreground">Effort: {req.effort} days</p>
                        </div>
                        {req.id === "contact" ? (
                            <div className="text-xs bg-relief/20 text-relief px-3 py-2 rounded-md">
                                ✓ Done in Discovery
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                {(["must", "should", "could"] as const).map((priority) => (
                                    <button
                                        key={priority}
                                        onClick={() => onPrioritize(req.id, priority)}
                                        className={`px-3 py-2 text-xs rounded-md border-2 transition-all ${priorities[req.id] === priority
                                            ? priorityLabels[priority].color
                                            : "bg-card border-border text-muted-foreground hover:border-primary/50"
                                            }`}
                                    >
                                        {priorityLabels[priority].label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Continue */}
            {allPrioritized && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <button
                        onClick={onContinue}
                        className="px-8 py-4 bg-primary text-primary-foreground font-display rounded-md hover:bg-primary/90 transition-colors"
                    >
                        Submit Priorities →
                    </button>
                </motion.div>
            )}
        </div>
    );
};

// ============================================
// SCREEN 6: CLIENT PUSHBACK
// ============================================
interface ClientPushbackScreenProps {
    onChoice: (pushBack: boolean) => void;
}

const ClientPushbackScreen = ({ onChoice }: ClientPushbackScreenProps) => {
    const [stage, setStage] = useState(0);


    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 500),
            setTimeout(() => setStage(2), 1500),
            setTimeout(() => setStage(3), 2500),
            setTimeout(() => setStage(4), 3500),
        ];
        return () => timers.forEach(t => clearTimeout(t));
    }, []);

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            {/* Story Context */}
            <StoryContext
                step={5}
                totalSteps={6}
                title="Vikram pushes back — this happens in real projects"
                subtitle="How you respond shapes the final product"
                why="Standing firm protects Rahul's experience. Caving leads to cluttered design"
            />

            {/* Slack-style chat header */}
            <div className="flex items-center gap-2">
                <span className="text-muted-foreground">#</span>
                <span className="font-medium text-foreground">client-portal</span>
            </div>

            {/* Chat messages */}
            <div className="space-y-4">
                {stage >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3"
                    >
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-primary font-bold">VS</span>
                        </div>
                        <div className="bg-card border border-border rounded-xl p-4 max-w-md">
                            <p className="text-xs text-muted-foreground mb-1">Vikram Shah</p>
                            <p className="text-foreground">Wait, why is the Hero section only a "Should"?</p>
                        </div>
                    </motion.div>
                )}

                {stage >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3"
                    >
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-primary font-bold">VS</span>
                        </div>
                        <div className="bg-card border border-border rounded-xl p-4 max-w-md">
                            <p className="text-xs text-muted-foreground mb-1">Vikram Shah</p>
                            <p className="text-foreground">We really need EVERYTHING to be Must Have. Our competitors have all of this.</p>
                        </div>
                    </motion.div>
                )}

                {stage >= 3 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3"
                    >
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-primary font-bold">VS</span>
                        </div>
                        <div className="bg-card border border-border rounded-xl p-4 max-w-md">
                            <p className="text-xs text-muted-foreground mb-1">Vikram Shah</p>
                            <p className="text-foreground">Can we just make everything a priority?</p>
                        </div>
                    </motion.div>
                )}

                {/* User typing indicator */}
                {stage >= 3 && stage < 4 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-3 items-center"
                    >
                        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-foreground font-bold">You</span>
                        </div>
                        <div className="bg-secondary/50 rounded-xl px-4 py-2">
                            <motion.div
                                className="flex gap-1"
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                <span className="w-2 h-2 bg-muted-foreground rounded-full" />
                                <span className="w-2 h-2 bg-muted-foreground rounded-full" />
                                <span className="w-2 h-2 bg-muted-foreground rounded-full" />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Choice */}
            {stage >= 4 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    <p className="text-center text-muted-foreground text-sm">How do you respond?</p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onChoice(true)}
                            className="p-5 bg-card border-2 border-border rounded-xl text-left hover:border-primary/40 transition-colors"
                        >
                            <p className="text-sm text-foreground font-medium mb-2">Push Back</p>
                            <p className="text-foreground">"Let me explain why Rahul needs a focused experience..."</p>
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => onChoice(false)}
                            className="p-5 bg-card border-2 border-border rounded-xl text-left hover:border-primary/40 transition-colors"
                        >
                            <p className="text-sm text-foreground font-medium mb-2">Agree</p>
                            <p className="text-foreground">"Okay, we'll make everything a Must Have."</p>
                        </motion.button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

// ============================================
// SCREEN 7: CONSEQUENCE (Redesigned - Project Impact)
// ============================================
interface ConsequenceScreenProps {
    didPushBack: boolean | null;
    onContinue: () => void;
}

// Team member visualization
const TeamMember = ({ name, role, stress, delay }: { name: string; role: string; stress: "relaxed" | "focused" | "stressed" | "overwhelmed"; delay: number }) => {
    const stressConfig = {
        relaxed: { color: "bg-relief/20 border-relief/40", emoji: "😊", label: "Relaxed" },
        focused: { color: "bg-primary/20 border-primary/40", emoji: "🎯", label: "Focused" },
        stressed: { color: "bg-friction/20 border-friction/40", emoji: "😰", label: "Stressed" },
        overwhelmed: { color: "bg-friction/40 border-friction/60", emoji: "😫", label: "Overwhelmed" }
    };
    const config = stressConfig[stress];

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay }}
            className={`p-3 rounded-xl border-2 ${config.color} text-center`}
        >
            <div className="text-2xl mb-1">{config.emoji}</div>
            <p className="text-xs font-medium text-foreground">{name}</p>
            <p className="text-[10px] text-muted-foreground">{role}</p>
            <p className={`text-[10px] mt-1 ${stress === "overwhelmed" || stress === "stressed" ? "text-friction" : "text-relief"}`}>
                {config.label}
            </p>
        </motion.div>
    );
};

// Consequence card component
const ConsequenceCard = ({ icon, title, description, type, delay }: {
    icon: string;
    title: string;
    description: string;
    type: "warning" | "danger" | "success";
    delay: number
}) => {
    const typeConfig = {
        warning: "bg-yellow-500/10 border-yellow-500/30 text-yellow-400",
        danger: "bg-friction/10 border-friction/30 text-friction",
        success: "bg-relief/10 border-relief/30 text-relief"
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay }}
            className={`p-4 rounded-xl border-2 ${typeConfig[type]}`}
        >
            <div className="flex items-start gap-3">
                <span className="text-xl">{icon}</span>
                <div>
                    <p className="font-medium text-foreground text-sm">{title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{description}</p>
                </div>
            </div>
        </motion.div>
    );
};

const ConsequenceScreen = ({ didPushBack, onContinue }: ConsequenceScreenProps) => {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 300),
            setTimeout(() => setStage(2), 800),
            setTimeout(() => setStage(3), 1500),
            setTimeout(() => setStage(4), 2200),
        ];
        return () => timers.forEach(t => clearTimeout(t));
    }, []);

    // Good path - pushed back on scope creep
    const focusedConsequences = [
        { icon: "✅", title: "Scope is manageable", description: "3.5 weeks of work fits in 4-week timeline", type: "success" as const },
        { icon: "🎯", title: "Team can focus", description: "Clear priorities = better quality work", type: "success" as const },
        { icon: "📅", title: "Timeline is realistic", description: "Buffer for feedback and polish", type: "success" as const },
        { icon: "💪", title: "Client trusts your expertise", description: "They hired you for a reason", type: "success" as const },
    ];

    // Bad path - gave in to scope creep
    const bloatedConsequences = [
        { icon: "⚠️", title: "Scope exploded to 7+ weeks", description: "75% over capacity for the timeline", type: "danger" as const },
        { icon: "🔥", title: "Team will rush everything", description: "No time for testing or polish", type: "danger" as const },
        { icon: "🐛", title: "Bugs will ship to production", description: "Corners will be cut under pressure", type: "warning" as const },
        { icon: "😤", title: "Client will blame you later", description: "When quality issues surface", type: "danger" as const },
    ];

    const consequences = didPushBack ? focusedConsequences : bloatedConsequences;

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Story Context */}
            <StoryContext
                step={5}
                totalSteps={6}
                title={didPushBack ? "You protected the project" : "You accepted scope creep"}
                subtitle="See the immediate impact on your team and timeline"
                why="Requirements decisions ripple through the entire project lifecycle"
            />

            {/* Header */}
            {stage >= 1 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-2"
                >
                    <h2 className="text-2xl font-display font-semibold text-foreground">
                        {didPushBack ? "Project Impact: Focused Scope" : "Project Impact: Scope Creep"}
                    </h2>
                    <p className="text-muted-foreground text-sm">
                        {didPushBack
                            ? "Your decision to push back keeps the project healthy"
                            : "Here's what happens when everything becomes a 'Must Have'"
                        }
                    </p>
                </motion.div>
            )}

            {/* Scope Comparison */}
            {stage >= 2 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-card border border-border rounded-xl p-5 space-y-4"
                >
                    <p className="text-sm font-medium text-foreground">Project Scope</p>

                    <div className="space-y-3">
                        {/* Capacity line */}
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground w-20">Capacity:</span>
                            <div className="flex-1 h-4 bg-secondary rounded-full overflow-hidden relative">
                                <div className="absolute inset-0 flex items-center justify-end pr-2">
                                    <span className="text-[10px] text-muted-foreground">4 weeks</span>
                                </div>
                                <div className="w-full h-full bg-muted/50" />
                            </div>
                        </div>

                        {/* Actual scope bar */}
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-muted-foreground w-20">Your scope:</span>
                            <div className="flex-1 h-4 bg-secondary rounded-full overflow-hidden relative">
                                <motion.div
                                    initial={{ width: "50%" }}
                                    animate={{ width: didPushBack ? "85%" : "175%" }}
                                    transition={{ duration: 1, delay: 0.3 }}
                                    className={`h-full ${didPushBack ? "bg-relief" : "bg-friction"}`}
                                />
                                <div className="absolute inset-0 flex items-center justify-end pr-2">
                                    <span className={`text-[10px] font-medium ${didPushBack ? "text-relief" : "text-friction"}`}>
                                        {didPushBack ? "~3.5 weeks" : "7+ weeks"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Status badge */}
                    <div className={`text-center py-2 rounded-lg ${didPushBack ? "bg-relief/10" : "bg-friction/10"}`}>
                        <span className={`text-sm font-medium ${didPushBack ? "text-relief" : "text-friction"}`}>
                            {didPushBack ? "✓ Within capacity — sustainable pace" : "✗ 75% over capacity — crunch mode ahead"}
                        </span>
                    </div>
                </motion.div>
            )}

            {/* Team Impact */}
            {stage >= 3 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                >
                    <p className="text-sm font-medium text-foreground">Your Team in Week 3:</p>
                    <div className="grid grid-cols-4 gap-3">
                        {didPushBack ? (
                            <>
                                <TeamMember name="You" role="Designer" stress="focused" delay={0} />
                                <TeamMember name="Dev 1" role="Frontend" stress="focused" delay={0.1} />
                                <TeamMember name="Dev 2" role="Backend" stress="relaxed" delay={0.2} />
                                <TeamMember name="QA" role="Testing" stress="relaxed" delay={0.3} />
                            </>
                        ) : (
                            <>
                                <TeamMember name="You" role="Designer" stress="overwhelmed" delay={0} />
                                <TeamMember name="Dev 1" role="Frontend" stress="stressed" delay={0.1} />
                                <TeamMember name="Dev 2" role="Backend" stress="overwhelmed" delay={0.2} />
                                <TeamMember name="QA" role="Testing" stress="stressed" delay={0.3} />
                            </>
                        )}
                    </div>
                </motion.div>
            )}

            {/* Consequence Cards */}
            {stage >= 4 && (
                <div className="space-y-3">
                    <p className="text-sm font-medium text-foreground">What Happens Next:</p>
                    <div className="grid md:grid-cols-2 gap-3">
                        {consequences.map((c, i) => (
                            <ConsequenceCard
                                key={c.title}
                                icon={c.icon}
                                title={c.title}
                                description={c.description}
                                type={c.type}
                                delay={i * 0.15}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Summary Banner */}
            {stage >= 4 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className={`p-5 rounded-xl border-2 ${didPushBack ? "bg-relief/5 border-relief/30" : "bg-friction/5 border-friction/30"}`}
                >
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${didPushBack ? "bg-relief/20" : "bg-friction/20"}`}>
                            {didPushBack ? "🛡️" : "💥"}
                        </div>
                        <div className="flex-1">
                            <p className={`font-medium text-lg ${didPushBack ? "text-relief" : "text-friction"}`}>
                                {didPushBack ? "Project Protected" : "Project at Risk"}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                {didPushBack
                                    ? "Design and Development can now proceed at a sustainable pace"
                                    : "The next phases will inherit these problems — and amplify them"
                                }
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Continue */}
            {stage >= 4 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center pt-4"
                >
                    <button
                        onClick={onContinue}
                        className="px-8 py-4 bg-secondary text-secondary-foreground font-display rounded-md hover:bg-secondary/80 transition-colors"
                    >
                        See Key Takeaways →
                    </button>
                </motion.div>
            )}
        </div>
    );
};

// ============================================
// SCREEN 8: TAKEAWAY
// ============================================
interface TakeawayScreenProps {
    didPushBack: boolean | null;
    onComplete: () => void;
}

const TakeawayScreen = ({ didPushBack, onComplete }: TakeawayScreenProps) => {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 300),
            setTimeout(() => setStage(2), 1000),
            setTimeout(() => setStage(3), 1800),
        ];
        return () => timers.forEach(t => clearTimeout(t));
    }, []);

    const learnings = [
        { text: "Vague requirements = team interprets = builds wrong thing" },
        { text: "User context turns vague into specific" },
        { text: "Not everything can be a 'Must Have'" },
        { text: "Protecting scope = protecting users" }
    ];

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            {/* Principle */}
            {stage >= 1 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-4"
                >
                    <p className="text-xs text-primary uppercase tracking-wide">Key Takeaway</p>
                    <div className="bg-card border-2 border-primary/30 rounded-xl p-6">
                        <p className="text-xl font-display text-foreground italic">
                            "Vague requirements become UX debt.<br />
                            Specific requirements protect users."
                        </p>
                    </div>
                </motion.div>
            )}

            {/* Learnings */}
            {stage >= 2 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                >
                    <p className="text-center text-muted-foreground text-sm">What you learned:</p>
                    <div className="grid gap-3">
                        {learnings.map((learning, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-3 p-4 bg-card border border-border rounded-xl"
                            >
                                <span className="w-2 h-2 bg-primary rounded-full"></span>
                                <p className="text-foreground">{learning.text}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Continue to Design */}
            {stage >= 3 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-3 pt-4"
                >
                    <p className="text-xs text-muted-foreground">
                        Next: Design Phase — turn these requirements into visuals
                    </p>
                    <button
                        onClick={onComplete}
                        className="px-10 py-5 bg-primary text-primary-foreground font-display text-lg rounded-md hover:bg-primary/90 transition-colors"
                    >
                        Continue to Design →
                    </button>
                </motion.div>
            )}
        </div>
    );
};
