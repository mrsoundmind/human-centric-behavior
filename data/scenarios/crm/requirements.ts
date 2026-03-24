import { validateScenario } from "../schema";

/**
 * CRM / Requirements phase — 4 scenarios covering all 4 friction dimensions.
 *
 * Friction dimensions covered:
 *   1. client_friction       — "The Roadmap Gap"
 *   2. internal_bureaucracy  — "The Data Silo"
 *   3. knowledge_gap         — "The Invisible Friction"
 *   4. conflict_avoidance    — "The Milestone Miss"
 *
 * If Zod validation fails, this module throws at import time with a descriptive error.
 */

const rawClientFriction = {
  id: "crm-req-client_friction-01",
  role: "crm",
  phase: "requirements",
  frictionDimension: "client_friction",
  title: "The Roadmap Gap",
  setup:
    "During a \u20b93Cr renewal QBR with a fintech client, the CTO asks about 3 features their team has been waiting for — multi-entity reporting, an audit trail export, and SSO integration. All 3 are on the product roadmap but 6 months away. The renewal is at risk if these features are seen as 'not coming soon.' The temptation is to characterise them as 'nearly ready.'",
  choices: [
    {
      id: "crm-req-cf01-a",
      text: "Suggest the features are 'coming very soon' to maintain momentum in the renewal conversation without committing to a specific date",
      frictionTag: "client_friction",
      crossRoleImpact: [
        {
          affectedRole: "pm",
          affectedPhase: "requirements",
          description:
            "PM receives no signal about client expectations for the roadmap items — when the features don't arrive 'very soon', the client's dissatisfaction is attributed to a product failure, not a CRM communication gap",
          severity: "medium",
        },
      ],
    },
    {
      id: "crm-req-cf01-b",
      text: "Share the roadmap timeline transparently, acknowledge the 6-month horizon, and propose interim workarounds for each feature gap",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Vague feature promises in renewal conversations defer the trust damage rather than preventing it. A client told 'coming very soon' will check in 6 weeks. The CRM will have to manage that conversation with no new information — and less credibility.",
    why: "Clients who have been given vague roadmap commitments don't adjust their expectations over time — they intensify them. Transparency about a 6-month timeline, paired with a meaningful interim workaround, is a better retention instrument than a promise that cannot be kept.",
    how: "A 'Feature Timeline Communication Script' with 3 templates — available now, roadmap with ETA, not planned — ensures every feature inquiry gets an honest, structured response. The interim workaround demonstrates that the CRM team has thought through the client's workflow, not just the renewal.",
    whoBecame:
      "A CRM manager who hints at 'very soon' for 6-month roadmap items becomes the person managing 4 follow-up calls from a client who stopped trusting the renewal narrative.",
    tomorrowAction:
      "Create a 'Feature Timeline Communication Script' with 3 templates: available now (with access path), roadmap with ETA (with milestone context), and not planned (with alternative recommendation). Use it in every QBR where clients ask about future features — never improvise a timeline response.",
  },
};

const rawInternalBureaucracy = {
  id: "crm-req-internal_bureaucracy-01",
  role: "crm",
  phase: "requirements",
  frictionDimension: "internal_bureaucracy",
  title: "The Data Silo",
  setup:
    "Preparing for a \u20b92.5Cr quarterly business review requires account health data from 5 disconnected systems: your CRM notes (Salesforce), billing (SAP), support tickets (Freshdesk), NPS scores (SurveyMonkey), and usage analytics (internal BI tool). You have direct access only to Salesforce and Freshdesk. Requests for exports from the other 3 systems require cross-team coordination with 3-5 day SLAs. The QBR is in 4 days.",
  choices: [
    {
      id: "crm-req-ib01-a",
      text: "Present the QBR using the data available from your two accessible systems and note that full account health data is unavailable",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [
        {
          affectedRole: "strategy",
          affectedPhase: "discovery",
          description:
            "Strategy team receives incomplete account health data when reviewing portfolio performance — decisions about account investment and expansion are made on partial signals",
          severity: "medium",
        },
      ],
    },
    {
      id: "crm-req-ib01-b",
      text: "Manually compile a complete health dashboard from all 5 sources for this QBR, and simultaneously raise a systems integration request to prevent the same problem next quarter",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "A QBR presented with partial account health data produces a partial account health conversation. The client receives an analysis of what CRM can access, not a complete picture of their experience.",
    why: "Data silos in enterprise CRM environments are structural — they exist because systems were procured independently. The CRM manager cannot fix the infrastructure, but they can build a manual bridge while the integration request works through the system.",
    how: "A 'Manual Account Health Dashboard' spreadsheet — pulling from all 5 sources into a single view — takes 4-6 hours to build the first time and 1-2 hours subsequently. The integration request creates the long-term fix. The manual process covers the gap now.",
    whoBecame:
      "A CRM manager who presents partial data in QBRs becomes the person whose account health reviews are seen as anecdotal — clients notice when the CRM doesn't have a complete picture of their own account.",
    tomorrowAction:
      "Build a 'Manual Account Health Dashboard' spreadsheet with data pulled from: CRM notes, billing system, support tickets, NPS scores, and usage analytics. Update it monthly until systems are integrated. File a systems integration request with your IT team this week, citing the QBR preparation overhead as business justification.",
  },
};

const rawKnowledgeGap = {
  id: "crm-req-knowledge_gap-01",
  role: "crm",
  phase: "requirements",
  frictionDimension: "knowledge_gap",
  title: "The Invisible Friction",
  setup:
    "During a call with a \u20b91.8Cr e-commerce client, the Operations Manager mentions that their team spends 45 minutes every day manually exporting data from your platform because the scheduled export feature 'has never worked reliably.' This is the first time you're hearing about this friction. You have no record of it in your account notes or in the support system. You've been characterising this account as 'highly satisfied' in your monthly reports.",
  choices: [
    {
      id: "crm-req-kg01-a",
      text: "Acknowledge the issue on the call and log it as a new support ticket, treating it as an isolated incident",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [
        {
          affectedRole: "qa",
          affectedPhase: "testing",
          description:
            "QA has no data on the frequency or pattern of the export feature failures — the issue is treated as a one-off support ticket rather than a systematic reliability problem, preventing root cause investigation",
          severity: "medium",
        },
      ],
    },
    {
      id: "crm-req-kg01-b",
      text: "Audit support tickets and usage logs for the last 6 months to quantify the friction pattern, and present findings to the PM with a severity assessment",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Friction that never reaches the support system is invisible to the organisation but very visible to the client. When a client mentions a daily workflow workaround, that is a signal of systemic friction, not an isolated incident.",
    why: "In enterprise SaaS accounts, clients tolerate friction for months before raising it — especially if earlier support interactions were unproductive. When they finally mention it, they're describing an accumulated experience, not a new problem.",
    how: "A 6-month audit of support tickets and usage logs can confirm whether this is an isolated report or a pattern. A 'Friction Pattern Audit' attached to quarterly account reviews ensures that systemic issues surface before they reach escalation level.",
    whoBecame:
      "A CRM manager who treats a client's daily workaround as a new support ticket becomes the person explaining to leadership why a 'highly satisfied' account chose not to renew — citing a friction point that had existed for 6 months.",
    tomorrowAction:
      "Add a 'Friction Pattern Audit' to your quarterly account review: pull the top 5 support ticket categories for the account and check if any correlate with client-reported friction from calls or emails. If there's a match, escalate to PM for root cause analysis — not as a ticket, as a pattern.",
  },
};

const rawConflictAvoidance = {
  id: "crm-req-conflict_avoidance-01",
  role: "crm",
  phase: "requirements",
  frictionDimension: "conflict_avoidance",
  title: "The Milestone Miss",
  setup:
    "The delivery team has missed a critical milestone on a \u20b92Cr retail client project — the client's inventory integration module, promised for week 8, will not be ready until week 12. The delay was confirmed internally yesterday. You know the client's IT Head is expecting the go-live communication this week. Telling the client now risks a difficult conversation. Waiting means the client might discover it themselves — or it might be resolved faster than expected.",
  choices: [
    {
      id: "crm-req-ca01-a",
      text: "Wait for a few more days to see if the delivery team can compress the delay before informing the client",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "pm",
          affectedPhase: "design",
          description:
            "PM receives no escalation signal from CRM — the corrective action plan is not developed until the delay becomes larger and less recoverable",
          severity: "medium",
        },
      ],
    },
    {
      id: "crm-req-ca01-b",
      text: "Proactively communicate the delay to the client within 24 hours with a clear recovery plan and a compensation offer, before the client notices it themselves",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Waiting to communicate a known delay in hopes of recovery is not risk management — it is a bet with the client's trust as the stake. When the client discovers the delay themselves, the trust damage is compounded by the concealment.",
    why: "In Indian enterprise client relationships, how a problem is communicated matters as much as the problem itself. Proactive communication with a recovery plan is consistently better received than a belated disclosure — even when the recovery plan is imperfect.",
    how: "A 'Delivery Delay Communication Template' — what happened, impact on timeline, recovery plan, and compensation offer — enables the CRM to respond within 24 hours without waiting for a complete answer. Sending an honest update quickly signals accountability.",
    whoBecame:
      "A CRM manager who waits for delay recovery before communicating becomes the person managing a 'trust audit' conversation when the client calls to ask why they weren't told.",
    tomorrowAction:
      "Create a 'Delivery Delay Communication Template' with: what happened (brief), impact on timeline (specific dates), recovery plan (with owner names), and compensation offer if applicable. Send within 24 hours of any confirmed milestone miss — never wait for the delay to resolve itself before communicating.",
  },
};

export const crmRequirementsScenarios = [
  validateScenario(rawClientFriction, "data/scenarios/crm/requirements.ts"),
  validateScenario(rawInternalBureaucracy, "data/scenarios/crm/requirements.ts"),
  validateScenario(rawKnowledgeGap, "data/scenarios/crm/requirements.ts"),
  validateScenario(rawConflictAvoidance, "data/scenarios/crm/requirements.ts"),
];
