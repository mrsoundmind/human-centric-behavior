import { validateScenario } from "../schema";

/**
 * Sales / Design phase — 4 scenarios covering all 4 friction dimensions.
 *
 * Friction dimensions covered:
 *   1. client_friction       — "The Brand Promise"
 *   2. internal_bureaucracy  — "The Sign-Off Maze"
 *   3. knowledge_gap         — "The Phantom Feature"
 *   4. conflict_avoidance    — "The Vague Pushback"
 *
 * If Zod validation fails, this module throws at import time with a descriptive error.
 */

const rawClientFriction = {
  id: "sales-des-client_friction-01",
  role: "sales",
  phase: "design",
  frictionDimension: "client_friction",
  title: "The Brand Promise",
  setup:
    "A \u20b93Cr IBC client has seen the design mockups and wants a fully custom UI theme matching their brand identity \u2014 custom colors, typography, and component styles that deviate from the design system. You already told the client this was \u2018no problem\u2019 during the pre-sales meeting. Design phase starts next week.",
  choices: [
    {
      id: "sales-des-cf01-a",
      text: "Confirm to the client that a custom theme is included in standard scope \u2014 you\u2019ll sort out the effort with the designer later",
      frictionTag: "client_friction",
      crossRoleImpact: [
        {
          affectedRole: "designer",
          affectedPhase: "design",
          description:
            "Designer inherits a client expectation of fully custom UI theming not scoped or estimated \u2014 design timeline is compressed when the additional effort surfaces",
          severity: "high",
        },
      ],
    },
    {
      id: "sales-des-cf01-b",
      text: "Loop in the designer to assess effort before confirming scope \u2014 set accurate expectations with the client before design begins",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Confirming custom theming as standard scope without a designer estimate creates a delivery commitment that the designer will discover only when they\u2019re already behind schedule.",
    why: "Custom UI theming can add 20\u201340% to design effort depending on design system complexity. Sales confirming scope without designer input systematically underfunds design phases.",
    how: "A Design Customization Scope clause in the proposal template with clearly defined tiers removes ambiguity before a single mockup is created.",
    whoBecame:
      "A sales rep who confirms design scope without designer input becomes the reason the design phase runs 3 weeks over and the client is surprised by the timeline impact.",
    tomorrowAction:
      "Add a \u2018Design Customization Scope\u2019 clause to your proposal template with 3 tiers: standard theme (included), branded theme (+20% design effort), fully custom (+40% design effort). Scope is confirmed at proposal, not at design kickoff.",
  },
};

const rawInternalBureaucracy = {
  id: "sales-des-internal_bureaucracy-01",
  role: "sales",
  phase: "design",
  frictionDimension: "internal_bureaucracy",
  title: "The Sign-Off Maze",
  setup:
    "Design review for a \u20b92.5Cr project requires sign-offs from 3 stakeholders across different time zones: a client VP in Bangalore, a procurement lead in Mumbai, and a technical approver in London. The design team needs feedback within 5 business days or the sprint delays. It has been 8 days with no consolidated response.",
  choices: [
    {
      id: "sales-des-ib01-a",
      text: "Continue waiting for all 3 sign-offs sequentially \u2014 pushing too hard might irritate the client",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [
        {
          affectedRole: "designer",
          affectedPhase: "design",
          description:
            "Designer\u2019s sprint is blocked for 8+ days waiting for sequential sign-offs \u2014 design delivery compresses all downstream phases",
          severity: "medium",
        },
      ],
    },
    {
      id: "sales-des-ib01-b",
      text: "Set up a single async review window with a 48-hour response deadline for all 3 stakeholders simultaneously",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Sequential sign-offs across time zones multiply the review cycle by the number of approvers. Eight days in, the delivery team has consumed a full sprint waiting for feedback that could have arrived in 48 hours.",
    why: "Multi-stakeholder reviews default to sequential without explicit structure. Parallel review with a deadline converts a 3-week process into a 48-hour one.",
    how: "A Parallel Review Protocol document proposed to the delivery lead defines who reviews simultaneously with a 48-hour response SLA \u2014 this becomes the default for all design reviews.",
    whoBecame:
      "A sales rep who waits passively for multi-stakeholder sign-offs becomes the person explaining design phase delays to a client who assumed the team was building, not waiting.",
    tomorrowAction:
      "Propose a \u2018Parallel Review Protocol\u2019 document to your delivery lead: all stakeholders review simultaneously, 48-hour response SLA, with a single consolidated feedback document due at deadline.",
  },
};

const rawKnowledgeGap = {
  id: "sales-des-knowledge_gap-01",
  role: "sales",
  phase: "design",
  frictionDimension: "knowledge_gap",
  title: "The Phantom Feature",
  setup:
    "Your pre-sales demo used a prototype that included an AI-powered recommendation engine. The feature is on the product roadmap but not available in the current release. The client\u2019s design review includes a slide comparing the demo prototype to the current design mockups and asking \u2018where is the recommendation feature?\u2019",
  choices: [
    {
      id: "sales-des-kg01-a",
      text: "Avoid directly correcting the client\u2019s expectations \u2014 the feature might be ready by launch if you push the product team",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [
        {
          affectedRole: "pm",
          affectedPhase: "requirements",
          description:
            "PM discovers the feature the client expects is not in the current release only during requirements review \u2014 must renegotiate scope under time pressure",
          severity: "high",
        },
      ],
    },
    {
      id: "sales-des-kg01-b",
      text: "Send a feature availability matrix post-demo clarifying which features are available now, on the roadmap with timeline, and not planned",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Not correcting a prototype-to-product expectation gap converts a demo impression into a delivery commitment. The client\u2019s design review slide is documentary evidence of the misalignment.",
    why: "Prototype features shown during demos create vivid mental models that persist through the entire project. Correcting them at design review is significantly more damaging than correcting them post-demo.",
    how: "A Feature Availability Confirmation email sent after every demo categorizes features clearly \u2014 it sets expectations before they calcify into client assumptions.",
    whoBecame:
      "A sales rep who avoids correcting demo expectation gaps becomes the person managing a client confrontation at design review when the missing feature surfaces.",
    tomorrowAction:
      "After every demo, send a \u2018Feature Availability Confirmation\u2019 email within 24 hours listing: available in current release, on roadmap (with confirmed timeline), and not planned. Client acknowledgment required before requirements begin.",
  },
};

const rawConflictAvoidance = {
  id: "sales-des-conflict_avoidance-01",
  role: "sales",
  phase: "design",
  frictionDimension: "conflict_avoidance",
  title: "The Vague Pushback",
  setup:
    "The client has reviewed the first wireframes and the project lead says \u2018these don\u2019t look right.\u2019 No specific feedback. The designer is waiting for direction. You\u2019re on the review call with the client. The silence after their comment is uncomfortable.",
  choices: [
    {
      id: "sales-des-ca01-a",
      text: "Tell the client \u2018we\u2019ll fix it\u2019 and take the call offline \u2014 you\u2019ll ask the designer to revise the direction",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "designer",
          affectedPhase: "design",
          description:
            "Designer receives \u2018the client doesn\u2019t like it\u2019 with no actionable direction \u2014 revises based on assumptions that may miss the actual concern entirely",
          severity: "medium",
        },
      ],
    },
    {
      id: "sales-des-ca01-b",
      text: "Facilitate a structured feedback session on the call to identify what specifically doesn\u2019t look right before ending the meeting",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Accepting vague design feedback to end an uncomfortable silence gives the designer a brief to revise in an unknown direction \u2014 the revision cycle multiplies until the actual concern is named.",
    why: "Clients express design discomfort before they can articulate it. The sales rep\u2019s role in the design review is to convert that discomfort into actionable direction \u2014 not to absorb it and relay it unclearly.",
    how: "A Design Feedback Facilitation Guide with 5 structured probing questions converts vague reactions into specific design direction on the call, not after it.",
    whoBecame:
      "A sales rep who accepts \u2018doesn\u2019t look right\u2019 without diagnosis becomes the relay for 3 rounds of redesign that all miss the original concern.",
    tomorrowAction:
      "Create a \u2018Design Feedback Facilitation Guide\u2019 with 5 probing questions for vague client reactions: What specific element feels off? Which reference design is closest to what you expected? What is the primary user action on this screen? What emotion should this screen create? What would make this feel right? Use these on every design review call.",
  },
};

export const salesDesignScenarios = [
  validateScenario(rawClientFriction, "data/scenarios/sales/design.ts"),
  validateScenario(rawInternalBureaucracy, "data/scenarios/sales/design.ts"),
  validateScenario(rawKnowledgeGap, "data/scenarios/sales/design.ts"),
  validateScenario(rawConflictAvoidance, "data/scenarios/sales/design.ts"),
];
