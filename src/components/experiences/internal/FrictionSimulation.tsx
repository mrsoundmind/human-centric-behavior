import { motion } from "framer-motion";
import { useState } from "react";
import { TimelineBurn } from "./visuals/TimelineBurn";
import { TargetFocus } from "./visuals/TargetFocus";
import { ListeningEQ } from "./visuals/ListeningEQ";
import { Iceberg } from "./visuals/Iceberg";
import { RelayBaton } from "./visuals/RelayBaton";

interface FrictionSimulationProps {
    frictionId: string;
    onComplete: () => void;
    onBack: () => void;
}

export const FrictionSimulation = ({ frictionId, onComplete, onBack }: FrictionSimulationProps) => {
    const [step, setStep] = useState<"intro" | "scenario" | "visual" | "resolution">("intro");

    // DATA MAP
    const SCENARIOS: Record<string, any> = {
        // 0. BUSINESS DEVELOPMENT (Sales)
        "sales_pitch": {
            role: "Business Development",
            title: "The Signal vs. Noise",
            mission: "Stop 'spamming' and start 'solving'. Find the signal in the noise.",
            stakes: "If you pitch too early, you are just another vendor. If you listen, you become a Partner.",
            context: "Lead Gen. You found Vikram's flashy but broken website. You also see Rahul (Marketing) on LinkedIn.",
            prompt: "Who do you contact, and what do you say?",
            choices: [
                { id: "bad", text: "Email Rahul: 'Attached is our AI Capabilities Deck.' (The Safe/Lazy Path)", result: "Ignored. Rahul gets 50 of these a day. You are noise." },
                { id: "good", text: "Email Vikram: 'Your mobile site takes 8s to load. I found the specific code issue.' (The Value Path)", result: "Resonance. Vikram replies in 5 minutes: 'Can you fix it?'" }
            ],
            visualType: "listening_eq",
            uxValue: "User Research: Diagnose the specific pain before you prescribe the generic pill."
        },
        // 1. BUSINESS DEVELOPMENT (Closing)
        "yes_trap": {
            role: "Business Development (Closing)",
            title: "The 'Yes' Trap",
            mission: "Close a deal that won't churn in 3 months. Protect the delivery team.",
            stakes: "Selling a fantasy creates a 'Deployment Nightmare' that kills your future referrals.",
            context: "Contract Negotiation. Vikram says: 'I need a custom AI chatbot that learns our brand voice. Live in 2 weeks.' Rahul nods: 'Yes, we need that.'",
            prompt: "The commission is huge. What do you say?",
            choices: [
                { id: "bad", text: "Say 'Yes, absolutely!' (The Commission)", result: "Disaster. The team burns out trying to build it. It fails. You lose the account." },
                { id: "good", text: "Say 'That's a complex feature. Let's blueprint the backend first.' (The Reality)", result: "Respect. Vikram appreciates the honesty. You close a scoped Phase 1 deal." }
            ],
            visualType: "iceberg",
            uxValue: "Service Blueprinting: Mapping backward from 'Magic' to 'Backend' reveals the true cost of a 'Simple Yes'."
        },
        // 1.5 BUSINESS DEVELOPMENT (Handover)
        "dead_cat": {
            role: "Business Development (Handover)",
            title: "The Dead Cat Throw",
            mission: "Ensure the Delivery Team understands the *Why*, not just the *What*.",
            stakes: "If you just dump data, you lose 2 weeks of velocity. If you transfer context, you gain trust.",
            context: "Deal Closed. Project Manager asks: 'Where are the meeting notes for TechStartup Inc?'",
            prompt: "How do you hand over the project?",
            choices: [
                { id: "bad", text: "Forward the 50-page PDF to the PM. (The Dump)", result: "Failure. PM spends 3 days reading and still misunderstands the goal." },
                { id: "good", text: "Record a 5-min Loom video explaining the 'Why'. (The Context)", result: "Success. PM understands the vision immediately. Kickoff is flawless." }
            ],
            visualType: "relay_baton",
            uxValue: "Context Transfer: Don't just move data. Move understanding."
        },
        // 2. CRM
        // 2. CRM (Client Partner)
        "doormat_dynamics": {
            role: "Client Partner",
            title: "The 'Small Tweak' Trap",
            mission: "Manage client expectations without breaking the team's flow.",
            stakes: "Saying 'yes' to small things causes 'Death by 1000 Cuts'.",
            context: "Mid-Sprint. Vikram (Client) emails you at 10 PM.",
            prompt: "Vikram: 'Hey, I know we locked scope, but can we just make the logo bigger and add a 'Book Now' button to the header? Small tweak.'",
            choices: [
                { id: "bad", text: "Sure thing! I'll ping the team now.", result: "Burnout. The 'tiny' tweak broke the mobile grid. Launch delayed." },
                { id: "good", text: "I'll flag it for next sprint. We can't risk the Friday launch.", result: "Respect. You protected the timeline." }
            ],
            visualType: "timeline_burn"
        },
        // 3. STRATEGY (Client Relationship Partner)
        "vague_north": {
            role: "Client Relationship Partner",
            title: "The Vision Void",
            mission: "Force the client to choose ONE thing, so we actually achieve it.",
            stakes: "If everything is important, nothing is important. The team will burn out building 'features' instead of value.",
            context: "Kickoff Call. Vikram (CEO) is manic. Rahul (Marketing) is taking notes.",
            prompt: "Vikram: 'I want this site to be a viral sensation, a lead gen machine, AND a brand showcase. All by next month.' Rahul looks at you nervously.",
            choices: [
                { id: "bad", text: "Say to Rahul: 'We can try to hit all those goals.' (Pacify)", result: "Chaos. The team splits focus. You launch a mediocre site that does nothing well." },
                { id: "good", text: "Say to Vikram: 'We can only be World Class at ONE of those. Which one pays the bills?' (Focus)", result: "Clarity. Vikram chooses Leads. The team rallies around one metric." }
            ],
            visualType: "target_focus",
            uxValue: "The North Star Metric: The art of strategy is knowing what NOT to do."
        },
        // ... (Other scenarios remain unchanged, can update later)
        // 4. BA
        "traceability_gap": {
            role: "Business Analyst",
            title: "The Traceability Gap",
            context: "Writing requirements for the 'Search' feature.",
            prompt: "How do you document the requirements?",
            choices: [
                { id: "bad", text: "User can search for products.", result: "Vague. Devs build a basic text match. Users fail." },
                { id: "good", text: "User needs to find specific SKUs to re-order quickly (Biz Goal: Retention).", result: "Impact. Devs build 'Recent Orders' search." }
            ],
            visualType: "chain_link"
        },
        // 5. PM
        "happy_path_doc": {
            role: "Product Manager",
            title: "The Happy Path",
            context: "You are writing the PRD for 'User Login'. The deadline is tight.",
            prompt: "Which requirement list do you send to the developers?",
            choices: [
                { id: "bad", text: "1. User enters email. 2. User enters password. 3. Success.", result: "Failure. 20% of users get stuck on errors." },
                { id: "good", text: "Define: Empty State, Loading State, Error State, Success State.", result: "Success. Zero rework." }
            ],
            visualType: "state_matrix"
        },
        // 6. DESIGNER
        "dribbble_effect": {
            role: "Designer",
            title: "The Dribbble Effect",
            context: "Designing the new 'Submit' button.",
            prompt: "Which style do you choose?",
            choices: [
                { id: "bad", text: "Light Grey text on White (Minimalist & Clean).", result: "Inaccessible. 20% of users usually cannot see it." },
                { id: "good", text: "High Contrast Blue (Accessible & Clear).", result: "Usable. Everyone can click." }
            ],
            visualType: "contrast_heatmap"
        },
        // 7. DEVELOPER
        "localhost_illusion": {
            role: "Developer",
            title: "The Localhost Illusion",
            context: "Testing the new animation. It looks buttery smooth on your M1 Max.",
            prompt: "Ready to merge?",
            choices: [
                { id: "bad", text: "Ship it! It works on my machine.", result: "Crash. Mobile users on 3G bounce instantly." },
                { id: "good", text: "Let me limit network to 3G and test again.", result: "Insight. You catch the lag and optimize." }
            ],
            visualType: "network_throttle"
        },
        // 8. QA
        "literal_pass": {
            role: "QA Engineer",
            title: "The Literal Pass",
            context: "Testing a ticket: 'Button should close modal'.",
            prompt: "The button touches the edge of the screen and is hard to click, but it works.",
            choices: [
                { id: "bad", text: "Mark as Passed. It meets requirements.", result: "Frustration. Users mis-click constantly." },
                { id: "good", text: "Fail it. 'Functional but unusable'.", result: "Quality. Design fixes the padding." }
            ],
            visualType: "bug_iceberg"
        },

        // Fallback
        "default": { role: "Unknown", title: "Wait...", context: "Scenario loading...", prompt: "...", choices: [], visualType: "none" }
    };

    const data = SCENARIOS[frictionId] || SCENARIOS["default"];

    const handleChoice = (id: string) => {
        if (id === "good") {
            setStep("visual");
        } else {
            alert(data.choices.find((c: any) => c.id === "bad").result);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center">
            <button onClick={onBack} className="absolute top-8 left-8 text-gray-500 hover:text-white">← Select Role</button>

            <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl w-full"
            >
                {step === "intro" && (
                    <div className="space-y-8 text-center max-w-2xl mx-auto">
                        <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest border border-indigo-500/20">
                            Assignment: {data.role}
                        </div>
                        <h1 className="text-5xl font-bold font-display">{data.title}</h1>

                        <div className="bg-white/5 border border-white/10 p-8 rounded-3xl my-8 text-left space-y-6">
                            <div>
                                <h3 className="text-xs text-gray-500 uppercase tracking-widest mb-2">Your Mission</h3>
                                <p className="text-xl text-white font-medium leading-relaxed">{data.mission || "Navigate the friction points effectively."}</p>
                            </div>
                            <div className="h-px bg-gray-800 w-full" />
                            <div>
                                <h3 className="text-xs text-red-400/70 uppercase tracking-widest mb-2">The Stakes</h3>
                                <p className="text-lg text-gray-400 leading-relaxed">{data.stakes || "Poor choices will negatively impact the project lifecycle."}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setStep("scenario")}
                            className="px-10 py-4 bg-white text-black rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-lg shadow-white/10"
                        >
                            Start Simulation
                        </button>
                    </div>
                )}

                {step === "scenario" && (
                    <div className="space-y-8 text-center">
                        <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest">
                            {data.role} Simulation
                        </div>
                        <h1 className="text-4xl font-bold font-display">{data.title}</h1>
                        <p className="text-xl text-gray-400">{data.context}</p>

                        <div className="bg-white/5 border border-white/10 p-8 rounded-2xl my-8 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
                            <p className="text-2xl font-serif italic text-white leading-relaxed">"{data.prompt}"</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            {data.choices.map((c: any) => (
                                <button
                                    key={c.id}
                                    onClick={() => handleChoice(c.id)}
                                    className="p-6 rounded-xl border border-white/10 hover:bg-blue-600/20 hover:border-blue-500 transition-all text-left group relative overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
                                    <span className="block text-gray-500 text-xs font-mono mb-2 group-hover:text-blue-200">Say:</span>
                                    <span className="text-lg font-medium relative z-10">{c.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {step === "visual" && (
                    <div className="space-y-8 text-center">
                        <motion.h2
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="text-3xl font-bold"
                        >
                            Why that was the right choice
                        </motion.h2>

                        {/* 1. SALES ICEBERG */}
                        {data.visualType === "iceberg" && <Iceberg />}

                        {/* 1.5 SALES HANDOVER */}
                        {data.visualType === "relay_baton" && <RelayBaton />}

                        {/* 1.5 STRATEGY: VISION VOID (Focus vs Scatter) */}
                        {data.visualType === "target_focus" && <TargetFocus />}

                        {/* 2. STATE MATRIX (PM) */}
                        {data.visualType === "state_matrix" && (
                            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                                    {["Idle", "Loading", "Success", "Error", "Empty"].map((s) => (
                                        <div key={s} className="space-y-2">
                                            <div className="aspect-[9/16] bg-gray-900 rounded border border-gray-700 relative overflow-hidden flex items-center justify-center">
                                                {s === "Loading" && <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>}
                                                {s === "Error" && <div className="text-red-500 text-xs text-center p-2">⚠️ Network Fail</div>}
                                                {s === "Empty" && <div className="text-gray-500 text-xs">No Data</div>}
                                                {s === "Success" && <div className="text-green-500 text-xs">✓ Done</div>}
                                                {s === "Idle" && <div className="w-12 h-2 bg-gray-800 rounded"></div>}
                                            </div>
                                            <div className="text-xs font-mono text-gray-400 capitalize">{s}</div>
                                        </div>
                                    ))}
                                </div>
                                <p className="mt-8 text-blue-200 font-mono text-sm">UX Tool: State Mapping</p>
                            </div>
                        )}

                        {/* 3. NETWORK THROTTLE (DEV) */}
                        {data.visualType === "network_throttle" && (
                            <div className="bg-black p-8 rounded-3xl border border-gray-800 flex flex-col items-center justify-center space-y-8">
                                <div className="flex gap-8">
                                    <div className="text-center space-y-2">
                                        <div className="text-xs text-gray-500">YOUR MAC (FIBER)</div>
                                        <div className="text-4xl font-bold text-green-500">0.2s</div>
                                    </div>
                                    <div className="w-px bg-gray-800 h-20"></div>
                                    <div className="text-center space-y-2">
                                        <div className="text-xs text-gray-500">REAL USER (3G)</div>
                                        <div className="text-4xl font-bold text-red-500 animate-pulse">4.8s</div>
                                    </div>
                                </div>
                                <div className="w-full bg-gray-900 h-2 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: "100%" }}
                                        animate={{ width: "10%" }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                        className="h-full bg-red-500"
                                    />
                                </div>
                                <p className="text-blue-200 font-mono text-sm">UX Tool: Performance Empathy</p>
                            </div>
                        )}

                        {/* 4. TIMELINE BURN (CRM) */}
                        {data.visualType === "timeline_burn" && <TimelineBurn role={data.role} />}

                        {/* GENERIC FALLBACK FOR OTHERS (FOR NOW) */}
                        {/* 0. BUSINESS DEV: LISTENING EQ (Signal vs Noise) */}
                        {data.visualType === "listening_eq" && <ListeningEQ uxValue={data.uxValue} />}

                        {!["iceberg", "state_matrix", "network_throttle", "listening_eq", "relay_baton", "target_focus", "timeline_burn"].includes(data.visualType) && (
                            <div className="bg-white/5 p-12 rounded-3xl border border-white/10 text-center">
                                <div className="text-6xl mb-6">✨</div>
                                <h3 className="text-xl font-bold mb-2">Simulation Complete</h3>
                                <p className="text-gray-400">By choosing correctly, you avoided the {data.role} Friction.</p>
                            </div>
                        )}

                        <div className="pt-8">
                            <button
                                onClick={onComplete}
                                className="px-8 py-3 bg-white text-black rounded-full font-bold hover:scale-105 transition-transform"
                            >
                                Complete Training Scenario
                            </button>
                        </div>
                    </div>
                )}
            </motion.div>
        </div>
    );
};
