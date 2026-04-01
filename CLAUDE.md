# Zyxware Human-Centric Lab (HCL)

## What This App Is

An **experiential learning platform** built by Zyxware Technologies that teaches people how design choices impact software delivery, teams, budgets, and end-users. It is NOT a training portal or course — it is an immersive experience where users feel UX friction firsthand, then connect those feelings to real-world software delivery consequences.

**Tagline:** "This is not training. This is an experience."
**Promise:** "You won't be tested. You won't be scored. You will simply notice things differently after."

---

## Who This Is For

### 1. Internal Teams (Zyxware Staff)
Accessible at `/internalteam`. Every role in the software delivery chain has a tailored journey:
- **Sales** — Understand how UX quality affects deal closure and client trust
- **CRM** — See how design decisions impact customer relationships and retention
- **Product Managers** — Experience how UX debt compounds across sprints and phases
- **Developers** — Feel the downstream cost of unclear specs and design debt
- **QA** — Understand why bugs originate from design, not just code
- **Designers** — See how their choices ripple through development, testing, launch
- **Strategy** — Connect UX decisions to business outcomes, timelines, budgets
- **Business Analysts** — Experience how requirement ambiguity creates UX friction

### 2. External Clients (B2B Software Companies)
Accessible at `/client` or via `client.` subdomain. Teaches clients:
- Why design matters to their software product's revenue
- Physical-world design principles (signifiers, natural mapping, efficiency)
- How digital products misapply these principles (dark patterns, friction)
- Revenue impact of good vs. bad design

### 3. General Audience
The root path `/` serves the main experience (Layer 1 → 1.5 → 2 progression) for anyone building software.

---

## What The App Achieves

### For Internal Teams
- Cross-functional empathy: each role sees the same project problem from their perspective
- UX literacy: staff learn to name and recognize design patterns/anti-patterns
- Delivery awareness: everyone understands how design choices cascade through SDLC
- Reduced rework: teams catch UX issues earlier when they understand friction

### For Clients
- Business case for UX investment: clients see revenue impact of design decisions
- Shared vocabulary: clients and Zyxware teams can discuss UX using the same language
- Trust building: demonstrates Zyxware's depth of UX expertise
- Faster project alignment: clients arrive at kickoff with better UX understanding

---

## The Three-Layer Architecture (Core Concept)

The entire app is built around **three progressive layers of understanding**. Users cannot skip ahead — each layer unlocks the next.

### Layer 1: "FEEL" — Experience Friction Firsthand
Five interactive moments that create visceral frustration:

1. **Door Experience** (`DoorExperience.tsx`)
   - Context: "You're rushing to a meeting, 15 seconds late"
   - Interaction: A door with ambiguous push/pull — push fails (shake animation), pull succeeds
   - Teaches: Signifiers matter — visual cues tell users what to do without reading

2. **Silent Button Experience** (`SilentButtonExperience.tsx`)
   - Context: "Submit a simple form"
   - Interaction: Button processes silently for 4 seconds with ZERO feedback
   - Tracks: Click count, click timestamps (measures anxiety behavior)
   - Teaches: Feedback is essential — silence creates uncertainty and frustration

3. **Confusing Form Experience** (`ConfusingFormExperience.tsx`)
   - Context: "Enter your phone number"
   - Interaction: Expects exact format `+91 XXXXX XXXXX` with no visible hint
   - Mechanics: Cryptic error messages that don't explain the expected format
   - Teaches: Validation must be clear, forgiving, and guide users toward success

4. **Delayed Response Experience** (`DelayedResponseExperience.tsx`)
   - Context: "Quick search"
   - Interaction: Search takes 8 seconds with NO loading indicator
   - Tracks: User frustration behaviors (extra clicks, typing during wait)
   - Teaches: Loading feedback is critical for user patience and trust

5. **Pattern Pause** (`PatternPause.tsx`)
   - Reflection moment: "Different situations. Different systems. Same feeling."
   - Connects all 5 experiences into a unified insight about friction

