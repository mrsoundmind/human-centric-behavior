import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mic, Video, Layout, MessageSquare } from "lucide-react";

interface Stage2Props {
    onComplete: (data: { impact: any, debrief: any }) => void;
}

export const Stage2_Meeting = ({ onComplete }: Stage2Props) => {
    const handleChoice = (type: "passive" | "interrupt" | "steer") => {
        const outcomes = {
            passive: {
                impact: { externalTrust: -15, internalCapital: 5, retainedValue: -5 },
                debrief: {
                    title: "You Let the Meeting Run Away",
                    why: "Pitching features before understanding the problem creates cognitive overload. The buyer can't connect what they're seeing to the pain they feel.",
                    what: "You ceded control of the room, letting Sarah demo capabilities while James was trying to have a business conversation.",
                    how: "James mentioned a 14% efficiency drop — that's an invitation to diagnose, not to demo. Staying passive missed that window.",
                    who: "This happens when salespeople are uncomfortable managing internal colleagues in front of clients. But silence in that moment signals you don't own the deal.",
                    tomorrow: "Before your next discovery call, brief your technical colleague: 'Don't demo anything until I ask you to. My job is to find the problem first.'"
                }
            },
            interrupt: {
                impact: { externalTrust: 15, internalCapital: -20, retainedValue: 5 },
                debrief: {
                    title: "You Controlled the Room, But Burned the Bridge",
                    why: "Sales is a team sport. If you humiliate the person responsible for delivering what you sold, you create a systemic risk to every future deal.",
                    what: "You protected the client experience in this meeting — but at the cost of Sarah never prioritizing your requests again.",
                    how: "By dismissing Sarah sharply in front of James, you made her feel undermined. That emotional debt accumulates. It shows up as slow demos, missing prep, and lost context.",
                    who: "High performers who are used to controlling outcomes sometimes manage up by managing over people instead of with them.",
                    tomorrow: "The next time a colleague goes off-script on a call, use a redirect rather than a stop: 'Sarah, this is powerful. James, how does this connect to the efficiency issue you mentioned?'"
                }
            },
            steer: {
                impact: { externalTrust: 20, internalCapital: 10, retainedValue: 10 },
                debrief: {
                    title: "You Ran a Diagnostic, Not a Demo",
                    why: "The goal of a discovery call isn't to show capabilities — it's to make the client feel understood. Understanding is the product experience before the product.",
                    what: "You pivoted the conversation back to business pain without undermining Sarah, making James feel heard and making Sarah feel respected.",
                    how: "By using a bridge question — 'Sarah, this feature is powerful. James, before we go deeper, how does your team currently handle the last-mile routing?' — you served both relationships.",
                    who: "Top salespeople know the client should be talking 70% of the time in a discovery call. Every minute of feature demo is a minute of insight lost.",
                    tomorrow: "Set a personal rule for your next discovery call: you are not allowed to demo or answer 'can you do X' questions until you've asked at least 5 diagnostic questions about their current workflow."
                }
            }
        };

        onComplete(outcomes[type]);
    };

    return (
        <div className="max-w-6xl mx-auto bg-[#121212] rounded-3xl border border-white/10 overflow-hidden shadow-2xl flex flex-col h-[700px]">
            {/* Zoom Header */}
            <div className="p-4 bg-black/40 border-b border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="bg-red-500 w-2 h-2 rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Recording: GLS Discovery Session</span>
                </div>
                <div className="flex gap-2">
                    <div className="px-2 py-1 bg-white/5 rounded text-[10px] text-gray-500">04:12</div>
                    <Layout className="w-4 h-4 text-gray-500" />
                </div>
            </div>

            {/* Main Meeting Area */}
            <div className="flex-1 flex overflow-hidden">
                <div className="flex-1 grid grid-cols-2 gap-4 p-8 bg-black/20">
                    {/* Client Video */}
                    <div className="relative rounded-2xl bg-gray-900 overflow-hidden border border-white/5">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 rounded-full bg-blue-500/10 flex items-center justify-center text-3xl font-bold text-blue-400">JD</div>
                        </div>
                        <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-xs font-medium text-white">
                            James Dalton (GLS CTO)
                        </div>
                    </div>

                    {/* Engineer Video */}
                    <div className="relative rounded-2xl bg-gray-900 overflow-hidden border border-blue-500/30 ring-2 ring-blue-500/20">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center text-3xl font-bold text-emerald-400">SM</div>
                        </div>
                        <div className="absolute top-4 right-4 px-3 py-1 bg-blue-500 text-white rounded-lg text-[10px] font-bold uppercase tracking-tighter animate-pulse">
                            Sharing Screen...
                        </div>
                        <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-md rounded-lg text-xs font-medium text-white">
                            Sarah Miller (Lead Engineer)
                        </div>
                    </div>
                </div>

                {/* Interaction Sidebar */}
                <div className="w-96 bg-black/40 border-l border-white/5 p-6 flex flex-col">
                    <div className="flex-1 space-y-6">
                        <div>
                            <h3 className="text-xs font-bold text-blue-400 tracking-widest uppercase mb-4 flex items-center gap-2">
                                <MessageSquare className="w-4 h-4" /> What's Happening
                            </h3>
                            <div className="p-4 bg-white/5 border border-white/5 rounded-2xl italic text-sm text-gray-400 leading-relaxed">
                                James just mentioned the 14% efficiency drop. Sarah got excited and jumped straight into demoing the 'Auto-Routing' feature — without asking how GLS currently handles routing.
                            </div>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={() => handleChoice("steer")}
                                className="w-full text-left p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/10 group transition-all"
                            >
                                <span className="block text-sm font-bold text-white mb-1">Bridge Sarah's demo back to James's specific problem</span>
                                <span className="block text-[10px] text-gray-500 uppercase font-mono">Approach A</span>
                            </button>

                            <button
                                onClick={() => handleChoice("interrupt")}
                                className="w-full text-left p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/10 group transition-all"
                            >
                                <span className="block text-sm font-bold text-white mb-1">Interrupt Sarah immediately and redirect the meeting</span>
                                <span className="block text-[10px] text-gray-500 uppercase font-mono">Approach B</span>
                            </button>

                            <button
                                onClick={() => handleChoice("passive")}
                                className="w-full text-left p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 hover:bg-white/10 group transition-all"
                            >
                                <span className="block text-sm font-bold text-white mb-1">Wait and let Sarah finish demoing the routing feature</span>
                                <span className="block text-[10px] text-gray-500 uppercase font-mono">Approach C</span>
                            </button>
                        </div>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                        <div className="flex justify-between items-center px-2">
                            <div className="flex gap-4">
                                <Mic className="w-5 h-5 text-gray-500" />
                                <Video className="w-5 h-5 text-gray-500" />
                            </div>
                            <button className="bg-red-600 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-red-500 transition-colors">
                                End Call
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
