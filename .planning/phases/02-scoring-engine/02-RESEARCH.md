# Phase 2: Scoring Engine - Research

**Researched:** 2026-03-23
**Domain:** Pure TypeScript behavioral scoring — dimension accumulation, pattern detection, blind spot archetype derivation
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Behavioral Accumulation Model**
- Phase-aware weighted accumulation — each decision carries its phase context; engine tracks frequency per dimension per phase, not just total counts
- Normalized as percentages within each phase — prevents phases with more scenarios from dominating the profile
- No temporal weighting — all decisions matter equally; phase context is more meaningful than recency
- Minimum 3 decisions before generating a profile — prevents premature pattern detection from 1-2 early decisions
- `computeRunningScore(decisions: DecisionRecord[])` returns per-phase dimension breakdown: `{ phase: SDLCPhase, dimensions: Record<FrictionDimension, number> }[]`

**Blind Spot Archetype Taxonomy**
- 5-7 named archetypes covering the 4 friction dimensions
- Primary dimension + secondary pattern: lead with strongest dimension, note secondary
- Phase-specific pattern naming: archetype includes the SDLC phase where pattern is strongest (e.g., "Discovery Avoider" not just "Avoider")
- Behavioral narrative output, not just a label — includes what the user does, why it matters, and what to do differently
- `computeProfile(decisions: DecisionRecord[])` returns `ScoringProfile` with archetype name, narrative, per-phase breakdown, and shift points

**Cumulative Pattern Display**
- Per-phase dimension breakdown as data structure: `{ phase: SDLCPhase, dimensions: Record<FrictionDimension, number> }[]` — visualization deferred to Phase 4
- Detect behavioral shifts between phases: flag transitions where dominant dimension changes
- Engine computes running score but UI does NOT display it during journey — showing scores activates test-taking behavior (anti-feature per PROJECT.md)
- Final profile output: structured `ScoringProfile` type with archetype, narrative, per-phase breakdown, shift points, and raw decision count

### Claude's Discretion
- Exact archetype names and narrative templates (5-7 archetypes — Claude picks the names)
- Internal scoring algorithm (how percentages map to archetype selection)
- ScoringProfile interface field names and nesting
- How to handle edge cases (equal scores across dimensions, single-phase journeys)
- Whether to use a lookup table or algorithmic approach for archetype derivation

### Deferred Ideas (OUT OF SCOPE)
- Cross-role scoring comparison (how does PM's blind spot pattern differ from Developer's) — needed for Phase 4 multi-role compound insights
- Team-level aggregate patterns (v2 requirement ANLZ-02) — requires backend
- Archetype validation with 3-5 target users — flagged in STATE.md as blocker before Phase 4 completion copy
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| SCOR-01 | Pure TypeScript scoring engine module (no React imports) — exports computeRunningScore() and computeProfile() | Module lives at `data/scoring-engine.ts` (same data layer as types/schema); zero React/browser APIs needed; can be called from Node directly |
| SCOR-02 | 4-dimension behavioral tagging on every choice: client friction, internal bureaucracy, knowledge gaps, conflict avoidance | FrictionDimensionSchema already defines all 4 values; every DecisionRecord already carries `frictionTag: FrictionDimension`; engine aggregates existing tags, never introduces new ones |
| SCOR-03 | Blind spot profile generation — pattern detection across all phases showing tendency archetypes with SDLC phase specificity | Phase-per-dimension accumulation naturally produces the strongest-phase identifier; archetype lookup table maps dominant-phase + dominant-dimension pair to named archetype |
| SCOR-04 | Tendency-weighted multi-dimensional scoring — NOT binary right/wrong per choice | Percentage-normalized frequency model: count occurrences per dimension per phase, divide by decisions in that phase; produces a 0–1 weight, never a right/wrong flag |
| SCOR-05 | Cumulative pattern display that surfaces decision patterns across the full journey, not individual moments | computeRunningScore() returns ordered per-phase snapshots; shift detection compares dominant dimension between consecutive phases; both outputs are arrays the Phase 4 view can traverse |
</phase_requirements>

---

## Summary

Phase 2 builds a pure TypeScript scoring module that sits in the data layer alongside the types and schema established in Phase 1. The engine takes the `DecisionRecord[]` array that `DesignationStore` already accumulates and produces two outputs: a running per-phase breakdown consumed by Phase 4 completion views, and a full `ScoringProfile` containing a named blind spot archetype, behavioral narrative, and shift points. No new dependencies are needed — the entire engine is arithmetic on plain TypeScript objects.

