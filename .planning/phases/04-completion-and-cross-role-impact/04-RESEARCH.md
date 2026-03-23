# Phase 4: Completion and Cross-Role Impact - Research

**Researched:** 2026-03-23
**Domain:** React completion UI, cross-role impact data derivation, behavioral profile rendering, multi-role compound insights, Framer Motion animation, canvas-confetti
**Confidence:** HIGH — all critical findings are grounded in the actual codebase and verified package registry data

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

- New `JourneyCompleteView` component — NOT modifying existing `RoleMasterclassComplete.tsx` (that serves Quick Mode)
- Top section: blind spot archetype display — archetypeName, narrative, whatYouDo, whyItMatters as a behavioral profile card
- Phase breakdown section: visual representation of friction pattern across Discovery/Requirements/Design — radar chart or dimension bars — NO numeric scores visible
- "Tomorrow's Action" section: `doThis` from archetype, styled with amber highlight pattern (`bg-amber-500/10 border-amber-500/30 text-amber-100`)
- Behavioral shifts section: if user shifted patterns between phases, surface this with a narrative sentence
- Bottom section: single concrete commitment (from archetype `doThis`), existing scripts/rubric pattern extended with role-specific content
- Dark background, Framer Motion `AnimatePresence`, shadcn/ui components — same as everything else
- `canvas-confetti` on completion (lightweight celebration, already a common pattern)
- `CrossRoleImpactView` component — shown as a section within or navigable from `JourneyCompleteView`
- Card-based layout: one card per affected role, showing consequence string from user's actual choices
- Consequence strings keyed to specific `choiceId`s — NOT generic fallback text
- Each card shows: affected role icon/name, affected SDLC phase, consequence description, severity indicator
- Only show impacts from choices the user actually made — silent on choices not taken
- frictionTag colors from `ScenarioRenderer`'s `FRICTION_CONFIG` used for consistency
- `crossRoleImpactMap` populated by extracting `ImpactEdge` entries from `crossRoleImpact[]` arrays in scenario choices via a `buildImpactMap()` utility — derivation approach, single source of truth
- Multi-role compound insights: second/third role completion shows a "Cross-Role Pattern" section comparing current archetype with previous role's archetype
- `DesignationPortal` mode state machine extended: add "complete" mode after "full-sdlc"
- `FullSDLCJourney` `onComplete` callback transitions to `JourneyCompleteView` (new portal mode)
- `completeRole()` called when journey finishes

### Claude's Discretion

- Exact layout proportions and spacing of the completion screen
- Whether phase breakdown uses a radar chart (canvas-based) or simple dimension bars (CSS-only)
- `canvas-confetti` implementation details (timing, particle count, duration)
- Exact compound insight narrative generation logic
- How to handle the edge case of a user with insufficient decisions (< 3) — likely show a "complete more scenarios" prompt

### Deferred Ideas (OUT OF SCOPE)

- Animated ripple visualization with connection lines between roles — v2 enhancement
- Radar chart with animated drawing — consider for Phase 5 polish
- Exportable behavioral profile (PDF/image) — future feature
- Team-level aggregate insights (requires backend) — v2
- Behavioral change tracking over time (multiple journey attempts) — v2
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| XROL-01 | Static cross-role impact map defining which decision in role A affects which phase in role B | `buildImpactMap()` pattern: walk all 9 scenario files (pm/developer/qa × discovery/requirements/design), collect `choiceId → crossRoleImpact[]` entries into `ImpactEdge[]`. Already stubbed in `cross-role-impact-map.ts`. |
| XROL-02 | Cross-role ripple visualization — after completing role journey, see how decisions impacted other designations | `CrossRoleImpactView` component: for each `DecisionRecord.choiceId` in store, look up matching `ImpactEdge[]` from map, render one card per edge showing affected role, phase, consequence, severity. |
| XROL-03 | Multi-role compound insights — user who completes multiple role journeys sees compounding cross-role patterns | `computeProfile()` called per-role using each role's `decisions` array from `DesignationStore.roles`. Compare archetypes across `completedRoles`. Show compound narrative only when `completedRoles.length >= 2`. |
| BEHV-02 | Cumulative decision profile shown at journey completion — not a score, but a behavioral pattern narrative | `computeProfile(decisions)` returns `ScoringProfile` with `archetypeName`, `narrative`, `whatYouDo`, `whyItMatters`, `phaseBreakdown`, `shifts`. Render all fields — no raw numbers exposed to user. |
| BEHV-03 | Actionable takeaways tied to specific workflow moments (scripts, rubric, commitments) — extends existing completion screen pattern | `RoleMasterclassComplete.tsx` pattern: paradigmShift, commitments (3), scripts (2 trigger/response), rubric (3 daily checks), cost. `JourneyCompleteView` adds archetype-driven behavioral profile card on top of this same structure. |
</phase_requirements>

