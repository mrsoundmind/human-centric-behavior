import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export type Designation =
    | "sales"
    | "crm"
    | "strategy"
    | "ba"
    | "pm"
    | "designer"
    | "developer"
    | "qa";

interface DesignationSelectProps {
    onSelect: (role: Designation) => void;
}

const ROLES: { id: Designation; title: string; subtitle: string; upgrade: string; icon: string }[] = [
    {
        id: "sales",
        title: "Sales",
        subtitle: "Closing & Client Relationships",
        upgrade: "Turn every client touchpoint into a trust signal",
        icon: "🤝"
    },
    {
        id: "pm",
        title: "Product Manager",
        subtitle: "Roadmap & Prioritization",
        upgrade: "Make faster, more confident scope decisions",
        icon: "⚖️"
    },
    {
        id: "developer",
        title: "Developer",
        subtitle: "Building & Shipping",
        upgrade: "See how every line of code shapes user experience",
        icon: "💻"
    },
    {
        id: "qa",
        title: "Quality Assurance",
        subtitle: "Testing & Advocacy",
        upgrade: "Move from pass/fail to full experience validation",
        icon: "🛡️"
    },
    {
        id: "crm",
        title: "Client Relations",
        subtitle: "Retention & Growth",
        upgrade: "Design the ongoing experience, not just the project",
        icon: "👔"
    },
    {
        id: "designer",
        title: "Designer",
        subtitle: "UX & Visual Design",
        upgrade: "Balance aesthetic instinct with measurable outcomes",
        icon: "🎨"
    },
    {
        id: "strategy",
        title: "Strategy",
        subtitle: "Direction & Vision",
        upgrade: "Translate user needs into sharper decisions",
        icon: "🎯"
    },
    {
        id: "ba",
        title: "Business Analyst",
        subtitle: "Requirements & Translation",
        upgrade: "Catch the UX gaps before they become delivery disasters",
        icon: "📋"
    },
];

export const DesignationSelect = ({ onSelect }: DesignationSelectProps) => {
    const [hoveredRole, setHoveredRole] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/10 via-black to-black pointer-events-none" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4 max-w-4xl mb-12 relative z-10"
            >
                <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight">
                    Choose your role
                </h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
                    We'll show you the UX decisions you already make every day — and what happens when you see them clearly.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-7xl relative z-10">
                {ROLES.map((role, index) => (
                    <motion.button
                        key={role.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => onSelect(role.id)}
                        onMouseEnter={() => setHoveredRole(role.id)}
                        onMouseLeave={() => setHoveredRole(null)}
                        className="group relative bg-white/5 border border-white/10 rounded-xl p-6 text-left hover:bg-white/10 hover:border-blue-500/40 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between min-h-[200px]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 rounded-xl transition-all duration-500" />

                        <div className="relative z-10 flex-1">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-2xl filter grayscale group-hover:grayscale-0 transition-all">{role.icon}</span>
                                <span className="text-xs font-mono text-gray-700 group-hover:text-blue-400 uppercase tracking-wider transition-colors">{role.id}</span>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-100 transition-colors font-display">
                                {role.title}
                            </h3>
                            <p className="text-xs text-gray-600 mb-4 uppercase tracking-wider font-mono">{role.subtitle}</p>
                        </div>

                        <div className="relative z-10 border-t border-white/5 pt-4">
                            <p className="text-sm text-gray-400 group-hover:text-blue-300 transition-colors leading-snug">
                                {role.upgrade}
                            </p>
                            <div className="mt-3 flex items-center gap-1 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-xs font-bold uppercase tracking-wider">See your scenarios</span>
                                <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>
                    </motion.button>
                ))}
            </div>
        </div>
    );
};
