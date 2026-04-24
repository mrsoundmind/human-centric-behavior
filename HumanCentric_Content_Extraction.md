# HumanCentric Behavior — Complete Content Extraction

> **Purpose:** Exhaustive structured extraction of all product content, teaching content, section logic, user-facing knowledge, and training material inside the HumanCentric Behavior platform. Intended for use in building role-based checklists, prompt-based internal support systems, and understanding the full teaching architecture.

---

## 1. Product Overview

### What the App Is
An **experiential learning platform** built by Zyxware Technologies that teaches people how design choices impact software delivery, teams, budgets, and end-users. It is NOT a training portal or course — it is an immersive experience where users feel UX friction firsthand, then connect those feelings to real-world software delivery consequences.

- **Tagline:** "This is not training. This is an experience."
- **Promise:** "You won't be tested. You won't be scored. You will simply notice things differently after."

### Core Purpose
- Make UX friction viscerally felt before intellectually understood
- Show that UX is a delivery system outcome — not a designer's job
- Build empathy across roles for the user on the other side of every decision
- Connect design decisions to business outcomes, rework cost, and team dynamics

### Primary Internal Training Purpose
- Cross-functional UX literacy for all Zyxware staff (8 roles)
- Each role sees how their specific decisions create or prevent user friction
- Shifts identity: from "task completer" to "outcome owner"
- Provides concrete scripts, rubrics, and commitments for behavioral change

### Client-Facing Purpose
- Demonstrate Zyxware's UX expertise to B2B clients
- Build the business case for UX investment using revenue math
- Give clients a shared vocabulary so they arrive at projects better prepared
- Connect physical-world design principles to digital product decisions

---

## 2. Navigation / Route Map

### Route Table

| Route | Component | Audience | Purpose |
|-------|-----------|----------|---------|
| `/` | `ExperienceController` | General public / anyone building software | Main 3-layer progressive experience |
| `/client` | `ClientExperience` | B2B clients / executives | Revenue-focused UX education |
| `/internalteam` | `InternalExperience` | Zyxware staff (all roles) | Role-specific UX literacy training |
| `client.*` subdomain | `ClientExperience` | B2B clients | Auto-routes to client path |
| `*` | `NotFound` | — | 404 page |

---

### Main Path: The Three Layers (`/`)

#### Layer 1 — "FEEL" (Always unlocked)
The user experiences 4 deliberately broken UX moments with no explanation — just friction.

| Screen | Component | What User Experiences |
|--------|-----------|----------------------|
| Intro | `IntroScreen` | Welcome, promise, "let's begin" |
| Door | `DoorExperience` | Ambiguous push/pull door — confusion, failed attempts |
| Silent Button | `SilentButtonExperience` | Form submission with zero feedback — anxiety, rage-clicking |
| Confusing Form | `ConfusingFormExperience` | Phone number with hidden format — guessing, frustration |
| Delayed Response | `DelayedResponseExperience` | 8-second search with no indicator — uncertainty, extra clicks |
| Pattern Pause | `PatternPause` | Reflection: "Different situations. Same feeling." |
| Bridge | `BridgeToWork` | Connects the friction felt to their role as builders |

**Unlock rule:** Completing 2+ Layer 1 experiences unlocks Layer 1.5.

#### Layer 1.5 — "UNDERSTAND" (Unlocked after 2 Layer 1 completions)
Two phases that build UX vocabulary and pattern recognition.

| Screen | Component | What User Experiences |
|--------|-----------|----------------------|
| Pattern Recognition | `PatternRecognitionPhase` | 4 dark/deceptive UX patterns revealed with reflection |
| UX Naming | `UXNamingPhase` | Learns what UX is, what it costs, who shapes it |
| Layer 1.5 Complete | `Layer15Complete` | Bridge to Layer 2 |

**Unlock rule:** Completing UX Naming unlocks Layer 2.

#### Layer 2 — "APPLY" (Unlocked after Layer 1.5 completion)
Full SDLC simulation: "Client Portal Redesign" project spanning 7 phases.

| Phase | Component | Core Decision/Learning |
|-------|-----------|----------------------|
| Intro | `Layer2Intro` | Sets the project context |
| Discovery | `DiscoveryPhaseNew` | User research vs. assumptions; persona building |
| Requirements | `RequirementsPhaseNew` | Scope definition; vagueness vs. clarity |
| Design | `DesignPhaseNew` | Component choices; UX pillars; trade-offs |
| Development | `DevelopmentPhase` | Tech stack; complexity; performance |
| Testing | `TestingPhase` | Bug triage; defer vs. fix; launch readiness |
| Launch | `LaunchPhase` | Deploy; live feedback; NPS scorecard |
| Maintenance | `MaintenancePhase` | UX debt surface; post-launch backlog |
| Complete | `Layer2Complete` | Final insights; accumulated debt review |

---

### Client Path (`/client`)

| Phase | Screens | What Is Taught |
|-------|---------|----------------|
| Primer — Physical World | Door, Stove, Ketchup | Signifiers, Natural Mapping, Efficiency |
| Business Case Intro | ClientBusinessIntro | "Marketing fills the bucket. Bad UX punches holes in the bottom." |
| Funnel Analysis | Bait, Chaos, Wall, Maze, Trap | 5 digital anti-patterns shown as scenarios |
| Revenue Loss | ClientRevenueLoss | Cost calculator — bleeds $X/month |
| Fix Intro | ClientFixIntro | "Now watch what happens when we respect the user" |
| Revenue Gain | ClientRevenueGain | UX dividend calculator |
| Final Connect | ClientFinalConnect | Partnership CTA with Zyxware |

---

### Internal Team Path (`/internalteam`)

| Phase | Screens | Purpose |
|-------|---------|---------|
| Onboarding (all roles) | ProjectBrief → SlackWarRoom → SystemReaction → DecisionLensUnlock → IdentityReflection | Shared crisis scenario; instills UX lens |
| Role Selection | DesignationSelect | Choose from 8 roles |
| Role Briefing | RoleBriefingView | Role-specific expectation setting |
| Role Journey | 8 role files | 3 scenarios each; decisions + outcomes |
| Masterclass Complete | RoleMasterclassComplete | Paradigm shift, commitments, scripts, rubric |

---

## 3. Full Content Inventory

### 3.1 IntroScreen

**Stage 0 — Welcome:**
- "Zyxware Human Centric Lab"
- "This is not training."
- "This is an experience."
- "You won't be tested."
- "You won't be scored."
- "You will simply notice things differently after."

**Stage 1 — Begin:**
- "Let's begin with something familiar."
- "Everyday moments you've felt before."

**CTAs:** "I'm ready" / "Start"

---

### 3.2 Layer 1 — Friction Experiences

#### DoorExperience

**Context copy:**
- "A familiar moment"
- "You're rushing to a meeting. 15 seconds late."
- "The conference room is just through this door."

**Interaction feedback:**
- "The door doesn't move."
- "Still nothing."
- "The sign says PUSH..."
- "The door opens." (on pull)

**Teaching reflection (shown after):**
- **What happened:** "The sign said PUSH. But the door needed to be pulled."
- **How it felt:** "You pushed X times before trying something else. Each failed attempt added a tiny moment of confusion. A small friction you didn't ask for."
- **What the system did:** "The door's design gave you incorrect information. The handle's placement, the sign's instruction — they worked against each other. You hesitated because the system made you hesitate."
- **Closing line:** "This happens more than you notice."

**CTAs:** "Approach the door" / "Push" / "Pull" / "Continue"

---

#### SilentButtonExperience

**Context copy:**
- "A routine task"
- "You need to submit a form. A simple action."
- "Just click the button and you're done."

**Interaction feedback:**
- "Did it work?"
- "Nothing seems to happen."
- "Is it broken?"
- "You've clicked X times."
- "Form submitted successfully." (delayed)

**Teaching reflection:**
- **What happened:** "You clicked the button X times. The first click worked. The rest were unnecessary."
- **How it felt:** "The button gave you nothing. No movement, no color change, no message. You were left wondering: Did it register? Is something happening? Should I try again?"
- **What the system did:** "The system heard you the first time. But it stayed silent. That silence created uncertainty. And uncertainty created more clicks, more frustration, potential duplicate submissions."
- **Closing line:** "Systems that don't speak create users who don't trust."

---

#### ConfusingFormExperience

**Context copy:**
- "Almost there"
- "One last field. Your phone number."
- "Enter it and you're done."

**Error messages shown:**
- "Invalid format"
- "Please enter a valid phone number"
- "Format error: check your input"
- "Invalid phone number format"

**Hint (shown after 3 failed attempts):** "(try: +91 99999 88888)"

**Teaching reflection:**
- **What happened:** "You tried X different formats before finding the one that worked: +91 XXXXX XXXXX."
- **How it felt:** '"Invalid format." But which format? You were left guessing, trying variations, feeling increasingly frustrated with each failed attempt. Not because you made an error — but because the system never showed you the way.'
- **What the system did:** "The form had expectations it never shared. It knew the exact format it wanted. It watched you fail. It said 'invalid' but never said 'here's how.'"
- **Closing line:** "Every guessing game is a choice someone made."

---

#### DelayedResponseExperience

**Context copy:**
- "Quick search"
- "You need an answer. Just a quick lookup."
- "Type your query and search."

**During wait:** "Still working..." (shown after several seconds — intentionally delayed)

**Teaching reflection:**
- **What happened:** "You searched. Then you waited. The screen was empty. No progress bar, no spinner, no indication that anything was happening."
- **How it felt:** "You clicked or typed X times while waiting. Not because you needed to — but because the silence was uncomfortable. You filled the void with activity."
- **What the system did:** "The system was working. It was processing your request. But it didn't tell you. That 8-second wait could have felt like 2 seconds with proper feedback. Instead, it felt like forever."
- **Closing line:** "Perceived time is designed time."

---

#### PatternPause

- "Different situations."
- "Different systems."
- "Same feeling."

---

#### BridgeToWork

**Stage 0:** "You experience moments like this every day."

**Stage 1:**
- "As a user, you feel these frictions. You notice when something works against you."
- "The confusing door. The silent button. The cryptic form. The endless wait."

**Stage 2:**
- "Now imagine creating these moments for others."
- "Every feature you build. Every screen you design. Every flow you implement. Someone will experience it."

---

### 3.3 Layer 1.5 — Understanding

#### PatternRecognitionPhase

**Intro:**
- "Different situations. Different systems. Same feeling?"
- "Let's look at some moments you may recognize."

**Pattern 1 — The Checkbox (Defaults)**
- Setup: "You're signing up for a service. Terms and conditions appear."
- Interaction: "The 'Subscribe to newsletter' checkbox is already checked."
- Feeling: "You almost missed it. You feel slightly tricked."

**Pattern 2 — The Password (Constraints)**
- Setup: "Creating an account. You enter a password you'll remember."
- Interaction: "Error: 'Must contain uppercase, number, and special character.' Your password gets rejected."
- Feeling: "Now you have to create something you'll forget."

**Pattern 3 — The Popup (Timing)**
- Setup: "Reading an article. You're halfway through the second paragraph."
- Interaction: "A popup appears asking for your email. The X button is tiny."
- Feeling: "Your attention breaks. Finding the close button takes longer than it should."

**Pattern 4 — The Price (Information)**
- Setup: "About to checkout after adding items to cart."
- Interaction: "Shipping cost appears only at the final step."
- Feeling: "You've invested time. Walking away feels wasteful. Continuing feels manipulated."

**Collective reflection (shown after all 4):**
- "A checkbox designed to be missed."
- "A password rule appearing too late."
- "A popup timed to interrupt."
- "A price hidden until commitment."
- "None of these happened by accident."
- "Someone decided where the checkbox would be."
- "Someone chose when to show the error."
- "Someone designed the popup timing."
- "Someone placed the shipping cost at the end."
- "Every frustration you felt was created by a decision."

---

#### UXNamingPhase

**Stage: INTRO**
- "What you've been experiencing has a name."
- "**User Experience**"

**Stage: DEFINE**
- "User Experience is how something feels to use over time."
- "The door that opened when you pulled. That moment of confusion was part of the experience."
- "The button that gave no feedback. That uncertainty was part of the experience."
- "The form that didn't explain itself. That frustration was part of the experience."

**Stage: NOT-UI**
- "User Experience is not UI."
- LEFT: "UI is what you see" → "Colors, fonts, buttons, layouts."
- RIGHT: "UX is what you feel" → "Confusion, relief, frustration, trust."
- "A beautiful interface can still create a frustrating experience."
- "A simple interface can still feel effortless."

**Stage: COST**
- "The cost of UX appears in different places."
- "Users get confused → Support tickets pile up"
- "Users abandon tasks → Drop-off rates increase"
- "Users make mistakes → Rework and corrections"
- "Users distrust the system → Adoption stalls"
- "Teams fix symptoms, not causes → Escalations and blame"
- "UX isn't decoration. It's how systems either work for people or against them."

**Stage: EVERYONE**
- "UX is shaped by every role."
- "Requirements: What gets included shapes what users can do"
- "Design: How things look affects how they feel"
- "Development: How things are built affects how they behave"
- "Testing: What gets caught prevents user frustration"
- "Timeline pressure: What gets cut changes what users receive"
- "Stakeholder priorities: What gets attention shapes the outcome"
- "UX is a system outcome. Everyone contributes to it — whether they intend to or not."

**Stage: COMPLETE**
- "User Experience is how something feels to use over time."
- "It's shaped by decisions, not accidents."
- "It's created by everyone involved in building systems."
- "Its cost appears as confusion, rework, support, and frustration."
- "You've felt UX. You understand UX. Now see how it's created in delivery."

---

#### Layer15Complete

- "Understanding complete."
- "You've felt UX as a user. You understand what creates it."
- "Now, one question remains: At what exact moments in delivery do teams unintentionally create the frustrations users experience?"
- CTA: "See where UX is created"

---

### 3.4 Layer 2 — SDLC Simulation

#### Layer2Intro

**Stage 0:**
- "Layer 2 — Apply"
- "You felt the friction. Now see where it starts."
- "Every frustrating experience has an origin point. You're about to watch one form."

**Stage 1:**
- "A new project just landed in your inbox"
- "You're part of a design team. A client has accepted your proposal. Watch how the project unfolds."

---

#### Discovery Phase (DiscoveryPhaseNew)

**Screen 1 — Client Chat:**
- Vikram Shah (VS): "Hey, just following up on the proposal you sent last week."
- PM: "Hi Vikram! Yes, we reviewed everything on our end. Looks good to proceed."
- VS: "Great! When can we start? We're on a bit of a deadline."
- PM: "We can kick off Monday. Could you email over the full brief with all your requirements?"
- VS: "Perfect, I'll send it over today. Looking forward to working together!"

**Screen 2 — Team Chat:**
- PM: "Heads up team - the TechStartup project is a go! They just confirmed."
- PM: "Vikram is sending over the brief. Check your email - should arrive shortly."
- PM: "We'll need to understand their users first before jumping into design. Let's not make assumptions."

**Screen 3 — Client Email (full verbatim):**
- **From:** Vikram Shah (CEO, TechStartup Inc.)
- **Subject:** "Website Project - Urgent"
- **Body:** "Quick one - we need a website up and running ASAP. Our current site is embarrassingly outdated and we're losing leads. We're a B2B tech consulting firm. Main goal is to get people to contact us. Think clean, modern look - like what you see on Stripe or Linear. Nothing too flashy but it should feel premium. Need the usual pages - home, about us, services, contact. Make sure the contact form is prominent, that's the whole point. Navigation should be simple, don't want visitors getting lost. Oh and it HAS to work well on mobile. Most of our audience is browsing on phones. Timeline: 4 weeks. We have a big pitch coming up. Budget: ₹2.5 lakhs, flexible if needed. Can we do a quick call tomorrow to kick this off? Thanks, Vikram"

**Screen 4 — Brief Gap Analysis (4 gaps):**

1. **Design Direction**
   - Client said: "Clean, modern look... feel premium"
   - Gap: "What does 'premium' mean to them? Dark mode? Minimal? What examples do they like?"
   - Effect if skipped: "Multiple revision rounds, 'I'll know it when I see it' feedback, wasted design time"
   - Fix: "Ask: 'Can you share 3 websites that feel premium to you and explain what makes them feel that way?'"