**Unlock rule:** Layer 1.5 unlocks after completing 2+ Layer 1 experiences.

### Layer 1.5: "UNDERSTAND" — Recognize Patterns
Two phases that build UX vocabulary:

1. **Pattern Recognition Phase** (`PatternRecognitionPhase.tsx`)
   - Shows 4 common UX patterns that cause friction:
     - **Defaults** — Pre-checked newsletter boxes
     - **Constraints** — Overly complex password requirements
     - **Timing** — Popup interruptions at the wrong moment
     - **Information** — Costs revealed late in a flow
   - Users reveal and reflect on each pattern

2. **UX Naming Phase** (`UXNamingPhase.tsx`)
   - Users learn vocabulary to name and discuss design patterns
   - Enables recognition of these patterns in their real work

**Unlock rule:** Layer 2 unlocks after completing UX Naming phase.

### Layer 2: "APPLY" — SDLC Simulation
A full project simulation called **"Client Portal Redesign"** where users make decisions across every SDLC phase and watch consequences unfold.

**Simulated project metrics tracked in real-time:**
- Timeline: 90 days (consumed by each phase)
- Budget: 100% (reduced by decisions)
- Stakeholder Patience: 0-100% (affected by delays, rework)
- Complexity Score: Accumulates with each poor decision
- UX Debt: Progresses through `hidden → surfacing → visible`
- Role Impacts: Shows how each role (BA, Dev, QA, PM, Client) is affected

**SDLC Phases (in order):**

| Phase | File | Screens | What Happens |
|-------|------|---------|-------------|
| Intro | `Layer2Intro.tsx` | 1 | Sets the project context |
| Discovery | `DiscoveryPhaseNew.tsx` | 8 | Client chat, team chat, email, brief, persona, pressure, consequence, comparison |
| Requirements | `RequirementsPhaseNew.tsx` | 8 | Scope definition, trade-offs |
| Design | `DesignPhaseNew.tsx` | 8 | Design choices with cascading consequences |
| Development | `DevelopmentPhase.tsx` | 6 | Building with accumulated decisions |
| Testing | `TestingPhase.tsx` | 4 | QA, bugs from earlier decisions surface |
| Launch | `LaunchPhase.tsx` | 4 | Go-live with accumulated debt |
| Maintenance | `MaintenancePhase.tsx` | 3 stages | Context → Interaction → Reflection |
| Complete | `Layer2Complete.tsx` | 1 | Final summary and insights |

**Key mechanics:**
- Every decision triggers UX debt tracking, timeline/budget changes, and role impacts
- Escalation triggers fire when metrics hit critical thresholds
- "NoGoodOption" scenarios appear when debt accumulates too much
- Users see the full consequence chain of their decisions

---

## Client Experience Flow (B2B Path)

Accessible at `/client` or `client.` subdomain. Separate from the 3-layer flow.

### Primer Phase — Physical World Analogies
Teaches design principles through everyday objects:

| Experience | Object | Principle Taught |
|-----------|--------|-----------------|
| `ClientPrimerDoor.tsx` | Door handle (push/pull) | **Signifiers** — visual communication without reading |
| `ClientPrimerStove.tsx` | Stove knob grid layout | **Natural Mapping** — layout matches mental model |
| `ClientPrimerKetchup.tsx` | Ketchup bottle (glass vs squeeze) | **Efficiency** — zero-friction value delivery |

### Funnel Phase — Digital Misapplication
Shows how digital products misapply these principles:

| Screen | Anti-Pattern |
|--------|-------------|
| `FunnelBait` | Deceptive tactics (bait-and-switch) |
| `FunnelChaos` | Confusing navigation |
| `FunnelWall` | Barriers to action |
| `FunnelMaze` | Unnecessarily complex flows |
| `FunnelTrap` | High switching costs |

### Impact Phase — Revenue Connection
- Revenue Loss: Quantifies cost of bad design
- Revenue Gain: Shows ROI of good design
- Final Connect: Business value conclusion

