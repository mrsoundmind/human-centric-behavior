/**
 * JourneyCompleteView — completion screen for Full SDLC role journeys.
 *
 * Renders the behavioral archetype profile from computeProfile() output:
 * - Archetype name and narrative (NO numeric scores)
 * - Phase breakdown as dimension bars
 * - Behavioral shifts between phases
 * - Tomorrow's Action (amber highlight)
 * - Role-specific commitments, scripts, rubric (extends RoleMasterclassComplete pattern)
 * - canvas-confetti celebration on mount
 */

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { ArrowRight, Target, MessageSquare, ListChecks, AlertTriangle } from "lucide-react";
import { useDesignationStore } from "../../../state/designation-store";
import { computeProfile } from "../../../../data/scoring-engine";
import { FRICTION_CONFIG } from "./designation-portal/friction-config";
import { CrossRoleImpactView } from "./designation-portal/CrossRoleImpactView";
import type { Designation, FrictionDimension, DecisionRecord } from "../../../../data/scenarios/types";
import type { ScoringProfile, PhaseScore } from "../../../../data/scoring-engine";

// ─── Props ──────────────────────────────────────────────────────────────────

interface JourneyCompleteViewProps {
  role: Designation;
  onReturnHome: () => void;
}

// ─── Phase Label Mapping ────────────────────────────────────────────────────

const PHASE_LABELS: Record<string, string> = {
  discovery: "Discovery",
  requirements: "Requirements",
  design: "Design",
  development: "Development",
  testing: "Testing",
  launch: "Launch",
  maintenance: "Maintenance",
};

// ─── Role Completion Content (PM, Developer, QA only — Phase 3 roles) ──────

interface RoleCompletionContent {
  paradigmShift: string;
  commitments: { label: string; action: string }[];
  scripts: { trigger: string; line: string }[];
  rubric: string[];
  cost: string;
}

