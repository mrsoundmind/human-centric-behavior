import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { ExperienceWrapper } from "../ExperienceWrapper";

interface UXNamingPhaseProps {
  onComplete: () => void;
}

type NamingStage = "intro" | "define" | "not-ui" | "cost" | "everyone" | "complete";

export const UXNamingPhase = ({ onComplete }: UXNamingPhaseProps) => {
  const [stage, setStage] = useState<NamingStage>("intro");

  const nextStage = () => {
    const stages: NamingStage[] = ["intro", "define", "not-ui", "cost", "everyone", "complete"];
    const currentIndex = stages.indexOf(stage);
    if (currentIndex < stages.length - 1) {
      setStage(stages[currentIndex + 1]);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {stage === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >


            <ExperienceWrapper stage="context">
              <div className="text-center space-y-12 max-w-2xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-xl text-muted-foreground mb-8">
                    What you've been experiencing has a name.
                  </p>

                  <motion.h1
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1 }}
                    className="text-4xl md:text-6xl font-display font-bold text-primary"
                  >
                    User Experience
                  </motion.h1>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  onClick={nextStage}
                  className="px-8 py-4 bg-secondary text-secondary-foreground font-display text-lg rounded-md hover:bg-secondary/80 transition-colors"
                >
                  What does that mean?
                </motion.button>
              </div>
            </ExperienceWrapper>
          </motion.div>
        )}

        {stage === "define" && (
          <motion.div
            key="define"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >


            <ExperienceWrapper stage="context">
              <div className="max-w-3xl mx-auto space-y-12">
                {/* Interactive definition */}
                <div className="bg-card border border-border rounded-lg p-8 md:p-12 space-y-8">
                  <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
                    User Experience is how something feels to use over time.
                  </h2>

                  <div className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="flex items-start gap-4"
                    >
                      <span className="text-primary text-2xl">→</span>
                      <div>
                        <p className="text-foreground">The door that opened when you pulled.</p>
                        <p className="text-muted-foreground text-sm">That moment of confusion was part of the experience.</p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="flex items-start gap-4"
                    >
                      <span className="text-primary text-2xl">→</span>
                      <div>
                        <p className="text-foreground">The button that gave no feedback.</p>
                        <p className="text-muted-foreground text-sm">That uncertainty was part of the experience.</p>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.1 }}
                      className="flex items-start gap-4"
                    >
                      <span className="text-primary text-2xl">→</span>
                      <div>
                        <p className="text-foreground">The form that didn't explain itself.</p>
                        <p className="text-muted-foreground text-sm">That frustration was part of the experience.</p>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="text-center"
                >
                  <button
                    onClick={nextStage}
                    className="px-8 py-4 bg-secondary text-secondary-foreground font-display text-lg rounded-md hover:bg-secondary/80 transition-colors"
                  >
                    Continue
                  </button>
                </motion.div>
              </div>
            </ExperienceWrapper>
          </motion.div>
        )}

        {stage === "not-ui" && (
          <motion.div
            key="not-ui"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >


            <ExperienceWrapper stage="context">
              <div className="max-w-3xl mx-auto space-y-12">
                <div className="bg-card border border-border rounded-lg p-8 md:p-12 space-y-8">
                  <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
                    User Experience is not UI.
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Not UX */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-4"
                    >
                      <p className="text-sm text-muted-foreground uppercase tracking-wide">
                        UI is what you see
                      </p>
                      <div className="p-6 bg-secondary/30 rounded-lg border border-border">
                        <div className="space-y-3">
                          <div className="h-8 bg-muted rounded" />
                          <div className="h-4 bg-muted/60 rounded w-3/4" />
                          <div className="h-4 bg-muted/40 rounded w-1/2" />
                          <div className="h-10 bg-primary/30 rounded w-24 mt-4" />
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Colors, fonts, buttons, layouts.
                      </p>
                    </motion.div>

                    {/* UX */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="space-y-4"
                    >
                      <p className="text-sm text-primary uppercase tracking-wide">
                        UX is what you feel
                      </p>
                      <div className="p-6 bg-friction/10 rounded-lg border border-friction/30 space-y-3">
                        <p className="text-foreground/80 italic">"Why isn't this working?"</p>
                        <p className="text-foreground/80 italic">"Where is that option?"</p>
                        <p className="text-foreground/80 italic">"I don't understand what to do."</p>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Confusion, relief, frustration, trust.
                      </p>
                    </motion.div>
                  </div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="text-foreground/80 pt-4 border-t border-border"
                  >
                    A beautiful interface can still create a frustrating experience.<br />
                    A simple interface can still feel effortless.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="text-center"
                >
                  <button
                    onClick={nextStage}
                    className="px-8 py-4 bg-secondary text-secondary-foreground font-display text-lg rounded-md hover:bg-secondary/80 transition-colors"
                  >
                    Continue
                  </button>
                </motion.div>
              </div>
            </ExperienceWrapper>
          </motion.div>
        )}

        {stage === "cost" && (
          <motion.div
            key="cost"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >


            <ExperienceWrapper stage="context">
              <div className="max-w-3xl mx-auto space-y-12">
                <div className="bg-card border border-border rounded-lg p-8 md:p-12 space-y-8">
                  <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
                    The cost of UX appears in different places.
                  </h2>

                  <div className="space-y-4">
                    {[
                      { symptom: "Users get confused", cost: "Support tickets pile up", delay: 0.3 },
                      { symptom: "Users abandon tasks", cost: "Drop-off rates increase", delay: 0.5 },
                      { symptom: "Users make mistakes", cost: "Rework and corrections", delay: 0.7 },
                      { symptom: "Users distrust the system", cost: "Adoption stalls", delay: 0.9 },
                      { symptom: "Teams fix symptoms, not causes", cost: "Escalations and blame", delay: 1.1 },
                    ].map(({ symptom, cost, delay }) => (
                      <motion.div
                        key={symptom}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay }}
                        className="flex items-center gap-4 p-4 bg-secondary/30 rounded-lg"
                      >
                        <span className="text-muted-foreground">{symptom}</span>
                        <span className="text-friction">→</span>
                        <span className="text-foreground">{cost}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="text-foreground/70 text-lg italic"
                  >
                    UX isn't decoration. It's how systems either work for people or against them.
                  </motion.p>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="text-center"
                >
                  <button
                    onClick={nextStage}
                    className="px-8 py-4 bg-secondary text-secondary-foreground font-display text-lg rounded-md hover:bg-secondary/80 transition-colors"
                  >
                    Continue
                  </button>
                </motion.div>
              </div>
            </ExperienceWrapper>
          </motion.div>
        )}

        {stage === "everyone" && (
          <motion.div
            key="everyone"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >


            <ExperienceWrapper stage="context">
              <div className="max-w-3xl mx-auto space-y-12">
                <div className="bg-card border border-border rounded-lg p-8 md:p-12 space-y-8">
                  <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
                    UX is shaped by every role.
                  </h2>

                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      { role: "Requirements", impact: "What gets included shapes what users can do" },
                      { role: "Design", impact: "How things look affects how they feel" },
                      { role: "Development", impact: "How things are built affects how they behave" },
                      { role: "Testing", impact: "What gets caught prevents user frustration" },
                      { role: "Timeline pressure", impact: "What gets cut changes what users receive" },
                      { role: "Stakeholder priorities", impact: "What gets attention shapes the outcome" },
                    ].map(({ role, impact }, i) => (
                      <motion.div
                        key={role}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + i * 0.15 }}
                        className="p-4 bg-secondary/30 rounded-lg"
                      >
                        <p className="text-primary font-medium text-sm mb-1">{role}</p>
                        <p className="text-muted-foreground text-sm">{impact}</p>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                    className="pt-4 border-t border-border"
                  >
                    <p className="text-foreground text-lg">
                      UX is a system outcome.<br />
                      <span className="text-muted-foreground">Everyone contributes to it—whether they intend to or not.</span>
                    </p>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                  className="text-center"
                >
                  <button
                    onClick={nextStage}
                    className="px-8 py-4 bg-primary text-primary-foreground font-display text-lg rounded-md hover:bg-primary/90 transition-colors"
                  >
                    I understand
                  </button>
                </motion.div>
              </div>
            </ExperienceWrapper>
          </motion.div>
        )}

        {stage === "complete" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >


            <ExperienceWrapper stage="reflection">
              <div className="bg-card border border-border rounded-lg p-8 md:p-12 shadow-deep space-y-8 max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
                  What you now understand
                </h2>

                <div className="space-y-4 text-muted-foreground">
                  <p>
                    <span className="text-foreground">User Experience</span> is how something feels to use over time.
                  </p>
                  <p>
                    It's shaped by <span className="text-foreground">decisions</span>, not accidents.
                  </p>
                  <p>
                    It's created by <span className="text-foreground">everyone</span> involved in building systems.
                  </p>
                  <p>
                    Its cost appears as <span className="text-foreground">confusion, rework, support, and frustration</span>.
                  </p>
                </div>

                <div className="pt-6 border-t border-border">
                  <p className="text-foreground/60 text-sm mb-6">
                    You've felt UX. You understand UX.<br />
                    Now see how it's created in delivery.
                  </p>
                  <button
                    onClick={onComplete}
                    className="px-6 py-3 bg-primary text-primary-foreground font-display rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Continue to Layer 2
                  </button>
                </div>
              </div>
            </ExperienceWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
