import { validateScenario } from "../schema";

/**
 * QA / Requirements phase — 4 scenarios covering all 4 friction dimensions.
 *
 * Indian B2B enterprise context throughout.
 * Each scenario debrief tomorrowAction names a specific workflow artifact.
 */

const rawClientFriction = {
  id: "qa-req-client_friction-01",
  role: "qa",
  phase: "requirements",
  frictionDimension: "client_friction",
  title: "The Moved Goalposts",
  setup:
    "A \u20b95Cr procurement system is mid-sprint. Requirements were signed off three weeks ago. The client's procurement head has now changed the core pricing logic: from a tiered discount structure to a flat rate model. Your team has 200+ test cases built against the old logic — all now invalid. The PM says the change is final and sprint timeline is unchanged.",
  choices: [
    {
      id: "qa-req-c01-a",
      text: "Discard the old test cases and start rewriting immediately — the client is always right and the timeline is fixed",
      frictionTag: "client_friction",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "requirements",
          description:
            "Developer receives the requirement change without a test case impact count — development scope change is unquantified and timeline risk is invisible",
          severity: "high",
        },
        {
          affectedRole: "pm",
          affectedPhase: "requirements",
          description:
            "PM approves the change without a documented test case invalidation count — sprint capacity impact is hidden until testing falls behind",
          severity: "high",
        },
      ],
    },
    {
      id: "qa-req-c01-b",
      text: "Complete a requirements change impact checklist documenting the number of invalid test cases, rewrite effort in hours, and timeline impact — share with PM before any test case is discarded",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Absorbing a requirements change without a documented impact count turns a client-driven scope change into a QA execution failure when the sprint misses its test completion target.",
    why: "In Indian enterprise B2B contracts, requirements changes after sign-off are common but rarely assessed for downstream testing cost. The client sees a 30-minute meeting. QA sees 3 days of rework. Without a written impact count, the PM cannot make an informed timeline decision.",
    how: "A requirements change impact checklist with a 'test case invalidation count' field makes the downstream cost visible at the moment of change — not after the sprint collapses.",
    whoBecame:
      "A QA lead who silently absorbs requirements changes without documentation becomes the sprint's bottleneck explanation — blamed for slow execution on work that was never scoped for the timeline.",
    tomorrowAction:
      "Build a requirements change impact checklist with three required fields: total test cases invalidated by this change, estimated rewrite hours, and sprint timeline delta — attach it to every requirements change request before the PM approves the change.",
  },
};

const rawInternalBureaucracy = {
  id: "qa-req-internal_bureaucracy-01",
  role: "qa",
  phase: "requirements",
  frictionDimension: "internal_bureaucracy",
  title: "The Test Environment Queue",
  setup:
    "Your SAP integration project has a single staging environment shared across four teams: development, QA, UAT, and performance testing. QA has a 3-day testing window allocated in the sprint plan. When you attempt to access the environment Monday morning, it is occupied by the performance team who overran their window by 2 days. No booking system exists.",
  choices: [
    {
      id: "qa-req-c02-a",
      text: "Wait for the performance team to finish and compress your testing into whatever time remains — blocking the sprint is worse than reduced coverage",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "testing",
          description:
            "Developer's release-ready build sits untested as QA window compresses — release confidence drops without a documented reason for the delay",
          severity: "medium",
        },
      ],
    },
    {
      id: "qa-req-c02-b",
      text: "Escalate immediately to the delivery manager with a written test environment booking process proposal that includes conflict resolution SLA and explicit handover protocols",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Compressing testing to accommodate an environment collision without escalation ensures the problem recurs next sprint and reduces QA coverage below the scope that was committed to stakeholders.",
    why: "Shared staging environments in Indian enterprise delivery setups routinely become invisible bottlenecks because no team owns the conflict resolution. The team that absorbs the collision is always QA — the last consumer in the pipeline.",
    how: "A test environment booking process with SLA-based conflict resolution removes calendar ambiguity — each team's window is protected and overruns trigger automatic escalation rather than silent absorption.",
    whoBecame:
      "A QA engineer who silently compresses testing to accommodate environment collisions trains the organization to view QA time as the system's shock absorber — every future sprint will schedule QA last and assume shrinkage is acceptable.",
    tomorrowAction:
      "Write a test environment booking process document with three components: a shared calendar with sprint-locked blocks per team, a conflict resolution SLA (overrun team notifies manager within 4 hours), and a mandatory handover checklist before each team yields the environment.",
  },
};

