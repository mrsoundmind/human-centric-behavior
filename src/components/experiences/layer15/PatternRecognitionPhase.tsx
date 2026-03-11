import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalExperience } from "../GlobalExperienceContext";

import { ExperienceWrapper } from "../ExperienceWrapper";

interface PatternRecognitionPhaseProps {
  onComplete: () => void;
  onBack: () => void;
}

type PatternStage = "intro" | "patterns" | "pause" | "reflection";

interface Pattern {
  id: string;
  scenario: string;
  setup: string;
  interaction: string;
  feeling: string;
  revealed: boolean;
}

const PATTERNS: Pattern[] = [
  {
    id: "defaults",
    scenario: "The Checkbox",
    setup: "You're signing up for a service. Terms and conditions appear.",
    interaction: "The 'Subscribe to newsletter' checkbox is already checked.",
    feeling: "You almost missed it. You feel slightly tricked.",
    revealed: false,
  },
  {
    id: "constraints",
    scenario: "The Password",
    setup: "Creating an account. You enter a password you'll remember.",
    interaction: "Error: 'Must contain uppercase, number, and special character.' Your password gets rejected.",
    feeling: "Now you have to create something you'll forget.",
    revealed: false,
  },
  {
    id: "timing",
    scenario: "The Popup",
    setup: "Reading an article. You're halfway through the second paragraph.",
    interaction: "A popup appears asking for your email. The X button is tiny.",
    feeling: "Your attention breaks. Finding the close button takes longer than it should.",
    revealed: false,
  },
  {
    id: "information",
    scenario: "The Price",
    setup: "About to checkout after adding items to cart.",
    interaction: "Shipping cost appears only at the final step.",
    feeling: "You've invested time. Walking away feels wasteful. Continuing feels manipulated.",
    revealed: false,
  },
];

export const PatternRecognitionPhase = ({ onComplete, onBack }: PatternRecognitionPhaseProps) => {
  const [stage, setStage] = useState<PatternStage>("intro");
  const [patterns, setPatterns] = useState(PATTERNS);
  const [currentPatternIndex, setCurrentPatternIndex] = useState(0);
  const { observePattern } = useGlobalExperience();

  const revealPattern = useCallback((id: string) => {
    setPatterns(prev => prev.map(p =>
      p.id === id ? { ...p, revealed: true } : p
    ));
    observePattern(id);
  }, [observePattern]);

  const nextPattern = useCallback(() => {
    if (currentPatternIndex < patterns.length - 1) {
      setCurrentPatternIndex(prev => prev + 1);
    } else {
      setStage("pause");
    }
  }, [currentPatternIndex, patterns.length]);

  const revealedCount = patterns.filter(p => p.revealed).length;
  const currentPattern = patterns[currentPatternIndex];

  if (stage === "intro") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-8 max-w-2xl"
        >
          <h1 className="text-3xl md:text-5xl font-display font-semibold text-foreground">
            Different situations.
          </h1>
          <h1 className="text-3xl md:text-5xl font-display font-semibold text-muted-foreground">
            Different systems.
          </h1>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-3xl md:text-5xl font-display font-semibold text-primary"
          >
            Same feeling?
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-lg text-muted-foreground max-w-lg mx-auto"
          >
            Let's look at some moments you may recognize.
          </motion.p>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            onClick={() => setStage("patterns")}
            className="px-8 py-4 bg-secondary text-secondary-foreground font-display text-lg rounded-md hover:bg-secondary/80 transition-colors"
          >
            Show me
          </motion.button>
        </motion.div>
      </div>
    );
  }

  if (stage === "patterns") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 pt-20">


        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPattern.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-8"
            >
              {/* Progress indicator */}
              <div className="flex items-center justify-center gap-2">
                {patterns.map((p, i) => (
                  <div
                    key={p.id}
                    className={`w-2 h-2 rounded-full transition-colors ${i < currentPatternIndex ? "bg-primary" :
                      i === currentPatternIndex ? "bg-primary animate-pulse" :
                        "bg-muted"
                      }`}
                  />
                ))}
              </div>

              {/* Pattern card */}
              <div className="bg-card border border-border rounded-lg p-8 space-y-6">
                <p className="text-sm text-muted-foreground uppercase tracking-wide">
                  {currentPattern.scenario}
                </p>

                {/* Setup */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl text-foreground leading-relaxed"
                >
                  {currentPattern.setup}
                </motion.p>

                {/* Interaction - revealed on click */}
                {!currentPattern.revealed ? (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    onClick={() => revealPattern(currentPattern.id)}
                    className="w-full p-6 border border-dashed border-border rounded-lg text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                  >
                    <span className="text-sm">Click to see what happens</span>
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4"
                  >
                    <div className="p-4 bg-secondary/50 rounded-lg">
                      <p className="text-foreground">{currentPattern.interaction}</p>
                    </div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="p-4 bg-friction/10 border border-friction/30 rounded-lg"
                    >
                      <p className="text-sm text-muted-foreground/60 mb-1">The feeling:</p>
                      <p className="text-foreground/80 italic">{currentPattern.feeling}</p>
                    </motion.div>
                  </motion.div>
                )}
              </div>

              {/* Navigation */}
              {currentPattern.revealed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="flex justify-center"
                >
                  <button
                    onClick={nextPattern}
                    className="px-6 py-3 bg-primary text-primary-foreground font-display rounded-md hover:bg-primary/90 transition-colors"
                  >
                    {currentPatternIndex < patterns.length - 1 ? "Next" : "Continue"}
                  </button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    );
  }

  if (stage === "pause") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">


        <ExperienceWrapper stage="context">
          <div className="text-center space-y-16 py-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <p className="text-2xl md:text-3xl text-muted-foreground font-display">
                Different contexts.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <p className="text-2xl md:text-3xl text-muted-foreground font-display">
                Different decisions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
              <p className="text-3xl md:text-5xl text-foreground font-display font-semibold">
                Same experience.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4 }}
            >
              <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent max-w-md mx-auto mb-8" />

              <button
                onClick={() => setStage("reflection")}
                className="px-8 py-4 bg-secondary text-secondary-foreground font-display text-lg rounded-md hover:bg-secondary/80 transition-colors"
              >
                Continue
              </button>
            </motion.div>
          </div>
        </ExperienceWrapper>
      </div>
    );
  }

  // Reflection
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">


      <ExperienceWrapper stage="reflection">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card border border-border rounded-lg p-8 md:p-12 shadow-deep space-y-8"
        >
          <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
            What you observed
          </h2>

          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              A checkbox designed to be missed.<br />
              A password rule appearing too late.<br />
              A popup timed to interrupt.<br />
              A price hidden until commitment.
            </p>

            <p className="text-foreground">
              None of these happened by accident.
            </p>
          </div>

          <div className="pt-4 border-t border-border space-y-4">
            <p className="text-foreground/70">
              Someone decided where the checkbox would be.<br />
              Someone chose when to show the error.<br />
              Someone designed the popup timing.<br />
              Someone placed the shipping cost at the end.
            </p>

            <p className="text-foreground font-medium">
              Every frustration you felt was created by a decision.
            </p>
          </div>

          <div className="pt-6">
            <button
              onClick={onComplete}
              className="px-6 py-3 bg-primary text-primary-foreground font-display rounded-md hover:bg-primary/90 transition-colors"
            >
              Continue
            </button>
          </div>
        </motion.div>
      </ExperienceWrapper>
    </div>
  );
};
