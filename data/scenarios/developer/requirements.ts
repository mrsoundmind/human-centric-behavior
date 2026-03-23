import { validateScenario } from "../schema";

/**
 * Developer / Requirements phase — 4 scenarios covering all friction dimensions.
 *
 * Each scenario presents a developer navigating requirements-phase friction in
 * Indian B2B enterprise contexts (IBC, SAP, TCS, enterprise procurement).
 *
 * If Zod validation fails, this module throws at import time with a
 * descriptive error message including the file path.
 */

const clientFriction = {
  id: "dev-req-client_friction-01",
  role: "developer",
  phase: "requirements",
  frictionDimension: "client_friction",
  title: "The Real-Time Trap",
  setup:
    "You are the lead developer on a \u20b95Cr procurement portal for an IBC enterprise client. During requirements review, the client's operations head insists the inventory system must sync 'in real time.' Your backend is a SAP batch job that runs every 4 hours — there is no event-driven architecture, no message queue, and no webhook infrastructure. Building real-time sync would require rearchitecting the data layer entirely.",
  choices: [
    {
      id: "dev-req-cf01-a",
      text: "Accept the real-time requirement as written — flag it as a technical note internally and plan to deliver 'near real-time' (polling every 5 minutes) without confirming with the client",
      frictionTag: "client_friction",
      crossRoleImpact: [
        {
          affectedRole: "qa",
          affectedPhase: "testing",
          description:
            "QA writes test cases against 'real-time sync' acceptance criteria — when the implementation delivers polling, every sync test fails and regression scope expands",
          severity: "high",
        },
        {
          affectedRole: "ba",
          affectedPhase: "requirements",
          description:
            "BA signs off on requirements that contain an unresolved technical impossibility — the requirements document becomes a source of conflict during testing review",
          severity: "medium",
        },
      ],
    },
    {
      id: "dev-req-cf01-b",
      text: "Raise a non-functional requirements gap in the next review: document the current batch architecture, explain the cost and timeline of real-time rearchitecture, and propose a 'near real-time' alternative with explicit sync frequency",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Accepting a real-time requirement against a batch-only backend closes requirements with an unresolvable technical conflict. The gap surfaces in testing — when it is most expensive to fix.",
    why: "Enterprise clients use 'real-time' as a proxy for 'fast enough' — but the technical definition matters enormously. A SAP batch architecture cannot deliver true real-time sync without a fundamental rearchitecture. Accepting the requirement without surfacing this creates a contract that cannot be honored.",
    how: "A non-functional requirements checklist surfaced in the requirements review phase catches sync mechanism mismatches before architecture decisions are locked. The client conversation is about tradeoffs — not technical jargon. 'Every 5 minutes' versus 'every 4 hours' is a business conversation, not an engineering one.",
    whoBecame:
      "A developer who silently plans 'near real-time' against a 'real-time' requirement becomes the person who explains to the client in UAT why their inventory numbers are 5 minutes delayed.",
    tomorrowAction:
      "Add a Non-Functional Requirements Checklist to your team's requirements review process with a mandatory 'sync mechanism' field: real-time (event-driven, <1s), near real-time (polling, 1-60s), batch (scheduled, >1min). Include current infrastructure capability and gap analysis before any NFR is accepted.",
  },
};

const internalBureaucracy = {
  id: "dev-req-internal_bureaucracy-01",
  role: "developer",
  phase: "requirements",
  frictionDimension: "internal_bureaucracy",
  title: "The Sprint Entry Gate",
  setup:
    "A critical bug in the enterprise client portal has been traced to a requirements defect — a missing null check in a data validation rule. The fix is 15 lines of code and 2 test cases. Your team's Definition of Ready requires: QA sign-off on test impact, a security review for any data validation change, and an accessibility audit for any UI-touching change. The QA lead is on leave, the security review queue is 5 days, and the accessibility team has a 3-day backlog. The bug is causing client data loss.",
  choices: [
    {
      id: "dev-req-ib01-a",
      text: "Wait for all three approvals before entering the story into the sprint — the Definition of Ready process exists for a reason, even for critical bugs",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [
        {
          affectedRole: "pm",
          affectedPhase: "requirements",
          description:
            "PM cannot advance the sprint or close the bug with the client while the story sits in approval queue — client relationship degrades during each day of delay",
          severity: "high",
        },
      ],
    },
    {
      id: "dev-req-ib01-b",
      text: "Invoke the emergency bypass criteria in the Definition of Ready — document the client data loss impact, get PM and tech lead sign-off, and enter the story with post-merge review for the blocked approvals",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "A Definition of Ready designed for planned features becomes a blocker for emergency fixes — the process that prevents bad code from entering the sprint also prevents urgent fixes from reaching production.",
    why: "Process gates that have no emergency bypass route were designed for the average case, not the critical case. When all three approval queues are blocked simultaneously during a client data loss incident, waiting 5 days is not a compliance decision — it is a business decision. The developer who escalates via the right channel gets a decision made in hours, not days.",
    how: "An emergency bypass criteria clause in the Definition of Ready — with explicit conditions (data loss, security breach, SLA breach) and required approvers (PM + Tech Lead) — converts a 5-day process into a 2-hour decision with deferred review for non-blocking approvals.",
    whoBecame:
      "A developer who waits 5 days for routine approvals during a client data loss incident becomes the person who lets a process gate cause more damage than the original bug.",
    tomorrowAction:
      "Add an Emergency Bypass Criteria section to your team's Definition of Ready checklist: define trigger conditions (data loss, security vulnerability, SLA breach >4h), required approvers (PM + Tech Lead), and post-merge review obligations for deferred approvals. Review and update this criteria quarterly.",
  },
};

const knowledgeGap = {
  id: "dev-req-knowledge_gap-01",
  role: "developer",
  phase: "requirements",
  frictionDimension: "knowledge_gap",
  title: "The Missing Context",
  setup:
    "You are reviewing requirements for an IBC enterprise compliance module. The requirements document references a business rule that determines pricing tiers: 'Apply the standard IBC compliance surcharge when applicable.' No one on the development team knows what the IBC compliance surcharge is, when it applies, who configured it, or where the rate tables are. The BA says it was 'defined in the original scope' — but that document is from 3 years ago and is no longer accessible.",
  choices: [
    {
      id: "dev-req-kg01-a",
      text: "Build the pricing tier logic with a placeholder for the compliance surcharge — add a TODO comment and assume the rate can be added as a configuration value later",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [
        {
          affectedRole: "qa",
          affectedPhase: "testing",
          description:
            "QA cannot write test cases for pricing tier logic that has an unresolved placeholder — test coverage for compliance scenarios is zero until the surcharge is defined",
          severity: "high",
        },
        {
          affectedRole: "ba",
          affectedPhase: "requirements",
          description:
            "BA closes requirements with an unresolved business rule — the requirements document is not a valid contract for delivery",
          severity: "medium",
        },
      ],
    },
    {
      id: "dev-req-kg01-b",
      text: "File a requirements clarification request with the BA: identify the business rule source (regulation, internal policy, client-specific rate), the applicable conditions, and the rate table location before writing any pricing logic",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Building pricing logic with a TODO placeholder for an undefined compliance rule produces code that is formally incomplete — the TODO will still be there in UAT, and the client will find it before you do.",
    why: "Business rules in enterprise compliance systems often predate the current team and are referenced as known facts by people who no longer work there. The phrase 'when applicable' in a requirements document is a knowledge gap dressed as a specification. A developer who builds around it instead of resolving it is deferring a discovery problem into a production problem.",
    how: "A requirements clarification request submitted at requirements review — not during development — costs 1-2 days. Finding the same gap during UAT costs 1-2 sprints of rework plus a client conversation about why compliance logic was shipped incomplete.",
    whoBecame:
      "A developer who builds around an undefined business rule becomes the person who ships a compliance module with silent gaps that fail audit — not because the code was wrong, but because the requirements were never complete.",
    tomorrowAction:
      "Add a Requirements Clarification Questions template to your team's requirements review process with mandatory fields: business rule name, source document (regulation/policy/client-specific), applicable conditions, rate table or configuration location, and responsible owner. Every undefined business rule in requirements must be resolved before story acceptance.",
  },
};

const conflictAvoidance = {
  id: "dev-req-conflict_avoidance-01",
  role: "developer",
  phase: "requirements",
  frictionDimension: "conflict_avoidance",
  title: "The Absorbed Ambiguity",
  setup:
    "You are reviewing acceptance criteria for a payment processing story on an enterprise portal. The criteria reads: 'The system should handle edge cases gracefully.' You know from experience that payment processing edge cases include partial authorization, timeout during capture, duplicate transaction prevention, and currency conversion rounding. None of these are mentioned. Raising this means reopening a story the BA marked complete, which will delay sprint planning by a day and create friction with the PM who has already committed capacity to the client.",
  choices: [
    {
      id: "dev-req-ca01-a",
      text: "Accept the acceptance criteria as written — you will handle edge cases as you encounter them during development and document your decisions in the code",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "qa",
          affectedPhase: "testing",
          description:
            "QA cannot write edge case test scenarios from acceptance criteria that does not define which edge cases exist — payment testing coverage is determined by what the developer happened to implement",
          severity: "high",
        },
        {
          affectedRole: "ba",
          affectedPhase: "requirements",
          description:
            "BA closes a story whose acceptance criteria is not testable — requirements document contains a clause that cannot be verified",
          severity: "medium",
        },
      ],
    },
    {
      id: "dev-req-ca01-b",
      text: "File a requirements clarification before sprint entry: enumerate the specific payment edge cases you know from experience, request the BA confirm which are in scope and which are explicitly out of scope",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Absorbing ambiguous acceptance criteria to avoid reopening a completed story moves the scope definition work from requirements into development — where it happens without PM, BA, or client input.",
    why: "The phrase 'handle edge cases gracefully' is not a testable acceptance criterion — it is a deferral. A developer who accepts it without enumeration takes on a scope decision that belongs to the BA and client. The specific edge cases you enumerate during development will never be validated against client expectations.",
    how: "An acceptance criteria review checklist with an 'edge case enumeration' gate prevents non-testable criteria from entering the sprint. The 1-day delay for clarification is the cost of the sprint planning conversation you should have had in requirements review. The alternative is a UAT conversation where the client finds an edge case the developer chose not to handle.",
    whoBecame:
      "A developer who absorbs ambiguous acceptance criteria becomes the person who makes silent scope decisions throughout development — then faces client rejection in UAT for edge cases they never confirmed were out of scope.",
    tomorrowAction:
      "Add an Acceptance Criteria Review Checklist to your sprint entry process with an 'edge case enumeration' gate: for any story involving data validation, payments, or state transitions, the acceptance criteria must explicitly list in-scope edge cases and explicitly mark out-of-scope ones. No story with a generic 'handle edge cases' clause enters the sprint.",
  },
};

export const developerRequirementsScenarios = [
  validateScenario(clientFriction, "data/scenarios/developer/requirements.ts"),
  validateScenario(internalBureaucracy, "data/scenarios/developer/requirements.ts"),
  validateScenario(knowledgeGap, "data/scenarios/developer/requirements.ts"),
  validateScenario(conflictAvoidance, "data/scenarios/developer/requirements.ts"),
];
