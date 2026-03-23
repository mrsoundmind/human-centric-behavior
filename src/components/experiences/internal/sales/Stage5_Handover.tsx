import React, { useState } from "react";
import { motion } from "framer-motion";
import { Play, Users, MessageSquare, ArrowRight, ShieldCheck } from "lucide-react";
import { SlackMessage } from "../SharedComponents";

export interface HandoverCompletionData {
    impact: {
        externalTrust: number;
        internalCapital: number;
        retainedValue: number;
    };
    debrief: {
        title: string;
        why: string;
        what: string;
        how: string;
        who: string;
        tomorrow: string;
    };
}

interface Stage5Props {
    onComplete: (data: HandoverCompletionData) => void;
}

export const Stage5_Handover = ({ onComplete }: Stage5Props) => {
    const handleChoice = (type: "throw" | "hold" | "transfer") => {
        const outcomes = {
            throw: {
                impact: { externalTrust: -10, internalCapital: -20, retainedValue: -20 },
                debrief: {
                    title: "You Signed the Deal and Left the Room",
                    why: "The post-signature experience is the client's first real signal of what delivery will feel like. A Loom video of contract notes signals: 'You were the deal. Not the relationship.'",
                    what: "James now moves from speaking to the Closer — the person who understood his vision — to Mike, who got a 10-minute video and a contract PDF. That drop in experience quality is felt immediately.",
                    how: "Mike now has to reconstruct months of relationship context from scratch. Every misalignment between Mike's assumptions and James's expectations traces directly back to this moment.",
                    who: "Hunters who kill deals and move on are the biggest source of churn. Your commission check and the client's 90-day experience are directly connected — most salespeople never see that link.",
                    tomorrow: "Create a 'Client Context Doc' template: (1) Client's actual business goal, (2) What they're afraid of, (3) What you promised vs. what's in scope, (4) Key risks Mike should know. Fill it before your next handover."
                }
            },
            hold: {
                impact: { externalTrust: 10, internalCapital: -10, retainedValue: -5 },
                debrief: {
                    title: "You Protected the Client but You Blocked the Scale",
                    why: "Remaining the single point of contact for a client you've already closed means you can't open new ones. Every hour you spend hand-holding Mike is an hour not spent on pipeline.",
                    what: "You protected the relationship short-term, but you undermined Mike's authority in front of James — making James believe Mike is a junior resource who needs supervision.",
                    how: "By saying 'email me if Mike messes up,' you positioned Mike as a risk to manage rather than an expert to trust. That's a dynamic that only creates problems during implementation.",
                    who: "Elite salespeople build systems that scale their impact. The goal of the handover isn't just continuity — it's to make the client MORE confident after you leave than before.",
                    tomorrow: "Practice this script for your next handover call: 'James, I'm handing over to Mike not because my job is done — but because Mike is the person who will actually deliver on everything I've told you. His success is my success.'"
                }
            },
            transfer: {
                impact: { externalTrust: 20, internalCapital: 20, retainedValue: 20 },
                debrief: {
                    title: "You Transferred the Capital, Not Just the Contract",
                    why: "Trust is the asset being transferred in a handover. When you publicly elevate Mike in front of James, you're moving James's trust from your relationship to the company's delivery capability.",
                    what: "James now believes Mike is authoritative and expert — not because Mike proved it, but because you validated him. That's a gift that protects the relationship through every rough patch in implementation.",
                    how: "On the kickoff call, you said something like: 'Mike has led 12 implementations exactly like this. I'm transferring all of my context — and my accountability — to him.' James heard: 'You're in good hands.'",
                    who: "The best salespeople build a reputation where clients actually look forward to meeting the delivery team. That reputation comes from handovers like this one — every single time.",
                    tomorrow: "Map your last 3 closed deals. For each one: did the delivery team know what you knew about the client's real concerns? If not, write the context doc for each one — even retroactively. It prevents churn."
                }
            }
        };

        onComplete(outcomes[type]);
    };

    return (
        <div className="max-w-6xl mx-auto h-[700px] grid grid-cols-12 gap-8 items-stretch">
            {/* Loom UI (The External Act) */}
            <div className="col-span-7 bg-[#1A1A1A] rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col">
                <div className="p-4 bg-[#2D2D2D] border-b border-white/5 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold italic">L</div>
                        <span className="text-sm font-bold text-white">Loom Recorder</span>
                    </div>
                </div>

                <div className="flex-1 flex flex-col p-8 bg-black/40">
                    <div className="relative aspect-video rounded-2xl bg-gray-900 overflow-hidden border border-white/5 group mb-6">
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-12">
                            <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform cursor-pointer">
                                <Play className="w-8 h-8 text-white fill-white" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2 italic">Kickoff Presentation: GLS Phase 1</h3>
                            <p className="text-sm text-gray-500 max-w-sm">"Hi James, checking in before we start Monday. Here is the handover plan..."</p>
                        </div>
                        <div className="absolute bottom-4 left-4 flex gap-2">
                            <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] font-bold text-white uppercase tracking-widest">
                                Sending to: James Dalton (GLS)
                            </div>
                        </div>
                    </div>

                    <div className="p-6 bg-white/5 border border-white/5 rounded-2xl">
                        <p className="text-xs text-blue-400 font-bold uppercase tracking-widest mb-2 flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4" /> The Moment
                        </p>
                        <p className="text-sm text-gray-400 leading-relaxed italic">
                            "The deal is signed. Mike is the Lead PM but he's never spoken to James. James is worried that once you disappear, no one will understand what he actually wants. How do you handle this transition?"
                        </p>
                    </div>
                </div>
            </div>

            {/* Internal Friction Sidebar */}
            <div className="col-span-5 bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 flex flex-col shadow-xl">
                <div className="flex-1 space-y-6">
                    <h3 className="text-[10px] font-bold text-red-500 tracking-widest uppercase mb-4 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" /> Internal Friction
                    </h3>

                    <div className="space-y-4">
                        <SlackMessage
                            sender="Mike (Lead PM)"
                            message="Hey, I just saw the GLS contract. 4 weeks for Phase 1? Are you kidding me? I haven't even seen the technical brief yet. Please tell me you didn't just throw this over the wall."
                            className="bg-red-500/10 border-red-500/20"
                        />
                        <div className="p-4 bg-amber-500/5 border border-amber-500/10 rounded-2xl">
                            <p className="text-xs text-amber-200/60 leading-relaxed italic">
                                Mike is defensive — he's seen bad handovers before. James is expecting a seamless transition. Your reputation is on the line with both of them simultaneously.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3 pt-6">
                        <button
                            onClick={() => handleChoice("transfer")}
                            className="w-full text-left p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/10 transition-all group"
                        >
                            <span className="block text-sm font-bold text-white mb-1">Host a kickoff call — elevate Mike as the expert in front of James</span>
                            <span className="block text-[10px] text-gray-500 uppercase font-mono">Approach A</span>
                        </button>

                        <button
                            onClick={() => handleChoice("throw")}
                            className="w-full text-left p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/10 transition-all group"
                        >
                            <span className="block text-sm font-bold text-white mb-1">Send Mike a Loom of your contract notes</span>
                            <span className="block text-[10px] text-gray-500 uppercase font-mono ml-0">Approach B</span>
                        </button>

                        <button
                            onClick={() => handleChoice("hold")}
                            className="w-full text-left p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/10 transition-all group"
                        >
                            <span className="block text-sm font-bold text-white mb-1">Tell James to contact you directly if Mike struggles</span>
                            <span className="block text-[10px] text-gray-500 uppercase font-mono">Approach C</span>
                        </button>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center text-gray-500">
                    <div className="flex gap-4">
                        <Users className="w-5 h-5" />
                        <ArrowRight className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-widest">Final Stage</span>
                </div>
            </div>
        </div>
    );
};
