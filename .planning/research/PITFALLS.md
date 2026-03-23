# Pitfalls Research

**Domain:** Experiential UX training platform — role-based SDLC simulation with cumulative scoring and behavioral change mechanics
**Researched:** 2026-03-23
**Confidence:** HIGH (pattern-specific findings drawn from codebase analysis + verified against experiential learning and React state management research)

---

## Critical Pitfalls

### Pitfall 1: Content Explosion from Combinatorial Growth (8 roles × 7 phases × 4 dimensions)

**What goes wrong:**
The content matrix (8 roles × 7 phases × 4 friction dimensions = 224 scenario slots) looks manageable in a spreadsheet but becomes unmanageable in code if each slot is treated as an independent, hand-wired component. The existing codebase already shows this strain: `DiscoveryPhaseNew.tsx` is 3,127 lines because all 12 screen components live in one file. Extending this pattern to 224 slots produces ~56,000 lines of tightly coupled, impossible-to-audit content.

**Why it happens:**
When teams start content authoring by writing components first, they naturally co-locate the UI logic and the content in the same file. The first few scenarios feel clean. By scenario 15, the file is already ungainly but nobody stops. There is no forced separation between "what the scenario says" (data) and "how the scenario renders" (component).

**How to avoid:**
Separate content from renderer immediately and completely. Define a typed `ScenarioConfig` interface that carries all scenario content as a plain JSON/TypeScript data object: role, phase, dimension, question text, options, consequences, debrief text, impact deltas, tomorrow's action. A single generic `ScenarioRenderer` component consumes any `ScenarioConfig` and produces the experience. This is the data-driven content architecture pattern. All 224 slots become entries in a config file, not 224 components.

```typescript
// Target shape
interface ScenarioConfig {
  id: string;
  role: DesignationRole;
  phase: SDLCPhase;
  dimension: FrictionDimension; // 'client' | 'bureaucracy' | 'knowledge_gap' | 'conflict_avoidance'
  title: string;
  setup: string;
  choices: Choice[];
  debrief: {
    whatHappened: string;
    why: string;
    how: string;
    whoBecame: string;
    tomorrowAction: string;
  };
}
```

**Warning signs:**
- Any scenario-specific component file exceeds 200 lines
- Copying an existing phase file to start a new one
- "I need to update this in three places" for a single scenario change
- Phase files growing past 500 lines as new scenarios are added

**Phase to address:** Phase 1 (content architecture / data schema) — must be locked before a single SDLC-merged scenario is written. Retrofitting this split costs more than getting it right initially.

---

### Pitfall 2: Monolithic SDLCContext Collapsing Under Cross-Role State

**What goes wrong:**
The existing `SDLCContext` already stores all project state in a single `useState` and has documented performance risk (re-renders across hundreds of consumers on every state change). Adding cumulative scoring, per-role decision histories, cross-role impact matrices, and blind spot analysis to the same context will cause it to collapse under its own weight. By the end of an 8-role journey, the `decisions` array alone could hold 200+ items. Every React consumer re-renders on every append.

**Why it happens:**
Context feels like the natural place to "share everything." The existing pattern (one context, one state blob) worked for the original 3-scenario-per-role format. Teams extend the existing pattern because it works in isolation; the performance cost only surfaces late when data volume is high.

**How to avoid:**
Domain-split the context before adding new state domains. The correct split for this platform:
- `SessionContext` — current role, current phase, navigation state (high-frequency updates, narrow subscribers)
- `ScoringContext` — cumulative decision log, pattern analysis, blind spots (write-once per decision, read at completion)
- `CrossRoleContext` — impact ripple data, role completion flags (low-frequency, wide reads only at summary)
- Keep `SDLCContext` for SDLC phase simulation state (budget, timeline, UX debt) as-is but freeze its API

Additionally, use Zustand slices rather than Context for `ScoringContext` and `CrossRoleContext`. Zustand's selector-based subscriptions mean a component reading `blindSpots` does not re-render when a new `decision` is appended. Context does not provide this granularity.

