import { validateScenario } from "../schema";

/**
 * CRM / Design phase — 4 scenarios covering all 4 friction dimensions.
 *
 * Friction dimensions covered:
 *   1. client_friction       — "The Custom Onboarding Promise"
 *   2. internal_bureaucracy  — "The Renewal Delay"
 *   3. knowledge_gap         — "The Champion Exit"
 *   4. conflict_avoidance    — "The Gift Voucher Fix"
 *
 * If Zod validation fails, this module throws at import time with a descriptive error.
 */

const rawClientFriction = {
  id: "crm-des-client_friction-01",
  role: "crm",
  phase: "design",
  frictionDimension: "client_friction",
  title: "The Custom Onboarding Promise",
  setup:
    "A \u20b92Cr pharmaceutical client signed a contract 3 months ago based partly on a promise of a custom onboarding flow — tailored to their 400-person field sales team. During the contract discussion, you indicated it was 'aligned with our product roadmap.' The design phase has now begun. You've checked with the product team: the custom onboarding feature is not on the approved roadmap and has no engineering allocation for the next 12 months.",
  choices: [
    {
      id: "crm-des-cf01-a",
      text: "Tell the client the feature is 'still in planning' while hoping the product team approves it before onboarding begins",
      frictionTag: "client_friction",
      crossRoleImpact: [
        {
          affectedRole: "pm",
          affectedPhase: "requirements",
          description:
            "PM receives a custom feature request with a client expectation attached — the request arrives as a hard commitment rather than a product proposal, removing the PM's ability to prioritise it objectively against other requirements",
          severity: "high",
        },
      ],
    },
    {
      id: "crm-des-cf01-b",
      text: "Acknowledge the gap to the client, present a phased onboarding plan starting with available functionality, and formally propose the custom feature as a product investment request with the client's case",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "A CRM-led commitment to an unconfirmed feature creates a delivery gap the product team never agreed to close. The client expects the feature; the product team doesn't know it was promised.",
    why: "In software delivery, features can only be promised when engineering capacity is confirmed. When CRM makes product commitments during commercial discussions without confirming roadmap approval, the delivery gap is born in the sales cycle and discovered in onboarding.",
    how: "A 'Product Investment Check' step in account planning — confirming with the PM that a feature has approved engineering capacity before it's mentioned commercially — prevents committed features from entering the delivery pipeline as surprises.",
    whoBecame:
      "A CRM manager who makes unconfirmed product promises to close contracts becomes the person managing an angry onboarding call when the client asks where their custom feature is.",
    tomorrowAction:
      "Add a 'Product Investment Check' step to your account planning before any product feature is mentioned in a commercial context: confirm with PM that the feature has approved engineering capacity and a roadmap slot. Attach the PM's written confirmation to the account record before the feature appears in any client-facing communication.",
  },
};

const rawInternalBureaucracy = {
  id: "crm-des-internal_bureaucracy-01",
  role: "crm",
  phase: "design",
  frictionDimension: "internal_bureaucracy",
  title: "The Renewal Delay",
  setup:
    "A \u20b94Cr enterprise software contract with a logistics client is due for renewal on March 31 — the last day of their fiscal year. The renewal terms are agreed. Legal review of the contract addendum requires 4 weeks under standard process. You submitted the contract for legal review today. The date is March 3. At standard SLA, the contract won't be processed until after the client's fiscal year closes, creating budget lapse risk for both parties.",
  choices: [
    {
      id: "crm-des-ib01-a",
      text: "Accept the legal timeline and inform the client there may be a contract lapse, managing the relationship impact as it develops",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [
        {
          affectedRole: "sales",
          affectedPhase: "requirements",
          description:
            "Sales loses the contract value from the current fiscal quarter — the budget lapse may require the client to reopen procurement approval, introducing additional delay and the risk of competitive re-evaluation",
          severity: "high",
        },
      ],
    },
    {
      id: "crm-des-ib01-b",
      text: "Flag the fiscal year deadline to Legal immediately with a business impact statement and request expedited review, then update the client proactively on the timeline",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "A contract renewal submitted 28 days before the deadline, with a 28-day legal SLA, has no margin for error. Filing on time is not the same as filing with enough lead time.",
    why: "Legal review SLAs in enterprise software companies are process constraints, not fixed limits. When a fiscal year deadline creates a business case for expedited review, that business case must be made explicitly — legal teams cannot prioritise what they don't know is urgent.",
    how: "Flagging the fiscal year deadline with a business impact statement — contract value at risk, client budget lapse consequence, competitive re-evaluation risk — gives the Legal team the context to request an exception or expedited path. Starting renewal legal review 90 days before contract end eliminates the problem structurally.",
    whoBecame:
      "A CRM manager who accepts legal SLA timelines without escalating fiscal year conflicts becomes the person managing a re-procurement process for a contract that was commercially agreed 3 months earlier.",
    tomorrowAction:
      "Add 'Legal Review Lead Time' as a calendar reminder for every account with a renewal in the next quarter — target: submit for legal review 90 days before contract end. For any contract where fiscal year deadline creates a legal review conflict, file an expedited review request with a business impact statement on the day of submission.",
  },
};

const rawKnowledgeGap = {
  id: "crm-des-knowledge_gap-01",
  role: "crm",
  phase: "design",
  frictionDimension: "knowledge_gap",
  title: "The Champion Exit",
  setup:
    "A \u20b93Cr banking technology client's internal champion — the VP Digital Banking who drove the original purchase decision — has resigned. A new stakeholder, the Head of IT, has been assigned as the account contact. The new stakeholder has different expectations, a different communication style, and asks pointed questions about ROI in your first meeting. You have no documented record of the original business case, the success metrics from year 1, or the value delivered to date.",
  choices: [
    {
      id: "crm-des-kg01-a",
      text: "Introduce yourself to the new stakeholder and start building the relationship fresh without preparation",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [
        {
          affectedRole: "sales",
          affectedPhase: "discovery",
          description:
            "Sales enters expansion discussions with a stakeholder who has no established trust in the product's value — without documented success metrics, the upsell conversation starts from zero rather than building on demonstrated ROI",
          severity: "high",
        },
      ],
    },
    {
      id: "crm-des-kg01-b",
      text: "Compile a success metrics summary from the original deal before the first meeting: original business case, year-1 measured outcomes, and stakeholder-specific value propositions",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "A champion exit is a predictable event in every enterprise account lifecycle. A CRM manager who has documented the account's success metrics survives the champion exit. One who hasn't must rebuild the business case from scratch — with a new stakeholder who didn't participate in the original purchase decision.",
    why: "New stakeholders evaluate accounts through the lens of what the product has delivered, not what was promised. Without documented success metrics, the CRM cannot demonstrate value — the new stakeholder starts from a position of scepticism.",
    how: "A 'Champion Continuity Document' — original business case, measured success metrics, stakeholder-specific value propositions — is the CRM's insurance policy against champion exits. It transforms a relationship reset into a continuity conversation.",
    whoBecame:
      "A CRM manager who meets a new stakeholder without a success metrics summary becomes the person re-selling a product that the client has been paying for — without evidence of why it was worth paying for.",
    tomorrowAction:
      "For every account, maintain a 'Champion Continuity Document' with: original business case, success metrics measured at 3, 6, and 12 months, and stakeholder-specific value propositions. Update it quarterly. When a champion exits, this document is ready — file it in CRM, not just your email.",
  },
};

const rawConflictAvoidance = {
  id: "crm-des-conflict_avoidance-01",
  role: "crm",
  phase: "design",
  frictionDimension: "conflict_avoidance",
  title: "The Gift Voucher Fix",
  setup:
    "A \u20b91.5Cr EdTech client's NPS score dropped from 72 to 41 between quarters. The Operations Head sent a detailed email listing 3 specific product issues that are affecting their instructors daily. Your instinct is to send a ₹5,000 Amazon gift voucher to the Operations Head as a goodwill gesture, smooth over the immediate friction, and follow up on the product issues when they come up again in the next QBR.",
  choices: [
    {
      id: "crm-des-ca01-a",
      text: "Send the gift voucher as a goodwill gesture and schedule the product issue discussion for the next QBR",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "pm",
          affectedPhase: "design",
          description:
            "PM receives no structured friction report — the 3 product issues identified by the client are not escalated as product feedback, and no corrective action plan is developed before the client decides not to renew",
          severity: "medium",
        },
      ],
    },
    {
      id: "crm-des-ca01-b",
      text: "Conduct a root cause analysis on the 3 issues before any goodwill gesture, present findings with a corrective action plan to the client, and then offer a goodwill gesture tied to the resolution commitment",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "A goodwill gesture without root cause analysis treats the symptom without investigating the disease. The client receives a gift voucher, feels temporarily appreciated, and then experiences the same product issues next month — with a lower baseline of trust.",
    why: "NPS drops of 31 points in a quarter are not random events — they reflect accumulated friction that has reached a tipping point. A client who takes the time to document 3 specific issues is giving the CRM team a structured opportunity to fix something. A gift voucher signals that the documentation wasn't read.",
    how: "A 'Root Cause Analysis Brief' — trigger event, systemic vs one-time classification, fix owner, prevention plan — produces the diagnostic foundation for a meaningful corrective action plan. Presented to the client before any goodwill gesture, it signals that the CRM team has understood and investigated the feedback.",
    whoBecame:
      "A CRM manager who defaults to goodwill gestures for NPS drops becomes the person reviewing a non-renewal notification from a client who concluded that the team was better at apologies than at fixes.",
    tomorrowAction:
      "When client satisfaction drops, complete a 'Root Cause Analysis Brief' before any goodwill gesture: trigger event, systemic vs one-time classification, fix owner, and prevention plan. Present the brief to the client alongside the goodwill gesture — the analysis signals that the gesture is earned, not automatic.",
  },
};

export const crmDesignScenarios = [
  validateScenario(rawClientFriction, "data/scenarios/crm/design.ts"),
  validateScenario(rawInternalBureaucracy, "data/scenarios/crm/design.ts"),
  validateScenario(rawKnowledgeGap, "data/scenarios/crm/design.ts"),
  validateScenario(rawConflictAvoidance, "data/scenarios/crm/design.ts"),
];
