# Roadmap: Human Centric Lab — Designation Portal Overhaul

## Overview

This roadmap transforms the existing 3-scenario-per-role designation portal into a full SDLC-merged behavioral change platform. Work proceeds in strict dependency order: content infrastructure and state architecture are locked first (Phase 1) so the scoring engine has a clean schema to operate against (Phase 2), so the first wave of role content has a validated system to populate (Phase 3), so the completion and cross-role views have real data to surface (Phase 4), and finally the platform audit and remaining content bring every layer to production quality (Phase 5).

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation** - Lock TypeScript content schema, state architecture, and navigation hook — the three architectural prerequisites every downstream phase depends on (completed 2026-03-23)
- [x] **Phase 2: Scoring Engine** - Build and validate the pure TypeScript behavioral scoring module before a single SDLC-merged scenario is authored (completed 2026-03-23)
- [ ] **Phase 3: Role Content — First Wave** - Author SDLC-merged journeys for 3 roles using the validated architecture, proving the full pattern from scenario to debrief
- [ ] **Phase 4: Completion and Cross-Role Impact** - Build journey completion views, blind spot profile display, and cross-role impact visualization against real scored data
- [x] **Phase 5: Full Platform Delivery** - Complete all 8 role journeys, audit client-facing layers, fix navigation between all layers, ship cohesive platform (completed 2026-03-24)

## Phase Details

### Phase 1: Foundation
**Goal**: The TypeScript content schema, state architecture, and navigation pattern are locked — no scenario can be authored, no state added, and no phase component built until these contracts exist
**Depends on**: Nothing (first phase)
**Requirements**: CINF-01, CINF-02, CINF-03, CINF-04, CINF-05, STAT-01, STAT-02, STAT-03, STAT-04, TECH-01, TECH-02
**Success Criteria** (what must be TRUE):
  1. A developer can add a new scenario by creating a typed data object in `data/scenarios/` — no component code changes required
  2. The generic ScenarioRenderer displays a stub scenario from any role without role-specific component branches
  3. Zod validation catches a malformed scenario config (missing debrief field) at dev startup with a clear error, before any UI renders
  4. localStorage schema version mismatch triggers a graceful progress-reset message instead of a silent broken state
  5. All pre-existing memory leaks and timer cleanup issues from CONCERNS.md are resolved; no console warnings on mount/unmount cycle
**Plans**: 4 plans

Plans:
- [ ] 01-01: TypeScript content schema — ScenarioConfig, Choice, Outcome, DecisionRecord, ScoringProfile, ImpactEdge interfaces + Zod validation
- [ ] 01-02: State architecture — domain-split DesignationStore (Zustand + Immer), SDLCContext isolation, localStorage schema versioning with migration guard
- [ ] 01-03: Navigation and renderer — usePhaseNavigation hook, generic ScenarioRenderer + PhaseScene components, DesignationPortal entry point with role selection
- [ ] 01-04: Technical health — fix memory leaks, timer cleanup, unguarded localStorage access, reduce `any` in role journey components

### Phase 2: Scoring Engine
**Goal**: The behavioral scoring module exists as a pure TypeScript library — validated against the 4 friction dimensions and producing meaningful pattern profiles before any real scenario content is authored
**Depends on**: Phase 1
**Requirements**: SCOR-01, SCOR-02, SCOR-03, SCOR-04, SCOR-05
**Success Criteria** (what must be TRUE):
  1. The scoring engine module has zero React imports and can be called directly from a Node script without a browser environment
  2. Every choice in a scenario carries a behavioral tag from exactly one of the 4 friction dimensions; the engine accumulates tags correctly across a simulated decision log
  3. A simulated full journey (21 decisions across 3 phases) produces a named blind spot archetype that names the specific SDLC phase and dimension where the pattern is strongest
  4. Cumulative pattern output shows which phase the user shifted behavior — not a single aggregated score — across the full decision sequence
**Plans**: 2 plans

Plans:
- [ ] 02-01-PLAN.md — Scoring engine types, archetype lookup table, and computeRunningScore (SCOR-01, SCOR-02, SCOR-04)
- [ ] 02-02-PLAN.md — computeProfile with blind spot detection, shift detection, and Node-runnable validation script (SCOR-03, SCOR-05)

