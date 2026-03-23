# Phase 3: Role Content — First Wave - Research

**Researched:** 2026-03-23
**Domain:** TypeScript scenario content authoring + DesignationPortal multi-role wiring
**Confidence:** HIGH

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**Visual Interaction (USER-LOCKED)**
- Everything MUST have a visual interactive experience — no data-only work without UI wiring
- Follow the EXACT same UI patterns already in the codebase: dark backgrounds, Framer Motion AnimatePresence with `mode="wait"`, shadcn/ui components (Card, Badge, Button), gradient backgrounds
- ScenarioRenderer from Phase 1 IS the rendering layer — all new scenarios render through it without modification
- Existing role journeys (PMJourney, DeveloperJourney, etc.) must NOT be broken — they remain accessible via Quick Mode in RoleBriefingView
- Each new scenario must be visually playable: user sees setup, makes a choice, sees debrief with tomorrow's action highlighted in amber

**Scenario Content Structure**
- File organization: `data/scenarios/[role]/[phase].ts` — one file per role-phase combination (locked in Phase 1)
- Each file exports an array of validated ScenarioConfig objects (same pattern as `data/scenarios/pm/discovery.ts`)
- Each SDLC phase gets 4 scenarios covering all 4 friction dimensions: client_friction, internal_bureaucracy, knowledge_gap, conflict_avoidance
- Every scenario has 2 choices minimum, each with `frictionTag` and `crossRoleImpact[]`
- All 5 debrief fields required and enforced by Zod at import time (whatHappened, why, how, whoBecame, tomorrowAction)
- `tomorrowAction` must name a specific workflow artifact the user can change — not generic advice
- Content uses realistic Indian B2B context (IBC, SAP, TCS, enterprise procurement) — this is a differentiator (locked in PROJECT.md)

**Roles and Phases**
- PM: Discovery (expand from stub), Requirements, Design — 12 scenarios total
- Developer: Discovery, Requirements, Design — 12 scenarios total
- QA: Discovery, Requirements, Design — 12 scenarios total
- Total: 36 scenarios (3 roles × 3 phases × 4 friction dimensions)

**Journey Flow Wiring**
- DesignationPortal.FullSDLCJourney must be updated to load scenario data for all 3 roles (remove "coming soon" placeholder)
- Journey cycles through all scenarios in a phase (4 scenarios) before advancing to next SDLC phase via usePhaseNavigation
- Each choice records a DecisionRecord to DesignationStore (already wired for PM in Phase 1)
- Role parameter must be passed correctly to recordDecision (not hardcoded to "pm")
- Progress persists in localStorage per DesignationStore — refreshing mid-journey resumes at correct phase/scenario

**DebriefView Decision**
- NO separate DebriefView component — ScenarioRenderer already renders all 5 debrief fields
- Plan 03-01 from ROADMAP (DebriefView component) is absorbed into existing ScenarioRenderer

**Existing Content Preservation**
- All 8 existing role journeys in `src/components/experiences/internal/roles/` stay completely untouched
- Quick Mode path through RoleBriefingView continues to work exactly as before
- InternalExperience step machine unchanged — DesignationPortal handles all routing

### Claude's Discretion
- Exact scenario narratives, choice text, and debrief content (must follow constraints above)
- How to structure the phase-level scenario loader (single import file vs per-role loader)
- Whether PM Discovery stub gets expanded in-place or replaced with 4 full scenarios
- Cross-role impact edge descriptions (which decisions affect which other roles)
- Scenario ordering within each phase (which friction dimension comes first)

