# Phase 3: Role Content — First Wave - Context

**Gathered:** 2026-03-23
**Status:** Ready for planning

<domain>
## Phase Boundary

Author SDLC-merged journeys for 3 roles (PM, Developer, QA) — each walking through 3 SDLC phases (Discovery, Requirements, Design) with 4 friction dimensions at every phase. Wire the scenario data into the existing DesignationPortal so users can play through complete role journeys visually. Preserve existing 3-scenario role journeys as Quick Mode. The DebriefView is already handled by ScenarioRenderer from Phase 1 — no separate component needed.

</domain>

<decisions>
## Implementation Decisions

### Visual Interaction (USER-LOCKED)
- Everything MUST have a visual interactive experience — no data-only work without UI wiring
- Follow the EXACT same UI patterns already in the codebase: dark backgrounds, Framer Motion AnimatePresence with `mode="wait"`, shadcn/ui components (Card, Badge, Button), gradient backgrounds
- ScenarioRenderer from Phase 1 IS the rendering layer — all new scenarios render through it without modification
- Existing role journeys (PMJourney, DeveloperJourney, etc.) must NOT be broken — they remain accessible via Quick Mode in RoleBriefingView
- Each new scenario must be visually playable: user sees setup, makes a choice, sees debrief with tomorrow's action highlighted in amber

### Scenario Content Structure
- File organization: `data/scenarios/[role]/[phase].ts` — one file per role-phase combination (locked in Phase 1)
- Each file exports an array of validated ScenarioConfig objects (same pattern as `data/scenarios/pm/discovery.ts`)
- Each SDLC phase gets 4 scenarios covering all 4 friction dimensions: client_friction, internal_bureaucracy, knowledge_gap, conflict_avoidance
- Every scenario has 2 choices minimum, each with `frictionTag` and `crossRoleImpact[]`
- All 5 debrief fields required and enforced by Zod at import time (whatHappened, why, how, whoBecame, tomorrowAction)
- `tomorrowAction` must name a specific workflow artifact the user can change — not generic advice
- Content uses realistic Indian B2B context (IBC, SAP, TCS, enterprise procurement) — this is a differentiator (locked in PROJECT.md)

### Roles and Phases
- PM: Discovery (expand from stub), Requirements, Design — 12 scenarios total
- Developer: Discovery, Requirements, Design — 12 scenarios total
- QA: Discovery, Requirements, Design — 12 scenarios total
- Total: 36 scenarios (3 roles × 3 phases × 4 friction dimensions)

### Friction Dimension Coverage per Phase
- **Client Friction**: client pushback, scope ambiguity, unrealistic expectations from the client side
- **Internal Bureaucracy**: approval bottlenecks, process overhead, sign-off delays that block progress
- **Knowledge Gap**: information silos, incomplete handovers, one person holds context, assumptions instead of facts
- **Conflict Avoidance**: absorbing bad requirements silently, not pushing back on stakeholders, problems compounding from unspoken issues

### Journey Flow Wiring
- DesignationPortal.FullSDLCJourney must be updated to load scenario data for all 3 roles (remove "coming soon" placeholder for PM/Developer/QA)
- Journey cycles through all scenarios in a phase (4 scenarios) before advancing to next SDLC phase via usePhaseNavigation
- Each choice records a DecisionRecord to DesignationStore (already wired for PM in Phase 1)
- Role parameter must be passed correctly to recordDecision (not hardcoded to "pm")
- Progress persists in localStorage per DesignationStore — refreshing mid-journey resumes at correct phase/scenario

### DebriefView Decision
- NO separate DebriefView component — ScenarioRenderer already renders all 5 debrief fields with proper styling
- The amber-highlighted "Tomorrow's Action" section IS the behavioral change anchor
- Plan 03-01 from ROADMAP (DebriefView component) is absorbed into the existing ScenarioRenderer — no new component file needed

### Existing Content Preservation
- All 8 existing role journeys in `src/components/experiences/internal/roles/` stay completely untouched
- Quick Mode path through RoleBriefingView continues to work exactly as before
- InternalExperience step machine unchanged — DesignationPortal handles all routing

### Claude's Discretion
- Exact scenario narratives, choice text, and debrief content (must follow constraints above)
- How to structure the phase-level scenario loader (single import file vs per-role loader)
- Whether PM Discovery stub gets expanded in-place or replaced with 4 full scenarios
- Cross-role impact edge descriptions (which decisions affect which other roles)
- Scenario ordering within each phase (which friction dimension comes first)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Context
- `.planning/PROJECT.md` — Core value (behavioral change), Indian B2B context requirement, constraint on not removing existing content
- `.planning/REQUIREMENTS.md` — ROLE-01..08, BEHV-01 requirements with exact descriptions
- `.planning/ROADMAP.md` — Phase 3 goal, success criteria, plan breakdown

