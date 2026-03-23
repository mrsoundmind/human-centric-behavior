---
phase: 4
slug: completion-and-cross-role-impact
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-23
---

# Phase 4 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | TypeScript compiler + dev server visual verification (automated test suite explicitly out of scope per REQUIREMENTS.md) |
| **Config file** | `tsconfig.app.json` (existing) |
| **Quick run command** | `npx tsc --noEmit` |
| **Full suite command** | `npx tsc --noEmit && npm run dev` (visual verification in browser) |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx tsc --noEmit`
- **After every plan wave:** Run `npx tsc --noEmit` + visual walkthrough of completion screen in dev server
- **Before `/gsd:verify-work`:** Full suite green + all 3 roles completable end-to-end in browser
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 04-01-01 | 01 | 1 | XROL-01 | compile + manual | `npx tsc --noEmit` + verify buildImpactMap() output in dev console | N/A | ⬜ pending |
| 04-02-01 | 02 | 1 | BEHV-02, BEHV-03 | compile + manual | `npx tsc --noEmit` + complete PM journey → verify archetype display | N/A | ⬜ pending |
| 04-03-01 | 03 | 2 | XROL-02 | compile + manual | `npx tsc --noEmit` + verify impact cards match actual choices | N/A | ⬜ pending |
| 04-04-01 | 04 | 2 | XROL-03 | compile + manual | `npx tsc --noEmit` + complete 2 roles → verify compound insight | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `npm install canvas-confetti && npm install --save-dev @types/canvas-confetti` — completion celebration animation
- [ ] No other new npm dependencies required

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| Completion screen shows archetype name and narrative, not a score | BEHV-02 | Visual rendering | Complete any role journey → verify archetype profile card with name, narrative, doThis |
| Completion screen includes scripts and rubric sections | BEHV-03 | Visual rendering | Compare completion screen structure against RoleMasterclassComplete pattern |
| Cross-role impact cards show consequences from actual choices | XROL-02 | Requires browser interaction | Complete PM journey → verify impact cards reference actual choices made, not all possible impacts |
| Second role completion shows compound insight | XROL-03 | Requires two full journeys | Complete PM journey → then complete Developer journey → verify compound insight references PM archetype |
| Impact map derived from scenario crossRoleImpact data | XROL-01 | Content verification | Check console log that buildImpactMap() returns correct number of edges |

---

## Validation Sign-Off

- [ ] All tasks have automated verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
