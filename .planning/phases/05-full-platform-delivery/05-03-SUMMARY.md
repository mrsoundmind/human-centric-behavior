---
phase: 05-full-platform-delivery
plan: 03
subsystem: scenario-content
tags: [strategy, scenarios, content, sdlc-phases]
dependency_graph:
  requires: [data/scenarios/schema.ts, data/scenarios/types.ts]
  provides: [data/scenarios/strategy/discovery.ts, data/scenarios/strategy/requirements.ts, data/scenarios/strategy/design.ts]
  affects: [StrategyJourney.tsx, scenario loader, validate-all.ts]
tech_stack:
  added: []
  patterns: [validateScenario-at-import-time, crossRoleImpact-arrays, indian-b2b-rupee-context]
key_files:
  created:
    - data/scenarios/strategy/discovery.ts
    - data/scenarios/strategy/requirements.ts
    - data/scenarios/strategy/design.ts
  modified: []
decisions:
  - Strategy scenarios use Indian B2B rupee context (₹3-8Cr) consistent with PM and other role scenarios
  - crossRoleImpact arrays target pm, ba, developer, sales, crm roles reflecting upstream/downstream strategy dependencies
  - tomorrowActions name specific workflow artifacts (Evidence Gate slide, Strategic Trade-Off Brief, Data Freshness Audit, Validation Status tag, Measurement Architecture document, Strategic Review Cadence)
metrics:
  duration: 214s
  completed: "2026-03-24"
  tasks: 2
  files: 3
---

# Phase 5 Plan 03: Strategy Role Scenarios Summary

**One-liner:** 12 Zod-validated Strategy scenarios across Discovery, Requirements, and Design phases covering signal-vs-noise decisions, governance friction, assumption validation, and conflict avoidance in Indian B2B enterprise delivery.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Strategy Discovery and Requirements scenarios | f2f6603 | data/scenarios/strategy/discovery.ts, data/scenarios/strategy/requirements.ts |
| 2 | Strategy Design scenarios | 122d2e9 | data/scenarios/strategy/design.ts |

## What Was Built

Three scenario data files providing 12 Zod-validated `ScenarioConfig` objects for the Strategy designation journey:

**Discovery phase (4 scenarios):**
- `strategy-discovery-client_friction-01` — "The Buzzword Board" — Board-driven AI/mobile direction without user evidence; Evidence Gate slide artifact
- `strategy-discovery-internal_bureaucracy-01` — "The Committee Quarterly" — 9-month approval delay for a time-sensitive market window; Joint Committee Expedite Request artifact
- `strategy-discovery-knowledge_gap-01` — "The Stale Data" — 2-year-old market report used as current basis for ₹4Cr product bet; Data Freshness Audit artifact
- `strategy-discovery-conflict_avoidance-01` — "The Dual Priority" — Contradictory senior stakeholder priorities accommodated ambiguously; Strategic Trade-Off Brief artifact

**Requirements phase (4 scenarios):**
- `strategy-req-client_friction-01` — "The Moving Target" — 4 direction changes in 6 weeks absorbed silently; Strategic Direction Change Log artifact
- `strategy-req-internal_bureaucracy-01` — "The Veto Power" — Strategy diluted preemptively to avoid department vetoes; Department Impact Matrix artifact
- `strategy-req-knowledge_gap-01` — "The Unvalidated Assumption" — Proceeding to requirements on unvalidated behavioral assumptions; Validation Status tag artifact
- `strategy-req-conflict_avoidance-01` — "The Omitted Finding" — Known commitment conflict omitted from strategy report; Commitment Conflict Check artifact

**Design phase (4 scenarios):**
- `strategy-des-client_friction-01` — "The Direction Collision" — Sunk cost reasoning used to justify continuing wrong strategic direction; Pivot Cost Assessment artifact
- `strategy-des-internal_bureaucracy-01` — "The Instrumentation Gap" — KPI dashboard launched with 40% missing data sources; Team Buy-In Tracker artifact
- `strategy-des-knowledge_gap-01` — "The Measurement Gap" — Adoption metrics presented as business impact proxy; Measurement Architecture document artifact
- `strategy-des-conflict_avoidance-01` — "The Delayed Reckoning" — Unfavorable post-launch findings delayed while seeking positive framing; Strategic Review Cadence artifact

## Decisions Made

1. **Indian B2B rupee context** — All scenarios use ₹ values (₹3-8Cr) matching the PM role pattern established in Phase 3, providing contextual realism for the Indian enterprise delivery audience.

2. **crossRoleImpact targeting** — Strategy role scenarios impact pm (most common — strategic decisions create requirements and discovery friction downstream), ba (blocked by strategic approval delays), developer (builds on unvalidated assumptions), sales (outdated competitive data), and crm (hidden commitment conflicts surface as relationship damage).

3. **tomorrowAction artifacts** — Each scenario names a specific workflow document or process artifact, not generic advice. Examples: "Evidence Gate slide," "Joint Committee Expedite Request," "Data Freshness Audit," "Validation Status tag," "Pivot Cost Assessment," "Team Buy-In Tracker," "Measurement Architecture document," "Strategic Review Cadence."

## Deviations from Plan

None — plan executed exactly as written.

## Verification

- `npx tsc --noEmit` — passed with zero errors after both tasks
- `npm run build` — succeeded (2193 modules transformed, 4.03s)
- All 3 files export named arrays of exactly 4 `validateScenario()` calls
- All 12 scenario IDs prefixed with `strategy-`
- All 12 scenarios have `role: "strategy"`
- All debrief objects have 5 required fields (whatHappened, why, how, whoBecame, tomorrowAction)

## Self-Check: PASSED

Files confirmed present:
- data/scenarios/strategy/discovery.ts — FOUND
- data/scenarios/strategy/requirements.ts — FOUND
- data/scenarios/strategy/design.ts — FOUND

Commits confirmed:
- f2f6603 — FOUND (feat(05-03): add Strategy Discovery and Requirements scenarios)
- 122d2e9 — FOUND (feat(05-03): add Strategy Design scenarios)
