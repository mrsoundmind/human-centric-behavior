# Architecture Research

**Domain:** Experiential UX training platform — role-based SDLC simulation with cumulative scoring
**Researched:** 2026-03-23
**Confidence:** HIGH (based on direct codebase analysis) + MEDIUM (patterns from serious game architecture literature)

---

## Standard Architecture

### System Overview

```
┌──────────────────────────────────────────────────────────────────────────┐
│                         Presentation Layer                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌─────────────┐  │
│  │ Phase Scenes │  │ Decision UI  │  │ Debrief View │  │ Impact View │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬──────┘  │
│         │                 │                  │                 │         │
├─────────┴─────────────────┴──────────────────┴─────────────────┴─────────┤
│                         Experience Layer                                 │
│  ┌──────────────────────┐          ┌──────────────────────────────────┐  │
│  │  RoleJourneyEngine   │          │   CrossRoleImpactEngine          │  │
│  │  (8 roles × 7 phases)│          │   (ripple calculation)           │  │
│  └──────────┬───────────┘          └──────────────┬───────────────────┘  │
│             │                                      │                      │
├─────────────┴──────────────────────────────────────┴─────────────────────┤
│                         State Management Layer                           │
│  ┌────────────────┐  ┌───────────────────┐  ┌───────────────────────┐   │
│  │DesignationStore│  │ ScoringEngine      │  │ GlobalExperienceCtx   │   │
│  │(per-role state)│  │(cumulative profile)│  │(layer access control) │   │
│  └────────┬───────┘  └────────┬──────────┘  └──────────┬────────────┘   │
│           │                   │                         │                │
├───────────┴───────────────────┴─────────────────────────┴────────────────┤
│                         Content Layer                                    │
│  ┌───────────────────────────────────────────────────────────────────┐   │
│  │  scenarios/[role]/[sdlc-phase]/[friction-dimension].ts            │   │
│  │  (pure data: no React, no state — only scenario definitions)      │   │
│  └───────────────────────────────────────────────────────────────────┘   │
├──────────────────────────────────────────────────────────────────────────┤
│                         Persistence Layer                                │
│  ┌──────────────────────────────────────────────────────────────────┐    │
│  │  localStorage  (designation progress, scoring state, ripple data)│    │
│  └──────────────────────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| `RoleJourneyEngine` | Orchestrates a single role's passage through 7 SDLC phases, tracking which phase/dimension is active | React component + useReducer, receives scenario data, dispatches phase transitions |
| `DesignationStore` | Holds the in-progress and completed state for each designation a user enters | React Context + localStorage; keyed by `hcl_designation_[role]` |
| `ScoringEngine` | Converts raw choice outcomes into dimension scores, detects patterns, generates blind-spot profile | Pure TypeScript module; called by DesignationStore on each decision commit |
| `CrossRoleImpactEngine` | Given a completed role's decisions, calculates which other role's phases were impacted and by how much | Pure TypeScript module; reads from completed DesignationStore snapshots |
| `PhaseScene` | Renders one SDLC phase for one role — story card, friction framing, choice buttons, animated visualizer | Stateless except for hover state; receives scenario data + callbacks |
| `DebriefView` | Shows outcome narrative + running score delta after each decision | Stateless; receives debrief data + current running totals |
| `ImpactView` | After journey completion, shows the cross-role ripple visualization | Reads CrossRoleImpactEngine output; Framer Motion for reveal |
| `GlobalExperienceContext` | Existing: controls layer unlocking (Layer 1 → 1.5 → 2) | Extend to track designation portal entry as "layer 3" unlock |

---

## Recommended Project Structure

```
src/
├── components/
│   └── experiences/
│       └── internal/
│           ├── roles/                       # Existing — extend, do not replace
│           │   ├── [Role]Journey.tsx        # Existing 3-scenario journeys (keep as "quick mode")
│           │   └── [role]/                  # Existing stage components
│           ├── designation-portal/          # NEW — SDLC-merged journeys
│           │   ├── DesignationPortal.tsx    # Entry: selects role, mounts RoleJourneyEngine
│           │   ├── RoleJourneyEngine.tsx    # Phase orchestrator for one role
│           │   ├── PhaseScene.tsx           # Generic phase renderer (reused across all roles)
│           │   ├── DebriefView.tsx          # Post-decision debrief overlay
│           │   ├── PhaseTransition.tsx      # Animated bridge between SDLC phases
│           │   ├── JourneyCompleteView.tsx  # Blind-spot profile + ripple reveal
│           │   └── CrossRoleImpactView.tsx  # "Your decisions hit these roles" visual
│           └── onboarding/                  # Existing — unchanged
│
├── data/                                    # NEW — pure scenario content, no React
│   └── scenarios/
│       ├── types.ts                         # Shared TypeScript types for all scenario data
│       ├── scoring-config.ts               # Dimension weights, blind-spot thresholds
│       ├── cross-role-impact-map.ts        # Static map: which decision affects which roles
│       └── roles/
│           ├── pm/
│           │   ├── discovery.ts             # PM × Discovery × 4 friction dimensions
│           │   ├── requirements.ts
│           │   ├── design.ts
│           │   ├── development.ts
│           │   ├── testing.ts
│           │   ├── launch.ts
│           │   └── maintenance.ts
│           ├── developer/
│           │   └── [same 7 files]
│           ├── qa/
│           ├── designer/
│           ├── ba/
│           ├── sales/
│           ├── crm/
│           └── strategy/
│
├── state/                                   # NEW — isolated state modules
│   ├── designation-store.tsx               # Context + localStorage for all 8 designations
│   ├── scoring-engine.ts                   # Pure: choices[] → ScoringProfile
│   └── cross-role-impact-engine.ts        # Pure: CompletedJourney[] → ImpactMatrix
│
└── hooks/
    ├── useDesignationProgress.ts           # Read/write designation state
    ├── useRunningScore.ts                  # Derived: live score during journey
    └── useCrossRoleImpact.ts              # Derived: impact data after completion
