import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, FileText, Search, Zap, ArrowRight, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { MetricsCard } from "../SharedComponents";

interface ProjectBriefProps {
    onContinue: () => void;
}

export const ProjectBrief = ({ onContinue }: ProjectBriefProps) => {
    const [scanned, setScanned] = useState(false);
    const [revealedFlags, setRevealedFlags] = useState<number[]>([]);

    const flags = [
        { id: 0, text: "No defined target audience, no user personas, no conversion goal specified.", type: "critical" },
        { id: 1, text: "Fixed bid with no scope change clause.", type: "warning" }
    ];

    const revealFlag = (id: number) => {
        if (!revealedFlags.includes(id)) {
            setRevealedFlags([...revealedFlags, id]);
        }
    };

    const allRevealed = revealedFlags.length === flags.length;

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 md:p-12 relative overflow-hidden font-sans">
            {/* Ambient Gradients base */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.1),transparent_40%)] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,hsl(var(--accent)/0.1),transparent_40%)] pointer-events-none" />

            <div className="max-w-5xl w-full grid md:grid-cols-12 gap-12 relative z-10">

                {/* Left Column: Context & Controls */}
                <div className="md:col-span-5 flex flex-col justify-center space-y-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono uppercase tracking-[0.2em] w-fit shadow-lg"
                    >
                        <Zap className="w-3 h-3" /> Step 1: The Input
                    </motion.div>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
                            Monday morning.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-muted-foreground to-muted-foreground/70">A new brief lands.</span>
                        </h1>
                        <p className="text-muted-foreground leading-relaxed text-lg font-light">
                            Everyone on the team loved it. The budget is approved. The timeline is set.
                        </p>
                        <p className="mt-4 text-foreground font-medium">
                            But look closer. Notice what isn't there.
                        </p>
                    </motion.div>

                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                        {!scanned ? (
                            <button
                                onClick={() => setScanned(true)}
                                className="group relative w-full p-1 rounded-2xl bg-primary text-primary-foreground hover:tracking-wide transition-all duration-300"
                            >
                                <div className="absolute inset-0 bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="bg-card relative px-6 py-4 rounded-xl flex items-center justify-between">
                                    <span className="font-bold text-sm tracking-widest uppercase">Scan document</span>
                                    <Search className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                                </div>
                            </button>
                        ) : (
                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
                                    <p className="text-sm text-primary font-medium">
                                        Scan complete. Click the highlighted gaps in the document to analyze the UX risk.
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    {flags.map((_, i) => (
                                        <div key={i} className={`h-2 flex-1 rounded-full transition-colors duration-500 ${revealedFlags.includes(i) ? 'bg-primary shadow-lg' : 'bg-muted'}`} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Right Column: The Document */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="md:col-span-7 bg-card border border-border shadow-2xl rounded-2xl p-8 relative"
                >
                    {/* Header */}
                    <div className="flex justify-between items-start mb-8 pb-6 border-b border-border">
                        <div>
                            <div className="text-xs text-muted-foreground/70 uppercase tracking-widest mb-2 font-mono">Project Name</div>
                            <h2 className="text-2xl font-bold font-serif text-foreground">TechStartup Corporate Site</h2>
                        </div>
                        <div className="bg-muted px-3 py-1 rounded text-[10px] text-muted-foreground font-mono tracking-widest uppercase">Fixed Bid</div>
                    </div>

                    {/* Meta */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                            <div className="text-[10px] text-muted-foreground/70 uppercase tracking-widest mb-1 font-mono">Client</div>
                            <div className="text-sm font-medium">Vikram Shah (CEO)</div>
                        </div>
                        <div>
                            <div className="text-[10px] text-muted-foreground/70 uppercase tracking-widest mb-1 font-mono">Timeline</div>
                            <div className="text-sm font-medium">4 Weeks</div>
                        </div>
                    </div>

                    {/* Requirements */}
                    <div className="mb-6">
                        <div className="text-[10px] text-muted-foreground/70 uppercase tracking-widest mb-4 font-mono">Stated Requirements</div>
                        <ul className="space-y-4 text-sm text-muted-foreground font-light">
                            <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-primary/50 shrink-0 mt-0.5" /> B2B tech consulting website — primary goal: lead generation</li>
                            <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-primary/50 shrink-0 mt-0.5" /> "Clean, modern look" — references Stripe/Linear aesthetic</li>
                            <li className="flex gap-3"><CheckCircle2 className="w-4 h-4 text-primary/50 shrink-0 mt-0.5" /> Must work well on mobile (client says "most traffic from phones")</li>

                            {/* Missing elements hidden initially */}
                            <AnimatePresence>
                                {scanned && flags.map((flag, i) => (
                                    <motion.li
                                        key={flag.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.2 }}
                                        className="relative"
                                    >
                                        {!revealedFlags.includes(flag.id) ? (
                                            <button
                                                onClick={() => revealFlag(flag.id)}
                                                className="w-full text-left p-3 rounded-lg border border-primary/50 bg-primary/10 hover:bg-primary/20 text-primary font-mono text-xs uppercase tracking-wider flex justify-between items-center group transition-colors shadow-lg"
                                            >
                                                <span>Hidden UX Gap Found</span>
                                                <AlertTriangle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            </button>
                                        ) : (
                                            <motion.div
                                                initial={{ scale: 0.95 }}
                                                animate={{ scale: 1 }}
                                                className="p-4 rounded-lg border border-destructive/30 bg-destructive/10 text-destructive flex gap-3"
                                            >
                                                <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                                                <span className="leading-relaxed">{flag.text}</span>
                                            </motion.div>
                                        )}
                                    </motion.li>
                                ))}
                            </AnimatePresence>
                        </ul>
                    </div>

                    {/* Blur overlay before scan */}
                    {!scanned && (
                        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-card via-card/80 to-transparent pointer-events-none" />
                    )}
                </motion.div>
            </div>

            {/* Next Action */}
            <AnimatePresence>
                {allRevealed && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="fixed bottom-12 z-50 pointer-events-auto"
                    >
                        <button
                            onClick={onContinue}
                            className="group flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-full font-bold text-sm uppercase tracking-widest shadow-lg hover:scale-105 transition-all"
                        >
                            Start the Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
