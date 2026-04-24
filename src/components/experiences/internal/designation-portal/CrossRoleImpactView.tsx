/**
 * CrossRoleImpactView — shows how the user's actual decisions rippled into other roles.
 *
 * Filters crossRoleImpactMap by the user's specific choiceIds.
 * Groups impacts by affected role. Returns null if no impacts exist.
 */

import { useMemo } from "react";
import { motion } from "framer-motion";
import { crossRoleImpactMap, type ImpactEdge } from "../../../../../data/scenarios/cross-role-impact-map";
import type { DecisionRecord, Designation } from "../../../../../data/scenarios/types";

// ─── Props ──────────────────────────────────────────────────────────────────

interface CrossRoleImpactViewProps {
  decisions: DecisionRecord[];
}

// ─── Config ─────────────────────────────────────────────────────────────────

const SEVERITY_CONFIG = {
  high: { label: "High Impact", className: "border-destructive/40 bg-destructive/10 text-destructive" },
  medium: { label: "Medium Impact", className: "border-primary/40 bg-primary/10 text-primary" },
  low: { label: "Low Impact", className: "border-primary/40 bg-primary/10 text-primary" },
} as const;

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

const PHASE_LABELS: Record<string, string> = {
  discovery: "Discovery",
  requirements: "Requirements",
  design: "Design",
  development: "Development",
  testing: "Testing",
  launch: "Launch",
  maintenance: "Maintenance",
};

// ─── Component ──────────────────────────────────────────────────────────────

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

  let cardIndex = 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
        How Your Decisions Rippled
      </span>

      {Array.from(groupedByRole.entries()).map(([targetRole, edges]) => (
        <div key={targetRole} className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">{ROLE_DISPLAY[targetRole]}</h3>

          {edges.map((edge) => {
            const idx = cardIndex++;
            const severity = SEVERITY_CONFIG[edge.severity];
            return (
              <motion.div
                key={`${edge.sourceChoiceId}-${edge.targetRole}-${edge.targetPhase}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-card border border-border rounded-xl p-5"
              >
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                  {PHASE_LABELS[edge.targetPhase] ?? edge.targetPhase}
                </span>
                <p className="text-muted-foreground leading-relaxed mt-2">{edge.consequence}</p>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full inline-block mt-2 border ${severity.className}`}
                >
                  {severity.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      ))}
    </motion.div>
  );
};
