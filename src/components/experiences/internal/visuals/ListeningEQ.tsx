import { motion } from "framer-motion";

export const ListeningEQ = ({ uxValue }: { uxValue: string }) => {
    return (
        <div className="bg-background p-8 rounded-3xl border border-border flex flex-col items-center justify-center space-y-8">
            <div className="space-y-6 w-full max-w-lg">
                {/* YOU (The Active Listener) */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono uppercase tracking-widest">
                        <span className="text-muted-foreground">You (Asking Questions)</span>
                        <span className="text-primary">Calm Signal</span>
                    </div>
                    {/* Harmonious Sine Wave Animation */}
                    <div className="h-16 flex items-center justify-center overflow-hidden bg-muted rounded-lg relative">
                        <svg viewBox="0 0 100 20" className="w-full h-full opacity-50">
                            <motion.path
                                d="M0 10 Q 25 20, 50 10 T 100 10"
                                fill="none"
                                stroke="hsl(var(--primary))"
                                strokeWidth="2"
                                animate={{ d: ["M0 10 Q 25 20, 50 10 T 100 10", "M0 10 Q 25 0, 50 10 T 100 10"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            />
                        </svg>
                        <div className="absolute inset-0 bg-primary/10 animate-pulse"></div>
                    </div>
                </div>

                <div className="h-px bg-border w-full" />

                {/* CLIENT (Vikram/Rahul) */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono uppercase tracking-widest">
                        <span className="text-muted-foreground">Client (Feeling Heard)</span>
                        <span className="text-primary">Resonance Achieved</span>
                    </div>
                    {/* Matching Sine Wave */}
                    <div className="h-16 flex items-center justify-center overflow-hidden bg-muted rounded-lg relative">
                        <svg viewBox="0 0 100 20" className="w-full h-full opacity-50">
                            <motion.path
                                d="M0 10 Q 25 20, 50 10 T 100 10"
                                fill="none"
                                stroke="hsl(var(--primary))"
                                strokeWidth="2"
                                animate={{ d: ["M0 10 Q 25 20, 50 10 T 100 10", "M0 10 Q 25 0, 50 10 T 100 10"] }}
                                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                            />
                        </svg>
                        <div className="absolute inset-0 bg-primary/10 animate-pulse"></div>
                    </div>
                </div>
            </div>

            <div className="text-center space-y-2">
                <motion.h3
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                    className="text-2xl font-bold text-foreground"
                >
                    Resonance Unlocked
                </motion.h3>
                <div className="hidden">
                    {/* Hidden 'Bad' State for contrast reference if needed later */}
                    <div className="bg-destructive">Noise</div>
                </div>
                <p className="text-muted-foreground text-sm max-w-md">
                    By asking "Why?" instead of pitching "What", you synced with their actual frequency.
                    <br /><br />
                    <span className="text-primary font-mono text-xs border border-primary/40 px-2 py-1 rounded">{uxValue}</span>
                </p>
                <div className="pt-4">
                    <span className="text-[10px] uppercase tracking-widest text-primary">Hero Moment: You saved 2 weeks of re-discovery.</span>
                </div>
            </div>
        </div>
    );
};
