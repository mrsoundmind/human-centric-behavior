---
phase: 5
slug: full-platform-delivery
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-24
---

# Phase 5 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | None — manual QA adequate for experiential content validation (per REQUIREMENTS.md) |
| **Config file** | none |
| **Quick run command** | `npx tsc --noEmit` |
| **Full suite command** | `npm run build` |
| **Estimated runtime** | ~15 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx tsc --noEmit`
- **After every plan wave:** Run `npm run build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 15 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 05-01-01 | 01 | 1 | AUDT-01 | smoke | `npx tsc --noEmit` | ❌ W0 — 6 new scenario files | ⬜ pending |
| 05-02-01 | 02 | 1 | AUDT-01 | smoke | `npx tsc --noEmit` | ❌ W0 — 6 new scenario files | ⬜ pending |
| 05-03-01 | 03 | 1 | AUDT-01 | smoke | `npx tsc --noEmit` | ❌ W0 — 3 new scenario files | ⬜ pending |
| 05-04-01 | 04 | 2 | AUDT-02 | manual | N/A | ✅ ClientFinalConnect.tsx | ⬜ pending |
| 05-05-01 | 05 | 2 | AUDT-03, AUDT-04, AUDT-05 | manual | N/A | ✅ Multiple files | ⬜ pending |
| 05-06-01 | 06 | 3 | AUDT-01 | smoke | `npx tsc --noEmit` | ✅ cross-role-impact-map.ts | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `data/scenarios/sales/discovery.ts` — sales discovery scenarios (4 scenarios)
- [ ] `data/scenarios/sales/requirements.ts` — sales requirements scenarios (4 scenarios)
- [ ] `data/scenarios/sales/design.ts` — sales design scenarios (4 scenarios)
- [ ] `data/scenarios/designer/discovery.ts` — designer discovery scenarios (4 scenarios)
- [ ] `data/scenarios/designer/requirements.ts` — designer requirements scenarios (4 scenarios)
- [ ] `data/scenarios/designer/design.ts` — designer design scenarios (4 scenarios)
- [ ] `data/scenarios/ba/discovery.ts` — BA discovery scenarios (4 scenarios)
- [ ] `data/scenarios/ba/requirements.ts` — BA requirements scenarios (4 scenarios)
- [ ] `data/scenarios/ba/design.ts` — BA design scenarios (4 scenarios)
- [ ] `data/scenarios/crm/discovery.ts` — CRM discovery scenarios (4 scenarios)
- [ ] `data/scenarios/crm/requirements.ts` — CRM requirements scenarios (4 scenarios)
- [ ] `data/scenarios/crm/design.ts` — CRM design scenarios (4 scenarios)
- [ ] `data/scenarios/strategy/discovery.ts` — strategy discovery scenarios (4 scenarios)
- [ ] `data/scenarios/strategy/requirements.ts` — strategy requirements scenarios (4 scenarios)
- [ ] `data/scenarios/strategy/design.ts` — strategy design scenarios (4 scenarios)

*These are the primary deliverables of plans 05-01 through 05-03.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| ClientFinalConnect bridge to /internalteam | AUDT-01 | UI navigation flow | Click through client experience to final screen, verify bridge CTA exists and links to /internalteam |
| All 5 funnel friction/good pairs visible | AUDT-02 | Visual content pairing | Walk through all 18 client steps, verify each bad funnel has a good counterpart |
| Layer2Complete contextual bridge messaging | AUDT-03 | Messaging quality | Complete Layer 2, verify bridge text references SDLC phases and links to Designation Portal |
| No dead ends across all layers | AUDT-04 | End-to-end navigation | Click through every terminal screen, verify all have a clear next action |
| Layer completion prompts contextual bridge | AUDT-05 | Cross-layer navigation | Complete each layer, verify contextual bridge to next layer appears |

---

## Validation Sign-Off

- [ ] All tasks have `<automated>` verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 15s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
