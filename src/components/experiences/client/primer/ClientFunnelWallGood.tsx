import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface ClientFunnelWallGoodProps {
    onComplete: () => void;
}

export const ClientFunnelWallGood = ({ onComplete }: ClientFunnelWallGoodProps) => {
    const [showPopup, setShowPopup] = useState(false);
    const [scrolled, setScrolled] = useState(0);

    // Simulate reading behavior - popup triggers only after "engagement"
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 1500); // Delay popup
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="max-w-4xl mx-auto py-12 px-6">
            <div className="text-center space-y-4 mb-12">
                <div className="inline-block px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-xs font-bold tracking-widest text-green-400 font-mono mb-4">
                    THE FIX: RESPECT
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-light text-white">
                    Value First. Ask Second.
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    We let them read. We let them engage. <br />
                    THEN we invited them to stay (politely).
                </p>
            </div>

            <div className="relative max-w-md mx-auto aspect-[9/16] bg-white border-8 border-gray-800 rounded-[3rem] overflow-hidden shadow-2xl relative text-black">
                {/* Article Content */}
                <div className="h-full overflow-y-scroll p-6 space-y-4">
                    <div className="h-48 bg-gray-200 rounded-xl mb-6"></div>
                    <h1 className="text-2xl font-bold font-serif">The Art of Modern UX</h1>
                    <div className="flex gap-2 text-xs text-gray-400 mb-4">
                        <span>By Antigravity</span> • <span>5 min read</span>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                        User experience is not just about making things look pretty. It's about empathy.
                        It's about understanding the user's journey and removing friction.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        When we bombard users with demands before they have received value, we break the social contract.
                        Imagine walking into a shop and having a clerk jump in front of you demanding your email address
                        before you've even looked at a product.
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                        That is what most websites do today. But there is a better way.
                    </p>
                </div>

                {/* THE GOOD POPUP (Slide up, non-blocking) */}
                {showPopup && (
                    <motion.div
                        initial={{ y: 200 }}
                        animate={{ y: 0 }}
                        className="absolute bottom-0 inset-x-0 bg-indigo-900 text-white p-6 rounded-t-2xl shadow-[0_-10px_40px_rgba(0,0,0,0.3)] z-20 m-2 mx-4"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-lg">Enjoying the read?</h3>
                            <button onClick={onComplete} className="text-gray-400 hover:text-white">✕</button>
                        </div>
                        <p className="text-sm text-indigo-200 mb-4">
                            Get one article like this every week. No spam, we promise.
                        </p>
                        <div className="flex gap-2">
                            <input type="email" placeholder="Email address" className="bg-indigo-800 border-none rounded px-3 py-2 text-sm flex-1 text-white placeholder-indigo-400 focus:ring-1 focus:ring-white" />
                            <button
                                onClick={onComplete}
                                className="bg-white text-indigo-900 font-bold px-4 py-2 rounded text-sm"
                            >
                                Join
                            </button>
                        </div>
                        <div className="text-center mt-2">
                            <button onClick={onComplete} className="text-[10px] text-indigo-400 underline">
                                No thanks, I'll keep reading
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