---

## Summary

Phase 4 is an integration and presentation phase — it does not build new data infrastructure. The scoring engine (`computeProfile`), the decision store (`useDesignationStore`), the scenario content with embedded `crossRoleImpact[]` arrays, and the portal state machine are all in place from Phases 1–3. Phase 4's job is to wire these outputs into a completion screen and populate the cross-role impact map from existing scenario data.

The central task is building `JourneyCompleteView`: a new React component that calls `computeProfile()` with the completed role's decision log, renders the resulting `ScoringProfile` as a behavioral profile (archetype name, narrative, phase dimension bars), shows a `CrossRoleImpactView` section derived from the user's actual choice IDs, and when 2+ roles are complete, adds a compound insight comparing archetypes across roles. The portal mode state machine in `DesignationPortal.tsx` needs a "complete" mode added after "full-sdlc", and `completeRole()` in `DesignationStore` must be called at journey end.

The one non-trivial data task is `buildImpactMap()`: a pure TypeScript function that walks all 9 scenario files, extracts every `Choice.crossRoleImpact[]` entry paired with its `choice.id`, and returns an `ImpactEdge[]`. This must be done at module import time (static derivation) so `CrossRoleImpactView` can do an O(n) lookup by `choiceId`.

**Primary recommendation:** Build `JourneyCompleteView` + `CrossRoleImpactView` as a two-section scroll page, populate `buildImpactMap()` from existing scenario files, wire "complete" mode into `DesignationPortal`, and use CSS dimension bars (not radar chart) for the phase breakdown — simpler, faster to implement, no canvas dependency, and the radar chart is explicitly deferred to Phase 5.

---

## Standard Stack

### Core (already installed — no new installs required except canvas-confetti)

| Library | Version in Project | Purpose | Notes |
|---------|-------------------|---------|-------|
| React | 18.3.1 | Component rendering | Already installed |
| TypeScript | 5.8.3 | Type safety | Already installed |
| Framer Motion | 12.26.2 | AnimatePresence, motion.div, stagger animations | Already installed |
| Zustand + Immer | 5.0.12 + 11.1.4 | `useDesignationStore` for decision log + completedRoles | Already installed |
| shadcn/ui + Radix | Latest | Card, Badge, Button components | Already installed |
| Tailwind CSS | 3.4.17 | Utility classes, dark theme tokens | Already installed |
| Lucide React | 0.462.0 | Role icons, dimension icons | Already installed |
| Zod | 3.25.76 | Schema validation (used in computeProfile inputs) | Already installed |

### New Dependency

| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| canvas-confetti | 1.9.4 | Lightweight celebration on completion | Already used as pattern in project — 1.9.4 is latest (verified 2026-03-23, published 2025-10-25) |

**canvas-confetti is NOT currently in package.json.** It must be installed:

