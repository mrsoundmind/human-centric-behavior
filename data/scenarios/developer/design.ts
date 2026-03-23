import { validateScenario } from "../schema";

/**
 * Developer / Design phase — 4 scenarios covering all friction dimensions.
 *
 * Each scenario presents a developer navigating design-phase friction in
 * Indian B2B enterprise contexts (IBC, SAP, TCS, enterprise procurement).
 *
 * If Zod validation fails, this module throws at import time with a
 * descriptive error message including the file path.
 */

const clientFriction = {
  id: "dev-des-client_friction-01",
  role: "developer",
  phase: "design",
  frictionDimension: "client_friction",
  title: "The Late Integration Request",
  setup:
    "You are 80% through the design phase of a \u20b94Cr e-commerce platform for an enterprise client. The client's finance team has just mandated a specific payment gateway provider — one that was not in the original design. The current architecture assumes a standard Razorpay integration. The mandated provider requires a custom webhook architecture, a server-side SDK, and PCI-DSS scope expansion. The design handover to development is in 4 days.",
  choices: [
    {
      id: "dev-des-cf01-a",
      text: "Absorb the payment gateway change — update the design to accommodate the mandated provider without flagging the scope change, to avoid reopening the design timeline",
      frictionTag: "client_friction",
      crossRoleImpact: [
        {
          affectedRole: "qa",
          affectedPhase: "testing",
          description:
            "QA test plan was written for Razorpay — PCI-DSS scope expansion and custom webhook architecture require a new security testing approach that was not budgeted",
          severity: "high",
        },
        {
          affectedRole: "pm",
          affectedPhase: "design",
          description:
            "PM has no visibility into the scope change absorbed during design — sprint 1 development will surface the actual complexity as an unexpected delay",
          severity: "high",
        },
      ],
    },
    {
      id: "dev-des-cf01-b",
      text: "Flag the integration change as a late-breaking scope addition: document the architectural delta (custom webhooks, server-side SDK, PCI-DSS expansion), estimate the impact on the design handover timeline, and get PM and client sign-off before updating the design",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Absorbing a payment gateway substitution at 80% design completion without flagging it hides a PCI-DSS scope expansion and architecture change that cascades into QA, security review, and development timelines.",
    why: "Enterprise clients' internal procurement rules often introduce technology mandates late in the design phase. A payment gateway substitution is not a cosmetic change — it changes webhook architecture, server-side SDK requirements, and potentially PCI-DSS certification scope. The developer who absorbs this change silently takes on a commitment that was never scoped, estimated, or approved.",
    how: "A design-to-dev handover template with an 'external integrations' section creates a formal moment to surface integration changes before handover. The 2-day delay for a scope confirmation meeting is recoverable. The 3-sprint delay for rearchitecting payments during development is not.",
    whoBecame:
      "A developer who absorbs a late payment gateway change silently becomes the person who presents a 3-sprint development overrun to a PM who had no idea the architecture changed.",
    tomorrowAction:
      "Create a Design-to-Dev Handover Template for your team with a mandatory 'External Integration' section: list each integration, provider name, authentication method, webhook requirements, security scope (PCI-DSS/SOC2/HIPAA), and any late-breaking changes from the original design spec. This section must be reviewed and signed off by PM before handover.",
  },
};

const internalBureaucracy = {
  id: "dev-des-internal_bureaucracy-01",
  role: "developer",
  phase: "design",
  frictionDimension: "internal_bureaucracy",
  title: "The Design Freeze Delay",
  setup:
    "You are waiting for design sign-off to begin development on an enterprise portal redesign for a TCS client. This is the third design freeze extension in 2 months. Each extension adds 'one more thing' from a different stakeholder — the last one added a new dashboard requirement from a VP who joined the project review meeting late. The development team has been in holding for 6 weeks. Sprint velocity has dropped to zero.",
  choices: [
    {
      id: "dev-des-ib01-a",
      text: "Continue waiting — design freeze extensions are a project management problem, not a development problem; start development when the design is officially frozen",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [
        {
          affectedRole: "pm",
          affectedPhase: "design",
          description:
            "PM has no formal mechanism to close the design phase — each stakeholder who joins a review meeting can reopen design scope without consequences",
          severity: "high",
        },
      ],
    },
    {
      id: "dev-des-ib01-b",
      text: "Raise a development capacity risk formally: document the 6-week hold, the velocity impact, and propose a Design Review Timeline document with a hard freeze date, explicit no-change criteria, and a change request process for post-freeze additions",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Three design freeze extensions over 2 months with no formal change mechanism mean the design phase has no exit condition — any stakeholder can reopen it by attending a meeting and raising a concern.",
    why: "Design freeze extensions are a symptom of a missing governance artifact, not a creative process. When stakeholders can add scope to a design review meeting without a formal change request and impact assessment, there is no incentive to stop. The developer who treats this as 'someone else's problem' watches it become their problem when sprint 1 is delayed by 6 weeks of accumulated scope.",
    how: "A Design Review Timeline document with a hard freeze date, explicit no-change criteria, and a formal change request process for post-freeze additions converts an open-ended design phase into a closeable one. The hard freeze date creates a deadline that forces prioritization. The change request process means late additions have a cost that is visible before they are accepted.",
    whoBecame:
      "A developer who passively waits through 3 design freeze extensions becomes the person who starts development 10 weeks late on a project that was contracted for 6-month delivery.",
    tomorrowAction:
      "Create a Design Review Timeline document template for your team: include a design freeze date, explicit no-change criteria (what constitutes a freeze violation), a post-freeze change request form with impact fields (development days, test scope, budget delta), and required approvers. Circulate this document at the first design review — not after the second freeze extension.",
  },
};

const knowledgeGap = {
  id: "dev-des-knowledge_gap-01",
  role: "developer",
  phase: "design",
  frictionDimension: "knowledge_gap",
  title: "The Undocumented Design System",
  setup:
    "You are implementing a TCS enterprise portal redesign. The client's internal design system has 40+ components. There is no Storybook, no documentation site, no README, and no design token file. The designer sends Figma files with component names that don't match the existing CSS classes. You don't know the spacing scale, the color token values, the breakpoints, or how the component variants differ from the base implementations. Development starts Monday.",
  choices: [
    {
      id: "dev-des-kg01-a",
      text: "Infer token values from the Figma file by inspecting pixel values manually — build your own internal mapping of colors, spacing, and components and start development based on your interpretation",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [
        {
          affectedRole: "designer",
          affectedPhase: "design",
          description:
            "Designer's implementation intent is interpreted independently by each developer — visual consistency degrades as multiple developer interpretations of the same token diverge",
          severity: "high",
        },
        {
          affectedRole: "qa",
          affectedPhase: "testing",
          description:
            "QA cannot verify visual correctness against a design system with no documented standards — visual testing becomes subjective and unreliable",
          severity: "medium",
        },
      ],
    },
    {
      id: "dev-des-kg01-b",
      text: "Block development start until a Design Token Documentation template is completed by the designer: request a structured document covering color tokens, spacing scale, typography rules, breakpoints, and component states before writing a single line of UI code",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Building against an undocumented design system from Figma inspection produces independent developer interpretations of every design token — visual inconsistency accumulates silently until the designer reviews the build and finds it doesn't match.",
    why: "Design tokens are the contract between design and development. When they are not documented — colors as hex values, spacing as a named scale, typography as font/weight/line-height triples — each developer builds their own interpretation. In a 40-component system, this produces divergence that is impossible to audit or correct without a ground truth document.",
    how: "A Design Token Documentation template completed before development start converts implicit Figma intent into explicit development contracts. The 1-2 days it takes the designer to fill in the template prevents weeks of visual QA rework and 'that's not what I designed' conversations during review.",
    whoBecame:
      "A developer who builds against an undocumented design system becomes the person who implements 40 components with 40 independent interpretations — then spends 3 sprints realigning with the designer's actual intent.",
    tomorrowAction:
      "Create a Design Token Documentation template for your team's design-to-dev handoff: include color tokens (name, hex, usage context), spacing scale (token name, pixel value), typography tokens (font family, sizes, weights, line heights), breakpoints, and component state documentation (default, hover, active, disabled, error). No UI development starts without this document signed off by the designer.",
  },
};

const conflictAvoidance = {
  id: "dev-des-conflict_avoidance-01",
  role: "developer",
  phase: "design",
  frictionDimension: "conflict_avoidance",
  title: "The Unchallenged Spec",
  setup:
    "The designer has delivered a spec for a data-heavy dashboard with 500 rows of tabular data and smooth 60fps animations for row selection, sorting transitions, and hover states. You have built dashboards at this scale before — 60fps animation on a 500-row virtual list is achievable only with specific rendering optimizations that are not currently in the tech stack. Without them, the animation will drop to 20-30fps on mid-range client hardware. Raising this means telling the designer their spec has a performance problem, which they may take as criticism.",
  choices: [
    {
      id: "dev-des-ca01-a",
      text: "Accept the spec as delivered — attempt to implement the animations and let performance testing surface the issue if it arises",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "qa",
          affectedPhase: "testing",
          description:
            "QA discovers the 20-30fps animation drop during performance testing — by this point the implementation is complete and remediation requires architectural changes to the rendering pipeline",
          severity: "high",
        },
        {
          affectedRole: "designer",
          affectedPhase: "design",
          description:
            "Designer is not given the opportunity to redesign the interaction with performance constraints in mind — the final implementation will not match their intent regardless",
          severity: "medium",
        },
      ],
    },
    {
      id: "dev-des-ca01-b",
      text: "Raise a pre-implementation performance concern with the designer before development starts: document the rendering constraints, propose alternative interaction approaches that achieve the same UX goal within performance limits, and get design sign-off on the revised approach",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Implementing a 60fps animation spec on a 500-row data table without raising a pre-implementation performance concern produces a build that will fail performance testing — and a designer who was never given the chance to solve the problem before the code was written.",
    why: "Design specs are written without performance constraints as a default — designers work in Figma, which renders at 60fps on any hardware. The developer who has built at this scale knows the rendering pipeline constraints that Figma doesn't model. Not raising this concern is not respect for the designer — it is withholding information they need to make a good design decision.",
    how: "A pre-implementation checklist with a 'performance concern' flag creates a formal moment for the developer to surface rendering constraints before a single line of animation code is written. A 30-minute conversation with the designer can produce an equally good UX solution that works within the tech constraints — or a conscious decision to invest in the rendering optimization.",
    whoBecame:
      "A developer who implements an unchallenged spec and lets QA find the performance issue becomes the person who rewrites the rendering pipeline in sprint 3 while the designer wonders why their spec wasn't buildable.",
    tomorrowAction:
      "Create a Dev-QA Pre-Implementation Checklist for your team with a mandatory 'Performance Concern' flag: for any spec involving animations, large data sets (>100 rows), real-time updates, or media-heavy layouts, the developer must document the rendering approach, target hardware specs, and any performance risks before development begins. Share this with the designer for sign-off before coding starts.",
  },
};

export const developerDesignScenarios = [
  validateScenario(clientFriction, "data/scenarios/developer/design.ts"),
  validateScenario(internalBureaucracy, "data/scenarios/developer/design.ts"),
  validateScenario(knowledgeGap, "data/scenarios/developer/design.ts"),
  validateScenario(conflictAvoidance, "data/scenarios/developer/design.ts"),
];
