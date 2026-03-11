import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


interface IntroScreenProps {
  onStart: () => void;
}

export const IntroScreen = ({ onStart }: IntroScreenProps) => {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {!isReady ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >


            <div className="text-center space-y-12 max-w-2xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="space-y-6"
              >
                <div className="text-sm font-mono text-primary/50 uppercase tracking-widest mb-4">
                  Zyxware Human Centric Lab
                </div>
                <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground tracking-tight">
                  This is not training.
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground font-display">
                  This is an experience.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="space-y-4 text-muted-foreground"
              >
                <p className="text-lg">
                  You won't be tested.
                </p>
                <p className="text-lg">
                  You won't be scored.
                </p>
                <p className="text-lg">
                  You will simply notice things differently after.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="pt-8"
              >
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 2.2, duration: 1.5, ease: "easeOut" }}
                  className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mb-8"
                />

                <button
                  onClick={() => setIsReady(true)}
                  className="px-10 py-5 bg-secondary text-secondary-foreground font-display text-xl rounded-md hover:bg-secondary/80 transition-all duration-300"
                >
                  I'm ready
                </button>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >


            <div className="text-center space-y-12 max-w-2xl mx-auto">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-3xl text-muted-foreground font-display"
              >
                Let's begin with something familiar.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="text-xl text-muted-foreground/70"
              >
                Everyday moments you've felt before.
              </motion.p>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                onClick={onStart}
                className="px-8 py-4 bg-primary text-primary-foreground font-display text-lg rounded-md hover:bg-primary/90 transition-colors"
              >
                Start
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
