import { useState } from "react";
import { ClientLayout } from "./ClientLayout";
import { ClientDebugMenu } from "./ClientDebugMenu";
// Primer
import { ClientPrimerDoor } from "./primer/ClientPrimerDoor";
import { ClientPrimerStove } from "./primer/ClientPrimerStove";
import { ClientPrimerKetchup } from "./primer/ClientPrimerKetchup";
import { ClientPrimerLesson } from "./primer/ClientPrimerLesson";
import { ClientPrimerRecap } from "./primer/ClientPrimerRecap";
// Funnel (Bad)
import { ClientBusinessIntro } from "./primer/ClientBusinessIntro";
import { ClientFunnelBait } from "./primer/ClientFunnelBait";
import { ClientFunnelChaos } from "./primer/ClientFunnelChaos";
import { ClientFunnelWall } from "./primer/ClientFunnelWall";
import { ClientFunnelMaze } from "./primer/ClientFunnelMaze";
import { ClientFunnelTrap } from "./primer/ClientFunnelTrap";
// Funnel (Good)
import { ClientFunnelBaitGood } from "./primer/ClientFunnelBaitGood";
import { ClientFunnelChaosGood } from "./primer/ClientFunnelChaosGood";
import { ClientFunnelWallGood } from "./primer/ClientFunnelWallGood";
import { ClientFunnelMazeGood } from "./primer/ClientFunnelMazeGood";
import { ClientFunnelTrapGood } from "./primer/ClientFunnelTrapGood";
// Revenue
import { ClientRevenueLoss } from "./primer/ClientRevenueLoss";
import { ClientRevenueGain } from "./primer/ClientRevenueGain";
import { ClientFinalConnect } from "./primer/ClientFinalConnect";
import { ClientFixIntro } from "./primer/ClientFixIntro";

import { motion, AnimatePresence } from "framer-motion";

type ClientStep =
    | "intro"
    | "primer_door" | "lesson_door"
    | "primer_stove" | "lesson_stove"
    | "primer_ketchup" | "lesson_ketchup"
    | "primer_recap"
    | "business_intro"
    | "funnel_bait" | "lesson_bait"
    | "funnel_chaos" | "lesson_chaos"
    | "funnel_wall" | "lesson_wall"
    | "funnel_maze" | "lesson_maze"
    | "funnel_trap" | "lesson_trap"
    | "revenue_loss"
    | "fix_intro"
    | "good_bait" | "good_chaos" | "good_wall" | "good_maze" | "good_trap"
    | "revenue_gain"
    | "final_connect";

