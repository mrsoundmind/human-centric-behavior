import { useState } from "react";
import { PDFDump } from "./Act1_PDFDump";
import { VideoContext } from "./Act2_VideoContext";
import { WorkflowMirror } from "./Act3_WorkflowMirror";
import { PrincipleWhisper } from "./Act4_PrincipleWhisper";

type Act = "chaos" | "relief" | "mirror" | "pattern";

interface DeadCatExperienceProps {
    onComplete: () => void;
    onBack: () => void;
}

export const DeadCatExperience = ({ onComplete, onBack }: DeadCatExperienceProps) => {
    const [currentAct, setCurrentAct] = useState<Act>("chaos");

    const handleActTransition = (nextAct: Act) => {
        setCurrentAct(nextAct);
    };

    return (
        <>
            {/* ACT 1: CHAOS - PDF Dump */}
            {currentAct === "chaos" && (
                <PDFDump
                    filename="Meeting_Notes_TechStartup_FINAL_v12.pdf"
                    pages={50}
                    onEscape={() => handleActTransition("relief")}
                    thresholdSeconds={25}
                />
            )}

            {/* ACT 2: RELIEF - Video Context */}
            {currentAct === "relief" && (
                <VideoContext
                    title="TechStartup Context (5 min)"
                    duration="5:23"
                    onComplete={() => handleActTransition("mirror")}
                />
            )}

            {/* ACT 3: MIRROR - Workflow Comparison */}
            {currentAct === "mirror" && (
                <WorkflowMirror
                    before={{
                        subject: "Handover Notes - TechStartup",
                        attachment: { name: "Meeting_Notes_FINAL_v12.pdf", size: "54 MB" },
                        status: "deleted"
                    }}
                    after={{
                        subject: "Quick Context - TechStartup",
                        videoLink: "loom.com/share/abc123",
                        status: "sent"
                    }}
                    futureEvent={{
                        title: "NextCorp Kickoff - Handover",
                        time: "Tomorrow, 2 PM",
                        options: [
                            { text: "📄 Write Notes", emphasized: false },
                            { text: "🎥 Record Context", emphasized: true }
                        ]
                    }}
                    onContinue={() => handleActTransition("pattern")}
                />
            )}

            {/* ACT 4: PATTERN - Principle Reveal */}
            {currentAct === "pattern" && (
                <PrincipleWhisper
                    principle="Context Transfer: Move understanding, not data."
                    method="Service Blueprinting"
                    onExplore={onComplete}
                />
            )}
        </>
    );
};
