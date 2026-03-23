# Testing Patterns

**Analysis Date:** 2026-03-23

## Test Framework

**Runner:**
- Not detected
- No test framework configuration found (no `jest.config.*`, `vitest.config.*`, `cypress.config.*`)
- No test dependencies in package.json

**Assertion Library:**
- Not detected

**Run Commands:**
```bash
# No test command configured in package.json
# Available commands are:
npm run dev              # Start development server
npm run build            # Build for production
npm run build:dev        # Build in development mode
npm run lint             # Run ESLint checks
npm run preview          # Preview production build
```

## Test File Organization

**Location:**
- No test files found in codebase
- Glob pattern search for `**/*.test.*` and `**/*.spec.*` returned no results

**Naming:**
- Not applicable - no tests present

**Structure:**
- Not applicable - no tests present

## Test Structure

**Suite Organization:**
- Not applicable - no tests present

**Patterns:**
- No testing patterns established

## Mocking

**Framework:**
- Not configured

**Patterns:**
- Not applicable - no tests present

**What to Mock:**
- Not established

**What NOT to Mock:**
- Not established

## Fixtures and Factories

**Test Data:**
- Not applicable - no tests present

**Location:**
- Not applicable - no tests present

## Coverage

**Requirements:**
- None enforced - no testing infrastructure

**View Coverage:**
- Not available

## Test Types

**Unit Tests:**
- Not implemented
- Components like `DiscoveryPhaseNew.tsx` (3127 lines), `DesignPhaseNew.tsx` (1806 lines), and utility functions could benefit from unit test coverage

**Integration Tests:**
- Not implemented
- Context usage patterns (e.g., `useSDLC()`) could be candidates for integration tests

**E2E Tests:**
- Not implemented
- No E2E framework configured
- Could benefit from E2E tests for user journeys (e.g., `ClientExperience`, `InternalExperience`)

## Testing Status

**Current State:**
- **No automated testing infrastructure is in place**
- Codebase relies entirely on manual testing and runtime behavior
- ESLint provides static code analysis only

**Areas Without Test Coverage:**
- State management functions (e.g., reducer logic in `use-toast.ts`)
- Hook implementations (`useToast`, `useIsMobile`)
- Component logic (phase transitions, decision handling)
- Conditional rendering based on state
- Context provider behavior
- Error boundary scenarios

**Fragile Areas Needing Tests:**
1. **`src/hooks/use-toast.ts`** - Complex state reducer without test coverage
   - Multiple action types (ADD_TOAST, UPDATE_TOAST, DISMISS_TOAST, REMOVE_TOAST)
   - Side effects with setTimeout management
   - Listener pattern for state updates

2. **`src/components/experiences/layer2/phases/DiscoveryPhaseNew.tsx`** - Large component with business logic
   - Screen navigation logic
   - Conditional screen skipping
   - Decision tracking and UX debt recording

3. **`src/components/experiences/layer2/phases/DesignPhaseNew.tsx`** - Similar patterns
   - Screen ordering and transitions
   - State-dependent rendering

4. **`src/App.tsx`** - Domain routing logic
   - Subdomain detection
   - Route configuration
   - Provider setup

**Recommended Testing Approach:**

For a React/TypeScript project with Vite and no existing test infrastructure, consider:

1. **Start with Vitest:**
   ```bash
   npm install --save-dev vitest @vitest/ui happy-dom
   ```

2. **For component testing, add Testing Library:**
   ```bash
   npm install --save-dev @testing-library/react @testing-library/jest-dom
   ```

3. **For state logic (hooks/reducers):**
   - Vitest with simple object/function tests
   - Example for reducer function in `use-toast.ts`:
   ```typescript
   import { describe, it, expect } from 'vitest';
   import { reducer } from './use-toast';

   describe('toast reducer', () => {
     it('should add toast to state', () => {
       const initialState = { toasts: [] };
       const action = { type: 'ADD_TOAST' as const, toast: { id: '1', open: true } };
       const result = reducer(initialState, action);
       expect(result.toasts).toHaveLength(1);
     });
   });
   ```

4. **For components:**
   - React Testing Library with Vitest
   - Example for `DiscoveryPhaseNew`:
   ```typescript
   import { render, screen } from '@testing-library/react';
   import userEvent from '@testing-library/user-event';
   import { DiscoveryPhaseNew } from './DiscoveryPhaseNew';

   describe('DiscoveryPhaseNew', () => {
     it('should render initial screen', () => {
       const mockOnComplete = vi.fn();
       render(<DiscoveryPhaseNew onComplete={mockOnComplete} />);
       expect(screen.getByText(/clientchat/i)).toBeInTheDocument();
     });
   });
   ```

5. **Configuration file example** (`vitest.config.ts`):
   ```typescript
   import { defineConfig } from 'vitest/config';
   import react from '@vitejs/plugin-react-swc';
   import path from 'path';

   export default defineConfig({
     plugins: [react()],
     test: {
       globals: true,
       environment: 'happy-dom',
       setupFiles: [],
     },
     resolve: {
       alias: {
         '@': path.resolve(__dirname, './src'),
       },
     },
   });
   ```

---

*Testing analysis: 2026-03-23*
