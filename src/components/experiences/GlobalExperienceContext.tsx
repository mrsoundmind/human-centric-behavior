import { createContext, useContext, useState, useCallback, ReactNode, useMemo, useEffect } from "react";

// Types for the global experience state
export type Layer = "layer1" | "layer1.5" | "layer2";
export type LayerProgress = "not-started" | "in-progress" | "completed";

// Layer 1 completion tracking
export interface Layer1State {
  completedExperiences: string[];
  patternPauseSeen: boolean;
  bridgeSeen: boolean;
}

// Layer 1.5 completion tracking  
export interface Layer15State {
  patternRecognitionComplete: boolean;
  uxNamedPhaseComplete: boolean;
  patternsObserved: string[];
}

// Layer 2 state is managed by SDLCContext, but we track completion here
export interface Layer2State {
  started: boolean;
  currentPhase: string;
  completed: boolean;
}

// Global state
export interface GlobalExperienceState {
  currentLayer: Layer;
  layer1: Layer1State;
  layer15: Layer15State;
  layer2: Layer2State;
  canAccessLayer: (layer: Layer) => boolean;
}

const initialLayer1: Layer1State = {
  completedExperiences: [],
  patternPauseSeen: false,
  bridgeSeen: false,
};

const initialLayer15: Layer15State = {
  patternRecognitionComplete: false,
  uxNamedPhaseComplete: false,
  patternsObserved: [],
};

const initialLayer2: Layer2State = {
  started: false,
  currentPhase: "intro",
  completed: false,
};

interface GlobalExperienceContextType {
  state: GlobalExperienceState;
  // Layer switching
  setCurrentLayer: (layer: Layer) => void;
  canAccessLayer: (layer: Layer) => boolean;
  getLayerProgress: (layer: Layer) => LayerProgress;
  // Layer 1 actions
  completeLayer1Experience: (experienceId: string) => void;
  setPatternPauseSeen: () => void;
  setBridgeSeen: () => void;
  // Layer 1.5 actions
  observePattern: (patternId: string) => void;
  completePatternRecognition: () => void;
  completeUXNaming: () => void;
  // Layer 2 actions
  startLayer2: () => void;
  setLayer2Phase: (phase: string) => void;
  completeLayer2: () => void;
  // Reset
  reset: () => void;
}

const GlobalExperienceContext = createContext<GlobalExperienceContextType | null>(null);

export const useGlobalExperience = () => {
  const context = useContext(GlobalExperienceContext);
  if (!context) {
    throw new Error("useGlobalExperience must be used within GlobalExperienceProvider");
  }
  return context;
};

