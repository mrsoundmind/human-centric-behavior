import { motion } from "framer-motion";
import { ExperienceWrapper } from "./ExperienceWrapper";

interface PatternPauseProps {
  onComplete: () => void;
}

export const PatternPause = ({ onComplete }: PatternPauseProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 pt-16">
      <ExperienceWrapper stage="context">
        <div className="text-center space-y-16 py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="space-y-2"
          >
            <p className="text-2xl md:text-3xl text-muted-foreground font-display">
              Different situations.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="space-y-2"
          >
            <p className="text-2xl md:text-3xl text-muted-foreground font-display">
              Different systems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.5 }}
          >
            <p className="text-3xl md:text-5xl text-foreground font-display font-semibold">
              Same feeling.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 4 }}
            className="pt-8"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, delay: 4.5, ease: "easeOut" }}
              className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent mx-auto max-w-md"
            />
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5.5 }}
            onClick={onComplete}
            className="px-8 py-4 bg-secondary text-secondary-foreground font-display text-lg rounded-md hover:bg-secondary/80 transition-colors"
          >
            Continue
          </motion.button>
        </div >
      </ExperienceWrapper >
    </div >
  );
};