```

### Structure Rationale

- **`data/scenarios/`:** Completely separating content from rendering is the single highest-leverage structural decision for 8 roles × 7 phases × 4 dimensions (224 scenario slots). Content editors work in `.ts` data files; experience engineers work in components. Merging both into components (as the current role journeys do inline) creates files that cannot be reviewed, edited, or scaled independently.

- **`state/`:** The scoring engine and cross-role impact engine are pure TypeScript — no React, no side effects. Keeping them outside `components/` enforces this purity and makes them independently testable.

- **`designation-portal/`:** New SDLC-merged journeys live alongside (not replacing) existing `roles/` journeys. Existing 3-scenario journeys are preserved as a "quick mode" option.

---

## Architectural Patterns

### Pattern 1: Content-Data Separation (Critical for Maintainability)

**What:** All scenario text, choice definitions, outcome impacts, and debrief content lives in `data/scenarios/[role]/[phase].ts` as typed TypeScript objects. Components receive data via props — they never contain scenario text inline.

**When to use:** Always, for every scenario. No exceptions.

**Trade-offs:** Requires upfront type discipline. Pays back immediately when editing 224 scenario slots — any non-engineer can edit a `.ts` file without touching component logic.

**Example:**
```typescript
// data/scenarios/types.ts
export interface FrictionScenario {
  id: string;
  sdlcPhase: SDLCPhase;                       // "discovery" | "requirements" | ...
  frictionDimension: FrictionDimension;        // "client" | "bureaucracy" | "knowledge" | "conflict"
  title: string;
  story: string;
  uxConnection: string;
  choices: Choice[];
  outcomes: Record<string, Outcome>;
  crossRoleImpacts: CrossRoleImpactRef[];      // which other roles feel this decision
}

export interface Outcome {
  choiceType: string;
  impact: DimensionScores;                     // scores on the 4 friction dimensions
  ripple: RoleRipple[];                        // downstream role impacts
  debrief: Debrief;
  tomorrowAction: string;
}

// data/scenarios/roles/pm/discovery.ts
export const pmDiscoveryScenarios: FrictionScenario[] = [
  {
    id: "pm-discovery-client-friction-01",
    sdlcPhase: "discovery",
    frictionDimension: "client",
    title: "The Undocumented Assumption",
    story: "A ₹3Cr IBC client wants an AI dashboard...",
    // ...
  }
];
```

### Pattern 2: Cumulative Scoring via Reducer + Snapshot

**What:** Each designation journey uses `useReducer` (not `useState`) to accumulate decisions. Every choice dispatches `{ type: 'DECISION_MADE', payload: { phase, dimension, choiceType, scores } }`. The reducer appends to an immutable decisions array. On journey completion, `ScoringEngine.computeProfile(decisions)` runs once to produce the blind-spot profile.

**When to use:** Any state that needs audit trail + pattern analysis. Do not reduce to simple counters — the full decision record enables the blind-spot profile.

**Trade-offs:** Slightly more boilerplate than `useState`. The decisions array grows (max ~28 items per journey, negligible). Required for the "you consistently avoid conflict in Requirements" analysis.

**Example:**
```typescript
// state/designation-store.tsx
interface JourneyState {
  role: RoleId;
  currentPhase: SDLCPhase;
  currentScenarioIndex: number;
  decisions: DecisionRecord[];             // immutable append-only log
  status: "active" | "complete";
}

