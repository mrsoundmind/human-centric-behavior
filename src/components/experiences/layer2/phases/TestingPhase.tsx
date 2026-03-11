import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSDLC } from "../SDLCContext";
import { Layer2Wrapper } from "../Layer2Wrapper";

// ============================================
// SHARED TYPES & HELPER COMPONENTS
// ============================================

export type TestScreen =
  | "storybridge"
  | "buggen"
  | "dashboard"
  | "report";

interface Bug {
  id: string;
  title: string;
  description: string;
  severity: "critical" | "major" | "minor";
  source: "Discovery" | "Requirements" | "Design" | "Development" | "Code";
  status: "new" | "fixed" | "deferred" | "wontfix";
  fixCost: number; // Days to fix
}

interface StoryContextProps {
  step: number;
  totalSteps: number;
  title: string;
  subtitle: string;
  why: string;
}

const StoryContext = ({ step, totalSteps, title, subtitle, why }: StoryContextProps) => (
  <div className="bg-muted/50 border border-border rounded-xl p-6 mb-8">
    <div className="flex items-center gap-4 mb-2">
      <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded">
        TESTING PHASE {step} of {totalSteps}
      </span>
      <h2 className="text-xl font-display font-bold text-foreground">{title}</h2>
    </div>
    <p className="text-lg text-foreground mb-4">{subtitle}</p>
    <div className="flex items-start gap-2 text-sm text-muted-foreground bg-background/50 p-3 rounded border border-border/50">
      <span className="text-primary mt-0.5">💡</span>
      <span className="italic">{why}</span>
    </div>
  </div>
);

// ============================================
// SCREEN 1: STORY BRIDGE
// ============================================

const StoryBridgeScreen = ({ onContinue }: { onContinue: () => void }) => (
  <div className="max-w-2xl mx-auto text-center space-y-8 py-10">
    <div className="text-6xl animate-pulse">🐛</div>
    <h1 className="text-4xl font-display font-bold">Code Complete. QA Starts.</h1>
    <p className="text-xl text-muted-foreground leading-relaxed">
      The development team has merged the final PR. <br />
      Now the QA team hammers the system.
    </p>
    <div className="bg-card border border-border p-6 rounded-xl text-left space-y-4 shadow-xl">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-xl">🕵️‍♀️</div>
        <div>
          <div className="font-bold">QA Lead</div>
          <div className="text-sm opacity-80">"I'm seeing some issues. Some look actionable, but a few of these feel like fundamental misunderstandings of the user. Should we log them?"</div>
        </div>
      </div>
    </div>
    <button
      onClick={onContinue}
      className="px-8 py-4 bg-primary text-primary-foreground font-display font-medium rounded-full shadow-lg hover:shadow-primary/20 transition-all hover:scale-105"
    >
      Start Bug Bash →
    </button>
  </div>
);

// ============================================
// SCREEN 2: BUG GENERATOR (ANIMATION)
// ============================================

const BugGenScreen = ({ onContinue }: { onContinue: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onContinue, 3000); // 3s fake scan
    return () => clearTimeout(timer);
  }, [onContinue]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] space-y-8">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 border-4 border-muted rounded-full opacity-20" />
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full"
        />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold animate-pulse">Running Test Suite...</h2>
        <p className="text-muted-foreground">Scanning upstream decisions for impact...</p>
      </div>
    </div>
  );
};

// ============================================
// SCREEN 3: DASHBOARD
// ============================================

