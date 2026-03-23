// ZERO React imports. This module must run in Node without a browser environment.

import { z } from "zod";
import type { DecisionRecord, FrictionDimension, SDLCPhase } from "./scenarios/types";
import { FrictionDimensionSchema, SDLCPhaseSchema } from "./scenarios/schema";
import type { ArchetypeDefinition } from "./scoring-archetypes";
import {
  ARCHETYPE_LOOKUP,
  DIMENSION_FALLBACK,
  BALANCED_ARCHETYPE,
  DIMENSION_TIEBREAK_ORDER,
} from "./scoring-archetypes";

// ─── Constants ────────────────────────────────────────────────────────────────

const MIN_DECISIONS_FOR_PROFILE = 3;
const MIN_DECISIONS_PER_PHASE = 2;
const BALANCED_THRESHOLD = 0.4;

const ALL_DIMENSIONS = [
  "client_friction",
  "internal_bureaucracy",
  "knowledge_gap",
  "conflict_avoidance",
] as const;

// ─── Zod Schemas + Derived Types ──────────────────────────────────────────────

const PhaseScoreSchema = z.object({
  phase: SDLCPhaseSchema,
  dimensions: z.object({
    client_friction: z.number().min(0).max(1),
    internal_bureaucracy: z.number().min(0).max(1),
    knowledge_gap: z.number().min(0).max(1),
    conflict_avoidance: z.number().min(0).max(1),
  }),
  decisionCount: z.number().int().min(0),
});

export type PhaseScore = z.infer<typeof PhaseScoreSchema>;

const BehavioralShiftSchema = z.object({
  fromPhase: SDLCPhaseSchema,
  toPhase: SDLCPhaseSchema,
  fromDimension: FrictionDimensionSchema,
  toDimension: FrictionDimensionSchema,
  description: z.string(),
});

export type BehavioralShift = z.infer<typeof BehavioralShiftSchema>;

const ScoringProfileSchema = z.object({
  archetypeName: z.string(),
  archetypeBaseKey: FrictionDimensionSchema,
  narrative: z.string(),
  whatYouDo: z.string(),
  whyItMatters: z.string(),
  doThis: z.string(),
  phaseBreakdown: z.array(PhaseScoreSchema),
  shifts: z.array(BehavioralShiftSchema),
  dominantPhase: SDLCPhaseSchema,
  dominantDimension: FrictionDimensionSchema,
  secondaryDimension: FrictionDimensionSchema.nullable(),
  decisionCount: z.number().int().min(0),
});

export type ScoringProfile = z.infer<typeof ScoringProfileSchema>;

export type ProfileResult =
  | { status: "complete"; profile: ScoringProfile }
  | { status: "insufficient_data"; decisionCount: number };

// ─── computeRunningScore ──────────────────────────────────────────────────────

/**
 * Accumulates DecisionRecord[] into per-phase dimension percentages.
 *
 * - Groups decisions by phase
 * - Normalizes each dimension count by total decisions in that phase (0-1)
 * - Returns phases in order of first appearance in the decision log
 * - Empty input returns empty array
 * - The engine is read-only: it never mutates its input
 */
export function computeRunningScore(decisions: DecisionRecord[]): PhaseScore[] {
  if (decisions.length === 0) {
    return [];
  }

  // Track insertion order of phases
  const phaseOrder: SDLCPhase[] = [];
  const phaseMap = new Map<SDLCPhase, Map<FrictionDimension, number>>();

  for (const d of decisions) {
    if (!phaseMap.has(d.phase)) {
      phaseMap.set(d.phase, new Map());
      phaseOrder.push(d.phase);
    }
    const dimMap = phaseMap.get(d.phase)!;
    dimMap.set(d.frictionTag, (dimMap.get(d.frictionTag) ?? 0) + 1);
  }

  const result: PhaseScore[] = [];

  for (const phase of phaseOrder) {
    const dimMap = phaseMap.get(phase)!;
    const total = ALL_DIMENSIONS.reduce(
      (sum, dim) => sum + (dimMap.get(dim) ?? 0),
      0
    );

    result.push({
      phase,
      dimensions: {
        client_friction: (dimMap.get("client_friction") ?? 0) / total,
        internal_bureaucracy: (dimMap.get("internal_bureaucracy") ?? 0) / total,
        knowledge_gap: (dimMap.get("knowledge_gap") ?? 0) / total,
        conflict_avoidance: (dimMap.get("conflict_avoidance") ?? 0) / total,
      },
      decisionCount: total,
    });
  }

  return result;
}

