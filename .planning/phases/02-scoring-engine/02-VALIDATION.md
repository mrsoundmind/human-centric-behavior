---
phase: 2
slug: scoring-engine
status: draft
nyquist_compliant: false
wave_0_complete: false
created: 2026-03-23
---

# Phase 2 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | TypeScript compiler + `npx tsx` for Node-runnable scripts (no test runner — automated test suites out of scope per REQUIREMENTS.md) |
| **Config file** | `tsconfig.app.json` (existing) |
| **Quick run command** | `npx tsc --noEmit` |
| **Full suite command** | `npx tsc --noEmit && npx tsx scripts/test-scoring-engine.ts` |
| **Estimated runtime** | ~10 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npx tsc --noEmit`
- **After every plan wave:** Run `npx tsc --noEmit && npx tsx scripts/test-scoring-engine.ts`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 10 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 02-01-01 | 01 | 1 | SCOR-01, SCOR-02, SCOR-04 | compile + runtime | `npx tsc --noEmit && npx tsx scripts/test-scoring-engine.ts` | ❌ W0 | ⬜ pending |
| 02-01-02 | 01 | 1 | SCOR-01 | runtime | `npx tsx scripts/test-scoring-engine.ts` — Node execution proves zero React imports | ❌ W0 | ⬜ pending |
| 02-02-01 | 02 | 2 | SCOR-03, SCOR-05 | runtime | `npx tsx scripts/test-scoring-engine.ts` — assert archetype name + shifts array | ❌ W0 | ⬜ pending |
| 02-02-02 | 02 | 2 | SCOR-05 | runtime | `npx tsx scripts/test-scoring-engine.ts` — assert `phaseBreakdown.length >= 2` | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [ ] `scripts/test-scoring-engine.ts` — simulation script with 21 decisions across 3 phases; asserts SCOR-01..05
- [ ] `data/scoring-engine.ts` — the engine module (does not exist yet)
- [ ] `data/scoring-archetypes.ts` — archetype lookup table (separate from algorithm)
- [ ] Verify `npx tsx --version` works (existing TypeScript toolchain)

*No new npm dependencies required.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| ScoringProfile has no `score`/`grade`/`points` field | SCOR-04 | Requires type inspection | `grep -r "score:\|grade:\|points:\|correct:" data/scoring-engine.ts` — zero matches for numeric score fields |

---

## Validation Sign-Off

- [ ] All tasks have automated verify or Wave 0 dependencies
- [ ] Sampling continuity: no 3 consecutive tasks without automated verify
- [ ] Wave 0 covers all MISSING references
- [ ] No watch-mode flags
- [ ] Feedback latency < 10s
- [ ] `nyquist_compliant: true` set in frontmatter

**Approval:** pending