---

## Internal Team Experience Flow

Accessible at `/internalteam`.

### Onboarding Sequence (All Roles)
Every internal user goes through this before their role-specific journey:

| Step | Component | Purpose |
|------|-----------|---------|
| 1 | `ProjectBrief.tsx` | Sets the project context |
| 2 | `SlackWarRoom.tsx` | Simulates team communication dynamics |
| 3 | `SystemReaction.tsx` | Shows cascade effects across the system |
| 4 | `DecisionLensUnlock.tsx` | Introduces the decision-making framework |
| 5 | `IdentityReflection.tsx` | Users reflect on their role identity |

### Role-Specific Journeys
After onboarding, users select their role and enter a tailored scenario journey:

| Role | File | Content |
|------|------|---------|
| Sales | `SalesJourney.tsx` | Deal impact, client trust, pricing discussions |
| CRM | `CRMJourney.tsx` | Customer retention, relationship management |
| PM | `PMJourney.tsx` | Sprint planning, stakeholder management, trade-offs |
| Developer | `DeveloperJourney.tsx` | Technical debt, unclear specs, rework cycles |
| QA | `QAJourney.tsx` | Bug origins, testing scope, regression |
| Designer | `DesignerJourney.tsx` | Design system, handoff, implementation gaps |
| Strategy | `StrategyJourney.tsx` | Business outcomes, market positioning |
| BA | `BAJourney.tsx` | Requirement clarity, stakeholder alignment |

Each journey follows the **Context → Interaction → Reflection** pattern:
1. See the situation from your role's perspective
2. Make decisions and see consequences
3. Reflect on what you'd do differently

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | React | 18.3.1 |
| Language | TypeScript | 5.8.3 |
| Build Tool | Vite + SWC | 5.4.19 |
| Routing | React Router DOM | 6.30.1 |
| Styling | Tailwind CSS | 3.4.17 |
| UI Components | shadcn/ui + Radix UI | Latest |
| Animation | Framer Motion | 12.26.2 |
| State (Global) | React Context + Zustand | 5.0.12 |
| State (Async) | TanStack React Query | 5.83.0 |
| State (Immutable) | Immer | 11.1.4 |
| Forms | React Hook Form + Zod | 7.61.1 / 3.25.76 |
| Charts | Recharts | 2.15.4 |
| Notifications | Sonner | 1.7.4 |
| Icons | Lucide React | 0.462.0 |
| Dates | date-fns | 3.6.0 |

**Fonts:** Space Grotesk (headings), Inter (body text) — loaded from Google Fonts.

**Deployment:** Vercel (SPA with client-side routing, subdomain support for `client.*`).

**No backend.** The app is entirely client-side. All state lives in React Context, Zustand stores, and localStorage.

---

## State Management Architecture

### Global Experience State (`GlobalExperienceContext.tsx`)
React Context that tracks the user's position across all three layers:

```typescript
{
  currentLayer: "layer1" | "layer1.5" | "layer2",
  layer1: {
    completedExperiences: string[],   // Which friction experiences completed
    patternPauseSeen: boolean,
    bridgeSeen: boolean
  },
  layer15: {
    patternRecognitionComplete: boolean,
    uxNamedPhaseComplete: boolean,
    patternsObserved: string[]
  },
  layer2: {
    started: boolean,
    currentPhase: string,
    completed: boolean
  },
  maxUnlockedLayer: string  // Persisted to localStorage
}
```

### Designation Store (`state/designation-store.ts`)
Zustand store with localStorage persistence (`hcl_designation_store`) for internal team journeys:

- Tracks selected roles, completed roles, and decisions per role
- **Append-only decision recording** — every decision is logged, never mutated
- Schema versioning for future migrations

### SDLC Context (`layer2/SDLCContext.tsx`)
React Context for Layer 2 project simulation state:

- Project metrics (timeline, budget, stakeholder patience)
- UX debt visibility progression
- Role impact tracking
- Phase decisions with consequences
- Complexity accumulation
- Escalation and NoGoodOption triggers

