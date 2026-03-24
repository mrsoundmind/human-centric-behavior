import { validateScenario } from "../schema";

/**
 * Strategy / Design phase — 4 scenarios covering all 4 friction dimensions.
 *
 * Friction dimensions covered:
 *   1. client_friction       — "The Direction Collision"
 *   2. internal_bureaucracy  — "The Instrumentation Gap"
 *   3. knowledge_gap         — "The Measurement Gap"
 *   4. conflict_avoidance    — "The Delayed Reckoning"
 *
 * If Zod validation fails, this module throws at import time with a descriptive error.
 */

const rawClientFriction = {
  id: "strategy-des-client_friction-01",
  role: "strategy",
  phase: "design",
  frictionDimension: "client_friction",
  title: "The Direction Collision",
  setup:
    "Strategy-level UX direction conflicts with what the dev team has already built over 3 months on a \u20b94Cr product. The sunk cost is visible. Leadership is tempted to adapt the strategy to match what was built rather than correct the direction.",
  choices: [
    {
      id: "strategy-des-cf01-a",
      text: "Adapt the strategy to match what has already been built — sunk cost reasoning: the investment is already made and reversing it creates more disruption",
      frictionTag: "client_friction",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Developer continues building on a direction now confirmed to be wrong — 3 additional months of work will require rework post-launch when market response validates the original strategic concern",
          severity: "high",
        },
      ],
    },
    {
      id: "strategy-des-cf01-b",
      text: "Assess the rework cost versus the opportunity cost of the wrong direction and present the trade-off to leadership as a documented pivot decision — not a sunk cost argument",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Adapting strategy to justify sunk costs compounds the original error — the 3 months already spent become the reason to spend 3 more months in the wrong direction.",
    why: "Sunk cost reasoning is one of the most common strategy failures in enterprise software delivery. The correct question is not 'what did we spend?' but 'what does continuing in this direction cost versus correcting now?'",
    how: "A pivot cost assessment separates the emotional weight of sunk costs from the financial logic of the decision. Rework cost now versus full product redirect cost post-launch is a different calculation — and usually favors the pivot.",
    whoBecame:
      "A strategist who adapts direction to protect sunk costs becomes the person managing a post-launch pivot that costs 3x what the mid-development correction would have.",
    tomorrowAction:
      "Before approving a strategy change that affects in-progress work, complete a 'Pivot Cost Assessment': sunk cost (what was spent), rework cost (what correction costs now), opportunity cost of NOT pivoting (what wrong direction costs long-term), and recommended path with decision owner and timeline.",
  },
};

