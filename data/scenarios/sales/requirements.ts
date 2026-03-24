import { validateScenario } from "../schema";

/**
 * Sales / Requirements phase — 4 scenarios covering all 4 friction dimensions.
 *
 * Friction dimensions covered:
 *   1. client_friction       — "The Scope Creep Handshake"
 *   2. internal_bureaucracy  — "The Resource Queue"
 *   3. knowledge_gap         — "The Lost Handover"
 *   4. conflict_avoidance    — "The SLA Absorber"
 *
 * If Zod validation fails, this module throws at import time with a descriptive error.
 */

const rawClientFriction = {
  id: "sales-req-client_friction-01",
  role: "sales",
  phase: "requirements",
  frictionDimension: "client_friction",
  title: "The Scope Creep Handshake",
  setup:
    "The signed SoW says \u2018standard reporting\u2019 but the client\u2019s project lead interprets this as custom dashboards with drill-down analytics. Requirements workshops have already begun. The client references your demo as proof that \u2018this is what was agreed.\u2019",
  choices: [
    {
      id: "sales-req-cf01-a",
      text: "Agree to the client\u2019s expanded interpretation to preserve the relationship \u2014 scope can be adjusted later",
      frictionTag: "client_friction",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Developer receives requirements that include custom dashboard functionality not in the original estimate \u2014 development scope expands mid-sprint without budget adjustment",
          severity: "high",
        },
      ],
    },
    {
      id: "sales-req-cf01-b",
      text: "Schedule a scope alignment call referencing exact SoW language and define \u2018standard reporting\u2019 with concrete deliverable boundaries",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Agreeing to scope expansion during requirements without a contract amendment converts a relationship gesture into an unpriced delivery commitment.",
    why: "Clients interpret demos as promises. When SoW language is ambiguous, the client\u2019s version wins by default unless sales actively defines terms before delivery begins.",
    how: "A Feature Definition Glossary appended to the SoW removes ambiguity by listing every feature term with concrete deliverable boundaries \u2014 agreed and signed before kickoff.",
    whoBecame:
      "A sales rep who avoids scope clarification conversations becomes the escalation point when delivery refuses to build undocumented features 6 weeks in.",
    tomorrowAction:
      "Add a \u2018Feature Definition Glossary\u2019 appendix to your SoW template defining every feature term with a concrete deliverable boundary. No feature named without a definition.",
  },
};