### Deferred Ideas (OUT OF SCOPE)
- Remaining 5 roles (Sales, Designer, BA, CRM, Strategy) — Phase 5
- Extended SDLC phases beyond Discovery/Requirements/Design (Development, Testing, Launch, Maintenance) — v2
- Scenario authoring tool for organizations — v2
- Industry-specific scenario packs — v2
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| ROLE-01 | Each of the 3 roles (PM, Developer, QA) walks through 3 SDLC phases (Discovery, Requirements, Design) with role-specific friction at every phase | 36 scenario files map to `data/scenarios/[role]/[phase].ts`; DesignationPortal FullSDLCJourney wired to load these |
| ROLE-02 | Each phase friction covers 4 dimensions: client friction, internal bureaucracy, knowledge gaps, conflict avoidance | 4 scenarios per phase file; each exports exactly one scenario per FrictionDimension enum value |
| ROLE-03 | Approval bottleneck scenarios per role — decisions stuck waiting for sign-off, deadlines slipping | `internal_bureaucracy` dimension scenario in each role's Requirements phase is the primary bottleneck scenario |
| ROLE-04 | Knowledge silo scenarios per role — one person holds context, incomplete handovers, rework | `knowledge_gap` dimension scenario per phase; debrief references handover artifact explicitly |
| ROLE-05 | Conflict avoidance scenarios per role — absorbing bad requirements silently, problems compounding | `conflict_avoidance` dimension scenario per phase; debrief names the specific pushback that was avoided |
| ROLE-06 | Phase-specific "do this tomorrow" action tied to that role's actual workflow at debrief | `tomorrowAction` field in every Debrief object — names a real document, agenda item, or rubric step |
| ROLE-07 | Existing 3-scenario role journeys preserved and accessible (not deleted) | Quick Mode in RoleBriefingView unchanged; all 8 existing Journey components untouched |
| ROLE-08 | Declarative phase navigation hook (usePhaseNavigation) replacing array-index navigation | FullSDLCJourney already uses usePhaseNavigation — no changes to hook; DesignationPortal wiring uses it for all 3 roles |
| BEHV-01 | Each SDLC phase debrief produces a concrete "do this tomorrow" action tied to that role's actual workflow | Zod DebriefSchema enforces `tomorrowAction: z.string().min(1)` at import time — if the field is absent, startup throws |
</phase_requirements>

---

## Summary

Phase 3 is primarily a content-authoring phase with two wiring tasks. The foundational infrastructure (types, schema, Zod validation, ScenarioRenderer, DesignationStore, usePhaseNavigation) was completed in Phases 1 and 2 and must not be touched. The work is: (1) author 35 new ScenarioConfig objects across 9 files (PM has 1 stub that becomes 4 + 8 new files for 8 remaining role-phase combos), (2) wire DesignationPortal's FullSDLCJourney to handle Developer and QA (removing the "coming soon" branch), and (3) fix the hardcoded `role: "pm"` in the `recordDecision` call.

