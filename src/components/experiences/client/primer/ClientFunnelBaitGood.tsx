import { motion } from "framer-motion";
import { useState } from "react";

interface ClientFunnelBaitGoodProps {
    onComplete: () => void;
}

export const ClientFunnelBaitGood = ({ onComplete }: ClientFunnelBaitGoodProps) => {
    const [step, setStep] = useState<"ad" | "landing">("ad");

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="text-center space-y-4 mb-12">
                <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs font-bold tracking-widest text-primary font-mono mb-4">
                    THE FIX: RELEVANCE
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-light text-foreground">
                    Promise Kept.
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    The ad set an expectation. The landing page fulfilled it immediately.
                </p>
            </div>

            <div className="relative max-w-md mx-auto aspect-[9/16] bg-white border-8 border-border rounded-[3rem] overflow-hidden shadow-2xl relative text-black">

                {/* STATUS BAR */}
                <div className="absolute top-0 inset-x-0 h-8 bg-black/10 z-20 flex justify-between px-6 items-center">
                    <span className="text-[10px] font-bold">9:41</span>
                    <div className="flex gap-1">
                        <div className="w-4 h-2 bg-black/50 rounded-sm"></div>
                        <div className="w-4 h-2 bg-black/50 rounded-sm"></div>
                        <div className="w-4 h-2 bg-black rounded-sm"></div>
                    </div>
                </div>

                {/* AD STEP */}
                {step === "ad" && (
                    <motion.div
                        exit={{ opacity: 0, x: -100 }}
                        className="h-full bg-gray-100 p-4 pt-12 flex flex-col"
                    >
                        <div className="bg-white p-4 rounded-xl shadow-sm mb-4">
                            <div className="flex gap-2 items-center mb-2">
                                <div className="w-8 h-8 rounded-full bg-indigo-600"></div>
                                <div>
                                    <div className="text-xs font-bold">SneakerHeadz</div>
                                    <div className="text-[10px] text-gray-500">Sponsored</div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="text-sm">
                                    Flash Sale! 🚨 <br />
                                    <strong>50% OFF All Running Shoes.</strong> <br />
                                    Limited time only.
                                </div>
                                <div className="aspect-video bg-indigo-100 rounded-lg flex items-center justify-center text-4xl">
                                    👟
                                </div>
                                <button
                                    onClick={() => setStep("landing")}
                                    className="w-full bg-indigo-600 text-white py-2 rounded-lg font-bold text-sm"
                                >
                                    Shop Sale (50% Off)
                                </button>
                            </div>
                        </div>
                        <div className="text-center text-xs text-gray-400 mt-auto">Social Feed Simulation</div>
                    </motion.div>
                )}

                {/* LANDING STEP (GOOD UX) */}
                {step === "landing" && (
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="h-full bg-white flex flex-col pt-12"
                    >
                        {/* HEADER - Clear Brand */}
                        <div className="border-b p-4 flex justify-between items-center">
                            <div className="font-bold text-xl tracking-tighter">SNEAKERHEADZ</div>
                            <div className="text-xl">🔍</div>
                        </div>

                        {/* HERO - EXACT MATCH TO AD */}
                        <div className="bg-indigo-600 text-white p-6 text-center">
                            <h1 className="text-3xl font-black italic mb-2">50% OFF <br />RUNNING</h1>
                            <p className="text-indigo-200 text-xs mb-4">Discount applied at checkout.</p>
                            <div className="text-6xl my-4">👟</div>
                        </div>

                        {/* CONTENT - RELEVANT PRODUCTS */}
                        <div className="p-4 grid grid-cols-2 gap-4 overflow-y-auto">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="space-y-1">
                                    <div className="aspect-square bg-gray-50 rounded-xl flex items-center justify-center text-2xl">
                                        👟
                                    </div>
                                    <div className="font-bold text-xs">Aero Run {i}</div>
                                    <div className="flex gap-2 text-xs">
                                        <span className="text-red-600 font-bold">$60</span>
                                        <span className="text-gray-400 line-through">$120</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="p-4 mt-auto border-t bg-white">
                            <button
                                onClick={onComplete}
                                className="w-full py-3 bg-green-500 text-white font-bold rounded-xl shadow-lg hover:scale-105 transition-transform"
                            >
                                ✨ User Stays & Browses
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
