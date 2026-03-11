import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SDLCProvider, useSDLC } from "./SDLCContext";
import { Layer2Intro } from "./Layer2Intro";
import { DiscoveryPhaseNew } from "./phases/DiscoveryPhaseNew";
import { RequirementsPhaseNew } from "./phases/RequirementsPhaseNew";
import { DesignPhaseNew } from "./phases/DesignPhaseNew";
import { DevelopmentPhase, DevScreen } from "./phases/DevelopmentPhase";
import { TestingPhase, TestScreen } from "./phases/TestingPhase";
import { LaunchPhase, LaunchScreen } from "./phases/LaunchPhase";
import { MaintenancePhase, MaintenanceStage } from "./phases/MaintenancePhase";
import { Layer2Complete } from "./Layer2Complete";

export type { DevScreen, TestScreen, LaunchScreen, MaintenanceStage };

export type Layer2Step =
  | "intro"
  | "discovery"
  | "requirements"
  | "design"
  | "development"
  | "testing"
  | "launch"
  | "maintenance"
  | "complete";

export type DiscoveryScreen =
  | "email"
  | "brief"
  | "persona"
  | "pressure"
  | "consequence"
  | "rootcause"
  | "principle";

export type RequirementsScreen =
  | "storybridge"
  | "thebrief"
  | "spotvagueness"
  | "definewithrahul"
  | "prioritymatrix"
  | "clientpushback"
  | "consequence"
  | "takeaway";

export type DesignScreen =
  | "storybridge"
  | "wireframing"
  | "visualdesign"
  | "navigation"
  | "forms"
  | "testing"
  | "reflection"
  | "consequence"
  | "takeaway";

export const LAYER2_ORDER: Layer2Step[] = [
  "intro",
  "discovery",
  "requirements",
  "design",
  "development",
  "testing",
  "launch",
  "maintenance",
  "complete"
];

export const DISCOVERY_SCREENS: DiscoveryScreen[] = [
  "clientchat",
  "teamchat",
  "email",
  "brief",
  "persona",
  "pressure",
  "consequence",
  "comparison",
  "rootcause",
  "principle",
  "discoverymore",
  "takeaway"
] as any[];

export const REQUIREMENTS_SCREENS: RequirementsScreen[] = [
  "storybridge",
  "thebrief",
  "spotvagueness",
  "definewithrahul",
  "prioritymatrix",
  "clientpushback",
  "consequence",
  "takeaway"
];

export const DESIGN_SCREENS: DesignScreen[] = [
  "storybridge",
  "wireframing",
  "visualdesign",
  "navigation",
  "forms",
  "testing",
  "reflection",
  "consequence",
  "takeaway"
];

export const DEV_SCREENS: DevScreen[] = [
  "storybridge",
  "techstack",
  "assembly",
  "integration",
  "report",
  "takeaway"
];

export const TEST_SCREENS: TestScreen[] = [
  "storybridge",
  "buggen",
  "dashboard",
  "report"
];

export const LAUNCH_SCREENS: LaunchScreen[] = [
  "storybridge",
  "deploy",
  "livefeed",
  "scorecard"
];

export const MAINTENANCE_STAGES: MaintenanceStage[] = [
  "context",
  "interaction",
  "reflection"
];

interface Layer2ControllerInnerProps {
  onComplete: () => void;
  onRestart: () => void;
  initialStep?: Layer2Step;
  initialDiscoveryScreen?: DiscoveryScreen;
  initialRequirementsScreen?: RequirementsScreen;
  initialDesignScreen?: DesignScreen;
  initialDevScreen?: DevScreen;
  initialTestScreen?: TestScreen;
  initialLaunchScreen?: LaunchScreen;
  initialMaintenanceStage?: MaintenanceStage;
}

const Layer2ControllerInner = ({
  onComplete,
  onRestart,
  initialStep,
  initialDiscoveryScreen,
  initialRequirementsScreen,
  initialDesignScreen,
  initialDevScreen,
  initialTestScreen,
  initialLaunchScreen,
  initialMaintenanceStage
}: Layer2ControllerInnerProps) => {
  const [currentStep, setCurrentStep] = useState<Layer2Step>(initialStep || "intro");
  const { reset } = useSDLC();

  const goToNext = useCallback(() => {
    const currentIndex = LAYER2_ORDER.indexOf(currentStep);
    if (currentIndex < LAYER2_ORDER.length - 1) {
      setCurrentStep(LAYER2_ORDER[currentIndex + 1]);
    }
  }, [currentStep]);

  const restart = useCallback(() => {
    reset();
    setCurrentStep("intro");
    onRestart();
  }, [reset, onRestart]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {currentStep === "intro" && (
          <Layer2Intro onStart={goToNext} />
        )}

        {currentStep === "discovery" && (
          <DiscoveryPhaseNew onComplete={goToNext} initialScreen={initialDiscoveryScreen} />
        )}

        {currentStep === "requirements" && (
          <RequirementsPhaseNew onComplete={goToNext} initialScreen={initialRequirementsScreen} />
        )}

        {currentStep === "design" && (
          <DesignPhaseNew onComplete={goToNext} initialScreen={initialDesignScreen} />
        )}

        {currentStep === "development" && (
          <DevelopmentPhase onComplete={goToNext} initialScreen={initialDevScreen} />
        )}

        {currentStep === "testing" && (
          <TestingPhase onComplete={goToNext} initialScreen={initialTestScreen} />
        )}

        {currentStep === "launch" && (
          <LaunchPhase onComplete={goToNext} initialScreen={initialLaunchScreen} />
        )}

        {currentStep === "maintenance" && (
          <MaintenancePhase onComplete={goToNext} initialStage={initialMaintenanceStage} />
        )}

        {currentStep === "complete" && (
          <Layer2Complete onRestart={restart} onNext={onComplete} />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

interface Layer2ControllerProps extends Layer2ControllerInnerProps { }

export const Layer2Controller = (props: Layer2ControllerProps) => {
  return (
    <SDLCProvider>
      <Layer2ControllerInner {...props} />
    </SDLCProvider>
  );
};
