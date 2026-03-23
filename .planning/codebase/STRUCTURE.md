# Codebase Structure

**Analysis Date:** 2026-03-23

## Directory Layout

```
project-root/
├── .planning/                    # GSD planning documents (added by orchestrator)
│   └── codebase/
├── .git/                         # Git repository
├── .vercel/                      # Vercel deployment config
├── public/                       # Static assets
│   ├── placeholder.svg
│   └── robots.txt
├── src/                          # Application source code
│   ├── components/               # React components
│   │   ├── ui/                  # Shadcn UI primitives (49 files)
│   │   ├── experiences/         # Learning experience modules
│   │   ├── common/              # Shared components
│   │   └── NavLink.tsx
│   ├── pages/                    # Page-level components
│   │   ├── Index.tsx            # Home page
│   │   └── NotFound.tsx         # 404 page
│   ├── lib/                      # Utilities
│   │   └── utils.ts             # Tailwind class merge utility
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-toast.ts
│   │   └── use-mobile.tsx
│   ├── App.tsx                  # Root application component
│   ├── main.tsx                 # Vite entry point
│   ├── App.css                  # App-level styles
│   ├── index.css                # Global styles
│   └── vite-env.d.ts            # Vite type definitions
├── dist/                         # Build output (generated)
├── node_modules/                # Dependencies (generated)
├── package.json                 # Project metadata and dependencies
├── package-lock.json            # Dependency lockfile
├── tsconfig.json                # TypeScript configuration
├── tsconfig.app.json            # App-specific TS config
├── tsconfig.node.json           # Build tool TS config
├── vite.config.ts               # Vite build configuration
├── .eslintrc.cjs                # ESLint configuration
└── README.md                    # Project documentation
```

## Directory Purposes

**src/components/ui:**
- Purpose: Shadcn UI component library (button, dialog, card, accordion, etc.)
- Contains: 49+ primitive UI components generated from shadcn templates
- Key files: `button.tsx`, `dialog.tsx`, `card.tsx`, `command.tsx`, `chart.tsx`

**src/components/experiences:**
- Purpose: All learning experience flows organized by audience and layer
- Contains: Experience controllers, journey modules, lesson screens, primer components
- Key subdirectories: `client/`, `internal/`, `layer15/`, `layer2/`

**src/components/experiences/client:**
- Purpose: Client/customer audience experience flow about UX design principles
- Contains: 18-step experience with primers (door, stove, ketchup), funnel simulations, lesson screens
- Key files:
  - `ClientExperience.tsx` - Master controller (410 lines)
  - `primer/*.tsx` - Interactive principle demonstrations
  - `ClientLayout.tsx` - Container component
  - `ClientDebugMenu.tsx` - Development tool

**src/components/experiences/client/primer:**
- Purpose: Interactive simulations of UX principles (signifiers, natural mapping, efficiency)
- Contains: Primer components (Door, Stove, Ketchup, Lesson screens) and funnel anti-patterns
- Examples: `ClientPrimerDoor.tsx`, `ClientFunnelBait.tsx` (bad UX), `ClientFunnelBaitGood.tsx` (corrected)

**src/components/experiences/internal:**
- Purpose: Internal team member experience with role-based learning journeys
- Contains: Role selection, onboarding modules, role-specific journeys, SDLC simulation
- Key files:
  - `InternalExperience.tsx` - Master controller with role routing
  - `DesignationSelect.tsx` - Role picker UI
  - `roles/` - Role-specific journey components (Sales, PM, Dev, QA, Designer, BA, Strategy)
  - `onboarding/` - Shared onboarding modules
  - `sales/` - Sales-specific content

**src/components/experiences/internal/roles:**
- Purpose: Role-specific SDLC simulations showing impact of design decisions
- Contains: 7 role journey components + unified RoleJourney.tsx router
- Examples: `CRMJourney.tsx`, `PMJourney.tsx`, `DeveloperJourney.tsx`
- Pattern: Each navigates role through project phases with decision points

**src/components/experiences/internal/onboarding:**
- Purpose: Shared onboarding for internal team before role selection
- Contains: Project brief, war room scenario, system reaction, decision lens, identity reflection
- Key files: `ProjectBrief.tsx`, `SlackWarRoom.tsx`, `SystemReaction.tsx`

**src/components/experiences/layer15:**
- Purpose: Pattern recognition and UX naming layer (bridge between layer 1 and 2)
- Contains: Components for teaching UX terminology and patterns
- Pattern: Likely experiential exercises, not fully analyzed

**src/components/experiences/layer2:**
- Purpose: SDLC simulation for design-to-delivery journey
- Contains: Multi-phase project simulation, decision tracking, debt accumulation
- Key files:
  - `SDLCContext.tsx` - Global state for project simulation
  - `Layer2Controller.tsx` - Phase manager
  - `Layer2Intro.tsx`, `Layer2Wrapper.tsx`, `Layer2Complete.tsx` - UI containers
  - `phases/` - Subdirectory with individual phase components

**src/components/experiences/layer2/phases:**
- Purpose: Individual SDLC phases (discovery, definition, design, dev, qa, launch)
- Contains: Phase-specific decision screens and consequence modeling
- Pattern: Each phase presents scenario, user selects action, state updates reflect consequences

**src/components/experiences/internal/experiential:**
- Purpose: Interactive experiential learning modules for internal team
- Contains: Video context, scenario-based learning
- Key files: `Act2_VideoContext.tsx`

**src/components/experiences/internal/visuals:**
- Purpose: Visual assets and diagrams for internal experience
- Contains: SVG/image-based components for illustrating concepts

**src/components/experiences/internal/sales:**
- Purpose: Sales-specific journey and learning modules
- Contains: SalesJourney.tsx + sales-context components