### Custom Hooks

| Hook | File | Purpose |
|------|------|---------|
| `usePhaseNavigation<T>` | `hooks/usePhaseNavigation.ts` | Sequential screen progression with decision gating |
| `useGlobalExperience()` | `GlobalExperienceContext.tsx` | Access global layer/experience state |
| `useSDLC()` | `SDLCContext.tsx` | Access Layer 2 project simulation state |
| `useDesignationStore()` | `designation-store.ts` | Access internal team role selection and decisions |
| `useMobile()` | `hooks/use-mobile.tsx` | Responsive breakpoint detection |

---

## Design System

### Color Palette (Dark-First, Immersive)

The app uses a dark, immersive theme to create focus and reduce distraction:

| Token | HSL Value | Usage |
|-------|----------|-------|
| `--clarity` | 38 92% 50% (amber) | Moments of insight, success, positive revelation |
| `--friction` | 8 65% 45% (warm red) | Frustration, errors, negative friction |
| `--relief` | 200 80% 55% (cool blue) | Success states, resolution, positive outcomes |
| `--void` | 240 10% 2% (deep black) | Immersive background, focus areas |
| `--background` | 240 10% 4% | App background |
| `--card` | 240 8% 8% | Card surfaces |
| `--foreground` | 45 20% 92% | Primary text (off-white) |
| `--muted-foreground` | 240 5% 50% | Secondary text (gray) |

### Gradients and Shadows
- `--gradient-clarity`: Amber gradient for clarity moments
- `--gradient-friction`: Red gradient for friction moments
- `--shadow-glow-clarity`: Amber glow effect
- `--shadow-glow-friction`: Red glow effect
- `--shadow-deep`: 25px deep shadow for depth

### Typography
- **Display (headings):** Space Grotesk — geometric, modern, impactful
- **Body (text):** Inter — highly readable, professional
- CSS utilities: `.text-display`, `.gradient-clarity`, `.glow-clarity`

### Animation
- Framer Motion for page transitions, reveals, and interactions
- Custom keyframes: `accordion-down/up`, `pulse-subtle`, `shake`
- 3D perspective transforms available for immersive effects

---

## File Structure

