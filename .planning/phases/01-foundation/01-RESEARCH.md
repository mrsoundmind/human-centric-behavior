# Phase 1: Foundation - Research

**Researched:** 2026-03-23
**Domain:** TypeScript content schema, Zustand + Immer state architecture, declarative navigation hook, technical health fixes
**Confidence:** HIGH — all findings verified against codebase, official docs, or existing pre-phase research

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Scenario Content Schema**
- Single unified `ScenarioConfig` interface with friction dimension as a tagged field (not separate types per dimension)
- Debrief content inline in ScenarioConfig — keeps content co-located with choices for authoring simplicity
- Cross-role impact edges defined in a separate static map file (`data/cross-role-impact-map.ts`), referenced by choice ID — decoupled from scenario content
- File organization: `data/scenarios/[role]/[phase].ts` — one file per role-phase combination (e.g., `data/scenarios/pm/discovery.ts`)
- Zod schema validates at dev startup: all 5 debrief fields required (what/why/how/who/tomorrow), friction dimension tag required, crossRoleImpact array required on every choice
- Stub scenarios created for 1 role (PM) in 1 phase (Discovery) to validate the full pipeline — real content authored in Phase 3

**State Architecture**
- New Zustand store (`DesignationStore`) with Immer middleware — completely independent from existing SDLCContext
- Import only SDLC phase type definitions from SDLCContext — no shared state
- Store shape: single store with `roles` map keyed by role ID (`Designation` type), each containing `decisions: DecisionRecord[]` and `currentPhase: SDLCPhase`
- Full append-only decision log persisted in localStorage — needed for blind spot profile generation in Phase 2
- localStorage schema versioning: version number stored in persisted object, migration function runs on load, graceful reset with user message on unrecoverable schema mismatch
- `completedRoles: Designation[]` field tracks which roles the user has finished (for cross-role insights in Phase 4)

**Navigation Model**
- Linear SDLC phase progression — no skipping allowed, maintains narrative integrity
- Completed phases can be revisited in read-only mode (review decisions without changing them)
- Declarative `usePhaseNavigation` hook: accepts phase list + current index, returns `{ current, next, prev, canAdvance, advance, goBack }` — replaces all array-index navigation patterns
- `canAdvance` guard tied to "user has made a choice in current scenario" — prevents accidental phase skips

**Legacy Journey Integration**
- Existing 3-scenario role journeys preserved as "Quick Mode" — accessible from role briefing screen
- Role briefing screen (`RoleBriefingView`) gets a mode selector: "Full SDLC Journey" (new) or "Quick Scenarios" (existing)
- New `DesignationPortal` component wraps existing `DesignationSelect` + routes to either mode
- Entry point remains `/internalteam` route — `InternalExperience` component updated to use `DesignationPortal`
- No existing component code deleted — only new wrapper and mode routing added

**Technical Health**
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

### Deferred Ideas (OUT OF SCOPE)
- Cross-role dependency graph design (requires CEO/SME domain expertise) — needed before Phase 4, flagged in STATE.md
- Blind spot archetype taxonomy validation (3-5 target users) — needed before Phase 4 completion copy
- Content authoring production plan for 168 scenario slots — needed before Phase 3
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| CINF-01 | Scenario content defined as typed TypeScript data objects separated from React components (ScenarioConfig interface) | Content-data separation pattern documented; Zod integration verified in stack research |
| CINF-02 | Generic ScenarioRenderer component that consumes ScenarioConfig and renders any role/phase scenario without role-specific component code | GenericStageWrapper / GenericDebriefOverlay in RoleJourney.tsx are candidate abstractions to build from |
| CINF-03 | Zod schema validation for all scenario content at build/dev time | Zod 3.25.76 already installed; no new install needed; startup validation pattern documented |
| CINF-04 | Debrief template structure enforced as non-negotiable in schema (5 fields: what/why/how/who/tomorrow) | Zod `.object()` with all 5 fields as `z.string().min(1)` — straightforward enforcement |
| CINF-05 | Each scenario choice carries a `crossRoleImpact[]` array keyed to specific decisions | crossRoleImpact on Choice type; impacts are authored strings keyed to choice ID, not derived dynamically |
| STAT-01 | Zustand store with Immer middleware for designation journey state | Zustand 5.0.12 + Immer 11.1.4 NOT YET in package.json; require `npm install` before implementation |
| STAT-02 | Domain-split contexts — SDLCContext remains for Layer 2, new DesignationStore handles role journey state independently | SDLCContext analyzed; import SDLCPhase type only; do not merge |
| STAT-03 | localStorage schema versioning with migration guard | Versioned envelope pattern documented; graceful reset message on mismatch required |
| STAT-04 | Append-only decisions log per journey session | Zustand + Immer; Immer `produce()` for safe append to nested array; persisted via Zustand persist middleware |
| TECH-01 | Fix CONCERNS.md issues: memory leaks in event listeners, timer cleanup, unguarded localStorage access | 3 specific files identified; cleanup patterns documented below |
| TECH-02 | Address type safety — reduce `any` usage in role journey components, type completion callbacks properly | 6 sales stage files + SDLCContext.tsx identified; specific interface names required |
</phase_requirements>