**Warning signs:**
- Adding a new field to `ProjectState` interface in `SDLCContext.tsx`
- Any component subscribing to `SDLCContext` that only needs one field from the state blob
- Framer Motion animations stutter after 50+ decisions have accumulated
- Profile/summary screen causes a noticeable render lag on load

**Phase to address:** Phase 1 (state architecture) — must establish context split and Zustand introduction before cross-role scoring state is built. The `SDLCContext` refactor is a pre-requisite, not a nice-to-have.

---

### Pitfall 3: Scoring That Feels Like Grading (The Test Trap)

**What goes wrong:**
A cumulative scoring system makes the experience feel like a test that can be passed or failed. Users shift from "exploring what happens" to "finding the right answer." Once that psychological shift happens, the experience loses its core value: surfacing genuine blind spots. Users who perceive a test start over-performing on obvious answers and never surface their real decision patterns. The behavioral change goal is unachievable in test mode.

**Why it happens:**
Scoring is the most tangible output of decision tracking, so it becomes the visible currency. Leaderboards, percentages, and letter grades are the familiar patterns from educational software. They feel like they communicate "how you did" but they actually communicate "how to perform next time" — which is the opposite of the blind spot goal.

**How to avoid:**
The scoring model must be a behavioral pattern profile, not a score. Do not surface any number during the journey. At completion, show the user their decision patterns across dimensions and phases, not a total. The output should be: "In Requirements and Design phases, you chose conflict avoidance 4 out of 5 times. In Dev and Testing, you took risks. This pattern suggests you defer judgment to stakeholders early, then compensate under pressure." This framing is a mirror, not a grade.

Implementation implication: the scoring engine tracks choice category tags (`conflict_avoidance`, `risk_taking`, `approval_seeking`, `knowledge_gap_exposure`) rather than numeric point values. The analysis at the end counts tag frequencies across phase × dimension matrices. No numbers shown to user at any point until the final pattern analysis.

**Warning signs:**
- Any component displaying a running score or percentage during a role journey
- Any debrief screen showing "Good choice!" vs "Poor choice!" framing
- Users asking "what's the right answer?" before making a choice
- Completion screen structured around success/failure rather than pattern/insight

**Phase to address:** Phase 2 (scoring engine design) — the behavioral tagging model must be designed before the first scenario is built. Retrofitting a tag-based model onto a numeric score model requires rewriting all scenario configs and the completion screen.

---

### Pitfall 4: Cross-Role Impact Modeled as Static Assertions, Not Emergent from Decisions

**What goes wrong:**
The cross-role impact feature ("after completing your role, see how your decisions rippled into other designations") gets implemented as hardcoded consequence strings: "Your choice in Discovery caused the BA to miss requirements." This is inauthentic and users see through it immediately. If the same consequence appears regardless of what choice they made, the feature destroys trust in the platform rather than building empathy.

**Why it happens:**
Modeling genuine cross-role dependencies requires upfront design of a dependency graph. It is easier to write plausible-sounding fixed-text consequences per choice than to build a real impact propagation model. Teams under timeline pressure default to static text because it ships faster.

**How to avoid:**
Model cross-role impact as a consequence matrix in the scenario config data, not in component code. Each choice in a scenario carries a `crossRoleImpact` field: an array of `{ role, phase, description }` objects that are conditionally surfaced on the cross-role summary screen based on which choices the user actually made. The impact strings are still authored, but they are keyed to actual decisions — not hardcoded per scenario.

```typescript
// In ScenarioConfig.Choice
crossRoleImpact?: Array<{
  affectedRole: DesignationRole;
  affectedPhase: SDLCPhase;
  description: string; // "PM now inherits ambiguous requirements because you approved them without questioning scope."
  severity: 'low' | 'medium' | 'high';
}>;
```

This means content authoring must consciously design the 8-role dependency graph before writing scenario text. The dependency graph (who depends on whom, at which phase, for what artifact) is the design artifact that must exist before content writing starts.

**Warning signs:**
- Cross-role impact strings that don't change based on which choice was made
- No explicit `crossRoleImpact` field in scenario data model
- Cross-role summary screen built with hardcoded text rather than derived from decision history
- "What does the PM see when the developer chose option B in Design?" cannot be answered from the data model