```bash
npm install canvas-confetti
npm install --save-dev @types/canvas-confetti
```

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS dimension bars | Recharts radar chart | Recharts IS in the project, but radar chart is deferred to Phase 5 per CONTEXT.md. CSS bars are simpler, faster, zero new dependency, and render predictably in dark theme. |
| `buildImpactMap()` at import time | Runtime map construction | Import-time is correct — the map is static data derived from static scenario files. No async needed. |
| Per-role `computeProfile()` call at render | Pre-computing all profiles on mount | Per-role on demand is simpler. Only the current role's profile is needed immediately; other roles' profiles are only needed for compound insight section. |

---

## Architecture Patterns

### Recommended File Structure (new files only)

```
src/components/experiences/internal/
├── JourneyCompleteView.tsx           # Main completion screen — Phase 4 primary deliverable
├── designation-portal/
│   └── CrossRoleImpactView.tsx       # Cross-role impact cards section
data/scenarios/
├── cross-role-impact-map.ts          # ImpactEdge[] populated by buildImpactMap()
└── build-impact-map.ts               # buildImpactMap() utility (or co-locate in cross-role-impact-map.ts)
```

**Note:** All other files modified (not created) in Phase 4: `DesignationPortal.tsx` (add "complete" mode).

### Pattern 1: Portal Mode Extension

`DesignationPortal.tsx` currently has:
```typescript
type PortalMode = "select" | "briefing" | "full-sdlc" | "quick";
```

Phase 4 adds "complete" mode:
```typescript
type PortalMode = "select" | "briefing" | "full-sdlc" | "quick" | "complete";
```

The `FullSDLCJourney` `onComplete` callback currently calls the parent's `onComplete` (which exits the portal). Instead, it should set mode to "complete" and pass the role:

```typescript
// In DesignationPortal — extend state
const [completedRole, setCompletedRole] = useState<Designation | null>(null);

// In FullSDLCJourney onComplete handler:
if (mode === "full-sdlc" && selectedRole) {
  return (
    <FullSDLCJourney
      role={selectedRole}
      onComplete={() => {
        completeRole(selectedRole as DesignationType);  // call store action
        setCompletedRole(selectedRole);
        setMode("complete");
      }}
    />
  );
}

// New "complete" branch:
if (mode === "complete" && completedRole) {
  return (
    <JourneyCompleteView
      role={completedRole}
      onReturnHome={() => setMode("select")}
    />
  );
}
```

**Critical:** `completeRole()` must be called BEFORE transitioning to "complete" mode so `completedRoles` is updated when `JourneyCompleteView` reads the store.

### Pattern 2: JourneyCompleteView Structure

```typescript
// Receives role, reads store internally
interface JourneyCompleteViewProps {
  role: Designation;
  onReturnHome: () => void;
}

export const JourneyCompleteView = ({ role, onReturnHome }: JourneyCompleteViewProps) => {
  const decisions = useDesignationStore((s) => s.roles[role]?.decisions ?? []);
  const completedRoles = useDesignationStore((s) => s.completedRoles);
  const profileResult = computeProfile(decisions);

  // Handle insufficient data edge case (< 3 decisions)
  if (profileResult.status === "insufficient_data") { ... }

  const { profile } = profileResult;
  const isMultiRole = completedRoles.length >= 2;
  const previousRole = completedRoles.find(r => r !== role); // first other completed role

  // ...render sections
}
```

### Pattern 3: buildImpactMap() Utility

The `crossRoleImpactMap` stub is empty. `buildImpactMap()` derives it from scenario choice data:

```typescript
// data/scenarios/build-impact-map.ts (or inline in cross-role-impact-map.ts)
import { pmDiscoveryScenarios } from "./pm/discovery";
// ... import all 9 scenario files

import type { ImpactEdge } from "./cross-role-impact-map";

export function buildImpactMap(): ImpactEdge[] {
  const allScenarios = [
    ...pmDiscoveryScenarios, ...pmRequirementsScenarios, ...pmDesignScenarios,
    ...developerDiscoveryScenarios, ...developerRequirementsScenarios, ...developerDesignScenarios,
    ...qaDiscoveryScenarios, ...qaRequirementsScenarios, ...qaDesignScenarios,
  ];

  const edges: ImpactEdge[] = [];

  for (const scenario of allScenarios) {
    for (const choice of scenario.choices) {
      for (const impact of choice.crossRoleImpact) {
        edges.push({
          sourceRole: scenario.role,
          sourcePhase: scenario.phase,
          sourceChoiceId: choice.id,
          targetRole: impact.affectedRole,
          targetPhase: impact.affectedPhase,
          consequence: impact.description,
          // severity is available in CrossRoleImpact but not in ImpactEdge — add it
        });
      }
    }
  }

  return edges;
}

export const crossRoleImpactMap: ImpactEdge[] = buildImpactMap();
```

**Important:** `ImpactEdge` in `cross-role-impact-map.ts` currently does NOT include a `severity` field, but `CrossRoleImpactSchema` does have `severity: z.enum(["low", "medium", "high"])`. The planner should add `severity` to `ImpactEdge` when populating the map, since the completion screen displays severity indicators.

### Pattern 4: CrossRoleImpactView — Choice-Keyed Lookup

```typescript
// CrossRoleImpactView receives the user's decision records
interface CrossRoleImpactViewProps {
  decisions: DecisionRecord[];
}

export const CrossRoleImpactView = ({ decisions }: CrossRoleImpactViewProps) => {
  // Build set of choiceIds the user actually made
  const choiceIds = new Set(decisions.map(d => d.choiceId));

  // Find all impact edges where sourceChoiceId matches a user choice
  const relevantEdges = crossRoleImpactMap.filter(e => choiceIds.has(e.sourceChoiceId));

  if (relevantEdges.length === 0) return null; // No cross-role impacts from this user's choices

  // Group by targetRole for card layout
  // ...render cards
}
```

### Pattern 5: Phase Breakdown — CSS Dimension Bars

Per Claude's Discretion (radar chart vs dimension bars), dimension bars are recommended. Pattern from the existing codebase:

```tsx
// Import FRICTION_CONFIG-equivalent colors for phase breakdown
// Use phaseBreakdown[].dimensions to drive bar widths
{profile.phaseBreakdown.map(phaseScore => (
  <div key={phaseScore.phase}>
    <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
      {phaseScore.phase}
    </span>
    {Object.entries(phaseScore.dimensions).map(([dim, pct]) => (
      <div key={dim} className="flex items-center gap-3">
        <span className="text-xs font-mono text-gray-400 w-32">{DIMENSION_LABELS[dim]}</span>
        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full ${DIMENSION_BAR_COLORS[dim]}`}
            style={{ width: `${pct * 100}%` }}
          />
        </div>
      </div>
    ))}
  </div>
))}
```

**Do NOT show the raw `pct` number.** Only the bar width communicates magnitude — no percentages visible to the user.

### Pattern 6: Compound Insight (Multi-Role)

```typescript
// Called when completedRoles.length >= 2
function buildCompoundInsight(
  currentRole: Designation,
  currentProfile: ScoringProfile,
  previousRole: Designation,
  previousDecisions: DecisionRecord[]
): string {
  const prevResult = computeProfile(previousDecisions);
  if (prevResult.status !== "complete") return "";

  const prevProfile = prevResult.profile;
  const samePattern = prevProfile.archetypeBaseKey === currentProfile.archetypeBaseKey;

  if (samePattern) {
    return `As a ${capitalize(previousRole)}, you were a ${prevProfile.archetypeName}. As a ${capitalize(currentRole)}, you remained a ${currentProfile.archetypeName}. This pattern holds across roles — your default response to friction is consistent regardless of your position in the delivery chain.`;
  }

  return `As a ${capitalize(previousRole)}, you were a ${prevProfile.archetypeName}. As a ${capitalize(currentRole)}, you became a ${currentProfile.archetypeName}. Your pattern shifted from ${humanizeDimension(prevProfile.dominantDimension)} to ${humanizeDimension(currentProfile.dominantDimension)} when you changed roles.`;
}
```

### Pattern 7: canvas-confetti Integration

```typescript
import confetti from "canvas-confetti";

