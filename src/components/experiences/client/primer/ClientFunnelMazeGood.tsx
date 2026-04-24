import { motion } from "framer-motion";
import { useState } from "react";

interface ClientFunnelMazeGoodProps {
    onComplete: () => void;
}

export const ClientFunnelMazeGood = ({ onComplete }: ClientFunnelMazeGoodProps) => {
    const [query, setQuery] = useState("");
    const [showResults, setShowResults] = useState(false);

    return (
        <div className="max-w-4xl mx-auto py-20 px-6">
            <div className="text-center space-y-4 mb-16">
                <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs font-bold tracking-widest text-primary font-mono mb-4">
                    THE FIX: FINDABILITY
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-light text-foreground">
                    Structure for <span className="text-primary">Humans</span>.
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Flatten the hierarchy. Expose the value. <br />
                    Stop hiding your most important assets.
                </p>
            </div>

            {/* THE APP CONTAINER - FIXED ACADEMIC STYLE */}
            <div className="relative max-w-4xl mx-auto border-4 border-border rounded-xl overflow-hidden shadow-2xl bg-white text-slate-900 h-[600px] flex flex-col font-serif">

                {/* 1. TOP BAR - Utility Nav */}
                <div className="bg-slate-900 text-slate-300 text-[10px] py-1 px-4 flex justify-end gap-4 border-b border-slate-700">
                    <span>Staff Login</span>
                    <span>Sitemap</span>
                    <span>Accessibility</span>
                </div>

                {/* 2. HEADER - Improved Alignment */}
                <div className="bg-white px-8 py-6 border-b-4 border-slate-900 flex justify-between items-center">
                    <div>
                        <div className="text-2xl font-bold tracking-tight text-slate-900 uppercase leading-none">Nexus Policy<br />Institute</div>
                    </div>

                    {/* KEY NAV ITEMS EXPOSED - Clean Row */}
                    <div className="flex items-center gap-8 text-sm font-bold text-slate-700 font-sans uppercase tracking-wide">
                        <span className="cursor-pointer hover:text-indigo-600 transition-colors">About</span>
                        <span className="cursor-pointer hover:text-indigo-600 transition-colors">Standards</span>
                        {/* THE KEY FIX: Policy Repo is Top Level */}
                        <span
                            onClick={onComplete}
                            className="cursor-pointer text-white bg-indigo-700 hover:bg-indigo-800 px-5 py-2 rounded-lg shadow-md transition-all hover:-translate-y-0.5"
                        >
                            Policy Repository
                        </span>
                        <span className="cursor-pointer hover:text-indigo-600 transition-colors">Contact</span>
                    </div>
                </div>

                {/* 3. HERO SEARCH - The Real Fix */}
                <div className="bg-slate-50 py-16 px-12 text-center border-b border-gray-200">
                    <h1 className="text-3xl font-serif text-slate-900 mb-6">Transparency & Governance Archive</h1>

                    <div className="max-w-xl mx-auto relative">
                        <div className="flex shadow-lg rounded-lg overflow-hidden border border-gray-300">
                            <input
                                type="text"
                                placeholder="Search for policies, minutes, or reports (e.g., 'Procurement')"
                                className="flex-1 px-4 py-3 text-sm font-sans outline-none text-slate-700"
                                value={query}
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                    if (e.target.value.length > 2) setShowResults(true);
                                }}
                            />
                            <button className="bg-indigo-700 text-white px-6 font-bold text-sm tracking-widest hover:bg-indigo-800">SEARCH</button>
                        </div>

                        {/* AUTOCOMPLETE RESULTS */}
                        {showResults && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl border border-indigo-100 overflow-hidden z-50 text-left font-sans"
                            >
                                <div className="p-2">
                                    <div
                                        onClick={onComplete}
                                        className="p-3 hover:bg-indigo-50 rounded cursor-pointer flex items-center justify-between group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="bg-indigo-100 p-2 rounded text-indigo-600 text-lg">📄</div>
                                            <div>
                                                <div className="font-bold text-slate-800 text-sm group-hover:text-indigo-700">Procurement_Guidelines_2024.pdf</div>
                                                <div className="text-xs text-gray-500">Updated: Oct 2024 • Governance &gt; Policies</div>
                                            </div>
                                        </div>
                                        <span className="text-gray-400 text-xs font-bold group-hover:text-indigo-700 group-hover:translate-x-1 transition-transform">DOWNLOAD ⬇</span>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* 4. CONTENT - SHORTCUTS */}
                <div className="flex-1 bg-white p-8 overflow-y-auto">
                    <div className="max-w-4xl mx-auto grid grid-cols-2 gap-8 font-serif">

                        {/* Latest Docs (The thing 90% of users want) */}
                        <div className="space-y-4">
                            <h3 className="font-bold text-lg text-slate-900 border-b pb-2">Most Requested Documents</h3>
                            <ul className="space-y-3 font-sans text-sm">
                                <li onClick={onComplete} className="flex items-baseline gap-2 cursor-pointer group">
                                    <span className="text-indigo-500">➤</span>
                                    <span className="text-slate-600 group-hover:text-indigo-700 underline decoration-indigo-200 group-hover:decoration-indigo-500">Procurement Guidelines (2024)</span>
                                </li>
                                <li className="flex items-baseline gap-2 cursor-pointer group">
                                    <span className="text-indigo-500">➤</span>
                                    <span className="text-slate-600 group-hover:text-indigo-700 underline decoration-indigo-200 group-hover:decoration-indigo-500">Annual Audited Reports 2023</span>
                                </li>
                                <li className="flex items-baseline gap-2 cursor-pointer group">
                                    <span className="text-indigo-500">➤</span>
                                    <span className="text-slate-600 group-hover:text-indigo-700 underline decoration-indigo-200 group-hover:decoration-indigo-500">Safety Compliance Handbook</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-4">
                            <h3 className="font-bold text-lg text-slate-900 border-b pb-2">Quick Navigation</h3>
                            <div className="flex gap-2 flex-wrap font-sans text-xs">
                                <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-600 hover:bg-slate-200 cursor-pointer">Board Minutes</span>
                                <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-600 hover:bg-slate-200 cursor-pointer">Financials</span>
                                <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-600 hover:bg-slate-200 cursor-pointer">ESG Reports</span>
                                <span className="bg-slate-100 px-3 py-1 rounded-full text-slate-600 hover:bg-slate-200 cursor-pointer">Tenders</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
// Force refresh v2
