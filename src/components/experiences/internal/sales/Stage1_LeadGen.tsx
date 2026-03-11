
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Search, Bell, Home, Briefcase, MessageSquare, Users, Share2 } from "lucide-react";
import { SlackMessage } from "../SharedComponents";

interface Stage1Props {
    onComplete: (data: { impact: any, debrief: any }) => void;
}

export const Stage1_LeadGen = ({ onComplete }: Stage1Props) => {
    const [step, setStep] = useState<"context" | "decision">("context");

    const handleChoice = (type: "volume" | "isolate" | "anchor") => {
        const outcomes = {
            volume: {
                impact: { externalTrust: -15, internalCapital: 5, retainedValue: 10 },
                debrief: {
                    title: "You Chose Volume Over Signal",
                    why: "High-volume generic outreach trains the market to treat you as spam, not a strategic partner. The buyer's first impression IS your UX.",
                    what: "You optimized for your internal KPI (500 touches) at the cost of the buyer's experience — high noise, zero signal.",
                    how: "James just posted that he hates tech hype. Sending a discount blast to him doesn't just fail — it permanently signals you don't listen.",
                    who: "Many salespeople make this call under marketing pressure. The hidden cost: your name gets associated with noise before you ever pick up the phone.",
                    tomorrow: "Look at your last 5 outbound emails. Count the words about you vs. about the client's pain. If it's more than 60% about you — rewrite them."
                }
            },
            isolate: {
                impact: { externalTrust: 10, internalCapital: -15, retainedValue: -5 },
                debrief: {
                    title: "You Protected the Client, But Burned Internal Capital",
                    why: "Going rogue to protect external UX while destroying your internal team's trust creates un-scalable success. You can't win alone.",
                    what: "You built the right client experience in isolation — but failed to bring Marketing along, making you appear untrustworthy internally.",
                    how: "Not informing Marketing of your pivot means the next campaign lands on your accounts again. You'll fight this battle every quarter.",
                    who: "High performers often fall into this trap — exceptional external results, but no internal leverage to protect those wins.",
                    tomorrow: "The next time you deviate from a Marketing directive, Slack them within 30 minutes: 'Pivoting on [account] because [specific reason]. Here's my alternative approach.'"
                }
            },
            anchor: {
                impact: { externalTrust: 20, internalCapital: 10, retainedValue: 5 },
                debrief: {
                    title: "You Designed a Premium First Touch",
                    why: "Executives respond only to insights that reduce their cognitive load. A 3-sentence insight message does more than a 10-feature brochure.",
                    what: "You gave James something of value (a specific insight about his own stated problem) before asking for anything. That's UX design, not sales tactics.",
                    how: "By anchoring your message in his public pain (last-mile efficiency drop) and quickly briefing Marketing on the pivot, you protected both relationships.",
                    who: "The best salespeople are orchestrators — they don't choose between the client and the internal team. They design both experiences simultaneously.",
                    tomorrow: "Rewrite your next outreach using this format: 1 sentence on their pain (use their own words). 1 sentence on what you've seen. 1 sentence on why that made you reach out."
                }
            }
        };

        onComplete(outcomes[type]);
    };

    return (
        <div className="max-w-6xl mx-auto grid grid-cols-12 gap-8 items-start">
            {/* LinkedIn Mockup */}
            <div className="col-span-8 bg-[#1B1B1B] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="p-3 bg-[#2D2D2D] border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center font-bold text-white shadow-lg">in</div>
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                            <input disabled placeholder="Search for insights..." className="bg-black/30 border border-white/5 rounded-md px-9 py-1.5 text-xs w-64 outline-none" />
                        </div>
                    </div>
                    <div className="flex gap-6 text-gray-500 mr-4">
                        <Home className="w-5 h-5" /> <Users className="w-5 h-5" /> <Briefcase className="w-5 h-5" /> <MessageSquare className="w-5 h-5 text-blue-500" />
                    </div>
                </div>

                {/* Profile View */}
                <div className="p-0">
                    <div className="h-32 bg-gradient-to-r from-blue-900 to-indigo-900" />
                    <div className="px-8 pb-8">
                        <div className="flex justify-between items-end -mt-12 mb-4">
                            <div className="w-32 h-32 rounded-full border-4 border-[#1B1B1B] bg-gray-700 overflow-hidden flex items-center justify-center text-3xl font-bold text-white/20">
                                JD
                            </div>
                            <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-blue-500 transition-all">Message</button>
                        </div>
                        <h1 className="text-2xl font-bold text-white">James Dalton</h1>
                        <p className="text-gray-400">CTO @ Global Logistics Systems (GLS)</p>
                        <p className="text-xs text-gray-500 mt-1">Austin, Texas • 500+ connections</p>

                        <div className="mt-8 p-6 bg-white/5 border border-white/10 rounded-xl">
                            <h3 className="text-xs font-bold text-blue-400 tracking-widest uppercase mb-4 flex items-center gap-2">
                                <Share2 className="w-4 h-4" /> Recent Activity — Posted 2 days ago
                            </h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-black/40 rounded-lg border border-white/5">
                                    <p className="text-sm text-gray-300 italic mb-2">"Our last-mile efficiency is down 14% this quarter despite the 'AI' boom. Tech is failing the warehouse floor. We need reality, not hype."</p>
                                    <div className="flex gap-4 text-xs text-gray-500">
                                        <span>32 Likes</span> • <span>12 Comments</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Selection / Friction Area */}
            <div className="col-span-4 space-y-6">
                <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl p-6 shadow-xl">
                    <h3 className="text-xs font-bold text-red-500 tracking-widest uppercase mb-4 flex items-center gap-2">
                        <Bell className="w-4 h-4" /> The Friction
                    </h3>
                    <div className="space-y-4 mb-8">
                        <SlackMessage
                            sender="Marketing Lead"
                            message="Hey, the Q4 'Discount-Blast' campaign launched today. Use the template I emailed you for all your outreach. We need to hit 500 touches by Friday."
                            isSystem={false}
                        />
                        <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                            <p className="text-xs text-amber-300">James hates generic tech hype — he just said so publicly. Marketing wants 500 blast emails by Friday. What do you do?</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={() => handleChoice("anchor")}
                            className="w-full text-left p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/10 group transition-all"
                        >
                            <span className="block text-sm font-bold text-white mb-1">Send a 3-sentence insight message focused on his post</span>
                            <span className="block text-[10px] text-gray-500 uppercase font-mono">Approach A</span>
                        </button>

                        <button
                            onClick={() => handleChoice("volume")}
                            className="w-full text-left p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/10 group transition-all"
                        >
                            <span className="block text-sm font-bold text-white mb-1">Use the Marketing Discount-Blast template on the lead list</span>
                            <span className="block text-[10px] text-gray-500 uppercase font-mono">Approach B</span>
                        </button>

                        <button
                            onClick={() => handleChoice("isolate")}
                            className="w-full text-left p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/10 group transition-all"
                        >
                            <span className="block text-sm font-bold text-white mb-1">Spend 4 hours creating a custom pitch deck just for James</span>
                            <span className="block text-[10px] text-gray-500 uppercase font-mono">Approach C</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
