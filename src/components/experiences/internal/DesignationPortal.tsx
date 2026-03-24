/**
 * DesignationPortal — entry point wrapping DesignationSelect with mode routing.
 *
 * Flow:
 *   "select"    → DesignationSelect (role picker)
 *   "briefing"  → RoleBriefingView (role briefing + mode selector)
 *   "quick"     → delegates to parent via onStartQuickMode (existing role journeys)
 *   "full-sdlc" → Full SDLC journey: ScenarioRenderer + usePhaseNavigation + useDesignationStore
 *
 * All 3 roles (PM, Developer, QA) have full SDLC journeys with 12 scenarios each.
 */

import { useState, useEffect } from "react";
import { DesignationSelect, Designation } from "./DesignationSelect";
import { RoleBriefingView } from "./RoleBriefingView";
import { JourneyCompleteView } from "./JourneyCompleteView";
import { ScenarioRenderer } from "./designation-portal/ScenarioRenderer";
import { pmDiscoveryScenarios } from "../../../../data/scenarios/pm/discovery";
import { pmRequirementsScenarios } from "../../../../data/scenarios/pm/requirements";
import { pmDesignScenarios } from "../../../../data/scenarios/pm/design";
import { developerDiscoveryScenarios } from "../../../../data/scenarios/developer/discovery";
import { developerRequirementsScenarios } from "../../../../data/scenarios/developer/requirements";
import { developerDesignScenarios } from "../../../../data/scenarios/developer/design";
import { qaDiscoveryScenarios } from "../../../../data/scenarios/qa/discovery";
import { qaRequirementsScenarios } from "../../../../data/scenarios/qa/requirements";
import { qaDesignScenarios } from "../../../../data/scenarios/qa/design";
import { salesDiscoveryScenarios } from "../../../../data/scenarios/sales/discovery";
import { salesRequirementsScenarios } from "../../../../data/scenarios/sales/requirements";
import { salesDesignScenarios } from "../../../../data/scenarios/sales/design";
import { designerDiscoveryScenarios } from "../../../../data/scenarios/designer/discovery";
import { designerRequirementsScenarios } from "../../../../data/scenarios/designer/requirements";
import { designerDesignScenarios } from "../../../../data/scenarios/designer/design";
import { baDiscoveryScenarios } from "../../../../data/scenarios/ba/discovery";
import { baRequirementsScenarios } from "../../../../data/scenarios/ba/requirements";
import { baDesignScenarios } from "../../../../data/scenarios/ba/design";
import { crmDiscoveryScenarios } from "../../../../data/scenarios/crm/discovery";
import { crmRequirementsScenarios } from "../../../../data/scenarios/crm/requirements";
import { crmDesignScenarios } from "../../../../data/scenarios/crm/design";
import { strategyDiscoveryScenarios } from "../../../../data/scenarios/strategy/discovery";
import { strategyRequirementsScenarios } from "../../../../data/scenarios/strategy/requirements";
import { strategyDesignScenarios } from "../../../../data/scenarios/strategy/design";
import { useDesignationStore } from "../../../state/designation-store";
import { usePhaseNavigation } from "../../../state/hooks/usePhaseNavigation";
import type { Choice, SDLCPhase, ScenarioConfig, Designation as DesignationType } from "../../../../data/scenarios/types";

// ─── Props ────────────────────────────────────────────────────────────────────

interface DesignationPortalProps {
  onStartQuickMode: (role: Designation) => void;
  onComplete: () => void;
}

// ─── Phase-Grouped Scenario Data ──────────────────────────────────────────────

type SDLCPhaseGroup = { phase: SDLCPhase; scenarios: ScenarioConfig[] };

const ROLE_PHASE_GROUPS: Record<string, SDLCPhaseGroup[]> = {
  pm: [
    { phase: "discovery", scenarios: pmDiscoveryScenarios },
    { phase: "requirements", scenarios: pmRequirementsScenarios },
    { phase: "design", scenarios: pmDesignScenarios },
  ],
  developer: [
    { phase: "discovery", scenarios: developerDiscoveryScenarios },
    { phase: "requirements", scenarios: developerRequirementsScenarios },
    { phase: "design", scenarios: developerDesignScenarios },
  ],
  qa: [
    { phase: "discovery", scenarios: qaDiscoveryScenarios },
    { phase: "requirements", scenarios: qaRequirementsScenarios },
    { phase: "design", scenarios: qaDesignScenarios },
  ],
  sales: [
    { phase: "discovery", scenarios: salesDiscoveryScenarios },
    { phase: "requirements", scenarios: salesRequirementsScenarios },
    { phase: "design", scenarios: salesDesignScenarios },
  ],
  designer: [
    { phase: "discovery", scenarios: designerDiscoveryScenarios },
    { phase: "requirements", scenarios: designerRequirementsScenarios },
    { phase: "design", scenarios: designerDesignScenarios },
  ],
  ba: [
    { phase: "discovery", scenarios: baDiscoveryScenarios },
    { phase: "requirements", scenarios: baRequirementsScenarios },
    { phase: "design", scenarios: baDesignScenarios },
  ],
  crm: [
    { phase: "discovery", scenarios: crmDiscoveryScenarios },
    { phase: "requirements", scenarios: crmRequirementsScenarios },
    { phase: "design", scenarios: crmDesignScenarios },
  ],
  strategy: [
    { phase: "discovery", scenarios: strategyDiscoveryScenarios },
    { phase: "requirements", scenarios: strategyRequirementsScenarios },
    { phase: "design", scenarios: strategyDesignScenarios },
  ],
};

