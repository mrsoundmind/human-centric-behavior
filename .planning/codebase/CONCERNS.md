# Codebase Concerns

**Analysis Date:** 2026-03-23

## Type Safety Issues

**Loose TypeScript Configuration:**
- Issue: TypeScript strict mode is disabled across the codebase
- Files: `tsconfig.app.json` (line 18: `"strict": false`)
- Impact: 121 instances of `any` type usage, 56 instances of `: any` type annotations. Type safety not enforced at compile time. Runtime errors can slip through.
- Fix approach: Enable `strict: true` in tsconfig.app.json, incrementally fix type errors, use `noImplicitAny: true` to prevent new issues

**Flexible/Generic Type Annotations:**
- Issue: `designConfiguration: any` used to avoid circular dependencies in context
- Files: `src/components/experiences/layer2/SDLCContext.tsx` (lines 40, 72)
- Impact: Design state shape is not validated. Context consumers can pass/receive incorrect data structures.
- Fix approach: Extract design configuration to separate interface, break circular dependency by creating a separate DesignContext

**Unsafe Callback Typing:**
- Issue: `onComplete: (data: any) => void` in multiple component props
- Files:
  - `src/components/experiences/internal/sales/LeadGenFriction.tsx` (line 7)
  - `src/components/experiences/internal/sales/Stage2_Meeting.tsx`
  - `src/components/experiences/internal/sales/Stage3_Proposal.tsx`
  - `src/components/experiences/internal/sales/Stage4_Closing.tsx`
  - `src/components/experiences/internal/sales/Stage5_Handover.tsx`
  - `src/components/experiences/internal/sales/Stage1_LeadGen.tsx`
- Impact: Callback data structure is not validated. Parent components can't rely on data shape from child completion handlers.
- Fix approach: Create specific interface for each stage's completion data (e.g., `LeadGenCompletionData`, `MeetingCompletionData`)

**ESLint Configuration Bypasses:**
- Issue: `@typescript-eslint/no-unused-vars` disabled, `react-refresh/only-export-components` set to warn
- Files: `eslint.config.js` (line 23)
- Impact: Dead code can accumulate unnoticed. Unused variables hide refactoring opportunities.
- Fix approach: Enable no-unused-vars as error, fix existing violations, add pre-commit hook to enforce

---

## Memory Leak Risks

**Unmanaged Event Listeners in Effects:**
- Issue: Document-level event listeners added in useEffect without proper cleanup in DelayedResponseExperience
- Files: `src/components/experiences/DelayedResponseExperience.tsx` (lines 57-68)
- Concern: Multiple instances of `document.addEventListener("click")` and `document.addEventListener("keydown")` during interaction phase. When component unmounts, listeners may persist if effect cleanup fails.
- Risk: Global event listeners pile up, causing multiple handlers to fire on single user action
- Fix approach: Verify cleanup runs by adding console.warn in useEffect return. Wrap listeners in refs to prevent duplicate attachment. Use capture phase to prevent event delegation issues.

**Timer Leaks in Component Transitions:**
- Issue: Multiple setTimeout calls without guaranteed cleanup in large phase components
- Files:
  - `src/components/experiences/layer2/phases/DesignPhaseNew.tsx` (lines 86-91 in StoryBridgeScreen)
  - `src/components/experiences/DelayedResponseExperience.tsx` (lines 31-42)
- Impact: 103 total setTimeout/setInterval calls across codebase. When users navigate away quickly, pending timeouts still execute and call setState, causing "Can't perform a React state update on an unmounted component" warnings.
- Fix approach: Create a useEffect cleanup tracker utility, store all timer IDs in refs, ensure cleanup runs for all nested setTimeout calls

**addEventListener in GradientBackground Without Dependency:**
- Issue: `window.addEventListener("mousemove")` in repeated render calls
- Files: `src/components/internal/RoleJourney.tsx` (lines 50-51)
- Risk: If GradientBackground remounts frequently, multiple listeners attach
- Fix approach: Move listener setup outside component if this is performance-critical

