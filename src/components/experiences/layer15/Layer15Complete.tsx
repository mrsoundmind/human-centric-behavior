import { motion } from "framer-motion";

import { ExperienceWrapper } from "../ExperienceWrapper";

interface Layer15CompleteProps {
  onContinue: () => void;
}

export const Layer15Complete = ({ onContinue }: Layer15CompleteProps) => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">


      <ExperienceWrapper stage="reflection">
        <div className="text-center space-y-12 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-3xl md:text-5xl font-display font-semibold text-foreground">
              Understanding complete.
            </h1>
            <p className="text-xl text-muted-foreground">
              You've felt UX as a user.<br />
              You understand what creates it.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-6"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

            <div className="text-left bg-card border border-border rounded-lg p-8 space-y-4">
              <p className="text-foreground">
                Now, one question remains:
              </p>
              <p className="text-xl text-primary font-display font-medium">
                At what exact moments in delivery do teams unintentionally create the frustrations users experience?
              </p>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={onContinue}
            className="px-10 py-5 bg-primary text-primary-foreground font-display text-xl rounded-md hover:bg-primary/90 transition-colors"
          >
            See where UX is created
          </motion.button>
        </div>
      </ExperienceWrapper>
    </div>
  );
};