// Trigger on mount (useEffect with empty deps)
useEffect(() => {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#f59e0b", "#d97706", "#fbbf24"], // amber palette matches design system
    disableForReducedMotion: true,
  });
}, []);
```

**Timing:** Fire once on mount. Do not fire repeatedly. `disableForReducedMotion: true` is mandatory for accessibility.

### Anti-Patterns to Avoid

- **Showing numeric scores:** `phaseBreakdown[].dimensions` values are 0–1 floats. NEVER render them as text. Only drive bar widths with them. The platform promise is "you won't be scored."
- **Calling completeRole() inside JourneyCompleteView:** Call it in the portal's onComplete handler BEFORE mounting JourneyCompleteView, not inside the view itself. The view should be a pure reader of store state.
- **Importing scenario files inside a React component:** `buildImpactMap()` should run at module import time in `cross-role-impact-map.ts`, not inside a component render cycle.
- **Modifying RoleMasterclassComplete.tsx:** This file serves Quick Mode. Do not touch it.
- **Modifying ScenarioRenderer.tsx:** FRICTION_CONFIG is importable but ScenarioRenderer must not be modified. Export FRICTION_CONFIG from its own file or re-declare the colors locally in JourneyCompleteView/CrossRoleImpactView using the same values.
- **Not handling insufficient_data:** `computeProfile()` returns `{ status: "insufficient_data" }` when decisions < 3. The completion screen must handle this branch — show a graceful message not an error.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Behavioral profile computation | Custom scoring logic | `computeProfile()` from `data/scoring-engine.ts` | Already built, validated, test-passed in Phase 2 |
| Archetype text content | Custom archetype lookup | `ARCHETYPE_LOOKUP`, `DIMENSION_FALLBACK`, `BALANCED_ARCHETYPE` from `data/scoring-archetypes.ts` | 12 phase-specific archetypes + 4 fallbacks already authored |
| Decision log access | Custom state | `useDesignationStore((s) => s.roles[role]?.decisions)` | Append-only log with localStorage persistence already in place |
| Completed roles list | Custom tracking | `useDesignationStore((s) => s.completedRoles)` | Already maintained by `completeRole()` action |
| Phase dimension colors | Custom color map | Reuse `FRICTION_CONFIG` color values from `ScenarioRenderer.tsx` | Established visual language; reuse avoids visual inconsistency |
| Celebration animation | Custom CSS particle system | `canvas-confetti@1.9.4` | Battle-tested, tiny bundle (~7KB), handles Safari canvas quirks |
| Cross-role data | Manual ImpactEdge authoring | `buildImpactMap()` derived from `scenario.choices[].crossRoleImpact[]` | Data already embedded in Phase 3 scenario files — derivation prevents duplication |

**Key insight:** The hardest parts of this phase are already done. `computeProfile` produces a complete behavioral narrative ready to render. `crossRoleImpact[]` arrays in scenario choices are the raw material for the impact visualization. Phase 4 is assembly and presentation, not infrastructure.

---

## Common Pitfalls

### Pitfall 1: ImpactEdge Missing `severity` Field

**What goes wrong:** `CrossRoleImpactSchema` (in `schema.ts`) includes `severity: z.enum(["low", "medium", "high"])` on each `CrossRoleImpact` entry. But the current `ImpactEdge` interface in `cross-role-impact-map.ts` does NOT include a `severity` field. If `buildImpactMap()` copies `consequence` but drops `severity`, the impact cards cannot show severity indicators.

**How to avoid:** Add `severity: "low" | "medium" | "high"` to `ImpactEdge` before populating the map. This is a schema addition, not a breaking change.

**Warning signs:** TypeScript will not catch this — severity is optional in `CrossRoleImpactSchema` and `ImpactEdge` just doesn't have the field. The omission will only become visible when trying to render severity indicators.

### Pitfall 2: FRICTION_CONFIG Is Not Exported from ScenarioRenderer

**What goes wrong:** `FRICTION_CONFIG` is declared as a module-level const inside `ScenarioRenderer.tsx` but is NOT exported. The rule "DO NOT MODIFY ScenarioRenderer.tsx" means you cannot add an export. `CrossRoleImpactView` needs the same color mapping.

**How to avoid:** Two acceptable approaches:
1. Declare a local `DIMENSION_COLORS` constant in `JourneyCompleteView`/`CrossRoleImpactView` using the same Tailwind class values (copy, don't import). This is slightly redundant but respects the constraint.
2. Extract `FRICTION_CONFIG` into a shared file (`designation-portal/friction-config.ts`) and update `ScenarioRenderer` to import from there. This is cleaner but requires a small ScenarioRenderer change (only the import statement, not the logic).

**Recommended approach:** Create `src/components/experiences/internal/designation-portal/friction-config.ts`, move `FRICTION_CONFIG` there, update `ScenarioRenderer.tsx` to import from it. This is a safe, minimal change.

### Pitfall 3: Calling computeProfile Inside JSX Render

**What goes wrong:** `computeProfile(decisions)` is pure and fast, but calling it in the JSX render body (not memoized) will re-run on every render, including on state changes that don't affect decisions.

**How to avoid:** Use `useMemo`:
```typescript
const profileResult = useMemo(() => computeProfile(decisions), [decisions]);
```

### Pitfall 4: completedRoles Includes Current Role Before completeRole() Is Called

**What goes wrong:** The compound insight logic checks `completedRoles.length >= 2` and looks for a "previous" role. If `completeRole()` is not called before `JourneyCompleteView` mounts, `completedRoles` won't include the current role yet, and length check will be off by one.

**How to avoid:** Call `completeRole(role)` in `DesignationPortal`'s `onComplete` handler BEFORE `setMode("complete")`. The Immer store update is synchronous, so the next render of `JourneyCompleteView` will see the updated `completedRoles`.

### Pitfall 5: AnimatePresence Not Wrapping the Mode Switch

**What goes wrong:** Without `AnimatePresence` wrapping the mode switch in `DesignationPortal`, the transition from "full-sdlc" to "complete" will be an instant cut, breaking the established animation pattern.

**How to avoid:** The existing portal uses conditional rendering without `AnimatePresence`. For the "complete" mode specifically, wrap the `JourneyCompleteView` mount in an `AnimatePresence mode="wait"` block so the exit animation of `FullSDLCJourney` completes before the entrance of `JourneyCompleteView`.

### Pitfall 6: Phase Breakdown With Only One Phase Populated

**What goes wrong:** `computeRunningScore()` returns only phases that have decisions. If a user somehow completed only Discovery scenarios (all 4) but not Requirements or Design, `phaseBreakdown` will have only one entry. The phase breakdown UI must not assume exactly 3 phases.

**How to avoid:** Render only phases present in `phaseBreakdown`. Do not hardcode "Discovery / Requirements / Design" as three fixed slots. Map over `profile.phaseBreakdown` dynamically.

---

## Code Examples

Verified patterns from existing codebase:

### Amber Highlight Pattern (Tomorrow's Action)
```tsx
// Source: CONTEXT.md — established pattern
<div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6">
  <span className="text-xs font-mono text-amber-400/70 uppercase tracking-widest mb-2 block">
    Tomorrow's Action
  </span>
  <p className="text-amber-100 leading-relaxed">{profile.doThis}</p>