const ROLE_COMPLETION_CONTENT: Partial<Record<Designation, RoleCompletionContent>> = {
  pm: {
    paradigmShift:
      "You ran three user experiences simultaneously — the developer's experience, the stakeholder's roadmap, and the end user's product. Your decisions in each SDLC phase revealed where you absorb friction and where you create it.",
    commitments: [
      {
        label: "Surface one ambiguity this sprint",
        action:
          "Find the requirement in your current sprint that everyone interprets differently. Write two concrete versions and get alignment before the next standup.",
      },
      {
        label: "Name the friction you're absorbing",
        action:
          "Identify one stakeholder expectation you accepted without pushback. Write down what it will cost the team and have the conversation this week.",
      },
      {
        label: "Reframe one ticket as a user job",
        action:
          "Pick a ticket. Rewrite it: 'When [user context], [user wants to] [outcome]. We know this because [evidence].' Share it with the team.",
      },
    ],
    scripts: [
      {
        trigger: "When a requirement is vague",
        line:
          "\"I read this two ways — if it means A, we ship X. If it means B, we ship Y. Which interpretation fits what you had in mind?\"",
      },
      {
        trigger: "When absorbing scope silently",
        line:
          "\"I can add this — but I want to name what it displaces. If we add [X], we delay [Y] by [Z]. Which trade-off do you prefer?\"",
      },
    ],
    rubric: [
      "Did I surface ambiguity today — or absorb it?",
      "Does my team know why what they're building matters to a real user?",
      "What decision is coming in 2 weeks that I should prepare for today?",
    ],
    cost: "PMs who manage lists instead of designing experiences build products that technically ship and experientially miss. The rework compounds silently.",
  },

  developer: {
    paradigmShift:
      "Every technical decision you made was a UX decision made on behalf of someone you'll never meet. Your journey through Discovery, Requirements, and Design revealed where you absorb unclear specs and where you surface them.",
    commitments: [
      {
        label: "Add a UX note to your next PR",
        action:
          "In your next PR, add: 'UX note: this interaction performs as X on mid-range devices. Tested on [device].' Make the invisible visible.",
      },
      {
        label: "Surface one spec gap before building",
        action:
          "Before starting your next feature, identify one assumption in the spec that you'd normally just guess. Ask the PM or BA to confirm before writing code.",
      },
      {
        label: "Write a one-paragraph risk brief",
        action:
          "Document a technical issue you've been deferring: what breaks, when it breaks at scale, and what it costs to fix now vs. later.",
      },
    ],
    scripts: [
      {
        trigger: "When a spec has performance costs",
        line:
          "\"This works — but it lags 400ms on mid-range devices. I can ship as-is, or propose an alternative that keeps the experience snappy. Which direction?\"",
      },
      {
        trigger: "When absorbing unclear requirements",
        line:
          "\"I can interpret this two ways and I'd rather ask than guess. If it means A, I build X. If it means B, I build Y. Which is it?\"",
      },
    ],
    rubric: [
      "Who experiences the consequence of this technical decision?",
      "Am I absorbing a spec gap silently to move faster — and at whose eventual cost?",
      "Is the thing I'm building today getting harder to fix as we scale?",
    ],
    cost: "Systems built without surfacing UX implications pass code review and fail users. Invisible decisions compound into adoption problems nobody can trace back to a PR.",
  },

  qa: {
    paradigmShift:
      "You're the last structured moment before the user arrives. Your journey revealed where you test what the spec says versus what the user experiences — and the cost of each choice across the SDLC.",
    commitments: [
      {
        label: "Add user impact to your bug triage",
        action:
          "In your bug list, add a column: 'User impact at what moment in the journey?' Sort by that, not just severity category. Watch the top change.",
      },
      {
        label: "Test one complete user flow",
        action:
          "Instead of testing a feature, trace the complete user journey from entry to completion. Note every point where a user would hesitate or abandon.",
      },
      {
        label: "Rewrite one bug report as a user story",
        action:
          "When logging a regression, write: '[User action] → [What happens] → [User feels/does what].' This format gets bugs fixed faster.",
      },
    ],
    scripts: [
      {
        trigger: "When communicating a UX issue",
        line:
          "\"The button shifts behind the keyboard on mobile. That's a high-stakes moment where users abandon. It's not cosmetic, it's conversion.\"",
      },
      {
        trigger: "When under release pressure",
        line:
          "\"I can approve this. I want to flag one UX issue: [X] affects users during [critical action]. Can we get 4 hours for a targeted fix?\"",
      },
    ],
    rubric: [
      "Am I testing what works — or what the user experiences?",
      "Is this bug a technical failure or a user failure?",
      "Would I be comfortable if the first user to hit this was our most important client?",
    ],
    cost: "QA teams measured by test coverage miss the experience. Release adoption problems are almost always a QA process that never saw the user journey.",
  },

  sales: {
    paradigmShift:
      "You bridged the gap between what clients want to hear and what delivery teams can build. Your journey revealed where you absorb pricing pressure, where you create scope ambiguity, and where your promises become another team's constraints.",
    commitments: [
      {
        label: "Verify one technical claim this week",
        action:
          "Pick a feature you promised in a recent demo. Confirm with the technical lead that it works exactly as you described. Document any gaps.",
      },
      {
        label: "Add scope boundaries to your next proposal",
        action:
          "In your next SoW, define what 'standard' means for each feature — not what it includes, but what it excludes.",
      },
      {
        label: "Share one client constraint with delivery",
        action:
          "Identify a non-negotiable client expectation you haven't communicated to the PM. Write it down and send it today.",
      },
    ],
    scripts: [
      {
        trigger: "When asked to discount beyond margin",
        line:
          "\"I can adjust the price — but I want to be transparent about what changes. At this price point, we'd need to [specific scope reduction]. Which approach works better for your timeline?\"",
      },
      {
        trigger: "When promising a feature you're unsure about",
        line:
          "\"I believe we can do this — let me confirm the exact scope with our technical team and get back to you by [specific date] with a written confirmation.\"",
      },
    ],
    rubric: [
      "Did I verify a technical claim before making it to a client today?",
      "Does the delivery team know about every commitment I've made this week?",
      "What promise am I about to make that I haven't confirmed with engineering?",
    ],
    cost: "Sales teams that close deals without verified technical scope create delivery teams that spend their first sprint managing expectations instead of building. The gap between what was sold and what was scoped is the most expensive line item that never appears in a budget.",
  },

  designer: {
    paradigmShift:
      "Every pixel you placed was a decision made on behalf of a developer who must build it, a QA who must test it, and a user who must navigate it. Your journey revealed where you absorb ambiguity from stakeholders and where you create it for engineers.",
    commitments: [
      {
        label: "Add interaction notes to your next handoff",
        action:
          "In your next Figma handoff, annotate every interactive element with: trigger, animation, duration, and edge case behavior.",
      },
      {
        label: "Ask for user context before designing",
        action:
          "Before starting your next design task, ask: 'Who uses this, in what context, and what happens if they fail?' Block design until you have answers.",
      },
      {
        label: "Present evidence for one design decision",
        action:
          "Pick one design decision you made this week based on preference. Find or create evidence (usage data, pattern research, or user feedback) to support or revise it.",
      },
    ],
    scripts: [
      {
        trigger: "When a stakeholder requests a known anti-pattern",
        line:
          "\"I understand the preference — here's data from [comparable project] showing this pattern increased user drop-off by [X%]. Can I show you an alternative that achieves the same goal?\"",
      },
      {
        trigger: "When a developer says implementation is too expensive",
        line:
          "\"Let's look at this together. Here are three versions — full, reduced, and minimal. What's the effort difference? I want to make a trade-off decision, not just cut features.\"",
      },
    ],
    rubric: [
      "Did I hand off interaction details — or just a static screenshot?",
      "Am I designing based on evidence or preference today?",
      "What design decision did I make this week that a developer will misinterpret?",
    ],
    cost: "Designers who hand off static screens without interaction context create developers who guess. Every guess is a coin flip between the intended experience and a usability bug that won't surface until QA — or worse, until the user.",
  },

  ba: {
    paradigmShift:
      "You stood between stakeholders who speak in outcomes and developers who build in specifics. Your journey revealed where you translate faithfully, where you absorb contradictions silently, and where your documentation becomes the single point of failure for the entire delivery chain.",
    commitments: [
      {
        label: "Flag one contradiction this sprint",
        action:
          "Find a requirement where two stakeholders would interpret it differently. Document both interpretations and schedule a 15-minute alignment call before the sprint starts.",
      },
      {
        label: "Add acceptance criteria to your next requirement",
        action:
          "Pick a requirement you wrote this week. Add: 'This is done when [specific observable behavior]. This is NOT done if [specific failure case].'",
      },
      {
        label: "Trace one requirement to its source",
        action:
          "For your most ambiguous current requirement, trace it back to the stakeholder who requested it and confirm your interpretation matches their intent.",
      },
    ],
    scripts: [
      {
        trigger: "When stakeholders have contradictory requirements",
        line:
          "\"I've documented both positions. They can't both be built — here's what each costs and what each excludes. Can we align on one direction before I write the spec?\"",
      },
      {
        trigger: "When a developer says the requirement is vague",
        line:
          "\"You're right — let me get the stakeholder on a call with us. I'd rather clarify now than have you guess and rework later.\"",
      },
    ],
    rubric: [
      "Did I flag a contradiction today — or absorb it into the spec?",
      "Could a new developer understand this requirement without asking me?",
      "What assumption in my requirements document has never been validated with the client?",
    ],
    cost: "BAs who absorb contradictions produce specifications that are technically complete and practically ambiguous. The gap between what was written and what was meant is the single largest source of rework in enterprise delivery — and it's invisible until development starts.",
  },

  crm: {
    paradigmShift:
      "You held the relationship while the product team held the roadmap. Your journey revealed where you absorb client frustration silently, where you over-promise to preserve the relationship, and where the gap between your narrative and reality becomes a renewal risk.",
    commitments: [
      {
        label: "Log one client friction point this week",
        action:
          "In your next client interaction, ask: 'What's the one thing about our product that slows your team down?' Document the answer in your account notes — not just the ticket system.",
      },
      {
        label: "Share one account health truth with leadership",
        action:
          "Identify one account where your internal narrative is more optimistic than reality. Write a one-paragraph honest assessment and share it with your manager this week.",
      },
      {
        label: "Prepare one data-backed QBR slide",
        action:
          "In your next QBR deck, add one slide showing actual usage data alongside the client's stated satisfaction. Note any gaps.",
      },
    ],
    scripts: [
      {
        trigger: "When a client reports product friction",
        line:
          "\"I hear you — that friction is real. Let me document this with our product team and get you a timeline for resolution. I'll follow up by [specific date].\"",
      },
      {
        trigger: "When tempted to smooth over an issue",
        line:
          "\"I want to be transparent: we missed [specific thing]. Here's our plan to fix it by [date]. I'd rather you hear it from me now than discover it later.\"",
      },
    ],
    rubric: [
      "Does my leadership know the real health of my accounts — or my optimistic version?",
      "Did I document a client friction point today — or just empathize and move on?",
      "What client expectation am I managing with words instead of action?",
    ],
    cost: "CRMs who smooth over friction with empathy instead of action create a gap between the client's experience and the company's awareness. By the time the gap surfaces — at renewal — the damage is already priced into the client's decision.",
  },

  strategy: {
    paradigmShift:
      "You set the direction that every team followed. Your journey revealed where your strategic assumptions went unvalidated, where your reports omitted inconvenient truths, and where the gap between your confidence and your evidence became the foundation for months of misaligned work.",
    commitments: [
      {
        label: "Tag one assumption as unvalidated",
        action:
          "In your current strategy document, find one assumption you've stated as fact. Add a tag: 'Unvalidated — validation plan: [specific next step].'",
      },
      {
        label: "Present one inconvenient finding",
        action:
          "Identify one data point that contradicts your current strategic narrative. Present it to your team this week with a recommended response.",
      },
      {
        label: "Check one commitment conflict",
        action:
          "Review your strategic direction against existing client commitments. Flag any conflict and propose a resolution before the next leadership meeting.",
      },
    ],
    scripts: [
      {
        trigger: "When pressured to present without evidence",
        line:
          "\"I can present our hypothesis today — but I want to flag that it's based on [market assumption], not user data. If we commit resources, I'd recommend a 2-week validation sprint first.\"",
      },
      {
        trigger: "When data contradicts the strategy",
        line:
          "\"The data shows our assumption about [X] was wrong. Here are two options: pivot now (cost: [Y]) or persist with a revised timeline. Waiting costs [Z] per month.\"",
      },
    ],
    rubric: [
      "Is my strategic recommendation based on evidence or authority?",
      "What inconvenient truth am I omitting from my current report?",
      "How much engineering work is currently running on assumptions I haven't validated?",
    ],
    cost: "Strategy teams that present assumptions as facts and omit inconvenient data create organizations that invest months of engineering effort in directions validated only by confidence. The correction cost compounds with every sprint that builds on the unvalidated premise.",
  },
};

