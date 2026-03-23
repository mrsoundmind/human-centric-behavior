# Feature Research

**Domain:** Experiential UX Training Platform — Role-Based SDLC Simulation
**Researched:** 2026-03-23
**Confidence:** MEDIUM (core learning patterns HIGH; cross-role visualization and cumulative profiling MEDIUM — fewer precedents for this specific combination)

---

## Feature Landscape

### Table Stakes (Users Expect These)

Features that must exist or the platform feels broken/incomplete. Learners in role-based simulations expect these based on any comparable experience (games, onboarding sims, compliance training).

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Branching scenario with 2–3 choices per decision point | Any interactive learning — even compliance quizzes — branches. A linear narrative without choices is a video, not a simulation. | MEDIUM | Already present for 3-scenario journeys. Must extend to 7 SDLC phases × 4 friction dimensions. |
| Immediate consequence feedback per choice | Learners need to know what their choice caused before moving on. Delayed feedback kills the causal link. | MEDIUM | The existing "what happened / why / how / who you became" debrief pattern is the right form. Must be preserved. |
| Role framing before scenarios begin | Users need context about who they are and why these decisions matter to their specific role. Without framing, scenarios feel arbitrary. | LOW | Role briefing screens already exist ("What to Expect / Discover / Why It Matters"). Extend per SDLC phase. |
| Completion state and progress persistence | If a session is interrupted, losing all progress destroys trust. localStorage-based persistence is the minimum bar. | LOW | Platform is frontend-only. localStorage already used. Must handle 8 roles × 7 phases gracefully. |
| Completion screen with takeaways | Users expect a "here's what you learned" moment at the end of any structured module. Without it the experience feels cut off. | LOW | Existing completion screen (commitments, scripts, rubric, risk assessment) should become the behavioral profile output. |
| Phase-by-phase progression through SDLC | Once a platform commits to "you are going through the SDLC," users expect to move through it in order. Jumping phases or disconnecting them breaks the mental model. | MEDIUM | Core structural requirement — SDLC phases are the backbone of the designation experience, not a separate layer. |
| Scenario debrief structure (what happened → why → consequence) | Scenario-based learning research (Cathy Moore, Clark & Mayer) consistently shows that consequence visibility plus reflection prompts is what builds retention. Without it, choices feel like quizzes. | MEDIUM | Existing "what happened / why it matters / who you became / tomorrow's action" pattern is validated — must be mandatory for all 56 scenario-phase combinations (8 roles × 7 phases). |
| "Tomorrow's action" per phase | Users arrive from real jobs. The transfer gap — knowing something vs. doing it Monday morning — is the most common failure mode in corporate training. A concrete next action closes it. | LOW | Already in existing scenarios. Must be role-specific and phase-specific, not generic UX advice. |
| Navigation between scenarios without dead ends | Users who complete a scenario must be able to clearly advance or exit. Dead ends, broken back buttons, or unclear next steps immediately erode trust. | LOW | Existing platform has navigation concerns documented in CONCERNS.md. This is a table stakes fix. |

---

### Differentiators (Competitive Advantage)