type JourneyAction =
  | { type: "DECISION_MADE"; payload: DecisionRecord }
  | { type: "ADVANCE_PHASE"; payload: { phase: SDLCPhase } }
  | { type: "COMPLETE_JOURNEY" };

function journeyReducer(state: JourneyState, action: JourneyAction): JourneyState {
  switch (action.type) {
    case "DECISION_MADE":
      return { ...state, decisions: [...state.decisions, action.payload] };
    case "ADVANCE_PHASE":
      return { ...state, currentPhase: action.payload.phase, currentScenarioIndex: 0 };
    case "COMPLETE_JOURNEY":
      return { ...state, status: "complete" };
  }
}
```

### Pattern 3: Pure Scoring Engine

**What:** `ScoringEngine` is a plain TypeScript module (no React hooks, no imports from React). It exports two functions: `computeRunningScore(decisions)` for live display during the journey, and `computeProfile(decisions)` for the final blind-spot analysis.

**When to use:** All scoring calculations. Never compute scores inline inside components or reducers.

**Trade-offs:** Requires agreeing on the scoring schema upfront. Enables easy scoring logic changes without touching components.

**Example:**
```typescript
// state/scoring-engine.ts
export interface ScoringProfile {
  dimensionTotals: Record<FrictionDimension, number>;  // sum per dimension across all phases
  phasePatterns: PhasePattern[];                        // which phases show consistent behavior
  blindSpots: BlindSpot[];                              // derived: "conflict avoidance in Requirements"
  overallScore: number;
  decisionCount: number;
}

export interface BlindSpot {
  label: string;                   // "Conflict avoidance in Requirements phase"
  severity: "low" | "medium" | "high";
  phases: SDLCPhase[];
  dimension: FrictionDimension;
  evidence: string;                // "Chose avoidance path 3/3 times in this phase"
}

export function computeProfile(decisions: DecisionRecord[]): ScoringProfile {
  // Pure computation — no side effects
  // Group by dimension, look for patterns, derive blind spots
}
```

### Pattern 4: Cross-Role Impact via Static Map + Dynamic Calculation

**What:** A static map file (`data/cross-role-impact-map.ts`) defines which decision outcomes in role A affect which SDLC phases in roles B through H, and with what intensity. `CrossRoleImpactEngine.compute(completedJourneys)` uses this map to produce an impact matrix shown in the visualization.

**When to use:** Cross-role ripple visualization. Do NOT derive cross-role impact dynamically from scenario content — that creates a hidden dependency. The map makes relationships explicit and editable.

**Trade-offs:** Requires maintaining the impact map alongside scenario content. The benefit is that the visualization logic is completely decoupled from scenario text.

**Example:**
```typescript
// data/cross-role-impact-map.ts
export interface ImpactEdge {
  sourceRole: RoleId;
  sourcePhase: SDLCPhase;
  targetRole: RoleId;
  targetPhase: SDLCPhase;
  choiceType: string;             // the specific choice that triggers this impact
  description: string;            // "PM skipping discovery leaves BA with no context"
  intensity: 1 | 2 | 3;
}

// state/cross-role-impact-engine.ts
export function compute(completedJourneys: CompletedJourney[]): ImpactMatrix {
  // Walk completed decisions against the static map
  // Return: for each role, which phases were hit and how hard
}
```

---

## Data Flow

### Decision Flow (During Journey)

```
User selects choice in PhaseScene
        ↓
RoleJourneyEngine dispatches DECISION_MADE action
        ↓
journeyReducer appends DecisionRecord to state.decisions
        ↓
DesignationStore persists decisions[] to localStorage
        ↓
useRunningScore hook re-derives live score display (ScoringEngine.computeRunningScore)
        ↓
PhaseScene receives updated running score via props
        ↓
DebriefView mounts with outcome data from scenario content
        ↓
User advances → RoleJourneyEngine advances phase or completes journey
```

### Journey Completion Flow

```
User completes final scenario in final SDLC phase
        ↓
RoleJourneyEngine dispatches COMPLETE_JOURNEY
        ↓
DesignationStore marks role as complete, persists full decisions[]
        ↓
