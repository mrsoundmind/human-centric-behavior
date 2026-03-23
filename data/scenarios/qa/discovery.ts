import { validateScenario } from "../schema";

/**
 * QA / Discovery phase — 4 scenarios covering all 4 friction dimensions.
 *
 * Indian B2B enterprise context throughout.
 * Each scenario debrief tomorrowAction names a specific workflow artifact.
 */

const rawClientFriction = {
  id: "qa-disc-client_friction-01",
  role: "qa",
  phase: "discovery",
  frictionDimension: "client_friction",
  title: "The Vague Acceptance Criteria",
  setup:
    "A \u20b94Cr IBC procurement platform is entering testing. The client's acceptance criteria document says 'system should be fast' and 'UI should be intuitive' with no measurable thresholds anywhere. Your QA team needs to write test cases but has no objective pass/fail conditions to test against.",
  choices: [
    {
      id: "qa-disc-c01-a",
      text: "Begin writing test cases using your team's internal judgment on 'fast' and 'intuitive' — at least testing will start on schedule",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "pm",
          affectedPhase: "requirements",
          description:
            "PM inherits test results with no agreed baseline — client can reject any outcome as failing their subjective criteria",
          severity: "high",
        },
        {
          affectedRole: "developer",
          affectedPhase: "testing",
          description:
            "Developers receive bug reports based on QA's internal standards, not client-agreed thresholds — causing disputes over what counts as a defect",
          severity: "medium",
        },
      ],
    },
    {
      id: "qa-disc-c01-b",
      text: "Block test case creation and send the PM a QA entry criteria template requiring measurable thresholds for every acceptance criterion before testing can begin",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Writing test cases against subjective criteria creates a testing theater — tests run but nobody can agree on what pass means.",
    why: "Enterprise clients frequently express acceptance criteria in business language. Without translation to measurable thresholds (e.g., 'page load under 2 seconds on a 10Mbps connection'), QA has no objective basis for a pass/fail decision and every defect becomes negotiable.",
    how: "QA entry criteria templates with mandatory 'measurable threshold' fields force the clarification before testing begins, not after the first rejection.",
    whoBecame:
      "A QA engineer who writes test cases against vague criteria becomes the scapegoat when the client rejects UAT results — the problem was created in discovery, not during testing.",
    tomorrowAction:
      "Create a QA entry criteria template with a mandatory 'measurable threshold' field for every acceptance criterion — no criterion passes the template without a number, a target device, or a defined user action as the pass condition.",
  },
};

const rawInternalBureaucracy = {
  id: "qa-disc-internal_bureaucracy-01",
  role: "qa",
  phase: "discovery",
  frictionDimension: "internal_bureaucracy",
  title: "The Test Plan Approval",
  setup:
    "SAP integration testing for a \u20b96Cr manufacturing client is scheduled to begin Monday. Your test plan requires sign-off from three leads: the dev lead, the PM, and the security lead. The security lead is on leave until Thursday. The PM is in back-to-back client calls all week. Without approvals, company policy says you cannot start testing.",
  choices: [
    {
      id: "qa-disc-c02-a",
      text: "Wait for all three approvals before touching any test environment — policy is policy",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "testing",
          description:
            "Development team's release window shrinks as QA start date slips — developers are blocked on final sign-off while test window closes",
          severity: "high",
        },
      ],
    },
    {
      id: "qa-disc-c02-b",
      text: "Propose an async approval process: share the test plan via email with a 48-hour auto-escalation rule — if no objection is raised within 48 hours, approval is assumed and documented",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Synchronous sign-off chains on shared documents create calendar dependencies that compress downstream testing windows without any actual risk reduction.",
    why: "In Indian enterprise delivery teams, sequential approvals default to the slowest calendar slot. Most sign-offs are rubber stamps — the real purpose is risk accountability, which async confirmation with an explicit no-objection window achieves equally well.",
    how: "An async approval process with a documented 48-hour window shifts accountability without requiring calendar coordination — approvers must object, not approve.",
    whoBecame:
      "A QA lead who accepts calendar-dependent sign-off chains as immovable absorbs all downstream schedule pressure while approval owners face no consequence for unavailability.",
    tomorrowAction:
      "Draft a test plan sign-off process document with an async approval option: any sign-off request unanswered within 48 business hours is logged as 'no objection received' with the requestor's summary — escalation to the project manager is automatic at hour 49.",
  },
};

