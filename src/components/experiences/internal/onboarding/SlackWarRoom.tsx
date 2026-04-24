import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, AlertOctagon, Eye } from "lucide-react";

interface SlackWarRoomProps {
    onContinue: (choice: 'defensive' | 'investigative') => void;
}

const SlackMsg = ({ initials, name, time, text, isAlert = false }: any) => (
    <motion.div
        initial={{ opacity: 0, x: -10, scale: 0.98 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        className={`flex gap-4 p-4 rounded-2xl border backdrop-blur-md ${isAlert ? "bg-destructive/10 border-destructive/20 shadow-lg" : "bg-muted border-border"
            }`}
    >
        <div className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center font-bold text-sm shadow-inner ${isAlert ? "bg-destructive text-primary-foreground" : "bg-muted text-foreground"
            }`}>
            {initials}
        </div>
        <div className="space-y-1 text-left">
            <div className="flex items-center gap-3">
                <span className={`font-bold text-sm ${isAlert ? "text-destructive" : "text-foreground"}`}>{name}</span>
                <span className="text-[10px] uppercase font-mono text-muted-foreground">{time}</span>
            </div>
            <p className={`text-sm leading-relaxed ${isAlert ? "text-destructive" : "text-muted-foreground"}`}>{text}</p>
        </div>
    </motion.div>
);

export const SlackWarRoom = ({ onContinue }: SlackWarRoomProps) => {
    const [timeLeft, setTimeLeft] = useState(20);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const [messages, setMessages] = useState<number>(0);

    useEffect(() => {
        const sequence = [
            setTimeout(() => setMessages(1), 500),  // CM
            setTimeout(() => setMessages(2), 1500), // PM
            setTimeout(() => setMessages(3), 2500), // Tech Lead
            setTimeout(() => setMessages(4), 3500), // Designer
            setTimeout(() => setMessages(5), 4500), // QA
            setTimeout(() => {
                setShowOptions(true);
                setIsTimerRunning(true);
            }, 6000)
        ];
        return () => sequence.forEach(clearTimeout);
    }, []);

    useEffect(() => {
        if (isTimerRunning && timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(t => t - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [isTimerRunning, timeLeft]);

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row items-center justify-center p-6 gap-12 relative overflow-hidden font-sans">
            {/* Crisis Gradients */}
            <div className={`absolute inset-0 transition-opacity duration-1000 blur-[150px] pointer-events-none ${showOptions ? 'opacity-40' : 'opacity-10'
                }`}>
                <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] rounded-full bg-destructive/30" />
                <div className="absolute bottom-1/4 right-1/4 w-[40rem] h-[40rem] rounded-full bg-accent/20" />
            </div>

            {/* Left: Communication Channel (Slack Mockup) */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl relative z-10 shrink-0"
            >
                <div className="flex items-center gap-3 mb-6 px-4">
                    <div className="w-2 h-2 rounded-full bg-destructive animate-pulse shadow-lg" />
                    <span className="text-[10px] font-mono text-destructive uppercase tracking-[0.2em]">Deployment Critical: 6 Months Later</span>
                </div>

                <div className="bg-card/80 backdrop-blur-2xl border border-border rounded-3xl overflow-hidden shadow-2xl">
                    <div className="h-14 border-b border-border flex items-center px-6 justify-between bg-muted">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-destructive/20 border border-destructive/50" />
                            <div className="w-3 h-3 rounded-full bg-primary/20 border border-primary/50" />
                            <div className="w-3 h-3 rounded-full bg-primary/20 border border-primary/50" />
                        </div>
                        <div className="text-xs font-mono text-muted-foreground"># project-horizon-collapse</div>
                        <div className="w-12" />
                    </div>

                    <div className="p-6 space-y-4 h-[450px] overflow-y-auto no-scrollbar relative flex flex-col">
                        <AnimatePresence>
                            {messages >= 1 && <SlackMsg key="msg1" initials="CM" name="Client Manager" time="10:42 AM" isAlert text="Vikram is furious. Launch completed but conversion lift is only 2%. We promised 15%. What happened? @channel" />}
                            {messages >= 2 && <SlackMsg key="msg2" initials="PM" name="Product Lead" time="10:43 AM" text="We delivered all scoped features. The ticket queue is clear. It's exactly what he asked for in the brief." />}
                            {messages >= 3 && <SlackMsg key="msg3" initials="TL" name="Tech Lead" time="10:43 AM" text="The codebase is solid. 99.9% uptime. API performance is within 100ms. Infrastructure is not the bottleneck." />}
                            {messages >= 4 && <SlackMsg key="msg4" initials="DS" name="Lead Designer" time="10:44 AM" text="We used the exact Stripe/Linear aesthetic he referenced. The UI components are pixel-perfect to the Figma file." />}
                            {messages >= 5 && <SlackMsg key="msg5" initials="QA" name="QA Lead" time="10:44 AM" text="All test cases passed. 0 P1/P2 bugs in production. The site functions perfectly." />}
                        </AnimatePresence>

                        <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-card/80 to-transparent pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-card/80 to-transparent pointer-events-none" />
                    </div>
                </div>
            </motion.div>

            {/* Right: Interactive Decision Panel */}
            <AnimatePresence>
                {showOptions && (
                    <motion.div
                        initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        className="w-full max-w-md relative z-10 flex flex-col justify-center text-left"
                    >
                        <div className="bg-card/90 backdrop-blur-xl border border-destructive/20 rounded-3xl p-8 shadow-lg">
                            <div className="flex justify-between items-center mb-6 pb-6 border-b border-border">
                                <h3 className="uppercase tracking-[0.2em] text-[10px] text-destructive font-mono">Your Response Required</h3>
                                <div className={`flex items-center gap-2 font-mono text-sm px-3 py-1 rounded-full ${timeLeft <= 5 ? "bg-destructive/20 text-destructive" : "bg-muted text-muted-foreground"}`}>
                                    <Clock className="w-3 h-3" /> 00:{timeLeft.toString().padStart(2, '0')}
                                </div>
                            </div>

                            <p className="text-sm text-muted-foreground font-light leading-relaxed mb-8">
                                The client is furious. The team is defensive. Everyone did their job perfectly, but the product failed. What is your immediate instinct to reply in this thread?
                            </p>

                            <div className="space-y-4">
                                <button
                                    onClick={() => onContinue('defensive')}
                                    className="w-full group text-left p-4 rounded-xl border border-border bg-muted hover:bg-muted hover:border-primary/30 transition-all flex items-start gap-4"
                                >
                                    <div className="mt-0.5 p-2 rounded-lg bg-accent/10 text-accent group-hover:bg-accent group-hover:text-primary-foreground transition-colors">
                                        <AlertOctagon className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-foreground mb-1">Defend the Scope</div>
                                        <div className="text-xs text-muted-foreground font-light">"We built exactly what was in the contract. Conversion wasn't a scoped deliverable."</div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => onContinue('investigative')}
                                    className="w-full group text-left p-4 rounded-xl border border-border bg-muted hover:bg-muted hover:border-primary/30 transition-all flex items-start gap-4"
                                >
                                    <div className="mt-0.5 p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                        <Eye className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold text-foreground mb-1">Question the Goal</div>
                                        <div className="text-xs text-muted-foreground font-light">"Wait. Who are the actual users visiting the site, and what do they actually want?"</div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