**src/components/common:**
- Purpose: Shared utility components across experiences
- Contains: DebugMenu (development tool for jumping between steps)
- Key files: `DebugMenu.tsx`

**src/pages:**
- Purpose: Top-level page components used by React Router
- Contains: Home (Index.tsx) and 404 (NotFound.tsx)

**src/lib:**
- Purpose: Utility functions and helpers
- Contains: `utils.ts` - Tailwind class name merging function (cn)
- Usage: `cn("text-white", "bg-black")` for conditional styling

**src/hooks:**
- Purpose: Custom React hooks
- Contains:
  - `use-toast.ts` - Toast notification hook (Sonner-based)
  - `use-mobile.tsx` - Mobile responsive detection hook

## Key File Locations

**Entry Points:**
- `src/main.tsx`: Vite entry point, mounts React root
- `src/App.tsx`: Root application component with domain routing
- `src/pages/Index.tsx`: Home page / landing page

**Configuration:**
- `vite.config.ts`: Build and dev server config (port 8080, componentTagger plugin)
- `tsconfig.json`: TypeScript compiler options with `@/*` path alias
- `package.json`: Project metadata, scripts (dev, build, lint), dependencies
- `.eslintrc.cjs`: Linting rules

**Core Logic:**
- `src/components/experiences/GlobalExperienceContext.tsx`: Layer progression system
- `src/components/experiences/layer2/SDLCContext.tsx`: SDLC simulation state
- `src/components/experiences/client/ClientExperience.tsx`: Client experience controller
- `src/components/experiences/internal/InternalExperience.tsx`: Internal experience controller

**Testing:**
- No test files found in codebase

## Naming Conventions

**Files:**
- PascalCase for component files: `ClientExperience.tsx`, `DesignationSelect.tsx`
- Lowercase with hyphens for utility/hook files: `use-toast.ts`, `utils.ts`
- Explicit naming: `ClientPrimerDoor.tsx`, `FunnelBait.tsx` (purpose clear from name)

**Directories:**
- Lowercase with hyphens: `src/components/ui/`, `src/lib/`
- PascalCase for experience layers: `src/components/experiences/` (directory) but `layer15/`, `layer2/` are lowercase
- Semantic grouping: `roles/`, `onboarding/`, `sales/` organized by concept

**Components:**
- PascalCase for component names: `ClientExperience`, `GlobalExperienceProvider`
- Context hooks prefixed with `use`: `useGlobalExperience()`, `useSDLC()`
- Step enums as string literals (union types): `type ClientStep = "intro" | "primer_door" | ...`
- Callback handlers prefixed with `on`: `onComplete()`, `onNext()`, `onSelect()`

**Types:**
- PascalCase with `State` or `Props` suffix: `GlobalExperienceState`, `ClientExperienceProps`
- Context interfaces: `GlobalExperienceContextType`, `SDLCContextType`
- Semantic type names: `UXDebt`, `PhaseDecision`, `RoleImpact`

**Variables/Constants:**
- camelCase: `currentLayer`, `maxUnlockedLayer`, `initialState`
- Boolean prefixed with `is`, `has`, `can`: `canAccessLayer()`, `isClientDomain`
- Event handlers: `setStep()`, `completeExperience()`, `addDecision()`

## Where to Add New Code

**New Experience (Client or Internal):**
- Create directory: `src/components/experiences/{audience}/{name}/`
- Create controller: `src/components/experiences/{audience}/{name}/{Name}Experience.tsx`
- Create layout wrapper: `src/components/experiences/{audience}/{name}/{Name}Layout.tsx`
- Register routes in: `src/App.tsx` (DomainWrapper routing logic)
- If global state needed: Create context in same directory, provide at root level

**New UI Component:**
- Use shadcn: `npx shadcn-ui@latest add {component}`
- Or create in: `src/components/ui/{component-name}.tsx`
- Export from: Component file, import in usage location

**New Screen/Step (within existing experience):**
- Create component: `src/components/experiences/{audience}/{experience}/{ScreenName}.tsx`
- Import in parent controller: `src/components/experiences/{audience}/{experience}/{Experience}Experience.tsx`
- Add step type to `type {Experience}Step` union
- Add case to step renderer: conditional JSX in AnimatePresence

**New Hook:**
- Create file: `src/hooks/use-{feature-name}.ts`
- Follow pattern of `use-toast.ts` (useCallback, useState, custom logic)
- Export default from hook file

**Shared Utilities:**
- Add to: `src/lib/utils.ts` (if universally used)
- Or create: `src/lib/{feature}.ts` for feature-specific utilities

**Context/Global State:**
- For layer progression: Extend `src/components/experiences/GlobalExperienceContext.tsx`
- For simulation state: Extend `src/components/experiences/layer2/SDLCContext.tsx`
- For new domain: Create new context file in relevant experience directory

## Special Directories

**dist/:**
- Purpose: Build output directory (generated by `npm run build`)
- Generated: Yes (by Vite)
- Committed: No (in .gitignore)

**node_modules/:**
- Purpose: Installed npm dependencies
- Generated: Yes (by npm install)
- Committed: No

**public/:**
- Purpose: Static assets copied to build root
- Generated: No
- Committed: Yes
- Contents: `placeholder.svg`, `robots.txt`

**.planning/codebase/:**
- Purpose: GSD codebase analysis documents
- Generated: Yes (by /gsd:map-codebase)
- Committed: Yes (reference for future phases)

**localStorage Keys:**
- `hcl_max_unlocked_layer`: Stores max unlocked layer ("layer1" | "layer1.5" | "layer2")
- Used by: GlobalExperienceContext for persistence across sessions

---

*Structure analysis: 2026-03-23*
