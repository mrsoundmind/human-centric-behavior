import { validateScenario } from "../schema";

/**
 * PM / Discovery phase — 4 scenarios covering all 4 friction dimensions.
 *
 * Friction dimensions covered:
 *   1. client_friction       — "The Undocumented Assumption" (original stub, preserved)
 *   2. internal_bureaucracy  — "The Sign-Off Queue"
 *   3. knowledge_gap         — "The Solo Expert"
 *   4. conflict_avoidance    — "The Quiet Yes"
 *
 * If Zod validation fails, this module throws at import time with a descriptive error.
 */

const rawClientFriction = {
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
      "In your next discovery call close-out, add one mandatory line to your discovery summary doc: 'Confirmed definition of [feature term] as: [specific behavior].' Never close discovery with a category term.",
  },
};

const rawInternalBureaucracy = {
  id: "pm-disc-internal_bureaucracy-01",
  role: "pm",
  phase: "discovery",
  frictionDimension: "internal_bureaucracy",
  title: "The Sign-Off Queue",
  setup:
    "A \u20b94Cr SAP migration project has discovery docs fully completed — stakeholder interviews done, scope defined, risks documented. But 3 approvers are required before requirements can begin: VP Engineering, procurement lead, and the compliance head. Two of them are on planned leave for the next 10 days. Sprint planning is scheduled for day 12.",
  choices: [
    {
      id: "pm-disc-ib01-a",
      text: "Wait for all 3 sign-offs before starting requirements — do not begin any parallel work",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [
        {
          affectedRole: "ba",
          affectedPhase: "requirements",
          description:
            "BA's requirements work is blocked for 10+ days while waiting for approvals, compressing the requirements phase timeline",
          severity: "high",
        },
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Compressed upstream phases cascade into a shorter development runway — developers receive requirements late",
          severity: "medium",
        },
      ],
    },
    {
      id: "pm-disc-ib01-b",
      text: "Get async written approval from the available approver, escalate to their deputies for the two on leave, and start requirements in parallel with a documented assumption log",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Discovery completion does not automatically mean requirements can start — approval chains create hard stops that compress downstream phases when not managed proactively.",
    why: "Enterprise procurement and compliance reviews have fixed SLA windows. Without a stakeholder approval tracker, PMs discover the bottleneck only after the delay has started.",
    how: "The correct move is async escalation to deputies plus a documented assumption log — this keeps requirements moving while maintaining an audit trail that satisfies compliance.",
    whoBecame:
      "A PM who treats approval as a passive wait becomes the person explaining missed sprint commitments to the client 3 weeks later.",
    tomorrowAction:
      "For your next project kickoff, create a stakeholder approval tracker template with approver name, deputy contact, expected SLA, and escalation path — attach it to every discovery closure email.",
  },
};

const rawKnowledgeGap = {
  id: "pm-disc-knowledge_gap-01",
  role: "pm",
  phase: "discovery",
  frictionDimension: "knowledge_gap",
  title: "The Solo Expert",
  setup:
    "A TCS integration project requires discovery of the client's legacy ERP API — a 12-year-old system with no documentation. The only person who understands the API is a senior architect currently on a high-priority engagement in Pune. He's available for a maximum of 2 hours total across the next 3 weeks. Your discovery kickoff is scheduled for next Monday with 8 attendees — none of whom have worked with this system.",
  choices: [
    {
      id: "pm-disc-kg01-a",
      text: "Proceed with the Monday kickoff using existing team members — the architect can review the outputs asynchronously later",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "requirements",
          description:
            "Developers receive requirements built on undiscovered legacy constraints — integration assumptions will need to be corrected mid-development",
          severity: "high",
        },
        {
          affectedRole: "qa",
          affectedPhase: "testing",
          description:
            "QA cannot validate legacy API behavior during testing because the expected behavior was never documented during discovery",
          severity: "medium",
        },
      ],
    },
    {
      id: "pm-disc-kg01-b",
      text: "Restructure Monday's kickoff agenda: first 45 minutes with just the architect to extract and document the critical API constraints before the full team joins",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Running discovery without the single source of knowledge produces a discovery document that maps what the team knows — not what the system actually does.",
    why: "In legacy integration projects, undocumented system behavior is the highest-risk unknown. When the only expert is scarce, their time must be front-loaded and structured — not consumed by a general kickoff meeting.",
    how: "A 45-minute pre-session with the architect produces a constraint log that the full team can build on. This is more valuable than their presence during the full meeting.",
    whoBecame:
      "A PM who doesn't protect knowledge-holder access during discovery becomes the person rescheduling sprints when hidden API constraints surface during development.",
    tomorrowAction:
      "For your next project kickoff, create a discovery kickoff attendee list template with a mandatory 'knowledge holder' row — each row must list: system name, sole expert, maximum available hours, and the specific questions they must answer before day 1.",
  },
};

const rawConflictAvoidance = {
  id: "pm-disc-conflict_avoidance-01",
  role: "pm",
  phase: "discovery",
  frictionDimension: "conflict_avoidance",
  title: "The Quiet Yes",
  setup:
    "An IBC client's procurement head asks for 6 modules in 8 weeks during the final discovery call. Your internal estimate, validated by two senior developers, says 14 weeks for 6 modules at the team's current capacity. The procurement head says: 'Our CEO has already communicated 8 weeks to the board. We need alignment before we can sign.' The room goes quiet.",
  choices: [
    {
      id: "pm-disc-ca01-a",
      text: "Agree to 8 weeks with the plan to 'figure it out' in requirements — at least the contract gets signed",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Developers inherit an impossible timeline — they will be pressured to cut scope or quality to meet a commitment made without their input",
          severity: "high",
        },
        {
          affectedRole: "qa",
          affectedPhase: "testing",
          description:
            "QA phase gets compressed or skipped entirely when the development timeline runs over — defects ship to production",
          severity: "high",
        },
      ],
    },
    {
      id: "pm-disc-ca01-b",
      text: "Present the validated estimate with a phased delivery proposal: 3 core modules in 8 weeks, 3 remaining in the next cycle — with a clear risk statement if that plan is rejected",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Agreeing to an impossible timeline to avoid confrontation does not make the timeline possible — it makes every downstream decision a renegotiation under worse conditions.",
    why: "When a PM avoids timeline conflict in discovery, the reckoning moves to development and QA, where team members — not the PM — absorb the pressure. The client relationship doesn't improve; it just fails later and more expensively.",
    how: "A phased delivery proposal preserves the client relationship, protects the team, and creates a documented scope decision. The risk statement is not a threat — it is the PM doing their job.",
    whoBecame:
      "A PM who says yes in the room to avoid discomfort becomes the person managing burnout, quality failures, and a client complaint 6 weeks later.",
    tomorrowAction:
      "Create a discovery freeze checklist with a mandatory timeline validation step: before any discovery is closed, list the delivery estimate, the client's expected date, the gap, and the documented decision made (accepted / negotiated / escalated). Never close discovery without this row complete.",
  },
};

export const pmDiscoveryScenarios = [
  validateScenario(rawClientFriction, "data/scenarios/pm/discovery.ts"),
  validateScenario(rawInternalBureaucracy, "data/scenarios/pm/discovery.ts"),
  validateScenario(rawKnowledgeGap, "data/scenarios/pm/discovery.ts"),
  validateScenario(rawConflictAvoidance, "data/scenarios/pm/discovery.ts"),
];
