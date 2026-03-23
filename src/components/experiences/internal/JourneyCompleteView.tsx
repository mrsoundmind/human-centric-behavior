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
import type { Designation, FrictionDimension } from "../../../../data/scenarios/types";
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
};

// ─── Dimension Bar Component ────────────────────────────────────────────────

const DimensionBar = ({ dimension, value }: { dimension: FrictionDimension; value: number }) => {
  const config = FRICTION_CONFIG[dimension];
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-500 w-36 shrink-0">{config.label}</span>
      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value * 100}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full rounded-full ${config.className.split(" ").find((c) => c.startsWith("bg-")) ?? "bg-white/30"}`}
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
    className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-6"
  >
    <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
      Where Your Pattern Is Strongest
    </span>
    {phases.map((ps) => (
      <div key={ps.phase} className="space-y-2">
        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
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
  const profileResult = useMemo(() => computeProfile(decisions), [decisions]);

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
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
            Behavioral Profile
          </p>
          <h2 className="text-2xl font-bold mb-4">
            Complete more scenarios to see your behavioral profile
          </h2>
          <p className="text-gray-400 mb-8">
            We need at least 3 decisions to identify your pattern. You've made{" "}
            {profileResult.decisionCount} so far.
          </p>
          <button
            onClick={onReturnHome}
            className="px-6 py-3 rounded-full border border-white/10 hover:border-white/30 text-sm text-white/70 hover:text-white transition-all"
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
    <div className="min-h-screen bg-black text-white selection:bg-amber-500/30 overflow-x-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[60vw] h-[60vw] rounded-full bg-amber-600/5 blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      <div className="max-w-3xl mx-auto px-6 py-20 relative z-10 space-y-10">
        {/* Archetype Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
            Your Behavioral Pattern
          </span>
          <h1 className="text-3xl md:text-4xl font-bold text-white">{profile.archetypeName}</h1>
          <p className="text-gray-300 leading-relaxed text-lg">{profile.narrative}</p>

          <div className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-4">
            <div>
              <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-2">
                What You Do
              </span>
              <p className="text-gray-400 leading-relaxed">{profile.whatYouDo}</p>
            </div>
            <div>
              <span className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-2">
                Why It Matters
              </span>
              <p className="text-gray-400 leading-relaxed">{profile.whyItMatters}</p>
            </div>
          </div>
        </motion.div>

        {/* Phase Breakdown */}
        <PhaseBreakdown phases={profile.phaseBreakdown} />

        {/* Behavioral Shifts */}
        {profile.shifts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-6 space-y-3"
          >
            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
              How Your Pattern Shifted
            </span>
            {profile.shifts.map((shift, i) => (
              <p key={i} className="text-gray-400 italic leading-relaxed">
                Your pattern shifted from{" "}
                <span className="text-white/80">{FRICTION_CONFIG[shift.fromDimension].label}</span>{" "}
                in {PHASE_LABELS[shift.fromPhase] ?? shift.fromPhase} to{" "}
                <span className="text-white/80">{FRICTION_CONFIG[shift.toDimension].label}</span>{" "}
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
          className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6"
        >
          <span className="text-xs font-mono text-amber-400/70 uppercase tracking-widest mb-2 block">
            Tomorrow's Action
          </span>
          <p className="text-amber-100 leading-relaxed">{profile.doThis}</p>
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
              className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8"
            >
              <p className="text-lg text-white/70 italic leading-relaxed font-light">
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
                className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 flex flex-col"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                  <Target className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-1 italic">The Commitment</h3>
                <p className="text-xs text-white/30 uppercase tracking-widest font-mono mb-8">
                  Concrete actions for this week
                </p>
                <div className="space-y-6 flex-1">
                  {roleContent.commitments.map((c, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-mono text-blue-400/50">0{i + 1}</span>
                        <h4 className="text-sm font-bold text-white">{c.label}</h4>
                      </div>
                      <p className="text-sm text-white/50 leading-relaxed pl-6 border-l border-white/5">
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
                className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 flex flex-col"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
                  <MessageSquare className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-1 italic">The Wordbook</h3>
                <p className="text-xs text-white/30 uppercase tracking-widest font-mono mb-8">
                  How to say it in the room
                </p>
                <div className="space-y-8">
                  {roleContent.scripts.map((s, i) => (
                    <div key={i}>
                      <p className="text-[10px] font-mono text-white/20 uppercase tracking-[0.2em] mb-2">
                        {s.trigger}
                      </p>
                      <div className="bg-white/[0.03] border border-white/5 p-4 rounded-xl relative">
                        <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 opacity-20" />
                        <p className="text-sm text-white/70 italic leading-relaxed pl-2">
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
                className="bg-white/[0.02] border border-white/[0.05] rounded-2xl p-8 flex flex-col"
              >
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mb-6">
                  <ListChecks className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold mb-1 italic">The Daily Rubric</h3>
                <p className="text-xs text-white/30 uppercase tracking-widest font-mono mb-8">
                  Shift your default perspective
                </p>
                <div className="space-y-4 flex-1">
                  {roleContent.rubric.map((r, i) => (
                    <div
                      key={i}
                      className="flex gap-3 items-start bg-white/[0.03] p-4 rounded-xl border border-white/5"
                    >
                      <div className="w-5 h-5 rounded-full bg-white/5 text-[10px] flex items-center justify-center font-mono text-white/30 shrink-0">
                        0{i + 1}
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed">{r}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 p-6 rounded-xl bg-red-500/5 border border-red-500/10">
                  <div className="flex items-center gap-2 text-red-400 mb-2">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold">
                      Risk Assessment
                    </span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed">{roleContent.cost}</p>
                </div>
              </motion.div>
            </div>
          </>
        )}

        {/* Return Home */}
        <div className="flex justify-center pt-8">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            onClick={onReturnHome}
            className="group flex items-center gap-4 py-4 px-10 rounded-full border border-white/10 hover:border-white/30 bg-white/[0.02] hover:bg-white/[0.05] transition-all"
          >
            <span className="text-xs font-mono uppercase tracking-[0.3em] text-white/60 group-hover:text-white transition-colors">
              Complete Session & Return
            </span>
            <ArrowRight className="w-4 h-4 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};
