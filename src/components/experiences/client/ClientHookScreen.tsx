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

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    const handleClick = () => setClicks(prev => prev + 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setAttempts(prev => prev + 1);
        handleCheck();
    };

    const handleCheck = () => {
        const correctFormat = /^\+91 \d{5} \d{5}$/;

        if (correctFormat.test(inputValue)) {
            const timeTaken = (Date.now() - startTime) / 1000;
            onComplete({
                time: timeTaken,
                clicks: clicks + 1,
                attempts: attempts + 1
            });
        } else {
            setError("Invalid format");
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
            {/* "Premium" gradient halo — keeps the aesthetic-usability bait, brand-tinted */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary via-primary to-accent rounded-2xl blur opacity-60 group-hover:opacity-90 transition duration-1000 group-hover:duration-200"></div>

            <div className="relative bg-card rounded-2xl p-8 ring-1 ring-border shadow-2xl">

                <div className="flex justify-between items-center mb-10 opacity-80">
                    <div className="h-4 w-4 bg-primary rounded-full"></div>
                    <div className="h-2 w-20 bg-muted rounded-full"></div>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-light text-foreground tracking-tight">Verify Identity</h2>
                        <p className="text-muted-foreground font-light text-sm">Please finalize your secure onboarding.</p>
                    </div>

                    <form id="mock-form" onSubmit={handleSubmit} className="space-y-8 mt-8">
                        <div className="space-y-4">
                            <label className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground font-bold ml-1 block">
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
                                    placeholder="Enter credential"
                                    className="w-full bg-muted border-none rounded-xl py-4 px-5 text-foreground placeholder:text-muted-foreground/60 focus:ring-1 focus:ring-primary/50 focus:outline-none transition-all text-lg tracking-widest font-light shadow-inner"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground cursor-help" title="Format required">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-accent text-xs font-light tracking-wide pl-1 flex items-center gap-2"
                                >
                                    <span className="w-1 h-1 bg-accent rounded-full"></span>
                                    {error}
                                </motion.div>
                            )}

                            {attempts >= 3 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-center"
                                >
                                    <p className="text-[10px] text-muted-foreground mb-1">Struggling?</p>
                                    <p className="text-xs text-primary font-mono">Try format: +91 99999 88888</p>
                                </motion.div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary text-primary-foreground font-medium py-4 rounded-xl tracking-wide text-sm uppercase transition-all duration-300"
                        >
                            Authenticate
                        </button>

                        <p className="text-center text-muted-foreground text-[10px] cursor-pointer hover:text-foreground transition-colors">
                            Trouble logging in?
                        </p>
                    </form>
                </div>
            </div>

            <style>{`
            .animate-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
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
