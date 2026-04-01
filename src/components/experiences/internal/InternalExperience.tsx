import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { DesignationSelect, Designation } from "./DesignationSelect";
import { DesignationPortal } from "./DesignationPortal";
import { InternalIntroScreen } from "./InternalIntroScreen";
import { SalesJourney } from "./sales/SalesJourney";
import { RoleBriefingView } from "./RoleBriefingView";
import { RoleMasterclassComplete } from "./RoleMasterclassComplete";
import { ProjectBrief } from "./onboarding/ProjectBrief";
import { SlackWarRoom } from "./onboarding/SlackWarRoom";
import { SystemReaction } from "./onboarding/SystemReaction";
import { DecisionLensUnlock } from "./onboarding/DecisionLensUnlock";
import { IdentityReflection } from "./onboarding/IdentityReflection";
import { CRMJourney } from "./roles/CRMJourney";
import { PMJourney } from "./roles/PMJourney";
import { DeveloperJourney } from "./roles/DeveloperJourney";
import { QAJourney } from "./roles/QAJourney";
import { DesignerJourney } from "./roles/DesignerJourney";
import { StrategyJourney } from "./roles/StrategyJourney";
import { BAJourney } from "./roles/BAJourney";

type InternalStep =
    | "intro"
    | "onboarding-brief"
    | "onboarding-war-room"
    | "onboarding-system-reaction"
    | "onboarding-decision-lens"
    | "onboarding-identity"
    | "designation"
    | "role-briefing"
    | "role-journey"
    | "masterclass-complete";

interface InternalExperienceProps {
    onBack?: () => void;
    initialStep?: InternalStep;
}

export const InternalExperience = ({ onBack, initialStep }: InternalExperienceProps) => {
    const [step, setStep] = useState<InternalStep>(initialStep || "intro");
    const [role, setRole] = useState<Designation | null>(null);

    // Sync with external navigation (like debug menu)
    useEffect(() => {
        if (initialStep) setStep(initialStep);
    }, [initialStep]);

    const handleRoleSelect = (selected: Designation) => {
        setRole(selected);
        setStep("role-briefing");
    };

    const handleJourneyComplete = () => {
        setStep("masterclass-complete");
    };

    const renderRoleJourney = () => {
        switch (role) {
            case "sales":
                return <SalesJourney onComplete={handleJourneyComplete} />;
            case "crm":
                return <CRMJourney onComplete={handleJourneyComplete} />;
            case "pm":
                return <PMJourney onComplete={handleJourneyComplete} />;
            case "developer":
                return <DeveloperJourney onComplete={handleJourneyComplete} />;
            case "qa":
                return <QAJourney onComplete={handleJourneyComplete} />;
            case "designer":
                return <DesignerJourney onComplete={handleJourneyComplete} />;
            case "strategy":
                return <StrategyJourney onComplete={handleJourneyComplete} />;
            case "ba":
                return <BAJourney onComplete={handleJourneyComplete} />;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Overlapping back button removed. Handled by DesignationPortal. */}

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full"
                >
                    {step === "intro" && (
                        <InternalIntroScreen onStart={() => setStep("onboarding-brief")} />
                    )}

                    {step === "onboarding-brief" && (
                        <ProjectBrief onContinue={() => setStep("onboarding-war-room")} />
                    )}

                    {step === "onboarding-war-room" && (
                        <SlackWarRoom onContinue={() => setStep("onboarding-system-reaction")} />
                    )}

                    {step === "onboarding-system-reaction" && (
                        <SystemReaction onContinue={() => setStep("onboarding-decision-lens")} />
                    )}

                    {step === "onboarding-decision-lens" && (
                        <DecisionLensUnlock onContinue={() => setStep("onboarding-identity")} />
                    )}

                    {step === "onboarding-identity" && (
                        <IdentityReflection onContinue={() => setStep("designation")} />
                    )}

                    {step === "designation" && (
                        <DesignationPortal
                            onBack={onBack}
                            onStartQuickMode={(selectedRole) => {
                                setRole(selectedRole);
                                setStep("role-journey");
                            }}
                            onComplete={handleJourneyComplete}
                        />
                    )}

                    {step === "role-journey" && role && renderRoleJourney()}

                    {step === "masterclass-complete" && (
                        <RoleMasterclassComplete
                            role={role || "sales"}
                            onReturnHome={() => setStep("designation")}
                        />
                    )}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};
