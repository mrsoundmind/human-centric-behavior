---
phase: 3
slug: role-content-first-wave
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-23
---

# Phase 3 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | TypeScript compiler + Zod import-time validation + dev server visual verification |
| **Config file** | `tsconfig.app.json` (existing) |
| **Quick run command** | `npx tsc --noEmit` |
| **Full suite command** | `npx tsc --noEmit && npm run dev` (Zod validates all scenarios at import) |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx tsc --noEmit`
- **After every plan wave:** Run `npx tsc --noEmit` + visual walkthrough of new scenarios in dev server
- **Before `/gsd:verify-work`:** Full suite green + all 3 roles playable end-to-end in browser
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 03-01-01 | 01 | 1 | ROLE-01, ROLE-02 | compile + runtime | `npx tsc --noEmit` + `npm run dev` (Zod validates PM scenarios) | ❌ W0 | ⬜ pending |
| 03-02-01 | 02 | 1 | ROLE-01, ROLE-02 | compile + runtime | `npx tsc --noEmit` + `npm run dev` (Zod validates Developer scenarios) | ❌ W0 | ⬜ pending |
| 03-03-01 | 03 | 1 | ROLE-01, ROLE-02 | compile + runtime | `npx tsc --noEmit` + `npm run dev` (Zod validates QA scenarios) | ❌ W0 | ⬜ pending |
| 03-04-01 | 04 | 2 | ROLE-08, BEHV-01 | compile + manual | `npx tsc --noEmit` + play full PM journey in browser | N/A | ⬜ pending |
| 03-04-02 | 04 | 2 | ROLE-07 | manual | Navigate to Quick Mode — existing journeys still work | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] Expand `data/scenarios/pm/discovery.ts` from 1 stub to 4 scenarios
- [ ] Create `data/scenarios/pm/requirements.ts` and `data/scenarios/pm/design.ts`
- [ ] Create `data/scenarios/developer/` directory with 3 phase files
- [ ] Create `data/scenarios/qa/` directory with 3 phase files
- [ ] No new npm dependencies required

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| ScenarioRenderer renders all 36 scenarios without visual bugs | ROLE-01 | Visual rendering | Play through all 3 roles in dev server — each scenario shows friction badge, setup, choices, debrief |
| Phase navigation works across 3 SDLC phases | ROLE-08 | Requires browser interaction | Complete PM Discovery (4 scenarios) → auto-advance to Requirements → then Design |
| Existing Quick Mode still works | ROLE-07 | Regression check | Select any role → choose Quick Scenarios → play through existing 3-scenario journey |
| Decision log persists across refresh | STAT-04 | Requires browser | Make choices in Developer journey → refresh → resume at correct phase |
| Tomorrow's action names specific artifact | BEHV-01 | Content quality | Read each tomorrowAction field — must name a document, template, checklist, or meeting artifact |

---

## Validation Sign-Off

- [ ] All tasks have automated verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
