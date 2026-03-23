# Phase 2: Scoring Engine - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Build and validate the pure TypeScript behavioral scoring module before a single SDLC-merged scenario is authored. The engine takes DecisionRecord arrays from DesignationStore, accumulates friction dimension patterns per phase, detects blind spot archetypes, and outputs structured profiles. No React imports, no UI rendering — this is a pure computation layer consumed by Phase 4 completion views.

</domain>

<decisions>
## Implementation Decisions

### Behavioral Accumulation Model
- Phase-aware weighted accumulation — each decision carries its phase context; the engine tracks frequency per dimension per phase, not just total counts
- Normalized as percentages within each phase — prevents phases with more scenarios from dominating the profile
- No temporal weighting — the journey is short enough that all decisions matter equally; phase context is more meaningful than recency
- Minimum 3 decisions before generating a profile — prevents premature pattern detection from 1-2 early decisions
- `computeRunningScore(decisions: DecisionRecord[])` returns per-phase dimension breakdown: `{ phase: SDLCPhase, dimensions: Record<FrictionDimension, number> }[]`

### Blind Spot Archetype Taxonomy
- 5-7 named archetypes covering the 4 friction dimensions, e.g.: "The Approval Absorber" (conflict avoidance), "The Knowledge Hoarder" (knowledge gap), "The Process Shield" (internal bureaucracy), "The Client Pleaser" (client friction)
- Primary dimension + secondary pattern: lead with strongest dimension, note secondary. "Primarily an Approval Absorber who also shields behind process"
- Phase-specific pattern naming: archetype includes the SDLC phase where pattern is strongest (per SCOR-03), e.g., "Discovery Avoider" not just "Avoider"
- Behavioral narrative output, not just a label — includes what the user does, why it matters, and what to do differently (per PROJECT.md core value: changed in how they work)
- `computeProfile(decisions: DecisionRecord[])` returns `ScoringProfile` with archetype name, narrative, per-phase breakdown, and shift points

### Cumulative Pattern Display
- Per-phase dimension breakdown as data structure: `{ phase: SDLCPhase, dimensions: Record<FrictionDimension, number> }[]` — visualization deferred to Phase 4
- Detect behavioral shifts between phases: flag transitions where dominant dimension changes (per SCOR-05: "shows which phase the user shifted behavior")
- Engine computes running score but UI does NOT display it during journey — showing scores activates test-taking behavior (per PROJECT.md anti-feature). Display deferred to Phase 4 completion views
- Final profile output: structured `ScoringProfile` type with archetype, narrative, per-phase breakdown, shift points, and raw decision count — single type that Phase 4 completion views consume

### Claude's Discretion
- Exact archetype names and narrative templates (5-7 archetypes — Claude picks the names)
- Internal scoring algorithm (how percentages map to archetype selection)
- ScoringProfile interface field names and nesting
- How to handle edge cases (equal scores across dimensions, single-phase journeys)
- Whether to use a lookup table or algorithmic approach for archetype derivation

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Context
- `.planning/PROJECT.md` — Core value (behavioral change, not awareness), anti-feature (never show numeric scores during journey)
- `.planning/REQUIREMENTS.md` — SCOR-01..05 requirements, v1 scope, out-of-scope items
- `.planning/ROADMAP.md` — Phase 2 goal, success criteria, dependency on Phase 1

### Phase 1 Outputs (Foundation)
- `data/scenarios/types.ts` — `DecisionRecord`, `FrictionDimension`, `SDLCPhase`, `Designation` types (scoring engine input types)
- `data/scenarios/schema.ts` — `FrictionDimensionSchema` enum values (the 4 dimensions), `ChoiceSchema` with `frictionTag`
- `src/state/designation-store.ts` — `DesignationStore` shape, `RoleState.decisions: DecisionRecord[]` (the data source for scoring)

### Research Findings
- `.planning/research/ARCHITECTURE.md` — Scoring engine isolation, build order
- `.planning/research/FEATURES.md` — 4 friction dimensions as differentiator, scoring taxonomy must precede content
- `.planning/research/PITFALLS.md` — Test-taking behavior trap, scoring anti-patterns

### Codebase Context
- `.planning/codebase/ARCHITECTURE.md` — Current layer structure, data flow
- `.planning/codebase/CONCERNS.md` — Technical issues (all Phase 1 items now resolved)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `data/scenarios/types.ts`: `DecisionRecord` interface with `choiceId`, `frictionTag`, `timestamp`, `phase`, `role` — this is the exact input shape for the scoring engine
- `data/scenarios/schema.ts`: `FrictionDimensionSchema` with 4 enum values — scoring dimensions are already defined
- `data/scenarios/pm/discovery.ts`: Stub scenario with 2 choices, each carrying `frictionTag` — proves the scoring pipeline has real data to test against

### Established Patterns
- Zod-first approach: define schema, derive types via `z.infer` — scoring types should follow same pattern for consistency
- Pure data modules: `data/scenarios/` contains zero React imports — scoring engine lives in this same data layer
- Append-only decision log in DesignationStore — scoring engine reads this log, never writes to it

### Integration Points
- `src/state/designation-store.ts`: `RoleState.decisions: DecisionRecord[]` — scoring engine's data source. Engine imports types only, not the store itself
- Phase 4 completion views will import `computeRunningScore()` and `computeProfile()` — engine must export a clean API
- `data/scenarios/cross-role-impact-map.ts`: `ImpactEdge` type — scoring engine doesn't use this directly, but the archetype narrative may reference cross-role impact patterns

</code_context>

<specifics>
## Specific Ideas

- Existing role completion screen already has "paradigm shift" and "commitments" sections — the scoring profile replaces the generic paradigm shift with a personalized behavioral narrative in Phase 4
- Indian B2B context in archetype descriptions: "The Approval Absorber" example might reference the common pattern of waiting for stakeholder sign-off in hierarchical organizations
- The "do this tomorrow" action from debriefs should be reinforced by the profile — if the user's blind spot is conflict avoidance, the profile should reference the specific debrief actions where they could have pushed back

</specifics>

<deferred>
## Deferred Ideas

- Cross-role scoring comparison (how does PM's blind spot pattern differ from Developer's) — needed for Phase 4 multi-role compound insights
- Team-level aggregate patterns (v2 requirement ANLZ-02) — requires backend
- Archetype validation with 3-5 target users — flagged in STATE.md as blocker before Phase 4 completion copy

</deferred>

---

*Phase: 02-scoring-engine*
*Context gathered: 2026-03-23*
