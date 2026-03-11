import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSDLC } from "../SDLCContext";
import { Layer2Wrapper } from "../Layer2Wrapper";

interface DiscoveryPhaseNewProps {
    onComplete: () => void;
    initialScreen?: DiscoveryScreen;
}

type DiscoveryScreen =
    | "clientchat"
    | "teamchat"
    | "email"
    | "brief"
    | "persona"
    | "pressure"
    | "consequence"
    | "comparison"
    | "rootcause"
    | "principle"
    | "discoverymore"
    | "takeaway";

const SCREEN_ORDER: DiscoveryScreen[] = [
    "clientchat",
    "teamchat",
    "email",
    "brief",
    "persona",
    "pressure",
    "consequence",
    "comparison",
    "rootcause",
    "principle",
    "discoverymore",
    "takeaway"
];

export const DiscoveryPhaseNew = ({ onComplete, initialScreen }: DiscoveryPhaseNewProps) => {
    const [currentScreen, setCurrentScreen] = useState<DiscoveryScreen>(initialScreen || "clientchat");
    const [didDiscovery, setDidDiscovery] = useState<boolean | null>(null);
    const [briefGapsFound, setBriefGapsFound] = useState(0);

    const { addDecision, addUXDebt } = useSDLC();

    const goToNextScreen = useCallback(() => {
        const currentIndex = SCREEN_ORDER.indexOf(currentScreen);
        if (currentIndex < SCREEN_ORDER.length - 1) {
            let nextScreen = SCREEN_ORDER[currentIndex + 1];
            // Skip comparison screen if user did discovery (it's only for the "skipped" path)
            if (nextScreen === "comparison" && didDiscovery) {
                nextScreen = "rootcause";
            }
            setCurrentScreen(nextScreen);
        }
    }, [currentScreen, didDiscovery]);

    const handleDiscoveryChoice = useCallback((choice: boolean) => {
        setDidDiscovery(choice);
        if (!choice) {
            addUXDebt({
                source: "Discovery",
                type: "skip",
                description: "User research skipped - designing based on assumptions",
                visibility: "hidden"
            });
            addDecision("Discovery", "Skipped user research to meet timeline", "Assumptions will drive design decisions");
        } else {
            addDecision("Discovery", "Conducted user research before design", "Design informed by real user needs");
        }
        goToNextScreen();
    }, [addUXDebt, addDecision, goToNextScreen]);

    const getWrapperStage = (): "context" | "interaction" | "reflection" => {
        if (["clientchat", "teamchat", "email", "brief", "persona"].includes(currentScreen)) return "context";
        if (["pressure", "consequence", "comparison"].includes(currentScreen)) return "interaction";
        return "reflection";
    };

    return (
        <Layer2Wrapper stage={getWrapperStage()} phase="Discovery">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentScreen}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="w-full"
                >
                    {currentScreen === "clientchat" && (
                        <ClientChatScreen onContinue={goToNextScreen} />
                    )}
                    {currentScreen === "teamchat" && (
                        <TeamChatScreen onContinue={goToNextScreen} />
                    )}
                    {currentScreen === "email" && (
                        <EmailScreen onContinue={goToNextScreen} />
                    )}
                    {currentScreen === "brief" && (
                        <BriefScreen
                            onContinue={goToNextScreen}
                            onGapFound={() => setBriefGapsFound(prev => prev + 1)}
                            gapsFound={briefGapsFound}
                        />
                    )}
                    {currentScreen === "persona" && (
                        <PersonaScreen onContinue={goToNextScreen} gapsFound={briefGapsFound} />
                    )}
                    {currentScreen === "pressure" && (
                        <PressureScreen onChoice={handleDiscoveryChoice} />
                    )}
                    {currentScreen === "consequence" && (
                        <ConsequenceScreen didDiscovery={didDiscovery} onContinue={goToNextScreen} />
                    )}
                    {currentScreen === "comparison" && (
                        <ComparisonScreen didDiscovery={didDiscovery} onContinue={goToNextScreen} />
                    )}
                    {currentScreen === "rootcause" && (
                        <RootCauseScreen didDiscovery={didDiscovery} onContinue={goToNextScreen} />
                    )}
                    {currentScreen === "principle" && (
                        <PrincipleScreen didDiscovery={didDiscovery} onContinue={goToNextScreen} />
                    )}
                    {currentScreen === "discoverymore" && (
                        <DiscoveryMoreScreen onContinue={goToNextScreen} />
                    )}
                    {currentScreen === "takeaway" && (
                        <TakeawayScreen didDiscovery={didDiscovery} onComplete={onComplete} />
                    )}
                </motion.div>
            </AnimatePresence>
        </Layer2Wrapper>
    );
};

// ============================================
// SCREEN 1: CLIENT CHAT (PM ↔ Client)
// ============================================
interface ScreenProps { onContinue: () => void; }

const ClientChatScreen = ({ onContinue }: ScreenProps) => {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 500),
            setTimeout(() => setStage(2), 1500),
            setTimeout(() => setStage(3), 2500),
            setTimeout(() => setStage(4), 3500),
            setTimeout(() => setStage(5), 4500),
        ];
        return () => timers.forEach(t => clearTimeout(t));
    }, []);

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            {/* Chat header */}
            <div className="flex items-center gap-2 text-muted-foreground">
                <span>#</span>
                <span className="font-medium text-foreground">client-techstartup</span>
            </div>

            {/* Chat messages */}
            <div className="space-y-4">
                {stage >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3"
                    >
                        <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-primary font-bold">VS</span>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-3 max-w-md">
                            <p className="text-xs text-muted-foreground mb-1">Vikram Shah</p>
                            <p className="text-foreground text-sm">Hey, just following up on the proposal you sent last week.</p>
                        </div>
                    </motion.div>
                )}

                {stage >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3"
                    >
                        <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-foreground font-bold">PM</span>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-3 max-w-md">
                            <p className="text-xs text-muted-foreground mb-1">Project Manager</p>
                            <p className="text-foreground text-sm">Hi Vikram! Yes, we reviewed everything on our end. Looks good to proceed.</p>
                        </div>
                    </motion.div>
                )}

                {stage >= 3 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3"
                    >
                        <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-primary font-bold">VS</span>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-3 max-w-md">
                            <p className="text-xs text-muted-foreground mb-1">Vikram Shah</p>
                            <p className="text-foreground text-sm">Great! When can we start? We're on a bit of a deadline.</p>
                        </div>
                    </motion.div>
                )}

                {stage >= 4 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3"
                    >
                        <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-foreground font-bold">PM</span>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-3 max-w-md">
                            <p className="text-xs text-muted-foreground mb-1">Project Manager</p>
                            <p className="text-foreground text-sm">We can kick off Monday. Could you email over the full brief with all your requirements?</p>
                        </div>
                    </motion.div>
                )}

                {stage >= 5 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3"
                    >
                        <div className="w-8 h-8 bg-primary/20 rounded flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-primary font-bold">VS</span>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-3 max-w-md">
                            <p className="text-xs text-muted-foreground mb-1">Vikram Shah</p>
                            <p className="text-foreground text-sm">Perfect, I'll send it over today. Looking forward to working together!</p>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Continue */}
            {stage >= 5 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center pt-6"
                >
                    <button
                        onClick={onContinue}
                        className="px-8 py-4 bg-secondary text-secondary-foreground font-display rounded-md hover:bg-secondary/80 transition-colors"
                    >
                        Continue
                    </button>
                </motion.div>
            )}
        </div>
    );
};

// ============================================
// SCREEN 2: TEAM CHAT (PM → Team)
// ============================================
const TeamChatScreen = ({ onContinue }: ScreenProps) => {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 500),
            setTimeout(() => setStage(2), 1500),
            setTimeout(() => setStage(3), 2500),
        ];
        return () => timers.forEach(t => clearTimeout(t));
    }, []);

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            {/* Chat header */}
            <div className="flex items-center gap-2 text-muted-foreground">
                <span>#</span>
                <span className="font-medium text-foreground">team-general</span>
            </div>

            {/* Chat messages */}
            <div className="space-y-4">
                {stage >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3"
                    >
                        <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-foreground font-bold">PM</span>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-3 max-w-md">
                            <p className="text-xs text-muted-foreground mb-1">Project Manager</p>
                            <p className="text-foreground text-sm">Heads up team - the TechStartup project is a go! They just confirmed.</p>
                        </div>
                    </motion.div>
                )}

                {stage >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3"
                    >
                        <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-foreground font-bold">PM</span>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-3 max-w-md">
                            <p className="text-xs text-muted-foreground mb-1">Project Manager</p>
                            <p className="text-foreground text-sm">Vikram is sending over the brief. Check your email - should arrive shortly.</p>
                        </div>
                    </motion.div>
                )}

                {stage >= 3 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3"
                    >
                        <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center flex-shrink-0">
                            <span className="text-xs text-foreground font-bold">PM</span>
                        </div>
                        <div className="bg-card border border-border rounded-lg p-3 max-w-md">
                            <p className="text-xs text-muted-foreground mb-1">Project Manager</p>
                            <p className="text-foreground text-sm">We'll need to understand their users first before jumping into design. Let's not make assumptions.</p>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Continue */}
            {stage >= 3 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center pt-6"
                >
                    <button
                        onClick={onContinue}
                        className="px-8 py-4 bg-secondary text-secondary-foreground font-display rounded-md hover:bg-secondary/80 transition-colors"
                    >
                        Check your email
                    </button>
                </motion.div>
            )}
        </div>
    );
};

// ============================================
// SCREEN 3: EMAIL (with brief attachment)
// ============================================

