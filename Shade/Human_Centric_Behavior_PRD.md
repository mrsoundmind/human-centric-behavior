# Product Requirements Document (PRD): Human-Centric Behavior Lab

**Live Production URL:** [https://human-centric-behavior.vercel.app/](https://human-centric-behavior.vercel.app/)

---

## 1. Executive Summary
The **Human-Centric Behavior Lab** is a highly interactive, experiential training web application. It is engineered to shift the mindset of developers, designers, and business stakeholders from a traditional "feature-delivery" focus to a deeply "human-centric" design perspective. By actively placing users into deliberately flawed UI scenarios, the application evokes genuine frustration. It then deconstructs those emotions to teach the psychological principles of good User Experience (UX) and how to apply those principles within a modern Software Development Life Cycle (SDLC).

## 2. Core Objectives & Problem Statement
* **The Problem:** Software teams often build features that meet technical requirements but fail the end-user due to a lack of empathy and poor UX design.
* **The Solution:** An immersive simulation that forces the creator to become the user. 
* **The Goal:** To establish empathy as a measurable, critical metric during the SDLC, reducing friction, increasing accessibility, and ultimately boosting the ROI of digital products.

## 3. Target Audiences & Workflows
The application intelligently routes users based on their role, offering customized narratives:

1. **Internal Teams (Developers, Designers, PMs, QA):**
   - **Path:** `/internalteam`
   - **Focus:** Agility, empathy training, and human-centric SDLC integration. Simulates "War Rooms", onboarding briefs, and systematic design tokens. Allows teams to understand how bad UX drastically inflates support tickets and technical debt.
2. **Clients & Executive Stakeholders:**
   - **Path:** `/client` (or `client.*` subdomain)
   - **Focus:** Business value, UX ROI, and high-level strategy. A streamlined executive overview demonstrating why investing in premium UX correlates directly to customer retention and revenue.

---

## 4. The Layered Architecture (Core Features)

The application is structured into a psychological journey comprising three fundamental layers:

### Layer 1: "Feel" (The Emotional Experience)
Users are subjected to flawlessly styled but functionally broken micro-interactions. The goal is to induce uncertainty, frustration, and cognitive fatigue.
- **The Door Friction:** An intentionally confusing entry interaction that breaks standard affordances.
- **The Silent Button:** A non-responsive call-to-action lacking hover/active feedback loops, creating extreme user doubt.
- **The Confusing Form:** A high-anxiety data entry scenario demonstrating the debilitating effects of cognitive overload, poor validation, and lack of visual hierarchy.
- **Delayed Response:** A slow UI interaction that demonstrates how latency destroys user trust within milliseconds.
- **Pattern Pause:** The critical transitional screen where the simulation halts, forcing the user to reflect on the frustration they just felt.

### Layer 1.5: "Understand" (The Awakening)
The application pulls back the curtain on Layer 1. 
- It maps the user's previously felt frustration to specific psychological safety and cognitive load principles. 
- It translates abstract feelings into concrete UX heuristics (e.g., Fitts's Law, Nielsen's Visibility of System Status).

### Layer 2: "Apply" (The Resolution via SDLC)
The practical phase. The user simulates a Software Development Life Cycle to actively fix the broken experiences from Layer 1.
- **Discovery & Requirements:** Identifying human friction points rather than just technical requirements.
- **Design:** Applying proper affordances, consistent UX tokens, and inclusive design principles.
- **Development & Testing:** Implementing precise state feedback (loading/success/error states) and profiling performance.
- **Launch & Maintenance:** Focusing on continuous telemetry, user satisfaction metrics, and iterative updates.

---

## 5. Global Navigation & Menu System

To facilitate flexible presentations and non-linear exploration, the application features an advanced, accordion-style **Global Hamburger Menu** utilizing smooth `framer-motion` sliding animations. 

**Structure:**
- **Introduction:** Routes the user to the starting `intro` screen.
- **UX Education (Expandable Drawer):**
  - *The Door* (`door`) - Direct jump to entry friction.
  - *Silent Button* (`silent-button`) - Direct jump to missing feedback.
  - *Confusing Form* (`confusing-form`) - Direct jump to cognitive load.
  - *Delayed Response* (`delayed-response`) - Direct jump to latency testing.
  - *Pattern Pause* (`pattern-pause`) - Direct jump to reflection.
- **The SDLC Process:** Direct link triggering the `layer2` SDLC rebuild simulation.
- **Internal Training (Expandable Drawer):**
  - *Training Intro* (`internal-intro`) 
  - *Role Designation* (`designation`)
  - *Onboarding Brief* (`onboarding-brief`)
  - *UX War Room* (`onboarding-war-room`)
- **[Separator]**
- **Client Training:** External navigation triggering a hard route to `/client` for the executive view.

*Note: The platform also features a hidden `DebugMenu` for administrators to force-skip to specific scenarios without opening the main navigation.*

---

## 6. Technical Stack & Architecture

- **Frontend Framework:** React 18 running on Vite (for rapid HMR and optimized production builds).
- **Core Languages:** TypeScript and TSX for strict type safety and interface definitions.
- **Routing:** Built on `react-router-dom` incorporating sophisticated routing logic that scans `window.location.hostname` to seamlessly load the Client Experience on subdomains.
- **Styling & Aesthetics:** 
  - Tailwind CSS combined with Vanilla CSS variables for a strict design system.
  - `shadcn-ui` (Radix UI primitives) for accessible, unstyled core components.
  - Generous use of glassmorphism, precise gradients, and dark-mode elegance to ensure a premium look.
- **Animation Engine:** `framer-motion` (`AnimatePresence`, `motion.div`) powering route transitions, micro-interactions, and the expandable global menu.
- **State Management:** A custom combination of `Zustand` and `React Context` (`GlobalExperienceProvider`) tracks the user's progress globally across domains.
- **Deployment:** Vercel automatically deploys the `main` branch from the `mrsoundmind/human-centric-behavior` GitHub repository.

---
*Created and maintained as the master blueprint for the Human-Centric Behavior Lab. Stored in the `Shade/` director to centralize project portfolios.*