const rawKnowledgeGap = {
  id: "qa-disc-knowledge_gap-01",
  role: "qa",
  phase: "discovery",
  frictionDimension: "knowledge_gap",
  title: "The Missing Use Cases",
  setup:
    "A TCS banking module covers 15 distinct transaction types. The BA documented only 3 happy-path flows. No error flows, edge cases, concurrent user scenarios, or exception handling paths exist in any documentation. Your QA team must write comprehensive test cases but has no source material beyond the 3 documented flows.",
  choices: [
    {
      id: "qa-disc-c03-a",
      text: "Write test cases covering only the 3 documented flows — if it was important, the BA would have documented it",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [
        {
          affectedRole: "ba",
          affectedPhase: "requirements",
          description:
            "BA's incomplete documentation creates a false confidence signal — undocumented transaction types go untested and reach production as unknown risk",
          severity: "high",
        },
      ],
    },
    {
      id: "qa-disc-c03-b",
      text: "Send the BA a use case discovery questionnaire with mandatory sections for failure modes, concurrent access scenarios, and edge cases — block test case creation until responses are received",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Testing only documented happy paths creates a false green — all tests pass but 80% of the application's actual behavior has never been verified.",
    why: "BAs in Indian enterprise projects typically document what the client described, which is almost always the optimistic flow. Error handling, concurrent access, and edge cases exist in the system but are never articulated because no one asked for them during requirements.",
    how: "A use case discovery questionnaire forces the BA to enumerate failure modes and concurrent scenarios before test cases are written — not during UAT when defects become political.",
    whoBecame:
      "A QA engineer who tests only what is documented becomes the team member who 'missed' all the production bugs that were never in scope — accountability without authority.",
    tomorrowAction:
      "Build a use case discovery questionnaire with three mandatory sections: 'failure mode' (what happens when each transaction fails), 'concurrent access' (what happens when two users act simultaneously), and 'boundary conditions' (minimum, maximum, and zero values for every input) — send it before any test case is written.",
  },
};

const rawConflictAvoidance = {
  id: "qa-disc-conflict_avoidance-01",
  role: "qa",
  phase: "discovery",
  frictionDimension: "conflict_avoidance",
  title: "The Inherited Scope",
  setup:
    "An IBC enterprise module has been under development for 8 months. QA was never consulted during requirements or design. You have just been handed a test scope document by the PM who says 'just test it by Friday.' The scope covers 47 features across 6 modules in 4 days — a mathematically impossible task at any reasonable test depth.",
  choices: [
    {
      id: "qa-disc-c04-a",
      text: "Accept the scope without challenge and attempt shallow testing across all 47 features — at least there's coverage on paper",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "pm",
          affectedPhase: "testing",
          description:
            "PM receives a test completion report that signals coverage but masks depth — production defects will be traced back to QA's shallow execution, not the unrealistic scope",
          severity: "high",
        },
      ],
    },
    {
      id: "qa-disc-c04-b",
      text: "Return a QA scope confirmation document to the PM with a 'scope vs timeline' assessment — identify which features can be tested at what depth in 4 days and ask for a prioritization decision in writing before testing begins",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Accepting an impossible scope transfers the risk of incomplete coverage from the PM (who set the timeline) to QA (who accepted it without objection).",
    why: "In high-pressure Indian enterprise deliveries, QA is frequently the last team consulted and first team blamed for post-production defects. Scope negotiation at discovery prevents accountability displacement later.",
    how: "A scope confirmation document that quantifies depth vs breadth trade-offs forces the PM to make an explicit prioritization decision — the written record shifts accountability to the party with the authority to change the timeline.",
    whoBecame:
      "A QA engineer who accepts impossible scope without documentation becomes the team member cited in every post-mortem for missed defects — absorbing blame for decisions they were never empowered to make.",
    tomorrowAction:
      "Create a QA scope confirmation document template with a mandatory 'scope vs timeline assessment' section: for any test request, calculate estimated testing hours, compare against available hours, and require a written PM decision on prioritization before execution begins.",
  },
};

export const qaDiscoveryScenarios = [
  validateScenario(rawClientFriction, "data/scenarios/qa/discovery.ts"),
  validateScenario(rawInternalBureaucracy, "data/scenarios/qa/discovery.ts"),
  validateScenario(rawKnowledgeGap, "data/scenarios/qa/discovery.ts"),
  validateScenario(rawConflictAvoidance, "data/scenarios/qa/discovery.ts"),
];