2. **Contact Form**
   - Client said: "Contact form is prominent, that's the whole point"
   - Gap: "What fields? Name/email only or detailed inquiry? What happens after submission?"
   - Effect: "Wrong form fields → users abandon, or too simple → unqualified leads flood inbox"
   - Fix: "Ask: 'What info do you need to qualify a lead? What's your response time target?'"

3. **Navigation**
   - Client said: "Simple navigation, don't want visitors getting lost"
   - Gap: "How many pages exactly? What's the priority order? Any secondary nav needed?"
   - Effect: "Information architecture problems, important pages buried, users can't find what they need"
   - Fix: "Ask: 'What's the #1 page you want visitors to find? Walk me through a typical visitor's journey'"

4. **Mobile Experience**
   - Client said: "HAS to work well on mobile. Most of our audience is browsing on phones"
   - Gap: "Do they have data on mobile vs desktop? Same content priority or different?"
   - Effect: "Desktop-first design crammed into mobile, key actions hard to reach, slow load times"
   - Fix: "Ask: 'What percentage of your current traffic is mobile? What do mobile users do vs desktop?'"

**Screen 5 — Personas:**

Assumption/Reality reveals:
- "Users browse on desktop" → Reality: "78% of first-time visitors are on mobile"
- "Users read everything carefully" → Reality: "Average attention span: 8 seconds"
- "Users trust our brand" → Reality: "87% check reviews before buying"

**Persona 1 — Rahul Mehta (Operations Manager, Age 34):**
- Context: "Browses on phone during 15-min train commute. Makes quick decisions under pressure."
- Quote: "If I can't figure it out in 30 seconds, I'm moving on."
- Pain Points: Too many options, Slow loading, Long forms, Cluttered layouts
- Behaviors:
  - "📱 Mobile-first — Uses phone 90% of time → Responsive layout essential"
  - "⚡ Decides in 60 sec — Leaves if confused → Clear CTA above fold"
  - "📝 Hates long forms — Drops at 4+ fields → 3 fields maximum"
  - "👆 Thumb scroller — One-hand usage → Bottom navigation"

**Persona 2 — Priya Sharma (Business Owner, Age 42):**
- Context: "Researches on desktop after hours. Compares 3-4 vendors before deciding."
- Quote: "I need to trust you before I give you my business."
- Pain Points: Vague pricing, No testimonials, Generic content, Hidden contact
- Behaviors:
  - "🔍 Compares vendors — Opens 4 tabs → Clear differentiators"
  - "🛡️ Needs proof — Looks for reviews → Testimonials visible"
  - "💰 Pricing clarity — Leaves if hidden → Show pricing upfront"
  - "👤 Wants to know you — Reads About page → Team photos, story"

**Persona 3 — Amit Kumar (IT Manager, Age 38):**
- Context: "Evaluates technical fit. Needs details for leadership presentations."
- Quote: "Will this integrate with what we already have?"
- Pain Points: Marketing fluff, No docs, Hidden specs, No API info
- Behaviors:
  - "⚙️ Wants specs — Looks for stack → Technical details page"
  - "📄 Downloads docs — Needs PDFs → Case studies section"
  - "🔒 Security first — Checks compliance → Certifications shown"
  - "🔌 Integration focus — Needs API docs → Developer portal"

**Screen 6 — Pressure:**
- PM (10:02 AM): "Design kickoff is Wednesday."
- Client (10:15 AM): "Excited to see the first designs!"
- PM (10:23 AM): "Can we start with what we have, or do we need more discovery?"
- Decision: "Push back (+3 days): 'Let's schedule quick user calls first.'" vs. "Start designing (Fast): 'We're ready, let's go with what we have.'"
- Footer: "This decision shapes everything that follows."

**Screen 7 — Consequence (If No Discovery):**
Form with 7 fields based on assumptions (First Name, Last Name, Email, Phone, Company, Job Title, Message).
- Rahul's reaction: "Sees 7 fields → 'I'll do this later' (closes tab)"
- Results: "7 fields | 3+ minutes | 60% completion rate"

**If Discovery Done:**
Form with 3 fields only (Name, Contact, How can we help?).
- Results: "3 fields | 45s to complete | 85% completion rate"

**Screen 9 — Root Causes (3 myths):**

1. "We already know our users"
   - Reality: "Every project brings new context. Past experience ≠ current reality."
   - Cost: "Assumed desktop → Built for wrong device"
   - Fix: "30-min call reveals: 78% are on mobile"

2. "We don't have time"
   - Reality: "Building wrong takes 10x longer than asking right."
   - Cost: "3 days saved → 3 weeks fixing later"
   - Fix: "3 days for research → Ship once, correctly"

3. "Asking looks unprofessional"
   - Reality: "Guessing breaks trust. Questions build it."
   - Cost: "Fast delivery → Client unhappy when users bounce"
   - Fix: "Thorough process → Client delighted with results"

**Screen 10 — Principle:**
- Pattern: "Short-term comfort → Long-term pain"
- Discovery inverts this: "Short-term investment → Long-term success"
- Metric comparison:
  - No Discovery: "7 fields → 3+ minutes → 60% abandon"
  - With Discovery: "3 fields → 45 seconds → 85% completion"

**Screen 11 — Discovery Activities (puzzle):**

1. **User Research** — "Understanding who your users are, their needs, pain points, and goals through interviews, surveys, and observation."
   - If skip: "Design based on assumptions → Build wrong features → Users abandon"
   - If do: "Design based on reality → Build right features → Users succeed"
   - UX Impact: "Every assumption without validation is potential friction for real users."
   - Example: "You learned Rahul is mobile, has 60 seconds, hates forms → Built 3-field form instead of 7"

2. **Stakeholder Interviews** — "Talking to business stakeholders to understand goals, constraints, priorities, and success metrics."
   - If skip: "Build features client didn't actually want → Misaligned product → Wasted effort"
   - If do: "Align with business goals → Clear priorities → Efficient development"
   - UX Impact: "If you don't understand why the product exists, you might optimize for the wrong outcomes."
   - Example: "Client says 'We want more leads' → Now you know the contact form is the priority"

3. **Competitive Analysis** — Understanding the market landscape before building.

**Screen 12 — Takeaway:**
- "Discovery is where misunderstandings get clarified before they become expensive."
- Key lesson: "Questions are faster than iterations."

---

#### Requirements Phase (RequirementsPhaseNew)

**Story Bridge:**
- "Discovery isn't about the client. It's about the client's users."
- "Know your user first — Before designing, understand who you're designing for"
- "User context drives decisions — Device, time, and mindset shape what works"
- "Discovery prevents rework — 30 minutes of research saves weeks of fixes"

**Core client brief items (vague requirements):**
1. Navigation: "simple, don't want visitors getting lost"
2. Hero Section: "clean, modern look - feel premium"
3. Contact Form: "prominent, that's the whole point"
4. Services Page: "usual pages - services"
5. About Page: "usual pages - about us"

**Core lesson:** Every vague requirement = an assumption = future UX debt.

---

#### Design Phase (DesignPhaseNew)

**Story Bridge:**
- "From Requirements to Reality"
- "Vikram handed you the requirements. Now you face the blank canvas."
- "Lesson: Design isn't art. It's a series of trade-offs between Business, Tech, and User needs."

**Designer's internal questions:**
- "Will Rahul understand how to use this?"
- "Can the team build this in 4 weeks?"

**Available Components (with UX purpose):**
- Navigation Bar → "Users need to know where they are"
- Hero Section → "Answers 'What is this site?' immediately"
- Key Features → "Shows specific value, building competence trust"
- Services List → "Details exactly what is offered"
- Testimonials → "Social proof reduces anxiety"
- Contact Form → "The mechanism for users to act"
- Footer → "The safety net for lost users"

**UX Pillars:**
- **Clarity** — Users understand what this is
- **Credibility** — Users trust what they see
- **Conversion** — Users know how to take action

---

#### Development Phase (DevelopmentPhase)

**Screen 1 — Story Bridge:**
- Lead Developer quote: "I've looked at the designs. That Mega Menu is going to be heavy. And we need to validate all those form fields. We need to pick a stack that handles this complexity."
- Lesson: "Development isn't just typing. It's where design performance costs are paid."

**Screen 2 — Tech Stack Options:**

| Stack | Tagline | Pros | Cons |
|-------|---------|------|------|
| Vanilla JS + HTML | "Zero dependencies. Just raw code." | "Tiny Bundle Size (4KB)", "Total Control" | "Spaghetti Code Risk", "Slow Development", "Hard to Maintain" |
| React (CRA/Vite) | "Standard SPA architecture." | "Component Reusability", "Huge Ecosystem" | "Medium Bundle (150KB)", "Client-side Rendering" |
| Next.js (SSR) | "React framework with server-side powers." | "SEO Optimized", "Fast Initial Load", "Opinionated" | "Complex Setup", "Larger Baseline Bundle" |

- Lesson: "User Experience starts with Performance. The framework you choose sets the baseline load time."

**Screen 5 — Lighthouse Report:**
- "Initial Bundle Size" — "Mega Menu added +140KB" or "Simple Nav kept it light"
- "Contrast Ratio" — "AA Standard met"
- "Touch Targets" — "All buttons > 44px"

**Screen 6 — Lessons:**
1. "The Weight of Abstraction / The 3s Loading Rule" — "Frameworks (Next.js/React) give you speed, but cost the user 150KB+ of initial JS load."
2. "Complexity Compounding / Code Volume = Bug Surface" — "A 'cool' Mega Menu didn't just add UI — it added 450 lines of code, mobile logic, and state management."
3. "Integration Latency / The Logic Tax" — "Every form field isn't just a box directly to the database. It's a network request, a validation check, and a failure point."
4. "Performance is UX / The Perception Rule" — "Users don't care about your clean code. They care that the button didn't work because the JS hadn't hydrated yet."

**Final prompt:**
- "The code is written. The meaningful friction is baked in. Now, put on the QA Tester Hat. It's time to see what breaks."

---

#### Testing Phase (TestingPhase)

**Screen 1 — Story Bridge:**
- QA Lead quote: "I'm seeing some issues. Some look actionable, but a few of these feel like fundamental misunderstandings of the user. Should we log them?"
- Lesson: "Bugs aren't just code errors. They are the symptoms of skipped discovery, vague requirements, and rushed design."

**Screen 3 — Bug Triage:**
- Bug examples:
  - "Core Feature Missing: 'Export to PDF'" (critical, 4 days to fix)
  - "Menu Unusable on Mobile" (major, 3 days)
  - "Main Thread Blocked on Load" (major, 2 days)
  - "API Error 500 on 'Submit'" (major, 2 days)
  - "Typo in Hero Headline" (minor, 0.5 days)
- Tip: "Critical bugs (red) should usually be fixed. Deferring them creates massive UX Debt."

**Screen 4 — Report:**
- Quality labels: 90+ "Excellent" / 70-89 "Stable" / 50-69 "Buggy" / <50 "Broken"
- Low score message: "You are launching with significant debt. Validating upstream phases (Discovery/Design) would have prevented these issues."
- High score message: "Great work! You prioritized quality. The product is solid."
- Lesson: "High quality requires time. Rushing leads to 'Deferred' debt that users pay for."

---

#### Launch Phase (LaunchPhase)

**Screen 1 — Story Bridge:**
- Product Owner quote: "We've made a lot of hard choices to get here. I just hope the users understand what we're trying to do. Let's light this candle."

**Screen 3 — Live Feed (conditional content):**

If Discovery skipped:
- "@SarahExec: I'm looking for the PDF export? I can't present this to my board without it."
- "@DaveyUser: Ideally this would connect to my calendar. Sad it doesn't."

If Discovery done:
- "@SarahExec: This does exactly what I needed! The PDF export is a lifesaver."

If Mega Menu chosen:
- "@MobileMike: I can't close the menu on my iPhone. It covers the whole screen! 😡"

If Simple Nav:
- "@MobileMike: Nav is clean and simple. Love it."

If deferred bugs:
- "@AngryUser: Found a bug: [bug description]"

If high quality:
- "@TechReviewer: Surprisingly stable for a V1 launch. Kudos to the QA team."

**Screen 4 — Scorecard:**
- NPS labels: >50 "World Class" / >0 "Good" / >-50 "Poor" / ≤-50 "Disaster"
- If poor: "Users were frustrated by bugs you deferred." / "Design choices (Contrast/Nav) caused usability friction."
- Lesson: "Success isn't about code compiling. It's about user value. Every 'shortcut' in SDLC reduced this score."

---

#### Maintenance Phase (MaintenancePhase)

**Context Stage:**
- "The project launched. Months pass. Now you see what you actually built."
- "Support tickets, feature requests, and technical debt have accumulated. Some are new. Some are old decisions coming due."

**Maintenance Backlog Items:**
- (Bug) "Add keyboard navigation for accessibility compliance" — Source: "User group not researched in Discovery"
- (Feature) "Update dashboard to show originally expected metrics" — Source: "Dev assumption didn't match stakeholder intent"
- (Debt) "Refactor navigation to support new feature sections" — Source: "Simple sidebar can't accommodate growth"
- (Debt) "Untangle workaround code before adding new export formats" — Source: "Quick patches created dependencies"
- (Feature) "Client requests additional filter options" — Source: "Normal feature evolution"

**Compounding Notice (after 6 months):**
- "Unaddressed items are creating new issues. The accessibility gap is now a legal concern. The navigation limitation is blocking a major feature request."

**Reflection Stage:**
- "Every maintenance item has an origin story. The bug that 'appeared' in production was created in Discovery when a user group was skipped. The feature mismatch was born in Requirements when ambiguity wasn't clarified. The technical limitation came from a Design shortcut. UX debt compounds silently, then surfaces loudly."
- **Quote:** "We don't inherit codebases. We inherit decisions."

---

#### Layer2Complete

**Key Learnings:**

1. **Decisions compound**
   - "A skip in Discovery became a blocked ticket in Development, became a deferred bug in Testing, became a support escalation in Maintenance."

2. **UX is a delivery outcome**
   - "The friction users feel isn't created by designers. It's manufactured across the entire delivery process, by everyone involved."

3. **Speed has a cost**
   - "Every shortcut felt reasonable in the moment. The cost wasn't visible until later — sometimes much later."

4. **Early care prevents late pain**
   - "The phases that felt 'far from users' — Discovery, Requirements — had the highest leverage on what users eventually experienced."

**Quotes from the platform:**
- "We unintentionally manufacture complexity."
- "UX stabilizes delivery — it doesn't decorate it."
- "Ignoring UX early is a leadership failure, not a design failure."

---

### 3.5 Internal Team Onboarding (All Roles)

#### ProjectBrief

**Step label:** "Step 1: The Input"

**Headings:**
- "Monday morning.\nA new brief lands."
- "Everyone on the team loved it. The budget is approved. The timeline is set."
- "But look closer. Notice what isn't there."

**CTAs:** "Scan document" / "Start the Project"

**Scan feedback:** "Scan complete. Click the highlighted gaps in the document to analyze the UX risk."

**Gap flags:**
- "No defined target audience, no user personas, no conversion goal specified." (critical)
- "Fixed bid with no scope change clause." (warning)
- "Hidden UX Gap Found"

**Document content (TechStartup brief):**
- Project Name: TechStartup Corporate Site
- Contract Type: Fixed Bid
- Client: Vikram Shah (CEO)
- Timeline: 4 Weeks
- Stated Requirements:
  - "B2B tech consulting website — primary goal: lead generation"
  - "Clean, modern look — references Stripe/Linear aesthetic"
  - "Must work well on mobile (client says 'most traffic from phones')"

---

#### SlackWarRoom

**Scene label:** "Deployment Critical: 6 Months Later"

