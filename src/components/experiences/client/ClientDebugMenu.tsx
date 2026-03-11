import { useState } from "react";
import { Menu, X } from "lucide-react";

interface ClientDebugMenuProps {
    currentStep: string;
    onJump: (step: any) => void;
}

export const ClientDebugMenu = ({ currentStep, onJump }: ClientDebugMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);

    // Group steps for clearer navigation
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

    return (
        <>
            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-4 right-4 z-[60] p-2 bg-black/50 backdrop-blur-md rounded-full text-white/50 hover:text-white border border-white/10 transition-colors shadow-lg"
                aria-label="Open Menu"
            >
                <Menu size={20} />
            </button>

            {/* Overlay & Menu */}
            {isOpen && (
                <div className="fixed inset-0 z-[70] bg-black/80 backdrop-blur-sm flex justify-end">
                    {/* Close Area */}
                    <div className="flex-1" onClick={() => setIsOpen(false)} />

                    {/* Menu Panel */}
                    <div className="w-80 h-full bg-slate-950 border-l border-white/10 flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300">
                        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/40">
                            <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Experience Controller</h3>
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-6">
                            {sections.map((section, idx) => (
                                <div key={idx}>
                                    <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3 border-b border-gray-800 pb-1">
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
                                                className={`w-full text-left px-3 py-2 text-xs rounded transition-colors border-l-2 ${currentStep === step.id
                                                        ? "bg-indigo-500/10 text-indigo-300 border-indigo-500 font-medium"
                                                        : "border-transparent text-gray-400 hover:bg-white/5 hover:text-white hover:border-gray-600"
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
