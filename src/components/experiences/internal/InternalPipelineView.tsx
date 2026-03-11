import { motion } from "framer-motion";
import { useState } from "react";
import { Designation } from "./DesignationSelect";

type FrictionPhase = "strategy" | "definition" | "blueprint" | "build" | "gate";

interface InternalPipelineViewProps {
    role: Designation;
    onBack: () => void;
    onSelectFriction: (id: string) => void;
}

// Data Structure covering the 20+ frictions
const PIPELINE_DATA: {
    id: FrictionPhase;
    title: string;
    description: string;
    frictions: {
        id: string;
        title: string;
        role: Designation[];
        description: string;
        impact: string;
    }[];
}[] = [
        {
            id: "strategy",
            title: "Phase 1: The Promise",
            description: "Where expectations are set (and broken).",
            frictions: [
                {
                    id: "sales_pitch",
                    title: "The Signal vs Noise",
                    role: ["sales"],
                    description: "Spamming the client with 'Capabilities' vs Diagnosing the Pain.",
                    impact: "Ignored. You become just another vendor."
                },
                {
                    id: "vague_north",
                    title: "The Vague True North",
                    role: ["strategy"],
                    description: "'We want to be the Uber of Pet Food.' (No metrics defined).",
                    impact: "Directionless Build. Team builds unconnected features."
                },
                {
                    id: "solutioning",
                    title: "The Solutioning",
                    role: ["strategy", "crm"], // Client often drives this via Strategy/CRM
                    description: "Prescribing HOW ('Make it pop') instead of WHAT ('Improve trust').",
                    impact: "Team builds features, not value."
                }
            ]
        },
        {
            id: "definition",
            title: "Phase 2: The Definition",
            description: "Turning promises into requirements.",
            frictions: [
                {
                    id: "yes_trap",
                    title: "The 'Yes' Trap",
                    role: ["sales"],
                    description: "'Can we add X? Yes.' (Values closing over delivery).",
                    impact: "Scope Creep. Team burns out to deliver magic."
                },
                {
                    id: "dead_cat",
                    title: "The Dead Cat (Handover)",
                    role: ["sales"],
                    description: "Dumping a 50-page PDF on the PM vs Transferring Context.",
                    impact: "Velocity Loss. Delivery team starts with zero understanding."
                },
                {
                    id: "doormat_dynamics",
                    title: "The 'Doormat' Dynamics",
                    role: ["crm"],
                    description: "Fearing the client; accepting every 'Just one small tweak' email.",
                    impact: "Death by 1000 Cuts. Team burnout; timeline slip."
                },
                {
                    id: "traceability_gap",
                    title: "The Traceability Gap",
                    role: ["ba"],
                    description: "Writing requirements that don't map back to a User/Biz Goal.",
                    impact: "Zombie Features. Building things nobody needs."
                },
                {
                    id: "happy_path_doc",
                    title: "The Happy Path Doc",
                    role: ["ba", "pm"],
                    description: "Documenting only the success flow. Ignoring 'User forgot password'.",
                    impact: "Dev Blockers. Dev stops mid-sprint to ask 'What now?'."
                },
                {
                    id: "hippo_effect",
                    title: "The HiPPO Effect",
                    role: ["strategy", "pm"], // Leadership often flows through PM
                    description: "'My wife thinks the logo should be bigger.' (Ignoring data).",
                    impact: "Morale Crash. Data-driven team becomes order-takers."
                },
                {
                    id: "feature_factory",
                    title: "The Feature Factory",
                    role: ["pm"],
                    description: "Converting roadmaps into 'Output lists' (Ship X, Y, Z) vs 'Outcome lists'.",
                    impact: "Bloatware. App is full of features; retention is 0%."
                },
                {
                    id: "telephone_game",
                    title: "The Telephone Game",
                    role: ["pm"],
                    description: "Translating Client -> Sales -> PM -> Team. Meaning moves from 'Help me' to 'Build a button'.",
                    impact: "Solutioning. Building the wrong solution to the right problem."
                }
            ]
        },
        {
            id: "blueprint",
            title: "Phase 3: The Blueprint",
            description: "Visualizing the solution.",
            frictions: [
                {
                    id: "dribbble_effect",
                    title: "The Dribbble Effect",
                    role: ["designer"],
                    description: "'I made the font light grey because it looks clean.'",
                    impact: "A11y Fail. Users outside cannot read it."
                },
                {
                    id: "rogue_artist",
                    title: "The Rogue Artist",
                    role: ["designer"],
                    description: "Creating a NEW button style instead of using the Design System.",
                    impact: "Inconsistency. App looks fragmented; Dev code doubles."
                },
                {
                    id: "static_handover",
                    title: "The Static Handover",
                    role: ["designer"],
                    description: "Figma is static. 'How does this modal close? Does it slide?'",
                    impact: "Dev Guesswork. Implementation feels cheap/janky."
                },
                {
                    id: "lorem_ipsum",
                    title: "Lorem Ipsum Design",
                    role: ["designer"],
                    description: "Designing with perfect 5-word titles. Real data has 20 words.",
                    impact: "Layout Break. Production UI looks broken."
                }
            ]
        },
        {
            id: "build",
            title: "Phase 4: The Build",
            description: "Constructing the reality.",
            frictions: [
                {
                    id: "estimation_lie",
                    title: "The Estimation Lie",
                    role: ["developer"],
                    description: "'I can do it in 2 days.' (Ideally). Ignoring meetings/bugs.",
                    impact: "Crunch Time. Late nights; buggy code."
                },
                {
                    id: "gold_plating",
                    title: "The Gold Plating",
                    role: ["developer"],
                    description: "Refactoring code for 'purity' instead of shipping value.",
                    impact: "Timeline Slip. Perfect code that nobody uses."
                },
                {
                    id: "localhost_illusion",
                    title: "The Localhost Illusion",
                    role: ["developer"],
                    description: "Testing on an M1 Max with Fiber internet.",
                    impact: "Performance Tax. 3G users bounce immediately."
                },
                {
                    id: "context_switch",
                    title: "The Context Switch",
                    role: ["developer"],
                    description: "PM interruptions every 30 mins. 'Quick question.'",
                    impact: "IQ Drop. Code quality plummets due to lack of flow."
                }
            ]
        },
        {
            id: "gate",
            title: "Phase 5: The Gate",
            description: "Verifying the logic.",
            frictions: [
                {
                    id: "literal_pass",
                    title: "The Literal Pass",
                    role: ["qa"],
                    description: "'It works as described.' (But the description was bad UX).",
                    impact: "Broken Experience. Bug-free garbage."
                },
                {
                    id: "env_parity",
                    title: "The Env Parity Gap",
                    role: ["qa"],
                    description: "Staging data != Production data.",
                    impact: "Leakage. Bugs appear only in Prod."
                },
                {
                    id: "last_mile",
                    title: "The Last Mile Crunch",
                    role: ["qa", "pm"],
                    description: "QA gets the build 2 hours before release.",
                    impact: "Risk. Critical bugs missed due to rush."
                }
            ]
        }
    ];

