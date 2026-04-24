import { motion } from "framer-motion";
import { Eye, ArrowRight, ShieldAlert, Zap } from "lucide-react";
import { useState } from "react";

interface DecisionLensUnlockProps {
    onContinue: () => void;
}

export const DecisionLensUnlock = ({ onContinue }: DecisionLensUnlockProps) => {
    const [step, setStep] = useState(0);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden font-sans">
            {/* Core Lens Gradients */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.2),transparent_50%)] pointer-events-none blur-[100px]"
            />

            <div className="max-w-4xl w-full z-10 relative flex flex-col items-center text-center">

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", duration: 1, bounce: 0.5 }}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent p-[2px] mb-12 shadow-lg"
                >
                    <div className="w-full h-full bg-card rounded-full flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-primary/20 blur-xl" />
                        <Eye className="w-10 h-10 text-primary relative z-10" />
                    </div>
                </motion.div>

                {step === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        className="space-y-6 max-w-2xl"
                    >
                        <h2 className="text-[10px] uppercase font-mono tracking-[0.3em] text-primary mb-4">Paradigm Shift Required</h2>
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                            You've been taught to protect the <span className="text-transparent bg-clip-text bg-gradient-to-r from-destructive to-accent">Project</span>.
                        </h1>
                        <p className="text-xl text-muted-foreground font-light leading-relaxed">
                            Budget. Timeline. Scope. These are project metrics. They keep the machine running, but they don't solve the user's problem.
                        </p>
                        <motion.button
                            onClick={() => setStep(1)}
                            className="mt-8 px-8 py-4 bg-primary/10 hover:bg-primary/20 text-primary rounded-full font-bold text-sm tracking-widest uppercase transition-all"
                        >
                            Reveal the alternative
                        </motion.button>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8 max-w-3xl"
                    >
                        <h2 className="text-[10px] uppercase font-mono tracking-[0.3em] text-primary mb-4">The UX Lens Activated</h2>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight">
                            Start protecting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Outcome</span>.
                        </h1>

                        <div className="grid md:grid-cols-2 gap-6 mt-12 text-left">
                            <div className="p-6 rounded-2xl bg-destructive/5 border border-destructive/20 relative overflow-hidden group">
                                <ShieldAlert className="w-6 h-6 text-destructive mb-4" />
                                <h3 className="font-bold text-lg mb-2 text-foreground">The "Yes Trap"</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">Saying yes to every client request feels safe in the moment, but it creates bloated, failing products that destroy long-term trust.</p>
                            </div>

                            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Zap className="w-6 h-6 text-primary mb-4 relative z-10" />
                                <h3 className="font-bold text-lg mb-2 relative z-10 text-foreground">The Friction Value</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed relative z-10">Pushing back early to define the actual user problem creates temporary friction, but guarantees long-term success.</p>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="pt-8"
                        >
                            <button
                                onClick={onContinue}
                                className="group relative px-10 py-5 bg-primary text-primary-foreground rounded-full font-black text-sm uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-all overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3">
                                    Acknowledge & Proceed <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
