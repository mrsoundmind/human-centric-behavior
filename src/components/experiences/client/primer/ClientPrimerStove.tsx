import { motion } from "framer-motion";
import { useState } from "react";

interface ClientPrimerStoveProps {
    onComplete: () => void;
}

export const ClientPrimerStove = ({ onComplete }: ClientPrimerStoveProps) => {
    const [activeBurner, setActiveBurner] = useState<number | null>(null);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    const knobs = [0, 1, 2, 3];
    // Target: Bottom Right Burner (Index 3). Knob mapping is non-obvious.
    // Let's say Knobs are linear [0,1,2,3] but Burners are Grid.
    // Mapping: Knob 0->TL, Knob 1->BL, Knob 2->TR, Knob 3->BR.

    const handleKnobClick = (index: number) => {
        setActiveBurner(index);
        if (index === 3) {
            setStatus("success");
            setTimeout(onComplete, 1500); // Wait 1.5s then move to lesson
        } else {
            setStatus("error");
        }
    };

    return (
        <div className="max-w-4xl mx-auto text-center space-y-12 py-12">
            <div className="space-y-4">
                <div className="inline-block px-4 py-1.5 rounded-full bg-muted border border-border text-xs font-bold tracking-widest text-primary font-mono mb-4">
                    EXAMPLE 2: THE SUPPORT NIGHTMARE
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-light text-foreground">
                    The Mystery Stove
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Turn on the <strong>Bottom Right</strong> burner.
                </p>
            </div>

            <div className="max-w-md mx-auto bg-card p-8 rounded-3xl shadow-lg border-4 border-border relative">
                {/* Burners */}
                <div className="grid grid-cols-2 gap-12 mb-12 px-8">
                    {[0, 1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={`h-24 w-24 rounded-full border-4 relative flex items-center justify-center transition-all duration-500
                        ${activeBurner === i
                                    ? "border-destructive bg-destructive shadow-lg"
                                    : "border-border bg-muted"}`}
                        >
                            <div className="text-4xl">
                                {activeBurner === i && "🔥"}
                            </div>
                            {/* Label for target */}
                            {i === 3 && status === "idle" && (
                                <div className="absolute -bottom-8 text-foreground text-xs font-bold uppercase tracking-widest">Target</div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Knobs */}
                <div className="flex justify-center gap-6 bg-muted p-4 rounded-xl">
                    {knobs.map((i) => (
                        <button
                            key={i}
                            onClick={() => handleKnobClick(i)}
                            className="w-12 h-12 bg-foreground rounded-full border-b-4 border-border hover:bg-muted-foreground active:scale-95 transition-all shadow-lg relative"
                        >
                            <div className="w-1 h-4 bg-background mx-auto mt-1 rounded-full"></div>
                        </button>
                    ))}
                </div>

                {/* Status Message */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none">
                    {status === "error" && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-destructive text-destructive-foreground px-6 py-2 rounded-full font-bold shadow-xl">
                            WRONG BURNER! FOOD BURNT! 😱
                        </motion.div>
                    )}
                    {status === "success" && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-primary text-primary-foreground px-6 py-2 rounded-full font-bold shadow-xl">
                            Correct! (Finally)
                        </motion.div>
                    )}
                </div>
            </div>

            {status === "error" && (
                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setStatus("idle")}
                    className="block mx-auto mt-4 text-xs text-muted-foreground hover:text-foreground underline"
                >
                    Try Again
                </motion.button>
            )}
        </div>
    );
};
