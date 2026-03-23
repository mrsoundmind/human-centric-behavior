import type { Designation, SDLCPhase, ScenarioConfig } from "./types";

import { pmDiscoveryScenarios } from "./pm/discovery";
import { pmRequirementsScenarios } from "./pm/requirements";
import { pmDesignScenarios } from "./pm/design";
import { developerDiscoveryScenarios } from "./developer/discovery";
import { developerRequirementsScenarios } from "./developer/requirements";
import { developerDesignScenarios } from "./developer/design";
import { qaDiscoveryScenarios } from "./qa/discovery";
import { qaRequirementsScenarios } from "./qa/requirements";
import { qaDesignScenarios } from "./qa/design";

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
  severity: "low" | "medium" | "high";
}

/**
 * Derives ImpactEdge[] from all scenario files by walking each choice's
 * crossRoleImpact array. Runs at import time — the map is static once loaded.
 */
export function buildImpactMap(scenarios: ScenarioConfig[]): ImpactEdge[] {
  const edges: ImpactEdge[] = [];
  for (const scenario of scenarios) {
    for (const choice of scenario.choices) {
      for (const impact of choice.crossRoleImpact) {
        edges.push({
          sourceRole: scenario.role,
          sourcePhase: scenario.phase,
          sourceChoiceId: choice.id,
          targetRole: impact.affectedRole,
          targetPhase: impact.affectedPhase,
          consequence: impact.description,
          severity: impact.severity,
        });
      }
    }
  }
  return edges;
}

/**
 * Static cross-role impact map populated from all 9 scenario files.
 * Each edge links a specific choice (by choiceId) to its cross-role consequence.
 */
export const crossRoleImpactMap: ImpactEdge[] = buildImpactMap([
  ...pmDiscoveryScenarios,
  ...pmRequirementsScenarios,
  ...pmDesignScenarios,
  ...developerDiscoveryScenarios,
  ...developerRequirementsScenarios,
  ...developerDesignScenarios,
  ...qaDiscoveryScenarios,
  ...qaRequirementsScenarios,
  ...qaDesignScenarios,
]);
