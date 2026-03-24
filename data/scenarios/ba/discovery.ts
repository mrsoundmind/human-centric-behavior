import { validateScenario } from "../schema";

/**
 * BA / Discovery phase — 4 scenarios covering all 4 friction dimensions.
 *
 * Friction dimensions covered:
 *   1. client_friction       — "The Unstructured Kickoff"
 *   2. internal_bureaucracy  — "The Access Maze"
 *   3. knowledge_gap         — "The Departing Expert"
 *   4. conflict_avoidance    — "The Contradictory Stakeholders"
 *
 * If Zod validation fails, this module throws at import time with a descriptive error.
 */

const rawClientFriction = {
  id: "ba-discovery-client_friction-01",
  role: "ba",
  phase: "discovery",
  frictionDimension: "client_friction",
  title: "The Unstructured Kickoff",
  setup:
    "A \u20b93.5Cr IBC portal project delivers a 40-page kickoff notes document with no priority order. Three stakeholders — the CTO, business head, and procurement lead — have each added requirements directly to the notes without any hierarchy or trade-off discussion. Sprint planning is in 5 days. You must begin writing requirements.",
  choices: [
    {
      id: "ba-disc-cf01-a",
      text: "Start documenting requirements directly from the raw notes, using your judgment to sequence them",
      frictionTag: "client_friction",
      crossRoleImpact: [
        {
          affectedRole: "pm",
          affectedPhase: "requirements",
          description:
            "PM inherits requirements with no priority hierarchy — sprint planning becomes a negotiation without data, and every stakeholder believes their items are top priority",
          severity: "high",
        },
      ],
    },
    {
      id: "ba-disc-cf01-b",
      text: "Schedule a 1-hour priority mapping session with the top 3 stakeholders before writing any requirements",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Requirements written from unranked kickoff notes inherit every ambiguity from those notes. When the PM tries to plan sprints, every stakeholder claims their items are critical.",
    why: "In Indian enterprise projects, kickoff notes reflect political positioning, not business priority. Without a structured priority alignment session, the BA becomes an interpreter of competing agendas rather than a requirements author.",
    how: "A 1-hour priority mapping session with the top 3 stakeholders produces a ranked list that becomes the BA's working mandate. This is not a delay — it is the discovery artifact that makes every downstream document authoritative.",
    whoBecame:
      "A BA who writes requirements from unranked notes becomes the person caught between stakeholders in every review meeting, defending prioritisation decisions they never had the authority to make.",
    tomorrowAction:
      "Add a 'Priority Alignment Workshop' to your kickoff template — 1 hour, top 3 stakeholders, output: ranked list of 5 non-negotiable requirements and 10 flexible ones. File this as a signed artefact before opening your requirements document.",
  },
};

const rawInternalBureaucracy = {
  id: "ba-discovery-internal_bureaucracy-01",
  role: "ba",
  phase: "discovery",
  frictionDimension: "internal_bureaucracy",
  title: "The Access Maze",
  setup:
    "A \u20b94Cr SAP migration project requires access to legacy system documentation to write accurate integration requirements. Access requires approvals from IT Security, the Application Owner, and the Data Governance team — three separate departments, each with their own approval workflow. You submitted your access request on day 1. It has been 8 days with no response. Your discovery deadline is in 6 days.",
  choices: [
    {
      id: "ba-disc-ib01-a",
      text: "Write requirements based on the documentation you currently have access to, flagging gaps as TBD",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Developer builds against incomplete requirements — integration points with the legacy SAP system surface as blockers during implementation, requiring rework mid-sprint",
          severity: "high",
        },
      ],
    },
    {
      id: "ba-disc-ib01-b",
      text: "Escalate the access request to the project sponsor with a business impact statement quantifying the risk of proceeding without the documentation",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Proceeding with incomplete access produces requirements that map the known world, not the actual system. TBD flags in requirements are technical debt that developers pay for in integration blockers.",
    why: "Access request delays are a predictable risk in enterprise IT environments. Without escalation, they persist indefinitely — each department waits for another to move first. A business impact statement changes the incentive.",
    how: "Escalating with a quantified impact statement — 'requirements without legacy documentation cover 60% of integration scope' — makes the approval delay visible to the project sponsor and triggers fast-track processing.",
    whoBecame:
      "A BA who writes around access gaps becomes the person explaining mid-development rework to the PM when those gaps surface as integration blockers 6 weeks later.",
    tomorrowAction:
      "Create a 'System Access Request Tracker' spreadsheet filed on day 1 of every discovery, listing: system name, documentation needed, approval owner, submission date, and escalation deadline (day 5 if no response). Present it in the kickoff meeting so the PM can co-own it.",
  },
};