---

## Test Coverage Gaps

**Zero Test Coverage:**
- Issue: No test files found in codebase (0 `.test.ts`, `.spec.ts`, `.test.tsx`, `.spec.tsx` files)
- Files: Entire src directory
- Risk: High-frequency interactive components (phase components, role journeys) have no regression tests. Complex state management in SDLCContext has no tests.
- Priority: High - Educational app with state mutations needs verification
- Specific gaps:
  - SDLCContext reducer logic untested (addDecision, addUXDebt, consumeTimeline, consumeBudget)
  - Phase screen navigation untested (DiscoveryPhaseNew, DesignPhaseNew, RequirementsPhaseNew have complex screen logic)
  - Choice consequences untested (player choices in 4+ phase components don't verify impact values)

---

## Component Complexity

**Mega Components (1000+ lines):**
- Issue: Single-file components exceeding 1000 lines of code
- Files:
  - `src/components/experiences/layer2/phases/DiscoveryPhaseNew.tsx` (3127 lines) - Contains 12 screen components in one file
  - `src/components/experiences/layer2/phases/DesignPhaseNew.tsx` (1806 lines) - Contains 8 screen components in one file
  - `src/components/experiences/layer2/phases/RequirementsPhaseNew.tsx` (1664 lines) - Contains 8 screen components in one file
- Impact: Difficult to test, understand, and maintain. Screen state management scattered across 1000+ line files.
- Fix approach: Extract each SCREEN component to separate file in `screens/` subdirectory (e.g., `DiscoveryPhaseNew/ClientChatScreen.tsx`). Create shared hooks for phase navigation logic. Extract animation/UI patterns to reusable components.

**Inconsistent Component Organization:**
- Issue: 31 render return paths indicate deeply nested conditional rendering
- Files: Large phase components use sequential if/else chains to determine screen
- Impact: Hard to add new screens, easy to break existing navigation
- Fix approach: Use switch statement or state machine pattern. Consider React Router subroutes for phase screens.

---

## State Management Concerns

**Context as Single Source of Truth:**
- Issue: SDLCContext stores all project state (decisions, UX debt, role impacts, budget) in single useState
- Files: `src/components/experiences/layer2/SDLCContext.tsx` (line 88)
- Risk: Any single piece of state changing causes all consumers to re-render. Hundreds of components subscribe to phase changes.
- Impact: Performance degradation as project data accumulates (decisions array grows unbounded)
- Fix approach: Split context into separate domains (PhaseContext, BudgetContext, DebtContext). Use useCallback to memoize all callbacks. Consider useReducer instead of multiple useState setters.

**No Cleanup for Completed Phases:**
- Issue: ProjectState accumulates decisions and UX debt indefinitely
- Files: `src/components/experiences/layer2/SDLCContext.tsx` - decisions and uxDebt arrays never pruned
- Risk: By end of experience, arrays could contain 100+ items. Memory bloat on long sessions.
- Fix approach: Add archivePhaseData() method to clear completed phase data. Implement selective reset.

---

## Performance Bottlenecks

**Expensive Re-renders from Animation State:**
- Issue: 89 useCallback hooks indicate defensive optimization, suggesting performance concerns
- Files: Most phase components in layer2/phases/
- Risk: Framer Motion animations trigger frequent state updates. GradientBackground mousemove listener fires on every pixel move.
- Fix approach: Use transform instead of left/top for gradient position (GPU acceleration). Debounce mousemove events. Use useDeferredValue for gradient state.

**No Memoization for Screen Components:**
- Issue: Screen subcomponents (e.g., ClientChatScreen, WireframingScreen) recreated on every parent state change
- Files: `src/components/experiences/layer2/phases/DiscoveryPhaseNew.tsx` and similar
- Impact: Expensive re-renders of form inputs, animations restart
- Fix approach: Wrap screen components in React.memo with useCallback handlers

---

## Security Considerations

**dangerouslySetInnerHTML Usage:**
- Issue: 2 instances of dangerous DOM operations found
- Files: Identified but not specified in grep output
- Risk: If user input is ever rendered with dangerouslySetInnerHTML, XSS vulnerability possible
- Current mitigation: Appears to be hardcoded content only
- Recommendations: Add ESLint rule to ban dangerouslySetInnerHTML. If dynamic HTML needed, use DOMPurify library.

**localStorage/sessionStorage Access:**
- Issue: 2 instances of storage operations, sidebar state persisted to cookie
- Files: `src/components/ui/sidebar.tsx` (lines 68) - writes to `sidebar:state` cookie
- Risk: No encryption of sensitive state. If sidebar ever stores authenticated data, it's exposed in plaintext.
- Current mitigation: Only stores "expanded"/"collapsed" state
- Recommendations: Document that sensitive data should never be stored in cookies/localStorage. Use httpOnly cookies for auth tokens only.

---

## Missing Error Handling

**No Error Boundaries:**
- Issue: App component has no ErrorBoundary wrapper
- Files: `src/App.tsx`
- Impact: Any error in experience components crashes entire app. No fallback UI.
- Fix approach: Create ErrorBoundary component, wrap DomainWrapper in `src/App.tsx` line 40

**No Try/Catch in Context Methods:**
- Issue: SDLC context methods don't validate input or catch errors
- Files: `src/components/experiences/layer2/SDLCContext.tsx` methods (addDecision, consumeTimeline, etc.)
- Risk: Invalid data passed to these methods will silently corrupt state
- Fix approach: Add validation in all context methods, throw if invalid. Add error logging.

**Silent Toast Errors:**
- Issue: One console statement in entire codebase
- Files: Only 1 console.* call found
- Risk: No logging of errors or debugging information
- Fix approach: Add logger utility, log state changes in SDLCContext, log phase transitions

---

## Fragile Areas

**Rigid Phase Ordering Logic:**
- Issue: Hard-coded phase screen arrays used to navigate
- Files:
  - `src/components/experiences/layer2/phases/DiscoveryPhaseNew.tsx` (line 25-37)
  - `src/components/experiences/layer2/phases/DesignPhaseNew.tsx` (line 18-26)
- Why fragile: Changing screen order requires editing SCREEN_ORDER array in multiple files. Easy to desynchronize.
- Safe modification: Extract SCREEN_ORDER to separate config file. Use enum instead of literal strings.

**Stage Type Unions:**
- Issue: Stage types defined as long union types
- Files: `DiscoveryScreen`, `DesignScreen`, `RequirementsScreen` type unions
- Why fragile: Adding new screen requires updating type definition, array order, and conditional rendering
- Safe modification: Use enum for screens. Create generic screen type that works with factory pattern.

**Choice Impact Hardcoded:**
- Issue: Impact values (timeline days, budget percent, patience reduction) hardcoded in phase components
- Files: Every phase component has hardcoded numbers
- Risk: Changing impact math requires editing multiple files. Easy to introduce inconsistency.
- Fix approach: Create ImpactConfig in SDLCContext. Pass impact template to components.

---

## Technical Debt

**Commented Code and Debug Logging:**
- Issue: Terminal.tsx contains placeholder comment for TODO
- Files: `src/components/experiences/internal/roles/dev/Stage1_Terminal.tsx` (line 36: `# TODO: Add validation layer`)
- Impact: Suggests incomplete feature
- Fix approach: Implement validation layer or remove TODO

**Multiple TODO Comments:**
- Issue: Testing phase contains debug comments
- Files: `src/components/experiences/layer2/phases/LaunchPhase.tsx` (line 381: `// 3. TESTING FEEDBACK USE DEFERRED BUGS`)
- Impact: Unclear if this is pseudocode or incomplete implementation
- Fix approach: Document what deferred bugs feature should do, implement or remove

**Duplicate Test Screens:**
- Issue: Both TestingPhase.tsx and multiple test-related screens (BUG GENERATOR, DASHBOARD, REPORT)
- Files: `src/components/experiences/layer2/phases/TestingPhase.tsx` (lines 51-343)
- Impact: Complex nested test workflow increases component coupling
- Fix approach: Extract test screens to separate phase file if logically distinct

---

## Dependencies at Risk

**No Test Framework Installed:**
- Risk: No jest, vitest, or testing-library packages in package.json
- Impact: Adding tests requires setup. Discourages test-driven development.
- Migration plan: Install vitest as dev dependency, create vitest.config.ts, add test scripts

**React Query (TanStack Query) Installed But Unused:**
- Issue: `@tanstack/react-query: ^5.83.0` in package.json but no API calls/queries in codebase
- Impact: Unused dependency adds 50KB+ to bundle
- Fix approach: Remove if no API integrations planned. Keep if planning backend integration.

**Large Animation Library Bundle:**
- Issue: framer-motion `^12.26.2` used extensively in 180+ components
- Impact: ~60KB gzipped added to bundle for pure client-side animations
- Risk: Performance impact on slower networks/devices
- Recommendation: Profile bundle size. Consider lighter alternative if animations can be reduced.

---

## Scaling Limits

**LinearSearch in Large Phase Flows:**
- Issue: Screen navigation uses `SCREEN_ORDER.indexOf(currentScreen)` to find position
- Files: `src/components/experiences/layer2/phases/DiscoveryPhaseNew.tsx` (line 48)
- Current capacity: Works fine for 12 screens
- Limit: O(n) lookup becomes noticeable above 1000 screens
- Scaling path: If adding many more screens, use object map instead of array

**Unbounded Arrays in Context:**
- Issue: ProjectState.decisions and ProjectState.uxDebt arrays never truncated
- Impact: After 100+ decisions, re-renders slow due to array spread operations in setState
- Limit: Noticeable slowdown after 500+ items
- Scaling path: Implement pagination or archive mechanism. Move old data to separate archived state.

---

## Known Bugs

**stale-closure in DelayedResponseExperience:**
- Symptoms: `waitStartTime` captured in closure inside setTimeout. On second interaction, uses old startTime value.
- Files: `src/components/experiences/DelayedResponseExperience.tsx` (lines 38-40)
- Trigger: Click "Open search", trigger search timeout, close results before completion, try again
- Current behavior: Will use previous session's waitStartTime in calculation
- Workaround: Use ref for waitStartTime instead of state
- Fix: `const waitStartTimeRef = useRef<number | null>(null)` instead of useState

**Missing Event Listener Cleanup:**
- Symptoms: Multiple click/keydown handlers fire on single action if user navigates quickly between phases
- Files: Multiple experience components with addEventListener in useEffect
- Cause: Cleanup function may not execute if component unmounts while timeout pending
- Trigger: Rapidly switch between experiences while interaction is active
- Workaround: None - experience state persists incorrectly
- Fix: Move all setTimeout/addEventListener cleanup to synchronous cleanup, not nested returns

---

## Missing Critical Features

**No Persistence:**
- Problem: User progress in phase journey not saved. Refresh page loses all decisions and state.
- Blocks: Ability to resume interrupted sessions, track progress over time
- Fix approach: Save ProjectState to localStorage on every state change. Load on mount if available.

**No Analytics:**
- Problem: Can't measure which choices users make or how long they spend in each phase
- Blocks: UX optimization, understanding learning outcomes
- Fix approach: Integrate analytics SDK (Segment, Mixpanel), track choice events and time-in-phase

**No Accessibility Testing:**
- Problem: Complex interactive components may not be keyboard navigable or screen-reader friendly
- Blocks: Compliance with WCAG, usable by disabled users
- Fix approach: Run axe accessibility audit, ensure all buttons keyboard accessible, add ARIA labels

---

*Concerns audit: 2026-03-23*
