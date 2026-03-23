/**
 * Declarative phase navigation hook replacing array-index patterns.
 *
 * Design decisions (per CONTEXT.md):
 * - canAdvance is gated by hasDecision — prevents accidental phase skips
 * - advance() calls onComplete when at the last phase — linear-only progression
 * - setHasDecision(false) on advance — each new phase requires a fresh decision
 * - goBack() allows revisiting previous phases (read-only mode is ScenarioRenderer's responsibility)
 * - Generic <T> allows any phase type (SDLCPhase strings, scenario objects, etc.)
 *
 * This hook is self-contained — no store or context dependencies.
 * Replaces SCREEN_ORDER.indexOf() patterns in ScenarioRenderer and DesignationPortal (Plan 03).
 */

import { useState, useCallback } from "react";

// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface PhaseNavigationConfig<T> {
  phases: T[];
  onComplete?: () => void;
}

export interface PhaseNavigationResult<T> {
  current: T;
  currentIndex: number;
  total: number;
  canAdvance: boolean;
  hasDecision: boolean;
  advance: () => void;
  goBack: () => void;
  setHasDecision: (value: boolean) => void;
  isFirst: boolean;
  isLast: boolean;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function usePhaseNavigation<T>(
  config: PhaseNavigationConfig<T>
): PhaseNavigationResult<T> {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasDecision, setHasDecision] = useState(false);

  const canAdvance = hasDecision;

  const advance = useCallback(() => {
    if (!canAdvance) return;
    if (currentIndex === config.phases.length - 1) {
      config.onComplete?.();
    } else {
      setCurrentIndex((i) => i + 1);
      setHasDecision(false);
    }
  }, [canAdvance, currentIndex, config]);

  const goBack = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    }
  }, [currentIndex]);

  return {
    current: config.phases[currentIndex],
    currentIndex,
    total: config.phases.length,
    canAdvance,
    hasDecision,
    advance,
    goBack,
    setHasDecision,
    isFirst: currentIndex === 0,
    isLast: currentIndex === config.phases.length - 1,
  };
}
