import { validateScenario } from "../schema";

/**
 * Developer / Discovery phase — 4 scenarios covering all friction dimensions.
 *
 * Each scenario presents a developer navigating discovery-phase friction in
 * Indian B2B enterprise contexts (IBC, SAP, TCS, enterprise procurement).
 *
 * If Zod validation fails, this module throws at import time with a
 * descriptive error message including the file path.
 */

const clientFriction = {
  id: "dev-disc-client_friction-01",
  role: "developer",
  phase: "discovery",
  frictionDimension: "client_friction",
  title: "The Undefined API Contract",
  setup:
    "You are the lead developer on a \u20b93Cr TCS integration project. The client's procurement system must connect to your platform. Their IT team points you to a PDF user manual and says 'just use the portal.' There is no API documentation, no Swagger spec, no sandbox environment — just a 200-page PDF written for business users, not engineers.",
  choices: [
    {
      id: "dev-disc-c01-a",
      text: "Begin reverse-engineering the integration from the PDF and portal behavior — start coding exploratory calls to understand the endpoints",
      frictionTag: "client_friction",
      crossRoleImpact: [
        {
          affectedRole: "qa",
          affectedPhase: "testing",
          description:
            "QA cannot write integration test cases without a known contract — test scope remains undefined until developer reverse-engineering is complete",
          severity: "high",
        },
        {
          affectedRole: "pm",
          affectedPhase: "requirements",
          description:
            "PM cannot estimate timeline accurately when integration scope is unknown — sprint commitments are made on guesswork",
          severity: "medium",
        },
      ],
    },
    {
      id: "dev-disc-c01-b",
      text: "Raise a discovery blocker: request a formal API contract template from the client IT team before writing a single line of integration code",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Reverse-engineering integration behavior from a business-user PDF delays discovery close-out by 1-2 sprints and produces undocumented assumptions that become bugs in testing.",
    why: "Enterprise clients often conflate 'we have a portal' with 'we have an integration-ready API.' Without a documented contract — auth method, rate limits, error codes, versioning — every integration assumption made in discovery will need to be renegotiated in testing.",
    how: "A discovery blocker raised at the right moment costs 2-3 days. Discovering the same problem in testing costs 2-3 sprints. The API contract is not a nice-to-have; it is the integration discovery deliverable.",
    whoBecame:
      "A developer who starts coding without an API contract becomes the person who rewrites integration logic three times across the project — and is blamed for 'delays' that were actually undiscoverable until late.",
    tomorrowAction:
      "In your next client integration project, create an API Contract Template with mandatory fields: authentication method, base URL, rate limits, error code catalog, versioning policy, and sandbox environment URL. Share this template during discovery kick-off — not after sprint 1 planning.",
  },
};

const internalBureaucracy = {
  id: "dev-disc-internal_bureaucracy-01",
  role: "developer",
  phase: "discovery",
  frictionDimension: "internal_bureaucracy",
  title: "The Architecture Sign-Off",
  setup:
    "Your team is in the discovery phase for a SAP migration project. The solution requires adding a new microservice to handle real-time data sync between the legacy SAP ECC system and the new S/4HANA instance. The Architecture Review Board must approve all new services. The ARB meets monthly. Sprint planning starts in 5 days. The next ARB slot is 22 days away.",
  choices: [
    {
      id: "dev-disc-ib01-a",
      text: "Proceed with sprint planning — scope the microservice work optimistically and submit the ARB request in parallel, hoping to get an emergency review",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [
        {
          affectedRole: "pm",
          affectedPhase: "requirements",
          description:
            "PM commits to sprint scope for a service that has no architectural approval — sprint 1 velocity is fictional and must be renegotiated when ARB blocks the build",
          severity: "high",
        },
      ],
    },
    {
      id: "dev-disc-ib01-b",
      text: "Propose an Architecture Decision Record (ADR) for async ARB review — document the decision context, options considered, and rationale so the board can approve without a live meeting",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Optimistically scoping a service that requires ARB approval creates a sprint 1 dependency that cannot be resolved before the sprint starts — the team builds toward a gate that has not opened.",
    why: "Architecture review boards exist to prevent system sprawl and enforce standards — but monthly cadences create discovery bottlenecks for teams working in 2-week sprints. The gap between governance rhythm and delivery rhythm is a structural friction most teams absorb as delay rather than solve as a process.",
    how: "An ADR submitted 5 days before sprint planning gives the ARB enough context to approve asynchronously via email or Slack. Most ARB members prefer a well-structured document to a meeting slot. The ADR converts a synchronous gate into an async handoff.",
    whoBecame:
      "A developer who treats ARB approval as someone else's scheduling problem becomes the person who halts sprint 1 on day 3 because the architecture gate never opened.",
    tomorrowAction:
      "Create an Architecture Decision Record (ADR) template for your team with sections: Context, Decision Drivers, Options Considered, Decision Made, Consequences, and Emergency Review Criteria. Submit the ADR to the ARB at discovery start — not at sprint 1 planning.",
  },
};

const knowledgeGap = {
  id: "dev-disc-knowledge_gap-01",
  role: "developer",
  phase: "discovery",
  frictionDimension: "knowledge_gap",
  title: "The Undocumented Legacy",
  setup:
    "You are the developer assigned to a legacy IBC enterprise system with 200,000 lines of code. The original developer left 2 years ago. There is no README, no architecture diagram, no inline comments in critical modules, and no runbook. The client wants a feature enhancement. Discovery requires you to map what the system does before you can estimate what the feature requires.",
  choices: [
    {
      id: "dev-disc-kg01-a",
      text: "Start reading code directly and estimate the feature based on what you find in the first 2 days — commit to a sprint plan based on that partial reading",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [
        {
          affectedRole: "qa",
          affectedPhase: "testing",
          description:
            "QA cannot plan regression scope when legacy system boundaries are unknown — any code change may affect unrelated modules with no test coverage",
          severity: "high",
        },
        {
          affectedRole: "ba",
          affectedPhase: "requirements",
          description:
            "BA writes requirements against a system whose current behavior is unknown — acceptance criteria will contradict existing behavior discovered in development",
          severity: "medium",
        },
      ],
    },
    {
      id: "dev-disc-kg01-b",
      text: "Allocate a dedicated 3-day legacy archaeology spike before sprint planning — map entry points, data flows, and external calls, then estimate from the map",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Estimating against a 200K-line undocumented codebase from a 2-day partial read produces estimates that miss 60-70% of the actual scope — hidden dependencies surface in development as surprise rework.",
    why: "Legacy systems accumulate undocumented behavior over years of incremental changes by people who no longer work there. The code is the only source of truth — but reading code without a map is slower than building the map first.",
    how: "A legacy archaeology spike uses structured discovery: trace the entry points for the feature area, identify all data models touched, list all external system calls, and draw a dependency map. This 3-day investment prevents 3-sprint discovery-during-development.",
    whoBecame:
      "A developer who estimates a legacy feature without a system map becomes the person who delivers 'surprise' timeline extensions sprint after sprint as hidden dependencies emerge.",
    tomorrowAction:
      "Create a Legacy System Dependency Map template for your team: list all entry points (APIs, UI triggers, scheduled jobs), data models touched, external system calls, and known unknowns. Fill this template during discovery archaeology before estimating any legacy enhancement.",
  },
};

const conflictAvoidance = {
  id: "dev-disc-conflict_avoidance-01",
  role: "developer",
  phase: "discovery",
  frictionDimension: "conflict_avoidance",
  title: "The Optimistic Estimate",
  setup:
    "Your tech lead gives a discovery estimate of 3 sprints for a SAP BAPI integration feature. You have done BAPI integrations before — the actual complexity, when you account for SAP's transaction handling, IDoc mapping, and the client's custom authorization exits, is closer to 5 sprints. The PM is presenting this estimate to the client tomorrow. You know it's wrong but raising it means the PM has to reopen a conversation that was already uncomfortable.",
  choices: [
    {
      id: "dev-disc-ca01-a",
      text: "Stay silent — the tech lead has more experience and the estimate is already approved; raise concerns during development if the timeline starts slipping",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "pm",
          affectedPhase: "requirements",
          description:
            "PM negotiates requirements scope and priorities against a timeline that is 40% too short — every trade-off decision in requirements will be based on false capacity",
          severity: "high",
        },
        {
          affectedRole: "qa",
          affectedPhase: "testing",
          description:
            "QA is allocated based on the 3-sprint estimate — test cycles are planned against a timeline that will compress when development overruns",
          severity: "medium",
        },
      ],
    },
    {
      id: "dev-disc-ca01-b",
      text: "Raise the estimate discrepancy privately with the tech lead before the PM presents — share your BAPI integration experience as the basis, not as a challenge to authority",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Staying silent on a known-wrong estimate means the project contracts around a timeline you already know is false. The developer becomes complicit in a commitment that was never achievable.",
    why: "Optimistic estimates in discovery often reflect the estimator's desire to avoid opening an uncomfortable conversation — not their actual assessment of complexity. In enterprise SAP work, complexity multipliers for authorization exits, IDoc mapping, and custom BAPI handling can double naive estimates. The developer who stays silent knows this — but weighs the discomfort of speaking now against the discomfort of slipping later.",
    how: "A private, experience-based conversation with the tech lead before the estimate is presented costs 15 minutes. It is not a challenge to authority — it is domain expertise being surfaced at the right moment. Most tech leads prefer to be corrected privately rather than publicly surprised in development.",
    whoBecame:
      "A developer who stays silent on a wrong estimate becomes the person who slips sprint after sprint — blamed for 'delays' on a project where the timeline was never real.",
    tomorrowAction:
      "Create an Estimation Checklist for SAP and enterprise integrations with a mandatory 'complexity multiplier' column: BAPI authorization exits (1.5x), IDoc mapping (1.3x), custom transaction handling (1.4x), client-side authorization exits (1.6x). Use this checklist before any discovery estimate is finalized for client presentation.",
  },
};

export const developerDiscoveryScenarios = [
  validateScenario(clientFriction, "data/scenarios/developer/discovery.ts"),
  validateScenario(internalBureaucracy, "data/scenarios/developer/discovery.ts"),
  validateScenario(knowledgeGap, "data/scenarios/developer/discovery.ts"),
  validateScenario(conflictAvoidance, "data/scenarios/developer/discovery.ts"),
];
