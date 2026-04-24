import { motion } from "framer-motion";
import { useState } from "react";

interface ClientFunnelBaitProps {
    onComplete: () => void;
}

export const ClientFunnelBait = ({ onComplete }: ClientFunnelBaitProps) => {
    const [step, setStep] = useState<"ad" | "landing" | "bounced">("ad");

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="text-center space-y-4 mb-12">
                <div className="inline-block px-4 py-1.5 rounded-full bg-muted border border-border text-xs font-bold tracking-widest text-primary font-mono mb-4">
                    SCENARIO 1: THE DISCONNECT
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-light text-foreground">
                    The "Marketing" Win
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Your marketing team just crushed it. High CTR. Low CPC. <br />
                    Here comes the lead...
                </p>
            </div>

            <div className="relative max-w-md mx-auto aspect-[9/16] bg-card border-8 border-border rounded-[3rem] overflow-hidden shadow-2xl relative">
                {/* Status Bar */}
                <div className="absolute top-0 left-0 right-0 h-6 bg-card z-20 flex justify-between px-6 items-center">
                    <div className="text-[10px] text-foreground font-mono">9:41</div>
                    <div className="flex gap-1">
                        <div className="w-3 h-3 bg-foreground rounded-full"></div>
                        <div className="w-3 h-3 bg-foreground rounded-full"></div>
                    </div>
                </div>

                {/* STEP 1: THE AD (Social Feed) */}
                {step === "ad" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full bg-gray-900 pt-10 px-4"
                    >
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                            <div className="text-xs text-white">SocialMedia App</div>
                        </div>

                        {/* The Ad Card */}
                        <div className="bg-gray-800 rounded-xl overflow-hidden mb-4 border border-gray-700">
                            <div className="h-48 bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
                                <span className="text-6xl">👟</span>
                            </div>
                            <div className="p-4">
                                <div className="text-xs text-blue-400 font-bold uppercase mb-1">Sponsored</div>
                                <h3 className="text-white font-bold text-lg mb-1">50% OFF RED RUNNERS!</h3>
                                <p className="text-gray-400 text-sm mb-4">Flash Sale! Ends in 1 hour. Don't miss out on the Red Runner Pro.</p>
                                <button
                                    onClick={() => setStep("landing")}
                                    className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors"
                                >
                                    Shop Now
                                </button>
                            </div>
                        </div>
                        <div className="h-20 bg-gray-800/50 rounded-xl"></div>
                    </motion.div>
                )}

                {/* STEP 2: THE LANDING PAGE (Generic / Bad) */}
                {step === "landing" && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        className="h-full bg-white pt-10 flex flex-col"
                    >
                        {/* Browser Bar */}
                        <div className="bg-gray-100 p-2 border-b border-gray-200 flex items-center gap-2">
                            <div className="w-20 h-2 bg-gray-300 rounded"></div>
                        </div>

                        {/* Generic Hero */}
                        <div className="bg-gray-800 h-40 flex flex-col items-center justify-center text-center p-4">
                            <h2 className="text-white font-bold text-xl mb-2">Welcome to ShoeStore</h2>
                            <p className="text-gray-400 text-xs">We sell all kinds of shoes.</p>
                        </div>

                        {/* Grid of unrelated items */}
                        <div className="p-4 grid grid-cols-2 gap-4 overflow-hidden">
                            <div className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center p-2">
                                <span className="text-2xl mb-2">👢</span>
                                <span className="text-xs text-gray-500 text-center">Brown Boots</span>
                            </div>
                            <div className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center p-2">
                                <span className="text-2xl mb-2">👠</span>
                                <span className="text-xs text-gray-500 text-center">Heels</span>
                            </div>
                            <div className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center p-2">
                                <span className="text-2xl mb-2">👞</span>
                                <span className="text-xs text-gray-500 text-center">Loafers</span>
                            </div>
                            <div className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center p-2">
                                <span className="text-2xl mb-2">👡</span>
                                <span className="text-xs text-gray-500 text-center">Sandals</span>
                            </div>
                        </div>

                        {/* User Reaction: Bounce */}
                        <div className="absolute bottom-8 left-4 right-4 text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className="bg-black/90 text-white p-4 rounded-xl shadow-xl border border-red-500/50"
                            >
                                <p className="font-bold text-red-400 mb-1">Where are the Red Shoes??</p>
                                <p className="text-xs text-gray-400 mb-4">I'm not scrolling through this.</p>
                                <button
                                    onClick={() => setStep("bounced")}
                                    className="px-6 py-2 bg-red-600 rounded-full text-sm font-bold"
                                >
                                    Close Tab (Bounce)
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>
                )}

                {/* STEP 3: BOUNCED */}
                {step === "bounced" && (
                    <div className="h-full bg-card flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            onAnimationComplete={() => setTimeout(onComplete, 1500)}
                            className="text-center"
                        >
                            <div className="text-6xl mb-4">💸</div>
                            <div className="text-foreground font-bold text-xl">Lead Lost.</div>
                        </motion.div>
                    </div>
                )}
            </div>
        </div>
    );
};
