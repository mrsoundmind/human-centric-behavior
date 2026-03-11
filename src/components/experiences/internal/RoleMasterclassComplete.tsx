import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, RotateCcw, ShieldCheck, Trophy, Target, MessageSquare, ListChecks, AlertTriangle } from "lucide-react";

export type RoleLearning = "sales" | "pm" | "developer" | "designer" | "qa" | "ba" | "strategy" | "crm";

interface CompletionProps {
    role: RoleLearning;
    onReturnHome: () => void;
}

interface RoleContent {
    title: string;
    subtitle: string;
    paradigmShift: string;
    paradigmDesc: string;
    insight: string; // One powerful sentence they take away
    commitments: { label: string; action: string }[]; // 3 concrete commitments
    scripts: { trigger: string; line: string }[]; // 2 ready-to-use scripts
    rubric: string[]; // 3-item daily check
    cost: string; // What ignorance costs
}

const getRoleContent = (role: RoleLearning): RoleContent => {
    switch (role) {
        case "sales":
            return {
                title: "You Are the Product's First Interface",
                subtitle: "Sales",
                paradigmShift: "Every email, meeting, and proposal you write is a user interface you are designing for the buyer. Chaotic sales process → buyer assumes chaotic product.",
                paradigmDesc: "The highest-performing salespeople don't just know their product — they engineer the buyer's experience of the entire sales journey. Cognitive load, friction, trust signals, decision architecture. These are your tools now.",
                insight: "The client who churns after 90 days was lost in the sales conversation — you just couldn't see it yet.",
                commitments: [
                    { label: "Audit this week's emails", action: "Pick 3 outbound emails. For each: am I reducing the buyer's cognitive load, or adding to it? Rewrite the highest-friction one." },
                    { label: "Before every hand-off", action: "Take 5 minutes to brief the PM on what the client believes, what they fear, and what they need to feel in the first 30 days. Write it down." },
                    { label: "One impossible promise to reclaim", action: "Identify any active deal where the timeline you've committed is one your delivery team can't keep. Have the conversation now — it's cheaper than losing the client in month 2." },
                ],
                scripts: [
                    { trigger: "When a client asks for a feature list", line: "\"I could walk you through the spec — but I'd rather understand what failure looks like for your team in 6 months, and work backwards from there.\"" },
                    { trigger: "Facing an impossible timeline", line: "\"I can get a signature today on a 4-week delivery. But I'd be designing a broken first experience for your team. Let me suggest a Phase 1 we can over-deliver on.\"" },
                ],
                rubric: [
                    "Am I reducing the buyer's decision load — or increasing it?",
                    "Does the hand-off I'm creating set delivery up to win?",
                    "Is this a promise I'm making, or a promise the team is making through me?",
                ],
                cost: "Salespeople who optimize for closure without designing for experience win deals and lose clients. The referral you never get is the compounding cost.",
            };

        case "crm":
            return {
                title: "Loyalty Is Not Satisfaction. It's Ease.",
                subtitle: "Client Relationship Management",
                paradigmShift: "The clients who renew without negotiation aren't the ones who got the most attention — they're the ones for whom working with you required the least effort.",
                paradigmDesc: "CRM at its surface is about tracking touchpoints. At depth, it's about designing an interaction pattern that makes the client's life easier every time they engage with you. Friction is invisible until the renewal conversation — and then it's everything.",
                insight: "The account that goes quiet three months before renewal isn't disengaged — it's telling you something you stopped paying attention to.",
                commitments: [
                    { label: "Map one account's friction points", action: "Take your highest-risk renewal this quarter. Walk through every touchpoint in the last 90 days. Mark every moment where the client had to follow up or wait." },
                    { label: "The proactive call", action: "Call a 'quiet' account this week. Not a check-in — an honest conversation: 'What's one thing that would make working with us noticeably easier?'" },
                    { label: "Change how you document", action: "After every client interaction, add one note about how the client felt — not just what they said. This emotional log is your most valuable renewal data." },
                ],
                scripts: [
                    { trigger: "When a client requests a scope change", line: "\"I love this direction — I'm going to make sure we capture it properly so the team can build it right. I'll send you a change note by EOD.\"" },
                    { trigger: "When an escalation happens", line: "\"I wanted to call you directly rather than send an email. Your confidence in us matters to me. What's weighing on you most right now?\"" },
                ],
                rubric: [
                    "Did today's interaction require less effort than last month's?",
                    "Am I building relationship capital — or spending it?",
                    "Do I know what this client's biggest worry is separate from the project?",
                ],
                cost: "Accounts that feel well-managed but poorly understood don't refer business. The gap between a client who 'renews' and a 'champion' is a CRM gap.",
            };

        case "pm":
            return {
                title: "The Sprint Is a User Experience You Design",
                subtitle: "Product Management",
                paradigmShift: "You are running three user experiences simultaneously: the developer's experience, the stakeholder's roadmap, and the user's product. They are not separate. They compound.",
                paradigmDesc: "A sprint that burns out the team ships a product that disappoints the user. A roadmap conversation that leaves stakeholders confused generates requirement drift. PM work is invisible experience design.",
                insight: "Every ambiguous requirement you absorb silently is a scope change you're scheduling for the worst possible moment.",
                commitments: [
                    { label: "Surface one ambiguity", action: "Look at your current sprint. Find the requirement that everyone is 'interpreting' differently. Write out two concrete versions and get alignment today." },
                    { label: "1:1 Stakeholder Prep", action: "Before a major roadmap meeting, schedule 20-minute 1:1s with each party. Understand their actual constraint — it's rarely about the feature." },
                    { label: "Reframe as User Job", action: "Pick a ticket. Rewrite it: 'When [user context], [user wants to] [outcome]. We know this because [evidence].' Save 2 weeks of scoping." },
                ],
                scripts: [
                    { trigger: "When a stakeholder brief is vague", line: "\"I read this two ways — if it means A, we ship X. If it means B, we ship Y. Which interpretation fits what you had in mind?\"" },
                    { trigger: "When a blocker threatens a demo", line: "\"I can't show [X] tomorrow — I want to be upfront so we use the time well. I can show [Y and Z] and walk you through the plan for [X].\"" },
                ],
                rubric: [
                    "Did I surface ambiguity today — or absorb it?",
                    "Does my team know why what they're building matters to a real user?",
                    "What decision is coming in 2 weeks that I should prepare for today?",
                ],
                cost: "PMs who manage lists instead of designing experiences build products that technically ship and experientially miss. Rework is expensive.",
            };

        case "developer":
            return {
                title: "Your Code Is the Last Mile of Someone's Day",
                subtitle: "Engineering",
                paradigmShift: "Users don't experience architecture. They experience its consequences: speed, failure, recovery. Every technical decision is a UX decision made on behalf of someone you'll never meet.",
                paradigmDesc: "Performance is a feeling. A 400ms lag on a button click is not a metric: it's the feeling that the product doesn't respect the user's time. When you see this, every merge decision changes.",
                insight: "The technical debt item you documented and let queue is a degrading user experience you've already scheduled.",
                commitments: [
                    { label: "Add UX to PRs", action: "In your next PR, add: 'UX note: this interaction performs as X on mid-range Android at Y connection. Tested on [device].'" },
                    { label: "Old Device Test", action: "Before closing a feature, open it on the oldest device available on a 3G connection. Document one thing you'd change." },
                    { label: "Risk Brief", action: "Write a one-paragraph brief for a technical issue you've been deferring: what breaks, when it breaks at scale, and what it costs to fix now vs. later." },
                ],
                scripts: [
                    { trigger: "When spec has performance costs", line: "\"This works — but it lags 400ms on mid-range devices. I can ship as-is, or propose [X alternative] that keeps the experience snappy. Which direction?\"" },
                    { trigger: "Code review feedback", line: "\"This works well. One pattern worth exploring: [X] — here's why it compounds better at our scale. Happy to pair on it if useful.\"" },
                ],
                rubric: [
                    "Who experiences the consequence of this technical decision?",
                    "Is the thing I'm building today getting harder to fix as we scale?",
                    "Am I absorbing UX risk silently to move faster — and at whose eventual cost?",
                ],
                cost: "Systems built without surfacing UX implications pass code review and fail users. Invisible decisions compound into adoption problems.",
            };

        case "qa":
            return {
                title: "You Test the Product. You Represent the User.",
                subtitle: "Quality Assurance",
                paradigmShift: "Functional correctness is the floor, not the ceiling. An obscured button, a disappearing error, or a form that clears on a bad network — these pass automated tests and break users.",
                paradigmDesc: "QA is the last structured moment before the user arrives. What you approve is what they experience. The gap between what the spec promised and what the user feels is yours to close.",
                insight: "The bug you defer because it's 'cosmetic' is the moment a first-time user decides not to come back.",
                commitments: [
                    { label: "UX Impact Triage", action: "In your bug list, add a column: 'User impact at what moment in the journey?' Sort by that, not just category. Watch the top change." },
                    { label: "Test the Flow", action: "Instead of testing a feature, trace the complete user journey from entry to completion. Note every point where a user would hesitate." },
                    { label: "Impact Storytelling", action: "When logging a regression, write: '[User action] → [What happens] → [User feels/does what].' This format gets bugs fixed faster." },
                ],
                scripts: [
                    { trigger: "When communicating a UX issue", line: "\"The button shifts behind the keyboard on mobile. That's a high-stakes moment where users abandon, not just scroll. It's not cosmetic, it's conversion.\"" },
                    { trigger: "When under release pressure", line: "\"I can approve this. I want to flag one UX issue: [X] affects users during [critical action]. Can we get 4 hours for a targeted fix?\"" },
                ],
                rubric: [
                    "Am I testing what works — or what the user experiences?",
                    "Is this bug a technical failure or a user failure?",
                    "Would I be comfortable if the first user to hit this was our most important client?",
                ],
                cost: "QA teams measured by test coverage miss the experience. Release adoption problems are almost always a QA process that never saw the user.",
            };

        case "designer":
            return {
                title: "Every Design Decision Is a Precedent",
                subtitle: "Design",
                paradigmShift: "When you customize a component, you've created a pattern. When you comply with a preference without documentation, you've erased evidence. Design leadership is about whether decisions compound or overwrite.",
                paradigmDesc: "The most dangerous move is a good design made for the wrong reason. Work built to satisfy preference over evidence trains stakeholders to treat your work as decoration. Your evidence trail changes your seat at the table.",
                insight: "The designer who always complies keeps their relationships and loses their seat — eventually stakeholders learn rationale is negotiable.",
                commitments: [
                    { label: "Propose a Test", action: "Identify feedback that contradicts research. Instead of arguing, propose a test: 'Let's put both versions in front of 5 users and see which drives the outcome.'" },
                    { label: "Dev-Design Pair", action: "Before handoff, sit with a developer for 30 minutes. Map every element to build-time. Make one deliberate prioritization decision." },
                    { label: "Decision Log", action: "Log every change made for stakeholder preference against research: element, reason, and lack of supporting user data. Measure design drift." },
                ],
                scripts: [
                    { trigger: "When given a competitor ref", line: "\"Interesting — help me understand what specifically is landing for you. The scale, density, or headline? That tells me the actual problem.\"" },
                    { trigger: "When simplifying under deadline", line: "\"I'll identify the three elements with the highest user impact per build hour. We ship those. Everything else is Phase 2 — documented.\"" },
                ],
                rubric: [
                    "Can I articulate why this serves the user separate from the stakeholder?",
                    "If I compromised today, did I document what was lost and what evidence would warrant revisiting?",
                    "Am I building a system that makes the next designer faster?",
                ],
                cost: "Designs optimized for the demo device and CEO preferences become products that impress in presentations and frustrate in use. Satisfaction scores eventualy pay the price.",
            };

        case "strategy":
            return {
                title: "Every Strategy Has a User Experience",
                subtitle: "Strategy",
                paradigmShift: "A growth strategy has a user experience — for the acquired users and the execution team. UX doesn't override the business case; it predicts how likely it is to land.",
                paradigmDesc: "The most expensive error isn't choosing the wrong direction — it's choosing the right direction without understanding the experience conditions. Strategies fail in the last mile.",
                insight: "The strategy that made sense in the deck failed because the model assumed how users would respond instead of measuring how they already behave.",
                commitments: [
                    { label: "Find Signal Tension", action: "Take your top metric this quarter. Find one qualitative signal that disagrees. Write a 'signal tension document' to test which is more predictive." },
                    { label: "Investment Sequencing", action: "Before a major recommendation, map the dependency chain: what does Option A make possible that Option B alone cannot? Change the 'why'." },
                    { label: "UX-Adjusted Modeling", action: "Add one row to your next growth model: estimated product satisfaction. If satisfaction is 65%, adjust adoption potential down by 35%." },
                ],
                scripts: [
                    { trigger: "Quant vs Qual data conflict", line: "\"Metrics show X, but interviews show Y. That tension is a hypothesis. Here's a 2-week experiment to answer which signal is more predictive.\"" },
                    { trigger: "Matching a competitor's feature", line: "\"If we add this to a product with 65% satisfaction, it has 65% adoption potential. If we fix the experience first, it might do twice the work.\"" },
                ],
                rubric: [
                    "Does this account for actual user behavior or model assumptions?",
                    "Am I leading with the easiest metric to report, or the most predictive?",
                    "Have I sequenced this investment correctly?",
                ],
                cost: "Strategies optimized for deck legibility generate strong Q1 results and confusing Q3 post-mortems. The gap is in the un-questioned assumptions.",
            };

        case "ba":
            return {
                title: "Requirements Are UX Designed in Advance",
                subtitle: "Business Analysis",
                paradigmShift: "The specification you write is the closest a developer has to a conversation with the user. Every gap becomes a design decision made under pressure by someone who hasn't spoken to the user.",
                paradigmDesc: "BA work is discovery design. Your kickoff process, requirement structuring, and UAT facilitation determine what gets built more than any architecture decision. The user enters through your brief.",
                insight: "A requirement written without understanding how the user currently completes that task is a solution for an imagined problem.",
                commitments: [
                    { label: "Redesign Kickoff", action: "Add three questions to your next kickoff: 'How is this done today?', 'What does success look like 3 months post-launch?', and 'What would make this regrettable?'" },
                    { label: "1:1 Requirement Sync", action: "Identify a conflicting requirement. Schedule a private call with both stakeholders before the group session to understand the actual underlying constraints." },
                    { label: "Workflow UAT", action: "In your next UAT: sit beside the user. Have them complete a task start-to-finish without guidance. Don't correct them. Document every hesitation." },
                ],
                scripts: [
                    { trigger: "Missing user context at kickoff", line: "\"I'd like to spend the first 45 minutes mapping how users complete this task today. That tells us what to build; the features in the brief tell us how.\"" },
                    { trigger: "When a user flags a workflow gap", line: "\"Can you show me exactly where it breaks? I want to identify the specific step so I can scope a change and give the PM a decision today.\"" },
                ],
                rubric: [
                    "Does this describe actual user workflow — or how we think they work?",
                    "Have I surfaced the conflict in this requirement or just documented it?",
                    "Is the stakeholder in the room the user of the system or the buyer of it?",
                ],
                cost: "Briefs without workflow understanding are instructions for building the wrong thing precisely. The 30% scope change rate is a discovery design problem.",
            };

        default:
            return {
                title: "UX Is How Every Decision Feels",
                subtitle: "The Masterclass",
                paradigmShift: "Every role makes UX decisions daily. The question is whether you make them consciously — with the user in mind — or invisibly, optimizing for what's easiest to measure.",
                paradigmDesc: "You've completed scenarios drawn from real decisions in your designation. The patterns you recognized and outcomes that surprised you are the gaps this was designed to surface.",
                insight: "The decision that feels efficient from the inside often creates friction on the outside. Now you can see both sides.",
                commitments: [
                    { label: "Apply One Insight", action: "Pick the scenario that surprised you most. Identify one real decision coming up this week that resembles it. Make a deliberate choice." },
                    { label: "Find the Friction", action: "Identify one recurring point in your workflow where you feel resistance. Map whether it's a clarity, communication, or design problem." },
                    { label: "Teach to Retain", action: "Explain one thing you understood differently to a colleague using an example from your actual work. Teaching is the best retention mechanism." },
                ],
                scripts: [
                    { trigger: "When UX is dismissed as design", line: "\"UX is how a decision feels to the person on the other side of it. Every role makes those decisions; design just makes them visible.\"" },
                    { trigger: "When seeing friction in a process", line: "\"What's the experience of the person when they encounter this? That's the question that changes what we build.\"" },
                ],
                rubric: [
                    "Am I seeing the person on the other side of this decision?",
                    "Am I surfacing friction or absorbing it silently?",
                    "Is today's decision creating the conditions I want to manage next month?",
                ],
                cost: "Roles that operate without the user dimension make slower decisions, generate rework, and build systems that require workarounds.",
            };
    }
};

