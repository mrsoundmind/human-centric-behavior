# Coding Conventions

**Analysis Date:** 2026-03-23

## Naming Patterns

**Files:**
- Component files: PascalCase (e.g., `ClientExperience.tsx`, `DiscoveryPhaseNew.tsx`)
- UI components: lowercase (e.g., `card.tsx`, `button.tsx`, `sidebar.tsx`)
- Hook files: camelCase with `use-` prefix (e.g., `use-toast.ts`, `use-mobile.tsx`)
- Context files: camelCase or PascalCase based on content (e.g., `SDLCContext.tsx`)
- Utility files: camelCase (e.g., `utils.ts`)
- Type files: coexist in component files or utility files
- CSS files: match component name (e.g., `App.css`)

**Functions:**
- Component functions: PascalCase (e.g., `ClientExperience`, `DiscoveryPhaseNew`, `StoryContext`)
- Regular functions: camelCase (e.g., `goToNextScreen`, `handleDiscoveryChoice`, `getWrapperStage`)
- Handler functions: `handle*` prefix (e.g., `handleDiscoveryChoice`, `handleChoice`)
- Getter/selector functions: `get*` or `is*` prefix (e.g., `getWrapperStage`, `useIsMobile`)
- Callback functions: `on*` prefix in props (e.g., `onComplete`, `onContinue`, `onChange`)

**Variables:**
- State variables: camelCase (e.g., `currentScreen`, `didDiscovery`, `briefGapsFound`)
- Constants: UPPER_SNAKE_CASE (e.g., `SCREEN_ORDER`, `TOAST_LIMIT`, `TOAST_REMOVE_DELAY`, `MOBILE_BREAKPOINT`)
- Boolean flags: `is*` or `did*` prefix (e.g., `isClientDomain`, `didDiscovery`, `isMobile`)
- Context/provider objects: descriptive names (e.g., `queryClient`, `memoryState`)

**Types:**
- Interface names: PascalCase with `Props` or descriptive suffix (e.g., `DiscoveryPhaseNewProps`, `StoryContextProps`, `ScreenProps`)
- Type aliases: PascalCase (e.g., `DiscoveryScreen`, `ClientStep`, `ToasterToast`, `Action`)
- Union types: descriptive names with type union syntax (e.g., `DiscoveryScreen = | "clientchat" | "teamchat"`)
- Generic type parameters: Single capital letters (e.g., `T`, `TFieldValues`, `TName`)

## Code Style

**Formatting:**
- No explicit formatter configuration detected
- Uses Vite with React/TypeScript (SWC for transpilation)
- Import statements remain unformatted by default
- Class names: mixed inline and `cn()` utility function for conditional Tailwind CSS

**Linting:**
- Tool: ESLint 9.32.0 with TypeScript support
- Config file: `eslint.config.js`
- Key rules:
  - `@typescript-eslint/no-unused-vars`: off (intentionally disabled)
  - `react-refresh/only-export-components`: warn with allowConstantExport
  - React Hooks rules enabled (`react-hooks/recommended`)
  - ES2020 target, browser globals

## Import Organization

**Order:**
1. React/external libraries (e.g., `import { useState } from "react"`)
2. Framer Motion and third-party UI libraries (e.g., `import { motion } from "framer-motion"`)
3. Internal components and hooks (e.g., `import { ClientLayout } from "./ClientLayout"`)
4. Utilities and context (e.g., `import { useSDLC } from "../SDLCContext"`)
5. Type imports (e.g., `import type { ClassValue } from "clsx"`)

**Path Aliases:**
- `@` = `src/` directory
- Used consistently in imports: `import { useToast } from "@/components/ui/use-toast"`
- Configured in `vite.config.ts` and `tsconfig.app.json`

## Error Handling

**Patterns:**
- Context hook guards: throw descriptive errors when hook used outside provider
  ```typescript
  throw new Error("useFormField should be used within <FormField>");
  throw new Error("useSidebar must be used within a SidebarProvider.");
  ```
- No try-catch blocks detected in main application code
- Error states appear to be handled through conditional rendering and state flags
- Data validation uses Zod schema validation (available as dependency)

## Logging

**Framework:** console (no custom logging abstraction detected)

**Patterns:**
- Limited logging observed in codebase
- Focus is on state-driven rendering and user interactions
- Debug menus provide visual feedback instead of console logging (e.g., `ClientDebugMenu`)

## Comments

**When to Comment:**
- Inline comments used for business logic clarity
- Example: `// Skip comparison screen if user did discovery (it's only for the "skipped" path)`
- Comments in Screen type definitions explain purpose: `// Screen types for Design Phase`
- JSDoc minimal usage detected (one JSDoc comment found in `LayerSwitcher.tsx`)

**JSDoc/TSDoc:**
- Not widely used in codebase
- Type definitions are explicit in interface declarations
- Component props documented through TypeScript interfaces

## Function Design

**Size:**
- Component functions: 40-3000+ lines (varies significantly)
- Large components: broken into internal subcomponents (e.g., `StoryContext`, `ClientChatScreen` within phase components)
- Helper functions: typically 5-30 lines

**Parameters:**
- Destructured in function signature: `({ onComplete, initialScreen }: DiscoveryPhaseNewProps)`
- Props interfaces define shape explicitly
- Callbacks as last parameters in destructuring

**Return Values:**
- Components return JSX (React.ReactNode)
- Hooks return objects with state/dispatch methods
- Pure functions return computed values or JSX elements
- Reducers return new state objects

## Module Design

**Exports:**
- Named exports for constants: `export const SCREEN_ORDER = [...]`
- Default exports for components: `export default App`
- Named exports for utils: `export function cn(...inputs: ClassValue[])`
- Named exports for hooks: `export { useToast, toast }`
- Re-export patterns in UI component files (e.g., barrel exports)

**Barrel Files:**
- Not extensively used
- `src/lib/utils.ts` is minimal (single utility function)
- UI components imported individually, not through a barrel
- Context and hooks imported from specific files

---

*Convention analysis: 2026-03-23*
