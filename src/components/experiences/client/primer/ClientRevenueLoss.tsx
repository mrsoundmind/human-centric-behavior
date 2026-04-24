import { motion } from "framer-motion";
import { useState } from "react";

interface ClientRevenueLossProps {
    onNext: () => void;
}

export const ClientRevenueLoss = ({ onNext }: ClientRevenueLossProps) => {
    // Calculator States
    const [visitors, setVisitors] = useState(10000); // 10k Traffic
    const [conversionValue, setConversionValue] = useState(100); // $100 per sale

    // Loss Rates based on the simulation examples
    const LOSS_RATES = {
        bait: 0.60,  // 60% bounce on ad mismatch
        chaos: 0.40, // 40% bounce on homepage confusion
        wall: 0.20,  // 20% lost to popup
        maze: 0.15,  // 15% lost to navigation
        trap: 0.35   // 35% cart abandonment
    };

    // Calculation Logic
    // Traditional Funnel: Visitors -> (Bait) -> (Chaos) -> (Wall) -> (Maze) -> (Trap) -> Sale
    const postBait = visitors * (1 - LOSS_RATES.bait);
    const postChaos = postBait * (1 - LOSS_RATES.chaos);
    const postWall = postChaos * (1 - LOSS_RATES.wall);
    const postMaze = postWall * (1 - LOSS_RATES.maze);
    const postTrap = postMaze * (1 - LOSS_RATES.trap);

    const actualRevenue = postTrap * conversionValue;
    const potentialRevenue = visitors * conversionValue; // If 0% friction (theoretical max, impossible but good for contrast)
    // A more realistic "Good UX" retention would be higher, but let's compare against "Perfect" vs "Broken" for drama,
    // OR compare against "Industry Avg" vs "Broken".
    // Let's simpler: Show HOW MUCH was lost at each step.

    const lostBait = (visitors * LOSS_RATES.bait) * conversionValue;
    const lostChaos = (postBait * LOSS_RATES.chaos) * conversionValue;
    const lostWall = (postChaos * LOSS_RATES.wall) * conversionValue;
    const lostMaze = (postWall * LOSS_RATES.maze) * conversionValue;
    const lostTrap = (postMaze * LOSS_RATES.trap) * conversionValue;

    const totalLost = lostBait + lostChaos + lostWall + lostMaze + lostTrap;

    return (
        <div className="max-w-5xl mx-auto py-12 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6 mb-12"
            >
                <div className="inline-block px-4 py-1.5 rounded-full bg-destructive/10 border border-destructive/20 text-xs font-bold tracking-widest text-destructive font-mono">
                    PHASE 3: THE DAMAGE REPORT
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-light text-foreground">
                    You are bleeding <br />
                    <span className="font-bold text-destructive">${totalLost.toLocaleString()}</span> / month.
                </h1>
                <p className="text-muted-foreground">
                    Based on typical drop-off rates for the UX errors we just saw.
                </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 bg-card p-8 rounded-3xl border border-border">
                {/* Inputs */}
                <div className="space-y-8">
                    <h3 className="text-xl font-bold text-foreground border-b border-border pb-4">Business Inputs</h3>
                    <div className="space-y-4">
                        <label className="block">
                            <span className="text-muted-foreground text-sm">Monthly Visitors</span>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-2xl font-mono text-foreground">{visitors.toLocaleString()}</span>
                            </div>
                            <input
                                type="range" min="1000" max="100000" step="1000"
                                value={visitors} onChange={(e) => setVisitors(Number(e.target.value))}
                                className="w-full accent-primary"
                            />
                        </label>
                        <label className="block">
                            <span className="text-muted-foreground text-sm">Avg. Order Value</span>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-2xl font-mono text-foreground">${conversionValue}</span>
                            </div>
                            <input
                                type="range" min="10" max="1000" step="10"
                                value={conversionValue} onChange={(e) => setConversionValue(Number(e.target.value))}
                                className="w-full accent-primary"
                            />
                        </label>
                    </div>
                </div>

                {/* The Bill */}
                <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground border-b border-border pb-4">Where it went:</h3>

                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg border border-destructive/20">
                        <div className="flex items-center gap-3">
                            <div className="text-xl">💸</div>
                            <div>
                                <div className="text-sm font-bold text-foreground">Misleading Promise</div>
                                <div className="text-xs text-destructive">The "50% Off" Trap</div>
                            </div>
                        </div>
                        <div className="font-mono text-destructive">-${lostBait.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg border border-destructive/20">
                        <div className="flex items-center gap-3">
                            <div className="text-xl">📉</div>
                            <div>
                                <div className="text-sm font-bold text-foreground">Low Conversion (0.3%)</div>
                                <div className="text-xs text-destructive">High Traffic, Zero Clarity</div>
                            </div>
                        </div>
                        <div className="font-mono text-destructive">-${lostChaos.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg border border-destructive/20">
                        <div className="flex items-center gap-3">
                            <div className="text-xl">🛑</div>
                            <div>
                                <div className="text-sm font-bold text-foreground">Premature Ask</div>
                                <div className="text-xs text-destructive">The "Sign Up" Wall</div>
                            </div>
                        </div>
                        <div className="font-mono text-destructive">-${lostWall.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg border border-destructive/20">
                        <div className="flex items-center gap-3">
                            <div className="text-xl">🤷</div>
                            <div>
                                <div className="text-sm font-bold text-foreground">The Nexus Maze</div>
                                <div className="text-xs text-destructive">Buried Procurement Docs</div>
                            </div>
                        </div>
                        <div className="font-mono text-destructive">-${lostMaze.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-muted rounded-lg border border-destructive/20">
                        <div className="flex items-center gap-3">
                            <div className="text-xl">🔒</div>
                            <div>
                                <div className="text-sm font-bold text-foreground">Forced Lead Gen</div>
                                <div className="text-xs text-destructive">Blocks Interested Buyers (High Friction)</div>
                            </div>
                        </div>
                        <div className="font-mono text-destructive">-${lostTrap.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-border flex justify-between items-end">
                        <div className="text-sm text-muted-foreground">Remaining Revenue</div>
                        <div className="text-3xl font-mono text-primary">${actualRevenue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-12">
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                    This is the cost of "Good Enough" design. <br />
                    Now... let's see what happens when we <span className="text-foreground font-bold">Fix The UX</span>.
                </p>
                <button
                    onClick={onNext}
                    className="px-10 py-5 bg-primary text-primary-foreground font-display font-bold text-lg rounded-full hover:scale-105 transition-transform"
                >
                    Apply The Fixes →
                </button>
            </div>
        </div>
    );
};
