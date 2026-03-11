import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useSDLC } from "../SDLCContext";
import { Layer2Wrapper, PhaseContextCard, InteractionArea, PhaseReflection } from "../Layer2Wrapper";

interface DiscoveryPhaseProps {
  onComplete: () => void;
}

type Stage = "context" | "interaction" | "reflection";

interface UserPersona {
  id: string;
  name: string;
  role: string;
  needs: string;
  selected: boolean;
  interviewed: boolean;
}

const INITIAL_PERSONAS: UserPersona[] = [
  { id: "admin", name: "Sarah (Admin)", role: "System Administrator", needs: "Bulk user management, audit logs", selected: false, interviewed: false },
  { id: "power", name: "Marcus (Power User)", role: "Daily active user", needs: "Keyboard shortcuts, saved filters", selected: false, interviewed: false },
  { id: "occasional", name: "Emma (Occasional)", role: "Monthly check-in", needs: "Simple interface, clear guidance", selected: false, interviewed: false },
  { id: "mobile", name: "James (Mobile)", role: "Field worker", needs: "Touch-friendly, offline capable", selected: false, interviewed: false },
  { id: "accessible", name: "Priya (Accessibility)", role: "Screen reader user", needs: "Full keyboard nav, proper labels", selected: false, interviewed: false },
];

