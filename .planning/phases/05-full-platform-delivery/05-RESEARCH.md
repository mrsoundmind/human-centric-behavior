# Phase 5: Full Platform Delivery - Research

**Researched:** 2026-03-24
**Domain:** Content authoring (5 role SDLC journeys) + Client flow audit + Layer navigation bridges + Cross-role impact map completion
**Confidence:** HIGH (all findings verified by direct code inspection)

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Same structure as PM/Developer/QA: 3 SDLC phases (Discovery, Requirements, Design) × 4 friction dimensions = 12 scenarios per role
- Same ScenarioConfig schema with Zod validation at import time
- Same file organization: `data/scenarios/[role]/discovery.ts`, `requirements.ts`, `design.ts`
- Same ROLE_PHASE_GROUPS wiring in DesignationPortal — add entries for sales, designer, ba, crm, strategy
- All 5 debrief fields required: whatHappened, why, how, whoBecame, tomorrowAction
- tomorrowAction must name a specific workflow artifact — not generic advice
- Indian B2B context (IBC, SAP, TCS, enterprise procurement) — locked from PROJECT.md
- crossRoleImpact[] arrays on every choice — buildImpactMap() automatically picks them up
- ROLE_COMPLETION_CONTENT in JourneyCompleteView extended for all 5 new roles
- Existing Quick Mode role journeys (SalesJourney, DesignerJourney, etc.) remain untouched
- **Sales**: Focus on deal impact, client trust, pricing friction, handoff quality, pre-sales UX
- **Designer**: Design system gaps, stakeholder feedback friction, handoff to dev, evidence vs preference
- **BA**: Requirement clarity, stakeholder alignment, discovery design, UAT facilitation
- **CRM**: Customer retention, escalation handling, relationship capital, renewal friction
- **Strategy**: Business outcomes, market positioning, signal vs noise, investment sequencing

### Client Experience Audit
- ClientFinalConnect.tsx currently has only a "Restart" button — dead end
- Add a contextual bridge CTA: "See how your team navigates these frictions" linking to `/internalteam`
- Audit all 18 client screens for navigation continuity — every screen must have a clear next action
- Funnel friction experiences (Bait, Chaos, Wall, Maze, Trap) each have corresponding "good" counterparts in the fix section — verify all 5 pairs are complete and visually paired
- Revenue impact messaging audit — ensure numbers/claims are grounded and compelling

### Layer Navigation Bridges
- **Layer 1 → Layer 1.5**: Already works via BridgeToWork.tsx (3 stages) — verify it's not broken
- **Layer 1.5 → Layer 2**: Already works via Layer15Controller onComplete — verify
- **Layer 2 → Designation Portal**: Layer2Complete.tsx has "Continue to Team Training" button wired to goToNext() → internal-training. Update messaging to be contextual: "You just walked through the full SDLC. Now see it from your role's perspective."
- **Designation Portal → Home**: JourneyCompleteView "Return Home" goes to role select — add option to explore other roles or return to main experience
- **Client → Internal**: ClientFinalConnect needs bridge to `/internalteam` (see above)

### Cross-Role Impact Map Completion
- buildImpactMap() in cross-role-impact-map.ts currently imports 9 scenario files (3 roles × 3 phases)
- Add imports for all 15 new scenario files (5 roles × 3 phases) to the same file
- No architectural change needed — just extend the import list and the allScenarios spread
- Each new scenario's crossRoleImpact[] entries should reference the OTHER 7 roles realistically

### Multi-Role Compound Insights (3+ roles)
- buildCompoundInsight in JourneyCompleteView currently compares current role vs first completed role
- For 3+ roles, extend to show a "journey arc" narrative: how the user's pattern evolved across all completed roles
- Keep it simple — list the archetype progression, not a complex visualization

### Claude's Discretion
- Exact scenario narratives, choice text, and debrief content for 5 new roles (must follow constraints above)
- How to structure the Layer 2 → Designation Portal bridge messaging
- Whether to add a "progress indicator" showing how many roles completed vs total
- Client experience audit — specific wording fixes for dead-end screens
- Order of plan execution for the 5 new roles (can be parallelized)