**Phase to address:** Phase 1 (content architecture) — the cross-role dependency graph must be drafted as a design document before any scenario configs are written. Phase 3 (cross-role impact screen) can then wire up the pre-existing data.

---

### Pitfall 5: localStorage as Primary State Without Schema Versioning

**What goes wrong:**
The platform currently has no state persistence (page refresh loses all decisions). Adding localStorage persistence without a versioning strategy means that when the scenario config or state shape changes — which it will, repeatedly, during content development — cached state from old schema versions silently corrupts the experience for returning users. A user who completed Sales on Monday returns Thursday to find their cross-role summary broken because the schema changed in a deploy.

**Why it happens:**
`localStorage.setItem(key, JSON.stringify(state))` followed by `JSON.parse(localStorage.getItem(key))` is trivially easy to implement. Schema versioning feels like overengineering for a frontend-only app. The first time it breaks is usually in production, not development, because developers clear their own storage but users don't.

**How to avoid:**
Implement a versioned state envelope from day one:
```typescript
interface PersistedState {
  schemaVersion: number; // increment on breaking schema changes
  savedAt: number; // timestamp
  roleProgress: RoleProgressMap;
  decisions: DecisionLog[];
}
```

On load, if `schemaVersion` does not match the current app version, discard the persisted state and start fresh (with a graceful "Your progress was reset due to an update" message). This is the correct recovery behavior for a no-backend educational platform. Never silently merge incompatible schemas.

**Warning signs:**
- `JSON.parse(localStorage.getItem('state'))` without schema version check
- State shape changes during development without clearing team members' localStorage
- Any error in console that reads "Cannot read property X of undefined" after a state shape change
- No `schemaVersion` field in the persisted state object

**Phase to address:** Phase 1 (state persistence foundation) — implement the versioned envelope before any role journey data is persisted. It is a 30-minute investment that prevents hours of debugging later.

---

### Pitfall 6: Phase Navigation Hardcoded as Array Index Lookups with Parallel Role Journeys

**What goes wrong:**
The existing `SCREEN_ORDER.indexOf(currentScreen)` navigation pattern is already flagged as fragile in CONCERNS.md. When extended to 8 role journeys × 7 phases, each with potentially different screen counts and conditional branches (some roles skip certain dimensions), the array-index pattern produces a proliferation of `SCREEN_ORDER` arrays that must be manually kept in sync with screen enums, conditional logic, and routing. One missing screen in one array causes silent navigation corruption — the user skips content without knowing.

**Why it happens:**
Array-of-strings navigation is the path of least resistance for simple sequential flows. It works for 12 screens. It breaks for 80+ screens with conditional branching.

**How to avoid:**
Replace array-index navigation with a state machine or explicit navigation graph at the phase level. XState is appropriate here because role journeys have well-defined states, guard conditions ("only show conflict_avoidance dimension if the user has not already completed it"), and parallel states (multiple roles in progress simultaneously). At minimum, extract a `usePhaseNavigation(config)` hook that derives `next`, `previous`, and `canProgress` from a declarative config rather than from array position.

**Warning signs:**
- New SDLC-merged phase components are created by copying `DiscoveryPhaseNew.tsx` and modifying its `SCREEN_ORDER` array
- Any SCREEN_ORDER array exceeds 15 items
- "We need to conditionally skip screen X for role Y" — this is unsolvable with array-index navigation without messy conditional guards
- Different SCREEN_ORDER arrays across phase files that diverge over time

**Phase to address:** Phase 1 (navigation architecture) — the navigation pattern must change before any SDLC-merged phase components are built. The existing phase files can retain their current pattern; only new work must use the declarative approach.

---

## Moderate Pitfalls

### Pitfall 7: Debrief Quality Decay Across 224 Scenarios

