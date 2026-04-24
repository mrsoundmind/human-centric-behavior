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
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8 pt-24 relative overflow-hidden">
            {/* Brand ambient wash */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-accent/5 pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center space-y-4 max-w-4xl mb-12 relative z-10"
            >
                <h1 className="text-4xl md:text-5xl font-display font-bold leading-tight text-foreground">
                    Choose your role
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
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
                        className="group relative bg-card border border-border rounded-xl p-6 text-left hover:border-primary/50 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 flex flex-col justify-between min-h-[200px]"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/5 group-hover:to-accent/5 rounded-xl transition-all duration-500" />

                        <div className="relative z-10 flex-1">
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-2xl filter grayscale group-hover:grayscale-0 transition-all">{role.icon}</span>
                                <span className="text-xs font-mono text-muted-foreground group-hover:text-primary uppercase tracking-wider transition-colors">{role.id}</span>
                            </div>

                            <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors font-display">
                                {role.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider font-mono">{role.subtitle}</p>
                        </div>

                        <div className="relative z-10 border-t border-border pt-4">
                            <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors leading-snug">
                                {role.upgrade}
                            </p>
                            <div className="mt-3 flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
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
