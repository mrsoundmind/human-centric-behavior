import { motion } from "framer-motion";

interface ClientFunnelChaosGoodProps {
    onComplete: () => void;
}

export const ClientFunnelChaosGood = ({ onComplete }: ClientFunnelChaosGoodProps) => {
    return (
        <div className="max-w-4xl mx-auto py-12 px-6 h-[800px]">
            <div className="text-center space-y-4 mb-8">
                <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs font-bold tracking-widest text-primary font-mono mb-4">
                    THE FIX: CLARITY
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-light text-foreground">
                    The Contrast.
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Same Brand. Same Product. <br />
                    <span className="text-primary">Zero Noise.</span>
                </p>
            </div>

            {/* THE APP CONTAINER - Clean Version */}
            <div className="relative max-w-4xl mx-auto border-8 border-border rounded-3xl overflow-hidden shadow-2xl bg-white text-slate-900 h-[600px] flex flex-col font-sans">

                {/* --- 1. CLEAN HEADER (Sticky but minimal) --- */}
                <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        {/* Same Logo as Bad UX */}
                        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-indigo-200 shadow-md">G</div>
                        <div className="text-xl font-bold tracking-tight text-indigo-900">GoldSure</div>
                    </div>

                    <div className="flex items-center gap-6 text-sm font-medium text-gray-500">
                        <span className="hidden md:inline hover:text-indigo-600 cursor-pointer transition-colors">How it Works</span>
                        <span className="hidden md:inline hover:text-indigo-600 cursor-pointer transition-colors">Interest Rates</span>
                        <button className="text-indigo-600 font-bold hover:bg-indigo-50 px-4 py-2 rounded-full transition-colors">
                            Login
                        </button>
                    </div>
                </div>

                {/* --- 2. FOCUSED HERO SECTION --- */}
                <div className="flex-1 bg-white flex items-center justify-center p-12 relative overflow-hidden">
                    {/* Subtle Background - Echoes the gradient but barely there */}
                    <div className="absolute right-0 top-0 w-2/3 h-full bg-gradient-to-l from-indigo-50 to-transparent"></div>

                    <div className="relative z-10 w-full max-w-4xl flex flex-col md:flex-row items-center gap-12">

                        {/* Left: Value Prop */}
                        <div className="flex-1 space-y-6">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-950 leading-tight">
                                Instant Cash for <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Your Gold.</span>
                            </h1>
                            <p className="text-gray-600 text-lg leading-relaxed">
                                Get the highest per-gram rate in the market. <br />
                                No processing fees. Money in your bank in 10 mins.
                            </p>

                            {/* Single Primary Action */}
                            <div className="pt-4">
                                <button
                                    onClick={onComplete}
                                    className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2"
                                >
                                    Check My Gold Value ➝
                                </button>
                                <p className="text-xs text-gray-400 mt-3 pl-1">
                                    No login required. 100% Secure.
                                </p>
                            </div>
                        </div>

                        {/* Right: Trust Signals (Replacing Chaos) */}
                        <div className="flex-1 flex justify-center">
                            <div className="grid grid-cols-1 gap-4 w-64">
                                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xl flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl">🛡️</div>
                                    <div>
                                        <div className="text-xs text-gray-500 font-bold uppercase">Security</div>
                                        <div className="font-bold text-indigo-900">Bank-Grade Vaults</div>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xl flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xl">⚖️</div>
                                    <div>
                                        <div className="text-xs text-gray-500 font-bold uppercase">Regulated</div>
                                        <div className="font-bold text-indigo-900">RBI Approved</div>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-xl flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center text-xl">⚡</div>
                                    <div>
                                        <div className="text-xs text-gray-500 font-bold uppercase">Speed</div>
                                        <div className="font-bold text-indigo-900">Disbursal in 10m</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* --- 3. PROOF (Replacing Footer Spam) --- */}
                <div className="bg-gray-50 border-t border-gray-100 p-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm text-xs font-medium text-gray-600">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Trusted by 1 Million+ Indians
                    </div>
                </div>

            </div>
        </div>
    );
};
