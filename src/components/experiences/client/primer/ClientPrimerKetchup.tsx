import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface ClientPrimerKetchupProps {
    onComplete: () => void;
}

export const ClientPrimerKetchup = ({ onComplete }: ClientPrimerKetchupProps) => {
    // Glass State
    const [glassClicks, setGlassClicks] = useState(0);
    const [glassBlobs, setGlassBlobs] = useState<number[]>([]);

    // Squeeze State
    const [squeezeComplete, setSqueezeComplete] = useState(false);

    // Global Completion
    const [isFinished, setIsFinished] = useState(false);

    const handleGlassClick = () => {
        if (isFinished) return;
        setGlassClicks(prev => prev + 1);

        // Frustrating Physics: Nothing happens for first 5 clicks
        if (glassClicks > 5) {
            // Then slowly add small blobs
            const newBlob = Date.now();
            setGlassBlobs(prev => [...prev, newBlob]);
        }
    };

    const handleSqueezeClick = () => {
        if (isFinished) return;
        setSqueezeComplete(true);
        setIsFinished(true);
        setTimeout(onComplete, 2000); // Allow time to savor the victory
    };

    return (
        <div className="max-w-4xl mx-auto text-center space-y-12 py-12 px-6">
            <div className="space-y-4">
                <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest text-indigo-300 font-mono mb-4">
                    EXAMPLE 3: THE STRUGGLE
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-light text-white">
                    The Ketchup Race
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Design A vs Design B. <span className="text-white font-bold">Fight for the sauce.</span>
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-3xl mx-auto relative">

                {/* VS Badge */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black font-black text-xl rounded-full w-12 h-12 flex items-center justify-center z-10 border-4 border-gray-900 pointer-events-none">
                    VS
                </div>

                {/* --- GLASS BOTTLE (The Struggle) --- */}
                <div
                    className="bg-[#1a1a1a] rounded-3xl p-8 border border-white/5 flex flex-col items-center justify-between min-h-[400px] cursor-pointer active:scale-[0.98] transition-all select-none hover:bg-white/5"
                    onClick={handleGlassClick}
                >
                    <div className="text-center space-y-2 pointer-events-none">
                        <h3 className="text-2xl font-serif text-white">The Classic</h3>
                        <p className="text-xs text-gray-400 uppercase tracking-widest">Glass Interface</p>
                    </div>

                    <div className="relative h-48 w-full flex justify-center items-center pointer-events-none">
                        <motion.div
                            className="text-8xl relative z-10"
                            animate={glassClicks > 0 ? {
                                rotate: [0, -15, 15, -10, 10, 0],
                                y: [0, -20, 0]
                            } : {}}
                            transition={{ duration: 0.2 }}
                            key={glassClicks} // Re-trigger animation
                        >
                            🍾
                            {/* The "57" Hit Spot hint */}
                            {glassClicks < 5 && glassClicks > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="absolute -right-8 top-12 text-xs font-bold text-red-500 bg-white rounded-full px-2 py-1 rotate-12"
                                >
                                    HARDER!
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Droplets Layer */}
                        <div className="absolute bottom-0 w-full h-12 flex justify-center items-end gap-1 flex-wrap content-end">
                            <AnimatePresence>
                                {glassBlobs.map((blob, i) => (
                                    <motion.div
                                        key={blob}
                                        initial={{ y: -50, opacity: 0, scale: 0 }}
                                        animate={{ y: 0, opacity: 1, scale: 1 }}
                                        className="w-3 h-3 bg-red-600 rounded-full"
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    <div className="w-full bg-gray-800 h-16 rounded-xl relative overflow-hidden flex items-center justify-center border border-white/10 pointer-events-none">
                        {glassBlobs.length === 0 && (
                            <span className="text-xs text-gray-500 font-mono">TAP TO DISPENSE</span>
                        )}
                        {glassBlobs.length > 0 && (
                            <span className="text-xs text-gray-400 font-mono animate-pulse z-10 mix-blend-difference">KEEP TAPPING...</span>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-red-700 transition-all duration-300" style={{ height: `${Math.min(100, glassBlobs.length * 2)}%` }}></div>
                    </div>
                </div>

                {/* --- SQUEEZE BOTTLE (The Solution) --- */}
                <div
                    className="bg-indigo-900/20 rounded-3xl p-8 border border-indigo-500/30 flex flex-col items-center justify-between min-h-[400px] relative overflow-hidden group hover:bg-indigo-900/30 transition-all cursor-pointer active:scale-[0.98] select-none"
                    onClick={handleSqueezeClick}
                >
                    <div className="text-center space-y-2 relative z-10 pointer-events-none">
                        <h3 className="text-2xl font-sans font-bold text-white">The Modern</h3>
                        <p className="text-xs text-brand-blue uppercase tracking-widest">Squeeze Interface</p>
                    </div>

                    <div className="relative h-48 w-full flex justify-center items-center z-10 pointer-events-none">
                        <motion.div
                            className="text-8xl"
                            whileHover={{ scale: 1.1, rotate: 180 }}
                            whileTap={{ scale: 0.9, rotate: 180 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                        >
                            🥫
                        </motion.div>
                    </div>

                    {/* Squeeze Result - Instant SPLAT */}
                    <div className="w-full bg-gray-800 h-16 rounded-xl relative overflow-hidden flex items-center justify-center border border-white/10 z-10 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={squeezeComplete ? { scale: 20 } : { scale: 0 }}
                            transition={{ duration: 0.5, ease: "circIn" }}
                            className="absolute inset-0 bg-red-600 rounded-full"
                        ></motion.div>

                        {squeezeComplete ? (
                            <motion.span
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="relative z-20 font-bold text-white tracking-widest"
                            >
                                EFFICIENCY
                            </motion.span>
                        ) : (
                            <span className="relative z-10 text-xs text-gray-400 font-mono mix-blend-difference group-hover:text-white transition-colors">TAP TO DISPENSE</span>
                        )}
                    </div>
                </div>

            </div>

            <p className="text-sm text-gray-500">
                {isFinished ? "Winner: The one designed for Humans." : "Tap the cards to dispense sauce."}
            </p>
        </div>
    );
};