### Deferred Ideas (OUT OF SCOPE)
- Industry-specific scenario packs (fintech, edtech, healthcare) — v2
- Custom scenario authoring tool — v2
- Team-level aggregate analytics (requires backend) — v2
- Animated ripple visualization for cross-role impact — v2 polish
- Radar chart for phase breakdown — v2 polish
- Exportable behavioral profile (PDF/image) — v2
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| AUDT-01 | Audit client-facing primer flow for completeness and impact — identify gaps, fix dead ends | ClientFinalConnect.tsx confirmed as dead-end: only "Restart" button. ClientExperience.tsx has 18 steps fully mapped. All 5 bad/good funnel pairs confirmed present in codebase. |
| AUDT-02 | Audit funnel friction experiences and their "good" counterparts for consistency | All 5 pairs confirmed in ClientExperience.tsx imports: FunnelBait/BaitGood, FunnelChaos/ChaosGood, FunnelWall/WallGood, FunnelMaze/MazeGood, FunnelTrap/TrapGood. Content quality audit is the remaining work. |
| AUDT-03 | Connect Layer 2 SDLC to designation portal — SDLC is the backbone, not a separate experience | Layer2Complete.tsx has "Continue to Team Training" button but generic messaging. goToNext() → EXPERIENCE_ORDER["internal-training"] confirmed in ExperienceController.tsx. Message update needed only. |
| AUDT-04 | Fix navigation flow between all layers — no dead ends, clear progression | Dead ends confirmed: (1) ClientFinalConnect.tsx — no link to /internalteam. (2) JourneyCompleteView onReturnHome goes to role select — no pathway back to main experience. BridgeToWork and Layer15 → Layer2 transitions confirmed working. |
| AUDT-05 | Completion of one layer naturally bridges to the next with contextual prompts | Layer2Complete "Continue to Team Training" exists but message is generic. ClientFinalConnect has no bridge at all. Both need contextual copy, not new plumbing. |
</phase_requirements>

---

## Summary

Phase 5 is the final delivery phase covering two parallel workstreams: (1) content authoring for 5 remaining role SDLC journeys (Sales, Designer, BA, CRM, Strategy), and (2) platform audit fixing dead ends and cross-layer navigation gaps.

The content authoring pattern is fully established from Phase 3 (PM, Developer, QA). The ScenarioConfig schema, Zod validation, file structure, and scenario ID conventions are all locked and proven. The 5 new roles need only new scenario data files and wiring in DesignationPortal's ROLE_PHASE_GROUPS — no new infrastructure. The cross-role impact map extends by adding 15 import lines to one file. The JourneyCompleteView extends by adding 5 entries to ROLE_COMPLETION_CONTENT.

The audit workstream is primarily copy and messaging work, not architectural work. Three specific dead ends are confirmed: ClientFinalConnect.tsx (no bridge to /internalteam), Layer2Complete.tsx (generic "Continue to Team Training" messaging), and JourneyCompleteView (no pathway back to main experience after completing a role). The Layer 1 → 1.5 → 2 chain is confirmed functional. All 5 bad/good funnel pairs are confirmed present in the codebase.

**Primary recommendation:** Execute role content authoring plans in parallel (each role is fully independent). Execute the audit plans as a single focused pass — they touch 3–4 files and require copy precision more than engineering complexity.

---

## Standard Stack

### Core (confirmed by direct codebase inspection)
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| TypeScript + Zod | 5.8.3 / 3.25.76 | Schema-validated scenario authoring | Enforced at import time via validateScenario() — malformed content fails loudly |
| React + Framer Motion | 18.3.1 / 12.26.2 | Component rendering + transitions | Established across all experience components |
| Zustand + Immer | 5.0.12 / 11.1.4 | Role journey state (decisions, completions) | DesignationStore — already handles all 8 roles |
| React Router DOM | 6.30.1 | /internalteam bridge in ClientFinalConnect | Route already exists in App.tsx |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| canvas-confetti | (existing) | Completion celebration | JourneyCompleteView already uses — no change needed |
| Lucide React | 0.462.0 | Icons in ROLE_COMPLETION_CONTENT cards | Target, MessageSquare, ListChecks, AlertTriangle already imported |

---

## Architecture Patterns

### Scenario File Structure (Phase 3 established, Phase 5 replicates exactly)

```
data/scenarios/
├── pm/
│   ├── discovery.ts        # pmDiscoveryScenarios: ScenarioConfig[]
│   ├── requirements.ts     # pmRequirementsScenarios: ScenarioConfig[]
│   └── design.ts           # pmDesignScenarios: ScenarioConfig[]
├── developer/ (same structure)
├── qa/ (same structure)
├── sales/                  # NEW — 3 files, same structure
├── designer/               # NEW — 3 files, same structure
├── ba/                     # NEW — 3 files, same structure
├── crm/                    # NEW — 3 files, same structure
├── strategy/               # NEW — 3 files, same structure
├── schema.ts               # Source of truth — DO NOT MODIFY
├── types.ts                # Derived types — DO NOT MODIFY
└── cross-role-impact-map.ts # Extend imports only
```

### Pattern 1: Scenario File Template
**What:** Each scenario file exports an array of 4 validated ScenarioConfig objects, one per friction dimension.
**When to use:** For every new role × phase combination.