</div>
```

### AnimatePresence Stagger (from RoleMasterclassComplete.tsx pattern)
```tsx
// Source: RoleMasterclassComplete.tsx lines 262–296
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
>
  {/* section content */}
</motion.div>
```

### Dark Card Pattern
```tsx
// Source: RoleMasterclassComplete.tsx lines 313–336
<div className="bg-white/[0.02] border border-white/[0.05] rounded-[2.5rem] p-10 flex flex-col">
  {/* card content */}
</div>
```

### Font Mono Label Pattern
```tsx
// Source: ScenarioRenderer.tsx, RoleMasterclassComplete.tsx — consistent throughout
<span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
  LABEL TEXT
</span>
```

### useDesignationStore Selector Pattern
```typescript
// Source: DesignationPortal.tsx lines 77–78
const recordDecision = useDesignationStore((s) => s.recordDecision);
const decisions = useDesignationStore((s) => s.roles[role]?.decisions ?? []);
const completedRoles = useDesignationStore((s) => s.completedRoles);
```

### Severity Color Mapping (for CrossRoleImpactView)
```typescript
// Derive from existing design tokens — no canonical source yet, define consistently
const SEVERITY_CONFIG = {
  high:   { label: "High Impact",   className: "border-red-500/40 bg-red-500/10 text-red-300" },
  medium: { label: "Medium Impact", className: "border-amber-500/40 bg-amber-500/10 text-amber-300" },
  low:    { label: "Low Impact",    className: "border-blue-500/40 bg-blue-500/10 text-blue-300" },
} as const;
```

### canvas-confetti Usage
```typescript
// Source: npm canvas-confetti@1.9.4 API
import confetti from "canvas-confetti";