const BugCard = ({ bug, onAction }: { bug: Bug, onAction: (id: string, action: Bug["status"]) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 border rounded-xl bg-card shadow-sm ${bug.status === "new" ? "border-l-4 border-l-red-500" :
        bug.status === "fixed" ? "border-l-4 border-l-green-500 opacity-60" :
          "border-l-4 border-l-amber-500 opacity-60"
        }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded tracking-wide ${bug.severity === "critical" ? "bg-red-100 text-red-600" :
            bug.severity === "major" ? "bg-amber-100 text-amber-600" :
              "bg-blue-100 text-blue-600"
            }`}>
            {bug.severity}
          </span>
          <span className="text-[10px] text-muted-foreground ml-2 uppercase tracking-wide">
            Origin: {bug.source}
          </span>
        </div>
        <div className="text-xs font-mono text-muted-foreground">
          Fix Est: {bug.fixCost}d
        </div>
      </div>

      <h3 className="font-bold text-sm mb-1">{bug.title}</h3>
      <p className="text-xs text-muted-foreground mb-4">{bug.description}</p>

      {bug.status === "new" ? (
        <div className="grid grid-cols-3 gap-2">
          <button
            onClick={() => onAction(bug.id, "fixed")}
            className="px-2 py-1.5 bg-green-500/10 text-green-600 text-xs font-bold rounded hover:bg-green-500/20"
          >
            Fix
          </button>
          <button
            onClick={() => onAction(bug.id, "deferred")}
            className="px-2 py-1.5 bg-amber-500/10 text-amber-600 text-xs font-bold rounded hover:bg-amber-500/20"
          >
            Defer
          </button>
          <button
            onClick={() => onAction(bug.id, "wontfix")}
            className="px-2 py-1.5 bg-slate-500/10 text-slate-600 text-xs font-bold rounded hover:bg-slate-500/20"
          >
            Ignore
          </button>
        </div>
      ) : (
        <div className="text-center text-xs font-bold py-1 bg-muted rounded uppercase">
          {bug.status}
        </div>
      )}
    </motion.div>
  );
};

const DashboardScreen = ({
  bugs,
  onUpdateBug,
  onContinue
}: {
  bugs: Bug[],
  onUpdateBug: (id: string, action: Bug["status"]) => void,
  onContinue: () => void
}) => {
  const activeBugs = bugs.filter(b => b.status === "new");
  const resolvedBugs = bugs.filter(b => b.status !== "new");
  const criticalRemaining = activeBugs.filter(b => b.severity === "critical").length;

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <StoryContext
        step={3}
        totalSteps={4}
        title="Bug Triage"
        subtitle={`QA found ${bugs.length} issues. You must decide what blocks the launch.`}
        why="Lesson: Bugs aren't just code errors. They are the symptoms of skipped discovery, vague requirements, and rushed design."
      />

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <h3 className="font-bold text-lg flex items-center gap-2">
            <span>Incoming Issues</span>
            <span className="bg-red-100 text-red-600 text-xs px-2 py-0.5 rounded-full">{activeBugs.length}</span>
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {activeBugs.length === 0 && (
              <div className="col-span-2 p-8 text-center border border-dashed border-muted-foreground/20 rounded-xl text-muted-foreground">
                🎉 Inbox Zero! All bugs triaged.
              </div>
            )}
            {activeBugs.map(bug => (
              <BugCard key={bug.id} bug={bug} onAction={onUpdateBug} />
            ))}
          </div>

          {resolvedBugs.length > 0 && (
            <div className="mt-8 pt-8 border-t border-border">
              <h3 className="font-bold text-lg text-muted-foreground mb-4">Resolved</h3>
              <div className="grid sm:grid-cols-2 gap-4 opacity-50 hover:opacity-100 transition-opacity">
                {resolvedBugs.map(bug => (
                  <BugCard key={bug.id} bug={bug} onAction={onUpdateBug} />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bg-card border border-border rounded-xl p-6 h-fit sticky top-4">
          <h3 className="font-bold text-xl mb-4">Launch Status</h3>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Remaining:</span>
              <span className="font-mono">{activeBugs.length}</span>
            </div>
            <div className="flex justify-between items-center text-red-500">
              <span className="font-medium">Critical Blockers:</span>
              <span className="font-bold">{criticalRemaining}</span>
            </div>
          </div>

          <div className="p-3 bg-blue-50 text-blue-800 text-xs rounded mb-6">
            ℹ️ <strong>Tip:</strong> Critical bugs (red) should usually be fixed. Deferring them creates massive UX Debt.
          </div>

          <button
            onClick={onContinue}
            disabled={criticalRemaining > 0 && activeBugs.length > 0} // Allow proceed if only ignored bugs remain, but warn? Actually let's just force triage
            className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {activeBugs.length > 0 ? "Triage All to Continue" : "Generate Report →"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// SCREEN 4: REPORT
// ============================================

const ReportScreen = ({
  bugs,
  onComplete
}: {
  bugs: Bug[],
  onComplete: () => void
}) => {
  const fixed = bugs.filter(b => b.status === "fixed");
  const deferred = bugs.filter(b => b.status === "deferred");
  const wontfix = bugs.filter(b => b.status === "wontfix");

  // Simple score: 100 - (deferred * 10) - (wontfix * 5) - (critical_deferred * 20)
  let score = 100;
  deferred.forEach(b => score -= (b.severity === "critical" ? 25 : 10));
  wontfix.forEach(b => score -= (b.severity === "critical" ? 20 : 5));
  score = Math.max(0, score);

  const qualityLabel =
    score >= 90 ? "Excellent" :
      score >= 70 ? "Stable" :
        score >= 50 ? "Buggy" : "Broken";

  const colorClass =
    score >= 90 ? "text-green-500" :
      score >= 70 ? "text-blue-500" :
        score >= 50 ? "text-amber-500" : "text-red-500";

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <StoryContext
        step={4}
        totalSteps={4}
        title="Launch Readiness"
        subtitle="The build is stabilized. Here is the quality assessment."
        why="Lesson: High quality requires time. Rushing leads to 'Deferred' debt that users pay for."
      />

      <div className="bg-card border border-border rounded-xl p-8 text-center shadow-xl">
        <div className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Quality Score</div>
        <div className={`text-6xl font-black mb-2 ${colorClass}`}>{score}</div>
        <div className={`text-2xl font-bold mb-8 ${colorClass}`}>{qualityLabel}</div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{fixed.length}</div>
            <div className="text-xs text-muted-foreground">Fixed</div>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-amber-600">{deferred.length}</div>
            <div className="text-xs text-muted-foreground">Deferred</div>
          </div>
          <div className="p-4 bg-muted/30 rounded-lg">
            <div className="text-2xl font-bold text-slate-600">{wontfix.length}</div>
            <div className="text-xs text-muted-foreground">Ignored</div>
          </div>
        </div>

        <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
          {score < 70
            ? "You are launching with significant debt. Validating upstream phases (Discovery/Design) would have prevented these issues."
            : "Great work! You prioritized quality. The product is solid."
          }
        </p>

        <button
          onClick={onComplete}
          className="px-10 py-4 bg-primary text-primary-foreground font-display font-bold text-xl rounded-full hover:scale-105 transition-transform shadow-lg"
        >
          🚀 LAUNCH PRODUCT
        </button>
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export const TestingPhase = ({ onComplete, initialScreen }: { onComplete: () => void, initialScreen?: TestScreen }) => {
  const { project, consumeTimeline, addUXDebt } = useSDLC();
  const [currentScreen, setCurrentScreen] = useState<TestScreen>(initialScreen || "storybridge");
  const [bugs, setBugs] = useState<Bug[]>([]);

  // 1. GENERATE BUGS ON MOUNT (but only once)
  useEffect(() => {
    const newBugs: Bug[] = [];
    const { uxDebt, designConfiguration } = project;
    const designConfig = designConfiguration || {};

    // A. Upstream Debt Bugs
    const discoveryDebt = uxDebt.filter(d => d.source === "Discovery");
    if (discoveryDebt.length > 0) {
      newBugs.push({
        id: "bug-disc-1",
        title: "Core Feature Missing: 'Export to PDF'",
        description: "Users are complaining they can't report to stakeholders. This requirement was missed.",
        severity: "critical",
        source: "Discovery",
        status: "new",
        fixCost: 4
      });
    }

    // B. Design Choice Bugs
    if (designConfig.navigation === "mega-menu") {
      newBugs.push({
        id: "bug-des-1",
        title: "Menu Unusable on Mobile",
        description: "Mega menu covers the entire screen and close button is off-canvas.",
        severity: "major",
        source: "Design",
        status: "new",
        fixCost: 3
      });
      newBugs.push({
        id: "bug-code-1",
        title: "Main Thread Blocked on Load",
        description: "Heavy navigation logic is causing 2s TBT (Time to Block).",
        severity: "major",
        source: "Code",
        status: "new",
        fixCost: 2
      });
    }

    if (designConfig.palette === "calm-green") { // Assuming this was the low contrast one? Checking logic.. actually let's just make a generic one if we don't know
      // If we don't have exact palette map, let's just look for accessibility debt from Design
    }

    // C. Generic Procedural Bugs (To ensure there's always something)
    newBugs.push({
      id: "bug-gen-1",
      title: "API Error 500 on 'Submit'",
      description: "Race condition when user double clicks submit button.",
      severity: "major",
      source: "Code",
      status: "new",
      fixCost: 2
    });

    newBugs.push({
      id: "bug-gen-2",
      title: "Typo in Hero Headline",
      description: "Says 'Welocme' instead of 'Welcome'.",
      severity: "minor",
      source: "Content",
      status: "new",
      fixCost: 0.5
    });

    setBugs(newBugs);
  }, [project.uxDebt, project.designConfiguration]); // Run once based on project state

  const handleUpdateBug = (id: string, action: Bug["status"]) => {
    setBugs(prev => prev.map(b => {
      if (b.id !== id) return b;

      // Process consequences
      if (action === "fixed") {
        consumeTimeline(b.fixCost);
      } else if (action === "deferred") {
        addUXDebt({
          source: "Testing",
          type: "skip",
          description: `Deferred Bug: ${b.title}`,
          visibility: "visible"
        });
      } else if (action === "wontfix") {
        addUXDebt({
          source: "Testing",
          type: "skip", // Technically 'acceptance' but adds to debt pile
          description: `Ignored Bug: ${b.title}`,
          visibility: "visible"
        });
      }

      return { ...b, status: action };
    }));
  };

  return (
    <Layer2Wrapper stage="interaction" phase="Testing">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentScreen === "storybridge" && (
            <StoryBridgeScreen onContinue={() => setCurrentScreen("buggen")} />
          )}

          {currentScreen === "buggen" && (
            <BugGenScreen onContinue={() => setCurrentScreen("dashboard")} />
          )}

          {currentScreen === "dashboard" && (
            <DashboardScreen
              bugs={bugs}
              onUpdateBug={handleUpdateBug}
              onContinue={() => setCurrentScreen("report")}
            />
          )}

          {currentScreen === "report" && (
            <ReportScreen
              bugs={bugs}
              onComplete={onComplete}
            />
          )}

        </motion.div>
      </AnimatePresence>
    </Layer2Wrapper>
  );
};