```typescript
// Source: data/scenarios/pm/discovery.ts (reference file)
import { validateScenario } from "../schema";

const rawClientFriction = {
  id: "[role]-[phase]-client_friction-01",   // e.g., "sales-discovery-client_friction-01"
  role: "[role]",                             // "sales" | "designer" | "ba" | "crm" | "strategy"
  phase: "[phase]",                           // "discovery" | "requirements" | "design"
  frictionDimension: "client_friction",
  title: "Descriptive title (The X pattern)",
  setup: "₹ amount + named client (IBC/SAP/TCS) + specific situation + time pressure",
  choices: [
    {
      id: "[role]-[phase-short]-cf01-a",
      text: "The friction-causing choice (first choice is always the worse one)",
      frictionTag: "client_friction",         // Must match frictionDimension
      crossRoleImpact: [
        {
          affectedRole: "[other-role]",        // One of 7 other roles
          affectedPhase: "[phase]",
          description: "[Role] inherits [specific consequence] — [downstream effect]",
          severity: "high" | "medium" | "low",
        },
      ],
    },
    {
      id: "[role]-[phase-short]-cf01-b",
      text: "The better choice",
      frictionTag: "client_friction",
      crossRoleImpact: [],                    // Better choice has no negative downstream
    },
  ],
  debrief: {
    whatHappened: "What the friction choice causes (1-2 sentences)",
    why: "Root cause — why this friction pattern exists in enterprise delivery",
    how: "The correct approach and its mechanics",
    whoBecame: "Identity label for the person who makes the friction choice",
    tomorrowAction: "Specific artifact name + concrete action (NOT generic advice)",
  },
};

export const [role][Phase]Scenarios = [
  validateScenario(rawClientFriction, "data/scenarios/[role]/[phase].ts"),
  validateScenario(rawInternalBureaucracy, "data/scenarios/[role]/[phase].ts"),
  validateScenario(rawKnowledgeGap, "data/scenarios/[role]/[phase].ts"),
  validateScenario(rawConflictAvoidance, "data/scenarios/[role]/[phase].ts"),
];
```

### Pattern 2: ROLE_PHASE_GROUPS Extension (DesignationPortal.tsx)
**What:** Add 5 new entries to the ROLE_PHASE_GROUPS record after importing the new scenario arrays.
**What NOT to change:** FullSDLCJourney component, DesignationPortal orchestration, mode routing — all are role-agnostic and work automatically once entries are added.

```typescript
// ADD imports at top of DesignationPortal.tsx
import { salesDiscoveryScenarios } from "../../../../data/scenarios/sales/discovery";
import { salesRequirementsScenarios } from "../../../../data/scenarios/sales/requirements";
import { salesDesignScenarios } from "../../../../data/scenarios/sales/design";
// ... repeat for designer, ba, crm, strategy

// ADD to ROLE_PHASE_GROUPS record
sales: [
  { phase: "discovery", scenarios: salesDiscoveryScenarios },
  { phase: "requirements", scenarios: salesRequirementsScenarios },
  { phase: "design", scenarios: salesDesignScenarios },
],
// ... repeat for designer, ba, crm, strategy
```

### Pattern 3: ROLE_COMPLETION_CONTENT Extension (JourneyCompleteView.tsx)
**What:** Add 5 new entries to the ROLE_COMPLETION_CONTENT Partial<Record<Designation, RoleCompletionContent>> object.
**Schema:** `{ paradigmShift: string, commitments: [{label, action}]×3, scripts: [{trigger, line}]×2, rubric: string[]×3, cost: string }`
**Content quality bar:** Same level of specificity as the pm/developer/qa entries already in the file.

### Pattern 4: cross-role-impact-map.ts Extension
**What:** Add 15 import lines + 15 spread entries to the buildImpactMap() call at bottom of file.
**What NOT to change:** ImpactEdge interface, buildImpactMap() function body — both are already correct.

```typescript
// ADD at top of cross-role-impact-map.ts
import { salesDiscoveryScenarios } from "./sales/discovery";
// ... 14 more imports

// EXTEND the buildImpactMap([]) call
export const crossRoleImpactMap: ImpactEdge[] = buildImpactMap([
  // existing 9 entries...
  ...salesDiscoveryScenarios,
  ...salesRequirementsScenarios,
  ...salesDesignScenarios,
  // ... 12 more spreads
]);
```

### Pattern 5: Layer Navigation Bridge (Layer2Complete.tsx)
**What:** Update the "Continue to Team Training" button text only. The button already calls `onNext` which wires to `goToNext()` in ExperienceController which advances EXPERIENCE_ORDER to "internal-training". No plumbing change needed.

**Current state:**
```tsx
// Layer2Complete.tsx line 188
<button onClick={onNext}>Continue to Team Training →</button>
```

**Change:** Replace button label (and optionally add a sub-text) with contextual messaging:
```
"See it from your role" or "You just walked the full SDLC. Now see it from your role's perspective."
```

### Pattern 6: ClientFinalConnect.tsx Bridge
**What:** Add a second CTA button below the existing "Let's Connect" button that navigates to /internalteam.
**How:** Use React Router's `<Link>` component (already used elsewhere in the app) — do NOT use `window.location.href`.

```typescript
// Import at top of ClientFinalConnect.tsx
import { Link } from "react-router-dom";

// Add second CTA in the button group
<Link
  to="/internalteam"
  className="group relative inline-flex items-center gap-3 px-12 py-5 bg-transparent border border-white/20 text-white rounded-full font-bold text-xl hover:border-white/60 transition-all"
>
  <span>See how your team navigates these frictions</span>
  <span className="group-hover:translate-x-1 transition-transform">→</span>
</Link>
```