**What goes wrong:**
The existing 3-scenario-per-role journeys have high-quality debriefs with five distinct components (what happened, why, how, who you became, tomorrow's action). At 224 slots, content quality degrades without a quality gate. Later scenarios — especially the internal bureaucracy and knowledge gap dimensions which are less familiar than client-facing friction — will have generic debriefs that feel copy-pasted. "Make sure to communicate better" is not the platform's standard.

**Why it happens:**
Content at scale becomes a production task. Under time pressure, debrief quality shortens to the minimum that feels complete. The "who you became" and "tomorrow's action" fields are the hardest to write specifically and are the first to become generic.

**How to avoid:**
Create a content QA checklist that must be passed for each `ScenarioConfig` before merging. Required checks: Does the `tomorrowAction` reference a specific workflow moment? (Not "communicate better" but "In your next sprint planning, ask 'what does the user lose if this feature is cut?' before estimating.") Does the `whoBecame` use a specific character/role archetype? Is the debrief under 150 words per field? Content review is as important as code review for this platform.

**Warning signs:**
- Debrief text starting with "It's important to..." or "Remember to..."
- `tomorrowAction` field containing no concrete workflow reference
- Multiple scenarios across roles sharing identical debrief language
- Debrief that could apply to any role (not role-specific)

**Phase to address:** Phase 2 (content authoring) — establish the content QA checklist at the start. Apply retroactively to existing scenarios as a baseline audit.

---

### Pitfall 8: Role Journey Isolation — No Cross-Completion Insight Compound Effect

**What goes wrong:**
Users who complete multiple role journeys receive no compounding insight. Completing Sales and then PM gives the same cross-role summary as if they only completed Sales. The platform promise — "complete multiple designations and see compounding insights" — fails silently because no mechanism tracks cross-journey patterns.

**Why it happens:**
Multi-role completion is designed as an afterthought: "we'll add that later." The completion screen for each role is designed in isolation. By the time multi-role insight is considered, the data model does not support it.

**How to avoid:**
The `CrossRoleContext` must track completion state across all 8 roles, not just the current role. The cross-role impact screen on completion of role N must be able to query: "Did the user also complete role M? If so, surface the M→N dependency insights that are only visible when you've been in both seats." This requires the decision log to be indexed by role from day one.

**Warning signs:**
- Cross-role summary screen only reads from `currentRole` decision history
- No `completedRoles` field in persisted state
- "You completed PM, now see how your PM decisions affected Design" appears identically whether or not the user has also completed the Designer journey

**Phase to address:** Phase 2 (scoring engine) — multi-role indexing must be in the data model before the first cross-role screen is built.

---

### Pitfall 9: Framer Motion Animation State Fighting React State

**What goes wrong:**
The existing codebase has 89 defensive `useCallback` hooks, which signals animation-triggered re-renders are already a known pain. Adding 224 new scenario transitions — each with entry/exit animations driven by Framer Motion and consequence state updates — without strict animation/state separation will produce race conditions: a consequence state update fires mid-animation, the animation restarts, and the user sees flicker or content jumping.

**Why it happens:**
Framer Motion's `AnimatePresence` and the `key` prop re-mount approach for transitions work by unmounting the old component and mounting the new one. If the parent holding navigation state also triggers re-renders from scoring state changes (e.g., appending a decision to the decision log), the animation is interrupted.

**How to avoid:**
Keep animation-triggering state completely isolated from data-mutation state. Navigation state (which screen is active) drives animations. Scoring state mutations (appending decisions, updating the cross-role impact matrix) must happen after the navigation transition completes — not simultaneously. Use a `useTransitionCallback` pattern: navigate first, then in the `onAnimationComplete` callback, fire the scoring state update.

**Warning signs:**
- `setCurrentScreen` and `addDecision` called in the same event handler
- Animations that restart on unrelated state changes
- Console warnings about "Can't perform React state update on unmounted component" during transitions
- Users experiencing content flicker between scenario screens

**Phase to address:** Phase 1 (component architecture) — establish the animation/state separation pattern in the first new phase component built as a reference implementation.

---

### Pitfall 10: "Tomorrow's Action" That Is Generic Advice, Not Workflow-Anchored Behavior

**What goes wrong:**
Each scenario is required to produce a "do this tomorrow" action. If this field is written as general advice ("be more proactive in identifying knowledge gaps"), it provides no behavioral change. The platform's core claim — users come out changed in how they work — is invalidated by generic advice at the moment of highest learning receptivity.

**Why it happens:**
Specific workflow-anchored actions require domain knowledge of what each role actually does tomorrow morning. Content authors who understand UX but not the specific day-to-day of a QA tester in an Indian B2B enterprise context will default to generic framing. This is especially acute for the less-familiar roles (CRM, Strategy, BA).

**How to avoid:**
Each role's tomorrow action must reference a specific workflow artifact or ritual. For a Developer: "In your next PR review, add one comment that maps the change to a user action: 'this removes the step where users had to re-enter their PO number.'" For a BA: "In your next requirements gathering session with the client, write the acceptance criteria as: 'User can do X without Y friction' — not 'System shall support X.'" Content review must reject any action that does not name a specific artifact (PR, Jira ticket, meeting, document) or a specific moment (sprint planning, next client call, stand-up).

**Warning signs:**
- Tomorrow's action uses phrases: "be more aware," "communicate better," "think about," "consider"
- The action applies equally to any role (not role-specific)
- No artifact or ritual named in the action
- Action is descriptive of a mindset, not a behavior

**Phase to address:** Phase 2 (content authoring) — enforce as a content QA gate for every scenario. Include in the `ScenarioConfig` type a required `workflowAnchor` field (the specific artifact/ritual this action targets) that forces authors to name it explicitly.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Copy existing phase file to create new SDLC-merged phase | Fast to start | 8 phase files × 7 roles = 56 diverging copies; any shared change must be made 56 times | Never — use a generic renderer from day one |
| Store all scenario configs inline in component files | No separate data layer to set up | 224 scenarios × ~50 lines each = 11,200 lines of config buried in components | Never — separate data from renderer |
| Numeric scoring (points per choice) | Familiar pattern, easy to implement | Activates test-taking behavior; invalidates behavioral change goal | Never for user-visible scoring; acceptable internally for analytics if never surfaced to user |
| Single SDLCContext for all new state | No context architecture decisions needed | O(n) re-renders across all consumers on every decision append; collapses at 100+ decisions | Never for new cross-role scoring state |
| Hardcoded cross-role impact strings per scenario | Fast to author consequences | Impact appears regardless of actual choices; destroys authenticity | Never — must be keyed to actual choice made |
| localStorage without schema version | 10-line implementation | Silent state corruption on first schema change in production | Never — versioning is a 30-minute investment |
| Array-index phase navigation copied from existing components | Consistent with existing pattern | Cannot support conditional branching for 8 roles without unmaintainable guard logic | Never for new SDLC-merged phase components |
| Skip animation/state separation for first few scenarios | Faster initial development | Race conditions compound; retrofitting the separation requires rewriting all scenario handlers | Never — establish the pattern in the first component |

---

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Single context blob with all scoring state | Entire UI re-renders on each decision append; Framer Motion animations restart mid-scene | Domain-split contexts; Zustand for high-write scoring state with selector subscriptions | Noticeable at ~50 decisions in session; severe at ~150 |
| Unbounded `decisions[]` array in SDLCContext | Spread operations in setState slow as array grows; memory pressure on 2hr sessions | Archive completed phase data; cap active decisions array at current phase only | Perceptible lag above 200 items; CONCERNS.md documents this threshold |
| GradientBackground mousemove listener on every role journey remount | CPU usage spikes on scroll/hover during scenarios; battery drain on laptops | Move listener outside component; debounce at 16ms (60fps); use `useRef` not `useState` for gradient position | Immediately — CONCERNS.md documents multiple listeners attaching on remount |
| All 224 scenario configs loaded as a single import | Bundle size bloat; slower initial parse on first load | Dynamic import scenario configs per role/phase; load the next phase config during current phase | At ~100KB of config data; each scenario config ~0.5KB so 224 × 500B = ~110KB raw |
| React.memo absent from ScenarioRenderer | Re-renders on parent navigation state changes even when scenario content has not changed | Wrap ScenarioRenderer in React.memo; memoize all handler props with useCallback | Noticeable on slower devices during transition sequences |

---

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Showing a progress bar as "X of 28 steps" | Users feel the experience as a chore to complete rather than a journey to inhabit; they rush to finish | Show phase breadcrumbs (Discovery / Requirements / Design...) without total step count; progress should feel like moving through a project, not a quiz |
| Revealing the "correct" choice in debriefs ("The right answer was B") | Users focus on answer-memorization for the next run; blind spot analysis becomes worthless because they game it | Frame all debriefs as "what happened when you chose this path" — consequence framing, not correctness framing; never use "correct" or "wrong" |
| Cross-role impact presented as accusation ("Your decision caused QA to miss 3 bugs") | Defensiveness, not empathy; users reject the insight | Frame as systemic consequence, not personal blame: "When Requirements phase passes without surfacing this gap, QA inherits ambiguity that surfaces as missed edge cases" |
| Commitment wall at completion showing 10+ action items | Overwhelm; none are retained | Surface exactly one commitment per completed role — the single most relevant tomorrow action based on the user's dominant blind spot pattern |
| Role selection screen as a menu with no stakes | Users pick their own role without curiosity about others | After completing one role, surface a "You made X decisions that affected the PM — see how" prompt to organically pull them into a second role journey |
| Scenario choice options that are obviously "bad" | Users don't reflect; they choose the safe-sounding option every time | All choices must be genuinely tempting in their immediate context; the "bad" choice must be the one that feels rational under real workload pressure |

---

## "Looks Done But Isn't" Checklist

- [ ] **Scenario content complete:** Each `ScenarioConfig` has all five debrief fields populated with role-specific, non-generic text — verify that `tomorrowAction` names a concrete artifact and workflow moment
- [ ] **Cross-role impact wired:** The cross-role summary screen actually reads from the user's `decisionLog` keyed by role and choice — verify by making different choices and confirming different cross-role consequences appear
- [ ] **State persists across page refresh:** Complete half of a role journey, refresh, confirm progress is not lost — verify schema version is checked on load
- [ ] **Blind spot analysis is non-trivial:** Complete a role journey choosing the same dimension repeatedly — verify the pattern analysis names the specific dimension and phase combination, not a generic "you tend to avoid conflict" message
- [ ] **Animation/state separation holds:** Make a choice that appends to the decision log — verify the transition animation completes without flicker before the debrief appears
- [ ] **Multi-role compound insight works:** Complete two role journeys — verify the second completion screen surfaces insights that reference the first completed role
- [ ] **No numeric scores visible at any point:** Walk through a complete role journey — verify no points, percentages, or grades appear anywhere
- [ ] **Scenario choice options feel genuinely difficult:** Have someone unfamiliar with UX complete a scenario — verify they are not immediately obvious which option is "right" without reflection

---

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Content as components (no data/renderer split) | HIGH | Extract all scenario content into `ScenarioConfig` objects; build generic `ScenarioRenderer`; refactor all existing 24 scenarios to use configs before adding new ones |
| Monolithic context with scoring state added | HIGH | Split context domains; migrate scoring state to Zustand; update all consumers with new selectors; test for re-render regression |
| Numeric scoring model shipping to users | MEDIUM | Remove score display from all screens; reframe existing numeric values as category tag counts; rewrite completion screen copy — data model may survive if tags were tracked alongside points |
| Array-index navigation proliferated across 20+ phase files | HIGH | Extract `usePhaseNavigation` hook; refactor all phase files to use it; add screen config validation to catch out-of-sync arrays |
| localStorage without schema version (corruption in prod) | MEDIUM | Ship a "clear and restart" migration patch; add version check; accept data loss for affected users with graceful messaging |
| Generic tomorrow actions across all scenarios | MEDIUM | Content audit pass across all 224 scenarios; rewrite `tomorrowAction` fields to meet specificity bar; no code changes required — data-only fix |

---

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Content explosion / no data-renderer split | Phase 1: Content architecture foundation | Confirm `ScenarioConfig` interface defined and `ScenarioRenderer` built before first new scenario is authored |
| Monolithic context collapse | Phase 1: State architecture refactor | Confirm SDLCContext split and Zustand slice introduced; no new state added to existing SDLCContext |
| Scoring as grading (test trap) | Phase 1: Scoring model design | Confirm no numeric score field in `ScenarioConfig`; completion screen design uses pattern profile, not grade |
| Static cross-role impact assertions | Phase 1: Content schema design | Confirm `crossRoleImpact[]` array exists in `Choice` type, keyed to specific choice IDs |
| localStorage without schema versioning | Phase 1: Persistence foundation | Confirm `schemaVersion` field in persisted state and migration guard on load |
| Array-index navigation fragility | Phase 1: Navigation architecture | Confirm `usePhaseNavigation` hook built; no new SCREEN_ORDER arrays created in new phase files |
| Debrief quality decay | Phase 2: Content authoring | Content QA checklist gate applied to every `ScenarioConfig` PR; spot audit at 25%, 50%, 100% of scenarios |
| Multi-role isolation (no compound insight) | Phase 2: Scoring engine | Confirm `completedRoles` tracked in persisted state; cross-role screen queries multi-role decision history |
| Animation/state race conditions | Phase 1: Component reference implementation | First new SDLC-merged scenario component passes the animation/state separation pattern; reviewed before parallelizing content authoring |
| Generic tomorrow actions | Phase 2: Content authoring | `workflowAnchor` required field in `ScenarioConfig.debrief`; rejected in content review without a named artifact |
| Cross-role impact as accusation framing | Phase 3: Cross-role impact screen | User test with 3 internal team members — verify no defensive reactions to impact copy |
| Commitment overwhelm on completion | Phase 3: Completion screen | Completion screen shows exactly one commitment — verify by completing role and counting action items |

---

## Sources

- Codebase analysis: `/Users/shashankrai/Documents/Duplicate human-centric-lab-main 15 jan/.planning/codebase/CONCERNS.md` — HIGH confidence (direct inspection)
- [Experiential Learning Design Model to drive behavioural change — ELT](https://experientiallearningtools.com/blog/using-an-experiential-learning-design-model-to-drive-behavioural-change) — MEDIUM confidence
- [Does Training Really Change Behavior — Training Industry](https://trainingindustry.com/blog/performance-management/does-training-really-change-behavior-the-2-reasons-training-programs-fail-and-what-to-do-about-it/) — MEDIUM confidence
- [Designing Efficient E-Learning Gamification — Raccoon Gang](https://raccoongang.com/blog/designing-efficient-elearning-gamification/) — MEDIUM confidence
- [React State Management Trends 2025 — Makers Den](https://makersden.io/blog/react-state-management-in-2025) — HIGH confidence
- [XState for Complex UI Logic in React — Dev.to](https://dev.to/patoliyainfotech/state-machines-in-react-xstate-for-complex-ui-logic-3lbc) — HIGH confidence
- [State Management Trap in React Native — Medium](https://medium.com/@md.alishanali/the-state-management-trap-killing-your-react-native-apps-in-2025-69ef47a51e4f) — MEDIUM confidence
- [Common Mistakes in Simulation Modeling — Software Solutions Studio](https://softwaresim.com/blog/common-mistakes-in-simulation-modeling-and-how-to-avoid-them/) — MEDIUM confidence
- [Gamification and Unconscious Bias in eLearning — eLearning Industry](https://elearningindustry.com/exploring-unconscious-bias-and-elearning-gamification) — MEDIUM confidence
- [Gamification Based Assessment and Test Anxiety — ResearchGate](https://www.researchgate.net/publication/337495775_Gamification_Based_assessment_A_Test_Anxiety_Reduction_through_Game_Elements_in_Quizizz_Platform) — LOW confidence (test anxiety findings don't directly map; used only to inform anti-test framing rationale)
- [Measuring Kirkpatrick Level 3 Behaviour — Tribal Habits](https://tribalhabits.com/measuring-kirkpatrick-level-3-behaviour/) — MEDIUM confidence

---

*Pitfalls research for: Experiential UX training platform — role-based SDLC simulation with cumulative scoring*
*Researched: 2026-03-23*
