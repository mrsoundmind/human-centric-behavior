import { motion } from "framer-motion";
import { useState } from "react";

interface ClientFunnelTrapProps {
    onComplete: () => void;
}

export const ClientFunnelTrap = ({ onComplete }: ClientFunnelTrapProps) => {
    const [step, setStep] = useState<"view" | "blocked" | "abandoned">("view");

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="text-center space-y-4 mb-12">
                <div className="inline-block px-4 py-1.5 rounded-full bg-muted border border-border text-xs font-bold tracking-widest text-primary font-mono mb-4">
                    SCENARIO 4: THE LEAK
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-light text-foreground">
                    The "Lead Gen" Trap
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    They are interested in your product. <br />
                    But you treat them like a lead, not a human.
                </p>
            </div>

            <div className="relative max-w-5xl mx-auto h-[600px] bg-white border-4 border-border rounded-xl overflow-hidden shadow-2xl relative text-slate-900 flex flex-col">
                {/* Desktop Header */}
                <div className="bg-white border-b px-6 py-4 flex justify-between items-center z-10 shadow-sm shrink-0">
                    <div className="flex items-center gap-8">
                        <div className="font-serif font-bold tracking-tight text-xl">LUXE ESTATES</div>
                        <div className="hidden md:flex gap-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
                            <span>Buy</span>
                            <span>Rent</span>
                            <span>Sell</span>
                            <span>Agents</span>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <button className="text-xs font-bold border border-slate-900 px-4 py-2 hover:bg-slate-900 hover:text-white transition-colors">Log In</button>
                        <button className="text-xs font-bold bg-slate-900 text-white px-4 py-2 hover:bg-slate-700 transition-colors">Sign Up</button>
                    </div>
                </div>

                {/* Desktop Split View */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Left: Media Gallery */}
                    <div className="w-3/5 bg-slate-100 p-2 gap-2 grid grid-rows-2">
                        <div className="bg-gradient-to-br from-slate-200 to-slate-300 relative rounded-lg overflow-hidden group cursor-pointer hover:opacity-95 transition-opacity border-2 border-slate-400/30">
                            <div className="absolute inset-0 flex items-center justify-center text-slate-600 font-serif italic text-lg font-bold">
                                [Stunning Exterior - Sunset]
                            </div>
                            <div className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 font-bold tracking-wider shadow-lg">JUST LISTED</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center text-slate-600 text-xs font-semibold border border-slate-300">[Living Room]</div>
                            <div className="bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg flex items-center justify-center text-slate-600 text-xs font-semibold relative border border-slate-300">
                                [Kitchen]
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center text-white font-bold text-lg opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                                    +12 Photos
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Listing Details */}
                    <div className="w-2/5 overflow-y-auto p-8 relative bg-white">
                        <div className="mb-6">
                            <div className="flex justify-between items-start mb-2">
                                <h1 className="text-3xl font-serif font-bold leading-tight text-slate-900">The Azure Penthouse</h1>
                                <div className="text-2xl font-bold text-slate-900">$2,450,000</div>
                            </div>
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Financial District • New York</p>

                            <div className="flex gap-6 text-sm py-4 border-y border-gray-100 mb-6">
                                <div className="flex flex-col"><span className="font-bold text-xl">3</span> <span className="text-gray-400 text-xs uppercase">Beds</span></div>
                                <div className="flex flex-col"><span className="font-bold text-xl">3.5</span> <span className="text-gray-400 text-xs uppercase">Baths</span></div>
                                <div className="flex flex-col"><span className="font-bold text-xl">2,800</span> <span className="text-gray-400 text-xs uppercase">Sqft</span></div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <h3 className="font-bold text-sm uppercase tracking-widest text-gray-400">Description</h3>
                                <p className="text-sm text-gray-600 leading-relaxed">
                                    Experience unparalleled luxury in this sky-high sanctuary. Featuring floor-to-ceiling windows,
                                    chef's kitchen, and a private terrace with panoramic city views.
                                    <span className="text-indigo-600 font-bold cursor-pointer"> Read More</span>
                                </p>
                            </div>

                            {/* The Bait */}
                            <div className="bg-slate-50 p-6 border rounded-xl space-y-4 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-slate-700">Detailed Floor Plan</span>
                                    <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full uppercase tracking-wide font-bold">PDF Available</span>
                                </div>
                                <div className="h-32 bg-white border-2 border-dashed border-gray-200 rounded-lg relative overflow-hidden group cursor-pointer" onClick={() => setStep("blocked")}>
                                    <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-sm blur-[2px] select-none group-hover:scale-105 transition-transform duration-700">
                                        [FLOOR PLAN PREVIEW]
                                    </div>
                                    <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] flex items-center justify-center">
                                        <div className="bg-white shadow-lg px-4 py-2 rounded-full flex items-center gap-2 transform group-hover:-translate-y-1 transition-transform">
                                            <span>🔒</span>
                                            <span className="text-xs font-bold text-slate-900">Unlock to View</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sticky Action Footer purely visual in this mocked scroll view */}
                        <div className="pt-4 border-t">
                            <button
                                onClick={() => setStep("blocked")}
                                className="w-full py-4 bg-indigo-600 text-white font-bold text-sm tracking-widest uppercase hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 mb-3"
                            >
                                Schedule Private Viewing
                            </button>
                            <button
                                onClick={() => setStep("blocked")}
                                className="w-full py-4 bg-white border-2 border-slate-900 text-slate-900 font-bold text-sm tracking-widest uppercase hover:bg-slate-50 transition-colors"
                            >
                                Download Brochure
                            </button>
                        </div>
                    </div>
                </div>

                {/* THE TRAP (Desktop Modal) */}
                {step === "blocked" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-12"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white w-full max-w-lg rounded-2xl p-8 shadow-2xl relative flex flex-col max-h-full"
                        >
                            {/* USER THOUGHT REACTION - Making the problem evident */}
                            <motion.div
                                initial={{ opacity: 0, x: 20, rotate: 5 }}
                                animate={{ opacity: 1, x: 0, rotate: 0 }}
                                transition={{ delay: 0.5, type: "spring" }}
                                className="absolute -right-32 top-0 bg-indigo-600 text-white p-4 rounded-xl rounded-bl-none shadow-xl w-48 z-50 font-sans text-sm font-bold border-2 border-white transform translate-x-1/2 md:translate-x-0"
                            >
                                <div className="absolute bottom-0 left-0 w-4 h-4 bg-indigo-600 transform translate-y-1/2 -translate-x-1/2 rotate-45 border-r-2 border-b-2 border-white"></div>
                                "Are you serious? I just want to see the layout! I'm not giving you my number."
                            </motion.div>

                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4 border-4 border-indigo-100">
                                    🔒
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-slate-900 mb-2">Unlock Property Access</h3>
                                <p className="text-sm text-gray-500 max-w-xs mx-auto">
                                    Enter your details to instantly view floor plans, pricing history, and HD tours.
                                </p>
                            </div>

                            <form className="space-y-4 mb-6" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">First Name *</label>
                                        <input type="text" className="w-full bg-slate-50 border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-indigo-500" placeholder="Jane" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Last Name *</label>
                                        <input type="text" className="w-full bg-slate-50 border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-indigo-500" placeholder="Doe" />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">Mobile Number *</label>
                                    <div className="flex gap-2">
                                        <div className="w-20 bg-slate-50 border border-gray-200 rounded p-2.5 text-sm text-center text-gray-500 flex items-center justify-center gap-1">
                                            🇺🇸 +1
                                        </div>
                                        <input type="tel" className="flex-1 bg-slate-50 border border-gray-200 rounded p-2.5 text-sm focus:outline-none focus:border-indigo-500" placeholder="(555) 000-0000" />
                                    </div>
                                    <p className="text-[10px] text-green-600 flex items-center gap-1 mt-1">
                                        <span>✓</span> Verified Partner Agent will call within 5 mins
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">I am a...</label>
                                    <div className="flex gap-2">
                                        <button className="flex-1 py-2 border border-indigo-600 bg-indigo-50 text-indigo-700 font-bold text-xs rounded">Buyer</button>
                                        <button className="flex-1 py-2 border border-gray-200 text-gray-500 font-bold text-xs rounded hover:border-gray-300">Renter</button>
                                        <button className="flex-1 py-2 border border-gray-200 text-gray-500 font-bold text-xs rounded hover:border-gray-300">Investor</button>
                                    </div>
                                </div>
                            </form>

                            <button className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg shadow-lg text-sm uppercase tracking-widest transition-all transform hover:scale-[1.01] active:scale-[0.99] mb-4">
                                Continue to Listing
                            </button>

                            <p className="text-[10px] text-center text-gray-400">
                                By proceeding, you consent to receive automated calls/texts from Luxe Estates and its affiliates.
                            </p>

                            {/* Close Button - Triggers Abandon */}
                            <button
                                onClick={() => {
                                    setStep("abandoned");
                                    setTimeout(onComplete, 2000);
                                }}
                                className="absolute top-4 right-4 text-gray-300 hover:text-red-500 transition-colors bg-white rounded-full p-2 shadow-sm border hover:border-red-200"
                            >
                                ✕
                            </button>
                        </motion.div>
                    </motion.div>
                )}

                {/* Abandoned State */}
                {step === "abandoned" && (
                    <div className="absolute inset-0 bg-slate-900/95 z-50 flex items-center justify-center flex-col gap-6 text-center animate-in fade-in duration-300">
                        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center border border-red-500/20 mb-2">
                            <div className="text-5xl">🚫</div>
                        </div>
                        <div>
                            <div className="text-foreground font-serif font-bold text-3xl mb-2">Browser Window Closed.</div>
                            <div className="text-primary text-lg italic font-light">
                                "I'm just browsing. I don't want an agent calling me."
                            </div>
                        </div>
                        <div className="mt-8 px-6 py-2 rounded-full border border-border text-xs font-mono text-muted-foreground">
                            Lead Status: <span className="text-red-500">LOST</span> • Opportunity Cost: <span className="text-red-500">HIGH</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
