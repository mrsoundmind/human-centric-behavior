import { validateScenario } from "../schema";

/**
 * Strategy / Requirements phase — 4 scenarios covering all 4 friction dimensions.
 *
 * Friction dimensions covered:
 *   1. client_friction       — "The Moving Target"
 *   2. internal_bureaucracy  — "The Veto Power"
 *   3. knowledge_gap         — "The Unvalidated Assumption"
 *   4. conflict_avoidance    — "The Omitted Finding"
 *
 * If Zod validation fails, this module throws at import time with a descriptive error.
 */

const rawClientFriction = {
  id: "strategy-req-client_friction-01",
  role: "strategy",
  phase: "requirements",
  frictionDimension: "client_friction",
  title: "The Moving Target",
  setup:
    "A \u20b93Cr client engagement has seen 4 strategic direction changes in 6 weeks. Each change discards 2-3 weeks of in-progress work. The strategy team has been updating documents after each meeting without flagging the pattern to the client.",
  choices: [
    {
      id: "strategy-req-cf01-a",
      text: "Continue updating strategy documents after each client meeting without flagging the pattern — the client is paying and their direction should be followed",
      frictionTag: "client_friction",
      crossRoleImpact: [
        {
          affectedRole: "ba",
          affectedPhase: "requirements",
          description:
            "BA restarts requirements gathering with each strategic pivot — 3 weeks of requirements work is discarded per direction change, compressing the delivery timeline",
          severity: "high",
        },
      ],
    },
    {
      id: "strategy-req-cf01-b",
      text: "Present the strategic direction change log to the client showing 4 changes in 6 weeks, quantify the delivery impact, and request a strategy freeze before requirements work continues",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Absorbing direction changes without naming the pattern does not serve the client — it defers the cost to the delivery team and reduces the likelihood of a successful outcome at the end.",
    why: "Clients who change strategic direction frequently often do so because no one has made the cost visible. Each change feels free because the strategy team absorbs it silently. A change log makes the pattern a shared problem.",
    how: "A strategic direction change log surfaces the pattern in data, not in complaint. Showing the client 4 direction changes in 6 weeks with delivery impact per change reframes the conversation from 'we want flexibility' to 'here is what flexibility has cost so far.'",
    whoBecame:
      "A strategist who absorbs repeated direction changes without naming the pattern becomes the delivery team's explanation for why the project is behind schedule on an unchanged contract value.",
    tomorrowAction:
      "Maintain a 'Strategic Direction Change Log' for every engagement: date, previous direction, new direction, reason, and impact on in-progress work. Present at any meeting where direction changes for the 3rd time — make it a standing agenda item.",
  },
};

const rawInternalBureaucracy = {
  id: "strategy-req-internal_bureaucracy-01",
  role: "strategy",
  phase: "requirements",
  frictionDimension: "internal_bureaucracy",
  title: "The Veto Power",
  setup:
    "A \u20b95Cr strategic initiative must pass political review by all department heads, each with veto power. Three departments have concerns. The strategy team dilutes recommendations to preemptively avoid any veto.",
  choices: [
    {
      id: "strategy-req-ib01-a",
      text: "Water down the strategy to eliminate anything any department might veto — secure approval by minimizing the scope of any commitment",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [
        {
          affectedRole: "pm",
          affectedPhase: "requirements",
          description:
            "PM receives a diluted strategy without measurable outcomes — requirements become a wish list without priority or success criteria",
          severity: "medium",
        },
      ],
    },
    {
      id: "strategy-req-ib01-b",
      text: "Present the full strategy with a department-specific impact matrix showing impacts (positive, neutral, negative) and pre-negotiated mitigations for negative impacts — negotiate trade-offs explicitly rather than preemptively removing them",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Pre-diluting a strategy to survive veto review produces a strategy that no department objects to and no department believes in — approved but not owned.",
    why: "In Indian enterprise governance, veto power without a structured negotiation process tends to produce the lowest common denominator outcome. The strategy that offends no one commits to nothing.",
    how: "A department impact matrix separates legitimate concerns (resource conflicts, compliance risk) from preference-based objections. Pre-negotiated mitigations for real concerns remove the reason to veto — without removing the strategy's commitments.",
    whoBecame:
      "A strategist who dilutes strategy to avoid political friction becomes the person explaining to leadership why a ₹5Cr initiative produced no measurable outcome a year later.",
    tomorrowAction:
      "Before circulating a strategy for review, create a 'Department Impact Matrix': for each recommendation, list its impact on each department (positive / neutral / negative) with pre-negotiated mitigation for negative impacts. Include it in the circulation package — turn veto conversations into trade-off conversations.",
  },
};

const rawKnowledgeGap = {
  id: "strategy-req-knowledge_gap-01",
  role: "strategy",
  phase: "requirements",
  frictionDimension: "knowledge_gap",
  title: "The Unvalidated Assumption",
  setup:
    "A \u20b94Cr product direction relies on an assumption about user behavior that has never been validated. Executives want to skip discovery and move directly to requirements. The strategy team agrees to proceed.",
  choices: [
    {
      id: "strategy-req-kg01-a",
      text: "Proceed with the unvalidated assumption and plan to run discovery 'later' — the executive timeline cannot accommodate a research sprint now",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Developer builds features based on unvalidated behavioral assumptions — post-launch usage data contradicts the core premise and requires architectural rework",
          severity: "high",
        },
      ],
    },
    {
      id: "strategy-req-kg01-b",
      text: "Propose a 2-week rapid validation sprint before committing engineering resources — present the cost of rework if the assumption is wrong versus the cost of 2 weeks of validation",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Proceeding on an unvalidated assumption does not eliminate the validation cost — it defers it to a phase where it is 10x more expensive to absorb.",
    why: "In B2B software delivery, unvalidated behavioral assumptions are the most common source of post-launch architectural rework. Executives who skip discovery often do so because no one has quantified the cost of being wrong.",
    how: "A cost comparison between 2 weeks of validation now versus potential rework post-launch frames the decision in financial terms. A ₹4Cr product built on a wrong assumption costs far more than a 2-week validation sprint.",
    whoBecame:
      "A strategist who accepts 'we'll validate later' becomes the person managing a post-launch rework cycle that traces back to a decision made in a requirements meeting.",
    tomorrowAction:
      "For every strategic assumption, add a 'Validation Status' tag in the strategy document: Validated (with evidence link), Assumed (with validation plan and owner), or Unknown (with risk assessment). No assumption can remain untagged before requirements work begins.",
  },
};

const rawConflictAvoidance = {
  id: "strategy-req-conflict_avoidance-01",
  role: "strategy",
  phase: "requirements",
  frictionDimension: "conflict_avoidance",
  title: "The Omitted Finding",
  setup:
    "Strategy analysis identifies that the proposed ₹5Cr new direction conflicts with an existing commitment to a ₹3Cr client. Surfacing this will create political fallout. The strategy team omits the conflict from the report.",
  choices: [
    {
      id: "strategy-req-ca01-a",
      text: "Omit the conflict from the strategy report — document it internally but keep it out of the deliverable to avoid political fallout at the presentation",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "crm",
          affectedPhase: "requirements",
          description:
            "CRM discovers the commitment conflict when the affected client raises it — the relationship damage from a broken promise has no recovery plan because no one documented the conflict",
          severity: "high",
        },
      ],
    },
    {
      id: "strategy-req-ca01-b",
      text: "Include the conflict in the strategy report with a recommended resolution path — the cost of not surfacing it is higher than the cost of the political conversation now",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Omitting a known conflict from a strategy report does not make the conflict go away — it removes the only moment when leadership could have resolved it at low cost.",
    why: "In Indian enterprise delivery, commitment conflicts surfaced in strategy documents are manageable. The same conflict surfaced by the client during delivery becomes a relationship crisis. The cost of the political conversation is far lower than the cost of the relationship repair.",
    how: "A commitment conflict check built into the strategy document template ensures existing client commitments are reviewed against every proposed new direction — not as an afterthought, but as a required section.",
    whoBecame:
      "A strategist who omits a known finding to avoid political fallout becomes the person watching CRM manage a client escalation that a one-paragraph strategy note could have prevented.",
    tomorrowAction:
      "Add a 'Commitment Conflict Check' to every strategy document: list all existing client commitments that the proposed direction affects, the nature of the conflict, and the recommended resolution path. This section cannot be left blank.",
  },
};

export const strategyRequirementsScenarios = [
  validateScenario(rawClientFriction, "data/scenarios/strategy/requirements.ts"),
  validateScenario(rawInternalBureaucracy, "data/scenarios/strategy/requirements.ts"),
  validateScenario(rawKnowledgeGap, "data/scenarios/strategy/requirements.ts"),
  validateScenario(rawConflictAvoidance, "data/scenarios/strategy/requirements.ts"),
];
