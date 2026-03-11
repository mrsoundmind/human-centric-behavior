import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSDLC } from "../SDLCContext";
import { Layer2Wrapper } from "../Layer2Wrapper";

// ============================================
// SHARED TYPES & HELPER COMPONENTS
// ============================================

export type LaunchScreen =
  | "storybridge"
  | "deploy"
  | "livefeed"
  | "scorecard";

interface FeedItem {
  id: string;
  user: string;
  avatar: string;
  content: string;
  type: "positive" | "negative" | "neutral";
  source?: string; // Where this feedback came from (e.g. "Design Choice")
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
        LAUNCH PHASE {step} of {totalSteps}
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
    <div className="text-6xl animate-bounce">🚀</div>
    <h1 className="text-4xl font-display font-bold">The Main Event</h1>
    <p className="text-xl text-muted-foreground leading-relaxed">
      The code is staged. The marketing emails are queued.<br />
      There is no turning back.
    </p>
    <div className="bg-card border border-border p-6 rounded-xl text-left space-y-4 shadow-xl">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-xl">🤵</div>
        <div>
          <div className="font-bold">Product Owner</div>
          <div className="text-sm opacity-80">"We've made a lot of hard choices to get here. I just hope the users understand what we're trying to do. Let's light this candle."</div>
        </div>
      </div>
    </div>
    <button
      onClick={onContinue}
      className="px-8 py-4 bg-primary text-primary-foreground font-display font-medium rounded-full shadow-lg hover:shadow-primary/20 transition-all hover:scale-105"
    >
      Enter Mission Control →
    </button>
  </div>
);

// ============================================
// SCREEN 2: DEPLOY SEQUENCE
// ============================================

