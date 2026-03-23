/**
 * Zustand + Immer store for designation journey state.
 *
 * Design constraints (STAT-01 to STAT-04):
 * - STAT-01: Initializes with empty roles map and empty completedRoles
 * - STAT-02: recordDecision appends to role's decisions array (append-only, no mutation)
 * - STAT-03: Persists to localStorage under "hcl_designation_store" with schemaVersion
 * - STAT-04: Schema version mismatch triggers graceful reset with console.warn
 *
 * CRITICAL boundary: ZERO runtime imports from SDLCContext or any Layer 2 component.
 * Only import type from data/scenarios/types.ts.
 */

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
// Import types ONLY from data layer — NEVER from SDLCContext
import type {
  Designation,
  SDLCPhase,
  DecisionRecord,
} from "../../data/scenarios/types";

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface RoleState {
  currentPhase: SDLCPhase;
  decisions: DecisionRecord[]; // append-only — STAT-04
  currentScenarioIndex: number;
  status: "not_started" | "in_progress" | "complete";
}

interface PersistedDesignationState {
  schemaVersion: number; // STAT-03
  roles: Partial<Record<Designation, RoleState>>;
  completedRoles: Designation[];
}

interface DesignationActions {
  recordDecision: (record: DecisionRecord) => void;
  advancePhase: (role: Designation, nextPhase: SDLCPhase) => void;
  advanceScenario: (role: Designation) => void;
  completeRole: (role: Designation) => void;
  resetRoleProgress: (role: Designation) => void;
  resetAll: () => void;
  initRole: (role: Designation, startPhase: SDLCPhase) => void;
}

// ─── Schema Version ───────────────────────────────────────────────────────────

const SCHEMA_VERSION = 1;

// ─── Store ───────────────────────────────────────────────────────────────────

export const useDesignationStore = create<
  PersistedDesignationState & DesignationActions
>()(
  persist(
    immer((set) => ({
      schemaVersion: SCHEMA_VERSION,
      roles: {},
      completedRoles: [],

      initRole: (role: Designation, startPhase: SDLCPhase) =>
        set((state) => {
          if (!state.roles[role]) {
            state.roles[role] = {
              currentPhase: startPhase,
              decisions: [],
              currentScenarioIndex: 0,
              status: "in_progress",
            };
          }
        }),

      recordDecision: (record: DecisionRecord) =>
        set((state) => {
          if (!state.roles[record.role]) {
            state.roles[record.role] = {
              currentPhase: record.phase,
              decisions: [],
              currentScenarioIndex: 0,
              status: "in_progress",
            };
          }
          state.roles[record.role]!.decisions.push(record);
        }),

      advancePhase: (role: Designation, nextPhase: SDLCPhase) =>
        set((state) => {
          if (state.roles[role]) {
            state.roles[role]!.currentPhase = nextPhase;
            state.roles[role]!.currentScenarioIndex = 0;
          }
        }),

      advanceScenario: (role: Designation) =>
        set((state) => {
          if (state.roles[role]) {
            state.roles[role]!.currentScenarioIndex += 1;
          }
        }),

      completeRole: (role: Designation) =>
        set((state) => {
          if (state.roles[role]) {
            state.roles[role]!.status = "complete";
          }
          if (!state.completedRoles.includes(role)) {
            state.completedRoles.push(role);
          }
        }),

      resetRoleProgress: (role: Designation) =>
        set((state) => {
          delete state.roles[role];
          state.completedRoles = state.completedRoles.filter((r) => r !== role);
        }),

      resetAll: () =>
        set((state) => {
          state.roles = {};
          state.completedRoles = [];
          state.schemaVersion = SCHEMA_VERSION;
        }),
    })),
    {
      name: "hcl_designation_store",
      version: SCHEMA_VERSION,
      migrate: (persisted: unknown, version: number) => {
        if (version !== SCHEMA_VERSION) {
          console.warn(
            `[DesignationStore] Schema version mismatch (stored: ${version}, current: ${SCHEMA_VERSION}) — resetting progress`
          );
          return {
            schemaVersion: SCHEMA_VERSION,
            roles: {},
            completedRoles: [],
          } as PersistedDesignationState;
        }
        return persisted as PersistedDesignationState & DesignationActions;
      },
    }
  )
);
