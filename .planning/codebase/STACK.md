# Technology Stack

**Analysis Date:** 2026-03-23

## Languages

**Primary:**
- TypeScript 5.8.3 - Full codebase implementation (`.ts`, `.tsx`)
- CSS - Styling via Tailwind CSS

## Runtime

**Environment:**
- Node.js - Development and build environment
- Browser - React runs client-side

**Package Manager:**
- npm - Primary package manager
- Lockfile: `package-lock.json` present
- Alternative lockfile: `bun.lockb` present (Bun support)

## Frameworks

**Core:**
- React 18.3.1 - UI library
- React Router DOM 6.30.1 - Client-side routing

**Build/Dev:**
- Vite 5.4.19 - Build tool and dev server
- Vite plugin: `@vitejs/plugin-react-swc` 3.11.0 - SWC compiler integration

**Styling:**
- Tailwind CSS 3.4.17 - Utility-first CSS framework
- PostCSS 8.5.6 - CSS processing
- Autoprefixer 10.4.21 - Vendor prefixes

**Component UI:**
- Radix UI - Headless component library (40+ packages)
  - Includes: Accordion, Alert Dialog, Avatar, Button, Calendar, Checkbox, Dialog, Dropdown Menu, Hover Card, Label, Navigation Menu, Popover, Progress, Radio Group, Scroll Area, Select, Separator, Slider, Switch, Tabs, Toast, Toggle, Tooltip, etc.
  - Versions: ^1.1.x - ^2.2.x

**Form & Validation:**
- React Hook Form 7.61.1 - Form state management
- `@hookform/resolvers` 3.10.0 - Resolver library for validation schemas
- Zod 3.25.76 - TypeScript-first schema validation

**Data Fetching & State:**
- TanStack React Query 5.83.0 - Server state management
- Location: Provider setup in `src/App.tsx`

**Animation & Motion:**
- Framer Motion 12.26.2 - Animation library
- Embla Carousel React 8.6.0 - Carousel component

**UI Utilities:**
- Lucide React 0.462.0 - Icon library
- Sonner 1.7.4 - Toast notifications
- Next-themes 0.3.0 - Theme management
- Vaul 0.9.9 - Sheet/drawer component
- Class-variance-authority 0.7.1 - Component variant management
- clsx 2.1.1 - Class name utilities
- Tailwind-merge 2.6.0 - Merge Tailwind classes
- Tailwindcss-animate 1.0.7 - Animation utilities
- React Day Picker 8.10.1 - Date picker component
- Input OTP 1.4.2 - OTP input component
- React Resizable Panels 2.1.9 - Resizable panel layout
- cmdk 1.1.1 - Command menu component
- recharts 2.15.4 - Chart library
- date-fns 3.6.0 - Date utilities

**Tooling:**
- lovable-tagger 1.1.13 - Component tagging for development

## Key Dependencies

**Critical:**
- React 18.3.1 - Core UI library; fundamental to entire application
- Vite 5.4.19 - Build tool; controls development and production builds
- TypeScript 5.8.3 - Type safety; all code is written in TypeScript
- Radix UI components - Accessible, unstyled UI primitives; foundation for component library

**Infrastructure:**
- TanStack React Query 5.83.0 - Server state caching and synchronization
- React Router DOM 6.30.1 - Navigation and routing
- Tailwind CSS 3.4.17 - Styling system
- Zod 3.25.76 - Runtime validation

## Configuration

**Environment:**
- `.env.local` present - Contains Vercel OIDC token (development environment)
- No sensitive API keys in codebase - Integration relies on Vercel deployment
- Path alias: `@/*` maps to `src/*` (TypeScript and Vite)

**Build:**
- `vite.config.ts` - Vite configuration with React SWC plugin
- `tsconfig.json` - Base TypeScript configuration
- `tsconfig.app.json` - App-specific TypeScript configuration (target: ES2020)
- `tsconfig.node.json` - Node tooling TypeScript configuration
- `tailwind.config.ts` - Tailwind customization (dark mode, custom colors, animations)
- `postcss.config.js` - PostCSS with Tailwind and Autoprefixer plugins
- `eslint.config.js` - ESLint configuration with React Hooks and React Refresh rules
- `components.json` - shadcn/ui configuration for component generation

**Development Server:**
- Port: 8080 (Vite dev server)
- Host: `::`  (IPv6 localhost)

## Platform Requirements

**Development:**
- Node.js (version unspecified, but modern)
- npm or Bun package manager
- Modern browser (ES2020 target)

**Production:**
- Vercel platform (deployment target)
- Static hosting suitable for SPA (Single Page Application)
- Node.js runtime at build time only

---

*Stack analysis: 2026-03-23*
