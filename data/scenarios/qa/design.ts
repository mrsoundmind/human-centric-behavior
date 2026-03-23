import { validateScenario } from "../schema";

/**
 * QA / Design phase — 4 scenarios covering all 4 friction dimensions.
 *
 * Indian B2B enterprise context throughout.
 * Each scenario debrief tomorrowAction names a specific workflow artifact.
 */

const rawClientFriction = {
  id: "qa-des-client_friction-01",
  role: "qa",
  phase: "design",
  frictionDimension: "client_friction",
  title: "The Accessibility Afterthought",
  setup:
    "A \u20b93Cr government procurement portal has WCAG 2.1 AA compliance written into the contract. The design team has delivered final Figma mockups for development handoff. You review the files and find zero accessibility annotations: no contrast ratio specifications, no keyboard navigation flows, no screen reader labels, no focus indicator states, no alt text guidance. Development is scheduled to start Monday.",
  choices: [
    {
      id: "qa-des-c01-a",
      text: "Let development proceed and plan to catch accessibility issues during testing — accessibility can be retrofitted after the build",
      frictionTag: "client_friction",
      crossRoleImpact: [
        {
          affectedRole: "designer",
          affectedPhase: "design",
          description:
            "Designer's handoff is treated as complete when accessibility specifications are entirely missing — no feedback loop is established before the accessibility debt enters the codebase",
          severity: "high",
        },
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Developer builds UI without accessibility specifications and must rework entire component set when QA raises WCAG failures — retrofit cost is 3x the cost of building accessibility-first",
          severity: "high",
        },
      ],
    },
    {
      id: "qa-des-c01-b",
      text: "Block the design handoff and return an accessibility checklist to the design team with mandatory fields per component: contrast ratio, keyboard navigation path, screen reader label, and focus indicator state",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Allowing development to proceed without accessibility specifications guarantees WCAG failures that require complete component rework — the contractual compliance gap moves from design (cheap to fix) to production (expensive to fix).",
    why: "In Indian government contracts, WCAG compliance is a contractual obligation that is rarely enforced until acceptance testing. Design teams default to visual aesthetics because accessibility is invisible until it fails. QA is the last gate before code is written — the most efficient place to block incomplete specifications.",
    how: "An accessibility checklist with mandatory per-component fields creates a verifiable standard for design completeness — the design is not 'done' until accessibility specifications exist for every interactive element.",
    whoBecame:
      "A QA engineer who lets accessibility-incomplete designs pass to development becomes the team member who generates 200 WCAG defects in the last sprint — not because they failed to test, but because they failed to gate.",
    tomorrowAction:
      "Create an accessibility checklist template with four mandatory fields per component: contrast ratio (minimum 4.5:1 for normal text), keyboard navigation path, screen reader label, and focus indicator state — no design handoff is approved without a completed checklist for every interactive component.",
  },
};

const rawInternalBureaucracy = {
  id: "qa-des-internal_bureaucracy-01",
  role: "qa",
  phase: "design",
  frictionDimension: "internal_bureaucracy",
  title: "The Design-QA Handover Gap",
  setup:
    "A TCS enterprise dashboard project has established a workflow where designers hand Figma files directly to developers when designs are complete. QA is not included in design reviews. Two sprints later, during integration testing, you discover 34 discrepancies between the implemented UI and the design specifications — colors, spacing, interaction states, and component behavior all differ. Fixing them now requires developer time in a locked sprint.",
  choices: [
    {
      id: "qa-des-c02-a",
      text: "Raise all 34 discrepancies as defects and let the development team triage them in the next sprint — this is the normal defect resolution process",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [
        {
          affectedRole: "designer",
          affectedPhase: "design",
          description:
            "Designer receives a defect list 2 sprints after handoff with no visibility into which discrepancies were implementation errors versus interpretation gaps — no learning loop is created",
          severity: "medium",
        },
      ],
    },
    {
      id: "qa-des-c02-b",
      text: "Escalate the process gap to the delivery manager: propose a QA test case creation SLA that starts from design handover (not dev-complete) — QA reviews designs before development begins to catch specification ambiguities before they become implementation defects",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Discovering design-to-implementation discrepancies two sprints after handoff is a process failure, not a testing failure — the gap existed because QA had no participation in the handoff that created the ambiguity.",
    why: "When QA is excluded from design reviews, specification ambiguities are resolved informally by developers — each developer's interpretation becomes the implementation standard. The result is a codebase that partially matches the design, partially matches the developer's mental model, and partially matches neither.",
    how: "A QA test case creation SLA that starts from design handover (not dev-complete) forces QA to engage with design specifications before development — ambiguities become explicit questions at the cheapest point in the process.",
    whoBecame:
      "A QA engineer who only sees designs after development has completed inherits all the interpretation gaps as defects — accountable for catching failures they were structurally excluded from preventing.",
    tomorrowAction:
      "Establish a QA test case creation SLA document that mandates two review points: a design review within 3 business days of design handoff (to flag specification ambiguities) and a pre-development sign-off (to confirm QA's test cases align with the design before code is written).",
  },
};

const rawKnowledgeGap = {
  id: "qa-des-knowledge_gap-01",
  role: "qa",
  phase: "design",
  frictionDimension: "knowledge_gap",
  title: "The Undocumented Edge State",
  setup:
    "An IBC real-time procurement dashboard has 8 widgets displaying live inventory, vendor bids, approval queues, and budget utilization. The design shows a polished filled state for each widget. You realize that four critical edge states are completely missing from every widget: loading state (while data fetches), error state (when the API fails), empty state (when there is no data), and offline state (when connectivity is lost). Development is 2 weeks away.",
  choices: [
    {
      id: "qa-des-c03-a",
      text: "Assume developers will handle these states with sensible defaults — it is standard practice for experienced developers to implement loading and error states",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Developer implements undocumented edge states based on personal judgment — 8 widgets with 4 states each produce 32 inconsistent implementations that fail QA and require design review",
          severity: "high",
        },
        {
          affectedRole: "designer",
          affectedPhase: "design",
          description:
            "Designer's work is considered complete without specifying 32 of the 40 total states in the design — product ships with undefined visual behavior across 80% of its system states",
          severity: "high",
        },
      ],
    },
    {
      id: "qa-des-c03-b",
      text: "Return an edge state catalog template to the design team documenting all missing states — require loading, error, empty, and offline state designs for each of the 8 widgets before development begins",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Happy-path-only designs guarantee that the most common user experiences — waiting for data, encountering errors, finding empty results — are designed by accident rather than intention.",
    why: "Enterprise dashboard designs in Indian B2B projects routinely show only filled states because the client demos are prepared with production data. Edge states are real product states that users encounter constantly — undesigned edge states become development judgment calls that produce inconsistent, often unusable experiences.",
    how: "An edge state catalog template that mandates all four states per component makes omissions visible before development — the template is incomplete until all states are designed.",
    whoBecame:
      "A QA engineer who accepts happy-path-only designs inherits 32 defect reports for 'inconsistent loading behavior' and 'confusing error messages' — defects that were created the moment the edge states were left undesigned.",
    tomorrowAction:
      "Create an edge state catalog template with four mandatory entries per interactive component: loading state (with duration estimate), error state (with error message content), empty state (with guidance copy), and offline state (with retry mechanism) — no component is approved for development without all four states defined.",
  },
};

