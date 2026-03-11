import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useSDLC } from "../SDLCContext";
import { Layer2Wrapper, PhaseContextCard, InteractionArea, PhaseReflection, ConsequenceSurface } from "../Layer2Wrapper";

interface RequirementsPhaseProps {
  onComplete: () => void;
}

type Stage = "context" | "interaction" | "reflection";

interface Requirement {
  id: string;
  title: string;
  description: string;
  ambiguity: "clear" | "vague" | "missing";
  effort: number; // days
  priority: "must" | "should" | "could" | null;
  hasConflict?: boolean;
  conflictWith?: string;
}

const INITIAL_REQUIREMENTS: Requirement[] = [
  { id: "auth", title: "User Authentication", description: "Users can log in to the portal", ambiguity: "vague", effort: 8, priority: null },
  { id: "dashboard", title: "Dashboard View", description: "Main overview screen for users", ambiguity: "vague", effort: 12, priority: null },
  { id: "search", title: "Search Functionality", description: "Find content in the system", ambiguity: "missing", effort: 15, priority: null },
  { id: "export", title: "Data Export", description: "Export reports to various formats", ambiguity: "missing", effort: 10, priority: null },
  { id: "mobile", title: "Mobile Responsive", description: "Works on mobile devices", ambiguity: "vague", effort: 20, priority: null, hasConflict: true, conflictWith: "offline" },
  { id: "offline", title: "Offline Mode", description: "Some functionality without internet", ambiguity: "missing", effort: 25, priority: null, hasConflict: true, conflictWith: "mobile" },
  { id: "access", title: "Role-based Access", description: "Different users see different things", ambiguity: "vague", effort: 18, priority: null },
];