**Slack thread (crisis):**
- Client Manager (10:42 AM): "Vikram is furious. Launch completed but conversion lift is only 2%. We promised 15%. What happened? @channel"
- Product Lead (10:43 AM): "We delivered all scoped features. The ticket queue is clear. It's exactly what he asked for in the brief."
- Tech Lead (10:43 AM): "The codebase is solid. 99.9% uptime. API performance is within 100ms. Infrastructure is not the bottleneck."
- Lead Designer (10:44 AM): "We used the exact Stripe/Linear aesthetic he referenced. The UI components are pixel-perfect to the Figma file."
- QA Lead (10:44 AM): "All test cases passed. 0 P1/P2 bugs in production. The site functions perfectly."

**Decision panel header:** "Your Response Required"

**Scenario text:** "The client is furious. The team is defensive. Everyone did their job perfectly, but the product failed. What is your immediate instinct to reply in this thread?"

**Choice 1 — Defend the Scope:**
- "We built exactly what was in the contract. Conversion wasn't a scoped deliverable."

**Choice 2 — Question the Goal:**
- "Wait. Who are the actual users visiting the site, and what do they actually want?"

---

#### SystemReaction

**Defensive path:**
- "You protected the scope. But the system reacted."
- "In a complex system, completing your exact tasks does not guarantee a successful outcome. Trace the ripples."

**Investigative path:**
- "You paused the panic. But the damage was done."
- "You asked the right question, but too late. Six months of development time had already been burned. Here is the cost."

**CTA:** "Trace the System Ripple"

**Impact Cards:**

1. **The Client's Story:** "They don't care about our Jira tickets or our perfect code. Their metrics failed. They feel ignored and will likely churn."
2. **The Team's State:** "Everyone is frustrated. Sales blames delivery. Delivery blames the client. Trust erodes because we operated in silos."
3. **The Business Cost:** "We will eat the cost of the rework to save the account, destroying the project's profitability."

---

#### DecisionLensUnlock

**Step 0:**
- Heading: "You've been taught to protect the **Project**."
- Body: "Budget. Timeline. Scope. These are project metrics. They keep the machine running, but they don't solve the user's problem."
- Button: "Reveal the alternative"

**Step 1:**
- Heading: "Start protecting the **Outcome**."

**Two-Column Cards:**
1. **The "Yes Trap":** "Saying yes to every client request feels safe in the moment, but it creates bloated, failing products that destroy long-term trust."
2. **The Friction Value:** "Pushing back early to define the actual user problem creates temporary friction, but guarantees long-term success."

**CTA:** "Acknowledge & Proceed"

---

#### IdentityReflection

**Section label:** "Step 3: Identity Calibration"
**Heading:** "Under pressure, what do you automatically protect?"
**Body:** "This is your instinct — not your job title. There is no right answer. Just your real default setting when things get tense."

**Instinct Cards (4 options):**

1. **"Get it done on time"**
   - "Even if the output isn't perfect. Speed is a form of respect."
   - Hidden Truth: "You absorb pressure to protect others from stress."

2. **"Keep everyone happy"**
   - "Even if it means working extra hours or expanding scope quietly."
   - Hidden Truth: "You say yes to preserve the relationship, not the plan."

3. **"Stick to what was agreed"**
   - "Even if the client asks for more. Boundaries protect everyone."
   - Hidden Truth: "You protect the system, even when it creates short-term friction."

4. **"Build it right"**
   - "Even if it takes longer. Rushing leads to rework that costs more."
   - Hidden Truth: "You push back on deadlines before shipping something imperfect."

**CTA:** "Confirm Identity & Begin Role"

---

### 3.6 Role Selection (DesignationSelect)

**Heading:** "Choose your role"
**Subheading:** "We'll show you the UX decisions you already make every day — and what happens when you see them clearly."

**Role Cards:**

| Role | Subtitle | Upgrade Promise |
|------|----------|-----------------|
| Sales | "Closing & Client Relationships" | "Turn every client touchpoint into a trust signal" |
| Product Manager | "Roadmap & Prioritization" | "Make faster, more confident scope decisions" |
| Developer | "Building & Shipping" | "See how every line of code shapes user experience" |
| Quality Assurance | "Testing & Advocacy" | "Move from pass/fail to full experience validation" |
| Client Relations | "Retention & Growth" | "Design the ongoing experience, not just the project" |
| Designer | "UX & Visual Design" | "Balance aesthetic instinct with measurable outcomes" |
| Strategy | "Direction & Vision" | "Translate user needs into sharper decisions" |
| Business Analyst | "Requirements & Translation" | "Catch the UX gaps before they become delivery disasters" |

**CTA:** "See your scenarios"

---

### 3.7 Role Briefings (RoleBriefingView)

| Role | Title | Expect | Discover | Why |
|------|-------|--------|----------|-----|
| Sales | "The Growth Engine" | "High targets, demanding clients, Q4 pressure" | "To master 'Strategic Tension'—pausing the 'Yes' to ensure the 'Delivery'" | "A signed contract is vanity. A successful deployment is revenue." |
| CRM | "The Relationship Guardian" | "A client will ask for 'just one small tweak' late in the process" | "How to say 'No' to scope creep without damaging the relationship" | "Unchecked client pleasing turns agile projects into death marches." |
| Strategy | "The Visionary" | "You must define the product's direction in a vague kickoff meeting" | "The difference between a 'Buzzword Strategy' and an 'Actionable North Star'" | "If the vision is blurry, the execution will be chaotic." |
| BA | "The Translator" | "You need to document requirements for a new feature" | "How vague acceptance criteria lead to features that work but fail the user" | "Developers build exactly what you write, not what you meant." |
| PM | "The Prioritizer" | "You have a tight deadline and need to decide what to build" | "The critical importance of defining 'Unhappy Paths' and error states upfront" | "Optimism bias ('Users will do it right') is the #1 cause of post-launch bugs." |
| Designer | "The Architect" | "You are designing a key interaction element" | "To balance aesthetic appeal with universal accessibility" | "Pretty UIs that exclude 20% of users are not 'clean', they are broken." |
| Developer | "The Builder" | "You are testing a new feature on your powerful machine" | "To empathize with users on low-end devices and poor connections" | "'It works on my machine' is not a valid definition of done." |
| QA | "The Gatekeeper" | "You encounter a feature that works technically but feels wrong" | "To move beyond 'Pass/Fail' testing to 'Usability' advocacy" | "A bug-free product that frustrates users is still a failure." |

---

### 3.8 Role Journeys (All 8 Roles — 3 Scenarios Each)

---

#### SALES JOURNEY (SalesJourney)

**Stage 1 — Prospecting: "The Top of Funnel"**
- Scenario: "Prospecting & The Authority Anchor"
- Story: "Marketing wants you to blast a generic 'Feature List' email to 1,000 prospects to hit quota. You are drafting an email to James Dalton, CTO of GLS."
- Why UX: "A generic automated email is a terrible User Experience for the buyer (high noise, low signal). Insight selling designs a premium top-of-funnel UX."
- Business Value: "Generate Pipeline that actually closes. A premium first-touch UX filters out price-shoppers and attracts strategic partners."
- UX Anchor: "Our goal isn't just to deploy software; it's to design a frictionless onboarding UX that reduces your team's time-to-value by 30%."

**Stage 2 — Diagnostic: "The Discovery"**
- Story: "You secured the Zoom meeting. James mentions a 14% efficiency drop. Sarah, your Pre-Sales Engineer, immediately starts demoing technical features."
- Why UX: "Pitching technical features before understanding the problem creates high cognitive load (Bad UX). Socratic discovery centers the user's specific workflow."
- Business Value: "Protecting Deal Value. If you let engineers feature-dump, the client compares you on price. If you diagnose the pain, you compare on value."
- UX Anchor: "Before we jump into the UI, let's map out your current workflow. What is the biggest UX bottleneck your team faces today?"

**Stage 3 — Alignment: "The Proposal"**
- Story: "James wants the pilot live in 4 weeks. Your VP says 'Say yes to get the signature.' Your PM says '4 weeks is impossible, the team will quit.'"
- Why UX: "Agreeing to an impossible timeline guarantees a broken delivery UX down the line. A Phased Approach designs a sustainable user journey."
- Business Value: "Ensuring Sustainability. Winning a deal that your delivery team cannot fulfill destroys both Client Trust and Internal Morale."
- UX Anchor: "I can get a signature today for a 4-week delivery, but that guarantees a rushed, broken rollout experience. Let's design a Phase 1 that guarantees success."

**Stage 4 — Partnership: "The Close"**
- Story: "The deal is blocked in Legal. Your internal counsel refuses to accept the client's uncapped liability redlines. The VP wants you to force it through."
- Why UX: "Procurement friction is directly inversely proportional to speed-to-value. Designing a smooth legal experience reduces the client's time-to-value."
- UX Anchor: "We aren't just selling a tool; we are building a long-term partnership. Let's design a procurement experience that protects both our entities."

**Stage 5 — LTV: "Handover"**
- Story: "The contract is signed. It's time to hand the account over to Mike, the Lead PM. Mike resents Sales for 'throwing things over the fence.'"
- Why UX: "The handover is the most critical UX touchpoint of the lifecycle. Transferring relationship capital ensures the user feels safe transitioning to Delivery."
- Business Value: "Maximizing Lifetime Value. A deal isn't won at signature; it's won when the client renews. Securing the handover UX secures the renewal."
- UX Anchor: "Mike isn't just an implementer; he's the chief architect of your ongoing User Experience. I am transferring all my executive capital to him."

---

#### CRM JOURNEY (CRMJourney)

**Stage 1 — The GST Validation Crisis**
- Story: "Your largest client (Mumbai L&D) is furious. Their vendor onboarding is blocked because the new GST check is too 'strict'. They've CC'd your CEO on an email."
- UX Connection: "CRM is the 'UX of Communication.' Your tone and speed determine if a technical friction remains a 'Minor Bug' or becomes a 'Total Relationship Failure.'"

**Choice 1 — Absorb & Personalize:**
- What: "Client felt 'heard' within 15 minutes. CEO de-escalated. Engineering worked without direct client heat."
- Why: "Optimized for the 'Client's Emotional Safety' first. Recognized that a 'strict bug' is a workflow disruption for them, not a logic problem."
- Who: "The Relationship Bridge: Acts as the safe harbor during technical storms."
- Tomorrow: "Never start an email with 'The system is working as intended.' Start with 'I understand this is blocking your onboarding.'"

**Choice 2 — Defend Technical Scope:**
- What: "Client felt you were 'robotic' and 'unhelpful'. Escalated again to the VP calling the partnership 'too rigid'."
- Why: "Confused 'Technical Compliance' with 'Solutioning'. Indian enterprise culture values 'Liaison' over 'Literalism'."
- Who: "The Manual Follower: Follows the spec while the building is on fire."
- Tomorrow: "Reframe 'No' as 'Yes, but here's how we manage the transition.'"

**Choice 3 — Deflect to Internal Team:**
- What: "Client now thinks your Dev team is 'incompetent'. Engineering Lead refused to join your next client call."
- Why: "Sacrificed organizational trust for personal 'Escapism'."
- Who: "The Deflector: Thinks they are a 'Third Party' between the client and the company."
- Tomorrow: "Use 'We' in every escalation. 'We found an edge case,' 'We are fixing it.' Never 'The Devs broke it.'"

**Stage 2 — The Emotional Feedback Loop**
- Story: "Client says: 'We want Google Sheets sync! This app is too slow!' (They actually mean: Their non-system regional managers can't see vendor data easily)."
- UX Connection: "Feedback is 'Encoded Friction.' CRM's job is to decode the scream for help into a requirement for change."

**Choice 1 — Forward Raw Feedback:**
- What: "PM ignored as 'un-prioritized feature creep'. Client felt 'Major Need' ignored."
- Who: "The Postman: Delivers the mail but doesn't care what's inside."
- Tomorrow: "Never forward a feature request. Forward a 'Problem Report' with a proposed 'Value Signal.'"

**Choice 2 — Distill JTBD Signal:**
- What: "Identified need was 'External Visibility'. PM prioritized 'Shareable Link' instead. Client delighted because it solved the 'Actual' problem in 10% of the time."
- Why: "Understood that 'Google Sheets' was a solution they imagined, not the only solution. Saved the team 120 hours of dev work."
- Who: "The Product Partner: Translates business frustration into product evolution."
- Tomorrow: "Ask the 'Magic Question': 'If you had this today, what's the first thing you'd do that you can't do now?'"

**Choice 3 — Monitor Silently:**
- What: "3 months later: Client cancels renewal because 'It doesn't work for our managers'. You missed the signal entirely."
- Who: "The Ostrich: Hides from the noise and misses the opportunity."
- Tomorrow: "No feedback is negative feedback. Reach out to 'Silent Accounts' once every 30 days with a usage insight."

**Stage 3 — The Renewal Runway**
- Story: "Renewal is in 45 days. Account Health is 'Yellow.' 3 features you promised in Q1 are delayed. PROCUREMENT wants a 15% discount."
- UX Connection: "Renewal is the 'Final Exam' of UX. If the daily experience was painful, the cost of 'Renewing' feels like a tax, not an investment."

**Choice 1 — Give the 15% Discount:**
- Outcome: "The Revenue Capitulation"
- Who: "The Price Cutter: Buys the renewal instead of earning it."
- Tomorrow: "Never lead with a discount. Lead with a 'Commitment to Quality Roadmap.'"

**Choice 2 — Focus on 'Trust-Fixes':**
- Outcome: "Trust Rebuilt through Result" — "Got Engineering to ship a 'Stability Patch' in 1 week. Renewal signed at 100%."
- Who: "The Value Keeper: Protects the product's worth through constant iteration."
- Tomorrow: "Renewal preparation starts on Day 1 of the contract. Track 'Value Realized' every month."

**Choice 3 — Delay for Q3 Promise:**
- Outcome: "The Over-Promise Crash" — "Account didn't renew. 100% Churn."
- Who: "The Vision Seller: Sells the future because they are afraid of the present."
- Tomorrow: "Fix the 'Floor' first. If basic features aren't stable, nobody cares about your AI Roadmap."

---

#### PM JOURNEY (PMJourney)

**Stage 1 — The IBC Commitment Crash**
- Story: "Your CTO announced AI-powered reconciliation goes live March 31. You found out from a LinkedIn post. Engineering says 10 weeks minimum. You have 3 weeks left."
- UX Connection: "Product commitments made without engineering validation are UX promises made without capacity. The gap between 'Announcement' and 'Reality' is where user trust dies."

**Choice 1 — Scope to 3-week MVP:**
- What: "Launched on March 31 with 67% accuracy. Manual process was 91%. Support volume spiked 300% in week 1."
- Who: "Date-First Culture: Ships on time but spends the next 6 months fixing the reputational damage."
- Tomorrow: "Write a 'Day 1 UX Minimums' document before any commitment. If accuracy is below manual baseline, the feature isn't ready."

**Choice 2 — Brief clients privately:**
- What: "CTO found out via a client email loop. Internal trust damaged."
- Who: "The Buffer PM: Protects the team and clients from the top, but fails to fix the structural planning issues."
- Tomorrow: "Brief upward within 24 hours of any roadmap shock. Quantify the delay cost immediately."

**Choice 3 — Prepare CTO Decision Brief:**
- What: "CTO read the brief comparing 67% vs 94% accuracy. Personally called clients to move the date. Engineering morale spiked — they felt 'seen'."
- Who: "The Strategic Orchestrer: Uses data to move the goalposts when the goal is unrealistic."
- Tomorrow: "Use a 'Decision Brief' template: 3-week version vs. 10-week version user impact. Make the trade-off visible."

**Stage 2 — The Founder's Custom Request**
- Story: "A ₹40Cr edtech client's Founder asked your VP for a 'Google Sheets Export.' Engineering says 4 sprints. 52 items are above it. VP says: 'What's the plan?'"
- UX Connection: "Building for organizational weight instead of user need creates 'Format Sprawl.' One-off features are usually signals of unmet generic needs."

**Choice 1 — Prioritize specific format:**
- What: "Shipped Google Sheets export in 8 weeks. Used by 6 people globally. 3 other clients now asking for Excel, PDF, and CSV."
- Who: "The Reactive PM: Builds a collection of client negotiation results instead of a product."
- Tomorrow: "Never accept a 'solution request' (e.g. Google Sheets) without a Discovery Call to find the 'workflow gap.'"

