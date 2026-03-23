// ZERO React imports. This module must run in Node without a browser environment.

import type { FrictionDimension, SDLCPhase } from "./scenarios/types";

// ─── Archetype Definition ─────────────────────────────────────────────────────

export interface ArchetypeDefinition {
  name: string;         // e.g., "Requirements Absorber"
  narrative: string;    // 2-3 sentence behavioral description
  whatYouDo: string;    // specific behavioral pattern description
  whyItMatters: string; // consequence for the team/project
  doThis: string;       // tomorrow's action anchored to a workflow moment
}

// ─── Archetype Key ────────────────────────────────────────────────────────────

type ArchetypeKey = `${FrictionDimension}:${SDLCPhase}`;

// ─── Phase-Specific Archetype Lookup Table ───────────────────────────────────
// 12 entries: 4 friction dimensions x 3 primary phases (discovery, requirements, design)

export const ARCHETYPE_LOOKUP: Partial<Record<ArchetypeKey, ArchetypeDefinition>> = {

  // ── conflict_avoidance ──────────────────────────────────────────────────────

  "conflict_avoidance:discovery": {
    name: "Discovery Absorber",
    narrative:
      "You move through discovery sessions by nodding along and capturing what stakeholders say rather than stress-testing their assumptions. Tough questions get deferred to 'later' — and later never comes with the same openness. By the time requirements are written, the hard conversations feel even harder to start.",
    whatYouDo:
      "You accept vague requirements without pushback during early discovery, treating stakeholder statements as facts rather than hypotheses to probe.",
    whyItMatters:
      "Ambiguity compounds — every unresolved question in Discovery becomes a scope crisis in Requirements. Teams build against assumptions nobody validated, and the rework cost lands on developers, not the meeting room.",
    doThis:
      "In your next discovery session, write down one assumption you are making and ask the stakeholder to confirm or deny it before the meeting ends.",
  },

  "conflict_avoidance:requirements": {
    name: "Requirements Absorber",
    narrative:
      "You absorb contradictory or unclear requirements without surfacing them as blockers. When two stakeholders want opposing things, you document both and move on. The contradiction becomes someone else's problem — usually the developer who has to pick one at 11pm before a deadline.",
    whatYouDo:
      "You accept unclear or contradictory requirements without raising them as blockers, treating conflict-avoidance as professionalism.",
    whyItMatters:
      "Silent acceptance creates hidden rework — the team builds against assumptions nobody validated, and the cost of ambiguity is paid by whoever is least able to absorb it at deadline time.",
    doThis:
      "Before signing off on the next requirements document, highlight one requirement you find ambiguous and ask for a concrete acceptance criterion before the document is approved.",
  },

  "conflict_avoidance:design": {
    name: "Design Absorber",
    narrative:
      "When design reviews surface conflicting opinions, you find the middle path rather than holding the line on what works for the user. The design that ships is often a committee compromise — technically approved by all, genuinely championed by none.",
    whatYouDo:
      "You incorporate feedback from all reviewers without pushing back on suggestions that undermine the design rationale, leaving no one accountable for the final decision.",
    whyItMatters:
      "Design decisions made by consensus rather than by principle create interfaces that confuse users while satisfying internal stakeholders. Usability debt accumulates quietly until launch makes it visible.",
    doThis:
      "In your next design review, for each piece of feedback you receive, state explicitly whether you are accepting it, rejecting it, or adapting it — and give one sentence of reasoning for each.",
  },

  // ── knowledge_gap ───────────────────────────────────────────────────────────

  "knowledge_gap:discovery": {
    name: "Discovery Hoarder",
    narrative:
      "During discovery, you work from your own understanding of the problem rather than surfacing what you do not yet know. Questions that would expose a knowledge gap stay unasked. The team enters requirements with a map that has several blank territories — nobody knows they are blank.",
    whatYouDo:
      "You proceed with discovery without naming the information you are missing, treating the absence of a question as equivalent to having the answer.",
    whyItMatters:
      "Unacknowledged knowledge gaps in discovery become undocumented assumptions in requirements. When those assumptions prove wrong in testing, the cost is borne by the entire team — not by the gap that created them.",
    doThis:
      "Before your next discovery session ends, list two things you assumed rather than confirmed, and assign a name and date to when each assumption will be verified.",
  },

  "knowledge_gap:requirements": {
    name: "Requirements Hoarder",
    narrative:
      "You write or review requirements based on what you know, and leave silently unchallenged the areas where your knowledge runs thin. Domain gaps get papered over with vague language that sounds complete until a developer asks a specific question.",
    whatYouDo:
      "You allow requirements to proceed without flagging the knowledge gaps they contain, treating your uncertainty as private rather than as a shared risk that the team should address.",
    whyItMatters:
      "A requirement that looks complete but rests on unverified domain knowledge forces developers to make decisions that should have been made upstream. Every silent gap in requirements is a future interrupt during development.",
    doThis:
      "On your next requirements review, put a '?' marker next to any statement where your confidence is below 80% — then schedule one conversation to resolve it before the document is approved.",
  },

  "knowledge_gap:design": {
    name: "Design Hoarder",
    narrative:
      "You design within the boundaries of what you already know about the users, without surfacing where your user research is thin or outdated. Decisions that should wait for validation get made on assumptions that feel like facts because they have been repeated often enough.",
    whatYouDo:
      "You proceed with design decisions in areas where you lack current user evidence, treating design intuition as a substitute for validation.",
    whyItMatters:
      "Designs that skip validation in areas of uncertainty create features that make sense to the designer but fail for the user. The gap between designer confidence and user reality only becomes visible after launch.",
    doThis:
      "Before your next design decision in an area you have not recently validated, write one sentence describing what you would need to observe in a user session to feel confident in the direction.",
  },

  // ── internal_bureaucracy ─────────────────────────────────────────────────────

  "internal_bureaucracy:discovery": {
    name: "Discovery Shield",
    narrative:
      "During discovery, you route decisions through approval layers and sign-off chains rather than using the room to make them. The meeting ends with action items for more meetings. Decisions that could be made with the people present get escalated upward, slowing the discovery pipeline.",
    whatYouDo:
      "You defer discovery decisions to approval processes and escalation chains that were not designed for the speed discovery requires, using process as cover for commitment-avoidance.",
    whyItMatters:
      "Discovery timelines stretch when every decision needs a sign-off that could have happened in the room. Teams lose momentum and stakeholders lose confidence in the process before requirements have even started.",
    doThis:
      "In your next discovery session, identify one decision that you would normally escalate and instead resolve it in the meeting — with a note that you will communicate the outcome upward afterward.",
  },

  "internal_bureaucracy:requirements": {
    name: "Requirements Shield",
    narrative:
      "When requirements need to change or a conflict needs resolution, you invoke process — change control, approvals, formal review cycles — rather than using your judgment or convening the right people. The process is real, but it is being used to avoid a direct conversation.",
    whatYouDo:
      "You route requirements decisions through formal approval processes even when the people with authority to decide are available and reachable, using process as a buffer against direct accountability.",
    whyItMatters:
      "Bureaucratic escalation during requirements adds calendar time without adding decision quality. The people downstream — developers, QA, designers — absorb the delay while the approval chain moves at its own pace.",
    doThis:
      "The next time you are about to raise a formal change request, ask yourself: could I get the right people in a 30-minute call and resolve this directly? If yes, make the call first.",
  },

  "internal_bureaucracy:design": {
    name: "Design Shield",
    narrative:
      "Design decisions get routed upward for approvals that add calendar time without adding insight. You use the review process as a decision-making layer rather than a quality-checking layer. The design is technically approved, but nobody is sure who actually owns the direction.",
    whatYouDo:
      "You escalate design decisions to approval chains rather than using your domain expertise to make and defend a recommendation, using process to distribute accountability.",
    whyItMatters:
      "When design ownership is diffused across an approval chain, iteration slows and the design rationale becomes untraceable. Teams cannot explain why a design decision was made — only that it was approved.",
    doThis:
      "Before your next design review, write a one-sentence design rationale for the primary decision you are presenting, and state explicitly that you are recommending this direction — not asking for a vote.",
  },

  // ── client_friction ─────────────────────────────────────────────────────────

  "client_friction:discovery": {
    name: "Discovery Pleaser",
    narrative:
      "In discovery with clients or external stakeholders, you absorb their framing of the problem without probing whether their stated need matches their underlying problem. You optimize for the client feeling heard rather than for the team getting clarity. The brief you write reflects what the client said, not what they need.",
    whatYouDo:
      "You accept client statements about their problem as requirements without pushing back or reframing, prioritizing relationship harmony over scope clarity in the early stage where reframing is cheapest.",
    whyItMatters:
      "Discovery that optimizes for client satisfaction over problem clarity produces a brief that everyone agrees on and nobody can execute against. The misalignment surfaces in design or development, where it costs ten times more to correct.",
    doThis:
      "In your next client discovery session, for the most important requirement you hear, ask the client to tell you what would happen if that requirement was not met — and listen for whether the answer changes your understanding of the problem.",
  },

  "client_friction:requirements": {
    name: "Requirements Pleaser",
    narrative:
      "When client requirements are ambiguous or expanding, you document what they ask for rather than negotiating what the team can actually deliver. Scope creep enters through requirements sign-off, not through rogue development decisions.",
    whatYouDo:
      "You accept client-stated requirements without challenging scope, feasibility, or ambiguity, treating client satisfaction in the requirements meeting as the primary deliverable.",
    whyItMatters:
      "Requirements that absorb client requests without scope negotiation create delivery commitments the team did not agree to. The gap between what was promised and what can be delivered becomes the project manager's private burden.",
    doThis:
      "The next time a client adds a requirement, before adding it to the document, ask: what existing requirement does this replace or extend? If it replaces nothing, flag it explicitly as a scope addition requiring a separate conversation.",
  },

  "client_friction:design": {
    name: "Design Pleaser",
    narrative:
      "In design reviews with clients, you incorporate their visual or functional preferences even when they conflict with usability principles or the established design system. The client leaves the review feeling good. The users who encounter the design later do not.",
    whatYouDo:
      "You adapt design decisions to client preferences without distinguishing between feedback that improves the design and feedback that reflects personal taste at the expense of user experience.",
    whyItMatters:
      "Design that absorbs client preferences without filtering for user impact creates a product that the client approved and users abandon. The friction shows up in support tickets and churn, not in the design review.",
    doThis:
      "In your next design review, for each piece of client feedback, explicitly categorize it as 'improves user experience,' 'neutral,' or 'conflicts with user experience,' and communicate that categorization to the client before deciding whether to implement it.",
  },
};

