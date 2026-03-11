import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageSquare } from "lucide-react";
import { SlackMessage } from "../SharedComponents";

interface Stage3Props {
    onComplete: (data: { impact: any, debrief: any }) => void;
}

export const Stage3_Proposal = ({ onComplete }: Stage3Props) => {
    const handleChoice = (type: "yes" | "no" | "phase") => {
        const outcomes = {
            yes: {
                impact: { externalTrust: 10, internalCapital: -25, retainedValue: -10 },
                debrief: {
                    title: "You Bought the Signature at the Cost of the Relationship",
                    why: "A yes you can't keep is worse than a no. Clients don't churn because of a realistic timeline — they churn because delivery broke the trust the sale built.",
                    what: "You secured the contract, but you signed your delivery team up for a sprint that sets them up to fail — and sets the client up for a broken first experience.",
                    how: "The client's 'hard constraint' was actually a negotiating signal. They needed to feel heard, not just agreed with. A quick yes signals desperation, not confidence.",
                    who: "This is one of the most common patterns in sales — the VP pushes, the client pushes, and the path of least resistance is 'yes.' The real cost lands 4 weeks later.",
                    tomorrow: "The next time you face timeline pressure, don't decide in the moment. Say: 'Let me talk to delivery and come back to you in 2 hours with the most aggressive timeline we can guarantee success on.'"
                }
            },
            no: {
                impact: { externalTrust: -15, internalCapital: 10, retainedValue: 0 },
                debrief: {
                    title: "You Protected the Team But Lost the Momentum",
                    why: "Saying no without offering an alternative stops the buyer's forward motion. Buyers don't need perfect timelines — they need to feel their urgency was heard.",
                    what: "You took the PM's 12-week estimate as immovable law without exploring what could be phased, reduced, or prioritized to meet James's actual need.",
                    how: "James needs to hit his marketing launch in 5 weeks. His real need is 'something live by the campaign.' He doesn't need the entire product — he needs a working Phase 1.",
                    who: "This choice often comes from salespeople who respect the delivery team — which is admirable. But protecting delivery and closing the deal aren't mutually exclusive.",
                    tomorrow: "When a timeline is challenged, ask the PM: 'What's the smallest, most solid version of Phase 1 that we could ship in [client's timeframe]?' Then build around that."
                }
            },
            phase: {
                impact: { externalTrust: 15, internalCapital: 15, retainedValue: 20 },
                debrief: {
                    title: "You Reframed the Problem and Created a Better Deal",
                    why: "A phased agreement protects the client's launch, respects the delivery team's capacity, and often increases the total contract value. Everyone wins by design.",
                    what: "You separated James's actual need (something live for the marketing push) from his stated need (the full product in 4 weeks), and built a proposal around the real need.",
                    how: "Phase 1 gives James a working system for his campaign. Phase 2 gives your team time to build it properly. The client feels heard; the team feels protected.",
                    who: "Top salespeople understand that the best deals aren't won at signature — they're won at renewal. A Phase 1 that delights creates a Phase 2 that's a formality.",
                    tomorrow: "Map out your active proposals. For any with tight timelines, draft a Phase 1 scope that could be delivered confidently. Present it as premium, not as a compromise."
                }
            }
        };

        onComplete(outcomes[type]);
    };

    return (
        <div className="max-w-7xl mx-auto h-[750px] flex gap-6">
            {/* Left: Email Interface (External) */}
            <div className="flex-1 bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-gray-200">
                <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-bold text-gray-700">Outlook Web</span>
                </div>
                <div className="flex-1 p-8 text-gray-800">
                    <div className="mb-8 border-b border-gray-100 pb-4">
                        <div className="flex justify-between mb-2">
                            <span className="font-bold">From: James Dalton</span>
                            <span className="text-xs text-gray-400">10:42 AM</span>
                        </div>
                        <div className="text-sm text-gray-600">Subject: Pilot Timeline - URGENT</div>
                    </div>
                    <div className="space-y-4 text-sm leading-relaxed">
                        <p>Hi team,</p>
                        <p>Following our discovery call, we've reviewed the proposal. We're interested, but we have a hard constraint.</p>
                        <p className="font-bold text-red-600 bg-red-50 p-3 rounded-lg border border-red-100 italic">
                            "Marketing is launching the new logistics push in 5 weeks. We need the pilot live in 4 weeks. If you can't hit that, we have to stay with our legacy provider for another year."
                        </p>
                        <p>Can you commit to 4 weeks? Let me know by EOD so we can sign.</p>
                        <p>Best,<br />James</p>
                    </div>
                </div>
                <div className="p-4 bg-gray-50 border-t border-gray-200 mt-auto">
                    <p className="text-[10px] text-gray-400 uppercase font-bold text-center">Client Pressure</p>
                </div>
            </div>

            {/* Right: Slack Interface (Internal) */}
            <div className="w-[450px] bg-[#1a1d21] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-white/10">
                <div className="p-4 bg-[#121519] border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-sm font-bold text-white">#internal-alignment</span>
                    </div>
                </div>
                <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                    <div className="space-y-4">
                        <SlackMessage
                            sender="Sales VP"
                            message="Just saw James's mail. WE NEED THIS LOGO. Just say yes to the 4 weeks. I'll take the heat with delivery later. Close it now!"
                            className="bg-blue-500/10 border-blue-500/20"
                        />
                        <SlackMessage
                            sender="Ops / PM"
                            message="I am seeing the VP's threads. ABSOLUTELY NOT. 12 weeks is the minimum for a reliable pilot. If you sell 4 weeks, I will officially flag this deal as 'High Risk - Unmettable' to the Board."
                            className="bg-red-500/10 border-red-500/20"
                        />
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                            <p className="text-xs text-amber-300 leading-relaxed">
                                VP wants a yes. PM says 12 weeks minimum. Client needs something live in 4 weeks for their campaign. How do you respond to James?
                            </p>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5 space-y-3">
                        <button
                            onClick={() => handleChoice("no")}
                            className="w-full text-left p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/10 transition-all"
                        >
                            <span className="block text-sm font-bold text-white mb-1">Tell James 12 weeks is the absolute minimum</span>
                            <span className="block text-[10px] text-gray-500 uppercase font-mono">Approach A</span>
                        </button>

                        <button
                            onClick={() => handleChoice("phase")}
                            className="w-full text-left p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/10 transition-all"
                        >
                            <span className="block text-sm font-bold text-white mb-1">Propose a Phase 1 live in 4 weeks, and full rollout in 12</span>
                            <span className="block text-[10px] text-gray-500 uppercase font-mono">Approach B</span>
                        </button>

                        <button
                            onClick={() => handleChoice("yes")}
                            className="w-full text-left p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/10 transition-all"
                        >
                            <span className="block text-sm font-bold text-white mb-1">Agree to 4 weeks</span>
                            <span className="block text-[10px] text-gray-500 uppercase font-mono">Approach C</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