**Choice 2 — Reject based on vision:**
- What: "VP escalated your 'No' to the CPO. Feature was built anyway under emergency panic."
- Who: "The Fortress PM: Defends the backlog so hard they lose the political capital to actually lead it."
- Tomorrow: "Replace 'Reject' with 'Discovery.' If you can't say yes, say 'Let's find out what workflow this solves.'"

**Choice 3 — Perform pattern discovery:**
- What: "Discovery revealed people needed 'Shareable Links' for non-system users. Built a generic 'Share' feature in 2 sprints instead of 4. Edtech Founder delighted."
- Who: "The Product Architect: Finds the generic solution that satisfies the specific pressure."
- Tomorrow: "Add a 'Job to be Done' field to every feature intake. The request is the clue, the JTBD is the ticket."

**Stage 3 — The 'Done' State Delusion**
- Story: "Engineering marks 'onboarding' as done. Acceptance criteria met. But the empty state is just a blank white box."
- UX Connection: "Empty states are the moments of highest user uncertainty. A blank box says 'Broken' to a user, even if it's 'Finished' to an engineer."

**Choice 1 — Ship technical completion:**
- What: "18 support tickets: 'Is this page broken?' 4 major vendors abandoned the platform."
- Who: "The Ticket Pusher: Thinks checking boxes is the same as delivering value."
- Tomorrow: "Add 'Empty State' and 'Error State' as mandatory fields in every UI ticket's definition of done."

**Choice 2 — Delay for quality fix:**
- What: "Fixed the empty state over 2 days. Client logged a 'Yellow Flag' for delay."
- Who: "The Perfectionist: Understands the user but fails to manage the business environment."
- Tomorrow: "Frame every quality delay in user impact terms: 'Delaying 2 days to prevent X% drop-off.'"

**Choice 3 — Ship intentional 'Bridge' UX:**
- What: "Added an upload icon and one-line guide in 3 hours. Shipped on schedule. Support tickets from empty states: 0."
- Who: "The Pragmatic Leader: Knows when a 3-hour fix is better than a 3-day delay."
- Tomorrow: "Create a 'Known Experience Register' for UI bridges. Turn 'fix it later' into an actual plan."

---

#### DEVELOPER JOURNEY (DeveloperJourney)

**Stage 1 — The Circular 'Quick Fix'**
- Story: "Production incident: Reconciliation timing out for 5% of users. You found the line. It's a missing check in 'reconcile_logic.py'. You could fix it in 5 mins by importing the 'Auth' module, but 'Auth' already imports this module."
- UX Connection: "A 'Quick Fix' that creates a circular dependency is a hidden UX trap. It fixes one button but freezes the entire app's loading state."

**Choice 1 — Perform quick import fix:**
- What: "Timeout resolved in 10 mins. 30 mins later, 100% of users see a white screen on login. App cannot boot due to circular dependency."
- Who: "The Firefighter: Puts out the small fire by flooding the server room."
- Tomorrow: "Never import a 'higher level' module into a 'lower level' one. Use a shared 'utils' or 'types' library."

**Choice 2 — Warn PM of tech debt:**
- What: "Fixed without circular debt, but with manual hacks. Team velocity for next sprint dropped 15%."
- Who: "The Negotiator: Saves the day but leaves a bill for the next month."
- Tomorrow: "When warning about debt, provide a 'Cleanup Ticket' ID immediately. Don't just talk — track."

**Choice 3 — Isolate into Utility module:**
- What: "Refactored the check into 'validation_utils.py'. Incident fixed in 3 hours. Zero regression bugs found in UAT. The fix became the new standard for the team."
- Who: "The Craftsman: Understands that the fastest way is actually the right way."
- Tomorrow: "If you see a Circular Dependency error, it's a signal that your module is doing too much. Extract."

**Stage 2 — The Sprint 0 Velocity Trap**
- Story: "Client wants 12 features in 4 weeks. Engineering Lead says 'We need Sprint 0 for infrastructure.' PM says 'We don't have budget for a month of no features.'"
- UX Connection: "Infrastructure is the 'UX of the Codebase.' Without it, the app feels fast today but becomes frustratingly buggy in 3 months."

**Choice 1 — Bypass Sprint 0:**
- What: "Month 1: 12 features shipped. Month 3: 1 feature shipped. Month 4: 100% bug fixing."
- Who: "The Sprinter: Wins the start but never finishes the marathon."
- Tomorrow: "Never skip Sprint 0. Define it as 'UX Reliability Setup' so non-technical stakeholders understand its value."

**Choice 2 — Hybrid Infrastructure:**
- What: "Shipped 6 features and 50% of infrastructure. Manual deployment still 2 hours/dev."
- Who: "The Compromiser: Keeps the peace but misses the chance for excellence."
- Tomorrow: "Use 'Enabling Constraints' — if you ship a feature, it MUST have a unit test. No exceptions."

**Choice 3 — Hard-stop for Foundation:**
- What: "Zero features in week 1. Week 4 onwards: 2x faster than the 'bypass' team. 99.9% uptime in production."
- Who: "The Platform Thinker: Builds the machine that builds the product."
- Tomorrow: "Quantify 'Cost of Manual Work' for PMs. Show them how much dev time is wasted on non-feature work."

**Stage 3 — The 'Ready' API Illusion**
- Story: "SAP team says 'API is Ready.' But their Sandbox is down every 2 hours. PM wants to 'Go Live' in the morning because the code is 'finished'."
- UX Connection: "A 'finished' integration that lacks error-handling is a UX lie. To the user, it doesn't matter whose fault it is — the app is just broken."

**Choice 1 — Trust the 'Ready' status:**
- What: "App went live at 9 AM. 9:15 AM: 502 Bad Gateway for 80% of users. 11:00 AM: Manual Rollback performed. Client called it a 'disastrous launch'."
- Who: "The Optimist: Assumes the sun always shines on a production server."
- Tomorrow: "Assume every 3rd party API will fail. Build 'Graceful Degradation' into every integration."

**Choice 2 — Use Static Mock data:**
- What: "UAT went perfectly (with fake data). Production failed immediately. 'False Green' status for stakeholders."
- Who: "The Illusionist: Makes it look good today, pays the price tomorrow."
- Tomorrow: "Mocks are for development, NOT for UAT. Use 'Staging with real latency' to test stability."

**Choice 3 — Architect for Instability:**
- What: "Delayed launch by 3 days. Added exponential backoff and retry queues. Users experienced 0% failure despite SAP flapping. Client: 'The smoothest SAP integration ever.'"
- Who: "The Resilience Engineer: Knows that uptime is a design choice, not an accident."
- Tomorrow: "Implement 'Circuit Breakers' for every external service. If it's down, don't keep trying."

---

#### QA JOURNEY (QAJourney)

**Stage 1 — The 'Happy Path' Illusion**
- Story: "Dev team says onboarding flow is 'Ready for QA.' Acceptance criteria: can login, can upload GST. You have 24 hours. But the GST field allows any file type right now."
- UX Connection: "A 'Green' status on weak tests is a UX deception. If you don't break the app in QA, the users will break it in Production."

**Choice 1 — Sign-off on Criteria:**
- What: "9 AM next day: 12 vendors uploaded .exe files, crashing the parser. Onboarding flow disabled for 48 hours. Procurement lead called it an 'amateur launch'."
- Who: "The Box Ticker: Thinks quality is a checklist instead of a boundary protection."
- Tomorrow: "Never sign off on just 'Functional' criteria. Add 'Negative Testing' (What happens if I enter trash data?) to every ticket."

**Choice 2 — Create Sanity Cycle:**
- What: "Fixed the file type error. Missed the 'Special character in name' bug. 2 vendors reported login issues in UAT."
- Who: "The Pragmatist: Prevents the fire but leaves the smoke."
- Tomorrow: "Prioritize tests by 'User Frequency.' If 80% of users do X, test X to a 100% stress level."

**Choice 3 — Run Exploratory Stress Test:**
- What: "Found a critical SQL injection risk in the PAN field. Prevented a potential data breach on Day 1. Dev team fixed it in 1 hour. Client commended the 'polished' feel."
- Who: "The Boundary Protector: Finds the leaks before the ship leaves the dock."
- Tomorrow: "Build a 'Wall of Shame' for common edge cases. If it happened in module A, check for it in module B immediately."

**Stage 2 — The Localized Fix Ripple**
- Story: "Dev fixed a small typo in the DMS. Engineering says 'Zero regression risk.' You have 1 hour before the demo."
- UX Connection: "Software is an ecosystem. A 'localized' change in one node often sends a ripple of failure to three others."

**Choice 1 — Trust the 'No Risk' claim:**
- What: "Spot check PASSED. 10 mins into client demo: 'Save' button freezes. Typo fix accidentally broke the Billing module's listener. Demo terminated early."
- Who: "The Optimist QA: Thinks if the engine sounds good, the brakes must work too."
- Tomorrow: "Never accept 'No Risk.' Ask 'Which modules consume this data?' and test the furthest one away."

**Choice 2 — Local Module Test:**
- What: "DMS tested and works. Billing module (untested) failed in production 2 hours later. Blocked 4 payments. Team stayed up until 2 AM."
- Who: "The Silo Tester: Only looks at the tree, misses the forest fire."
- Tomorrow: "Use 'Impact Analysis' — list the 3 most critical business flows and test them for EVERY release."

**Choice 3 — Run Impact Cycles:**
- What: "Found that the typo fix changed an ID format used by Billing. Stopped the release 30 mins before demo. Fixed the ID mapping. Shipped a truly stable build."
- Who: "The System Thinker: Sees the invisible connections that hold the product together."
- Tomorrow: "Map your 'Ripple Paths.' Know which modules are 'Connected' vs. 'Isolated.'"

**Stage 3 — The 'Skip UAT' Gamble**
- Story: "Milestone is in 2 days. PM says 'Let's skip UAT and ship to Production directly. We checked it ourselves.' 8 critical flows are untested in the live environment."
- UX Connection: "Skipping UAT is surrendering the user to the unknown. Production is not a testing environment; it's a reputation environment."

**Choice 1 — Skip UAT for Milestone:**
- What: "Day 1: 42% of users couldn't finish onboarding. Procurement client issued a 'formal warning'. Rollback required on Day 2."
- Who: "The Surrender QA: Gave up the gatekeeper role under pressure."
- Tomorrow: "A milestone is only 'Hit' if the software is usable. Defend the definition of 'Done'."

**Choice 2 — Warn & Minimal UAT:**
- What: "Done 4 hours of UAT. Found 2 bugs. 3 users still faced data corruption."
- Who: "The Compromiser: Trade quality for harmony and lost both."
- Tomorrow: "Never say 'Minimal UAT.' Say 'Limited Scope UAT' and explicitly state what is UNTESTED."

**Choice 3 — Mandatory UAT Cycle:**
- What: "Delayed launch by 24 hours. Found a data-loss bug in the 'Final Submit' step. Fixed before any user touched it. Procurement lead thanked you for the 'rigor' after the bug was disclosed."
- Who: "The Quality Lead: Knows that their 'No' is the only thing protecting the 'Yes' of the business."
- Tomorrow: "Use 'Launch Readiness' heatmaps to show stakeholders the risk they are taking when skipping steps."

---

#### DESIGNER JOURNEY (DesignerJourney)

**Stage 1 — The 'One-Off' Temptation**
- Story: "Client says the 'Submit' button is 'hard to find'. They want you to make it big, pink, and glowing. But your design system uses 8px rounded corners and a strict indigo brand color."
- UX Connection: "UX is a system, not a screen. A 'local fix' that violates global rules creates a product that feels broken and amateur over time."

**Choice 1 — Make it Pop (Local Fix):**
- What: "Client was happy for 1 hour. Engineering complained about 'CSS Hacks'. 2 weeks later: The app has 4 different button styles, confusing users."
- Who: "The Yes-Man Designer: Values a quick approval over a professional product."
- Tomorrow: "Never fix a screen by breaking a system. If the button is 'hidden', look at 'Visual Hierarchy' across the whole flow."

**Choice 2 — Educate & Align:**
- What: "Explained how 'Predictable UI' builds trust. Re-designed the header to give the button more 'Negative Space'. Client praised your 'strategic' approach to the brand."
- Who: "The Strategic Liaison: Translates visual preferences into systemic value."
- Tomorrow: "Use 'Negative Space' and 'Type Weight' before you use 'Color' to solve visibility problems."

**Choice 3 — Apply Global Pattern:**
- What: "Used a 'Primary Action' pattern already in the library. Added a 'Pulse' animation (standard in the system). Shipped in 10 minutes. Build remained 'Clean' and 'Theme-Ready'."
- Who: "The System Steward: Protects the contract between Design and Dev."
- Tomorrow: "Before drawing a new component, check if the existing library can do 90% of the work."

**Stage 2 — The Handover Gap**
- Story: "You finished the 'Merchant Dashboard'. It's pixel-perfect in Figma. 2 days later, the build looks 'off'. The spacing is random, colors are slightly muted. You didn't define 'Design Tokens'—just hex codes and pixels."
- UX Connection: "A design is only as good as the code that represents it. Handover is not a 'Delivery'; it's a 'Continuity' exercise."

**Choice 1 — Fix via Redlines:**
- What: "Fixed spacing on 4 screens. Found 12 more issues in the next module. Dev team felt micromanaged by 'redline' comments."
- Who: "The Pixel Matcher: Spends time on the result, not the process."
- Tomorrow: "Stop specifying '24px'. Specify 'Spacing-XL'. Let the system do the math."

**Choice 2 — Enforce Token Specs:**
- What: "Converted Figma styles into a 'Token JSON'. Dev team imported it and 'Fixed All' screens in 10 minutes. Future themes (Dark mode) now work automatically. 60% reduction in 'UI Regression' bugs."
- Who: "The System Architect: Builds the engine that generates the UI."
- Tomorrow: "Your Figma file should be 'Inspect-Ready.' Use auto-layout for everything."

**Choice 3 — Pair with Dev:**
- What: "Sat with the Dev for 1 hour. Discovered the Dev didn't know the 'Brand Palette' existed. Found a faster way to implement 'Shadow' effects. Team morale and speed increased massively."
- Who: "The Collaborative Lead: Knows that code is written by people, not exports."
- Tomorrow: "Do a 'Handover Loom' video for every major feature. Explain the 'Why' of the spacing."

**Stage 3 — Subjective Feedback Bounce**
- Story: "Client Lead says: 'I don't like this blue. It feels too cold. Can we try something warmer, like Orange?' Your user research shows that the 'Blue' creates a 'Financial Trust' feeling for Indian SMEs."
- UX Connection: "Subjective feedback is the enemy of User-Centered Design. Your job is to ground the client's 'Taste' in 'User Data.'"

**Choice 1 — Accept the 'Orange':**
- What: "Shipped the 'Orange' theme. User testing: SMEs reported the app felt 'Untrustworthy' and 'Scammy'. Conversion rate dropped by 12%. Redesign required in 2 months."
- Who: "The Order Taker: Draws what they are told, not what is right."
- Tomorrow: "Never argue about 'Beauty.' Argue about 'Conversion,' 'Accessibility,' and 'Cognitive Load.'"

**Choice 2 — Ground in User Data:**
- What: "Showed 3 competitor audits using the 'Trust Blue'. Presented user testing results showing higher completion rates. Client apologized and withdrew the request. Client started asking for 'Data' before suggesting more changes."
- Who: "The Data-Driven Designer: Protects the user with a shield of evidence."
- Tomorrow: "Always have 'One Slide of Evidence' ready for every major design choice."

**Choice 3 — Find a Mid-Point:**
- What: "Used a 'Warm Blue' that looked muddy. Satisfied neither the client nor the research. App lacked a clear brand voice."
- Who: "The Diplomat: Trades quality for harmony and loses both."
- Tomorrow: "Pick a side. Design is about making a 'Commitment' to a user path."

---

#### STRATEGY JOURNEY (StrategyJourney)

**Stage 1 — The Pilot Paradox**
- Story: "Maharashtra pilot is 'successful.' 5 SME hubs are using the digital portal. But staff are manually overriding errors instead of reporting them. Scale to 50 hubs now, or audit the 'Silent Friction'?"
- UX Connection: "A small pilot hides systemic failures. Scaling a broken process just makes the disaster larger and more expensive to fix later."

