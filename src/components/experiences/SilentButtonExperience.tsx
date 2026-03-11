import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ExperienceWrapper, ContextCard, ReflectionCard } from "./ExperienceWrapper";

interface SilentButtonExperienceProps {
  onComplete: () => void;
}

type Stage = "context" | "interaction" | "reflection";

export const SilentButtonExperience = ({ onComplete }: SilentButtonExperienceProps) => {
  const [stage, setStage] = useState<Stage>("context");
  const [clickCount, setClickCount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [clickTimes, setClickTimes] = useState<number[]>([]);

  const handleButtonClick = useCallback(() => {
    if (isComplete) return;

    const now = Date.now();
    setClickTimes(prev => [...prev, now]);
    setClickCount(prev => prev + 1);

    // First click starts processing, but gives NO feedback
    if (!isProcessing && clickCount === 0) {
      setIsProcessing(true);

      // Silently complete after 4 seconds
      setTimeout(() => {
        setIsComplete(true);
        setTimeout(() => setStage("reflection"), 1000);
      }, 4000);
    }
  }, [clickCount, isProcessing, isComplete]);

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
              A routine task
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-3xl md:text-5xl font-display font-semibold text-foreground leading-tight"
            >
              You need to submit a form.<br />
              <span className="text-muted-foreground">A simple action.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="text-xl text-foreground/80 max-w-xl mx-auto"
            >
              Just click the button and you're done.
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              onClick={startInteraction}
              className="mt-8 px-8 py-4 bg-secondary text-secondary-foreground font-display text-lg rounded-md hover:bg-secondary/80 transition-colors"
            >
              Go to form
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
          <div className="flex flex-col items-center gap-12">
            {/* Fake form container */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-none w-[1000px] bg-card border border-border rounded-lg p-8 shadow-deep"
            >
              {/* Fake form fields */}
              <div className="space-y-6 mb-8">
                {/* Fake Name Input */}
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-gray-600 rounded" />
                  <div className="h-14 bg-gray-700/30 border-2 border-gray-600 rounded-md w-full" />
                </div>
                {/* Fake Email Input */}
                <div className="space-y-2">
                  <div className="h-3 w-20 bg-gray-600 rounded" />
                  <div className="h-14 bg-gray-700/30 border-2 border-gray-600 rounded-md w-full" />
                </div>
                {/* Fake Message Input */}
                <div className="space-y-2">
                  <div className="h-3 w-28 bg-gray-600 rounded" />
                  <div className="h-32 bg-gray-700/30 border-2 border-gray-600 rounded-md w-full" />
                </div>
              </div>

              {/* The silent button */}
              <motion.button
                onClick={handleButtonClick}
                disabled={isComplete}
                className={`w-full py-4 font-display text-lg rounded-md transition-colors ${isComplete
                  ? "bg-relief text-relief-foreground cursor-default"
                  : "bg-primary text-primary-foreground hover:bg-primary/90 active:scale-[0.98]"
                  }`}
              // No loading state, no visual feedback
              >
                {isComplete ? "Submitted" : "Submit"}
              </motion.button>
            </motion.div>

            {/* Click counter - only visible after multiple clicks */}
            {clickCount >= 2 && !isComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <p className="text-muted-foreground text-sm">
                  {clickCount === 2 && "Did it work?"}
                  {clickCount === 3 && "Nothing seems to happen."}
                  {clickCount === 4 && "Is it broken?"}
                  {clickCount >= 5 && `You've clicked ${clickCount} times.`}
                </p>
              </motion.div>
            )}

            {isComplete && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-relief font-display"
              >
                Form submitted successfully.
              </motion.p>
            )}
          </div>
        </ExperienceWrapper>
      </div>
    );
  }

  // Reflection stage
  const multipleClicks = clickCount > 1;

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
                {multipleClicks
                  ? `You clicked the button ${clickCount} times. The first click worked. The rest were unnecessary.`
                  : "You clicked once and waited. The form processed in the background."
                }
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
                {multipleClicks
                  ? "The button gave you nothing. No movement, no color change, no message. You were left wondering: Did it register? Is something happening? Should I try again?"
                  : "Patient. But most people don't wait. Without feedback, doubt creeps in quickly."
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
                The system heard you the first time. But it stayed silent. That silence created uncertainty. And uncertainty created more clicks, more frustration, potential duplicate submissions.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="pt-6 border-t border-border"
            >
              <p className="text-foreground/60 text-sm mb-6">
                Systems that don't speak create users who don't trust.
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