export const ClientExperience = () => {
    const [step, setStep] = useState<ClientStep>("intro");

    return (
        <ClientLayout step={getStepIndex(step)} totalSteps={18}>
            <ClientDebugMenu currentStep={step} onJump={(s) => setStep(s)} />
            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                >
                    {step === "intro" && (
                        <IntroSection onStart={() => setStep("primer_door")} />
                    )}

                    {/* --- PHASE 1: PRIMER (Physical) --- */}
                    {step === "primer_door" && <ClientPrimerDoor onComplete={() => setStep("lesson_door")} />}
                    {step === "lesson_door" && <ClientPrimerLesson
                        title="The Principle: Signifiers"
                        description={
                            <>
                                A "Signifier" tells the user <span className="text-white font-medium">what to do without reading</span>.
                                <br /><br />
                                <span className="block text-xl">
                                    • A flat plate says <strong className="text-indigo-300">"Push"</strong>.<br />
                                    • A handle says <strong className="text-indigo-300">"Pull"</strong>.
                                </span>
                                <br />
                                When you ignore this, you create <strong className="text-white">Cognitive Debt</strong>.
                            </>
                        }
                        impactIcon="📉"
                        impactTitle="The Digital Bounce"
                        impactDescription={
                            <>
                                When a button <em>doesn't look clickable</em>, or a link looks like text, users pause.
                                <br />
                                <span className="text-pink-400 font-bold block mt-2">That pause costs you the customer.</span>
                            </>
                        }
                        onNext={() => setStep("primer_stove")}
                    />}

                    {step === "primer_stove" && <ClientPrimerStove onComplete={() => setStep("lesson_stove")} />}
                    {step === "lesson_stove" && <ClientPrimerLesson
                        title="The Principle: Natural Mapping"
                        description={
                            <>
                                Controls should <span className="text-white font-medium">mimic the layout</span> of the thing they control.
                                <br /><br />
                                A <strong>Grid Stove</strong> needs <strong>Grid Knobs</strong>.<br />
                                Using a linear row of knobs for a grid of burners forces the user to <em className="text-indigo-300">memorize</em>.
                            </>
                        }
                        impactIcon="🧠"
                        impactTitle="Cognitive Load"
                        impactDescription={
                            <>
                                If your dashboard buttons are far from the item they control, or filter logic is backward, users make mistakes.
                                <span className="text-pink-400 font-bold block mt-2">Mistakes = Support Tickets.</span>
                            </>
                        }
                        onNext={() => setStep("primer_ketchup")}
                    />}

                    {step === "primer_ketchup" && <ClientPrimerKetchup onComplete={() => setStep("lesson_ketchup")} />}
                    {step === "lesson_ketchup" && <ClientPrimerLesson
                        title="The Principle: Efficiency"
                        description={
                            <>
                                The <strong>Glass Bottle</strong> forces the user to <span className="text-red-400">work for the value</span>.
                                <br />
                                The <strong>Squeeze Bottle</strong> delivers value with <span className="text-green-400">zero friction</span>.
                                <br /><br />
                                Design B isn't just "prettier". It is fundamentally more usable.
                            </>
                        }
                        impactIcon="⚡"
                        impactTitle="Time-to-Value"
                        impactDescription={
                            <>
                                Every extra click, slow load, or complex form field is a "shake of the bottle".
                                <span className="text-pink-400 font-bold block mt-2">Users get tired. Then they leave.</span>
                            </>
                        }
                        onNext={() => setStep("primer_recap")}
                    />}

                    {/* --- TRANSITION: EMPATHY --- */}
                    {step === "primer_recap" && <ClientPrimerRecap onNext={() => setStep("business_intro")} />}

                    {/* --- TRANSITION: BUSINESS --- */}
                    {step === "business_intro" && <ClientBusinessIntro onNext={() => setStep("funnel_bait")} />}

                    {/* --- PHASE 2: LEAKY FUNNEL (Digital: BAD) --- */}
                    {step === "funnel_bait" && <ClientFunnelBait onComplete={() => setStep("lesson_bait")} />}
                    {step === "lesson_bait" && <ClientPrimerLesson
                        title="AD WASTE"
                        description={
                            <>
                                <span className="text-white font-bold">You try to trick the user</span> with a promise you don't keep.
                                <br /><br />
                                Marketing promised "50% Off". The Landing Page showed "Sign Up".
                                <br />
                                The content disconnect creates <span className="text-red-400">instant distrust</span>.
                            </>
                        }
                        impactIcon="💸"
                        impactTitle="Marketing Burn"
                        impactDescription={
                            <>
                                You paid for the click. <br />
                                <span className="text-pink-400 font-bold">You lost the customer in 3 seconds.</span>
                            </>
                        }
                        onNext={() => setStep("funnel_chaos")}
                    />}

                    {step === "funnel_chaos" && <ClientFunnelChaos onComplete={() => setStep("lesson_chaos")} />}
                    {step === "lesson_chaos" && <ClientPrimerLesson
                        title="THE VANITY TRAP"
                        description={
                            <>
                                <span className="text-white">High-Intent Traffic</span> is successfully driven to the landing page.
                                <br /><br />
                                However, <strong>Poor Information Architecture</strong> and <strong>Intrusive Interstitials</strong> (Chatbots/Popups) cause immediate abandonment.
                            </>
                        }
                        impactIcon="📉"
                        impactTitle="Acquisition ≠ Conversion"
                        impactDescription={
                            <>
                                <strong>Acquisition</strong> measures volume. <strong>Conversion</strong> measures value.
                                <br />
                                <span className="text-pink-400 font-bold">The signups are paid for, but the value is not captured.</span>
                            </>
                        }
                        onNext={() => setStep("funnel_wall")}
                    />}

                    {step === "funnel_wall" && <ClientFunnelWall onComplete={() => setStep("lesson_wall")} />}
                    {step === "lesson_wall" && <ClientPrimerLesson
                        title="BRAND DAMAGE"
                        description={
                            <>
                                Asking for value <span className="text-red-400">before delivering value</span>.
                                <br /><br />
                                That "Sign up for 10% off" popup in the first 5 seconds?
                                <br />
                                It's not "Conversion Optimization". <span className="text-white font-bold">It's an insult.</span>
                            </>
                        }
                        impactIcon="🛑"
                        impactTitle="Negative Sentiment"
                        impactDescription={
                            <>
                                Aggressive growth hacks lead to <span className="text-pink-400 font-bold">aggressive exits.</span>
                            </>
                        }
                        onNext={() => setStep("funnel_maze")}
                    />}

                    {step === "funnel_maze" && <ClientFunnelMaze onComplete={() => setStep("lesson_maze")} />}
                    {step === "lesson_maze" && <ClientPrimerLesson
                        title="THE LABYRINTH"
                        description={
                            <>
                                <span className="text-white">They can't find it.</span> So they don't use it.
                                <br /><br />
                                • Buried Guidelines<br />
                                • Zero Search Functionality<br />
                                • "Guess the Department" Name
                            </>
                        }
                        impactIcon="🤷"
                        impactTitle="Operational Risk"
                        impactDescription={
                            <>
                                When policies are hard to find, employees <span className="text-white">make things up</span> to get the job done.
                                <span className="text-pink-400 font-bold block mt-2">Compliance = 0%</span>
                            </>
                        }
                        mechanismTitle="The Mechanism (Search Cost)"
                        mechanismDescription={
                            <>
                                Users follow the <span className="text-white">Path of Least Resistance</span>.
                                If the "Right Way" takes 10 clicks, they will intuitively choose the "Fast Way" (guessing).
                            </>
                        }
                        onNext={() => setStep("funnel_trap")}
                    />}

                    {step === "funnel_trap" && <ClientFunnelTrap onComplete={() => setStep("lesson_trap")} />}
                    {step === "lesson_trap" && <ClientPrimerLesson
                        title="THE TOLL BOOTH"
                        description={
                            <>
                                You held the value <span className="text-red-400">hostage</span> behind a form.
                                <br /><br />
                                They wanted to see the Kitchen.
                                <br />
                                You asked for their Phone Number, Email, and Mortgage Status first.
                            </>
                        }
                        impactIcon="🔒"
                        impactTitle="Lead Repulsion"
                        impactDescription={
                            <>
                                You didn't get a "Lead". <br />
                                <span className="text-pink-400 font-bold">You annoyed a qualified buyer who went to Zillow.</span>
                            </>
                        }
                        mechanismTitle="The Mechanism (The Ultimatum)"
                        mechanismDescription={
                            <>
                                <span className="text-white">Reciprocity Failure</span>.
                                You asked for a massive deposit (Privacy) before showing the product.
                                In human terms: "Marry me, then we can have coffee."
                            </>
                        }
                        onNext={() => setStep("revenue_loss")}
                    />}

                    {/* --- PHASE 3: THE COST --- */}
                    {step === "revenue_loss" && <ClientRevenueLoss onNext={() => setStep("fix_intro")} />}

                    {/* --- PHASE 4: THE FIX --- */}
                    {step === "fix_intro" && <ClientFixIntro onNext={() => setStep("good_bait")} />}

                    {step === "good_bait" && <ClientFunnelBaitGood onComplete={() => setStep("good_chaos")} />}
                    {step === "good_chaos" && <ClientFunnelChaosGood onComplete={() => setStep("good_wall")} />}
                    {step === "good_wall" && <ClientFunnelWallGood onComplete={() => setStep("good_maze")} />}
                    {step === "good_maze" && <ClientFunnelMazeGood key="good_maze_fix_v2" onComplete={() => setStep("good_trap")} />}
                    {step === "good_trap" && <ClientFunnelTrapGood onComplete={() => setStep("revenue_gain")} />}

                    {/* --- PHASE 5: THE VALUE --- */}
                    {step === "revenue_gain" && <ClientRevenueGain onNext={() => setStep("final_connect")} />}

                    {/* --- PHASE 6: THE FUTURE --- */}
                    {step === "final_connect" && <ClientFinalConnect onRestart={() => setStep("intro")} />}
                </motion.div>
            </AnimatePresence>
        </ClientLayout>
    );
};