### Phase 3: Role Content — First Wave
**Goal**: Three complete SDLC-merged role journeys exist — from phase entry through all 3 SDLC phases to debrief — with all 4 friction dimensions covered and the existing 3-scenario journeys preserved
**Depends on**: Phase 2
**Requirements**: ROLE-01, ROLE-02, ROLE-03, ROLE-04, ROLE-05, ROLE-06, ROLE-07, ROLE-08, BEHV-01
**Success Criteria** (what must be TRUE):
  1. A user playing the PM role encounters an approval bottleneck, a knowledge silo, and a conflict avoidance scenario — each in a different SDLC phase — and each debrief names a specific workflow artifact they can change tomorrow
  2. A user playing any of the 3 authored roles can navigate from SDLC phase to SDLC phase using the declarative hook — no array index references in component code
  3. The existing 3-scenario role journeys remain accessible via a separate entry point — no content removed
  4. Each phase debrief enforces all 5 debrief fields (what happened / why / consequence / who you became / tomorrow's action) — a scenario missing any field fails Zod validation at startup
  5. All 3 completed roles' decision logs are persisted in localStorage under isolated per-role keys; refreshing mid-journey resumes at the correct phase
**Plans**: 4 plans

Plans:
- [ ] 03-01-PLAN.md — PM role SDLC journey: 12 scenarios across Discovery, Requirements, Design phases (ROLE-01, ROLE-02, ROLE-03, ROLE-04, ROLE-05, ROLE-06, BEHV-01)
- [ ] 03-02-PLAN.md — Developer role SDLC journey: 12 scenarios across Discovery, Requirements, Design phases (ROLE-01, ROLE-02, ROLE-03, ROLE-04, ROLE-05, ROLE-06, BEHV-01)
- [ ] 03-03-PLAN.md — QA role SDLC journey: 12 scenarios across Discovery, Requirements, Design phases (ROLE-01, ROLE-02, ROLE-03, ROLE-04, ROLE-05, ROLE-06, BEHV-01)
- [ ] 03-04-PLAN.md — DesignationPortal multi-role wiring: load all 36 scenarios, fix role bug, phase-grouped navigation, validate-all script (ROLE-07, ROLE-08)

### Phase 4: Completion and Cross-Role Impact
**Goal**: After completing a role journey, the user sees their behavioral blind spot profile and how their decisions rippled into other designations — built against real scored data from Phase 3
**Depends on**: Phase 3
**Requirements**: XROL-01, XROL-02, XROL-03, BEHV-02, BEHV-03
**Success Criteria** (what must be TRUE):
  1. After completing any role journey, the user sees a named behavioral archetype and a narrative describing the SDLC phases and friction dimensions where their pattern is strongest — not a numeric score
  2. The cross-role impact view shows at least 2 named other designations affected by the user's actual choices — consequence strings are keyed to the specific choices made, not generic fallback text
  3. A user who completes two different role journeys sees a compound insight on the second completion that references the pattern from their first role — not a generic completion screen
  4. The completion screen includes a single concrete commitment the user can make, plus the role-specific scripts and rubric from the existing completion pattern
**Plans**: 4 plans

Plans:
- [ ] 04-01-PLAN.md — Populate crossRoleImpactMap via buildImpactMap() from scenario data, extract FRICTION_CONFIG to shared file (XROL-01)
- [ ] 04-02-PLAN.md — JourneyCompleteView with archetype profile, phase breakdown bars, tomorrow's action, scripts/rubric, canvas-confetti, DesignationPortal "complete" mode wiring (BEHV-02, BEHV-03)
- [ ] 04-03-PLAN.md — CrossRoleImpactView with choice-keyed consequence cards grouped by affected role, severity indicators (XROL-02)
- [ ] 04-04-PLAN.md — Multi-role compound insights: pattern delta comparing archetypes across completed roles (XROL-03)

### Phase 5: Full Platform Delivery
**Goal**: All 8 designation role journeys are complete, the client-facing layers are audited and fixed, and navigation between all platform layers is seamless with no dead ends
**Depends on**: Phase 4
**Requirements**: AUDT-01, AUDT-02, AUDT-03, AUDT-04, AUDT-05
**Success Criteria** (what must be TRUE):
  1. All 5 remaining role journeys (Sales, Designer, BA, CRM, Strategy) pass content QA — all debrief fields under 150 words, tomorrow's action names a real artifact, role-specific language throughout
  2. A user clicking through the client-facing primer encounters no dead ends — every screen has a clear next action and the funnel friction experiences (Bait, Chaos, Maze, Trap, Wall) each have a visible "good" counterpart
  3. A user completing Layer 1 (felt friction) is prompted with a contextual bridge to Layer 2 (SDLC walkthrough) — not a generic home screen
  4. A user completing Layer 2 is prompted with a contextual bridge into the Designation Portal — the SDLC phases they just walked are the same backbone they will navigate in their role
  5. The full cross-role impact map is populated for all 8 role combinations; a user who completes 3+ roles sees compounding cross-role pattern insights
**Plans**: 6 plans

Plans:
- [ ] 05-01-PLAN.md — Sales and Designer role SDLC journeys: 24 scenarios across 3 phases x 4 friction dimensions (AUDT-01)
- [ ] 05-02-PLAN.md — BA and CRM role SDLC journeys: 24 scenarios across 3 phases x 4 friction dimensions (AUDT-01)
- [ ] 05-03-PLAN.md — Strategy role SDLC journey: 12 scenarios across 3 phases x 4 friction dimensions (AUDT-01)
- [ ] 05-04-PLAN.md — Client experience audit: ClientFinalConnect bridge to /internalteam, funnel friction pair verification (AUDT-01, AUDT-02)
- [ ] 05-05-PLAN.md — Layer navigation bridges: Layer2Complete contextual messaging, JourneyCompleteView multi-role arc, ROLE_COMPLETION_CONTENT for 5 new roles (AUDT-03, AUDT-04, AUDT-05)
- [ ] 05-06-PLAN.md — DesignationPortal wiring for 5 new roles + cross-role impact map completion with all 24 scenario files (AUDT-01, AUDT-04, AUDT-05)

## Progress

**Execution Order:**
Phases execute sequentially: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 4/4 | Complete   | 2026-03-23 |
| 2. Scoring Engine | 2/2 | Complete   | 2026-03-23 |
| 3. Role Content — First Wave | 0/4 | Not started | - |
| 4. Completion and Cross-Role Impact | 0/4 | Not started | - |
| 5. Full Platform Delivery | 6/6 | Complete   | 2026-03-24 |
