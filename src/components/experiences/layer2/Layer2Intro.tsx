import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Layer2IntroProps {
  onStart: () => void;
}

// Mini icons representing Layer 1 friction experiences
const LAYER1_FRICTIONS = [
  { id: "door", label: "Stuck Door", icon: "🚪" },
  { id: "button", label: "Silent Button", icon: "🔘" },
  { id: "form", label: "Confusing Form", icon: "📝" },
  { id: "delay", label: "Slow Response", icon: "⏳" },
];

export const Layer2Intro = ({ onStart }: Layer2IntroProps) => {
  const [stage, setStage] = useState(0);
  const [frictionsAnimated, setFrictionsAnimated] = useState(false);

  // Auto-advance friction animation
  useEffect(() => {
    if (stage === 0) {
      const timer = setTimeout(() => setFrictionsAnimated(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [stage]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 pt-16 overflow-hidden">
      <AnimatePresence mode="wait">
        {/* Stage 0: Visual Bridge from Layer 1 */}
        {stage === 0 && (
          <motion.div
            key="bridge"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="text-center space-y-12">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <p className="text-muted-foreground uppercase tracking-wide">
                  Layer 2 — Apply
                </p>
                <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground">
                  You felt the friction.
                  <br />
                  <span className="text-primary">Now see where it starts.</span>
                </h1>
              </motion.div>

              {/* Layer 1 friction icons that transform */}
              <div className="relative h-32 flex items-center justify-center">
                <div className={`flex gap-6 transition-all duration-1000 ${frictionsAnimated ? "opacity-30 scale-75" : "opacity-100"
                  }`}>
                  {LAYER1_FRICTIONS.map((friction, i) => (
                    <motion.div
                      key={friction.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + i * 0.15 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <div className="w-14 h-14 bg-friction/20 rounded-xl flex items-center justify-center text-2xl border border-friction/30">
                        {friction.icon}
                      </div>
                      <span className="text-xs text-muted-foreground">{friction.label}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Arrow transition */}
                {frictionsAnimated && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-muted-foreground text-sm">These moments</span>
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                      <span className="text-foreground text-sm font-medium">Start here</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Explanation */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: frictionsAnimated ? 1 : 0 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground max-w-lg mx-auto"
              >
                Every frustrating experience has an origin point.
                <br />
                You're about to watch one form.
              </motion.p>

              {/* Continue button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: frictionsAnimated ? 1 : 0 }}
                transition={{ delay: 0.6 }}
                onClick={() => setStage(1)}
                className="px-10 py-5 bg-secondary text-secondary-foreground font-display text-xl rounded-md hover:bg-secondary/80 transition-all"
              >
                Enter the project →
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Stage 1: Project Workspace Reveal */}
        {stage === 1 && (
          <motion.div
            key="project"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full max-w-3xl mx-auto"
          >
            <div className="text-center space-y-10">
              {/* Context Setup */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-6"
              >
                <p className="text-muted-foreground uppercase tracking-wide text-sm">
                  Scenario
                </p>
                <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
                  A new project just landed in your inbox
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto">
                  You're part of a design team. A client has accepted your proposal.
                  <br />
                  <span className="text-foreground">Watch how the project unfolds.</span>
                </p>
              </motion.div>

              {/* Timeline Preview */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center gap-3 text-sm text-muted-foreground"
              >
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full">Discovery</span>
                <span>→</span>
                <span className="px-3 py-1 bg-secondary rounded-full">Requirements</span>
                <span>→</span>
                <span className="px-3 py-1 bg-secondary rounded-full">Design</span>
                <span>→</span>
                <span className="px-3 py-1 bg-secondary rounded-full">...</span>
              </motion.div>

              {/* CTA */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9 }}
                onClick={onStart}
                className="px-10 py-5 bg-primary text-primary-foreground font-display text-xl rounded-md hover:bg-primary/90 transition-colors"
              >
                Start the Project →
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
