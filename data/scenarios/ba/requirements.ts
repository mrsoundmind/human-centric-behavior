import { validateScenario } from "../schema";

/**
 * BA / Requirements phase — 4 scenarios covering all 4 friction dimensions.
 *
 * Friction dimensions covered:
 *   1. client_friction       — "The Last-Minute Pivot"
 *   2. internal_bureaucracy  — "The Wet Signature"
 *   3. knowledge_gap         — "The Regulatory Blind Spot"
 *   4. conflict_avoidance    — "The Vague Revision"
 *
 * If Zod validation fails, this module throws at import time with a descriptive error.
 */

const rawClientFriction = {
  id: "ba-req-client_friction-01",
  role: "ba",
  phase: "requirements",
  frictionDimension: "client_friction",
  title: "The Last-Minute Pivot",
  setup:
    "A \u20b93Cr procurement platform project is 2 days from requirements sign-off. The client's Operations Director sends a message: 'We've reviewed the requirements with our COO — we need to add a multi-currency approval workflow. It's non-negotiable for launch.' You've spent 3 weeks finalising the requirements document. This change affects 6 modules and cross-references 14 existing requirements.",
  choices: [
    {
      id: "ba-req-cf01-a",
      text: "Absorb the change and revise the requirements document to avoid delaying sign-off",
      frictionTag: "client_friction",
      crossRoleImpact: [
        {
          affectedRole: "pm",
          affectedPhase: "requirements",
          description:
            "PM has no documented evidence of the scope change or its timeline impact — budget and schedule overruns from this change have no paper trail to reference when the project runs late",
          severity: "high",
        },
      ],
    },
    {
      id: "ba-req-cf01-b",
      text: "Document the change impact — affected modules, timeline delta, budget impact — and present trade-offs to the PM and client before accepting any revision",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Absorbing a late requirements change without a change impact assessment makes the scope expansion invisible. The client experiences no friction in requesting the change, so the pattern repeats on the next project.",
    why: "A BA who absorbs last-minute changes silently becomes a change buffer rather than a requirements author. The team pays for the change in timeline and quality, but the client never understands the cost.",
    how: "A one-page Change Impact Assessment — changed requirement, affected modules, timeline impact, budget impact, alternative approaches — makes the trade-off concrete. The client can still choose to proceed, but they choose with full information.",
    whoBecame:
      "A BA who accepts changes without documentation becomes the person unable to explain why the project is running 3 weeks behind when the PM asks for a timeline justification.",
    tomorrowAction:
      "Create a 'Change Impact Assessment' one-pager template with these fields: changed requirement, affected modules, timeline impact (+X days), budget impact (+\u20b9Y), and two alternative approaches. Use it every time a client requests a requirements change post-kickoff.",
  },
};

const rawInternalBureaucracy = {
  id: "ba-req-internal_bureaucracy-01",
  role: "ba",
  phase: "requirements",
  frictionDimension: "internal_bureaucracy",
  title: "The Wet Signature",
  setup:
    "A \u20b94.5Cr SAP integration project has completed requirements. Internal policy requires physical sign-off with wet signatures from 5 senior executives — the CTO, CFO, Delivery Head, Legal, and the client's Programme Director — who are spread across Chennai, Mumbai, Bengaluru, and Pune. Courier coordination for physical documents is estimated at 12-15 business days. Your design phase start date is in 10 days.",
  choices: [
    {
      id: "ba-req-ib01-a",
      text: "Initiate the physical signature process and accept that design will be delayed until all signatures are collected",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Design phase delay compresses the development runway — developers receive finalized design artefacts later than planned, reducing time for architecture decisions before coding begins",
          severity: "medium",
        },
      ],
    },
    {
      id: "ba-req-ib01-b",
      text: "Propose digital sign-off with a full audit trail to the project sponsor, citing the timeline impact and legal precedent for e-signatures in enterprise contracts",
      frictionTag: "internal_bureaucracy",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Accepting a 15-day signature process for a 10-day design window is not compliance — it is passive delay. Physical signature requirements in enterprise projects are often inertia, not legal necessity.",
    why: "Indian enterprise IT contracts have been legally executed with digital signatures since the IT Act, 2000. When BAs accept process friction as unchangeable, they absorb delays that could be escalated and resolved.",
    how: "A 'Digital Sign-Off Proposal' for the project sponsor — with audit trail evidence, legal citation, and projected time savings — gives leadership the information needed to approve an exception. The BA's job is to surface the option, not to make the decision unilaterally.",
    whoBecame:
      "A BA who waits for wet signatures without exploring alternatives becomes the person explaining to the delivery team why a compliant, completed requirements document couldn't unlock the next phase for two weeks.",
    tomorrowAction:
      "Draft a 'Digital Sign-Off Proposal' template for your next project: audit trail evidence, reference to the IT Act 2000 Section 5 on electronic records, list of signatories who have previously accepted digital signatures, and projected timeline savings. Present it to the project sponsor on day 1 of requirements.",
  },
};

