import { motion } from "framer-motion";

export const RelayBaton = () => {
    return (
        <div className="bg-gray-900/80 p-8 rounded-3xl border border-white/10 w-full max-w-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-blue-900/10"></div>

            {/* TRACK */}
            <div className="relative h-48 flex items-center">
                <div className="absolute w-full h-px bg-white/20"></div>

                {/* RUNNER A (Sales) */}
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 100, opacity: 1 }}
                    transition={{ duration: 1, ease: "linear" }}
                    className="absolute left-0 flex flex-col items-center"
                >
                    <div className="w-8 h-8 bg-blue-500 rounded-full mb-2 shadow-[0_0_15px_#3b82f6]"></div>
                    <span className="text-xs text-blue-300 font-mono">You (Sales)</span>
                </motion.div>

                {/* THE BATON (Context) */}
                <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 300, opacity: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }} // Smooth transfer
                    className="absolute left-0 h-2 w-12 bg-yellow-400 rounded-full shadow-[0_0_20px_#facc15] z-10"
                />

                {/* RUNNER B (PM) */}
                <motion.div
                    initial={{ x: 250, opacity: 0 }}
                    animate={{ x: 300, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5, ease: "linear" }}
                    className="absolute left-0 flex flex-col items-center"
                >
                    <div className="w-8 h-8 bg-green-500 rounded-full mb-2 shadow-[0_0_15px_#22c55e]"></div>
                    <span className="text-xs text-green-300 font-mono">PM (Delivery)</span>
                </motion.div>

                {/* CONNECTION LINE (Success) */}
                <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 0.5 }}
                    className="absolute left-[130px] w-[170px] h-32 border-b-2 border-dashed border-green-500/50 rounded-b-full origin-left"
                />
            </div>

            <div className="relative z-10 text-center space-y-2 mt-4">
                <h3 className="text-xl font-bold text-white">The Clean Handoff</h3>
                <p className="text-gray-400 text-sm">
                    Instead of throwing a "Dead Cat" (50-page PDF), you ran alongside them (Loom Video).
                    <br />
                    <span className="text-green-400 font-bold">Velocity Maintained. Context Saved.</span>
                </p>
                <div className="pt-2">
                    <span className="text-[10px] uppercase tracking-widest text-green-400 bg-green-900/30 px-3 py-1 rounded-full border border-green-500/30">
                        Hero Moment: You saved the PM 10 hours of deciphering.
                    </span>
                </div>
            </div>
        </div>
    );
};
