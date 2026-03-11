import { motion } from "framer-motion";
import { useState } from "react";

interface ClientPrimerStoveProps {
    onComplete: () => void;
}

export const ClientPrimerStove = ({ onComplete }: ClientPrimerStoveProps) => {
    const [activeBurner, setActiveBurner] = useState<number | null>(null);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const knobs = [0, 1, 2, 3];
    // Target: Bottom Right Burner (Index 3). Knob mapping is non-obvious.
    // Let's say Knobs are linear [0,1,2,3] but Burners are Grid.
    // Mapping: Knob 0->TL, Knob 1->BL, Knob 2->TR, Knob 3->BR.

    const handleKnobClick = (index: number) => {
        setActiveBurner(index);
        if (index === 3) {
            setStatus("success");
            setTimeout(onComplete, 1500); // Wait 1.5s then move to lesson
        } else {
            setStatus("error");
        }
    };

    return (
        <div className="max-w-4xl mx-auto text-center space-y-12 py-12">
            <div className="space-y-4">
                <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest text-indigo-300 font-mono mb-4">
                    EXAMPLE 2: THE SUPPORT NIGHTMARE
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-light text-white">
                    The Mystery Stove
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Turn on the <strong>Bottom Right</strong> burner.
                </p>
            </div>

            <div className="max-w-md mx-auto bg-[#e5e5e5] p-8 rounded-3xl shadow-2xl border-4 border-gray-300/50 relative">
                {/* Burners */}
                <div className="grid grid-cols-2 gap-12 mb-12 px-8">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={`h-24 w-24 rounded-full border-4 relative flex items-center justify-center transition-all duration-500
                        ${activeBurner === i
                                    ? "border-red-500 bg-red-500 shadow-[0_0_50px_rgba(239,68,68,0.6)]"
                                    : "border-gray-800 bg-black/80"}`}
                        >
                            <div className="text-4xl">
                                {activeBurner === i && "🔥"}
                            </div>
                            {/* Label for target */}
                            {i === 3 && status === "idle" && (
                                <div className="absolute -bottom-8 text-black text-xs font-bold uppercase tracking-widest">Target</div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Knobs */}
                <div className="flex justify-center gap-6 bg-gray-200 p-4 rounded-xl">
                    {knobs.map((i) => (
                        <button
                            key={i}
                            onClick={() => handleKnobClick(i)}
                            className="w-12 h-12 bg-black rounded-full border-b-4 border-gray-600 hover:bg-gray-800 active:scale-95 transition-all shadow-lg relative"
                        >
                            <div className="w-1 h-4 bg-white mx-auto mt-1 rounded-full"></div>
                        </button>
                    ))}
                </div>

                {/* Status Message */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none">
                    {status === "error" && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-red-600 text-white px-6 py-2 rounded-full font-bold shadow-xl">
                            WRONG BURNER! FOOD BURNT! 😱
                        </motion.div>
                    )}
                    {status === "success" && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-green-600 text-white px-6 py-2 rounded-full font-bold shadow-xl">
                            Correct! (Finally)
                        </motion.div>
                    )}
                </div>
            </div>

            {status === "error" && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setStatus("idle")}
                    className="block mx-auto mt-4 text-xs text-gray-400 hover:text-white underline"
                >
                    Try Again
                </motion.button>
            )}
        </div>
    );
};
