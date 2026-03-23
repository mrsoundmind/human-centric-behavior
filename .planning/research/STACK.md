# Stack Research

**Domain:** Frontend-only experiential learning platform — role-based SDLC simulation with branching narratives, cumulative scoring, and behavioral analysis
**Researched:** 2026-03-23
**Confidence:** HIGH (existing stack verified from codebase; new additions verified via npm + official docs)

---

## Context: What Already Exists (Do Not Change)

The platform has a locked, working stack. This document only covers what to ADD to support the new milestone features. Do not migrate, replace, or upgrade existing dependencies unless a pitfall calls it out explicitly.

| Existing Technology | Version in Codebase | Status |
|---------------------|---------------------|--------|
| React | 18.3.1 | Locked — do not upgrade |
| TypeScript | 5.8.3 | Locked |
| Vite | 5.4.19 | Locked |
| Tailwind CSS | 3.4.17 | Locked |
| Framer Motion | 12.26.2 | Locked — already supports stagger, layout, AnimatePresence |
| React Router DOM | 6.30.1 | Locked |
| Radix UI / shadcn/ui | ^1.1.x–^2.2.x | Locked |
| recharts | 2.15.4 | **Use as-is — do NOT upgrade to v3 (see pitfalls section)** |
| TanStack React Query | 5.83.0 | Exists but unused for this milestone (no backend) |
| Zod | 3.25.76 | Locked — use for content schema validation |

---

## Recommended Additions

### Core New Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Zustand | 5.0.12 | Cross-session scoring state + cross-role impact data | The project already has localStorage-only persistence requirements and no backend. Zustand's `persist` middleware writes directly to localStorage with zero configuration overhead. Framer Motion re-renders are subscription-scoped, so only components that read the score react — no unnecessary re-renders across the 8-role journey tree. Beats React Context here because Context causes all consumers to re-render on any state change, which is a real problem when scoring updates ripple across a multi-phase journey. MEDIUM confidence — Zustand 5.x is current stable, verified on npm 2026-03-23. |
| Immer | 11.1.4 | Immutable nested state updates for decision scoring | The scoring model is deeply nested: `roles[role].phases[phase].decisions[index].choice`. Without Immer, every update requires spreading 4 levels deep. With Immer's `produce()` or Zustand's `immer` middleware, you mutate a draft object and get an immutable result. The alternative is manual spread hell — a known source of bugs in scoring systems. Pairs natively with Zustand via `immer` middleware. HIGH confidence — verified on npm, actively maintained. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Zod (already installed) | 3.25.76 | TypeScript schema for scenario JSON content | Use immediately. Define a `ScenarioSchema`, `PhaseSchema`, `DecisionSchema` with `z.object()`. This catches content authoring errors at startup rather than at runtime mid-journey. Already in the codebase — no install needed. |
| recharts (already installed) | 2.15.4 | Radar chart for behavioral profile visualization | Use the existing version's `RadarChart`, `PolarGrid`, `PolarAngleAxis`, `PolarRadiusAxis`, and `Radar` components. shadcn/ui has pre-styled radar chart patterns (`shadcn/ui charts/radar`) that work with recharts 2.x. Do NOT upgrade to recharts 3.x — see pitfall below. |
| canvas-confetti | 1.9.3 | Lightweight celebration on phase/journey completion | canvas-confetti is a 5 KB vanilla JS library that works without React wrappers. More performant than react-confetti (which uses React state for particle updates). Call `confetti()` imperatively on score reveal — no component overhead. Only needed for the completion/score reveal screens. |

### Development Tools (No New Installs)

| Tool | Purpose | Notes |
|------|---------|-------|
| TypeScript strict mode (already on) | Type-safe scenario content contracts | Enforce `as const` on scenario data files so TypeScript infers exact string literals for decision keys and role IDs, preventing mismatch bugs |
| Vite code splitting (already on) | Lazy-load role journey content | Use `React.lazy()` + `Suspense` to code-split each role's scenario data. 8 roles × 7 phases × 4 dimensions = large content payload. Split per role so a Sales user never downloads Developer journey data. |