```
src/
├── App.tsx                          # Routing, domain logic, providers
├── main.tsx                         # React entry point
├── index.css                        # Design tokens, Tailwind config, custom utilities
├── pages/
│   ├── Index.tsx                    # Root page → renders ExperienceController
│   └── NotFound.tsx                 # 404 page
├── components/
│   ├── ui/                          # 45+ shadcn/ui components (Button, Card, Dialog, etc.)
│   ├── common/
│   │   └── DebugMenu.tsx            # Developer debug overlay
│   └── experiences/
│       ├── ExperienceController.tsx  # Main orchestrator — manages all experience flow
│       ├── GlobalExperienceContext.tsx # Global state for layers and progress
│       ├── LayerSwitcher.tsx         # Top-level lens/layer toggle
│       ├── IntroScreen.tsx           # Welcome screen
│       ├── ExperienceWrapper.tsx     # Consistent layout wrapper
│       ├── CompletionScreen.tsx      # Generic completion screen
│       │
│       ├── # LAYER 1: Feel
│       ├── DoorExperience.tsx
│       ├── SilentButtonExperience.tsx
│       ├── ConfusingFormExperience.tsx
│       ├── DelayedResponseExperience.tsx
│       ├── PatternPause.tsx
│       ├── BridgeToWork.tsx
│       │
│       ├── layer15/                  # LAYER 1.5: Understand
│       │   ├── Layer15Controller.tsx
│       │   ├── PatternRecognitionPhase.tsx
│       │   ├── UXNamingPhase.tsx
│       │   └── Layer15Complete.tsx
│       │
│       ├── layer2/                   # LAYER 2: Apply
│       │   ├── Layer2Controller.tsx
│       │   ├── SDLCContext.tsx
│       │   ├── Layer2Intro.tsx
│       │   ├── Layer2Complete.tsx
│       │   └── phases/
│       │       ├── DiscoveryPhaseNew.tsx
│       │       ├── RequirementsPhaseNew.tsx
│       │       ├── DesignPhaseNew.tsx
│       │       ├── DevelopmentPhase.tsx
│       │       ├── TestingPhase.tsx
│       │       ├── LaunchPhase.tsx
│       │       └── MaintenancePhase.tsx
│       │
│       ├── client/                   # CLIENT EXPERIENCE (B2B)
│       │   ├── ClientExperience.tsx   # Orchestrator
│       │   ├── ClientLayout.tsx
│       │   ├── ClientDebugMenu.tsx
│       │   ├── ClientContextCard.tsx
│       │   ├── primer/               # Physical-world analogies
│       │   │   ├── ClientPrimerDoor.tsx
│       │   │   ├── ClientPrimerStove.tsx
│       │   │   └── ClientPrimerKetchup.tsx
│       │   └── ...                    # Funnel, impact, analysis screens
│       │
│       └── internal/                 # INTERNAL TEAM EXPERIENCE
│           ├── InternalExperience.tsx  # Orchestrator
│           ├── DesignationPortal.tsx   # Role selection hub
│           ├── DesignationSelect.tsx
│           ├── RoleBriefingView.tsx
│           ├── RoleMasterclassComplete.tsx
│           ├── onboarding/            # Pre-role onboarding sequence
│           │   ├── ProjectBrief.tsx
│           │   ├── SlackWarRoom.tsx
│           │   ├── SystemReaction.tsx
│           │   ├── DecisionLensUnlock.tsx
│           │   └── IdentityReflection.tsx
│           ├── roles/                 # 8 role-specific journeys
│           │   ├── SalesJourney.tsx
│           │   ├── CRMJourney.tsx
│           │   ├── PMJourney.tsx
│           │   ├── DeveloperJourney.tsx
│           │   ├── QAJourney.tsx
│           │   ├── DesignerJourney.tsx
│           │   ├── StrategyJourney.tsx
│           │   └── BAJourney.tsx
│           └── visuals/               # Shared visual components
│
├── hooks/
│   ├── use-mobile.tsx                # Responsive breakpoint hook
│   └── usePhaseNavigation.ts         # Sequential screen progression hook
├── state/
│   ├── designation-store.ts          # Zustand store for internal team roles
│   └── hooks/
│       └── usePhaseNavigation.ts     # Phase navigation hook (alternate location)
└── lib/
    └── utils.ts                      # cn() class merge utility
```

---

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | `Index` → `ExperienceController` | Main 3-layer experience (Layer 1 → 1.5 → 2) |
| `/client` | `ClientExperience` | B2B client learning path (primer → funnel → impact) |
| `/internalteam` | `InternalExperience` | Internal team role-based training |
| `client.*` subdomain | `ClientExperience` | Auto-routes to client experience via subdomain detection |
| `*` | `NotFound` | 404 page |

---

## Key Architectural Patterns

### 1. Progressive Disclosure / Gated Unlocking
Users cannot skip layers. `maxUnlockedLayer` (persisted to localStorage) prevents jumping ahead. This ensures users build understanding sequentially: feel friction → recognize patterns → apply to SDLC.

### 2. Context → Interaction → Reflection
Every experience follows a three-stage adult learning pattern:
1. **Context** — Set the scenario and stakes
2. **Interaction** — User makes decisions or experiences friction
3. **Reflection** — Reveal principles, connect to broader patterns

### 3. Append-Only Decision Recording
The `designationStore` uses immutable, append-only decision logging. Every choice is recorded and never mutated, enabling full decision history playback and analysis.

### 4. UX Debt as a First-Class Metric
Layer 2 tracks UX debt as a progression: `hidden → surfacing → visible`. Users experience how invisible design debt accumulates and eventually becomes a crisis — the same way it happens in real projects.

