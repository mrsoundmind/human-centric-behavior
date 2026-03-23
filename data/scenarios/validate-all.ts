/**
 * Cross-role scenario validation script.
 * Run: npx tsx data/scenarios/validate-all.ts
 *
 * Validates:
 * - 36 total scenarios (3 roles × 3 phases × 4 friction dimensions)
 * - All IDs unique
 * - Each role has exactly 12 scenarios
 * - Each phase file covers all 4 friction dimensions
 */

import { pmDiscoveryScenarios } from "./pm/discovery";
import { pmRequirementsScenarios } from "./pm/requirements";
import { pmDesignScenarios } from "./pm/design";
import { developerDiscoveryScenarios } from "./developer/discovery";
import { developerRequirementsScenarios } from "./developer/requirements";
import { developerDesignScenarios } from "./developer/design";
import { qaDiscoveryScenarios } from "./qa/discovery";
import { qaRequirementsScenarios } from "./qa/requirements";
import { qaDesignScenarios } from "./qa/design";
import type { ScenarioConfig } from "./types";

const FRICTION_DIMENSIONS = [
  "client_friction",
  "internal_bureaucracy",
  "knowledge_gap",
  "conflict_avoidance",
] as const;

const ROLES = ["pm", "developer", "qa"] as const;
const PHASES = ["discovery", "requirements", "design"] as const;

const allScenarios: Record<string, Record<string, ScenarioConfig[]>> = {
  pm: {
    discovery: pmDiscoveryScenarios,
    requirements: pmRequirementsScenarios,
    design: pmDesignScenarios,
  },
  developer: {
    discovery: developerDiscoveryScenarios,
    requirements: developerRequirementsScenarios,
    design: developerDesignScenarios,
  },
  qa: {
    discovery: qaDiscoveryScenarios,
    requirements: qaRequirementsScenarios,
    design: qaDesignScenarios,
  },
};

let errors = 0;

function assert(condition: boolean, message: string) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    errors++;
  } else {
    console.log(`PASS: ${message}`);
  }
}

// Total count
const flat: ScenarioConfig[] = [];
for (const role of ROLES) {
  for (const phase of PHASES) {
    flat.push(...allScenarios[role][phase]);
  }
}
assert(flat.length === 36, `Total scenarios = ${flat.length} (expected 36)`);

// Unique IDs
const ids = flat.map((s) => s.id);
const uniqueIds = new Set(ids);
assert(uniqueIds.size === ids.length, `All ${ids.length} IDs are unique (found ${uniqueIds.size} unique)`);

// Per-role counts
for (const role of ROLES) {
  const roleScenarios: ScenarioConfig[] = [];
  for (const phase of PHASES) {
    roleScenarios.push(...allScenarios[role][phase]);
  }
  assert(roleScenarios.length === 12, `${role} has ${roleScenarios.length} scenarios (expected 12)`);
}

// Per-phase friction dimension coverage
for (const role of ROLES) {
  for (const phase of PHASES) {
    const scenarios = allScenarios[role][phase];
    assert(scenarios.length === 4, `${role}/${phase} has ${scenarios.length} scenarios (expected 4)`);
    const dimensions = scenarios.map((s) => s.frictionDimension);
    for (const dim of FRICTION_DIMENSIONS) {
      assert(
        dimensions.includes(dim),
        `${role}/${phase} covers ${dim}`
      );
    }
  }
}

// Debrief completeness
for (const s of flat) {
  const d = s.debrief;
  const fields = ["whatHappened", "why", "how", "whoBecame", "tomorrowAction"] as const;
  for (const f of fields) {
    assert(!!d[f] && d[f].length > 0, `${s.id} debrief.${f} is non-empty`);
  }
}

// Summary
console.log(`\n${"─".repeat(50)}`);
if (errors === 0) {
  console.log("ALL CHECKS PASSED — 36 scenarios validated across 3 roles × 3 phases × 4 dimensions");
} else {
  console.error(`${errors} CHECK(S) FAILED`);
  process.exit(1);
}
