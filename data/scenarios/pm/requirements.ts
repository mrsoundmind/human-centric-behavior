import { validateScenario } from "../schema";

/**
 * PM / Requirements phase — 4 scenarios covering all 4 friction dimensions.
 *
 * Friction dimensions covered:
 *   1. client_friction       — "The Shifting Success Metric"
 *   2. internal_bureaucracy  — "The Approval Bottleneck"
 *   3. knowledge_gap         — "The Half-Handover"
 *   4. conflict_avoidance    — "The Silent Scope Gap"
 *
 * If Zod validation fails, this module throws at import time with a descriptive error.
 */

const rawClientFriction = {
  id: "pm-req-client_friction-01",
  role: "pm",
  phase: "requirements",
  frictionDimension: "client_friction",
  title: "The Shifting Success Metric",
  setup:
    "A \u20b95Cr IBC client portal project is 3 days from requirements sign-off. The client's CTO sends a message: 'We've rethought the sync model — we need real-time data sync instead of the batch processing we agreed on in discovery. Can we update the spec before sign-off?' The architecture for batch processing has already been validated by your lead developer. Real-time sync is an estimated 3-week additional effort.",
  choices: [
    {
      id: "pm-req-cf01-a",
      text: "Update the requirements doc to include real-time sync — the client is paying and the relationship matters more than the timeline",
      frictionTag: "client_friction",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Developer must re-architect the data sync layer — estimated 3 additional weeks, which compresses the design and testing phases",
          severity: "high",
        },
        {
          affectedRole: "ba",
          affectedPhase: "requirements",
          description:
            "BA's signed-off requirements become invalid — all downstream acceptance criteria tied to batch processing must be rewritten",
          severity: "high",
        },
      ],
    },
    {
      id: "pm-req-cf01-b",
      text: "Log it as a Change Request: scope the real-time sync change, present the timeline and cost impact to the client, and get written approval before touching the requirements doc",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Accepting a late requirements change without a Change Request process absorbs the cost invisibly — the team pays with time, the client sees no trade-off, and the pattern repeats.",
    why: "Enterprise clients change requirements because nothing in the process makes the cost visible. A Change Request trigger makes the trade-off concrete: 'Yes, we can do real-time sync. Here is what moves.' Without that, every late change feels free.",
    how: "The correct response is not 'no' — it is 'yes, with documented impact.' A Change Request trigger checklist ensures the PM captures: what changed, what it costs, what moves, and who approved it.",
    whoBecame:
      "A PM who absorbs scope changes without documentation becomes the person explaining to leadership why the project is 3 weeks late with no paper trail.",
    tomorrowAction:
      "Create a Change Request trigger checklist to attach to your requirements template — it must include: change description, original requirement, estimated effort delta, timeline impact, approver name, and approval date. No requirement changes without this form completed.",
  },
};

const rawInternalBureaucracy = {
  id: "pm-req-internal_bureaucracy-01",
  role: "pm",
  phase: "requirements",
  frictionDimension: "internal_bureaucracy",
  title: "The Approval Bottleneck",
  setup:
    "A \u20b96Cr SAP implementation project has a comprehensive requirements document — 47 pages covering all modules, integrations, and acceptance criteria. Internal policy requires 5 sign-offs: the delivery manager, legal, information security, finance, and the solution architect. Average turnaround per approver is 4 business days. At that rate, approval alone takes 20 days — nearly the entire requirements phase buffer.",
  choices: [
    {
      id: "pm-req-ib01-a",
      text: "Submit to all 5 approvers sequentially — wait for each before sending to the next to avoid version conflicts",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [
        {
          affectedRole: "designer",
          affectedPhase: "design",
          description:
            "Design phase cannot begin without signed requirements — 20-day sequential approval pushes the design start date into buffer time",
          severity: "high",
        },
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Development planning cannot begin — architecture decisions are blocked on approved requirements",
          severity: "medium",
        },
      ],
    },
    {
      id: "pm-req-ib01-b",
      text: "Submit to all 5 approvers in parallel, set a 5-day SLA for each with explicit escalation steps if no response, and track via an escalation path document",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Sequential approval treats a coordination problem as a content problem — as if one reviewer's comments might invalidate another's review. In most enterprise projects, each reviewer owns a distinct domain and can review in parallel.",
    why: "Without an explicit SLA and escalation path, approvals have no accountability mechanism. Four-day turnarounds become eight-day turnarounds when there is no reminder system. The PM absorbs the delay silently.",
    how: "Parallel review with a documented SLA and escalation path turns approval from a passive wait into an active workflow. Each approver knows the deadline and the consequence of missing it.",
    whoBecame:
      "A PM who manages approvals without SLAs becomes the person sending polite follow-up emails for three weeks while the project timeline erodes.",
    tomorrowAction:
      "Create an escalation path document for your next requirements approval cycle: list each approver, their deputy, the review SLA, the escalation trigger (what day you escalate), and the escalation contact. Attach it to your requirements submission email.",
  },
};

