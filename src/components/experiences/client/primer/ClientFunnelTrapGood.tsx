import { motion } from "framer-motion";

interface ClientFunnelTrapGoodProps {
    onComplete: () => void;
}

export const ClientFunnelTrapGood = ({ onComplete }: ClientFunnelTrapGoodProps) => {
    return (
        <div className="max-w-5xl mx-auto py-12 px-6">
            <div className="text-center space-y-4 mb-12">
                <div className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-xs font-bold tracking-widest text-green-400 font-mono mb-4">
                    THE FIX: TRANSPARENCY
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-light text-white">
                    Value First, Ask Later.
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Give them what they want. <br />
                    They will contact you when they are ready.
                </p>
            </div>

            <div className="relative max-w-5xl mx-auto h-[600px] bg-white border-4 border-gray-800 rounded-xl overflow-hidden shadow-2xl relative text-slate-900 flex flex-col">
                {/* Desktop Header */}
                <div className="bg-white border-b px-6 py-4 flex justify-between items-center z-10 shadow-sm shrink-0">
                    <div className="flex items-center gap-8">
                        <div className="font-serif font-bold tracking-tight text-xl text-indigo-900">LUXE ESTATES</div>
                        <div className="hidden md:flex gap-6 text-xs font-bold text-gray-400 uppercase tracking-widest">
                            <span className="text-indigo-600">Buy</span>
                            <span>Rent</span>
                            <span>Sell</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs font-bold">JD</div>
                    </div>
                </div>

                {/* Desktop Split View */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Left: Media Gallery */}
                    <div className="w-3/5 bg-slate-50 p-2 gap-2 grid grid-rows-2">
                        <div className="bg-slate-200 relative rounded-lg overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-serif italic text-lg">
                                [Stunning Exterior - Sunset]
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-xs">[Living Room]</div>
                            <div className="bg-slate-200 rounded-lg flex items-center justify-center text-slate-400 text-xs">[Kitchen]</div>
                        </div>
                    </div>

                    {/* Right: Listing Details - THE GOOD VERSION */}
                    <div className="w-2/5 overflow-y-auto p-8 relative bg-white flex flex-col">
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h1 className="text-3xl font-serif font-bold leading-tight text-slate-900">The Azure Penthouse</h1>
                                <div className="text-2xl font-bold text-indigo-600">$2,450,000</div>
                            </div>

                            {/* UNLOCKED CONTENT */}
                            <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl my-6">
                                <div className="flex justify-between items-center mb-3">
                                    <h3 className="font-bold text-indigo-900 text-sm">Floor Plan & Brochure</h3>
                                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Unlocked</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="flex items-center justify-center gap-2 bg-white border border-indigo-200 py-3 rounded-lg text-xs font-bold text-indigo-700 hover:bg-indigo-50 transition-colors shadow-sm">
                                        <span>📄</span> Download PDF
                                    </button>
                                    <button className="flex items-center justify-center gap-2 bg-white border border-indigo-200 py-3 rounded-lg text-xs font-bold text-indigo-700 hover:bg-indigo-50 transition-colors shadow-sm">
                                        <span>👀</span> 3D Virtual Tour
                                    </button>
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-6">
                                Interested? Choose how you want to connect. <br /> No pressure.
                            </p>
                        </div>

                        {/* Low Friction CTA */}
                        <div className="space-y-3 mt-auto" onClick={onComplete}>
                            <button className="w-full py-4 bg-black text-white font-bold text-sm tracking-widest uppercase hover:bg-gray-800 transition-colors rounded-lg shadow-xl cursor-pointer">
                                Schedule a Showing
                            </button>
                            <div className="text-center">
                                <span className="text-xs text-gray-400 font-medium">Book directly on the calendar. No phone calls required.</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Celebration Overlay */}
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8, type: "spring" }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <div className="bg-green-500 text-white px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-3">
                        <span className="text-2xl">🤝</span>
                        <div>
                            <div className="text-xs opacity-90 uppercase tracking-wider">Outcome</div>
                            <div className="text-sm">High Quality Lead Generated</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};
