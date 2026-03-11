import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSDLC } from "../SDLCContext";
import { Layer2Wrapper } from "../Layer2Wrapper";

// ============================================
// SHARED TYPES & MOCK DATA
// ============================================

export type DevScreen =
  | "storybridge"
  | "techstack"
  | "assembly"
  | "integration"
  | "optimization"
  | "report"
  | "takeaway";

interface StoryContextProps {
  step: number;
  totalSteps: number;
  title: string;
  subtitle: string;
  why: string;
}

const StoryContext = ({ step, totalSteps, title, subtitle, why }: StoryContextProps) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-6 pb-4 border-b border-border/50"
  >
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold uppercase rounded tracking-wider">
          Development Phase
        </div>
        <span className="text-xs text-muted-foreground">Step {step} of {totalSteps}</span>
      </div>
      <div className="flex gap-1">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 w-6 rounded-full transition-all duration-500 ${i + 1 <= step ? "bg-primary" : "bg-muted"
              }`}
          />
        ))}
      </div>
    </div>
    <h2 className="text-xl font-display font-semibold text-foreground mb-1">{title}</h2>
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">{subtitle}</p>
      <div className="hidden md:flex items-center gap-2 text-xs bg-secondary/50 px-3 py-1.5 rounded-full text-secondary-foreground/80">
        <span className="font-bold">Why:</span> {why}
      </div>
    </div>
    {/* Mobile Why */}
    <p className="md:hidden text-xs text-muted-foreground mt-2 pt-2 border-t border-dashed border-border/50">
      <span className="font-bold text-primary/80">Why:</span> {why}
    </p>
  </motion.div>
);

// ============================================
// SCREEN 1: STORY BRIDGE
// ============================================

const StoryBridgeScreen = ({ onContinue }: { onContinue: () => void }) => (
  <div className="max-w-4xl mx-auto space-y-6">
    <StoryContext
      step={1}
      totalSteps={5}
      title="Handover Complete"
      subtitle="The designs are signed off. Now the abstract becomes concrete."
      why="Development isn't just typing. It's where design performance costs are paid."
    />

    <div className="py-10 text-center space-y-8">
      <div className="text-6xl animate-bounce">⚡️</div>
      <h1 className="text-4xl font-display font-bold">Ready to Build</h1>
      <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
        Vikram has signed off. The Figma file is ready.<br />
        Now the clock starts ticking.
      </p>
      <div className="bg-card border border-border p-6 rounded-xl text-left space-y-4 shadow-xl">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">👨🏽‍💻</div>
          <div>
            <div className="font-bold">Lead Developer</div>
            <div className="text-sm opacity-80">"I've looked at the designs. That Mega Menu is going to be heavy. And we need to validate all those form fields. We need to pick a stack that handles this complexity."</div>
          </div>
        </div>
      </div>
      <button
        onClick={onContinue}
        className="px-8 py-4 bg-primary text-primary-foreground font-display font-medium rounded-full shadow-lg hover:shadow-primary/20 transition-all hover:scale-105"
      >
        Start Coding →
      </button>
    </div>
  </div>
);

// ============================================
// SCREEN 2: TECH STACK
// ============================================

interface StackOption {
  id: "react" | "next" | "vanilla";
  label: string;
  description: string;
  pros: string[];
  cons: string[];
  bundleEffect: number; // Multiplier
  speedEffect: number; // Multiplier
}

const STACKS: StackOption[] = [
  {
    id: "vanilla",
    label: "Vanilla JS + HTML",
    description: "Zero dependencies. Just raw code.",
    pros: ["Tiny Bundle Size (4KB)", "Total Control"],
    cons: ["Spaghetti Code Risk", "Slow Development", "Hard to Maintain"],
    bundleEffect: 0.2, // Tiny
    speedEffect: 2.0 // Slow
  },
  {
    id: "react",
    label: "React (CRA/Vite)",
    description: "Standard SPA architecture.",
    pros: ["Component Reusability", "Huge Ecosystem"],
    cons: ["Medium Bundle (150KB)", "Client-side Rendering"],
    bundleEffect: 1.0, // Baseline
    speedEffect: 1.0 // Baseline
  },
  {
    id: "next",
    label: "Next.js (SSR)",
    description: "React framework with server-side powers.",
    pros: ["SEO Optimized", "Fast Initial Load", "Opinionated"],
    cons: ["Complex Setup", "Larger Baseline Bundle"],
    bundleEffect: 1.2, // Slightly heavier baseline
    speedEffect: 0.7 // Faster dev
  }
];

const TechStackScreen = ({ onContinue, onSelect }: { onContinue: () => void, onSelect: (id: string) => void }) => {
  const [selected, setSelected] = useState<string>("react");

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <StoryContext
        step={2}
        totalSteps={5}
        title="Choose Your Weapon"
        subtitle="The foundation determines the limits. What are we building on?"
        why="User Experience starts with Performance. The framework you choose sets the baseline load time."
      />

      <div className="grid md:grid-cols-3 gap-6 h-[400px]">
        {STACKS.map(stack => (
          <button
            key={stack.id}
            onClick={() => { setSelected(stack.id); onSelect(stack.id); }}
            className={`relative p-6 rounded-xl border-2 text-left transition-all hover:scale-[1.02] ${selected === stack.id
              ? "border-primary bg-primary/5 shadow-xl ring-2 ring-primary/20"
              : "border-border bg-card hover:border-primary/50"
              }`}
          >
            {selected === stack.id && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                SELECTED
              </div>
            )}
            <h3 className="text-xl font-bold mb-2">{stack.label}</h3>
            <p className="text-sm text-muted-foreground mb-4 min-h-[40px]">{stack.description}</p>

            <div className="space-y-4 text-xs">
              <div>
                <div className="font-bold text-green-600 mb-1">PROS</div>
                <ul className="list-disc pl-3 space-y-1 opacity-80">
                  {stack.pros.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
              </div>
              <div>
                <div className="font-bold text-red-500 mb-1">CONS</div>
                <ul className="list-disc pl-3 space-y-1 opacity-80">
                  {stack.cons.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex justify-between text-xs font-mono opacity-70">
              <span>Bundle: {stack.bundleEffect}x</span>
              <span>Speed: {stack.speedEffect}x</span>
            </div>
          </button>
        ))}
      </div>

      <div className="flex justify-end pt-8">
        <button
          onClick={onContinue}
          className="px-8 py-4 bg-primary text-primary-foreground font-display font-medium rounded-lg shadow-lg hover:shadow-primary/20 transition-all hover:bg-primary/90"
        >
          Initialize Project →
        </button>
      </div>
    </div>
  );
};

// ============================================
// SCREEN 3: COMPONENT ASSEMBLY
// ============================================

const MOCK_CODE = {
  hero: `function Hero() {\n  return (\n    <div className="h-screen bg-cover">\n      <h1>Welcome</h1>\n    </div>\n  );\n}`,
  features: `function Features() {\n  return (\n    <div className="grid grid-cols-3 gap-4">\n      {items.map(i => <Card key={i.id} />)}\n    </div>\n  );\n}`,
  testimonials: `function Testimonials() {\n  return (\n    <Carousel>\n      {reviews.map(r => <Review r={r} />)}\n    </Carousel>\n  );\n}`,
  "simple-bar": `// Simple Nav: 50 lines\nconst Navbar = () => <nav className="flex p-4">...</nav>;`,
  "mega-menu": `// Mega Menu: 450 lines\n// dozens of sub-links and mobile logic\nconst Navbar = () => (\n  <div className="fixed w-full z-50">\n    <DesktopMenu />\n    <MobileMenu />\n    <SearchOverlay />\n  </div>\n);`
};

