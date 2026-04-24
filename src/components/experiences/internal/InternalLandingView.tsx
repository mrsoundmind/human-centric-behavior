import { motion } from "framer-motion";

interface InternalLandingViewProps {
    onStart: () => void;
}

export const InternalLandingView = ({ onStart }: InternalLandingViewProps) => {
    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8 relative overflow-hidden">
            {/* Brand ambience — violet → pink wash, very subtle */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl text-center space-y-8 relative z-10"
            >
                <h1 className="text-6xl md:text-8xl font-display font-bold leading-none tracking-tight text-foreground">
                    The Anatomy of{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                        Friction
                    </span>
                </h1>

                <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto">
                    Every project failure starts with a single, seemingly harmless decision.
                </p>

                <div className="grid md:grid-cols-3 gap-6 text-left my-12 bg-card border border-border p-6 rounded-2xl shadow-sm">
                    <div className="space-y-2">
                        <div className="text-primary text-lg font-semibold">🔍 The Cause</div>
                        <p className="text-sm text-muted-foreground">
                            How small choices in Sales, PM, or Design create massive debt.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-accent text-lg font-semibold">📉 The Cost</div>
                        <p className="text-sm text-muted-foreground">
                            Visualizing the hidden financial and emotional impact.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-primary text-lg font-semibold">✨ The Cure</div>
                        <p className="text-sm text-muted-foreground">
                            Applying specific UX tools to prevent the chaos.
                        </p>
                    </div>
                </div>

                <button
                    onClick={onStart}
                    className="group px-8 py-4 bg-primary text-primary-foreground font-bold text-lg rounded-full transition-all duration-300"
                >
                    <span className="flex items-center gap-2">
                        Enter Simulation
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </button>
            </motion.div>
        </div>
    );
};
