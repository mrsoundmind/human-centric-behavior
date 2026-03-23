# Architecture

**Analysis Date:** 2026-03-23

## Pattern Overview

**Overall:** Multi-layered experiential learning application with domain-based routing and contextual state management.

**Key Characteristics:**
- Client-side SPA with React 18 and TypeScript
- Vite-driven development with component-tagging during development
- Client and Internal experience flows separated by domain/routing logic
- Global context systems managing progression through tiered learning layers
- Framer Motion for smooth transitions between experience stages
- Shadcn UI component library with Tailwind CSS styling

## Layers

**Presentation Layer:**
- Purpose: Render UI components, manage animations, capture user interactions
- Location: `src/components/`
- Contains: React components, UI primitives (shadcn), experience modules
- Depends on: React, framer-motion, hooks, utilities
- Used by: Router

**Experience Layer:**
- Purpose: Define multi-step interactive experiences (Client, Internal, Layer 1/1.5/2)
- Location: `src/components/experiences/`
- Contains: Experience controllers, journey flows, lesson modules
- Depends on: Presentation, context systems, animations
- Used by: App routing logic

**State Management Layer:**
- Purpose: Persist and manage progression through learning layers and experiences
- Location: `src/components/experiences/GlobalExperienceContext.tsx`, `src/components/experiences/layer2/SDLCContext.tsx`
- Contains: React Context providers, state hooks, localStorage persistence
- Depends on: React hooks
- Used by: Experience components

**Routing Layer:**
- Purpose: Map domains and paths to experiences
- Location: `src/App.tsx`
- Contains: Domain detection logic, React Router configuration
- Depends on: React Router, experience components, context
- Used by: Entry point

**Utility Layer:**
- Purpose: Provide reusable helpers and configuration
- Location: `src/lib/utils.ts`, `src/hooks/`
- Contains: Class name merging (cn), custom hooks (use-toast, use-mobile)
- Depends on: Third-party libraries
- Used by: All components

## Data Flow

**User Entry → Domain Detection:**

1. User accesses application at `main.tsx`
2. App.tsx detects hostname (e.g., `client.domain.com` or `/client` path)
3. DomainWrapper component routes to appropriate experience

**Experience Progression:**

1. User starts experience (Client, Internal, or Layer 1)
2. Experience state tracked in GlobalExperienceContext (layer unlock system)
3. Context triggers unlock of next layer when completion criteria met (e.g., 2+ completed experiences in layer1 → unlock layer1.5)
4. User advances through phases, each phase updates context state
5. localStorage persists max unlocked layer across sessions

**Layer 2 SDLC Simulation:**

1. SDLCContext tracks project state (budget, timeline, complexity, UX debt)
2. Each phase decision in Layer 2 adds UX Debt and impacts role-specific pain
3. Decisions consume timeline/budget, increase complexity
4. Escalation or "No Good Option" scenario triggered by threshold breaches
5. Final state reflects cumulative impact of decisions

**State Management:**

- GlobalExperienceContext: Layer access control, experience completion tracking
- SDLCContext: Project evolution, debt accumulation, consequence modeling
- Component-level useState: Step progression, local UI state
- localStorage: Layer 1.5 and Layer 2 unlock state persistence (key: `hcl_max_unlocked_layer`)

## Key Abstractions

**Experience:**
- Purpose: A complete interactive journey (e.g., ClientExperience, InternalExperience)
- Examples: `src/components/experiences/client/ClientExperience.tsx`, `src/components/experiences/internal/InternalExperience.tsx`
- Pattern: useState-driven step machine with AnimatePresence for transitions

**Primer Component:**
- Purpose: Interactive physical demonstration of UX principle (door, stove, ketchup bottle)
- Examples: `src/components/experiences/client/primer/*.tsx`
- Pattern: Interactive React component with immediate visual feedback, then lesson screen

**Lesson Screen:**
- Purpose: Textual explanation of principle and its business/user impact
- Examples: ClientPrimerLesson shows principle, mechanic, and revenue impact
- Pattern: Narrative screen with structured sections (Principle, Impact, Mechanic)

**Role Journey:**
- Purpose: Role-specific SDLC simulation for internal team members (Sales, PM, Dev, QA, Designer, BA, Strategy)
- Examples: `src/components/experiences/internal/roles/*.tsx`
- Pattern: Role-specific phase progression with decision points affecting project state

**Decision Point:**
- Purpose: Branch logic where user choice impacts project state, UX debt, and outcomes
- Pattern: Two or more action buttons, each calling addDecision() and consuming resources

## Entry Points

**main.tsx:**
- Location: `src/main.tsx`
- Triggers: Browser navigation to app URL
- Responsibilities: Render React root, mount App component

**App.tsx (DomainWrapper):**
- Location: `src/App.tsx`
- Triggers: App initialization after root render
- Responsibilities:
  - Detect domain (client.domain.com vs main domain)
  - Route to ClientExperience if client subdomain detected
  - Provide QueryClientProvider (React Query)
  - Provide TooltipProvider, Toaster (UI notifications)
  - Set up BrowserRouter with internal routes (/client, /internalteam)

**Pages:**
- `src/pages/Index.tsx`: Home/landing page entry (renders from "/" route)
- `src/pages/NotFound.tsx`: 404 fallback (renders from "*" route)

**Experiences:**
- `src/components/experiences/client/ClientExperience.tsx`: Client experience flow (17 steps + intro)
- `src/components/experiences/internal/InternalExperience.tsx`: Internal team experience with role selection

## Error Handling

**Strategy:** Try-catch not extensively used; context hooks throw errors if used outside providers

**Patterns:**
- Context hook error boundary: useGlobalExperience() throws if GlobalExperienceProvider not wrapping
- No error boundaries defined in codebase (app will hard crash on unhandled errors)
- localStorage access is unguarded (could fail on quota exceeded or privacy mode)
- React Query QueryClient created without error handling config

## Cross-Cutting Concerns

**Logging:** None detected. No logging framework (console.log could be used but isn't in provided files)

**Validation:**
- No form validation library in place (Zod is installed but not used in analyzed files)
- Step progression controlled via type-safe string literals (TypeScript enums-like)

**Authentication:**
- None detected. This is a public educational experience
- No session management or user identity tracking

**Styling:**
- Tailwind CSS for all styling
- shadcn/ui component library provides design system
- Framer Motion for animation primitives
- Global color scheme using CSS variables (indigo, purple, pink, white/gray)

**Analytics:**
- TanStack React Query installed but no tracking of user interactions
- Metrics captured in ClientExperience component (time, clicks, attempts) but not persisted/sent

**API/Data:**
- No backend API calls detected
- All state is frontend-only (localStorage for persistence)
- React Query installed but unused in analyzed code

---

*Architecture analysis: 2026-03-23*