const rawInternalBureaucracy = {
  id: "strategy-des-internal_bureaucracy-01",
  role: "strategy",
  phase: "design",
  frictionDimension: "internal_bureaucracy",
  title: "The Instrumentation Gap",
  setup:
    "A strategic KPI dashboard requires buy-in from 7 teams to instrument their data sources. 3 teams have declined due to resource constraints. The remaining 4 teams are ready. The strategy team wants to launch the dashboard with partial data and call it 'Phase 1.'",
  choices: [
    {
      id: "strategy-des-ib01-a",
      text: "Launch the dashboard with data from 4 of 7 teams — label it Phase 1 and plan to add the remaining sources when the 3 teams have capacity",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [
        {
          affectedRole: "pm",
          affectedPhase: "design",
          description:
            "PM designs product metrics against a dashboard missing 40% of the data sources — strategic decisions are made on incomplete signals without knowing what is absent",
          severity: "medium",
        },
      ],
    },
    {
      id: "strategy-des-ib01-b",
      text: "Escalate the 3 declining teams to their respective VPs with a business impact quantification showing what decisions cannot be made without their data — turn it into a business case, not a resource request",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Launching a strategic KPI dashboard with 40% of sources missing does not produce partial insight — it produces misleading insight, because decision-makers cannot see what they do not know is absent.",
    why: "In cross-functional instrumentation, the hardest data to collect is often the most strategically important. Teams that decline due to resource constraints often do so because the business case has not been made at the right level.",
    how: "Escalating to VPs with a business impact quantification reframes the conversation: not 'we need your data' but 'here is the specific strategic decision your data unlocks.' VP-level escalation is appropriate when the cost of absence is documented.",
    whoBecame:
      "A strategist who launches an incomplete dashboard as 'Phase 1' becomes the person defending strategic recommendations when a data audit reveals 3 of 7 sources were missing the entire time.",
    tomorrowAction:
      "For any cross-team instrumentation initiative, create a 'Team Buy-In Tracker': team name, data source needed, effort estimate, current status (committed / declining / negotiating), escalation path for declining teams, and the specific strategic decision each source enables.",
  },
};

const rawKnowledgeGap = {
  id: "strategy-des-knowledge_gap-01",
  role: "strategy",
  phase: "design",
  frictionDimension: "knowledge_gap",
  title: "The Measurement Gap",
  setup:
    "A \u20b96Cr strategic bet was made. Adoption metrics are available but cannot be connected to business outcomes because the data infrastructure was never designed to link user behavior to revenue. Strategy must present results to the board.",
  choices: [
    {
      id: "strategy-des-kg01-a",
      text: "Present adoption numbers as proxy for business impact — the board needs a result and adoption is the closest available metric",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [
        {
          affectedRole: "crm",
          affectedPhase: "design",
          description:
            "CRM presents unverifiable ROI claims to clients during contract renewals — credibility erodes when clients ask for proof and discover adoption was used as a proxy for revenue impact",
          severity: "medium",
        },
      ],
    },
    {
      id: "strategy-des-kg01-b",
      text: "Present adoption as what it is — a leading indicator, not proof of impact — and commission a measurement infrastructure plan to establish the linkage before the next board review",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Presenting adoption as business impact is not a measurement decision — it is a credibility decision. When the board asks 'what is the revenue impact?' and the answer is 'high adoption,' the strategy loses credibility.",
    why: "In enterprise software delivery, the gap between user adoption and business outcome is real and common. Filling it with proxy metrics defers the measurement problem and creates false confidence in strategic direction.",
    how: "A measurement architecture document defines the linkage on day 1: what metrics prove success, what data sources exist, what instrumentation must be built, and by when. Built retroactively, it costs 3x more and produces noisier data.",
    whoBecame:
      "A strategist who presents adoption as impact becomes the person defending a ₹6Cr investment when the board asks for revenue attribution and the data does not exist.",
    tomorrowAction:
      "For every strategic initiative, define a 'Measurement Architecture' document on day 1: what metrics prove success, what data sources exist today, what instrumentation must be built before launch, and the owner and deadline for each. This document is a prerequisite for strategy approval.",
  },
};

const rawConflictAvoidance = {
  id: "strategy-des-conflict_avoidance-01",
  role: "strategy",
  phase: "design",
  frictionDimension: "conflict_avoidance",
  title: "The Delayed Reckoning",
  setup:
    "Post-launch data on a \u20b95Cr strategic initiative shows a clear flaw in the original hypothesis. The strategy team has the data but delays presenting findings to leadership while trying to find a way to 'frame it positively.'",
  choices: [
    {
      id: "strategy-des-ca01-a",
      text: "Delay the presentation until you can present a more favorable interpretation — give the initiative more time before declaring the hypothesis flawed",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "pm",
          affectedPhase: "requirements",
          description:
            "PM continues building requirements on a flawed strategic premise for weeks after the flaw was known — the longer the delay, the more in-flight work is wasted when the correction finally happens",
          severity: "high",
        },
      ],
    },
    {
      id: "strategy-des-ca01-b",
      text: "Present the findings within 2 weeks of data availability — lead with what the data shows, a recommended correction plan, and the lessons learned — not a positive spin",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Delaying unfavorable findings to frame them better does not improve the underlying outcome — it extends the period during which the team continues investing in the wrong direction.",
    why: "In strategy, the cost of bad news is inversely proportional to how quickly it is surfaced. A flaw found at week 2 post-launch costs correction resources. The same flaw surfaced at week 8 costs correction resources plus 6 weeks of misdirected investment.",
    how: "A post-launch strategic review cadence — week 2 and week 8 — creates a structural expectation that data will be reviewed and findings presented on schedule, regardless of whether they confirm or contradict the hypothesis.",
    whoBecame:
      "A strategist who delays presenting unfavorable findings to protect the narrative becomes the person managing leadership's loss of confidence when the delay is discovered — not just the finding.",
    tomorrowAction:
      "Establish a 'Strategic Review Cadence' rule for every initiative: post-launch data review at week 2 and week 8. If data contradicts the hypothesis, present findings within 5 business days with a recommended pivot or persist decision and the evidence it is based on.",
  },
};

export const strategyDesignScenarios = [
  validateScenario(rawClientFriction, "data/scenarios/strategy/design.ts"),
  validateScenario(rawInternalBureaucracy, "data/scenarios/strategy/design.ts"),
  validateScenario(rawKnowledgeGap, "data/scenarios/strategy/design.ts"),
  validateScenario(rawConflictAvoidance, "data/scenarios/strategy/design.ts"),
];