---

## Summary

Phase 1 locks the three architectural contracts every downstream phase depends on: the TypeScript content schema, the Zustand state store, and the declarative navigation hook. None of this phase involves user-visible features — it is the infrastructure layer. A developer completing Phase 1 successfully will have a working type contract, a populated stub scenario that validates the entire data-to-renderer pipeline, a Zustand store that persists to localStorage with schema versioning, and a `usePhaseNavigation` hook that replaces the fragile array-index navigation pattern. They will also have resolved all memory leaks and `any` usages catalogued in CONCERNS.md.

The primary technical risk in this phase is the Zustand + Immer installation, which is not yet in `package.json`. Zustand 5.0.12 and Immer 11.1.4 must be installed before the store implementation can begin. Everything else in this phase builds on already-present infrastructure: Zod (3.25.76 already installed), React (18.3.1), TypeScript (5.8.3), and the existing shadcn/ui component library.

The secondary risk is the boundary between the new `DesignationStore` and the existing `SDLCContext`. The rule is strict: import the `SDLCPhase` type union from `SDLCContext.tsx` only; never import runtime state or context methods. This boundary, established in Phase 1, prevents the SDLCContext from collapsing under cross-role state load (documented as Pitfall 2 in PITFALLS.md).

**Primary recommendation:** Build in task order — types first, then Zod schema, then Zustand store, then navigation hook, then ScenarioRenderer, then stub scenario — because each layer is a prerequisite for the next. Do not parallelize until types are locked.

---

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Zod | 3.25.76 | Schema validation for ScenarioConfig at dev startup | Already installed; catches 5 required debrief fields missing before any UI renders |
| Zustand | 5.0.12 | Cross-session designation journey state with localStorage persist | `useSyncExternalStore` based; React 18 compatible; persist middleware handles localStorage with zero config |
| Immer | 11.1.4 | Immutable nested state updates for deeply nested `roles[role].decisions[]` | Without Immer, each decision append requires 4-level spread; Immer draft mutation is idiomatic |
| TypeScript | 5.8.3 | Type contracts for ScenarioConfig, DecisionRecord, DesignationStore | Already locked in codebase; `strict: false` globally — enable per-file with `// @ts-strict` for new files |
| React | 18.3.1 | Component runtime | Locked — do not upgrade |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| Framer Motion | 12.26.2 | AnimatePresence for ScenarioRenderer transitions | Already installed; use `mode="wait"` on all scenario transitions |
| shadcn/ui (Radix) | existing | Card, Badge, Progress for ScenarioRenderer UI primitives | Already installed; use without modification |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Zustand + persist | React Context + manual localStorage | Context re-renders all consumers on every decision append; not viable at 28 decisions per role journey |
| Zustand + Immer middleware | Zustand with manual spreads | Manual spreads on `roles[roleId].decisions` = 4-level spread; error-prone at scale |
| Zod for startup validation | TypeScript types only | Types are erased at runtime; Zod catches malformed data files before the UI ever tries to render them |

**Installation (new packages only):**
```bash
npm install zustand@5.0.12 immer@11.1.4
```

Note: `zustand` and `immer` are NOT in the current `package.json`. They must be installed. Zod is already present.