The content constraint is the most demanding: every scenario must be grounded in Indian B2B enterprise reality (IBC, SAP, TCS, procurement portals), every debrief must name a real artifact in `tomorrowAction`, and each phase file must cover all 4 friction dimensions without overlap. The existing PM Quick Journey scenarios (IBC Commitment Crash, Founder's Custom Request, Done State Delusion) demonstrate the expected narrative depth and should be used as quality benchmarks.

**Primary recommendation:** Author all 9 scenario files first (data layer), then do the DesignationPortal wiring in a single targeted edit. Do not modify ScenarioRenderer, usePhaseNavigation, or DesignationStore.

---

## Standard Stack

### Core (already installed — no new dependencies)

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| zod | Already installed | Schema validation at import time | `validateScenario()` in schema.ts is the single validation entry point |
| zustand + immer | Already installed | DesignationStore persistence | Per-role decision log with localStorage |
| framer-motion | Already installed | AnimatePresence mode="wait" transitions | All transitions in the portal use this pattern |
| shadcn/ui (Card, Badge, Button) | Already installed | Scenario UI components | ScenarioRenderer imports these directly |

**No new packages required for Phase 3.**

### The Authoring Pattern (established in Phase 1)

Every new scenario file follows this exact template from `data/scenarios/pm/discovery.ts`:

```typescript
import { validateScenario } from "../schema";

const raw = {
  id: "[role]-[phase]-[dimension]-01",
  role: "[role]",        // must match DesignationSchema enum
  phase: "[phase]",      // must match SDLCPhaseSchema enum
  frictionDimension: "[dimension]",  // must match FrictionDimensionSchema enum
  title: "...",
  setup: "...",
  choices: [
    {
      id: "[role]-[phase-abbr]-c01-a",
      text: "...",
      frictionTag: "[dimension]",
      crossRoleImpact: [],
    },
    // minimum 2 choices
  ],
  debrief: {
    whatHappened: "...",
    why: "...",
    how: "...",
    whoBecame: "...",
    tomorrowAction: "...",  // MUST name a specific artifact
  },
};

export const [roleName][PhaseName]Scenarios = [
  validateScenario(raw, "data/scenarios/[role]/[phase].ts"),
  // ... 3 more
];
```

---

## Architecture Patterns

### Recommended File Structure for New Content

```
data/scenarios/
├── types.ts            # (do not modify)
├── schema.ts           # (do not modify)
├── cross-role-impact-map.ts   # (do not modify — Phase 4)
├── pm/
│   ├── discovery.ts    # expand stub to 4 scenarios
│   ├── requirements.ts # new — 4 scenarios
│   └── design.ts       # new — 4 scenarios
├── developer/          # create folder
│   ├── discovery.ts    # new — 4 scenarios
│   ├── requirements.ts # new — 4 scenarios
│   └── design.ts       # new — 4 scenarios
└── qa/                 # create folder
    ├── discovery.ts    # new — 4 scenarios
    ├── requirements.ts # new — 4 scenarios
    └── design.ts       # new — 4 scenarios
```

Note: The `data/scenarios/dev/` and `data/scenarios/qa/` sub-directories already exist (visible in the codebase ls output) but contain no files. Create `developer/` folder (matching the Designation enum value `"developer"`) or confirm `dev/` maps correctly. The enum uses `"developer"` — folder should be named `developer` to match convention.

### Pattern 1: 4-Scenario Phase File

Each phase file exports one array with 4 validated ScenarioConfig objects — one per friction dimension. The order within the array determines the display order in the journey.

```typescript
// Source: data/scenarios/pm/discovery.ts (template)
export const pmDiscoveryScenarios = [
  validateScenario(clientFrictionRaw, "data/scenarios/pm/discovery.ts"),
  validateScenario(bureaucracyRaw, "data/scenarios/pm/discovery.ts"),
  validateScenario(knowledgeGapRaw, "data/scenarios/pm/discovery.ts"),
  validateScenario(conflictAvoidanceRaw, "data/scenarios/pm/discovery.ts"),
];
```

### Pattern 2: DesignationPortal Multi-Role Loading

The `FullSDLCJourney` component in `DesignationPortal.tsx` needs a scenario loader that returns the correct array for a given role. There are two approaches — both valid at discretion:

**Option A — Inline conditional (simplest, no new file):**
```typescript
// Inside FullSDLCJourney, build a flat array of all phase scenarios for the role
import { pmDiscoveryScenarios } from "../../../../data/scenarios/pm/discovery";
import { pmRequirementsScenarios } from "../../../../data/scenarios/pm/requirements";
// ... etc.

const getScenariosForRole = (role: Designation): ScenarioConfig[] => {
  switch (role) {
    case "pm":
      return [...pmDiscoveryScenarios, ...pmRequirementsScenarios, ...pmDesignScenarios];
    case "developer":
      return [...developerDiscoveryScenarios, ...developerRequirementsScenarios, ...developerDesignScenarios];
    case "qa":
      return [...qaDiscoveryScenarios, ...qaRequirementsScenarios, ...qaDesignScenarios];
    default:
      return [];
  }
};
```

**Option B — Loader index file (cleaner for Phase 5 expansion):**
```typescript
// data/scenarios/loader.ts
export function loadScenariosForRole(role: Designation): ScenarioConfig[] { ... }
```

**Recommendation:** Option A for Phase 3 (fewer files, faster to validate). Option B can be extracted in Phase 5 when all 8 roles are authored.

### Pattern 3: Fixing the Hardcoded Role Bug

In `DesignationPortal.tsx` line 83, `recordDecision` currently hardcodes `role: "pm"`. This must be fixed:

```typescript
// BEFORE (bug):
recordDecision({
  choiceId: choice.id,
  frictionTag: choice.frictionTag,
  timestamp: Date.now(),
  phase: nav.current.phase,
  role: "pm",           // BUG: always "pm" regardless of selected role
});

// AFTER (fix):
recordDecision({
  choiceId: choice.id,
  frictionTag: choice.frictionTag,
  timestamp: Date.now(),
  phase: nav.current.phase,
  role: role as Designation,   // use prop passed from DesignationPortal
});
```

### Pattern 4: Progress Resume on Refresh

DesignationStore already persists to localStorage under `"hcl_designation_store"`. The `currentScenarioIndex` and `currentPhase` fields exist in `RoleState`. The resume pattern requires:
1. On `FullSDLCJourney` mount, call `initRole(role, "discovery")` — this is a no-op if the role already exists in the store
2. Read `roles[role].currentScenarioIndex` to initialize `usePhaseNavigation` at the correct offset
3. Read `roles[role].currentPhase` to skip to the correct phase group in the flat scenario array

The current `usePhaseNavigation` hook starts at index 0 (line 43: `useState(0)`). To resume mid-journey, the hook must be initialized with the persisted index. Pass an `initialIndex` option — or pre-slice the scenario array to start from the stored position.

**Simpler approach (no hook modification):** Pass a pre-sliced scenario array. Read `currentScenarioIndex` from the store and pass `scenarios.slice(storedIndex)` to `usePhaseNavigation`. This avoids modifying the hook and stays consistent with CONTEXT.md's "do not modify existing infrastructure" principle.

### Anti-Patterns to Avoid

- **Modifying ScenarioRenderer**: It is intentionally role-agnostic. Any role-specific logic belongs in scenario data objects, not the renderer.
- **Role-switching state resets**: When a user returns to role selection, do not call `resetRoleProgress`. Only call `resetRoleProgress` on explicit user action.
- **Hardcoded role strings in data files**: Use the exact string values from the Zod enum (`"pm"`, `"developer"`, `"qa"`) — not display names.
- **Missing `crossRoleImpact` field**: The Zod schema requires the field (as an array, may be empty `[]`). Omitting it throws at import time.
- **Vague `tomorrowAction`**: Phrases like "communicate better" will technically pass Zod (min 1 char) but violate the platform's behavioral change contract. Every `tomorrowAction` must name a real artifact: a document template, a meeting agenda field, a Slack message format, a checklist item, a rubric question.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scenario validation | Custom runtime type checks | `validateScenario()` from `data/scenarios/schema.ts` | Throws at import time with line-level Zod error — superior to runtime checks |
| State persistence | Custom localStorage serialization | DesignationStore `persist` middleware | Schema versioning + migration guard already built in Phase 1 |
| Phase transitions | Array index math (`.indexOf()`, manual counters) | `usePhaseNavigation` hook | Hook manages canAdvance gate, onComplete callback, isLast guard |
| Scenario display | Any new component | `ScenarioRenderer` as-is | Handles dark theme, friction badge, choice buttons, all 5 debrief fields, amber tomorrow-action highlight |
| Per-role isolation | Separate localStorage keys | DesignationStore `roles[role]` sub-object | Already isolated by role key in the Partial<Record<Designation, RoleState>> structure |

**Key insight:** Phase 3 adds zero new infrastructure. Every building block exists. The work is content + one targeted wiring change in `DesignationPortal.tsx`.

---

## Common Pitfalls

### Pitfall 1: Scenario ID Collisions
**What goes wrong:** Two scenarios with the same `id` field — Zod does not validate uniqueness, so both import silently and the second one shadows the first in the navigation array.
**Why it happens:** Authoring 36 scenarios rapidly with a template leads to copy-paste ID duplication.
**How to avoid:** Enforce a strict ID naming convention: `[role]-[phase]-[dimension]-01`. Since there is exactly one scenario per role/phase/dimension combination, IDs are structurally unique if the convention is followed.
**Warning signs:** User clicks through a scenario and sees the same title twice in the same phase.

### Pitfall 2: dev/ vs developer/ Folder Mismatch
**What goes wrong:** Files created in `data/scenarios/dev/` do not match the Designation enum value `"developer"`, causing import path confusion.
**Why it happens:** The existing directory at project root is `data/scenarios/dev/` (visible in ls output), but the Zod enum uses `"developer"`.
**How to avoid:** Create the scenario files at `data/scenarios/developer/` to match the enum. The existing `dev/` subdirectory under `roles/` is for the Quick Mode stage sub-components — it is a completely different path.
**Warning signs:** TypeScript import errors, or Zod validation errors with "Invalid enum value" for the `role` field.

### Pitfall 3: FullSDLCJourney Phase Boundary Confusion
**What goes wrong:** The flat scenario array (12 items per role) loses SDLC phase context — the journey displays all 12 scenarios without phase-group headers, and the store's `advancePhase` action never gets called.
**Why it happens:** `usePhaseNavigation` advances through a flat array — it does not know about SDLC phase boundaries at indices 4 and 8.
**How to avoid:** Maintain a phase-grouped structure. Either pass 4 scenarios at a time (one SDLC phase), advancing the outer SDLC level manually after 4 scenarios complete, OR load a flat array but call `advancePhase(role, nextSDLCPhase)` at indices 4 and 8 in the `handleAdvance` callback.
**Warning signs:** `roles[role].currentPhase` in the store never advances from "discovery".

### Pitfall 4: tomorrowAction Passing Zod but Failing the Platform Contract
**What goes wrong:** Debrief passes Zod validation (min 1 char) but `tomorrowAction` says something like "be more transparent in meetings" — useless to the user.
**Why it happens:** Time pressure on authoring 36 scenarios.
**How to avoid:** Every `tomorrowAction` must answer: "Which document/template/meeting slot/checklist question do I change this week?" Examples: "Add an 'Acceptance Criteria for Empty States' field to your sprint ticket template", "Put 'Confirm sign-off owner' as line 3 in your requirements handover checklist."
**Warning signs:** tomorrowAction uses words like "always", "try to", "consider", "be sure to" — these signal generic advice, not artifact anchoring.

### Pitfall 5: Quick Mode Breakage from Import Side Effects
**What goes wrong:** Importing new scenario files in `DesignationPortal.tsx` triggers Zod validation at import time — if any new scenario file has a malformed object, the entire portal fails to load, breaking Quick Mode too.
**Why it happens:** `validateScenario()` throws on import. One bad scenario blocks all portal modes.
**How to avoid:** Validate each scenario file individually in isolation before wiring it into the portal import. The authoring pattern calls `validateScenario()` at the bottom of each file — this catches errors at file level before portal-level integration.
**Warning signs:** Portal renders a blank screen (unhandled throw during module initialization).

---

## Code Examples

### 1. Complete 4-Scenario Phase File Template

```typescript
// Source: mirrors data/scenarios/pm/discovery.ts pattern
import { validateScenario } from "../schema";

const clientFriction = {
  id: "pm-requirements-client_friction-01",
  role: "pm",
  phase: "requirements",
  frictionDimension: "client_friction",
  title: "The Shifting Success Metric",
  setup:
    "A ₹5Cr IBC client's procurement head changed the acceptance criteria 3 days before requirements sign-off: 'We need real-time sync, not batch.' Your dev estimate jumps from 2 weeks to 6 weeks. The contract is fixed-scope.",
  choices: [
    {
      id: "pm-req-c01-a",
      text: "Accept the new requirement and absorb the timeline into the sprint buffer",
      frictionTag: "conflict_avoidance",
      crossRoleImpact: [
        {
          affectedRole: "developer",
          affectedPhase: "development",
          description:
            "Developer inherits a scope change without a re-estimate cycle — carries invisible risk into sprint planning",
          severity: "high",
        },
      ],
    },
    {
      id: "pm-req-c01-b",
      text: "Log it as a Change Request and initiate a formal scope review before updating estimates",
      frictionTag: "client_friction",
      crossRoleImpact: [],
    },
  ],
  debrief: {
    whatHappened:
      "Absorbing a real-time sync requirement without a Change Request converts a fixed-scope contract into an open-ended delivery commitment.",
    why: "Enterprise clients often treat requirements as negotiable until sign-off. Without a formal CR process, every verbal change becomes a delivery obligation.",
    how: "A Change Request form surfaces the scope delta, forces a timeline re-estimate, and creates a paper trail that protects both sides.",
    whoBecame:
      "A PM who absorbs scope changes silently becomes a bottleneck in Requirements — carrying hidden risk that surfaces as a missed deadline in sprint 4.",
    tomorrowAction:
      "Add a 'Change Request Trigger' to your requirements sign-off checklist: any new requirement after day 5 of the Requirements phase must generate a CR form before the spec document is updated.",
  },
};

// ... 3 more raw objects (internal_bureaucracy, knowledge_gap, conflict_avoidance)

export const pmRequirementsScenarios = [
  validateScenario(clientFriction, "data/scenarios/pm/requirements.ts"),
  validateScenario(bureaucracy, "data/scenarios/pm/requirements.ts"),
  validateScenario(knowledgeGap, "data/scenarios/pm/requirements.ts"),
  validateScenario(conflictAvoidance, "data/scenarios/pm/requirements.ts"),
];
```

### 2. DesignationPortal FullSDLCJourney — Multi-Role Wiring

```typescript
// Source: src/components/experiences/internal/DesignationPortal.tsx
// Replace the role !== "pm" guard block entirely

import { pmDiscoveryScenarios } from "../../../../data/scenarios/pm/discovery";
import { pmRequirementsScenarios } from "../../../../data/scenarios/pm/requirements";
import { pmDesignScenarios } from "../../../../data/scenarios/pm/design";
import { developerDiscoveryScenarios } from "../../../../data/scenarios/developer/discovery";
// ... etc.

type SDLCPhaseGroup = { phase: SDLCPhase; scenarios: ScenarioConfig[] };

const ROLE_PHASE_GROUPS: Record<string, SDLCPhaseGroup[]> = {
  pm: [
    { phase: "discovery", scenarios: pmDiscoveryScenarios },
    { phase: "requirements", scenarios: pmRequirementsScenarios },
    { phase: "design", scenarios: pmDesignScenarios },
  ],
  developer: [
    { phase: "discovery", scenarios: developerDiscoveryScenarios },
    // ...
  ],
  qa: [
    // ...
  ],
};

const FullSDLCJourney = ({ role, onComplete }: FullSDLCJourneyProps) => {
  const recordDecision = useDesignationStore((s) => s.recordDecision);
  const advancePhase = useDesignationStore((s) => s.advancePhase);
  const [sdlcPhaseIndex, setSDLCPhaseIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [isDebriefVisible, setIsDebriefVisible] = useState(false);

  const phaseGroups = ROLE_PHASE_GROUPS[role] ?? [];
  const currentPhaseGroup = phaseGroups[sdlcPhaseIndex];

  const nav = usePhaseNavigation({
    phases: currentPhaseGroup?.scenarios ?? [],
    onComplete: () => {
      if (sdlcPhaseIndex < phaseGroups.length - 1) {
        advancePhase(role as Designation, phaseGroups[sdlcPhaseIndex + 1].phase);
        setSDLCPhaseIndex((i) => i + 1);
        setSelectedChoiceId(null);
        setIsDebriefVisible(false);
      } else {
        onComplete();
      }
    },
  });

  const handleChoiceSelected = (choice: Choice) => {
    setSelectedChoiceId(choice.id);
    setIsDebriefVisible(true);
    recordDecision({
      choiceId: choice.id,
      frictionTag: choice.frictionTag,
      timestamp: Date.now(),
      phase: nav.current.phase,
      role: role as Designation,   // fixed — was hardcoded "pm"
    });
    nav.setHasDecision(true);
  };

  const handleAdvance = () => {
    setSelectedChoiceId(null);
    setIsDebriefVisible(false);
    nav.advance();
  };

  return (
    <ScenarioRenderer
      scenario={nav.current}
      onChoiceSelected={handleChoiceSelected}
      selectedChoiceId={selectedChoiceId}
      onAdvance={handleAdvance}
      isDebriefVisible={isDebriefVisible}
      mode="active"
    />
  );
};
```

### 3. Scenario ID Naming Convention

```
Format: [role]-[phase-abbr]-[dimension-abbr]-01
Examples:
  pm-disc-client_friction-01
  pm-req-internal_bureaucracy-01
  pm-des-knowledge_gap-01
  dev-disc-conflict_avoidance-01
  qa-req-client_friction-01
```

Note: `id` values are used as React keys in ScenarioRenderer's `choices.map()` — they must be unique across the entire application.

---

## Scenario Content Blueprint

This section documents the required 36 scenario slots with content guidance. The planner uses these to break work into authoring tasks.

### PM Role (12 scenarios)

| Phase | Friction Dimension | Title Suggestion | Artifact in tomorrowAction |
|-------|-------------------|------------------|---------------------------|
| Discovery | client_friction | "The Undocumented Assumption" (expand existing stub) | Discovery close-out summary doc |
| Discovery | internal_bureaucracy | "The Sign-Off Queue" | Stakeholder approval tracker |
| Discovery | knowledge_gap | "The Solo Expert" | Discovery kickoff attendee list template |
| Discovery | conflict_avoidance | "The Quiet Yes" | Discovery freeze checklist |
| Requirements | client_friction | "The Shifting Success Metric" | Change Request trigger checklist |
| Requirements | internal_bureaucracy | "The Approval Bottleneck" | Escalation path document |
| Requirements | knowledge_gap | "The Half-Handover" | Requirements handover template |
| Requirements | conflict_avoidance | "The Silent Scope Gap" | Requirements sign-off rubric |
| Design | client_friction | "The Brand Override" | Design sign-off criteria doc |
| Design | internal_bureaucracy | "The Review Loop" | Design review SLA doc |
| Design | knowledge_gap | "The Invisible Constraint" | Design constraint registry |
| Design | conflict_avoidance | "The Unchallenged Wireframe" | Design critique agenda template |

### Developer Role (12 scenarios)

| Phase | Friction Dimension | Title Suggestion | Artifact in tomorrowAction |
|-------|-------------------|------------------|---------------------------|
| Discovery | client_friction | "The Undefined API Contract" | API contract template |
| Discovery | internal_bureaucracy | "The Architecture Sign-Off" | Architecture decision record (ADR) |
| Discovery | knowledge_gap | "The Undocumented Legacy" | Legacy system dependency map |
| Discovery | conflict_avoidance | "The Optimistic Estimate" | Estimation checklist |
| Requirements | client_friction | "The Real-Time Trap" | Non-functional requirements checklist |
| Requirements | internal_bureaucracy | "The Sprint Entry Gate" | Definition-of-ready checklist |
| Requirements | knowledge_gap | "The Missing Context" | Requirements clarification questions template |
| Requirements | conflict_avoidance | "The Absorbed Ambiguity" | Acceptance criteria review checklist |
| Design | client_friction | "The Late Integration Request" | Design-to-dev handover template |
| Design | internal_bureaucracy | "The Design Freeze Delay" | Design review timeline doc |
| Design | knowledge_gap | "The Undocumented Design System" | Design token documentation |
| Design | conflict_avoidance | "The Unchallenged Spec" | Dev-QA pre-implementation checklist |

### QA Role (12 scenarios)

| Phase | Friction Dimension | Title Suggestion | Artifact in tomorrowAction |
|-------|-------------------|------------------|---------------------------|
| Discovery | client_friction | "The Vague Acceptance Criteria" | QA entry criteria template |
| Discovery | internal_bureaucracy | "The Test Plan Approval" | Test plan sign-off process |
| Discovery | knowledge_gap | "The Missing Use Cases" | Use case discovery questionnaire |
| Discovery | conflict_avoidance | "The Inherited Scope" | QA scope confirmation document |
| Requirements | client_friction | "The Moved Goalposts" | Requirements change impact checklist |
| Requirements | internal_bureaucracy | "The Test Environment Queue" | Test environment booking process |
| Requirements | knowledge_gap | "The Undocumented Business Rule" | Business rule register |
| Requirements | conflict_avoidance | "The Unchalleneged Requirement" | Requirements review question bank |
| Design | client_friction | "The Accessibility Afterthought" | Accessibility checklist |
| Design | internal_bureaucracy | "The Design-QA Handover Gap" | QA test case creation SLA |
| Design | knowledge_gap | "The Undocumented Edge State" | Edge state catalog template |
| Design | conflict_avoidance | "The Silent Usability Issue" | Usability defect classification rubric |

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Per-component useState for journey tracking | Zustand + Immer DesignationStore with localStorage | Phase 1 | Progress survives refresh; multi-role isolation built in |
| Array index navigation (`SCREEN_ORDER.indexOf()`) | usePhaseNavigation declarative hook | Phase 1 | No index math in components; canAdvance gated by hasDecision |
| Role-specific renderer components | Generic ScenarioRenderer driven by ScenarioConfig data | Phase 1 | New roles require zero new UI code |
| TypeScript interfaces without runtime validation | Zod schemas with z.infer derivation | Phase 1 | Malformed scenario throws at import, not at runtime |

**No deprecated patterns to migrate in Phase 3.** All Phase 1 and 2 foundations are in place.

---

## Open Questions

1. **`dev/` folder vs `developer/` folder**
   - What we know: `data/scenarios/dev/` exists as an empty directory; Designation enum uses `"developer"`
   - What's unclear: Whether files should be placed in `dev/` or a new `developer/` directory
   - Recommendation: Create `data/scenarios/developer/` to match the enum. The `dev/` directory is unused and can remain or be deleted.

2. **Phase progress indicator in FullSDLCJourney**
   - What we know: ScenarioRenderer has no phase header; it only shows the current scenario
   - What's unclear: Whether a "Phase 1 of 3: Discovery" indicator should be shown above ScenarioRenderer
   - Recommendation: Add a simple phase header in `FullSDLCJourney` above the `ScenarioRenderer` using existing dark-theme style (`text-xs font-mono text-gray-500 uppercase tracking-widest`). This is Claude's discretion.

3. **Resume on refresh — initialIndex propagation**
   - What we know: DesignationStore stores `currentScenarioIndex` and `currentPhase`; `usePhaseNavigation` starts at 0
   - What's unclear: The exact mechanism to seed `usePhaseNavigation` from the persisted index without modifying the hook
   - Recommendation: In `FullSDLCJourney`, read `roles[role]?.currentScenarioIndex` and `roles[role]?.currentPhase` from the store, derive the correct flat position in the scenario array, and initialize `sdlcPhaseIndex` and pass a pre-sliced `phases` array to `usePhaseNavigation`. No hook modification needed.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None detected — "Automated test suite: Manual QA adequate" (per REQUIREMENTS.md Out of Scope) |
| Config file | N/A |
| Quick run command | `npx tsx data/scenarios/[role]/[phase].ts` (import-time throw pattern) |
| Full suite command | `npx tsx data/scenarios/validate-all.ts` (create in Wave 0 if desired) |

### Phase Requirements to Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| ROLE-01 | All 3 roles have 3 phase files each | Import smoke test | `npx tsx data/scenarios/pm/requirements.ts` | ❌ Wave 0 |
| ROLE-02 | Each phase covers all 4 friction dimensions | Zod enum validation | Implicit — validateScenario() throws at import | ✅ Schema exists |
| ROLE-06, BEHV-01 | `tomorrowAction` is non-empty string | Zod min(1) validation | Implicit — validateScenario() throws at import | ✅ Schema exists |
| ROLE-07 | Quick Mode journeys still render | Manual smoke | Open app, select PM, choose Quick Scenarios | Manual only |
| ROLE-08 | No array index references in component code | Code review | `grep -r "indexOf\|SCREEN_ORDER" src/` | Manual only |
| STAT-04 | DecisionRecord persists per role | localStorage inspect | Manual — DevTools > Application > localStorage | Manual only |

### Sampling Rate
- **Per scenario file authored:** Run `npx tsx data/scenarios/[role]/[phase].ts` to confirm Zod passes
- **Per wave merge:** Manually load portal in browser, select each of the 3 roles, play 1 scenario through to debrief
- **Phase gate:** All 9 scenario files import without error + all 3 roles visually playable before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `data/scenarios/developer/` — directory does not exist, must be created before developer scenario files
- [ ] `data/scenarios/qa/` — directory does not exist (only `data/scenarios/dev/` exists, wrong name)
- [ ] Optional: `data/scenarios/validate-all.ts` — import all 9 scenario files to surface any Zod errors in one pass

---

## Sources

### Primary (HIGH confidence)
- `data/scenarios/schema.ts` — definitive Zod schema; all field requirements verified from source
- `data/scenarios/types.ts` — all TypeScript types verified from source
- `data/scenarios/pm/discovery.ts` — canonical template; all authoring patterns derived from this file
- `src/components/experiences/internal/designation-portal/ScenarioRenderer.tsx` — verified ScenarioRendererProps interface, FRICTION_CONFIG record, debrief rendering
- `src/state/designation-store.ts` — verified DesignationStore actions, RoleState shape, localStorage key
- `src/state/hooks/usePhaseNavigation.ts` — verified PhaseNavigationConfig, advance() behavior, canAdvance gate
- `src/components/experiences/internal/DesignationPortal.tsx` — verified hardcoded "pm" bug at line 83, "coming soon" guard at line 48

### Secondary (MEDIUM confidence)
- `src/components/experiences/internal/roles/PMJourney.tsx` — narrative quality benchmark for new content
- `src/components/experiences/internal/InternalExperience.tsx` — verified Quick Mode routing unchanged
- `src/components/experiences/internal/RoleBriefingView.tsx` — verified mode selector UI

### Tertiary (LOW confidence)
- None — all findings verified directly from codebase source files

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — no new dependencies; all tools verified from installed source files
- Architecture patterns: HIGH — all patterns verified from existing Phase 1 implementations
- Content blueprint: MEDIUM — scenario titles and artifact anchors are discretionary suggestions based on friction dimension definitions and existing narrative quality benchmarks
- Pitfalls: HIGH — all identified from direct code inspection of the existing implementation

**Research date:** 2026-03-23
**Valid until:** 2026-05-23 (stable — no fast-moving dependencies)
