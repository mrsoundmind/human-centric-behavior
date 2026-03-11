import { useState } from "react";
import { motion } from "framer-motion";
import { ExperienceWrapper } from "./ExperienceWrapper";


interface BridgeToWorkProps {
  onComplete: () => void;
}

export const BridgeToWork = ({ onComplete }: BridgeToWorkProps) => {
  const [stage, setStage] = useState(0);

  const nextStage = () => {
    if (stage < 2) {
      setStage(stage + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 pt-16">


      <ExperienceWrapper stage="context">
        <div className="text-center space-y-12 py-12">
          {stage === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <p className="text-2xl md:text-4xl text-foreground font-display leading-relaxed max-w-2xl mx-auto">
                You experience moments like this<br />
                <span className="text-muted-foreground">every day.</span>
              </p>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                onClick={nextStage}
                className="px-8 py-4 bg-secondary text-secondary-foreground font-display text-lg rounded-md hover:bg-secondary/80 transition-colors"
              >
                Continue
              </motion.button>
            </motion.div>
          )}

          {stage === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <p className="text-2xl md:text-4xl text-foreground font-display leading-relaxed max-w-2xl mx-auto">
                As a user, you feel these frictions.<br />
                You notice when something works against you.
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-lg text-muted-foreground max-w-xl mx-auto"
              >
                <p>The confusing door. The silent button. The cryptic form. The endless wait.</p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                onClick={nextStage}
                className="px-8 py-4 bg-secondary text-secondary-foreground font-display text-lg rounded-md hover:bg-secondary/80 transition-colors"
              >
                Continue
              </motion.button>
            </motion.div>
          )}

          {stage === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="space-y-4">
                <p className="text-3xl md:text-5xl text-foreground font-display font-semibold leading-tight max-w-2xl mx-auto">
                  Now imagine
                </p>
                <p className="text-2xl md:text-4xl text-primary font-display leading-relaxed max-w-2xl mx-auto">
                  creating these moments for others.
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="space-y-6"
              >
                <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent max-w-md mx-auto" />

                <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                  Every feature you build. Every screen you design. Every flow you implement.
                  <br />
                  <span className="text-foreground">Someone will experience it.</span>
                </p>
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                onClick={nextStage}
                className="px-8 py-4 bg-primary text-primary-foreground font-display text-lg rounded-md hover:bg-primary/90 transition-colors"
              >
                Explore patterns
              </motion.button>
            </motion.div>
          )}
        </div>
      </ExperienceWrapper>
    </div>
  );
};
