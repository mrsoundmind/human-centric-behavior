import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layer2Step, DiscoveryScreen, RequirementsScreen, DesignScreen, DevScreen, TestScreen, LaunchScreen, MaintenanceStage, DISCOVERY_SCREENS, REQUIREMENTS_SCREENS, DESIGN_SCREENS, DEV_SCREENS, TEST_SCREENS, LAUNCH_SCREENS, MAINTENANCE_STAGES } from "../experiences/layer2/Layer2Controller";

type ExperienceStep =
    | "intro"
    | "door"
    | "silent-button"
    | "confusing-form"
    | "delayed-response"
    | "pattern-pause"
    | "bridge"
    | "layer15"
    | "layer2"
    | "internal-training"
    | "internal-intro"
    | "onboarding-brief"
    | "onboarding-war-room"
    | "onboarding-system-reaction"
    | "onboarding-decision-lens"
    | "onboarding-identity"
    | "designation"
    | "sales-journey"
    | "pipeline";

interface DebugMenuProps {
    currentStep: string;
    onJumpToStep: (step: ExperienceStep) => void;
    onJumpToLayer2: (
        step: Layer2Step,
        disc?: DiscoveryScreen,
        req?: RequirementsScreen,
        des?: DesignScreen,
        dev?: DevScreen,
        test?: TestScreen,
        launch?: LaunchScreen,
        maint?: MaintenanceStage
    ) => void;
}

