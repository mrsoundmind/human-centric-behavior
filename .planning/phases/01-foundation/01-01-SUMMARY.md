---
phase: 01-foundation
plan: "01"
subsystem: data
tags: [zod, typescript, scenario-schema, content-data-separation]

# Dependency graph
requires: []
provides:
  - "ScenarioConfig, Choice, Debrief, DecisionRecord, CrossRoleImpact, FrictionDimension, SDLCPhase, Designation type definitions in data/scenarios/types.ts"
  - "Zod schemas and validateScenario() function in data/scenarios/schema.ts"
  - "ImpactEdge type and empty crossRoleImpactMap stub in data/scenarios/cross-role-impact-map.ts"
  - "Validated stub PM/Discovery scenario (pmDiscoveryScenarios) in data/scenarios/pm/discovery.ts"
affects:
  - 01-foundation (plans 02-04 — store, navigation hook, ScenarioRenderer all consume these types)
  - 03-content (all scenario authoring uses ScenarioConfig and validateScenario)
  - 04-crossrole (CrossRoleImpactEngine populates crossRoleImpactMap)

# Tech tracking
tech-stack:
  added: []
  patterns:
    - "Zod as single source of truth — TypeScript types derived via z.infer, preventing type/schema divergence"
    - "Module-level Zod validation — validateScenario() called at import time so malformed data throws before app renders"
    - "Content-data separation — scenario data lives in data/scenarios/ as typed objects, not inside React components"
    - "Role/phase file layout — one file per role-phase combination (e.g., data/scenarios/pm/discovery.ts)"

key-files:
  created:
    - data/scenarios/schema.ts
    - data/scenarios/types.ts
    - data/scenarios/cross-role-impact-map.ts
    - data/scenarios/pm/discovery.ts
  modified: []

key-decisions:
  - "Zod schema is the single source of truth — types.ts imports schema types and uses z.infer, not independent type definitions"
  - "SDLCPhase defined in data/scenarios/types.ts (not extracted from SDLCContext.tsx) — new data-layer infrastructure independent of existing Layer 2"
  - "crossRoleImpactMap left as empty stub — Phase 4 requires domain expertise (CEO/SME) before it can be authoritatively filled"
  - "validateScenario() throws at import time — malformed scenario files fail loudly during development, not silently at runtime"

patterns-established:
  - "Pattern 1: Zod-first schema design — define Zod schema, derive TypeScript types via z.infer (never write types independently)"
  - "Pattern 2: Import-time validation — call validateScenario(raw, filePath) in the export line so validation runs when module is loaded"
  - "Pattern 3: Cross-role impact as authored strings on Choice, not dynamically derived — authoring is explicit, engine reads it statically"

requirements-completed: [CINF-01, CINF-03, CINF-04, CINF-05]

# Metrics
duration: 15min
completed: 2026-03-23
---

# Phase 1 Plan 01: Scenario Content Schema Summary

**Zod-first content schema with 7 typed schemas, z.infer-derived TypeScript types, validateScenario() function, and a validated stub PM/Discovery scenario proving the data-to-validation pipeline**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-03-23T09:05:00Z
- **Completed:** 2026-03-23T09:20:00Z
- **Tasks:** 2 of 2
- **Files modified:** 4 created, 0 modified

## Accomplishments

- Zod schemas define all scenario content types as the single source of truth — TypeScript types are never defined independently
- validateScenario() throws descriptive errors with file path and Zod issue details at import time, catching malformed data before the app renders
- Stub PM/Discovery scenario (Indian B2B IBC client context) validates successfully, proving the full raw-object-to-typed-ScenarioConfig pipeline
- ImpactEdge type established for cross-role impact edges, empty map stub ready for Phase 4 population

## Task Commits

Each task was committed atomically:

1. **Task 1: Create Zod schemas and derived TypeScript types** - `84bc40f` (feat)
2. **Task 2: Create cross-role impact map stub and validated PM/Discovery scenario** - `44eb0ff` (feat)

**Plan metadata:** (docs commit — see below)

## Files Created/Modified

- `data/scenarios/schema.ts` - 7 Zod schemas (FrictionDimension, SDLCPhase, Designation, CrossRoleImpact, Choice, Debrief, ScenarioConfig) + validateScenario() function
- `data/scenarios/types.ts` - All TypeScript types derived via z.infer + DecisionRecord runtime interface
- `data/scenarios/cross-role-impact-map.ts` - ImpactEdge interface + empty crossRoleImpactMap stub
- `data/scenarios/pm/discovery.ts` - Stub PM/Discovery scenario validated at import time via validateScenario()

## Decisions Made

- Zod is the single source of truth — types.ts uses z.infer rather than independently defining types. This means the type and the runtime validator are always in sync.
- SDLCPhase is defined in data/scenarios/types.ts, not extracted from SDLCContext.tsx. The two systems (Layer 2 SDLC context and new designation portal data layer) are intentionally independent.
- crossRoleImpactMap left empty — the domain design of "who depends on whom at which SDLC phase" requires CEO/SME input (flagged as blocker in STATE.md).
- validateScenario() uses safeParse internally and throws with formatted Zod issues + file path, making errors actionable during content authoring.

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- Content schema locked: all downstream phases can import from data/scenarios/types.ts and data/scenarios/schema.ts
- Plan 01-02 (Zustand + Immer DesignationStore) can begin — it depends on DecisionRecord, SDLCPhase, and Designation types, all now available
- Plan 01-03 (usePhaseNavigation hook) depends on SDLCPhase from types.ts — now available
- One Phase 1 blocker remains: Zustand 5.0.12 + Immer 11.1.4 not yet in package.json — must install before Plan 01-02 begins

---
*Phase: 01-foundation*
*Completed: 2026-03-23*

## Self-Check: PASSED

- FOUND: data/scenarios/schema.ts
- FOUND: data/scenarios/types.ts
- FOUND: data/scenarios/cross-role-impact-map.ts
- FOUND: data/scenarios/pm/discovery.ts
- FOUND commit: 84bc40f (Task 1)
- FOUND commit: 44eb0ff (Task 2)