const rawConflictAvoidance = {
  id: "qa-des-conflict_avoidance-01",
  role: "qa",
  phase: "design",
  frictionDimension: "conflict_avoidance",
  title: "The Silent Usability Issue",
  setup:
    "During exploratory testing on a B2B checkout flow, you notice that completing a purchase order requires 7 sequential screens with no progress indicator, no ability to save and return, and no summary before final confirmation. Competitor platforms complete the same task in 3 steps. The design was approved by the PM and client two weeks ago. Filing this as a usability defect means challenging a signed-off design.",
  choices: [
    {
      id: "qa-des-c04-a",
      text: "Do not file the issue — the design matches approved specifications, so it is not technically a defect and raising it now creates conflict without a clear resolution path",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "designer",
          affectedPhase: "design",
          description:
            "Designer receives no feedback on a significantly inferior user flow — the opportunity to improve before development is complete is lost and the problem ships to production",
          severity: "high",
        },
        {
          affectedRole: "pm",
          affectedPhase: "design",
          description:
            "PM has no visibility into a usability gap identified during testing — user adoption risk ships to production without a documented trade-off decision",
          severity: "medium",
        },
      ],
    },
    {
      id: "qa-des-c04-b",
      text: "File the issue using a usability defect classification rubric that categorizes it as 'critical UX' (not a cosmetic issue) — document the 7-step vs 3-step comparison with competitor context and escalate to the PM for a decision",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Not filing a known usability problem because it matches the approved design is a scope protection decision disguised as professional restraint — it ships a known user adoption risk to production.",
    why: "In Indian enterprise delivery, 'it matches the design' is the most common reason usability issues are not filed. But QA's role during design phase is not to verify that code matches design — it is to verify that the experience achieves its intended outcome. A 7-step flow that frustrates users fails that criterion regardless of whether the design was approved.",
    how: "A usability defect classification rubric with explicit categories (critical UX, minor UX, cosmetic) creates a language for filing usability issues without implying the entire design is wrong — a critical UX rating requires a PM decision, not automatic rework.",
    whoBecame:
      "A QA engineer who stays silent on known usability gaps because 'the design was approved' becomes the person who validated a product that users abandon — professional compliance at the cost of product outcome.",
    tomorrowAction:
      "Create a usability defect classification rubric with three categories: critical UX (directly prevents task completion or significantly increases steps vs user expectation), minor UX (creates confusion but task is completable), and cosmetic (visual inconsistency with no behavioral impact) — any critical UX finding is filed regardless of design approval status.",
  },
};

export const qaDesignScenarios = [
  validateScenario(rawClientFriction, "data/scenarios/qa/design.ts"),
  validateScenario(rawInternalBureaucracy, "data/scenarios/qa/design.ts"),
  validateScenario(rawKnowledgeGap, "data/scenarios/qa/design.ts"),
  validateScenario(rawConflictAvoidance, "data/scenarios/qa/design.ts"),
];
