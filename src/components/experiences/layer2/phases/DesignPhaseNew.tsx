import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSDLC } from "../SDLCContext";
import { Layer2Wrapper } from "../Layer2Wrapper";

// Screen types for Design Phase
export type DesignScreen =
    | "storybridge"
    | "wireframing"
    | "visualdesign"
    | "navigation"
    | "forms"
    | "testing"
    | "reflection"
    | "consequence"
    | "takeaway";

export const DESIGN_SCREEN_ORDER: DesignScreen[] = [
    "storybridge",
    "wireframing",
    "visualdesign",
    "navigation",
    "forms",
    "testing",
    "consequence",
    "takeaway"
];

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
            <div className="flex items-center gap-2">
                <div className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold uppercase rounded tracking-wider">
                    Design Phase
                </div>
                <span className="text-xs text-muted-foreground">Step {step} of {totalSteps}</span>
            </div>
            <div className="flex gap-1">
                {Array.from({ length: totalSteps }).map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 w-6 rounded-full transition-all duration-500 ${i + 1 <= step ? "bg-primary" : "bg-muted"
                            }`}
                    />
                ))}
            </div>
        </div>
        <h2 className="text-xl font-display font-semibold text-foreground mb-1">{title}</h2>
        <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{subtitle}</p>
            <div className="hidden md:flex items-center gap-2 text-xs bg-secondary/50 px-3 py-1.5 rounded-full text-secondary-foreground/80">
                <span className="font-bold">Why:</span> {why}
            </div>
        </div>
        {/* Mobile Why */}
        <p className="md:hidden text-xs text-muted-foreground mt-2 pt-2 border-t border-dashed border-border/50">
            <span className="font-bold text-primary/80">Why:</span> {why}
        </p>
    </motion.div>
);

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
            setTimeout(() => setStage(2), 1500),
            setTimeout(() => setStage(3), 3000),
        ];
        return () => timers.forEach(t => clearTimeout(t));
    }, []);

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            {/* Context */}
            <StoryContext
                step={1}
                totalSteps={8}
                title="From Requirements to Reality"
                subtitle="Vikram handed you the requirements. Now you face the blank canvas."
                why="Lesson: Design isn't art. It's a series of trade-offs between Business, Tech, and User needs."
            />

            {/* Narrative Content */}
            <div className="space-y-6">
                {stage >= 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card border border-border rounded-xl p-6"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                                <span className="text-2xl">📋</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-foreground mb-1">The Requirements are clear</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    You have a list of features, a timeline (4 weeks), and a budget.
                                    But a list of features is not a product.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {stage >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card border border-border rounded-xl p-6 relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full" />

                        <div className="flex items-start gap-4 relative z-10">
                            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center shrink-0 border-2 border-primary/20">
                                <span className="text-2xl">👨‍💻</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-foreground mb-1">Your Job: The Designer</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                                    You need to turn those words into screens. Every pixel you place asks a question:
                                </p>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-primary">1</div>
                                        <span className="text-foreground">Will Rahul understand how to use this?</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-xs font-bold text-primary">2</div>
                                        <span className="text-foreground">Can the team build this in 4 weeks?</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {stage >= 3 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex justify-center pt-4"
                    >
                        <button
                            onClick={onContinue}
                            className="px-8 py-3 bg-primary text-primary-foreground font-display font-medium rounded-lg hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20"
                        >
                            Open Design Tool →
                        </button>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

// ============================================
// SCREEN 2: WIREFRAMING (The Builder)
// ============================================

export interface WireframeComponent {
    id: string;
    type: "header" | "hero" | "features" | "services" | "testimonials" | "contact" | "footer" | "nav";
    label: string;
    icon: string;
    required?: boolean;
    category: "clarity" | "credibility" | "conversion" | "navigation";
    description: string; // The "Why" for this specific component
}

const AVAILABLE_COMPONENTS: WireframeComponent[] = [
    { id: "nav", type: "nav", label: "Navigation Bar", icon: "🗺️", required: true, category: "navigation", description: "Users need to know where they are." },
    { id: "hero", type: "hero", label: "Hero Section", icon: "👋", required: true, category: "clarity", description: "Answers 'What is this site?' immediately." },
    { id: "features", type: "features", label: "Key Features", icon: "✨", category: "credibility", description: "Shows specific value, building competence trust." },
    { id: "services", type: "services", label: "Services List", icon: "🛠️", category: "clarity", description: "Details exactly what is offered." },
    { id: "testimonials", type: "testimonials", label: "Testimonials", icon: "💬", category: "credibility", description: "Social proof reduces anxiety." },
    { id: "contact", type: "contact", label: "Contact Form", icon: "✉️", required: true, category: "conversion", description: "The mechanism for users to act." },
    { id: "footer", type: "footer", label: "Footer", icon: "🦶", required: true, category: "navigation", description: "The safety net for lost users." },
];

interface WireframingScreenProps {
    onContinue: () => void;
    addedComponents: string[];
    onAddComponent: (id: string) => void;
    onRemoveComponent: (id: string) => void;
    onReorderComponents: (startIndex: number, endIndex: number) => void;
}

const WireframingScreen = ({
    onContinue,
    addedComponents,
    onAddComponent,
    onRemoveComponent,
    onReorderComponents
}: WireframingScreenProps) => {

    // 1. Calculate UX Pillars
    const hasClarity = addedComponents.includes("hero") && addedComponents.includes("services");
    const hasCredibility = addedComponents.includes("testimonials") || addedComponents.includes("features");
    const hasConversion = addedComponents.includes("contact");

    // Check required (blocking)
    const requiredMissing = AVAILABLE_COMPONENTS
        .filter(c => c.required && !addedComponents.includes(c.id))
        .map(c => c.label);

    const canContinue = requiredMissing.length === 0;

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <StoryContext
                step={2}
                totalSteps={8}
                title="Construct the Skeleton"
                subtitle="Click components to build the structure."
                why="Lesson: Every component must serve a UX Purpose: Clarity, Credibility, or Conversion."
            />

            <div className="grid lg:grid-cols-12 gap-8 h-[600px]">

                {/* LEFT: Component Palette */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="bg-card border border-border rounded-xl p-4 h-full flex flex-col">
                        <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                            <span>🧰</span> Components
                        </h3>
                        <div className="space-y-2 overflow-y-auto flex-1 pr-2">
                            {AVAILABLE_COMPONENTS.map(component => {
                                const isAdded = addedComponents.includes(component.id);
                                return (
                                    <button
                                        key={component.id}
                                        onClick={() => !isAdded && onAddComponent(component.id)}
                                        disabled={isAdded}
                                        className={`w-full p-3 rounded-lg border text-left transition-all flex flex-col gap-1 group ${isAdded
                                            ? "opacity-50 cursor-not-allowed bg-muted border-transparent"
                                            : "bg-secondary/50 border-border hover:border-primary/50 hover:bg-secondary hover:shadow-sm"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 w-full">
                                            <span className="text-xl">{component.icon}</span>
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-foreground">{component.label}</p>
                                            </div>
                                            {isAdded && <span className="text-primary text-sm font-bold">✓</span>}
                                        </div>
                                        {/* Show 'Why' explicitly on hover or simple subtitle */}
                                        <p className="text-[10px] text-muted-foreground pl-8 opacity-80">
                                            Adds: <span className="font-semibold uppercase tracking-wider">{component.category}</span>
                                        </p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* CENTER: Canvas / Phone Preview */}
                <div className="lg:col-span-5 flex justify-center items-center bg-muted/30 rounded-xl border-2 border-dashed border-border p-6 relative">
                    <div className="w-[300px] h-[580px] bg-background border-[8px] border-foreground/10 rounded-[2.5rem] shadow-2xl overflow-hidden relative flex flex-col">
                        {/* Phone Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-foreground/10 rounded-b-xl z-20" />

                        {/* Phone Screen */}
                        <div className="flex-1 overflow-y-auto bg-white dark:bg-zinc-900 scrollbar-hide py-8 px-4 space-y-2">
                            <AnimatePresence>
                                {addedComponents.length === 0 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="h-full flex flex-col items-center justify-center text-center text-muted-foreground p-4 dashed-border"
                                    >
                                        <p className="text-4xl mb-2">📱</p>
                                        <p className="text-sm">Your canvas is empty.</p>
                                        <p className="text-xs">Add components to satisfy the UX Pillars.</p>
                                    </motion.div>
                                )}

                                {addedComponents.map((id, index) => {
                                    const comp = AVAILABLE_COMPONENTS.find(c => c.id === id);
                                    if (!comp) return null;
                                    return (
                                        <motion.div
                                            key={id}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="group relative"
                                        >
                                            <div className="p-4 bg-muted/50 border border-border rounded-lg flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <span>{comp.icon}</span>
                                                    <div>
                                                        <span className="text-xs font-semibold block">{comp.label}</span>
                                                        <span className="text-[9px] uppercase tracking-wider text-muted-foreground block">{comp.category}</span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => onRemoveComponent(id)}
                                                    className="opacity-0 group-hover:opacity-100 text-friction hover:bg-friction/10 p-1 rounded transition-all"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Analysis (The 3 Cs) */}
                <div className="lg:col-span-4 space-y-6">

                    {/* The 3 Pillars Card */}
                    <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
                        <h3 className="font-medium text-foreground mb-4 flex items-center gap-2">
                            <span>🏛️</span> The 3 UX Pillars
                        </h3>

                        <div className="space-y-4">
                            {/* Clarity */}
                            <div className={`p-3 rounded-lg border transition-colors ${hasClarity ? "bg-green-500/10 border-green-500/20" : "bg-muted/30 border-dashed border-muted-foreground/30"}`}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-sm">1. Clarity</span>
                                    {hasClarity ? <span className="text-green-600 text-xs font-bold">✓ Satisfied</span> : <span className="text-muted-foreground text-xs">Missing</span>}
                                </div>
                                <p className="text-xs text-muted-foreground">Do users know <strong>who</strong> you are and <strong>what</strong> you offer? (Hero + Services)</p>
                            </div>

                            {/* Credibility */}
                            <div className={`p-3 rounded-lg border transition-colors ${hasCredibility ? "bg-green-500/10 border-green-500/20" : "bg-muted/30 border-dashed border-muted-foreground/30"}`}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-sm">2. Credibility</span>
                                    {hasCredibility ? <span className="text-green-600 text-xs font-bold">✓ Satisfied</span> : <span className="text-muted-foreground text-xs">Missing</span>}
                                </div>
                                <p className="text-xs text-muted-foreground">Do users <strong>trust</strong> you? (Testimonials or Key Features)</p>
                            </div>

                            {/* Conversion */}
                            <div className={`p-3 rounded-lg border transition-colors ${hasConversion ? "bg-green-500/10 border-green-500/20" : "bg-muted/30 border-dashed border-muted-foreground/30"}`}>
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-bold text-sm">3. Conversion</span>
                                    {hasConversion ? <span className="text-green-600 text-xs font-bold">✓ Satisfied</span> : <span className="text-muted-foreground text-xs">Missing</span>}
                                </div>
                                <p className="text-xs text-muted-foreground">Can users <strong>act</strong>? (Contact Form)</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            onClick={onContinue}
                            disabled={!canContinue}
                            className={`w-full py-4 font-display font-medium rounded-lg shadow-lg transition-all ${canContinue
                                ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/20"
                                : "bg-muted text-muted-foreground cursor-not-allowed"
                                }`}
                        >
                            {canContinue ? "Continue to Visuals →" : "Add Required Components"}
                        </button>
                        {!canContinue && requiredMissing.length > 0 && (
                            <p className="text-xs text-center text-friction mt-2">
                                Check the palette for "Required" items to ensure basic navigation.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// ============================================
// SCREEN 3: VISUAL DESIGN (The Paint)
// ============================================

export interface ColorPalette {
    id: string;
    label: string;
    description: string;
    colors: {
        primary: string;
        secondary: string;
        background: string;
        text: string;
        accent: string;
    };
    style: "corporate" | "playful" | "minimal" | "bold";
    accessibilityScore: number; // 0-100
}

const PALETTES: ColorPalette[] = [
    {
        id: "trust-blue",
        label: "Corporate Trust",
        description: "Standard, safe enterprise blue. High contrast, boring but reliable.",
        colors: {
            primary: "#2563EB", // Blue-600
            secondary: "#F3F4F6", // Gray-100
            background: "#FFFFFF",
            text: "#111827", // Gray-900
            accent: "#4B5563"
        },
        style: "corporate",
        accessibilityScore: 95
    },
    {
        id: "eco-green",
        label: "Growth & Eco",
        description: "Fresh greens and earth tones. Friendly and inviting.",
        colors: {
            primary: "#059669", // Emerald-600
            secondary: "#ECFDF5", // Emerald-50
            background: "#FFFFFF",
            text: "#064E3B", // Emerald-900
            accent: "#34D399"
        },
        style: "playful",
        accessibilityScore: 90
    },
    {
        id: "sleek-dark",
        label: "Modern Dark",
        description: "High contrast dark mode. Tech-forward and premium.",
        colors: {
            primary: "#60A5FA", // Blue-400
            secondary: "#1F2937", // Gray-800
            background: "#111827", // Gray-900
            text: "#F9FAFB", // Gray-50
            accent: "#374151"
        },
        style: "minimal",
        accessibilityScore: 85
    },
    {
        id: "trendy-pastel",
        label: "Trendy Pastel",
        description: "Low contrast, 'dribbble-ready' aesthetics. Hard to read.",
        colors: {
            primary: "#F9A8D4", // Pink-300
            secondary: "#FFF1F2", // Rose-50
            background: "#FFFFFF",
            text: "#9D174D", // Pink-800 (still somewhat readable intentionally)
            accent: "#FECDD3"
        },
        style: "bold",
        accessibilityScore: 65
    }
];

interface VisualDesignScreenProps {
    onContinue: () => void;
    currentPalette: string;
    currentTypography: "sans" | "serif";
    wireframeComponents: string[];
    onSetPalette: (id: string) => void;
    onSetTypography: (type: "sans" | "serif") => void;
}

const VisualDesignScreen = ({
    onContinue,
    currentPalette,
    currentTypography,
    wireframeComponents,
    onSetPalette,
    onSetTypography
}: VisualDesignScreenProps) => {

    const selectedPalette = PALETTES.find(p => p.id === currentPalette) || PALETTES[0];

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <StoryContext
                step={3}
                totalSteps={8}
                title="Paint & Polish"
                subtitle="Apply visual styles to your structural wireframe."
                why="Lesson: Accessibility is not optional. 'Trendy' low-contrast designs kill readability."
            />

            <div className="grid lg:grid-cols-12 gap-8 h-[600px]">

                {/* LEFT: Controls */}
                <div className="lg:col-span-4 space-y-6">
                    {/* Palette Selector */}
                    <div className="bg-card border border-border rounded-xl p-5">
                        <h3 className="font-medium text-foreground mb-4">Color Palette</h3>
                        <div className="grid grid-cols-1 gap-3">
                            {PALETTES.map(palette => (
                                <button
                                    key={palette.id}
                                    onClick={() => onSetPalette(palette.id)}
                                    className={`relative p-3 rounded-lg border text-left transition-all flex items-center gap-4 group ${currentPalette === palette.id
                                        ? "ring-2 ring-primary border-transparent bg-secondary/30"
                                        : "hover:border-primary/50 border-border"
                                        }`}
                                >
                                    {/* Color Swatches */}
                                    <div className="flex -space-x-2 shrink-0">
                                        <div className="w-8 h-8 rounded-full border-2 border-card" style={{ backgroundColor: palette.colors.primary }} />
                                        <div className="w-8 h-8 rounded-full border-2 border-card" style={{ backgroundColor: palette.colors.secondary }} />
                                        <div className="w-8 h-8 rounded-full border-2 border-card" style={{ backgroundColor: palette.colors.text }} />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-0.5">
                                            <span className="font-medium text-sm truncate">{palette.label}</span>
                                            {palette.accessibilityScore < 80 && (
                                                <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold">Low A11y</span>
                                            )}
                                        </div>
                                        <p className="text-xs text-muted-foreground truncate">{palette.description}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Typography Selector */}
                    <div className="bg-card border border-border rounded-xl p-5">
                        <h3 className="font-medium text-foreground mb-4">Typography</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => onSetTypography("sans")}
                                className={`p-4 rounded-lg border text-center transition-all ${currentTypography === "sans"
                                    ? "ring-2 ring-primary border-transparent bg-secondary/30"
                                    : "hover:border-primary/50 border-border"
                                    }`}
                            >
                                <span className="block text-2xl font-sans mb-1">Ag</span>
                                <span className="text-xs text-muted-foreground">Modern Sans</span>
                            </button>
                            <button
                                onClick={() => onSetTypography("serif")}
                                className={`p-4 rounded-lg border text-center transition-all ${currentTypography === "serif"
                                    ? "ring-2 ring-primary border-transparent bg-secondary/30"
                                    : "hover:border-primary/50 border-border"
                                    }`}
                            >
                                <span className="block text-2xl font-serif mb-1">Ag</span>
                                <span className="text-xs text-muted-foreground">Trust Serif</span>
                            </button>
                        </div>
                    </div>

                    {/* Continue Action */}
                    <button
                        onClick={onContinue}
                        className="w-full py-4 bg-primary text-primary-foreground font-display font-medium rounded-lg shadow-lg hover:shadow-primary/20 transition-all hover:bg-primary/90"
                    >
                        Looks Good →
                    </button>
                </div>

                {/* CENTER: Live Preview */}
                <div className="lg:col-span-8 flex justify-center items-center bg-muted/30 rounded-xl border-2 border-dashed border-border p-6 relative">
                    <div className="w-[340px] h-[580px] bg-background border-[8px] border-foreground/10 rounded-[2.5rem] shadow-2xl overflow-hidden relative flex flex-col transition-colors duration-500"
                        style={{ backgroundColor: selectedPalette.colors.background }}
                    >
                        {/* Phone Notch */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-foreground/10 rounded-b-xl z-20" />

                        {/* CONTENT PREVIEW */}
                        <div className={`flex-1 overflow-y-auto scrollbar-hide`} style={{ color: selectedPalette.colors.text, fontFamily: currentTypography === "sans" ? "var(--font-sans)" : "serif" }}>

                            {/* Nav Bar Preview */}
                            {wireframeComponents.includes("nav") && (
                                <div className="p-4 flex justify-between items-center sticky top-0 z-10 backdrop-blur-md bg-opacity-80 border-b"
                                    style={{ backgroundColor: selectedPalette.colors.background, borderColor: selectedPalette.colors.secondary }}>
                                    <div className="font-bold text-lg">Vikram</div>
                                    <div className="w-6 h-6 rounded bg-current opacity-20" />
                                </div>
                            )}

                            {/* Hero Preview */}
                            {wireframeComponents.includes("hero") && (
                                <div className="p-6 text-center space-y-4" style={{ backgroundColor: selectedPalette.colors.secondary }}>
                                    <div className="w-16 h-16 mx-auto rounded-full opacity-20 bg-current flex items-center justify-center text-2xl">👋</div>
                                    <h1 className="text-2xl font-bold leading-tight">Human-Centric UX Design</h1>
                                    <p className="text-sm opacity-80">Building products that people actually love to use.</p>
                                    <button className="px-6 py-2 rounded-full text-sm font-medium transition-transform active:scale-95"
                                        style={{ backgroundColor: selectedPalette.colors.primary, color: selectedPalette.colors.background }}>
                                        Get Started
                                    </button>
                                </div>
                            )}

                            {/* Features Preview */}
                            {wireframeComponents.includes("features") && (
                                <div className="p-6 grid grid-cols-2 gap-4">
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="p-3 rounded-lg border border-current border-opacity-10 space-y-2">
                                            <div className="w-8 h-8 rounded bg-current opacity-10" />
                                            <div className="h-3 w-3/4 bg-current opacity-20 rounded" />
                                            <div className="h-2 w-full bg-current opacity-10 rounded" />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Services Preview */}
                            {wireframeComponents.includes("services") && (
                                <div className="p-6 space-y-4">
                                    <h2 className="text-lg font-bold">Our Services</h2>
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="flex gap-4 items-center p-3 rounded-lg bg-current bg-opacity-5">
                                            <div className="w-10 h-10 rounded bg-current opacity-20 shrink-0" />
                                            <div className="space-y-1 flex-1">
                                                <div className="h-3 w-1/2 bg-current opacity-40 rounded" />
                                                <div className="h-2 w-3/4 bg-current opacity-20 rounded" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Testimonials Preview */}
                            {wireframeComponents.includes("testimonials") && (
                                <div className="p-6 overflow-x-hidden whitespace-nowrap" style={{ backgroundColor: selectedPalette.colors.accent, color: selectedPalette.colors.background }}>
                                    <div className="inline-block w-64 p-4 rounded bg-white/10 mr-4 whitespace-normal">
                                        <p className="text-xs italic opacity-90">"Vikram's team transformed our product completely."</p>
                                        <div className="mt-2 text-xs font-bold">— Happy Client</div>
                                    </div>
                                </div>
                            )}

                            {/* Contact Preview */}
                            {wireframeComponents.includes("contact") && (
                                <div className="p-6 space-y-4">
                                    <h2 className="text-lg font-bold">Get in Touch</h2>
                                    <div className="space-y-3">
                                        <div className="h-10 rounded border border-current border-opacity-20 flex items-center px-3 opacity-50 text-sm">Name</div>
                                        <div className="h-10 rounded border border-current border-opacity-20 flex items-center px-3 opacity-50 text-sm">Email</div>
                                        <button className="w-full py-3 rounded font-medium text-sm"
                                            style={{ backgroundColor: selectedPalette.colors.text, color: selectedPalette.colors.background }}>
                                            Send Message
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Footer Preview */}
                            {wireframeComponents.includes("footer") && (
                                <div className="p-8 text-center bg-black/5 space-y-2">
                                    <div className="font-bold opacity-50">Vikram Design</div>
                                    <div className="text-[10px] opacity-40">© 2024 All rights reserved</div>
                                </div>
                            )}

                            {/* Empty State Fallback (if user removed everything in prev step which shouldn't happen but safe to have) */}
                            {wireframeComponents.length === 0 && (
                                <div className="h-full flex items-center justify-center p-8 text-center opacity-50">
                                    <p>No components to style.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// ============================================
// SCREEN 4: NAVIGATION (The Map)
// ============================================

export type NavigationType = "simple-bar" | "hamburger" | "mega-menu";

interface NavigationOption {
    id: NavigationType;
    label: string;
    description: string;
    pros: string[];
    cons: string[];
    thumbZoneScore: number; // 0-100 (higher is better)
    devTimeDays: number;
}

const NAV_OPTIONS: NavigationOption[] = [
    {
        id: "simple-bar",
        label: "Simple Tab Bar",
        description: "Standard bottom navigation. Icons + Labels.",
        pros: ["Easy thumb reach", "Clear visibility", "Standard pattern"],
        cons: ["Limited to 5 items", "Takes up screen space"],
        thumbZoneScore: 95,
        devTimeDays: 2
    },
    {
        id: "hamburger",
        label: "Hamburger Menu",
        description: "Hidden side drawer triggered by top icon.",
        pros: ["Clean interface", "Unlimited items"],
        cons: ["Hidden discovery", "Hard to reach (top-left)"],
        thumbZoneScore: 60,
        devTimeDays: 3
    },
    {
        id: "mega-menu",
        label: "Complex Mega Menu",
        description: "Multi-level breakdown of all categories.",
        pros: ["Shows everything", "Good for SEO"],
        cons: ["Overwhelming on mobile", "Complex interaction"],
        thumbZoneScore: 40,
        devTimeDays: 5
    }
];

interface NavigationScreenProps {
    onContinue: () => void;
    currentNav: NavigationType;
    onSetNav: (nav: NavigationType) => void;
    designState: DesignState; // To apply previous visual choices
}

const NavigationScreen = ({
    onContinue,
    currentNav,
    onSetNav,
    designState
}: NavigationScreenProps) => {

    const selectedNav = NAV_OPTIONS.find(n => n.id === currentNav) || NAV_OPTIONS[0];
    const palette = PALETTES.find(p => p.id === designState.palette) || PALETTES[0];
    const isSans = designState.typography === "sans";

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <StoryContext
                step={4}
                totalSteps={8}
                title="Wayfinding & Reachability"
                subtitle="How will users move through Vikram's site? Mobile reach matters."
                why="Lesson: If users can't reach it with their thumb, they won't click it."
            />

            <div className="grid lg:grid-cols-12 gap-8 h-[600px]">

                {/* LEFT: Controls */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-card border border-border rounded-xl p-5">
                        <h3 className="font-medium text-foreground mb-4">Navigation Structure</h3>
                        <div className="space-y-3">
                            {NAV_OPTIONS.map(option => (
                                <button
                                    key={option.id}
                                    onClick={() => onSetNav(option.id)}
                                    className={`w-full text-left p-4 rounded-lg border transition-all ${currentNav === option.id
                                        ? "ring-2 ring-primary border-transparent bg-secondary/30"
                                        : "hover:border-primary/50 border-border"
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="font-medium text-foreground">{option.label}</span>
                                        <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">
                                            +{option.devTimeDays} Days
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mb-3">{option.description}</p>

                                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                                        <div>
                                            <span className="text-green-600 font-bold block mb-1">Pros</span>
                                            <ul className="list-disc pl-3 text-muted-foreground space-y-0.5">
                                                {option.pros.map((p, i) => <li key={i}>{p}</li>)}
                                            </ul>
                                        </div>
                                        <div>
                                            <span className="text-red-500 font-bold block mb-1">Cons</span>
                                            <ul className="list-disc pl-3 text-muted-foreground space-y-0.5">
                                                {option.cons.map((c, i) => <li key={i}>{c}</li>)}
                                            </ul>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={onContinue}
                        className="w-full py-4 bg-primary text-primary-foreground font-display font-medium rounded-lg shadow-lg hover:shadow-primary/20 transition-all hover:bg-primary/90"
                    >
                        Confirm Navigation →
                    </button>
                </div>

                {/* CENTER: Live Preview with Thumb Zone */}
                <div className="lg:col-span-8 flex justify-center items-center bg-muted/30 rounded-xl border-2 border-dashed border-border p-6 relative">
                    <div className="w-[340px] h-[580px] bg-background border-[8px] border-foreground/10 rounded-[2.5rem] shadow-2xl overflow-hidden relative flex flex-col transition-colors duration-500"
                        style={{
                            backgroundColor: palette.colors.background,
                            color: palette.colors.text,
                            fontFamily: isSans ? "var(--font-sans)" : "serif"
                        }}
                    >
                        {/* THUMB ZONE OVERLAY */}
                        {/* THUMB ZONE OVERLAY */}
                        <div className="absolute inset-0 pointer-events-none z-30 opacity-30">
                            {/* Easy Reach (Green) - Bottom right arc */}
                            <div className="absolute bottom-0 right-0 w-[280px] h-[280px] bg-green-500 rounded-tl-full blur-xl" />
                            {/* Hard Reach (Red) - Top left */}
                            <div className="absolute top-0 left-0 w-full h-32 bg-red-500 blur-2xl" />
                        </div>

                        {/* THUMB ZONE LABEL */}
                        <div className="absolute top-4 right-4 z-40 bg-black/80 text-white text-[10px] px-2 py-1 rounded backdrop-blur-sm">
                            Thumb Score: <span className={selectedNav.thumbZoneScore > 80 ? "text-green-400" : "text-yellow-400"}>{selectedNav.thumbZoneScore}/100</span>
                        </div>

                        {/* CONTENT PREVIEW (Simplified for Nav Focus) */}
                        <div className="flex-1 overflow-y-auto scrollbar-hide relative z-20">

                            {/* Navigation Implementation */}
                            {currentNav === "hamburger" && (
                                <div className="absolute top-4 left-4 z-50 p-2 rounded-full bg-white/10 backdrop-blur-md shadow-sm border border-white/20">
                                    <div className="w-5 h-0.5 bg-current mb-1" />
                                    <div className="w-5 h-0.5 bg-current mb-1" />
                                    <div className="w-5 h-0.5 bg-current" />
                                </div>
                            )}

                            {currentNav === "mega-menu" && (
                                <div className="absolute top-4 left-4 z-50 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md shadow-sm border border-white/20 flex gap-2 text-xs font-bold">
                                    <span>Menu ▼</span>
                                </div>
                            )}

                            {/* Header Logo */}
                            <div className="p-4 flex justify-center items-center sticky top-0 z-10 backdrop-blur-sm"
                                style={{ borderBottomColor: palette.colors.secondary + '20' }}>
                                <div className="font-bold text-lg">Vikram</div>
                            </div>

                            {/* Mock Content to show scrolling */}
                            <div className="p-6 space-y-6 opacity-50 grayscale transform scale-95 origin-top">
                                <div className="h-40 rounded-xl w-full bg-current opacity-10" />
                                <div className="space-y-3">
                                    <div className="h-4 w-3/4 bg-current opacity-20 rounded" />
                                    <div className="h-4 w-1/2 bg-current opacity-20 rounded" />
                                    <div className="h-4 w-full bg-current opacity-10 rounded" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="h-32 rounded-lg bg-current opacity-10" />
                                    <div className="h-32 rounded-lg bg-current opacity-10" />
                                </div>
                            </div>

                        </div>

                        {/* BOTTOM NAV BAR (Only for Simple Bar) */}
                        <AnimatePresence>
                            {currentNav === "simple-bar" && (
                                <motion.div
                                    initial={{ y: 50 }}
                                    animate={{ y: 0 }}
                                    exit={{ y: 50 }}
                                    className="h-16 border-t flex justify-around items-center px-2 z-40 bg-background/90 backdrop-blur-md"
                                    style={{ borderColor: palette.colors.secondary }}
                                >
                                    {[1, 2, 3, 4].map(i => (
                                        <div key={i} className="flex flex-col items-center gap-1 opacity-70">
                                            <div className="w-5 h-5 bg-current rounded-sm opacity-50" />
                                            <div className="h-1 w-8 bg-current rounded-full opacity-30" />
                                        </div>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="absolute bottom-10 right-10 text-xs text-muted-foreground w-40 text-right">
                        <span className="block font-bold text-green-600">Green Zone:</span> Easy naturally.
                        <span className="block font-bold text-red-500 mt-1">Red Zone:</span> Hard reach.
                    </div>
                </div>
            </div>
        </div>
    );
};

// ============================================
// SCREEN 5: FORMS (The Interaction Cost)
// ============================================

export interface FormField {
    id: string;
    label: string;
    type: "text" | "email" | "tel" | "date" | "select" | "textarea";
    frictionPoints: number; // Impact on drop-off
    required?: boolean;
    businessValue: string; // Why marketing wants it
}

const AVAILABLE_FIELDS: FormField[] = [
    { id: "name", label: "Full Name", type: "text", frictionPoints: 5, required: true, businessValue: "Identity" },
    { id: "email", label: "Email Address", type: "email", frictionPoints: 5, required: true, businessValue: "Contact" },
    { id: "phone", label: "Phone Number", type: "tel", frictionPoints: 25, businessValue: "Sales Calls" },
    { id: "role", label: "Job Role", type: "select", frictionPoints: 10, businessValue: "Segmentation" },
    { id: "company", label: "Company Name", type: "text", frictionPoints: 10, businessValue: "B2B Qual" },
    { id: "budget", label: "Budget Range", type: "select", frictionPoints: 20, businessValue: "Qualifying" },
    { id: "dob", label: "Date of Birth", type: "date", frictionPoints: 30, businessValue: "Demographics" },
    { id: "message", label: "Message", type: "textarea", frictionPoints: 5, businessValue: "Context" },
];

interface FormsScreenProps {
    onContinue: () => void;
    currentFields: string[];
    onAddField: (id: string) => void;
    onRemoveField: (id: string) => void;
    designState: DesignState;
}

const FormsScreen = ({
    onContinue,
    currentFields,
    onAddField,
    onRemoveField,
    designState
}: FormsScreenProps) => {

    const palette = PALETTES.find(p => p.id === designState.palette) || PALETTES[0];
    const isSans = designState.typography === "sans";

    // Friction Calculation
    const frictionScore = currentFields.reduce((acc, id) => {
        const field = AVAILABLE_FIELDS.find(f => f.id === id);
        return acc + (field?.frictionPoints || 0);
    }, 0);

    // Drop-off logic: Base 10% + friction points
    const estimatedDropOff = Math.min(95, 10 + (frictionScore * 0.8));

    // Feedback
    const getFeedback = () => {
        if (estimatedDropOff < 25) return { color: "text-green-500", msg: "Low Friction. High Conversion." };
        if (estimatedDropOff < 50) return { color: "text-yellow-500", msg: "Moderate Friction. Is 'Phone' necessary?" };
        return { color: "text-red-500", msg: "High Friction! You are losing half your users." };
    };

    const feedback = getFeedback();
    const hasRequired = currentFields.includes("name") && currentFields.includes("email");

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <StoryContext
                step={5}
                totalSteps={8}
                title="The Cost of Asking"
                subtitle="Design the contact form. Marketing wants all the data. Users want to finish."
                why="Lesson: Every extra field you add buys you data but costs you users."
            />

            <div className="grid lg:grid-cols-12 gap-8 h-[600px]">

                {/* LEFT: Field Actions */}
                <div className="lg:col-span-3 space-y-4">
                    <div className="bg-card border border-border rounded-xl p-4 h-full flex flex-col">
                        <h3 className="font-medium text-foreground mb-3 flex items-center gap-2">
                            <span>📝</span> Fields
                        </h3>
                        <div className="space-y-2 overflow-y-auto flex-1 pr-2">
                            {AVAILABLE_FIELDS.map(field => {
                                const isAdded = currentFields.includes(field.id);
                                return (
                                    <button
                                        key={field.id}
                                        onClick={() => !isAdded && onAddField(field.id)}
                                        disabled={isAdded}
                                        className={`w-full p-3 rounded-lg border text-left transition-all flex justify-between items-center group ${isAdded
                                            ? "opacity-50 cursor-not-allowed bg-muted border-transparent"
                                            : "bg-secondary/50 border-border hover:border-primary/50 hover:bg-secondary"
                                            }`}
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{field.label}</p>
                                            <p className="text-[10px] text-muted-foreground">+{field.frictionPoints} Friction</p>
                                        </div>
                                        {isAdded ? (
                                            <span className="text-primary text-xs font-bold">Added</span>
                                        ) : (
                                            <span className="opacity-0 group-hover:opacity-100 text-primary text-lg transition-opacity">+</span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* CENTER: Preview */}
                <div className="lg:col-span-5 flex justify-center items-center bg-muted/30 rounded-xl border-2 border-dashed border-border p-6 relative">
                    <div className="w-[300px] h-[580px] bg-background border-[8px] border-foreground/10 rounded-[2.5rem] shadow-2xl overflow-hidden relative flex flex-col transition-colors duration-500"
                        style={{
                            backgroundColor: palette.colors.background,
                            fontFamily: isSans ? "var(--font-sans)" : "serif"
                        }}
                    >
                        <div className="flex-1 overflow-y-auto scrollbar-hide p-4 pt-10">
                            <h2 className="text-xl font-bold mb-6 text-center" style={{ color: palette.colors.text }}>Get in Touch</h2>

                            <div className="space-y-4">
                                <AnimatePresence>
                                    {currentFields.map(id => {
                                        const field = AVAILABLE_FIELDS.find(f => f.id === id);
                                        if (!field) return null;
                                        return (
                                            <motion.div
                                                key={id}
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: "auto" }}
                                                exit={{ opacity: 0, height: 0 }}
                                                className="group relative"
                                            >
                                                <label className="block text-xs font-semibold mb-1 opacity-70" style={{ color: palette.colors.text }}>
                                                    {field.label} {field.required && "*"}
                                                </label>
                                                <div className="h-10 w-full rounded border bg-transparent opacity-50 relative flex items-center px-2"
                                                    style={{ borderColor: palette.colors.text }}>
                                                    {/* Fake Input content */}
                                                    <span className="text-[10px] opacity-30">Enter {field.label}...</span>

                                                    {/* Remove Button */}
                                                    <button
                                                        onClick={() => onRemoveField(id)}
                                                        className="absolute right-0 top-0 bottom-0 px-2 text-friction hover:text-red-500 hover:bg-red-50 font-bold"
                                                        title="Remove Field"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            </motion.div>
                                        )
                                    })}
                                </AnimatePresence>

                                {currentFields.length > 0 && (
                                    <button className="w-full py-3 rounded font-medium text-sm mt-6"
                                        style={{ backgroundColor: palette.colors.primary, color: palette.colors.background }}>
                                        Submit Request
                                    </button>
                                )}

                                {currentFields.length === 0 && (
                                    <div className="text-center py-10 opacity-40 text-sm">Form is empty</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: Friction Analysis */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-card border border-border rounded-xl p-5">
                        <h3 className="font-medium text-foreground mb-4">Friction Analysis</h3>

                        <div className="text-center mb-6">
                            <div className={`text-4xl font-display font-bold mb-1 transition-colors ${estimatedDropOff < 25 ? "text-green-500" : estimatedDropOff < 50 ? "text-yellow-500" : "text-red-500"
                                }`}>
                                {Math.round(estimatedDropOff)}%
                            </div>
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Est. Drop-off Rate</p>
                        </div>

                        {/* Friction Meter */}
                        <div className="h-4 w-full bg-secondary rounded-full overflow-hidden mb-4 relative">
                            {/* Color Zones */}
                            <div className="absolute inset-0 flex opacity-20">
                                <div className="flex-[3] bg-green-500" />
                                <div className="flex-[3] bg-yellow-500" />
                                <div className="flex-[4] bg-red-500" />
                            </div>
                            {/* Indicator */}
                            <motion.div
                                className="h-full bg-foreground w-1 absolute top-0"
                                animate={{ left: `${Math.min(100, estimatedDropOff)}%` }}
                            />
                        </div>

                        <p className={`text-sm text-center font-medium ${feedback.color}`}>
                            {feedback.msg}
                        </p>
                    </div>

                    {/* Explainer */}
                    <div className="bg-secondary/20 rounded-xl p-4 text-xs space-y-2">
                        <p><strong>Marketing says:</strong> "We need phone numbers for sales calls!"</p>
                        <p><strong>UX says:</strong> "asking for a phone number increases drop-off by 25%."</p>
                        <p className="italic opacity-70">Balance business needs with user patience.</p>
                    </div>

                    <div className="pt-2">
                        <button
                            onClick={onContinue}
                            disabled={!hasRequired}
                            className={`w-full py-4 font-display font-medium rounded-lg shadow-lg transition-all ${hasRequired
                                ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-primary/20"
                                : "bg-muted text-muted-foreground cursor-not-allowed"
                                }`}
                        >
                            {hasRequired ? "Finish Design →" : "Add Name & Email"}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

// ============================================
// SCREEN 6: TESTING (The Reality Check)
// ============================================

interface TestingScreenProps {
    onContinue: () => void;
    designState: DesignState;
}

const TestingScreen = ({ onContinue, designState }: TestingScreenProps) => {
    const [testMode, setTestMode] = useState<"device" | "flash">("device");
    const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">("mobile");
    const [flashState, setFlashState] = useState<"idle" | "showing" | "blurred" | "quiz" | "results">("idle");
    const [userRecall, setUserRecall] = useState<{
        name: boolean;
        value: boolean;
        action: boolean;
    }>({ name: false, value: false, action: false });

    const palette = PALETTES.find(p => p.id === designState.palette) || PALETTES[0];
    const isSans = designState.typography === "sans";

    // Reality Checks
    const hasName = designState.wireframe.includes("nav"); // Header has name
    const hasValue = designState.wireframe.includes("hero"); // Hero has value prop
    const hasAction = designState.wireframe.includes("hero") || designState.wireframe.includes("contact"); // Buttons

    const runFlashTest = () => {
        setFlashState("showing");
        setUserRecall({ name: false, value: false, action: false }); // Reset

        // Simulating the 5 seconds
        setTimeout(() => {
            setFlashState("blurred");
            setTimeout(() => setFlashState("quiz"), 500); // Small delay for effect
        }, 5000);
    };

    const submitQuiz = () => {
        setFlashState("results");
    };

    const getQuizFeedback = () => {
        const feedback = [];
        // Check Value Prop (Most Critical)
        if (userRecall.value && !hasValue) {
            feedback.push({ type: "warning", msg: "⚠️ False Memory: You claimed to see the Value Prop, but you haven't added a Hero section yet! Users won't know what you do." });
        } else if (!userRecall.value && !hasValue) {
            feedback.push({ type: "success", msg: "✅ Accurate Diagnosis: It's hard to recall the value because the Hero section is missing." });
        } else if (userRecall.value && hasValue) {
            feedback.push({ type: "success", msg: "✅ Success: Your Hero section is doing its job. The value is memorable." });
        } else {
            feedback.push({ type: "warning", msg: "⚠️ Missed Opportunity: You have a Hero section, but you didn't recall it. Is the font contrast too low?" });
        }

        // Check Company Name
        if (userRecall.name && !hasName) {
            feedback.push({ type: "warning", msg: "⚠️ False Memory: You recalled the Company Name, but you haven't added a Navigation Bar yet. Users might be confused." });
        } else if (!userRecall.name && !hasName) {
            feedback.push({ type: "success", msg: "✅ Accurate Diagnosis: It's hard to recall the company name because the Navigation Bar is missing." });
        } else if (userRecall.name && hasName) {
            feedback.push({ type: "success", msg: "✅ Success: Your Navigation Bar clearly communicates the company name." });
        } else {
            feedback.push({ type: "warning", msg: "⚠️ Missed Opportunity: You have a Navigation Bar, but you didn't recall the company name. Is it prominent enough?" });
        }

        // Check Call to Action
        if (userRecall.action && !hasAction) {
            feedback.push({ type: "warning", msg: "⚠️ False Memory: You recalled a Call to Action, but you haven't added a Hero or Contact section with a button. Users won't know what to do." });
        } else if (!userRecall.action && !hasAction) {
            feedback.push({ type: "success", msg: "✅ Accurate Diagnosis: It's hard to recall a Call to Action because there isn't one." });
        } else if (userRecall.action && hasAction) {
            feedback.push({ type: "success", msg: "✅ Success: Your Call to Action is clear and memorable." });
        } else {
            feedback.push({ type: "warning", msg: "⚠️ Missed Opportunity: You have a Call to Action, but you didn't recall it. Is it visible and compelling?" });
        }

        return feedback;
    };

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            <StoryContext
                step={6}
                totalSteps={8}
                title="Lab Testing"
                subtitle={testMode === "device" ? "Will it work on Vikram's iPad?" : "The 5-Second Rule"}
                why={testMode === "device"
                    ? "Lesson: Responsive design isn't just shrinking things. It's reflowing content."
                    : "Lesson: If users can't find the value in 5 seconds, they leave."}
            />

            {/* Mode Switcher */}
            <div className="flex justify-center mb-6">
                <div className="bg-muted p-1 rounded-lg flex gap-1">
                    <button
                        onClick={() => setTestMode("device")}
                        className={`px-4 py-2 rounded text-sm font-medium transition-all ${testMode === "device" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                        📱 Device Simulator
                    </button>
                    <button
                        onClick={() => setTestMode("flash")}
                        className={`px-4 py-2 rounded text-sm font-medium transition-all ${testMode === "flash" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                        ⚡ 5-Second Test
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 h-[600px]">

                {/* LEFT: Controls */}
                <div className="lg:col-span-3 space-y-6">
                    {testMode === "device" ? (
                        <div className="bg-card border border-border rounded-xl p-5">
                            <h3 className="font-medium text-foreground mb-4">Select Viewport</h3>
                            <div className="space-y-2">
                                <button onClick={() => setDevice("mobile")} className={`w-full p-3 rounded flex items-center gap-3 border transition-all ${device === "mobile" ? "bg-primary/10 border-primary text-primary" : "bg-background border-border"}`}>
                                    <span>📱</span> Mobile (375px)
                                </button>
                                <button onClick={() => setDevice("tablet")} className={`w-full p-3 rounded flex items-center gap-3 border transition-all ${device === "tablet" ? "bg-primary/10 border-primary text-primary" : "bg-background border-border"}`}>
                                    <span>📟</span> Tablet (768px)
                                </button>
                                <button onClick={() => setDevice("desktop")} className={`w-full p-3 rounded flex items-center gap-3 border transition-all ${device === "desktop" ? "bg-primary/10 border-primary text-primary" : "bg-background border-border"}`}>
                                    <span>💻</span> Desktop (1280px)
                                </button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-4">
                                Note how the layout reflows (or doesn't). Design decisions cascade.
                            </p>
                        </div>
                    ) : (
                        <div className="bg-card border border-border rounded-xl p-5 relative overflow-hidden">
                            <h3 className="font-medium text-foreground mb-4">Flash Test</h3>

                            {flashState === "idle" && (
                                <>
                                    <p className="text-sm text-muted-foreground mb-6">
                                        We will show users your design for exactly 5 seconds, then blur it. Can they tell what it is?
                                    </p>
                                    <button onClick={runFlashTest} className="w-full py-3 bg-primary text-primary-foreground rounded font-medium shadow-lg hover:shadow-primary/20">
                                        Start Test ⚡
                                    </button>
                                </>
                            )}

                            {['showing', 'blurred'].includes(flashState) && (
                                <div className="text-center py-10">
                                    <div className="animate-pulse text-4xl mb-4">👀</div>
                                    <p className="text-sm font-medium">Watching...</p>
                                </div>
                            )}

                            {flashState === "quiz" && (
                                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                                    <p className="text-sm font-bold">Pop Quiz! What did you catch?</p>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-3 p-3 bg-secondary/50 rounded cursor-pointer hover:bg-secondary">
                                            <input type="checkbox" checked={userRecall.name} onChange={e => setUserRecall({ ...userRecall, name: e.target.checked })} className="w-4 h-4 rounded border-primary" />
                                            <span className="text-sm">Company Name</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-secondary/50 rounded cursor-pointer hover:bg-secondary">
                                            <input type="checkbox" checked={userRecall.value} onChange={e => setUserRecall({ ...userRecall, value: e.target.checked })} className="w-4 h-4 rounded border-primary" />
                                            <span className="text-sm">Value Proposition</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 bg-secondary/50 rounded cursor-pointer hover:bg-secondary">
                                            <input type="checkbox" checked={userRecall.action} onChange={e => setUserRecall({ ...userRecall, action: e.target.checked })} className="w-4 h-4 rounded border-primary" />
                                            <span className="text-sm">Call to Action (Button)</span>
                                        </label>
                                    </div>
                                    <button onClick={submitQuiz} className="w-full py-2 bg-primary text-primary-foreground rounded text-sm mt-4">
                                        Verify Recall
                                    </button>
                                </div>
                            )}

                            {flashState === "results" && (
                                <div className="space-y-4 animate-in zoom-in-95">
                                    <div className="text-center mb-4">
                                        <div className="text-2xl font-bold">Analysis</div>
                                    </div>

                                    <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                                        {getQuizFeedback().map((fb, i) => (
                                            <div key={i} className={`p-3 rounded text-xs leading-relaxed border ${fb.type === "success" ? "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400" : "bg-yellow-500/10 border-yellow-500/20 text-yellow-700 dark:text-yellow-400"}`}>
                                                {fb.msg}
                                            </div>
                                        ))}
                                    </div>

                                    <button onClick={() => setFlashState("idle")} className="w-full py-2 bg-secondary text-secondary-foreground rounded text-sm">
                                        Retest
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* CENTER: Canvas */}
                <div className="lg:col-span-9 flex justify-center items-center bg-muted/30 rounded-xl border-2 border-dashed border-border p-6 relative overflow-hidden">

                    <motion.div
                        className={`bg-background shadow-2xl overflow-hidden relative flex flex-col transition-all duration-500 ease-in-out border-8 border-foreground/10 ${device === "mobile" ? "w-[320px] h-[580px] rounded-[2.5rem]" :
                            device === "tablet" ? "w-[500px] h-[580px] rounded-[1.5rem]" :
                                "w-full h-[580px] rounded-xl"
                            }`}
                        style={{
                            backgroundColor: palette.colors.background,
                            fontFamily: isSans ? "var(--font-sans)" : "serif",
                            filter: ['blurred', 'quiz', 'results'].includes(flashState) ? "blur(20px)" : "none"
                        }}
                    >
                        {/* Header */}
                        {designState.wireframe.includes("nav") && (
                            <div className="p-4 flex justify-between items-center bg-background/50 backdrop-blur sticky top-0 z-10 border-b" style={{ borderColor: palette.colors.secondary }}>
                                <span className="font-bold">Vikram</span>
                                <div className="flex gap-2">
                                    {device !== "mobile" && <span className="text-xs opacity-50">Home About Contact</span>}
                                    <div className="w-6 h-6 bg-current opacity-20 rounded" />
                                </div>
                            </div>
                        )}

                        <div className="flex-1 overflow-y-auto scrollbar-hide p-6 space-y-8">
                            {/* Hero */}
                            {designState.wireframe.includes("hero") ? (
                                <div className="text-center space-y-4 py-8">
                                    <h1 className="text-2xl font-bold leading-tight" style={{ color: palette.colors.text }}>Helping Startups Scale with Confidence</h1>
                                    <p className="opacity-70 text-sm max-w-sm mx-auto">Expert consulting for Series A founders.</p>
                                    <button className="px-6 py-2 rounded text-white text-sm" style={{ backgroundColor: palette.colors.primary }}>Get Started</button>
                                </div>
                            ) : (
                                <div className="h-40 flex items-center justify-center border-2 border-dashed opacity-20 rounded">Missing Hero</div>
                            )}

                            {/* Content Columns (Responsive Check) */}
                            <div className={`grid gap-4 ${device === "mobile" ? "grid-cols-1" : "grid-cols-3"}`}>
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="bg-current opacity-5 rounded p-4 h-24"></div>
                                ))}
                            </div>
                        </div>

                    </motion.div>
                </div>

            </div>

            <div className="flex justify-end pt-4">
                <button
                    onClick={onContinue}
                    className="px-8 py-4 bg-primary text-primary-foreground font-display font-medium rounded-lg shadow-lg hover:shadow-primary/20 transition-all hover:bg-primary/90"
                >
                    Continue to Reflection →
                </button>
            </div>
        </div>
    );
};

// ============================================
// SCREEN 7: CONSEQUENCES (The Impact)
// ============================================

interface ConsequencesScreenProps {
    onComplete: () => void;
    designState: DesignState;
}

const ConsequencesScreen = ({ onComplete, designState }: ConsequencesScreenProps) => {
    const { setDesignConfiguration } = useSDLC();

    // 1. Calculate Dev Time
    const navOption = NAV_OPTIONS.find(n => n.id === designState.navigation) || NAV_OPTIONS[0];
    const baseDevTime = 14;
    const finalDevTime = baseDevTime + navOption.devTimeDays;

    // 2. Calculate Conversion Rate
    const formFriction = designState.forms.reduce((acc, id) => {
        const field = AVAILABLE_FIELDS.find(f => f.id === id);
        return acc + (field?.frictionPoints || 0);
    }, 0);

    // Trust score from wireframe
    const hasTrust = designState.wireframe.includes("testimonials") || designState.wireframe.includes("features");
    const hasClarity = designState.wireframe.includes("hero") && designState.wireframe.includes("services");

    let conversionRate = 3.5; // Industry avg
    if (hasTrust) conversionRate += 1.0;
    if (hasClarity) conversionRate += 1.5;
    // Friction penalty: -0.1% for every 5 friction points
    conversionRate = Math.max(0.5, conversionRate - (formFriction / 50));

    // 3. User Satisfaction (UX Score)
    const palette = PALETTES.find(p => p.id === designState.palette) || PALETTES[0];
    const accessibilityScore = palette.accessibilityScore;
    const thumbScore = navOption.thumbZoneScore;

    const uxScore = Math.round((accessibilityScore + thumbScore) / 2);

    return (
        <div className="space-y-8 max-w-5xl mx-auto">
            <StoryContext
                step={7}
                totalSteps={8}
                title="Launch Day Report"
                subtitle="Vikram is reviewing your design choices."
                why="Lesson: Design isn't art. It's a series of trade-offs between Business, Tech, and User needs."
            />

            <div className="grid md:grid-cols-3 gap-6">

                {/* CARD 1: TIME TO MARKET */}
                <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl">📅</div>
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">Time to Market</h3>
                    <div className="text-4xl font-bold mb-1">{finalDevTime} Days</div>
                    <p className="text-sm text-muted-foreground mb-4">Total Dev Effort</p>

                    <div className="space-y-2 text-xs border-t border-border pt-4">
                        <div className="flex justify-between">
                            <span>Base Build</span>
                            <span>14 Days</span>
                        </div>
                        <div className="flex justify-between font-semibold text-primary">
                            <span>{navOption.label}</span>
                            <span>+{navOption.devTimeDays} BOE</span>
                        </div>
                    </div>
                </div>

                {/* CARD 2: CONVERSION RATE */}
                <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl">📈</div>
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">Proj. Conversion</h3>
                    <div className={`text-4xl font-bold mb-1 ${conversionRate > 4 ? "text-green-500" : conversionRate > 2 ? "text-yellow-500" : "text-red-500"}`}>
                        {conversionRate.toFixed(1)}%
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">Visitor-to-Lead</p>

                    <div className="space-y-2 text-xs border-t border-border pt-4">
                        <div className="flex justify-between text-green-600">
                            <span>Trust & Clarity</span>
                            <span>+{hasTrust && hasClarity ? "2.5" : "0"}%</span>
                        </div>
                        <div className="flex justify-between text-red-500">
                            <span>Form Friction</span>
                            <span>-{(formFriction / 50).toFixed(1)}%</span>
                        </div>
                    </div>
                </div>

                {/* CARD 3: UX SCORE */}
                <div className="bg-card border border-border rounded-xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl">❤️</div>
                    <h3 className="text-lg font-medium text-muted-foreground mb-2">User Satisfaction</h3>
                    <div className={`text-4xl font-bold mb-1 ${uxScore > 80 ? "text-green-500" : uxScore > 60 ? "text-yellow-500" : "text-red-500"}`}>
                        {uxScore}/100
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">NPS Predictor</p>

                    <div className="space-y-2 text-xs border-t border-border pt-4">
                        <div className="flex justify-between">
                            <span>Accessibility</span>
                            <span className={accessibilityScore > 70 ? "text-green-500" : "text-red-500"}>{accessibilityScore}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Thumb Zone</span>
                            <span className={thumbScore > 70 ? "text-green-500" : "text-red-500"}>{thumbScore}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* FINAL NARRATIVE */}
            <div className="bg-muted/30 border border-border rounded-xl p-8 text-center space-y-4">
                <h2 className="text-2xl font-bold tracking-tight">
                    {uxScore > 80 && conversionRate > 3
                        ? "🚀 Ready for Lift-off!"
                        : "⚠️ Risks Detected"}
                </h2>
                <p className="max-w-2xl mx-auto text-muted-foreground">
                    {uxScore > 80 && conversionRate > 3
                        ? "You've balanced user needs (Accessibility, Reachability) with business goals (Conversion). Vikram is impressed."
                        : conversionRate < 2
                            ? "Your form is too long or your layout lacks trust. Users remain unconvinced despite the effort."
                            : "The site is functional, but usability issues (Contrast/Thumb Zone) might hurt retention."}
                </p>

                <button
                    onClick={() => {
                        // Save design state to global context for next phase
                        setDesignConfiguration(designState);
                        // Navigate to takeaway instead of completing immediately
                        onComplete();
                    }}
                    className="px-8 py-4 bg-primary text-primary-foreground font-display font-medium rounded-full shadow-xl hover:shadow-primary/20 transition-all hover:scale-105 mt-6"
                >
                    Review Key Takeaways →
                </button>
            </div>
        </div>
    );
};

// ============================================
// MAIN COMPONENT
// ============================================

interface DesignPhaseNewProps {
    onComplete: () => void;
    initialScreen?: DesignScreen;
}

export interface DesignState {
    wireframe: string[]; // List of component IDs
    palette: string;
    typography: "sans" | "serif";
    navigation: NavigationType;
    forms: string[];
}

const INITIAL_DESIGN_STATE: DesignState = {
    wireframe: [], // Start empty as requested
    palette: "trust-blue",
    typography: "sans",
    navigation: "simple-bar",
    forms: ["name", "email"]
};

export const DesignPhaseNew = ({ onComplete, initialScreen }: DesignPhaseNewProps) => {
    const [currentScreen, setCurrentScreen] = useState<DesignScreen>(initialScreen || "storybridge");
    const [designState, setDesignState] = useState<DesignState>(INITIAL_DESIGN_STATE);

    const goToNextScreen = useCallback(() => {
        const currentIndex = DESIGN_SCREEN_ORDER.indexOf(currentScreen);
        if (currentIndex < DESIGN_SCREEN_ORDER.length - 1) {
            setCurrentScreen(DESIGN_SCREEN_ORDER[currentIndex + 1]);
        } else {
            onComplete();
        }
    }, [currentScreen, onComplete]);

    // Handle wireframe interactions
    const addComponent = (id: string) => {
        setDesignState(prev => ({
            ...prev,
            wireframe: [...prev.wireframe, id]
        }));
    };

    const removeComponent = (id: string) => {
        setDesignState(prev => ({
            ...prev,
            wireframe: prev.wireframe.filter(c => c !== id)
        }));
    };

    const reorderComponents = (start: number, end: number) => {
        // Placeholder for drag-and-drop reordering logic
    };

    // Handle styling interactions
    const setPalette = (id: string) => {
        setDesignState(prev => ({ ...prev, palette: id }));
    };

    const setTypography = (type: "sans" | "serif") => {
        setDesignState(prev => ({ ...prev, typography: type }));
    };

    const setNavigation = (nav: NavigationType) => {
        setDesignState(prev => ({ ...prev, navigation: nav }));
    };

    const addField = (id: string) => {
        setDesignState(prev => ({ ...prev, forms: [...prev.forms, id] }));
    };

    const removeField = (id: string) => {
        setDesignState(prev => ({ ...prev, forms: prev.forms.filter(f => f !== id) }));
    };

    const getWrapperStage = (): "context" | "interaction" | "reflection" => {
        if (currentScreen === "storybridge") return "context";
        if (currentScreen === "reflection" || currentScreen === "consequence") return "reflection";
        return "interaction";
    };

    return (
        <Layer2Wrapper stage={getWrapperStage()} phase="Design">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentScreen}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {currentScreen === "storybridge" && (
                        <StoryBridgeScreen onContinue={goToNextScreen} />
                    )}

                    {currentScreen === "wireframing" && (
                        <WireframingScreen
                            onContinue={goToNextScreen}
                            addedComponents={designState.wireframe}
                            onAddComponent={addComponent}
                            onRemoveComponent={removeComponent}
                            onReorderComponents={reorderComponents}
                        />
                    )}

                    {currentScreen === "visualdesign" && (
                        <VisualDesignScreen
                            onContinue={goToNextScreen}
                            currentPalette={designState.palette}
                            currentTypography={designState.typography}
                            wireframeComponents={designState.wireframe}
                            onSetPalette={setPalette}
                            onSetTypography={setTypography}
                        />
                    )}

                    {currentScreen === "navigation" && (
                        <NavigationScreen
                            onContinue={goToNextScreen}
                            currentNav={designState.navigation}
                            onSetNav={setNavigation}
                            designState={designState}
                        />
                    )}

                    {currentScreen === "forms" && (
                        <FormsScreen
                            onContinue={goToNextScreen}
                            currentFields={designState.forms}
                            onAddField={addField}
                            onRemoveField={removeField}
                            designState={designState}
                        />
                    )}

                    {currentScreen === "testing" && (
                        <TestingScreen
                            onContinue={goToNextScreen}
                            designState={designState}
                        />
                    )}

                    {currentScreen === "consequence" && ( // Using 'consequence' to match DesignScreen type
                        <ConsequencesScreen
                            onComplete={goToNextScreen}
                            designState={designState}
                        />
                    )}

                    {currentScreen === "takeaway" && (
                        <TakeawayScreen onComplete={onComplete} />
                    )}

                    {/* Placeholders for future screens */}
                    {!["storybridge", "wireframing", "visualdesign", "navigation", "forms", "testing", "consequence", "takeaway"].includes(currentScreen) && (
                        <div className="text-center p-10">
                            <h2 className="text-2xl text-foreground">Work in Progress</h2>
                            <p className="text-muted-foreground mt-2">Screen: {currentScreen}</p>
                            <button onClick={goToNextScreen} className="mt-4 px-4 py-2 bg-secondary rounded">
                                Skip (Dev)
                            </button>
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </Layer2Wrapper>
    );
};

// ============================================
// SCREEN 8: TAKEAWAY (Key Lessons)
// ============================================

const TakeawayScreen = ({ onComplete }: { onComplete: () => void }) => {
    const lessons = [
        {
            icon: "🏗️",
            title: "Structure > Aesthetics",
            desc: "A pretty layout fails if it doesn't provide Clarity (Understanding), Credibility (Trust), or Conversion (Action).",
            rule: "The Three Pillars Rule"
        },
        {
            icon: "👁️",
            title: "Accessibility is Baseline",
            desc: "Low-contrast text isn't 'sleek', it's invisible to users in sunlight or with vision impairments.",
            rule: "The 4.5:1 Contrast Rule"
        },
        {
            icon: "👍",
            title: "Reachability Matters",
            desc: "Mega Menus connect to everything, but if a thumb can't reach the close button, the user leaves.",
            rule: "The Thumb Zone Rule"
        },
        {
            icon: "📉",
            title: "Data Tax",
            desc: "Every extra field you add (like 'Phone Number') helps Marketing but hurts User Conversion.",
            rule: "The Law of Friction"
        }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <StoryContext
                step={8}
                totalSteps={8}
                title="Design Phase: The Lessons"
                subtitle="What you should take with you to Development"
                why="Design isn't just about pixels. It's about allocating friction."
            />

            <div className="grid md:grid-cols-2 gap-4">
                {lessons.map((lesson, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors group"
                    >
                        <div className="flex items-start gap-4">
                            <div className="text-4xl bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                {lesson.icon}
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-lg text-foreground">{lesson.title}</h3>
                                <div className="text-xs font-bold text-primary uppercase tracking-wider">{lesson.rule}</div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {lesson.desc}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-muted/30 border border-border rounded-xl p-8 text-center space-y-6"
            >
                <div className="max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold mb-2">Ready to Build?</h2>
                    <p className="text-muted-foreground">
                        Your design choices are now set. Next, you will put on the <strong>Developer Hat</strong>.
                        <br />
                        You will see exactly how "Mega Menu" and "Vanilla JS" impact the codebase.
                    </p>
                </div>

                <button
                    onClick={onComplete}
                    className="px-8 py-4 bg-primary text-primary-foreground font-display font-medium rounded-full shadow-lg hover:shadow-primary/20 transition-all hover:scale-105"
                >
                    Enter Development Phase 💻
                </button>
            </motion.div>
        </div>
    );
};
