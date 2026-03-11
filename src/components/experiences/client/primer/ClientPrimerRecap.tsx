import { motion } from "framer-motion";

interface ClientPrimerRecapProps {
    onNext: () => void;
}

export const ClientPrimerRecap = ({ onNext }: ClientPrimerRecapProps) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-4xl mx-auto text-center space-y-12 py-20 px-6"
        >
            <div className="space-y-6">
                <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold tracking-widest text-indigo-400 font-mono mb-4">
                    PHASE 1 COMPLETE
                </div>
                <h2 className="text-5xl md:text-6xl font-display font-light text-white leading-tight">
                    It wasn't <span className="font-bold text-indigo-400">you</span>. <br />
                    It was the <span className="font-bold text-white border-b-4 border-indigo-500">Design</span>.
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                    That frustration you just felt? The confusion? The urge to give up?
                    <br /><br />
                    <strong className="text-white">That is exactly how your users feel every day.</strong>
                </p>
            </div>

            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl max-w-3xl mx-auto grid md:grid-cols-3 gap-8">
                <div className="space-y-2">
                    <div className="text-4xl">🚪</div>
                    <div className="font-bold text-white">The Door</div>
                    <div className="text-xs text-gray-500">Confusing Signals</div>
                </div>
                <div className="space-y-2">
                    <div className="text-4xl">🔥</div>
                    <div className="font-bold text-white">The Stove</div>
                    <div className="text-xs text-gray-500">Bad Mapping</div>
                </div>
                <div className="space-y-2">
                    <div className="text-4xl">🥫</div>
                    <div className="font-bold text-white">The Ketchup</div>
                    <div className="text-xs text-gray-500">Inefficiency</div>
                </div>
            </div>

            <button
                onClick={onNext}
                className="px-10 py-5 bg-white text-black font-display font-bold text-lg rounded-full hover:scale-105 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all"
            >
                So, what does this cost? →
            </button>
        </motion.div>
    );
};
