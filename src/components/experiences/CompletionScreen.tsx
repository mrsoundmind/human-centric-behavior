import { motion } from "framer-motion";

interface CompletionScreenProps {
  onRestart: () => void;
}

export const CompletionScreen = ({ onRestart }: CompletionScreenProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="text-center space-y-12 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <h1 className="text-3xl md:text-5xl font-display font-semibold text-foreground">
            Layer 1 Complete
          </h1>
          <p className="text-xl text-muted-foreground font-display">
            Perspective Shift: Everyday UX
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-6 text-muted-foreground"
        >
          <p className="text-lg">
            You've experienced friction from the user's perspective.
          </p>
          <p className="text-lg">
            You've felt confusion, hesitation, and relief.
          </p>
          <p className="text-lg text-foreground">
            You'll notice these patterns now. Everywhere.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="pt-8 space-y-6"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
          
          <div className="bg-card border border-border rounded-lg p-6 text-left space-y-4">
            <h3 className="text-lg font-display font-medium text-foreground">
              Coming in Layer 2
            </h3>
            <p className="text-muted-foreground">
              Apply these insights to the Software Development Lifecycle. See how UX decisions compound through Discovery, Requirements, Design, Development, QA, and Launch.
            </p>
            <p className="text-sm text-muted-foreground/70">
              (Layer 2 is being prepared)
            </p>
          </div>
          
          <button
            onClick={onRestart}
            className="px-8 py-4 bg-secondary text-secondary-foreground font-display text-lg rounded-md hover:bg-secondary/80 transition-colors"
          >
            Experience Again
          </button>
        </motion.div>
      </div>
    </div>
  );
};