Features that make this platform meaningfully different from generic eLearning, compliance sims, or UX courses. These align with the CEO's core goal: transformed decision-makers, not just aware ones.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| Cumulative decision scoring across all SDLC phases | Most platforms score per-scenario in isolation. Scoring across an entire role journey reveals behavioral patterns, not just individual errors. "You got 7/10 in Requirements" teaches nothing. "You consistently absorb bad requirements silently" changes behavior. | HIGH | Requires a scoring schema that categorizes choices by friction type (client / bureaucracy / knowledge gap / conflict avoidance), not just correct/incorrect. Must be designed before content is written so choices map to the schema. |
| Decision profile / blind spot analysis at completion | Showing users their pattern ("you take risks in Dev but avoid conflict in Requirements") is rare in eLearning. It makes the output personal and actionable rather than generic. This is the behavior change mechanism. | HIGH | Requires cumulative scoring to work. Profile must be computed client-side. Needs a taxonomy of blind spot archetypes per role (e.g., "Approval Absorber," "Scope Silencer," "Risk Deferrer"). |
| Cross-role impact visualization after journey completion | After completing one designation, showing how those decisions ripple into other roles builds empathy and accountability that no amount of UX theory achieves. A PM seeing that their silent scope acceptance caused QA debt creates embodied understanding. | HIGH | No backend needed — can be built as pre-authored outcome maps keyed to decision profiles. Complex to author (8 roles × ripple scenarios) but high impact. |
| 4 friction dimensions per SDLC phase (client / internal bureaucracy / knowledge gaps / conflict avoidance) | Every other platform covers one dimension — usually client-facing scenarios or technical skills. The internal bureaucracy and conflict avoidance dimensions are where real organizational behavior lives and where no existing training content goes. | HIGH | This is the core content differentiator. 8 roles × 7 SDLC phases × 4 dimensions = 224 friction scenarios to author. Must be content-structured with templates. |
| Realistic Indian B2B organizational context (IBC, SAP, TCS, enterprise procurement) | Generic "Acme Corp" scenarios feel irrelevant to the target audience. Indian enterprise context — procurement cycles, approval hierarchies, vendor dynamics — makes scenarios visceral and credible. | MEDIUM | Content differentiator, not a technical feature. Requires domain expertise in scenario authoring. Must be a content standard, not an afterthought. |
| Role-specific SDLC views (same phases, different decisions per designation) | A Developer's friction in Requirements is different from a BA's friction in Requirements. Treating SDLC as a single universal journey misses where each role's actual leverage is. | HIGH | Core architecture decision: the SDLC backbone is shared but decisions/frictions/consequences are role-specific at every phase node. |
| Approval bottleneck scenarios with concrete consequences | Showing a deadline slip caused by a specific sign-off gap that a PM could have prevented — tied to that PM's actual workflow — is something no UX awareness course achieves. | MEDIUM | Requires realistic org chart dynamics in scenarios. Consequences must be quantified or felt (delayed sprint, client escalation, etc.), not just labeled. |
| Knowledge silo scenarios with handover failure mechanics | "Incomplete handover" scenarios where the learner experiences receiving broken context — or causing it — builds systems thinking about information flow that lecture-based training cannot. | MEDIUM | Requires scenarios where the learner plays both the information-hoarder and the downstream victim to create full empathy. |
| Conflict avoidance scenarios with compound consequence chains | A single conflict-avoidance decision in Requirements that compounds through Design, Dev, and Testing is the most powerful demonstration of how soft behavior drives hard costs. Showing this chain is a unique capability. | HIGH | Requires decisions in early phases to optionally pre-load context into later phases. Technically feasible with localStorage; content authoring is complex. |
| Layer bridging — Layer 1 friction leads to Layer 2 SDLC leads to Designation Portal | The "felt friction → named pattern → role impact" learning arc is pedagogically sound and unique. Most platforms start with concepts. Starting with physical felt friction (the Door, the Silent Button) and then connecting it to organizational behavior is the differentiating learning design. | MEDIUM | Mostly a navigation/UX problem — the arc exists but layers are disconnected. Connecting them is the structural fix. |
| Cross-role journey with compounding insights (completing multiple designations) | Users who complete multiple role journeys seeing how their cumulative profile changes across roles builds systems thinking at the organizational level. | HIGH | Dependent on cumulative scoring + decision profiling existing first. V2 capability. |

---

### Anti-Features (Things to Deliberately NOT Build)