export const DiscoveryPhase = ({ onComplete }: DiscoveryPhaseProps) => {
  const [stage, setStage] = useState<Stage>("context");
  const [personas, setPersonas] = useState(INITIAL_PERSONAS);
  const [timeSpent, setTimeSpent] = useState(0);
  const [rushed, setRushed] = useState(false);
  const [showPressure, setShowPressure] = useState(false);
  
  const { addDecision, addUXDebt, addRoleImpact, consumeTimeline, addComplexity } = useSDLC();

  const togglePersona = useCallback((id: string) => {
    setPersonas(prev => prev.map(p => 
      p.id === id ? { ...p, selected: !p.selected } : p
    ));
    setTimeSpent(prev => prev + 2);
  }, []);

  const interviewPersona = useCallback((id: string) => {
    setPersonas(prev => prev.map(p => 
      p.id === id ? { ...p, interviewed: true } : p
    ));
    setTimeSpent(prev => prev + 5);
    
    // Show pressure after 2 interviews
    if (personas.filter(p => p.interviewed).length >= 1) {
      setShowPressure(true);
    }
  }, [personas]);

  const skipRemaining = useCallback(() => {
    setRushed(true);
    
    // Add UX debt for each uninterviewed persona
    const uninterviewed = personas.filter(p => p.selected && !p.interviewed);
    uninterviewed.forEach(p => {
      addUXDebt({
        source: "Discovery",
        type: "skip",
        description: `${p.name}'s needs were assumed, not verified`,
        visibility: "hidden"
      });
    });
    
    addDecision("Discovery", "Rushed through remaining user research", "Assumptions replacing validation");
    setStage("reflection");
  }, [personas, addUXDebt, addDecision]);

  const completeDiscovery = useCallback(() => {
    const selectedCount = personas.filter(p => p.selected).length;
    const interviewedCount = personas.filter(p => p.interviewed).length;
    const skippedPersonas = personas.filter(p => !p.selected);
    
    // Track what was skipped
    skippedPersonas.forEach(p => {
      addUXDebt({
        source: "Discovery",
        type: "assumption",
        description: `${p.name} not included in research - their needs unknown`,
        visibility: "hidden"
      });
      
      addRoleImpact({
        role: "ba",
        pain: `Will discover ${p.name}'s use case late`,
        intensity: 2
      });
    });
    
    // Time consumed
    const daysUsed = Math.ceil(timeSpent / 3);
    consumeTimeline(daysUsed + 5); // Base 5 days + extra
    
    // Complexity from incomplete discovery
    if (selectedCount < 4) {
      addComplexity(10 * (5 - selectedCount));
    }
    
    addDecision(
      "Discovery", 
      `Interviewed ${interviewedCount} of ${selectedCount} selected personas (${skippedPersonas.length} not considered)`,
      rushed ? "Time pressure cut research short" : undefined
    );
    
    setStage("reflection");
  }, [personas, timeSpent, rushed, addUXDebt, addRoleImpact, addDecision, consumeTimeline, addComplexity]);

  const startInteraction = () => setStage("interaction");
  
  const selectedCount = personas.filter(p => p.selected).length;
  const interviewedCount = personas.filter(p => p.interviewed).length;

  if (stage === "context") {
    return (
      <Layer2Wrapper stage="context" phase="Discovery">
        <PhaseContextCard>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg uppercase tracking-wide"
          >
            Phase 1 of 7
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-3xl md:text-5xl font-display font-semibold text-foreground leading-tight"
          >
            Discovery
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <p className="text-xl text-foreground/80">
              The project kicks off. You need to understand who will use this portal and what they need.
            </p>
            
            <div className="text-left bg-card/50 border border-border rounded-lg p-6 space-y-4">
              <p className="text-muted-foreground">
                <span className="text-foreground font-medium">The situation:</span> You have access to 5 potential user groups. Stakeholders want to start design "as soon as possible."
              </p>
              <p className="text-muted-foreground">
                Each interview takes time. Each assumption creates risk. You decide who to talk to.
              </p>
            </div>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            onClick={startInteraction}
            className="mt-8 px-8 py-4 bg-secondary text-secondary-foreground font-display text-lg rounded-md hover:bg-secondary/80 transition-colors"
          >
            Begin discovery
          </motion.button>
        </PhaseContextCard>
      </Layer2Wrapper>
    );
  }

  if (stage === "interaction") {
    return (
      <Layer2Wrapper stage="interaction" phase="Discovery">
        <InteractionArea>
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-display font-semibold text-foreground">
                Who do you want to understand?
              </h2>
              <p className="text-muted-foreground">
                Select users to include. Click again to interview them.
              </p>
            </div>
            
            {/* Pressure indicator */}
            {showPressure && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-friction/10 border border-friction/30 rounded-lg p-4 text-center"
              >
                <p className="text-friction text-sm">
                  "Can we wrap up discovery soon? Design needs to start."
                </p>
                <p className="text-muted-foreground text-xs mt-1">— Project Manager</p>
              </motion.div>
            )}
            
            {/* Persona cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {personas.map((persona, index) => (
                <motion.div
                  key={persona.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    if (!persona.selected) {
                      togglePersona(persona.id);
                    } else if (!persona.interviewed) {
                      interviewPersona(persona.id);
                    }
                  }}
                  className={`p-5 rounded-lg border transition-all cursor-pointer ${
                    persona.interviewed 
                      ? "bg-relief/10 border-relief/40" 
                      : persona.selected 
                        ? "bg-primary/10 border-primary/40 hover:border-primary" 
                        : "bg-card border-border hover:border-muted-foreground"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-display font-medium text-foreground">{persona.name}</h3>
                        <p className="text-sm text-muted-foreground">{persona.role}</p>
                      </div>
                      {persona.interviewed && (
                        <span className="text-relief text-xs px-2 py-1 bg-relief/20 rounded">Interviewed</span>
                      )}
                      {persona.selected && !persona.interviewed && (
                        <span className="text-primary text-xs px-2 py-1 bg-primary/20 rounded">Selected</span>
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground">
                      <span className="text-foreground/70">Needs:</span> {persona.needs}
                    </p>
                    
                    {persona.selected && !persona.interviewed && (
                      <p className="text-xs text-primary">Click to interview (+5 days)</p>
                    )}
                    {!persona.selected && (
                      <p className="text-xs text-muted-foreground">Click to include (+2 days)</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Status and actions */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                <span className="text-foreground font-mono">{selectedCount}</span> selected · 
                <span className="text-foreground font-mono"> {interviewedCount}</span> interviewed · 
                <span className="text-foreground font-mono"> ~{Math.ceil(timeSpent / 3) + 5}</span> days used
              </div>
              
              <div className="flex gap-3">
                {showPressure && selectedCount > interviewedCount && (
                  <button
                    onClick={skipRemaining}
                    className="px-6 py-3 bg-friction/20 text-friction font-display rounded-md hover:bg-friction/30 transition-colors"
                  >
                    Skip remaining, move on
                  </button>
                )}
                
                <button
                  onClick={completeDiscovery}
                  disabled={selectedCount === 0}
                  className="px-6 py-3 bg-primary text-primary-foreground font-display rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                  Complete Discovery
                </button>
              </div>
            </div>
          </div>
        </InteractionArea>
      </Layer2Wrapper>
    );
  }

  // Reflection
  const skippedPersonas = personas.filter(p => !p.selected);
  const uninterviewedSelected = personas.filter(p => p.selected && !p.interviewed);
  
  return (
    <Layer2Wrapper stage="reflection" phase="Discovery">
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
              You included {selectedCount} user groups and interviewed {interviewedCount} of them.
              {skippedPersonas.length > 0 && ` ${skippedPersonas.length} groups were not considered.`}
              {rushed && " Pressure cut the research short."}
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-display font-medium text-foreground">
              What became harder
            </h3>
            <div className="space-y-3">
              {skippedPersonas.length > 0 && (
                <p className="text-muted-foreground">
                  <span className="text-friction">• </span>
                  {skippedPersonas.map(p => p.name.split(" ")[0]).join(", ")}'s needs are unknown. 
                  If their use case appears later, it will be discovered in testing or production.
                </p>
              )}
              
              {uninterviewedSelected.length > 0 && (
                <p className="text-muted-foreground">
                  <span className="text-friction">• </span>
                  {uninterviewedSelected.map(p => p.name.split(" ")[0]).join(", ")} were selected but not interviewed. 
                  Requirements for them will be based on assumption.
                </p>
              )}
              
              {selectedCount === 5 && interviewedCount === 5 && (
                <p className="text-relief">
                  <span className="text-relief">• </span>
                  Complete discovery. Every user group's needs are documented. 
                  This slowed down the start but stabilized everything that follows.
                </p>
              )}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-display font-medium text-foreground">
              Why this surfaced now
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Discovery pressure is real. "We already know our users" is common. 
              But every assumption here becomes a design guess, a development edge case, 
              and eventually a support ticket.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="pt-6 border-t border-border"
          >
            <p className="text-foreground/60 text-sm mb-6">
              What you don't learn now, you'll discover later—at a higher cost.
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-3 bg-primary text-primary-foreground font-display rounded-md hover:bg-primary/90 transition-colors"
            >
              Continue to Requirements
            </button>
          </motion.div>
        </div>
      </PhaseReflection>
    </Layer2Wrapper>
  );
};
