---
phase: 05-full-platform-delivery
plan: 02
subsystem: content
tags: [scenarios, ba, crm, zod, typescript, sdlc]

# Dependency graph
requires:
  - phase: 05-full-platform-delivery
    provides: schema.ts, types.ts, validateScenario() — the Zod validation infrastructure all scenario files depend on

provides:
  - 12 BA scenarios across Discovery, Requirements, Design phases (4 each)
  - 12 CRM scenarios across Discovery, Requirements, Design phases (4 each)
  - All 4 friction dimensions covered per role per phase (client_friction, internal_bureaucracy, knowledge_gap, conflict_avoidance)
  - data/scenarios/ba/ directory with 3 files
  - data/scenarios/crm/ directory with 3 files

affects:
  - Any plan that imports from data/scenarios/ba/* or data/scenarios/crm/*
  - ScenarioRenderer — renders BA and CRM scenarios once journey routing is wired
  - InternalExperience — BA and CRM journey selection paths

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Scenario file structure: import validateScenario from ../schema, raw object, export const [role][Phase]Scenarios = [validateScenario(...), ...]
    - All scenario IDs follow kebab convention: [role]-[phase-short]-[frictionTag]-01
    - crossRoleImpact arrays on friction choices, empty arrays on better choices
    - debrief.tomorrowAction names specific workflow artifacts (template names, checklist names, document names)

key-files:
  created:
    - data/scenarios/ba/discovery.ts
    - data/scenarios/ba/requirements.ts
    - data/scenarios/ba/design.ts
    - data/scenarios/crm/discovery.ts
    - data/scenarios/crm/requirements.ts
    - data/scenarios/crm/design.ts
  modified: []

key-decisions:
  - "BA scenario themes: requirement clarity (traceability matrices, change impact assessments), stakeholder alignment (priority workshops, 3-way clarification calls), UAT facilitation (UAT scripts, environment lead times)"
  - "CRM scenario themes: client retention friction (friction logs, health checks), escalation handling (war room protocols), renewal mechanics (legal lead times, champion continuity)"
  - "tomorrowAction artifact naming convention followed throughout: every action names a specific deliverable (e.g. 'Priority Alignment Workshop', 'Escalation War Room Protocol', 'Champion Continuity Document')"
  - "crossRoleImpact on friction choices only — better choices have empty arrays, consistent with pm/ reference pattern"

patterns-established:
  - "BA scenarios: client_friction targets PM, knowledge_gap targets QA or developer, conflict_avoidance targets designer or developer, internal_bureaucracy targets developer or QA"
  - "CRM scenarios: client_friction targets PM, internal_bureaucracy targets sales or strategy, knowledge_gap targets sales, conflict_avoidance targets PM"

requirements-completed: [AUDT-01]

# Metrics
duration: 15min
completed: 2026-03-24
---

# Phase 5 Plan 02: BA and CRM SDLC Scenarios Summary

**24 Zod-validated scenarios (12 BA + 12 CRM) covering all 4 friction dimensions across Discovery, Requirements, and Design phases with Indian B2B context and artifact-specific tomorrowActions**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-03-24T03:00:00Z
- **Completed:** 2026-03-24T03:12:46Z
- **Tasks:** 2 of 2
- **Files modified:** 6 created

## Accomplishments

- 12 BA scenarios authored and Zod-validated: requirement clarity across kickoff, access requests, knowledge transfer, and conflict escalation themes
- 12 CRM scenarios authored and Zod-validated: client retention, escalation management, renewal operations, and satisfaction recovery themes
- All scenarios follow Indian B2B context (₹ amounts, named clients like IBC/SAP/TCS, Indian enterprise workflow realities)
- Every tomorrowAction names a specific workflow artifact (Priority Alignment Workshop, Escalation War Room Protocol, Champion Continuity Document, etc.)
- `npx tsc --noEmit` and `npm run build` both pass with zero errors

## Task Commits

1. **Task 1: Author BA role SDLC scenarios (3 files, 12 scenarios)** - `11d035e` (feat)
2. **Task 2: Author CRM role SDLC scenarios (3 files, 12 scenarios)** - `3ade9ab` (feat)

## Files Created/Modified

- `data/scenarios/ba/discovery.ts` — 4 BA Discovery scenarios: The Unstructured Kickoff, The Access Maze, The Departing Expert, The Contradictory Stakeholders
- `data/scenarios/ba/requirements.ts` — 4 BA Requirements scenarios: The Last-Minute Pivot, The Wet Signature, The Regulatory Blind Spot, The Vague Revision
- `data/scenarios/ba/design.ts` — 4 BA Design scenarios: The Wireframe Disconnect, The UAT Environment, The Unstructured UAT, The Silent Gap
- `data/scenarios/crm/discovery.ts` — 4 CRM Discovery scenarios: The Renewal Confrontation, The Escalation Maze, The Undocumented History, The Optimistic Report
- `data/scenarios/crm/requirements.ts` — 4 CRM Requirements scenarios: The Roadmap Gap, The Data Silo, The Invisible Friction, The Milestone Miss
- `data/scenarios/crm/design.ts` — 4 CRM Design scenarios: The Custom Onboarding Promise, The Renewal Delay, The Champion Exit, The Gift Voucher Fix

## Decisions Made

- BA scenarios centre on three core pain points: requirement clarity (traceability, change management), stakeholder alignment (priority workshops, 3-way calls), and UAT facilitation (scripts, environment procurement)
- CRM scenarios centre on three core pain points: client retention friction (logging, health checks), escalation handling (war room protocols, single ownership), and renewal operations (legal lead times, champion continuity)
- tomorrowAction artifact naming convention followed throughout — every action ends with a named deliverable a user can create tomorrow, consistent with platform's "changed in how they work" promise
- crossRoleImpact populated on friction choices only — better choices have empty arrays, consistent with the pm/ reference implementation

## Deviations from Plan

None — plan executed exactly as written.

## Issues Encountered

None.

## User Setup Required

None — no external service configuration required.

## Next Phase Readiness

- BA and CRM scenario data files are ready to be imported by their respective journey components (BAJourney.tsx, CRMJourney.tsx)
- Remaining 3 roles needing full SDLC scenarios: Sales (partial), Strategy, Developer (partial) — Phase 5 Plans 03+ will address these
- All 6 files pass TypeScript and Zod validation at import time

---
*Phase: 05-full-platform-delivery*
*Completed: 2026-03-24*
