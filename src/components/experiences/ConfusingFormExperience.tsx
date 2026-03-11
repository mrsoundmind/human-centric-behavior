import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { ExperienceWrapper, ContextCard, ReflectionCard } from "./ExperienceWrapper";


interface ConfusingFormExperienceProps {
  onComplete: () => void;
}

type Stage = "context" | "interaction" | "reflection";

export const ConfusingFormExperience = ({ onComplete }: ConfusingFormExperienceProps) => {
  const [stage, setStage] = useState<Stage>("context");
  const [phoneValue, setPhoneValue] = useState("");
  const [attempts, setAttempts] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  // The form expects a VERY specific format that isn't communicated
  const validatePhone = useCallback((value: string) => {
    // Only accepts: +91 XXXXX XXXXX
    const correctFormat = /^\+91 \d{5} \d{5}$/;
    return correctFormat.test(value);
  }, []);

  const handleSubmit = useCallback(() => {
    setAttempts(prev => [...prev, phoneValue]);

    if (validatePhone(phoneValue)) {
      setError(null);
      setIsComplete(true);
      setTimeout(() => setStage("reflection"), 1500);
    } else {
      // Cryptic error messages
      const attemptCount = attempts.length + 1;
      if (attemptCount === 1) {
        setError("Invalid format");
      } else if (attemptCount === 2) {
        setError("Please enter a valid phone number");
      } else if (attemptCount === 3) {
        setError("Format error: check your input");
      } else {
        setError("Invalid phone number format");
      }
    }
  }, [phoneValue, attempts, validatePhone]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isComplete) {
      handleSubmit();
    }
  };

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
              Almost there
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-3xl md:text-5xl font-display font-semibold text-foreground leading-tight"
            >
              One last field.<br />
              <span className="text-muted-foreground">Your phone number.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="text-xl text-foreground/80 max-w-xl mx-auto"
            >
              Enter it and you're done.
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              onClick={startInteraction}
              className="mt-8 px-8 py-4 bg-secondary text-secondary-foreground font-display text-lg rounded-md hover:bg-secondary/80 transition-colors"
            >
              Fill in the form
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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-md bg-card border border-border rounded-lg p-8 shadow-deep"
            >
              <div className="space-y-6">
                {/* The confusing form field */}
                <div className="space-y-2">
                  <label className="text-sm text-muted-foreground">
                    Phone Number <span className="text-friction">*</span>
                  </label>
                  <input
                    type="text"
                    value={phoneValue}
                    onChange={(e) => {
                      setPhoneValue(e.target.value);
                      setError(null);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Phone number"
                    disabled={isComplete}
                    className={`w-full px-4 py-3 bg-secondary border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring ${error ? "border-friction" : "border-border"
                      }`}
                  />

                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-friction text-sm"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isComplete || !phoneValue.trim()}
                  className={`w-full py-4 font-display text-lg rounded-md transition-colors ${isComplete
                    ? "bg-relief text-primary-foreground"
                    : "bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                    }`}
                >
                  {isComplete ? "Success" : "Submit"}
                </button>
              </div>
            </motion.div>

            {/* Attempt history */}
            {attempts.length > 0 && !isComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center space-y-2"
              >
                <p className="text-muted-foreground text-sm">
                  {attempts.length === 1 && "That didn't work."}
                  {attempts.length === 2 && "Still not right."}
                  {attempts.length === 3 && "What format does it want?"}
                  {attempts.length >= 4 && `${attempts.length} attempts...`}
                </p>

                {attempts.length >= 3 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-muted-foreground/60 text-xs"
                  >
                    (try: +91 99999 88888)
                  </motion.p>
                )}
              </motion.div>
            )}
          </div>
        </ExperienceWrapper>
      </div>
    );
  }

  // Reflection stage
  const manyAttempts = attempts.length > 1;

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
                {manyAttempts
                  ? `You tried ${attempts.length} different formats before finding the one that worked: +91 XXXXX XXXXX.`
                  : "You found the right format. But the system never told you what it needed."
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
                {manyAttempts
                  ? '"Invalid format." But which format? You were left guessing, trying variations, feeling increasingly frustrated with each failed attempt. Not because you made an error—but because the system never showed you the way.'
                  : "Maybe you got lucky. But imagine being rejected repeatedly without knowing why."
                }
              </p>
            </motion.div>

            {manyAttempts && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-secondary/50 rounded-lg p-4"
              >
                <p className="text-sm text-muted-foreground mb-2">Your attempts:</p>
                <div className="flex flex-wrap gap-2">
                  {attempts.map((attempt, i) => (
                    <span
                      key={i}
                      className={`px-2 py-1 rounded text-xs font-mono ${i === attempts.length - 1
                        ? "bg-relief/20 text-relief"
                        : "bg-friction/20 text-friction"
                        }`}
                    >
                      {attempt || "(empty)"}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

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
                The form had expectations it never shared. It knew the exact format it wanted. It watched you fail. It said "invalid" but never said "here's how."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="pt-6 border-t border-border"
            >
              <p className="text-foreground/60 text-sm mb-6">
                Every guessing game is a choice someone made.
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