// ─── dominantDimension ────────────────────────────────────────────────────────

/**
 * Returns the FrictionDimension with the highest percentage in a PhaseScore.
 * On tie, applies DIMENSION_TIEBREAK_ORDER:
 *   conflict_avoidance > knowledge_gap > internal_bureaucracy > client_friction
 */
export function dominantDimension(phaseScore: PhaseScore): FrictionDimension {
  let best: FrictionDimension = DIMENSION_TIEBREAK_ORDER[0];
  let bestValue = phaseScore.dimensions[best];

  for (const dim of ALL_DIMENSIONS) {
    const val = phaseScore.dimensions[dim];
    if (val > bestValue) {
      best = dim;
      bestValue = val;
    } else if (val === bestValue) {
      // Tiebreak: prefer the dimension that appears earlier in DIMENSION_TIEBREAK_ORDER
      const currentRank = DIMENSION_TIEBREAK_ORDER.indexOf(best);
      const candidateRank = DIMENSION_TIEBREAK_ORDER.indexOf(dim);
      if (candidateRank < currentRank) {
        best = dim;
        bestValue = val;
      }
    }
  }

  return best;
}

// ─── Internal Helpers ─────────────────────────────────────────────────────────

/**
 * Returns the secondary (second-highest) FrictionDimension in a PhaseScore,
 * or null if there is no meaningful second dimension.
 */
function secondaryDimensionOf(phaseScore: PhaseScore): FrictionDimension | null {
  const primary = dominantDimension(phaseScore);
  let second: FrictionDimension | null = null;
  let secondValue = -1;

  for (const dim of ALL_DIMENSIONS) {
    if (dim === primary) continue;
    const val = phaseScore.dimensions[dim];
    if (val > secondValue) {
      second = dim;
      secondValue = val;
    } else if (val === secondValue && second !== null) {
      const currentRank = DIMENSION_TIEBREAK_ORDER.indexOf(second);
      const candidateRank = DIMENSION_TIEBREAK_ORDER.indexOf(dim);
      if (candidateRank < currentRank) {
        second = dim;
      }
    }
  }

  return secondValue > 0 ? second : null;
}

/**
 * Builds a human-readable description of a behavioral shift between two phases.
 */
function buildShiftDescription(
  fromDim: FrictionDimension,
  toDim: FrictionDimension,
  toPhase: SDLCPhase
): string {
  const dimensionLabel: Record<FrictionDimension, string> = {
    conflict_avoidance: "conflict avoidance",
    knowledge_gap: "knowledge gap exposure",
    internal_bureaucracy: "process-shielding",
    client_friction: "client-pleasing",
  };

  return `Your ${dimensionLabel[fromDim]} gave way to ${dimensionLabel[toDim]} in the ${toPhase} phase.`;
}

/**
 * Detects behavioral shifts between consecutive phases.
 * A shift is recorded only when both phases meet MIN_DECISIONS_PER_PHASE.
 */
function detectShifts(phaseScores: PhaseScore[]): BehavioralShift[] {
  const shifts: BehavioralShift[] = [];

  for (let i = 1; i < phaseScores.length; i++) {
    const prev = phaseScores[i - 1];
    const curr = phaseScores[i];

    if (
      prev.decisionCount < MIN_DECISIONS_PER_PHASE ||
      curr.decisionCount < MIN_DECISIONS_PER_PHASE
    ) {
      continue;
    }

    const fromDim = dominantDimension(prev);
    const toDim = dominantDimension(curr);

    if (fromDim !== toDim) {
      shifts.push({
        fromPhase: prev.phase,
        toPhase: curr.phase,
        fromDimension: fromDim,
        toDimension: toDim,
        description: buildShiftDescription(fromDim, toDim, curr.phase),
      });
    }
  }

  return shifts;
}

/**
 * Determines the dominant phase: the phase where the dominant dimension
 * has its highest percentage (not raw count), requiring MIN_DECISIONS_PER_PHASE.
 * Falls back to the first phase if no phase meets the minimum.
 */