const SDLC_PHASE_LABELS: Record<SDLCPhase, string> = {
  discovery: "Discovery",
  requirements: "Requirements",
  design: "Design",
  development: "Development",
  testing: "Testing",
  launch: "Launch",
  maintenance: "Maintenance",
};

// ─── Full SDLC Journey (All Roles) ───────────────────────────────────────────

interface FullSDLCJourneyProps {
  role: Designation;
  onComplete: () => void;
}

const FullSDLCJourney = ({ role, onComplete }: FullSDLCJourneyProps) => {
  const recordDecision = useDesignationStore((s) => s.recordDecision);
  const initRole = useDesignationStore((s) => s.initRole);
  const advancePhase = useDesignationStore((s) => s.advancePhase);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [isDebriefVisible, setIsDebriefVisible] = useState(false);
  const [sdlcPhaseIndex, setSDLCPhaseIndex] = useState(0);

  const phaseGroups = ROLE_PHASE_GROUPS[role] ?? [];
  const currentPhaseGroup = phaseGroups[sdlcPhaseIndex];

  useEffect(() => {
    if (phaseGroups.length > 0) {
      initRole(role as DesignationType, phaseGroups[0].phase);
    }
  }, [role]);

  const nav = usePhaseNavigation({
    phases: currentPhaseGroup?.scenarios ?? [],
    onComplete: () => {
      if (sdlcPhaseIndex < phaseGroups.length - 1) {
        const nextPhase = phaseGroups[sdlcPhaseIndex + 1].phase;
        advancePhase(role as DesignationType, nextPhase);
        setSDLCPhaseIndex((i) => i + 1);
        setSelectedChoiceId(null);
        setIsDebriefVisible(false);
      } else {
        onComplete();
      }
    },
  });

  if (!currentPhaseGroup) return null;

  const handleChoiceSelected = (choice: Choice) => {
    setSelectedChoiceId(choice.id);
    setIsDebriefVisible(true);
    recordDecision({
      choiceId: choice.id,
      frictionTag: choice.frictionTag,
      timestamp: Date.now(),
      phase: nav.current.phase,
      role: role as DesignationType,
    });
    nav.setHasDecision(true);
  };

  const handleAdvance = () => {
    setSelectedChoiceId(null);
    setIsDebriefVisible(false);
    nav.advance();
  };

  return (
    <div className="relative">
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
        <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">
          Phase {sdlcPhaseIndex + 1} of {phaseGroups.length}: {SDLC_PHASE_LABELS[currentPhaseGroup.phase]}
        </span>
      </div>
      <ScenarioRenderer
        scenario={nav.current}
        onChoiceSelected={handleChoiceSelected}
        selectedChoiceId={selectedChoiceId}
        onAdvance={handleAdvance}
        isDebriefVisible={isDebriefVisible}
        mode="active"
      />
    </div>
  );
};

// ─── DesignationPortal ───────────────────────────────────────────────────────

type PortalMode = "select" | "briefing" | "full-sdlc" | "quick" | "complete";

export const DesignationPortal = ({ onStartQuickMode, onComplete }: DesignationPortalProps) => {
  const [selectedRole, setSelectedRole] = useState<Designation | null>(null);
  const [completedRole, setCompletedRole] = useState<Designation | null>(null);
  const [mode, setMode] = useState<PortalMode>("select");
  const completeRole = useDesignationStore((s) => s.completeRole);

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
    return (
      <FullSDLCJourney
        role={selectedRole}
        onComplete={() => {
          completeRole(selectedRole as DesignationType);
          setCompletedRole(selectedRole as DesignationType);
          setMode("complete");
        }}
      />
    );
  }

  if (mode === "complete" && completedRole) {
    return (
      <JourneyCompleteView
        role={completedRole}
        onReturnHome={() => {
          setCompletedRole(null);
          setMode("select");
        }}
      />
    );
  }

  return null;
};
