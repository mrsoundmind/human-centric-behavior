import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ClientAnalysisScreenProps {
    metrics: { time: number; clicks: number; attempts: number } | null;
    onContinue: () => void;
}

export const ClientAnalysisScreen = ({ metrics, onContinue }: ClientAnalysisScreenProps) => {
    // Defaults
    const [visitors, setVisitors] = useState(10000);
    const [ticketSize, setTicketSize] = useState(50);

    // Benchmark
    const IDEAL_TIME = 8.0; // Seconds before drop-off spikes
    const userTime = metrics?.time || 0;

    // Calculate Drop-off Rate based on time
    // Source: Akamai/Aberdeen: 1s delay = ~7% drop in conversion
    const delay = Math.max(0, userTime - IDEAL_TIME);
    const dropOffRate = Math.min(0.90, delay * 0.07);

    // Financials
    const potentialRevenue = visitors * ticketSize;
    const actualRevenue = potentialRevenue * (1 - dropOffRate);
    const lostRevenue = potentialRevenue - actualRevenue;

    return (
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">

            {/* Left: The Result */}
            <div className="space-y-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                >
                    <h2 className="text-3xl font-display font-light text-white">The Cost of Friction</h2>
                    <p className="text-gray-400">
                        You struggled. Your users will just leave.<br />
                        Here is what that "small UX issue" looks like on a P&L sheet.
                    </p>
                </motion.div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
                    <div className="flex justify-between items-end">
                        <div className="text-sm text-gray-400">Your Time</div>
                        <div className="text-2xl font-mono text-pink-500">{userTime.toFixed(1)}s</div>
                    </div>

                    {/* Visual Bar Comparison */}
                    <div className="space-y-2">
                        <div className="h-4 bg-white/10 rounded-full overflow-hidden relative">
                            {/* User Bar */}
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1 }}
                                className="absolute top-0 left-0 h-full bg-pink-500"
                            />
                            {/* Ideal Marker */}
                            <div
                                className="absolute top-0 bottom-0 w-0.5 bg-white z-10 box-content border-x border-black/50"
                                style={{ left: `${(IDEAL_TIME / Math.max(userTime, 12)) * 100}%` }}
                            ></div>
                        </div>
                        <div className="flex justify-between text-[10px] text-gray-500 uppercase tracking-wider">
                            <span>0s</span>
                            <span className="text-white">Benchmark: {IDEAL_TIME}s</span>
                            <span>{Math.max(userTime, 12).toFixed(0)}s</span>
                        </div>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-white/10">
                        <div className="text-sm text-gray-400">Est. Drop-off Rate</div>
                        <div className="text-xl font-bold text-pink-500">{(dropOffRate * 100).toFixed(0)}%</div>
                    </div>

                    <p className="text-[10px] text-gray-500 italic">
                        *Formula: 7% drop-off per second of delay (Source: Akamai/Aberdeen study).
                    </p>
                </div>
            </div>

            {/* Right: The Calculator */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-[#0F172A] border border-indigo-500/30 rounded-3xl p-8 shadow-[0_0_50px_rgba(79,70,229,0.1)] relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-light text-white">Impact Calculator</h3>
                    {/* Business Model Toggle */}
                    <select
                        className="bg-white/5 border border-white/10 rounded-lg text-xs px-2 py-1 text-gray-400 focus:outline-none focus:text-white"
                        value={ticketSize === 50 ? "ecomm" : ticketSize === 500 ? "b2b" : "custom"}
                        onChange={(e) => {
                            if (e.target.value === "ecomm") { setTicketSize(50); setVisitors(10000); }
                            if (e.target.value === "b2b") { setTicketSize(500); setVisitors(1000); }
                        }}
                    >
                        <option value="ecomm">E-Commerce</option>
                        <option value="b2b">B2B / SaaS</option>
                        <option value="custom">Custom</option>
                    </select>
                </div>

                <div className="space-y-6 mb-8">
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <label className="text-gray-400">Monthly Traffic / Users</label>
                            <span className="text-white font-mono">{visitors.toLocaleString()}</span>
                        </div>
                        <input
                            type="range"
                            min="500" max="50000" step="500"
                            value={visitors}
                            onChange={(e) => setVisitors(Number(e.target.value))}
                            className="w-full accent-indigo-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <label className="text-gray-400">Value per User / Conversion</label>
                            <span className="text-white font-mono">${ticketSize}</span>
                        </div>
                        <div className="flex gap-2 items-center">
                            <input
                                type="range"
                                min="10" max="1000" step="10"
                                value={ticketSize}
                                onChange={(e) => setTicketSize(Number(e.target.value))}
                                className="w-full accent-indigo-500 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer"
                            />
                            {/* Manual Input Override */}
                            <input
                                type="number"
                                value={ticketSize}
                                onChange={(e) => setTicketSize(Number(e.target.value))}
                                className="w-20 bg-black/20 border border-white/10 rounded px-2 py-1 text-xs text-white text-right"
                            />
                        </div>
                        <p className="text-[10px] text-gray-500">
                            *If unknown, use Customer Lifetime Value (LTV)
                        </p>
                    </div>
                </div>

                <div className="bg-pink-500/10 border border-pink-500/20 rounded-xl p-6 text-center space-y-2">
                    <p className="text-pink-400 text-xs uppercase tracking-widest font-bold">Monthly Revenue At Risk</p>
                    <div className="text-4xl md:text-5xl font-mono text-white font-light">
                        ${lostRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </div>
                    <p className="text-gray-500 text-xs">
                        Based on {(dropOffRate * 100).toFixed(0)}% friction drop-off
                    </p>
                </div>

                <button
                    onClick={onContinue}
                    className="w-full mt-8 py-4 bg-white text-black font-display font-bold rounded-xl hover:scale-[1.02] transition-transform shadow-lg"
                >
                    Book Your Audit →
                </button>

            </motion.div>
        </div>
    );
};
