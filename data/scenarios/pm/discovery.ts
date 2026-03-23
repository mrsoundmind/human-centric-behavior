import { validateScenario } from "../schema";

/**
 * PM / Discovery phase — stub scenario for pipeline validation.
 *
 * This file proves the full data-to-validation pipeline:
 *   raw object → validateScenario() → typed ScenarioConfig
 *
 * If Zod validation fails (e.g., a required debrief field is missing), this
 * module will throw at import time with a descriptive error message.
 *
 * Real PM/Discovery scenarios are authored in Phase 3.
 */

const raw = {
  id: "pm-discovery-client-01",
  role: "pm",
  phase: "discovery",
  frictionDimension: "client_friction",
  title: "The Undocumented Assumption",
  setup:
    "A \u20b93Cr IBC client wants an AI dashboard integrated into their procurement portal. Your discovery call notes say 'AI features' — but nobody defined what that means. Sprint planning is in 3 days.",
  choices: [
    {
      id: "pm-disc-c01-a",
      text: "Approve the discovery summary and move to requirements with 'AI dashboard' as a scope item",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "ba",
          affectedPhase: "requirements",
          description:
            "BA inherits ambiguous 'AI features' scope — requirements gathering starts without a defined target",
          severity: "high",
        },
      ],
    },
    {
      id: "pm-disc-c01-b",
      text: "Request a 30-minute callback with the client to define 'AI' before closing discovery",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Approving an undefined AI scope item closes discovery without establishing what was agreed.",
    why: "Enterprise clients often use 'AI' as a placeholder for competitive pressure. Without a concrete definition, the procurement cycle continues but the delivery promise is undefined.",
    how: "A 30-minute scope confirmation call is the standard PM gate for any client request using category language without specifics.",
    whoBecame:
      "A PM who approves vague scope items to avoid delay becomes the bottleneck when requirements gathering stalls two weeks later.",
    tomorrowAction:
      "In your next discovery call close-out, add one mandatory line to your summary doc: 'Confirmed definition of [feature term] as: [specific behavior].' Never close discovery with a category term.",
  },
};

export const pmDiscoveryScenarios = [
  validateScenario(raw, "data/scenarios/pm/discovery.ts"),
];