const EmailScreen = ({ onContinue }: ScreenProps) => {
    const [stage, setStage] = useState<"notification" | "email">("notification");

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <AnimatePresence mode="wait">
                {stage === "notification" && (
                    <motion.div
                        key="notification"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex flex-col items-center space-y-6"
                    >
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-muted-foreground"
                        >
                            Monday morning. Your inbox lights up.
                        </motion.p>

                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setStage("email")}
                            className="relative p-8 bg-card border border-border rounded-2xl hover:border-primary/50 transition-colors cursor-pointer group"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5, type: "spring" }}
                                className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                            >
                                <span className="text-xs font-bold text-primary-foreground">1</span>
                            </motion.div>
                            <svg className="w-16 h-16 text-muted-foreground group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </motion.button>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="text-xs text-muted-foreground"
                        >
                            Click to open
                        </motion.p>
                    </motion.div>
                )}

                {stage === "email" && (
                    <motion.div
                        key="email"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full max-w-2xl space-y-4"
                    >
                        {/* Email Card */}
                        <div className="bg-card border border-border rounded-lg overflow-hidden">
                            <div className="p-4 border-b border-border flex items-center gap-3">
                                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                                    <span className="text-primary font-bold">TS</span>
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
                                        Think <span className="text-foreground">clean, modern look</span> - like what you see on Stripe or Linear.
                                        Nothing too flashy but it should <span className="text-foreground">feel premium</span>.
                                    </p>
                                    <p>
                                        Need the usual pages - home, about us, services, contact. Make sure the
                                        <span className="text-foreground"> contact form is prominent</span>, that's the whole point.
                                        Navigation should be <span className="text-foreground">simple</span>, don't want visitors getting lost.
                                    </p>
                                    <p>
                                        Oh and it <span className="text-foreground">HAS to work well on mobile</span>. Most of our audience
                                        is browsing on phones.
                                    </p>
                                    <p>
                                        <span className="text-foreground">Timeline: 4 weeks</span>. We have a big pitch coming up.<br />
                                        <span className="text-foreground">Budget: ₹2.5 lakhs</span>, flexible if needed.
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
                        </div>

                        {/* Transition text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="text-center text-muted-foreground text-sm"
                        >
                            This is what you have to work with.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex justify-center pt-4"
                        >
                            <button
                                onClick={onContinue}
                                className="px-8 py-4 bg-secondary text-secondary-foreground font-display rounded-md hover:bg-secondary/80 transition-colors"
                            >
                                Examine the brief →
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ============================================
// SCREEN 2: BRIEF (with full gap breakdown)
// ============================================
interface BriefScreenProps extends ScreenProps {
    onGapFound: () => void;
    gapsFound: number;
}

interface BriefItem {
    id: string;
    title: string;
    clientSaid: string;
    gap: string;
    effect: string;
    rootCause: string;
    howToFix: string;
}

const BRIEF_ITEMS: BriefItem[] = [
    {
        id: "design",
        title: "Design Direction",
        clientSaid: "Clean, modern look... feel premium",
        gap: "What does 'premium' mean to them? Dark mode? Minimal? What examples do they like?",
        effect: "Multiple revision rounds, 'I'll know it when I see it' feedback, wasted design time",
        rootCause: "Design preferences are subjective and different for everyone",
        howToFix: "Ask: 'Can you share 3 websites that feel premium to you and explain what makes them feel that way?'"
    },
    {
        id: "contact",
        title: "Contact Form",
        clientSaid: "Contact form is prominent, that's the whole point",
        gap: "What fields? Name/email only or detailed inquiry? What happens after submission?",
        effect: "Wrong form fields → users abandon, or too simple → unqualified leads flood inbox",
        rootCause: "Clients focus on having a form, not on what makes it work",
        howToFix: "Ask: 'What info do you need to qualify a lead? What's your response time target?'"
    },
    {
        id: "navigation",
        title: "Navigation",
        clientSaid: "Simple navigation, don't want visitors getting lost",
        gap: "How many pages exactly? What's the priority order? Any secondary nav needed?",
        effect: "Information architecture problems, important pages buried, users can't find what they need",
        rootCause: "Clients think 'simple' means 'minimal' but actually mean 'intuitive'",
        howToFix: "Ask: 'What's the #1 page you want visitors to find? Walk me through a typical visitor's journey'"
    },
    {
        id: "mobile",
        title: "Mobile Experience",
        clientSaid: "HAS to work well on mobile. Most of our audience is browsing on phones",
        gap: "Do they have data on mobile vs desktop? Same content priority or different?",
        effect: "Desktop-first design crammed into mobile, key actions hard to reach, slow load times",
        rootCause: "Everyone says mobile-first but few provide mobile-specific requirements",
        howToFix: "Ask: 'What percentage of your current traffic is mobile? What do mobile users do vs desktop?'"
    }
];

const BriefScreen = ({ onContinue, onGapFound, gapsFound }: BriefScreenProps) => {
    const [revealedItems, setRevealedItems] = useState<string[]>([]);
    const [expandedItem, setExpandedItem] = useState<string | null>(null);
    const [showTransition, setShowTransition] = useState(false);

    const revealItem = (id: string) => {
        if (!revealedItems.includes(id)) {
            setRevealedItems(prev => [...prev, id]);
            onGapFound();
        }
        setExpandedItem(expandedItem === id ? null : id);
    };

    const allRevealed = revealedItems.length >= 3;

    useEffect(() => {
        if (allRevealed && !showTransition) {
            setTimeout(() => setShowTransition(true), 800);
        }
    }, [allRevealed, showTransition]);

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-2"
            >
                <p className="text-muted-foreground uppercase tracking-wide text-sm">The Brief</p>
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
                    What the client shared
                </h2>
                <p className="text-muted-foreground text-sm">
                    Click each section to see the gap, its effects, and how to fix it
                </p>
            </motion.div>

            {/* Brief Cards - now as accordion */}
            <div className="space-y-3">
                {BRIEF_ITEMS.map((item, i) => {
                    const isRevealed = revealedItems.includes(item.id);
                    const isExpanded = expandedItem === item.id;

                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 + i * 0.1 }}
                            className={`rounded-lg border overflow-hidden transition-all ${isRevealed
                                ? "bg-friction/5 border-friction/30"
                                : "bg-card border-border hover:border-primary/50"
                                }`}
                        >
                            {/* Card Header - always visible */}
                            <button
                                onClick={() => revealItem(item.id)}
                                className="w-full p-4 text-left flex justify-between items-center"
                            >
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="font-medium text-foreground">{item.title}</h3>
                                        {isRevealed && (
                                            <span className="text-xs px-2 py-0.5 bg-friction/20 text-friction rounded">
                                                Gap found
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        Client says: "{item.clientSaid}"
                                    </p>
                                </div>
                                <svg
                                    className={`w-5 h-5 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`}
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Expanded Content - Gap breakdown */}
                            {isExpanded && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="px-4 pb-4 space-y-3"
                                >
                                    <div className="grid md:grid-cols-2 gap-3">
                                        {/* Gap */}
                                        <div className="p-3 bg-friction/10 rounded-lg border border-friction/20">
                                            <p className="text-xs text-friction font-medium uppercase tracking-wide mb-1">
                                                🔍 The Gap
                                            </p>
                                            <p className="text-sm text-foreground">{item.gap}</p>
                                        </div>

                                        {/* Effect */}
                                        <div className="p-3 bg-secondary/30 rounded-lg border border-border">
                                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
                                                💥 Effect If Skipped
                                            </p>
                                            <p className="text-sm text-foreground">{item.effect}</p>
                                        </div>

                                        {/* Root Cause */}
                                        <div className="p-3 bg-secondary/30 rounded-lg border border-border">
                                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
                                                🧠 Why This Happens
                                            </p>
                                            <p className="text-sm text-foreground">{item.rootCause}</p>
                                        </div>

                                        {/* How to Fix */}
                                        <div className="p-3 bg-relief/10 rounded-lg border border-relief/20">
                                            <p className="text-xs text-relief font-medium uppercase tracking-wide mb-1">
                                                ✅ How to Fix
                                            </p>
                                            <p className="text-sm text-foreground">{item.howToFix}</p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* Assumption counter */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex justify-center"
            >
                <div className="px-4 py-2 bg-secondary/30 rounded-full">
                    <span className="text-sm text-muted-foreground">
                        {gapsFound === 0 ? (
                            "Click sections to find gaps"
                        ) : (
                            <><span className="text-friction font-medium">{gapsFound} gaps</span> found — these become assumptions</>
                        )}
                    </span>
                </div>
            </motion.div>

            {/* What happens if we skip */}
            {gapsFound >= 2 && !showTransition && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-friction/5 border border-friction/20 rounded-lg p-5"
                >
                    <p className="text-sm text-muted-foreground mb-3">
                        <span className="text-friction font-medium">What happens if we skip this?</span>
                    </p>
                    <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-start gap-2">
                            <span className="text-friction">→</span>
                            <p className="text-muted-foreground">
                                <span className="text-foreground">Design changes late</span> — when the real users don't match assumptions
                            </p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-friction">→</span>
                            <p className="text-muted-foreground">
                                <span className="text-foreground">Forms get abandoned</span> — wrong fields for wrong people
                            </p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-friction">→</span>
                            <p className="text-muted-foreground">
                                <span className="text-foreground">Client says "not quite right"</span> — but can't explain why
                            </p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-relief">✓</span>
                            <p className="text-muted-foreground">
                                <span className="text-foreground">Fix it now:</span> Schedule a 30-min discovery call
                            </p>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* Transition */}
            {showTransition && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 pt-4"
                >
                    {/* Context for transition */}
                    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
                        <p className="text-foreground font-medium">You've found the gaps. But gaps are abstract.</p>
                        <p className="text-muted-foreground">
                            To understand why they matter, you need to see who will experience them.
                            <br />
                            Every wrong assumption becomes friction for a real person.
                        </p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2 border-t border-border">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                            <span>Next: Meet one of TechStartup's actual potential customers</span>
                        </div>
                    </div>

                    <div className="text-center">
                        <button
                            onClick={onContinue}
                            className="px-8 py-4 bg-secondary text-secondary-foreground font-display rounded-md hover:bg-secondary/80 transition-colors"
                        >
                            Meet the real user →
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

// ============================================
// SCREEN 3: PERSONA (Multiple personas with rich details)
// ============================================
interface PersonaScreenProps extends ScreenProps {
    gapsFound: number;
}

interface Persona {
    id: string;
    initials: string;
    name: string;
    age: number;
    role: string;
    context: string;
    quote: string;
    painPoints: string[];
    behaviors: {
        id: string;
        icon: string;
        label: string;
        detail: string;
        websiteImpact: string;
    }[];
}

const PERSONAS: Persona[] = [
    {
        id: "rahul",
        initials: "RM",
        name: "Rahul Mehta",
        age: 34,
        role: "Operations Manager",
        context: "Browses on phone during 15-min train commute. Makes quick decisions under pressure.",
        quote: "If I can't figure it out in 30 seconds, I'm moving on.",
        painPoints: ["Too many options", "Slow loading", "Long forms", "Cluttered layouts"],
        behaviors: [
            { id: "mobile", icon: "📱", label: "Mobile-first", detail: "Uses phone 90% of time", websiteImpact: "Responsive layout essential" },
            { id: "speed", icon: "⚡", label: "Decides in 60 sec", detail: "Leaves if confused", websiteImpact: "Clear CTA above fold" },
            { id: "forms", icon: "📝", label: "Hates long forms", detail: "Drops at 4+ fields", websiteImpact: "3 fields maximum" },
            { id: "scroll", icon: "👆", label: "Thumb scroller", detail: "One-hand usage", websiteImpact: "Bottom navigation" },
        ]
    },
    {
        id: "priya",
        initials: "PS",
        name: "Priya Sharma",
        age: 42,
        role: "Business Owner",
        context: "Researches on desktop after hours. Compares 3-4 vendors before deciding.",
        quote: "I need to trust you before I give you my business.",
        painPoints: ["Vague pricing", "No testimonials", "Generic content", "Hidden contact"],
        behaviors: [
            { id: "compare", icon: "🔍", label: "Compares vendors", detail: "Opens 4 tabs", websiteImpact: "Clear differentiators" },
            { id: "trust", icon: "🛡️", label: "Needs proof", detail: "Looks for reviews", websiteImpact: "Testimonials visible" },
            { id: "pricing", icon: "💰", label: "Pricing clarity", detail: "Leaves if hidden", websiteImpact: "Show pricing upfront" },
            { id: "about", icon: "👤", label: "Wants to know you", detail: "Reads About page", websiteImpact: "Team photos, story" },
        ]
    },
    {
        id: "amit",
        initials: "AK",
        name: "Amit Kumar",
        age: 38,
        role: "IT Manager",
        context: "Evaluates technical fit. Needs details for leadership presentations.",
        quote: "Will this integrate with what we already have?",
        painPoints: ["Marketing fluff", "No docs", "Hidden specs", "No API info"],
        behaviors: [
            { id: "tech", icon: "⚙️", label: "Wants specs", detail: "Looks for stack", websiteImpact: "Technical details page" },
            { id: "docs", icon: "📄", label: "Downloads docs", detail: "Needs PDFs", websiteImpact: "Case studies section" },
            { id: "security", icon: "🔒", label: "Security first", detail: "Checks compliance", websiteImpact: "Certifications shown" },
            { id: "api", icon: "🔌", label: "Integration focus", detail: "Needs API docs", websiteImpact: "Developer portal" },
        ]
    }
];

// Visual Layout Mockups for each behavior type
const LayoutMockups: Record<string, React.ReactNode> = {
    mobile: (
        <div className="flex gap-3 items-center justify-center">
            <div className="text-center">
                <div className="w-10 h-18 bg-relief/20 border border-relief/50 rounded flex flex-col p-1">
                    <div className="h-2 bg-relief/40 rounded-sm mb-1" />
                    <div className="flex-1 space-y-0.5">
                        <div className="h-1 bg-relief/30 rounded-sm" />
                        <div className="h-1 bg-relief/30 rounded-sm w-3/4" />
                    </div>
                    <div className="h-2 bg-relief rounded-sm mt-1" />
                </div>
                <p className="text-[8px] text-relief mt-1">✓ Mobile</p>
            </div>
            <div className="text-center opacity-50">
                <div className="w-10 h-18 bg-friction/20 border border-friction/50 rounded flex flex-col p-0.5">
                    <div className="h-1 bg-friction/40 rounded-sm" />
                    <div className="flex-1 flex flex-col gap-0.5 overflow-hidden">
                        <div className="h-0.5 bg-friction/30 rounded-sm" />
                        <div className="h-0.5 bg-friction/30 rounded-sm" />
                        <div className="h-0.5 bg-friction/30 rounded-sm" />
                    </div>
                </div>
                <p className="text-[8px] text-friction mt-1">✗ Squished</p>
            </div>
        </div>
    ),
    speed: (
        <div className="flex gap-3 items-center justify-center">
            <div className="text-center">
                <div className="w-14 h-12 bg-relief/20 border border-relief/50 rounded p-1">
                    <div className="h-3 bg-relief/40 rounded-sm mb-1" />
                    <div className="h-4 bg-relief rounded-sm flex items-center justify-center">
                        <span className="text-[6px]">CTA</span>
                    </div>
                </div>
                <p className="text-[8px] text-relief mt-1">✓ Clear</p>
            </div>
            <div className="text-center opacity-50">
                <div className="w-14 h-12 bg-friction/20 border border-friction/50 rounded p-1">
                    <div className="grid grid-cols-3 gap-0.5 h-full">
                        {[...Array(6)].map((_, i) => <div key={i} className="bg-friction/30 rounded-sm" />)}
                    </div>
                </div>
                <p className="text-[8px] text-friction mt-1">✗ Cluttered</p>
            </div>
        </div>
    ),
    forms: (
        <div className="flex gap-3 items-center justify-center">
            <div className="text-center">
                <div className="w-14 h-14 bg-relief/20 border border-relief/50 rounded p-1 flex flex-col gap-1">
                    {[1, 2, 3].map((i) => <div key={i} className="h-2 bg-relief/30 border border-relief/40 rounded-sm" />)}
                    <div className="h-3 bg-relief rounded-sm mt-auto" />
                </div>
                <p className="text-[8px] text-relief mt-1">✓ 3 fields</p>
            </div>
            <div className="text-center opacity-50">
                <div className="w-14 h-14 bg-friction/20 border border-friction/50 rounded p-0.5 flex flex-col gap-0.5">
                    {[1, 2, 3, 4, 5, 6, 7].map((i) => <div key={i} className="h-1 bg-friction/30 rounded-sm" />)}
                </div>
                <p className="text-[8px] text-friction mt-1">✗ 7 fields</p>
            </div>
        </div>
    ),
    scroll: (
        <div className="flex gap-3 items-center justify-center">
            <div className="text-center">
                <div className="w-10 h-16 bg-relief/20 border border-relief/50 rounded flex flex-col p-1">
                    <div className="flex-1" />
                    <div className="flex justify-around gap-1">
                        {["🏠", "📱", "👤"].map((icon, i) => <span key={i} className="text-[8px]">{icon}</span>)}
                    </div>
                </div>
                <p className="text-[8px] text-relief mt-1">✓ Bottom nav</p>
            </div>
            <div className="text-center opacity-50">
                <div className="w-10 h-16 bg-friction/20 border border-friction/50 rounded flex flex-col p-1">
                    <div className="flex justify-around gap-1">
                        {["≡", "○", "○"].map((icon, i) => <span key={i} className="text-[6px]">{icon}</span>)}
                    </div>
                    <div className="flex-1" />
                </div>
                <p className="text-[8px] text-friction mt-1">✗ Top nav</p>
            </div>
        </div>
    ),
    trust: (
        <div className="flex gap-3 items-center justify-center">
            <div className="text-center">
                <div className="w-14 h-12 bg-relief/20 border border-relief/50 rounded p-1">
                    <div className="flex gap-0.5 mb-1">
                        {["⭐", "🏆", "✓"].map((icon, i) => <span key={i} className="text-[6px]">{icon}</span>)}
                    </div>
                    <div className="h-3 bg-relief/30 rounded-sm" />
                    <div className="h-3 bg-relief rounded-sm mt-1" />
                </div>
                <p className="text-[8px] text-relief mt-1">✓ Trust</p>
            </div>
            <div className="text-center opacity-50">
                <div className="w-14 h-12 bg-friction/20 border border-friction/50 rounded p-1 flex items-center justify-center">
                    <span className="text-friction text-lg">?</span>
                </div>
                <p className="text-[8px] text-friction mt-1">✗ No proof</p>
            </div>
        </div>
    ),
    compare: (
        <div className="flex gap-3 items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-12 bg-relief/20 border border-relief/50 rounded p-1">
                    <div className="grid grid-cols-3 gap-0.5 text-[5px] text-center">
                        <div className="bg-relief/30 rounded-sm p-0.5">Us</div>
                        <div className="bg-secondary/30 rounded-sm p-0.5">A</div>
                        <div className="bg-secondary/30 rounded-sm p-0.5">B</div>
                        <div className="bg-relief rounded-sm p-0.5">✓</div>
                        <div className="bg-secondary/50 rounded-sm p-0.5">-</div>
                        <div className="bg-secondary/50 rounded-sm p-0.5">-</div>
                    </div>
                </div>
                <p className="text-[8px] text-relief mt-1">✓ Compare</p>
            </div>
            <div className="text-center opacity-50">
                <div className="w-16 h-12 bg-friction/20 border border-friction/50 rounded p-1 flex items-center justify-center">
                    <div className="text-[6px] text-friction">We're the best!</div>
                </div>
                <p className="text-[8px] text-friction mt-1">✗ Vague</p>
            </div>
        </div>
    ),
    pricing: (
        <div className="flex gap-3 items-center justify-center">
            <div className="text-center">
                <div className="w-14 h-12 bg-relief/20 border border-relief/50 rounded p-1">
                    <div className="text-[8px] text-center font-bold mb-1">$99/mo</div>
                    <div className="space-y-0.5">
                        <div className="h-1 bg-relief/30 rounded-sm" />
                        <div className="h-1 bg-relief/30 rounded-sm" />
                    </div>
                    <div className="h-2 bg-relief rounded-sm mt-1" />
                </div>
                <p className="text-[8px] text-relief mt-1">✓ Clear</p>
            </div>
            <div className="text-center opacity-50">
                <div className="w-14 h-12 bg-friction/20 border border-friction/50 rounded p-1 flex items-center justify-center">
                    <div className="text-[6px] text-friction">Contact us</div>
                </div>
                <p className="text-[8px] text-friction mt-1">✗ Hidden</p>
            </div>
        </div>
    ),
    about: (
        <div className="flex gap-3 items-center justify-center">
            <div className="text-center">
                <div className="w-14 h-12 bg-relief/20 border border-relief/50 rounded p-1">
                    <div className="flex justify-center gap-1 mb-1">
                        {["👤", "👤", "👤"].map((icon, i) => <span key={i} className="text-[8px]">{icon}</span>)}
                    </div>
                    <div className="h-1 bg-relief/30 rounded-sm" />
                    <div className="h-1 bg-relief/30 rounded-sm mt-0.5" />
                </div>
                <p className="text-[8px] text-relief mt-1">✓ Team</p>
            </div>
            <div className="text-center opacity-50">
                <div className="w-14 h-12 bg-friction/20 border border-friction/50 rounded p-1 flex items-center justify-center">
                    <div className="text-[6px] text-friction text-center">Est. 2020</div>
                </div>
                <p className="text-[8px] text-friction mt-1">✗ Generic</p>
            </div>
        </div>
    ),
    tech: (
        <div className="flex gap-3 items-center justify-center">
            <div className="text-center">
                <div className="w-14 h-12 bg-relief/20 border border-relief/50 rounded p-1">
                    <div className="text-[6px] mb-1">Stack:</div>
                    <div className="flex gap-0.5">
                        {["⚛️", "🟢", "🐳"].map((icon, i) => <span key={i} className="text-[8px]">{icon}</span>)}
                    </div>
                    <div className="h-2 bg-relief/30 rounded-sm mt-1" />
                </div>
                <p className="text-[8px] text-relief mt-1">✓ Specs</p>
            </div>
            <div className="text-center opacity-50">
                <div className="w-14 h-12 bg-friction/20 border border-friction/50 rounded p-1 flex items-center justify-center">
                    <div className="text-[6px] text-friction">Cutting-edge!</div>
                </div>
                <p className="text-[8px] text-friction mt-1">✗ Fluff</p>
            </div>
        </div>
    ),
    docs: (
        <div className="flex gap-3 items-center justify-center">
            <div className="text-center">
                <div className="w-14 h-12 bg-relief/20 border border-relief/50 rounded p-1">
                    <div className="flex gap-1 justify-center">
                        {["📄", "📊", "📥"].map((icon, i) => <span key={i} className="text-[10px]">{icon}</span>)}
                    </div>
                    <div className="text-[6px] mt-1">Download</div>
                </div>
                <p className="text-[8px] text-relief mt-1">✓ Docs</p>
            </div>
            <div className="text-center opacity-50">
                <div className="w-14 h-12 bg-friction/20 border border-friction/50 rounded p-1 flex items-center justify-center">
                    <span className="text-friction">📞</span>
                </div>
                <p className="text-[8px] text-friction mt-1">✗ Call only</p>
            </div>
        </div>
    ),
    security: (
        <div className="flex gap-3 items-center justify-center">
            <div className="text-center">
                <div className="w-14 h-12 bg-relief/20 border border-relief/50 rounded p-1">
                    <div className="flex gap-1 justify-center">
                        {["🔒", "✓", "🛡️"].map((icon, i) => <span key={i} className="text-[8px]">{icon}</span>)}
                    </div>
                    <div className="text-[5px] mt-1">SOC2 | GDPR</div>
                </div>
                <p className="text-[8px] text-relief mt-1">✓ Certs</p>
            </div>
            <div className="text-center opacity-50">
                <div className="w-14 h-12 bg-friction/20 border border-friction/50 rounded p-1 flex items-center justify-center">
                    <span className="text-[6px] text-friction">Secure</span>
                </div>
                <p className="text-[8px] text-friction mt-1">✗ No proof</p>
            </div>
        </div>
    ),
    api: (
        <div className="flex gap-3 items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-12 bg-relief/20 border border-relief/50 rounded p-1">
                    <div className="text-[5px] font-mono bg-relief/30 rounded p-0.5">GET /api/v1</div>
                    <div className="text-[5px] font-mono bg-relief/30 rounded p-0.5 mt-0.5">POST /users</div>
                </div>
                <p className="text-[8px] text-relief mt-1">✓ API docs</p>
            </div>
            <div className="text-center opacity-50">
                <div className="w-16 h-12 bg-friction/20 border border-friction/50 rounded p-1 flex items-center justify-center">
                    <span className="text-[6px] text-friction">Contact sales</span>
                </div>
                <p className="text-[8px] text-friction mt-1">✗ Hidden</p>
            </div>
        </div>
    ),
};

const PersonaScreen = ({ onContinue, gapsFound }: PersonaScreenProps) => {
    const [stage, setStage] = useState<"intro" | "personas">("intro");
    const [selectedPersona, setSelectedPersona] = useState<string>("rahul");
    const [selectedBehavior, setSelectedBehavior] = useState<string | null>(null);
    const [revealedAssumptions, setRevealedAssumptions] = useState<string[]>([]);

    const currentPersona = PERSONAS.find(p => p.id === selectedPersona)!;
    const currentBehavior = currentPersona.behaviors.find(b => b.id === selectedBehavior);

    // Assumption exercise data
    const ASSUMPTIONS = [
        { id: "device", assumption: "Users browse on desktop", reality: "78% of first-time visitors are on mobile", icon: "💻" },
        { id: "time", assumption: "Users read everything carefully", reality: "Average attention span: 8 seconds", icon: "📖" },
        { id: "trust", assumption: "Users trust our brand", reality: "87% check reviews before buying", icon: "✅" },
    ];

    const allAssumptionsRevealed = revealedAssumptions.length === ASSUMPTIONS.length;

    // Design implications
    const getDesignImplication = (behaviorId: string) => {
        const implications: Record<string, string> = {
            mobile: "Test on phone first. Touch targets 44px min.",
            speed: "Hero with one clear action. No distractions.",
            forms: "Name + Email + Message only. Progressive disclosure.",
            scroll: "Bottom navigation bar. Thumb-friendly zones.",
            compare: "Comparison table with competitors. Feature matrix.",
            trust: "Testimonials near CTA. Client logos in footer.",
            pricing: "Pricing page with tiers. Or 'Request Quote' context.",
            about: "Team photos, founding story, values section.",
            tech: "Integrations page with stack details and logos.",
            docs: "Resources section with downloadable PDFs.",
            security: "Footer badges, dedicated compliance page.",
            api: "Developer portal with interactive API docs."
        };
        return implications[behaviorId] || "Design appropriately.";
    };

    // INTRO STAGE - Comprehensive Persona Education
    if (stage === "intro") {
        return (
            <div className="space-y-6 max-w-3xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-2"
                >
                    <p className="text-sm text-muted-foreground">Before designing anything...</p>
                    <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
                        Understanding User Personas
                    </h2>
                </motion.div>

                {/* Section 1: What is a Persona */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-card border border-border rounded-lg p-4"
                >
                    <p className="text-xs text-primary font-medium uppercase tracking-wide mb-2 flex items-center gap-1">
                        <span>📋</span> What is a Persona?
                    </p>
                    <p className="text-sm text-muted-foreground">
                        A <span className="text-foreground font-medium">persona</span> is a research-based profile of your typical user.
                        It includes their <span className="text-foreground">context</span> (when/where they use your product),
                        <span className="text-foreground"> behaviors</span> (what they do),
                        <span className="text-foreground"> pain points</span> (what frustrates them), and
                        <span className="text-foreground"> goals</span> (what they want to achieve).
                    </p>
                </motion.div>

                {/* Section 2: Interactive Assumptions */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-card border border-border rounded-lg p-4 space-y-3"
                >
                    <p className="text-xs text-primary font-medium uppercase tracking-wide mb-2 flex items-center gap-1">
                        <span>🎯</span> Why Personas Matter — Click to reveal reality
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">
                        Designers often make assumptions. Click each to see the truth.
                    </p>
                    <div className="space-y-2">
                        {ASSUMPTIONS.map((item, i) => {
                            const isRevealed = revealedAssumptions.includes(item.id);
                            return (
                                <div
                                    key={item.id}
                                    onClick={() => !isRevealed && setRevealedAssumptions(prev => [...prev, item.id])}
                                    className={`p-3 rounded-lg border cursor-pointer transition-all ${isRevealed ? "bg-friction/5 border-friction/30" : "bg-secondary/20 border-transparent hover:border-primary/50"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">{item.icon}</span>
                                        <div className="flex-1">
                                            <p className={`text-sm ${isRevealed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                                                "{item.assumption}"
                                            </p>
                                            {isRevealed && (
                                                <p className="text-sm text-friction mt-1">
                                                    ⚠️ Reality: {item.reality}
                                                </p>
                                            )}
                                        </div>
                                        {!isRevealed && <span className="text-xs text-muted-foreground">click</span>}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Section 3: What happens if we skip (appears after assumptions revealed) */}
                {allAssumptionsRevealed && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-friction/5 border border-friction/20 rounded-lg p-4"
                    >
                        <p className="text-xs text-friction font-medium uppercase tracking-wide mb-3 flex items-center gap-1">
                            <span>⚠️</span> What Happens If We Skip Persona Research?
                        </p>
                        <div className="grid md:grid-cols-2 gap-3">
                            <div className="space-y-2">
                                <div className="flex items-start gap-2 text-sm">
                                    <span className="text-friction">→</span>
                                    <span className="text-muted-foreground">Design for <span className="text-foreground">"everyone"</span> = design for <span className="text-friction">no one</span></span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <span className="text-friction">→</span>
                                    <span className="text-muted-foreground">Forms, CTAs, layout based on <span className="text-friction">guesses</span></span>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-start gap-2 text-sm">
                                    <span className="text-friction">→</span>
                                    <span className="text-muted-foreground">Users <span className="text-friction">bounce</span> because it doesn't fit them</span>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <span className="text-friction">→</span>
                                    <span className="text-muted-foreground">Expensive <span className="text-friction">redesigns</span> 3 months later</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Section 4: How to do it better (appears after skip consequences) */}
                {allAssumptionsRevealed && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-relief/5 border border-relief/20 rounded-lg p-4"
                    >
                        <p className="text-xs text-relief font-medium uppercase tracking-wide mb-3 flex items-center gap-1">
                            <span>✅</span> How to Do Persona Research Right
                        </p>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div className="text-center">
                                <div className="w-10 h-10 bg-relief/10 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <span className="text-relief font-bold">1</span>
                                </div>
                                <p className="text-sm text-foreground font-medium">Interview</p>
                                <p className="text-xs text-muted-foreground">Talk to 3-5 real customers for 30 min each</p>
                            </div>
                            <div className="text-center">
                                <div className="w-10 h-10 bg-relief/10 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <span className="text-relief font-bold">2</span>
                                </div>
                                <p className="text-sm text-foreground font-medium">Document</p>
                                <p className="text-xs text-muted-foreground">Record context, behaviors, pain points, goals</p>
                            </div>
                            <div className="text-center">
                                <div className="w-10 h-10 bg-relief/10 rounded-full flex items-center justify-center mx-auto mb-2">
                                    <span className="text-relief font-bold">3</span>
                                </div>
                                <p className="text-sm text-foreground font-medium">Reference</p>
                                <p className="text-xs text-muted-foreground">Ask "Would this work for [persona]?" in every decision</p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Section 5: UX Connection (appears after how to do it) */}
                {allAssumptionsRevealed && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-primary/5 border border-primary/20 rounded-lg p-4"
                    >
                        <p className="text-xs text-primary font-medium uppercase tracking-wide mb-2 flex items-center gap-1">
                            <span>🔗</span> The Direct UX Connection
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Remember the <span className="text-friction">friction</span> you experienced in Layer 1?
                            The confusing form, the silent button, the stuck door — <span className="text-foreground">all happened because someone designed without knowing users like you</span>.
                        </p>
                        <p className="text-sm text-foreground font-medium mt-2">
                            Personas prevent friction. They turn "users" into real people with real needs.
                        </p>
                    </motion.div>
                )}

                {/* CTA - appears after all sections */}
                {allAssumptionsRevealed && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-center pt-2"
                    >
                        <button
                            onClick={() => setStage("personas")}
                            className="px-8 py-4 bg-primary text-primary-foreground font-display rounded-md hover:bg-primary/90 transition-colors"
                        >
                            Now Let's Meet the Real Users →
                        </button>
                    </motion.div>
                )}

                {/* Progress indicator */}
                {!allAssumptionsRevealed && (
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                            Click all {ASSUMPTIONS.length} assumptions to continue ({revealedAssumptions.length}/{ASSUMPTIONS.length})
                        </p>
                    </div>
                )}
            </div>
        );
    }

    // MAIN PERSONAS STAGE
    return (
        <div className="space-y-5 max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-2"
            >
                <p className="text-sm text-muted-foreground">
                    The brief has <span className="text-friction">{gapsFound} gaps</span>. These affect real people.
                </p>
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
                    Meet the Real Users
                </h2>
            </motion.div>

            {/* Persona Tabs */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-center gap-2">
                {PERSONAS.map((persona) => (
                    <button
                        key={persona.id}
                        onClick={() => { setSelectedPersona(persona.id); setSelectedBehavior(null); }}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedPersona === persona.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary/30 text-muted-foreground hover:bg-secondary/50"
                            }`}
                    >
                        {persona.name.split(" ")[0]}
                    </button>
                ))}
            </motion.div>

            {/* Persona Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedPersona}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="grid md:grid-cols-2 gap-5"
                >
                    {/* Left: Persona Details */}
                    <div className="bg-card border border-border rounded-xl p-5 space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-primary/20 rounded-full flex items-center justify-center">
                                <span className="text-lg font-bold text-primary">{currentPersona.initials}</span>
                            </div>
                            <div>
                                <h3 className="font-display font-semibold text-foreground">{currentPersona.name}</h3>
                                <p className="text-xs text-muted-foreground">{currentPersona.age} • {currentPersona.role}</p>
                            </div>
                        </div>

                        <div className="text-sm text-muted-foreground bg-secondary/20 rounded-lg p-3">
                            <p className="text-xs uppercase tracking-wide mb-1">Context</p>
                            <p>{currentPersona.context}</p>
                        </div>

                        <div className="border-l-2 border-primary/50 pl-3">
                            <p className="text-sm italic text-foreground">"{currentPersona.quote}"</p>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Pain Points</p>
                            <div className="flex flex-wrap gap-2">
                                {currentPersona.painPoints.map((point, i) => (
                                    <span key={i} className="text-xs px-2 py-1 bg-friction/10 text-friction rounded">{point}</span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Key Behaviors</p>
                            <div className="space-y-2">
                                {currentPersona.behaviors.map((b) => (
                                    <button
                                        key={b.id}
                                        onClick={() => setSelectedBehavior(b.id)}
                                        className={`w-full text-left p-2 rounded-lg border transition-all ${selectedBehavior === b.id ? "bg-primary/10 border-primary/50" : "bg-secondary/10 border-transparent hover:border-border"
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            <span>{b.icon}</span>
                                            <div>
                                                <p className="text-sm font-medium text-foreground">{b.label}</p>
                                                <p className="text-xs text-muted-foreground">{b.detail}</p>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Website Impact */}
                    <div className="bg-secondary/20 border border-border rounded-xl p-5 flex flex-col">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">Website Impact</p>
                        <div className="flex-1 flex items-center justify-center">
                            {currentBehavior ? (
                                <motion.div key={selectedBehavior} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full space-y-4">
                                    {/* Visual Layout Mockup */}
                                    <div className="bg-card rounded-lg p-4 border border-border">
                                        <p className="text-xs text-muted-foreground mb-3 text-center">Good vs Bad Layout</p>
                                        {LayoutMockups[currentBehavior.id] || (
                                            <div className="text-center">
                                                <span className="text-3xl">{currentBehavior.icon}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Impact text */}
                                    <div className="text-center">
                                        <p className="text-foreground font-medium mb-1">{currentBehavior.websiteImpact}</p>
                                        <p className="text-xs text-muted-foreground">For {currentPersona.name.split(" ")[0]}: {currentBehavior.label}</p>
                                    </div>

                                    {/* Design implication */}
                                    <div className="bg-relief/10 border border-relief/20 rounded-lg p-3 text-center">
                                        <p className="text-xs text-relief font-medium mb-1">✅ Design Decision</p>
                                        <p className="text-sm text-foreground">{getDesignImplication(currentBehavior.id)}</p>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="text-center space-y-3">
                                    <div className="w-14 h-14 bg-secondary/50 rounded-xl mx-auto flex items-center justify-center">
                                        <span className="text-2xl">👆</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Click a behavior to see website impact</p>
                                </div>
                            )}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Continue */}
            <div className="text-center space-y-3 pt-2">
                <p className="text-muted-foreground text-sm">You've met {PERSONAS.length} users. Each needs something different.</p>
                <button onClick={onContinue} className="px-8 py-4 bg-secondary text-secondary-foreground font-display rounded-md hover:bg-secondary/80 transition-colors">
                    Continue →
                </button>
            </div>
        </div>
    );
};


// ============================================
// SCREEN 4: PRESSURE (Message sequence + choice)
// ============================================
interface PressureScreenProps {
    onChoice: (didDiscovery: boolean) => void;
}

const MESSAGES = [
    { from: "PM", time: "10:02 AM", text: "Design kickoff is Wednesday." },
    { from: "Client", time: "10:15 AM", text: "Excited to see the first designs!" },
    { from: "PM", time: "10:23 AM", text: "Can we start with what we have, or do we need more discovery?" },
];

const PressureScreen = ({ onChoice }: PressureScreenProps) => {
    const [visibleMessages, setVisibleMessages] = useState(0);
    const [showContext, setShowContext] = useState(false);
    const [showChoice, setShowChoice] = useState(false);

    useEffect(() => {
        if (visibleMessages < MESSAGES.length) {
            const timer = setTimeout(() => setVisibleMessages(prev => prev + 1), 1000);
            return () => clearTimeout(timer);
        } else if (!showContext) {
            // After messages complete, show context
            const timer = setTimeout(() => setShowContext(true), 600);
            return () => clearTimeout(timer);
        }
    }, [visibleMessages, showContext]);

    useEffect(() => {
        if (showContext && !showChoice) {
            // After context appears, show choice
            const timer = setTimeout(() => setShowChoice(true), 800);
            return () => clearTimeout(timer);
        }
    }, [showContext, showChoice]);

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            {/* Header - Shows Immediately */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
            >
                <p className="text-xs text-primary uppercase tracking-wide mb-2">Discovery Phase</p>
                <h2 className="text-xl md:text-2xl font-display font-semibold text-foreground">
                    Meanwhile, in Slack...
                </h2>
            </motion.div>

            {/* Message Thread - Shows First */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card border border-border rounded-xl p-5 space-y-4"
            >
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Team Chat</p>

                {MESSAGES.slice(0, visibleMessages).map((msg, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start gap-3"
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${msg.from === "PM" ? "bg-clarity/20 text-clarity" : "bg-primary/20 text-primary"
                            }`}>
                            {msg.from[0]}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-sm font-medium text-foreground">{msg.from}</span>
                                <span className="text-xs text-muted-foreground">{msg.time}</span>
                            </div>
                            <p className="text-muted-foreground">{msg.text}</p>
                        </div>
                    </motion.div>
                ))}

                {visibleMessages < MESSAGES.length && (
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <div className="flex gap-1">
                            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} className="w-2 h-2 bg-muted-foreground rounded-full" />
                            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-2 h-2 bg-muted-foreground rounded-full" />
                            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-2 h-2 bg-muted-foreground rounded-full" />
                        </div>
                        <span>typing...</span>
                    </div>
                )}
            </motion.div>

            {/* Context - Appears After Messages Complete */}
            {showContext && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-3"
                >
                    <p className="text-xs text-primary uppercase tracking-wide">
                        Discovery Phase
                    </p>
                    <h2 className="text-xl md:text-2xl font-display font-semibold text-foreground">
                        The Decision Point
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                        You've seen the brief gaps. You've met real users like Rahul.
                        Now the team needs to decide: <span className="text-foreground">Do we have enough knowledge to start designing?</span>
                    </p>
                </motion.div>
            )}

            {/* Choice - Appears After Context */}
            {showChoice && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    {/* Question */}
                    <p className="text-center text-foreground font-medium">
                        How will you respond?
                    </p>

                    {/* Choice Cards - Clean & Simple */}
                    <div className="grid md:grid-cols-2 gap-3">
                        {/* Option A: Do Discovery */}
                        <button
                            onClick={() => onChoice(true)}
                            className="group p-4 bg-card border border-border rounded-lg hover:border-relief/50 hover:bg-relief/5 text-left transition-all"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-foreground group-hover:text-relief">
                                    Push back
                                </span>
                                <span className="text-xs px-2 py-0.5 bg-relief/10 text-relief rounded">+3 days</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                "Let's schedule quick user calls first."
                            </p>
                        </button>

                        {/* Option B: Skip Discovery */}
                        <button
                            onClick={() => onChoice(false)}
                            className="group p-4 bg-card border border-border rounded-lg hover:border-friction/50 hover:bg-friction/5 text-left transition-all"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <span className="font-medium text-foreground group-hover:text-friction">
                                    Start designing
                                </span>
                                <span className="text-xs px-2 py-0.5 bg-friction/10 text-friction rounded">Fast</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                "We're ready, let's go with what we have."
                            </p>
                        </button>
                    </div>

                    {/* Simple Footer */}
                    <p className="text-xs text-muted-foreground text-center">
                        This decision shapes everything that follows.
                    </p>
                </motion.div>
            )}
        </div>
    );
};

// ============================================
// SCREEN 5: CONSEQUENCE (Live building with interactivity)
// ============================================
interface ConsequenceScreenProps extends ScreenProps {
    didDiscovery: boolean | null;
}

const ConsequenceScreen = ({ didDiscovery, onContinue }: ConsequenceScreenProps) => {
    // Stages: 1=header, 2=form building, 3=problem revealed, 4=Rahul reacts, 5=fix challenge, 6=lesson
    const [stage, setStage] = useState(0);
    const [buildStep, setBuildStep] = useState(0);
    const [removedFields, setRemovedFields] = useState<string[]>([]);

    const skipFields = [
        { name: "First Name", assumption: "Users want formality" },
        { name: "Last Name", assumption: "We need full names" },
        { name: "Email", assumption: "Standard field" },
        { name: "Phone", assumption: "Backup contact" },
        { name: "Company", assumption: "Qualify leads" },
        { name: "Job Title", assumption: "Useful for sales" },
        { name: "Message", assumption: "Let them explain" },
    ];
    const informedFields = [
        { name: "Name", reason: "Rahul is on mobile - keep it simple" },
        { name: "Contact", reason: "Email or phone - user's choice" },
        { name: "How can we help?", reason: "Get to the point fast" },
    ];

    const fields = didDiscovery ? informedFields : skipFields;

    // Stage 1: Header appears
    useEffect(() => {
        const timer = setTimeout(() => setStage(1), 300);
        return () => clearTimeout(timer);
    }, []);

    // Stage 2: Form builds after header
    useEffect(() => {
        if (stage === 1) {
            const timer = setTimeout(() => setStage(2), 600);
            return () => clearTimeout(timer);
        }
    }, [stage]);

    // Build fields one by one
    useEffect(() => {
        if (stage !== 2) return;
        if (buildStep < fields.length) {
            const timer = setTimeout(() => setBuildStep(prev => prev + 1), 400);
            return () => clearTimeout(timer);
        } else {
            // Form complete, move to next stage
            const timer = setTimeout(() => setStage(3), 800);
            return () => clearTimeout(timer);
        }
    }, [stage, buildStep, fields.length]);

    // Stage 4: Rahul reacts (after problem shown)
    useEffect(() => {
        if (stage === 3 && !didDiscovery) {
            const timer = setTimeout(() => setStage(4), 1500);
            return () => clearTimeout(timer);
        }
    }, [stage, didDiscovery]);

    const handleRemoveField = (fieldName: string) => {
        if (removedFields.includes(fieldName)) return;
        setRemovedFields(prev => [...prev, fieldName]);
    };

    const hasTriedFix = removedFields.length >= 2;

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            {/* Stage 1: Header */}
            {stage >= 1 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-2"
                >
                    <p className={`text-xs uppercase tracking-wide ${didDiscovery ? "text-relief" : "text-friction"}`}>
                        You chose: {didDiscovery ? "Push back for discovery" : "Start designing now"}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
                        Building the Contact Form
                    </h2>
                </motion.div>
            )}

            {/* Stage 2+: Form Building */}
            {stage >= 2 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`bg-card border-2 rounded-xl overflow-hidden ${didDiscovery ? "border-relief/50" : "border-friction/50"}`}
                >
                    {/* Browser bar */}
                    <div className="bg-secondary/50 px-4 py-2 border-b border-border flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-friction/50" />
                            <div className="w-3 h-3 rounded-full bg-clarity/50" />
                            <div className="w-3 h-3 rounded-full bg-relief/50" />
                        </div>
                        <div className="flex-1 text-center">
                            <span className="text-xs text-muted-foreground">techstartup.io/contact</span>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="p-6 space-y-2">
                        <p className="text-lg font-medium text-foreground mb-4">Get a Quote</p>

                        {fields.slice(0, buildStep).map((field, i) => {
                            const isRemoved = removedFields.includes(field.name);
                            return (
                                <motion.div
                                    key={field.name}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{
                                        opacity: isRemoved ? 0.3 : 1,
                                        x: 0,
                                        height: isRemoved ? 0 : "auto",
                                        marginBottom: isRemoved ? 0 : undefined
                                    }}
                                    className={`${stage === 5 && !didDiscovery ? "cursor-pointer" : ""} overflow-hidden`}
                                    onClick={() => stage === 5 && !didDiscovery && !isRemoved && handleRemoveField(field.name)}
                                >
                                    <div className="flex items-center gap-3 py-1">
                                        <div className={`flex-1 h-10 rounded border flex items-center justify-between px-3 transition-all ${didDiscovery
                                            ? "bg-relief/10 border-relief/30"
                                            : "bg-secondary/30 border-border"
                                            }`}>
                                            <span className="text-sm text-muted-foreground">{field.name}</span>
                                            {/* Show assumption/reason tag */}
                                            <span className={`text-[10px] px-2 py-0.5 rounded ${didDiscovery
                                                ? "bg-relief/20 text-relief"
                                                : "bg-friction/20 text-friction"
                                                }`}>
                                                {didDiscovery ? (field as any).reason?.split(' - ')[0] : `? ${(field as any).assumption}`}
                                            </span>
                                        </div>
                                        {stage === 5 && !didDiscovery && !isRemoved && (
                                            <motion.button
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                whileHover={{ scale: 1.1 }}
                                                className="w-8 h-8 rounded-full bg-friction/20 text-friction flex items-center justify-center hover:bg-friction/30"
                                            >
                                                ✕
                                            </motion.button>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}

                        {buildStep >= fields.length && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-3">
                                <div className={`h-12 rounded flex items-center justify-center ${didDiscovery ? "bg-relief" : "bg-primary"}`}>
                                    <span className="text-primary-foreground font-medium">Submit</span>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            )}

            {/* Stage 3: Problem Revealed (wrong choice) */}
            {stage >= 3 && !didDiscovery && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-friction/10 border border-friction/30 rounded-lg p-4 space-y-3"
                >
                    <p className="text-friction font-medium text-center">
                        7 fields. All based on assumptions.
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {skipFields.map(f => (
                            <span key={f.name} className="text-xs bg-friction/20 text-friction px-2 py-1 rounded">
                                {f.name}: "{f.assumption}"
                            </span>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Stage 4: Rahul Reacts (wrong choice) */}
            {stage >= 4 && !didDiscovery && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-card border border-border rounded-lg p-5 space-y-4"
                >
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-friction/20 flex items-center justify-center text-2xl flex-shrink-0">
                            😓
                        </div>
                        <div>
                            <p className="font-medium text-foreground">Rahul opens the form on his phone...</p>
                            <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                                    → Sees 7 fields
                                </motion.p>
                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                                    → Scrolls down... more fields
                                </motion.p>
                                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="text-friction">
                                    → "I'll do this later" <span className="text-friction font-medium">(closes tab)</span>
                                </motion.p>
                            </div>
                        </div>
                    </div>

                    {stage === 4 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="text-center pt-2"
                        >
                            <button
                                onClick={onContinue}
                                className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                            >
                                What could have been different? →
                            </button>
                        </motion.div>
                    )}
                </motion.div>
            )}

            {/* Success Path (right choice) - with context explanation */}
            {stage >= 3 && didDiscovery && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                >
                    {/* Context: Why this worked */}
                    <div className="bg-relief/5 border border-relief/20 rounded-xl p-5 space-y-4">
                        <p className="text-sm text-relief font-medium text-center uppercase tracking-wide">
                            Why This Form Works
                        </p>
                        <div className="grid md:grid-cols-3 gap-3">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-secondary/30 rounded-lg p-3 text-center"
                            >
                                <p className="text-lg font-bold text-foreground">Discovery</p>
                                <p className="text-xs text-muted-foreground mt-1">You learned about Rahul</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-secondary/30 rounded-lg p-3 text-center"
                            >
                                <p className="text-lg font-bold text-foreground">His Constraints</p>
                                <p className="text-xs text-muted-foreground mt-1">Mobile, 60 seconds, hates forms</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="bg-relief/20 rounded-lg p-3 text-center border border-relief/30"
                            >
                                <p className="text-lg font-bold text-relief">Your Decision</p>
                                <p className="text-xs text-muted-foreground mt-1">3 fields, mobile-first</p>
                            </motion.div>
                        </div>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="text-sm text-center text-muted-foreground"
                        >
                            Every field exists because you understood the user, not because of assumptions.
                        </motion.p>
                    </div>

                    {/* Results */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="bg-relief/10 border border-relief/30 rounded-lg p-5 space-y-4"
                    >
                        <p className="text-relief font-display font-semibold text-lg text-center">
                            The Result
                        </p>
                        <div className="grid grid-cols-3 gap-4 text-center">
                            <div>
                                <p className="text-2xl font-bold text-foreground">3</p>
                                <p className="text-xs text-muted-foreground">fields</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-relief">45s</p>
                                <p className="text-xs text-muted-foreground">to complete</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-relief">85%</p>
                                <p className="text-xs text-muted-foreground">completion</p>
                            </div>
                        </div>
                        <p className="text-sm text-center text-muted-foreground">
                            Rahul fills it out on his commute. Lead captured.
                        </p>
                    </motion.div>
                </motion.div>
            )}

            {/* Continue Button (success path only) */}
            {didDiscovery && stage >= 3 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                >
                    <button
                        onClick={onContinue}
                        className="px-8 py-4 bg-secondary text-secondary-foreground font-display rounded-md hover:bg-secondary/80 transition-colors"
                    >
                        Continue →
                    </button>
                </motion.div>
            )}
        </div>
    );
};

// ============================================
// SCREEN 5B: COMPARISON (What could have been - for wrong choice only)
// ============================================
interface ComparisonScreenProps extends ScreenProps {
    didDiscovery: boolean | null;
}

const ComparisonScreen = ({ didDiscovery, onContinue }: ComparisonScreenProps) => {
    const [stage, setStage] = useState(0);

    const informedFields = [
        { name: "Name", reason: "Rahul is on mobile - keep it simple" },
        { name: "Contact", reason: "Email or phone - user's choice" },
        { name: "How can we help?", reason: "Get to the point fast" },
    ];

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 300),
            setTimeout(() => setStage(2), 800),
            setTimeout(() => setStage(3), 1500),
        ];
        return () => timers.forEach(t => clearTimeout(t));
    }, []);

    // If user did discovery, skip this screen (shouldn't really happen but just in case)
    if (didDiscovery) {
        return (
            <div className="text-center">
                <button onClick={onContinue} className="px-8 py-4 bg-primary text-primary-foreground rounded-lg">
                    Continue →
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            {/* Header */}
            {stage >= 1 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-2"
                >
                    <p className="text-xs text-relief uppercase tracking-wide">With Discovery</p>
                    <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
                        Here's what you could have built
                    </h2>
                </motion.div>
            )}

            {/* The Fixed Form */}
            {stage >= 2 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-card border-2 border-relief/50 rounded-xl overflow-hidden"
                >
                    <div className="bg-secondary/50 px-4 py-2 border-b border-border flex items-center gap-2">
                        <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-friction/50" />
                            <div className="w-3 h-3 rounded-full bg-clarity/50" />
                            <div className="w-3 h-3 rounded-full bg-relief/50" />
                        </div>
                        <div className="flex-1 text-center">
                            <span className="text-xs text-muted-foreground">techstartup.io/contact</span>
                        </div>
                    </div>
                    <div className="p-6 space-y-2">
                        <p className="text-lg font-medium text-foreground mb-4">Get a Quote</p>
                        {informedFields.map((field, i) => (
                            <motion.div
                                key={field.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.2 }}
                                className="flex items-center gap-3 py-1"
                            >
                                <div className="flex-1 h-10 rounded border border-relief/30 bg-relief/10 flex items-center justify-between px-3">
                                    <span className="text-sm text-muted-foreground">{field.name}</span>
                                    <span className="text-[10px] px-2 py-0.5 rounded bg-relief/20 text-relief">
                                        ✓ Informed
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="pt-3"
                        >
                            <div className="h-12 rounded bg-relief flex items-center justify-center">
                                <span className="text-white font-medium">Submit</span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}

            {/* Comparison Stats */}
            {stage >= 3 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-friction/10 border border-friction/30 rounded-lg p-4 text-center">
                            <p className="text-xs text-friction uppercase tracking-wide mb-2">You Built</p>
                            <p className="text-2xl font-bold text-foreground">7 fields</p>
                            <p className="text-sm text-friction">60% abandon</p>
                        </div>
                        <div className="bg-relief/10 border border-relief/30 rounded-lg p-4 text-center">
                            <p className="text-xs text-relief uppercase tracking-wide mb-2">Could Have Built</p>
                            <p className="text-2xl font-bold text-foreground">3 fields</p>
                            <p className="text-sm text-relief">85% complete</p>
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-lg p-4 text-center">
                        <p className="text-sm text-muted-foreground">
                            One 30-minute call with Rahul would have told you:
                            <span className="text-foreground block mt-1 font-medium">
                                "Mobile-first, 60 seconds max, hates long forms."
                            </span>
                        </p>
                    </div>

                    <div className="text-center">
                        <button
                            onClick={onContinue}
                            className="px-8 py-4 bg-secondary text-secondary-foreground font-display rounded-md hover:bg-secondary/80 transition-colors"
                        >
                            Why does this happen? →
                        </button>
                    </div>
                </motion.div>
            )}
        </div>
    );
};

// ============================================
// SCREEN 7: ROOT CAUSE (Why discovery is skipped - Visual & Interactive)
// ============================================
interface RootCauseScreenProps extends ScreenProps {
    didDiscovery: boolean | null;
}

const ROOT_CAUSES = [
    {
        id: "know",
        emoji: "🧠",
        excuse: "We already know our users",
        reality: "Every project brings new context. Past experience ≠ current reality.",
        cost: "Assumed desktop → Built for wrong device",
        fix: "30-min call reveals: 78% are on mobile"
    },
    {
        id: "time",
        emoji: "⏰",
        excuse: "We don't have time",
        reality: "Building wrong takes 10x longer than asking right.",
        cost: "3 days saved → 3 weeks fixing later",
        fix: "3 days for research → Ship once, correctly"
    },
    {
        id: "pro",
        emoji: "👔",
        excuse: "Asking looks unprofessional",
        reality: "Guessing breaks trust. Questions build it.",
        cost: "Fast delivery → Client unhappy when users bounce",
        fix: "Thorough process → Client delighted with results"
    },
];

const RootCauseScreen = ({ onContinue, didDiscovery }: RootCauseScreenProps) => {
    const [stage, setStage] = useState(0);
    const [revealedExcuses, setRevealedExcuses] = useState<string[]>([]);
    const [debtLevel, setDebtLevel] = useState(0);

    // Progressive stages
    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 300),
            setTimeout(() => setStage(2), 1000),
            setTimeout(() => setStage(3), 1800),
        ];
        return () => timers.forEach(t => clearTimeout(t));
    }, []);

    const handleRevealExcuse = (id: string) => {
        if (!revealedExcuses.includes(id)) {
            setRevealedExcuses(prev => [...prev, id]);
            setDebtLevel(prev => Math.min(prev + 33, 100));
        }
    };

    const allRevealed = revealedExcuses.length >= 3;

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            {/* Stage 1: Header with Visual Hook */}
            {stage >= 1 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-3"
                >
                    <p className={`text-xs uppercase tracking-wide ${didDiscovery ? "text-relief" : "text-friction"}`}>
                        {didDiscovery ? "You avoided the trap" : "You fell into a common trap"}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
                        Why Does This Keep Happening?
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                        Smart designers skip discovery for reasons that feel valid in the moment.
                    </p>
                </motion.div>
            )}

            {/* Stage 2: The Debt Meter */}
            {stage >= 2 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-card border border-border rounded-xl p-5 space-y-4"
                >
                    <div className="text-center">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                            UX Debt Accumulator
                        </p>
                        <div className="relative h-4 bg-secondary/30 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${debtLevel}%` }}
                                className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${debtLevel < 50 ? "bg-clarity" : debtLevel < 80 ? "bg-friction/70" : "bg-friction"
                                    }`}
                            />
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            {debtLevel === 0 && "Click each excuse below to see how debt builds"}
                            {debtLevel > 0 && debtLevel < 100 && `${debtLevel}% of the way to a failed project`}
                            {debtLevel >= 100 && "🚨 Maximum debt reached — project at risk"}
                        </p>
                    </div>
                </motion.div>
            )}

            {/* Stage 3: Interactive Excuses */}
            {stage >= 3 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-3"
                >
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                        Tap each excuse to reveal the truth
                    </p>

                    {ROOT_CAUSES.map((cause, i) => {
                        const isRevealed = revealedExcuses.includes(cause.id);
                        return (
                            <motion.div
                                key={cause.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.15 }}
                                onClick={() => handleRevealExcuse(cause.id)}
                                className={`rounded-xl overflow-hidden cursor-pointer transition-all border-2 ${isRevealed
                                    ? "border-friction/50 bg-friction/5"
                                    : "border-border bg-card hover:border-primary/50"
                                    }`}
                            >
                                {/* Excuse Header */}
                                <div className="flex items-center gap-4 p-4">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${isRevealed ? "bg-friction/20" : "bg-secondary/50"
                                        }`}>
                                        {cause.emoji}
                                    </div>
                                    <div className="flex-1">
                                        <p className={`font-medium transition-colors ${isRevealed ? "text-friction" : "text-foreground"}`}>
                                            "{cause.excuse}"
                                        </p>
                                        {!isRevealed && (
                                            <p className="text-xs text-muted-foreground">Click to reveal the cost</p>
                                        )}
                                    </div>
                                    {!isRevealed && (
                                        <div className="text-2xl">👆</div>
                                    )}
                                </div>

                                {/* Revealed Content */}
                                {isRevealed && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        className="border-t border-friction/30 p-4 space-y-3"
                                    >
                                        {/* The Reality */}
                                        <div className="flex items-start gap-3">
                                            <span className="text-lg">💡</span>
                                            <div>
                                                <p className="text-xs text-friction uppercase tracking-wide">The Reality</p>
                                                <p className="text-sm text-foreground">{cause.reality}</p>
                                            </div>
                                        </div>

                                        {/* Cost vs Fix - Visual Comparison */}
                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="bg-friction/10 rounded-lg p-3 text-center">
                                                <p className="text-lg mb-1">❌</p>
                                                <p className="text-xs text-friction">{cause.cost}</p>
                                            </div>
                                            <div className="bg-relief/10 rounded-lg p-3 text-center">
                                                <p className="text-lg mb-1">✅</p>
                                                <p className="text-xs text-relief">{cause.fix}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}

            {/* After All Revealed: The Pattern */}
            {allRevealed && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-primary/10 border border-primary/30 rounded-xl p-5 space-y-4"
                >
                    <div className="text-center space-y-2">
                        <p className="text-xl">🎯</p>
                        <p className="text-lg font-display font-semibold text-foreground">
                            The Pattern You Just Discovered
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Every excuse follows the same formula:
                        </p>
                    </div>

                    {/* Visual Pattern */}
                    <div className="flex items-center justify-center gap-3 text-sm flex-wrap">
                        <div className="px-3 py-2 bg-secondary/30 rounded">
                            Short-term comfort
                        </div>
                        <span className="text-lg">→</span>
                        <div className="px-3 py-2 bg-friction/20 text-friction rounded border border-friction/30">
                            Long-term pain
                        </div>
                    </div>

                    <div className="bg-relief/10 border border-relief/30 rounded-lg p-3 text-center">
                        <p className="text-sm text-relief">
                            <span className="font-medium">Discovery inverts this:</span> Short-term investment → Long-term success
                        </p>
                    </div>
                </motion.div>
            )}

            {/* Continue Button */}
            {allRevealed && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                >
                    <button
                        onClick={onContinue}
                        className="px-8 py-4 bg-secondary text-secondary-foreground font-display rounded-md hover:bg-secondary/80 transition-colors"
                    >
                        The Core Principle →
                    </button>
                </motion.div>
            )}
        </div>
    );
};

// ============================================
// SCREEN 8: PRINCIPLE (Visual Website Building - Simplified)
// ============================================
interface PrincipleScreenProps {
    didDiscovery: boolean | null;
    onContinue: () => void;
}

const WEBSITE_PHASES = [
    { id: "discovery", name: "Discovery", progress: "Understanding Rahul" },
    { id: "requirements", name: "Requirements", progress: "Form fields defined" },
    { id: "design", name: "Design", progress: "Mobile-first layout" },
    { id: "build", name: "Build", progress: "Form component built" },
    { id: "launch", name: "Launch", progress: "Live for users" },
];

const PrincipleScreen = ({ didDiscovery, onContinue }: PrincipleScreenProps) => {
    const [stage, setStage] = useState(0);
    const [buildPhase, setBuildPhase] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 300),
            setTimeout(() => setStage(2), 1000),
        ];
        return () => timers.forEach(t => clearTimeout(t));
    }, []);

    useEffect(() => {
        if (stage < 2) return;
        if (buildPhase < WEBSITE_PHASES.length) {
            const timer = setTimeout(() => setBuildPhase(prev => prev + 1), 500);
            return () => clearTimeout(timer);
        }
    }, [stage, buildPhase]);

    const websiteComplete = buildPhase >= WEBSITE_PHASES.length;

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            {/* Stage 1: Header */}
            {stage >= 1 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-2"
                >
                    <p className={`text-xs uppercase tracking-wide ${didDiscovery ? "text-relief" : "text-friction"}`}>
                        {didDiscovery ? "You broke the pattern" : "You experienced the pattern"}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
                        Watch Your Decision Shape the Product
                    </h2>
                </motion.div>
            )}

            {/* Stage 2: Visual Website Building */}
            {stage >= 2 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                >
                    {/* Phase Progress Bar */}
                    <div className="bg-card border border-border rounded-lg p-4">
                        <div className="flex items-center gap-1 mb-3">
                            {WEBSITE_PHASES.map((phase, i) => (
                                <motion.div
                                    key={phase.id}
                                    initial={{ scale: 0.8, opacity: 0.5 }}
                                    animate={{
                                        scale: i < buildPhase ? 1 : 0.8,
                                        opacity: i < buildPhase ? 1 : 0.5
                                    }}
                                    className={`flex-1 h-3 rounded-full transition-all ${i < buildPhase
                                        ? (didDiscovery ? "bg-relief" : i === 0 ? "bg-friction" : "bg-friction/50")
                                        : "bg-secondary/30"
                                        }`}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between text-[10px] text-muted-foreground">
                            {WEBSITE_PHASES.map((phase, i) => (
                                <span key={phase.id} className={i < buildPhase ? "text-foreground font-medium" : ""}>
                                    {phase.name}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Website Preview */}
                    <div className="bg-card border-2 border-border rounded-xl overflow-hidden">
                        <div className="bg-secondary/30 px-3 py-2 flex items-center gap-2 border-b border-border">
                            <div className="flex gap-1.5">
                                <div className="w-2.5 h-2.5 rounded-full bg-friction/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-clarity/50" />
                                <div className="w-2.5 h-2.5 rounded-full bg-relief/50" />
                            </div>
                            <div className="flex-1 bg-secondary/50 rounded text-xs text-muted-foreground px-2 py-1 text-center">
                                techstartup.com/get-quote
                            </div>
                        </div>

                        <div className="p-4 min-h-[180px]">
                            {buildPhase >= 1 && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-4">
                                    <p className={`text-xs font-medium ${didDiscovery ? "text-relief" : "text-friction"}`}>
                                        {didDiscovery ? "✓ Rahul: Mobile, 60s, hates long forms" : "⚠ No user data. Assuming desktop."}
                                    </p>
                                </motion.div>
                            )}

                            {buildPhase >= 2 && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center">
                                    <div className={`p-4 rounded-lg border w-52 ${didDiscovery ? "bg-relief/5 border-relief/30" : "bg-friction/5 border-friction/30"}`}>
                                        <p className="text-sm font-medium text-foreground text-center mb-2">Get a Quote</p>
                                        <div className="space-y-1.5">
                                            {didDiscovery ? (
                                                <>
                                                    {buildPhase >= 3 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-relief/10 border border-relief/20 rounded px-2 py-1 text-[10px]">Name</motion.div>}
                                                    {buildPhase >= 4 && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-relief/10 border border-relief/20 rounded px-2 py-1 text-[10px]">Contact</motion.div>}
                                                    {buildPhase >= 5 && (
                                                        <>
                                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-relief/10 border border-relief/20 rounded px-2 py-1 text-[10px]">How can we help?</motion.div>
                                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="bg-relief text-white rounded px-2 py-1.5 text-[10px] text-center font-medium">Submit</motion.div>
                                                        </>
                                                    )}
                                                </>
                                            ) : (
                                                <>
                                                    {buildPhase >= 3 && ["First Name", "Last Name"].map((f, i) => <motion.div key={f} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }} className="bg-secondary/30 border border-border rounded px-2 py-0.5 text-[9px]">{f}</motion.div>)}
                                                    {buildPhase >= 4 && ["Email", "Phone", "Company"].map((f, i) => <motion.div key={f} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }} className="bg-secondary/30 border border-border rounded px-2 py-0.5 text-[9px]">{f}</motion.div>)}
                                                    {buildPhase >= 5 && (
                                                        <>
                                                            {["Job Title", "Message"].map((f, i) => <motion.div key={f} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }} className="bg-secondary/30 border border-border rounded px-2 py-0.5 text-[9px]">{f}</motion.div>)}
                                                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="bg-friction text-white rounded px-2 py-1 text-[9px] text-center font-medium">Submit</motion.div>
                                                        </>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Result */}
                    {websiteComplete && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`rounded-lg p-4 text-center ${didDiscovery ? "bg-relief/10 border border-relief/30" : "bg-friction/10 border border-friction/30"}`}
                        >
                            {didDiscovery ? (
                                <p className="text-relief font-medium">🎉 3 fields → 45 seconds → 85% completion</p>
                            ) : (
                                <p className="text-friction font-medium">😓 7 fields → 3+ minutes → 60% abandon</p>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            )}

            {/* Continue Button */}
            {websiteComplete && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                >
                    <button
                        onClick={onContinue}
                        className="px-8 py-4 bg-secondary text-secondary-foreground font-display rounded-md hover:bg-secondary/80 transition-colors"
                    >
                        What did we learn? →
                    </button>
                </motion.div>
            )}
        </div>
    );
};

// ============================================
// SCREEN 9: DISCOVERY INCLUDES MORE (Puzzle Visualization)
// ============================================

// Discovery activities data for puzzle
const DISCOVERY_ACTIVITIES = [
    {
        id: "user-research",
        name: "User Research",
        icon: "👤",
        completed: true,
        what: "Understanding who your users are, their needs, pain points, and goals through interviews, surveys, and observation.",
        causeSkip: "Design based on assumptions → Build wrong features → Users abandon",
        causeDo: "Design based on reality → Build right features → Users succeed",
        uxImpact: "Every assumption without validation is potential friction for real users.",
        example: "You learned Rahul is mobile, has 60 seconds, hates forms → Built 3-field form instead of 7"
    },
    {
        id: "stakeholder",
        name: "Stakeholder Interviews",
        icon: "🤝",
        completed: false,
        what: "Talking to business stakeholders to understand goals, constraints, priorities, and success metrics.",
        causeSkip: "Build features client didn't actually want → Misaligned product → Wasted effort",
        causeDo: "Align with business goals → Clear priorities → Efficient development",
        uxImpact: "If you don't understand why the product exists, you might optimize for the wrong outcomes.",
        example: "Client says 'We want more leads' → Now you know the contact form is the priority"
    },
    {
        id: "competitive",
        name: "Competitive Analysis",
        icon: "🔍",
        completed: false,
        what: "Researching what competitors do well and poorly to learn from their successes and avoid their mistakes.",
        causeSkip: "Repeat industry mistakes → Miss obvious improvements → Users compare unfavorably",
        causeDo: "Learn from market → Innovate on proven patterns → Users feel familiar yet impressed",
        uxImpact: "Users have expectations from other products. Meeting or exceeding them is part of good UX.",
        example: "Competitor X has a 3-field form with 90% completion → Validates our approach"
    },
    {
        id: "technical",
        name: "Technical Discovery",
        icon: "⚙️",
        completed: false,
        what: "Understanding existing systems, tech constraints, and infrastructure before designing solutions.",
        causeSkip: "Design impossible features → Hit blockers mid-build → Scope changes → User disappointment",
        causeDo: "Know constraints upfront → Design feasible solutions → Smooth delivery",
        uxImpact: "Features that can't be built properly create bugs, workarounds, and poor experiences.",
        example: "CRM only supports 3 custom fields → Form design must work within this limit"
    }
];

interface DiscoveryMoreScreenProps {
    onContinue: () => void;
}

const DiscoveryMoreScreen = ({ onContinue }: DiscoveryMoreScreenProps) => {
    const [stage, setStage] = useState(0);
    const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
    const [exploredActivities, setExploredActivities] = useState<string[]>(["user-research"]);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 300),
            setTimeout(() => setStage(2), 1000),
        ];
        return () => timers.forEach(t => clearTimeout(t));
    }, []);

    const handleExploreActivity = (id: string) => {
        setSelectedActivity(id);
        if (!exploredActivities.includes(id)) {
            setExploredActivities(prev => [...prev, id]);
        }
    };

    const allExplored = exploredActivities.length >= DISCOVERY_ACTIVITIES.length;

    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            {/* Header */}
            {stage >= 1 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-3"
                >
                    <p className="text-xs text-primary uppercase tracking-wide">Before we move on...</p>
                    <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
                        Discovery Includes More
                    </h2>
                    <p className="text-muted-foreground">
                        You explored <span className="text-primary font-medium">User Research</span> with Rahul.
                        <br />But Discovery is a puzzle with more pieces.
                    </p>
                </motion.div>
            )}

            {/* Puzzle Grid */}
            {stage >= 2 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                >
                    <div className="grid grid-cols-2 gap-4 max-w-xl mx-auto">
                        {DISCOVERY_ACTIVITIES.map((activity, i) => {
                            const isExplored = exploredActivities.includes(activity.id);
                            const isCompleted = activity.completed;
                            return (
                                <motion.button
                                    key={activity.id}
                                    initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        rotate: 0,
                                    }}
                                    transition={{
                                        delay: i * 0.15,
                                        type: "spring",
                                        stiffness: 200
                                    }}
                                    whileHover={{
                                        scale: 1.05,
                                        rotate: isCompleted ? 0 : 2,
                                        transition: { duration: 0.2 }
                                    }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleExploreActivity(activity.id)}
                                    className={`relative aspect-square p-5 rounded-2xl text-left transition-all overflow-hidden group ${isCompleted
                                        ? "bg-gradient-to-br from-primary/20 to-primary/5 border-2 border-primary/50 shadow-lg shadow-primary/20"
                                        : isExplored
                                            ? "bg-gradient-to-br from-secondary/60 to-secondary/30 border-2 border-border"
                                            : "bg-gradient-to-br from-card to-secondary/20 border-2 border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10"
                                        }`}
                                >
                                    {/* Animated glow for completed */}
                                    {isCompleted && (
                                        <motion.div
                                            className="absolute inset-0 bg-primary/10"
                                            animate={{ opacity: [0.3, 0.6, 0.3] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                    )}

                                    {/* Content */}
                                    <div className="relative h-full flex flex-col justify-between">
                                        <motion.span
                                            className="text-4xl"
                                            animate={isCompleted ? {
                                                scale: [1, 1.1, 1],
                                            } : {}}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            {activity.icon}
                                        </motion.span>

                                        <div>
                                            <p className={`text-sm font-semibold ${isCompleted ? "text-primary" : "text-foreground"
                                                }`}>
                                                {activity.name}
                                            </p>
                                            <p className="text-xs text-muted-foreground mt-1">
                                                {isCompleted
                                                    ? "✓ You explored this"
                                                    : isExplored
                                                        ? "✓ Learned"
                                                        : "Click to explore →"
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    {/* Hover shine effect */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100"
                                        animate={{ x: ["-100%", "100%"] }}
                                        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
                                    />
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Progress indicator */}
                    <div className="text-center space-y-3">
                        <div className="flex justify-center gap-2">
                            {DISCOVERY_ACTIVITIES.map((activity) => (
                                <motion.div
                                    key={activity.id}
                                    className={`w-2 h-2 rounded-full transition-colors ${exploredActivities.includes(activity.id)
                                        ? activity.completed ? "bg-primary" : "bg-relief"
                                        : "bg-secondary"
                                        }`}
                                    animate={exploredActivities.includes(activity.id) ? { scale: [1, 1.3, 1] } : {}}
                                    transition={{ duration: 0.3 }}
                                />
                            ))}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {allExplored
                                ? "All pieces explored! You understand the full Discovery process."
                                : `${exploredActivities.length} of ${DISCOVERY_ACTIVITIES.length} explored`
                            }
                        </p>
                    </div>

                    {/* Continue button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-center pt-4"
                    >
                        <button
                            onClick={onContinue}
                            className={`px-8 py-4 font-display text-lg rounded-md transition-all ${allExplored
                                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                                }`}
                        >
                            {allExplored ? "Continue to Key Takeaways →" : "Skip for now →"}
                        </button>
                        {!allExplored && (
                            <p className="text-xs text-muted-foreground mt-2">
                                Explore all pieces to understand the full picture
                            </p>
                        )}
                    </motion.div>
                </motion.div>
            )}

            {/* Activity Modal */}
            <AnimatePresence>
                {selectedActivity && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedActivity(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.8, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-card border border-border rounded-2xl max-w-lg w-full max-h-[85vh] overflow-y-auto shadow-2xl"
                        >
                            {(() => {
                                const activity = DISCOVERY_ACTIVITIES.find(a => a.id === selectedActivity);
                                if (!activity) return null;
                                return (
                                    <div className="p-6 space-y-5">
                                        {/* Header */}
                                        <div className="flex items-center gap-4">
                                            <motion.div
                                                className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl ${activity.completed
                                                    ? "bg-primary/20"
                                                    : "bg-secondary/50"
                                                    }`}
                                                animate={activity.completed ? { scale: [1, 1.05, 1] } : {}}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                {activity.icon}
                                            </motion.div>
                                            <div>
                                                <h3 className="text-xl font-display font-semibold text-foreground">
                                                    {activity.name}
                                                </h3>
                                                {activity.completed && (
                                                    <p className="text-sm text-primary">✓ You explored this with Rahul</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* What is it */}
                                        <div className="space-y-2">
                                            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">What is it?</p>
                                            <p className="text-foreground">{activity.what}</p>
                                        </div>

                                        {/* Cause & Effect */}
                                        <div className="grid grid-cols-1 gap-3">
                                            <motion.div
                                                className="bg-friction/10 border border-friction/30 rounded-xl p-4"
                                                initial={{ x: -10, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.1 }}
                                            >
                                                <p className="text-sm text-friction font-medium mb-2">❌ If you skip it:</p>
                                                <p className="text-sm text-muted-foreground">{activity.causeSkip}</p>
                                            </motion.div>
                                            <motion.div
                                                className="bg-relief/10 border border-relief/30 rounded-xl p-4"
                                                initial={{ x: 10, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                <p className="text-sm text-relief font-medium mb-2">✅ If you do it:</p>
                                                <p className="text-sm text-muted-foreground">{activity.causeDo}</p>
                                            </motion.div>
                                        </div>

                                        {/* UX Impact */}
                                        <motion.div
                                            className="bg-primary/5 border border-primary/20 rounded-xl p-4"
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <p className="text-sm text-primary font-medium mb-2">💡 UX Impact:</p>
                                            <p className="text-foreground">{activity.uxImpact}</p>
                                        </motion.div>

                                        {/* Example */}
                                        <motion.div
                                            className="bg-secondary/30 rounded-xl p-4"
                                            initial={{ y: 10, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            <p className="text-sm text-muted-foreground font-medium mb-2">📌 Example:</p>
                                            <p className="text-foreground">{activity.example}</p>
                                        </motion.div>

                                        {/* Close button */}
                                        <motion.button
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setSelectedActivity(null)}
                                            className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                                        >
                                            Got it ✓
                                        </motion.button>
                                    </div>
                                );
                            })()}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

// ============================================
// SCREEN 10: TAKEAWAY (Learnings & Future Application)
// ============================================

interface TakeawayScreenProps {
    didDiscovery: boolean | null;
    onComplete: () => void;
}

const TakeawayScreen = ({ didDiscovery, onComplete }: TakeawayScreenProps) => {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 300),
            setTimeout(() => setStage(2), 1000),
            setTimeout(() => setStage(3), 1800),
            setTimeout(() => setStage(4), 2600),
        ];
        return () => timers.forEach(t => clearTimeout(t));
    }, []);

    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            {/* Stage 1: Header */}
            {stage >= 1 && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center space-y-2"
                >
                    <p className="text-xs text-primary uppercase tracking-wide">Discovery Phase Complete</p>
                    <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
                        Key Takeaways
                    </h2>
                </motion.div>
            )}

            {/* Stage 2: The Core Principle */}
            {stage >= 2 && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-primary/10 border border-primary/30 rounded-xl p-6 text-center space-y-3"
                >
                    <p className="text-xs text-primary uppercase tracking-wide">The Core Principle</p>
                    <p className="text-xl font-display font-semibold text-foreground">
                        "Discovery isn't about the client.
                        <br />It's about the client's <span className="text-primary">users</span>."
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Every gap in research becomes a gap in experience.
                    </p>
                </motion.div>
            )}

            {/* Stage 3: Visual Learnings with Examples */}
            {stage >= 3 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                >
                    <p className="text-xs text-muted-foreground uppercase tracking-wide text-center">What You Experienced</p>

                    {/* Learning 1: Form Comparison Visual */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card border border-border rounded-xl p-4"
                    >
                        <p className="text-sm font-medium text-foreground mb-3 text-center">Without research vs With research</p>
                        <div className="flex gap-4 justify-center items-start">
                            {/* Bad form */}
                            <div className="flex-1 max-w-[140px]">
                                <div className="bg-friction/10 border border-friction/30 rounded-lg p-3 space-y-1.5">
                                    <p className="text-[9px] text-friction font-medium text-center mb-2">Assumptions 😰</p>
                                    {["First Name", "Last Name", "Email", "Phone", "Company", "Job Title", "Message"].map((f, i) => (
                                        <div key={f} className={`bg-friction/20 border border-friction/20 rounded px-2 py-0.5 text-[8px] text-muted-foreground ${i > 3 ? "opacity-50" : ""}`}>
                                            {f} {i === 3 && <span className="text-friction">← Rahul exits</span>}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[10px] text-friction text-center mt-2">60% abandon</p>
                            </div>

                            {/* Arrow */}
                            <div className="flex items-center justify-center pt-10 text-muted-foreground">→</div>

                            {/* Good form */}
                            <div className="flex-1 max-w-[140px]">
                                <div className="bg-relief/10 border border-relief/30 rounded-lg p-3 space-y-1.5">
                                    <p className="text-[9px] text-relief font-medium text-center mb-2">With Discovery ✓</p>
                                    {["Name", "Contact", "How can we help?"].map(f => (
                                        <div key={f} className="bg-relief/20 border border-relief/20 rounded px-2 py-1 text-[8px] text-muted-foreground">{f}</div>
                                    ))}
                                    <div className="bg-relief text-white rounded px-2 py-1 text-[8px] text-center font-medium">Submit</div>
                                </div>
                                <p className="text-[10px] text-relief text-center mt-2">85% complete</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Learning 2: Rahul's Journey Visual */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-card border border-border rounded-xl p-4"
                    >
                        <p className="text-sm font-medium text-foreground mb-3 text-center">Rahul's Journey</p>
                        <div className="flex items-center justify-center gap-2 text-xs">
                            <div className="flex items-center gap-1 bg-secondary/40 rounded-lg px-3 py-2">
                                <span>📱</span>
                                <span className="text-muted-foreground">Mobile</span>
                            </div>
                            <span className="text-muted-foreground">→</span>
                            <div className="flex items-center gap-1 bg-secondary/40 rounded-lg px-3 py-2">
                                <span>⏱️</span>
                                <span className="text-muted-foreground">60 seconds</span>
                            </div>
                            <span className="text-muted-foreground">→</span>
                            <div className={`flex items-center gap-1 rounded-lg px-3 py-2 ${didDiscovery ? "bg-relief/20 text-relief" : "bg-friction/20 text-friction"}`}>
                                <span>{didDiscovery ? "✓" : "✗"}</span>
                                <span>{didDiscovery ? "Submitted" : "Abandoned"}</span>
                            </div>
                        </div>
                        <p className="text-[10px] text-center text-muted-foreground mt-2">
                            {didDiscovery ? "You knew his constraints. You designed for them." : "You didn't know. He left."}
                        </p>
                    </motion.div>

                    {/* Learning 3: Time Cost Visual */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-card border border-border rounded-xl p-4"
                    >
                        <p className="text-sm font-medium text-foreground mb-3 text-center">The Time Trade-off</p>
                        <div className="flex justify-center gap-6">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-relief/20 border-2 border-relief/40 rounded-full flex items-center justify-center mb-2">
                                    <span className="text-lg font-bold text-relief">30m</span>
                                </div>
                                <p className="text-[10px] text-muted-foreground">Discovery time</p>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <span className="text-relief font-bold">saves</span>
                            </div>
                            <div className="text-center">
                                <div className="w-16 h-16 bg-friction/20 border-2 border-friction/40 rounded-full flex items-center justify-center mb-2">
                                    <span className="text-lg font-bold text-friction">3w</span>
                                </div>
                                <p className="text-[10px] text-muted-foreground">Rework time</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}

            {/* Stage 4: How to Apply (appears after all checked or auto-appears) */}
            {stage >= 4 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-card border border-border rounded-xl p-5 space-y-4"
                >
                    <p className="text-xs text-muted-foreground uppercase tracking-wide text-center">For Future Projects</p>
                    <div className="grid gap-3">
                        {[
                            { icon: "🎯", tip: "Always ask: Who is the user? What are their constraints?" },
                            { icon: "⏰", tip: "30 minutes of discovery saves 3 weeks of rework" },
                            { icon: "🛡️", tip: "Push back on 'no time for research' — show the cost of assumptions" },
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="flex items-center gap-3 bg-secondary/20 rounded-lg p-3"
                            >
                                <span className="text-lg">{item.icon}</span>
                                <p className="text-sm text-foreground">{item.tip}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* Continue Button */}
            {stage >= 4 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center space-y-3"
                >
                    <p className="text-xs text-muted-foreground">
                        Next: Requirements Phase — we'll add navigation, CTAs, and more to the website
                    </p>
                    <button
                        onClick={onComplete}
                        className="px-10 py-5 bg-primary text-primary-foreground font-display text-lg rounded-md hover:bg-primary/90 transition-colors"
                    >
                        Continue to Requirements →
                    </button>
                </motion.div>
            )}
        </div>
    );
};