Features that are commonly requested in training platforms but would actively harm this one.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| Leaderboards and social comparison scoring | Gamification frameworks recommend points + leaderboards. Competitive motivation drives engagement. | This is a behavior change and self-awareness platform, not a competition. A leaderboard turns "I absorb bad requirements" into "I ranked 4th." It incentivizes gaming the scoring rather than honest reflection. Conflict-avoidance profiles become shame metrics. | Private decision profile visible only to the learner. The mirror of "this is your pattern" is more behavior-changing than "you ranked below your colleague." |
| Branching trees with "correct answer" mechanics | Authoring tools push toward binary right/wrong. It's the simplest scoring model. | UX decisions in real org contexts are rarely binary. Marking "speak up in a stakeholder meeting" as "correct" and "stay quiet" as "incorrect" oversimplifies. Users learn to pick the "UX-correct" answer, not to understand why they avoid conflict. | Weighted multi-dimensional scoring that categorizes choice tendencies. The profile emerges from the pattern, not per-choice correctness. |
| Certification or badge issuance | Organizations want proof of completion for HR records. Learners want credentials. | Without a backend, certifications can be trivially gamed (localStorage editing). More critically, a "Certified UX-Aware Developer" badge after clicking through scenarios creates false confidence and misrepresents what the platform offers. | Completion screen with a printable/shareable behavioral commitment — "I commit to X in my next sprint" — is more honest and actionable than a badge. |
| User accounts and authentication | Saves progress across devices, enables cohort tracking, supports organizational reporting. | Out of scope per PROJECT.md (no backend, frontend-only, public educational experience). Adding auth is a platform rebuild, not a feature addition. | localStorage progress persistence within a device session. For organizational cohorts, a future backend phase can address this, but it must not constrain current build. |
| Video content and passive explainers | Stakeholders often want rich media to "set the scene." It feels professional. | Passive video breaks the experiential arc. The moment a learner watches instead of does, the simulation degrades into a conventional course. Retention from passive video is 5–10% after a week versus 65–75% for simulation-based practice. | Contextual role-framing text and scenario premise screens that establish context through the learner's own situation (you are a PM, this is your 3rd sprint) rather than watching a video about what a PM does. |
| Unlimited branching paths (full narrative tree) | Deep branching feels more "real" — every micro-decision branches further. | Exponential authoring cost with diminishing learning return. 224 scenario-phase slots already represents a large content surface. Full narrative trees would make consistent debrief quality impossible to maintain. | 3-choice decision points per phase with consequence branching back to a common path, plus cumulative scoring of which choice tendency appeared across phases. Depth through pattern, not path multiplication. |
| Analytics dashboard with LMS integration | L&D teams want xAPI/SCORM reporting, completion data, organizational heat maps. | Out of scope per PROJECT.md. Adding xAPI tracking is a backend infrastructure project. Premature analytics infrastructure would pull engineering time from scenario content, which is the core product. | localStorage-based decision profile is the self-contained analytics layer for this phase. LMS integration is a V2 backend decision after the experience itself is validated. |
| Real-time multiplayer or collaborative scenarios | Cross-role impact is a differentiator — why not show it live? | Without a backend, real-time multiplayer is technically infeasible. Attempting it with polling or peer-to-peer WebRTC adds architectural complexity that is entirely disproportionate to the learning gain. | Pre-authored cross-role outcome maps that show "here's what happened to the QA team when you made this choice" — same empathy goal, no infrastructure requirement. |

---

## Feature Dependencies

```
[SDLC Phase Structure — 7 phases as backbone]
    └──required by──> [Role-Specific SDLC Views]
                          └──required by──> [4 Friction Dimensions per Phase]
                                                └──required by──> [Cumulative Decision Scoring]
                                                                      └──required by──> [Decision Profile / Blind Spot Analysis]
                                                                                            └──required by──> [Cross-Role Impact Visualization]

[Scenario Debrief Structure (what happened / why / consequence / tomorrow's action)]
    └──required by──> [All 56 phase-role scenario nodes]

[Layer 1 Felt Friction (Door, Silent Button, etc.)]
    └──enhances──> [Layer 2 SDLC Walkthrough]
                       └──enhances──> [Designation Portal SDLC-Merged Journeys]

[localStorage Progress Persistence]
    └──required by──> [Cumulative Decision Scoring]
    └──required by──> [Phase-by-Phase Progression]
    └──required by──> [Cross-Role Journey (multiple designations)]

[Cumulative Decision Scoring]
    └──conflicts with──> [Per-Scenario Correct/Incorrect Binary Scoring]
    (binary scoring prevents pattern detection — schema must be designed for tendency, not correctness)

[Role Framing Screens]
    └──enhances──> [4 Friction Dimensions per Phase]
    (framing establishes whose lens the friction is viewed through)

[Cross-Role Impact Visualization]
    └──requires──> [Decision Profile / Blind Spot Analysis]
    └──enhances──> [Cross-Role Journey (multiple designations)]
```

### Dependency Notes

- **SDLC Phase Structure requires Role-Specific Views:** The SDLC backbone must be built as a shared structure with per-role content slots — not 8 separate SDLC implementations. This is the foundational architecture decision.
- **Cumulative Scoring requires 4 Friction Dimension Schema:** The scoring model must categorize choices along 4 axes before any scenarios are authored. Retrofitting scoring taxonomy after 224 scenarios are written is a rewrite.
- **Decision Profile requires Cumulative Scoring:** The profile is computed from the scoring record. Without a scoring system, the completion screen can only show generic feedback.
- **Cross-Role Impact requires Decision Profile:** Impact visualization is keyed to which profile archetype a learner received. Pre-authored maps ("if you're a Risk Deferrer PM, here's how QA experienced your sprint") require profile output as input.
- **localStorage Persistence required for Scoring:** Cumulative scoring across a 7-phase journey (potentially across sessions) requires reliable client-side state. State schema must be designed before phase content is built.
- **Binary Scoring conflicts with Pattern Scoring:** Choosing one scoring model commits the content authoring. Hybrid models (some choices right/wrong, some tendency-weighted) create inconsistent debrief UX and should be avoided.