const rawKnowledgeGap = {
  id: "qa-req-knowledge_gap-01",
  role: "qa",
  phase: "requirements",
  frictionDimension: "knowledge_gap",
  title: "The Undocumented Business Rule",
  setup:
    "An IBC enterprise procurement system includes a multi-tier pricing calculation that determines vendor discount tiers based on historical purchase volume, contract category, and payment terms. Your test case requires an expected output — but the formula exists nowhere in writing. The only person who understands the full calculation is the client's senior BA, who is accessible only through the PM and typically responds within 3-5 days.",
  choices: [
    {
      id: "qa-req-c03-a",
      text: "Reverse-engineer the formula from the existing system's outputs using sample data — infer the rules and build test cases on your assumptions",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [
        {
          affectedRole: "ba",
          affectedPhase: "requirements",
          description:
            "BA's tribal knowledge becomes a permanent single point of failure — QA's inferred formula may differ from the actual rule, making future test cases invalid without the BA's involvement",
          severity: "high",
        },
      ],
    },
    {
      id: "qa-req-c03-b",
      text: "Block test case creation for this module and escalate to the PM with a business rule register template requesting the formula with source documentation and a verification date before testing proceeds",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Building test cases on inferred formulas creates a validation illusion — tests pass against QA's assumed rule, not the client's actual business logic.",
    why: "In Indian enterprise B2B systems, pricing and discount calculations are frequently tribal knowledge owned by one client-side individual. When QA infers the formula, both the inference and the original remain unverified — any discrepancy surfaces as a production defect after go-live.",
    how: "A business rule register with mandatory 'source' and 'verification date' columns forces documentation before testing — the formula becomes an artifact, not a memory.",
    whoBecame:
      "A QA engineer who infers business rules rather than demanding documentation becomes the owner of an untested assumption — when production defects surface in the pricing module, the audit trail leads to QA's test cases, not the missing documentation.",
    tomorrowAction:
      "Create a business rule register template with four required columns: rule name, formula or decision logic, source (document or person name with date), and verification date — no test case that depends on a business rule is written until the rule has an entry in the register.",
  },
};

const rawConflictAvoidance = {
  id: "qa-req-conflict_avoidance-01",
  role: "qa",
  phase: "requirements",
  frictionDimension: "conflict_avoidance",
  title: "The Unchallenged Requirement",
  setup:
    "During requirements review, you notice that a new 'auto-save every 30 seconds' feature directly contradicts the existing manual-save-only audit trail system — the audit trail logs only explicit save actions, and auto-save would flood it with thousands of unintentional entries per session. The PM has already approved the auto-save feature in the previous sprint. Raising it now means challenging an approved requirement.",
  choices: [
    {
      id: "qa-req-c04-a",
      text: "Stay silent — the PM approved it, so either they know and accepted the trade-off, or it will surface during UAT when it is no longer your problem",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Developer builds both features as specified without knowing they conflict — integration defect is discovered during testing, not design, doubling rework cost",
          severity: "high",
        },
        {
          affectedRole: "pm",
          affectedPhase: "testing",
          description:
            "PM discovers the conflict during testing when fixing it requires a design decision — timeline impact is 3x higher than if caught during requirements review",
          severity: "high",
        },
      ],
    },
    {
      id: "qa-req-c04-b",
      text: "File a formal requirements conflict note using a requirements review question bank — document the auto-save vs audit trail contradiction with affected components and send it to the PM as a pre-development blocking question",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Staying silent on a known contradiction defers the conflict to a phase where fixing it costs 3 to 10 times more — and transfers the defect ownership from requirements (where it belongs) to QA (where it surfaces).",
    why: "In enterprise delivery, QA often spots requirement conflicts that earlier reviewers missed because QA thinks in terms of system behavior under all conditions, not just the intended flow. Silence on a known conflict is a professional risk transfer — you know the problem exists and chose not to document it.",
    how: "A requirements review question bank with a mandatory 'conflict with existing' check makes raising contradictions a standard protocol, not a political decision.",
    whoBecame:
      "A QA engineer who stays silent on a known requirement conflict becomes the team member who 'should have caught it earlier' — despite being the only one who did.",
    tomorrowAction:
      "Build a requirements review question bank with a mandatory section: 'conflict with existing features' — for every new requirement, list at least one existing feature it could interact with and document whether the interaction was verified as compatible.",
  },
};

export const qaRequirementsScenarios = [
  validateScenario(rawClientFriction, "data/scenarios/qa/requirements.ts"),
  validateScenario(rawInternalBureaucracy, "data/scenarios/qa/requirements.ts"),
  validateScenario(rawKnowledgeGap, "data/scenarios/qa/requirements.ts"),
  validateScenario(rawConflictAvoidance, "data/scenarios/qa/requirements.ts"),
];