---

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   └── experiences/
│       └── internal/
│           ├── roles/                    # Existing — PRESERVE, do not modify
│           ├── DesignationPortal.tsx     # NEW — wraps DesignationSelect + mode routing
│           └── designation-portal/      # NEW — SDLC-merged journey components
│               └── ScenarioRenderer.tsx # Generic, receives ScenarioConfig props
│
data/                                     # NEW — pure TypeScript, no React imports
├── scenarios/
│   ├── types.ts                          # ScenarioConfig, Choice, Debrief, DecisionRecord
│   ├── schema.ts                         # Zod schema + validateScenario() export
│   ├── cross-role-impact-map.ts          # Static ImpactEdge[] map (stub for Phase 1)
│   └── pm/
│       └── discovery.ts                 # Stub PM/Discovery scenario (pipeline validation)
│
src/
└── state/
    └── designation-store.ts             # Zustand store with Immer + persist
    └── hooks/
        └── usePhaseNavigation.ts        # Declarative navigation hook
```

### Pattern 1: ScenarioConfig Interface (Content-Data Separation)
**What:** All scenario content is a plain TypeScript object. Components receive it as props.
**When to use:** Every scenario authored in Phase 3. No scenario text ever lives in a .tsx file.
**Example:**
```typescript
// data/scenarios/types.ts
export type FrictionDimension =
  | "client_friction"
  | "internal_bureaucracy"
  | "knowledge_gap"
  | "conflict_avoidance";

export type SDLCPhase =
  | "discovery"
  | "requirements"
  | "design"
  | "development"
  | "testing"
  | "launch"
  | "maintenance";

export type Designation =
  | "sales" | "pm" | "developer" | "qa"
  | "designer" | "ba" | "crm" | "strategy";

export interface CrossRoleImpact {
  affectedRole: Designation;
  affectedPhase: SDLCPhase;
  description: string;
  severity: "low" | "medium" | "high";
}

export interface Choice {
  id: string;
  text: string;
  frictionTag: FrictionDimension;
  crossRoleImpact: CrossRoleImpact[]; // required — CINF-05
}

export interface Debrief {
  whatHappened: string;   // CINF-04 field 1
  why: string;            // CINF-04 field 2
  how: string;            // CINF-04 field 3
  whoBecame: string;      // CINF-04 field 4
  tomorrowAction: string; // CINF-04 field 5
}

export interface ScenarioConfig {
  id: string;
  role: Designation;
  phase: SDLCPhase;
  frictionDimension: FrictionDimension; // tagged field — CINF-01
  title: string;
  setup: string;
  choices: Choice[];
  debrief: Debrief; // inline — CINF-04
}
```

### Pattern 2: Zod Schema for Startup Validation
**What:** Zod mirrors the TypeScript types as a runtime schema. Validated at dev startup before UI renders.
**When to use:** Wrap all `ScenarioConfig` data files in `validateScenario()` at import time.
**Example:**
```typescript
// data/scenarios/schema.ts
import { z } from "zod";

const CrossRoleImpactSchema = z.object({
  affectedRole: z.enum(["sales","pm","developer","qa","designer","ba","crm","strategy"]),
  affectedPhase: z.enum(["discovery","requirements","design","development","testing","launch","maintenance"]),
  description: z.string().min(1),
  severity: z.enum(["low","medium","high"]),
});

const ChoiceSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
  frictionTag: z.enum(["client_friction","internal_bureaucracy","knowledge_gap","conflict_avoidance"]),
  crossRoleImpact: z.array(CrossRoleImpactSchema), // empty array allowed; key is presence of field
});

const DebriefSchema = z.object({
  whatHappened: z.string().min(1),
  why: z.string().min(1),
  how: z.string().min(1),
  whoBecame: z.string().min(1),
  tomorrowAction: z.string().min(1),
});

export const ScenarioConfigSchema = z.object({
  id: z.string().min(1),
  role: z.enum(["sales","pm","developer","qa","designer","ba","crm","strategy"]),
  phase: z.enum(["discovery","requirements","design","development","testing","launch","maintenance"]),
  frictionDimension: z.enum(["client_friction","internal_bureaucracy","knowledge_gap","conflict_avoidance"]),
  title: z.string().min(1),
  setup: z.string().min(1),
  choices: z.array(ChoiceSchema).min(2),
  debrief: DebriefSchema,
});

export type ScenarioConfig = z.infer<typeof ScenarioConfigSchema>;

