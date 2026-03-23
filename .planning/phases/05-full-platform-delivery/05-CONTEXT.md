# Phase 5: Full Platform Delivery - Context

**Gathered:** 2026-03-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Complete all 8 designation role journeys (add 5 remaining: Sales, Designer, BA, CRM, Strategy), audit and fix the client-facing experience flow, and ensure seamless navigation between all platform layers (Layer 1 → 1.5 → 2 → Designation Portal, client experience → internal team experience). No dead ends anywhere. Full cross-role impact map populated for all 8 roles.

</domain>

<decisions>
## Implementation Decisions

### 5 Remaining Role SDLC Journeys (USER-LOCKED patterns apply)
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

### Role-Specific Content Guidance
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

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Context
- `.planning/PROJECT.md` — Core value, no numeric scores, Indian B2B context, CEO vision
- `.planning/REQUIREMENTS.md` — AUDT-01..05 requirements with exact descriptions
- `.planning/ROADMAP.md` — Phase 5 goal, success criteria, 6-plan breakdown
- `CLAUDE.md` — Full platform documentation, file structure, design system, routes

### Phase 3 Pattern (Content Authoring Reference)
- `.planning/phases/03-role-content-first-wave/03-CONTEXT.md` — Scenario content structure, friction dimension coverage, Zod validation pattern
- `data/scenarios/pm/discovery.ts` — Reference scenario file for structure and quality bar
- `data/scenarios/schema.ts` — ScenarioConfigSchema with all required fields

### Phase 4 Outputs (Completion & Impact)
- `src/components/experiences/internal/JourneyCompleteView.tsx` — ROLE_COMPLETION_CONTENT needs 5 new entries
- `data/scenarios/cross-role-impact-map.ts` — buildImpactMap() needs 15 new scenario imports
- `src/components/experiences/internal/DesignationPortal.tsx` — ROLE_PHASE_GROUPS needs 5 new entries

### Navigation & Flow
- `src/components/experiences/ExperienceController.tsx` — Main experience orchestrator, EXPERIENCE_ORDER array
- `src/components/experiences/BridgeToWork.tsx` — Layer 1 → 1.5 bridge
- `src/components/experiences/layer2/Layer2Complete.tsx` — Layer 2 completion, needs bridge messaging update
- `src/components/experiences/client/ClientExperience.tsx` — Client flow orchestrator (18 steps)
- `src/components/experiences/client/primer/ClientFinalConnect.tsx` — Client dead-end to fix

### Internal Experience
- `src/components/experiences/internal/InternalExperience.tsx` — Internal flow orchestrator
- `src/components/experiences/internal/RoleBriefingView.tsx` — Role briefing with mode selector
- `src/components/experiences/internal/RoleMasterclassComplete.tsx` — Quick Mode completion (DO NOT MODIFY)

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `ScenarioRenderer` — renders any ScenarioConfig without role-specific branches (Phase 1)
- `FRICTION_CONFIG` in `friction-config.ts` — shared dimension labels/colors
- `usePhaseNavigation` — sequential screen progression hook
- `useDesignationStore` — Zustand store with all role management actions
- `computeProfile()` / `computeRunningScore()` — scoring engine ready for any role
- `ARCHETYPE_LOOKUP` — 12 phase-specific archetypes (work for all roles)
- `buildImpactMap()` — derives cross-role edges from scenario data

### Established Patterns
- Dark theme: `bg-black text-white`, `bg-white/5 border-white/10` for cards
- Framer Motion `AnimatePresence mode="wait"` for transitions
- Font mono labels: `text-xs font-mono text-gray-500 uppercase tracking-widest`
- Amber highlighting for tomorrow's action
- ROLE_PHASE_GROUPS record in DesignationPortal for scenario loading

### Integration Points
- `ROLE_PHASE_GROUPS` in DesignationPortal — add 5 new role entries with scenario imports
- `crossRoleImpactMap` in cross-role-impact-map.ts — add 15 new scenario imports
- `ROLE_COMPLETION_CONTENT` in JourneyCompleteView — add 5 new role entries
- `ClientFinalConnect.tsx` — add bridge CTA
- `Layer2Complete.tsx` — update bridge messaging

</code_context>

<specifics>
## Specific Ideas

- The 5 new role journeys should feel equally real and specific as PM/Developer/QA — not watered-down versions
- Sales scenarios should reference deal sizes, client meetings, proposal friction — not abstract "selling"
- Designer scenarios should reference Figma handoffs, design system consistency, stakeholder feedback loops
- BA scenarios should reference kickoff meetings, requirement documents, UAT sessions
- CRM scenarios should reference account reviews, escalation calls, renewal conversations
- Strategy scenarios should reference market analysis, investment decisions, competitive positioning
- The client experience bridge should feel like an invitation, not a redirect — "Your team faces these frictions daily"

</specifics>

<deferred>
## Deferred Ideas

- Industry-specific scenario packs (fintech, edtech, healthcare) — v2
- Custom scenario authoring tool — v2
- Team-level aggregate analytics (requires backend) — v2
- Animated ripple visualization for cross-role impact — v2 polish
- Radar chart for phase breakdown — v2 polish
- Exportable behavioral profile (PDF/image) — v2

</deferred>

---

*Phase: 05-full-platform-delivery*
*Context gathered: 2026-03-24*