export const RequirementsPhase = ({ onComplete }: RequirementsPhaseProps) => {
  const [stage, setStage] = useState<Stage>("context");
  const [requirements, setRequirements] = useState(INITIAL_REQUIREMENTS);
  const [clarified, setClarified] = useState<string[]>([]);
  const [conflictResolved, setConflictResolved] = useState(false);
  const [showSurfacedDebt, setShowSurfacedDebt] = useState(false);
  
  const { project, addDecision, addUXDebt, addRoleImpact, consumeTimeline, addComplexity, getVisibleDebt } = useSDLC();

  const setPriority = useCallback((id: string, priority: "must" | "should" | "could") => {
    setRequirements(prev => prev.map(r => 
      r.id === id ? { ...r, priority } : r
    ));
  }, []);

  const clarifyRequirement = useCallback((id: string) => {
    setClarified(prev => [...prev, id]);
    setRequirements(prev => prev.map(r => 
      r.id === id ? { ...r, ambiguity: "clear" as const } : r
    ));
  }, []);

  const resolveConflict = useCallback((keep: "mobile" | "offline") => {
    setRequirements(prev => prev.map(r => {
      if (r.id === keep) return { ...r, priority: "must" as const, hasConflict: false };
      if (r.id === (keep === "mobile" ? "offline" : "mobile")) return { ...r, priority: "could" as const, hasConflict: false };
      return r;
    }));
    setConflictResolved(true);
  }, []);

  const completeRequirements = useCallback(() => {
    const vagueReqs = requirements.filter(r => r.ambiguity !== "clear");
    const unprioritized = requirements.filter(r => r.priority === null);
    const mustHaves = requirements.filter(r => r.priority === "must");
    const totalEffort = mustHaves.reduce((sum, r) => sum + r.effort, 0);
    
    // Add debt for vague requirements
    vagueReqs.forEach(r => {
      addUXDebt({
        source: "Requirements",
        type: "ambiguity",
        description: `"${r.title}" is vague - implementation will require interpretation`,
        visibility: "hidden"
      });
      
      addRoleImpact({
        role: "dev",
        pain: `Will have to guess what "${r.title}" actually means`,
        intensity: 3
      });
    });
    
    // Add debt for skipped prioritization
    unprioritized.forEach(r => {
      addUXDebt({
        source: "Requirements",
        type: "skip",
        description: `"${r.title}" has no priority - will resurface during scope discussions`,
        visibility: "hidden"
      });
    });
    
    // Track conflict handling
    if (!conflictResolved) {
      addUXDebt({
        source: "Requirements",
        type: "ambiguity",
        description: "Mobile vs Offline conflict unresolved - both may be attempted",
        visibility: "hidden"
      });
      addComplexity(20);
    }
    
    // Time consumed
    const clarificationDays = clarified.length * 2;
    consumeTimeline(7 + clarificationDays);
    
    // Complexity from scope
    if (totalEffort > 50) {
      addComplexity(15);
    }
    
    addDecision(
      "Requirements",
      `${clarified.length} requirements clarified, ${vagueReqs.length} left vague, ${mustHaves.length} marked as must-have`,
      vagueReqs.length > 3 ? "Significant ambiguity carried forward" : undefined
    );
    
    // Surface any visible debt from discovery
    setShowSurfacedDebt(true);
    setTimeout(() => setStage("reflection"), showSurfacedDebt ? 2000 : 500);
  }, [requirements, clarified, conflictResolved, addUXDebt, addRoleImpact, addDecision, consumeTimeline, addComplexity, showSurfacedDebt]);

  const startInteraction = () => setStage("interaction");
  
  // Calculate stats
  const clarifiedCount = clarified.length;
  const prioritizedCount = requirements.filter(r => r.priority !== null).length;
  const mustCount = requirements.filter(r => r.priority === "must").length;
  const totalMustEffort = requirements.filter(r => r.priority === "must").reduce((sum, r) => sum + r.effort, 0);
  
  // Get surfaced debt from discovery
  const discoveryDebt = project.uxDebt.filter(d => d.source === "Discovery");

  if (stage === "context") {
    return (
      <Layer2Wrapper stage="context" phase="Requirements">
        <PhaseContextCard>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg uppercase tracking-wide"
          >
            Phase 2 of 7
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-3xl md:text-5xl font-display font-semibold text-foreground leading-tight"
          >
            Requirements & Analysis
          </motion.h1>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <p className="text-xl text-foreground/80">
              Discovery is done. Now you need to define what gets built.
            </p>
            
            {discoveryDebt.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="bg-friction/5 border border-friction/20 rounded-lg p-4 text-left"
              >
                <p className="text-sm text-friction mb-2">Note from Discovery:</p>
                <p className="text-sm text-muted-foreground">
                  Some user groups weren't fully researched. Their requirements may be incomplete.
                </p>
              </motion.div>
            )}
            
            <div className="text-left bg-card/50 border border-border rounded-lg p-6 space-y-4">
              <p className="text-muted-foreground">
                <span className="text-foreground font-medium">The situation:</span> Stakeholders sent a requirements document. 
                Some items are clear, some are vague, some conflict with each other.
              </p>
              <p className="text-muted-foreground">
                You can clarify requirements (takes time) or proceed with ambiguity (faster now, harder later).
              </p>
            </div>
          </motion.div>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            onClick={startInteraction}
            className="mt-8 px-8 py-4 bg-secondary text-secondary-foreground font-display text-lg rounded-md hover:bg-secondary/80 transition-colors"
          >
            Review requirements
          </motion.button>
        </PhaseContextCard>
      </Layer2Wrapper>
    );
  }

  if (stage === "interaction") {
    const hasUnresolvedConflict = requirements.some(r => r.hasConflict);
    
    return (
      <Layer2Wrapper stage="interaction" phase="Requirements">
        <InteractionArea>
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-display font-semibold text-foreground">
                Requirements Document
              </h2>
              <p className="text-muted-foreground">
                Prioritize, clarify, or proceed with ambiguity
              </p>
            </div>
            
            {/* Conflict warning */}
            {hasUnresolvedConflict && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-friction/10 border border-friction/30 rounded-lg p-4"
              >
                <p className="text-friction font-medium mb-2">⚠ Conflict Detected</p>
                <p className="text-sm text-muted-foreground mb-4">
                  "Mobile Responsive" and "Offline Mode" have competing resource needs. 
                  Which takes priority?
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => resolveConflict("mobile")}
                    className="px-4 py-2 bg-secondary text-secondary-foreground text-sm rounded-md hover:bg-secondary/80"
                  >
                    Prioritize Mobile
                  </button>
                  <button
                    onClick={() => resolveConflict("offline")}
                    className="px-4 py-2 bg-secondary text-secondary-foreground text-sm rounded-md hover:bg-secondary/80"
                  >
                    Prioritize Offline
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* Requirements list */}
            <div className="space-y-3">
              {requirements.map((req, index) => (
                <motion.div
                  key={req.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-lg border transition-all ${
                    req.ambiguity === "clear" 
                      ? "bg-relief/5 border-relief/30" 
                      : req.hasConflict
                        ? "bg-friction/5 border-friction/30"
                        : "bg-card border-border"
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display font-medium text-foreground">{req.title}</h3>
                        {req.ambiguity !== "clear" && (
                          <span className={`text-xs px-2 py-0.5 rounded ${
                            req.ambiguity === "vague" 
                              ? "bg-clarity/20 text-clarity" 
                              : "bg-friction/20 text-friction"
                          }`}>
                            {req.ambiguity === "vague" ? "Vague" : "Missing details"}
                          </span>
                        )}
                        {req.ambiguity === "clear" && (
                          <span className="text-xs px-2 py-0.5 rounded bg-relief/20 text-relief">
                            Clarified
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{req.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">Est. effort: {req.effort} days</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {/* Clarify button */}
                      {req.ambiguity !== "clear" && (
                        <button
                          onClick={() => clarifyRequirement(req.id)}
                          className="px-3 py-1.5 text-xs bg-secondary text-secondary-foreground rounded hover:bg-secondary/80"
                        >
                          Clarify (+2d)
                        </button>
                      )}
                      
                      {/* Priority buttons */}
                      <div className="flex gap-1">
                        {(["must", "should", "could"] as const).map(p => (
                          <button
                            key={p}
                            onClick={() => setPriority(req.id, p)}
                            className={`px-2 py-1 text-xs rounded capitalize ${
                              req.priority === p
                                ? p === "must" 
                                  ? "bg-primary text-primary-foreground"
                                  : p === "should"
                                    ? "bg-secondary text-foreground"
                                    : "bg-muted text-muted-foreground"
                                : "bg-muted/50 text-muted-foreground hover:bg-muted"
                            }`}
                          >
                            {p}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Status and actions */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                <span className="text-foreground font-mono">{clarifiedCount}</span> clarified · 
                <span className="text-foreground font-mono"> {prioritizedCount}/7</span> prioritized · 
                <span className="text-foreground font-mono"> {mustCount}</span> must-haves ({totalMustEffort}d)
              </div>
              
              <button
                onClick={completeRequirements}
                className="px-6 py-3 bg-primary text-primary-foreground font-display rounded-md hover:bg-primary/90 transition-colors"
              >
                Finalize Requirements
              </button>
            </div>
          </div>
        </InteractionArea>
      </Layer2Wrapper>
    );
  }

  // Reflection
  const vagueCount = requirements.filter(r => r.ambiguity !== "clear").length;
  const unprioritizedCount = requirements.filter(r => r.priority === null).length;
  
  return (
    <Layer2Wrapper stage="reflection" phase="Requirements">
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
              {clarifiedCount} requirements were clarified. {vagueCount} remain vague. 
              {unprioritizedCount > 0 && ` ${unprioritizedCount} have no assigned priority.`}
              {!conflictResolved && " The mobile vs offline conflict was not resolved."}
            </p>
          </motion.div>
          
          {/* Surfaced consequences */}
          {vagueCount > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <ConsequenceSurface
                title="Vague requirements will be interpreted"
                description="Developers will fill gaps with assumptions. QA won't know what 'correct' looks like. Client may see something different than expected."
                roleImpacts={[
                  { role: "Dev", pain: "Has to guess intent, may build wrong thing" },
                  { role: "QA", pain: "No clear acceptance criteria to test against" },
                  { role: "PM", pain: "Will field clarification questions during dev" }
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
              Why this surfaced now
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Requirements are the blueprint. Every unclear line here becomes a guess in design, 
              a question in development, and a bug in testing. The cost of clarity is days. 
              The cost of ambiguity is rework.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="pt-6 border-t border-border"
          >
            <p className="text-foreground/60 text-sm mb-6">
              Ambiguity doesn't disappear. It just changes shape.
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-3 bg-primary text-primary-foreground font-display rounded-md hover:bg-primary/90 transition-colors"
            >
              Continue to Design
            </button>
          </motion.div>
        </div>
      </PhaseReflection>
    </Layer2Wrapper>
  );
};
