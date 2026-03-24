import { validateScenario } from "../schema";

/**
 * BA / Design phase — 4 scenarios covering all 4 friction dimensions.
 *
 * Friction dimensions covered:
 *   1. client_friction       — "The Wireframe Disconnect"
 *   2. internal_bureaucracy  — "The UAT Environment"
 *   3. knowledge_gap         — "The Unstructured UAT"
 *   4. conflict_avoidance    — "The Silent Gap"
 *
 * If Zod validation fails, this module throws at import time with a descriptive error.
 */

const rawClientFriction = {
  id: "ba-des-client_friction-01",
  role: "ba",
  phase: "design",
  frictionDimension: "client_friction",
  title: "The Wireframe Disconnect",
  setup:
    "A \u20b93Cr vendor management portal project has just completed wireframe review. The client's procurement head says: 'These wireframes don't match what we signed off on. The vendor onboarding flow has 7 steps — we agreed to 4 in the requirements. Who approved this?' You authored both the requirements and the wireframe review notes. The discrepancy exists.",
  choices: [
    {
      id: "ba-des-cf01-a",
      text: "Defend the wireframes as a design interpretation of the requirements and ask the client to review them on their own merits",
      frictionTag: "client_friction",
      crossRoleImpact: [
        {
          affectedRole: "designer",
          affectedPhase: "design",
          description:
            "Designer is placed in the middle of a BA-client conflict about requirements interpretation — cannot proceed with high-fidelity design until the scope dispute is resolved between BA and client",
          severity: "high",
        },
      ],
    },
    {
      id: "ba-des-cf01-b",
      text: "Create a requirements-to-wireframe traceability matrix mapping each screen element to its source requirement, and present it alongside the wireframes in a reconciliation meeting",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Defending wireframes without evidence produces a credibility crisis, not a design conversation. When a client says the wireframes don't match requirements, the correct response is a traceability matrix, not a defence.",
    why: "Wireframe reviews fail when there is no documented link between requirements and design decisions. The client is not wrong to ask — they signed off on requirements, not on the BA's interpretation of those requirements.",
    how: "A requirements-to-design traceability matrix — mapping every wireframe element to its source requirement — turns a dispute into a reconciliation. Gaps become visible and bounded. The client sees exactly what was interpreted versus what was specified.",
    whoBecame:
      "A BA who defends wireframes without documentation becomes the person stuck between client dissatisfaction and a designer who cannot proceed without resolution.",
    tomorrowAction:
      "Create a 'Requirements-to-Design Traceability Matrix' template that maps every wireframe screen to its source requirement reference. Present this matrix alongside wireframes in every design review — it takes 2 hours to build and prevents a week of dispute resolution.",
  },
};

const rawInternalBureaucracy = {
  id: "ba-des-internal_bureaucracy-01",
  role: "ba",
  phase: "design",
  frictionDimension: "internal_bureaucracy",
  title: "The UAT Environment",
  setup:
    "A \u20b94Cr insurance claims processing system has completed design phase. UAT is planned in 3 weeks. Setting up the UAT environment requires a Change Control Board approval — standard processing time is 3 weeks. Without the environment, UAT cannot begin. You are the BA responsible for facilitating UAT. You submitted the CCB request today.",
  choices: [
    {
      id: "ba-des-ib01-a",
      text: "Wait for the CCB approval to complete before any further UAT planning — the process cannot be bypassed",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [
        {
          affectedRole: "qa",
          affectedPhase: "testing",
          description:
            "QA receives a compressed UAT window — the testing phase that was planned for 3 weeks becomes 0 days if CCB approval takes its full 3-week SLA, or a rushed 5-day window with an expedited approval",
          severity: "high",
        },
      ],
    },
    {
      id: "ba-des-ib01-b",
      text: "Request parallel provisioning with a rollback plan while CCB processes, and flag the timeline risk to the project sponsor immediately",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "A UAT environment request filed at the start of UAT planning instead of 6 weeks earlier creates a timeline collision. CCB approval SLAs are fixed — the BA's planning window is the variable.",
    why: "Infrastructure procurement in enterprise projects has fixed lead times that BA planning must account for. When environment setup is treated as a task rather than a milestone, its lead time compresses the testing phase.",
    how: "Filing UAT environment requests 6 weeks before UAT — not at the start of design — and requesting parallel provisioning with a rollback plan ensures the environment is ready when testing begins. The CCB process does not change; the planning timeline does.",
    whoBecame:
      "A BA who files environment requests at the last minute becomes the person explaining to QA why a 3-week testing plan has been compressed to 4 days because of an infrastructure approval delay.",
    tomorrowAction:
      "Add 'UAT Environment Lead Time' as a standing item in your project kickoff checklist with a target filing date of 6 weeks before planned UAT. File the CCB request on that date regardless of where the project is in design — lead time starts from submission, not from project readiness.",
  },
};

const rawKnowledgeGap = {
  id: "ba-des-knowledge_gap-01",
  role: "ba",
  phase: "design",
  frictionDimension: "knowledge_gap",
  title: "The Unstructured UAT",
  setup:
    "A \u20b92.5Cr HR workflow platform has reached UAT. You've scheduled a 2-day UAT session with 8 business users. On day 1, users begin testing but provide feedback like 'the colour feels wrong,' 'this doesn't look right,' and 'I prefer the old system' — none of which map to acceptance criteria. After 4 hours, you have 12 pages of subjective feedback and zero pass/fail decisions against the requirements.",
  choices: [
    {
      id: "ba-des-kg01-a",
      text: "Continue the session, translating the subjective feedback into bug reports yourself based on your understanding of the requirements",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [
        {
          affectedRole: "qa",
          affectedPhase: "testing",
          description:
            "QA receives bug reports based on BA's interpretation of subjective UAT feedback — acceptance criteria coverage is unknown, and the team cannot confirm whether the system has actually passed UAT",
          severity: "medium",
        },
      ],
    },
    {
      id: "ba-des-kg01-b",
      text: "Pause the UAT session, distribute structured UAT scripts with pass/fail criteria, and resume with testers working against specific test scenarios",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Unstructured UAT sessions produce preference data, not acceptance data. When testers haven't been given structured scripts, they test by intuition — which generates noise, not evidence.",
    why: "Business users are experts in their workflow, not in software testing. Without UAT scripts that map to acceptance criteria, they will evaluate the system against their mental model of 'how software should feel,' not against the agreed specification.",
    how: "A UAT script with scenario, preconditions, exact steps, expected result, and a pass/fail checkbox transforms testers from evaluators into evidence generators. The BA's job is to create the script, not interpret the session afterwards.",
    whoBecame:
      "A BA who facilitates unstructured UAT becomes the person defending a sign-off decision that cannot be evidenced — when a defect surfaces post-launch that was 'tested' during UAT.",
    tomorrowAction:
      "Create a 'UAT Script Template' with: test scenario name, precondition, exact steps (numbered), expected result per step, and a pass/fail checkbox. Distribute to all testers 48 hours before the UAT session. A UAT session without pre-distributed scripts is not a UAT session.",
  },
};

const rawConflictAvoidance = {
  id: "ba-des-conflict_avoidance-01",
  role: "ba",
  phase: "design",
  frictionDimension: "conflict_avoidance",
  title: "The Silent Gap",
  setup:
    "A \u20b95Cr supply chain visibility platform has completed design review. During the review, you notice a critical gap: the requirements specified that the system must support bulk status updates for up to 10,000 shipment records, but the design assumes a maximum of 500 records per batch. The performance implications are significant. Raising this issue would require reopening the signed-off requirements document, which took 4 weeks to finalise.",
  choices: [
    {
      id: "ba-des-ca01-a",
      text: "Note the gap privately in your working documents and proceed, hoping the developer identifies it during implementation",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Developer builds the batch processing logic against the design's 500-record assumption — the architecture choice for bulk processing is made incorrectly, requiring a significant refactor when the 10,000-record requirement is discovered mid-development",
          severity: "high",
        },
      ],
    },
    {
      id: "ba-des-ca01-b",
      text: "Raise the gap formally with a scoped Targeted Amendment Request — limited to the specific performance constraint, with impact assessment — without reopening the full requirements document",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "A BA who spots a gap and stays silent transfers the discovery cost downstream. The gap does not disappear — it surfaces in development or production, where fixing it costs orders of magnitude more.",
    why: "Silence on a known gap is not risk management — it is risk transfer. The BA knows the gap exists. The developer does not. At the moment of discovery, the BA is the lowest-cost person to resolve it.",
    how: "A 'Targeted Amendment Request' — scoped to the single gap, with impact assessment, not a full requirements reopen — is a proportionate response. It surfaces the issue without triggering a full phase restart.",
    whoBecame:
      "A BA who documents gaps privately becomes the person who, during a post-launch retrospective, acknowledges they 'noticed something' but didn't raise it because it would have complicated the timeline.",
    tomorrowAction:
      "When you spot a gap post-sign-off, file a 'Targeted Amendment Request' within 24 hours: gap description, source requirement reference, design assumption, performance implication, and recommended resolution. Scope it to the single issue — not a full requirements reopen.",
  },
};

export const baDesignScenarios = [
  validateScenario(rawClientFriction, "data/scenarios/ba/design.ts"),
  validateScenario(rawInternalBureaucracy, "data/scenarios/ba/design.ts"),
  validateScenario(rawKnowledgeGap, "data/scenarios/ba/design.ts"),
  validateScenario(rawConflictAvoidance, "data/scenarios/ba/design.ts"),
];
