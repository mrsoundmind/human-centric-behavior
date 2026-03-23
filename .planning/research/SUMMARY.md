# Project Research Summary

**Project:** Human Centric Lab — Designation Portal SDLC-Merged Role Journeys
**Domain:** Experiential UX training platform — role-based SDLC simulation with cumulative behavioral change scoring
**Researched:** 2026-03-23
**Confidence:** HIGH (stack verified against codebase; architecture grounded in direct codebase analysis; pitfalls drawn from existing CONCERNS.md + research literature; features MEDIUM on cross-role visualization specifics)

## Executive Summary

Human Centric Lab is a brownfield experiential learning platform being evolved from a 3-scenario-per-role format into a full SDLC-phase role simulation where each of 8 designations walks through 7 SDLC phases across 4 friction dimensions (client, internal bureaucracy, knowledge gaps, conflict avoidance). The platform is frontend-only with no backend, and its core goal is behavioral change — not knowledge acquisition. This distinction drives every architectural and feature decision: the scoring model must surface behavioral patterns, not grades; the debrief must frame consequences, not correctness; and the cross-role impact system must make organizational ripples felt, not asserted. No comparable platform combines SDLC-phase structure, role-specific organizational friction, behavioral pattern profiling, and Indian B2B enterprise context — the market gap is real and the research confirms it.

The recommended approach is a data-driven content architecture (all 224 scenario slots as typed TypeScript data objects, consumed by a single generic ScenarioRenderer) paired with domain-split state management (Zustand for high-frequency scoring state, React Context for navigation, per-role localStorage keys for persistence). The existing stack — React 18, TypeScript, Tailwind, Framer Motion, recharts 2.x, shadcn/ui — is locked and sufficient. Only three additions are warranted: Zustand 5.x for cross-session scoring persistence, Immer for immutable nested state updates, and canvas-confetti for completion celebrations. The build order is strictly sequential: content types first, scoring engine second, state store third, generic components fourth, scenario content in parallel, completion views last.

The top risks are architectural and must be resolved in Phase 1 before a single scenario is written: the 8×7×4 combinatorial content matrix will explode if content is co-located in components (the existing codebase already shows this strain in a 3,127-line discovery file); the existing SDLCContext will collapse under cross-role scoring state if not domain-split before new state is added; and the scoring model must use behavioral tags (not numeric points) or the platform will activate test-taking behavior rather than genuine reflection. These are Phase 1 architectural locks — not v2 concerns.

---

## Key Findings

### Recommended Stack

