# Phase 4: Completion and Cross-Role Impact - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Build the journey completion experience and cross-role impact visualization. After completing all 12 scenarios in a role journey, the user sees their behavioral blind spot profile (archetype name, narrative, phase breakdown) and how their decisions rippled into other designations. Users who complete multiple roles see compound insights comparing their patterns across roles. The scoring engine (Phase 2) and scenario data (Phase 3) are consumed — no new scenario content is authored.

</domain>

<decisions>
## Implementation Decisions

### Completion Screen Layout (USER-LOCKED patterns apply)
- New JourneyCompleteView component — NOT modifying existing RoleMasterclassComplete.tsx (that serves Quick Mode)
- Top section: Blind spot archetype display — archetype name, narrative, whatYouDo, whyItMatters as a behavioral profile card
- Phase breakdown section: Visual representation of the user's friction pattern across Discovery/Requirements/Design (radar chart or dimension bars — NO numeric scores visible)
- "Tomorrow's Action" section: doThis from the archetype, styled with the established amber highlight pattern (`bg-amber-500/10 border-amber-500/30 text-amber-100`)
- Behavioral shifts section: If the user shifted patterns between phases (e.g., avoided conflict in Discovery but took risks in Design), surface this with a narrative sentence
- Bottom section: Single concrete commitment (from archetype doThis), existing scripts/rubric pattern extended with role-specific content
- Dark background, Framer Motion AnimatePresence, shadcn/ui components — same as everything else
- canvas-confetti on completion (lightweight celebration, already a common pattern)

### Cross-Role Impact Visualization
- CrossRoleImpactView component — shown as a section within or navigable from JourneyCompleteView
- Card-based layout: one card per affected role, showing the consequence string from the user's actual choices
- Consequence strings are keyed to specific choiceIds the user selected — NOT generic fallback text
- Each card shows: affected role icon/name, affected SDLC phase, consequence description, severity indicator
- Only show impacts from choices the user actually made — silent on choices not taken
- frictionTag colors from ScenarioRenderer's FRICTION_CONFIG used for consistency

### Cross-Role Impact Map Population
- The crossRoleImpactMap in `data/scenarios/cross-role-impact-map.ts` should be populated by extracting ImpactEdge entries from the `crossRoleImpact[]` arrays already embedded in each scenario choice
- Create a utility function `buildImpactMap()` that walks all scenario files and collects impact edges — no manual duplication of data
- This is a build-time/import-time derivation, not runtime — the map is static once scenarios are loaded
- Alternative: populate crossRoleImpactMap as a flat static array directly (simpler, but requires keeping in sync with scenario data)
- Decision: Use the derivation approach — single source of truth in scenario choices

### Multi-Role Compound Insights
- When a user completes their second (or third) role, the completion screen includes a "Cross-Role Pattern" section
- Pattern delta: compare current role's archetype with the previously completed role's archetype
- Compound insight narrative: "As a PM, you were a Discovery Absorber. As a Developer, you became a Requirements Shield. Your pattern shifted from conflict avoidance to bureaucratic protection when you changed roles."
- Use DesignationStore's per-role decision logs to compute profiles for each completed role
- If only one role completed: show standard single-role completion (no compound section)
- If 2+ roles completed: show the compound insight after the single-role profile

### Journey Flow Wiring
- DesignationPortal's FullSDLCJourney onComplete callback should transition to JourneyCompleteView (new portal mode)
- DesignationPortal mode state machine extended: add "complete" mode after "full-sdlc"
- completeRole() already exists in DesignationStore — call it when journey finishes
- JourneyCompleteView receives the role and reads decision log from DesignationStore to compute the profile via computeProfile()

### Claude's Discretion
- Exact layout proportions and spacing of the completion screen
- Whether phase breakdown uses a radar chart (canvas-based) or simple dimension bars (CSS-only) — both acceptable
- Canvas-confetti implementation details (timing, particle count, duration)
- Exact compound insight narrative generation logic
- How to handle the edge case of a user with insufficient decisions (< 3) — likely show a "complete more scenarios" prompt

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Context
- `.planning/PROJECT.md` — Core value (behavioral change), no numeric scores, Indian B2B context
- `.planning/REQUIREMENTS.md` — XROL-01..03, BEHV-02..03 requirements with exact descriptions
- `.planning/ROADMAP.md` — Phase 4 goal, success criteria, plan breakdown

