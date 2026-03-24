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
import { salesDiscoveryScenarios } from "./sales/discovery";
import { salesRequirementsScenarios } from "./sales/requirements";
import { salesDesignScenarios } from "./sales/design";
import { designerDiscoveryScenarios } from "./designer/discovery";
import { designerRequirementsScenarios } from "./designer/requirements";
import { designerDesignScenarios } from "./designer/design";
import { baDiscoveryScenarios } from "./ba/discovery";
import { baRequirementsScenarios } from "./ba/requirements";
import { baDesignScenarios } from "./ba/design";
import { crmDiscoveryScenarios } from "./crm/discovery";
import { crmRequirementsScenarios } from "./crm/requirements";
import { crmDesignScenarios } from "./crm/design";
import { strategyDiscoveryScenarios } from "./strategy/discovery";
import { strategyRequirementsScenarios } from "./strategy/requirements";
import { strategyDesignScenarios } from "./strategy/design";

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
 * Static cross-role impact map populated from all 24 scenario files.
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
  ...salesDiscoveryScenarios,
  ...salesRequirementsScenarios,
  ...salesDesignScenarios,
  ...designerDiscoveryScenarios,
  ...designerRequirementsScenarios,
  ...designerDesignScenarios,
  ...baDiscoveryScenarios,
  ...baRequirementsScenarios,
  ...baDesignScenarios,
  ...crmDiscoveryScenarios,
  ...crmRequirementsScenarios,
  ...crmDesignScenarios,
  ...strategyDiscoveryScenarios,
  ...strategyRequirementsScenarios,
  ...strategyDesignScenarios,
]);
