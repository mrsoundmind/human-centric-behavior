import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGlobalExperience } from "../GlobalExperienceContext";
import { PatternRecognitionPhase } from "./PatternRecognitionPhase";
import { UXNamingPhase } from "./UXNamingPhase";
import { Layer15Complete } from "./Layer15Complete";

type Layer15Step = 
  | "pattern-recognition"
  | "ux-naming"
  | "complete";

const LAYER15_ORDER: Layer15Step[] = [
  "pattern-recognition",
  "ux-naming",
  "complete"
];

interface Layer15ControllerProps {
  onComplete: () => void;
  onBack: () => void;
}

export const Layer15Controller = ({ onComplete, onBack }: Layer15ControllerProps) => {
  const [currentStep, setCurrentStep] = useState<Layer15Step>("pattern-recognition");
  const { completePatternRecognition, completeUXNaming } = useGlobalExperience();
  
  const goToNext = useCallback(() => {
    const currentIndex = LAYER15_ORDER.indexOf(currentStep);
    if (currentIndex < LAYER15_ORDER.length - 1) {
      const nextStep = LAYER15_ORDER[currentIndex + 1];
      setCurrentStep(nextStep);
      
      // Track completion
      if (currentStep === "pattern-recognition") {
        completePatternRecognition();
      } else if (currentStep === "ux-naming") {
        completeUXNaming();
      }
    }
  }, [currentStep, completePatternRecognition, completeUXNaming]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {currentStep === "pattern-recognition" && (
          <PatternRecognitionPhase onComplete={goToNext} onBack={onBack} />
        )}
        
        {currentStep === "ux-naming" && (
          <UXNamingPhase onComplete={goToNext} />
        )}
        
        {currentStep === "complete" && (
          <Layer15Complete onContinue={onComplete} />
        )}
      </motion.div>
    </AnimatePresence>
  );
};
