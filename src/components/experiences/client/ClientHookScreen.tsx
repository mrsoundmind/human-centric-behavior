import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface ClientHookScreenProps {
    onComplete: (metrics: { time: number; clicks: number; attempts: number }) => void;
}

export const ClientHookScreen = ({ onComplete }: ClientHookScreenProps) => {
    const [inputValue, setInputValue] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [startTime] = useState(Date.now());
    const [clicks, setClicks] = useState(0);
    const [attempts, setAttempts] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    // Focus input on mount
    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    const handleClick = () => {
        setClicks(prev => prev + 1);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setAttempts(prev => prev + 1);
        handleCheck();
    };

    const handleCheck = () => {
        // Exact same rigid validation as layer 1: +91 XXXXX XXXXX
        const correctFormat = /^\+91 \d{5} \d{5}$/;

        if (correctFormat.test(inputValue)) {
            const timeTaken = (Date.now() - startTime) / 1000;
            onComplete({
                time: timeTaken,
                clicks: clicks + 1, // Count the submit click
                attempts: attempts + 1
            });
        } else {
            // Vague error message mimicking bad UX
            setError("Invalid format");

            // Shake animation helper
            const form = document.getElementById("mock-form");
            form?.classList.add("animate-shake");
            setTimeout(() => form?.classList.remove("animate-shake"), 500);
        }
    };

    return (
        <div
            className="w-full max-w-md mx-auto relative group"
            onClick={handleClick}
        >
            {/* The "Beautiful" Aesthetic Wrapper */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-[#0F172A] rounded-2xl p-8 ring-1 ring-white/10 shadow-2xl">

                {/* Mock Header similar to a modern FinTech app */}
                <div className="flex justify-between items-center mb-10 opacity-80">
                    <div className="h-4 w-4 bg-indigo-500 rounded-full"></div>
                    <div className="h-2 w-20 bg-gray-700 rounded-full"></div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-light text-white tracking-tight">Verify Identity</h2>
                        <p className="text-gray-400 font-light text-sm">Please finalize your secure onboarding.</p>
                    </div>

                    <form id="mock-form" onSubmit={handleSubmit} className="space-y-8 mt-8">
                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold ml-1">
                                Mobile Verification
                            </label>

                            <div className="relative">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => {
                                        setInputValue(e.target.value);
                                        setError(null);
                                    }}
                                    // Intentionally low contrast placeholder
                                    placeholder="Enter credential"
                                    className="w-full bg-[#1E293B] border-none rounded-xl py-4 px-5 text-gray-300 placeholder:text-gray-600 focus:ring-1 focus:ring-indigo-500/50 transition-all text-lg tracking-widest font-light shadow-inner"
                                />
                                {/* Hidden/Subtle info icon that does nothing helpful */}
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 cursor-help" title="Format required">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                            </div>

                            {/* Error Message - Minimalist and unhelpful */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-pink-500 text-xs font-light tracking-wide pl-1 flex items-center gap-2"
                                >
                                    <span className="w-1 h-1 bg-pink-500 rounded-full"></span>
                                    {error}
                                </motion.div>
                            )}

                            {/* Frustration Helper */}
                            {attempts >= 3 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center"
                                >
                                    <p className="text-[10px] text-gray-600 mb-1">Struggling?</p>
                                    <p className="text-xs text-indigo-400 font-mono">Try format: +91 99999 88888</p>
                                </motion.div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium py-4 rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 tracking-wide text-sm uppercase"
                        >
                            Authenticate
                        </button>

                        <p className="text-center text-gray-600 text-[10px] cursor-pointer hover:text-gray-400 transition-colors">
                            Trouble logging in?
                        </p>
                    </form>
                </div>
            </div>

            <style>{`
            .animate-shake {
                animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
            }
            @keyframes shake {
                10%, 90% { transform: translate3d(-1px, 0, 0); }
                20%, 80% { transform: translate3d(2px, 0, 0); }
                30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                40%, 60% { transform: translate3d(4px, 0, 0); }
            }
        `}</style>
        </div>
    );
};