ScoringEngine.computeProfile(decisions) → ScoringProfile
        ↓
CrossRoleImpactEngine.compute([completedJourney]) → ImpactMatrix
        ↓
JourneyCompleteView renders: blind-spot profile + tomorrowActions
        ↓
CrossRoleImpactView renders: animated ripple visualization
```

### Multi-Role Cross-Role Flow

```
User has completed multiple role journeys
        ↓
DesignationStore holds CompletedJourney[] for each completed role
        ↓
CrossRoleImpactEngine.compute(allCompletedJourneys) → full ImpactMatrix
        ↓
CompoundInsightsView shows: "Your PM decisions + your BA decisions compounded here"
```

### State Management Summary

```
DesignationStore (React Context)
    ↓ persists to
localStorage (keyed: hcl_designation_[role])
    ↓ provides to
useDesignationProgress hook → RoleJourneyEngine → PhaseScene
useRunningScore hook → RunningScoreWidget
useCrossRoleImpact hook → CrossRoleImpactView
```

---

## Data Schema: 8 Roles × 7 Phases × 4 Dimensions

The 224-slot content matrix requires a disciplined key structure. Recommended key convention:

```
[role]-[sdlcPhase]-[frictionDimension]
e.g.: pm-discovery-client
      developer-testing-conflict
      ba-requirements-bureaucracy
