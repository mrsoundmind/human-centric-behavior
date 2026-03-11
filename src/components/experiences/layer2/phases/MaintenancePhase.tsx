import { useState, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import { useSDLC } from "../SDLCContext";
import { Layer2Wrapper, PhaseContextCard, InteractionArea, PhaseReflection } from "../Layer2Wrapper";

interface MaintenancePhaseProps {
  onComplete: () => void;
}

export type MaintenanceStage = "context" | "interaction" | "reflection";

interface MaintenanceItem {
  id: string;
  type: "bug" | "feature" | "debt";
  title: string;
  source: string;
  urgency: "high" | "medium" | "low";
  handled: boolean;
}

interface MaintenancePhaseProps {
  onComplete: () => void;
  initialStage?: MaintenanceStage;
}

export const MaintenancePhase = ({ onComplete, initialStage }: MaintenancePhaseProps) => {
  const [stage, setStage] = useState<MaintenanceStage>(initialStage || "context");
  const [items, setItems] = useState<MaintenanceItem[]>([]);
  const [monthsPassed, setMonthsPassed] = useState(0);
  const [showCompounding, setShowCompounding] = useState(false);

  const { project, addDecision } = useSDLC();

  // Generate maintenance items from accumulated debt
  useEffect(() => {
    const maintenanceItems: MaintenanceItem[] = [];

    // Deferred bugs resurface
    const deferredBugs = project.uxDebt.filter(d =>
      d.source === "Testing" && d.type === "skip"
    );
    deferredBugs.forEach((debt, i) => {
      maintenanceItems.push({
        id: `deferred-${i}`,
        type: "bug",
        title: debt.description.replace("Bug deferred: ", "").replace("Untriaged bug: ", ""),
        source: "Deferred from Testing",
        urgency: "high",
        handled: false
      });
    });

    // Assumption mismatches become feature requests
    const assumptions = project.uxDebt.filter(d => d.type === "assumption");
    if (assumptions.length > 0) {
      maintenanceItems.push({
        id: "assumption-1",
        type: "feature",
        title: "Update dashboard to show originally expected metrics",
        source: "Dev assumption didn't match stakeholder intent",
        urgency: "medium",
        handled: false
      });
    }

    // Design shortcuts become tech debt
    const designDebt = project.uxDebt.filter(d => d.source === "Design");
    if (designDebt.length >= 2) {
      maintenanceItems.push({
        id: "design-debt-1",
        type: "debt",
        title: "Refactor navigation to support new feature sections",
        source: "Simple sidebar can't accommodate growth",
        urgency: "medium",
        handled: false
      });
    }

    // Discovery gaps become support escalations
    const discoveryDebt = project.uxDebt.filter(d => d.source === "Discovery");
    if (discoveryDebt.length > 0) {
      maintenanceItems.push({
        id: "discovery-1",
        type: "bug",
        title: "Add keyboard navigation for accessibility compliance",
        source: "User group not researched in Discovery",
        urgency: "high",
        handled: false
      });
    }

    // Patches create more patches
    const patches = project.uxDebt.filter(d => d.type === "patch");
    if (patches.length > 0) {
      maintenanceItems.push({
        id: "patch-1",
        type: "debt",
        title: "Untangle workaround code before adding new export formats",
        source: "Quick patches created dependencies",
        urgency: "low",
        handled: false
      });
    }

    // Always have some baseline items
    if (maintenanceItems.length === 0) {
      maintenanceItems.push({
        id: "baseline-1",
        type: "feature",
        title: "Client requests additional filter options",
        source: "Normal feature evolution",
        urgency: "low",
        handled: false
      });
    }

    setItems(maintenanceItems);
  }, [project.uxDebt]);

  const advanceTime = useCallback(() => {
    setMonthsPassed(prev => prev + 3);

    // After 6 months, show compounding
    if (monthsPassed >= 3) {
      setShowCompounding(true);
    }
  }, [monthsPassed]);

  const handleItem = useCallback((id: string) => {
    setItems(prev => prev.map(item =>
      item.id === id ? { ...item, handled: true } : item
    ));
  }, []);

  const completeMaintenance = useCallback(() => {
    const handledCount = items.filter(i => i.handled).length;
    const bugCount = items.filter(i => i.type === "bug").length;
    const debtCount = items.filter(i => i.type === "debt").length;

    addDecision(
      "Maintenance",
      `${monthsPassed} months post-launch: ${handledCount}/${items.length} backlog items addressed`,
      debtCount > 0 ? "Technical debt accumulated" : undefined
    );

    setStage("reflection");
  }, [items, monthsPassed, addDecision]);

  const startInteraction = () => setStage("interaction");

  const handledCount = items.filter(i => i.handled).length;
  const highUrgency = items.filter(i => i.urgency === "high" && !i.handled);

  if (stage === "context") {
    return (
      <Layer2Wrapper stage="context" phase="Maintenance">
        <PhaseContextCard>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground text-lg uppercase tracking-wide"
          >
            Phase 7 of 7
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-3xl md:text-5xl font-display font-semibold text-foreground leading-tight"
          >
            Maintenance & Scale
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <p className="text-xl text-foreground/80">
              The project launched. Months pass. Now you see what you actually built.
            </p>

            <div className="text-left bg-card/50 border border-border rounded-lg p-6 space-y-4">
              <p className="text-muted-foreground">
                <span className="text-foreground font-medium">The situation:</span> Support tickets, feature requests,
                and technical debt have accumulated. Some are new. Some are old decisions coming due.
              </p>

              <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t border-border">
                <div>
                  <span className="text-muted-foreground">Total UX debt created:</span>
                  <span className="ml-2 font-mono text-friction">{project.uxDebt.length}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Now surfacing:</span>
                  <span className="ml-2 font-mono text-foreground">{items.length}</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            onClick={startInteraction}
            className="mt-8 px-8 py-4 bg-secondary text-secondary-foreground font-display text-lg rounded-md hover:bg-secondary/80 transition-colors"
          >
            View backlog
          </motion.button>
        </PhaseContextCard>
      </Layer2Wrapper>
    );
  }

  if (stage === "interaction") {
    return (
      <Layer2Wrapper stage="interaction" phase="Maintenance">
        <InteractionArea>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-display font-semibold text-foreground">
                  Post-Launch Backlog
                </h2>
                <p className="text-muted-foreground">
                  {monthsPassed} months since launch
                </p>
              </div>

              <button
                onClick={advanceTime}
                className="px-4 py-2 bg-secondary text-secondary-foreground text-sm font-display rounded-md hover:bg-secondary/80 transition-colors"
              >
                Advance 3 months →
              </button>
            </div>

            {/* Compounding notice */}
            {showCompounding && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-friction/10 border border-friction/30 rounded-lg p-4"
              >
                <p className="text-friction font-medium mb-2">Compounding effects</p>
                <p className="text-sm text-muted-foreground">
                  Unaddressed items are creating new issues. The accessibility gap is now a legal concern.
                  The navigation limitation is blocking a major feature request.
                </p>
              </motion.div>
            )}

            {/* Backlog items */}
            <div className="space-y-3">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  onClick={() => !item.handled && handleItem(item.id)}
                  className={`p-5 rounded-lg border transition-all ${item.handled
                    ? "bg-relief/5 border-relief/30 opacity-60"
                    : "bg-card border-border cursor-pointer hover:border-muted-foreground"
                    }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-0.5 rounded uppercase ${item.type === "bug"
                          ? "bg-friction/20 text-friction"
                          : item.type === "feature"
                            ? "bg-primary/20 text-primary"
                            : "bg-clarity/20 text-clarity"
                          }`}>
                          {item.type}
                        </span>
                        <span className={`text-xs px-2 py-0.5 rounded ${item.urgency === "high"
                          ? "bg-friction/10 text-friction"
                          : item.urgency === "medium"
                            ? "bg-clarity/10 text-clarity"
                            : "bg-muted text-muted-foreground"
                          }`}>
                          {item.urgency}
                        </span>
                      </div>

                      <h3 className="font-display font-medium text-foreground mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">Origin: {item.source}</p>
                    </div>

                    {item.handled && (
                      <span className="text-relief text-sm">Addressed</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Status and actions */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground">
                <span className="text-foreground font-mono">{handledCount}/{items.length}</span> addressed ·
                <span className="text-friction font-mono"> {highUrgency.length}</span> high priority remaining
              </div>

              <button
                onClick={completeMaintenance}
                className="px-6 py-3 bg-primary text-primary-foreground font-display rounded-md hover:bg-primary/90 transition-colors"
              >
                Complete Experience
              </button>
            </div>
          </div>
        </InteractionArea>
      </Layer2Wrapper>
    );
  }

  // Reflection
  const unhandledBugs = items.filter(i => i.type === "bug" && !i.handled);
  const unhandledDebt = items.filter(i => i.type === "debt" && !i.handled);

  return (
    <Layer2Wrapper stage="reflection" phase="Maintenance">
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
              {monthsPassed} months after launch, the true cost of earlier decisions became visible.
              {project.uxDebt.length > 0 && ` ${project.uxDebt.length} pieces of UX debt were created throughout the project.`}
              {unhandledBugs.length > 0 && ` ${unhandledBugs.length} bugs remain unaddressed.`}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-display font-medium text-foreground">
              The full picture
            </h3>

            <div className="bg-card border border-border rounded-lg p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Created in earlier phases:</p>
                  <ul className="space-y-1 text-sm">
                    <li className="text-foreground">
                      <span className="text-muted-foreground">Discovery:</span> {project.uxDebt.filter(d => d.source === "Discovery").length} items
                    </li>
                    <li className="text-foreground">
                      <span className="text-muted-foreground">Requirements:</span> {project.uxDebt.filter(d => d.source === "Requirements").length} items
                    </li>
                    <li className="text-foreground">
                      <span className="text-muted-foreground">Design:</span> {project.uxDebt.filter(d => d.source === "Design").length} items
                    </li>
                    <li className="text-foreground">
                      <span className="text-muted-foreground">Development:</span> {project.uxDebt.filter(d => d.source === "Development").length} items
                    </li>
                    <li className="text-foreground">
                      <span className="text-muted-foreground">Testing:</span> {project.uxDebt.filter(d => d.source === "Testing").length} items
                    </li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Surfaced in maintenance:</p>
                  <ul className="space-y-1 text-sm">
                    <li className="text-foreground">
                      <span className="text-muted-foreground">Bugs:</span> {items.filter(i => i.type === "bug").length}
                    </li>
                    <li className="text-foreground">
                      <span className="text-muted-foreground">Feature rework:</span> {items.filter(i => i.type === "feature").length}
                    </li>
                    <li className="text-foreground">
                      <span className="text-muted-foreground">Tech debt:</span> {items.filter(i => i.type === "debt").length}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
            className="space-y-4"
          >
            <h3 className="text-xl font-display font-medium text-foreground">
              What this reveals
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Every maintenance item has an origin story. The bug that "appeared" in production was created
              in Discovery when a user group was skipped. The feature mismatch was born in Requirements
              when ambiguity wasn't clarified. The technical limitation came from a Design shortcut.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              UX debt compounds silently, then surfaces loudly.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="pt-6 border-t border-border"
          >
            <p className="text-foreground/60 text-sm mb-6">
              We don't inherit codebases. We inherit decisions.
            </p>
            <button
              onClick={onComplete}
              className="px-6 py-3 bg-primary text-primary-foreground font-display rounded-md hover:bg-primary/90 transition-colors"
            >
              Complete Layer 2
            </button>
          </motion.div>
        </div>
      </PhaseReflection>
    </Layer2Wrapper>
  );
};