**Choice 1 — Scale Aggressively:**
- What: "Scaled to 40 hubs in 3 weeks. Week 4: 28 hubs stopped using the portal entirely. Manual overrides led to ₹2 Cr in reconciliation errors. Pilot terminated by the client in Week 6."
- Who: "The Velocity Trap: Thinks that shipping more is synonymous with winning more."
- Tomorrow: "Never scale until the 'Unit Behavior' is stable. If users are overriding the system, the system is broken."

**Choice 2 — Standard Rollout:**
- What: "Growth remained steady at 5 hubs. Errors didn't increase, but neither did the 'Learning'. Competitors started a more 'Active' pilot."
- Who: "The Status Quo Strategist: Wins the battle of metrics but loses the war of transformation."
- Tomorrow: "Use 'Managed Stress.' Scale to 3x your current size to see where the plumbing breaks."

**Choice 3 — Deep Friction Audit:**
- What: "Found that staff were doing 'Double Data Entry'. Fixed the UI to match their actual workflow. Scaled to 50 hubs with 98% adoption. Transformation ROI jumped by 300%. Client hailed as 'Benchmark' for rural tech."
- Who: "The System Thinker: Finds the hidden friction that kills the scale."
- Tomorrow: "Measure 'Shadow Work.' If users are using paper alongside the app, your app hasn't won yet."

**Stage 2 — The Digital Veneer Trap**
- Story: "Report shows '100% Digital Adoption.' But 'Lead Cycle Time' hasn't dropped. Staff are just 'mirroring' their old physical steps in the app."
- UX Connection: "Software is a tool for behavior change. If the behavior doesn't change, the software is just a digital layer of inefficiency."

**Choice 1 — Digitalize Old Process:**
- What: "100% adoption achieved. Cycle time remained 14 days. ROI was 0% after software costs. Management asked why we spent millions with no result."
- Who: "The Veneer Designer: Paints the old house and calls it new."
- Tomorrow: "Change the 'Metric of Success' from 'Logins' to 'Result Realized.'"

**Choice 2 — Systemic Rewiring:**
- What: "Overhauled the incentive structure to favor 'Speed over Steps'. Cycle time dropped from 14 days to 4 hours. ROI verified at 420%. SME lending volume doubled. Industry award for 'Operational Innovation'."
- Who: "The Structural Strategist: Rewires the business, not just the app."
- Tomorrow: "If the 'Unit Economics' haven't changed, the transformation hasn't started."

**Choice 3 — Ignore & Report 'Success':**
- What: "Reported 'Success' at Board level. 6 months later: Project shut down after a financial audit showed zero value. Your credibility destroyed."
- Who: "The KPI Manipulator: Believes that if the chart is green, the reality doesn't matter."
- Tomorrow: "A green chart on a failing project is a career-ending move. Be the first to shout when the ROI is flat."

**Stage 3 — The Executive Liaison**
- Story: "Final Audit is due. You have 400 pages of data. The CEO has 5 minutes."
- UX Connection: "Reporting is the 'UX of Strategy.' If the decision-maker can't find the 'Next Action' in 30 seconds, your strategy is just a history lesson."

**Choice 1 — Provide Full Data Pack:**
- What: "CEO deferred the decision to 'Read the pack later'. 3 months pass with no action. Opportunity cost grew daily."
- Who: "The Data Fetcher: Thinks their job is to show the work, not solve the problem."
- Tomorrow: "Data is the ingredient; Insight is the meal. Don't make the CEO cook."

**Choice 2 — 3-Action Flash Insight:**
- What: "CEO signed off on 'Regional Expansion' in 10 minutes. Project received a ₹20 Cr budget boost. You were invited to join the 'Strategic Steering Committee'."
- Who: "The Trusted Advisor: Knows that one 'Yes' is worth more than 100 'Facts'."
- Tomorrow: "Every report should answer: 'What happened?', 'Why?', and 'What do we do now?'"

**Choice 3 — Standard Summary:**
- What: "Received 'Positive' feedback but no change happened. Project faded into 'Business as Usual'. Zero breakthrough impact."
- Who: "The Passive Reporter: Watches the project happen but doesn't influence its path."
- Tomorrow: "If your summary doesn't make someone 'Uncomfortable,' it's probably not useful."

---

#### BA JOURNEY (BAJourney)

**Stage 1 — The Traceability Ripple**
- Story: "Business wants to change the 'Interest Calculation' logic for the Pune cooperative bank. Sounds like a simple 1-line code change. But as a BA, you know this ripples through the FRD, the API, the Audit Logs, and the PDF generator."
- UX Connection: "Requirements are an ecosystem. A BA's job is 'Impact Visualization' — protecting the system from unexpected regressions caused by 'Simple' requests."

**Choice 1 — Trace All Dependencies:**
- What: "Identified that the change affects the 'Tax Reporting' module. Dev team warned 48 hours BEFORE starting code. Zero regressions found during integration testing. Pune pilot launched with 100% data accuracy."
- Who: "The Impact Mapper: Sees the invisible threads connecting business and code."
- Tomorrow: "Always ask 'Where else is this logic used?' before saying 'It's easy'."

**Choice 2 — Update FRD Only:**
- What: "40-page FRD update was signed off. Devs missed the 'Audit Log' implication because the FRD was too long to read. App launched but GST reports were broken for 2 days."
- Who: "The Manual Writer: Thinks that a signed document equals a working product."
- Tomorrow: "Prioritize 'Visual Flows' over 'Dense Paragraphs'. Devs read maps, not novels."

**Choice 3 — Trust the Devs:**
- What: "API was updated but the UI dashboard crashed. Pune bank manager reported ₹4 Lakh in calculation errors. Project suspended for a 1-week sanity check."
- Who: "The Passive Passenger: Thinks the BA's job ends at the meeting room door."
- Tomorrow: "Never trust a 'Simple Change.' Verify the logic yourself before the first line of code is written."

**Stage 2 — The Signal vs. Noise**
- Story: "Client says: 'The app feels clunky. I want it to be smarter about merchant leads.' This is noise. Your job is to extract the signal."
- UX Connection: "A BA is a 'Filter for Ambiguity.' If you don't define the logic, you force the Developer to guess."

**Choice 1 — Design Logic Rules:**
- What: "Translated 'Clunky' into 'Predictive Merchant Flagging'. Devs built a rule-engine that saves agents 40 minutes a day. Adoption rate jumped to 94%."
- Who: "The Signal Architect: Filters the chaos into clear system logic."
- Tomorrow: "When a client complains, look for the 'Data Gap' behind the 'Emotion'."

**Choice 2 — Collect UI Screenshots:**
- What: "Fixed 14 button alignments and 2 colors. App looks better, but still feels 'Clunky'. Lead processing speed remains unchanged."
- Who: "The UI Courier: Thinks all digital problems are visual problems."
- Tomorrow: "Dig deeper. If the workflow is slow, no amount of 'White Space' will fix it."

**Choice 3 — Pass 'Clunky' to Devs:**
- What: "Devs spent 3 days arguing about what 'Clunky' means. Total waste of 80 combined hours. Project delayed by 2 weeks due to rework."
- Who: "The Postman BA: Just delivers messages without reading the address."
- Tomorrow: "If you can't write a recursive 'IF/THEN' for it, you haven't analyzed it yet."

**Stage 3 — The UAT Conflict**
- Story: "Demo Day. The Client sees the dashboard and says 'But I thought it would show GST data!'. Engineering says 'You never asked for it.'"
- UX Connection: "UAT is the 'Court of Human Truth.' A BA's job is to ensure the witness (the build) and the judge (the client) are speaking the same language."

**Choice 1 — Negotiate Phase 2:**
- What: "Agreed to launch Phase 1 (no GST) to get merchants on board. Project went 'Live' on time. Client felt 'Heard'. Trust remained high."
- Who: "The Strategic Negotiator: Balances user greed with engineering capacity."
- Tomorrow: "Acknowledge the gap, but protect the deadline. Negotiate for and/or, never vs."

**Choice 2 — Defend the FRD:**
- What: "Proved the client was wrong using the signed FRD. Meeting ended in an 'Angry Silence'. Deployment blocked by the client's CFO. Entire account at risk."
- Who: "The Literal BA: Prefers being 'Right' to being 'Successful'."
- Tomorrow: "The FRD is a guide, not a weapon. Use it to clarify, not to blame."

**Choice 3 — Force Day 1 GST:**
- What: "System crashed 4 times on launch day. GST data was only 20% accurate. Engineering lead threatened to resign."
- Who: "The Yes-Man: Thinks avoiding conflict today is worth the fire tomorrow."
- Tomorrow: "If it wasn't in the trace, it doesn't go in the build. Say 'No' to protect the 'UX Baseline'."

---

### 3.9 Role Masterclass Completions (RoleMasterclassComplete)

All 8 roles get a completion screen with: Paradigm Shift + Description + Insight + 3 Commitments + 2 Scripts + 3 Rubric Questions + Cost Statement.

#### SALES

**Title:** "You Are the Product's First Interface"
**Paradigm Shift:** "Every email, meeting, and proposal you write is a user interface you are designing for the buyer. Chaotic sales process → buyer assumes chaotic product."
**Paradigm Description:** "The highest-performing salespeople don't just know their product — they engineer the buyer's experience of the entire sales journey. Cognitive load, friction, trust signals, decision architecture. These are your tools now."
**Insight:** "The client who churns after 90 days was lost in the sales conversation — you just couldn't see it yet."

**Commitments:**
1. Audit this week's emails — "Pick 3 outbound emails. For each: am I reducing the buyer's cognitive load, or adding to it? Rewrite the highest-friction one."
2. Before every hand-off — "Take 5 minutes to brief the PM on what the client believes, what they fear, and what they need to feel in the first 30 days. Write it down."
3. One impossible promise to reclaim — "Identify any active deal where the timeline you've committed is one your delivery team can't keep. Have the conversation now — it's cheaper than losing the client in month 2."

**Scripts:**
- Trigger: "When a client asks for a feature list" → Line: "I could walk you through the spec — but I'd rather understand what failure looks like for your team in 6 months, and work backwards from there."
- Trigger: "Facing an impossible timeline" → Line: "I can get a signature today on a 4-week delivery. But I'd be designing a broken first experience for your team. Let me suggest a Phase 1 we can over-deliver on."

**Rubric:**
- "Am I reducing the buyer's decision load — or increasing it?"
- "Does the hand-off I'm creating set delivery up to win?"
- "Is this a promise I'm making, or a promise the team is making through me?"

**Cost:** "Salespeople who optimize for closure without designing for experience win deals and lose clients. The referral you never get is the compounding cost."

---

#### CRM

**Title:** "Loyalty Is Not Satisfaction. It's Ease."
**Paradigm Shift:** "The clients who renew without negotiation aren't the ones who got the most attention — they're the ones for whom working with you required the least effort."
**Paradigm Description:** "CRM at its surface is about tracking touchpoints. At depth, it's about designing an interaction pattern that makes the client's life easier every time they engage with you. Friction is invisible until the renewal conversation — and then it's everything."
**Insight:** "The account that goes quiet three months before renewal isn't disengaged — it's telling you something you stopped paying attention to."

**Commitments:**
1. Map one account's friction points — "Take your highest-risk renewal this quarter. Walk through every touchpoint in the last 90 days. Mark every moment where the client had to follow up or wait."
2. The proactive call — "Call a 'quiet' account this week. Not a check-in — an honest conversation: 'What's one thing that would make working with us noticeably easier?'"
3. Change how you document — "After every client interaction, add one note about how the client felt — not just what they said. This emotional log is your most valuable renewal data."

**Scripts:**
- Trigger: "When a client requests a scope change" → Line: "I love this direction — I'm going to make sure we capture it properly so the team can build it right. I'll send you a change note by EOD."
- Trigger: "When an escalation happens" → Line: "I wanted to call you directly rather than send an email. Your confidence in us matters to me. What's weighing on you most right now?"

**Rubric:**
- "Did today's interaction require less effort than last month's?"
- "Am I building relationship capital — or spending it?"
- "Do I know what this client's biggest worry is separate from the project?"

**Cost:** "Accounts that feel well-managed but poorly understood don't refer business. The gap between a client who 'renews' and a 'champion' is a CRM gap."

---

#### PM

**Title:** "The Sprint Is a User Experience You Design"
**Paradigm Shift:** "You are running three user experiences simultaneously: the developer's experience, the stakeholder's roadmap, and the user's product. They are not separate. They compound."
**Paradigm Description:** "A sprint that burns out the team ships a product that disappoints the user. A roadmap conversation that leaves stakeholders confused generates requirement drift. PM work is invisible experience design."
**Insight:** "Every ambiguous requirement you absorb silently is a scope change you're scheduling for the worst possible moment."

**Commitments:**
1. Surface one ambiguity — "Look at your current sprint. Find the requirement that everyone is 'interpreting' differently. Write out two concrete versions and get alignment today."
2. 1:1 Stakeholder Prep — "Before a major roadmap meeting, schedule 20-minute 1:1s with each party. Understand their actual constraint — it's rarely about the feature."
3. Reframe as User Job — "Pick a ticket. Rewrite it: 'When [user context], [user wants to] [outcome]. We know this because [evidence].' Save 2 weeks of scoping."

**Scripts:**
- Trigger: "When a stakeholder brief is vague" → Line: "I read this two ways — if it means A, we ship X. If it means B, we ship Y. Which interpretation fits what you had in mind?"
- Trigger: "When a blocker threatens a demo" → Line: "I can't show [X] tomorrow — I want to be upfront so we use the time well. I can show [Y and Z] and walk you through the plan for [X]."

**Rubric:**
- "Did I surface ambiguity today — or absorb it?"
- "Does my team know why what they're building matters to a real user?"
- "What decision is coming in 2 weeks that I should prepare for today?"

**Cost:** "PMs who manage lists instead of designing experiences build products that technically ship and experientially miss. Rework is expensive."

---

#### DEVELOPER

**Title:** "Your Code Is the Last Mile of Someone's Day"
**Paradigm Shift:** "Users don't experience architecture. They experience its consequences: speed, failure, recovery. Every technical decision is a UX decision made on behalf of someone you'll never meet."
**Paradigm Description:** "Performance is a feeling. A 400ms lag on a button click is not a metric: it's the feeling that the product doesn't respect the user's time. When you see this, every merge decision changes."
**Insight:** "The technical debt item you documented and let queue is a degrading user experience you've already scheduled."

**Commitments:**
1. Add UX to PRs — "In your next PR, add: 'UX note: this interaction performs as X on mid-range Android at Y connection. Tested on [device].'"
2. Old Device Test — "Before closing a feature, open it on the oldest device available on a 3G connection. Document one thing you'd change."
3. Risk Brief — "Write a one-paragraph brief for a technical issue you've been deferring: what breaks, when it breaks at scale, and what it costs to fix now vs. later."

**Scripts:**
- Trigger: "When spec has performance costs" → Line: "This works — but it lags 400ms on mid-range devices. I can ship as-is, or propose [X alternative] that keeps the experience snappy. Which direction?"
- Trigger: "Code review feedback" → Line: "This works well. One pattern worth exploring: [X] — here's why it compounds better at our scale. Happy to pair on it if useful."

**Rubric:**
- "Who experiences the consequence of this technical decision?"
- "Is the thing I'm building today getting harder to fix as we scale?"
- "Am I absorbing UX risk silently to move faster — and at whose eventual cost?"

**Cost:** "Systems built without surfacing UX implications pass code review and fail users. Invisible decisions compound into adoption problems."

---

#### QA

**Title:** "You Test the Product. You Represent the User."
**Paradigm Shift:** "Functional correctness is the floor, not the ceiling. An obscured button, a disappearing error, or a form that clears on a bad network — these pass automated tests and break users."
**Paradigm Description:** "QA is the last structured moment before the user arrives. What you approve is what they experience. The gap between what the spec promised and what the user feels is yours to close."
**Insight:** "The bug you defer because it's 'cosmetic' is the moment a first-time user decides not to come back."

