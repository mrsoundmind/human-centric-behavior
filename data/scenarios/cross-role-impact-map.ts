import type { Designation, SDLCPhase } from "./types";

/**
 * ImpactEdge represents a cross-role consequence: a choice made by one role
 * in one SDLC phase that creates a downstream effect on another role's phase.
 *
 * The sourceChoiceId links this edge to a specific Choice in a ScenarioConfig.
 */
export interface ImpactEdge {
  sourceRole: Designation;
  sourcePhase: SDLCPhase;
  sourceChoiceId: string;
  targetRole: Designation;
  targetPhase: SDLCPhase;
  consequence: string;
}

/**
 * Static cross-role impact map.
 *
 * Stub — intentionally empty in Phase 1.
 * Populated in Phase 4 when the CrossRoleImpactEngine visualization is built.
 * Domain design (who depends on whom at which SDLC phase) requires CEO/SME input
 * before this map can be authoritatively filled (see STATE.md blockers).
 */
export const crossRoleImpactMap: ImpactEdge[] = [];
