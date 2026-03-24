import { validateScenario } from "../schema";

/**
 * Designer / Requirements phase — 4 scenarios covering all 4 friction dimensions.
 *
 * Friction dimensions covered:
 *   1. client_friction       — "The Legal Copy"
 *   2. internal_bureaucracy  — "The Review Backlog"
 *   3. knowledge_gap         — "The Contextless Spec"
 *   4. conflict_avoidance    — "The Dual Design"
 *
 * If Zod validation fails, this module throws at import time with a descriptive error.
 */

const rawClientFriction = {
  id: "designer-req-client_friction-01",
  role: "designer",
  phase: "requirements",
  frictionDimension: "client_friction",
  title: "The Legal Copy",
  setup:
    "The requirements doc for a \u20b92Cr IBC banking portal includes user-facing error messages written by the client\u2019s legal team. The messages are accurate but dense \u2014 \u2018Transaction declined pursuant to Section 12(b) of the Payment and Settlement Systems Act.\u2019 You\u2019re about to design the error states for the payment flow.",
  choices: [
    {
      id: "designer-req-cf01-a",
      text: "Implement the legal text verbatim as UX copy \u2014 the requirements doc specifies it exactly",
      frictionTag: "client_friction",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Developer implements error messages that generate user confusion and support tickets \u2014 the UX friction was baked in at requirements and not flagged before development",
          severity: "low",
        },
      ],
    },
    {
      id: "designer-req-cf01-b",
      text: "Propose plain-language error message alternatives alongside the legal text for a joint legal and UX review",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Implementing legal copy verbatim without UX review produces error states that are legally compliant and user-hostile simultaneously.",
    why: "Legal requirements define what information must be communicated \u2014 not how it must be phrased. Plain-language alternatives can satisfy legal intent while reducing user confusion.",
    how: "A UX Copy Translation Template mapping legal requirements to plain-language alternatives for common error states gives the designer a ready-made proposal for every legal copy situation.",
    whoBecame:
      "A designer who treats legal copy as immovable becomes the person who built the error state that generates the highest support ticket volume every month.",
    tomorrowAction:
      "Create a \u2018UX Copy Translation Template\u2019 mapping legal requirements to plain-language alternatives for the 10 most common error states in your domain. Use it as the starting point for every legal copy review.",
  },
};

const rawInternalBureaucracy = {
  id: "designer-req-internal_bureaucracy-01",
  role: "designer",
  phase: "requirements",
  frictionDimension: "internal_bureaucracy",
  title: "The Review Backlog",
  setup:
    "Your \u20b93Cr project requires a new component \u2014 a multi-step form wizard \u2014 that doesn\u2019t exist in the central design system. The platform team\u2019s design system review process has a 6-week backlog. Your sprint starts in 10 days. Without the component, the requirements can\u2019t be designed.",
  choices: [
    {
      id: "designer-req-ib01-a",
      text: "Wait for the platform team\u2019s official approval before starting design \u2014 use the standard review process",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Developer receives design specs 6 weeks late due to design system review backlog \u2014 development sprint is compressed or deferred entirely",
          severity: "medium",
        },
      ],
    },
    {
      id: "designer-req-ib01-b",
      text: "Submit with an expedite flag, build with the current design system as an interim, and plan migration once the review completes",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Waiting for a 6-week review cycle on a project that starts in 10 days produces a 6-week sprint delay for a process designed to prevent inconsistency \u2014 not to block delivery.",
    why: "Design system review backlogs reflect team capacity constraints, not the severity of every request. Expedite flags exist for project-critical components with documented business impact.",
    how: "A Design System Exception Request template documents why the existing system won\u2019t work, the risk of waiting, and the interim solution \u2014 giving the platform team the context to prioritize.",
    whoBecame:
      "A designer who defaults to the standard review cycle on a project-start component becomes the reason sprint 1 begins with incomplete design specs.",
    tomorrowAction:
      "Draft a \u2018Design System Exception Request\u2019 template covering: component needed, why existing won\u2019t work, risk of delay in days, proposed interim solution, and migration plan. Submit with the expedite flag on day 1, not day 6.",
  },
};

