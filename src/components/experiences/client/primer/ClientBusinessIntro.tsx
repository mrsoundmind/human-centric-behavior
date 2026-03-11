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
                <div className="inline-block px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-bold tracking-widest text-red-500 font-mono mb-4">
                    THE REALITY CHECK
                </div>
                <h1 className="text-6xl md:text-8xl font-display font-bold text-white leading-tight">
                    The Hidden <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">Revenue Leak.</span>
                </h1>
            </div>

            <div className="max-w-2xl mx-auto space-y-8">
                <p className="text-2xl text-gray-400 font-light leading-relaxed">
                    Marketing fills the bucket. <span className="text-white font-medium">Bad UX punches holes in the bottom.</span>
                </p>

                <div className="flex items-center justify-center gap-4 text-sm font-mono text-gray-500">
                    <span>VISITORS ENTER</span>
                    <span className="text-white">→</span>
                    <span className="text-red-500 font-bold">FRUSTRATION</span>
                    <span className="text-white">→</span>
                    <span>VISITORS LEAVE</span>
                </div>
            </div>

            <button
                onClick={onNext}
                className="group relative inline-flex items-center gap-3 px-10 py-5 text-xl font-bold text-black bg-white rounded-full hover:scale-105 transition-transform shadow-[0_0_40px_-5px_rgba(255,255,255,0.4)]"
            >
                <span>Audit My Funnel</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
            </button>
        </motion.div>
    );
};
