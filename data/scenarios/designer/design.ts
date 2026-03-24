import { validateScenario } from "../schema";

/**
 * Designer / Design phase — 4 scenarios covering all 4 friction dimensions.
 *
 * Friction dimensions covered:
 *   1. client_friction       — "The Accessibility Conflict"
 *   2. internal_bureaucracy  — "The Committee Review"
 *   3. knowledge_gap         — "The Silent Handoff"
 *   4. conflict_avoidance    — "The Effort Retreat"
 *
 * If Zod validation fails, this module throws at import time with a descriptive error.
 */

const rawClientFriction = {
  id: "designer-des-client_friction-01",
  role: "designer",
  phase: "design",
  frictionDimension: "client_friction",
  title: "The Accessibility Conflict",
  setup:
    "A \u20b93Cr IBC client\u2019s brand guidelines use a light gray text on white background \u2014 a color combination that fails WCAG AA contrast requirements. The client\u2019s marketing team is firm: \u2018This is our brand. We can\u2019t compromise on it.\u2019 You\u2019re in the design phase and need to finalize the visual system.",
  choices: [
    {
      id: "designer-des-cf01-a",
      text: "Prioritize the client\u2019s brand colors over accessibility requirements \u2014 it\u2019s their product",
      frictionTag: "client_friction",
      crossRoleImpact: [
        {
          affectedRole: "qa",
          affectedPhase: "testing",
          description:
            "QA must document accessibility failures against WCAG AA standards that were known at design phase \u2014 the violations were baked in as brand requirements, not caught as errors",
          severity: "high",
        },
      ],
    },
    {
      id: "designer-des-cf01-b",
      text: "Present WCAG-compliant alternatives that maintain brand identity with specific hex comparisons",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Implementing brand colors that fail accessibility requirements produces a design that is legally non-compliant in markets with WCAG mandates and excludes users with visual impairments.",
    why: "Clients equate brand compliance with exact hex values. Designers who present accessible alternatives with visual comparisons \u2014 rather than just flagging the violation \u2014 almost always find a resolution.",
    how: "An Accessibility-Brand Compatibility Matrix in the design system shows the nearest WCAG AA compliant alternative for every brand color \u2014 the conversation becomes a choice, not a conflict.",
    whoBecame:
      "A designer who implements known accessibility failures to avoid a client conversation becomes responsible for the accessibility audit findings 6 months after launch.",
    tomorrowAction:
      "Create an \u2018Accessibility-Brand Compatibility Matrix\u2019 for your design system showing every brand color alongside its nearest WCAG AA compliant alternative with contrast ratio comparison. Present this in every brand onboarding meeting.",
  },
};

const rawInternalBureaucracy = {
  id: "designer-des-internal_bureaucracy-01",
  role: "designer",
  phase: "design",
  frictionDimension: "internal_bureaucracy",
  title: "The Committee Review",
  setup:
    "Every design decision on this \u20b94Cr project requires approval from an 8-person review committee that meets bi-weekly. Of the 8 members, only 3 are actually relevant to the design decisions being reviewed \u2014 a UX lead, the product owner, and the client representative. The other 5 attend by default and frequently reopen resolved decisions.",
  choices: [
    {
      id: "designer-des-ib01-a",
      text: "Present every design decision to the full 8-person committee and accept consensus-driven feedback",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [
        {
          affectedRole: "pm",
          affectedPhase: "requirements",
          description:
            "PM\u2019s sprint velocity is reduced by bi-weekly design approval cycles with 8 reviewers \u2014 decisions get relitigated by non-primary stakeholders, extending review cycles",
          severity: "low",
        },
      ],
    },
    {
      id: "designer-des-ib01-b",
      text: "Propose a RACI-based design review structure where only the 3 relevant stakeholders have approval authority",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Presenting every design decision to a full committee without a RACI structure treats every opinion as equal \u2014 and gives 5 non-relevant reviewers veto power over decisions that affect users, not them.",
    why: "Design review committees grow to include stakeholders who have organizational presence, not design expertise. Without a RACI, the loudest voice in the room overrides user research.",
    how: "A Design Review RACI document defining who Approves, who is Consulted, and who is Informed for each design category converts a committee into a functional review process.",
    whoBecame:
      "A designer who accepts full-committee feedback without challenging the process becomes the one redesigning approved work because a non-relevant reviewer had a strong opinion.",
    tomorrowAction:
      "Draft a \u2018Design Review RACI\u2019 document for your project listing who Approves, Consults, and is Informed for each design category: layout, interaction, content, and visual. Propose it to the PM at design kickoff, not after the first conflicted review.",
  },
};

const rawKnowledgeGap = {
  id: "designer-des-knowledge_gap-01",
  role: "designer",
  phase: "design",
  frictionDimension: "knowledge_gap",
  title: "The Silent Handoff",
  setup:
    "You\u2019ve completed the visual design for a complex data table with filtering, sorting, and inline editing. The Figma file is polished and the developer has been handed access. Two weeks later, QA flags that all interactions are static \u2014 no hover states, no transition animations, no loading states, no inline edit behavior.",
  choices: [
    {
      id: "designer-des-kg01-a",
      text: "Hand off the Figma file with visual designs only \u2014 interaction behavior can be discussed if questions come up during development",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Developer implements the static visual design without micro-interactions because interaction behavior was never documented \u2014 the missing states surface as bugs in QA",
          severity: "high",
        },
      ],
    },
    {
      id: "designer-des-kg01-b",
      text: "Create an interaction spec document alongside the Figma handoff covering all states, transitions, and edge cases",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Handing off a Figma file without an interaction spec hands the developer a complete visual reference and an incomplete behavioral reference \u2014 they will build what they can see, not what they can\u2019t.",
    why: "Developers implement what is documented. Interaction states that exist only in the designer\u2019s mental model will not appear in the build unless they are written down.",
    how: "An Interaction Spec Sheet added to every Figma handoff documents every state that is not visually obvious \u2014 hover, loading, error, empty, edge cases \u2014 and eliminates the ambiguity.",
    whoBecame:
      "A designer who relies on Figma files alone for handoff becomes the person in the QA bug review explaining which of the 23 interaction issues are \u2018by design\u2019 and which are development gaps.",
    tomorrowAction:
      "Add an \u2018Interaction Spec Sheet\u2019 to every Figma handoff file covering: hover states, active states, transitions, loading states, error states, empty states, and edge cases. No handoff is complete without it.",
  },
};

const rawConflictAvoidance = {
  id: "designer-des-conflict_avoidance-01",
  role: "designer",
  phase: "design",
  frictionDimension: "conflict_avoidance",
  title: "The Effort Retreat",
  setup:
    "You designed a page transition animation that significantly improves perceived performance. During sprint planning, the developer says the animation will take 3 weeks to implement. The PM looks concerned. You feel the room pushing toward removing it entirely. The animation is not a nice-to-have \u2014 without it, the page transition creates a jarring blank-screen moment.",
  choices: [
    {
      id: "designer-des-ca01-a",
      text: "Remove the animation entirely to resolve the effort concern and avoid conflict in the sprint planning meeting",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "qa",
          affectedPhase: "testing",
          description:
            "QA tests a page transition with a blank-screen flash that the design originally solved \u2014 the UX regression from removing the animation creates a known usability issue",
          severity: "low",
        },
      ],
    },
    {
      id: "designer-des-ca01-b",
      text: "Propose 2\u20133 lighter animation alternatives and discuss effort-impact trade-offs before removing the interaction",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Removing a design solution entirely because the first implementation approach is expensive eliminates the problem-solving before alternatives are explored.",
    why: "Effort estimates for animations are often based on the most complex implementation path. A simpler CSS transition can achieve 80% of the perceived performance benefit at 10% of the effort.",
    how: "An Effort-Impact Options Brief with 3 implementation tiers \u2014 full, reduced scope, minimal viable version \u2014 reframes the conversation from \u2018remove or keep\u2019 to \u2018which version\u2019.",
    whoBecame:
      "A designer who removes design solutions at the first effort pushback becomes the one explaining why the user experience regressed between the prototype and the final build.",
    tomorrowAction:
      "When a design element is flagged as high-effort, prepare an \u2018Effort-Impact Options Brief\u2019 with 3 tiers: full implementation, reduced scope version, and minimal viable version. Present the brief before agreeing to remove anything.",
  },
};

export const designerDesignScenarios = [
  validateScenario(rawClientFriction, "data/scenarios/designer/design.ts"),
  validateScenario(rawInternalBureaucracy, "data/scenarios/designer/design.ts"),
  validateScenario(rawKnowledgeGap, "data/scenarios/designer/design.ts"),
  validateScenario(rawConflictAvoidance, "data/scenarios/designer/design.ts"),
];