**Commitments:**
1. UX Impact Triage — "In your bug list, add a column: 'User impact at what moment in the journey?' Sort by that, not just category. Watch the top change."
2. Test the Flow — "Instead of testing a feature, trace the complete user journey from entry to completion. Note every point where a user would hesitate."
3. Impact Storytelling — "When logging a regression, write: '[User action] → [What happens] → [User feels/does what].' This format gets bugs fixed faster."

**Scripts:**
- Trigger: "When communicating a UX issue" → Line: "The button shifts behind the keyboard on mobile. That's a high-stakes moment where users abandon, not just scroll. It's not cosmetic, it's conversion."
- Trigger: "When under release pressure" → Line: "I can approve this. I want to flag one UX issue: [X] affects users during [critical action]. Can we get 4 hours for a targeted fix?"

**Rubric:**
- "Am I testing what works — or what the user experiences?"
- "Is this bug a technical failure or a user failure?"
- "Would I be comfortable if the first user to hit this was our most important client?"

**Cost:** "QA teams measured by test coverage miss the experience. Release adoption problems are almost always a QA process that never saw the user."

---

#### DESIGNER

**Title:** "Every Design Decision Is a Precedent"
**Paradigm Shift:** "When you customize a component, you've created a pattern. When you comply with a preference without documentation, you've erased evidence. Design leadership is about whether decisions compound or overwrite."
**Paradigm Description:** "The most dangerous move is a good design made for the wrong reason. Work built to satisfy preference over evidence trains stakeholders to treat your work as decoration. Your evidence trail changes your seat at the table."
**Insight:** "The designer who always complies keeps their relationships and loses their seat — eventually stakeholders learn rationale is negotiable."

**Commitments:**
1. Propose a Test — "Identify feedback that contradicts research. Instead of arguing, propose a test: 'Let's put both versions in front of 5 users and see which drives the outcome.'"
2. Dev-Design Pair — "Before handoff, sit with a developer for 30 minutes. Map every element to build-time. Make one deliberate prioritization decision."
3. Decision Log — "Log every change made for stakeholder preference against research: element, reason, and lack of supporting user data. Measure design drift."

**Scripts:**
- Trigger: "When given a competitor ref" → Line: "Interesting — help me understand what specifically is landing for you. The scale, density, or headline? That tells me the actual problem."
- Trigger: "When simplifying under deadline" → Line: "I'll identify the three elements with the highest user impact per build hour. We ship those. Everything else is Phase 2 — documented."

**Rubric:**
- "Can I articulate why this serves the user separate from the stakeholder?"
- "If I compromised today, did I document what was lost and what evidence would warrant revisiting?"
- "Am I building a system that makes the next designer faster?"

**Cost:** "Designs optimized for the demo device and CEO preferences become products that impress in presentations and frustrate in use. Satisfaction scores eventually pay the price."

---

#### STRATEGY

**Title:** "Every Strategy Has a User Experience"
**Paradigm Shift:** "A growth strategy has a user experience — for the acquired users and the execution team. UX doesn't override the business case; it predicts how likely it is to land."
**Paradigm Description:** "The most expensive error isn't choosing the wrong direction — it's choosing the right direction without understanding the experience conditions. Strategies fail in the last mile."
**Insight:** "The strategy that made sense in the deck failed because the model assumed how users would respond instead of measuring how they already behave."

**Commitments:**
1. Find Signal Tension — "Take your top metric this quarter. Find one qualitative signal that disagrees. Write a 'signal tension document' to test which is more predictive."
2. Investment Sequencing — "Before a major recommendation, map the dependency chain: what does Option A make possible that Option B alone cannot? Change the 'why'."
3. UX-Adjusted Modeling — "Add one row to your next growth model: estimated product satisfaction. If satisfaction is 65%, adjust adoption potential down by 35%."

**Scripts:**
- Trigger: "Quant vs Qual data conflict" → Line: "Metrics show X, but interviews show Y. That tension is a hypothesis. Here's a 2-week experiment to answer which signal is more predictive."
- Trigger: "Matching a competitor's feature" → Line: "If we add this to a product with 65% satisfaction, it has 65% adoption potential. If we fix the experience first, it might do twice the work."

**Rubric:**
- "Does this account for actual user behavior or model assumptions?"
- "Am I leading with the easiest metric to report, or the most predictive?"
- "Have I sequenced this investment correctly?"

**Cost:** "Strategies optimized for deck legibility generate strong Q1 results and confusing Q3 post-mortems. The gap is in the un-questioned assumptions."

---

#### BA

**Title:** "Requirements Are UX Designed in Advance"
**Paradigm Shift:** "The specification you write is the closest a developer has to a conversation with the user. Every gap becomes a design decision made under pressure by someone who hasn't spoken to the user."
**Paradigm Description:** "BA work is discovery design. Your kickoff process, requirement structuring, and UAT facilitation determine what gets built more than any architecture decision. The user enters through your brief."
**Insight:** "A requirement written without understanding how the user currently completes that task is a solution for an imagined problem."

**Commitments:**
1. Redesign Kickoff — "Add three questions to your next kickoff: 'How is this done today?', 'What does success look like 3 months post-launch?', and 'What would make this regrettable?'"
2. 1:1 Requirement Sync — "Identify a conflicting requirement. Schedule a private call with both stakeholders before the group session to understand the actual underlying constraints."
3. Workflow UAT — "In your next UAT: sit beside the user. Have them complete a task start-to-finish without guidance. Don't correct them. Document every hesitation."

**Scripts:**
- Trigger: "Missing user context at kickoff" → Line: "I'd like to spend the first 45 minutes mapping how users complete this task today. That tells us what to build; the features in the brief tell us how."
- Trigger: "When a user flags a workflow gap" → Line: "Can you show me exactly where it breaks? I want to identify the specific step so I can scope a change and give the PM a decision today."

**Rubric:**
- "Does this describe actual user workflow — or how we think they work?"
- "Have I surfaced the conflict in this requirement or just documented it?"
- "Is the stakeholder in the room the user of the system or the buyer of it?"

**Cost:** "Briefs without workflow understanding are instructions for building the wrong thing precisely. The 30% scope change rate is a discovery design problem."

---

#### DEFAULT / Universal Masterclass

**Title:** "UX Is How Every Decision Feels"
**Paradigm Shift:** "Every role makes UX decisions daily. The question is whether you make them consciously — with the user in mind — or invisibly, optimizing for what's easiest to measure."
**Insight:** "The decision that feels efficient from the inside often creates friction on the outside. Now you can see both sides."

**Scripts:**
- Trigger: "When UX is dismissed as design" → Line: "UX is how a decision feels to the person on the other side of it. Every role makes those decisions; design just makes them visible."
- Trigger: "When seeing friction in a process" → Line: "What's the experience of the person when they encounter this? That's the question that changes what we build."

**Cost:** "Roles that operate without the user dimension make slower decisions, generate rework, and build systems that require workarounds."

---

### 3.10 Client Experience (B2B Path)

#### ClientExperience — Opening

- Main Title: "The Hidden Revenue Leak."
- Subtitle: "Every confusing click is a tax on your revenue. Calculating your liability now..."

Three Column Cards:
1. 📉 "The Leak" — "Marketing fills the bucket. Bad UX punches holes in the bottom."
2. 🧠 "The Cause" — "It's not 'ugly'. It's **Cognitively Expensive**. Users don't think, they leave."
3. 👁️ "The Audit" — "We will simulate your customer's frustration to quantify the exact cost."

CTA: "Start The Primer"

---

#### ClientPrimerDoor

- Label: "EXAMPLE 1: THE ACQUISITION FAIL"
- Title: "The 'Norman Door'"
- Question: "You see a handle. What do you do?"
- Result Message: "LOCKED"
- Hint (after 2 fails): "Hint: It looks like a handle, but... maybe drag it?"

---

#### ClientPrimerStove

- Label: "EXAMPLE 2: THE SUPPORT NIGHTMARE"
- Title: "The Mystery Stove"
- Instruction: "Turn on the **Bottom Right** burner."
- Success: "Correct! (Finally)"
- Error: "WRONG BURNER! FOOD BURNT! 😱"

---

#### ClientPrimerKetchup

- Label: "EXAMPLE 3: THE STRUGGLE"
- Title: "The Ketchup Race"
- Subtitle: "Design A vs Design B. **Fight for the sauce.**"
- Design A: "The Classic — Glass Interface" | Button: "TAP TO DISPENSE" / "KEEP TAPPING..."
- Design B: "The Modern — Squeeze Interface" | Button: "TAP TO DISPENSE"
- Success: "EFFICIENCY"
- Winner Text: "Winner: The one designed for Humans."

---

#### ClientPrimerRecap

- Label: "PHASE 1 COMPLETE"
- Title: "It wasn't **you**. It was the **Design**."
- Message: "That frustration you just felt? The confusion? The urge to give up? **That is exactly how your users feel every day.**"
- Three principles summarized: 🚪 "The Door — Confusing Signals" / 🔥 "The Stove — Bad Mapping" / 🥫 "The Ketchup — Inefficiency"
- CTA: "So, what does this cost? →"

---

#### ClientBusinessIntro

- Label: "THE REALITY CHECK"
- Title: "The Hidden **Revenue Leak.**"
- Subtitle: "Marketing fills the bucket. **Bad UX punches holes in the bottom.**"
- Flow: "VISITORS ENTER → FRUSTRATION → VISITORS LEAVE"
- CTA: "Audit My Funnel"

---

#### ClientFunnelBait (Scenario 1 — The Ad/Landing Disconnect)

- Label: "SCENARIO 1: THE DISCONNECT"
- Title: "The 'Marketing' Win"
- Context: "Your marketing team just crushed it. High CTR. Low CPC. Here comes the lead..."
- Ad Copy: "50% OFF RED RUNNERS! Flash Sale! Ends in 1 hour. Don't miss out on the Red Runner Pro."
- Landing Page: "Welcome to ShoeStore. We sell all kinds of shoes." [no red runners shown]
- User Reaction: "Where are the Red Shoes?? I'm not scrolling through this."
- Final: "Lead Lost." 💸

---

#### ClientFunnelChaos (Scenario 2 — Vanity Metrics)

- Label: "SCENARIO 2: THE FALLACY"
- Title: "The Vanity Metric Fallacy"
- Context: "Traffic (14k) is celebrated. Low Conversion (0.3%) is ignored."
- Site: "GoldSure" — cluttered with nav items, category bars, chatbot, notifications, cookie banners
- Hero: "Unlock the **hidden liquidity** in your assets." / "Join 10M+ Indians who are leveraging their gold for instant credit lines with zero processing fees*."
- Cookie Notice: "We use cookies, pixels, and magic dust to track your every move so we can retarget you on Instagram later."
- Exit: "This is too much chaos (Exit) 🏃"
- Final: "High Acquisition Volume. **Poor Retention.** Traffic is purchased, but the UX forces users to bounce."

---

#### ClientFunnelWall (Scenario — The Intrusion)

- Label: "SCENARIO 2: THE INTRUSION"
- Title: "The 'Growth Hacking' Wall"
- Context: "The user is interested. They are reading. Then you punch them in the face."
- Article: "10 Ways to Improve Your Life Today"
- Popup appears mid-article:
  - Title: "WAIT! DON'T GO!"
  - Text: "Join 50,000+ others and get our exclusive 'Life Hacks' ebook for FREE!"
  - Close: "No thanks, I hate free stuff"
- Result: "🤬 Rage Quit."

---

#### ClientFunnelMaze (Scenario — Navigation Maze)

- Label: "SCENARIO 3: THE MAZE"
- Title: "The 'Where is it?' Loop"
- Task: "Find the **'Procurement Guidelines'**. (Because Information Architecture is 'hard')"
- Site: "Nexus Policy Institute — Established 1998 • Global Research NGO"
- Deep nav required: Home → Governance → Compliance → Procurement
- Success: "Document Found! 'Procurement_Guidelines_2024.pdf' (It took 4 clicks and deep domain knowledge to find a basic policy.)"
- Skip: "I Give Up (Skip) ➝"

---

#### ClientFunnelTrap (Scenario — Lead Gen Gate)

- Label: "SCENARIO 4: THE LEAK"
- Title: "The 'Lead Gen' Trap"
- Site: "LUXE ESTATES — The Azure Penthouse — $2,450,000"
- Floor plan gated: "🔒 Unlock to View"
- Modal: "Unlock Property Access — Enter your details to instantly view floor plans, pricing history, and HD tours."
- Form asks for: First Name, Last Name, Mobile Number, "I am a..."
- Legal: "By proceeding, you consent to receive automated calls/texts from Luxe Estates and its affiliates."
- User Thought Bubble: "Are you serious? I just want to see the layout! I'm not giving you my number."
- Result: "🚫 Browser Window Closed. Lead Status: **LOST** • Opportunity Cost: **HIGH**"

---

#### ClientRevenueLoss (Phase 3 — Damage Report)

- Label: "PHASE 3: THE DAMAGE REPORT"
- Title: "You are bleeding **$X** / month."
- Subtitle: "Based on typical drop-off rates for the UX errors we just saw."
- Cost Breakdown:
  1. 💸 "Misleading Promise — The '50% Off' Trap"
  2. 📉 "Low Conversion (0.3%) — High Traffic, Zero Clarity"
  3. 🛑 "Premature Ask — The 'Sign Up' Wall"
  4. 🤷 "The Nexus Maze — Buried Procurement Docs"
  5. 🔒 "Forced Lead Gen — Blocks Interested Buyers (High Friction)"
- CTA: "This is the cost of 'Good Enough' design. Now... let's see what happens when we **Fix The UX**."

---

#### ClientFixIntro (Phase 4 — The Turnaround)

- Label: "Phase 4: Optimization"
- Title: "THE TURNAROUND."
- Subtitle: "From Friction to Flow"
- Message: "We identified the leaks. We measured the cost. Now, let's watch what happens when we **respect the user**."
- Button: "APPLY THE FIXES 🚀"
- Loading: "Deploying User-Centric Principles..."

---

#### ClientRevenueGain (Phase 5 — The Upside)

- Label: "PHASE 5: THE UPSIDE"
- Title: "The UX Dividend. **+$X** / mo"
- Subtitle: "This is not magic. This is simply **Removing Friction**."
- Takeaway Cards:
  1. 🧮 "UX is Math — Design isn't just about 'looking good'. Friction is measurable financial loss."
  2. 📉 "The Hidden Tax — You are paying a 'Bad UX Tax' on every single ad dollar you spend today."
  3. 🚀 "The Multiplier — Fixing the funnel yields substantially higher ROI than just increasing ad spend."
- CTA: "Ready to capture this value?"

---

#### ClientFinalConnect

- Label: "THE PARTNERSHIP"
- Title: "Your digital experience partner, **ZYXWARE**"
- Message: "We don't just find problems. We engineer **Revenue Growth**. Let's build a better future for your users."
- Primary CTA: "Let's Connect"
- Secondary CTA: "See how your team navigates these frictions"
- Tertiary CTA: "Replay Experience"

---

## 4. UX / Human-Centric Concepts Taught