// ─── Role Display Names ─────────────────────────────────────────────────────

const ROLE_DISPLAY: Record<Designation, string> = {
  sales: "Sales",
  pm: "Product Manager",
  developer: "Developer",
  qa: "QA",
  designer: "Designer",
  ba: "Business Analyst",
  crm: "CRM",
  strategy: "Strategy",
};

// ─── Compound Insight Builder ───────────────────────────────────────────────

function buildCompoundInsight(
  currentRole: Designation,
  currentProfile: ScoringProfile,
  allCompletedRoles: Designation[],
  getDecisionsForRole: (role: Designation) => DecisionRecord[]
): string | null {
  // Filter out current role from completed roles
  const previousRoles = allCompletedRoles.filter(r => r !== currentRole);
  if (previousRoles.length === 0) return null;

  // Build journey arc: compute profile for each previous role
  const arcEntries: { role: Designation; archetype: string; archetypeBaseKey: string; dimension: string }[] = [];
  for (const prevRole of previousRoles) {
    const prevDecisions = getDecisionsForRole(prevRole);
    const prevResult = computeProfile(prevDecisions);
    if (prevResult.status === "complete") {
      arcEntries.push({
        role: prevRole,
        archetype: prevResult.profile.archetypeName,
        archetypeBaseKey: prevResult.profile.archetypeBaseKey,
        dimension: FRICTION_CONFIG[prevResult.profile.dominantDimension].label.toLowerCase(),
      });
    }
  }
  if (arcEntries.length === 0) return null;

  // Add current role to the arc
  arcEntries.push({
    role: currentRole,
    archetype: currentProfile.archetypeName,
    archetypeBaseKey: currentProfile.archetypeBaseKey,
    dimension: FRICTION_CONFIG[currentProfile.dominantDimension].label.toLowerCase(),
  });

  // For 2 roles: same as before (compare)
  if (arcEntries.length === 2) {
    const prev = arcEntries[0];
    const curr = arcEntries[1];
    const samePattern = prev.archetypeBaseKey === curr.archetypeBaseKey;
    if (samePattern) {
      return `As a ${ROLE_DISPLAY[prev.role]}, you were a ${prev.archetype}. As a ${ROLE_DISPLAY[curr.role]}, you remained a ${curr.archetype}. This pattern holds across roles — your default response to friction is consistent regardless of your position in the delivery chain.`;
    }
    return `As a ${ROLE_DISPLAY[prev.role]}, you were a ${prev.archetype}. As a ${ROLE_DISPLAY[curr.role]}, you became a ${curr.archetype}. Your pattern shifted from ${prev.dimension} to ${curr.dimension} when you changed roles.`;
  }

  // For 3+ roles: journey arc narrative
  const arcDescription = arcEntries
    .map(e => `${ROLE_DISPLAY[e.role]} (${e.archetype})`)
    .join(" → ");

  const uniqueArchetypes = new Set(arcEntries.map(e => e.archetypeBaseKey));
  const patternObservation = uniqueArchetypes.size === 1
    ? "Your friction pattern is remarkably consistent across all roles — your default response doesn't change with perspective."
    : uniqueArchetypes.size === arcEntries.length
    ? "Each role revealed a different friction pattern — your behavior adapts significantly based on your position in the delivery chain."
    : "Your journey arc shows both consistency and adaptation — some patterns hold while others shift with role context.";

  return `Your journey arc: ${arcDescription}. ${patternObservation}`;
}