export function validateScenario(raw: unknown, filePath?: string): ScenarioConfig {
  const result = ScenarioConfigSchema.safeParse(raw);
  if (!result.success) {
    const loc = filePath ? ` in ${filePath}` : "";
    throw new Error(`[ScenarioConfig validation failed${loc}]\n${result.error.toString()}`);
  }
  return result.data;
}
```

### Pattern 3: Zustand + Immer DesignationStore
**What:** Single Zustand store with Immer middleware and persist middleware. Keyed by Designation role.
**When to use:** All designation journey state — current phase, decisions, completedRoles.
**Example:**
```typescript
// src/state/designation-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// Import ONLY the type from SDLCContext — never import useSDLC or SDLCProvider
import type { SDLCPhase } from "@/components/experiences/layer2/SDLCContext";

export interface DecisionRecord {
  choiceId: string;
  frictionTag: FrictionDimension;
  timestamp: number;
  phase: SDLCPhase;
  role: Designation;
}

interface RoleState {
  currentPhase: SDLCPhase;
  decisions: DecisionRecord[];   // append-only — STAT-04
  currentScenarioIndex: number;
  status: "not_started" | "in_progress" | "complete";
}

interface PersistedDesignationState {
  schemaVersion: number;         // STAT-03
  roles: Partial<Record<Designation, RoleState>>;
  completedRoles: Designation[]; // STAT-01 — for Phase 4 cross-role insights
}

interface DesignationActions {
  recordDecision: (record: DecisionRecord) => void;
  advancePhase: (role: Designation, nextPhase: SDLCPhase) => void;
  completeRole: (role: Designation) => void;
  resetRoleProgress: (role: Designation) => void;
  resetAll: () => void; // used by migration guard
}

const SCHEMA_VERSION = 1;

export const useDesignationStore = create<
  PersistedDesignationState & DesignationActions
>()(
  persist(
    immer((set) => ({
      schemaVersion: SCHEMA_VERSION,
      roles: {},
      completedRoles: [],

      recordDecision: (record) =>
        set((state) => {
          if (!state.roles[record.role]) {
            state.roles[record.role] = {
              currentPhase: record.phase,
              decisions: [],
              currentScenarioIndex: 0,
              status: "in_progress",
            };
          }
          state.roles[record.role]!.decisions.push(record); // Immer draft mutation
        }),

      // ... other actions
    })),
    {
      name: "hcl_designation_store",
      version: SCHEMA_VERSION,
      // Migration guard — STAT-03
      migrate: (persisted: unknown, version: number) => {
        if (version !== SCHEMA_VERSION) {
          console.warn("[DesignationStore] Schema mismatch — resetting progress");
          return { schemaVersion: SCHEMA_VERSION, roles: {}, completedRoles: [] };
        }
        return persisted as PersistedDesignationState;
      },
    }
  )
);
```

### Pattern 4: usePhaseNavigation Hook
**What:** Declarative hook that replaces all `SCREEN_ORDER.indexOf()` patterns.
**When to use:** Every new phase component. Never use array index navigation in new code.
**Example:**
```typescript
// src/state/hooks/usePhaseNavigation.ts
import { useState } from "react";

export interface PhaseNavigationConfig<T> {
  phases: T[];
  onComplete?: () => void;
}

export interface PhaseNavigationResult<T> {
  current: T;
  currentIndex: number;
  total: number;
  canAdvance: boolean;
  hasDecision: boolean;
  advance: () => void;
  goBack: () => void;
  setHasDecision: (value: boolean) => void;
  isFirst: boolean;
  isLast: boolean;
}