The key design insight from the CONTEXT.md decisions is that the engine never produces a single aggregated score. It produces a structured profile that Phase 4 renders as a narrative mirror. This architecture is intentional: any numeric total would activate test-taking behavior, which destroys the behavioral change goal. The engine therefore exports behavioral pattern data, not grades.

The implementation is self-contained: the engine imports types from `data/scenarios/types.ts`, defines its own output types (`ScoringProfile`, `PhasePattern`, `BehavioralShift`), and has no runtime dependencies beyond what TypeScript and the type file already provide. A Node script can call it directly against a simulated decision log, which is exactly what the success criteria require.

**Primary recommendation:** Create `data/scoring-engine.ts` as a single pure TypeScript module. Define all output types via Zod schemas (consistent with Phase 1 pattern), export two functions (`computeRunningScore` and `computeProfile`), and validate the engine with a Node-runnable test script using a 21-decision simulation before any UI integration.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| TypeScript | 5.8.3 (already installed) | Engine types, type safety for ScoringProfile | Project-standard; engine must be fully typed to be consumed safely by Phase 4 |
| Zod | 3.25.76 (already installed) | Schema definition for ScoringProfile output types | Phase 1 established Zod-first as project pattern; keeps engine output types consistent with input types |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| (none needed) | — | — | The scoring engine is pure arithmetic on plain objects; no library solves the domain problem better than direct TypeScript |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Direct percentage math | A statistics library (e.g., simple-statistics) | Overcomplicated for 4 dimensions × 3 phases maximum; adds bundle weight with zero benefit at this scale |
| Lookup table for archetype selection | Rule engine (e.g., json-rules-engine) | A lookup table keyed on `{dominant_dimension}_{dominant_phase}` is 20 lines; a rules engine is a 200-line dependency for the same output |
| Zod output schemas | Manual TypeScript interfaces | Zod gives runtime validation of engine output in test scripts; consistent with Phase 1 pattern |

**Installation:** No new packages required. Zod and TypeScript are already installed.

---

## Architecture Patterns

### Recommended Project Structure

```
data/
├── scenarios/
│   ├── types.ts           # DecisionRecord, FrictionDimension, SDLCPhase (Phase 1 — existing)
│   ├── schema.ts          # Zod schemas for scenario content (Phase 1 — existing)
│   ├── scoring-engine.ts  # NEW — pure scoring module (Phase 2)
│   └── pm/
│       └── discovery.ts   # stub scenario (Phase 1 — existing)
scripts/
└── test-scoring-engine.ts # NEW — Node-runnable simulation script (Phase 2)
```

The engine lives at `data/scoring-engine.ts`, not `src/state/scoring-engine.ts`. Rationale: the `data/` layer is already established as containing zero React imports (per Phase 1 pattern). The existing `src/state/designation-store.ts` imports types from `data/scenarios/types.ts` — the scoring engine follows the same dependency direction: data layer is consumed by state layer, never the reverse.

### Pattern 1: Phase-Normalized Frequency Accumulation

**What:** For each `SDLCPhase` that appears in the decision log, count how many times each `FrictionDimension` appears, then divide by total decisions in that phase to produce percentages. Output is an array ordered by phase appearance in the decision log.

**When to use:** Always for `computeRunningScore`. This is the only accumulation model — do not mix with totals or moving averages.

**Example:**
```typescript
// data/scoring-engine.ts
import type { DecisionRecord, FrictionDimension, SDLCPhase } from "./scenarios/types";

export interface PhaseScore {
  phase: SDLCPhase;
  dimensions: Record<FrictionDimension, number>; // percentages 0–1
  decisionCount: number;
}

export function computeRunningScore(decisions: DecisionRecord[]): PhaseScore[] {
  // Group by phase, count per dimension, normalize
  const phaseMap = new Map<SDLCPhase, Map<FrictionDimension, number>>();

  for (const d of decisions) {
    if (!phaseMap.has(d.phase)) {
      phaseMap.set(d.phase, new Map());
    }
    const dimMap = phaseMap.get(d.phase)!;
    dimMap.set(d.frictionTag, (dimMap.get(d.frictionTag) ?? 0) + 1);
  }

  // Convert to normalized PhaseScore array
  const result: PhaseScore[] = [];
  for (const [phase, dimMap] of phaseMap) {
    const total = [...dimMap.values()].reduce((a, b) => a + b, 0);
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
```

