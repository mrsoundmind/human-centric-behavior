
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Users, AlertTriangle, CheckCircle, XCircle, ArrowRight } from "lucide-react";

interface LeadGenFrictionProps {
    onComplete: (data: any) => void;
}

export const LeadGenFriction = ({ onComplete }: LeadGenFrictionProps) => {
    const [step, setStep] = useState<"brief" | "chaos" | "decision" | "ripple" | "lens">("brief");
    const [pressure, setPressure] = useState(0);

    // Simulation State
    const [emailsSent, setEmailsSent] = useState(0);
    const [leads, setLeads] = useState(0);
    const [devComplaints, setDevComplaints] = useState(0);

    // Auto-increment pressure
    useEffect(() => {
        if (step === "chaos") {
            const interval = setInterval(() => {
                setPressure(p => Math.min(p + 1, 100));
            }, 100);
            return () => clearInterval(interval);
        }
    }, [step]);

    // Actions
    const handleBlast = () => {
        setEmailsSent(prev => prev + 1000);
        setLeads(prev => prev + 50);
        setDevComplaints(prev => prev + 12);
        // Trigger Ripple if blasted too much
        if (emailsSent > 2000) {
            setStep("ripple");
        }
    };

    const handleTarget = () => {
        // Correct Path
        onComplete({
            decision: "targeted",
            impact: {
                trust: 10,
                margin: 0,
                morale: 5,
                clientConfidence: 5
            },
            description: "You chose Precision over Volume. Dev team trusts your leads."
        });
    };

    return (
        <div className="bg-black/80 backdrop-blur-md p-8 rounded-xl border border-white/10 max-w-4xl mx-auto mt-10">

            {/* Phase 1: Context / Pressure */}
            {step === "brief" && (
                <div className="space-y-6">
                    <div className="flex items-center gap-3 text-red-500 mb-4">
                        <AlertTriangle className="w-6 h-6" />
                        <span className="font-mono uppercase tracking-widest text-sm">Pressure Vector: KPI</span>
                    </div>
                    <h2 className="text-3xl font-display font-bold">End of Quarter Panic</h2>
                    <p className="text-xl text-gray-300">
                        You are $200k short of your target. You have 3 days left.
                        Marketing just gave you a list of 5,000 "cold" leads.
                    </p>
                    <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                        <h3 className="text-sm font-mono text-gray-500 mb-2">Internal Monologue (Shortcut Logic)</h3>
                        <p className="italic text-white">"If I just blast everyone, statistically I'll get 5 meetings. I can filter the junk later. I need hits NOW."</p>
                    </div>
                    <button
                        onClick={() => setStep("chaos")}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold text-lg mt-4"
                    >
                        Open Email Tool
                    </button>
                </div>
            )}

            {/* Phase 2: Controlled Chaos */}
            {step === "chaos" && (
                <div className="space-y-6 text-center">
                    <h2 className="text-2xl font-bold mb-8">Outbound Campaign Manager</h2>
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="p-4 bg-white/5 rounded border border-white/10">
                            <div className="text-3xl font-bold">{emailsSent}</div>
                            <div className="text-xs text-gray-500 uppercase">Emails Sent</div>
                        </div>
                        <div className="p-4 bg-white/5 rounded border border-white/10">
                            <div className="text-3xl font-bold text-green-500">{leads}</div>
                            <div className="text-xs text-gray-500 uppercase">Leads Generated</div>
                        </div>
                        <div className="p-4 bg-red-500/10 rounded border border-red-500/20 animate-pulse">
                            <div className="text-3xl font-bold text-red-500">{devComplaints}</div>
                            <div className="text-xs text-red-400 uppercase">Dev Complaints</div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={handleBlast}
                            className="w-full py-6 bg-red-600 hover:bg-red-500 rounded-lg font-bold text-xl flex items-center justify-center gap-3"
                        >
                            <Send className="w-6 h-6" />
                            BLAST ALL (Shortcut)
                        </button>
                        <p className="text-sm text-gray-500">"It's a numbers game!"</p>
                    </div>

                    {/* Pressure Bar */}
                    <div className="mt-8">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Quarter End Timer</span>
                            <span>{pressure}% Panic</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-red-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${pressure}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Phase 3: The Ripple (Downstream Impact) */}
            {step === "ripple" && (
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold text-red-500 flex items-center gap-3">
                        <XCircle className="w-8 h-8" />
                        System Failure
                    </h2>
                    <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-lg space-y-4">
                        <h3 className="font-mono uppercase text-red-400 text-sm">Ghost Chain Reaction (Ripple Map)</h3>
                        <ul className="space-y-3 text-gray-300">
                            <li className="flex items-start gap-3">
                                <span className="text-red-500 mt-1">1.</span>
                                <span><strong>Operational:</strong> Dev team spent 42 hours qualifying your junk leads instead of coding.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-500 mt-1">2.</span>
                                <span><strong>Behavioral:</strong> Lead Developer muted you on Slack. Trust eroded.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-red-500 mt-1">3.</span>
                                <span><strong>Structural:</strong> Margin dropped by 4% due to wasted operational hours.</span>
                            </li>
                        </ul>
                    </div>
                    <button
                        onClick={() => setStep("lens")}
                        className="w-full py-4 bg-white text-black hover:bg-gray-200 rounded-lg font-bold text-lg"
                    >
                        Unlock Decision Lens
                    </button>
                </div>
            )}

            {/* Phase 4: Decision Lens (The Solution) */}
            {step === "lens" && (
                <div className="space-y-6">
                    <div className="flex items-center gap-3 text-blue-500 mb-4">
                        <CheckCircle className="w-6 h-6" />
                        <span className="font-mono uppercase tracking-widest text-sm">Protocol Unlocked</span>
                    </div>
                    <h2 className="text-3xl font-bold">Signal vs Noise</h2>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-6 bg-red-500/5 border border-red-500/20 rounded-lg opacity-50">
                            <h3 className="text-red-500 font-bold mb-2">The Blast (Noise)</h3>
                            <p className="text-sm text-gray-400">Creates illusion of activity but destroys downstream efficiency.</p>
                        </div>
                        <div className="p-6 bg-blue-500/10 border border-blue-500/40 rounded-lg ring-1 ring-blue-500">
                            <h3 className="text-blue-400 font-bold mb-2">The Target (Signal)</h3>
                            <p className="text-sm text-gray-300">Filter first. "Move understanding, not data." Generates trust.</p>
                        </div>
                    </div>

                    <div className="bg-white/5 p-4 rounded border border-white/10 flex items-center justify-between">
                        <div>
                            <div className="text-xs text-gray-500 uppercase">Impact on Trust</div>
                            <div className="text-green-500 font-bold">+15%</div>
                        </div>
                        <div>
                            <div className="text-xs text-gray-500 uppercase">Impact on Margin</div>
                            <div className="text-green-500 font-bold">+8%</div>
                        </div>
                        <button
                            onClick={handleTarget}
                            className="px-6 py-2 bg-blue-600 rounded hover:bg-blue-500 font-bold flex items-center gap-2"
                        >
                            Apply Protocol <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
