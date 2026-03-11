import { useState, useCallback } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { ExperienceWrapper, ContextCard, ReflectionCard } from "./ExperienceWrapper";


interface DoorExperienceProps {
  onComplete: () => void;
}

type Stage = "context" | "interaction" | "reflection";

export const DoorExperience = ({ onComplete }: DoorExperienceProps) => {
  const [stage, setStage] = useState<Stage>("context");
  const [attempts, setAttempts] = useState(0);
  const [pushAttempts, setPushAttempts] = useState(0);
  const [solved, setSolved] = useState(false);

  const doorRotation = useMotionValue(0);
  const doorScale = useTransform(doorRotation, [-45, 0], [0.92, 1]);

  const handlePush = useCallback(() => {
    // Door doesn't open when pushed - it needs to be pulled
    setPushAttempts(prev => prev + 1);
    setAttempts(prev => prev + 1);

    // Shake animation - door resists
    animate(doorRotation, [0, -2, 2, -1, 1, 0], {
      duration: 0.4,
      ease: "easeInOut"
    });
  }, [doorRotation]);

  const handlePull = useCallback(() => {
    setAttempts(prev => prev + 1);
    // Door opens when pulled
    animate(doorRotation, -45, {
      duration: 0.6,
      ease: "easeOut"
    });
    setSolved(true);

    setTimeout(() => {
      setStage("reflection");
    }, 1500);
  }, [doorRotation]);

  const startInteraction = () => setStage("interaction");

  if (stage === "context") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 pt-16">


        <ExperienceWrapper stage="context">
          <ContextCard>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground text-lg"
            >
              A familiar moment
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-3xl md:text-5xl font-display font-semibold text-foreground leading-tight"
            >
              You're rushing to a meeting.<br />
              <span className="text-muted-foreground">15 seconds late.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="text-xl text-foreground/80 max-w-xl mx-auto"
            >
              The conference room is just through this door.
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              onClick={startInteraction}
              className="mt-8 px-8 py-4 bg-secondary text-secondary-foreground font-display text-lg rounded-md hover:bg-secondary/80 transition-colors"
            >
              Approach the door
            </motion.button>
          </ContextCard>
        </ExperienceWrapper>
      </div>
    );
  }

  if (stage === "interaction") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 pt-16">


        <ExperienceWrapper stage="interaction">
          <div className="flex flex-col items-center gap-8">
            {/* The door */}
            <div className="relative perspective-1000">
              <motion.div
                style={{
                  rotateY: doorRotation,
                  scale: doorScale,
                  transformOrigin: "left center"
                }}
                className="preserve-3d"
              >
                {/* Door frame */}
                <div className="relative w-48 h-80 md:w-64 md:h-96 bg-secondary rounded-sm border-4 border-border shadow-deep">
                  {/* Door panel details */}
                  <div className="absolute inset-4 border border-border/50 rounded-sm" />
                  <div className="absolute inset-8 border border-border/30 rounded-sm" />

                  {/* Handle - positioned for pulling (on the right) */}
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-3 h-16 bg-muted-foreground/40 rounded-full" />

                  {/* Sign - the infamous misleading PUSH sign */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="absolute top-8 left-1/2 -translate-x-1/2 px-4 py-2 bg-friction/20 border border-friction/40 rounded text-friction font-display font-bold text-sm tracking-widest"
                  >
                    PUSH
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Interaction buttons */}
            {!solved && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex gap-4"
              >
                <button
                  onClick={handlePush}
                  className="px-8 py-4 bg-secondary text-secondary-foreground font-display text-lg rounded-md hover:bg-secondary/80 transition-colors active:scale-95"
                >
                  Push
                </button>
                <button
                  onClick={handlePull}
                  className="px-8 py-4 bg-secondary text-secondary-foreground font-display text-lg rounded-md hover:bg-secondary/80 transition-colors active:scale-95"
                >
                  Pull
                </button>
              </motion.div>
            )}

            {/* Subtle feedback after failed attempts */}
            {pushAttempts > 0 && !solved && (
              <motion.p
                key={pushAttempts}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-muted-foreground text-sm"
              >
                {pushAttempts === 1 && "The door doesn't move."}
                {pushAttempts === 2 && "Still nothing."}
                {pushAttempts >= 3 && "The sign says PUSH..."}
              </motion.p>
            )}

            {solved && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-relief font-display text-lg"
              >
                The door opens.
              </motion.p>
            )}
          </div>
        </ExperienceWrapper>
      </div>
    );
  }

  // Reflection stage
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 pt-16">


      <ExperienceWrapper stage="reflection">
        <ReflectionCard>
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <h2 className="text-2xl md:text-3xl font-display font-semibold text-foreground">
                What happened
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The sign said PUSH. But the door needed to be pulled.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-display font-medium text-foreground">
                How it felt
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {pushAttempts === 0
                  ? "You went straight for the pull. But imagine if you had trusted the sign."
                  : `You pushed ${pushAttempts} time${pushAttempts > 1 ? 's' : ''} before trying something else. Each failed attempt added a tiny moment of confusion. A small friction you didn't ask for.`
                }
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-display font-medium text-foreground">
                What the system did
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The door's design gave you incorrect information. The handle's placement, the sign's instruction—they worked against each other. You hesitated because the system made you hesitate.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="pt-6 border-t border-border"
            >
              <p className="text-foreground/60 text-sm mb-6">
                This happens more than you notice.
              </p>
              <button
                onClick={onComplete}
                className="px-6 py-3 bg-primary text-primary-foreground font-display rounded-md hover:bg-primary/90 transition-colors"
              >
                Continue
              </button>
            </motion.div>
          </div>
        </ReflectionCard>
      </ExperienceWrapper>
    </div>
  );
};