### Phase 1 Outputs (Foundation)
- `data/scenarios/types.ts` — ScenarioConfig, Choice, Debrief, DecisionRecord, FrictionDimension, SDLCPhase types
- `data/scenarios/schema.ts` — Zod schemas, validateScenario() function
- `data/scenarios/pm/discovery.ts` — Example scenario file to follow as template
- `data/scenarios/cross-role-impact-map.ts` — ImpactEdge type for cross-role impacts
- `src/components/experiences/internal/designation-portal/ScenarioRenderer.tsx` — Generic renderer (DO NOT MODIFY)
- `src/components/experiences/internal/DesignationPortal.tsx` — Portal with FullSDLCJourney (needs wiring updates)
- `src/state/designation-store.ts` — DesignationStore with recordDecision, advancePhase, initRole
- `src/state/hooks/usePhaseNavigation.ts` — Navigation hook

### Phase 2 Outputs (Scoring)
- `data/scoring-engine.ts` — computeRunningScore(), computeProfile() (consumed by Phase 4, not Phase 3)
- `data/scoring-archetypes.ts` — Archetype definitions (referenced for cross-role impact awareness)

### Existing Role Journeys (DO NOT MODIFY)
- `src/components/experiences/internal/roles/PMJourney.tsx` — Existing PM quick journey pattern
- `src/components/experiences/internal/roles/DeveloperJourney.tsx` — Existing Developer quick journey pattern
- `src/components/experiences/internal/RoleJourney.tsx` — GenericStageWrapper, GenericDebriefOverlay, GradientBackground
- `src/components/experiences/internal/RoleBriefingView.tsx` — Mode selector (Full SDLC / Quick)
- `src/components/experiences/internal/InternalExperience.tsx` — Step machine, journey routing

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `ScenarioRenderer.tsx`: Renders any ScenarioConfig — friction badge, setup card, choice buttons, 5-field debrief, advance button. Dark theme, Framer Motion animations. USE AS-IS.
- `DesignationPortal.tsx`: FullSDLCJourney component already wires ScenarioRenderer + usePhaseNavigation + useDesignationStore for PM. Extend to support Developer and QA.
- `usePhaseNavigation.ts`: Generic hook — accepts phase list, returns navigation controls. Works with any ScenarioConfig array.
- `useDesignationStore`: recordDecision, advancePhase, initRole, completeRole actions. Per-role state isolation already built.
- `validateScenario()`: Import-time Zod validation. Every scenario file must call this on export.
- `data/scenarios/pm/discovery.ts`: Template for all new scenario files — follow this exact pattern.

### Established Patterns
- Scenario data as typed objects in `data/scenarios/[role]/[phase].ts` → Zod validates at import → ScenarioRenderer displays
- Framer Motion `AnimatePresence mode="wait"` for step transitions
- Dark theme: `bg-black text-white`, `bg-white/5 border-white/10` for cards
- Amber highlighting for tomorrow's action: `bg-amber-500/10 border-amber-500/30 text-amber-100`
- Font mono for labels: `text-xs font-mono text-gray-500 uppercase tracking-widest`

### Integration Points
- `DesignationPortal.tsx` line 48: `if (role !== "pm")` placeholder — replace with scenario data loading for developer and qa
- `DesignationPortal.tsx` line 44: `phases: pmDiscoveryScenarios` — must load correct scenarios per role per phase
- `data/scenarios/pm/discovery.ts`: Currently 1 stub scenario — expand to 4 scenarios (one per friction dimension)

</code_context>

<specifics>
## Specific Ideas

- The existing PM Journey stages (IBC Commitment Crash, Founder's Custom Request, Done State Delusion) are excellent examples of the narrative quality expected — new scenarios should match this depth and Indian B2B specificity
- Each "tomorrow's action" must reference a real artifact: a document template, a meeting agenda item, a Slack message format, a checklist question, a rubric step — something concrete enough to actually do
- Cross-role impacts should reference real inter-team dynamics: PM decisions affecting BA requirements gathering, Developer decisions affecting QA test planning, QA decisions affecting Designer iteration cycles
- The existing completion screen pattern (paradigm shift, 3 commitments, 2 scripts, daily rubric) in RoleMasterclassComplete.tsx — Phase 4 will extend this with scoring profiles, but Phase 3 should produce data that feeds into it

</specifics>

<deferred>
## Deferred Ideas

- Remaining 5 roles (Sales, Designer, BA, CRM, Strategy) — Phase 5
- Extended SDLC phases beyond Discovery/Requirements/Design (Development, Testing, Launch, Maintenance) — v2
- Scenario authoring tool for organizations — v2
- Industry-specific scenario packs — v2

</deferred>

---

*Phase: 03-role-content-first-wave*
*Context gathered: 2026-03-23*
