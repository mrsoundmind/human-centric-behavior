import { validateScenario } from "../schema";

/**
 * Sales / Discovery phase — 4 scenarios covering all 4 friction dimensions.
 *
 * Friction dimensions covered:
 *   1. client_friction       — "The Verbal Scope"
 *   2. internal_bureaucracy  — "The Approval Bottleneck"
 *   3. knowledge_gap         — "The Integration Blind Spot"
 *   4. conflict_avoidance    — "The Price Absorber"
 *
 * If Zod validation fails, this module throws at import time with a descriptive error.
 */

const rawClientFriction = {
  id: "sales-discovery-client_friction-01",
  role: "sales",
  phase: "discovery",
  frictionDimension: "client_friction",
  title: "The Verbal Scope",
  setup:
    "A \u20b92Cr IBC deal is in the final stages. During the demo walkthrough, the prospect said \u2018we want everything from the demo\u2019 but no written scope confirmation exists. Quarter-end is in 5 days and your manager is watching the pipeline closely.",
  choices: [
    {
      id: "sales-disc-cf01-a",
      text: "Send the proposal based on demo walkthrough notes alone — close before quarter-end",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "ba",
          affectedPhase: "requirements",
          description:
            "BA inherits verbal scope as the only requirements source \u2014 must reconstruct what was actually promised during requirements gathering",
          severity: "high",
        },
      ],
    },
    {
      id: "sales-disc-cf01-b",
      text: "Request a written scope confirmation from the client before sending the proposal",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Sending a proposal on verbal scope alone creates a legally ambiguous contract where both parties have different mental models of what was sold.",
    why: "Enterprise clients use \u2018everything in the demo\u2019 as enthusiasm, not a scope definition. Without written confirmation, every feature in the demo becomes a potential client expectation.",
    how: "A scope confirmation appendix in the proposal template forces the client to acknowledge exactly what was agreed before signing \u2014 this protects both parties.",
    whoBecame:
      "A sales rep who closes on verbal scope becomes the person on a call 8 weeks later explaining why half the demo features are \u2018out of scope.\u2019",
    tomorrowAction:
      "Before your next proposal, add a \u2018Scope Confirmation Appendix\u2019 to your proposal template listing every feature mentioned verbally with a checkbox for client\u2019s written acknowledgment before the proposal is sent.",
  },
};

