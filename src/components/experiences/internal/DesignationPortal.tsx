/**
 * DesignationPortal — entry point wrapping DesignationSelect with mode routing.
 *
 * Flow:
 *   "select"    → DesignationSelect (role picker)
 *   "briefing"  → RoleBriefingView (role briefing + mode selector)
 *   "quick"     → delegates to parent via onStartQuickMode (existing role journeys)
 *   "full-sdlc" → Full SDLC journey: ScenarioRenderer + usePhaseNavigation + useDesignationStore
 *
 * Phase 1 stub: Only PM has scenario data. Other roles show a "coming soon" placeholder.
 * Real scenario content for all roles is authored in Phase 3.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { DesignationSelect, Designation } from "./DesignationSelect";
import { RoleBriefingView } from "./RoleBriefingView";
import { ScenarioRenderer } from "./designation-portal/ScenarioRenderer";
import { pmDiscoveryScenarios } from "../../../../data/scenarios/pm/discovery";
import { useDesignationStore } from "../../../state/designation-store";
import { usePhaseNavigation } from "../../../state/hooks/usePhaseNavigation";
import type { Choice } from "../../../../data/scenarios/types";

// ─── Props ────────────────────────────────────────────────────────────────────

interface DesignationPortalProps {
  onStartQuickMode: (role: Designation) => void;
  onComplete: () => void;
}

// ─── Full SDLC Journey (PM — Phase 1 stub) ───────────────────────────────────

interface FullSDLCJourneyProps {
  role: Designation;
  onComplete: () => void;
}

const FullSDLCJourney = ({ role, onComplete }: FullSDLCJourneyProps) => {
  const recordDecision = useDesignationStore((s) => s.recordDecision);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [isDebriefVisible, setIsDebriefVisible] = useState(false);

  const nav = usePhaseNavigation({
    phases: pmDiscoveryScenarios,
    onComplete,
  });

  if (role !== "pm") {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xl text-center space-y-6"
        >
          <div className="text-4xl">🚧</div>
          <h2 className="text-2xl font-display font-bold text-white">
            Full SDLC Journey for {role.charAt(0).toUpperCase() + role.slice(1)} — Coming Soon
          </h2>
          <p className="text-gray-400 leading-relaxed">
            Full SDLC scenario content for this role is being authored in Phase 3. In the
            meantime, use Quick Scenarios to experience the existing journey.
          </p>
          <button
            onClick={onComplete}
            className="px-8 py-3 bg-white/10 border border-white/20 text-white rounded-full hover:bg-white/20 transition-colors text-sm font-mono"
          >
            Back to Role Selection
          </button>
        </motion.div>
      </div>
    );
  }

  const handleChoiceSelected = (choice: Choice) => {
    setSelectedChoiceId(choice.id);
    setIsDebriefVisible(true);
    recordDecision({
      choiceId: choice.id,
      frictionTag: choice.frictionTag,
      timestamp: Date.now(),
      phase: nav.current.phase,
      role: "pm",
    });
    nav.setHasDecision(true);
  };

  const handleAdvance = () => {
    setSelectedChoiceId(null);
    setIsDebriefVisible(false);
    nav.advance();
  };

  return (
    <ScenarioRenderer
      scenario={nav.current}
      onChoiceSelected={handleChoiceSelected}
      selectedChoiceId={selectedChoiceId}
      onAdvance={handleAdvance}
      isDebriefVisible={isDebriefVisible}
      mode="active"
    />
  );
};

// ─── DesignationPortal ───────────────────────────────────────────────────────

type PortalMode = "select" | "briefing" | "full-sdlc" | "quick";

export const DesignationPortal = ({ onStartQuickMode, onComplete }: DesignationPortalProps) => {
  const [selectedRole, setSelectedRole] = useState<Designation | null>(null);
  const [mode, setMode] = useState<PortalMode>("select");

  if (mode === "select") {
    return (
      <DesignationSelect
        onSelect={(role) => {
          setSelectedRole(role);
          setMode("briefing");
        }}
      />
    );
  }

  if (mode === "briefing" && selectedRole) {
    return (
      <RoleBriefingView
        role={selectedRole}
        onSelectMode={(m) => setMode(m)}
        onBack={() => setMode("select")}
      />
    );
  }

  if (mode === "quick" && selectedRole) {
    // Delegate to parent — existing role journeys handle this path
    onStartQuickMode(selectedRole);
    return null;
  }

  if (mode === "full-sdlc" && selectedRole) {
    return <FullSDLCJourney role={selectedRole} onComplete={onComplete} />;
  }

  return null;
};
