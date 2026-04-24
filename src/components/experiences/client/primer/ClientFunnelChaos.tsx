import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface ClientFunnelChaosProps {
    onComplete: () => void;
}

export const ClientFunnelChaos = ({ onComplete }: ClientFunnelChaosProps) => {
    const [bounced, setBounced] = useState(false);
    const [showChatbot, setShowChatbot] = useState(false);
    const [showCookie, setShowCookie] = useState(true);
    const [notifications, setNotifications] = useState<string[]>([]);
    const [activeTab, setActiveTab] = useState("loan");

    // "Modern" Distractions Simulation
    useEffect(() => {
        // Chatbot auto-open
        setTimeout(() => setShowChatbot(true), 1500);

        // Annoying "Social Proof" Toasts
        const names = ["Rahul", "Priya", "Amit", "Sneha", "Vikram"];
        const interval = setInterval(() => {
            if (bounced) return;
            const name = names[Math.floor(Math.random() * names.length)];
            setNotifications(prev => [...prev, `${name} just got approved for ₹5L!`].slice(-3));
        }, 3000);

        return () => clearInterval(interval);
    }, [bounced]);

    const handleBounce = () => {
        setBounced(true);
        setTimeout(onComplete, 5500);
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-6 h-[800px]"> {/* Increased height for scroll chaos */}
            <div className="text-center space-y-4 mb-8">
                <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-xs font-bold tracking-widest text-primary font-mono mb-4">
                    SCENARIO 2: THE FALLACY
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-light text-foreground">
                    The Vanity Metric Fallacy
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    <span className="text-primary">Traffic (14k)</span> is celebrated. <br />
                    <span className="text-red-400">Low Conversion (0.3%)</span> is ignored.
                </p>
            </div>

            {/* THE APP CONTAINER */}
            <div className="relative max-w-4xl mx-auto border-8 border-border rounded-3xl overflow-hidden shadow-2xl bg-white text-slate-900 h-[600px] flex flex-col font-sans">

                {/* --- 1. OVERWHELMING STICKY HEADER --- */}
                <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-lg border-b border-indigo-100">
                    {/* Top Top Bar */}
                    <div className="bg-indigo-900 text-white text-[10px] py-1 px-4 flex justify-between items-center">
                        <div className="flex gap-4">
                            <span>Personal</span>
                            <span className="opacity-50">Business</span>
                            <span className="opacity-50">Corporate</span>
                        </div>
                        <div className="flex gap-2">
                            <span>Download App 📱</span>
                            <span>Support</span>
                            <span>Login</span>
                        </div>
                    </div>

                    {/* Main Nav */}
                    <div className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-indigo-200 shadow-lg">G</div>
                            <div className="text-xl font-bold tracking-tight text-indigo-900">GoldSure</div>
                        </div>

                        {/* Desktop Menu - Too many items */}
                        <div className="hidden md:flex gap-4 text-[11px] font-semibold text-gray-600 uppercase tracking-tight items-center">
                            <span className="hover:text-indigo-600 cursor-pointer">Products</span>
                            <span className="hover:text-indigo-600 cursor-pointer">Use Cases</span>
                            <span className="hover:text-indigo-600 cursor-pointer">Developers</span>
                            <span className="hover:text-indigo-600 cursor-pointer">Pricing</span>
                            <span className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded cursor-pointer">Hiring!</span>
                        </div>

                        <div className="flex gap-2">
                            <button className="bg-white border-2 border-indigo-600 text-indigo-700 px-3 py-1.5 rounded-full text-xs font-bold hover:bg-indigo-50">
                                Sign In
                            </button>
                            <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg hover:shadow-xl transition-all animate-pulse">
                                GET APP
                            </button>
                        </div>
                    </div>

                    {/* Sub Nav / Category Bar - Sticky Layer 2 */}
                    <div className="bg-gray-50 border-b overflow-x-auto whitespace-nowrap p-2 flex gap-4 text-xs font-medium text-gray-500">
                        <span className="text-indigo-600 bg-indigo-100 px-2 py-½ rounded-full">Gold Loan</span>
                        <span>Personal Loan</span>
                        <span>Credit Cards</span>
                        <span>Insurance</span>
                        <span>Mutual Funds</span>
                        <span>Forex</span>
                        <span>Payments</span>
                    </div>
                </div>

                {/* --- 2. MAIN CONTENT (SCROLLABLE) --- */}
                <div className={`flex-1 overflow-y-auto relative ${bounced ? 'blur-sm grayscale transition duration-1000' : ''}`}>

                    {/* Hero Section - Gradient Overload */}
                    <div className="bg-indigo-900 text-white p-8 relative overflow-hidden text-center pb-24">
                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-500/40 via-transparent to-transparent"></div>

                        <div className="relative z-10 space-y-4 mt-4">
                            <span className="bg-indigo-800 text-indigo-200 text-[10px] uppercase font-bold px-2 py-1 rounded border border-indigo-700">
                                New Feature Launch 🚀
                            </span>
                            <h1 className="text-3xl font-extrabold tracking-tight leading-tight">
                                Unlock the <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500">hidden liquidity</span> in your assets.
                            </h1>
                            <p className="text-indigo-200 text-xs max-w-sm mx-auto leading-relaxed">
                                Join 10M+ Indians who are leveraging their gold for instant credit lines with zero processing fees*.
                            </p>

                            {/* Confusing CTAs */}
                            <div className="flex flex-col gap-3 justify-center items-center pt-4">
                                <div className="flex gap-2 w-full justify-center">
                                    <button className="w-full bg-white text-indigo-900 font-bold py-3 rounded-xl text-sm shadow-xl border-b-4 border-indigo-200 active:border-b-0 active:translate-y-1">
                                        Check Rates
                                    </button>
                                    <button className="w-full bg-indigo-700 text-white font-bold py-3 rounded-xl text-sm shadow-xl border-b-4 border-indigo-900 active:border-b-0 active:translate-y-1">
                                        Apply Now
                                    </button>
                                </div>
                                <span className="text-[10px] underline opacity-50 cursor-pointer">Looking for Partner Login?</span>
                            </div>
                        </div>

                        {/* Floating Cards Mockup */}
                        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-64 h-32 bg-white rounded-t-2xl shadow-2xl opacity-90"></div>
                    </div>

                    {/* Features Grid - Too much text */}
                    <div className="bg-white p-6 pt-16">
                        <h3 className="text-gray-900 font-bold text-sm mb-4 uppercase tracking-wider text-center">Why GoldSure?</h3>
                        <div className="grid grid-cols-2 gap-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                                    <div className="w-8 h-8 rounded-full bg-indigo-100 mb-2"></div>
                                    <div className="h-2 w-20 bg-gray-300 rounded mb-1"></div>
                                    <div className="h-2 w-full bg-gray-200 rounded opacity-60"></div>
                                    <div className="h-2 w-2/3 bg-gray-200 rounded opacity-60 mt-1"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* The "Infinite" Footer */}
                    <div className="bg-slate-50 p-8 border-t space-y-6">
                        <div className="grid grid-cols-2 gap-8 text-[10px] text-gray-500">
                            <div>
                                <strong className="block text-gray-900 mb-2">Platform</strong>
                                <div className="space-y-1">Overview, Features, Pricing, Enterprise, Security</div>
                            </div>
                            <div>
                                <strong className="block text-gray-900 mb-2">Company</strong>
                                <div className="space-y-1">About, Careers (Hiring), Blog, Brand, contact</div>
                            </div>
                        </div>
                    </div>
                    <div className="h-24"></div> {/* Spacer for fixed annoying elements */}
                </div>


                {/* --- 3. THE ANNOYING LAYERS (ABSOLUTE) --- */}

                {/* Chatbot Overlay */}
                <AnimatePresence>
                    {showChatbot && (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                            className="absolute bottom-20 right-4 z-30 w-64 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden"
                        >
                            <div className="bg-indigo-600 p-3 text-white flex justify-between items-center text-xs font-bold">
                                <div className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-green-400"></span> Goldie Bot
                                </div>
                                <span onClick={() => setShowChatbot(false)} className="cursor-pointer">✕</span>
                            </div>
                            <div className="p-4 bg-gray-50 text-xs space-y-2 h-32 overflow-y-auto">
                                <div className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm text-gray-700">
                                    Hi there! 👋 I see you're looking at gold loans.
                                </div>
                                <div className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm text-gray-700">
                                    Can I get your number to check eligibility?
                                </div>
                                <input type="text" placeholder="Type here..." className="w-full border rounded p-1 mt-2 text-[10px]" autoFocus />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Social Proof Toasts (Left Side Stack) */}
                <div className="absolute bottom-24 left-4 z-20 space-y-2 pointer-events-none">
                    <AnimatePresence>
                        {notifications.map((note, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                                className="bg-white/90 backdrop-blur border border-green-100 p-2 rounded-lg shadow-lg flex items-center gap-2 max-w-[200px]"
                            >
                                <span className="text-lg">💰</span>
                                <span className="text-[10px] font-bold text-gray-700 leading-tight">{note}</span>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Cookie Consent (Massive) */}
                {showCookie && !bounced && (
                    <div className="absolute bottom-0 left-0 w-full bg-gray-900 text-white p-4 z-50 rounded-b-2xl flex flex-col gap-3">
                        <div className="text-[10px] opacity-80 leading-relaxed">
                            We use cookies, pixels, and magic dust to track your every move so we can retarget you on Instagram later. By clicking "Accept", you agree to surrender your privacy.
                        </div>
                        <div className="flex gap-2">
                            <button className="flex-1 bg-white text-black font-bold py-2 rounded text-xs" onClick={() => setShowCookie(false)}>Accept All</button>
                            <button className="flex-1 bg-transparent border border-gray-600 text-gray-400 py-2 rounded text-xs">Preferences</button>
                        </div>
                    </div>
                )}

                {/* USER EXIT BUTTON - "The only way out" */}
                {!bounced && (
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60]">
                        {/* Centered for visibility because UI is so cluttered */}
                        <motion.button
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1.1 }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            onClick={handleBounce}
                            className="bg-red-600 text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:bg-red-700 border-4 border-white text-xs whitespace-nowrap"
                        >
                            This is too much chaos (Exit) 🏃
                        </motion.button>
                        <p className="text-center text-[10px] font-bold bg-white/90 p-1 mt-2 rounded shadow-sm text-black backdrop-blur">USER REACTION</p>
                    </div>
                )}

            </div>

            {/* Bounced Overlay */}
            {bounced && (
                <div className="absolute inset-0 z-[70] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-card text-foreground p-8 rounded-3xl shadow-2xl text-center max-w-md mx-auto border border-border"
                    >
                        <div className="text-6xl mb-4">📉</div>
                        <h2 className="text-2xl font-bold mb-2">The Vanity Metric Trap</h2>
                        <p className="text-muted-foreground text-sm mb-6">
                            High Acquisition Volume. <span className="text-red-400 font-bold">Poor Retention.</span>
                            <br />
                            Traffic is purchased, but the UX forces users to bounce.
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-left bg-muted p-4 rounded-xl">
                            <div>
                                <div className="text-xs opacity-50 uppercase tracking-widest">Acquisition</div>
                                <div className="text-xl font-mono text-primary">14.2k <span className="text-[10px] text-muted-foreground">Hits</span></div>
                            </div>
                            <div>
                                <div className="text-xs opacity-50 uppercase tracking-widest">Conversion</div>
                                <div className="text-xl font-mono text-red-500">0.3% <span className="text-[10px] text-muted-foreground">Sales</span></div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
};
