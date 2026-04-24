import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, TrendingDown, Users, ArrowRight, ShieldAlert } from "lucide-react";
import { useState } from "react";

interface SystemReactionProps {
    choice?: 'defensive' | 'investigative';
    onContinue: () => void;
}

export const SystemReaction = ({ choice = 'defensive', onContinue }: SystemReactionProps) => {
    const [step, setStep] = useState(0);

    const isDefensive = choice === 'defensive';

    const renderCard = (icon: any, title: string, desc: string, index: number) => {
        const Icon = icon;
        return (
            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: (index - step) * 0.1 }}
                className="relative group w-full"
            >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-xl" />
                <div className="bg-card border border-border hover:border-primary/30 p-8 rounded-2xl relative z-10 transition-colors h-full flex flex-col items-center text-center">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 shadow-lg">
                        <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-3">{title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm font-light">{desc}</p>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden font-sans">
            {/* Dramatic Ambient Gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--destructive)/0.15),transparent_60%)] pointer-events-none blur-[100px]" />

            <div className="max-w-5xl w-full z-10 relative flex flex-col items-center">

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mb-16"
                >
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-6 backdrop-blur-md ${isDefensive ? 'bg-destructive/10 border-destructive/20 text-destructive' : 'bg-accent/10 border-accent/20 text-accent'
                        }`}>
                        <ShieldAlert className="w-4 h-4" />
                        <span className="text-xs font-mono uppercase tracking-[0.2em]">{isDefensive ? 'Defensive Stance' : 'Investigative Stance'} Taken</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
                        {isDefensive ? "You protected the scope." : "You paused the panic."}
                        <br />
                        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${isDefensive ? 'from-destructive to-destructive' : 'from-accent to-accent'}`}>
                            {isDefensive ? "But the system reacted." : "But the damage was done."}
                        </span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                        {isDefensive
                            ? "In a complex system, completing your exact tasks does not guarantee a successful outcome. Trace the ripples."
                            : "You asked the right question, but too late. Six months of development time had already been burned. Here is the cost."}
                    </p>
                </motion.div>

                {step === 0 && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative px-12 py-5 bg-primary text-primary-foreground rounded-full font-black text-sm uppercase tracking-[0.2em] shadow-lg transition-all"
                        onClick={() => setStep(1)}
                    >
                        Trace the System Ripple <ArrowRight className="w-4 h-4 inline-block ml-2" />
                    </motion.button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-4">
                    <AnimatePresence mode="popLayout">
                        {step >= 1 && renderCard(
                            AlertTriangle,
                            "The Client's Story",
                            "They don't care about our Jira tickets or our perfect code. Their metrics failed. They feel ignored and will likely churn.",
                            1
                        )}

                        {step >= 2 && renderCard(
                            Users,
                            "The Team's State",
                            "Everyone is frustrated. Sales blames delivery. Delivery blames the client. Trust erodes because we operated in silos.",
                            2
                        )}

                        {step >= 3 && renderCard(
                            TrendingDown,
                            "The Business Cost",
                            "We will eat the cost of the rework to save the account, destroying the project's profitability.",
                            3
                        )}
                    </AnimatePresence>
                </div>

                <div className="h-32 mt-12 flex flex-col items-center justify-center gap-4">
                    {step === 1 && (
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={() => setStep(2)}
                            className="px-6 py-2 rounded-full border border-border text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all uppercase tracking-widest bg-muted"
                        >
                            Reveal Next Impact
                        </motion.button>
                    )}
                    {step === 2 && (
                        <motion.button
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={() => setStep(3)}
                            className="px-6 py-2 rounded-full border border-border text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all uppercase tracking-widest bg-muted"
                        >
                            Reveal Final Impact
                        </motion.button>
                    )}
                    {step >= 3 && (
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            onClick={onContinue}
                            className="group relative px-10 py-5 bg-primary text-primary-foreground rounded-full font-black text-sm uppercase tracking-[0.2em] shadow-lg hover:scale-105 transition-all"
                        >
                            <span>Synthesize Learnings</span>
                        </motion.button>
                    )}
                </div>
            </div>
        </div>
    );
};

