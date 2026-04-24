import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ClientContextCardProps {
    children: ReactNode;
    step: "hook" | "reflection" | "analysis";
}

export const ClientContextCard = ({ children, step }: ClientContextCardProps) => {
    return (
        <div className="grid lg:grid-cols-[300px_1fr] gap-8 max-w-6xl mx-auto items-start">

            {/* Left: The Briefing (Persistent Context) */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card border border-border rounded-2xl p-6 space-y-6 sticky top-24"
            >
                <div className="space-y-2 pb-6 border-b border-border">
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Executive Brief</h3>
                    <p className="text-xl text-foreground font-display">Project "Velocity"</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <p className="text-xs text-primary uppercase font-bold mb-1">Your Goal</p>
                        <p className="text-sm text-muted-foreground">Launch fast. Minimize budget. Make it look "Premium".</p>
                    </div>
                    <div>
                        <p className="text-xs text-accent uppercase font-bold mb-1">Current Status</p>
                        <p className="text-sm text-muted-foreground">
                            {step === "hook" && "Live User Testing"}
                            {step === "reflection" && "Post-Test Analysis"}
                            {step === "analysis" && "Business Auditing"}
                        </p>
                    </div>
                </div>

                <div className="pt-6 border-t border-border">
                    <p className="text-xs text-muted-foreground italic">
                        "We don't need expensive research. Just follow the style guide."
                    </p>
                </div>
            </motion.div>

            {/* Right: The Experience */}
            <div className="min-h-[500px]">
                {children}
            </div>

        </div>
    );
};
