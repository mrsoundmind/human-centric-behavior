import { validateScenario } from "../schema";

/**
 * CRM / Discovery phase — 4 scenarios covering all 4 friction dimensions.
 *
 * Friction dimensions covered:
 *   1. client_friction       — "The Renewal Confrontation"
 *   2. internal_bureaucracy  — "The Escalation Maze"
 *   3. knowledge_gap         — "The Undocumented History"
 *   4. conflict_avoidance    — "The Optimistic Report"
 *
 * If Zod validation fails, this module throws at import time with a descriptive error.
 */

const rawClientFriction = {
  id: "crm-discovery-client_friction-01",
  role: "crm",
  phase: "discovery",
  frictionDimension: "client_friction",
  title: "The Renewal Confrontation",
  setup:
    "A \u20b92Cr annual contract renewal meeting with a manufacturing client turns confrontational. The client's VP Operations raises 3 specific product friction points that have been affecting their daily workflows for 6 months. Your renewal targets require closing this contract by end of quarter. Acknowledging the friction on record feels risky — it might invite a price negotiation or a delay.",
  choices: [
    {
      id: "crm-disc-cf01-a",
      text: "Deflect the friction points with 'we're aware of these and working on them' and steer the conversation back to renewal terms",
      frictionTag: "client_friction",
      crossRoleImpact: [
        {
          affectedRole: "pm",
          affectedPhase: "requirements",
          description:
            "PM never receives the client friction data — the same issues reappear in the next quarter with higher severity, and the product team has no evidence of business impact to prioritise resolution",
          severity: "high",
        },
      ],
    },
    {
      id: "crm-disc-cf01-b",
      text: "Acknowledge the friction, document it formally, present a resolution timeline, and use it as evidence of commitment during the renewal discussion",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Deflecting client friction to protect a renewal conversation delays the resolution — the issue doesn't disappear, it compounds. The client who raised friction and was deflected enters the next renewal with even less trust.",
    why: "CRM relationships break down not because problems exist, but because problems are deflected rather than documented. Acknowledging friction with a resolution timeline transforms a confrontational moment into a trust-building one.",
    how: "A 'Client Friction Log' section in the QBR template — issue, client workflow impact, resolution owner, target date — turns friction into a managed asset. The PM can act on it. The client sees commitment, not avoidance.",
    whoBecame:
      "A CRM manager who deflects friction to close renewals becomes the person handling a contract termination when the same unresolved issues cause a production failure six months later.",
    tomorrowAction:
      "Add a 'Client Friction Log' section to your QBR template — every friction reported gets documented with: issue description, impact on client workflow, resolution owner, and target resolution date. Present this log at the following QBR as evidence of follow-through.",
  },
};

const rawInternalBureaucracy = {
  id: "crm-discovery-internal_bureaucracy-01",
  role: "crm",
  phase: "discovery",
  frictionDimension: "internal_bureaucracy",
  title: "The Escalation Maze",
  setup:
    "A \u20b93Cr manufacturing client has escalated a critical production integration failure — data from their ERP isn't syncing with your platform, halting their daily operations. Resolving the issue requires coordination across 4 internal teams: PM, Support, Sales, and Finance. There is no single escalation owner. You've sent separate emails to each team. It has been 18 hours with no resolution owner identified. The client is now threatening to engage their legal team.",
  choices: [
    {
      id: "crm-disc-ib01-a",
      text: "Continue the email chain with all 4 teams and wait for someone to take ownership before next steps",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [
        {
          affectedRole: "sales",
          affectedPhase: "discovery",
          description:
            "Sales loses visibility on account health during an active escalation — the account manager enters the next renewal conversation without context on whether the integration crisis was resolved or merely contained",
          severity: "medium",
        },
      ],
    },
    {
      id: "crm-disc-ib01-b",
      text: "Convene a 30-minute war room call with all 4 teams, establish a single escalation owner before the call ends, and send a client-facing update with the owner's name and resolution timeline",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Escalations managed by email chain across 4 teams with no owner have a predictable outcome: everyone waits for someone else to lead. The client's 18-hour wait is not a technical delay — it is a coordination failure.",
    why: "In Indian enterprise SaaS, client escalations require a named owner within 4 hours of triage. Without a single owner, each team continues their own thread and no one has authority to make the cross-functional decision needed to resolve the issue.",
    how: "An escalation war room call — 30 minutes, all 4 teams, single owner assigned before the call ends — turns a coordination failure into a managed resolution. The client update with the owner's name and timeline transforms a legal threat into a contained incident.",
    whoBecame:
      "A CRM manager who manages escalations by email chain becomes the person whose client escalation ends in a legal notice because no one claimed ownership for 48 hours.",
    tomorrowAction:
      "Create an 'Escalation War Room Protocol' document: trigger criteria (SLA breach + client threat), mandatory attendees per escalation tier, 30-minute time limit, and a mandatory rule — single owner assigned before the call ends. Share it with all 4 internal teams before your next QBR.",
  },
};

const rawKnowledgeGap = {
  id: "crm-discovery-knowledge_gap-01",
  role: "crm",
  phase: "discovery",
  frictionDimension: "knowledge_gap",
  title: "The Undocumented History",
  setup:
    "You've inherited a \u20b94Cr logistics technology account from a CRM manager who left the company 3 months ago. The account renewal is in 2 weeks. The CRM notes in Salesforce cover billing and contract data but have no relationship history — no context on commitments made, stakeholder dynamics, satisfaction trajectory, or the two support escalations that happened 8 months ago. The client has a reputation for being demanding.",
  choices: [
    {
      id: "crm-disc-kg01-a",
      text: "Prepare for the renewal meeting using billing data, contract terms, and usage analytics alone",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [
        {
          affectedRole: "sales",
          affectedPhase: "requirements",
          description:
            "Sales enters the renewal conversation without account health baseline — upsell or expansion discussions start without understanding whether the client's current satisfaction level supports expansion or requires remediation",
          severity: "medium",
        },
      ],
    },
    {
      id: "crm-disc-kg01-b",
      text: "Schedule calls with the previous CRM manager, support lead, and delivery PM to reconstruct relationship context before the renewal meeting",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Billing and contract data tells you the commercial history of an account. It does not tell you the relationship history — the commitments made, the tensions that exist, the stakeholders who were promised features that haven't shipped.",
    why: "In relationship-driven enterprise accounts, context gaps are trust gaps. A new CRM manager who walks into a renewal without relationship context will make statements the client will contradict — and the client will assume the CRM team doesn't take them seriously.",
    how: "A structured account handover — calls with previous CRM, support lead, and delivery PM — reconstructs the relationship context that Salesforce doesn't capture: verbal commitments, satisfaction trajectory, and interpersonal dynamics.",
    whoBecame:
      "A CRM manager who prepares for renewals using only system data becomes the person who references a committed feature timeline that was abandoned three months ago — in front of the client.",
    tomorrowAction:
      "Create an 'Account Handover Checklist' covering: relationship history summary (12 months), key stakeholder map, unresolved issues and commitments, satisfaction trajectory, and any verbal promises made outside the contract. Require this document for every account handover, filed in CRM within 5 days of transition.",
  },
};

const rawConflictAvoidance = {
  id: "crm-discovery-conflict_avoidance-01",
  role: "crm",
  phase: "discovery",
  frictionDimension: "conflict_avoidance",
  title: "The Optimistic Report",
  setup:
    "A \u20b92.5Cr healthcare technology client has been increasingly dissatisfied with delivery outcomes over the last 2 quarters — missed milestones, feature gaps in the last release, and support response times above SLA. In your monthly account review reports to leadership, you've been characterising the account as 'on track with minor delays.' A steering committee meeting with the client and your leadership is scheduled for next week.",
  choices: [
    {
      id: "crm-disc-ca01-a",
      text: "Continue the optimistic narrative and manage the steering committee meeting by focusing on upcoming features",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "pm",
          affectedPhase: "design",
          description:
            "PM is blindsided when the client raises delivery failures in the steering committee — no corrective action plan was prepared because leadership believed the account was on track",
          severity: "high",
        },
      ],
    },
    {
      id: "crm-disc-ca01-b",
      text: "Escalate the delivery gap to leadership before the steering committee with a corrective action plan and an honest account health assessment",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "An optimistic narrative in account reports delays the corrective action, not the problem. The client knows the account is not on track. When leadership hears the reality for the first time in a steering committee, the CRM's credibility with both the client and leadership is damaged simultaneously.",
    why: "Account health reports are decision-support tools for leadership, not relationship management documents. When they're written to protect the relationship rather than inform decisions, leadership cannot take the corrective actions needed to fix the account.",
    how: "A 'Client Health Reality Check' — comparing internal narrative against the last 3 support tickets and NPS response — creates the cognitive friction the CRM needs to report accurately. An honest account health report before the steering committee gives leadership the context to support the corrective action.",
    whoBecame:
      "A CRM manager who files optimistic reports to avoid internal scrutiny becomes the person who loses both the account and the trust of leadership in the same steering committee meeting.",
    tomorrowAction:
      "Add a 'Client Health Reality Check' to your monthly account review: compare your internal narrative against the client's last 3 support tickets, last NPS score, and last milestone delivery status. If the narrative doesn't match the data, update the narrative before submitting the report.",
  },
};

export const crmDiscoveryScenarios = [
  validateScenario(rawClientFriction, "data/scenarios/crm/discovery.ts"),
  validateScenario(rawInternalBureaucracy, "data/scenarios/crm/discovery.ts"),
  validateScenario(rawKnowledgeGap, "data/scenarios/crm/discovery.ts"),
  validateScenario(rawConflictAvoidance, "data/scenarios/crm/discovery.ts"),
];