const rawKnowledgeGap = {
  id: "ba-req-knowledge_gap-01",
  role: "ba",
  phase: "requirements",
  frictionDimension: "knowledge_gap",
  title: "The Regulatory Blind Spot",
  setup:
    "A \u20b92.5Cr NBFC loan processing system project requires you to write requirements for automated interest calculation and penalty computation. You've written a technically precise requirements document — the formulas are correct and the logic is clean. A colleague mentions that RBI circular DBR.No.Dir.BC.10/13.03.00/2015-16 has specific requirements for how these calculations must be disclosed to borrowers. You're not familiar with the regulation.",
  choices: [
    {
      id: "ba-req-kg01-a",
      text: "Submit the requirements document as written, noting that regulatory compliance is a developer responsibility during implementation",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Developer builds technically correct but legally non-compliant calculation logic — the compliance gap is discovered during legal review or RBI audit, triggering a full rework cycle post-launch",
          severity: "high",
        },
      ],
    },
    {
      id: "ba-req-kg01-b",
      text: "Consult with the compliance team before finalising the requirements, adding a regulatory compliance section that covers disclosure rules for financial calculations",
      frictionTag: "knowledge_gap",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Requirements that are technically valid but legally non-compliant are not complete requirements — they are a deferred compliance risk. In regulated industries, the BA's scope includes regulatory context.",
    why: "Financial product requirements in India must account for RBI and SEBI guidelines. A BA without regulatory context produces requirements that are defensible from a product perspective but not from a legal one.",
    how: "A 'Regulatory Compliance Checklist' attached to the requirements template for financial modules — covering applicable RBI circulars, disclosure requirements, and data retention rules — ensures regulatory scope is addressed before sign-off.",
    whoBecame:
      "A BA who treats compliance as a developer concern becomes the person revisiting the requirements document after a legal review flags a disclosure gap two months into development.",
    tomorrowAction:
      "Add a 'Regulatory Compliance Checklist' to your requirements template for any module involving financial calculations, data privacy, or user consent. For NBFC projects, start with three RBI circulars: interest calculation disclosure, KYC norms, and grievance redressal. Consult compliance before marking these sections complete.",
  },
};

const rawConflictAvoidance = {
  id: "ba-req-conflict_avoidance-01",
  role: "ba",
  phase: "requirements",
  frictionDimension: "conflict_avoidance",
  title: "The Vague Revision",
  setup:
    "A \u20b93.5Cr logistics platform project has been through two requirements review cycles. The lead developer sends you a message: 'Requirements for the route optimisation module are too vague to build — specifically, the acceptance criteria for 'optimal route' are undefined. Does optimal mean fastest, cheapest, or fewest stops?' You know the client stakeholder who authored this section is difficult to reach. You think you understand what they meant.",
  choices: [
    {
      id: "ba-req-ca01-a",
      text: "Rewrite the acceptance criteria based on your interpretation of the client's intent and submit a revised version to the developer",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Developer builds against acceptance criteria the client never reviewed — the optimisation logic may contradict the client's actual intent, requiring a design and code rework after UAT",
          severity: "medium",
        },
      ],
    },
    {
      id: "ba-req-ca01-b",
      text: "Schedule a 3-way call with the developer and the client stakeholder to clarify the acceptance criteria definition together, and document the agreed definition before revising",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "A BA who resolves requirements ambiguity unilaterally removes the client from a decision that should be theirs. The revised requirements reflect the BA's interpretation, not the client's intent.",
    why: "When acceptance criteria are ambiguous, the quickest path is a 3-way clarification call — not a solo revision. Avoiding the client to protect relationship ease creates a requirements document that the client will reject during UAT.",
    how: "A 'Clarification Request Log' entry — original text, developer's question, scheduled call date — creates a trail that protects the BA when the client questions why a requirement was revised without their input.",
    whoBecame:
      "A BA who makes solo interpretation calls on vague requirements becomes the person managing a UAT session where the client says 'that's not what I meant by optimal' — after 3 months of development.",
    tomorrowAction:
      "When a developer flags vague requirements, add a 'Clarification Request Log' entry with: original text, developer's question, and a 3-way call scheduled within 48 hours. Never revise a requirements interpretation without the requesting stakeholder present.",
  },
};

export const baRequirementsScenarios = [
  validateScenario(rawClientFriction, "data/scenarios/ba/requirements.ts"),
  validateScenario(rawInternalBureaucracy, "data/scenarios/ba/requirements.ts"),
  validateScenario(rawKnowledgeGap, "data/scenarios/ba/requirements.ts"),
  validateScenario(rawConflictAvoidance, "data/scenarios/ba/requirements.ts"),
];
