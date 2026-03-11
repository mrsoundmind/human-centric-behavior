import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useSDLC } from "../SDLCContext";
import { Layer2Wrapper, PhaseContextCard, InteractionArea, PhaseReflection, ConsequenceSurface } from "../Layer2Wrapper";

interface DesignPhaseProps {
  onComplete: () => void;
}

type Stage = "context" | "interaction" | "reflection";

interface DesignChoice {
  id: string;
  title: string;
  description: string;
  optionA: { label: string; time: number; risk: string };
  optionB: { label: string; time: number; risk: string };
  chosen: "a" | "b" | null;
}

const DESIGN_CHOICES: DesignChoice[] = [
  {
    id: "nav",
    title: "Navigation Pattern",
    description: "How users move through the portal",
    optionA: { label: "Simple sidebar", time: 3, risk: "May not scale with feature growth" },
    optionB: { label: "Contextual mega-menu", time: 8, risk: "More upfront work, but flexible" },
    chosen: null
  },
  {
    id: "forms",
    title: "Form Handling",
    description: "How data entry works",
    optionA: { label: "Standard form fields", time: 4, risk: "Users must remember formats" },
    optionB: { label: "Smart inputs with validation", time: 10, risk: "Takes longer but prevents errors" },
    chosen: null
  },
  {
    id: "feedback",
    title: "System Feedback",
    description: "How the system communicates state",
    optionA: { label: "Minimal - toast messages only", time: 2, risk: "Users may miss important info" },
    optionB: { label: "Rich - inline + contextual feedback", time: 7, risk: "More design but clearer experience" },
    chosen: null
  },
  {
    id: "error",
    title: "Error Handling",
    description: "What happens when things go wrong",
    optionA: { label: "Generic error page", time: 2, risk: "Users don't know what to do next" },
    optionB: { label: "Contextual recovery paths", time: 9, risk: "Complex but helps users recover" },
    chosen: null
  },
];

