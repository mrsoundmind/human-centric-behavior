import { motion } from "framer-motion";

interface InternalLandingViewProps {
    onStart: () => void;
}

export const InternalLandingView = ({ onStart }: InternalLandingViewProps) => {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-black pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl text-center space-y-8 relative z-10"
            >
                <h1 className="text-6xl md:text-8xl font-display font-bold leading-none tracking-tight">
                    The Anatomy of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Friction</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-400 font-light leading-relaxed max-w-2xl mx-auto">
                    Every project failure starts with a single, seemingly harmless decision.
                </p>

                <div className="grid md:grid-cols-3 gap-6 text-left my-12 bg-white/5 border border-white/10 p-6 rounded-2xl">
                    <div className="space-y-2">
                        <div className="text-blue-400 text-lg">🔍 The Cause</div>
                        <p className="text-sm text-gray-500">How small choices in Sales, PM, or Design create massive debt.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-purple-400 text-lg">📉 The Cost</div>
                        <p className="text-sm text-gray-500">Visualizing the hidden financial and emotional impact.</p>
                    </div>
                    <div className="space-y-2">
                        <div className="text-green-400 text-lg">✨ The Cure</div>
                        <p className="text-sm text-gray-500">Applying specific UX tools to prevent the chaos.</p>
                    </div>
                </div>

                <button
                    onClick={onStart}
                    className="group relative px-8 py-4 bg-white text-black font-bold text-lg rounded-full overflow-hidden hover:scale-105 transition-transform duration-300"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    <span className="relative z-10 flex items-center gap-2">
                        Enter Simulation
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </span>
                </button>
            </motion.div>
        </div>
    );
};
