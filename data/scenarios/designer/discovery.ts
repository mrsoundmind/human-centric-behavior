import { validateScenario } from "../schema";

/**
 * Designer / Discovery phase — 4 scenarios covering all 4 friction dimensions.
 *
 * Friction dimensions covered:
 *   1. client_friction       — "The Premature Concept"
 *   2. internal_bureaucracy  — "The Tool Procurement Delay"
 *   3. knowledge_gap         — "The Missing Context"
 *   4. conflict_avoidance    — "The Pattern Compliance"
 *
 * If Zod validation fails, this module throws at import time with a descriptive error.
 */

const rawClientFriction = {
  id: "designer-discovery-client_friction-01",
  role: "designer",
  phase: "discovery",
  frictionDimension: "client_friction",
  title: "The Premature Concept",
  setup:
    "You\u2019re 4 days into discovery on a \u20b92.5Cr TCS project. A key stakeholder sends a message: \u2018Can you just show us something to get excited? Even rough mockups would help align our team.\u2019 Discovery interviews are still ongoing and user research synthesis hasn\u2019t started.",
  choices: [
    {
      id: "designer-disc-cf01-a",
      text: "Create quick mockups from the incomplete discovery notes to satisfy the stakeholder\u2019s request",
      frictionTag: "client_friction",
      crossRoleImpact: [
        {
          affectedRole: "ba",
          affectedPhase: "requirements",
          description:
            "BA\u2019s requirement gathering is undermined \u2014 the client references premature mockups as \u2018agreed design\u2019 during requirements workshops, making scope changes harder to introduce",
          severity: "medium",
        },
      ],
    },
    {
      id: "designer-disc-cf01-b",
      text: "Share a discovery timeline slide showing when informed concepts will be ready \u2014 no concepts before research synthesis",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Creating mockups before discovery synthesis produces visuals that look like decisions. Stakeholders treat them as decisions \u2014 and reference them as such in every subsequent meeting.",
    why: "Premature concepts satisfy the short-term excitement need while creating a long-term constraint: the design team must now defend or deviate from visuals that were never meant to be commitments.",
    how: "A Design Readiness Gate slide communicates the discovery-to-concepts sequence visually \u2014 it redirects the stakeholder\u2019s excitement toward the timeline milestone rather than immediate output.",
    whoBecame:
      "A designer who creates early mockups to satisfy stakeholder requests becomes the person explaining why the final design \u2018looks different\u2019 from the sketches everyone latched onto.",
    tomorrowAction:
      "Add a \u2018Design Readiness Gate\u2019 slide to your discovery deck showing the sequence: discovery complete \u2192 user research synthesized \u2192 concepts begin. Share it at every project kickoff so no stakeholder expects concepts before the gate.",
  },
};

const rawInternalBureaucracy = {
  id: "designer-discovery-internal_bureaucracy-01",
  role: "designer",
  phase: "discovery",
  frictionDimension: "internal_bureaucracy",
  title: "The Tool Procurement Delay",
  setup:
    "You\u2019ve been assigned to a \u20b93Cr IBC project. Sprint planning is in 5 days. You need a Figma org seat to access the client\u2019s design system and begin discovery deliverables. Your IT procurement request was submitted 2 days ago and has a standard 2-week processing window.",
  choices: [
    {
      id: "designer-disc-ib01-a",
      text: "Wait for the official Figma seat to arrive before starting any discovery design work",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [
        {
          affectedRole: "pm",
          affectedPhase: "discovery",
          description:
            "PM\u2019s discovery timeline absorbs a 2-week tool procurement delay \u2014 all downstream phases are compressed to compensate for the tooling gap",
          severity: "medium",
        },
      ],
    },
    {
      id: "designer-disc-ib01-b",
      text: "Request emergency tool access using a pre-approved template while the standard procurement processes in parallel",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Waiting for standard procurement on a tool that has an emergency pathway converts a 2-day problem into a 2-week project delay.",
    why: "IT procurement teams have expedite pathways for project-critical tools. These pathways exist specifically for situations like this but require the designer to know and use them.",
    how: "A Design Tool Emergency Access Request template pre-approved for projects above \u20b92Cr can be submitted on day 1 \u2014 the emergency access arrives while the formal procurement continues.",
    whoBecame:
      "A designer who waits for standard procurement timelines on project-start tooling becomes the reason sprint 1 begins a week late.",
    tomorrowAction:
      "Maintain a \u2018Design Tool Emergency Access Request\u2019 template pre-approved by IT for projects above \u20b92Cr. Submit it on day 1 of every project, not after the delay has started.",
  },
};

const rawKnowledgeGap = {
  id: "designer-discovery-knowledge_gap-01",
  role: "designer",
  phase: "discovery",
  frictionDimension: "knowledge_gap",
  title: "The Missing Context",
  setup:
    "You\u2019ve joined a \u20b94Cr IBC migration project mid-way. The previous designer left 3 weeks ago. You have access to the requirements doc, the Figma file, and a Confluence page with 47 pages of documentation. You have no idea what user research was done, why certain design decisions were made, or who the key stakeholders are. Sprint 3 starts Monday.",
  choices: [
    {
      id: "designer-disc-kg01-a",
      text: "Start designing based on the requirements doc and existing Figma file \u2014 the context is all there if you read carefully enough",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Developer builds against designs that contradict earlier user research findings \u2014 usability rework surfaces during QA after development is complete",
          severity: "medium",
        },
      ],
    },
    {
      id: "designer-disc-kg01-b",
      text: "Request a 1-hour context transfer session with the original researcher and project lead before any design work begins",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Designing from documents alone misses the invisible context: why certain requirements were discarded, what the users actually struggled with, and which decisions were contested and why.",
    why: "Requirements docs and Figma files capture decisions \u2014 not the reasoning behind them. The reasoning is the knowledge that prevents a new designer from relitigating resolved debates.",
    how: "A Design Context Onboarding Checklist structures the 1-hour transfer session to extract the specific knowledge that documentation doesn\u2019t capture.",
    whoBecame:
      "A designer who starts without context transfer becomes the person who redesigns a component the team already rejected in sprint 1, triggering an uncomfortable conversation in sprint 4.",
    tomorrowAction:
      "Create a \u2018Design Context Onboarding Checklist\u2019 for mid-project joins covering: user research summary, decision log with rationale, stakeholder map, design system status, and known constraints. Use it for every mid-project design handover.",
  },
};

const rawConflictAvoidance = {
  id: "designer-discovery-conflict_avoidance-01",
  role: "designer",
  phase: "discovery",
  frictionDimension: "conflict_avoidance",
  title: "The Pattern Compliance",
  setup:
    "During a discovery workshop, the client\u2019s product director insists on a mega-dropdown navigation pattern for their enterprise portal. You know from previous projects that mega-dropdowns create significant usability friction for task-completion workflows. The director is confident and the room is deferring to them.",
  choices: [
    {
      id: "designer-disc-ca01-a",
      text: "Agree to implement the mega-dropdown pattern to respect the stakeholder\u2019s preference and avoid friction in the workshop",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "qa",
          affectedPhase: "testing",
          description:
            "QA must test a known-problematic navigation pattern \u2014 usability bugs are predictable and must be documented despite being inherent to the agreed design direction",
          severity: "medium",
        },
      ],
    },
    {
      id: "designer-disc-ca01-b",
      text: "Present evidence from comparable projects showing the measured friction cost of mega-dropdown navigation before agreeing",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Agreeing to a pattern you know creates friction to avoid workshop discomfort transfers the friction from the meeting room to the users \u2014 who will experience it at scale after launch.",
    why: "Stakeholder confidence in a UI pattern and that pattern\u2019s usability are independent variables. The designer\u2019s professional responsibility is to surface evidence, not defer to enthusiasm.",
    how: "A Pattern Evidence Library with case studies per anti-pattern gives the designer specific, referenced evidence to present in-the-moment without relying on memory or authority.",
    whoBecame:
      "A designer who defers to stakeholder UI preferences during discovery becomes the person justifying known usability failures at the QA review 3 months later.",
    tomorrowAction:
      "Build a \u2018Pattern Evidence Library\u2019 in your design system wiki with 3\u20135 case studies per anti-pattern showing measured user friction \u2014 task completion rates, bounce rates, support ticket volume. Reference it in every workshop where a known anti-pattern is proposed.",
  },
};

export const designerDiscoveryScenarios = [
  validateScenario(rawClientFriction, "data/scenarios/designer/discovery.ts"),
  validateScenario(rawInternalBureaucracy, "data/scenarios/designer/discovery.ts"),
  validateScenario(rawKnowledgeGap, "data/scenarios/designer/discovery.ts"),
  validateScenario(rawConflictAvoidance, "data/scenarios/designer/discovery.ts"),
];
