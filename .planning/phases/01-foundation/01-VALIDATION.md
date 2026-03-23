---
phase: 1
slug: foundation
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-23
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | TypeScript compiler + Zod runtime validation (no test runner — project scopes out automated test suites per REQUIREMENTS.md) |
| **Config file** | `tsconfig.app.json` (existing) |
| **Quick run command** | `npx tsc --noEmit` |
| **Full suite command** | `npx tsc --noEmit && npm run dev` (Zod validates at startup) |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx tsc --noEmit`
- **After every plan wave:** Run `npx tsc --noEmit` + manual dev server walkthrough of stub scenario
- **Before `/gsd:verify-work`:** Full suite must be green — TypeScript clean + Zod startup clean + no console warnings
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 01-01-01 | 01 | 1 | CINF-01 | compile | `npx tsc --noEmit` | ❌ W0 | ⬜ pending |
| 01-01-02 | 01 | 1 | CINF-03, CINF-04 | runtime | `npm run dev` — Zod throws on malformed scenario | ❌ W0 | ⬜ pending |
| 01-01-03 | 01 | 1 | CINF-05 | compile + runtime | `npx tsc --noEmit` + Zod validation | ❌ W0 | ⬜ pending |
| 01-02-01 | 02 | 1 | STAT-01 | compile + grep | `npx tsc --noEmit` + `grep -r "useSDLC" src/state/` returns nothing | ❌ W0 | ⬜ pending |
| 01-02-02 | 02 | 1 | STAT-02 | grep | `grep -r "SDLCProvider\|useSDLC" src/state/` — zero matches | N/A | ⬜ pending |
| 01-02-03 | 02 | 1 | STAT-03 | manual | Set `schemaVersion: 0` in localStorage, reload — expect reset message | N/A | ⬜ pending |
| 01-02-04 | 02 | 1 | STAT-04 | manual | Select choice, refresh, inspect localStorage for decision record | N/A | ⬜ pending |
| 01-03-01 | 03 | 2 | CINF-02 | manual | Navigate to DesignationPortal, select PM, see stub scenario rendered | N/A | ⬜ pending |
| 01-03-02 | 03 | 2 | ROLE-08 | compile | `npx tsc --noEmit` — usePhaseNavigation hook compiles | N/A | ⬜ pending |
| 01-04-01 | 04 | 2 | TECH-01 | manual | Navigate into/out of DelayedResponseExperience 3x — zero console warnings | N/A | ⬜ pending |
| 01-04-02 | 04 | 2 | TECH-02 | compile | `npx tsc --noEmit` with strict on new files — zero `any` in new code | N/A | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `npm install zustand@5.0.12 immer@11.1.4` — required for STAT-01..04
- [ ] Create `src/data/scenarios/` directory — required for CINF-01
- [ ] Create `src/state/` directory — required for STAT-01

*Zod 3.25.76 already installed — no additional dependencies for CINF-03..05.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| ScenarioRenderer displays stub PM/Discovery | CINF-02 | Visual rendering verification | Open dev server → navigate to DesignationPortal → select PM → verify scenario renders with choices |
| localStorage schema version mismatch resets gracefully | STAT-03 | Requires manual localStorage manipulation | DevTools → Application → Local Storage → edit `schemaVersion` to 0 → reload → verify reset message shown |
| Decision persists across refresh | STAT-04 | Requires browser interaction | Make a choice in stub scenario → refresh page → verify choice persisted and journey resumes |
| No console warnings on mount/unmount | TECH-01 | Requires rapid navigation observation | DevTools Console → navigate into/out of DelayedResponseExperience 3 times rapidly → zero "can't update unmounted" warnings |

---

## Validation Sign-Off

- [ ] All tasks have automated verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
