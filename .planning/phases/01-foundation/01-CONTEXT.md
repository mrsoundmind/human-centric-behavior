# Phase 1: Foundation - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Lock the TypeScript content schema (ScenarioConfig), state architecture (Zustand + Immer DesignationStore), and navigation pattern (usePhaseNavigation hook) — the three architectural prerequisites every downstream phase depends on. Also fix existing technical health issues (memory leaks, timer cleanup, type safety). No scenario content is authored in this phase — only the contracts and infrastructure that content will fill.

</domain>

<decisions>
## Implementation Decisions

### Scenario Content Schema
- Single unified `ScenarioConfig` interface with friction dimension as a tagged field (not separate types per dimension)
- Debrief content inline in ScenarioConfig — keeps content co-located with choices for authoring simplicity
- Cross-role impact edges defined in a separate static map file (`data/cross-role-impact-map.ts`), referenced by choice ID — decoupled from scenario content
- File organization: `data/scenarios/[role]/[phase].ts` — one file per role-phase combination (e.g., `data/scenarios/pm/discovery.ts`)
- Zod schema validates at dev startup: all 5 debrief fields required (what/why/how/who/tomorrow), friction dimension tag required, crossRoleImpact array required on every choice
- Stub scenarios created for 1 role (PM) in 1 phase (Discovery) to validate the full pipeline — real content authored in Phase 3

### State Architecture
- New Zustand store (`DesignationStore`) with Immer middleware — completely independent from existing SDLCContext
- Import only SDLC phase type definitions from SDLCContext — no shared state
- Store shape: single store with `roles` map keyed by role ID (`Designation` type), each containing `decisions: DecisionRecord[]` and `currentPhase: SDLCPhase`
- Full append-only decision log persisted in localStorage — needed for blind spot profile generation in Phase 2
- localStorage schema versioning: version number stored in persisted object, migration function runs on load, graceful reset with user message on unrecoverable schema mismatch
- `completedRoles: Designation[]` field tracks which roles the user has finished (for cross-role insights in Phase 4)

### Navigation Model
- Linear SDLC phase progression — no skipping allowed, maintains narrative integrity
- Completed phases can be revisited in read-only mode (review decisions without changing them)
- Declarative `usePhaseNavigation` hook: accepts phase list + current index, returns `{ current, next, prev, canAdvance, advance, goBack }` — replaces all array-index navigation patterns
- `canAdvance` guard tied to "user has made a choice in current scenario" — prevents accidental phase skips

### Legacy Journey Integration
- Existing 3-scenario role journeys preserved as "Quick Mode" — accessible from role briefing screen
- Role briefing screen (`RoleBriefingView`) gets a mode selector: "Full SDLC Journey" (new) or "Quick Scenarios" (existing)
- New `DesignationPortal` component wraps existing `DesignationSelect` + routes to either mode
- Entry point remains `/internalteam` route — `InternalExperience` component updated to use `DesignationPortal`
- No existing component code deleted — only new wrapper and mode routing added

### Technical Health
- Fix memory leaks: event listener cleanup in `DelayedResponseExperience.tsx`, timer cleanup across phase components
- Fix unguarded localStorage access (wrap in try/catch for quota exceeded / privacy mode)
- Reduce `any` usage in role journey components — type completion callbacks with specific interfaces per stage (`LeadGenCompletionData`, `MeetingCompletionData`, etc.)
- Enable stricter TypeScript for new files only (don't break existing code in this phase)

### Claude's Discretion
- Exact Zod schema field names and nesting structure
- Zustand store initialization and hydration approach
- usePhaseNavigation hook internal implementation
- TypeScript interface naming conventions (ScenarioConfig vs Scenario vs PhaseScenario)
- How to structure the stub PM/Discovery scenario data for pipeline validation

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Context
- `.planning/PROJECT.md` — Project vision, core value, constraints, key decisions
- `.planning/REQUIREMENTS.md` — v1 requirements with REQ-IDs, Phase 1 maps to CINF-01..05, STAT-01..04, TECH-01..02
- `.planning/ROADMAP.md` — Phase goals, success criteria, plan breakdown

### Research Findings
- `.planning/research/STACK.md` — Zustand 5.0.12 + Immer 11.1.4 recommendation with rationale, recharts v2 lock, XState rejection
- `.planning/research/ARCHITECTURE.md` — Content-data separation pattern, append-only decision log, scoring engine isolation, build order
- `.planning/research/PITFALLS.md` — Content explosion prevention, test trap avoidance, SDLCContext collapse, localStorage versioning
- `.planning/research/FEATURES.md` — 4 friction dimensions as market differentiator, scoring taxonomy must precede content

### Existing Codebase
- `.planning/codebase/ARCHITECTURE.md` — Current layer structure, data flow, entry points
- `.planning/codebase/CONCERNS.md` — Memory leaks, timer issues, type safety problems to fix
- `.planning/codebase/STRUCTURE.md` — Directory layout, component locations
- `.planning/codebase/CONVENTIONS.md` — Code style, naming patterns

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `src/components/experiences/internal/RoleJourney.tsx`: `GenericStageWrapper`, `GenericDebriefOverlay`, `GenericBriefingOverlay`, `GradientBackground` — partially generic components that can inform the new ScenarioRenderer design
- `src/components/experiences/internal/DesignationSelect.tsx`: Role selection UI with 8 roles defined as `Designation` type — reuse directly in DesignationPortal
- `src/components/experiences/internal/RoleBriefingView.tsx`: Role-specific briefing content — extend with mode selector (Full SDLC vs Quick)
- `src/components/ui/*`: Full shadcn/ui component library available (cards, tabs, progress, badges, etc.)
- `src/hooks/use-mobile.tsx`: Mobile detection hook — useful for responsive navigation

### Established Patterns
- State management: React Context + useState for step progression (GlobalExperienceContext, SDLCContext) — new Zustand store follows a different pattern deliberately
- Animations: Framer Motion `AnimatePresence` with `mode="wait"` for step transitions — maintain this pattern in new components
- Step machines: String union types for steps with switch-based rendering — usePhaseNavigation hook replaces this pattern
- Scenario data: Inline `STAGES` and `STAGE_BRIEFINGS` arrays in journey components — the pattern being replaced by external data files

### Integration Points
- `src/App.tsx` line 28: `/internalteam` route renders `InternalExperience` — entry point for designation portal
- `src/components/experiences/internal/InternalExperience.tsx`: Step machine routing to role journeys — needs DesignationPortal wrapper
- `src/components/experiences/ExperienceController.tsx` line 240: Internal routing block — connects Layer 2 completion to internal training
- `src/components/experiences/internal/roles/*.tsx`: 8 existing role journey components — preserved, accessed via Quick Mode

</code_context>

<specifics>
## Specific Ideas

- Existing Indian B2B scenarios (IBC, SAP, TCS, enterprise procurement context) are a differentiator — maintain this voice in all new content and stub scenarios
- The existing debrief pattern (what/why/how/who you became/tomorrow's action) works well — enforce it structurally via Zod, don't just document it
- "Quick Mode" naming chosen to position existing journeys as valuable (not deprecated), while "Full SDLC Journey" signals the deeper experience

</specifics>

<deferred>
## Deferred Ideas

- Cross-role dependency graph design (requires CEO/SME domain expertise) — needed before Phase 4, flagged in STATE.md
- Blind spot archetype taxonomy validation (3-5 target users) — needed before Phase 4 completion copy
- Content authoring production plan for 168 scenario slots — needed before Phase 3

</deferred>

---

*Phase: 01-foundation*
*Context gathered: 2026-03-23*