### Pattern 7: JourneyCompleteView Multi-Role Arc (3+ roles)
**What:** Extend buildCompoundInsight to handle 3+ completed roles by showing a progression narrative.
**Current limitation:** Only compares current role vs first completed role.
**Change approach:** When `completedRoles.length >= 3`, loop over all prior completed roles and generate a short ordered list of archetype names per role. Format as "Your journey arc: [RoleA] (ArchetypeA) → [RoleB] (ArchetypeB) → [RoleC] (ArchetypeC). [Pattern observation]."

### Recommended Scenario ID Convention
```
[role]-[phase-short]-[dimension-short]-01
```
| Role | Phase short | Dimension short |
|------|------------|----------------|
| sales | disc / req / des | cf / ib / kg / ca |
| designer | disc / req / des | cf / ib / kg / ca |
| ba | disc / req / des | cf / ib / kg / ca |
| crm | disc / req / des | cf / ib / kg / ca |
| strategy | disc / req / des | cf / ib / kg / ca |

Examples: `sales-disc-cf01-a`, `designer-req-ib01-b`, `ba-des-kg01-a`

### Anti-Patterns to Avoid
- **Generic tomorrowAction:** "Be more proactive in meetings" is invalid. Must name an artifact: "stakeholder approval tracker template", "discovery freeze checklist", etc.
- **debrief fields over 150 words:** Violates content QA standard. Each field must be concise.
- **crossRoleImpact on the better choice:** Only the friction-causing choice gets negative downstream impacts. The better choice gets `crossRoleImpact: []`.
- **Wrong frictionTag:** `frictionTag` on each choice should match the scenario's `frictionDimension` for the primary friction scenario; the secondary choice can carry the appropriate tag for its avoidance behavior.
- **Using window.location.href for internal navigation:** Use React Router `<Link>` or `useNavigate()`.
- **Modifying RoleMasterclassComplete.tsx:** Explicitly called out in CONTEXT.md as DO NOT MODIFY.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scenario validation | Custom type-checking code | Zod validateScenario() | Already built — throws at import time with file path + issue details |
| Role journey state | Local useState per scenario | useDesignationStore() | Already handles all 8 roles with append-only decision log |
| Phase progression | Custom counter logic | usePhaseNavigation hook | Already built with canAdvance gating |
| Cross-role impact derivation | Separate data structure | buildImpactMap() + crossRoleImpact[] on choices | Already built — just extend scenario files |
| Archetype computation | Custom scoring for new roles | computeProfile() + computeRunningScore() | Scoring engine is role-agnostic — works for any role's decisions |
| Internal team routing | New router or Navigator | ExperienceController EXPERIENCE_ORDER | "internal-training" step already in order; Layer2Complete onNext already wired |
| Client → internal navigation | JavaScript redirect | React Router Link to="/internalteam" | Route exists in App.tsx |

---

## Common Pitfalls

### Pitfall 1: Creating scenario data directories that don't match the naming convention
**What goes wrong:** If `data/scenarios/sales/` is created but the file exports are named inconsistently (e.g., `salesScenarios` instead of `salesDiscoveryScenarios`), the DesignationPortal import won't match.
**Why it happens:** The naming convention isn't enforced by TypeScript — it's a convention by reference.
**How to avoid:** Follow the exact export naming pattern: `[role][PhasePascalCase]Scenarios`. Examples: `salesDiscoveryScenarios`, `designerRequirementsScenarios`, `baDesignScenarios`.
**Warning signs:** TypeScript import errors in DesignationPortal.tsx after adding new role entries.

### Pitfall 2: Scenario ID collisions with existing PM/Dev/QA scenarios
**What goes wrong:** If a new scenario reuses an existing ID, Zod validates it but the impact map may produce duplicate edges or the designation store may log incorrect decisions.
**Why it happens:** Scenario IDs are plain strings — uniqueness is not enforced at runtime.
**How to avoid:** Prefix all new scenario IDs with role abbreviation. Sales: `sales-disc-*`, Designer: `des-disc-*`, BA: `ba-disc-*`, CRM: `crm-disc-*`, Strategy: `strat-disc-*`.
**Warning signs:** Test the impact map after adding new scenarios — duplicate edges indicate ID collision.

### Pitfall 3: crossRoleImpact affectedRole using wrong Designation value
**What goes wrong:** If `affectedRole: "designer"` is written as `affectedRole: "design"`, Zod throws at import time. But scenarios that use valid but incorrect role names (e.g., `affectedRole: "pm"` when the impact actually falls on `"ba"`) pass validation silently and pollute the impact map.
**Why it happens:** The Zod DesignationSchema allows all 8 values — only content accuracy is at risk.
**How to avoid:** Each choice's crossRoleImpact should reference roles that realistically receive downstream impact based on SDLC sequence. For Discovery phase scenarios, downstream impacts typically fall on BA (requirements) and Developer (development). For Design phase scenarios, downstream impacts fall on Developer (development) and QA (testing).
**Warning signs:** CrossRoleImpactView shows implausible impact combinations.

