import { motion } from "framer-motion";
import { useSDLC } from "./SDLCContext";


interface Layer2CompleteProps {
  onRestart: () => void;
  onNext?: () => void;
}

export const Layer2Complete = ({ onRestart, onNext }: Layer2CompleteProps) => {
  const { project } = useSDLC();

  // Calculate journey summary
  const totalDebt = project.uxDebt.length;
  const sourceBreakdown = {
    discovery: project.uxDebt.filter(d => d.source === "Discovery").length,
    requirements: project.uxDebt.filter(d => d.source === "Requirements").length,
    design: project.uxDebt.filter(d => d.source === "Design").length,
    development: project.uxDebt.filter(d => d.source === "Development").length,
    testing: project.uxDebt.filter(d => d.source === "Testing").length,
  };

  const biggestSource = Object.entries(sourceBreakdown).reduce((a, b) =>
    a[1] > b[1] ? a : b
  );

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 pt-16">


      <div className="max-w-3xl w-full space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-6"
        >
          <h1 className="text-3xl md:text-5xl font-display font-semibold text-foreground">
            Experience Complete
          </h1>
          <p className="text-xl text-primary font-display">
            Delivery as Experience
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-card border border-border rounded-lg p-8 space-y-8"
        >
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-display font-medium text-foreground">
              Your Journey
            </h2>
            <p className="text-muted-foreground">
              You moved through 7 phases of digital service delivery.
              Along the way, {totalDebt} pieces of UX debt were created.
            </p>
          </div>

          {/* Debt visualization */}
          <div className="grid md:grid-cols-5 gap-4">
            {Object.entries(sourceBreakdown).map(([source, count], index) => (
              <motion.div
                key={source}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                className="text-center p-4 bg-secondary/50 rounded-lg"
              >
                <p className="text-2xl font-mono font-bold text-foreground">{count}</p>
                <p className="text-xs text-muted-foreground capitalize">{source}</p>
              </motion.div>
            ))}
          </div>

          {totalDebt > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-center"
            >
              <p className="text-muted-foreground">
                Most debt originated in <span className="text-primary font-medium capitalize">{biggestSource[0]}</span>
              </p>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="space-y-8"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <div className="text-center space-y-6">
            <h3 className="text-xl font-display font-medium text-foreground">
              What you experienced
            </h3>

            <div className="grid md:grid-cols-2 gap-6 text-left">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
                className="p-6 bg-card/50 border border-border rounded-lg space-y-3"
              >
                <p className="text-foreground font-medium">Decisions compound</p>
                <p className="text-sm text-muted-foreground">
                  A skip in Discovery became a blocked ticket in Development,
                  became a deferred bug in Testing, became a support escalation in Maintenance.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.4 }}
                className="p-6 bg-card/50 border border-border rounded-lg space-y-3"
              >
                <p className="text-foreground font-medium">UX is a delivery outcome</p>
                <p className="text-sm text-muted-foreground">
                  The friction users feel isn't created by designers.
                  It's manufactured across the entire delivery process, by everyone involved.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.6 }}
                className="p-6 bg-card/50 border border-border rounded-lg space-y-3"
              >
                <p className="text-foreground font-medium">Speed has a cost</p>
                <p className="text-sm text-muted-foreground">
                  Every shortcut felt reasonable in the moment.
                  The cost wasn't visible until later—sometimes much later.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.8 }}
                className="p-6 bg-card/50 border border-border rounded-lg space-y-3"
              >
                <p className="text-foreground font-medium">Early care prevents late pain</p>
                <p className="text-sm text-muted-foreground">
                  The phases that felt "far from users"—Discovery, Requirements—had
                  the highest leverage on what users eventually experienced.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2 }}
          className="text-center space-y-6 py-8"
        >
          <p className="text-2xl font-display text-foreground">
            "We unintentionally manufacture complexity."
          </p>
          <p className="text-xl font-display text-primary">
            "UX stabilizes delivery—it doesn't decorate it."
          </p>
          <p className="text-lg font-display text-muted-foreground">
            "Ignoring UX early is a leadership failure, not a design failure."
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5 }}
          className="text-center text-muted-foreground text-lg max-w-2xl mx-auto"
        >
          You just walked through the full SDLC. Now experience these same phases from your specific role's perspective — and discover the friction patterns you create for others.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.8 }}
          className="text-center space-y-4"
        >
          {onNext && (
            <button
              onClick={onNext}
              className="px-10 py-5 bg-primary text-primary-foreground font-display text-xl rounded-md hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl w-full md:w-auto"
            >
              See it from your role →
            </button>
          )}

          <div>
            <button
              onClick={onRestart}
              className="px-10 py-5 bg-secondary text-secondary-foreground font-display text-xl rounded-md hover:bg-secondary/80 transition-all duration-300"
            >
              Experience Again
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