export const RoleMasterclassComplete = ({ role, onReturnHome }: CompletionProps) => {
    const content = getRoleContent(role);

    return (
        <div className="min-h-screen bg-[#030305] text-white selection:bg-purple-500/30 overflow-x-hidden pt-20 pb-12">

            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[60vw] h-[60vw] rounded-full bg-purple-600/10 blur-[150px]" />
                <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] rounded-full bg-blue-600/5 blur-[120px]" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] mix-blend-overlay" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* Hero Recognition Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20 bg-white/[0.02] border border-white/[0.05] rounded-[3rem] p-8 md:p-16 backdrop-blur-xl">
                    <div className="lg:col-span-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-4 mb-8"
                        >
                            <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-[10px] font-mono text-purple-400 uppercase tracking-[0.3em]">Masterclass Certified</div>
                            <div className="h-px w-12 bg-white/10" />
                            <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">{content.subtitle} Specialization</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-7xl font-black leading-[1.05] tracking-tight mb-8"
                        >
                            {content.title}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-xl text-white/50 font-light leading-relaxed max-w-3xl"
                        >
                            {content.paradigmShift}
                        </motion.p>
                    </div>

                    <div className="lg:col-span-4 flex justify-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", duration: 0.8, delay: 0.3 }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-purple-500/20 blur-[60px] rounded-full animate-pulse" />
                            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full border border-white/20 bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-3xl flex flex-col items-center justify-center relative z-10 p-8 text-center">
                                <Trophy className="w-12 h-12 md:w-16 md:h-16 text-white mb-4" />
                                <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-white/40 mb-1">Status</p>
                                <p className="text-xl md:text-2xl font-black uppercase tracking-tighter">Level 1 Mastery</p>
                                <ShieldCheck className="w-6 h-6 text-purple-400 absolute bottom-6 right-6" />
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Strategy Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">

                    {/* Commitments Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="lg:col-span-1 bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-10 flex flex-col"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-8">
                            <Target className="w-6 h-6 text-blue-400" />
                        </div>
                        <h3 className="text-2xl font-black mb-2 italic">The Commitment</h3>
                        <p className="text-sm text-white/30 uppercase tracking-widest font-mono mb-10">Concrete actions for this week</p>

                        <div className="space-y-8 flex-1">
                            {content.commitments.map((c, i) => (
                                <div key={i} className="group cursor-default">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className="text-[10px] font-mono text-blue-400/50">0{i + 1}</span>
                                        <h4 className="text-base font-bold text-white group-hover:text-blue-400 transition-colors">{c.label}</h4>
                                    </div>
                                    <p className="text-sm text-white/50 leading-relaxed font-light pl-7 border-l border-white/5">{c.action}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Wordbook & Insight Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="lg:col-span-1 bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-10 flex flex-col"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-8">
                            <MessageSquare className="w-6 h-6 text-purple-400" />
                        </div>
                        <h3 className="text-2xl font-black mb-2 italic">The Wordbook</h3>
                        <p className="text-sm text-white/30 uppercase tracking-widest font-mono mb-10">How to say it in the room</p>

                        <div className="space-y-10 mb-auto">
                            {content.scripts.map((s, i) => (
                                <div key={i}>
                                    <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em] mb-3">{s.trigger}</p>
                                    <div className="bg-white/[0.03] border border-white/5 p-5 rounded-2xl relative">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 opacity-20" />
                                        <p className="text-sm text-white/70 italic font-light leading-relaxed">"{s.line}"</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 pt-10 border-t border-white/5">
                            <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.3em] mb-4 text-center">Takeaway</p>
                            <p className="text-lg text-white font-bold text-center leading-snug">"{content.insight}"</p>
                        </div>
                    </motion.div>

                    {/* Rubric Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="lg:col-span-1 bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-10 flex flex-col"
                    >
                        <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-8">
                            <ListChecks className="w-6 h-6 text-orange-400" />
                        </div>
                        <h3 className="text-2xl font-black mb-2 italic">The Daily Rubric</h3>
                        <p className="text-sm text-white/30 uppercase tracking-widest font-mono mb-10">Shift your default perspective</p>

                        <div className="space-y-6 flex-1">
                            {content.rubric.map((r, i) => (
                                <div key={i} className="flex gap-4 items-start bg-white/[0.03] p-6 rounded-3xl border border-white/5 group hover:border-orange-500/30 transition-all">
                                    <div className="w-6 h-6 rounded-full bg-white/5 text-[10px] flex items-center justify-center font-mono text-white/30 shrink-0 group-hover:bg-orange-500/20 group-hover:text-orange-400 transition-colors">0{i + 1}</div>
                                    <p className="text-sm text-white/70 font-light leading-relaxed">{r}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 p-8 rounded-3xl bg-red-500/5 border border-red-500/10">
                            <div className="flex items-center gap-2 text-red-400 mb-3">
                                <AlertTriangle className="w-3.5 h-3.5" />
                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold">Risk Assessment</span>
                            </div>
                            <p className="text-xs text-white/40 leading-relaxed font-light">{content.cost}</p>
                        </div>
                    </motion.div>
                </div>

                {/* Final CTA */}
                <div className="flex flex-col items-center">
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        onClick={onReturnHome}
                        className="group flex items-center gap-6 py-6 px-12 rounded-full border border-white/10 hover:border-white/40 bg-white/[0.02] hover:bg-white text-black transition-all"
                    >
                        <span className="text-[12px] font-black uppercase tracking-[0.4em] text-white group-hover:text-black transition-colors">Complete Session & Exit</span>
                        <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-black/5 flex items-center justify-center transition-all">
                            <ArrowRight className="w-5 h-5 text-white group-hover:text-black group-hover:translate-x-1 transition-all" />
                        </div>
                    </motion.button>
                </div>

            </div>
        </div>
    );
};