The existing stack is locked and should not be modified. Only three new packages are warranted: **Zustand 5.0.12** (cross-session scoring persistence via `persist` middleware — React Context causes all consumers to re-render on any state change, which is unacceptable when scoring updates ripple through a multi-phase journey); **Immer 11.1.4** (immutable nested state updates for the deeply nested `roles → phases → decisions` scoring model — without Immer, every update requires 4-level manual spreads, a known source of bugs); and **canvas-confetti 1.9.3** (5 KB vanilla JS celebration on completion — more performant than react-confetti since it doesn't touch the React tree). recharts must remain locked at 2.15.4 — shadcn/ui has an open issue (#7669) confirming v3 is not yet fully supported; upgrading would silently break existing chart components.

**Core technologies:**
- **Zustand 5.0.12**: Cross-session scoring state persistence — subscription-scoped re-renders prevent animation jank during multi-phase journeys
- **Immer 11.1.4**: Immutable updates for nested decision scoring model — prevents spread-hell bugs at `roles × phases × decisions` depth
- **canvas-confetti 1.9.3**: Completion celebration — imperative, zero React tree impact
- **recharts 2.15.4** (existing): Radar chart for behavioral profile visualization — locked, do not upgrade to v3
- **Zod 3.25.76** (existing): Schema validation for all 224 scenario configs at startup — catches content authoring errors before runtime
- **Framer Motion 12.26.2** (existing): All journey transitions, AnimatePresence + stagger — already production-capable, no changes needed
- **Vite code splitting** (existing): Lazy-load each role's scenario data — 8 roles × 7 phases of scenario text must not all load at boot

### Expected Features

**Must have (table stakes) — v1 launch:**
- SDLC-merged designation journeys where each role walks all 7 phases — the backbone without which the portal feels disconnected from real project work
- 4 friction dimensions per phase (client friction + internal bureaucracy + knowledge gaps + conflict avoidance) — the internal bureaucracy and conflict avoidance dimensions are the differentiators no competitor covers
- Mandatory scenario debrief structure (what happened / why / consequence / tomorrow's action) for all 56 role-phase combinations — the behavior change delivery mechanism
- Cumulative decision scoring schema designed and implemented before any scenarios are authored — retrofitting the taxonomy after 224 scenarios are written is a full rewrite
- Basic decision profile (behavioral pattern, not grade) on completion screen — even a simple "here's your tendency pattern" output delivers more value than the current static screen
- localStorage progress persistence across all 7 phases — a journey that resets on browser close is not viable
- Layer bridging (Layer 1 felt friction → Layer 2 SDLC → Designation Portal) — navigation structural fix, not new content

**Should have (differentiators) — v1.x after validation:**
- Full blind spot archetypes with named profiles ("Approval Absorber," "Scope Silencer," "Risk Deferrer") — richer output once basic profile engagement is confirmed
- Cross-role impact visualization (pre-authored consequence maps keyed to actual decisions made) — the platform's most distinctive capability; requires at least 3 completed role journeys and validated scoring first
- Conflict avoidance compound consequence chains (early-phase avoidance surfacing as downstream cost) — highest learning impact but highest content authoring complexity

**Defer (v2+):**
- Cross-role journey with compounding insights across multiple completed designations — requires all 8 journeys complete and profile system validated
- Backend, user accounts, LMS integration — out of scope per PROJECT.md; experience must be validated before infrastructure is built
- AI-adaptive scenario branching — depends on backend and session state infrastructure that doesn't exist yet

**Anti-features (deliberately not build):**
- Leaderboards and social scoring — turns behavioral reflection into competitive gaming, invalidating the blind spot goal
- Binary right/wrong choice mechanics — users learn to perform the correct answer, not surface their real patterns
- Certifications and badges — gameable without backend; creates false confidence about what the platform delivers

### Architecture Approach

The architecture is a 5-layer system: Presentation (PhaseScene, DebriefView, ImpactView), Experience (RoleJourneyEngine, CrossRoleImpactEngine), State Management (DesignationStore, ScoringEngine, GlobalExperienceContext), Content (pure TypeScript data files in `data/scenarios/[role]/[phase].ts`), and Persistence (localStorage with per-role keys). The critical architectural separation is content from renderer: all 224 scenario slots live in typed data objects, a single generic `ScenarioRenderer` component consumes any config. The scoring engine and cross-role impact engine are pure TypeScript modules (no React, no side effects) — independently testable and promotable to a shared backend library if a backend is ever added. State is domain-split: `SessionContext` for navigation (high-frequency), `ScoringContext` via Zustand for cumulative decisions (subscription-scoped, no unnecessary re-renders), `CrossRoleContext` for completion flags (low-frequency). Each role's localStorage key is isolated (`hcl_designation_[role]`) — a single parse error never wipes all progress.

**Major components:**
1. **RoleJourneyEngine** — orchestrates a single role's passage through 7 SDLC phases; uses `useReducer` to maintain an immutable append-only decisions log
2. **DesignationStore** — React Context + localStorage persistence; keyed per role; domain-separated from existing SDLCContext
3. **ScoringEngine** — pure TypeScript module; converts decision log into behavioral pattern profile; called explicitly on decision commit and journey completion, never as a side effect
4. **CrossRoleImpactEngine** — pure TypeScript module; reads completed journey decisions against a static `cross-role-impact-map.ts` to produce impact matrix
5. **PhaseScene** — stateless generic renderer; receives scenario data via props; never contains inline content
6. **JourneyCompleteView + CrossRoleImpactView** — reads ScoringEngine profile + ImpactEngine matrix; Framer Motion for animated blind spot and ripple reveals

### Critical Pitfalls

1. **Content explosion via component co-location** — The existing codebase has a 3,127-line discovery file because content lives inside components. Extending this to 224 slots produces 56,000+ lines of coupled, unauditable content. Avoid by defining `ScenarioConfig` interface and building `ScenarioRenderer` before writing a single SDLC-merged scenario. Any scenario-specific component file exceeding 200 lines is a warning sign.

2. **Monolithic SDLCContext collapse under cross-role scoring state** — Adding cumulative decision logs, per-role scoring, and cross-role impact to the existing single-blob SDLCContext causes O(n) re-renders across all consumers on every decision append and Framer Motion animation stutter by ~50 decisions. Avoid by domain-splitting contexts before adding new state. Use Zustand for `ScoringContext` and `CrossRoleContext` specifically.

3. **Scoring activating test-taking behavior** — Surfacing any numeric score during a journey shifts users from "exploring what happens" to "finding the right answer," invalidating the blind spot detection goal. The scoring model must track behavioral choice category tags (`conflict_avoidance`, `risk_taking`, `approval_seeking`), not points. No numbers shown during journey; only pattern analysis shown at completion.

4. **localStorage without schema versioning causing silent state corruption** — When scenario config or state shapes change (and they will repeatedly during development), cached state from old schema versions silently corrupts the experience for returning users. Implement a `schemaVersion` field in the persisted state envelope from day one. On version mismatch, discard and start fresh with a graceful message.

5. **Array-index phase navigation fragility** — The existing `SCREEN_ORDER.indexOf(currentScreen)` pattern is already flagged as fragile in CONCERNS.md. Extended to 8 roles × 7 phases with conditional dimension branching, it becomes unmaintainable. Replace with a declarative `usePhaseNavigation(config)` hook before building any SDLC-merged phase components.

---

## Implications for Roadmap

Based on the combined research, the dependency graph mandates a strictly sequential foundation before any content authoring can proceed in parallel. The architecture research explicitly documents the build order; the pitfalls research confirms that skipping foundational steps has HIGH recovery cost. Four phases are suggested.

### Phase 1: Foundation — Types, State Architecture, and Navigation

**Rationale:** Every downstream deliverable depends on three things locked before content authoring starts: the TypeScript content schema (all 224 scenarios must conform to one type), the state architecture (domain-split contexts + Zustand introduction must happen before new state is added to SDLCContext), and the navigation pattern (declarative hook must exist before phase components are built). All 6 critical pitfalls in PITFALLS.md are flagged for Phase 1 prevention. Attempting to do content and architecture in parallel is the #1 recovery risk identified.

**Delivers:**
- `data/scenarios/types.ts` — TypeScript interfaces for `FrictionScenario`, `Choice`, `Outcome`, `DecisionRecord`, `ScoringProfile`, `ImpactEdge`
- `data/scenarios/scoring-config.ts` — 4 friction dimension weights and blind spot thresholds
- `data/cross-role-impact-map.ts` — static edge map defining which role-phase decisions affect which other role-phases
- `state/scoring-engine.ts` — pure TypeScript; `computeRunningScore()` and `computeProfile()`
- `state/designation-store.tsx` — React Context + Zustand; per-role localStorage with schema versioning
- `state/cross-role-impact-engine.ts` — pure TypeScript; impact matrix computation
- `usePhaseNavigation` hook — declarative navigation replacing array-index pattern
- Generic `ScenarioRenderer` and `PhaseScene` components with stub data
- `DesignationPortal.tsx` entry point with role selection

**Features addressed:** localStorage persistence, SDLC phase structure backbone, layer bridging navigation, role framing screens
**Pitfalls avoided:** Content explosion, SDLCContext collapse, scoring test trap, localStorage schema corruption, array-index navigation fragility, animation/state race conditions (establish pattern in reference component)

### Phase 2: Scenario Content and Scoring Engine Validation

**Rationale:** Once types are locked and the generic renderer exists, scenario content can be authored in parallel by content writers without touching component code. The scoring engine can be validated against real scenario data. This phase is primarily a content production phase with engineering validation.

**Delivers:**
- `data/scenarios/roles/[role]/[phase].ts` — scenario configs for at least 2-3 roles with all 7 phases × 4 friction dimensions
- Validated `ScoringEngine` producing meaningful behavioral profiles on real decision logs
- `DebriefView` component with the full 5-field debrief structure wired to scenario configs
- Content QA checklist enforced: `tomorrowAction` must name a specific workflow artifact; `whoBecame` must use role-specific language; all debrief fields under 150 words; no generic advice
- `workflowAnchor` required field in `ScenarioConfig.debrief` enforced in TypeScript
- Multi-role completion tracking in persisted state (`completedRoles` field)

**Features addressed:** 4 friction dimensions per phase, scenario debrief structure, cumulative decision scoring schema, role-specific SDLC views, "tomorrow's action" with workflow anchoring
**Pitfalls avoided:** Debrief quality decay (content QA gate), multi-role isolation (completedRoles tracked from day one), generic tomorrow actions (workflowAnchor required field)
**Stack additions active:** Immer for decision log updates, Zod for scenario config validation at startup

### Phase 3: Completion Experience and Cross-Role Impact

**Rationale:** The completion experience — blind spot profile and cross-role impact visualization — requires stable scoring data from at least one fully authored role journey. Built after Phase 2 validates the scoring engine with real content.

**Delivers:**
- `JourneyCompleteView` — behavioral profile output using `ScoringEngine.computeProfile()`; named blind spot archetypes; single commitment surface (not a list of 10 items)
- `CrossRoleImpactView` — animated ripple visualization from `CrossRoleImpactEngine.compute()`; consequence framing (not accusation framing); impact strings keyed to actual choices made
- Radar chart behavioral profile using recharts `RadarChart` + shadcn/ui radar pattern (existing recharts 2.x component)
- canvas-confetti completion celebration
- Multi-role compound insight: second role completion surfaces insights referencing first completed role

**Features addressed:** Basic decision profile on completion screen, cross-role impact visualization (pre-authored maps), full blind spot archetypes, layer bridging completion
**Pitfalls avoided:** Cross-role impact as static assertions (all impact strings keyed to `Choice.crossRoleImpact[]`), cross-role impact as accusation framing (user-tested before release), commitment overwhelm (single commitment per role)

### Phase 4: Remaining Role Content and Full Journey Audit

**Rationale:** Once the pattern is validated on 2-3 roles (Phase 2), the remaining 5-6 role journeys can be authored with confidence that the system works. A full audit pass ensures quality consistency across all 224 slots before the platform is considered complete.

**Delivers:**
- All 8 roles × 7 phases × scenario configs authored and passing content QA
- Full cross-role impact map populated for all role combinations
- Client experience audit (funnel friction — Bait, Chaos, Maze, Trap, Wall scenarios)
- "Looks Done But Isn't" checklist from PITFALLS.md passing for all roles
- Performance validation: bundle size with all 8 roles lazy-loaded; no animation re-renders from scoring state changes

**Features addressed:** Full 8-role designation coverage, client experience audit (P2), conflict avoidance compound consequence chains (P2)
**Stack active:** Vite dynamic imports per role — all 8 role scenario configs lazy-loaded, not bundled at boot

### Phase Ordering Rationale

- **Types before everything:** The 224-slot content matrix requires one shared TypeScript interface. Building UI before types means every component makes different assumptions about content shape — a scenario that requires a full rewrite.
- **Scoring engine before content:** Content authors must know what fields to populate in `ScenarioConfig` before writing scenarios. The scoring engine defines the `impact` shape and `choiceType` taxonomy that content must conform to.
- **State architecture before state additions:** The SDLCContext collapse pitfall has HIGH recovery cost. The domain split and Zustand introduction must happen before a single new decision log entry is appended to any context.
- **Reference component before parallel content authoring:** The animation/state separation pattern must be established in one reviewed component before content authors work in parallel — otherwise the race condition pattern proliferates across all 56+ components.
- **Completion views after scoring validation:** JourneyCompleteView requires real scoring data from real content to validate that the profile output is meaningful. Building it against stub data produces a completion screen that looks done but surfaces generic output.

### Research Flags

Phases likely needing deeper research during planning:

- **Phase 1 (Cross-role impact map design):** The 8-role dependency graph (who depends on whom at which SDLC phase for which artifact) must be designed as a domain artifact before the map is coded. This requires organizational design expertise, not just engineering research. Flag for a design workshop or SME session with the CEO before Phase 1 coding begins.
- **Phase 2 (Content authoring for less-familiar roles):** CRM, Strategy, and BA roles in Indian B2B context have fewer established content precedents. The "tomorrow's action" specificity requirement (naming a real artifact/ritual for each role) requires domain expertise in what these roles actually do. Flag for role-specific SME input during content authoring.
- **Phase 3 (Blind spot archetype taxonomy):** The named archetypes ("Approval Absorber," "Scope Silencer," "Risk Deferrer") must be validated as resonant with the target audience before shipping. Flag for user testing with 3-5 target users before the completion screen copy is finalized.

Phases with standard patterns (research-phase can be skipped):

- **Phase 1 (State architecture):** Zustand + Immer + React Context domain-split is a well-documented pattern with high-confidence sources. Implementation is mechanical once the decision is made.
- **Phase 1 (TypeScript schema design):** Standard typed data modeling — no novel patterns needed.
- **Phase 4 (Content authoring remaining roles):** Once the Phase 2 pattern is validated, remaining roles follow the same template. No new patterns to research.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Existing stack verified from codebase; Zustand/Immer additions verified on npm; recharts lock confirmed via shadcn/ui open issue; version compatibility confirmed |
| Features | MEDIUM | Core scenario-based learning patterns HIGH confidence (Cathy Moore, Clark & Mayer, direct competitor analysis); cross-role visualization and cumulative behavioral profiling MEDIUM — fewer implementation precedents for this exact combination |
| Architecture | HIGH | Direct codebase analysis (SDLCContext, PMJourney, RoleJourney, InternalExperience inspected); build order and component boundaries grounded in serious game architecture literature; data-renderer separation pattern is established industry practice |
| Pitfalls | HIGH | Pitfalls 1, 2, 5, 6 drawn directly from CONCERNS.md (first-party codebase documentation); Pitfalls 3 and 4 grounded in experiential learning research + behavioral scoring literature; all pitfall-to-phase mappings are specific and actionable |

**Overall confidence:** HIGH

### Gaps to Address

- **Cross-role dependency graph:** The research defines the architecture for a `cross-role-impact-map.ts` but cannot author the actual 8-role dependency graph — that requires domain expertise about how PM decisions actually affect BA work, how Developer decisions actually affect QA, etc. in the Indian B2B enterprise context. This design artifact must be created before Phase 1 coding begins, by someone with organizational design expertise. It is the riskiest unknown in the entire project.
- **Blind spot archetype taxonomy:** The named archetypes ("Approval Absorber," "Scope Silencer") are suggested in FEATURES.md but not validated with target users. The profile output only delivers behavior change if the archetype language resonates as self-recognizable. Validate with 3-5 target users before committing to the taxonomy in Phase 2.
- **Content authoring capacity for 224 slots:** The research confirms the 224-slot content matrix is the right target but does not estimate authoring velocity or team capacity. A content production plan (who writes what, what the QA gate process looks like, what the merge cadence is) should be scoped before Phase 2 begins to avoid the debrief quality decay pitfall under timeline pressure.
- **recharts v3 / shadcn/ui compatibility:** The recharts lock at 2.x is based on an open GitHub issue (#7669) as of March 2026. If shadcn/ui ships v3 support before the radar chart component is built, the lock can be revisited. Check the issue status at Phase 3 start.

---

## Sources

### Primary (HIGH confidence)
- Direct codebase analysis: `src/components/experiences/GlobalExperienceContext.tsx`, `SDLCContext.tsx`, `PMJourney.tsx`, `RoleJourney.tsx`, `InternalExperience.tsx`, `.planning/codebase/CONCERNS.md`
- [npmjs.com/package/zustand](https://www.npmjs.com/package/zustand) — v5.0.12 confirmed current; persist middleware API verified
- [zustand.docs.pmnd.rs/reference/middlewares/persist](https://zustand.docs.pmnd.rs/reference/middlewares/persist) — persist middleware API confirmed
- [npmjs.com/package/immer](https://www.npmjs.com/package/immer) — v11.1.4 confirmed current
- [ui.shadcn.com/charts/radar](https://ui.shadcn.com/charts/radar) — shadcn radar chart component confirmed working with recharts 2.x
- [github.com/shadcn-ui/ui/issues/7669](https://github.com/shadcn-ui/ui/issues/7669) — confirms recharts v2 lock is correct as of March 2026
- [github.com/recharts/recharts/wiki/3.0-migration-guide](https://github.com/recharts/recharts/wiki/3.0-migration-guide) — breaking changes in v3 documented

### Secondary (MEDIUM confidence)
- [Cathy Moore — Action Mapping and Scenario Design Principles](https://blog.cathy-moore.com/how-to-design-scenario-based-training/) — branching scenario design, consequence visibility, "tomorrow's action" framing
- [eLearning Industry — Simulation-Based Learning in Corporate Training](https://elearningindustry.com/simulation-based-learning-in-corporate-sales-training-role-play-at-scale) — simulation vs. passive learning retention rates
- [Immersive Labs — Secure SDLC Training](https://www.immersivelabs.com/solutions/secure-sdlc-training) — competitor feature analysis; SDLC backbone analogue
- [React State Management Trends 2025 — Makers Den](https://makersden.io/blog/react-state-management-in-2025) — Zustand as standard for cross-component shared state
- "A Scalable Architecture for One-Stop Evaluation of Serious Games" (SpringerLink, 2020) — player profile recording and evaluation separation patterns
- [Measuring Kirkpatrick Level 3 Behaviour — Tribal Habits](https://tribalhabits.com/measuring-kirkpatrick-level-3-behaviour/) — behavioral change measurement in training
- [Gamification and Unconscious Bias in eLearning — eLearning Industry](https://elearningindustry.com/exploring-unconscious-bias-and-elearning-gamification) — anti-leaderboard rationale for behavioral change platforms

### Tertiary (LOW confidence, used for framing only)
- [Gamification Based Assessment and Test Anxiety — ResearchGate](https://www.researchgate.net/publication/337495775_Gamification_Based_assessment_A_Test_Anxiety_Reduction_through_Game_Elements_in_Quizizz_Platform) — test anxiety findings used only to inform anti-test framing rationale; not directly applicable

---
*Research completed: 2026-03-23*
*Ready for roadmap: yes*
