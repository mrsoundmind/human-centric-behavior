import { validateScenario } from "../schema";

/**
 * Strategy / Discovery phase — 4 scenarios covering all 4 friction dimensions.
 *
 * Friction dimensions covered:
 *   1. client_friction       — "The Buzzword Board"
 *   2. internal_bureaucracy  — "The Committee Quarterly"
 *   3. knowledge_gap         — "The Stale Data"
 *   4. conflict_avoidance    — "The Dual Priority"
 *
 * If Zod validation fails, this module throws at import time with a descriptive error.
 */

const rawClientFriction = {
  id: "strategy-discovery-client_friction-01",
  role: "strategy",
  phase: "discovery",
  frictionDimension: "client_friction",
  title: "The Buzzword Board",
  setup:
    "Your board wants 'AI and mobile-first' built into the \u20b98Cr product roadmap. No user research exists. You are presenting next week to executives who cite trend reports, not evidence. Sprint planning downstream depends on this direction being locked.",
  choices: [
    {
      id: "strategy-disc-cf01-a",
      text: "Build the strategy deck around AI and mobile trend reports — align with board expectations to secure approval quickly",
      frictionTag: "client_friction",
      crossRoleImpact: [
        {
          affectedRole: "pm",
          affectedPhase: "discovery",
          description:
            "PM begins discovery for a product direction chosen by trend, not evidence — pivots become expensive when user data contradicts board assumptions",
          severity: "high",
        },
      ],
    },
    {
      id: "strategy-disc-cf01-b",
      text: "Present a 2-track approach: quick market signal analysis AND a 4-week user research sprint before committing direction — with risk quantification for both tracks",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Building a strategy around board trend preferences without user evidence creates a direction that feels approved but is not validated — downstream teams inherit the assumption as fact.",
    why: "In Indian enterprise software delivery, boards often conflate competitive trends with user needs. Without an evidence gate, strategy becomes trend alignment, not value alignment. The cost surfaces 6 months later when the product launches to low adoption.",
    how: "A 2-track approach separates the political requirement (acknowledging the trend) from the evidence requirement (validating the direction). The board gets trend alignment; the team gets a validation runway before full commitment.",
    whoBecame:
      "A strategist who aligns with board trends without evidence becomes the person explaining low product adoption when the market report said otherwise.",
    tomorrowAction:
      "Add an 'Evidence Gate' slide to your next strategy presentation: 'This direction is based on [market trend / user research / competitor analysis]. Confidence level: [high / medium / low]. Validation plan: [specific next step with timeline and owner].'",
  },
};

const rawInternalBureaucracy = {
  id: "strategy-discovery-internal_bureaucracy-01",
  role: "strategy",
  phase: "discovery",
  frictionDimension: "internal_bureaucracy",
  title: "The Committee Quarterly",
  setup:
    "A \u20b95Cr strategic initiative requires 3 committee approvals. Each committee meets quarterly. Sequential approval means 9+ months before the market window closes. The initiative targets a competitor gap that closes in under 6 months.",
  choices: [
    {
      id: "strategy-disc-ib01-a",
      text: "Wait for all 3 quarterly committee cycles — document the market window risk but proceed through standard governance",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [
        {
          affectedRole: "ba",
          affectedPhase: "discovery",
          description:
            "BA cannot begin discovery until strategic direction is approved — 9-month delay renders original market research obsolete before requirements work begins",
          severity: "high",
        },
      ],
    },
    {
      id: "strategy-disc-ib01-b",
      text: "Request an extraordinary joint committee session with a single agenda, quantify the cost of 1-quarter delay in revenue terms, and propose a conditional approval that lets discovery begin before final sign-off",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Waiting for all 3 quarterly approval cycles does not protect the initiative — it transfers the market risk from the strategy team to the governance process, without reducing it.",
    why: "Quarterly committee structures exist for stability, not agility. When a strategic initiative has a time-sensitive market window, sequential quarterly approvals are not governance — they are a veto by inaction.",
    how: "A joint committee expedite request quantifies the cost of delay in language committees respond to: market window, ₹X revenue risk per quarter of delay, and a proposed single-session agenda that reduces meeting overhead for all 3 committees.",
    whoBecame:
      "A strategist who accepts 9-month approval timelines without challenging the process becomes the person explaining why the competitor closed the gap while the initiative waited for a quorum.",
    tomorrowAction:
      "For initiatives with quarterly approval gates, draft a 'Joint Committee Expedite Request' with: market window deadline, cost of 1-quarter delay (₹X revenue risk), proposed single-session agenda, and the specific decision required from each committee — not a review, a decision.",
  },
};

const rawKnowledgeGap = {
  id: "strategy-discovery-knowledge_gap-01",
  role: "strategy",
  phase: "discovery",
  frictionDimension: "knowledge_gap",
  title: "The Stale Data",
  setup:
    "Your \u20b94Cr product bet rests on a market report published 2 years ago. The competitive landscape has shifted — 2 major competitors have launched features the report didn't anticipate. You are finalizing the strategy document this week.",
  choices: [
    {
      id: "strategy-disc-kg01-a",
      text: "Present the 2-year-old data as current — refresh is expensive and the direction is unlikely to change",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [
        {
          affectedRole: "sales",
          affectedPhase: "discovery",
          description:
            "Sales positions the product using outdated competitive differentiators — loses deals where competitors have already closed the gap the strategy is built around",
          severity: "medium",
        },
      ],
    },
    {
      id: "strategy-disc-kg01-b",
      text: "Commission a 2-week rapid competitive refresh before finalizing the strategy — scope it to only the claims the direction depends on",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Presenting stale competitive data as current does not make the strategy wrong — but it makes the confidence unwarranted. When Sales encounters the market reality, the strategy loses credibility faster than it can be updated.",
    why: "In fast-moving B2B software markets, a 2-year-old report covers a different competitive landscape. The risk is not that the direction changes — it is that the evidence the direction is based on no longer exists.",
    how: "A targeted competitive refresh focuses only on the claims the strategy depends on — not a full market study. 2 weeks of desk research against the 3-4 key claims is proportionate to a ₹4Cr bet.",
    whoBecame:
      "A strategist who presents stale data as current becomes the person whose strategy is publicly contradicted by a competitor's recent product announcement at the client meeting.",
    tomorrowAction:
      "Add a 'Data Freshness Audit' to every strategy document: for each data source, list publication date, relevance confidence (high / medium / low), and refresh action if older than 12 months. No strategy goes to leadership review without this audit complete.",
  },
};

const rawConflictAvoidance = {
  id: "strategy-discovery-conflict_avoidance-01",
  role: "strategy",
  phase: "discovery",
  frictionDimension: "conflict_avoidance",
  title: "The Dual Priority",
  setup:
    "Two senior stakeholders have contradictory strategic priorities for a \u20b96Cr portfolio decision: one wants market expansion, one wants platform consolidation. The strategy team tries to satisfy both without forcing a decision. The strategy document accommodates both directions ambiguously.",
  choices: [
    {
      id: "strategy-disc-ca01-a",
      text: "Present a plan that ambiguously accommodates both priorities — avoid naming the conflict and let execution sort out the tension",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "pm",
          affectedPhase: "requirements",
          description:
            "PM receives a strategy doc with two conflicting priorities — requirements work starts on both tracks, doubling effort until one is killed mid-sprint",
          severity: "high",
        },
      ],
    },
    {
      id: "strategy-disc-ca01-b",
      text: "Present both priorities explicitly with trade-offs quantified in timeline, budget, and team capacity — request a single direction decision before the strategy is finalized",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "A strategy that accommodates contradictory priorities without resolving them does not avoid conflict — it moves it downstream where the cost of resolution is higher and the decision-makers are less senior.",
    why: "Strategy-level conflicts resolved at the PM or BA level waste more than the time to resolve them at source. In Indian enterprise delivery, ambiguous strategy docs often mean two teams build in parallel until a budget crisis forces the decision.",
    how: "Presenting both priorities with explicit trade-offs — timeline, budget, team capacity — turns a political conflict into a resource allocation decision. The stakeholders must decide, not the execution team.",
    whoBecame:
      "A strategist who avoids naming conflicts in the strategy document becomes the person watching two parallel workstreams compete for the same developers 3 months later.",
    tomorrowAction:
      "When two stakeholders have conflicting priorities, create a 'Strategic Trade-Off Brief': Priority A (benefits, costs, risks), Priority B (benefits, costs, risks), and 'We cannot do both because [specific resource or timeline constraint].' Present it as a decision document, not a strategy document.",
  },
};

export const strategyDiscoveryScenarios = [
  validateScenario(rawClientFriction, "data/scenarios/strategy/discovery.ts"),
  validateScenario(rawInternalBureaucracy, "data/scenarios/strategy/discovery.ts"),
  validateScenario(rawKnowledgeGap, "data/scenarios/strategy/discovery.ts"),
  validateScenario(rawConflictAvoidance, "data/scenarios/strategy/discovery.ts"),
];
