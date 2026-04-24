import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface ClientFunnelMazeProps {
    onComplete: () => void;
}

export const ClientFunnelMaze = ({ onComplete }: ClientFunnelMazeProps) => {
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [path, setPath] = useState<string[]>([]);
    const [found, setFound] = useState(false);
    const [showGiveUp, setShowGiveUp] = useState(false);

    // The Goal: Find "Gold Valuation Policy 2024"
    // Path: "Governance" -> "Compliance" -> "Policy Repository" -> "Fiscal Year 2024-25" -> "Gold Valuation"

    useEffect(() => {
        const timer = setTimeout(() => setShowGiveUp(true), 5000);
        return () => clearTimeout(timer);
    }, []);

    const handleMenuClick = (menu: string) => {
        if (activeMenu === menu) setActiveMenu(null);
        else setActiveMenu(menu);
    };

    const handleSubMenuClick = (item: string) => {
        setPath(prev => [...prev, item]);

        // Simulation of a "deep dive" reload
        setActiveMenu(null);
    };

    const handleCorrectFind = () => {
        setFound(true);
        setTimeout(onComplete, 3000);
    };

    const handleGiveUp = () => {
        setFound(true); // Reveal it briefly or just skip
        setTimeout(onComplete, 500);
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-6 h-[800px]">
            <div className="text-center space-y-4 mb-8">
                <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs font-bold tracking-widest text-primary font-mono mb-4">
                    SCENARIO 3: THE MAZE
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-light text-foreground">
                    The "Where is it?" Loop
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Task: Find the <strong>"Procurement Guidelines"</strong>. <br />
                    <span className="text-primary text-sm">(Because Information Architecture is "hard")</span>
                </p>
            </div>

            {/* THE APP CONTAINER - ACADEMIC / COMPLIANCE STYLE */}
            <div className="relative max-w-4xl mx-auto border-4 border-border rounded-xl overflow-hidden shadow-2xl bg-white text-slate-900 h-[600px] flex flex-col font-serif">

                {/* 1. TOP BAR - Utility Nav */}
                <div className="bg-slate-900 text-slate-300 text-[10px] py-1 px-4 flex justify-end gap-4 border-b border-slate-700">
                    <span>Staff Login</span>
                    <span>Intranet</span>
                    <span>Sitemap</span>
                    <span>Accessibility</span>
                    <span>Francais</span>
                </div>

                {/* 2. HEADER - Logo & Search */}
                <div className="bg-white p-6 border-b-4 border-slate-900 flex justify-between items-end">
                    <div>
                        <div className="text-2xl font-bold tracking-tight text-slate-900 uppercase">Nexus Policy Institute</div>
                        <div className="text-xs text-slate-500 italic">Established 1998 • Global Research NGO • ISO 9001</div>
                    </div>
                    <div className="flex gap-2">
                        <input type="text" placeholder="Search Repo..." className="border border-gray-300 px-2 py-1 text-xs w-48" />
                        <button className="bg-slate-900 text-white px-3 py-1 text-xs font-bold">GO</button>
                    </div>
                </div>

                {/* 3. NAVIGATION - THE HAMBURGER MAZE (Debug Menu Style) */}
                <div className="bg-slate-900 text-white p-4 flex justify-between items-center relative z-30 shadow-md">
                    <div className="font-bold tracking-widest text-xs">OFFICIAL REPOSITORY</div>
                    <button
                        onClick={() => setActiveMenu(activeMenu === 'OPEN' ? null : 'OPEN')}
                        className={`flex items-center gap-2 border px-3 py-1 rounded transition-all ${activeMenu === 'OPEN'
                            ? 'bg-slate-800 border-white text-white'
                            : 'border-slate-600 hover:bg-slate-800 animate-pulse border-indigo-500/50 shadow-lg'
                            }`}
                    >
                        <span className="uppercase text-[10px] font-bold tracking-widest text-indigo-300">Menu</span>
                        <div className="space-y-1">
                            <span className="block w-4 h-0.5 bg-white"></span>
                            <span className="block w-4 h-0.5 bg-white"></span>
                            <span className="block w-4 h-0.5 bg-white"></span>
                        </div>
                    </button>
                </div>

                {/* 4. CONTENT / BREADCRUMBS */}
                <div className="flex-1 bg-white p-8 overflow-y-auto">

                    {/* Breadcrumbs */}
                    <div className="text-[10px] text-gray-400 mb-6 uppercase tracking-wider flex items-center gap-2">
                        <span>Home</span>
                        {path.map((p, i) => (
                            <span key={i}>/ {p}</span>
                        ))}
                    </div>

                    <div className="max-w-3xl">
                        {path.length === 0 && (
                            <div className="space-y-6">
                                <h1 className="text-3xl font-serif text-slate-900 border-b pb-4">Welcome to Nexus Policy Institute</h1>
                                <p className="text-sm text-gray-600 leading-relaxed font-sans">
                                    We are dedicated to fostering transparent, evidence-based development policies globally.
                                    Please utilize the navigation above to access our comprehensive repository of documents,
                                    frameworks, and compliance standards.
                                </p>
                                <div className="grid grid-cols-2 gap-4 mt-8">
                                    <div className="bg-slate-50 p-4 border border-slate-200">
                                        <h3 className="font-bold text-sm mb-2">Latest Publication</h3>
                                        <div className="text-xs text-indigo-700 underline cursor-pointer">Impact Assessment of Q3 2025</div>
                                    </div>
                                    <div className="bg-slate-50 p-4 border border-slate-200">
                                        <h3 className="font-bold text-sm mb-2">Notice Board</h3>
                                        <div className="text-xs text-indigo-700 underline cursor-pointer">AGM Rescheduled</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {path.includes("Compliance") && !path.includes("Repository") && (
                            <div className="space-y-6">
                                <h1 className="text-2xl font-serif text-slate-900 border-b pb-4">Compliance Frameworks</h1>
                                <div className="space-y-2 font-sans text-sm">
                                    <div
                                        onClick={() => handleSubMenuClick("Repository")}
                                        className="p-3 bg-gray-50 border hover:bg-indigo-50 cursor-pointer flex justify-between group"
                                    >
                                        <span className="font-bold text-slate-700 group-hover:text-indigo-700">Policy Repository (Global)</span>
                                        <span>📂</span>
                                    </div>
                                    <div className="p-3 bg-gray-50 border opacity-50"><span className="font-bold text-slate-700">Local Regulations</span></div>
                                    <div className="p-3 bg-gray-50 border opacity-50"><span className="font-bold text-slate-700">Statutory Bodies</span></div>
                                </div>
                            </div>
                        )}

                        {path.includes("Repository") && !found && (
                            <div className="space-y-6">
                                <h1 className="text-2xl font-serif text-slate-900 border-b pb-4">Policy Repository</h1>
                                <div className="grid grid-cols-3 gap-4 font-sans text-xs">
                                    {[2025, 2024, 2023, 2022, 2021].map(year => (
                                        <div
                                            key={year}
                                            onClick={() => year === 2024 ? handleCorrectFind() : null}
                                            className={`p-4 border text-center cursor-pointer hover:border-indigo-500 ${year === 2024 ? 'bg-indigo-50 border-indigo-200 font-bold' : 'bg-gray-50'}`}
                                        >
                                            Fiscal Year {year}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {found && (
                            <div className="border-2 border-green-500 bg-green-50 p-8 text-center rounded-lg">
                                <h1 className="text-2xl font-bold text-green-900 mb-2">Document Found!</h1>
                                <p className="text-green-700 text-sm">"Procurement_Guidelines_2024.pdf"</p>
                                <p className="text-xs text-gray-500 mt-4">(It took 4 clicks and deep domain knowledge to find a basic policy.)</p>
                            </div>
                        )}

                    </div>
                </div>

                {/* FULL HEIGHT OVERLAY DRAWER - MOVED HERE */}
                {activeMenu === 'OPEN' && (
                    <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
                        {/* Click outside to close */}
                        <div className="flex-1" onClick={() => setActiveMenu(null)} />

                        {/* The Sidebar */}
                        <div className="w-80 h-full bg-slate-900 border-l border-slate-700 flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
                            <div className="p-4 border-b border-slate-700 flex justify-between items-center bg-slate-950">
                                <h4 className="text-xs font-bold text-white uppercase tracking-widest">NEXUS NAV</h4>
                                <button onClick={() => setActiveMenu(null)} className="text-gray-400 hover:text-white">✕</button>
                            </div>

                            <div className="overflow-y-auto flex-1 p-2 space-y-6">
                                {/* PHASE 1 */}
                                <div>
                                    <div className="px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 mb-2">
                                        Phase 1: Corporate
                                    </div>
                                    <ul className="space-y-1 px-2">
                                        <li className="px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded cursor-pointer">Mission Statement</li>
                                        <li className="px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded cursor-pointer">Executive Board</li>
                                        <li className="px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded cursor-pointer">History & Legacy</li>
                                    </ul>
                                </div>

                                {/* PHASE 2 - THE GOAL */}
                                <div>
                                    <div className="px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 mb-2">
                                        Phase 2: Governance
                                    </div>
                                    <ul className="space-y-1 px-2">
                                        <li className="px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded cursor-pointer">Constitution</li>
                                        <li
                                            onClick={() => handleSubMenuClick("Compliance")}
                                            className="px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded cursor-pointer flex justify-between group"
                                        >
                                            <span>Compliance Frameworks</span>
                                            <span className="opacity-0 group-hover:opacity-100">▸</span>
                                        </li>
                                        <li className="px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded cursor-pointer">Audit Committee</li>
                                    </ul>
                                </div>

                                {/* PHASE 3 */}
                                <div>
                                    <div className="px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 mb-2">
                                        Phase 3: Evidence
                                    </div>
                                    <ul className="space-y-1 px-2">
                                        <li className="px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded cursor-pointer">Research Papers</li>
                                        <li className="px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded cursor-pointer">Field Data</li>
                                    </ul>
                                </div>

                                {/* EXTERNAL */}
                                <div>
                                    <div className="px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest border-b border-slate-800 mb-2">
                                        External Links
                                    </div>
                                    <ul className="space-y-1 px-2">
                                        <li className="px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded cursor-pointer">Media Kit</li>
                                        <li className="px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 rounded cursor-pointer">Contact Us</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Hint Overlay & Give Up */}
            {!found && (
                <div className="absolute top-1/2 right-10 flex flex-col gap-4">
                    <div className="w-48 bg-yellow-100 border-l-4 border-yellow-500 p-4 text-xs text-yellow-800 shadow-lg">
                        <strong>Hint:</strong> Most organizations hide policies under "Governance". Good luck.
                    </div>

                    {showGiveUp && (
                        <button
                            onClick={handleGiveUp}
                            className="bg-red-600 text-white px-4 py-2 rounded shadow-lg text-xs font-bold hover:bg-red-700 animate-pulse"
                        >
                            I Give Up (Skip) ➝
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
