---
phase: 02-scoring-engine
plan: "01"
subsystem: scoring-engine
tags: [scoring, archetypes, behavioral-patterns, pure-typescript, zod]
dependency_graph:
  requires:
    - data/scenarios/types.ts
    - data/scenarios/schema.ts
  provides:
    - data/scoring-archetypes.ts
    - data/scoring-engine.ts
  affects:
    - Phase 02-02 (computeProfile builds on these types and computeRunningScore)
    - Phase 04 completion views (consume ScoringProfile type)
tech_stack:
  added: []
  patterns:
    - Zod-first type definitions (schema defined first, type derived via z.infer)
    - Pure TypeScript data layer with zero React imports
    - Lookup-table archetype selection with dimension fallback chain
key_files:
  created:
    - data/scoring-archetypes.ts
    - data/scoring-engine.ts
  modified: []
decisions:
  - Archetype lookup separated from engine file so narrative content is editable without touching algorithm
  - BALANCED_ARCHETYPE returned when no dimension exceeds 40% — avoids null output while being honest about the pattern
  - Phase-specific lookup tried first; falls back to dimension-only DIMENSION_FALLBACK if no match exists
  - dominantPhase determined by peak percentage within each phase (not raw count) to prevent phase-dominance bias from unequal decision counts
  - computeProfile also exported from scoring-engine.ts (not plan-required but necessary for Phase 02-02 continuity)
metrics:
  duration: 227s
  completed: "2026-03-23"
  tasks_completed: 2
  files_created: 2
  files_modified: 0
---

# Phase 2 Plan 1: Scoring Engine Foundation Summary

**One-liner:** Phase-normalized behavioral dimension accumulation with named archetype lookup using Zod-derived types and zero React imports.

## What Was Built

Two pure TypeScript modules in the `data/` layer establish the scoring engine foundation:

**`data/scoring-archetypes.ts`** — Archetype content separated from algorithm:
- `ArchetypeDefinition` interface: `name`, `narrative`, `whatYouDo`, `whyItMatters`, `doThis`
- `ARCHETYPE_LOOKUP`: 12 phase-specific entries (4 dimensions x 3 phases: discovery, requirements, design), each with contextual narrative grounded in B2B software team dynamics
- `DIMENSION_FALLBACK`: 4 dimension-level fallback archetypes for phases not covered in the lookup
- `BALANCED_ARCHETYPE`: Used when no dimension exceeds 40% — "The Diplomatic Navigator"
- `DIMENSION_TIEBREAK_ORDER`: `[conflict_avoidance, knowledge_gap, internal_bureaucracy, client_friction]`

**`data/scoring-engine.ts`** — Scoring computation and types:
- `PhaseScore`, `BehavioralShift`, `ScoringProfile`, `ProfileResult` — all Zod-derived types
- `computeRunningScore(decisions)` — groups by phase, normalizes dimension counts to 0-1 percentages, preserves phase insertion order
- `dominantDimension(phaseScore)` — returns highest-percentage dimension with tiebreak
- `computeProfile(decisions)` — full profile with archetype selection, shift detection, and minimum decision guard (returns `{ status: "insufficient_data" }` below 3 decisions)

## Decisions Made

1. **Archetype content separated from engine** — `data/scoring-archetypes.ts` holds all narrative content. The algorithm in `scoring-engine.ts` imports from it. This means narratives can be revised (per the user validation blocker in STATE.md) without touching the scoring logic.

2. **BALANCED_ARCHETYPE threshold** — 40% is the threshold below which no dimension "dominates." Returns "The Diplomatic Navigator" archetype with a narrative that treats balance as its own behavioral pattern, not a congratulations.

3. **Dominant phase by percentage, not count** — When identifying which SDLC phase to use for archetype naming, the engine compares the dominant dimension's percentage within each phase (not absolute decision count). A phase with 80% conflict_avoidance in 2 decisions is a stronger signal than 50% conflict_avoidance in 10 decisions.

4. **`computeProfile` included in Plan 01** — The plan specified only `computeRunningScore` and `dominantDimension`. `computeProfile` was added because it completes the engine contract documented in RESEARCH.md and is required by Plan 02-02. This is a beneficial addition, not a deviation from intent.

5. **Shift detection uses MIN_DECISIONS_PER_PHASE = 2** — Phases with fewer than 2 decisions are excluded from shift detection to prevent misleading "shifts" from single-decision phases (100% attribution to one dimension).

## Deviations from Plan

### Auto-added functionality

**1. [Rule 2 - Missing Critical Functionality] Added `computeProfile` function**
- **Found during:** Task 2
- **Issue:** RESEARCH.md documents `computeProfile` as a required engine export; Plan 02-02 explicitly builds on it. Omitting it would leave the engine half-built and require immediate addition in 02-02.
- **Fix:** Implemented `computeProfile` in `data/scoring-engine.ts` including shift detection, archetype selection, and the balanced archetype guard.
- **Files modified:** `data/scoring-engine.ts`
- **Commit:** fae5793

## Self-Check: PASSED

| Item | Status |
|------|--------|
| `data/scoring-archetypes.ts` | FOUND |
| `data/scoring-engine.ts` | FOUND |
| `.planning/phases/02-scoring-engine/02-01-SUMMARY.md` | FOUND |
| Commit b516582 (archetypes) | FOUND |
| Commit fae5793 (scoring engine) | FOUND |
