/**
 * CrossRoleImpactView — premium bento per-designation impact cards.
 *
 * Each affected role becomes its own card with role icon, count badge,
 * and numbered impact points. Severity shown as a colored dot, not a pill.
 */

import { useMemo } from "react";
import { motion } from "framer-motion";
import {
    Briefcase,
    Compass,
    Code2,
    ShieldCheck,
    Palette,
    ClipboardList,
    Heart,
    Target,
    type LucideIcon,
} from "lucide-react";
import { crossRoleImpactMap, type ImpactEdge } from "../../../../../data/scenarios/cross-role-impact-map";
import type { DecisionRecord, Designation } from "../../../../../data/scenarios/types";

interface CrossRoleImpactViewProps {
    decisions: DecisionRecord[];
}

const ROLE_DISPLAY: Record<Designation, string> = {
    sales: "Sales",
    pm: "Product Manager",
    developer: "Developer",
    qa: "QA",
    designer: "Designer",
    ba: "Business Analyst",
    crm: "CRM",
    strategy: "Strategy",
};

const ROLE_ICON: Record<Designation, LucideIcon> = {
    sales: Briefcase,
    pm: Compass,
    developer: Code2,
    qa: ShieldCheck,
    designer: Palette,
    ba: ClipboardList,
    crm: Heart,
    strategy: Target,
};

const PHASE_LABELS: Record<string, string> = {
    discovery: "Discovery",
    requirements: "Requirements",
    design: "Design",
    development: "Development",
    testing: "Testing",
    launch: "Launch",
    maintenance: "Maintenance",
};

const SEVERITY_THEME = {
    high: { dot: "bg-destructive", label: "High", text: "text-destructive" },
    medium: { dot: "bg-amber-500", label: "Med", text: "text-amber-600 dark:text-amber-400" },
    low: { dot: "bg-primary", label: "Low", text: "text-primary" },
} as const;

export const CrossRoleImpactView = ({ decisions }: CrossRoleImpactViewProps) => {
    const choiceIds = useMemo(() => new Set(decisions.map((d) => d.choiceId)), [decisions]);

    const relevantEdges = useMemo(
        () => crossRoleImpactMap.filter((e) => choiceIds.has(e.sourceChoiceId)),
        [choiceIds]
    );

    const groupedByRole = useMemo(() => {
        const groups = new Map<Designation, ImpactEdge[]>();
        for (const edge of relevantEdges) {
            const existing = groups.get(edge.targetRole) ?? [];
            existing.push(edge);
            groups.set(edge.targetRole, existing);
        }
        return groups;
    }, [relevantEdges]);

    if (relevantEdges.length === 0) return null;

    const totalImpacts = relevantEdges.length;
    const rolesAffected = groupedByRole.size;

    return (
        <motion.section
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
        >
            {/* Section header */}
            <div className="flex items-end justify-between gap-4 flex-wrap">
                <div>
                    <span className="text-[10px] font-mono text-primary uppercase tracking-[0.25em] font-semibold block mb-2">
                        Ripple Effect
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                        How your decisions{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                            landed on every team
                        </span>
                    </h2>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground uppercase tracking-widest">
                    <span>
                        <span className="text-foreground font-bold tabular-nums">{rolesAffected}</span>{" "}
                        roles
                    </span>
                    <span className="w-px h-4 bg-border" />
                    <span>
                        <span className="text-foreground font-bold tabular-nums">{totalImpacts}</span>{" "}
                        impacts
                    </span>
                </div>
            </div>

            {/* Per-designation bento grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from(groupedByRole.entries()).map(([targetRole, edges], roleIdx) => {
                    const Icon = ROLE_ICON[targetRole];
                    const highCount = edges.filter((e) => e.severity === "high").length;
                    return (
                        <motion.article
                            key={targetRole}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: roleIdx * 0.06, duration: 0.4 }}
                            className="group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all overflow-hidden"
                        >
                            {/* Subtle decorative gradient corner */}
                            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-accent/5 blur-2xl pointer-events-none" />

                            {/* Card header */}
                            <header className="flex items-start justify-between gap-3 mb-5 relative">
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary/15 to-accent/10 border border-primary/20 flex items-center justify-center shrink-0">
                                        <Icon className="w-5 h-5 text-primary" strokeWidth={1.75} />
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="text-base font-bold text-foreground tracking-tight truncate">
                                            {ROLE_DISPLAY[targetRole]}
                                        </h3>
                                        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-0.5">
                                            {edges.length} {edges.length === 1 ? "impact" : "impacts"}
                                            {highCount > 0 && (
                                                <span className="text-destructive ml-2">
                                                    · {highCount} high
                                                </span>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </header>

                            {/* Numbered impact list */}
                            <ul className="space-y-3.5 relative">
                                {edges.map((edge, i) => {
                                    const sev = SEVERITY_THEME[edge.severity];
                                    return (
                                        <li
                                            key={`${edge.sourceChoiceId}-${edge.targetPhase}-${i}`}
                                            className="grid grid-cols-[auto_1fr] gap-3"
                                        >
                                            <span className="text-[10px] font-mono text-muted-foreground/60 tabular-nums pt-1 w-5">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <div className="space-y-1.5">
                                                <div className="flex items-center gap-2 flex-wrap">
                                                    <span
                                                        className={`w-1.5 h-1.5 rounded-full ${sev.dot}`}
                                                    />
                                                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                                                        {PHASE_LABELS[edge.targetPhase] ?? edge.targetPhase}
                                                    </span>
                                                    <span
                                                        className={`text-[10px] font-mono uppercase tracking-widest ${sev.text}`}
                                                    >
                                                        · {sev.label}
                                                    </span>
                                                </div>
                                                <p className="text-[13px] text-foreground/80 leading-relaxed">
                                                    {edge.consequence}
                                                </p>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </motion.article>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-5 pt-2 text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-destructive" /> High
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" /> Medium
                </span>
                <span className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Low
                </span>
            </div>
        </motion.section>
    );
};
