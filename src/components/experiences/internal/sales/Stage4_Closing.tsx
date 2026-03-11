import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileSignature, MessageSquare } from "lucide-react";
import { SlackMessage } from "../SharedComponents";

interface Stage4Props {
    onComplete: (data: { impact: any, debrief: any }) => void;
}

export const Stage4_Closing = ({ onComplete }: Stage4Props) => {
    const handleChoice = (type: "force" | "messenger" | "align") => {
        const outcomes = {
            force: {
                impact: { externalTrust: -15, internalCapital: 5, retainedValue: -10 },
                debrief: {
                    title: "You Bypassed the System That Protects Everyone",
                    why: "Legal friction in a deal isn't bureaucracy — it's a risk signal. Overriding it to hit quota creates liability that could cost the company far more than this contract is worth.",
                    what: "You got the signature, but you created systemic risk. Uncapped liability means a single implementation issue could wipe out years of margin from this client.",
                    how: "Using VP pressure to override Legal's position signals that deals can be pushed through despite governance. Legal will now scrutinize every deal you bring — and they'll be right to.",
                    who: "The fastest closed deals sometimes have the highest hidden costs. Contract risk doesn't show up in your quota dashboard — it shows up 18 months later as a legal dispute.",
                    tomorrow: "Send your MSA template to Legal before the next deal enters the proposal stage. Ask them to flag the top 3 clauses clients most often redline. Know the battlefield before you fight."
                }
            },
            messenger: {
                impact: { externalTrust: -15, internalCapital: 5, retainedValue: -10 },
                debrief: {
                    title: "You Passed the Problem Instead of Solving It",
                    why: "Forwarding Legal's 'no' to the client without context or alternatives makes you a mailbox, not a partner. Every minute of delay in closing is friction the buyer feels — and doubt builds.",
                    what: "You positioned yourself as someone with no authority in their own company, which undermines James's confidence in your ability to manage the implementation either.",
                    how: "James doesn't care about your internal legal process — he cares about his launch date. Your job is to abstract that complexity, not surface it.",
                    who: "Acting as a neutral messenger feels safe, but from the client's perspective, it signals that your company isn't aligned and you're not in control.",
                    tomorrow: "The next time Legal pushes back on a clause, schedule a 30-minute call with Legal before going back to the client. Go back with a position, not a problem."
                }
            },
            align: {
                impact: { externalTrust: 15, internalCapital: 15, retainedValue: 15 },
                debrief: {
                    title: "You Removed the Friction by Removing the Distance",
                    why: "Most legal standoffs happen because both sides are negotiating with intermediaries. When decision-makers talk directly, deals move. The speed at which you close is part of the client's experience of your company.",
                    what: "You compressed a 2-week back-and-forth into a single alignment call by putting the right people in the room. That signals operational excellence — exactly what a logistics CTO respects.",
                    how: "The liability clause isn't actually about liability — it's about trust. When GLS's Legal and your Legal talk directly, they usually find a cap both can live with. They're speaking the same language.",
                    who: "Orchestrating alignment across legal, delivery, and client teams is the hardest and most valuable skill in enterprise sales. It's invisible in a quota dashboard, but it's why deals close and stay closed.",
                    tomorrow: "Identify your current deals where Legal is involved. For each one, ask: 'Do both Legal teams know each other's actual concerns, or are they fighting through intermediaries?' Schedule the direct call."
                }
            }
        };

        onComplete(outcomes[type]);
    };

    return (
        <div className="max-w-6xl mx-auto h-[750px] flex gap-6">
            {/* Left: DocuSign Interface (External) */}
            <div className="flex-1 bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-gray-200">
                <div className="p-4 bg-blue-600 text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FileSignature className="w-5 h-5" />
                        <span className="text-sm font-bold tracking-widest font-display">DocuSign</span>
                    </div>
                    <span className="text-xs bg-black/20 px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest font-bold">
                        Pending Signature
                    </span>
                </div>

                <div className="flex-1 p-8 overflow-y-auto bg-gray-50 relative">
                    <div className="bg-white p-8 rounded border border-gray-300 shadow-sm max-w-2xl mx-auto font-serif text-sm">
                        <h2 className="text-2xl font-bold mb-6 text-center border-b pb-4">Master Services Agreement (MSA)</h2>

                        <div className="space-y-6 text-gray-700 leading-relaxed">
                            <p className="font-bold">4. LIABILITY AND INDEMNIFICATION</p>
                            <div className="relative">
                                <p className="line-through text-red-400">4.1 Provider's aggregate liability under this Agreement shall not exceed the total fees paid by Client in the preceding 12 months.</p>
                                <p className="text-blue-700 bg-blue-50 p-2 mt-2 border-l-4 border-blue-500 font-bold">
                                    [GLS Legal Revision]: 4.1. Provider's aggregate liability shall be uncapped for any claims arising from negligence or data breaches.
                                </p>
                            </div>

                            <p className="font-bold mt-8">7. TERMINATION</p>
                            <div className="relative">
                                <p className="line-through text-red-400">7.2 Client may terminate this agreement for convenience with 90 days written notice.</p>
                                <p className="text-blue-700 bg-blue-50 p-2 mt-2 border-l-4 border-blue-500 font-bold">
                                    [GLS Legal Revision]: 7.2 Client may terminate this agreement for convenience with 30 days written notice.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Slack Interface (Internal Friction) */}
            <div className="w-[450px] bg-[#1a1d21] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-white/10">
                <div className="p-4 bg-[#121519] border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-sm font-bold text-white">#deal-desk-gls</span>
                    </div>
                </div>

                <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                    <div className="space-y-4">
                        <SlackMessage
                            sender="Legal Counsel (Internal)"
                            message="Absolutely not. Uncapped liability is a total non-starter for us. We cannot take on that level of risk for a pilot project. Reject their redlines."
                            className="bg-red-500/10 border-red-500/20"
                        />
                        <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
                            <p className="text-xs text-amber-200/60 leading-relaxed italic">
                                Legal is blocking the close. Deal is sitting on your desk. Every day of delay is another day James starts wondering if you can actually execute. What's your move?
                            </p>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 space-y-3">
                        <button
                            onClick={() => handleChoice("messenger")}
                            className="w-full text-left p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/10 transition-all"
                        >
                            <span className="block text-sm font-bold text-white mb-1">Forward Legal's rejection to James as-is</span>
                            <span className="block text-[10px] text-gray-500 uppercase font-mono">Approach A</span>
                        </button>

                        <button
                            onClick={() => handleChoice("align")}
                            className="w-full text-left p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/10 transition-all"
                        >
                            <span className="block text-sm font-bold text-white mb-1">Set up a joint call: GLS Legal + Internal Legal + Delivery</span>
                            <span className="block text-[10px] text-gray-500 uppercase font-mono">Approach B</span>
                        </button>

                        <button
                            onClick={() => handleChoice("force")}
                            className="w-full text-left p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/10 transition-all"
                        >
                            <span className="block text-sm font-bold text-white mb-1">Use VP authority to push Legal to accept the redlines</span>
                            <span className="block text-[10px] text-gray-500 uppercase font-mono">Approach C</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
