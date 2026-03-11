import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GlobalExperienceProvider, useGlobalExperience } from "./GlobalExperienceContext";
import { LayerSwitcher } from "./LayerSwitcher";
import { IntroScreen } from "./IntroScreen";
import { DoorExperience } from "./DoorExperience";
import { SilentButtonExperience } from "./SilentButtonExperience";
import { ConfusingFormExperience } from "./ConfusingFormExperience";
import { DelayedResponseExperience } from "./DelayedResponseExperience";
import { PatternPause } from "./PatternPause";
import { BridgeToWork } from "./BridgeToWork";
import { Layer15Controller } from "./layer15/Layer15Controller";
import { Layer2Controller, Layer2Step, DiscoveryScreen, RequirementsScreen, DesignScreen, DevScreen, TestScreen, LaunchScreen, MaintenanceStage, LAYER2_ORDER, DISCOVERY_SCREENS, REQUIREMENTS_SCREENS, DESIGN_SCREENS } from "./layer2/Layer2Controller";
import { InternalExperience } from "./internal/InternalExperience";
import { DebugMenu } from "../common/DebugMenu";

type ExperienceStep =
  | "intro"
  | "door"
  | "silent-button"
  | "confusing-form"
  | "delayed-response"
  | "pattern-pause"
  | "bridge"
  | "layer15"
  | "layer2"
  | "internal-training"
  | "internal-intro";

const EXPERIENCE_ORDER: ExperienceStep[] = [
  "intro",
  "door",
  "silent-button",
  "confusing-form",
  "delayed-response",
  "pattern-pause",
  "bridge",
  "layer15",
  "layer2",
  "internal-training"
];

// ... (keep screen names constants if present, skipping for brevity in replacement if possible, but replace tool needs context)
// Actually I will just target the Inner component to avoid messing with constants block if I can match content. 

