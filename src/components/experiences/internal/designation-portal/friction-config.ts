import type { FrictionDimension } from "../../../../../data/scenarios/types";

/**
 * Shared friction dimension labels and Tailwind class names.
 * Extracted from ScenarioRenderer for reuse in JourneyCompleteView and CrossRoleImpactView.
 */
export const FRICTION_CONFIG: Record<FrictionDimension, { label: string; className: string }> = {
  client_friction: {
    label: "Client Friction",
    className: "border-blue-500/40 bg-blue-500/10 text-blue-300",
  },
  internal_bureaucracy: {
    label: "Internal Bureaucracy",
    className: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  },
  knowledge_gap: {
    label: "Knowledge Gap",
    className: "border-purple-500/40 bg-purple-500/10 text-purple-300",
  },
  conflict_avoidance: {
    label: "Conflict Avoidance",
    className: "border-red-500/40 bg-red-500/10 text-red-300",
  },
};
