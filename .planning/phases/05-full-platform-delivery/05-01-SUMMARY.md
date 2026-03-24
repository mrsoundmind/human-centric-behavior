---
phase: 05-full-platform-delivery
plan: "01"
subsystem: scenario-content
tags: [scenarios, sales, designer, sdlc, content-authoring]
dependency_graph:
  requires: []
  provides:
    - data/scenarios/sales/discovery.ts (salesDiscoveryScenarios)
    - data/scenarios/sales/requirements.ts (salesRequirementsScenarios)
    - data/scenarios/sales/design.ts (salesDesignScenarios)
    - data/scenarios/designer/discovery.ts (designerDiscoveryScenarios)
    - data/scenarios/designer/requirements.ts (designerRequirementsScenarios)
    - data/scenarios/designer/design.ts (designerDesignScenarios)
  affects:
    - ScenarioRenderer (consumes ScenarioConfig objects)
    - Role journey orchestrators for sales and designer roles
tech_stack:
  added: []
  patterns:
    - "validateScenario() Zod validation at import time — fails loudly in development"
    - "4 friction dimensions per phase: client_friction, internal_bureaucracy, knowledge_gap, conflict_avoidance"
    - "crossRoleImpact array on friction choices — every friction choice documents downstream cascade"
key_files:
  created:
    - data/scenarios/sales/discovery.ts
    - data/scenarios/sales/requirements.ts
    - data/scenarios/sales/design.ts
    - data/scenarios/designer/discovery.ts
    - data/scenarios/designer/requirements.ts
    - data/scenarios/designer/design.ts
  modified: []
decisions:
  - "Indian B2B context used throughout: IBC clients, SAP integrations, TCS projects, rupee amounts — grounds scenarios in recognizable enterprise delivery context"
  - "tomorrowAction references a specific named artifact in every scenario (template, checklist, matrix, guide, brief) — not generic advice"
  - "crossRoleImpact descriptions name the specific downstream consequence with the affected role and SDLC phase — connects sales/designer decisions to delivery team impact"
metrics:
  duration: "372s (~6 min)"
  completed_date: "2026-03-24"
  tasks_completed: 2
  files_created: 6
---

# Phase 5 Plan 01: Sales and Designer SDLC Scenarios Summary

24 Zod-validated SDLC scenarios for Sales and Designer roles — 12 each covering 3 phases x 4 friction dimensions — with Indian B2B context, crossRoleImpact arrays, and artifact-named tomorrowActions.

## What Was Built

Six scenario data files across two roles:

**Sales role (12 scenarios):**
- `data/scenarios/sales/discovery.ts` — The Verbal Scope, The Approval Bottleneck, The Integration Blind Spot, The Price Absorber
- `data/scenarios/sales/requirements.ts` — The Scope Creep Handshake, The Resource Queue, The Lost Handover, The SLA Absorber
- `data/scenarios/sales/design.ts` — The Brand Promise, The Sign-Off Maze, The Phantom Feature, The Vague Pushback

**Designer role (12 scenarios):**
- `data/scenarios/designer/discovery.ts` — The Premature Concept, The Tool Procurement Delay, The Missing Context, The Pattern Compliance
- `data/scenarios/designer/requirements.ts` — The Legal Copy, The Review Backlog, The Contextless Spec, The Dual Design
- `data/scenarios/designer/design.ts` — The Accessibility Conflict, The Committee Review, The Silent Handoff, The Effort Retreat

## Validation

- `npx tsc --noEmit` exits 0 with zero errors
- `npm run build` succeeds — Zod validation runs at import time across all 6 files
- Every scenario: 4 choices minimum (2 per scenario), all debrief fields present, all IDs role-prefixed

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed typo in designer/design.ts crossRoleImpact field**
- **Found during:** Task 2 post-write verification
- **Issue:** `afferedPhase` typo in the conflict_avoidance scenario's crossRoleImpact object. Zod schema requires `affectedPhase` — the misspelling would cause a runtime validation failure.
- **Fix:** Corrected to `affectedPhase` before committing
- **Files modified:** `data/scenarios/designer/design.ts`
- **Commit:** Included in 2057f47

## Decisions Made

1. **Indian B2B context grounding** — Used IBC (Indian Business Clients), SAP S/4HANA integrations, TCS projects, rupee amounts (₹2-5Cr range), Bangalore/Mumbai/Pune geography throughout. This makes scenarios immediately recognizable to Zyxware's target audience without feeling generic.

2. **Artifact specificity in tomorrowAction** — Every tomorrowAction names a concrete artifact: "Scope Confirmation Appendix," "Fast-Track Legal Request template," "Technical Capability Matrix," "Design Readiness Gate slide," etc. This follows the plan's requirement that tomorrowActions reference specific workflow artifacts, not generic advice.

3. **crossRoleImpact on friction choices only** — The better choice (non-friction path) always has an empty crossRoleImpact array. The friction choice documents the downstream cascade. This reinforces the pedagogical point: friction choices create cross-team consequences.

## Self-Check: PASSED

Files verified present:
- data/scenarios/sales/discovery.ts — FOUND
- data/scenarios/sales/requirements.ts — FOUND
- data/scenarios/sales/design.ts — FOUND
- data/scenarios/designer/discovery.ts — FOUND
- data/scenarios/designer/requirements.ts — FOUND
- data/scenarios/designer/design.ts — FOUND

Commits verified:
- 722bba5 — feat(05-01): author Sales role SDLC scenarios
- 2057f47 — feat(05-01): author Designer role SDLC scenarios