### Pattern 2: Blind Spot Archetype Derivation via Lookup Table

**What:** After computing `PhaseScore[]`, identify the dominant dimension across all phases (highest cumulative percentage), the phase where that dimension peaks, and the secondary dimension. These three signals (dominant dimension, dominant phase, secondary dimension) index into an archetype lookup table that maps combinations to named archetypes + narrative templates.

**When to use:** Always for `computeProfile`. The lookup table approach is preferred over algorithmic derivation because archetype names and narratives are domain content, not computation — they must be editable without changing algorithm logic.

**Archetype Taxonomy (Claude's discretion — recommended names and coverage):**

| Archetype Name | Primary Dimension | Phase-Specific Naming Pattern | Core Behavioral Narrative |
|----------------|-------------------|-------------------------------|--------------------------|
| The Approval Absorber | conflict_avoidance | "{Phase} Absorber" | Consistently defers judgment to stakeholders rather than pushing back; avoids productive conflict to protect relationships at cost of clarity |
| The Knowledge Hoarder | knowledge_gap | "{Phase} Hoarder" | Works within information silos; proceeds with assumptions rather than surfacing what's missing; compounds ambiguity downstream |
| The Process Shield | internal_bureaucracy | "{Phase} Shield" | Routes decisions through approval layers rather than resolving them directly; uses process as protective cover for inaction |
| The Client Pleaser | client_friction | "{Phase} Pleaser" | Absorbs client ambiguity without pushing for definition; prioritizes relationship harmony over scope clarity |
| The Scope Drifter | client_friction + knowledge_gap (compound) | "{Phase} Drifter" | Accepts expanding scope incrementally without documenting what changed; combines client friction avoidance with knowledge gap exposure |
| The Deadline Optimizer | internal_bureaucracy + conflict_avoidance (compound) | "{Phase} Optimizer" | Cuts corners on process to hit deadlines; treats internal constraints as obstacles rather than signals |

Phase-specific naming: archetype names gain a phase prefix when the dominant phase is clear (e.g., pattern strongest in "requirements" → "Requirements Absorber").

**Example lookup structure:**
```typescript
// Simplified key: "dominant_dimension:dominant_phase"
type ArchetypeKey = `${FrictionDimension}:${SDLCPhase}`;

const ARCHETYPE_LOOKUP: Partial<Record<ArchetypeKey, ArchetypeDefinition>> = {
  "conflict_avoidance:requirements": {
    name: "Requirements Absorber",
    narrative: "...",
    whatYouDo: "...",
    whyItMatters: "...",
    doThis: "...",
  },
  // ... 5-6 more entries
};

// Fallback: lookup by dominant_dimension only when no phase-specific match
const DIMENSION_FALLBACK: Record<FrictionDimension, ArchetypeDefinition> = { ... };
```

### Pattern 3: Behavioral Shift Detection

**What:** Scan `PhaseScore[]` in order. For consecutive phases, compare the dominant dimension. When the dominant dimension changes between phases, record a `BehavioralShift`. A shift is meaningful only if both phases have at least `MIN_DECISIONS_PER_PHASE` decisions (recommended: 2).

**When to use:** Inside `computeProfile`. Shift points are surfaced in the Phase 4 completion view as "you changed behavior in X phase."

**Example:**
```typescript
export interface BehavioralShift {
  fromPhase: SDLCPhase;
  toPhase: SDLCPhase;
  fromDimension: FrictionDimension;
  toDimension: FrictionDimension;
  description: string; // e.g. "Your conflict avoidance in Requirements gave way to process-shielding in Design"
}

function detectShifts(phaseScores: PhaseScore[]): BehavioralShift[] {
  const shifts: BehavioralShift[] = [];
  for (let i = 1; i < phaseScores.length; i++) {
    const prev = dominantDimension(phaseScores[i - 1]);
    const curr = dominantDimension(phaseScores[i]);
    if (prev !== curr && phaseScores[i - 1].decisionCount >= MIN_DECISIONS_PER_PHASE
                      && phaseScores[i].decisionCount >= MIN_DECISIONS_PER_PHASE) {
      shifts.push({ fromPhase: phaseScores[i-1].phase, toPhase: phaseScores[i].phase,
                    fromDimension: prev, toDimension: curr, description: buildShiftDescription(prev, curr, phaseScores[i].phase) });
    }
  }
  return shifts;
}
```

### Pattern 4: Minimum Decision Guard

**What:** `computeProfile` returns `null` (or a typed `InsufficientDataProfile`) when total decisions < 3. This is a locked decision from CONTEXT.md. The guard prevents archetype assignment from 1-2 early decisions.

**When to use:** Always at the start of `computeProfile`. Phase 4 completion views must handle the `null` case.

**Recommended approach:**
```typescript
export type ProfileResult =
  | { status: "complete"; profile: ScoringProfile }
  | { status: "insufficient_data"; decisionCount: number };

export function computeProfile(decisions: DecisionRecord[]): ProfileResult {
  if (decisions.length < MIN_DECISIONS_FOR_PROFILE) {
    return { status: "insufficient_data", decisionCount: decisions.length };
  }
  // ... full computation
}
```

### Recommended ScoringProfile Shape (Claude's discretion)

```typescript
export interface ScoringProfile {
  archetypeName: string;               // e.g., "Requirements Absorber"
  archetypeBaseKey: FrictionDimension; // the primary dimension
  narrative: string;                   // 2-3 sentence behavioral description
  whatYouDo: string;                   // specific behavioral pattern description
  whyItMatters: string;                // consequence for the team/project
  doThis: string;                      // tomorrow's action anchored to a workflow moment
  phaseBreakdown: PhaseScore[];        // full per-phase dimension breakdown
  shifts: BehavioralShift[];           // detected behavior change points
  dominantPhase: SDLCPhase;            // phase with most decisions in dominant dimension
  dominantDimension: FrictionDimension;
  secondaryDimension: FrictionDimension | null;
  decisionCount: number;               // raw total for context
}
```

### Anti-Patterns to Avoid

- **Computing scores inside React components:** All computation in `data/scoring-engine.ts`. Components call the exported functions, they do not contain scoring logic.
- **Exposing a numeric total score:** `ScoringProfile` must never contain a field like `totalScore: number` or `percentage: number`. These would be visible to Phase 4 and create a grading surface.
- **Mutating the decision log:** The engine is read-only. It receives `DecisionRecord[]` and returns new objects. It never mutates its input.
- **Running scoring on every React render:** `computeRunningScore` and `computeProfile` are called explicitly on decision commit (via the store action), not in `useEffect` or render functions.
- **Defaulting to first archetype on tie:** When two dimensions are equal, apply a defined tiebreak rule (recommended: prefer conflict_avoidance > knowledge_gap > internal_bureaucracy > client_friction, in that order, since conflict avoidance is the hardest behavioral change to surface).

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Type validation for ScoringProfile output | Custom runtime checks | Zod schema (already installed) | Consistent with Phase 1 pattern; catches field name drift between engine and consumers; gives parse-level error messages in test scripts |
| Phase ordering | A custom sort function | The natural ordering from DecisionRecord.phase + insertion order into Map | The `SDLCPhase` enum order in schema.ts is already chronological; phases appear in the output in the order they're first encountered in the decision log |
| Percentage arithmetic | A statistics library | Inline arithmetic (count / total) | 4 dimensions is not a case that needs a library; any dependency here adds maintenance cost with zero algorithmic value |

**Key insight:** The scoring engine is business logic, not a general-purpose computation problem. The archetype taxonomy and narrative templates are domain content that must be editable by a non-engineer. Don't abstract these into a framework — keep them as a plain lookup table (or exported constant object) so they can be edited without understanding the algorithm.

---

## Common Pitfalls

### Pitfall 1: The Test-Taking Trap (Critical — from PITFALLS.md)

**What goes wrong:** Any numeric value surfaced during the journey (score, percentage, count) shifts user psychology from "exploring what I actually do" to "finding the right answer." The entire behavioral change goal fails silently. Users start gaming the system rather than reflecting.

**Why it happens:** The engine naturally produces numbers, and numbers feel informative. It is tempting to show "2/5 conflict avoidance" as feedback. This is the single most dangerous design mistake for this platform.

**How to avoid:** The `ScoringProfile` has no field the Phase 4 view could display as a score. The only output is behavioral language: archetype name, narrative, and shift descriptions. The `phaseBreakdown` array is consumed for visualization only, not for displaying raw numbers to the user.

**Warning signs:** Any field in `ScoringProfile` named `score`, `percentage`, `points`, `total`, or `grade`.

### Pitfall 2: Premature Profile Assignment

**What goes wrong:** With 1-2 decisions, one pattern looks 100% dominant. The engine assigns a confident archetype. User sees "You are a conflict avoider" after making 1 choice. This is inaccurate and potentially off-putting.

**Why it happens:** The computation works mechanically with any number of decisions. The minimum guard must be explicit, not left to the caller.

**How to avoid:** Hard-coded `MIN_DECISIONS_FOR_PROFILE = 3` constant at the top of the engine file. `computeProfile` returns `{ status: "insufficient_data" }` below this threshold. The Phase 4 view handles this case.

### Pitfall 3: Phase Dominance Bias from Unequal Decision Counts

**What goes wrong:** If one SDLC phase has 7 decisions and another has 1, the larger phase dominates the archetype selection simply because it has more data, not because the pattern is stronger there. The profile says "your strongest pattern is in Discovery" because Discovery had the most scenarios, not because the user actually showed a pattern there.

**Why it happens:** Using raw counts instead of normalized percentages per phase.

**How to avoid:** Always normalize per phase before cross-phase comparison. When determining the "dominant phase" for archetype naming, compare the peak dimension percentage within each phase, not the absolute count. A phase where conflict_avoidance is 80% of 2 decisions is a stronger signal than a phase where it is 50% of 10 decisions.

**Note on minimum:** A phase with only 1 decision gets a 100% attribution to one dimension — this can produce misleading archetype naming. Recommend requiring a minimum of 2 decisions per phase before that phase is eligible for "dominant phase" naming.

### Pitfall 4: Archetype Lookup Returning Undefined

**What goes wrong:** The combination of dominant_dimension + dominant_phase has no entry in the lookup table. The engine throws or returns undefined. Phase 4 renders nothing or crashes.

**Why it happens:** The lookup table can only cover a finite set of combinations. With 4 dimensions × 7 SDLC phases = 28 possible primary combinations, it is easy to miss some.

**How to avoid:** Always provide dimension-only fallback archetypes for all 4 dimensions. The lookup tries the specific `dimension:phase` key first, then falls back to the dimension-only key. The dimension-only fallback is always present.

### Pitfall 5: No React Import Contamination

**What goes wrong:** A developer imports a React hook or component into `data/scoring-engine.ts` — perhaps a utility from `src/`. This breaks the "zero React imports" requirement (SCOR-01) and means the engine cannot be called from a Node script.

**Why it happens:** IDEs auto-complete imports; the line between `data/` and `src/` is enforced by convention not by the build tool.

**How to avoid:** Add a comment block at the top of the engine file: `// ZERO React imports. This module must run in Node without a browser environment.` During Phase 2 verification, run the engine directly: `npx tsx scripts/test-scoring-engine.ts` — if it imports anything React-related, Node will throw immediately.

### Pitfall 6: Engine Output Shape Drift from Phase 4 Consumer

**What goes wrong:** Phase 2 defines `ScoringProfile` with specific field names. Phase 4 is built months later. The developer builds the completion view against slightly different field names. TypeScript won't catch this if both codebases compile independently.

**How to avoid:** Export `ScoringProfile`, `PhaseScore`, and `BehavioralShift` types from `data/scoring-engine.ts` and import them explicitly in Phase 4 components. Do not re-define these types in Phase 4. The single import statement creates a compile-time check that the consumer matches the engine.

---

## Code Examples

Verified patterns consistent with existing Phase 1 codebase:

### Zod-First Output Type Definition (consistent with Phase 1 pattern)

```typescript
// data/scoring-engine.ts
import { z } from "zod";
import type { DecisionRecord } from "./scenarios/types";
import { FrictionDimensionSchema, SDLCPhaseSchema } from "./scenarios/schema";

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
```

### Node-Runnable Simulation Script

```typescript
// scripts/test-scoring-engine.ts
// Run with: npx tsx scripts/test-scoring-engine.ts
import { computeRunningScore, computeProfile } from "../data/scoring-engine";
import type { DecisionRecord } from "../data/scenarios/types";

// Simulate 21 decisions across 3 SDLC phases
const simulatedDecisions: DecisionRecord[] = [
  // Discovery phase — 7 decisions, heavy conflict_avoidance
  { choiceId: "c01", frictionTag: "conflict_avoidance", timestamp: 1, phase: "discovery", role: "pm" },
  { choiceId: "c02", frictionTag: "conflict_avoidance", timestamp: 2, phase: "discovery", role: "pm" },
  { choiceId: "c03", frictionTag: "client_friction",    timestamp: 3, phase: "discovery", role: "pm" },
  { choiceId: "c04", frictionTag: "conflict_avoidance", timestamp: 4, phase: "discovery", role: "pm" },
  { choiceId: "c05", frictionTag: "knowledge_gap",      timestamp: 5, phase: "discovery", role: "pm" },
  { choiceId: "c06", frictionTag: "conflict_avoidance", timestamp: 6, phase: "discovery", role: "pm" },
  { choiceId: "c07", frictionTag: "conflict_avoidance", timestamp: 7, phase: "discovery", role: "pm" },
  // Requirements phase — 7 decisions, mixed
  { choiceId: "c08", frictionTag: "internal_bureaucracy", timestamp: 8,  phase: "requirements", role: "pm" },
  // ... 6 more requirements decisions
  // Design phase — 7 decisions, heavy knowledge_gap
  // ... 7 design decisions
];

const runningScore = computeRunningScore(simulatedDecisions);
console.log("Running score:", JSON.stringify(runningScore, null, 2));

const profileResult = computeProfile(simulatedDecisions);
if (profileResult.status === "complete") {
  console.log("Archetype:", profileResult.profile.archetypeName);
  console.log("Dominant phase:", profileResult.profile.dominantPhase);
  console.log("Shifts detected:", profileResult.profile.shifts.length);
  console.log("Narrative:", profileResult.profile.narrative);
} else {
  console.log("Insufficient data:", profileResult.decisionCount, "decisions");
}
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Numeric scoring (points per choice) | Behavioral tag frequency (dimension percentages per phase) | PITFALLS.md decision, pre-Phase 1 | Prevents test-taking behavior; enables pattern narrative instead of grade |
| Single aggregated score | Per-phase dimension breakdown | CONTEXT.md locked decision | Enables shift detection; surfaces where in the SDLC the pattern emerges |
| Score shown during journey | Score hidden; narrative shown at completion only | PROJECT.md anti-feature | Preserves genuine blind spot surfacing; users can't game what they can't see |

**Deprecated/outdated:**
- `overallScore: number` field in old ARCHITECTURE.md research example — explicitly excluded from this phase's `ScoringProfile` design. That example pre-dates the locked CONTEXT.md decisions. Do not implement.

---

## Open Questions

1. **Equal dimension scores across all phases (uniform distribution)**
   - What we know: Minimum 3 decisions means some diversity is likely, but a careful user could choose evenly across all 4 dimensions
   - What's unclear: Should the archetype be "Balanced" (no blind spot identified) or should the most-used dimension still be surfaced?
   - Recommendation: Return a specific "The Diplomatic Navigator" archetype for near-uniform distributions (no dimension exceeds 40%), with a narrative that describes balanced decision-making as its own pattern. This avoids a null output while being honest about the pattern.

2. **Single-phase journeys (Phase 4 stub content)**
   - What we know: The minimum journey at Phase 2 test time is simulated — the stub PM/Discovery scenario has only 2 choices in 1 phase
   - What's unclear: At Phase 3/4, some edge cases may produce journeys where a user only completes 1 SDLC phase
   - Recommendation: `computeRunningScore` works on single-phase input. `computeProfile` with single-phase input can still return an archetype — just no shifts detected. The `shifts` field returns an empty array, and `dominantPhase` equals the one phase present.

3. **Archetype validation timing**
   - What we know: STATE.md flags "Archetype validation with 3-5 target users" as a blocker before Phase 4 completion copy is finalized
   - What's unclear: Are the archetype names and narratives in this phase "final" or placeholders?
   - Recommendation: Treat Phase 2 archetype names and narratives as implementation-complete but content-provisional. Export them from a separate `data/scoring-archetypes.ts` file so they can be edited independently of the algorithm when user validation feedback arrives.

---

## Validation Architecture

> nyquist_validation is enabled (absent from config.json = treat as enabled).

### Test Framework

| Property | Value |
|----------|-------|
| Framework | TypeScript compiler + `npx tsx` for Node-runnable scripts (no test runner — automated test suites explicitly out of scope per REQUIREMENTS.md) |
| Config file | `tsconfig.app.json` (existing) |
| Quick run command | `npx tsc --noEmit` |
| Full suite command | `npx tsc --noEmit && npx tsx scripts/test-scoring-engine.ts` |

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| SCOR-01 | Engine module has zero React imports, callable from Node | compile + runtime | `npx tsx scripts/test-scoring-engine.ts` — throws immediately if React imported | ❌ Wave 0 |
| SCOR-02 | All 4 friction dimensions accumulate correctly from a DecisionRecord log | runtime | `npx tsx scripts/test-scoring-engine.ts` — assert all 4 dimensions appear in output | ❌ Wave 0 |
| SCOR-03 | 21-decision simulation produces a named archetype identifying SDLC phase | runtime | `npx tsx scripts/test-scoring-engine.ts` — assert `profile.archetypeName` contains phase name | ❌ Wave 0 |
| SCOR-04 | No binary right/wrong field in ScoringProfile; output is 0–1 percentages | compile | `npx tsc --noEmit` — `ScoringProfile` type must not contain `score`, `grade`, `correct` fields | ❌ Wave 0 |
| SCOR-05 | Full journey shows shift points between phases, not single aggregate | runtime | `npx tsx scripts/test-scoring-engine.ts` — assert `phaseBreakdown.length >= 2` and `shifts` array examined | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `npx tsc --noEmit`
- **Per wave merge:** `npx tsc --noEmit && npx tsx scripts/test-scoring-engine.ts`
- **Phase gate:** Full suite green before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `scripts/test-scoring-engine.ts` — simulation script covering SCOR-01..05; must be created before or alongside the engine itself
- [ ] `data/scoring-engine.ts` — the engine module; does not exist yet
- [ ] `data/scoring-archetypes.ts` — archetype lookup table; separate file so narratives are editable without touching algorithm
- [ ] No new npm dependencies — `npx tsx` via project's existing TypeScript toolchain (verify with `npx tsx --version`)

---

## Sources

### Primary (HIGH confidence)

- `data/scenarios/types.ts` — `DecisionRecord`, `FrictionDimension`, `SDLCPhase` types — exact engine input shape, direct read
- `data/scenarios/schema.ts` — `FrictionDimensionSchema` enum values (`client_friction`, `internal_bureaucracy`, `knowledge_gap`, `conflict_avoidance`) — direct read
- `src/state/designation-store.ts` — `RoleState.decisions: DecisionRecord[]` — engine data source shape, direct read
- `.planning/phases/02-scoring-engine/02-CONTEXT.md` — locked implementation decisions (accumulation model, archetype taxonomy shape, API contract)
- `.planning/research/ARCHITECTURE.md` — scoring engine isolation rationale, build order (content types → scoring engine → store)
- `.planning/research/PITFALLS.md` — test-taking behavior trap (Pitfall 3), multi-role indexing (Pitfall 8)

### Secondary (MEDIUM confidence)

- `.planning/research/FEATURES.md` — 4 friction dimensions as platform differentiator, scoring taxonomy must precede content authoring
- `.planning/PROJECT.md` — anti-feature definition (never show numeric scores during journey), core value statement
- `.planning/REQUIREMENTS.md` — SCOR-01..05 exact requirement text, out-of-scope items (automated test suites)

### Tertiary (LOW confidence)

- None — all findings derive directly from Phase 1 codebase artifacts and locked CONTEXT.md decisions. No speculative external sources needed for this phase.

---

## Metadata

**Confidence breakdown:**

- Standard stack: HIGH — no new dependencies; engine uses TypeScript and Zod already installed and verified in Phase 1
- Architecture: HIGH — file location (`data/scoring-engine.ts`) and purity constraint derive from Phase 1 established patterns; no novel decisions needed
- API contract: HIGH — `computeRunningScore` and `computeProfile` signatures are locked in CONTEXT.md; output types derive directly from those signatures
- Archetype taxonomy: MEDIUM — names are Claude's discretion; structure is locked; specific names are content decisions pending user validation (see STATE.md blocker)
- Pitfalls: HIGH — test-taking trap and numeric score danger are directly documented in PITFALLS.md with codebase evidence

**Research date:** 2026-03-23
**Valid until:** Stable until Phase 3 begins content authoring; archetype names provisional until user validation occurs (per STATE.md blocker)