export const DesignPhase = ({ onComplete }: DesignPhaseProps) => {
  const [stage, setStage] = useState<Stage>("context");
  const [choices, setChoices] = useState(DESIGN_CHOICES);
  const [showStakeholderPressure, setShowStakeholderPressure] = useState(false);
  const [fastTrackWarning, setFastTrackWarning] = useState(false);
  
  const { project, addDecision, addUXDebt, addRoleImpact, consumeTimeline, addComplexity } = useSDLC();

  const makeChoice = useCallback((id: string, choice: "a" | "b") => {
    setChoices(prev => prev.map(c => 
      c.id === id ? { ...c, chosen: choice } : c
    ));
    
    // Show pressure after 2 choices
    const madeChoices = choices.filter(c => c.chosen !== null).length;
    if (madeChoices >= 1 && project.timeline < 70) {
      setShowStakeholderPressure(true);
    }
  }, [choices, project.timeline]);

  const fastTrackAll = useCallback(() => {
    // Select all option A (faster, riskier)
    setChoices(prev => prev.map(c => ({ ...c, chosen: "a" as const })));
    setFastTrackWarning(true);
  }, []);

  const completeDesign = useCallback(() => {
    const fastChoices = choices.filter(c => c.chosen === "a");
    const thoroughChoices = choices.filter(c => c.chosen === "b");
    const unresolved = choices.filter(c => c.chosen === null);
    
    // Calculate time
    const totalTime = choices.reduce((sum, c) => {
      if (c.chosen === "a") return sum + c.optionA.time;
      if (c.chosen === "b") return sum + c.optionB.time;
      return sum + c.optionA.time; // Default to fast if not chosen
    }, 0);
    
    consumeTimeline(totalTime);
    
    // Add debt for fast choices
    fastChoices.forEach(c => {
      addUXDebt({
        source: "Design",
        type: "rush",
        description: `${c.title}: "${c.optionA.label}" - ${c.optionA.risk}`,
        visibility: "hidden"
      });
    });
    
    // Add debt for unresolved
    unresolved.forEach(c => {
      addUXDebt({
        source: "Design",
        type: "skip",
        description: `${c.title} not decided - developers will interpret`,
        visibility: "hidden"
      });
      
      addRoleImpact({
        role: "dev",
        pain: `No design decision for ${c.title} - will implement what seems reasonable`,
        intensity: 3
      });
    });
    
    // Complexity from fast choices
    if (fastChoices.length >= 3) {
      addComplexity(15);
      addRoleImpact({
        role: "qa",
        pain: "Quick design patterns mean more edge cases to discover",
        intensity: 4
      });
    }
    
    addDecision(
      "Design",
      `${thoroughChoices.length} thorough choices, ${fastChoices.length} fast choices, ${unresolved.length} unresolved`,
      fastChoices.length > thoroughChoices.length ? "Prioritized speed over resilience" : undefined
    );
    
    setStage("reflection");
  }, [choices, addUXDebt, addRoleImpact, addDecision, consumeTimeline, addComplexity]);

  const startInteraction = () => setStage("interaction");
  
  const chosenCount = choices.filter(c => c.chosen !== null).length;
  const fastCount = choices.filter(c => c.chosen === "a").length;
  const thoroughCount = choices.filter(c => c.chosen === "b").length;

  if (stage === "context") {
    return (
      <Layer2Wrapper stage="context" phase="Design">
        <PhaseContextCard>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg uppercase tracking-wide"
          >
            Phase 3 of 7
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-3xl md:text-5xl font-display font-semibold text-foreground leading-tight"
          >
            Design
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <p className="text-xl text-foreground/80">
              Requirements are documented. Now you shape how users will experience the system.
            </p>
            
            <div className="text-left bg-card/50 border border-border rounded-lg p-6 space-y-4">
              <p className="text-muted-foreground">
                <span className="text-foreground font-medium">The situation:</span> Several key UX patterns need decisions. 
                Faster options get to development sooner but carry risk. Thorough options take longer but prevent issues.
              </p>
              
              {project.timeline < 75 && (
                <p className="text-friction text-sm">
                  Timeline is getting tight. Every design day is a development day lost.
                </p>
              )}
            </div>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            onClick={startInteraction}
            className="mt-8 px-8 py-4 bg-secondary text-secondary-foreground font-display text-lg rounded-md hover:bg-secondary/80 transition-colors"
          >
            Make design decisions
          </motion.button>
        </PhaseContextCard>
      </Layer2Wrapper>
    );
  }

  if (stage === "interaction") {
    return (
      <Layer2Wrapper stage="interaction" phase="Design">
        <InteractionArea>
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-display font-semibold text-foreground">
                Design Decisions
              </h2>
              <p className="text-muted-foreground">
                Each choice shapes the user experience and development timeline
              </p>
            </div>
            
            {/* Stakeholder pressure */}
            {showStakeholderPressure && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-friction/10 border border-friction/30 rounded-lg p-4"
              >
                <p className="text-friction text-sm mb-3">
                  "Design is taking longer than expected. Can we simplify and start development?"
                </p>
                <p className="text-muted-foreground text-xs mb-3">— Stakeholder email</p>
                <button
                  onClick={fastTrackAll}
                  className="px-4 py-2 text-xs bg-friction/20 text-friction rounded hover:bg-friction/30"
                >
                  Fast-track remaining decisions
                </button>
              </motion.div>
            )}
            
            {fastTrackWarning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-clarity/10 border border-clarity/30 rounded-lg p-3 text-center"
              >
                <p className="text-clarity text-sm">All choices set to fast option. Quicker to build, more to maintain.</p>
              </motion.div>
            )}
            
            {/* Design choices */}
            <div className="space-y-4">
              {choices.map((choice, index) => (
                <motion.div
                  key={choice.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-card border border-border rounded-lg p-5 space-y-4"
                >
                  <div>
                    <h3 className="font-display font-medium text-foreground">{choice.title}</h3>
                    <p className="text-sm text-muted-foreground">{choice.description}</p>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-3">
                    {/* Option A - Fast */}
                    <button
                      onClick={() => makeChoice(choice.id, "a")}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        choice.chosen === "a"
                          ? "bg-clarity/10 border-clarity"
                          : "bg-secondary/50 border-border hover:border-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground text-sm">{choice.optionA.label}</span>
                        <span className="text-xs text-muted-foreground">{choice.optionA.time}d</span>
                      </div>
                      <p className="text-xs text-friction/80">{choice.optionA.risk}</p>
                    </button>
                    
                    {/* Option B - Thorough */}
                    <button
                      onClick={() => makeChoice(choice.id, "b")}
                      className={`p-4 rounded-lg border text-left transition-all ${
                        choice.chosen === "b"
                          ? "bg-relief/10 border-relief"
                          : "bg-secondary/50 border-border hover:border-muted-foreground"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground text-sm">{choice.optionB.label}</span>
                        <span className="text-xs text-muted-foreground">{choice.optionB.time}d</span>
                      </div>
                      <p className="text-xs text-relief/80">{choice.optionB.risk}</p>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Status and actions */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                <span className="text-foreground font-mono">{chosenCount}/4</span> decided · 
                <span className="text-clarity font-mono"> {fastCount}</span> fast · 
                <span className="text-relief font-mono"> {thoroughCount}</span> thorough
              </div>
              
              <button
                onClick={completeDesign}
                className="px-6 py-3 bg-primary text-primary-foreground font-display rounded-md hover:bg-primary/90 transition-colors"
              >
                Finalize Design
              </button>
            </div>
          </div>
        </InteractionArea>
      </Layer2Wrapper>
    );
  }

  // Reflection
  return (
    <Layer2Wrapper stage="reflection" phase="Design">
      <PhaseReflection>
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
              {fastCount} quick solutions, {thoroughCount} thorough solutions.
              {fastCount > thoroughCount && " Speed won over resilience."}
              {thoroughCount > fastCount && " Stability won over speed."}
              {fastCount === thoroughCount && " A balanced approach."}
            </p>
          </motion.div>
          
          {fastCount >= 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <ConsequenceSurface
                title="Fast patterns create future work"
                description="Quick solutions get to market sooner but accumulate experience debt. Users will encounter these limitations."
                roleImpacts={[
                  { role: "Dev", pain: "Simple patterns hit edge cases during implementation" },
                  { role: "QA", pain: "More scenarios to test when patterns don't cover cases" },
                  { role: "Client", pain: "May see limitations users complain about" }
                ]}
              />
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-display font-medium text-foreground">
              What this means for development
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Design decisions become development constraints. A "simple sidebar" means 
              frontend will build that—even when product wants to add 12 more menu items. 
              "Generic error pages" means users will hit dead ends that support has to explain.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="pt-6 border-t border-border"
          >
            <p className="text-foreground/60 text-sm mb-6">
              Every shortcut in design becomes a feature in production.
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-3 bg-primary text-primary-foreground font-display rounded-md hover:bg-primary/90 transition-colors"
            >
              Continue to Development
            </button>
          </motion.div>
        </div>
      </PhaseReflection>
    </Layer2Wrapper>
  );
};
