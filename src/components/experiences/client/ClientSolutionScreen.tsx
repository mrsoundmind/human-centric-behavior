import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ClientSolutionScreenProps {
    onRestart: () => void;
}

export const ClientSolutionScreen = ({ onRestart }: ClientSolutionScreenProps) => {
    const [activeSolutions, setActiveSolutions] = useState<string[]>([]);

    const toggleSolution = (id: string) => {
        setActiveSolutions(prev =>
            prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
        );
    };

    const solutions = [
        {
            id: "discovery",
            icon: "🔍",
            title: "Discovery Phase",
            subtitle: "Not 'meetings'. Risk Reduction.",
            desc: "We define the exact constraints (like Indian Phone Nuances) before writing a single line of code.",
            roi: "+30% Conversion"
        },
        {
            id: "design",
            icon: "📐",
            title: "Strategic Design",
            subtitle: "Not 'art'. Architecture.",
            desc: "We design for the 'Thumb Zone' and cognitive load, ensuring the user flows without thinking.",
            roi: "+45% Speed"
        },
        {
            id: "validation",
            icon: "🛡️",
            title: "Validation & Testing",
            subtitle: "Not 'QA'. Revenue Assurance.",
            desc: "We test with real humans. If they struggle, we fix it. You launch with 0% friction.",
            roi: "+90% Reliability"
        }
    ];

    // Calculate "Success Score"
    const successScore = 20 + (activeSolutions.length * 26.6); // Base 20%, max ~100%

    return (
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-start">

            {/* Left: The Process Inputs */}
            <div className="space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                >
                    <h2 className="text-3xl font-display font-light text-foreground">The Fix</h2>
                    <p className="text-muted-foreground">
                        How do we ensure that friction never happens? <br />
                        We apply a human-centric process.
                    </p>
                    <p className="text-xs uppercase tracking-widest text-primary font-bold pt-4">Select to Apply:</p>
                </motion.div>

                <div className="space-y-4">
                    {solutions.map((sol, i) => {
                        const isActive = activeSolutions.includes(sol.id);
                        return (
                            <motion.button
                                key={sol.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                onClick={() => toggleSolution(sol.id)}
                                className={`w-full text-left p-6 rounded-xl border transition-all duration-300 group ${isActive
                                        ? "bg-primary/10 border-primary shadow-lg"
                                        : "bg-muted border-border hover:bg-card"
                                    }`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex gap-4">
                                        <span className="text-2xl pt-1">{sol.icon}</span>
                                        <div>
                                            <h3 className={`text-lg font-medium transition-colors ${isActive ? "text-foreground" : "text-muted-foreground"}`}>
                                                {sol.title}
                                            </h3>
                                            <div className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
                                                {sol.subtitle}
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
                                                {sol.desc}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={`h-6 w-6 rounded-full border border-primary/30 flex items-center justify-center transition-colors ${isActive ? "bg-primary border-primary" : "bg-transparent"
                                        }`}>
                                        {isActive && <span className="text-primary-foreground text-xs">✓</span>}
                                    </div>
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Right: The Outcome Visualizer */}
            <div className="sticky top-24 pt-12 md:pt-0">
                <div className="bg-card border border-border rounded-3xl p-8 relative overflow-hidden text-center space-y-8">

                    <h3 className="text-muted-foreground text-sm uppercase tracking-widest">Project Projection</h3>

                    <div className="relative h-48 w-48 mx-auto flex items-center justify-center">
                        {/* Background Circle */}
                        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
                            <motion.circle
                                cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--primary))" strokeWidth="8"
                                strokeDasharray="283"
                                initial={{ strokeDashoffset: 283 }}
                                animate={{ strokeDashoffset: 283 - (283 * (successScore / 100)) }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                strokeLinecap="round"
                            />
                        </svg>
                        <div className="text-center">
                            <motion.div
                                className="text-4xl font-bold text-foreground font-mono"
                                key={successScore}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                            >
                                {successScore.toFixed(0)}%
                            </motion.div>
                            <div className="text-xs text-muted-foreground uppercase mt-1">Success Probability</div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Projected Outcome</p>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeSolutions.length}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="text-xl font-medium text-foreground h-16 flex items-center justify-center"
                            >
                                {activeSolutions.length === 0 && "Launch scoring low. High churn risk."}
                                {activeSolutions.length === 1 && "Better, but significant gaps remain."}
                                {activeSolutions.length === 2 && "Strong, but missing critical validation."}
                                {activeSolutions.length === 3 && "Maximum Revenue. Frictionless."}
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <button
                        disabled={activeSolutions.length < 3}
                        className={`w-full py-4 rounded-xl font-display font-bold transition-all ${activeSolutions.length === 3
                                ? "bg-primary text-primary-foreground hover:scale-[1.02] shadow-lg"
                                : "bg-muted text-muted-foreground cursor-not-allowed"
                            }`}
                        onClick={() => alert("This would link to your contact form / calendar.")}
                    >
                        {activeSolutions.length === 3 ? "Start Project →" : "Select All Steps"}
                    </button>

                    <p
                        onClick={onRestart}
                        className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
                    >
                        Restart Experience
                    </p>

                </div>
            </div>
        </div>
    );
};