export function usePhaseNavigation<T>(
  config: PhaseNavigationConfig<T>
): PhaseNavigationResult<T> {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasDecision, setHasDecision] = useState(false);

  const canAdvance = hasDecision; // CONTEXT.md guard: "user has made a choice"

  return {
    current: config.phases[currentIndex],
    currentIndex,
    total: config.phases.length,
    canAdvance,
    hasDecision,
    advance: () => {
      if (!canAdvance) return;
      if (currentIndex === config.phases.length - 1) {
        config.onComplete?.();
      } else {
        setCurrentIndex((i) => i + 1);
        setHasDecision(false); // reset for next phase
      }
    },
    goBack: () => {
      if (currentIndex > 0) setCurrentIndex((i) => i - 1);
    },
    setHasDecision,
    isFirst: currentIndex === 0,
    isLast: currentIndex === config.phases.length - 1,
  };
}
```

### Pattern 5: Generic ScenarioRenderer
**What:** Stateless component that accepts any `ScenarioConfig` and renders the full scenario UI.
**When to use:** The ONLY component that renders scenario content. No role-specific rendering logic inside.
**Example structure:**
```typescript
// src/components/experiences/internal/designation-portal/ScenarioRenderer.tsx
interface ScenarioRendererProps {
  scenario: ScenarioConfig;
  onChoiceSelected: (choice: Choice) => void;
  selectedChoiceId: string | null;
  onAdvance: () => void;
  isDebriefVisible: boolean;
}
```

### Pattern 6: localStorage Safety Wrapper
**What:** Every localStorage access must be wrapped in try/catch for quota exceeded and privacy mode.
**When to use:** In designation-store.ts persist layer and anywhere localStorage is accessed directly.
**Example:**
```typescript
// Zustand persist handles this internally when using the persist middleware.
// For any direct access outside Zustand:
function safeLocalStorageGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null; // privacy mode or quota exceeded
  }
}
```

### Anti-Patterns to Avoid
- **Adding state to SDLCContext:** SDLCContext is frozen — any new designation journey state goes to DesignationStore only
- **Role-specific branches in ScenarioRenderer:** If you write `if (role === "pm") { ... }` inside ScenarioRenderer, the data-renderer separation has failed
- **Inline scenario content in tsx files:** All scenario text must be in `data/scenarios/[role]/[phase].ts`
- **Array-index navigation in new components:** Never write `SCREEN_ORDER.indexOf()` in new code
- **`waitStartTime` as useState (stale closure bug):** `DelayedResponseExperience.tsx` — use `useRef` not `useState` for timer start values

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Nested immutable state updates | Custom spread helpers for `roles[role].decisions.push()` | Immer middleware (`immer` from `zustand/middleware/immer`) | 4-level spread is error-prone; Immer handles structural sharing correctly |
| localStorage persistence with versioning | Manual serialize/deserialize + version check | Zustand `persist` middleware with `version` + `migrate` options | Handles hydration, rehydration, version migration, and storage errors |
| Runtime schema validation | Custom type guard functions | Zod `safeParse()` + descriptive error messages | Zod error messages already include field path and failure reason |
| Animation state isolation | Manual debounce/queue | `onAnimationComplete` callback from Framer Motion | Fire state mutations after animation, not simultaneously — Framer Motion provides the callback |

**Key insight:** The three libraries (Zod, Zustand, Immer) each solve a class of problem that is deceptively complex to hand-roll correctly. Zod error messages have nested path reporting. Zustand persist handles race conditions on hydration. Immer handles structural sharing in nested updates. All three are already in the ecosystem or readily available.

---

## Common Pitfalls

### Pitfall 1: SDLCContext Type Import vs Runtime Import
**What goes wrong:** A developer imports `useSDLC` hook alongside the `SDLCPhase` type, inadvertently coupling DesignationStore to Layer 2 runtime state.
**Why it happens:** TypeScript doesn't enforce import-type vs import at the module boundary — the import just works.
**How to avoid:** Use `import type { SDLCPhase } from "@/components/experiences/layer2/SDLCContext"` (the `type` keyword is erased at compile time and carries zero runtime coupling).
**Warning signs:** `useDesignationStore` file contains any reference to `useSDLC`, `SDLCProvider`, or `project.decisions`

### Pitfall 2: Zod Schema Diverging from TypeScript Types
**What goes wrong:** The Zod schema and the TypeScript interface define the same shape but diverge over time — a new field added to the TypeScript interface without updating Zod, so Zod silently ignores it.
**How to avoid:** Use `z.infer<typeof ScenarioConfigSchema>` to derive the TypeScript type FROM the Zod schema — not the other way around. There is one source of truth.
**Warning signs:** `ScenarioConfig` interface defined separately from `ScenarioConfigSchema`; fields that match in one but not the other

### Pitfall 3: Stale Closure in DelayedResponseExperience.tsx
**What goes wrong:** `waitStartTime` is stored as `useState`, captured in the setTimeout closure. When the component re-renders between search start and result arrival, the closure holds the OLD state value.
**Root cause:** Documented in CONCERNS.md lines 256-261.
**Fix:** Replace `const [waitStartTime, setWaitStartTime] = useState<number | null>(null)` with `const waitStartTimeRef = useRef<number | null>(null)`. Ref assignment is synchronous and always reflects the current value inside closures.

### Pitfall 4: Multiple mousemove Listeners in GradientBackground
**What goes wrong:** `window.addEventListener("mousemove")` is called inside the GradientBackground component on every mount. If the parent remounts frequently (as role journeys do), multiple listeners attach.
**Root cause:** CONCERNS.md documents this in `src/components/internal/RoleJourney.tsx` lines 50-51.
**Fix:** Move the event listener setup to `useEffect` with an empty dependency array and return a cleanup function that calls `removeEventListener`.

### Pitfall 5: localStorage Quota Exceeded / Privacy Mode
**What goes wrong:** In Safari private mode or when storage quota is exceeded, `localStorage.setItem()` throws synchronously. Zustand's persist middleware will catch this internally, but any direct `localStorage` access in components will crash silently.
**How to avoid:** Zustand persist middleware handles the Zustand store. For any other direct localStorage access (e.g., the existing `hcl_max_unlocked_layer` key in GlobalExperienceContext), wrap in try/catch.

### Pitfall 6: `any` Leaking Into New Files
**What goes wrong:** TypeScript `strict: false` globally means `any` doesn't cause errors. New files written without explicit typing will silently accept `any` assignments.
**How to avoid:** Enable strict mode per-file for all new Phase 1 files with `// @ts-nocheck` set to false (never use) and instead add `// @ts-strict` comment OR configure stricter rules in the file-level tsconfig override for `data/` and `src/state/`. The locked decision says "enable stricter TypeScript for new files only."