const AssemblyScreen = ({
  designConfig,
  onContinue,
  onUpdate
}: {
  designConfig: any,
  onContinue: () => void,
  onUpdate: (assembled: boolean) => void
}) => {
  const [queue, setQueue] = useState<{ id: string, label: string, code: string, lines: number }[]>([]);
  const [built, setBuilt] = useState<string[]>([]);
  const [isBuilding, setIsBuilding] = useState(false);

  useEffect(() => {
    const q = [];
    // 1. Navigation
    const navType = designConfig.navigation || "simple-bar";
    q.push({
      id: "nav",
      label: navType === "mega-menu" ? "Mega Menu Navigation" : "Simple Navbar",
      code: MOCK_CODE[navType as keyof typeof MOCK_CODE] || MOCK_CODE["simple-bar"],
      lines: navType === "mega-menu" ? 450 : 50
    });

    // 2. Wireframe Components
    const components: string[] = designConfig.wireframe || ["hero", "features"];
    components.forEach(c => {
      q.push({
        id: c,
        label: c.charAt(0).toUpperCase() + c.slice(1) + " Section",
        code: MOCK_CODE[c as keyof typeof MOCK_CODE] || `// ${c} component logic...`,
        lines: 120
      });
    });

    setQueue(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const buildNext = () => {
    if (built.length >= queue.length) return;
    setIsBuilding(true);

    const nextIdx = built.length;
    const isComplex = queue[nextIdx].lines > 200;

    // Simulating build time based on complexity
    setTimeout(() => {
      setBuilt(prev => [...prev, queue[nextIdx].id]);
      setIsBuilding(false);
      if (nextIdx + 1 >= queue.length) {
        onUpdate(true);
      }
    }, isComplex ? 1200 : 600);
  };

  const progress = (built.length / queue.length) * 100;
  const totalLines = queue.reduce((acc, item) => acc + item.lines, 0);
  const builtLines = queue.filter(q => built.includes(q.id)).reduce((acc, item) => acc + item.lines, 0);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <StoryContext
        step={3}
        totalSteps={5}
        title="Assemble Components"
        subtitle={`Constructing the UI based on the blueprint. Total complexity: ${totalLines} LOC.`}
        why="Complexity has a cost. Mega Menus mean more code, more bugs, and slower rendering for the user."
      />

      <div className="grid md:grid-cols-2 gap-8">
        {/* LEFT: Build Queue */}
        <div className="bg-card border border-border rounded-xl p-6 h-[500px] flex flex-col">
          <h3 className="font-bold text-lg mb-4 flex justify-between">
            <span>Build Queue</span>
            <span className="text-muted-foreground font-normal text-sm">{built.length} / {queue.length}</span>
          </h3>

          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {queue.map((item, idx) => {
              const isDone = built.includes(item.id);
              const isNext = !isDone && idx === built.length;

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border transition-all ${isDone
                    ? "bg-green-500/10 border-green-500/30 opacity-60"
                    : isNext
                      ? "bg-secondary border-primary/50 shadow-md scale-105"
                      : "bg-muted/30 border-border opacity-50"
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="font-bold">{item.label}</div>
                    <div className="text-xs font-mono">{item.lines} LOC</div>
                  </div>
                  {isNext && isBuilding && (
                    <div className="text-xs text-primary animate-pulse mt-2">Compiling...</div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            {built.length < queue.length ? (
              <button
                onClick={buildNext}
                disabled={isBuilding}
                className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isBuilding ? "Coding..." : "Write Code for Next Component"}
              </button>
            ) : (
              <div className="text-center text-green-500 font-bold py-3 bg-green-500/10 rounded-lg">
                ✅ All Components Built
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: IDE Simulator */}
        <div className="bg-[#1e1e1e] rounded-xl overflow-hidden flex flex-col h-[500px] shadow-2xl ring-1 ring-white/10">
          <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 text-xs text-stone-400 border-b border-white/5">
            <div className="flex gap-1.5 mr-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="font-mono">src/components/{queue[built.length - 1]?.id || "App"}.tsx</span>
            <div className="ml-auto font-mono">{builtLines} / {totalLines} LOC</div>
          </div>

          <div className="p-6 font-mono text-sm text-stone-300 overflow-y-auto flex-1 relative">
            {built.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center text-stone-600">
                [Ready to code...]
              </div>
            ) : (
              <div className="space-y-6">
                {built.map((id) => {
                  const item = queue.find(q => q.id === id);
                  return (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="border-l-2 border-stone-700 pl-4"
                    >
                      <div className="text-stone-500 mb-1">// {item?.label}</div>
                      <pre className="text-green-400 whitespace-pre-wrap">{item?.code}</pre>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center pt-8">
        <div className="text-sm text-muted-foreground">
          Current Bundle Size Impact: <span className="text-foreground font-bold">{(totalLines * 0.5).toFixed(0)}KB</span>
        </div>
        <button
          onClick={onContinue}
          disabled={built.length < queue.length}
          className="px-8 py-4 bg-primary text-primary-foreground font-display font-medium rounded-lg shadow-lg hover:shadow-primary/20 transition-all hover:bg-primary/90 disabled:opacity-50 disabled:grayscale"
        >
          Start Integration Phase →
        </button>
      </div>
    </div>
  );
};

// ============================================
// SCREEN 4: INTEGRATION (FORMS)
// ============================================

const IntegrationScreen = ({ designConfig, onContinue }: { designConfig: any, onContinue: () => void }) => {
  const forms = designConfig.forms || ["name", "email"];
  const [connected, setConnected] = useState<string[]>([]);

  // Simulate API latency based on form fields count
  // More fields = more data to serialize = slower
  const latency = 100 + (forms.length * 50);

  const connectField = (field: string) => {
    setConnected(prev => [...prev, field]);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <StoryContext
        step={4}
        totalSteps={5}
        title="Wire It Up"
        subtitle={`Connecting ${forms.length} form fields to the backend database.`}
        why="Forms are friction. Behind every input field is validation logic, database cost, and potential for user error."
      />

      <div className="bg-card border border-border rounded-xl p-8 shadow-xl">
        <div className="flex justify-between mb-8">
          <div className="flex flex-col items-center p-4 bg-muted rounded-lg w-32">
            <div className="text-4xl mb-2">🖥️</div>
            <div className="font-bold text-sm">Frontend</div>
          </div>

          <div className="flex-1 flex items-center justify-center px-4 relative">
            <div className="h-0.5 bg-border w-full absolute top-1/2" />
            <div className="bg-background border border-primary text-primary text-xs px-2 py-1 rounded-full relative z-10 font-mono">
              Wait: {latency}ms
            </div>
          </div>

          <div className="flex flex-col items-center p-4 bg-muted rounded-lg w-32">
            <div className="text-4xl mb-2">🗄️</div>
            <div className="font-bold text-sm">Database</div>
          </div>
        </div>

        <div className="grid gap-3">
          {forms.map((field: string) => {
            const isConnected = connected.includes(field);
            return (
              <div key={field} className="flex items-center gap-4 p-3 border rounded-lg">
                <div className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
                <div className="font-mono flex-1">{field}_input</div>
                {isConnected ? (
                  <span className="text-xs text-green-600 font-bold px-2 py-1 bg-green-100 rounded">CONNECTED</span>
                ) : (
                  <button
                    onClick={() => connectField(field)}
                    className="text-xs bg-secondary hover:bg-secondary/80 px-3 py-1.5 rounded transition-colors"
                  >
                    Write Validation Logic
                  </button>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={onContinue}
            disabled={connected.length < forms.length}
            className="px-8 py-4 bg-primary text-primary-foreground font-display font-medium rounded-lg shadow-lg hover:shadow-primary/20 transition-all hover:bg-primary/90 disabled:opacity-50 disabled:grayscale"
          >
            Run Build Optimizer →
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// SCREEN 5: OPTIMIZATION & REPORT
// ============================================

const ReportScreen = ({ designConfig, onComplete }: { designConfig: any, onComplete: () => void }) => {
  // Audit Logic
  const audits = [];

  // 1. Bundle Size Check
  const navComplex = (designConfig.navigation === "mega-menu");
  const stackHeavy = true; // Assuming React/Next
  const bundleScore = navComplex ? "⚠️ Large" : "✅ Optimal";
  audits.push({ label: "Initial Bundle Size", status: bundleScore, detail: navComplex ? "Mega Menu added +140KB" : "Simple Nav kept it light" });

  // 2. Accessibility Check (Mock based on palette choice if we had it, or just generic passed)
  audits.push({ label: "Contrast Ratio", status: "✅ Pass", detail: "AA Standard met" });

  // 3. Thumb Zone
  // If we had the data from Design, we'd flag it here. Assuming Pass for now.
  audits.push({ label: "Touch Targets", status: "✅ Pass", detail: "All buttons > 44px" });

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <StoryContext
        step={5}
        totalSteps={5}
        title="Build Complete"
        subtitle="The code is compiled. Analyzing final metrics."
        why="Development is the reality check. Your design choices (Mega Menu, 10 fields) now directly impact the Lighthouse score."
      />

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-secondary/50 p-6 border-b border-border">
          <h3 className="font-display font-bold text-2xl">Lighthouse Report</h3>
          <p className="text-muted-foreground">Generated just now</p>
        </div>

        <div className="divide-y divide-border">
          {audits.map((a, i) => (
            <div key={i} className="p-6 flex items-start justify-between hover:bg-muted/10">
              <div>
                <div className="font-medium text-lg">{a.label}</div>
                <div className="text-muted-foreground">{a.detail}</div>
              </div>
              <div className={`text-xl font-bold ${a.status.includes("✅") ? "text-green-500" : "text-amber-500"}`}>
                {a.status}
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 bg-muted/20 text-center">
          <button
            onClick={onComplete}
            className="w-full py-4 bg-primary text-primary-foreground font-display font-bold text-xl rounded-xl shadow-xl hover:scale-[1.02] transition-transform"
          >
            Review Dev Lessons →
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// MAIN COMPONENT
// ============================================

export const DevelopmentPhase = ({ onComplete, initialScreen }: { onComplete: () => void, initialScreen?: DevScreen }) => {
  const { project } = useSDLC();
  const [currentScreen, setCurrentScreen] = useState<DevScreen>(initialScreen || "storybridge");
  const [devState, setDevState] = useState({
    stack: "react",
    assembled: false,
    integrated: false
  });

  // Fallback if no design config (e.g. dev mode)
  const designConfig = project.designConfiguration || {
    wireframe: ["hero", "features"],
    palette: "trust-blue",
    typography: "sans",
    navigation: "simple-bar",
    forms: ["name", "email"]
  };

  return (
    <Layer2Wrapper stage="interaction" phase="Development">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentScreen === "storybridge" && (
            <StoryBridgeScreen onContinue={() => setCurrentScreen("techstack")} />
          )}

          {currentScreen === "techstack" && (
            <TechStackScreen
              onSelect={(stack) => setDevState(prev => ({ ...prev, stack }))}
              onContinue={() => setCurrentScreen("assembly")}
            />
          )}

          {currentScreen === "assembly" && (
            <AssemblyScreen
              designConfig={designConfig}
              onUpdate={(assembled) => setDevState(prev => ({ ...prev, assembled }))}
              onContinue={() => setCurrentScreen("integration")}
            />
          )}

          {currentScreen === "integration" && (
            <IntegrationScreen
              designConfig={designConfig}
              onContinue={() => setCurrentScreen("report")}
            />
          )}

          {currentScreen === "report" && (
            <ReportScreen
              designConfig={designConfig}
              onComplete={() => setCurrentScreen("takeaway")}
            />
          )}

          {currentScreen === "takeaway" && (
            <DevTakeawayScreen onComplete={onComplete} />
          )}

          {!["storybridge", "techstack", "assembly", "integration", "report", "optimization", "takeaway"].includes(currentScreen) && (
            <div className="text-center p-10">
              <h2 className="text-2xl text-foreground">Work in Progress</h2>
              <p className="text-muted-foreground mt-2">Screen: {currentScreen}</p>
              <button onClick={() => setCurrentScreen("storybridge")} className="mt-4 px-4 py-2 bg-secondary rounded">
                Back
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </Layer2Wrapper>
  );
};

// ============================================
// SCREEN 6: TAKEAWAY (Key Lessons)
// ============================================

const DevTakeawayScreen = ({ onComplete }: { onComplete: () => void }) => {
  const lessons = [
    {
      icon: "🏗️",
      title: "The Weight of Abstraction",
      desc: "Frameworks (Next.js/React) give you speed, but cost the user 150KB+ of initial JS load.",
      rule: "The 3s Loading Rule"
    },
    {
      icon: "🧩",
      title: "Complexity Compounding",
      desc: "A 'cool' Mega Menu didn't just add UI—it added 450 lines of code, mobile logic, and state management.",
      rule: "Code Volume = Bug Surface"
    },
    {
      icon: "🔄",
      title: "Integration Latency",
      desc: "Every form field isn't just a box directly to the database. It's a network request, a validation check, and a failure point.",
      rule: "The Logic Tax"
    },
    {
      icon: "⚡",
      title: "Performance is UX",
      desc: "Users don't care about your clean code. They care that the button didn't work because the JS hadn't hydrated yet.",
      rule: "The Perception Rule"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <StoryContext
        step={6}
        totalSteps={6}
        title="Development Phase: The Lessons"
        subtitle="What you should take with you to Testing"
        why="Development is where design dreams meet technical reality."
      />

      <div className="grid md:grid-cols-2 gap-4">
        {lessons.map((lesson, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors group"
          >
            <div className="flex items-start gap-4">
              <div className="text-4xl bg-muted/50 w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                {lesson.icon}
              </div>
              <div className="space-y-2">
                <h3 className="font-bold text-lg text-foreground">{lesson.title}</h3>
                <div className="text-xs font-bold text-primary uppercase tracking-wider">{lesson.rule}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {lesson.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-muted/30 border border-border rounded-xl p-8 text-center space-y-6"
      >
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-2">Ready to Break It?</h2>
          <p className="text-muted-foreground">
            The code is written. The meaningful friction is baked in.
            <br />
            Now, put on the <strong>QA Tester Hat</strong>. It's time to see what breaks.
          </p>
        </div>

        <button
          onClick={onComplete}
          className="px-8 py-4 bg-primary text-primary-foreground font-display font-medium rounded-full shadow-lg hover:shadow-primary/20 transition-all hover:scale-105"
        >
          Enter Testing Phase 🐞
        </button>
      </motion.div>
    </div>
  );
};