### Pitfall 4: ClientFinalConnect.tsx bridge requires prop change
**What goes wrong:** ClientFinalConnect currently takes only `onRestart: () => void`. Adding a `/internalteam` link does NOT require adding a new prop — the link is hardcoded to the route path. Adding a prop would create unnecessary coupling with ClientExperience.tsx.
**Why it happens:** Developers sometimes pass navigation callbacks instead of using router-level links.
**How to avoid:** Use `<Link to="/internalteam">` directly in ClientFinalConnect — no prop change needed.
**Warning signs:** If you find yourself modifying ClientExperience.tsx to pass a `onGoToInternal` prop, stop and use Link instead.

### Pitfall 5: Layer2Complete messaging change breaks the button's onNext wiring
**What goes wrong:** If the "Continue to Team Training" button is restructured (e.g., replaced with a Link), it will break the goToNext() chain that sets ExperienceController's currentStep to "internal-training".
**Why it happens:** Layer2Complete receives `onNext` as a prop from Layer2Controller which chains to ExperienceController's goToNext(). This callback dependency is invisible from just reading Layer2Complete.
**How to avoid:** Only change the button's text/sub-text content — keep `onClick={onNext}` intact.
**Warning signs:** After the messaging change, clicking "Continue" no longer navigates to InternalExperience.

### Pitfall 6: Compound insight shows null for the 3rd completed role
**What goes wrong:** `buildCompoundInsight` currently uses `completedRoles.find((r) => r !== role)` — this finds only the FIRST prior role. For 3+ roles, the function returns a single comparison string, ignoring subsequent roles.
**Why it happens:** The function was written for 2-role comparison. The Partial implementation returns null when previousRole is null.
**How to avoid:** When extending for 3+ roles, iterate over ALL completed roles (excluding current), build an ordered arc, and return a multi-role string rather than a single comparison.

---

## Code Examples

### Scenario ID pattern (verified from pm/discovery.ts)
```typescript
// Source: data/scenarios/pm/discovery.ts
// Pattern: [role]-[phase-short]-[dimension-key]-01
id: "pm-discovery-client-01"           // client_friction
id: "pm-disc-internal_bureaucracy-01"  // internal_bureaucracy
id: "pm-disc-knowledge_gap-01"         // knowledge_gap
id: "pm-disc-conflict_avoidance-01"    // conflict_avoidance
```

### debrief field length examples (from pm/discovery.ts — these are the bar to meet)
```typescript
// Source: data/scenarios/pm/discovery.ts
whatHappened: "Approving an undefined AI scope item closes discovery without establishing what was agreed."
// ~13 words — very concise

tomorrowAction: "In your next discovery call close-out, add one mandatory line to your discovery summary doc: 'Confirmed definition of [feature term] as: [specific behavior].' Never close discovery with a category term."
// ~35 words — specific, names artifact ("discovery summary doc"), gives exact script
```

### ROLE_COMPLETION_CONTENT structure (from JourneyCompleteView.tsx)
```typescript
// Source: src/components/experiences/internal/JourneyCompleteView.tsx
interface RoleCompletionContent {
  paradigmShift: string;                           // 1-2 sentences about the role's cross-functional perspective
  commitments: { label: string; action: string }[]; // 3 items — concrete this-week actions
  scripts: { trigger: string; line: string }[];     // 2 items — exact words for specific moments
  rubric: string[];                                  // 3 items — daily reflection questions
  cost: string;                                      // 1-2 sentences — what goes wrong without this shift
}
```

### buildImpactMap extension (from data/scenarios/cross-role-impact-map.ts)
```typescript
// Source: data/scenarios/cross-role-impact-map.ts
// The function accepts scenarios: ScenarioConfig[] — just extend the call
export const crossRoleImpactMap: ImpactEdge[] = buildImpactMap([
  ...pmDiscoveryScenarios,
  // ... existing 8 entries
  ...salesDiscoveryScenarios,      // ADD
  ...salesRequirementsScenarios,   // ADD
  ...salesDesignScenarios,         // ADD
  // ... 12 more for designer, ba, crm, strategy
]);
```

### clientFinalConnect bridge (proposed — no existing example)
```typescript
// ClientFinalConnect.tsx — add alongside existing "Replay Experience" button
import { Link } from "react-router-dom";

// In the button group:
<Link
  to="/internalteam"
  className="text-gray-400 hover:text-white transition-colors text-sm font-mono tracking-widest uppercase"
>
  See how your team navigates these frictions →
</Link>
```

---

## Role Content Guidance (Claude's Discretion)

### Sales Scenarios — Scenario Seeds

**Discovery phase:**
- client_friction: Deal specification is verbal only — prospect says "we want everything from the demo" but no written scope. Sprint pressure means sales wants to close fast.
- internal_bureaucracy: Legal approval for a custom enterprise contract takes 3 weeks but the prospect has a competitor offering with a 1-week SLA.
- knowledge_gap: Sales rep doesn't know the platform's integration limitations but is in a live demo with the client's CTO asking about SAP compatibility.
- conflict_avoidance: Client's procurement head drops the price expectation by 30% in the final call. Sales rep is over-target and doesn't want to lose the deal.