const ExperienceControllerInner = () => {
  const [currentStep, setCurrentStep] = useState<ExperienceStep>("intro");
  const [layer2InitialStep, setLayer2InitialStep] = useState<Layer2Step | undefined>(undefined);
  const [layer2InitialScreen, setLayer2InitialScreen] = useState<DiscoveryScreen | undefined>(undefined);
  const [layer2InitialRequirementsScreen, setLayer2InitialRequirementsScreen] = useState<RequirementsScreen | undefined>(undefined);
  const [layer2InitialDesignScreen, setLayer2InitialDesignScreen] = useState<DesignScreen | undefined>(undefined);

  // NEW STATES
  const [layer2InitialDevScreen, setLayer2InitialDevScreen] = useState<DevScreen | undefined>(undefined);
  const [layer2InitialTestScreen, setLayer2InitialTestScreen] = useState<TestScreen | undefined>(undefined);
  const [layer2InitialLaunchScreen, setLayer2InitialLaunchScreen] = useState<LaunchScreen | undefined>(undefined);
  const [layer2InitialMaintenanceStage, setLayer2InitialMaintenanceStage] = useState<MaintenanceStage | undefined>(undefined);

  const [layer2Key, setLayer2Key] = useState(0); // Force remount when changing screens
  const { state, completeLayer1Experience, setPatternPauseSeen, setBridgeSeen, setCurrentLayer } = useGlobalExperience();

  const goToNext = useCallback(() => {
    // ... (keep logic)
    const currentIndex = EXPERIENCE_ORDER.indexOf(currentStep);
    if (currentIndex < EXPERIENCE_ORDER.length - 1) {
      const nextStep = EXPERIENCE_ORDER[currentIndex + 1];
      setCurrentStep(nextStep);

      // Track completions
      if (["door", "silent-button", "confusing-form", "delayed-response"].includes(currentStep)) {
        completeLayer1Experience(currentStep);
      }
      if (currentStep === "pattern-pause") {
        setPatternPauseSeen();
      }
      if (currentStep === "bridge") {
        setBridgeSeen();
      }
      if (nextStep === "layer15") {
        setCurrentLayer("layer1.5");
      }
      if (nextStep === "layer2") {
        setCurrentLayer("layer2");
        setLayer2InitialStep(undefined);
        setLayer2InitialScreen(undefined);
        setLayer2InitialRequirementsScreen(undefined);
        setLayer2InitialDesignScreen(undefined);
        setLayer2InitialDevScreen(undefined);
        setLayer2InitialTestScreen(undefined);
        setLayer2InitialLaunchScreen(undefined);
        setLayer2InitialMaintenanceStage(undefined);
      }
    }
  }, [currentStep, completeLayer1Experience, setPatternPauseSeen, setBridgeSeen, setCurrentLayer]);

  const restart = useCallback(() => {
    setCurrentStep("intro");
    setCurrentLayer("layer1");
    setLayer2InitialStep(undefined);
    setLayer2InitialScreen(undefined);
    setLayer2InitialRequirementsScreen(undefined);
    setLayer2InitialDesignScreen(undefined);
    setLayer2InitialDevScreen(undefined);
    setLayer2InitialTestScreen(undefined);
    setLayer2InitialLaunchScreen(undefined);
    setLayer2InitialMaintenanceStage(undefined);
  }, [setCurrentLayer]);

  const goBackToLayer1 = useCallback(() => {
    setCurrentStep("bridge");
    setCurrentLayer("layer1");
  }, [setCurrentLayer]);

  // Debug: Jump to specific Layer 2 screen
  const jumpToLayer2Screen = useCallback((
    step: Layer2Step,
    disc?: DiscoveryScreen,
    req?: RequirementsScreen,
    des?: DesignScreen,
    dev?: DevScreen,
    test?: TestScreen,
    launch?: LaunchScreen,
    maint?: MaintenanceStage
  ) => {
    setCurrentStep("layer2");
    setCurrentLayer("layer2");
    setLayer2InitialStep(step);
    setLayer2InitialScreen(disc);
    setLayer2InitialRequirementsScreen(req);
    setLayer2InitialDesignScreen(des);
    setLayer2InitialDevScreen(dev);
    setLayer2InitialTestScreen(test);
    setLayer2InitialLaunchScreen(launch);
    setLayer2InitialMaintenanceStage(maint);
    setLayer2Key(prev => prev + 1); // Force remount
  }, [setCurrentLayer]);

  // Show layer switcher always
  const showLayerSwitcher = true;

  // Determine if we need to show a placeholder for the current layer
  // Steps that are primarily Layer 1 experiences don't have native Layer 1.5/2 content yet
  const LAYER1_CENTRIC_STEPS: ExperienceStep[] = [
    "intro",
    "door",
    "silent-button",
    "confusing-form",
    "delayed-response",
    "pattern-pause",
    "bridge"
  ];

  const needsPlaceholder = LAYER1_CENTRIC_STEPS.includes(currentStep) && state.currentLayer !== "layer1";

  return (
    <>
      {showLayerSwitcher && <LayerSwitcher />}

      {needsPlaceholder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="max-w-md w-full text-center space-y-6">
            <h2 className="text-3xl font-display font-semibold text-foreground">
              {state.currentLayer === "layer1.5" ? "Understand" : "Apply"} Perspective
            </h2>
            <p className="text-muted-foreground text-lg">
              Viewing the <span className="font-medium text-foreground">{currentStep.replace("-", " ")}</span> experience through the lens of {state.currentLayer === "layer1.5" ? "Patterns" : "Delivery"}.
            </p>
            <div className="p-4 bg-secondary/30 rounded-lg border border-border/50">
              <p className="text-sm text-muted-foreground">
                Phase remains active. Switch back to "Feel" to resume interaction.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {currentStep === "intro" && (
            <IntroScreen onStart={goToNext} />
          )}

          {currentStep === "door" && (
            <DoorExperience onComplete={goToNext} />
          )}

          {currentStep === "silent-button" && (
            <SilentButtonExperience onComplete={goToNext} />
          )}

          {currentStep === "confusing-form" && (
            <ConfusingFormExperience onComplete={goToNext} />
          )}

          {currentStep === "delayed-response" && (
            <DelayedResponseExperience onComplete={goToNext} />
          )}

          {currentStep === "pattern-pause" && (
            <PatternPause onComplete={goToNext} />
          )}

          {currentStep === "bridge" && (
            <BridgeToWork onComplete={goToNext} />
          )}

          {currentStep === "layer15" && (
            <Layer15Controller onComplete={goToNext} onBack={goBackToLayer1} />
          )}

          {currentStep === "layer2" && (
            <Layer2Controller
              key={layer2Key}
              onComplete={goToNext}
              onRestart={restart}
              initialStep={layer2InitialStep}
              initialDiscoveryScreen={layer2InitialScreen}
              initialRequirementsScreen={layer2InitialRequirementsScreen}
              initialDesignScreen={layer2InitialDesignScreen}
              initialDevScreen={layer2InitialDevScreen}
              initialTestScreen={layer2InitialTestScreen}
              initialLaunchScreen={layer2InitialLaunchScreen}
              initialMaintenanceStage={layer2InitialMaintenanceStage}
            />
          )}


          {/* INTERNAL ROUTING */}
          {(currentStep === "internal-training" ||
            ["internal-intro", "onboarding-brief", "onboarding-war-room", "onboarding-system-reaction", "onboarding-decision-lens", "onboarding-identity", "designation", "sales-journey", "pipeline", "simulation", "experiential", "briefing"].includes(currentStep)
          ) && (
              <InternalExperience
                onBack={restart}
                initialStep={
                  currentStep === "internal-training" ? undefined :
                    currentStep === "internal-intro" ? "intro" :
                      (currentStep as any)
                }
              />
            )}
        </motion.div>
      </AnimatePresence>

      {/* Debug Menu */}
      <DebugMenu
        currentStep={currentStep}
        onJumpToStep={(step) => {
          setCurrentStep(step);
          if (step === "layer15") setCurrentLayer("layer1.5");
          else if (step === "layer2") {
            setCurrentLayer("layer2");
            setLayer2InitialStep(undefined);
            setLayer2InitialScreen(undefined);
            setLayer2Key(prev => prev + 1);
          }
          else if (step === "internal-training") {
            // Internal training logic if needed
          }
          else setCurrentLayer("layer1");
        }}
        onJumpToLayer2={jumpToLayer2Screen}
      />
    </>
  );
};

export const ExperienceController = () => {
  return (
    <GlobalExperienceProvider>
      <ExperienceControllerInner />
    </GlobalExperienceProvider>
  );
};