useEffect(() => {
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.6 },
    colors: ["#f59e0b", "#d97706", "#fbbf24"],
    disableForReducedMotion: true,
  });
}, []);
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Numeric score shown at completion | Behavioral archetype narrative only | Phase 2 decision | No score ever shown — platform avoids test-taking behavior |
| Generic "You're done" screen | Role-specific archetype + phase breakdown + cross-role impact | Phase 4 (building now) | Completion becomes the highest-value learning moment |
| crossRoleImpactMap manually authored | Derived from embedded `crossRoleImpact[]` in scenario choices | Phase 4 (building now) | Single source of truth — no sync burden |

---

## Open Questions

1. **FRICTION_CONFIG extraction**
   - What we know: `FRICTION_CONFIG` is not exported from `ScenarioRenderer.tsx`; the rule is "DO NOT MODIFY ScenarioRenderer"
   - What's unclear: Does "DO NOT MODIFY" mean the logic/JSX, or does it extend to adding a single export keyword?
   - Recommendation: Extract to `friction-config.ts` shared file, update ScenarioRenderer to import from it. This is a one-line change to ScenarioRenderer (change from local declaration to import) and is strictly additive. The planner should treat this as acceptable.

2. **Role icon mapping for CrossRoleImpactView**
   - What we know: `lucide-react@0.462.0` is installed; the project has `DesignationSelect` which shows role icons
   - What's unclear: Which Lucide icon maps to each of the 8 designations?
   - Recommendation: Reuse whatever icon map `DesignationSelect.tsx` uses, or define a `ROLE_ICON_MAP` in `JourneyCompleteView`. Check `DesignationSelect.tsx` at plan time.

