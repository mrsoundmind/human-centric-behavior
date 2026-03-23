---
phase: 01-foundation
plan: 03
subsystem: scenario-rendering
tags: [ScenarioRenderer, DesignationPortal, mode-routing, framer-motion, zustand, phase-navigation]
dependency_graph:
  requires: [01-01, 01-02]
  provides: [ScenarioRenderer, DesignationPortal, mode-routing-pipeline]
  affects: [InternalExperience, RoleBriefingView]
tech_stack:
  added: []
  patterns:
    - Generic data-driven renderer (no role branches in ScenarioRenderer)
    - AnimatePresence mode=wait for debrief reveal
    - usePhaseNavigation + useDesignationStore wired in DesignationPortal
    - Backward-compatible prop extension (onSelectMode optional, onContinue preserved)
key_files:
  created:
    - src/components/experiences/internal/designation-portal/ScenarioRenderer.tsx
    - src/components/experiences/internal/DesignationPortal.tsx
  modified:
    - src/components/experiences/internal/RoleBriefingView.tsx
    - src/components/experiences/internal/InternalExperience.tsx
decisions:
  - "ScenarioRenderer is strictly role-agnostic — FRICTION_CONFIG record drives badge colors, no role conditionals anywhere in the component"
  - "DesignationPortal manages portal mode state locally (select/briefing/full-sdlc/quick) — parent only receives onStartQuickMode and onComplete callbacks"
  - "Non-PM roles in Full SDLC mode show placeholder — Phase 3 will populate scenario content; placeholder is explicit and actionable"
  - "RoleBriefingView onContinue made optional for backward compatibility — existing callers without onSelectMode still work"
  - "handleRoleSelect and DesignationSelect import kept in InternalExperience (hints only, not errors) — plan mandated no deletions"
metrics:
  duration: 217s
  completed: "2026-03-23"
  tasks_completed: 2
  files_created: 2
  files_modified: 2
---

# Phase 1 Plan 3: ScenarioRenderer and DesignationPortal Summary

Generic ScenarioRenderer rendering any ScenarioConfig + DesignationPortal wiring role selection, mode routing (Full SDLC vs Quick), and the stub PM/Discovery scenario into a complete end-to-end pipeline.

## Tasks Completed

### Task 1: Create ScenarioRenderer component
**Commit:** `58b42d1`
**Files:** `src/components/experiences/internal/designation-portal/ScenarioRenderer.tsx`

Created a fully generic scenario renderer consuming `ScenarioConfig` props with no role-specific conditional branches. Renders title, friction dimension badge (4 color variants: blue/amber/purple/red), setup card, choice buttons with selected-state ring, all 5 debrief fields (`whatHappened`, `why`, `how`, `whoBecame`, `tomorrowAction`), and an advance button. Uses `AnimatePresence mode="wait"` for the debrief reveal. Supports `active` (default) and `readonly` modes.

### Task 2: Create DesignationPortal and update InternalExperience + RoleBriefingView
**Commit:** `757bd75`
**Files:** `DesignationPortal.tsx`, `RoleBriefingView.tsx`, `InternalExperience.tsx`

- **DesignationPortal**: Manages portal mode state (`select -> briefing -> full-sdlc | quick`). Full SDLC mode wires `ScenarioRenderer` + `usePhaseNavigation` + `useDesignationStore.recordDecision`. Non-PM roles show explicit coming-soon placeholder.
- **RoleBriefingView**: Added optional `onSelectMode` prop. When provided, renders "Full SDLC Journey" (primary) and "Quick Scenarios" (secondary) buttons with descriptive subtitles. Existing `onContinue` path preserved for backward compatibility.
- **InternalExperience**: Minimal change — designation step now renders `<DesignationPortal>` instead of bare `<DesignationSelect>`. All existing imports and journey components untouched.

## Deviations from Plan

None — plan executed exactly as written.

## Verification Results

- `npx tsc --noEmit`: PASS (zero errors)
- `grep '=== "pm"' ScenarioRenderer.tsx`: Match in JSDoc comment only — no logic branches
- All acceptance criteria met for both tasks
- Full pipeline proven: role select -> mode choice -> scenario -> choice -> `recordDecision` in Zustand store -> persisted to localStorage

## Self-Check: PASSED

All created files exist on disk. Both task commits verified in git log.
