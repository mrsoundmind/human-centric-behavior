import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { useSDLC } from "./SDLCContext";

// SDLC Phases for navigation
const SDLC_PHASES = [
  { id: "discovery", name: "Discovery" },
  { id: "requirements", name: "Requirements" },
  { id: "design", name: "Design" },
  { id: "development", name: "Development" },
  { id: "testing", name: "Testing" },
  { id: "launch", name: "Launch" },
  { id: "maintenance", name: "Maintenance" },
];

interface Layer2WrapperProps {
  children: ReactNode;
  stage: "context" | "interaction" | "reflection";
  phase: string;
  currentPhase?: string;
  onJumpToPhase?: (phase: string) => void;
  completedPhases?: string[];
}

export const Layer2Wrapper = ({
  children,
  stage,
  phase,
  currentPhase,
  onJumpToPhase,
  completedPhases = []
}: Layer2WrapperProps) => {
  const { project } = useSDLC();

  const activePhaseId = currentPhase || phase.toLowerCase();
  const activePhaseIndex = SDLC_PHASES.findIndex(p => p.id === activePhaseId);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* SDLC Navigation Bar - positioned below existing top nav */}
      <div className="fixed top-12 left-0 right-0 z-10 bg-void/95 backdrop-blur-sm border-b border-border/50">
        {/* Project info row */}
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span className="text-foreground font-medium">{project.name}</span>
            <span className="text-muted-foreground">
              Phase: <span className="text-primary">{phase}</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground text-[10px]">Timeline:</span>
              <span className={`font-mono ${project.timeline < 30 ? "text-friction" :
                project.timeline < 60 ? "text-clarity" :
                  "text-foreground"
                }`}>
                {project.timeline}d
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-muted-foreground text-[10px]">Budget:</span>
              <span className={`font-mono ${project.budget < 30 ? "text-friction" :
                project.budget < 60 ? "text-clarity" :
                  "text-foreground"
                }`}>
                {project.budget}%
              </span>
            </div>

            {project.escalationTriggered && (
              <span className="text-friction animate-pulse">⚠ Escalated</span>
            )}
          </div>
        </div>

        {/* SDLC Phase Navigation */}
        <div className="border-t border-border/30 bg-void/50">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <div className="flex items-center justify-between gap-2">
              {SDLC_PHASES.map((sdlcPhase, i) => {
                const isActive = sdlcPhase.id === activePhaseId;
                const isCompleted = completedPhases.includes(sdlcPhase.id) || i < activePhaseIndex;
                const isClickable = onJumpToPhase && (isCompleted || isActive);

                return (
                  <div key={sdlcPhase.id} className="flex items-center flex-1">
                    {/* Phase indicator */}
                    <button
                      onClick={() => isClickable && onJumpToPhase?.(sdlcPhase.id)}
                      disabled={!isClickable}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${isActive
                        ? "bg-primary/20 border border-primary/40 text-primary"
                        : isCompleted
                          ? "bg-relief/10 border border-relief/30 text-relief cursor-pointer hover:bg-relief/20"
                          : "bg-secondary/20 border border-border/30 text-muted-foreground opacity-50"
                        } ${isClickable ? "cursor-pointer" : "cursor-default"}`}
                    >
                      <span className="text-[10px] font-medium">{isCompleted && !isActive ? "✓" : ""} {sdlcPhase.name}</span>
                    </button>

                    {/* Connector line */}
                    {i < SDLC_PHASES.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-1 ${i < activePhaseIndex ? "bg-relief/50" : "bg-border/30"
                        }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main content - padding for both navs */}
      <div className="flex-1 flex items-start justify-center px-4 md:px-8 pb-8 pt-[180px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={stage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-5xl"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Debt indicator - bottom bar that grows with UX debt */}
      {project.uxDebt.length > 0 && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: Math.min(project.uxDebt.length * 2, 16) }}
          className="fixed bottom-0 left-0 right-0 bg-friction/20 border-t border-friction/30"
        >
          <div
            className="h-full bg-friction/40 transition-all duration-1000"
            style={{ width: `${Math.min(project.uxDebt.length * 10, 100)}%` }}
          />
        </motion.div>
      )}
    </div>
  );
};

// Phase context card
export const PhaseContextCard = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.2 }}
    className="text-center space-y-8 px-4"
  >
    {children}
  </motion.div>
);

// Interaction area
export const InteractionArea = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
    className="w-full"
  >
    {children}
  </motion.div>
);

// Reflection with consequences
export const PhaseReflection = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    className="bg-card border border-border rounded-lg p-8 md:p-12 shadow-deep"
  >
    {children}
  </motion.div>
);

// Consequence surface card - when debt becomes visible
export const ConsequenceSurface = ({
  title,
  description,
  roleImpacts
}: {
  title: string;
  description: string;
  roleImpacts?: Array<{ role: string; pain: string }>;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-friction/10 border border-friction/30 rounded-lg p-6 space-y-4"
  >
    <h4 className="text-lg font-display font-medium text-friction">{title}</h4>
    <p className="text-muted-foreground">{description}</p>

    {roleImpacts && roleImpacts.length > 0 && (
      <div className="space-y-2 pt-2 border-t border-friction/20">
        <p className="text-xs text-muted-foreground uppercase tracking-wide">Who feels this:</p>
        {roleImpacts.map((impact, i) => (
          <div key={i} className="flex items-start gap-2 text-sm">
            <span className="text-friction font-medium capitalize">{impact.role}:</span>
            <span className="text-muted-foreground">{impact.pain}</span>
          </div>
        ))}
      </div>
    )}
  </motion.div>
);