---

## Code Examples

### Zustand Immer Middleware Import
```typescript
// Source: official Zustand docs — zustand/middleware/immer
import { immer } from "zustand/middleware/immer";
// NOT: import produce from "immer" (use middleware, not direct Immer)
```

### Zod safeParse for non-throwing validation
```typescript
// Source: Zod official docs
const result = ScenarioConfigSchema.safeParse(rawScenario);
if (!result.success) {
  // result.error.issues contains array of { path: string[], message: string }
  console.error(result.error.format()); // tree-structured error output
} else {
  // result.data is typed as ScenarioConfig
}
```

### Framer Motion onAnimationComplete for state/animation separation
```typescript
// Source: Framer Motion official docs
<AnimatePresence mode="wait">
  <motion.div
    key={scenario.id}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    onAnimationComplete={() => {
      // Safe to fire decision recording AFTER animation completes
      recordDecision(pendingDecision);
    }}
  />
</AnimatePresence>
```

### useEffect Cleanup Pattern (for TECH-01 fixes)
```typescript
// Fix for DelayedResponseExperience.tsx and GradientBackground
useEffect(() => {
  if (!isSearching) return;

  const handleClick = () => setUserActions(prev => [...prev, "clicked"]);
  const handleKeyDown = () => setUserActions(prev => [...prev, "typed"]);

  document.addEventListener("click", handleClick);
  document.addEventListener("keydown", handleKeyDown);

  const hintTimeout = setTimeout(() => setShowHint(true), 4000);

  // Cleanup runs on unmount OR when isSearching changes to false
  return () => {
    document.removeEventListener("click", handleClick);
    document.removeEventListener("keydown", handleKeyDown);
    clearTimeout(hintTimeout);
  };
}, [isSearching]); // already correct in the file; verify cleanup runs
```

