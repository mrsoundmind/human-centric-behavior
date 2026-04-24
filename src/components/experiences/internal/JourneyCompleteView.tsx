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
import { ArrowRight, Target, MessageSquare, ListChecks, AlertTriangle, Eye, Zap, Activity, FileText, HelpCircle, Shield, Quote, CheckCircle2, Sparkles } from "lucide-react";
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

// ─── Dimension visual mapping (theme-aware via CSS vars) ─────────────────────

const DIM_THEME: Record<FrictionDimension, { dot: string; bar: string; tint: string }> = {
  client_friction:      { dot: "bg-primary",            bar: "bg-primary",            tint: "bg-primary/10" },
  internal_bureaucracy: { dot: "bg-amber-500",          bar: "bg-amber-500",          tint: "bg-amber-500/10" },
  knowledge_gap:        { dot: "bg-accent",             bar: "bg-accent",             tint: "bg-accent/10" },
  conflict_avoidance:   { dot: "bg-destructive",        bar: "bg-destructive",        tint: "bg-destructive/10" },
};

// ─── Dimension Bar Component ────────────────────────────────────────────────

const DimensionBar = ({ dimension, value, isDominant = false }: { dimension: FrictionDimension; value: number; isDominant?: boolean }) => {
  const config = FRICTION_CONFIG[dimension];
  const theme = DIM_THEME[dimension];
  const pct = Math.round(value * 100);
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-3">
      <div className="flex items-center gap-2 w-44 shrink-0">
        <span className={`w-2 h-2 rounded-full ${theme.dot}`} />
        <span className={`text-[13px] ${isDominant ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
          {config.label}
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${theme.bar}`}
        />
      </div>
      <span className={`text-xs font-mono tabular-nums w-10 text-right ${isDominant ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
        {pct}%
      </span>
    </div>
  );
};

// ─── Phase Breakdown Section ────────────────────────────────────────────────

const PhaseBreakdown = ({ phases, dominantDim }: { phases: PhaseScore[]; dominantDim: FrictionDimension }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.4 }}
    className="space-y-5"
  >
    <div className="flex items-baseline justify-between">
      <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
        Where Your Pattern Is Strongest
      </span>
      <span className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-widest">
        Dimension intensity per phase
      </span>
    </div>

    <div className="grid gap-4">
      {phases.map((ps, i) => (
        <div
          key={ps.phase}
          className="bg-card border border-border rounded-2xl p-5 hover:border-primary/30 transition-colors"
        >
          <div className="flex items-center gap-3 mb-4 pb-3 border-b border-border">
            <span className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center text-[11px] font-mono font-bold text-primary tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h4 className="text-sm font-bold text-foreground tracking-tight">
              {PHASE_LABELS[ps.phase] ?? ps.phase}
            </h4>
          </div>
          <div className="space-y-2.5">
            {(Object.entries(ps.dimensions) as [FrictionDimension, number][])
              .sort(([, a], [, b]) => b - a)
              .map(([dim, val]) => (
                <DimensionBar key={dim} dimension={dim} value={val} isDominant={dim === dominantDim} />
              ))}
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

// ─── Archetype Glyph (driven by dominant friction dimension) ─────────────────

const ARCHETYPE_GLYPH: Record<FrictionDimension, typeof Eye> = {
  client_friction: MessageSquare,
  internal_bureaucracy: FileText,
  knowledge_gap: HelpCircle,
  conflict_avoidance: Shield,
};

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

      <div className="max-w-4xl mx-auto px-6 py-20 relative z-10 space-y-12">
        {/* ── Archetype Hero ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-[auto_1fr] gap-8 items-start"
        >
          {/* Glyph */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-3xl blur-2xl opacity-30" />
            <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
              {(() => {
                const Glyph = ARCHETYPE_GLYPH[profile.dominantDimension];
                return <Glyph className="w-12 h-12 md:w-14 md:h-14 text-white" strokeWidth={1.5} />;
              })()}
            </div>
          </div>

          {/* Title block */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-mono text-primary uppercase tracking-[0.25em] font-semibold">
                Your Behavioral Pattern
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                {profile.archetypeName}
              </span>
            </h1>
            <p className="text-foreground/80 leading-relaxed text-lg max-w-2xl">
              {profile.narrative}
            </p>
          </div>
        </motion.div>

        {/* ── Pattern signal stats ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
        >
          {(() => {
            const overall = profile.phaseBreakdown.reduce(
              (acc, ph) => acc + (ph.dimensions[profile.dominantDimension] ?? 0),
              0
            );
            const intensity = Math.round((overall / Math.max(profile.phaseBreakdown.length, 1)) * 100);
            const stats = [
              { label: "Decisions Analyzed", value: decisions.length, icon: Activity },
              { label: "Dominant Friction", value: FRICTION_CONFIG[profile.dominantDimension].label, icon: Zap },
              { label: "Pattern Intensity", value: `${intensity}%`, icon: Eye },
            ];
            return stats.map((s, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-xl p-4 flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <s.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mb-1">
                    {s.label}
                  </div>
                  <div className="text-base font-bold text-foreground truncate" title={String(s.value)}>
                    {s.value}
                  </div>
                </div>
              </div>
            ));
          })()}
        </motion.div>

        {/* ── What You Do / Why It Matters — 2-col, distinct framing ─ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="grid md:grid-cols-2 gap-4"
        >
          {/* What You Do — neutral observational tone */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-3 hover:border-primary/30 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <Eye className="w-4 h-4 text-primary" />
              </div>
              <span className="text-[11px] font-mono text-primary uppercase tracking-widest font-semibold">
                What You Do
              </span>
            </div>
            <p className="text-foreground/85 leading-relaxed text-[15px]">
              {profile.whatYouDo}
            </p>
          </div>

          {/* Why It Matters — consequence framing, accent tint */}
          <div className="bg-accent/5 border border-accent/20 rounded-2xl p-6 space-y-3 hover:border-accent/40 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-accent/15 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-accent" />
              </div>
              <span className="text-[11px] font-mono text-accent uppercase tracking-widest font-semibold">
                Why It Matters
              </span>
            </div>
            <p className="text-foreground/85 leading-relaxed text-[15px]">
              {profile.whyItMatters}
            </p>
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
        <PhaseBreakdown phases={profile.phaseBreakdown} dominantDim={profile.dominantDimension} />

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

        {/* Role-Specific Content — Playbook Bento (Phase 3 roles only) */}
        {roleContent && (
          <>
            {/* Section divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="flex items-center gap-4 pt-4"
            >
              <span className="text-[10px] font-mono text-primary uppercase tracking-[0.25em] font-semibold">
                Your Playbook
              </span>
              <span className="flex-1 h-px bg-gradient-to-r from-primary/30 via-border to-transparent" />
            </motion.div>

            {/* Paradigm Shift — premium quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="relative bg-gradient-to-br from-card to-primary/5 border border-border rounded-2xl p-8 md:p-10 overflow-hidden"
            >
              <Quote className="absolute top-6 left-6 w-10 h-10 text-primary/15" strokeWidth={1.5} />
              <p className="relative text-lg md:text-xl text-foreground/90 italic leading-relaxed font-light pl-12">
                {roleContent.paradigmShift}
              </p>
            </motion.div>

            {/* ── THE COMMITMENT — 3-card bento with big numerals ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="space-y-5"
            >
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <Target className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">The Commitment</h3>
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-0.5">
                      Concrete actions for this week
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {roleContent.commitments.map((c, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.85 + i * 0.07 }}
                    className="group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all overflow-hidden"
                  >
                    {/* Big watermark numeral */}
                    <span
                      aria-hidden
                      className="absolute -top-2 -right-1 text-[88px] font-black leading-none text-primary/[0.06] select-none pointer-events-none tabular-nums"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Index pill */}
                    <div className="relative flex items-center gap-2 mb-4">
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-[10px] font-mono font-bold text-primary uppercase tracking-widest">
                        Action {String(i + 1).padStart(2, "0")}
                      </span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-primary/40" strokeWidth={2} />
                    </div>

                    <h4 className="relative text-base font-bold text-foreground mb-2 leading-snug">
                      {c.label}
                    </h4>
                    <p className="relative text-[13px] text-muted-foreground leading-relaxed">
                      {c.action}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── THE WORDBOOK — speech-bubble dialogue cards ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 }}
              className="space-y-5"
            >
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">The Wordbook</h3>
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-0.5">
                      How to say it in the room
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roleContent.scripts.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 + i * 0.08 }}
                    className="group relative bg-card border border-border rounded-2xl p-6 hover:border-accent/40 transition-all"
                  >
                    {/* Trigger header */}
                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-1 h-4 rounded-full bg-accent" />
                      <span className="text-[10px] font-mono text-accent uppercase tracking-[0.2em] font-semibold">
                        {s.trigger}
                      </span>
                    </div>

                    {/* Speech bubble */}
                    <div className="relative bg-gradient-to-br from-accent/5 to-primary/5 border border-accent/15 rounded-2xl rounded-tl-sm p-5">
                      <Quote className="absolute -top-2 -left-2 w-5 h-5 text-accent/60 bg-card rounded-full p-0.5" strokeWidth={2} />
                      <p className="text-[14px] text-foreground/90 italic leading-relaxed">
                        {s.line}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── THE DAILY RUBRIC — question cards ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="space-y-5"
            >
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                    <ListChecks className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold tracking-tight">The Daily Rubric</h3>
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest mt-0.5">
                      Three questions to ask yourself
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {roleContent.rubric.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.15 + i * 0.06 }}
                    className="group relative bg-card border border-border rounded-2xl p-6 hover:border-amber-500/30 transition-all overflow-hidden"
                  >
                    {/* Big question mark */}
                    <span
                      aria-hidden
                      className="absolute -top-3 -right-1 text-[88px] font-black leading-none text-amber-500/[0.07] select-none pointer-events-none"
                    >
                      ?
                    </span>

                    <div className="relative flex items-center gap-2 mb-4">
                      <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" strokeWidth={2} />
                      <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                        Q{i + 1}
                      </span>
                    </div>

                    <p className="relative text-[15px] text-foreground/90 leading-relaxed font-medium">
                      {r}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* ── RISK ASSESSMENT — full-width footer card ─── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.25 }}
              className="relative bg-gradient-to-br from-destructive/5 to-accent/5 border border-destructive/20 rounded-2xl p-6 md:p-8 overflow-hidden"
            >
              <Sparkles className="absolute top-6 right-6 w-5 h-5 text-destructive/30" />
              <div className="grid md:grid-cols-[auto_1fr] gap-5 items-start">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 border border-destructive/30 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-destructive uppercase tracking-[0.25em] font-bold block mb-2">
                    The Cost of Not Doing This
                  </span>
                  <p className="text-[15px] text-foreground/85 leading-relaxed">
                    {roleContent.cost}
                  </p>
                </div>
              </div>
            </motion.div>
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
