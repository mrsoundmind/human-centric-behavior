# Requirements: Human Centric Lab — Platform Audit & Designation Portal Overhaul

**Defined:** 2026-03-23
**Core Value:** By the end of the designation experience, a person in any role should be measurably better at understanding their role's impact on UX and making decisions that reduce friction.

## v1 Requirements

### Content Infrastructure

- [x] **CINF-01**: Scenario content defined as typed TypeScript data objects separated from React components (ScenarioConfig interface)
- [x] **CINF-02**: Generic ScenarioRenderer component that consumes ScenarioConfig and renders any role/phase scenario without role-specific component code
- [x] **CINF-03**: Zod schema validation for all scenario content at build/dev time — prevents silent content bugs across 168 scenario slots (8 roles × 3 phases × 7 friction scenarios)
- [x] **CINF-04**: Debrief template structure enforced as non-negotiable in schema (what happened / why / how / who you became / tomorrow's action)
- [x] **CINF-05**: Each scenario choice carries a `crossRoleImpact[]` array keyed to specific decisions — no hardcoded consequence strings

### State Architecture

- [x] **STAT-01**: Zustand store with Immer middleware for designation journey state (replaces per-component useState for journey tracking)
- [x] **STAT-02**: Domain-split contexts — SDLCContext remains for Layer 2, new DesignationStore handles role journey state independently
- [x] **STAT-03**: localStorage schema versioning with migration guard — prevents returning user progress corruption on schema changes
- [x] **STAT-04**: Append-only decisions log per journey session — stores full ordered decision record (role, phase, choice, timestamp, friction dimension)

### Scoring & Behavioral Profiling

- [ ] **SCOR-01**: Pure TypeScript scoring engine module (no React imports) — exports computeRunningScore() and computeProfile()
- [ ] **SCOR-02**: 4-dimension behavioral tagging on every choice: client friction, internal bureaucracy, knowledge gaps, conflict avoidance
- [ ] **SCOR-03**: Blind spot profile generation — pattern detection across all phases showing tendency archetypes (e.g., "consistently avoids conflict in Requirements but takes risks in Development")
- [ ] **SCOR-04**: Tendency-weighted multi-dimensional scoring — NOT binary right/wrong per choice
- [ ] **SCOR-05**: Cumulative pattern display that surfaces decision patterns across the full journey, not individual moments

### SDLC-Merged Role Journeys

- [ ] **ROLE-01**: Each of 8 roles (Sales, PM, Developer, QA, Designer, BA, CRM, Strategy) walks through 3 SDLC phases (Discovery, Requirements, Design) with role-specific friction at every phase
- [ ] **ROLE-02**: Each phase friction covers 4 dimensions: client friction, internal bureaucracy, knowledge gaps, conflict avoidance
- [ ] **ROLE-03**: Approval bottleneck scenarios per role — decisions stuck waiting for sign-off, deadlines slipping because of process
- [ ] **ROLE-04**: Knowledge silo scenarios per role — one person holds context, incomplete handovers, rework happens
- [ ] **ROLE-05**: Conflict avoidance scenarios per role — absorbing bad requirements/feedback silently, problems compounding
- [ ] **ROLE-06**: Phase-specific "do this tomorrow" action tied to that role's actual workflow at debrief
- [ ] **ROLE-07**: Existing 3-scenario role journeys preserved and accessible (not deleted)
- [ ] **ROLE-08**: Declarative phase navigation hook (usePhaseNavigation) replacing array-index navigation

### Cross-Role Impact

- [ ] **XROL-01**: Static cross-role impact map defining which decision in role A affects which phase in role B
- [ ] **XROL-02**: Cross-role ripple visualization — after completing your role journey, see how your decisions impacted other designations
- [ ] **XROL-03**: Multi-role compound insights — user who completes multiple role journeys sees compounding cross-role patterns

### Behavior Change

- [ ] **BEHV-01**: Each SDLC phase debrief produces a concrete "do this tomorrow" action tied to that role's actual workflow
- [ ] **BEHV-02**: Cumulative decision profile shown at journey completion — not a score, but a behavioral pattern narrative
- [ ] **BEHV-03**: Actionable takeaways tied to specific workflow moments (scripts, rubric, commitments) — extends existing completion screen pattern

### Platform Audit

- [ ] **AUDT-01**: Audit client-facing primer flow for completeness and impact — identify gaps, fix dead ends
- [ ] **AUDT-02**: Audit funnel friction experiences and their "good" counterparts for consistency
- [ ] **AUDT-03**: Connect Layer 2 SDLC to designation portal — SDLC is the backbone, not a separate experience
- [ ] **AUDT-04**: Fix navigation flow between all layers — no dead ends, clear progression
- [ ] **AUDT-05**: Completion of one layer naturally bridges to the next with contextual prompts

### Technical Health

- [x] **TECH-01**: Fix existing CONCERNS.md issues: memory leaks in event listeners, timer cleanup, unguarded localStorage access
- [x] **TECH-02**: Address type safety — reduce `any` usage in role journey components, type completion callbacks properly

## v2 Requirements

### Extended SDLC Phases
- **ROLE-V2-01**: Extend all 8 roles to remaining 4 SDLC phases (Development, Testing, Launch, Maintenance)
- **ROLE-V2-02**: Full 8 × 7 = 56 phase-role combinations with 4 friction dimensions each

### Advanced Analytics
- **ANLZ-01**: Journey analytics dashboard — aggregate decision patterns across all users (requires backend)
- **ANLZ-02**: Team-level blind spot analysis — compare patterns across designations within an organization

### Content Expansion
- **CONT-01**: Industry-specific scenario packs (fintech, edtech, healthcare, government procurement)
- **CONT-02**: Custom scenario authoring tool for organizations to add their own frictions

## Out of Scope

| Feature | Reason |
|---------|--------|
| Backend API / database | Platform is frontend-only by design — all state client-side |
| User authentication / accounts | Public educational experience — no login required |
| Mobile native app | Web-first approach, responsive design sufficient |
| Automated test suite | Manual QA adequate for experiential content validation |
| Real-time multiplayer | Adds complexity without proportional learning value |
| Leaderboards / competitive scoring | Activates test-taking behavior, kills genuine blind spot surfacing |
| LMS integration (SCORM/xAPI) | Adds vendor lock-in without clear benefit for this use case |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CINF-01 | Phase 1 | Complete |
| CINF-02 | Phase 1 | Complete |
| CINF-03 | Phase 1 | Complete |
| CINF-04 | Phase 1 | Complete |
| CINF-05 | Phase 1 | Complete |
| STAT-01 | Phase 1 | Complete |
| STAT-02 | Phase 1 | Complete |
| STAT-03 | Phase 1 | Complete |
| STAT-04 | Phase 1 | Complete |
| TECH-01 | Phase 1 | Complete |
| TECH-02 | Phase 1 | Complete |
| SCOR-01 | Phase 2 | Pending |
| SCOR-02 | Phase 2 | Pending |
| SCOR-03 | Phase 2 | Pending |
| SCOR-04 | Phase 2 | Pending |
| SCOR-05 | Phase 2 | Pending |
| ROLE-01 | Phase 3 | Pending |
| ROLE-02 | Phase 3 | Pending |
| ROLE-03 | Phase 3 | Pending |
| ROLE-04 | Phase 3 | Pending |
| ROLE-05 | Phase 3 | Pending |
| ROLE-06 | Phase 3 | Pending |
| ROLE-07 | Phase 3 | Pending |
| ROLE-08 | Phase 3 | Pending |
| BEHV-01 | Phase 3 | Pending |
| XROL-01 | Phase 4 | Pending |
| XROL-02 | Phase 4 | Pending |
| XROL-03 | Phase 4 | Pending |
| BEHV-02 | Phase 4 | Pending |
| BEHV-03 | Phase 4 | Pending |
| AUDT-01 | Phase 5 | Pending |
| AUDT-02 | Phase 5 | Pending |
| AUDT-03 | Phase 5 | Pending |
| AUDT-04 | Phase 5 | Pending |
| AUDT-05 | Phase 5 | Pending |

**Coverage:**
- v1 requirements: 35 total
- Mapped to phases: 35
- Unmapped: 0

---
*Requirements defined: 2026-03-23*
*Last updated: 2026-03-23 after roadmap creation — all 35 requirements mapped to phases 1-5*
