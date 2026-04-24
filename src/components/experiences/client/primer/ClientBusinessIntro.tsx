import { motion } from "framer-motion";

interface ClientBusinessIntroProps {
    onNext: () => void;
}

export const ClientBusinessIntro = ({ onNext }: ClientBusinessIntroProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-full flex flex-col items-center justify-center text-center space-y-12 px-6"
        >
            <div className="space-y-2">
                <div className="inline-block px-4 py-1.5 rounded-full bg-destructive/10 border border-destructive/20 text-xs font-bold tracking-widest text-destructive font-mono mb-4">
                    THE REALITY CHECK
                </div>
                <h1 className="text-6xl md:text-8xl font-display font-bold text-foreground leading-tight">
                    The Hidden <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-destructive to-accent">Revenue Leak.</span>
                </h1>
            </div>

            <div className="max-w-2xl mx-auto space-y-8">
                <p className="text-2xl text-muted-foreground font-light leading-relaxed">
                    Marketing fills the bucket. <span className="text-foreground font-medium">Bad UX punches holes in the bottom.</span>
                </p>

                <div className="flex items-center justify-center gap-4 text-sm font-mono text-muted-foreground">
                    <span>VISITORS ENTER</span>
                    <span className="text-foreground">→</span>
                    <span className="text-destructive font-bold">FRUSTRATION</span>
                    <span className="text-foreground">→</span>
                    <span>VISITORS LEAVE</span>
                </div>
            </div>

            <button
                onClick={onNext}
                className="group relative inline-flex items-center gap-3 px-10 py-5 text-xl font-bold text-primary-foreground bg-primary rounded-full hover:scale-105 transition-transform shadow-lg"
            >
                <span>Audit My Funnel</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
        </motion.div>
    );
};