### 5. LayerSwitcher as Lens, Not Navigation
The `LayerSwitcher` component lets users view the same experience from different angles (Feel / Understand / Apply) without losing progress. This reinforces that UX problems are universal across perspectives.

### 6. Role-Specific Scenario Branching
The internal experience provides 8 distinct role journeys for the same underlying project scenario. Each role sees different pain points, metrics, and consequences — building cross-functional empathy.

### 7. Intentional Friction as Pedagogy
The app deliberately uses bad UX (silent buttons, cryptic errors, missing loading states) as teaching tools. This is by design — do not "fix" these patterns in Layer 1 experiences.

---

## Development Commands

```bash
npm run dev        # Start dev server (Vite)
npm run build      # Production build
npm run build:dev  # Development build
npm run lint       # Run ESLint
npm run preview    # Preview production build locally
```

---

## Important Development Notes

### DO NOT "Fix" Layer 1 Friction
The Layer 1 experiences (Door, Silent Button, Confusing Form, Delayed Response) are **intentionally frustrating**. The bad UX IS the feature. Do not add loading spinners to the delayed response, clarify the form validation, add feedback to the silent button, or make the door handle obvious. These are teaching moments.

### State Persistence
- `maxUnlockedLayer` → localStorage (survives page reload)
- `hcl_designation_store` → localStorage via Zustand persist middleware
- All other state is in-memory React Context (resets on full page reload)

### No Backend
This is a fully client-side SPA. There are no API calls, no database, no server-side rendering. All data and logic lives in the browser.

### Subdomain Routing
The `DomainWrapper` in `App.tsx` checks `window.location.hostname` for a `client.` prefix to auto-route to `ClientExperience`. This requires Vercel (or DNS) configuration for the subdomain to work.

### Component Library
The `components/ui/` directory contains 45+ shadcn/ui components. These are copied (not npm-installed) and customized with the app's design tokens. They use Radix UI primitives for accessibility.

### Debug Menu
A `DebugMenu` component exists for development. It allows jumping between experiences and resetting state. The client experience has its own `ClientDebugMenu`.

---

## Anti-Patterns the App Teaches (Reference)

| Anti-Pattern | Where Demonstrated | Real-World Impact |
|-------------|-------------------|------------------|
| Missing signifiers | Door Experience | Users can't figure out how to interact |
| No feedback | Silent Button | Users panic, rage-click, lose trust |
| Cryptic validation | Confusing Form | Users abandon forms, contact support |
| No loading state | Delayed Response | Users think system is broken, retry actions |
| Pre-checked defaults | Pattern Recognition | Users opt into things they didn't want |
| Over-constraining | Pattern Recognition | Users give up on valid inputs |
| Bad timing | Pattern Recognition | Users are interrupted mid-task |
| Hidden information | Pattern Recognition | Users feel deceived when costs appear late |
| Deceptive funnels | Client Funnel | Revenue loss, brand damage |
| High switching costs | Client Funnel | Customer resentment, forced loyalty |
| Confusing navigation | Client Funnel | Task abandonment, support load |

---

## Glossary

| Term | Meaning in This App |
|------|-------------------|
| Layer | A level of understanding (Feel → Understand → Apply) |
| Friction | Intentional or accidental design that slows/frustrates users |
| UX Debt | Accumulated design shortcuts that create future rework |
| Signifier | A visual cue that indicates how to interact with something |
| Natural Mapping | When the layout of controls matches the layout of what they control |
| SDLC | Software Development Life Cycle (Discovery → Requirements → Design → Dev → QA → Launch → Maintenance) |
| Designation | A role/job title in the internal team experience |
| Primer | Physical-world examples that introduce design principles (client path) |
| Funnel | Digital product flows that misapply design principles (client path) |
| Pattern Pause | A reflection moment between experiences |
| Bridge | A transition screen connecting Layer 1 experiences to Layer 1.5 patterns |
| Decision Lens | A framework for evaluating design decisions (internal path) |
