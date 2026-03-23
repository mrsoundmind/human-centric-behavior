/**
 * TypeScript types for scenario content.
 *
 * All types EXCEPT DecisionRecord are derived from Zod schemas via z.infer —
 * this prevents type/schema divergence. The Zod schema in schema.ts is the
 * single source of truth.
 *
 * SDLCPhase is defined here (not imported from SDLCContext.tsx) — this is
 * new data-layer infrastructure independent of the existing Layer 2 phases.
 */

import type { z } from "zod";
import type {
  FrictionDimensionSchema,
  SDLCPhaseSchema,
  DesignationSchema,
  CrossRoleImpactSchema,
  ChoiceSchema,
  DebriefSchema,
  ScenarioConfigSchema,
} from "./schema";

// ─── Derived Types ───────────────────────────────────────────────────────────

export type FrictionDimension = z.infer<typeof FrictionDimensionSchema>;
export type SDLCPhase = z.infer<typeof SDLCPhaseSchema>;
export type Designation = z.infer<typeof DesignationSchema>;
export type CrossRoleImpact = z.infer<typeof CrossRoleImpactSchema>;
export type Choice = z.infer<typeof ChoiceSchema>;
export type Debrief = z.infer<typeof DebriefSchema>;
export type ScenarioConfig = z.infer<typeof ScenarioConfigSchema>;

// ─── Runtime-Only Types (not Zod-derived) ───────────────────────────────────

/**
 * A single decision made by the user during a scenario.
 * Stored in an append-only log in DesignationStore (Phase 1-02).
 */
export interface DecisionRecord {
  choiceId: string;
  frictionTag: FrictionDimension;
  timestamp: number;
  phase: SDLCPhase;
  role: Designation;
}