export const GlobalExperienceProvider = ({ children }: { children: ReactNode }) => {
  const [currentLayer, setCurrentLayerState] = useState<Layer>("layer1");
  const [layer1, setLayer1] = useState<Layer1State>(initialLayer1);
  const [layer15, setLayer15] = useState<Layer15State>(initialLayer15);
  const [layer2, setLayer2] = useState<Layer2State>(initialLayer2);

  const [maxUnlockedLayer, setMaxUnlockedLayer] = useState<Layer>("layer1");

  // Load persistence on mount
  useEffect(() => {
    const saved = localStorage.getItem("hcl_max_unlocked_layer");
    if (saved === "layer1.5" || saved === "layer2") {
      setMaxUnlockedLayer(saved as Layer);
    }
  }, []);

  // Update maxUnlockedLayer based on progress
  useEffect(() => {
    let newMax = maxUnlockedLayer;

    // Check if Layer 1.5 should be unlocked
    if (layer1.completedExperiences.length >= 2) {
      if (newMax === "layer1") {
        newMax = "layer1.5";
      }
    }

    // Check if Layer 2 should be unlocked
    if (layer15.uxNamedPhaseComplete) {
      newMax = "layer2";
    }

    // Only update if changed
    if (newMax !== maxUnlockedLayer) {
      setMaxUnlockedLayer(newMax);
      localStorage.setItem("hcl_max_unlocked_layer", newMax);
    }
  }, [layer1.completedExperiences.length, layer15.uxNamedPhaseComplete, maxUnlockedLayer]);

  const canAccessLayer = useCallback((layer: Layer): boolean => {
    // Layer 1 is always accessible
    if (layer === "layer1") return true;

    // Check against max unlocked layer
    const layerOrder = ["layer1", "layer1.5", "layer2"];
    const targetIndex = layerOrder.indexOf(layer);
    const maxIndex = layerOrder.indexOf(maxUnlockedLayer);

    return targetIndex <= maxIndex;
  }, [maxUnlockedLayer]);

  const getLayerProgress = useCallback((layer: Layer): LayerProgress => {
    if (layer === "layer1") {
      if (layer1.completedExperiences.length === 0) return "not-started";
      if (layer1.bridgeSeen) return "completed";
      return "in-progress";
    }

    if (layer === "layer1.5") {
      if (!layer15.patternRecognitionComplete && layer15.patternsObserved.length === 0) return "not-started";
      if (layer15.uxNamedPhaseComplete) return "completed";
      return "in-progress";
    }

    if (layer === "layer2") {
      if (!layer2.started) return "not-started";
      if (layer2.completed) return "completed";
      return "in-progress";
    }

    return "not-started";
  }, [layer1, layer15, layer2]);

  const setCurrentLayer = useCallback((layer: Layer) => {
    if (canAccessLayer(layer)) {
      setCurrentLayerState(layer);
    }
  }, [canAccessLayer]);

  // Layer 1 actions
  const completeLayer1Experience = useCallback((experienceId: string) => {
    setLayer1(prev => ({
      ...prev,
      completedExperiences: prev.completedExperiences.includes(experienceId)
        ? prev.completedExperiences
        : [...prev.completedExperiences, experienceId]
    }));
  }, []);

  const setPatternPauseSeen = useCallback(() => {
    setLayer1(prev => ({ ...prev, patternPauseSeen: true }));
  }, []);

  const setBridgeSeen = useCallback(() => {
    setLayer1(prev => ({ ...prev, bridgeSeen: true }));
  }, []);

  // Layer 1.5 actions
  const observePattern = useCallback((patternId: string) => {
    setLayer15(prev => ({
      ...prev,
      patternsObserved: prev.patternsObserved.includes(patternId)
        ? prev.patternsObserved
        : [...prev.patternsObserved, patternId]
    }));
  }, []);

  const completePatternRecognition = useCallback(() => {
    setLayer15(prev => ({ ...prev, patternRecognitionComplete: true }));
  }, []);

  const completeUXNaming = useCallback(() => {
    setLayer15(prev => ({ ...prev, uxNamedPhaseComplete: true }));
  }, []);

  // Layer 2 actions
  const startLayer2 = useCallback(() => {
    setLayer2(prev => ({ ...prev, started: true }));
  }, []);

  const setLayer2Phase = useCallback((phase: string) => {
    setLayer2(prev => ({ ...prev, currentPhase: phase }));
  }, []);

  const completeLayer2 = useCallback(() => {
    setLayer2(prev => ({ ...prev, completed: true }));
  }, []);

  const reset = useCallback(() => {
    setCurrentLayerState("layer1");
    setLayer1(initialLayer1);
    setLayer15(initialLayer15);
    setLayer2(initialLayer2);
  }, []);

  const state = useMemo(() => ({
    currentLayer,
    layer1,
    layer15,
    layer2,
    canAccessLayer,
  }), [currentLayer, layer1, layer15, layer2, canAccessLayer]);

  return (
    <GlobalExperienceContext.Provider value={{
      state,
      setCurrentLayer,
      canAccessLayer,
      getLayerProgress,
      completeLayer1Experience,
      setPatternPauseSeen,
      setBridgeSeen,
      observePattern,
      completePatternRecognition,
      completeUXNaming,
      startLayer2,
      setLayer2Phase,
      completeLayer2,
      reset,
    }}>
      {children}
    </GlobalExperienceContext.Provider>
  );
};