**Requirements phase:**
- client_friction: Signed SoW says "standard reporting module" — client now interprets this as "custom dashboards with real-time data."
- internal_bureaucracy: Pre-sales engineer needed for requirements scoping is fully allocated for 3 weeks.
- knowledge_gap: Handover from pre-sales to delivery PM loses critical context about non-negotiable client constraints.
- conflict_avoidance: Client's legal team adds a clause requiring 100% uptime SLA — sales absorbs it without flagging to delivery.

**Design phase:**
- client_friction: Client requests a brand-specific UI theme that deviates from the product's design system — sales team has already promised it to close.
- internal_bureaucracy: Design review process requires sign-off from 3 stakeholders who are in different time zones.
- knowledge_gap: Sales demo showed a prototype with features that aren't in the current product roadmap.
- conflict_avoidance: Client feedback on wireframes is "this doesn't look like what we imagined" — vague but ominous. Sales rep deflects instead of diagnosing.

### Designer Scenarios — Scenario Seeds

**Discovery phase:**
- client_friction: Client wants to see design concepts before discovery is complete — "just show us something to get excited."
- internal_bureaucracy: Design tool access (Figma organization seat) requires IT procurement approval — 2-week delay before designer can start.
- knowledge_gap: Designer joins mid-project and has no access to the original user research or decision rationale.
- conflict_avoidance: Stakeholder in discovery insists on a specific UI pattern the designer knows creates friction — designer doesn't push back.

**Requirements phase:**
- client_friction: Requirements doc uses copy-pasted legal language for the user-facing error messages — designer must implement literal legal text as UX copy.
- internal_bureaucracy: Design system update requires approval from the central platform team who has a 6-week review backlog.
- knowledge_gap: Designer receives a requirements doc with no user personas, no usage context, and no priority indicators.
- conflict_avoidance: PM and developer disagree on interaction model in requirements — designer absorbs the ambiguity and starts designing both options.

**Design phase:**
- client_friction: Client has strong brand preferences that conflict with WCAG accessibility requirements — designer has to choose whose constraint wins.
- internal_bureaucracy: Every design decision requires a design review meeting that includes 8 stakeholders, only 3 of whom are relevant.
- knowledge_gap: Handoff to developer lacks interaction notes — developer implements the static design without the intended micro-interactions.
- conflict_avoidance: Developer says "this animation will take 3 weeks to build" — designer removes it without discussing alternatives or impact.

### BA Scenarios — Scenario Seeds

**Discovery phase:**
- client_friction: Kickoff meeting produces 40 pages of stakeholder notes but no agreed priority order — BA needs to structure requirements without a clear North Star.
- internal_bureaucracy: BA needs access to the client's legacy system documentation to write requirements — access requires IT approvals across 3 departments.
- knowledge_gap: Subject matter expert for the core workflow is a retiring employee who is leaving in 6 weeks and won't be available for UAT.
- conflict_avoidance: Client's IT head and business head have contradictory requirements — BA documents both without flagging the conflict.

**Requirements phase:**
- client_friction: Client's business stakeholder changes acceptance criteria 2 days before the requirements sign-off meeting.
- internal_bureaucracy: Requirements sign-off requires a Physical Document with wet signatures from 5 executives in different cities.
- knowledge_gap: BA writes requirements for a financial calculation module without understanding the regulatory context — creates technically valid but legally non-compliant spec.
- conflict_avoidance: Developer says certain requirements are "too vague to build" — BA revises without involving the client stakeholder who wrote them.

**Design phase:**
- client_friction: Client reviews UX wireframes and says "this doesn't match the requirements I signed off on" — BA authored both and must reconcile.
- internal_bureaucracy: UAT environment setup requires a change control board approval that takes 3 weeks.
- knowledge_gap: BA facilitates UAT but testers are domain experts who don't know how to give structured feedback — session produces subjective opinions, not acceptance criteria.
- conflict_avoidance: BA identifies a critical requirements gap during design review but doesn't raise it to avoid reopening requirements sign-off.

### CRM Scenarios — Scenario Seeds

**Discovery phase:**
- client_friction: Existing client reports product friction in a renewal meeting — CRM must choose between acknowledging the product's limitations or deflecting to preserve relationship.
- internal_bureaucracy: Client escalation requires coordinating across 4 internal teams (PM, Support, Sales, Finance) — no single escalation owner.
- knowledge_gap: New CRM manager inherits an account with 18 months of undocumented relationship history and a renewal meeting in 2 weeks.
- conflict_avoidance: Client is unhappy with a delivery outcome but the CRM has been telling leadership everything is on track.

**Requirements phase:**
- client_friction: During a QBR, client asks for features that are on the roadmap but 6 months away — CRM must manage expectations without losing renewal.
- internal_bureaucracy: Account health review requires data from 5 systems (CRM, billing, support tickets, NPS, usage analytics) — none integrated.
- knowledge_gap: Client reports a recurring friction point that CRM hasn't noticed in account reviews because the metric wasn't being tracked.
- conflict_avoidance: Delivery team missed a milestone — CRM has to tell the client while also managing their own leadership's expectations about the account.