// Quick Helper for Intro
const IntroSection = ({ onStart }: { onStart: () => void }) => (
    <div className="max-w-5xl mx-auto text-center space-y-12 py-20 px-6">
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
        >
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest text-indigo-300 font-mono mb-4">
                ZYXWARE HUMAN CENTRIC LAB
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight leading-[0.9]">
                The Hidden <br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">Revenue Leak.</span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto font-light">
                Every confusing click is a <span className="text-white font-bold border-b border-pink-500/50">tax on your revenue</span>. <br />
                Calculating your liability now...
            </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto py-8">
            <div className="space-y-3 bg-gradient-to-br from-indigo-600/30 via-indigo-900/20 to-white/5 backdrop-blur-2xl p-6 rounded-2xl border border-white/20 hover:border-indigo-500/50 transition-all duration-500 group shadow-2xl">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-xl shadow-[0_0_20px_rgba(99,102,241,0.5)]">📉</div>
                <h3 className="text-white font-bold text-lg group-hover:text-indigo-300 transition-colors">The Leak</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                    Marketing fills the bucket. Bad UX punches holes in the bottom.
                </p>
            </div>
            <div className="space-y-3 bg-gradient-to-br from-purple-600/30 via-purple-900/20 to-white/5 backdrop-blur-2xl p-6 rounded-2xl border border-white/20 hover:border-purple-500/50 transition-all duration-500 group shadow-2xl">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-xl shadow-[0_0_20px_rgba(168,85,247,0.5)]">🧠</div>
                <h3 className="text-white font-bold text-lg group-hover:text-purple-300 transition-colors">The Cause</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                    It's not "ugly". It's <strong>Cognitively Expensive</strong>. Users don't think, they leave.
                </p>
            </div>
            <div className="space-y-3 bg-gradient-to-br from-pink-600/30 via-pink-900/20 to-white/5 backdrop-blur-2xl p-6 rounded-2xl border border-white/20 hover:border-pink-500/50 transition-all duration-500 group shadow-2xl">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-pink-500 to-red-600 flex items-center justify-center text-xl shadow-[0_0_20px_rgba(236,72,153,0.5)]">👁️</div>
                <h3 className="text-white font-bold text-lg group-hover:text-pink-300 transition-colors">The Audit</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                    We will simulate your customer's frustration to quantify the exact cost.
                </p>
            </div>
        </div>

        <button
            onClick={onStart}
            className="group relative inline-flex items-center gap-3 px-10 py-5 text-xl font-bold text-black bg-white rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_-5px_rgba(255,255,255,0.4)]"
        >
            <span>Start The Primer</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
        </button>
    </div>
);

function getStepIndex(step: ClientStep): number {
    switch (step) {
        case "intro": return 0;

        // Phase 1: Primer
        case "primer_door": return 1;
        case "lesson_door": return 1;
        case "primer_stove": return 2;
        case "lesson_stove": return 2;
        case "primer_ketchup": return 3;
        case "lesson_ketchup": return 3;

        // Transition
        case "primer_recap": return 4;
        case "business_intro": return 4;

        // Phase 2: Funnel
        case "funnel_bait": return 5;
        case "lesson_bait": return 5;
        case "funnel_chaos": return 6;
        case "lesson_chaos": return 6;
        case "funnel_wall": return 7;
        case "lesson_wall": return 7;
        case "funnel_maze": return 8;
        case "lesson_maze": return 8;
        case "funnel_trap": return 9;
        case "lesson_trap": return 9;

        case "revenue_loss": return 10;

        // Phase 4 (Fixes)
        case "fix_intro": return 11;
        case "good_bait": return 12;
        case "good_chaos": return 13;
        case "good_wall": return 14;
        case "good_maze": return 15;
        case "good_trap": return 16;

        // Phase 5
        case "revenue_gain": return 17;

        case "final_connect": return 18;

        default: return 0;
    }
}
