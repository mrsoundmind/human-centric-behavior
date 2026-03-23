import { validateScenario } from "../schema";

/**
 * PM / Design phase — 4 scenarios covering all 4 friction dimensions.
 *
 * Friction dimensions covered:
 *   1. client_friction       — "The Brand Override"
 *   2. internal_bureaucracy  — "The Review Loop"
 *   3. knowledge_gap         — "The Invisible Constraint"
 *   4. conflict_avoidance    — "The Unchallenged Wireframe"
 *
 * If Zod validation fails, this module throws at import time with a descriptive error.
 */

const rawClientFriction = {
  id: "pm-des-client_friction-01",
  role: "pm",
  phase: "design",
  frictionDimension: "client_friction",
  title: "The Brand Override",
  setup:
    "Design freeze is in 2 days. Your designer has delivered 18 wireframes that are fully signed off internally. The client's brand team — who were not included in the 4 earlier design reviews — has reviewed the mockups and rejected them: wrong typography, outdated color tokens, and a navigation pattern that conflicts with their new brand guide released last month. Starting over means pushing the design freeze by 8 days and compressing development.",
  choices: [
    {
      id: "pm-des-cf01-a",
      text: "Direct the designer to rework all 18 wireframes to meet brand requirements — client satisfaction is the priority and the delay is unavoidable",
      frictionTag: "client_friction",
      crossRoleImpact: [
        {
          affectedRole: "designer",
          affectedPhase: "design",
          description:
            "Designer must redo 18 wireframes under time pressure without a clear brand token handover from the client's brand team — quality suffers and burnout risk increases",
          severity: "high",
        },
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Development start is pushed 8 days — sprint planning is invalidated and the team loses the architecture setup buffer",
          severity: "high",
        },
      ],
    },
    {
      id: "pm-des-cf01-b",
      text: "Escalate to the client PM: request a 2-hour brand token handover session, define which of the 18 wireframes need rework versus cosmetic token updates, and set a design freeze extension with a formal sign-off criteria doc that includes brand alignment as a checkpoint",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Brand rejection at design freeze is not a design problem — it is a stakeholder management problem. The client's brand team was never included in the review process, so their first review became their veto.",
    why: "In enterprise projects, brand teams operate independently of delivery teams. Without an explicit brand alignment checkpoint in the design process, they become a surprise gate at the worst moment.",
    how: "A design sign-off criteria doc with a brand alignment checkpoint forces the brand team into the review process early — not as a final approver, but as a participant. The 2-hour token handover is a minimal investment compared to 8 days of rework.",
    whoBecame:
      "A PM who does not build brand review into the design process creates a delivery crisis when the brand team exercises their veto at freeze.",
    tomorrowAction:
      "Create a design sign-off criteria doc with a brand alignment checkpoint: at the end of the first wireframe review, require written confirmation from the client that the brand team has reviewed and approved the design language. No design review proceeds past round 1 without this checkpoint cleared.",
  },
};

