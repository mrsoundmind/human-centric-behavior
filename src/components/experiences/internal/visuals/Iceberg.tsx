import { motion } from "framer-motion";

export const Iceberg = () => {
    return (
        <div className="relative h-96 w-full bg-gradient-to-b from-sky-900/20 to-blue-900/40 rounded-3xl overflow-hidden border border-white/10 flex flex-col items-center justify-center p-8">
            {/* Water Line */}
            <div className="absolute top-[35%] left-0 right-0 h-0.5 bg-blue-400/30 z-10 flex items-center justify-end px-4">
                <span className="text-xs text-blue-300 font-mono tracking-widest bg-black/50 px-2 rounded">VISIBILITY LINE</span>
            </div>

            {/* The Tip (Revenue) */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute top-[10%] z-20 flex flex-col items-center"
            >
                <div className="bg-white text-blue-900 px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 text-center border-2 border-blue-500">
                    <div className="text-xs text-blue-500 uppercase tracking-widest mb-1">Client Sees</div>
                    <div className="text-lg">"Just a simple custom chatbot"</div>
                    <div className="text-sm text-green-600 font-mono">+$50k Contract</div>
                </div>
                <div className="w-0.5 h-16 bg-white/50 mt-1"></div>
            </motion.div>

            {/* The Mass (Hidden Costs) */}
            <div className="absolute top-[35%] bottom-0 w-full flex flex-col items-center justify-start pt-12 space-y-2">
                <div className="text-xs text-blue-300/50 uppercase tracking-widest mb-4">The Reality (Execution Nightmare)</div>
                <div className="grid grid-cols-2 gap-3 w-3/4 max-w-md">
                    {[
                        { label: "LLM Fine-tuning", cost: "$20k" },
                        { label: "Legal/Privacy", cost: "$15k" },
                        { label: "Latency Optimization", cost: "3 Sprints" },
                        { label: "Data Cleaning", cost: "Unknown" },
                        { label: "Hallucination Risk", cost: "High" },
                        { label: "Maintenance", cost: "$5k/mo" }
                    ].map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + (i * 0.1) }}
                            className="bg-red-900/20 border border-red-500/30 p-3 rounded-lg flex justify-between items-center"
                        >
                            <span className="text-red-200 text-xs">{item.label}</span>
                            <span className="text-red-400 font-mono text-xs">{item.cost}</span>
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="absolute bottom-4 left-0 right-0 text-center">
                <span className="text-[10px] uppercase tracking-widest text-green-400 bg-green-900/30 px-3 py-1 rounded-full border border-green-500/30">
                    Hero Moment: You prevented a contract that would have cost more to deliver than it earned.
                </span>
            </div>

            <p className="absolute bottom-4 left-6 text-blue-400/60 font-mono text-[10px]">UX TOOL: SERVICE BLUEPRINTING</p>
        </div>
    );
};