---

## Installation

```bash
# New additions only — existing stack is untouched
npm install zustand@5.0.12 immer@11.1.4 canvas-confetti@1.9.3

# Type definitions for canvas-confetti (vanilla JS library)
npm install -D @types/canvas-confetti
```

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Zustand + persist | React Context + useReducer + manual localStorage sync | Only if the team has a strict "no new dependencies" policy. useReducer handles branching scenario state within a single journey fine, but cross-role impact data (e.g., "your PM decisions created these QA frictions") requires shared state that Context makes unnecessarily complex. Zustand wins here cleanly. |
| Zustand + persist | TanStack React Query (already installed) | React Query is for server state caching. There is no server. Do not repurpose it for scoring persistence — it is semantically wrong and will confuse future developers. |
| Immer middleware for Zustand | Manual spread operators | Use manual spreads only if the scoring model stays shallow (single role, single phase). Once the model is `roles × phases × decisions`, manual spreads become error-prone. Immer is the correct tool. |
| XState v5 | XState v5 for branching narrative state | XState is the correct theoretical choice for finite state machines modelling branching narratives. However, this codebase already has a working pattern: branching scenarios as data (JSON/TypeScript objects) with a React component tree rendering choices. XState adds ~45 kB, requires the team to learn actor model concepts, and the complexity is not justified when the branching depth is known and finite (3–5 decisions per phase). The existing data-driven pattern should be extended, not replaced with a state machine library. |
| recharts RadarChart (existing v2) | Recharts v3 upgrade | recharts 3.x has a breaking state management rewrite (CategoricalChartState removed, react-smooth dependency removed). shadcn/ui has an open issue (#7669) tracking v3 support — it is not yet fully supported. Upgrading would break existing chart components in the codebase for no benefit to this milestone. |
| canvas-confetti | react-confetti | react-confetti drives particle state through React, causing unnecessary reconciliation cycles. canvas-confetti is imperative and does not touch the React tree. For a one-shot celebration on a score reveal screen, the imperative approach is strictly better. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Redux Toolkit | Massive boilerplate overhead for a frontend-only experience with no server interactions. Would require action creators, reducers, selectors, and provider setup for a scoring system that is fundamentally simpler. | Zustand |
| XState for this project | Correct in theory, wrong in practice here. The branching model is content-driven and known at build time. XState adds runtime complexity and a steep learning curve for no additional type safety beyond what TypeScript + Zod already provides. | Data-driven JSON scenarios + Zustand for accumulated state |
| Context API for cross-role state | React Context re-renders ALL consumers when ANY value changes. Cross-role impact tracking mutates frequently during a journey. This will cause visible jank in Framer Motion animations. | Zustand (subscription-scoped) |
| recharts v3 (upgrade) | shadcn/ui does not yet fully support recharts v3 (open issue as of March 2026). The codebase uses shadcn/ui chart components — upgrading recharts will silently break them. | recharts 2.15.4 (existing, locked) |
| localStorage accessed directly in components | Bypasses Zustand's reactive system, causing stale state bugs where the UI shows old scores. Any direct `localStorage.getItem()` in components will diverge from Zustand's hydrated state. | Zustand `persist` middleware — single source of truth |
| Separate state management per role journey | If each role stores its own isolated Zustand slice with no shared structure, cross-role impact visualization becomes architecturally impossible without rewriting the store. | Design one unified `JourneyStore` from the start with `roles` as a map keyed by role ID |

---

## Stack Patterns by Variant

**For branching scenario rendering (per phase, per role):**
- Use a data-driven approach: TypeScript `const` objects describe choices, consequences, and score deltas per decision
- A single `ScenarioPlayer` component reads the current scenario node and renders the active choice
- Zustand holds `currentPhase`, `currentStep`, and accumulated `decisions[]` for the active role
- Because branch depth is shallow (2–3 levels) and known at build time, no state machine library is needed

**For cumulative scoring across phases:**
- Use one Zustand slice: `roleScores: Record<RoleId, PhaseScores>`
- Each decision dispatches `recordDecision(roleId, phaseId, dimensionId, score)` to the store
- The store calculates derived values (`blindspotProfile`, `overallScore`) with `computed` via selectors, not stored values
- Persist the entire `roleScores` map to localStorage so users can resume across sessions

**For cross-role impact visualization:**
- Store only decision keys (not narrative text) in the persist layer — keeps localStorage payload small
- Derive impact strings at render time from a static `CROSS_ROLE_IMPACT_MAP` constant: `{ [roleId]: { [decisionKey]: ImpactedRole[] } }`
- This keeps content out of state and avoids stale content bugs when scenario copy is updated

**For the behavioral radar chart:**
- Map the 4 friction dimensions (client friction, internal bureaucracy, knowledge gaps, conflict avoidance) to 4 polar axes in recharts `RadarChart`
- Score 0–100 per dimension, derived from `roleScores` store selector
- Use shadcn/ui radar chart pattern (copy-paste component from shadcn charts) — it uses recharts 2.x and is pre-styled for the design system

---

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| Zustand 5.0.12 | React 18.3.1 | Uses `useSyncExternalStore` — requires React 18+. Confirmed compatible. |
| Immer 11.1.4 | Zustand 5.0.12 | Use `immer` middleware from `zustand/middleware/immer`. Zustand v5 docs confirm compatibility. |
| recharts 2.15.4 | shadcn/ui (existing) | shadcn/ui chart components are built on recharts 2.x. Do not upgrade to 3.x. |
| canvas-confetti 1.9.3 | React 18 + TypeScript | Vanilla JS — no React dependency. @types/canvas-confetti provides full TypeScript support. |
| Framer Motion 12.26.2 | React 18.3.1 | Already installed, no change. AnimatePresence + stagger covers all journey transition needs. |

---

## Sources

- [npmjs.com/package/zustand](https://www.npmjs.com/package/zustand) — v5.0.12 confirmed current, persist middleware docs verified
- [zustand.docs.pmnd.rs/reference/middlewares/persist](https://zustand.docs.pmnd.rs/reference/middlewares/persist) — persist middleware API confirmed
- [npmjs.com/package/immer](https://www.npmjs.com/package/immer) — v11.1.4 confirmed current
- [stately.ai/docs/immer](https://stately.ai/docs/immer) — Immer + XState/Zustand integration documented (MEDIUM confidence — confirms pairing pattern)
- [npmjs.com/package/xstate](https://www.npmjs.com/package/xstate) — v5.28.0, @xstate/react v6.1.0 current; considered and rejected for this use case
- [npmjs.com/package/recharts](https://www.npmjs.com/package/recharts) — v3.8.0 latest; v2.15.4 locked in codebase
- [github.com/shadcn-ui/ui/issues/7669](https://github.com/shadcn-ui/ui/issues/7669) — shadcn/ui recharts v3 support open issue; confirms v2 lock is correct (MEDIUM confidence — issue status may change)
- [github.com/recharts/recharts/wiki/3.0-migration-guide](https://github.com/recharts/recharts/wiki/3.0-migration-guide) — breaking changes in v3 documented
- [ui.shadcn.com/charts/radar](https://ui.shadcn.com/charts/radar) — shadcn radar chart component confirmed working with recharts 2.x
- [stately.ai/docs/xstate](https://stately.ai/docs/xstate) — XState v5 docs; actor model verified; complexity assessment is author's analysis based on project scope
- WebSearch: React state management 2025 — Zustand consensus as standard for cross-component shared state (MEDIUM confidence — multiple independent sources agree)
- WebSearch: Framer Motion 12 stagger/layout — AnimatePresence + stagger confirmed production-ready for journey transitions (HIGH confidence — official Motion docs)

---

*Stack research for: Human Centric Lab — SDLC Role Journey Milestone*
*Researched: 2026-03-23*