**Design phase:**
- client_friction: Client wants a custom onboarding flow for new users in their org — CRM has promised this but it requires product investment that hasn't been approved.
- internal_bureaucracy: Renewal contract needs legal review that delays the renewal signature past the fiscal year end — both parties lose.
- knowledge_gap: Client's internal champion who drove the initial purchase leaves — new stakeholder has different expectations and the CRM has no documented success metrics from the original deal.
- conflict_avoidance: Client's satisfaction score drops but CRM smooths it over with a gift voucher instead of investigating root cause.

### Strategy Scenarios — Scenario Seeds

**Discovery phase:**
- client_friction: Strategy team must present a product direction to a board that wants "AI and mobile" without any user research to support the direction.
- internal_bureaucracy: Strategic initiative requires approval from 3 committees before discovery can begin — each committee meets quarterly.
- knowledge_gap: Strategy depends on market data from a report that is 2 years old — the competitive landscape has shifted significantly.
- conflict_avoidance: Two senior stakeholders have contradictory strategic priorities — strategy team presents a plan that tries to satisfy both without resolving the conflict.

**Requirements phase:**
- client_friction: Client's strategic objectives keep shifting between meetings — strategy team is building a moving target.
- internal_bureaucracy: Strategy document must pass a political review by all department heads before it can be actioned — each department has veto power.
- knowledge_gap: Strategy relies on assumptions about user behavior that have never been validated — discovery is planned but executives want to skip it.
- conflict_avoidance: Strategy team identifies that the proposed product direction conflicts with a promised client commitment — they omit the finding from the report.

**Design phase:**
- client_friction: Strategy-level UX direction conflicts with what the development team has already built — strategy team must choose to adapt or advocate for rework.
- internal_bureaucracy: Strategic KPI dashboard requires buy-in from 7 teams to instrument their systems — 3 have declined due to resource constraints.
- knowledge_gap: Strategy team can't connect user adoption metrics to business outcomes because the data infrastructure wasn't built to support the measurement.
- conflict_avoidance: Post-launch data shows the strategy had a flaw — strategy team delays presenting findings to leadership to avoid accountability.

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Quick Mode role journeys (SalesJourney.tsx etc.) | Full SDLC journey via ScenarioRenderer + DesignationPortal | Phase 3 established | Quick Mode preserved but SDLC is the primary experience |
| Static impact map stub (empty []) | buildImpactMap() from scenario crossRoleImpact arrays | Phase 4 | Impact map is now data-driven, not hardcoded |
| 2-role compound insight only | Extend to 3+ role arc (Phase 5) | Phase 5 | Users who complete 3+ roles see pattern evolution |
| ClientFinalConnect as terminal screen | Add /internalteam bridge CTA (Phase 5) | Phase 5 | Client path connects to internal team experience |

---

## Open Questions

1. **Should the "Full SDLC Journey" mode button in RoleBriefingView be conditionally hidden for roles without SDLC data?**
   - What we know: Currently DesignationPortal falls through to `return null` when `ROLE_PHASE_GROUPS[role]` is undefined. If a user picks Sales before Phase 5 ships, clicking "Full SDLC Journey" shows nothing.
   - What's unclear: Is this actually a problem in practice given phases deploy incrementally?
   - Recommendation: The implementation plans should ship all 5 roles together in a single wave to avoid partial state. If individual role plans are shipped separately, add a guard in DesignationPortal that disables "Full SDLC Journey" if `ROLE_PHASE_GROUPS[role]` is undefined.

2. **Should the Layer 2 → Designation Portal bridge add a role pre-selection based on Layer 2 decisions?**
   - What we know: Layer 2 SDLC tracks decisions per phase (discovery, requirements, design) but doesn't track which role's perspective the user was simulating. CONTEXT.md says Claude's Discretion on bridge messaging.
   - What's unclear: Whether personalization is technically feasible without adding new tracking to SDLCContext.
   - Recommendation: Keep the bridge simple — generic contextual text ("You just walked the full SDLC. Now see it from your role's perspective.") is sufficient for AUDT-03/05. Personalization would require SDLCContext changes that risk regression.

3. **Do the 5 remaining roles need entries in the Quick Mode `renderRoleJourney()` switch in InternalExperience.tsx?**
   - What we know: SalesJourney, DesignerJourney, BAJourney, CRMJourney, StrategyJourney all exist as Quick Mode components. InternalExperience.tsx already has a switch case for all of them (lines 54–68 confirmed in codebase).
   - What's unclear: Whether these Quick Mode journeys are complete and functional or have stubs/empty stages.
   - Recommendation: CONTEXT.md explicitly says "Existing Quick Mode role journeys remain untouched." Plan tasks should not read or modify Quick Mode journey files.