const rawInternalBureaucracy = {
  id: "sales-req-internal_bureaucracy-01",
  role: "sales",
  phase: "requirements",
  frictionDimension: "internal_bureaucracy",
  title: "The Resource Queue",
  setup:
    "A \u20b93.5Cr deal requires a pre-sales technical architect to complete the scoping workshop. The only qualified architect is fully allocated for 3 weeks. Requirements workshops are scheduled to begin in 5 days. The client has already cleared their calendar.",
  choices: [
    {
      id: "sales-req-ib01-a",
      text: "Proceed with the requirements workshops without technical scoping \u2014 the architect can review outputs later",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [
        {
          affectedRole: "ba",
          affectedPhase: "requirements",
          description:
            "BA leads requirements workshops without technical scoping input \u2014 requirements are gathered against assumptions that the architect will later correct, creating rework",
          severity: "medium",
        },
      ],
    },
    {
      id: "sales-req-ib01-b",
      text: "Escalate the resource conflict to the delivery manager with a business impact memo quantifying deal revenue at risk per day of delay",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Proceeding with requirements workshops without the technical architect produces requirements that are commercially viable but technically unvalidated.",
    why: "Resource allocation decisions respond to business impact framing. A request with revenue context gets prioritized \u2014 a request without it joins the general queue.",
    how: "A Resource Escalation Template that quantifies deal revenue at risk per day of scoping delay gives delivery managers the business case they need to reassign resources.",
    whoBecame:
      "A sales rep who accepts resource bottlenecks silently becomes the person managing a client who is waiting for workshops that aren\u2019t starting.",
    tomorrowAction:
      "Draft a \u2018Resource Escalation Template\u2019 that quantifies: deal revenue, client\u2019s calendar commitment, revenue at risk per day of delay, and the specific resource needed. Use it every time a critical scoping role is unavailable.",
  },
};

const rawKnowledgeGap = {
  id: "sales-req-knowledge_gap-01",
  role: "sales",
  phase: "requirements",
  frictionDimension: "knowledge_gap",
  title: "The Lost Handover",
  setup:
    "You won a \u20b94Cr IBC deal after a 3-month sales cycle. You\u2019re handing over to the delivery PM. You have 14 email threads, 3 call recordings, and a proposal deck. The client has a non-negotiable: no system downtime during Diwali week. You mentioned this verbally during negotiation but it\u2019s not in any document.",
  choices: [
    {
      id: "sales-req-kg01-a",
      text: "Forward all 14 email threads to the PM and let them extract the context \u2014 it\u2019s all in there somewhere",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [
        {
          affectedRole: "pm",
          affectedPhase: "discovery",
          description:
            "PM inherits 14 unstructured email threads with no extraction of the critical Diwali downtime constraint \u2014 the constraint is discovered only when the deployment window conflicts with it",
          severity: "high",
        },
      ],
    },
    {
      id: "sales-req-kg01-b",
      text: "Conduct a structured 30-minute handover meeting using a checklist that includes non-negotiable constraints, verbal promises, and stakeholder context",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Forwarding unstructured email threads as a handover delivers volume without synthesis \u2014 the PM inherits a research task when they need a briefing.",
    why: "Critical constraints communicated verbally during sales cycles are the highest-risk knowledge gap at handover. They exist only in the sales rep\u2019s memory until a structured transfer extracts them.",
    how: "A Pre-Sales to Delivery Handover Checklist forces the sales rep to surface verbal promises, non-negotiable constraints, and stakeholder personalities before they leave the project.",
    whoBecame:
      "A sales rep who relies on email threads for handover becomes responsible for the delivery conflict they created by not transferring what they knew.",
    tomorrowAction:
      "Create a \u2018Pre-Sales to Delivery Handover Checklist\u2019 covering: non-negotiable constraints, verbal promises, competitor context, stakeholder personalities, and deal-specific risks. Use it for every handover above \u20b92Cr.",
  },
};

const rawConflictAvoidance = {
  id: "sales-req-conflict_avoidance-01",
  role: "sales",
  phase: "requirements",
  frictionDimension: "conflict_avoidance",
  title: "The SLA Absorber",
  setup:
    "The client\u2019s legal team has added a 100% uptime SLA clause to the contract during final review. You\u2019re 2 days from signature. Your delivery lead was not consulted. You know 100% uptime is technically impossible but the client\u2019s legal is firm and you don\u2019t want to delay the close.",
  choices: [
    {
      id: "sales-req-ca01-a",
      text: "Sign the 100% uptime clause to close the deal \u2014 delivery will handle the SLA discussions later",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Developer inherits a 100% uptime SLA requirement that is architecturally impossible without significant redundancy infrastructure not scoped or budgeted",
          severity: "high",
        },
      ],
    },
    {
      id: "sales-req-ca01-b",
      text: "Flag the SLA clause to the delivery team and negotiate realistic SLA tiers with the client before signing",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Signing a 100% uptime SLA without delivery review creates a contractual obligation your team cannot fulfill \u2014 and they will be held responsible for a commitment they never agreed to.",
    why: "Legal SLA clauses added at contract review are negotiating tactics. They respond to counterproposals with tiered alternatives. Sales avoiding the conversation doesn\u2019t make the clause disappear \u2014 it makes it binding.",
    how: "An SLA Review Gate in the contract sign-off checklist ensures no SLA above 99.5% is signed without written delivery team confirmation of feasibility.",
    whoBecame:
      "A sales rep who signs impossible SLA clauses to close faster becomes the witness in the client escalation call when the first incident occurs.",
    tomorrowAction:
      "Add an \u2018SLA Review Gate\u2019 to your contract sign-off checklist: no SLA above 99.5% without written delivery team confirmation. Include the delivery lead\u2019s email acknowledgment as a required attachment before signature.",
  },
};

export const salesRequirementsScenarios = [
  validateScenario(rawClientFriction, "data/scenarios/sales/requirements.ts"),
  validateScenario(rawInternalBureaucracy, "data/scenarios/sales/requirements.ts"),
  validateScenario(rawKnowledgeGap, "data/scenarios/sales/requirements.ts"),
  validateScenario(rawConflictAvoidance, "data/scenarios/sales/requirements.ts"),
];
