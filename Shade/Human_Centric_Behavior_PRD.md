# Product Requirements Document (PRD): Human-Centric Behavior Lab

**Live Production URL:** [https://human-centric-lab-v2.vercel.app/](https://human-centric-lab-v2.vercel.app/)

---

## 1. Overview
The **Human-Centric Behavior Lab** is an interactive, experiential web application designed to help users (both internal teams and external clients) understand the psychological and emotional impact of digital user interfaces. Unlike standard presentations, this app relies on "experiential learning"—placing the user in intentionally flawed or engineered scenarios to evoke feelings of frustration, confusion, or satisfaction, and then dissecting those emotions to teach better UX and systematic design patterns.

## 2. Core Objective
To shift the mindset of developers, designers, and stakeholders from a "feature-delivery" perspective to a "human-centric" perspective. It achieves this by letting them **feel** the impact of bad design (Layer 1), **understand** the patterns causing it (Layer 1.5), and **apply** best practices to fix it (Layer 2).

## 3. Target Audience
1. **Internal Teams (Developers, Designers, PMs):** To undergo empathy training and adopt human-centric software development life cycle (SDLC) practices.
2. **Clients/Stakeholders:** To tangibly see the value in investing in premium UX, accessibility, and thoughtful design systems. 

## 4. Key Features & The "Layered" Experience Architecture

The application is structured around a multi-layered journey:

### Layer 1: "Feel" (The Emotional Experience)
Users are subjected to beautifully designed but fundamentally flawed micro-interactions that mimic poor UX found in the wild.
- **The Door Experience:** A confusing entry interaction illustrating friction.
- **The Silent Button:** A non-responsive call-to-action that lacks feedback, inducing uncertainty.
- **The Confusing Form:** A high-anxiety data entry experience representing cognitive overload.
- **Delayed Response:** A laggy interface demonstrating the negative trust impact of slow performance.

### Layer 1.5: "Understand" (The Awakening)
A transitional phase ("Pattern Pause") where the application pulls back the curtain. The user is shown *why* they felt frustrated and is introduced to the underlying psychological principles (e.g., lack of affordance, missing feedback loops, cognitive load).

### Layer 2: "Apply" (The Resolution)
The practical phase where the user navigates through a simulated Software Development Life Cycle (SDLC) to properly rebuild the experiences:
- **Discovery & Requirements:** Identifying human friction points.
- **Design:** Applying proper affordances and UX tokens.
- **Development & Testing:** Implementing state feedback and performance profiling.
- **Launch & Maintenance:** Focusing on continuous telemetry and user satisfaction.

### Specialized Workflows
- **Client Experience (`client.*` subdomain or `/client`):** A tailored, streamlined journey emphasizing business value and UX ROI for clients.
- **Internal Experience (`/internalteam`):** Deep-dive simulations (War Rooms, System Reactions, Onboarding Briefs) explicitly built for training staff in agile, human-centric delivery.

## 5. Technical Stack
- **Frontend Framework:** React 18 with Vite
- **Routing:** React Router DOM (includes subdomain-based routing logic)
- **Styling:** Tailwind CSS, `shadcn-ui` component library, Vanilla CSS for core utilities, Framer Motion for high-fidelity animations and page transitions.
- **State Management:** Zustand, React Context API (`GlobalExperienceProvider`), and TanStack Query.
- **Deployment Ecosystem:** Vercel (CI/CD and Hosting)

## 6. Access & Navigation
- The platform uses a **Global Menu** and **Layer Switcher**, ensuring users can non-linearly jump between the "Feel" and "Apply" phases, allowing presenters to dynamically control the flow during workshops or pitches.
- A **Debug Menu** is built-in to allow administrators to jump to any specific state (e.g., straight to the Layer 2 Development Screen) for rapid presentation capabilities.

---

*This document serves as the master blueprint for the Human-Centric Behavior Lab. Maintain this file in the `Shade` directory to centralize your production portfolio.*