export const InternalPipelineView = ({ role, onBack, onSelectFriction }: InternalPipelineViewProps) => {
    return (
        <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md p-6 border-b border-white/10 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="text-gray-400 hover:text-white transition-colors text-sm font-mono"
                    >
                        ← Change Role
                    </button>
                    <h1 className="text-xl font-bold font-display">
                        The Friction Pipeline: <span className="text-blue-400 capitalize">{role === "ba" ? "Business Analyst" : role === "pm" ? "Product Mgr" : role === "qa" ? "QA Engineer" : role === "crm" ? "Client Partner" : role}</span>
                    </h1>
                </div>
                <div className="text-xs text-gray-500 font-mono hidden md:block">
                    SCROLL TO EXPLORE ➔
                </div>
            </div>

            {/* Horizontal Scroll Area */}
            <div className="pt-32 pb-20 px-12 flex gap-12 overflow-x-auto min-w-full">
                {PIPELINE_DATA.map((phase, i) => (
                    <motion.div
                        key={phase.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex-shrink-0 w-[400px] flex flex-col gap-6"
                    >
                        {/* Phase Header */}
                        <div className="border-b border-white/20 pb-4">
                            <div className="text-xs font-mono text-gray-500 mb-1 uppercase tracking-widest">Phase 0{i + 1}</div>
                            <h2 className="text-2xl font-bold font-display mb-2">{phase.title}</h2>
                            <p className="text-sm text-gray-400 font-light">{phase.description}</p>
                        </div>

                        {/* Frictions List */}
                        <div className="flex flex-col gap-4">
                            {phase.frictions.map((friction) => {
                                const isMyRole = friction.role.includes(role);
                                return (
                                    <div
                                        key={friction.id}
                                        className={`relative p-5 rounded-lg border transition-all duration-300 ${isMyRole
                                            ? "bg-blue-500/10 border-blue-500/50 hover:bg-blue-500/20 cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.1)] group"
                                            : "bg-white/5 border-white/5 opacity-50 hover:opacity-80"
                                            }`}
                                    >
                                        {/* Tag */}
                                        <div className="flex gap-2 mb-3">
                                            {friction.role.map(r => (
                                                <span key={r} className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${isMyRole ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"
                                                    }`}>
                                                    {r}
                                                </span>
                                            ))}
                                        </div>

                                        <h3 className={`font-bold text-lg mb-2 ${isMyRole ? "text-white group-hover:text-blue-200" : "text-gray-300"}`}>
                                            {friction.title}
                                        </h3>
                                        <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                                            {friction.description}
                                        </p>

                                        {/* Impact Section */}
                                        <div className={`text-xs pl-3 border-l-2 ${isMyRole ? "border-blue-500/50 text-blue-200" : "border-white/10 text-gray-500"}`}>
                                            <span className="font-bold block mb-0.5 uppercase tracking-widest text-[9px]">Downstream Impact</span>
                                            {friction.impact}
                                        </div>

                                        {/* Interactive Element for User's Role */}
                                        {isMyRole && (
                                            <div className="absolute top-4 right-4 animate-pulse">
                                                <span className="flex h-3 w-3">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                                                </span>
                                            </div>
                                        )}

                                        {isMyRole && (
                                            <div className="mt-4 pt-4 border-t border-blue-500/20 flex justify-end">
                                                <button
                                                    onClick={() => onSelectFriction(friction.id)}
                                                    className="text-xs font-bold text-blue-400 hover:text-white transition-colors flex items-center gap-1"
                                                >
                                                    FIX THIS FRICTION ➔
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>
                ))}

                {/* Padding at end */}
                <div className="w-24 flex-shrink-0" />
            </div>
        </div>
    );
};