| Concept | Platform Explanation | Where It Appears | Lesson/Behavior It Supports |
|---------|---------------------|------------------|-----------------------------|
| **Signifiers** | Visual cues that tell users what to do without reading. Missing signifier = wrong action. | DoorExperience, ClientPrimerDoor | "The door's design gave you incorrect information." |
| **Feedback** | System confirmation that an action was registered. Absence creates anxiety. | SilentButtonExperience | "Systems that don't speak create users who don't trust." |
| **Perceived Time** | 8 seconds with feedback feels like 2 seconds. Without it, feels like forever. | DelayedResponseExperience | "Perceived time is designed time." |
| **Validation Clarity** | Error messages must explain expected format, not just reject. | ConfusingFormExperience | "Every guessing game is a choice someone made." |
| **Defaults as Manipulation** | Pre-selected options exploit inertia to get unwanted consent. | PatternRecognitionPhase | "A checkbox designed to be missed." |
| **Constraint Timing** | Password rules shown after entry instead of before = frustration. | PatternRecognitionPhase | "A password rule appearing too late." |
| **Interruption Cost** | Popups mid-task break flow and create hostility. | PatternRecognitionPhase | "A popup timed to interrupt." |
| **Hidden Information** | Revealing costs late exploits sunk cost fallacy. | PatternRecognitionPhase | "A price hidden until commitment." |
| **UX vs. UI** | UI is what you see. UX is what you feel. Beautiful ≠ good experience. | UXNamingPhase | "A beautiful interface can still create a frustrating experience." |
| **UX as System Outcome** | UX is shaped by every role, not just designers. | UXNamingPhase, Layer2Complete | "UX is a system outcome. Everyone contributes to it." |
| **UX Debt** | Accumulated shortcuts that compound into visible problems post-launch. | All Layer 2 phases, MaintenancePhase | "We don't inherit codebases. We inherit decisions." |
| **Assumption vs. Research** | Building on untested assumptions = building for wrong users. | DiscoveryPhase | "Every assumption without validation is potential friction." |
| **Decision Compounding** | Early bad choices cascade through every downstream phase. | Layer2Complete | "A skip in Discovery became a blocked ticket in Development." |
| **Natural Mapping** | Layout of controls should match layout of what they control. | ClientPrimerStove | Stove knob positions vs. burner positions. |
| **Efficiency** | Removing steps between user and value. | ClientPrimerKetchup | Glass vs. squeeze ketchup bottle. |
| **Cognitive Load** | Too much on screen forces users to think instead of act. | ClientFunnelChaos | "It's not 'ugly'. It's Cognitively Expensive." |
| **Rage Clicks** | Multiple clicks on same element = system failed to communicate. | SilentButtonExperience | Clicks tracked as anxiety behavior. |
| **Scope Creep as UX Risk** | Agreeing to everything without user validation = bloated, failing product. | DecisionLensUnlock | "The Yes Trap." |
| **Empty State Design** | Blank screens read as "broken" to users, even if technically correct. | PMJourney Stage 3 | "18 support tickets: 'Is this page broken?'" |
| **Graceful Degradation** | Systems should fail gracefully, not silently or catastrophically. | DeveloperJourney Stage 3 | "Build 'Graceful Degradation' into every integration." |
| **Shadow Work** | Users using workarounds (paper, manual steps) signals the app hasn't won. | StrategyJourney Stage 1 | "Measure 'Shadow Work.'" |
| **JTBD (Jobs to Be Done)** | Feature requests encode the real job — find the job, not the feature. | PMJourney Stage 2, CRMJourney Stage 2 | "Google Sheets → Shareable Links" |
| **Digital Veneer** | Digitizing old broken processes creates digital inefficiency, not transformation. | StrategyJourney Stage 2 | "A Faster Shovel for a Bigger Hole" |
| **Traceability** | Every requirement change ripples through FRD, API, Audit Logs, downstream modules. | BAJourney Stage 1 | "Requirements are an ecosystem." |
| **UAT as User Representation** | UAT is the last structured moment before users arrive. | QAJourney Stage 3 | "Production is not a testing environment; it's a reputation environment." |

---

## 5. Internal Training Logic

### Sequence

```
All Roles:
  1. ProjectBrief        → See the UX-blind brief
  2. SlackWarRoom        → Feel the crisis that bad briefing causes
  3. SystemReaction      → Trace the system-wide damage
  4. DecisionLensUnlock  → Shift from "Protect Project" to "Protect Outcome"
  5. IdentityReflection  → Understand your instinctive default under pressure
  6. DesignationSelect   → Choose your role
  7. RoleBriefingView    → Expectation setting for your role
  8. Role Journey        → 3 role-specific scenarios (Context → Decision → Consequence)
  9. RoleMasterclassComplete → Paradigm shift + commitments + scripts + rubric
```

### Learning Progression

| Stage | What Happens | What is Learned |
|-------|-------------|-----------------|
| Onboarding | Shared crisis scenario (same for all roles) | The same project failure affects everyone differently |
| Identity | User identifies their pressure response pattern | Self-awareness about default mode before change |
| Role Briefing | Expectation + discovery setup | What to expect; why it matters for their specific role |
| Scenario 1 | Role-specific technical/relational friction moment | Recognition of a familiar pattern |
| Scenario 2 | Deeper systemic scenario (feature requests, architecture, clients) | Systemic thinking within their domain |
| Scenario 3 | Delivery/quality/relationship pressure scenario | Decision-making under realistic time pressure |
| Masterclass | Paradigm shift, concrete scripts, weekly rubric | From awareness to daily application |

### What Each Part Achieves

- **ProjectBrief** — Shows that the source of all UX problems is ambiguity in the brief, not the code
- **SlackWarRoom** — Shows the human cost of a product that technically works but experientially fails
- **SystemReaction** — Shows that defending your silo while the system fails is not success
- **DecisionLensUnlock** — Installs the core mindset shift: outcome over output
- **IdentityReflection** — Makes implicit defaults explicit — pre-requisite for behavior change
- **Role Scenarios** — Contextual learning with real consequences felt, not described
- **Masterclass** — Converts insight into repeatable action (script, rubric, commitment)

---

## 6. Client / External Logic

### Purpose
The client path is designed to create a business case for UX investment in B2B decision-makers (CEOs, founders, procurement leads). It does NOT teach methodology — it creates emotional and financial resonance.

### Flow Logic

```
Step 1: Primer (Feel it physically)
  → Door: "You couldn't use it because of bad design — not user error"
  → Stove: "You burnt food because the layout didn't match your mental model"
  → Ketchup: "You worked 5x harder than you needed to"

Step 2: Reality Check
  → "That is exactly how your users feel every day."
  → Shift from empathy to business concern

Step 3: Funnel Simulation (See revenue lost)
  → Bait: Ad/landing page disconnect → bounce
  → Chaos: Cluttered homepage → confusion → exit
  → Wall: Popup interruption → rage quit
  → Maze: Navigation failure → give up
  → Trap: Forced lead gen → abandoned

Step 4: Revenue Calculator
  → "You are bleeding $X/month" based on their inputs
  → Cost breakdown attributed to each UX failure

Step 5: Fix Demonstration
  → "Watch what happens when we respect the user"
  → Same scenarios with UX fixes applied → conversions happen

Step 6: Revenue Gain Calculator
  → "The UX Dividend: +$X/mo"
  → ROI framing: fixing UX > increasing ad spend

Step 7: Partnership CTA
  → "Your digital experience partner, ZYXWARE"
  → "We don't just find problems. We engineer Revenue Growth."
```

### Key Client Concepts

| Concept | How Explained | Business Frame |
|---------|--------------|----------------|
| Cognitive Load | "Users don't think, they leave." | Conversion loss |
| Signifiers | "Norman Door — you couldn't use it because it didn't tell you how" | Acquisition failure |
| Natural Mapping | "Wrong burner — layout didn't match your mental model" | Support costs |
| Efficiency | "Glass vs squeeze ketchup — 5x effort for same result" | Abandonment rates |
| Bait & Switch | Ad promises vs. landing page delivers different thing | Bounce rate, wasted ad spend |
| Information overload | GoldSure example — too many elements = zero clarity | Time-on-site vs. conversion |
| Forced disclosure | Lead gen gates on interest-stage users | Lost high-intent prospects |
| Bad IA | Procurement doc buried 4 clicks deep | Task abandonment |

---

## 7. Reusable Knowledge Blocks

### Block 1: UX Definition
> "User Experience is how something feels to use over time. It's shaped by decisions, not accidents. It's created by everyone involved in building systems. Its cost appears as confusion, rework, support, and frustration."

---

### Block 2: Role-Specific UX Frames

| Role | Frame |
|------|-------|
| Sales | "Every email, meeting, and proposal you write is a user interface you are designing for the buyer." |
| CRM | "CRM is the UX of Communication. Your tone and speed determine if friction becomes a relationship failure." |
| PM | "You are running three user experiences simultaneously: the developer's experience, the stakeholder's roadmap, and the user's product." |
| Developer | "Users don't experience architecture. They experience its consequences: speed, failure, recovery." |
| QA | "QA is the last structured moment before the user arrives. What you approve is what they experience." |
| Designer | "When you customize a component, you've created a pattern. Design leadership is about whether decisions compound or overwrite." |
| Strategy | "A growth strategy has a user experience — for the acquired users and the execution team." |
| BA | "The specification you write is the closest a developer has to a conversation with the user." |

---

### Block 3: The Decision Lens
> "You've been taught to protect the Project (Budget, Timeline, Scope). Start protecting the Outcome."
> - The "Yes Trap": Saying yes to every client request creates bloated, failing products.
> - The Friction Value: Pushing back early to define the actual user problem guarantees long-term success.

---

### Block 4: UX Debt Mechanics
> "UX debt progresses: hidden → surfacing → visible."
> "Every maintenance item has an origin story. The bug that 'appeared' in production was created in Discovery when a user group was skipped."
> "We don't inherit codebases. We inherit decisions."

---

### Block 5: Role Archetypes (Pattern Names Used in Training)
These named archetypes appear consistently in the journey outcomes and serve as memorable identity anchors:

| Archetype | Role | Behavior |
|-----------|------|----------|
| The Relationship Bridge | CRM | Absorbs client emotion to protect the relationship and the team |
| The Manual Follower | CRM | Follows the spec while the building is on fire |
| The Deflector | CRM | Blames others to escape the heat |
| The Product Partner | CRM | Translates business frustration into product evolution |
| The Postman | CRM/BA | Delivers messages without reading the address |
| The Vision Seller | CRM | Sells the future because they are afraid of the present |
| The Firefighter | Dev | Puts out the small fire by flooding the server room |
| The Craftsman | Dev | Understands that the fastest way is actually the right way |
| The Platform Thinker | Dev | Builds the machine that builds the product |
| The Resilience Engineer | Dev | Knows that uptime is a design choice, not an accident |
| The Box Ticker | QA | Thinks quality is a checklist, not boundary protection |
| The Boundary Protector | QA | Finds the leaks before the ship leaves the dock |
| The Surrender QA | QA | Gives up the gatekeeper role under pressure |
| The Quality Lead | QA | Knows their 'No' is what protects the 'Yes' of the business |
| The Yes-Man Designer | Designer | Values quick approval over professional product |
| The System Steward | Designer | Protects the contract between Design and Dev |
| The Data-Driven Designer | Designer | Protects the user with a shield of evidence |
| The Reactive PM | PM | Builds a collection of client negotiations, not a product |
| The Product Architect | PM | Finds the generic solution that satisfies the specific pressure |
| The Pragmatic Leader | PM | Knows when a 3-hour fix is better than a 3-day delay |
| The System Thinker | Strategy/QA | Sees the invisible connections that hold things together |
| The Structural Strategist | Strategy | Rewires the business, not just the app |
| The Trusted Advisor | Strategy | One 'Yes' is worth more than 100 'Facts' |
| The Impact Mapper | BA | Sees the invisible threads connecting business and code |
| The Signal Architect | BA | Filters the chaos into clear system logic |
| The Strategic Negotiator | BA | Balances user need with engineering capacity |
| The Growth Engine | Sales | Engineers the buyer's experience from first touchpoint |

---

### Block 6: Scripts Library

**Sales Scripts:**
- "I could walk you through the spec — but I'd rather understand what failure looks like for your team in 6 months, and work backwards from there."
- "I can get a signature today on a 4-week delivery. But I'd be designing a broken first experience for your team. Let me suggest a Phase 1 we can over-deliver on."

**CRM Scripts:**
- "I wanted to call you directly rather than send an email. Your confidence in us matters to me. What's weighing on you most right now?"
- "I love this direction — I'm going to make sure we capture it properly so the team can build it right. I'll send you a change note by EOD."

**PM Scripts:**
- "I read this two ways — if it means A, we ship X. If it means B, we ship Y. Which interpretation fits what you had in mind?"
- "I can't show [X] tomorrow — I want to be upfront so we use the time well. I can show [Y and Z] and walk you through the plan for [X]."

**Dev Scripts:**
- "This works — but it lags 400ms on mid-range devices. I can ship as-is, or propose [X alternative] that keeps the experience snappy. Which direction?"

**QA Scripts:**
- "The button shifts behind the keyboard on mobile. That's a high-stakes moment where users abandon, not just scroll. It's not cosmetic, it's conversion."
- "I can approve this. I want to flag one UX issue: [X] affects users during [critical action]. Can we get 4 hours for a targeted fix?"

**Designer Scripts:**
- "Interesting — help me understand what specifically is landing for you. The scale, density, or headline? That tells me the actual problem."

**Strategy Scripts:**
- "Metrics show X, but interviews show Y. That tension is a hypothesis. Here's a 2-week experiment to answer which signal is more predictive."

**BA Scripts:**
- "I'd like to spend the first 45 minutes mapping how users complete this task today. That tells us what to build; the features in the brief tell us how."

**Universal Scripts:**
- "UX is how a decision feels to the person on the other side of it. Every role makes those decisions; design just makes them visible."
- "What's the experience of the person when they encounter this? That's the question that changes what we build."

---

### Block 7: Role Rubrics (Daily Check-ins)

**Sales:** Am I reducing the buyer's decision load? / Does the hand-off I'm creating set delivery up to win? / Is this a promise I'm making, or a promise the team is making through me?

**CRM:** Did today's interaction require less effort than last month's? / Am I building relationship capital — or spending it? / Do I know what this client's biggest worry is separate from the project?

**PM:** Did I surface ambiguity today — or absorb it? / Does my team know why what they're building matters to a real user? / What decision is coming in 2 weeks that I should prepare for today?

**Dev:** Who experiences the consequence of this technical decision? / Is the thing I'm building today getting harder to fix as we scale? / Am I absorbing UX risk silently to move faster — and at whose eventual cost?

**QA:** Am I testing what works — or what the user experiences? / Is this bug a technical failure or a user failure? / Would I be comfortable if the first user to hit this was our most important client?

**Designer:** Can I articulate why this serves the user separate from the stakeholder? / If I compromised today, did I document what was lost? / Am I building a system that makes the next designer faster?

**Strategy:** Does this account for actual user behavior or model assumptions? / Am I leading with the easiest metric to report, or the most predictive? / Have I sequenced this investment correctly?

**BA:** Does this describe actual user workflow — or how we think they work? / Have I surfaced the conflict in this requirement or just documented it? / Is the stakeholder in the room the user of the system or the buyer of it?

---

### Block 8: "Tomorrow" Action Lines (Per Scenario)
Each scenario ends with a single actionable behavior change instruction:

- "Never start an email with 'The system is working as intended.' Start with 'I understand this is blocking your onboarding.'"
- "Never forward a feature request. Forward a 'Problem Report' with a proposed 'Value Signal.'"
- "Never lead with a discount. Lead with a 'Commitment to Quality Roadmap.'"
- "Write a 'Day 1 UX Minimums' document before any commitment."
- "Never accept a 'solution request' without a Discovery Call to find the 'workflow gap.'"
- "Add 'Empty State' and 'Error State' as mandatory fields in every UI ticket's definition of done."
- "Never import a 'higher level' module into a 'lower level' one."
- "Never skip Sprint 0. Define it as 'UX Reliability Setup'."
- "Assume every 3rd party API will fail. Build 'Graceful Degradation' into every integration."
- "Never sign off on just 'Functional' criteria. Add 'Negative Testing'."
- "Never accept 'No Risk.' Ask 'Which modules consume this data?'"
- "A milestone is only 'Hit' if the software is usable. Defend the definition of 'Done'."
- "Stop specifying '24px'. Specify 'Spacing-XL'. Let the system do the math."
- "Never argue about 'Beauty.' Argue about 'Conversion,' 'Accessibility,' and 'Cognitive Load.'"
- "Never scale until the 'Unit Behavior' is stable."
- "Measure 'Shadow Work.' If users are using paper alongside the app, your app hasn't won yet."
- "Data is the ingredient; Insight is the meal. Don't make the CEO cook."
- "Always ask 'Where else is this logic used?' before saying 'It's easy'."
- "If you can't write a recursive 'IF/THEN' for it, you haven't analyzed it yet."
- "Add one row to your next growth model: estimated product satisfaction."

---

## 8. Gaps / Missing Bridges