### Phase 2 Outputs (Scoring Engine)
- `data/scoring-engine.ts` — computeRunningScore(), computeProfile(), ProfileResult discriminated union, ScoringProfile schema
- `data/scoring-archetypes.ts` — 12 phase-specific archetypes, 4 dimension fallbacks, BALANCED_ARCHETYPE, ArchetypeDefinition interface

### Phase 3 Outputs (Scenario Content)
- `data/scenarios/cross-role-impact-map.ts` — ImpactEdge type, empty crossRoleImpactMap stub to be populated
- `data/scenarios/types.ts` — ScenarioConfig, Choice (with crossRoleImpact[]), DecisionRecord, FrictionDimension, SDLCPhase, Designation
- `data/scenarios/validate-all.ts` — Validation script confirming all 36 scenarios exist
- All 9 scenario files in `data/scenarios/[role]/[phase].ts` — source of crossRoleImpact[] data

### Phase 1 Outputs (Foundation)
- `src/state/designation-store.ts` — DesignationStore with recordDecision, completeRole, per-role state isolation
- `src/components/experiences/internal/DesignationPortal.tsx` — Portal state machine (needs "complete" mode added)
- `src/components/experiences/internal/designation-portal/ScenarioRenderer.tsx` — FRICTION_CONFIG for consistent colors (DO NOT MODIFY)

### Existing Completion Pattern
- `src/components/experiences/internal/RoleMasterclassComplete.tsx` — Existing completion screen pattern: paradigmShift, commitments, scripts, rubric, cost. Reference for content structure but DO NOT MODIFY this file.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `computeProfile()`: Returns `ProfileResult` — discriminated union with `status: "complete"` yielding full `ScoringProfile` or `status: "insufficient_data"`. Ready to consume.
- `ScoringProfile`: Contains archetypeName, narrative, whatYouDo, whyItMatters, doThis, phaseBreakdown, shifts, dominantPhase, dominantDimension. All fields needed for the completion screen.
- `FRICTION_CONFIG` in ScenarioRenderer: Maps dimensions to labels and colors (`client_friction → orange-500`, `internal_bureaucracy → blue-500`, etc.). Reuse for consistent visual language.
- `RoleMasterclassComplete.tsx`: Proven completion screen pattern with paradigmShift (large statement), commitments (3 action items), scripts (2 trigger/response pairs), rubric (3 daily checks), cost (consequence statement). Extend this structure.
- `useDesignationStore`: Already has `completeRole()` action and per-role state isolation. Decision log accessible via store state.

### Established Patterns
- Dark theme: `bg-black text-white`, `bg-white/5 border-white/10` for cards
- Amber highlighting: `bg-amber-500/10 border-amber-500/30 text-amber-100` for tomorrow's action
- Framer Motion `AnimatePresence mode="wait"` for step transitions
- Font mono for labels: `text-xs font-mono text-gray-500 uppercase tracking-widest`
- Gradient backgrounds on completion: existing role completion uses gradient overlays

### Integration Points
- `DesignationPortal.tsx`: FullSDLCJourney onComplete → needs to transition to JourneyCompleteView instead of returning to role selection
- `designation-store.ts`: completeRole() action exists — wire it at journey end
- `crossRoleImpactMap` in `data/scenarios/cross-role-impact-map.ts` — currently empty, needs population from scenario choice data

</code_context>

<specifics>
## Specific Ideas

- The existing completion screen pattern (paradigm shift, 3 commitments, 2 scripts, daily rubric) in RoleMasterclassComplete.tsx is excellent — the new JourneyCompleteView should feel like a natural evolution of this pattern, not a completely different screen
- Archetype names should feel like behavioral mirrors, not judgments: "Discovery Absorber" tells you what you do, not that you're bad at it
- The cross-role impact view should create empathy — "Your choice to accept the vague scope created this consequence for the developer" — not blame
- Phase breakdown visualization should make the user see WHERE in the SDLC their pattern is strongest, not just that they have a pattern
- The compound insight for multi-role completion should feel like a revelation — "You avoid conflict as a PM but create bureaucratic friction as a Developer" — showing how the same person can have different blind spots in different roles

</specifics>

<deferred>
## Deferred Ideas

- Animated ripple visualization with connection lines between roles — v2 enhancement
- Radar chart with animated drawing — consider for Phase 5 polish
- Exportable behavioral profile (PDF/image) — future feature
- Team-level aggregate insights (requires backend) — v2
- Behavioral change tracking over time (multiple journey attempts) — v2

</deferred>

---

*Phase: 04-completion-and-cross-role-impact*
*Context gathered: 2026-03-23*
