import { motion } from "framer-motion";

interface TimelineBurnProps {
    role: string;
}

export const TimelineBurn = ({ role }: TimelineBurnProps) => {
    return (
        <div className="bg-gray-900/50 p-8 rounded-3xl border border-white/10 w-full max-w-2xl">
            <div className="space-y-6">
                {/* Original Timeline */}
                <div className="space-y-2">
                    <div className="flex justify-between text-xs text-gray-400 uppercase tracking-widest">
                        <span>Original Plan</span>
                        <span className="text-green-400">Launch: Friday</span>
                    </div>
                    <div className="h-4 bg-gray-800 rounded-full overflow-hidden flex">
                        <div className="w-[80%] h-full bg-green-500/50"></div>
                    </div>
                </div>

                {/* The Burn */}
                <div className="space-y-2 relative">
                    <div className="flex justify-between text-xs text-gray-400 uppercase tracking-widest">
                        <span>With "Small Tweak"</span>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, color: "#EF4444" }}
                            transition={{ delay: 1.5 }}
                        >
                            Launch: Tuesday (+2 Days)
                        </motion.span>
                    </div>
                    <div className="h-4 bg-gray-800 rounded-full overflow-hidden flex relative">
                        {/* Original Scope */}
                        <div className="w-[80%] h-full bg-green-500/20"></div>
                        {/* The Scope Creep */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: "15%" }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="h-full bg-red-500"
                        />
                    </div>

                    {/* Impact Annotations */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        className="absolute top-6 right-0 bg-red-900/80 border border-red-500/50 rounded-lg p-3 text-xs w-48 backdrop-blur-sm z-10"
                    >
                        <div className="font-bold text-red-300 mb-1">Impact Analysis</div>
                        <div className="space-y-1 text-gray-300">
                            <div className="flex justify-between"><span>Dev Rework:</span> <span className="text-white">8 Hours</span></div>
                            <div className="flex justify-between"><span>QA Retest:</span> <span className="text-white">4 Hours</span></div>
                            <div className="flex justify-between border-t border-red-500/30 pt-1 mt-1">
                                <span>Cost:</span> <span className="text-red-300 font-bold">₹25,000</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="pt-4 flex items-center gap-4 text-sm text-gray-400">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    <p>That "tiny logo tweak" broke the header responsive grid.</p>
                </div>
            </div>
            <p className="mt-8 text-center text-blue-200 font-mono text-sm">UX Tool: Visual Impact Mapping</p>
        </div>
    );
};
