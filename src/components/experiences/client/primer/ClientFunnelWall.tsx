import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface ClientFunnelWallProps {
    onComplete: () => void;
}

export const ClientFunnelWall = ({ onComplete }: ClientFunnelWallProps) => {
    const [showPopup, setShowPopup] = useState(false);
    const [state, setState] = useState<"reading" | "blocked" | "closed" | "bounced">("reading");

    useEffect(() => {
        // Trigger popup after a short read delay
        const timer = setTimeout(() => {
            setShowPopup(true);
            setState("blocked");
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleAttemptClose = () => {
        // Fake "X" button that is hard to click or moves (optional evilness, but let's keep it simple but annoying)
        // For this demo, clicking "No thanks" works but is annoying.
        setShowPopup(false);
        setState("closed");
    };

    const handleBounce = () => {
        setState("bounced");
        setTimeout(onComplete, 1500);
    };

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="text-center space-y-4 mb-12">
                <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest text-indigo-300 font-mono mb-4">
                    SCENARIO 2: THE INTRUSION
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-light text-white">
                    The "Growth Hacking" Wall
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    The user is interested. They are reading. <br />
                    Then you punch them in the face.
                </p>
            </div>

            <div className="relative max-w-md mx-auto aspect-[9/16] bg-white border-8 border-gray-800 rounded-[3rem] overflow-hidden shadow-2xl relative text-black">
                {/* Browser Bar */}
                <div className="bg-gray-100 p-4 border-b border-gray-200 flex items-center justify-between">
                    <div className="text-xs font-bold text-gray-700">InterestingArticle.com</div>
                    <button onClick={handleBounce} className="text-xs px-2 py-1 bg-gray-200 rounded hover:bg-red-100 hover:text-red-600 transition-colors">✕</button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 overflow-hidden opacity-100">
                    <h1 className="text-2xl font-serif font-bold leading-tight">10 Ways to Improve Your Life Today</h1>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                        <span>By John Doe • 5 min read</span>
                    </div>
                    <p className="font-serif text-lg leading-relaxed text-gray-800">
                        Life is full of challenges, but with these simple tips, you can transform your daily routine into a masterclass of productivity.
                    </p>
                    <p className="font-serif text-lg leading-relaxed text-gray-800">
                        Step 1: Wake up early. The early bird gets the worm, and the early riser...
                    </p>
                    <p className="font-serif text-lg leading-relaxed text-gray-800 blur-sm">
                        gets the quiet time to reflect on their goals. Meditation is key to a healthy mind...
                    </p>
                </div>

                {/* THE WALL (Popup) */}
                {showPopup && (
                    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="bg-white p-6 rounded-2xl shadow-2xl text-center space-y-4 relative"
                        >
                            <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-6xl">🎁</div>
                            <h3 className="text-xl font-bold pt-4 text-gray-900">WAIT! DON'T GO!</h3>
                            <p className="text-sm text-gray-600">
                                Join 50,000+ others and get our exclusive "Life Hacks" ebook for FREE!
                            </p>
                            <input type="email" placeholder="Enter your email..." className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm" />
                            <button className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700">
                                GIMME THE BOOK!
                            </button>
                            <button
                                onClick={handleBounce}
                                className="text-xs text-gray-400 underline hover:text-gray-600"
                            >
                                No thanks, I hate free stuff
                            </button>
                        </motion.div>
                    </div>
                )}

                {/* Overlay for Bounced State inside the phone */}
                {state === "bounced" && (
                    <div className="absolute inset-0 bg-black z-[60] flex items-center justify-center flex-col gap-4">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-6xl"
                        >
                            🤬
                        </motion.div>
                        <div className="text-white font-bold">Rage Quit.</div>
                    </div>
                )}

            </div>
        </div>
    );
};
