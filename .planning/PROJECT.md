# Human Centric Lab — Platform Audit & Designation Portal Overhaul

## What This Is

An experiential UX training platform built for two audiences: **clients** (to understand why UX matters through felt friction) and **internal teams** (to transform how each designation makes decisions across the SDLC). The platform currently has three layers — Layer 1 (Feel), Layer 1.5/2 (SDLC walkthrough), and the Designation Portal (role-specific friction scenarios). This initiative audits the full platform and deeply overhauls the designation portal to merge SDLC phases with role-specific frictions that cover client friction, internal bureaucracy, knowledge gaps, and conflict avoidance.

## Core Value

By the end of the designation experience, a person in any role should be measurably better at understanding their role's impact on user experience and making decisions that reduce friction — not just aware of UX concepts, but changed in how they work.

## Requirements

### Validated

- ✓ Layer 1 friction experiences (Door, Silent Button, Confusing Form, Delayed Response) — existing
- ✓ Layer 1.5 pattern recognition and UX naming — existing
- ✓ Layer 2 SDLC walkthrough (Discovery → Requirements → Design → Dev → Testing → Launch → Maintenance) — existing
- ✓ Client-facing primer experience (physical UX metaphors, funnel friction, revenue impact) — existing
- ✓ 8 designation roles defined (Sales, PM, Developer, QA, Designer, BA, CRM, Strategy) — existing
- ✓ Role briefing screens with "What to Expect / Discover / Why It Matters" — existing
- ✓ Role completion screen with commitments, scripts, rubric, risk assessment — existing
- ✓ Internal onboarding flow (ProjectBrief → SlackWarRoom → SystemReaction → DecisionLens → IdentityReflection) — existing
- ✓ Domain-based routing (client subdomain vs main domain) — existing

### Active

#### Designation Portal — SDLC-Merged Role Journeys
- [ ] Walk each designation through the full SDLC (Discovery → Requirements → Design → Dev → Testing → Launch → Maintenance) with role-specific friction at every phase
- [ ] Each phase friction must cover 4 dimensions: client friction, internal bureaucracy, knowledge gaps, conflict avoidance
- [ ] Approval bottleneck scenarios per role (decisions stuck waiting for sign-off, deadlines slipping because of process)
- [ ] Knowledge silo scenarios per role (one person holds context, incomplete handovers, rework)
- [ ] Conflict avoidance scenarios per role (absorbing bad requirements/feedback silently, problems compounding)
- [ ] Each phase produces a concrete "do this tomorrow" action tied to that role's actual workflow

#### Designation Portal — Behavior Change System
- [ ] Cumulative decision scoring across all SDLC phases — track patterns, not just individual choices
- [ ] Decision profile/blind spot analysis at completion — show the user their pattern ("you consistently avoid conflict in Requirements but take risks in Development")
- [ ] Cross-role impact visibility — after completing your role journey, see how YOUR decisions rippled into other designations
- [ ] Actionable behavioral takeaways tied to specific workflow moments (not generic advice)

#### SDLC Layer Fix
- [ ] Connect Layer 2 SDLC phases to the designation portal — the SDLC is not a separate journey, it's the backbone of the designation experience
- [ ] Role-specific SDLC views — same phases, different decisions/blind spots/frictions per designation

#### Client Experience Audit
- [ ] Audit client-facing primer flow for completeness and impact
- [ ] Audit funnel friction experiences (Bait, Chaos, Maze, Trap, Wall) and their "good" counterparts
- [ ] Ensure revenue impact messaging is grounded and compelling

#### Platform-Wide
- [ ] Audit navigation and flow between all layers — no dead ends, clear progression
- [ ] Ensure completion of one layer naturally bridges to the next
- [ ] Cross-role journey capability — user can complete multiple designations and see compounding insights

### Out of Scope

- Backend/API development — this is a frontend-only experiential platform
- User authentication or accounts — public educational experience
- Mobile native app — web-first
- Analytics/tracking infrastructure — focus on the experience itself first
- Automated testing infrastructure — manual QA sufficient for experiential content

## Context

- **Stack**: React 18 + TypeScript + Vite + Tailwind CSS + shadcn/ui + Framer Motion
- **Deployment**: Vercel
- **No backend**: All state is frontend-only (localStorage for persistence)
- **CEO's vision**: Internal team members should go through the designation portal and come out genuinely better at their jobs — not just "aware" of UX but transformed in decision-making
- **Current state**: 8 role journeys exist with 3 scenarios each, but they only cover client-facing friction. Internal bureaucracy, knowledge gaps, and conflict avoidance are completely missing. SDLC layer and designation portal are disconnected.
- **Brownfield**: Significant existing codebase (~100+ components, well-structured but with technical concerns documented in .planning/codebase/CONCERNS.md)
- **Existing friction types in roles**: Each role has 3 branching scenarios with detailed debriefs (what happened, why, how, who you became, tomorrow's action). This pattern works well and should be extended.

## Constraints

- **Tech stack**: Must remain React + TypeScript + Tailwind + Framer Motion — no framework migration
- **No backend**: All experiences must remain client-side only
- **Content quality**: Scenarios must use realistic Indian B2B context (IBC, SAP, TCS, enterprise procurement) — this is a differentiator
- **Existing content**: Do not remove working content — extend and connect it
- **8 roles × 7 SDLC phases × 4 friction dimensions**: Content scope is large — must be structured for maintainability

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Merge SDLC with designation journeys | Current separation means neither achieves its goal — SDLC feels generic, designations feel disconnected from project lifecycle | — Pending |
| 4 friction dimensions per phase | Client-only friction misses where most bad decisions actually happen — internal bureaucracy, knowledge gaps, and conflict avoidance | — Pending |
| Cumulative scoring system | Static completion screens don't change behavior — patterns need to be surfaced across the full journey | — Pending |
| Cross-role impact visibility | People don't understand how their decisions affect other roles — showing the ripple effect creates empathy and accountability | — Pending |
| Keep existing 3-scenario journeys | Good content that works — can serve as "quick mode" or be integrated into the SDLC-phase structure | — Pending |

---
*Last updated: 2026-03-23 after initialization*
