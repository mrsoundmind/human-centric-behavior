import { motion } from "framer-motion";

interface ClientReflectionScreenProps {
    metrics: { time: number; clicks: number; attempts: number } | null;
    onContinue: () => void;
}

export const ClientReflectionScreen = ({ metrics, onContinue }: ClientReflectionScreenProps) => {
    return (
        <div className="max-w-4xl mx-auto space-y-12">

            <div className="space-y-4 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-5xl font-display font-light text-foreground"
                >
                    What just happened?
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-muted-foreground max-w-2xl mx-auto"
                >
                    You experienced the <span className="text-foreground font-bold">Aesthetic-Usability Effect</span>.
                </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-card border border-border p-8 rounded-3xl space-y-4 hover:border-primary/40 transition-colors shadow-sm"
                >
                    <div className="text-3xl">🎨</div>
                    <h3 className="text-xl font-bold text-foreground">The Trap</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        The interface looked "premium" (gradients, glassmorphism), which tricked your brain into assuming it worked perfectly.
                        <br /><br />
                        Initial trust was high, so you forgave the first few errors.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-card border border-border p-8 rounded-3xl space-y-6 hover:border-primary/40 transition-colors relative overflow-hidden shadow-sm"
                >
                    <div className="text-3xl">📊</div>
                    <h3 className="text-xl font-bold text-foreground">The Reality</h3>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted p-3 rounded-lg">
                            <div className="text-2xl font-mono text-accent">{metrics?.attempts || 0}</div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Failed Attempts</div>
                        </div>
                        <div className="bg-muted p-3 rounded-lg">
                            <div className="text-2xl font-mono text-accent">{metrics?.time.toFixed(1) || 0}s</div>
                            <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Wasted Time</div>
                        </div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-sm">
                        You clicked <strong>{metrics?.clicks} times</strong> in frustration because the system had a rigid rule (+91) but never told you. This is <strong>Cognitive Load</strong>.
                    </p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 p-8 rounded-3xl text-center space-y-6"
            >
                <h3 className="text-2xl font-light text-foreground">The Verdict</h3>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    "Making it pretty" is easy.
                    <br />
                    Making it <strong className="text-foreground">self-explanatory</strong> is engineering.
                </p>

                <button
                    onClick={onContinue}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold transition-all"
                >
                    View Business Impact →
                </button>
            </motion.div>

        </div>
    );
};
