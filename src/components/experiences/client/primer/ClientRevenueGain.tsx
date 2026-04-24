import { motion } from "framer-motion";
import { useState } from "react";

interface ClientRevenueGainProps {
    onNext: () => void;
}

export const ClientRevenueGain = ({ onNext }: ClientRevenueGainProps) => {
    // Calculator States - Default to previous inputs if we could (here simplified)
    const [visitors, setVisitors] = useState(10000);
    const [conversionValue, setConversionValue] = useState(100);

    // IMPROVED Rates based on Good UX
    const LOSS_RATES_BAD = {
        bait: 0.60, chaos: 0.40, wall: 0.20, maze: 0.15, trap: 0.35
    };

    const LOSS_RATES_GOOD = {
        bait: 0.10,  // Relevant Ad = High retention
        chaos: 0.35, // Some bounce is natural
        wall: 0.05,  // Polite popup = low annoyance
        maze: 0.02,  // Good search = almost zero loss
        trap: 0.05   // Transparent Access = High Intent
    };

    // Calculation Logic for BAD
    const bad_postBait = visitors * (1 - LOSS_RATES_BAD.bait);
    const bad_postChaos = bad_postBait * (1 - LOSS_RATES_BAD.chaos);
    const bad_postWall = bad_postChaos * (1 - LOSS_RATES_BAD.wall);
    const bad_postMaze = bad_postWall * (1 - LOSS_RATES_BAD.maze);
    const bad_postTrap = bad_postMaze * (1 - LOSS_RATES_BAD.trap);
    const badRevenue = bad_postTrap * conversionValue;

    // Calculation Logic for GOOD
    const good_postBait = visitors * (1 - LOSS_RATES_GOOD.bait);
    const good_postChaos = good_postBait * (1 - LOSS_RATES_GOOD.chaos);
    const good_postWall = good_postChaos * (1 - LOSS_RATES_GOOD.wall);
    const good_postMaze = good_postWall * (1 - LOSS_RATES_GOOD.maze);
    const good_postTrap = good_postMaze * (1 - LOSS_RATES_GOOD.trap);
    const goodRevenue = good_postTrap * conversionValue;

    const recoveredRevenue = goodRevenue - badRevenue;

    return (
        <div className="max-w-5xl mx-auto py-12 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-6 mb-12"
            >
                <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold tracking-widest text-primary font-mono">
                    PHASE 5: THE UPSIDE
                </div>
                <h1 className="text-5xl md:text-7xl font-display font-light text-foreground">
                    The UX Dividend. <br />
                    <span className="font-bold text-primary text-6xl md:text-8xl">+${recoveredRevenue.toLocaleString()}</span> <span className="text-2xl text-muted-foreground">/ mo</span>
                </h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                    This is not magic. This is simply <span className="text-foreground font-bold">Removing Friction</span>.
                </p>
            </motion.div>

            {/* 1. CALCULATOR GRID */}
            <div className="grid md:grid-cols-2 gap-8 bg-card p-8 rounded-3xl border border-border relative overflow-hidden mb-12 shadow-sm">
                {/* Background Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>

                {/* Comparison Chart */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-foreground">Survival Comparison</h3>

                    <div className="space-y-4 font-mono text-sm">
                        <div className="flex justify-between text-muted-foreground">
                            <span>Funnel Step</span>
                            <span>Retention (Bad vs Good)</span>
                        </div>

                        {/* Step 1 */}
                        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                            <div className="absolute top-0 left-0 h-full bg-accent" style={{ width: `${(1 - LOSS_RATES_BAD.bait) * 100}%` }}></div>
                            <div className="absolute top-0 left-0 h-full bg-primary opacity-60" style={{ width: `${(1 - LOSS_RATES_GOOD.bait) * 100}%` }}></div>
                        </div>
                        <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Promise Kept</span>
                            <span className="text-primary font-bold">+{Math.round(((1 - LOSS_RATES_GOOD.bait) - (1 - LOSS_RATES_BAD.bait)) * 100)}% Lift</span>
                        </div>

                        {/* Step 2 */}
                        <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                            <div className="absolute top-0 left-0 h-full bg-accent" style={{ width: `${(1 - LOSS_RATES_BAD.chaos) * 100}%` }}></div>
                            <div className="absolute top-0 left-0 h-full bg-primary opacity-60" style={{ width: `${(1 - LOSS_RATES_GOOD.chaos) * 100}%` }}></div>
                        </div>

                        {/* Step 5 (Final) */}
                        <div className="relative h-8 bg-muted rounded-lg overflow-hidden mt-4">
                            <div className="absolute top-0 left-0 h-full bg-accent flex items-center px-2 text-primary-foreground font-bold" style={{ width: `${(badRevenue / (visitors * conversionValue)) * 100}%` }}>
                                ${badRevenue.toLocaleString()}
                            </div>
                            <div className="absolute top-0 left-0 h-full bg-primary flex items-center justify-end px-2 text-primary-foreground font-bold opacity-90" style={{ width: `${(goodRevenue / (visitors * conversionValue)) * 100}%` }}>
                                ${goodRevenue.toLocaleString()}
                            </div>
                        </div>
                        <div className="text-right text-xs text-primary font-bold">Total Revenue Potential Unlocked</div>
                    </div>
                </div>

                {/* Inputs & Call to Action */}
                <div className="space-y-8 flex flex-col justify-center">
                    <div className="space-y-4 bg-muted p-6 rounded-xl border border-border">
                        <label className="block">
                            <span className="text-muted-foreground text-xs uppercase tracking-widest">Adjust Traffic</span>
                            <input
                                type="range" min="1000" max="100000" step="1000"
                                value={visitors} onChange={(e) => setVisitors(Number(e.target.value))}
                                className="w-full accent-primary mt-2"
                            />
                        </label>
                        <label className="block">
                            <span className="text-muted-foreground text-xs uppercase tracking-widest">Adjust Order Value</span>
                            <input
                                type="range" min="10" max="1000" step="10"
                                value={conversionValue} onChange={(e) => setConversionValue(Number(e.target.value))}
                                className="w-full accent-primary mt-2"
                            />
                        </label>
                    </div>

                    <div className="text-center space-y-4">
                        <p className="text-sm text-muted-foreground">
                            Ready to capture this value?
                        </p>
                        <button
                            onClick={onNext}
                            className="w-full py-5 bg-primary text-primary-foreground font-display font-bold text-xl rounded-full hover:scale-105 transition-transform shadow-lg"
                        >
                            The Verdict &rarr;
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. THE TAKEAWAYS (Moved Below) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid md:grid-cols-3 gap-4"
            >
                <div className="bg-card p-6 rounded-2xl border border-border hover:border-primary/40 transition-colors shadow-sm">
                    <div className="text-3xl mb-3">🧮</div>
                    <div className="font-bold text-foreground mb-2">UX is Math</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                        Design isn't just about "looking good". Friction is measurable financial loss.
                    </div>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-border hover:border-accent/40 transition-colors shadow-sm">
                    <div className="text-3xl mb-3">📉</div>
                    <div className="font-bold text-accent mb-2">The Hidden Tax</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                        You are paying a "Bad UX Tax" on every single ad dollar you spend today.
                    </div>
                </div>
                <div className="bg-card p-6 rounded-2xl border border-border hover:border-primary/40 transition-colors shadow-sm">
                    <div className="text-3xl mb-3">🚀</div>
                    <div className="font-bold text-primary mb-2">The Multiplier</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">
                        Fixing the funnel yields substantially higher ROI than just increasing ad spend.
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