const rawKnowledgeGap = {
  id: "pm-req-knowledge_gap-01",
  role: "pm",
  phase: "requirements",
  frictionDimension: "knowledge_gap",
  title: "The Half-Handover",
  setup:
    "You've been handed a requirements project mid-stream. The previous PM left 3 weeks ago — she documented the 'what' (feature list, scope) but not the 'why' (why certain features were included, what alternatives were rejected, what the client specifically asked for versus what the team decided). Three requirements have notes marked 'TBD — discuss with Priya' (the departed PM). The client expects sign-off in 8 days.",
  choices: [
    {
      id: "pm-req-kg01-a",
      text: "Complete the requirements with your best interpretation of the TBD items — the sign-off date cannot move",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [
        {
          affectedRole: "ba",
          affectedPhase: "design",
          description:
            "BA and designer will build on requirements that contain unvalidated assumptions — design decisions may contradict the client's original intent",
          severity: "high",
        },
        {
          affectedRole: "qa",
          affectedPhase: "testing",
          description:
            "QA acceptance criteria for the TBD items will be based on assumed requirements — test coverage gaps emerge when the client reviews the final product",
          severity: "medium",
        },
      ],
    },
    {
      id: "pm-req-kg01-b",
      text: "Contact the departed PM through your delivery manager, schedule a 1-hour handover call to resolve the TBD items, and add a 'decision rationale' column to all requirements before sign-off",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Requirements that document the 'what' without the 'why' are time-bombs — the knowledge gap surfaces at the worst moment, usually when the client reviews the final product and says 'that's not what we discussed.'",
    why: "In Indian enterprise projects, mid-project PM transitions are common. The cost of a 1-hour knowledge transfer call is measured in minutes. The cost of signing off on assumed requirements is measured in rework weeks.",
    how: "A requirements handover template with a mandatory 'decision rationale' column forces every requirement to carry its context: who asked for it, why it was included, and what alternatives were rejected.",
    whoBecame:
      "A PM who inherits undocumented decisions and doesn't fill the gap becomes the person defending requirements the client doesn't recognize during UAT.",
    tomorrowAction:
      "Add a 'decision rationale' column to your requirements template with three sub-fields: requested by (client/internal), alternatives considered, and reason selected. For your next project, no requirement can be marked complete without this column filled.",
  },
};

const rawConflictAvoidance = {
  id: "pm-req-conflict_avoidance-01",
  role: "pm",
  phase: "requirements",
  frictionDimension: "conflict_avoidance",
  title: "The Silent Scope Gap",
  setup:
    "Your BA flagged a gap in the requirements 5 days ago: the client's ERP integration requirements don't cover 3 edge cases in the financial reconciliation flow. The BA estimates these 3 cases represent 15% of transaction volume. You understand the impact, but the client has been difficult to reach, the sign-off deadline is tomorrow, and raising it now might delay the entire project by another week. You haven't escalated it to the client yet.",
  choices: [
    {
      id: "pm-req-ca01-a",
      text: "Close requirements sign-off tomorrow without raising the ERP gap — the BA's edge cases can be handled as bugs or CR items in a later phase",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Developer builds the reconciliation flow without knowing the edge cases exist — the code structure may not accommodate them without significant rework",
          severity: "high",
        },
        {
          affectedRole: "qa",
          affectedPhase: "testing",
          description:
            "QA writes test cases against incomplete requirements — the 15% of transactions in the gap go untested until production",
          severity: "high",
        },
      ],
    },
    {
      id: "pm-req-ca01-b",
      text: "Raise the ERP gap to the client today with a concise impact statement, log it as an 'unresolved item' in the requirements doc, and require written acknowledgment before sign-off proceeds",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Closing sign-off over a known gap does not make the gap go away — it makes it the team's problem instead of a documented risk the client understood and accepted.",
    why: "The PM's job is not to protect the client from bad news — it is to ensure that bad news is surfaced at the lowest-cost point. A scope gap found in requirements costs 1 week. The same gap found in production costs months.",
    how: "A requirements sign-off rubric with an 'unresolved items' gate forces every known gap to be documented and acknowledged before the phase closes. The client may accept the risk — but they must accept it in writing.",
    whoBecame:
      "A PM who avoids surfacing gaps to protect the timeline becomes the person managing production incidents that trace back to a requirements conversation that never happened.",
    tomorrowAction:
      "Add an 'unresolved items' gate to your requirements sign-off rubric — a mandatory section listing every open item, its potential impact, and the client's documented decision: resolved, accepted as risk, or deferred to CR. No sign-off proceeds with an empty acknowledgment.",
  },
};

export const pmRequirementsScenarios = [
  validateScenario(rawClientFriction, "data/scenarios/pm/requirements.ts"),
  validateScenario(rawInternalBureaucracy, "data/scenarios/pm/requirements.ts"),
  validateScenario(rawKnowledgeGap, "data/scenarios/pm/requirements.ts"),
  validateScenario(rawConflictAvoidance, "data/scenarios/pm/requirements.ts"),
];