// ─── Dimension Fallback Archetypes ───────────────────────────────────────────
// Used when no phase-specific entry exists in ARCHETYPE_LOOKUP

export const DIMENSION_FALLBACK: Record<FrictionDimension, ArchetypeDefinition> = {
  conflict_avoidance: {
    name: "The Approval Absorber",
    narrative:
      "Across your journey, you consistently deferred judgment to stakeholders rather than pushing back or holding a position. You treated agreement as progress and conflict as a problem to avoid, even when the conflict would have produced clarity faster than consensus did.",
    whatYouDo:
      "You absorb decisions from others rather than contributing your own judgment, optimizing for harmony over clarity at each friction point.",
    whyItMatters:
      "Teams that defer consistently have no center of gravity — decisions get made by default rather than by deliberation, and the people furthest from the user end up most influential.",
    doThis:
      "The next time you are in a meeting where a decision needs to be made and you have an opinion, state it first — before asking what others think.",
  },

  knowledge_gap: {
    name: "The Knowledge Hoarder",
    narrative:
      "Across your journey, you worked within information silos and proceeded with assumptions rather than surfacing what was missing. The gaps in your knowledge stayed private, which meant the team could not fill them or account for them in planning.",
    whatYouDo:
      "You proceed with decisions in areas where your knowledge is incomplete without naming the gap, treating uncertainty as a private risk rather than a shared one.",
    whyItMatters:
      "Knowledge gaps that stay private compound into shared problems — downstream teams make decisions on the basis of your unverified assumptions without knowing they are assumptions.",
    doThis:
      "Before your next deliverable is handed off, write a two-sentence 'what I assumed' note that travels with it, so the recipient knows what to verify.",
  },

  internal_bureaucracy: {
    name: "The Process Shield",
    narrative:
      "Across your journey, you routed decisions through approval layers and formal processes rather than resolving them directly with the people who had authority. Process became a protective layer that slowed delivery without improving outcomes.",
    whatYouDo:
      "You use formal processes as decision-making infrastructure rather than as quality-checking infrastructure, escalating decisions that could be resolved in the room.",
    whyItMatters:
      "Bureaucratic routing distributes accountability so widely that nobody is responsible for the outcome. Teams downstream absorb the calendar cost while the process runs its course.",
    doThis:
      "The next time you are about to escalate a decision, ask one question first: is the person I am escalating to actually better positioned than I am to make this call? If not, make the call yourself.",
  },

  client_friction: {
    name: "The Client Pleaser",
    narrative:
      "Across your journey, you absorbed client ambiguity without pushing for definition and accepted client preferences without filtering for user impact. You optimized for the client feeling heard rather than for the team getting clarity.",
    whatYouDo:
      "You prioritize client relationship harmony over scope clarity and user outcomes, treating client satisfaction as the primary deliverable rather than a by-product of good work.",
    whyItMatters:
      "Clients who leave every meeting feeling pleased but leave every decision ambiguous create delivery systems that fail users. The friction that was avoided in client conversations shows up as product friction for the people who use what you built.",
    doThis:
      "The next time you are in a client meeting, allow a 10-second pause after a client states a requirement — and use that pause to ask one clarifying question before moving on.",
  },
};

