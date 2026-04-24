import { motion } from "framer-motion";

export const TargetFocus = () => {
    return (
        <div className="relative h-96 w-full bg-background rounded-3xl overflow-hidden border border-border flex items-center justify-center">
            {/* The Goals (Targets) */}
            <div className="absolute right-10 top-0 bottom-0 flex flex-col justify-around py-10 w-24">
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-border flex items-center justify-center text-[10px] text-muted-foreground text-center">Viral Traffic</div>
                <div className="w-20 h-20 rounded-full border-2 border-primary shadow-lg flex items-center justify-center text-xs font-bold text-primary text-center relative z-10 bg-background">Qualified Leads</div>
                <div className="w-16 h-16 rounded-full border-2 border-dashed border-border flex items-center justify-center text-[10px] text-muted-foreground text-center">Brand Love</div>
            </div>

            {/* The Team Energy (Particles) */}
            <div className="absolute left-20 top-1/2 -translate-y-1/2">
                <div className="text-xs text-primary uppercase tracking-widest mb-4 text-center">Team Effort</div>
                {/* Focus Beam (Good Choice) */}
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 400, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "circOut" }}
                    className="h-2 bg-primary shadow-lg rounded-full relative"
                >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-foreground rounded-full shadow-lg"></div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-6 text-center w-full"
            >
                <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/40 rounded-lg text-primary font-mono text-sm">
                    Result: 100% Impact on Business Goal
                </div>
            </motion.div>
        </div>
    );
};