const rawInternalBureaucracy = {
  id: "pm-des-internal_bureaucracy-01",
  role: "pm",
  phase: "design",
  frictionDimension: "internal_bureaucracy",
  title: "The Review Loop",
  setup:
    "Your designer has submitted wireframes for a \u20b97Cr government portal project. Internal review policy requires feedback from 4 departments: UX standards, accessibility compliance, security review, and product leadership. Each department reviews independently and submits feedback directly to the designer — with no coordination between departments. Round 1 feedback arrived from all 4 departments: the UX team wants a simplified nav, accessibility wants high-contrast mode added, security wants 2 additional authentication screens, and product leadership wants 'a fresh feel.' The designer is now holding 4 contradictory feedback sets with no priority order.",
  choices: [
    {
      id: "pm-des-ib01-a",
      text: "Have the designer work through all 4 feedback sets simultaneously — all departments have equal weight and the designer should synthesize them",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [
        {
          affectedRole: "designer",
          affectedPhase: "design",
          description:
            "Designer receives conflicting directives with no resolution authority — attempts to satisfy all 4 sets produce a design that fully satisfies none",
          severity: "high",
        },
        {
          affectedRole: "qa",
          affectedPhase: "testing",
          description:
            "QA receives a design where accessibility and security requirements were partially implemented under conflicting constraints — compliance testing will identify gaps",
          severity: "medium",
        },
      ],
    },
    {
      id: "pm-des-ib01-b",
      text: "Convene a single 90-minute cross-department design review meeting, prioritize the feedback by compliance requirement (accessibility, security first), resolve conflicts in the room, and set a design review SLA document so this process is predictable in future rounds",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Independent department feedback with no coordination mechanism turns the designer into the de facto decision-maker on conflicts they have no authority to resolve — and no context to prioritize.",
    why: "When multiple stakeholders review in isolation, each feedback set is internally consistent but externally contradictory. The PM is the only person with the cross-department view needed to prioritize feedback.",
    how: "A design review SLA document defines the review structure: who reviews, in what order, what the priority hierarchy is (compliance before preference), and how conflicts are resolved. This turns review from an ad hoc process into a predictable workflow.",
    whoBecame:
      "A PM who delegates conflicting review synthesis to the designer produces a demoralized designer and a design that goes through 3 additional rounds because no one made a decision.",
    tomorrowAction:
      "Create a design review SLA document for your next project: list each reviewer, their review domain, the feedback priority tier (compliance / functional / preference), the turnaround SLA per round, and the conflict resolution meeting trigger. Attach it to every design handoff email.",
  },
};

const rawKnowledgeGap = {
  id: "pm-des-knowledge_gap-01",
  role: "pm",
  phase: "design",
  frictionDimension: "knowledge_gap",
  title: "The Invisible Constraint",
  setup:
    "Your designer has completed high-fidelity mockups for a real-time analytics dashboard — beautiful, high-density data visualizations with auto-refresh every 5 seconds. The client loves it. Your lead developer reviews the mockups and flags a problem: the client's API has a rate limit of 10 requests per minute per session. The dashboard design makes 24 API calls per minute per active user. At 200 concurrent users, the dashboard will hit rate limits within 30 seconds of launch. This constraint was never communicated to the design team during the design phase.",
  choices: [
    {
      id: "pm-des-kg01-a",
      text: "Ask the designer to reduce the number of visualizations to fit within the API constraint — the design must be modified to work within the technical reality",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [
        {
          affectedRole: "designer",
          affectedPhase: "design",
          description:
            "Designer must redesign high-fidelity mockups the client has already approved — the design change may damage client trust in the product vision",
          severity: "high",
        },
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Developer must implement a constrained design without a documented API constraint registry — future design additions may re-trigger the same problem",
          severity: "medium",
        },
      ],
    },
    {
      id: "pm-des-kg01-b",
      text: "Convene a 1-hour technical constraints handover before the next design sprint: have the developer document all API and infrastructure constraints in a design constraint registry that the designer reviews before any new wireframe work begins",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Design built in isolation from technical constraints produces work that is visually correct but operationally impossible — the client approved a dashboard that cannot function as designed.",
    why: "API rate limits, database query constraints, and infrastructure boundaries are invisible to designers unless explicitly communicated. The PM is responsible for ensuring that technical constraints are part of the design brief — not discovered during developer review of finished mockups.",
    how: "A design constraint registry documents every non-negotiable technical boundary the design must work within: API rate limits, load time requirements, mobile constraints, authentication flows. It is created before design begins and reviewed at the start of every design sprint.",
    whoBecame:
      "A PM who doesn't bridge technical constraints to the design team becomes the person managing a client conversation about why the approved design can't be built.",
    tomorrowAction:
      "Create a design constraint registry template: for each technical constraint, document the constraint type, the limit or boundary, the impact if exceeded, the source (developer, architect, or infrastructure), and the date confirmed. Require this registry to be reviewed by the designer before any wireframe work begins on a new feature.",
  },
};

const rawConflictAvoidance = {
  id: "pm-des-conflict_avoidance-01",
  role: "pm",
  phase: "design",
  frictionDimension: "conflict_avoidance",
  title: "The Unchallenged Wireframe",
  setup:
    "Your designer has delivered wireframes for the client's customer onboarding flow. In the design review meeting, you notice two usability issues: the 7-step onboarding form has no progress indicator, and the 'save and continue later' option is buried under 3 clicks. Research shows these patterns double form abandonment rates. The designer is senior, has strong opinions, and the last time you gave design feedback in a meeting it created visible tension. The client seems happy with the wireframes. You say nothing.",
  choices: [
    {
      id: "pm-des-ca01-a",
      text: "Approve the wireframes as presented — the designer is the expert, the client is satisfied, and raising it now will create conflict without clear benefit",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Developer builds a high-abandonment onboarding flow — post-launch data will require a redesign sprint to address the measurable UX debt",
          severity: "medium",
        },
        {
          affectedRole: "qa",
          affectedPhase: "testing",
          description:
            "QA tests against the approved wireframes — usability issues are not caught because they are design decisions, not functional bugs",
          severity: "low",
        },
      ],
    },
    {
      id: "pm-des-ca01-b",
      text: "Request a 30-minute post-review critique session with just the designer, use a structured critique agenda (context, observation, evidence, question) to raise the two issues without making it personal, and document the outcome",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Approving a wireframe with known usability issues to avoid conflict with the designer means the PM prioritized their own comfort over the user's experience and the client's outcomes.",
    why: "UX debt that is visible in wireframes is cheapest to fix at the design stage. The same fix costs 5x more in development and 20x more post-launch. The PM's job is to create the conditions for honest critique — not to absorb the cost of avoiding it.",
    how: "A structured critique agenda (context, observation, evidence, question) removes the personal element from design feedback. Raising an issue as 'research shows progress indicators reduce abandonment by 40% — should we test that assumption here?' is a question, not a judgment.",
    whoBecame:
      "A PM who silences themselves during design review to preserve relationships becomes the person managing a post-launch redesign conversation with the same designer 6 months later.",
    tomorrowAction:
      "Create a design critique agenda template for your next design review: it must include a mandatory critique questions section with at least 3 pre-prepared questions covering usability, user journey, and evidence alignment. Use the template in every design review so critique is a structural expectation, not an occasional challenge.",
  },
};

export const pmDesignScenarios = [
  validateScenario(rawClientFriction, "data/scenarios/pm/design.ts"),
  validateScenario(rawInternalBureaucracy, "data/scenarios/pm/design.ts"),
  validateScenario(rawKnowledgeGap, "data/scenarios/pm/design.ts"),
  validateScenario(rawConflictAvoidance, "data/scenarios/pm/design.ts"),
];