### 1. Sales Journey stops at LTV / Handover — no post-handover scenario
The Sales journey covers 5 stages through to handover but stops before showing what a bad handover *looks like* for the PM or client. The connection between Sales' handoff and the delivery team's experience is described but not shown.

### 2. No cross-role scenario
Every role journey covers only its own perspective on the same type of project. There is no scenario where a user sees how, for example, Sales over-promising affects the Developer's sprint, or how a PM's empty state gap affects the QA. The connection is implied but never made experiential.

### 3. Layer 1.5 → Layer 2 bridge is conceptual, not scenario-based
The transition from Pattern Recognition to SDLC simulation has a text bridge ("Now see how UX is created in delivery") but no interactive moment connecting the patterns observed (pre-checked checkboxes, hidden prices) to specific SDLC decisions that created them.

### 4. Discovery Phase skipping path missing from Requirements and Design phases
If a user skips Discovery, the downstream consequences are shown in the Discovery phase itself. But Requirements and Design phases do not reference or compound on those specific missing pieces, potentially letting users feel they "started fresh."

### 5. No mechanism to connect internal journey to client journey
Internal team members who complete their role journey have no in-app path to see the client-facing experience (what the client sees in `/client`). These are two separate paths with no cross-over.

### 6. Role Masterclass completion has no shared/social output
After completing the masterclass, users receive paradigm shifts and commitments but there is no mechanism to share, print, or save the output. The commitments are not tracked across sessions.

### 7. IdentityReflection answers not used downstream
Users identify their pressure-response instinct (Get it done / Keep everyone happy / Stick to what was agreed / Build it right) but this selection does not appear to personalize the subsequent role scenario content or masterclass takeaways.

### 8. General audience path (Layer 2) has no role-specific lens
Layer 2's SDLC simulation is a single-perspective narrative. It does not branch based on whether the user is a developer vs. a PM vs. a QA, even though they would experience the same project decisions very differently.

### 9. Maintenance phase is short relative to its teaching leverage
The Maintenance phase is the culmination of all accumulated debt — but it has only 3 stages (Context → Interaction → Reflection) compared to the 8+ screens in Discovery. Given that "UX debt surfaces loudly" is a core lesson, this phase has more teaching potential than is currently built out.

### 10. Client path has no "internal team" bridge
The client experience ends with a Zyxware CTA but has no path that says "want to see how your team experiences this?" — though a CTA for it exists ("See how your team navigates these frictions"), there is no in-app continuation.

---

## 9. File-to-Content Map

| File | Content It Holds |
|------|-----------------|
| `IntroScreen.tsx` | Platform welcome copy, tagline, promise, "begin" prompts |
| `DoorExperience.tsx` | Door context, push/pull feedback, signifier teaching reflection |
| `SilentButtonExperience.tsx` | Silent form context, click-count tracking, feedback teaching reflection |
| `ConfusingFormExperience.tsx` | Phone form context, cryptic error messages, hint after 3 fails, teaching reflection |
| `DelayedResponseExperience.tsx` | Search delay context, 8-second wait, behavior tracking, teaching reflection |
| `PatternPause.tsx` | "Different situations. Same feeling." reflection bridge |
| `BridgeToWork.tsx` | Stage-by-stage narrative connecting user friction to builder responsibility |
| `PatternRecognitionPhase.tsx` | 4 UX anti-patterns (checkbox, password, popup, price) with reveals |
| `UXNamingPhase.tsx` | Full UX definition, UX vs. UI distinction, cost mapping, everyone's role |
| `Layer15Complete.tsx` | Bridge to Layer 2; "where UX is created in delivery" |
| `Layer2Intro.tsx` | SDLC simulation setup; project context narrative |
| `DiscoveryPhaseNew.tsx` | Client email (verbatim), 4 brief gaps, 3 personas with full data, team chat, decision point, consequence comparison, 3 root cause myths, discovery activities puzzle |
| `RequirementsPhaseNew.tsx` | Vague requirements from client, requirements gap analysis |
| `DesignPhaseNew.tsx` | Component options with UX purpose, 3 UX pillars, design trade-off framing |
| `DevelopmentPhase.tsx` | Tech stack comparison, Lighthouse report items, 4 development lessons |
| `TestingPhase.tsx` | QA story, bug types with source tracing, triage system, quality rating scale |
| `LaunchPhase.tsx` | Deployment sequence, conditional live feedback feed, NPS scorecard |
| `MaintenancePhase.tsx` | Post-launch backlog, compounding notice, debt origin reflection, "We don't inherit codebases" quote |
| `Layer2Complete.tsx` | 4 key learnings, 3 platform quotes, UX debt count |
| `ProjectBrief.tsx` | TechStartup brief document, UX gap flags, scan interaction |
| `SlackWarRoom.tsx` | Crisis Slack thread (5 messages), two response choices |
| `SystemReaction.tsx` | Two paths (defensive/investigative), 3 impact cards |
| `DecisionLensUnlock.tsx` | "Protect Project vs Protect Outcome" shift, Yes Trap, Friction Value |
| `IdentityReflection.tsx` | 4 pressure instinct cards with hidden truth reveals |
| `DesignationSelect.tsx` | 8 role cards with subtitle and upgrade promise |
| `RoleBriefingView.tsx` | 8 role briefings (title, expect, discover, why) |
| `SalesJourney.tsx` | 5 stages with scenario, UX connection, UX anchor, business value |
| `CRMJourney.tsx` | 3 stages: GST crisis, Emotional feedback loop, Renewal runway — full choice trees |
| `PMJourney.tsx` | 3 stages: IBC crash, Founder request, Empty state — full choice trees |
| `DeveloperJourney.tsx` | 3 stages: Circular fix, Sprint 0, API illusion — full choice trees |
| `QAJourney.tsx` | 3 stages: Happy path, Ripple fix, UAT gamble — full choice trees |
| `DesignerJourney.tsx` | 3 stages: One-off temptation, Handover gap, Subjective feedback — full choice trees |
| `StrategyJourney.tsx` | 3 stages: Pilot paradox, Digital veneer, Executive liaison — full choice trees |
| `BAJourney.tsx` | 3 stages: Traceability ripple, Signal vs noise, UAT conflict — full choice trees |
| `RoleMasterclassComplete.tsx` | 8 role paradigm shifts + 3 commitments + 2 scripts + 3 rubrics + cost statement each; universal default |
| `ClientExperience.tsx` | Client path orchestration, opening headline, 3 column value cards |
| `ClientPrimerDoor.tsx` | "Norman Door" — affordance scenario |
| `ClientPrimerStove.tsx` | "Mystery Stove" — natural mapping scenario |
| `ClientPrimerKetchup.tsx` | "Ketchup Race" — efficiency scenario |
| `ClientFunnelBait.tsx` | Ad/landing disconnect scenario (ShoeStore) |
| `ClientFunnelChaos.tsx` | Cluttered homepage scenario (GoldSure) |
| `ClientFunnelWall.tsx` | Popup interruption scenario (article + popup) |
| `ClientFunnelMaze.tsx` | Navigation maze scenario (Nexus Policy Institute) |
| `ClientFunnelTrap.tsx` | Lead gen gate scenario (Luxe Estates) |
| `ClientRevenueLoss.tsx` | Revenue leak calculator with 5 UX cost items |
| `ClientFixIntro.tsx` | "THE TURNAROUND" — fix deployment narrative |
| `ClientRevenueGain.tsx` | UX dividend calculator + 3 takeaway cards |
| `ClientFinalConnect.tsx` | Zyxware partnership CTA |
| `SDLCContext.tsx` | Layer 2 state: project metrics, UX debt types, role impact tracking |
| `GlobalExperienceContext.tsx` | Layer unlock rules, progress persistence, state shape |
| `designation-store.ts` | Role selection, decisions per role, append-only decision history |

---

## 10. Raw Extract Appendix

### A. The Platform's Core Teaching Quotes (Most Reusable)

1. "This is not training. This is an experience."
2. "You won't be tested. You won't be scored. You will simply notice things differently after."
3. "Every frustration you felt was created by a decision."
4. "Systems that don't speak create users who don't trust."
5. "Every guessing game is a choice someone made."
6. "Perceived time is designed time."
7. "None of these happened by accident."
8. "UX isn't decoration. It's how systems either work for people or against them."
9. "UX is a system outcome. Everyone contributes to it — whether they intend to or not."
10. "A skip in Discovery became a blocked ticket in Development, became a deferred bug in Testing, became a support escalation in Maintenance."
11. "The friction users feel isn't created by designers. It's manufactured across the entire delivery process, by everyone involved."
12. "Early care prevents late pain."
13. "We don't inherit codebases. We inherit decisions."
14. "We unintentionally manufacture complexity."
15. "UX stabilizes delivery — it doesn't decorate it."
16. "Ignoring UX early is a leadership failure, not a design failure."
17. "Performance is a feeling. A 400ms lag on a button click is not a metric: it's the feeling that the product doesn't respect the user's time."
18. "The technical debt item you documented and let queue is a degrading user experience you've already scheduled."
19. "Production is not a testing environment; it's a reputation environment."
20. "The bug you defer because it's 'cosmetic' is the moment a first-time user decides not to come back."
21. "A requirement written without understanding how the user currently completes that task is a solution for an imagined problem."
22. "Data is the ingredient; Insight is the meal. Don't make the CEO cook."
23. "If the 'Unit Economics' haven't changed, the transformation hasn't started."
24. "Marketing fills the bucket. Bad UX punches holes in the bottom."
25. "Fixing the funnel yields substantially higher ROI than just increasing ad spend."

---

### B. The Project Brief Verbatim (Full Client Email)

> "Quick one - we need a website up and running ASAP. Our current site is embarrassingly outdated and we're losing leads. We're a B2B tech consulting firm. Main goal is to get people to contact us. Think clean, modern look - like what you see on Stripe or Linear. Nothing too flashy but it should feel premium. Need the usual pages - home, about us, services, contact. Make sure the contact form is prominent, that's the whole point. Navigation should be simple, don't want visitors getting lost. Oh and it HAS to work well on mobile. Most of our audience is browsing on phones. Timeline: 4 weeks. We have a big pitch coming up. Budget: ₹2.5 lakhs, flexible if needed. Can we do a quick call tomorrow to kick this off? Thanks, Vikram"

---

### C. The Slack War Room (Verbatim)

> **Client Manager (10:42 AM):** "Vikram is furious. Launch completed but conversion lift is only 2%. We promised 15%. What happened? @channel"
>
> **Product Lead (10:43 AM):** "We delivered all scoped features. The ticket queue is clear. It's exactly what he asked for in the brief."
>
> **Tech Lead (10:43 AM):** "The codebase is solid. 99.9% uptime. API performance is within 100ms. Infrastructure is not the bottleneck."
>
> **Lead Designer (10:44 AM):** "We used the exact Stripe/Linear aesthetic he referenced. The UI components are pixel-perfect to the Figma file."
>
> **QA Lead (10:44 AM):** "All test cases passed. 0 P1/P2 bugs in production. The site functions perfectly."

---

### D. Role-to-Persona Mapping (Internal Users)

| Role | Sees Through the Lens Of |
|------|--------------------------|
| Sales | The buyer's pre-purchase experience |
| CRM | The client's emotional journey through the relationship |
| PM | The delivery system's three simultaneous users |
| Developer | The user experiencing their code's consequences |
| QA | The user arriving at an untested edge case |
| Designer | The user navigating a system vs. a screen |
| Strategy | The user whose behavior was assumed, not measured |
| BA | The user whose workflow was documented, not understood |

---

### E. Behavior Change Structure Per Scenario

Each scenario in every role journey follows this structure:

```
1. STORY — The real-world situation (Indian tech context)
2. UX CONNECTION — The UX principle at stake
3. REAL LIFE IMPACT — What this looks like in practice
4. BUSINESS VALUE — The business cost/gain
5. [DECISION MADE]
6. OUTCOME TITLE — Name for the archetype/path
7. WHAT — Specific observable consequences
8. WHY — Root cause of the outcome
9. HOW — Measurable impact
10. WHO — Named archetype identity
11. TOMORROW — Single concrete behavior change
```

---

## 11. Recommended Source Material for Building a HumanCentric Prompt System

### Priority 1 — Core Concept Definitions (use as system context)

1. **UX Definition block** (from UXNamingPhase): "User Experience is how something feels to use over time. It's shaped by decisions, not accidents. It's created by everyone involved in building systems."

2. **UX vs. UI distinction**: "UI is what you see (Colors, fonts, buttons, layouts). UX is what you feel (Confusion, relief, frustration, trust)."

3. **UX Cost taxonomy**: Confused users → support tickets / Abandoned tasks → drop-off / Mistakes → rework / Distrust → adoption stalls / Symptoms fixed not causes → escalations

4. **The Decision Lens**: "You've been taught to protect the Project. Start protecting the Outcome." — with The Yes Trap and The Friction Value explanations.

5. **UX Debt mechanics**: hidden → surfacing → visible progression, with "We don't inherit codebases. We inherit decisions."

---

### Priority 2 — Role Paradigm Shifts (use as role-specific system prompt injections)

Use these verbatim as persona context when an assistant is addressing a specific role:

- **Sales:** "Every email, meeting, and proposal you write is a user interface you are designing for the buyer."
- **CRM:** "The clients who renew without negotiation aren't the ones who got the most attention — they're the ones for whom working with you required the least effort."
- **PM:** "You are running three user experiences simultaneously: the developer's experience, the stakeholder's roadmap, and the user's product."
- **Developer:** "Users don't experience architecture. They experience its consequences: speed, failure, recovery."
- **QA:** "Functional correctness is the floor, not the ceiling."
- **Designer:** "When you customize a component, you've created a pattern."
- **Strategy:** "The most expensive error isn't choosing the wrong direction — it's choosing the right direction without understanding the experience conditions."
- **BA:** "The specification you write is the closest a developer has to a conversation with the user."

---

### Priority 3 — Scripts Library (use as suggested responses in a support tool)

The 16 verbatim scripts across all roles (see Block 6 in Section 7) are ready-to-use conversation templates. For a prompt-based assistant, these can be matched to trigger situations and surfaced as recommendations.

---

### Priority 4 — Role Rubrics (use as daily check-in prompts)

The 8 × 3 rubric questions (see Block 7 in Section 7) can power a daily reflection prompt system. Each question is short, high-signal, and immediately actionable.

---

### Priority 5 — "Tomorrow" Action Lines (use as micro-coaching nudges)

The 20+ "Tomorrow" lines (see Block 8 in Section 7) are single-sentence behavior changes extracted from each scenario outcome. These are ideal for push notifications, Slack reminders, or onboarding checklists.

---

### Priority 6 — The Scenario Outcome Framework

The 3-choice structure with WHO (archetype) and TOMORROW (behavior) for all 8 roles × 3 scenarios = 24 scenario nodes. Each maps a recognizable work situation to a named behavioral pattern and a concrete next step. These can power:
- FAQ: "What should I do when a client asks for scope changes?"
- Coaching: "You sound like a 'Postman.' Here's what a Signal Architect would do instead."
- Checklist generation: "Before every release, are you The Box Ticker or The Boundary Protector?"

---

### Priority 7 — SDLC Compounding Narrative

The Layer 2 completion text — especially the 4 key learnings and 3 quotes — is the cleanest distillation of the platform's core thesis for use in executive briefings, proposal context, or support system onboarding.

> "A skip in Discovery became a blocked ticket in Development, became a deferred bug in Testing, became a support escalation in Maintenance."
> "Early care prevents late pain."
> "The phases that felt 'far from users' — Discovery, Requirements — had the highest leverage on what users eventually experienced."

---

### Priority 8 — Client Revenue Framing

For any client-facing prompt system, the revenue framing blocks from the client path are the most direct:
- "Marketing fills the bucket. Bad UX punches holes in the bottom."
- "You are paying a 'Bad UX Tax' on every single ad dollar you spend today."
- "Fixing the funnel yields substantially higher ROI than just increasing ad spend."
- "UX is Math. Design isn't just about 'looking good'. Friction is measurable financial loss."

---

*Document compiled from full codebase extraction of the HumanCentric Behavior platform (human-centric-behavior). All content quoted verbatim from source files. Extraction date: April 2026.*
