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
import { getRoleVisual } from "./InlineVisuals";
import { GradientBackground } from "../RoleJourney";
import React from "react";

const KEYWORDS = [
  "Change Request", "SLA", "escalation", "bottleneck", "timeline", "scope", "UX", 
  "requirements", "sign-off", "approval", "dependency", "budget", "pipeline", 
  "real-time", "batch processing", "architecture", "microservice", "ARB", 
  "asynchronous", "synchronous", "handoff", "workflow", "UAT", "edge cases",
  "invisibly", "accountability", "time-bombs", "rework", "delay", "friction", 
  "cognitive load", "price-shoppers", "Lifetime Value", "trust", "momentum", 
  "retention", "adoption", "churn", "debt", "root cause", "mechanism",
  "Architecture Decision Record", "ADR", "sprint", "legacy", "contract", "legal",
  "competitor", "expedite", "appendix", "enthusiasm"
].sort((a,b) => b.length - a.length);

export const HighlightText = ({ text }: { text: string }) => {
  if (!text) return null;
  // Convert text into an array of match objects
  const regex = new RegExp(`(${KEYWORDS.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) => {
        const isMatch = KEYWORDS.some(k => k.toLowerCase() === part.toLowerCase());
        if (isMatch) {
          return (
            <span key={i} className="text-foreground font-semibold bg-muted px-1.5 py-0.5 rounded border border-border shadow-sm">
              {part}
            </span>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
};

const ROLE_COLORS: Record<string, { c1: string, c2: string }> = {
  pm: { c1: "#1e40af", c2: "#db2777" },
  developer: { c1: "#0ea5e9", c2: "#10b981" },
  designer: { c1: "#d946ef", c2: "#8b5cf6" },
  qa: { c1: "#ef4444", c2: "#f59e0b" },
  ba: { c1: "#8b5cf6", c2: "#3b82f6" },
  sales: { c1: "#22b5e6", c2: "#8b5cf6" },
  crm: { c1: "#6366f1", c2: "#14b8a6" },
  strategy: { c1: "#f43f5e", c2: "#a855f7" },
};

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
  const colors = ROLE_COLORS[scenario.role] || { c1: "#7c3aed", c2: "#1e40af" };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col p-6 lg:p-12 relative font-sans">
      <GradientBackground color1={colors.c1} color2={colors.c2} />

      <div className="max-w-[1400px] mx-auto w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* ────── LEFT COLUMN: Context & Action (Cols 1-5 or 6) ────── */}
          <div 
            className={`lg:col-span-5 xl:col-span-5 space-y-10 lg:sticky lg:top-12 transition-all duration-1000 ${
              isDebriefVisible ? "opacity-40 grayscale-[50%] hover:opacity-100 hover:grayscale-0 focus-within:opacity-100 focus-within:grayscale-0" : "opacity-100"
            }`}
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-4">
                <Badge
                  className={`border ${frictionConfig.className} font-mono text-[10px] uppercase tracking-[0.2em] px-3 py-1 bg-muted backdrop-blur-sm`}
                >
                  {frictionConfig.label}
                </Badge>
                <div className="h-px w-12 bg-border" />
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-foreground leading-[1.1] tracking-tight drop-shadow-2xl">
                {scenario.title}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="bg-card border border-border rounded-3xl p-8 backdrop-blur-xl shadow-2xl relative group hover:border-primary/40 transition-colors">
                <div className="absolute top-0 right-0 w-24 h-24 bg-card rounded-bl-full pointer-events-none" />
                <p className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-[0.3em] mb-6">The Situation</p>
                <p className="text-muted-foreground leading-relaxed text-base font-light">
                   <HighlightText text={scenario.setup} />
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-[0.3em] ml-2">What Do You Do?</p>
              <div className="space-y-4">
                {scenario.choices.map((choice, index) => {
                  const isSelected = selectedChoiceId === choice.id;
                  return (
                    <button
                      key={choice.id}
                      disabled={isReadonly || selectedChoiceId !== null}
                      onClick={() => onChoiceSelected(choice)}
                      className={[
                        "w-full text-left px-6 py-5 rounded-2xl border transition-all duration-300 relative group overflow-hidden",
                        isSelected
                          ? "border-primary/40 bg-muted scale-[1.02] shadow-lg"
                          : "border-border bg-card hover:border-primary/40 hover:bg-muted",
                        isReadonly || selectedChoiceId !== null
                          ? (isSelected ? "" : "opacity-30 grayscale cursor-default")
                          : "cursor-pointer",
                      ].join(" ")}
                    >
                      <div className="flex items-start gap-4 relative z-10">
                        <span className={`text-[11px] font-mono pt-1 ${isSelected ? "text-foreground" : "text-muted-foreground/70"}`}>
                          {String.fromCharCode(65 + index)}
                        </span>
                        <span className="text-[15px] leading-relaxed font-medium text-foreground">
                          <HighlightText text={choice.text} />
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* The Advance button will now be located at the end of the debrief narrative on the right column for better reading flow. */}
            {selectedChoiceId === null && !isReadonly && (
              <div className="pt-4">
                <p className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-[0.2em]">Awaiting Decision...</p>
              </div>
            )}
          </div>

          {/* ────── RIGHT COLUMN: Debrief & Visual Tool (Cols 6-12) ────── */}
          <div className="lg:col-span-7 xl:col-span-7 h-full">
            <AnimatePresence mode="wait">
              {isDebriefVisible ? (
                <motion.div
                  key="debrief-panel"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.6, staggerChildren: 0.1 }}
                  className="space-y-8"
                >
                  {/* Dynamic Visual Focus */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    {getRoleVisual(scenario.role, scenario.phase, scenario.frictionDimension)}
                  </motion.div>

                  {/* Debrief Analysis Narrative */}
                  <div className="bg-card border border-border rounded-[2rem] p-8 lg:p-10 backdrop-blur-xl relative overflow-hidden shadow-2xl">
                    <div className="space-y-10 relative z-10">

                      {/* Section 1: The Reality */}
                      <div>
                        <h4 className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" /> The Reality
                        </h4>
                        <p className="text-[16px] xl:text-[18px] text-foreground leading-relaxed font-light">
                          <HighlightText text={scenario.debrief.whatHappened} />
                        </p>
                      </div>

                      {/* Section 2: Mechanism & Root Cause */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-border">
                        <div>
                          <h4 className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-[0.2em] mb-4 italic">
                            The Root Cause
                          </h4>
                          <p className="text-[14px] text-muted-foreground leading-relaxed font-light">
                            <HighlightText text={scenario.debrief.why} />
                          </p>
                        </div>
                        <div>
                          <h4 className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-[0.2em] mb-4 italic">
                            The Mechanism
                          </h4>
                          <p className="text-[14px] text-muted-foreground leading-relaxed font-light">
                            <HighlightText text={scenario.debrief.how} />
                          </p>
                        </div>
                      </div>

                      {/* Section 3: The Shift (Action) */}
                      <div className="pt-8 border-t border-border">
                        <h4 className="text-[10px] font-mono text-muted-foreground/70 uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Identity Shift
                        </h4>
                        <p className="text-[15px] text-muted-foreground leading-relaxed mb-8 italic">
                          "{scenario.debrief.whoBecame}"
                        </p>

                        <div className="bg-primary/10 border border-primary/40 rounded-2xl p-6 relative group overflow-hidden">
                          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-colors" />
                          <h4 className="text-[10px] font-mono text-primary uppercase tracking-widest mb-3 relative z-10">
                            Tomorrow's Action
                          </h4>
                          <p className="text-[16px] text-foreground leading-relaxed font-medium relative z-10">
                            <HighlightText text={scenario.debrief.tomorrowAction} />
                          </p>
                        </div>
                      </div>

                      {/* Advance Button (End of Reading Flow) */}
                      {!isReadonly && (
                        <div className="pt-4">
                          <button
                            onClick={onAdvance}
                            className="group w-full py-5 bg-primary text-primary-foreground rounded-full font-black text-[12px] uppercase tracking-[0.3em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg flex items-center justify-center gap-4"
                          >
                            Advance Simulation
                            <div className="w-6 h-6 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:bg-primary-foreground/20 transition-colors pointer-events-none">
                              <span className="text-lg leading-none translate-x-[1px] -translate-y-[1px]">→</span>
                            </div>
                          </button>
                        </div>
                      )}

                    </div>
                  </div>

                </motion.div>
              ) : (
                <motion.div
                  key="empty-state"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full min-h-[500px] rounded-3xl border border-border bg-card flex items-center justify-center backdrop-blur-sm"
                >
                  <div className="w-16 h-16 rounded-full border-t border-border animate-spin" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
};
