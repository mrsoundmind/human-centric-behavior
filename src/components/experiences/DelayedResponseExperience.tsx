import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ExperienceWrapper, ContextCard, ReflectionCard } from "./ExperienceWrapper";


interface DelayedResponseExperienceProps {
  onComplete: () => void;
}

type Stage = "context" | "interaction" | "reflection";

export const DelayedResponseExperience = ({ onComplete }: DelayedResponseExperienceProps) => {
  const [stage, setStage] = useState<Stage>("context");
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState<string[] | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [userActions, setUserActions] = useState<string[]>([]);
  const waitStartTimeRef = useRef<number | null>(null);
  const [totalWaitTime, setTotalWaitTime] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reflectionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clean up search timers on unmount
  useEffect(() => {
    return () => {
      if (searchTimerRef.current) clearTimeout(searchTimerRef.current);
      if (reflectionTimerRef.current) clearTimeout(reflectionTimerRef.current);
    };
  }, []);

  const handleSearch = () => {
    if (!searchText.trim() || isSearching) return;

    setIsSearching(true);
    setResults(null);
    waitStartTimeRef.current = Date.now();

    // 8 second delay with NO loading indicator
    searchTimerRef.current = setTimeout(() => {
      setResults([
        "Search result 1",
        "Search result 2",
        "Search result 3"
      ]);
      setIsSearching(false);
      if (waitStartTimeRef.current) {
        setTotalWaitTime(Date.now() - waitStartTimeRef.current);
      }
      reflectionTimerRef.current = setTimeout(() => setStage("reflection"), 2000);
    }, 8000);
  };

  // Track user behavior during the wait
  useEffect(() => {
    if (!isSearching) return;

    const handleClick = () => {
      setUserActions(prev => [...prev, "clicked"]);
    };

    const handleKeyDown = () => {
      setUserActions(prev => [...prev, "typed"]);
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    // Show hint after 4 seconds
    const hintTimeout = setTimeout(() => {
      setShowHint(true);
    }, 4000);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
      clearTimeout(hintTimeout);
    };
  }, [isSearching]);

  const startInteraction = () => setStage("interaction");

  if (stage === "context") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 pt-16">


        <ExperienceWrapper stage="context">
          <ContextCard>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-muted-foreground text-lg"
            >
              Quick search
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-3xl md:text-5xl font-display font-semibold text-foreground leading-tight"
            >
              You need an answer.<br />
              <span className="text-muted-foreground">Just a quick lookup.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="text-xl text-foreground/80 max-w-xl mx-auto"
            >
              Type your query and search.
            </motion.p>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              onClick={startInteraction}
              className="mt-8 px-8 py-4 bg-secondary text-secondary-foreground font-display text-lg rounded-md hover:bg-secondary/80 transition-colors"
            >
              Open search
            </motion.button>
          </ContextCard>
        </ExperienceWrapper>
      </div>
    );
  }

  if (stage === "interaction") {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 pt-16">


        <ExperienceWrapper stage="interaction">
          <div className="flex flex-col items-center gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-lg"
            >
              {/* Search bar */}
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search for anything..."
                  disabled={isSearching}
                  className="flex-1 px-4 py-3 bg-secondary border border-border rounded-md text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <button
                  onClick={handleSearch}
                  disabled={isSearching || !searchText.trim()}
                  className="px-6 py-3 bg-primary text-primary-foreground font-display rounded-md hover:bg-primary/90 disabled:opacity-50 transition-colors"
                >
                  Search
                </button>
              </div>
            </motion.div>

            {/* Results area - completely empty during search */}
            <div className="w-full max-w-lg min-h-[200px]">
              {results && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  {results.map((result, i) => (
                    <div
                      key={i}
                      className="p-4 bg-card border border-border rounded-md"
                    >
                      <p className="text-foreground">{result}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Absolutely nothing shown while searching - this is intentional */}
              {isSearching && (
                <div className="flex flex-col items-center justify-center h-[200px] text-center">
                  {/* Empty. On purpose. No spinner, no text. */}
                  {showHint && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.4 }}
                      className="text-muted-foreground text-sm"
                    >
                      {/* Even this is barely visible */}
                      ...
                    </motion.p>
                  )}
                </div>
              )}
            </div>

            {/* Subtle indicator of time passing - for reflection data */}
            {isSearching && userActions.length > 3 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-muted-foreground/50 text-xs"
              >
                Still working...
              </motion.p>
            )}
          </div>
        </ExperienceWrapper>
      </div>
    );
  }

  // Reflection stage
  const wasRestless = userActions.length > 5;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 pt-16">


      <ExperienceWrapper stage="reflection">
        <ReflectionCard>
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
                You searched. Then you waited. The screen was empty. No progress bar, no spinner, no indication that anything was happening.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-display font-medium text-foreground">
                How it felt
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {wasRestless
                  ? `You clicked or typed ${userActions.length} times while waiting. Not because you needed to—but because the silence was uncomfortable. You filled the void with activity.`
                  : "You waited patiently. But every second felt longer than it was. Time stretches in silence."
                }
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-display font-medium text-foreground">
                What the system did
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                The system was working. It was processing your request. But it didn't tell you. That 8-second wait could have felt like 2 seconds with proper feedback. Instead, it felt like forever.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="pt-6 border-t border-border"
            >
              <p className="text-foreground/60 text-sm mb-6">
                Perceived time is designed time.
              </p>
              <button
                onClick={onComplete}
                className="px-6 py-3 bg-primary text-primary-foreground font-display rounded-md hover:bg-primary/90 transition-colors"
              >
                Continue
              </button>
            </motion.div>
          </div>
        </ReflectionCard>
      </ExperienceWrapper>
    </div>
  );
};