```

Each slot produces 1 `FrictionScenario` object (minimum), containing 2-3 choices and outcomes. Content can be sparse at launch (some slots can be `null` or deferred) without breaking the engine — `RoleJourneyEngine` skips null slots.

**localStorage key structure:**
```
hcl_designation_pm         → { status, decisions[], completedAt }
hcl_designation_developer  → { status, decisions[], completedAt }
hcl_max_unlocked_layer     → "layer1" | "layer1.5" | "layer2" (existing)
```

Keep each role's state isolated by key — never store all designations in a single object, as a parse error would wipe all progress.

---

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Current (no backend, single user) | React Context + localStorage is sufficient and correct. No external state library needed. |
| Content volume grows (224 → 500+ scenarios) | Split scenario files further. Use dynamic imports (`import()`) per role to avoid loading all 8 roles' content upfront. Each `data/scenarios/roles/[role]/` becomes a lazy-loaded module. |
| Multi-user comparison / analytics added | Add a thin API layer. The scoring engine is already pure TS — it becomes a shared lib between frontend and backend without modification. |

### Scaling Priorities

1. **First bottleneck:** Content bundle size. At 8 roles × 7 phases of scenario text, the bundle can grow. Solution: lazy-load each role's data on role selection, not at app boot.
2. **Second bottleneck:** Cross-role impact computation cost. At 8 completed roles with ~28 decisions each, `CrossRoleImpactEngine.compute()` processes 224 records maximum — negligible for a browser. Not a real bottleneck at this scale.

---

## Anti-Patterns

### Anti-Pattern 1: Inline Scenario Content in Components

**What people do:** Write scenario text, choices, and debrief content directly inside `.tsx` files (as the current `PMJourney.tsx`, `CRMJourney.tsx`, etc. already do).

**Why it's wrong:** A single phase file for one role with 4 friction dimensions becomes 800+ lines. Editing scenario wording requires navigating component code. Testing scenario content requires running the UI. Extending to 8 roles × 7 phases becomes unmanageable.

**Do this instead:** Move all content to `data/scenarios/roles/[role]/[phase].ts`. Components receive content via props. The existing journey files can be kept as-is for their 3 scenarios — only the new SDLC-merged journeys must follow this pattern.

### Anti-Pattern 2: Computing Scores Inside Components

**What people do:** Accumulate scores with `useState` counters directly in the journey component, or compute blind-spot profiles inside a `useEffect`.

**Why it's wrong:** Scoring logic becomes untestable without rendering. Re-render cycles make cumulative mutations unreliable (double-counting on re-render). Pattern detection logic buried in component state is invisible to other components.

**Do this instead:** All score computation in `state/scoring-engine.ts`. Components read derived values from `useRunningScore` hook. The engine is called explicitly on decision commit, not as a side effect.

### Anti-Pattern 3: Single Flat State Object for All 8 Designations

**What people do:** Store all designation progress in one `GlobalDesignationState` object with 8 keys, then serialize the whole thing to one localStorage entry.

**Why it's wrong:** A single corrupted `localStorage` read wipes all progress. Merging all 8 roles into one context means any role's state change re-renders all role consumers. As roles accumulate more state (decisions array of 28 items × 8 roles), the single object becomes the bottleneck.

**Do this instead:** One localStorage key per completed designation (`hcl_designation_[role]`). One React Context can still provide access to all roles, but each role's state is loaded and saved independently.

### Anti-Pattern 4: Recreating the SDLC Context for Role Journeys

**What people do:** Reuse the existing `SDLCContext` (which tracks budget, timeline, complexity for Layer 2's generic project simulation) as the state store for role-specific designation journeys.

**Why it's wrong:** `SDLCContext` models a shared project viewed by everyone — it is not keyed by role. The designation portal needs per-role decisions and per-role scoring profiles. Mixing them couples the Layer 2 experience to the designation portal, making both harder to evolve.

**Do this instead:** Create `DesignationStore` as a separate Context beside `SDLCContext`. If the Layer 2 SDLC phases are reused as structural scaffolding (phase names, ordering), import the SDLC phase type definitions only — not the context itself.

---

## Integration Points

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `RoleJourneyEngine` ↔ `DesignationStore` | `useReducer` dispatch + Context read | Engine dispatches; Store persists |
| `DesignationStore` ↔ `ScoringEngine` | Direct function call (not Context) | Engine is pure TS, called on decision commit |
| `DesignationStore` ↔ `CrossRoleImpactEngine` | Direct function call on journey completion | Reads `CompletedJourney[]` from store |
| `PhaseScene` ↔ scenario data | Props (data injected by `RoleJourneyEngine`) | Scene is stateless, content is external |
| New `DesignationStore` ↔ existing `GlobalExperienceContext` | `GlobalExperienceContext` gets a `designationPortalEntered` flag; the two contexts remain otherwise independent | Do not merge — keep layer control separate from designation scoring |
| Existing `roles/[Role]Journey.tsx` ↔ new portal | No coupling. Old journeys remain independent "quick mode" paths. New SDLC-merged journeys are separate routes. | Avoids regressions on existing content |

### Existing SDLCContext Integration

The existing `SDLCContext` tracks project debt accumulation for Layer 2. For the new designation portal:

- Reuse `SDLCPhase` type definitions (the 7 phase names) from `SDLCContext` — import types only
- Do NOT reuse `SDLCContext`'s runtime state (budget, timeline, UX debt) for designation journeys
- The designation portal's scoring is role-keyed, not project-keyed

---

## Build Order Implications

The dependency graph mandates this build sequence:

1. **Content types first** (`data/scenarios/types.ts`) — everything depends on this. Build the TypeScript interfaces for `FrictionScenario`, `Outcome`, `DecisionRecord`, `ScoringProfile` before any other work.

2. **Scoring engine second** (`state/scoring-engine.ts`) — pure TS, no dependencies. Can be built and tested independently before any UI exists. Defines the `impact` shape that all scenario content must conform to.

3. **Cross-role impact map third** (`data/cross-role-impact-map.ts`) — static data, no React. Defines `ImpactEdge` shape. Needs content types but not the engine.

4. **DesignationStore fourth** (`state/designation-store.tsx`) — depends on types and scoring engine. The Context + reducer that all components will use. Build once, stable for the rest of the work.

5. **PhaseScene and DebriefView fifth** — generic, stateless components. Accept typed props. Can be built with stub data before any role scenarios are written.

6. **RoleJourneyEngine sixth** — wires PhaseScene + DesignationStore + scenario data. The orchestrator.

7. **Scenario content in parallel** — once types are locked, content writers can fill `data/scenarios/roles/[role]/[phase].ts` in any order without touching components.

8. **JourneyCompleteView + CrossRoleImpactView last** — require completed journey data from the store. Build after engine and store are stable.

---

## Sources

- Direct codebase analysis: `src/components/experiences/GlobalExperienceContext.tsx`, `SDLCContext.tsx`, `PMJourney.tsx`, `RoleJourney.tsx`, `InternalExperience.tsx`
- Lu-Lu collaborative decision-making game framework (ScienceDirect, 2016) — decisiveness index and cross-player impact accumulation patterns
- "A Scalable Architecture for One-Stop Evaluation of Serious Games" (SpringerLink, 2020) — player profile recording and evaluation separation
- "Mitigating bias blind spot via a serious video game" (UCSD, COGS2) — blind-spot profile derivation from sequential decision data
- State of React 2025 survey (2025.stateofreact.com) — 34% of React developers use only useState/useContext; confirms Context is appropriate for this scale

---

*Architecture research for: Human Centric Lab — Designation Portal SDLC-Merged Role Journeys*
*Researched: 2026-03-23*
