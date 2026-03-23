/**
 * ScenarioRenderer — GENERIC scenario display component.
 *
 * CRITICAL RULE: This component must NOT contain role-specific conditional branches.
 * No `if (scenario.role === "pm")` or similar checks are allowed.
 * The data (ScenarioConfig) drives the display entirely.
 *
 * Renders any ScenarioConfig: title, friction badge, setup card, choice buttons,
 * debrief reveal (all 5 fields), and advance button.
 *
 * Supports active mode (choices clickable) and readonly mode (for completed phase revisit).
 */

import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { ScenarioConfig, Choice } from "../../../../../data/scenarios/types";
import { FRICTION_CONFIG } from "./friction-config";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ScenarioRendererProps {
  scenario: ScenarioConfig;
  onChoiceSelected: (choice: Choice) => void;
  selectedChoiceId: string | null;
  onAdvance: () => void;
  isDebriefVisible: boolean;
  mode?: "active" | "readonly";
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ScenarioRenderer = ({
  scenario,
  onChoiceSelected,
  selectedChoiceId,
  onAdvance,
  isDebriefVisible,
  mode = "active",
}: ScenarioRendererProps) => {
  const frictionConfig = FRICTION_CONFIG[scenario.frictionDimension];
  const isReadonly = mode === "readonly";

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-3xl w-full space-y-8">

        {/* ── Header Section ── */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-3"
        >
          <Badge
            className={`border ${frictionConfig.className} font-mono text-xs uppercase tracking-wider`}
          >
            {frictionConfig.label}
          </Badge>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
            {scenario.title}
          </h1>
        </motion.div>

        {/* ── Setup Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="bg-white/5 border-white/10">
            <CardContent className="p-6">
              <p className="text-gray-300 leading-relaxed text-base">{scenario.setup}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* ── Choices Section ── */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="space-y-3"
        >
          <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
            What do you do?
          </p>
          <div className="space-y-3">
            {scenario.choices.map((choice) => {
              const isSelected = selectedChoiceId === choice.id;
              return (
                <button
                  key={choice.id}
                  disabled={isReadonly || selectedChoiceId !== null}
                  onClick={() => onChoiceSelected(choice)}
                  className={[
                    "w-full text-left px-5 py-4 rounded-xl border transition-all duration-200",
                    "text-sm leading-relaxed",
                    isSelected
                      ? "border-white/50 bg-white/10 ring-2 ring-white/30 text-white"
                      : "border-white/10 bg-white/5 text-gray-300 hover:border-white/30 hover:bg-white/10 hover:text-white",
                    isReadonly || selectedChoiceId !== null
                      ? "cursor-default"
                      : "cursor-pointer",
                  ].join(" ")}
                >
                  {choice.text}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Debrief Section (revealed after choice) ── */}
        <AnimatePresence mode="wait">
          {isDebriefVisible && (
            <motion.div
              key="debrief"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="border-t border-white/10 pt-6">
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest mb-4">
                  Debrief
                </p>
                <div className="space-y-4">

                  {/* What Happened */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-1">
                    <h4 className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                      What Happened
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {scenario.debrief.whatHappened}
                    </p>
                  </div>

                  {/* Why */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-1">
                    <h4 className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                      Why
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {scenario.debrief.why}
                    </p>
                  </div>

                  {/* The Mechanism */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-1">
                    <h4 className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                      The Mechanism
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {scenario.debrief.how}
                    </p>
                  </div>

                  {/* Who You Became */}
                  <div className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-1">
                    <h4 className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                      Who You Became
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {scenario.debrief.whoBecame}
                    </p>
                  </div>

                  {/* Tomorrow's Action — behavioral change anchor, highlighted */}
                  <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-5 space-y-1">
                    <h4 className="text-xs font-mono text-amber-400 uppercase tracking-wider">
                      Tomorrow's Action
                    </h4>
                    <p className="text-amber-100 text-sm leading-relaxed font-medium">
                      {scenario.debrief.tomorrowAction}
                    </p>
                  </div>
                </div>
              </div>

              {/* Advance Button */}
              {!isReadonly && (
                <div className="pt-2">
                  <Button
                    onClick={onAdvance}
                    size="lg"
                    className="w-full bg-white text-black font-bold hover:bg-white/90"
                  >
                    Continue
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