const rawKnowledgeGap = {
  id: "ba-discovery-knowledge_gap-01",
  role: "ba",
  phase: "discovery",
  frictionDimension: "knowledge_gap",
  title: "The Departing Expert",
  setup:
    "A \u20b92Cr financial compliance module project has one critical subject matter expert — a senior analyst who is retiring in 6 weeks. She holds 8 years of institutional knowledge about the calculation rules and regulatory exceptions. She will not be available for UAT. Your discovery window is 3 weeks. The existing documentation covers the standard cases but not the 23 exception scenarios that appear in production.",
  choices: [
    {
      id: "ba-disc-kg01-a",
      text: "Proceed with discovery using the available documentation, assuming the standard cases cover 90% of scope",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [
        {
          affectedRole: "qa",
          affectedPhase: "testing",
          description:
            "QA has no domain expert available during UAT to validate acceptance criteria against business intent — the 23 exception scenarios go untested and surface as production defects",
          severity: "high",
        },
      ],
    },
    {
      id: "ba-disc-kg01-b",
      text: "Schedule intensive knowledge transfer sessions with the expert in the first 2 weeks, recording all exception scenarios before she leaves",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Financial compliance requirements built on standard cases only contain a structural gap: the undocumented exceptions are the scenarios where the business actually needs the system to work correctly.",
    why: "In regulated industries, exception cases represent the highest business risk. When the sole expert's departure date is known, knowledge transfer is not optional — it is a discovery deliverable with a deadline.",
    how: "Two structured knowledge transfer sessions (3 hours each) plus a recorded walkthrough of all exception scenarios produces a documented edge case register that survives the expert's departure.",
    whoBecame:
      "A BA who proceeds without capturing departing expertise becomes the person filing post-production defects on exception scenarios that were always known to be out of scope.",
    tomorrowAction:
      "When a key SME has a departure date, create a 'Knowledge Transfer Schedule' within 48 hours: 3 structured interviews, 1 walkthrough of critical workflows, and a recorded Q&A session. Treat this schedule as a milestone in your discovery plan.",
  },
};

const rawConflictAvoidance = {
  id: "ba-discovery-conflict_avoidance-01",
  role: "ba",
  phase: "discovery",
  frictionDimension: "conflict_avoidance",
  title: "The Contradictory Stakeholders",
  setup:
    "A \u20b95Cr enterprise workflow platform project has two senior stakeholders with directly contradictory requirements. The IT Head wants an API-first architecture that developers can extend. The Business Head wants a low-code platform that business users can configure themselves without IT involvement. Both have signed the project brief. You've documented both positions in your discovery notes but haven't flagged the contradiction.",
  choices: [
    {
      id: "ba-disc-ca01-a",
      text: "Include both contradictory requirements in the discovery report and let the PM and client resolve it during requirements phase",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "designer",
          affectedPhase: "design",
          description:
            "Designer receives contradictory architecture requirements — designs against one stakeholder's vision and faces rejection from the other during design review, requiring a full rework cycle",
          severity: "high",
        },
      ],
    },
    {
      id: "ba-disc-ca01-b",
      text: "Flag the conflict explicitly in the discovery report, document both positions with supporting rationale, and request a stakeholder alignment meeting before requirements begin",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "A discovery report that documents contradictory requirements without flagging the conflict transfers the resolution problem downstream — where it costs more to fix at every phase.",
    why: "Contradictory architectural requirements represent a fundamental scope ambiguity. Passing this unresolved into requirements means every downstream team — designer, developer, QA — will independently discover the contradiction and be unable to resolve it without business authority.",
    how: "A 'Conflict Register' section in the discovery report makes contradictions visible at the lowest-cost resolution point. The BA's job is not to choose between stakeholders — it is to ensure the choice is made explicitly, with authority, before requirements begin.",
    whoBecame:
      "A BA who avoids flagging stakeholder conflicts becomes the person watching the design review devolve into an architectural debate that should have happened in week one.",
    tomorrowAction:
      "Add a 'Conflict Register' section to your discovery report template — list every requirement where stakeholders disagree, with both positions documented and a mandatory resolution meeting scheduled before requirements kick off. Never deliver a discovery report with unresolved contradictions.",
  },
};

export const baDiscoveryScenarios = [
  validateScenario(rawClientFriction, "data/scenarios/ba/discovery.ts"),
  validateScenario(rawInternalBureaucracy, "data/scenarios/ba/discovery.ts"),
  validateScenario(rawKnowledgeGap, "data/scenarios/ba/discovery.ts"),
  validateScenario(rawConflictAvoidance, "data/scenarios/ba/discovery.ts"),
];