// ─── Balanced Archetype ──────────────────────────────────────────────────────
// Used when no single dimension exceeds 40% (near-uniform distribution)

export const BALANCED_ARCHETYPE: ArchetypeDefinition = {
  name: "The Diplomatic Navigator",
  narrative:
    "Your decisions are distributed across all four friction dimensions without a dominant pattern. This is not a neutral position — it is its own behavioral signature. Avoiding extremes can mean avoiding necessary confrontation, and balance in ambiguous situations sometimes signals that no clear judgment was made.",
  whatYouDo:
    "You distribute your responses across all friction types rather than developing a clear pattern, which can reflect genuine situational judgment or can reflect an avoidance of committing to any single direction.",
  whyItMatters:
    "In B2B software teams, ambiguity is rarely resolved by balanced responses — it is resolved by someone having a clear point of view and defending it. A pattern of balance can leave teams without a center of gravity when decisions get difficult.",
  doThis:
    "In your next ambiguous situation, before responding, ask yourself: if I had to pick one position and defend it, what would it be? Then say that, rather than acknowledging all perspectives equally.",
};

// ─── Tiebreak Order ──────────────────────────────────────────────────────────
// When two dimensions are equal, prefer the earlier dimension in this order.
// conflict_avoidance first because it is the hardest behavioral change to surface.

export const DIMENSION_TIEBREAK_ORDER: FrictionDimension[] = [
  "conflict_avoidance",
  "knowledge_gap",
  "internal_bureaucracy",
  "client_friction",
];
