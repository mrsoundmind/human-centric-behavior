import { useState } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/state/ThemeContext";

interface ClientDebugMenuProps {
    currentStep: string;
    onJump: (step: any) => void;
}

export const ClientDebugMenu = ({ currentStep, onJump }: ClientDebugMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();
    const isLight = theme === "light";

    const sections = [
        {
            title: "PHASE 1: THE FUNDAMENTALS",
            steps: [
                { id: "intro", label: "0. Start Screen" },
                { id: "primer_door", label: "1. The Door (Affordance)" },
                { id: "lesson_door", label: "1b. Lesson: Signals" },
                { id: "primer_stove", label: "2. The Stove (Mapping)" },
                { id: "primer_ketchup", label: "3. The Ketchup (Feedback)" },
                { id: "primer_recap", label: ">>> Recap: Empathy" },
            ]
        },
        {
            title: "PHASE 2: THE BUSINESS CASE",
            steps: [
                { id: "business_intro", label: "Intro: The Business Trap" },
                { id: "funnel_bait", label: "4. Bait (The Ad)" },
                { id: "lesson_bait", label: "4b. Lesson: Ad Waste" },
                { id: "funnel_chaos", label: "5. Chaos (Landing Page)" },
                { id: "lesson_chaos", label: "5b. Lesson: Vanity Risk" },
            ]
        },
        {
            title: "PHASE 3: THE FRICTION",
            steps: [
                { id: "funnel_wall", label: "6. The Wall (Popup)" },
                { id: "lesson_wall", label: "6b. Lesson: Brand Trust" },
                { id: "funnel_maze", label: "7. The Maze (Navigation)" },
                { id: "lesson_maze", label: "7b. Lesson: Findability" },
                { id: "funnel_trap", label: "8. The Trap (Form)" },
                { id: "lesson_trap", label: "8b. Lesson: Abandonment" },
            ]
        },
        {
            title: "PHASE 4: THE SOLUTION",
            steps: [
                { id: "revenue_loss", label: ">>> 9. THE LOSS CAUSALITY" },
                { id: "fix_intro", label: "10. The Turnaround Strategy" },
                { id: "good_bait", label: "11. Fix: Relevance" },
                { id: "good_chaos", label: "12. Fix: Clarity" },
                { id: "good_wall", label: "13. Fix: Respect" },
                { id: "good_maze", label: "14. Fix: Findability" },
                { id: "good_trap", label: "15. Fix: Freedom" },
                { id: "revenue_gain", label: ">>> 16. THE REVENUE GAIN" },
            ]
        }
    ];

    const triggerClass = isLight
        ? "fixed top-4 right-4 z-[60] w-11 h-11 bg-white border-[1.5px] border-primary/40 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all shadow-lg shadow-primary/10 group"
        : "fixed top-4 right-4 z-[60] w-11 h-11 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full flex items-center justify-center hover:bg-white/20 transition-all shadow-xl group";

    const iconClass = isLight
        ? "w-5 h-5 text-primary group-hover:text-primary-foreground"
        : "w-5 h-5 text-white/70 group-hover:text-white";

    const overlayClass = isLight ? "fixed inset-0 z-[70] bg-foreground/30 backdrop-blur-sm flex justify-end" : "fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex justify-end";

    const panelClass = isLight
        ? "w-80 h-full bg-card border-l border-border flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300"
        : "w-80 h-full bg-slate-950 border-l border-white/10 flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300";

    const headerBarClass = isLight
        ? "p-4 border-b border-border flex items-center justify-between bg-muted/50"
        : "p-4 border-b border-white/5 flex items-center justify-between bg-black/40";

    const headerLabelClass = isLight ? "text-xs font-bold text-primary uppercase tracking-widest" : "text-xs font-bold text-indigo-400 uppercase tracking-widest";
    const closeBtnClass = isLight ? "text-muted-foreground hover:text-foreground" : "text-gray-400 hover:text-white";

    const sectionLabelClass = isLight
        ? "text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3 border-b border-border pb-1"
        : "text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 border-b border-gray-800 pb-1";

    const stepActiveClass = isLight
        ? "bg-primary/10 text-primary border-primary font-medium"
        : "bg-indigo-500/10 text-indigo-300 border-indigo-500 font-medium";

    const stepInactiveClass = isLight
        ? "border-transparent text-muted-foreground hover:bg-primary/5 hover:text-foreground hover:border-border"
        : "border-transparent text-gray-400 hover:bg-white/5 hover:text-white hover:border-gray-600";

    const themeRowClass = isLight
        ? "w-full flex items-center justify-between p-3 rounded-lg hover:bg-primary/5 transition-colors"
        : "w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors";

    const themePillTrack = isLight ? "w-9 h-5 rounded-full p-0.5 bg-primary/25" : "w-9 h-5 rounded-full p-0.5 bg-amber-300/40";

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={triggerClass}
                aria-label="Open Menu"
            >
                <Menu className={iconClass} />
            </button>

            {isOpen && (
                <div className={overlayClass}>
                    <div className="flex-1" onClick={() => setIsOpen(false)} />

                    <div className={panelClass}>
                        <div className={headerBarClass}>
                            <h3 className={headerLabelClass}>Experience Controller</h3>
                            <button onClick={() => setIsOpen(false)} className={closeBtnClass} aria-label="Close menu">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Theme Toggle */}
                        <div className={isLight ? "p-3 border-b border-border" : "p-3 border-b border-white/5"}>
                            <button onClick={toggleTheme} className={themeRowClass}>
                                <div className="flex items-center gap-3">
                                    {isLight ? (
                                        <Moon className="w-4 h-4 text-primary" />
                                    ) : (
                                        <Sun className="w-4 h-4 text-amber-300" />
                                    )}
                                    <div className="text-left">
                                        <div className={isLight ? "text-[13px] font-semibold text-foreground" : "text-[13px] font-semibold text-white/90"}>
                                            {isLight ? "Switch to Dark" : "Switch to Light"}
                                        </div>
                                        <div className={isLight ? "text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5" : "text-[10px] text-white/40 uppercase tracking-widest mt-0.5"}>
                                            Theme · {isLight ? "Light" : "Dark"} mode
                                        </div>
                                    </div>
                                </div>
                                <div className={themePillTrack}>
                                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isLight ? "translate-x-0" : "translate-x-4"}`} />
                                </div>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            {sections.map((section, idx) => (
                                <div key={idx}>
                                    <h4 className={sectionLabelClass}>
                                        {section.title}
                                    </h4>
                                    <div className="space-y-1">
                                        {section.steps.map((step) => (
                                            <button
                                                key={step.id}
                                                onClick={() => {
                                                    onJump(step.id);
                                                    setIsOpen(false);
                                                }}
                                                className={`w-full text-left px-3 py-2 text-xs rounded transition-colors border-l-2 ${
                                                    currentStep === step.id ? stepActiveClass : stepInactiveClass
                                                }`}
                                            >
                                                {step.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