// ─── Dimension Bar Component ────────────────────────────────────────────────

const DimensionBar = ({ dimension, value }: { dimension: FrictionDimension; value: number }) => {
  const config = FRICTION_CONFIG[dimension];
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground w-36 shrink-0">{config.label}</span>
      <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value * 100}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${config.className.split(" ").find((c) => c.startsWith("bg-")) ?? "bg-muted-foreground/70"}`}
        />
      </div>
    </div>
  );
};

// ─── Phase Breakdown Section ────────────────────────────────────────────────

const PhaseBreakdown = ({ phases }: { phases: PhaseScore[] }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="bg-card border border-border rounded-2xl p-6 space-y-6"
  >
    <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
      Where Your Pattern Is Strongest
    </span>
    {phases.map((ps) => (
      <div key={ps.phase} className="space-y-2">
        <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
          {PHASE_LABELS[ps.phase] ?? ps.phase}
        </span>
        <div className="space-y-1.5">
          {(Object.entries(ps.dimensions) as [FrictionDimension, number][]).map(([dim, val]) => (
            <DimensionBar key={dim} dimension={dim} value={val} />
          ))}
        </div>
      </div>
    ))}
  </motion.div>
);

// ─── Component ──────────────────────────────────────────────────────────────

export const JourneyCompleteView = ({ role, onReturnHome }: JourneyCompleteViewProps) => {
  const decisions = useDesignationStore((s) => s.roles[role]?.decisions ?? []);
  const completedRoles = useDesignationStore((s) => s.completedRoles);
  const profileResult = useMemo(() => computeProfile(decisions), [decisions]);

  // Compound insight for multi-role completions
  const compoundInsight = useMemo(() => {
    if (completedRoles.length < 2 || profileResult.status !== "complete") return null;
    return buildCompoundInsight(
      role,
      profileResult.profile,
      completedRoles,
      (r: Designation) => {
        const store = useDesignationStore.getState();
        return store.roles[r]?.decisions ?? [];
      }
    );
  }, [completedRoles, role, profileResult]);

  // Fire confetti once on mount
  useEffect(() => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#f59e0b", "#d97706", "#fbbf24"],
      disableForReducedMotion: true,
    });
  }, []);

  // Insufficient data guard
  if (profileResult.status === "insufficient_data") {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">
            Behavioral Profile
          </p>
          <h2 className="text-2xl font-bold mb-4">
            Complete more scenarios to see your behavioral profile
          </h2>
          <p className="text-muted-foreground mb-8">
            We need at least 3 decisions to identify your pattern. You've made{" "}
            {profileResult.decisionCount} so far.
          </p>
          <button
            onClick={onReturnHome}
            className="px-6 py-3 rounded-full border border-border hover:border-primary/40 text-sm text-muted-foreground hover:text-foreground transition-all"
          >
            Return Home
          </button>
        </motion.div>
      </div>
    );
  }

  const profile: ScoringProfile = profileResult.profile;
  const roleContent = ROLE_COMPLETION_CONTENT[role];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30 overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] rounded-full bg-primary/5 blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-20 relative z-10 space-y-10">
        {/* Archetype Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
            Your Behavioral Pattern
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">{profile.archetypeName}</h1>
          <p className="text-muted-foreground leading-relaxed text-lg">{profile.narrative}</p>

          <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
            <div>
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-2">
                What You Do
              </span>
              <p className="text-muted-foreground leading-relaxed">{profile.whatYouDo}</p>
            </div>
            <div>
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-2">
                Why It Matters
              </span>
              <p className="text-muted-foreground leading-relaxed">{profile.whyItMatters}</p>
            </div>
          </div>
        </motion.div>

        {/* Compound Insight (multi-role) */}
        {compoundInsight && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest block mb-3">
              Cross-Role Pattern
            </span>
            <div className="bg-card border border-border rounded-2xl p-6">
              <p className="text-muted-foreground leading-relaxed italic">{compoundInsight}</p>
            </div>
          </motion.div>
        )}

        {/* Phase Breakdown */}
        <PhaseBreakdown phases={profile.phaseBreakdown} />

        {/* Behavioral Shifts */}
        {profile.shifts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card border border-border rounded-2xl p-6 space-y-3"
          >
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
              How Your Pattern Shifted
            </span>
            {profile.shifts.map((shift, i) => (
              <p key={i} className="text-muted-foreground italic leading-relaxed">
                Your pattern shifted from{" "}
                <span className="text-foreground">{FRICTION_CONFIG[shift.fromDimension].label}</span>{" "}
                in {PHASE_LABELS[shift.fromPhase] ?? shift.fromPhase} to{" "}
                <span className="text-foreground">{FRICTION_CONFIG[shift.toDimension].label}</span>{" "}
                in {PHASE_LABELS[shift.toPhase] ?? shift.toPhase}.
              </p>
            ))}
          </motion.div>
        )}

        {/* Tomorrow's Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-primary/10 border border-primary/40 rounded-2xl p-6"
        >
          <span className="text-xs font-mono text-primary uppercase tracking-widest mb-2 block">
            Tomorrow's Action
          </span>
          <p className="text-foreground leading-relaxed">{profile.doThis}</p>
        </motion.div>

        {/* Cross-Role Impact */}
        <CrossRoleImpactView decisions={decisions} />

        {/* Role-Specific Content (only for Phase 3 roles) */}
        {roleContent && (
          <>
            {/* Paradigm Shift */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-card border border-border rounded-2xl p-8"
            >
              <p className="text-lg text-muted-foreground italic leading-relaxed font-light">
                {roleContent.paradigmShift}
              </p>
            </motion.div>

            {/* Strategy Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Commitments */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-card border border-border rounded-2xl p-8 flex flex-col"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/40 flex items-center justify-center mb-6">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-1 italic">The Commitment</h3>
                <p className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-8">
                  Concrete actions for this week
                </p>
                <div className="space-y-6 flex-1">
                  {roleContent.commitments.map((c, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-primary/50">0{i + 1}</span>
                        <h4 className="text-sm font-bold text-foreground">{c.label}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed pl-6 border-l border-border">
                        {c.action}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Scripts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-card border border-border rounded-2xl p-8 flex flex-col"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/40 flex items-center justify-center mb-6">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-1 italic">The Wordbook</h3>
                <p className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-8">
                  How to say it in the room
                </p>
                <div className="space-y-8">
                  {roleContent.scripts.map((s, i) => (
                    <div key={i}>
                      <p className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-[0.2em] mb-2">
                        {s.trigger}
                      </p>
                      <div className="bg-muted border border-border p-4 rounded-xl relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-20" />
                        <p className="text-sm text-muted-foreground italic leading-relaxed pl-2">
                          {s.line}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Rubric */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="bg-card border border-border rounded-2xl p-8 flex flex-col"
              >
                <div className="w-10 h-10 rounded-xl bg-destructive/10 border border-destructive/40 flex items-center justify-center mb-6">
                  <ListChecks className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="text-xl font-bold mb-1 italic">The Daily Rubric</h3>
                <p className="text-xs text-muted-foreground/70 uppercase tracking-widest font-mono mb-8">
                  Shift your default perspective
                </p>
                <div className="space-y-4 flex-1">
                  {roleContent.rubric.map((r, i) => (
                    <div
                      key={i}
                      className="flex gap-3 items-start bg-muted p-4 rounded-xl border border-border"
                    >
                      <div className="w-5 h-5 rounded-full bg-muted text-[10px] flex items-center justify-center font-mono text-muted-foreground shrink-0">
                        0{i + 1}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{r}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-6 rounded-xl bg-destructive/5 border border-destructive/10">
                  <div className="flex items-center gap-2 text-destructive mb-2">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold">
                      Risk Assessment
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{roleContent.cost}</p>
                </div>
              </motion.div>
            </div>
          </>
        )}

        {/* Navigation Options */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col gap-4 items-center pt-8"
        >
          <button
            onClick={onReturnHome}
            className="px-8 py-4 bg-muted border border-border text-foreground rounded-lg font-medium text-lg hover:bg-muted/80 transition-all"
          >
            Explore Another Role
          </button>
          <button
            onClick={() => window.location.href = "/"}
            className="text-muted-foreground hover:text-foreground transition-colors text-sm font-mono tracking-widest uppercase"
          >
            Return to Main Experience
          </button>
        </motion.div>
      </div>
    </div>
  );
};
