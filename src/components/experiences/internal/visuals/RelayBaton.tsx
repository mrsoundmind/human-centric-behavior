import { motion } from "framer-motion";

export const RelayBaton = () => {
    return (
        <div className="bg-card p-8 rounded-3xl border border-border w-full max-w-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-primary/10"></div>

            {/* TRACK */}
            <div className="relative h-48 flex items-center">
                <div className="absolute w-full h-px bg-border"></div>

                {/* RUNNER A (Sales) */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 100, opacity: 1 }}
                    transition={{ duration: 1, ease: "linear" }}
                    className="absolute left-0 flex flex-col items-center"
                >
                    <div className="w-8 h-8 bg-primary rounded-full mb-2 shadow-lg"></div>
                    <span className="text-xs text-primary font-mono">You (Sales)</span>
                </motion.div>

                {/* THE BATON (Context) */}
                <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 300, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }} // Smooth transfer
                    className="absolute left-0 h-2 w-12 bg-primary rounded-full shadow-lg z-10"
                />

                {/* RUNNER B (PM) */}
                <motion.div
                    initial={{ x: 250, opacity: 0 }}
                    animate={{ x: 300, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5, ease: "linear" }}
                    className="absolute left-0 flex flex-col items-center"
                >
                    <div className="w-8 h-8 bg-primary rounded-full mb-2 shadow-lg"></div>
                    <span className="text-xs text-primary font-mono">PM (Delivery)</span>
                </motion.div>

                {/* CONNECTION LINE (Success) */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="absolute left-[130px] w-[170px] h-32 border-b-2 border-dashed border-primary/40 rounded-b-full origin-left"
                />
            </div>

            <div className="relative z-10 text-center space-y-2 mt-4">
                <h3 className="text-xl font-bold text-foreground">The Clean Handoff</h3>
                <p className="text-muted-foreground text-sm">
                    Instead of throwing a "Dead Cat" (50-page PDF), you ran alongside them (Loom Video).
                    <br />
                    <span className="text-primary font-bold">Velocity Maintained. Context Saved.</span>
                </p>
                <div className="pt-2">
                    <span className="text-[10px] uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/40">
                        Hero Moment: You saved the PM 10 hours of deciphering.
                    </span>
                </div>
            </div>
        </div>
    );
};