3. **How many crossRoleImpact entries exist in current scenario files?**
   - What we know: PM discovery alone has multiple entries per scenario; 9 scenario files total
   - What's unclear: Total count across all 9 files — some choices may have empty `crossRoleImpact: []`
   - Recommendation: `buildImpactMap()` handles empty arrays correctly (inner loop just doesn't push). The planner does not need to know the total count.

---

## Validation Architecture

`nyquist_validation: true` in `.planning/config.json`. Validation section applies.

### Test Framework

| Property | Value |
|----------|-------|
| Framework | None configured (no `jest.config.*`, `vitest.config.*`, or test directory found) |
| Config file | None — Wave 0 gap |
| Quick run command | `npx vitest run --reporter=verbose` (after Wave 0 setup) |
| Full suite command | `npx vitest run` |

Per `REQUIREMENTS.md`, "Automated test suite" is listed in **Out of Scope**: "Manual QA adequate for experiential content validation." This overrides the nyquist default. Phase 4 behavioral verification is therefore manual.

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Notes |
|--------|----------|-----------|-------|
| XROL-01 | `buildImpactMap()` returns ImpactEdge[] with sourceChoiceId matching scenario choice IDs | manual-only | Automated test suite is out of scope per REQUIREMENTS.md. Verify by logging map length and spot-checking a known choiceId. |
| XROL-02 | CrossRoleImpactView renders cards only for choices the user actually made | manual-only | Navigate full journey, complete it, verify impact cards match your actual choices |
| XROL-03 | Second role completion shows compound insight referencing first role's archetype | manual-only | Complete two different role journeys, verify compound section appears on second completion |
| BEHV-02 | Completion screen shows archetype name and narrative, not a score | manual-only | Visual verification — confirm no numeric values rendered |
| BEHV-03 | Completion screen includes scripts and rubric sections matching RoleMasterclassComplete pattern | manual-only | Visual comparison against Quick Mode completion screen |

### Wave 0 Gaps

None related to test infrastructure — automated tests are explicitly out of scope for this project. No Wave 0 test setup required.

---

## Sources

### Primary (HIGH confidence)

- `data/scoring-engine.ts` — `computeProfile()` signature, `ProfileResult` discriminated union, `ScoringProfile` type, `MIN_DECISIONS_FOR_PROFILE = 3`
- `data/scoring-archetypes.ts` — `ArchetypeDefinition` interface, `ARCHETYPE_LOOKUP` (12 entries), `DIMENSION_FALLBACK` (4 entries), `BALANCED_ARCHETYPE`, `DIMENSION_TIEBREAK_ORDER`
- `data/scenarios/cross-role-impact-map.ts` — `ImpactEdge` interface (missing `severity`), empty stub
- `data/scenarios/schema.ts` — `CrossRoleImpactSchema` with `severity` field, `ChoiceSchema`, full Zod shape
- `data/scenarios/types.ts` — `DecisionRecord` interface, `Designation`, `SDLCPhase`, `FrictionDimension`
- `src/state/designation-store.ts` — `completeRole()`, `completedRoles`, `roles[role].decisions`, `useDesignationStore`
- `src/components/experiences/internal/DesignationPortal.tsx` — `PortalMode` type, `FullSDLCJourney` onComplete wiring, `ROLE_PHASE_GROUPS`
- `src/components/experiences/internal/RoleMasterclassComplete.tsx` — completion screen pattern (paradigmShift, commitments, scripts, rubric, cost), dark theme tokens
- `src/components/experiences/internal/designation-portal/ScenarioRenderer.tsx` — `FRICTION_CONFIG` (4 dimensions, Tailwind class names)
- `CLAUDE.md` — tech stack versions, design system tokens, no-backend constraint
- `package.json` — confirmed canvas-confetti NOT installed, Framer Motion 12.26.2, Recharts 2.15.4, Zustand 5.0.12

### Secondary (MEDIUM confidence)

- npm registry: `canvas-confetti@1.9.4` — current version verified 2026-03-23, published 2025-10-25

### Tertiary (LOW confidence — not applicable)

None — all findings grounded in project source files or verified package registry.

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all packages read from package.json directly; canvas-confetti version verified from npm registry
- Architecture patterns: HIGH — derived from reading actual source files (scoring-engine.ts, DesignationPortal.tsx, designation-store.ts)
- Pitfalls: HIGH — derived from reading actual type definitions (ImpactEdge missing severity is a real gap found in cross-role-impact-map.ts vs schema.ts comparison)

**Research date:** 2026-03-23
**Valid until:** 2026-04-23 (stable codebase, no fast-moving external dependencies introduced)
