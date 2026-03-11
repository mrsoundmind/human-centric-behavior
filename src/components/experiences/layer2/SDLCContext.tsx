import { createContext, useContext, useState, useCallback, ReactNode } from "react";

// Types of UX debt that accumulate
export interface UXDebt {
  id: string;
  source: string; // Which phase created it
  type: "ambiguity" | "skip" | "rush" | "assumption" | "patch";
  description: string;
  visibility: "hidden" | "surfacing" | "visible";
  createdAt: number;
}

// Decisions made in each phase
export interface PhaseDecision {
  phase: string;
  action: string;
  timestamp: number;
  consequence?: string;
}

// Role impact tracking
export interface RoleImpact {
  role: "ba" | "dev" | "qa" | "pm" | "client";
  pain: string;
  intensity: number; // 1-5
}

// Project state that evolves
export interface ProjectState {
  name: string;
  timeline: number; // days remaining
  budget: number; // percentage remaining
  stakeholderPatience: number; // 0-100
  complexity: number; // accumulating complexity score
  decisions: PhaseDecision[];
  uxDebt: UXDebt[];
  roleImpacts: RoleImpact[];
  escalationTriggered: boolean;
  noGoodOptionTriggered: boolean;
  designConfiguration: any; // Flexible type for now
}

const initialState: ProjectState = {
  name: "Client Portal Redesign",
  timeline: 90, // days
  budget: 100, // percent
  stakeholderPatience: 100,
  complexity: 0,
  decisions: [],
  uxDebt: [],
  roleImpacts: [],
  escalationTriggered: false,
  noGoodOptionTriggered: false,
  designConfiguration: null,
};

interface SDLCContextType {
  project: ProjectState;
  addDecision: (phase: string, action: string, consequence?: string) => void;
  addUXDebt: (debt: Omit<UXDebt, "id" | "createdAt">) => void;
  surfaceUXDebt: (debtId: string) => void;
  addRoleImpact: (impact: RoleImpact) => void;
  consumeTimeline: (days: number) => void;
  consumeBudget: (percent: number) => void;
  reduceStakeholderPatience: (amount: number) => void;
  addComplexity: (amount: number) => void;
  triggerEscalation: () => void;
  triggerNoGoodOption: () => void;
  getVisibleDebt: () => UXDebt[];
  getPhaseDebt: (phase: string) => UXDebt[];
  getTotalDebt: () => number;
  designConfiguration: any; // Flexible type for now to avoid circular deps
  setDesignConfiguration: (config: any) => void;
  reset: () => void;
}

const SDLCContext = createContext<SDLCContextType | null>(null);

export const useSDLC = () => {
  const context = useContext(SDLCContext);
  if (!context) {
    throw new Error("useSDLC must be used within SDLCProvider");
  }
  return context;
};

export const SDLCProvider = ({ children }: { children: ReactNode }) => {
  const [project, setProject] = useState<ProjectState>(initialState);

  const addDecision = useCallback((phase: string, action: string, consequence?: string) => {
    setProject(prev => ({
      ...prev,
      decisions: [...prev.decisions, {
        phase,
        action,
        timestamp: Date.now(),
        consequence
      }]
    }));
  }, []);

  const addUXDebt = useCallback((debt: Omit<UXDebt, "id" | "createdAt">) => {
    setProject(prev => ({
      ...prev,
      uxDebt: [...prev.uxDebt, {
        ...debt,
        id: `debt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        createdAt: Date.now()
      }]
    }));
  }, []);

  const surfaceUXDebt = useCallback((debtId: string) => {
    setProject(prev => ({
      ...prev,
      uxDebt: prev.uxDebt.map(d =>
        d.id === debtId
          ? { ...d, visibility: d.visibility === "hidden" ? "surfacing" : "visible" } as UXDebt
          : d
      )
    }));
  }, []);

  const addRoleImpact = useCallback((impact: RoleImpact) => {
    setProject(prev => ({
      ...prev,
      roleImpacts: [...prev.roleImpacts, impact]
    }));
  }, []);

  const consumeTimeline = useCallback((days: number) => {
    setProject(prev => ({
      ...prev,
      timeline: Math.max(0, prev.timeline - days)
    }));
  }, []);

  const consumeBudget = useCallback((percent: number) => {
    setProject(prev => ({
      ...prev,
      budget: Math.max(0, prev.budget - percent)
    }));
  }, []);

  const reduceStakeholderPatience = useCallback((amount: number) => {
    setProject(prev => ({
      ...prev,
      stakeholderPatience: Math.max(0, prev.stakeholderPatience - amount)
    }));
  }, []);

  const addComplexity = useCallback((amount: number) => {
    setProject(prev => ({
      ...prev,
      complexity: prev.complexity + amount
    }));
  }, []);

  const triggerEscalation = useCallback(() => {
    setProject(prev => ({
      ...prev,
      escalationTriggered: true,
      stakeholderPatience: Math.max(0, prev.stakeholderPatience - 30)
    }));
  }, []);

  const triggerNoGoodOption = useCallback(() => {
    setProject(prev => ({
      ...prev,
      noGoodOptionTriggered: true
    }));
  }, []);

  const getVisibleDebt = useCallback(() => {
    return project.uxDebt.filter(d => d.visibility !== "hidden");
  }, [project.uxDebt]);

  const getPhaseDebt = useCallback((phase: string) => {
    return project.uxDebt.filter(d => d.source === phase);
  }, [project.uxDebt]);

  const getTotalDebt = useCallback(() => {
    return project.uxDebt.length;
  }, [project.uxDebt]);

  const setDesignConfiguration = useCallback((config: any) => {
    setProject(prev => ({
      ...prev,
      designConfiguration: config
    }));
  }, []);

  const reset = useCallback(() => {
    setProject(initialState);
  }, []);

  return (
    <SDLCContext.Provider value={{
      project,
      addDecision,
      addUXDebt,
      surfaceUXDebt,
      addRoleImpact,
      consumeTimeline,
      consumeBudget,
      reduceStakeholderPatience,
      addComplexity,
      triggerEscalation,
      triggerNoGoodOption,
      getVisibleDebt,
      getPhaseDebt,
      getTotalDebt,
      setDesignConfiguration,
      reset
    }}>
      {children}
    </SDLCContext.Provider>
  );
};