const DeployScreen = ({ onDeployed }: { onDeployed: () => void }) => {
  const [status, setStatus] = useState("ready"); // ready, deploying, done

  const handleDeploy = () => {
    setStatus("deploying");
    setTimeout(() => {
      onDeployed();
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] space-y-8">
      <div className={`relative w-64 h-64 rounded-full flex items-center justify-center transition-all duration-1000 ${status === "deploying" ? "bg-red-500 shadow-[0_0_100px_rgba(239,68,68,0.5)] scale-110" : "bg-primary shadow-2xl hover:scale-105"
        }`}>
        {status === "deploying" && (
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 rounded-full bg-white/20"
          />
        )}

        <button
          onClick={handleDeploy}
          disabled={status === "deploying"}
          className="relative z-10 text-primary-foreground font-black text-4xl tracking-widest uppercase disabled:cursor-wait"
        >
          {status === "deploying" ? "LAUNCHING" : "DEPLOY"}
        </button>
      </div>

      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold font-mono uppercase tracking-widest">
          {status === "deploying" ? "Initiating Sequence..." : "System Ready"}
        </h2>
        <p className="text-muted-foreground font-mono text-sm">
          Target: Production Environment
        </p>
      </div>
    </div>
  );
};

// ============================================
// SCREEN 3: LIVE FEED
// ============================================

const LiveFeedScreen = ({
  items,
  onContinue
}: {
  items: FeedItem[],
  onContinue: () => void
}) => {
  const [visibleItems, setVisibleItems] = useState<FeedItem[]>([]);

  useEffect(() => {
    if (visibleItems.length < items.length) {
      const timer = setTimeout(() => {
        setVisibleItems(prev => [...prev, items[prev.length]]);
      }, 800); // New tweet every 800ms
      return () => clearTimeout(timer);
    }
  }, [visibleItems, items]);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <StoryContext
        step={3}
        totalSteps={4}
        title="Live User Feedback"
        subtitle="The servers are live. The first users are logging in. Here is what they are saying."
        why="Lesson: Feedback is the ultimate truth. It validates or invalidates every assumption you made."
      />

      <div className="flex gap-8 h-[600px]">
        {/* FEED COLUMN */}
        <div className="flex-1 bg-card border border-border rounded-xl overflow-hidden flex flex-col shadow-xl">
          <div className="p-4 bg-muted/30 border-b border-border font-bold flex justify-between">
            <span>Latest Activity</span>
            <span className="text-xs font-normal text-muted-foreground flex items-center gap-1">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> LIVE
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {visibleItems.length === 0 && (
              <div className="text-center text-muted-foreground py-10">Listening for signals...</div>
            )}
            <AnimatePresence>
              {visibleItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: "auto" }}
                  className={`p-4 rounded-lg border flex gap-3 ${item.type === "positive" ? "bg-green-500/5 border-green-500/20" :
                    item.type === "negative" ? "bg-red-500/5 border-red-500/20" :
                      "bg-muted/20 border-border"
                    }`}
                >
                  <div className="text-2xl">{item.avatar}</div>
                  <div>
                    <div className="font-bold text-sm mb-0.5">{item.user}</div>
                    <div className="text-sm opacity-90">{item.content}</div>
                    {item.source && (
                      <div className="text-[10px] uppercase font-bold mt-2 opacity-50 tracking-wider">
                        Caused by: {item.source}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div id="feed-end" />
          </div>
        </div>

        {/* SENTIMENT COLUMN */}
        <div className="w-64 space-y-4">
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <h3 className="text-xs font-bold uppercase text-muted-foreground mb-2">Sentiment</h3>
            <div className="flex items-end justify-center gap-1 h-32 mb-4">
              {/* Simple Bar Chart */}
              <div className="w-8 bg-green-500/50 rounded-t" style={{ height: `${(visibleItems.filter(i => i.type === "positive").length / Math.max(1, visibleItems.length)) * 100}%` }} />
              <div className="w-8 bg-slate-500/50 rounded-t" style={{ height: `${(visibleItems.filter(i => i.type === "neutral").length / Math.max(1, visibleItems.length)) * 100}%` }} />
              <div className="w-8 bg-red-500/50 rounded-t" style={{ height: `${(visibleItems.filter(i => i.type === "negative").length / Math.max(1, visibleItems.length)) * 100}%` }} />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground font-mono px-4">
              <span>Pos</span><span>Neu</span><span>Neg</span>
            </div>
          </div>

          <button
            onClick={onContinue}
            disabled={visibleItems.length < items.length}
            className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg hover:shadow-primary/20 transition-all hover:scale-105 disabled:opacity-50 disabled:scale-100"
          >
            View Scorecard →
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// SCREEN 4: SCORECARD & REFLECTION
// ============================================

const ScorecardScreen = ({
  items,
  onComplete
}: {
  items: FeedItem[],
  onComplete: () => void
}) => {
  // Calculate NPS
  // Promoters (Positive), Passives (Neutral), Detractors (Negative)
  const promoters = items.filter(i => i.type === "positive").length;
  const detractors = items.filter(i => i.type === "negative").length;
  const total = items.length;
  const nps = total > 0 ? Math.round(((promoters - detractors) / total) * 100) : 0; // Simplified NPS

  const npsLabel =
    nps > 50 ? "World Class" :
      nps > 0 ? "Good" :
        nps > -50 ? "Poor" : "Disaster";

  const npsColor =
    nps > 50 ? "text-green-500" :
      nps > 0 ? "text-blue-500" :
        nps > -50 ? "text-amber-500" : "text-red-500";

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <StoryContext
        step={4}
        totalSteps={4}
        title="The Verdict"
        subtitle="The dust has settled. Here is how you performed."
        why="Lesson: Success isn't about code compiling. It's about user value. Every 'shortcut' in SDLC reduced this score."
      />

      <div className="bg-card border border-border rounded-xl p-8 text-center shadow-xl">
        <div className="text-sm text-muted-foreground uppercase tracking-widest mb-2">Net Promoter Score</div>
        <div className={`text-8xl font-black mb-2 ${npsColor}`}>{nps}</div>
        <div className={`text-2xl font-bold mb-8 ${npsColor}`}>{npsLabel}</div>

        <div className="p-6 bg-muted/30 rounded-lg text-left mb-8">
          <h3 className="font-bold mb-4">Key Drivers</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {detractors > 0 ? (
              <>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">−</span>
                  Users were frustrated by bugs you deferred.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 font-bold">−</span>
                  Design choices (Contrast/Nav) caused usability friction.
                </li>
              </>
            ) : (
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">+</span>
                High stability and polished design delighted users.
              </li>
            )}
            <li className="flex items-start gap-2">
              <span className="text-blue-500 font-bold">ℹ</span>
              {total} total feedback items received.
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-muted-foreground">
            The project is "done", but the product lifecycle is just beginning.
            Now comes Maintenance.
          </p>
          <button
            onClick={onComplete}
            className="w-full py-4 bg-primary text-primary-foreground font-display font-bold text-xl rounded-full hover:scale-[1.02] transition-transform shadow-lg"
          >
            Enter Maintenance Phase 🔄
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// MAIN COMPONENT
// ============================================

export const LaunchPhase = ({ onComplete, initialScreen }: { onComplete: () => void, initialScreen?: LaunchScreen }) => {
  const { project } = useSDLC();
  const [currentScreen, setCurrentScreen] = useState<LaunchScreen>(initialScreen || "storybridge");
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);

  // GENERATE FEED ITEMS
  useEffect(() => {
    const items: FeedItem[] = [];
    const { uxDebt, designConfiguration } = project;
    const designConfig = designConfiguration || {};

    // 1. DISCOVERY FEEDBACK
    const discoverySkipped = uxDebt.some(d => d.source === "Discovery");
    if (discoverySkipped) {
      items.push({
        id: "f-disc-1",
        user: "@SarahExec",
        avatar: "👩‍💼",
        content: "I'm looking for the PDF export? I can't present this to my board without it.",
        type: "negative",
        source: "Skipped Discovery"
      });
      items.push({
        id: "f-disc-2",
        user: "@DaveyUser",
        avatar: "🙍‍♂️",
        content: "Ideally this would connect to my calendar. Sad it doesn't.",
        type: "neutral",
        source: "Missed Requirement"
      });
    } else {
      items.push({
        id: "f-disc-pos",
        user: "@SarahExec",
        avatar: "👩‍💼",
        content: "This does exactly what I needed! The PDF export is a lifesaver.",
        type: "positive",
        source: "Good Discovery"
      });
    }

    // 2. DESIGN FEEDBACK
    if (designConfig.navigation === "mega-menu") {
      items.push({
        id: "f-nav-1",
        user: "@MobileMike",
        avatar: "📱",
        content: "I can't close the menu on my iPhone. It covers the whole screen! 😡",
        type: "negative",
        source: "Complex Navigation"
      });
    } else {
      items.push({
        id: "f-nav-pos",
        user: "@MobileMike",
        avatar: "📱",
        content: "Nav is clean and simple. Love it.",
        type: "positive",
        source: "Simple Navigation"
      });
    }

    // 3. TESTING FEEDBACK USE DEFERRED BUGS
    const deferredBugs = uxDebt.filter(d => d.source === "Testing" && d.type === "skip");
    if (deferredBugs.length > 0) {
      deferredBugs.forEach((bug, i) => {
        items.push({
          id: `f-bug-${i}`,
          user: `@AngryUser${i}`,
          avatar: "😤",
          content: `Found a bug: ${bug.description}`,
          type: "negative",
          source: "Deferred Bug"
        });
      });
    } else {
      items.push({
        id: "f-qa-pos",
        user: "@TechReviewer",
        avatar: "⭐",
        content: "Surprisingly stable for a V1 launch. Kudos to the QA team.",
        type: "positive",
        source: "High Quality Bar"
      });
    }

    // 4. RANDOM NOISE
    items.push({
      id: "f-rand-1",
      user: "@RandomBot",
      avatar: "🤖",
      content: "First!",
      type: "neutral"
    });

    setFeedItems(items);
  }, [project]);

  return (
    <Layer2Wrapper stage="interaction" phase="Launch">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentScreen === "storybridge" && (
            <StoryBridgeScreen onContinue={() => setCurrentScreen("deploy")} />
          )}

          {currentScreen === "deploy" && (
            <DeployScreen onDeployed={() => setCurrentScreen("livefeed")} />
          )}

          {currentScreen === "livefeed" && (
            <LiveFeedScreen
              items={feedItems}
              onContinue={() => setCurrentScreen("scorecard")}
            />
          )}

          {currentScreen === "scorecard" && (
            <ScorecardScreen
              items={feedItems}
              onComplete={onComplete}
            />
          )}

        </motion.div>
      </AnimatePresence>
    </Layer2Wrapper>
  );
};