---

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | None — REQUIREMENTS.md explicitly states "Automated test suite: Out of scope. Manual QA adequate for experiential content validation." |
| Config file | none |
| Quick run command | `npx tsc --noEmit` (TypeScript compilation as functional proxy for test) |
| Full suite command | `npm run build` (Vite build catches import errors + Zod validation at module load) |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| AUDT-01 | ClientFinalConnect has bridge to /internalteam | manual | N/A | ✅ ClientFinalConnect.tsx |
| AUDT-02 | All 5 funnel friction/good pairs complete and consistent | manual | N/A | ✅ All 10 components confirmed in codebase |
| AUDT-03 | Layer2Complete bridge messaging is contextual | manual | N/A | ✅ Layer2Complete.tsx |
| AUDT-04 | No dead ends — all layers have clear next actions | manual | N/A | ✅ Multiple files |
| AUDT-05 | Layer completion prompts contextual bridge to next layer | manual | N/A | ✅ Multiple files |
| ROLE-01 | 5 new roles have SDLC scenarios and are wired in DesignationPortal | smoke | `npx tsc --noEmit` | ❌ Wave 0 — 15 new scenario files needed |
| XROL-01 | crossRoleImpactMap includes all 8 roles | smoke | `npx tsc --noEmit` | ❌ Wave 0 — cross-role-impact-map.ts needs 15 new imports |

### Sampling Rate
- **Per task commit:** `npx tsc --noEmit`
- **Per wave merge:** `npm run build`
- **Phase gate:** `npm run build` passes with zero errors before `/gsd:verify-work`

### Wave 0 Gaps
- [ ] `data/scenarios/sales/discovery.ts` — covers ROLE-01 (sales, discovery phase)
- [ ] `data/scenarios/sales/requirements.ts` — covers ROLE-01 (sales, requirements phase)
- [ ] `data/scenarios/sales/design.ts` — covers ROLE-01 (sales, design phase)
- [ ] `data/scenarios/designer/discovery.ts` — covers ROLE-01 (designer, discovery phase)
- [ ] `data/scenarios/designer/requirements.ts` — covers ROLE-01 (designer, requirements phase)
- [ ] `data/scenarios/designer/design.ts` — covers ROLE-01 (designer, design phase)
- [ ] `data/scenarios/ba/discovery.ts` — covers ROLE-01 (ba, discovery phase)
- [ ] `data/scenarios/ba/requirements.ts` — covers ROLE-01 (ba, requirements phase)
- [ ] `data/scenarios/ba/design.ts` — covers ROLE-01 (ba, design phase)
- [ ] `data/scenarios/crm/discovery.ts` — covers ROLE-01 (crm, discovery phase)
- [ ] `data/scenarios/crm/requirements.ts` — covers ROLE-01 (crm, requirements phase)
- [ ] `data/scenarios/crm/design.ts` — covers ROLE-01 (crm, design phase)
- [ ] `data/scenarios/strategy/discovery.ts` — covers ROLE-01 (strategy, discovery phase)
- [ ] `data/scenarios/strategy/requirements.ts` — covers ROLE-01 (strategy, requirements phase)
- [ ] `data/scenarios/strategy/design.ts` — covers ROLE-01 (strategy, design phase)

These are the primary deliverables of plans 05-01 through 05-03. Plans 05-04 and 05-05 modify existing files, not create new ones.

---

## Sources

### Primary (HIGH confidence)
- Direct codebase inspection — `data/scenarios/pm/discovery.ts` — verified scenario structure, ID convention, debrief fields, crossRoleImpact pattern
- Direct codebase inspection — `data/scenarios/schema.ts` — verified Zod schema, all required fields
- Direct codebase inspection — `data/scenarios/cross-role-impact-map.ts` — verified current state: 9 scenario imports, buildImpactMap() function
- Direct codebase inspection — `src/components/experiences/internal/DesignationPortal.tsx` — verified ROLE_PHASE_GROUPS structure, FullSDLCJourney component
- Direct codebase inspection — `src/components/experiences/internal/JourneyCompleteView.tsx` — verified ROLE_COMPLETION_CONTENT schema, buildCompoundInsight function
- Direct codebase inspection — `src/components/experiences/layer2/Layer2Complete.tsx` — verified current button text and onNext wiring
- Direct codebase inspection — `src/components/experiences/client/ClientExperience.tsx` — verified 18 steps, all 10 funnel components (5 bad + 5 good) imported
- Direct codebase inspection — `src/components/experiences/client/primer/ClientFinalConnect.tsx` — confirmed dead-end: only "Replay Experience" and external "Let's Connect" link, no /internalteam bridge
- Direct codebase inspection — `src/components/experiences/ExperienceController.tsx` — confirmed EXPERIENCE_ORDER, goToNext() chain, "internal-training" step

### Secondary (MEDIUM confidence)
- `.planning/REQUIREMENTS.md` — AUDT-01..05 definitions, "Automated test suite: Out of scope" confirmation
- `.planning/phases/05-full-platform-delivery/05-CONTEXT.md` — locked implementation decisions, client experience audit scope

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all libraries verified by direct file inspection, not training data
- Architecture patterns: HIGH — patterns derived from existing Phase 3/4 implementation in codebase
- Role content seeds: MEDIUM — scenario narratives are Claude's Discretion; IBC/SAP/TCS context is locked but specific friction situations are authoring choices
- Pitfalls: HIGH — confirmed by reading actual code paths and potential failure modes

**Research date:** 2026-03-24
**Valid until:** Stable (no external APIs, all client-side — findings don't expire until codebase changes)