const rawInternalBureaucracy = {
  id: "sales-discovery-internal_bureaucracy-01",
  role: "sales",
  phase: "discovery",
  frictionDimension: "internal_bureaucracy",
  title: "The Approval Bottleneck",
  setup:
    "A \u20b95Cr enterprise contract needs full legal review before it can be sent. Your competitor has a 1-week contract SLA. Your legal team has a standard 3-week review cycle with no expedite option listed. The client has two vendors in evaluation and is deciding this week.",
  choices: [
    {
      id: "sales-disc-ib01-a",
      text: "Wait for the full 3-week legal review cycle before sending the contract",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [
        {
          affectedRole: "pm",
          affectedPhase: "discovery",
          description:
            "PM\u2019s project timeline starts 3 weeks late \u2014 discovery phase is compressed to compensate for the legal delay",
          severity: "medium",
        },
      ],
    },
    {
      id: "sales-disc-ib01-b",
      text: "Request expedited legal review by submitting a risk summary memo citing competitive timeline and deal revenue",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Treating the standard review cycle as immovable hands the deal to the competitor while legal reviews a contract for a client who has already chosen someone else.",
    why: "Legal teams have undocumented expedite pathways for high-value, time-sensitive deals. The pathway exists \u2014 it simply requires a business case to activate it.",
    how: "A risk summary memo quantifies the cost of the delay (deal revenue at risk per day) and provides legal the business context they need to prioritize the review.",
    whoBecame:
      "A sales rep who defaults to standard process timelines on competitive deals becomes the one explaining a lost \u20b95Cr contract in the quarterly review.",
    tomorrowAction:
      "Create a \u2018Fast-Track Legal Request\u2019 template with pre-filled risk categories for deals above \u20b93Cr with competitive timelines \u2014 include deal value, competitor SLA, and revenue-at-risk per day of delay.",
  },
};

const rawKnowledgeGap = {
  id: "sales-discovery-knowledge_gap-01",
  role: "sales",
  phase: "discovery",
  frictionDimension: "knowledge_gap",
  title: "The Integration Blind Spot",
  setup:
    "You\u2019re mid-demo with an enterprise client\u2019s CTO. She asks: \u2018Does your platform integrate natively with SAP S/4HANA?\u2019 You don\u2019t know the exact integration architecture. The demo is going well and the CTO looks impressed.",
  choices: [
    {
      id: "sales-disc-kg01-a",
      text: "Say \u2018yes, we support that\u2019 to maintain momentum \u2014 you\u2019ll verify the details after the demo",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Developer discovers the promised SAP S/4HANA integration requires 6 weeks of custom connector work not included in the project estimate",
          severity: "high",
        },
      ],
    },
    {
      id: "sales-disc-kg01-b",
      text: "Say \u2018let me get our technical architect to confirm the exact integration scope\u2019 and continue the demo",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Confirming an integration you\u2019re unsure about creates a promise in the client\u2019s mental model that your delivery team will need to honor \u2014 or renegotiate under worse conditions.",
    why: "Enterprise CTOs ask integration questions to evaluate technical credibility. An honest \u2018I\u2019ll confirm with our architect\u2019 builds more trust than an unverified yes that unravels during scoping.",
    how: "A Technical Capability Matrix carried to every demo gives the sales rep verified answers for the 20 most common integration questions \u2014 no live improvisation required.",
    whoBecame:
      "A sales rep who promises integrations they can\u2019t verify becomes the person on a three-way escalation call between the client CTO, delivery PM, and their own manager.",
    tomorrowAction:
      "Build a \u2018Technical Capability Matrix\u2019 one-pager with your pre-sales architect listing: confirmed integrations, conditional integrations (with effort estimate), and unsupported platforms. Carry it to every demo.",
  },
};

const rawConflictAvoidance = {
  id: "sales-discovery-conflict_avoidance-01",
  role: "sales",
  phase: "discovery",
  frictionDimension: "conflict_avoidance",
  title: "The Price Absorber",
  setup:
    "A \u20b94Cr deal is in the final call. The procurement head drops the price by 30% and says \u2018we need this to work within budget or we\u2019ll go with the other vendor.\u2019 You are already over your quarterly target and closing this deal would guarantee your bonus.",
  choices: [
    {
      id: "sales-disc-ca01-a",
      text: "Accept the 30% discount to close the deal \u2014 delivery will find a way to make the numbers work",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "pm",
          affectedPhase: "requirements",
          description:
            "PM must deliver full \u20b94Cr scope on a \u20b92.8Cr budget \u2014 every requirements trade-off is constrained by the margin gap sales absorbed",
          severity: "high",
        },
      ],
    },
    {
      id: "sales-disc-ca01-b",
      text: "Counter with a value breakdown and propose a scope adjustment tied to the reduced budget",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Absorbing a 30% discount without adjusting scope creates an invisible budget constraint that delivery inherits without knowing the deal was renegotiated.",
    why: "Procurement heads test discounts routinely. A response that links budget reduction to scope reduction reframes the conversation as a business trade-off, not a negotiation of vendor desperation.",
    how: "A Value Defense Script with pre-written responses for discount requests above 15% gives sales reps specific language that protects margin without destroying the relationship.",
    whoBecame:
      "A sales rep who absorbs discounts to close becomes the delivery team\u2019s silent enemy \u2014 every scope cut in requirements was caused by a decision made in the final sales call.",
    tomorrowAction:
      "Create a \u2018Value Defense Script\u2019 document with 3 pre-written responses for discount requests above 15%, each tied to a specific scope trade-off with exact feature and effort impact.",
  },
};

export const salesDiscoveryScenarios = [
  validateScenario(rawClientFriction, "data/scenarios/sales/discovery.ts"),
  validateScenario(rawInternalBureaucracy, "data/scenarios/sales/discovery.ts"),
  validateScenario(rawKnowledgeGap, "data/scenarios/sales/discovery.ts"),
  validateScenario(rawConflictAvoidance, "data/scenarios/sales/discovery.ts"),
];
