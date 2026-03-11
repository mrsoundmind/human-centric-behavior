import { motion } from "framer-motion";
import { Designation } from "./DesignationSelect";

interface RoleBriefingViewProps {
    role: Designation;
    onContinue: () => void;
    onBack: () => void;
}

const ROLE_BRIEFINGS: Record<Designation, {
    title: string;
    expect: string;
    discover: string;
    why: string;
}> = {
    sales: {
        title: "The Growth Engine",
        expect: "You are the spearhead. High targets, demanding clients, and Q4 pressure.",
        discover: "To master 'Strategic Tension'—pausing the 'Yes' to ensure the 'Delivery'.",
        why: "A signed contract is vanity. A successful deployment is revenue. You control the quality of the product by what you promise."
    },
    crm: {
        title: "The Relationship Guardian",
        expect: "A client will ask for 'just one small tweak' late in the process.",
        discover: "How to say 'No' to scope creep without damaging the relationship.",
        why: "Unchecked client pleasing turns agile projects into death marches."
    },
    strategy: {
        title: "The Visionary",
        expect: "You must define the product's direction in a vague kickoff meeting.",
        discover: "The difference between a 'Buzzword Strategy' and an 'Actionable North Star'.",
        why: "If the vision is blurry, the execution will be chaotic."
    },
    ba: {
        title: "The Translator",
        expect: "You need to document requirements for a new feature.",
        discover: "How vague acceptance criteria lead to features that work but fail the user.",
        why: "Developers build exactly what you write, not what you meant."
    },
    pm: {
        title: "The Prioritizer",
        expect: "You have a tight deadline and need to decide what to build.",
        discover: "The critical importance of defining 'Unhappy Paths' and error states upfront.",
        why: "Optimism bias ('Users will do it right') is the #1 cause of post-launch bugs."
    },
    designer: {
        title: "The Architect",
        expect: "You are designing a key interaction element.",
        discover: "To balance aesthetic appeal with universal accessibility.",
        why: "Pretty UIs that exclude 20% of users are not 'clean', they are broken."
    },
    developer: {
        title: "The Builder",
        expect: "You are testing a new feature on your powerful machine.",
        discover: "To empathize with users on low-end devices and poor connections.",
        why: "'It works on my machine' is not a valid definition of done."
    },
    qa: {
        title: "The Gatekeeper",
        expect: "You encounter a feature that works technically but feels wrong.",
        discover: "To move beyond 'Pass/Fail' testing to 'Usability' advocacy.",
        why: "A bug-free product that frustrates users is still a failure."
    }
};

export const RoleBriefingView = ({ role, onContinue, onBack }: RoleBriefingViewProps) => {
    const data = ROLE_BRIEFINGS[role];

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 relative">
            <button onClick={onBack} className="absolute top-8 left-8 text-gray-500 hover:text-white transition-colors">← Back to Roles</button>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-4xl w-full"
            >
                <div className="text-center mb-12 space-y-4">
                    <div className="inline-block px-3 py-1 rounded-full bg-white/10 text-gray-300 text-xs font-bold uppercase tracking-widest">
                        Selected Role
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-500">
                        {data.title}
                    </h1>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col gap-4 hover:bg-white/10 transition-colors">
                        <div className="text-2xl">👁️</div>
                        <h3 className="text-lg font-bold text-blue-400">What to Expect</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">{data.expect}</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col gap-4 hover:bg-white/10 transition-colors">
                        <div className="text-2xl">🧠</div>
                        <h3 className="text-lg font-bold text-purple-400">What You'll Discover</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">{data.discover}</p>
                    </div>

                    <div className="bg-white/5 border border-white/10 p-8 rounded-2xl flex flex-col gap-4 hover:bg-white/10 transition-colors">
                        <div className="text-2xl">⚡</div>
                        <h3 className="text-lg font-bold text-yellow-400">Why It Matters</h3>
                        <p className="text-gray-400 leading-relaxed text-sm">{data.why}</p>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <button
                        onClick={onContinue}
                        className="px-12 py-4 bg-white text-black font-bold text-xl rounded-full hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.3)]"
                    >
                        Enter Simulation
                    </button>
                </div>
            </motion.div>
        </div>
    );
};