function findDominantPhase(
  phaseScores: PhaseScore[],
  targetDimension: FrictionDimension
): SDLCPhase {
  let bestPhase = phaseScores[0].phase;
  let bestPct = -1;

  for (const ps of phaseScores) {
    if (ps.decisionCount < MIN_DECISIONS_PER_PHASE) continue;
    const pct = ps.dimensions[targetDimension];
    if (pct > bestPct) {
      bestPct = pct;
      bestPhase = ps.phase;
    }
  }

  return bestPhase;
}

/**
 * Computes overall dimension percentages across all phases (weighted by phase
 * decision count for accurate cross-phase comparison).
 */
function computeOverallDimensions(
  phaseScores: PhaseScore[]
): Record<FrictionDimension, number> {
  const totalDecisions = phaseScores.reduce((sum, ps) => sum + ps.decisionCount, 0);

  if (totalDecisions === 0) {
    return {
      client_friction: 0,
      internal_bureaucracy: 0,
      knowledge_gap: 0,
      conflict_avoidance: 0,
    };
  }

  const overall: Record<FrictionDimension, number> = {
    client_friction: 0,
    internal_bureaucracy: 0,
    knowledge_gap: 0,
    conflict_avoidance: 0,
  };

  for (const ps of phaseScores) {
    for (const dim of ALL_DIMENSIONS) {
      overall[dim] += (ps.dimensions[dim] * ps.decisionCount) / totalDecisions;
    }
  }

  return overall;
}

/**
 * Selects an archetype definition based on dominant dimension and dominant phase.
 * Falls back to DIMENSION_FALLBACK if no phase-specific entry exists.
 * Falls back to BALANCED_ARCHETYPE if no dimension exceeds BALANCED_THRESHOLD.
 */
function selectArchetype(
  dominantDim: FrictionDimension,
  dominantPhase: SDLCPhase,
  overallDimensions: Record<FrictionDimension, number>
): { archetype: ArchetypeDefinition; isBalanced: boolean } {
  // Check balanced condition first
  const maxPct = Math.max(...ALL_DIMENSIONS.map((d) => overallDimensions[d]));
  if (maxPct < BALANCED_THRESHOLD) {
    return { archetype: BALANCED_ARCHETYPE, isBalanced: true };
  }

  // Try phase-specific lookup
  const key = `${dominantDim}:${dominantPhase}` as const;
  const phaseSpecific = ARCHETYPE_LOOKUP[key];
  if (phaseSpecific) {
    return { archetype: phaseSpecific, isBalanced: false };
  }

  // Fall back to dimension-only
  return { archetype: DIMENSION_FALLBACK[dominantDim], isBalanced: false };
}

// ─── computeProfile ───────────────────────────────────────────────────────────

/**
 * Derives a complete ScoringProfile from a DecisionRecord[].
 *
 * Returns { status: "insufficient_data" } when decisions.length < MIN_DECISIONS_FOR_PROFILE.
 * Returns { status: "complete", profile: ScoringProfile } otherwise.
 *
 * The profile contains no numeric total score — only behavioral narrative,
 * per-phase dimension percentages, and shift detection data.
 */
export function computeProfile(decisions: DecisionRecord[]): ProfileResult {
  if (decisions.length < MIN_DECISIONS_FOR_PROFILE) {
    return { status: "insufficient_data", decisionCount: decisions.length };
  }

  const phaseBreakdown = computeRunningScore(decisions);

  // Create a synthetic aggregate PhaseScore for overall dimension analysis
  const overallDimensions = computeOverallDimensions(phaseBreakdown);
  const overallPhaseScore: PhaseScore = {
    phase: phaseBreakdown[0].phase, // placeholder; not used for archetype selection
    dimensions: overallDimensions,
    decisionCount: decisions.length,
  };

  const dominantDim = dominantDimension(overallPhaseScore);
  const dominantPhase = findDominantPhase(phaseBreakdown, dominantDim);
  const secondary = secondaryDimensionOf(overallPhaseScore);
  const shifts = detectShifts(phaseBreakdown);

  const { archetype } = selectArchetype(dominantDim, dominantPhase, overallDimensions);

  const profile: ScoringProfile = {
    archetypeName: archetype.name,
    archetypeBaseKey: dominantDim,
    narrative: archetype.narrative,
    whatYouDo: archetype.whatYouDo,
    whyItMatters: archetype.whyItMatters,
    doThis: archetype.doThis,
    phaseBreakdown,
    shifts,
    dominantPhase,
    dominantDimension: dominantDim,
    secondaryDimension: secondary,
    decisionCount: decisions.length,
  };

  return { status: "complete", profile };
}