### Stub PM/Discovery Scenario (pipeline validation)
```typescript
// data/scenarios/pm/discovery.ts
import { validateScenario } from "../schema";

const raw = {
  id: "pm-discovery-client-01",
  role: "pm",
  phase: "discovery",
  frictionDimension: "client_friction",
  title: "The Undocumented Assumption",
  setup: "A ₹3Cr IBC client wants an AI dashboard integrated into their procurement portal. Your discovery call notes say 'AI features' — but nobody defined what that means. Sprint planning is in 3 days.",
  choices: [
    {
      id: "pm-disc-c01-a",
      text: "Approve the discovery summary and move to requirements with 'AI dashboard' as a scope item",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "ba",
          affectedPhase: "requirements",
          description: "BA inherits ambiguous 'AI features' scope — requirements gathering starts without a defined target",
          severity: "high",
        },
      ],
    },
    {
      id: "pm-disc-c01-b",
      text: "Request a 30-minute callback with the client to define 'AI' before closing discovery",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened: "Approving an undefined AI scope item closes discovery without establishing what was agreed.",
    why: "Enterprise clients often use 'AI' as a placeholder for competitive pressure. Without a concrete definition, the procurement cycle continues but the delivery promise is undefined.",
    how: "A 30-minute scope confirmation call is the standard PM gate for any client request using category language without specifics.",
    whoBecame: "A PM who approves vague scope items to avoid delay becomes the bottleneck when requirements gathering stalls two weeks later.",
    tomorrowAction: "In your next discovery call close-out, add one mandatory line to your summary doc: 'Confirmed definition of [feature term] as: [specific behavior].' Never close discovery with a category term.",
  },
};

export const pmDiscoveryScenarios = [validateScenario(raw, "data/scenarios/pm/discovery.ts")];
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `SCREEN_ORDER.indexOf(currentScreen)` array navigation | Declarative `usePhaseNavigation` hook | Phase 1 (this work) | Removes all hardcoded screen arrays from new phase files |
| Inline scenario content in `*.tsx` files (PMJourney.tsx, CRMJourney.tsx, etc.) | ScenarioConfig data objects in `data/scenarios/` | Phase 1 (this work) | Content authors never touch component code |
| `SDLCContext` single state blob for all project data | Domain-split: SDLCContext (Layer 2 only) + DesignationStore (new) | Phase 1 (this work) | Prevents O(n) re-renders on decision append |
| No localStorage schema versioning | Versioned envelope with `schemaVersion` + `migrate()` | Phase 1 (this work) | Returning users get graceful reset message instead of silent corruption |
| `onComplete: (data: any) => void` callbacks | Specific `LeadGenCompletionData`, `MeetingCompletionData` etc. interfaces | Phase 1 (TECH-02) | Eliminates `any` leak in 6 sales stage files |

**Deprecated/outdated:**
- Array-index navigation (`SCREEN_ORDER`): existing Layer 2 phase files may keep it; no new SDLC-merged phase files use it
- `designConfiguration: any` in SDLCContext: acceptable in Phase 1 (locked decision says don't break existing code)

---

## Open Questions

1. **SDLCPhase type location**
   - What we know: `SDLCPhase` type doesn't currently exist as an explicit exported type union in `SDLCContext.tsx` — the file uses string literals for phase names inline
   - What's unclear: Whether to extract a `SDLCPhase` type union from `SDLCContext.tsx` (touching existing code) or define a duplicate in `data/scenarios/types.ts`
   - Recommendation: Define `SDLCPhase` in `data/scenarios/types.ts` as the canonical type. This is new infrastructure, not existing code. The existing SDLCContext phases don't need to match (they serve a different purpose). If a future phase merges them, the types can be reconciled then.

2. **`DesignationPortal` component scope**
   - What we know: CONTEXT.md says "new `DesignationPortal` component wraps existing `DesignationSelect` + routes to either mode" and "entry point remains `/internalteam` route"
   - What's unclear: Whether `InternalExperience.tsx` is modified to use `DesignationPortal` or if `DesignationPortal` is inserted between `InternalExperience` and `DesignationSelect`
   - Recommendation: Insert `DesignationPortal` as a wrapper inside `InternalExperience.tsx` at the `designation` step. Minimal surgery — change one line to render `<DesignationPortal>` instead of `<DesignationSelect>`. No route changes required.

3. **`ScenarioRenderer` read-only mode for completed phase revisit**
   - What we know: "Completed phases can be revisited in read-only mode" is a locked decision
   - What's unclear: How to distinguish read-only vs active in the renderer
   - Recommendation: Add `mode: "active" | "readonly"` prop to ScenarioRenderer. In readonly mode, choices are shown as disabled buttons with the selected choice highlighted.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None installed — zero test files exist in codebase |
| Config file | None — requires Wave 0 setup |
| Quick run command | N/A until installed |
| Full suite command | N/A until installed |

Note: Per `REQUIREMENTS.md` Out of Scope section: "Automated test suite — Manual QA adequate for experiential content validation." The project explicitly scopes out automated testing. However, `nyquist_validation: true` in config.json means the planner should address this. The resolution: Zod validation at dev startup IS the test infrastructure for Phase 1 content requirements. No test runner needed for CINF requirements — Zod throws at startup. For STAT and TECH requirements, manual verification steps are the appropriate gate.

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| CINF-01 | ScenarioConfig TypeScript type exists, scenario data objects use it | Compile-time check | `npx tsc --noEmit` | Wave 0 |
| CINF-02 | ScenarioRenderer renders stub PM/Discovery scenario | Manual visual verify | Open dev server, navigate to DesignationPortal | N/A |
| CINF-03 | Zod throws on malformed scenario at import time | Runtime startup check | Delete `debrief.why` from stub, run `npm run dev` — expect error in console | N/A |
| CINF-04 | All 5 debrief fields required — missing field causes Zod error | Same as CINF-03 | Same as CINF-03 | N/A |
| CINF-05 | `crossRoleImpact` array present on every choice | Compile + Zod check | `npx tsc --noEmit` + `npm run dev` | N/A |
| STAT-01 | Zustand store initializes with empty roles map | Manual — DevTools | Open browser DevTools, check `hcl_designation_store` in Application → Local Storage | N/A |
| STAT-02 | DesignationStore does not import SDLCProvider or useSDLC | Grep check | `grep -r "useSDLC" src/state/` — must return no results | N/A |
| STAT-03 | Schema version mismatch resets store with message | Manual test | Manually set `schemaVersion: 0` in localStorage, reload — expect reset message | N/A |
| STAT-04 | Decision recorded with full fields, persists across refresh | Manual test | Select a choice in ScenarioRenderer, refresh, inspect localStorage | N/A |
| TECH-01 | No console warnings on mount/unmount cycle | Manual test | Open DevTools console, navigate into/out of DelayedResponseExperience 3 times rapidly — zero "can't update unmounted component" warnings | N/A |
| TECH-02 | No `any` in new files | Compile check | `npx tsc --noEmit` with strict flags on new files | N/A |

### Sampling Rate
- **Per task commit:** Run `npx tsc --noEmit` to catch type regressions
- **Per wave merge:** Manual walkthrough of stub PM/Discovery scenario in dev server
- **Phase gate:** All 5 CINF requirements verified via Zod startup test + TypeScript compile clean; TECH-01 console clean on mount/unmount cycle

### Wave 0 Gaps
- [ ] Zustand and Immer not installed: `npm install zustand@5.0.12 immer@11.1.4` — prerequisite for STAT-01
- [ ] No `data/` directory in project root: create before implementing CINF-01
- [ ] No `src/state/` directory: create before implementing STAT-01

*(No test runner installation required — project explicitly scopes out automated test suites per REQUIREMENTS.md)*

---

## Sources

### Primary (HIGH confidence)
- Direct codebase analysis: `package.json`, `tsconfig.app.json`, `src/components/experiences/internal/InternalExperience.tsx`, `src/components/experiences/layer2/SDLCContext.tsx`, `src/components/experiences/DelayedResponseExperience.tsx`
- `.planning/research/STACK.md` — Zustand 5.0.12 + Immer 11.1.4 versions verified 2026-03-23
- `.planning/research/ARCHITECTURE.md` — content-data separation pattern, build order, data schema
- `.planning/research/PITFALLS.md` — 6 critical pitfalls directly applicable to Phase 1
- `.planning/codebase/CONCERNS.md` — exact file/line locations for memory leaks, type issues, stale closures

### Secondary (MEDIUM confidence)
- `.planning/research/FEATURES.md` — anti-features section confirms no numeric scoring in ScenarioConfig
- Zustand official docs: persist middleware `version` + `migrate` API — verified in STACK.md research

### Tertiary (LOW confidence)
- None — all Phase 1 findings have HIGH or MEDIUM confidence sources

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — package.json verified; Zustand/Immer versions from npm-verified STACK.md
- Architecture: HIGH — derived from existing codebase analysis + locked CONTEXT.md decisions
- Pitfalls: HIGH — TECH-01 issues have exact file/line citations from CONCERNS.md; others from PITFALLS.md

**Research date:** 2026-03-23
**Valid until:** 2026-04-22 (30 days — stable stack, no fast-moving dependencies in this phase)
