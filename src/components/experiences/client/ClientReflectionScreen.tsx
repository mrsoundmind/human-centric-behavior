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
                    className="text-4xl md:text-5xl font-display font-light text-white"
                >
                    What just happened?
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl text-gray-400 max-w-2xl mx-auto"
                >
                    You experienced the <span className="text-white font-bold">Aesthetic-Usability Effect</span>.
                </motion.p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-4 hover:bg-white/10 transition-colors"
                >
                    <div className="text-3xl">🎨</div>
                    <h3 className="text-xl font-bold text-white">The Trap</h3>
                    <p className="text-gray-400 leading-relaxed">
                        The interface looked "premium" (gradients, glassmorphism), which tricked your brain into assuming it worked perfectly.
                        <br /><br />
                        Initial trust was high, so you forgave the first few errors.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white/5 border border-white/10 p-8 rounded-3xl space-y-6 hover:bg-white/10 transition-colors relative overflow-hidden"
                >
                    <div className="text-3xl">📊</div>
                    <h3 className="text-xl font-bold text-white">The Reality</h3>

                    {/* Metrics Display */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/20 p-3 rounded-lg">
                            <div className="text-2xl font-mono text-pink-500">{metrics?.attempts || 0}</div>
                            <div className="text-[10px] text-gray-400 uppercase tracking-widest">Failed Attempts</div>
                        </div>
                        <div className="bg-black/20 p-3 rounded-lg">
                            <div className="text-2xl font-mono text-pink-500">{metrics?.time.toFixed(1) || 0}s</div>
                            <div className="text-[10px] text-gray-400 uppercase tracking-widest">Wasted Time</div>
                        </div>
                    </div>

                    <p className="text-gray-400 leading-relaxed text-sm">
                        You clicked <strong>{metrics?.clicks} times</strong> in frustration because the system had a rigid rule (+91) but never told you. This is <strong>Cognitive Load</strong>.
                    </p>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 p-8 rounded-3xl text-center space-y-6"
            >
                <h3 className="text-2xl font-light text-white">The Verdict</h3>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                    "Making it pretty" is easy.
                    <br />
                    Making it <strong>self-explanatory</strong> is engineering.
                </p>

                <button
                    onClick={onContinue}
                    className="px-8 py-3 border border-pink-500 bg-pink-500/10 text-pink-500 rounded-full hover:bg-pink-500 hover:text-white transition-all font-bold"
                >
                    View Business Impact →
                </button>
            </motion.div>

        </div>
    );
};