export const DebugMenu = ({ currentStep, onJumpToStep, onJumpToLayer2 }: DebugMenuProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<"layer1" | "layer2" | "internal">("layer2");

    const LAYER1_STEPS: { id: ExperienceStep; label: string }[] = [
        { id: "intro", label: "Intro" },
        { id: "door", label: "1. The Norman Door" },
        { id: "silent-button", label: "2. The Silent Button" },
        { id: "confusing-form", label: "3. The Confusing Form" },
        { id: "delayed-response", label: "4. The Lag" },
        { id: "pattern-pause", label: "5. Pattern Pause" },
        { id: "bridge", label: "6. The Bridge" },
        { id: "layer15", label: "7. Layer 1.5 (Patterns)" },
    ];

    return (
        <>
            {/* trigger */}
            <div className="fixed bottom-4 left-4 z-50">
                <button
                    onClick={() => setIsOpen(true)}
                    className="px-4 py-2 bg-black/80 backdrop-blur text-white text-xs font-mono rounded-full border border-white/10 hover:bg-white/10 transition-colors shadow-lg flex items-center gap-2"
                >
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    DEBUG MENU
                </button>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
                        >
                            {/* Header */}
                            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                                <h2 className="text-sm font-bold font-mono text-gray-400">DEVELOPER CONTROLS</h2>
                                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white">Esc</button>
                            </div>

                            {/* Tabs */}
                            <div className="flex border-b border-white/10">
                                <button
                                    onClick={() => setActiveTab("layer1")}
                                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === "layer1" ? "bg-white/10 text-white border-b-2 border-blue-500" : "text-gray-500 hover:text-gray-300"}`}
                                >
                                    Layer 1 (The Feel)
                                </button>
                                <button
                                    onClick={() => setActiveTab("layer2")}
                                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === "layer2" ? "bg-white/10 text-white border-b-2 border-blue-500" : "text-gray-500 hover:text-gray-300"}`}
                                >
                                    Layer 2 (The Project)
                                </button>
                                <button
                                    onClick={() => setActiveTab("internal")}
                                    className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors ${activeTab === "internal" ? "bg-white/10 text-white border-b-2 border-blue-500" : "text-gray-500 hover:text-gray-300"}`}
                                >
                                    Internal Training
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">

                                {/* LAYER 1 CONTENT */}
                                {activeTab === "layer1" && (
                                    <div className="grid grid-cols-2 gap-3">
                                        {LAYER1_STEPS.map((step) => (
                                            <button
                                                key={step.id}
                                                onClick={() => {
                                                    onJumpToStep(step.id);
                                                    setIsOpen(false);
                                                }}
                                                className={`text-left p-3 rounded-lg border text-sm transition-all ${currentStep === step.id ? "bg-blue-500/20 border-blue-500/50 text-white" : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"}`}
                                            >
                                                {step.label}
                                            </button>
                                        ))}

                                        <div className="col-span-2 mt-4 pt-4 border-t border-white/10">
                                            <a href="/client" target="_blank" className="block text-center p-3 rounded-lg border border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/20 transition-all text-sm font-bold">
                                                LAUNCH CLIENT MODE ↗
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {/* LAYER 2 CONTENT */}
                                {activeTab === "layer2" && (
                                    <div className="space-y-6">

                                        {/* INTRO */}
                                        <button
                                            onClick={() => { onJumpToLayer2("intro"); setIsOpen(false); }}
                                            className="w-full text-left p-3 rounded bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 text-sm font-bold tracking-wide"
                                        >
                                            START PROJECT (Layer 2 Intro)
                                        </button>

                                        {/* PHASE 1: DISCOVERY */}
                                        <div className="space-y-2 pl-4 border-l border-white/10">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Phase 1: Discovery</h3>
                                                <button onClick={() => { onJumpToLayer2("discovery"); setIsOpen(false); }} className="text-[10px] text-gray-500 hover:text-white uppercase transition-colors">Start Phase ➔</button>
                                            </div>
                                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                                                {DISCOVERY_SCREENS.map((s) => (
                                                    <button key={s} onClick={() => { onJumpToLayer2("discovery", s); setIsOpen(false); }} className="text-left px-2 py-1.5 rounded bg-white/5 hover:bg-white/10 text-[11px] text-gray-400 border border-white/5 truncate transition-colors">
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* PHASE 2: REQUIREMENTS */}
                                        <div className="space-y-2 pl-4 border-l border-white/10">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Phase 2: Requirements</h3>
                                                <button onClick={() => { onJumpToLayer2("requirements"); setIsOpen(false); }} className="text-[10px] text-gray-500 hover:text-white uppercase transition-colors">Start Phase ➔</button>
                                            </div>
                                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                                                {REQUIREMENTS_SCREENS.map((s) => (
                                                    <button key={s} onClick={() => { onJumpToLayer2("requirements", undefined, s); setIsOpen(false); }} className="text-left px-2 py-1.5 rounded bg-white/5 hover:bg-white/10 text-[11px] text-gray-400 border border-white/5 truncate transition-colors">
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* PHASE 3: DESIGN */}
                                        <div className="space-y-2 pl-4 border-l border-white/10">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Phase 3: Design</h3>
                                                <button onClick={() => { onJumpToLayer2("design"); setIsOpen(false); }} className="text-[10px] text-gray-500 hover:text-white uppercase transition-colors">Start Phase ➔</button>
                                            </div>
                                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                                                {DESIGN_SCREENS.map((s) => (
                                                    <button key={s} onClick={() => { onJumpToLayer2("design", undefined, undefined, s); setIsOpen(false); }} className="text-left px-2 py-1.5 rounded bg-white/5 hover:bg-white/10 text-[11px] text-gray-400 border border-white/5 truncate transition-colors">
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* PHASE 4: DEVELOPMENT */}
                                        <div className="space-y-2 pl-4 border-l border-white/10">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Phase 4: Development</h3>
                                                <button onClick={() => { onJumpToLayer2("development"); setIsOpen(false); }} className="text-[10px] text-gray-500 hover:text-white uppercase transition-colors">Start Phase ➔</button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                {DEV_SCREENS.map((s) => (
                                                    <button key={s} onClick={() => { onJumpToLayer2("development", undefined, undefined, undefined, s); setIsOpen(false); }} className="text-left px-2 py-1.5 rounded bg-white/5 hover:bg-white/10 text-[11px] text-gray-400 border border-white/5 truncate transition-colors">
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* PHASE 5: TESTING */}
                                        <div className="space-y-2 pl-4 border-l border-white/10">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Phase 5: Testing</h3>
                                                <button onClick={() => { onJumpToLayer2("testing"); setIsOpen(false); }} className="text-[10px] text-gray-500 hover:text-white uppercase transition-colors">Start Phase ➔</button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                {TEST_SCREENS.map((s) => (
                                                    <button key={s} onClick={() => { onJumpToLayer2("testing", undefined, undefined, undefined, undefined, s); setIsOpen(false); }} className="text-left px-2 py-1.5 rounded bg-white/5 hover:bg-white/10 text-[11px] text-gray-400 border border-white/5 truncate transition-colors">
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* PHASE 6: LAUNCH */}
                                        <div className="space-y-2 pl-4 border-l border-white/10">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Phase 6: Launch</h3>
                                                <button onClick={() => { onJumpToLayer2("launch"); setIsOpen(false); }} className="text-[10px] text-gray-500 hover:text-white uppercase transition-colors">Start Phase ➔</button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                {LAUNCH_SCREENS.map((s) => (
                                                    <button key={s} onClick={() => { onJumpToLayer2("launch", undefined, undefined, undefined, undefined, undefined, s); setIsOpen(false); }} className="text-left px-2 py-1.5 rounded bg-white/5 hover:bg-white/10 text-[11px] text-gray-400 border border-white/5 truncate transition-colors">
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* PHASE 7: MAINTENANCE */}
                                        <div className="space-y-2 pl-4 border-l border-white/10">
                                            <div className="flex items-center justify-between">
                                                <h3 className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">Phase 7: Maintenance</h3>
                                                <button onClick={() => { onJumpToLayer2("maintenance"); setIsOpen(false); }} className="text-[10px] text-gray-500 hover:text-white uppercase transition-colors">Start Phase ➔</button>
                                            </div>
                                            <div className="grid grid-cols-2 gap-2">
                                                {MAINTENANCE_STAGES.map((s) => (
                                                    <button key={s} onClick={() => { onJumpToLayer2("maintenance", undefined, undefined, undefined, undefined, undefined, undefined, s); setIsOpen(false); }} className="text-left px-2 py-1.5 rounded bg-white/5 hover:bg-white/10 text-[11px] text-gray-400 border border-white/5 truncate transition-colors">
                                                        {s}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* COMPLETE */}
                                        <button
                                            onClick={() => { onJumpToStep("internal-training"); setIsOpen(false); }}
                                            className="w-full text-left p-3 rounded bg-green-500/10 hover:bg-green-500/20 text-green-300 border border-green-500/30 text-sm font-bold tracking-wide mt-4"
                                        >
                                            Project Complete (Go to Internal Training) ➔
                                        </button>

                                    </div>
                                )}

                                {/* INTERNAL CONTENT */}
                                {activeTab === "internal" && (
                                    <div className="space-y-4">
                                        <div className="p-4 bg-blue-900/10 border border-blue-500/20 rounded-lg">
                                            <h3 className="text-xs font-bold text-blue-400 mb-3 uppercase tracking-wider">Internal Onboarding</h3>
                                            <div className="grid grid-cols-2 gap-2">
                                                <button onClick={() => { onJumpToStep("internal-intro"); setIsOpen(false); }} className="text-left px-3 py-2 rounded bg-white/5 hover:bg-white/10 text-xs text-gray-300">Intro Screen</button>
                                                <button onClick={() => { onJumpToStep("onboarding-brief"); setIsOpen(false); }} className="text-left px-3 py-2 rounded bg-white/5 hover:bg-white/10 text-xs text-gray-300">Project Brief</button>
                                                <button onClick={() => { onJumpToStep("onboarding-war-room"); setIsOpen(false); }} className="text-left px-3 py-2 rounded bg-white/5 hover:bg-white/10 text-xs text-gray-300">Client Feedback</button>
                                                <button onClick={() => { onJumpToStep("onboarding-system-reaction"); setIsOpen(false); }} className="text-left px-3 py-2 rounded bg-white/5 hover:bg-white/10 text-xs text-gray-300">System Reaction</button>
                                                <button onClick={() => { onJumpToStep("onboarding-decision-lens"); setIsOpen(false); }} className="text-left px-3 py-2 rounded bg-white/5 hover:bg-white/10 text-xs text-gray-300">Decision Lens</button>
                                                <button onClick={() => { onJumpToStep("onboarding-identity"); setIsOpen(false); }} className="text-left px-3 py-2 rounded bg-white/5 hover:bg-white/10 text-xs text-gray-300">Identity Reflection</button>
                                            </div>
                                        </div>

                                        <div className="p-4 bg-purple-900/10 border border-purple-500/20 rounded-lg">
                                            <h3 className="text-xs font-bold text-purple-400 mb-3 uppercase tracking-wider">Role & Journey</h3>
                                            <div className="grid grid-cols-1 gap-2">
                                                <button onClick={() => { onJumpToStep("designation"); setIsOpen(false); }} className="text-left px-3 py-2 rounded bg-white/5 hover:bg-white/10 text-xs text-gray-300 font-bold">Role Selection</button>
                                                <button onClick={() => { onJumpToStep("sales-journey"); setIsOpen(false); }} className="text-left px-3 py-2 rounded bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold transition-all">Sales Journey (v3.0)</button>
                                                <button onClick={() => { onJumpToStep("pipeline"); setIsOpen(false); }} className="text-left px-3 py-2 rounded bg-white/5 hover:bg-white/10 text-xs text-gray-300">Pipeline View</button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};
