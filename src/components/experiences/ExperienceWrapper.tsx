import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

interface ExperienceWrapperProps {
  children: ReactNode;
  stage: "context" | "interaction" | "reflection";
}

export const ExperienceWrapper = ({ children, stage }: ExperienceWrapperProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 md:p-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-7xl"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

interface ContextCardProps {
  children: ReactNode;
}

export const ContextCard = ({ children }: ContextCardProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="text-center space-y-6 px-4"
  >
    {children}
  </motion.div>
);

interface ReflectionCardProps {
  children: ReactNode;
}

export const ReflectionCard = ({ children }: ReflectionCardProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    className="bg-card border border-border rounded-lg p-8 md:p-12 shadow-deep"
  >
    {children}
  </motion.div>
);