const rawKnowledgeGap = {
  id: "designer-req-knowledge_gap-01",
  role: "designer",
  phase: "requirements",
  frictionDimension: "knowledge_gap",
  title: "The Contextless Spec",
  setup:
    "You\u2019ve received the requirements doc for a \u20b92.5Cr IBC supplier portal. It lists 43 functional requirements with no user personas, no usage context for any workflow, and no indication of which requirements are critical versus nice-to-have. Sprint 1 design deliverables are due in 7 days.",
  choices: [
    {
      id: "designer-req-kg01-a",
      text: "Start designing based on assumptions and personal experience with similar portals \u2014 the requirements are clear enough to begin",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [
        {
          affectedRole: "qa",
          affectedPhase: "testing",
          description:
            "QA tests against designs built on designer assumptions rather than validated user context \u2014 usability issues surface in testing that could have been prevented during design",
          severity: "medium",
        },
      ],
    },
    {
      id: "designer-req-kg01-b",
      text: "Request a 45-minute persona briefing with the BA before starting design \u2014 block design start until personas and priority indicators are provided",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Designing without user personas produces interfaces that are functionally correct and contextually wrong \u2014 they work for the designer\u2019s mental model of the user, not the actual user.",
    why: "Forty-three requirements without personas are 43 features without a human being attached. The designer\u2019s first job is to attach a human to every requirement before designing anything.",
    how: "A Design Input Checklist that blocks design start until personas, usage context, and priority indicators are present ensures the design phase begins with the minimum viable context.",
    whoBecame:
      "A designer who starts without personas becomes the person who redesigns the primary workflow in sprint 4 after usability testing reveals the interface was built for the wrong user.",
    tomorrowAction:
      "Add a \u2018Design Input Checklist\u2019 to your sprint intake process: personas attached, usage context documented, priority indicators present. Block design start until all 3 are answered. Make the checklist visible to the BA and PM at kickoff.",
  },
};

const rawConflictAvoidance = {
  id: "designer-req-conflict_avoidance-01",
  role: "designer",
  phase: "requirements",
  frictionDimension: "conflict_avoidance",
  title: "The Dual Design",
  setup:
    "The PM and the developer disagree on the interaction model for a complex data entry form. The PM wants a guided single-step-at-a-time wizard. The developer prefers a single-page layout for development simplicity. Both have valid points. Both are waiting for you to design it.",
  choices: [
    {
      id: "designer-req-ca01-a",
      text: "Design both options to avoid choosing sides and let them decide during the design review",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Developer receives two fully designed options and must wait for a decision before development begins \u2014 the alignment that should have happened before design now happens during development",
          severity: "high",
        },
      ],
    },
    {
      id: "designer-req-ca01-b",
      text: "Facilitate a 30-minute alignment session with the PM and developer to resolve the direction before designing either option",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Designing both options to avoid a conflict resolution conversation doubles design effort and defers the conflict to the design review \u2014 where it is harder to resolve because both options now have visual weight.",
    why: "When two stakeholders disagree on interaction direction, a designer choosing to design both is taking the path of maximum effort and minimum resolution. The conflict doesn\u2019t disappear \u2014 it moves.",
    how: "A Design Direction Alignment Request email with both options side-by-side \u2014 framed as a decision with a deadline \u2014 forces alignment before design work begins.",
    whoBecame:
      "A designer who designs both options to avoid conflict becomes the one explaining why sprint 1 design deliverables took twice as long and are still unresolved.",
    tomorrowAction:
      "When you receive conflicting design direction, send a \u2018Design Direction Alignment Request\u2019 email with both options described (not designed) side-by-side and request a single decision within 24 hours before design begins.",
  },
};

export const designerRequirementsScenarios = [
  validateScenario(rawClientFriction, "data/scenarios/designer/requirements.ts"),
  validateScenario(rawInternalBureaucracy, "data/scenarios/designer/requirements.ts"),
  validateScenario(rawKnowledgeGap, "data/scenarios/designer/requirements.ts"),
  validateScenario(rawConflictAvoidance, "data/scenarios/designer/requirements.ts"),
];