---

## MVP Definition

This is a brownfield overhaul of an existing platform. "MVP" here means the minimum feature set to deliver the CEO's goal: a measurably transformed decision-maker after completing a designation journey.

### Launch With (v1) — Designation Portal Overhaul

- [ ] **SDLC-merged designation journeys** — each role walks through all 7 phases with role-specific scenarios. Without this, the portal continues to feel disconnected from how projects actually work.
- [ ] **4 friction dimensions per phase** — at minimum, 2 of the 4 (internal bureaucracy + conflict avoidance) are the missing dimensions that differentiate this platform. Client friction already exists; knowledge gaps are high-value additions.
- [ ] **Scenario debrief structure (what happened / why / consequence / tomorrow's action)** — must be mandatory and consistent across all phase-role nodes. This is the behavior change delivery mechanism.
- [ ] **Cumulative decision scoring schema** — must be designed and implemented before scenario content is authored. Even if the profile output is simple in v1, the scoring infrastructure enables everything downstream.
- [ ] **Basic decision profile on completion screen** — even a simplified "here's your tendency pattern" output at role journey end delivers more value than the current static completion screen.
- [ ] **Layer bridging (Layer 1 → Layer 2 → Designation Portal)** — navigation connecting the layers so the learning arc is traversable without dead ends. This is a structural fix, not new content.
- [ ] **localStorage progress persistence across 7 phases** — users should be able to resume a role journey. A 7-phase journey that resets on browser close is not viable.

### Add After Validation (v1.x)

- [ ] **Full decision profile archetypes with named blind spots** — richer profile output with archetype names and specific behavioral language ("Approval Absorber," "Scope Silencer"). Add after confirming learners engage with basic profile output.
- [ ] **Cross-role impact visualization** — pre-authored consequence maps showing how this role's decisions affected adjacent designations. Add once at least 3 role journeys are complete and scoring is validated.
- [ ] **Conflict avoidance compound consequence chains** — phase-to-phase consequence carry-forward where an early avoidance decision surfaces as a downstream cost. Technically feasible but content complexity is high. Add after base scenarios prove effective.
- [ ] **Client experience audit and funnel friction improvements** — the client-facing primer and funnel scenarios (Bait, Chaos, Maze, Trap, Wall) need auditing, but this is lower priority than the designation portal overhaul.

### Future Consideration (v2+)

- [ ] **Cross-role journey with compounding insights** — completing multiple designations produces a cross-role behavioral map. Requires all 8 designation journeys to be complete and the profile system to be validated first.
- [ ] **Backend and user accounts** — cohort tracking, organizational reporting, LMS integration. Out of scope for this phase per PROJECT.md. Validated experience first, infrastructure second.
- [ ] **AI-adaptive scenario branching** — scenarios that adapt based on prior choices within a session. High complexity, high cost, depends on backend and session state infrastructure that doesn't exist yet.

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| SDLC-merged designation journeys (structural backbone) | HIGH | HIGH | P1 |
| 4 friction dimensions per phase (content) | HIGH | HIGH | P1 |
| Scenario debrief structure (what happened / why / tomorrow's action) | HIGH | LOW | P1 |
| Cumulative decision scoring schema | HIGH | MEDIUM | P1 |
| localStorage progress persistence across phases | HIGH | LOW | P1 |
| Layer bridging (navigation connecting all layers) | HIGH | LOW | P1 |
| Basic decision profile on completion screen | HIGH | MEDIUM | P1 |
| Role-specific SDLC views (same phases, different decisions) | HIGH | MEDIUM | P1 |
| Approval bottleneck scenarios | HIGH | MEDIUM | P1 |
| Knowledge silo / handover failure scenarios | HIGH | MEDIUM | P1 |
| Full blind spot archetypes with named profiles | MEDIUM | MEDIUM | P2 |
| Cross-role impact visualization (pre-authored maps) | HIGH | HIGH | P2 |
| Conflict avoidance compound consequence chains | HIGH | HIGH | P2 |
| Client experience audit (funnel friction) | MEDIUM | MEDIUM | P2 |
| Cross-role journey (multiple designations, compounding) | HIGH | HIGH | P3 |
| LMS integration / xAPI reporting | LOW | HIGH | P3 |
| AI-adaptive scenario branching | HIGH | HIGH | P3 |

**Priority key:**
- P1: Must have for this overhaul to deliver on the CEO's transformation goal
- P2: Should have — adds meaningful depth once P1 is validated
- P3: Future phase — depends on backend infrastructure or V2 scope decisions

---

## Competitor Feature Analysis

Direct competitors for this exact combination (Indian B2B context + role-based SDLC simulation + behavioral change profiling) do not appear to exist as a distinct category. Relevant analogues:

| Feature | Generic eLearning (Articulate, iSpring) | Leadership Sims (Mursion, SymTrain) | Security Training (Immersive Labs, Security Journey) | Our Approach |
|---------|------------------------------------------|------------------------------------|------------------------------------------------------|--------------|
| Branching scenarios | Yes — click-through branches, binary right/wrong | Yes — AI-avatar voice roleplay | Yes — application sandboxes, CTF challenges | Narrative branches with tendency-weighted scoring, not binary correctness |
| Role-based paths | Yes — role-filtered content libraries | Yes — persona-based avatar scenarios | Yes — role-based (Dev, AppSec, etc.) learning paths | Role-specific decisions at every SDLC phase node, not role-filtered generic content |
| Cumulative scoring / pattern tracking | Rare — mostly per-module scores | Partial — session behavior scoring | Yes — Developer Security Knowledge Assessments | Cross-journey behavioral pattern with blind spot archetypes |
| Cross-role impact | No | No | No | Pre-authored consequence maps showing downstream role impact |
| SDLC backbone | No | No | Yes — Secure SDLC phases | Full 7-phase SDLC as the structural backbone, not a curriculum category |
| Behavioral change output | No — certificates | Partial — coaching debrief prompts | Partial — champion program, certifications | Decision profile with named tendency, actionable commitment, no certificate |
| Internal bureaucracy / conflict avoidance scenarios | No — focus is product or compliance | Partial — interpersonal conflict sims | No | Explicit 4-dimension friction taxonomy including internal friction, not just client-facing or technical |
| Real-world organizational context | Generic Western corporate | Generic | Generic enterprise | Indian B2B context (IBC, SAP, TCS, enterprise procurement cycles) |

The market gap this platform occupies is real: no existing platform combines SDLC-phase structure + role-specific organizational friction + behavioral pattern profiling + Indian enterprise context.

---

## Sources

- [Cathy Moore — Action Mapping and Scenario Design Principles](https://blog.cathy-moore.com/how-to-design-scenario-based-training/)
- [Cathy Moore — 12 Ways to Use Training Scenarios](https://blog.cathy-moore.com/12-cool-ways-to-use-scenarios/)
- [Immersive Labs — Secure SDLC Training](https://www.immersivelabs.com/solutions/secure-sdlc-training)
- [eLearning Industry — Gamification in Employee Training and Development](https://elearningindustry.com/gamification-in-employee-training-and-development-turning-learning-into-measurable-performance)
- [eLearning Industry — Simulation-Based Learning in Corporate Training](https://elearningindustry.com/simulation-based-learning-in-corporate-sales-training-role-play-at-scale)
- [Stornaway.io — Interactive Branching Scenario Training](https://www.stornaway.io/interactive-branching-scenario-training-the-future-of-elearning/)
- [Mursion — AI-powered Upskilling Platform](https://www.mursion.com/)
- [SymTrain — Training Simulation Software Guide 2025](https://symtrain.ai/training-simulation-software/)
- [ELM Learning — What Are eLearning Simulations](https://elmlearning.com/blog/simulations-elearning/)
- [eLearning Industry — Top Scenario-Based Learning Content Providers 2025](https://elearningindustry.com/top-content-providers-scenario-based-learning-corporate-training)
- [Education and Training Academy — Scenario-Based Learning for Conflict Management](https://educationandtrainingacademy.co.uk/unlocking-the-potential-of-scenario-based-learning-for-conflict-management/)
- [Chief Learning Officer — Beyond the Bot: AI and UX Design in Learning Organizations](https://www.chieflearningofficer.com/2025/12/17/beyond-the-bot-how-ai-and-ux-design-are-creating-smarter-learning-organizations/)
- [PMC — Immersive Education: Principles and Methods](https://pmc.ncbi.nlm.nih.gov/articles/PMC11659684/)
- [eLearning Industry — eL earning Trends 2026](https://www.penceo.com/blog-elearning-platform/elearning-trends-learning-development-2026)

---
*Feature research for: Experiential UX Training Platform — Role-Based SDLC Simulation with Behavioral Change System*
*Researched: 2026-03-23*
