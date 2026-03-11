import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface PDFDumpProps {
    filename: string;
    pages: number;
    onEscape: () => void;
    thresholdSeconds?: number;
}

export const PDFDump = ({ filename, pages, onEscape, thresholdSeconds = 25 }: PDFDumpProps) => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [showEscape, setShowEscape] = useState(false);
    const [pmEmotion, setPmEmotion] = useState("😐");

    // Timer
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeElapsed(prev => {
                const next = prev + 1;

                // Update PM emotion based on time
                if (next > 40) setPmEmotion("😵‍💫");
                else if (next > 20) setPmEmotion("😕");
                else if (next > 10) setPmEmotion("🤨");

                // Show escape after threshold
                if (next >= thresholdSeconds) {
                    setShowEscape(true);
                }

                return next;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [thresholdSeconds]);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const element = e.currentTarget;
        const progress = (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;
        setScrollProgress(progress);

        // Show escape if scrolled 30%
        if (progress > 30 && timeElapsed > 15) {
            setShowEscape(true);
        }
    };

    // Generate fake PDF content
    const generateFakePDFContent = () => {
        return Array.from({ length: pages }).map((_, i) => ({
            page: i + 1,
            content: `
Page ${i + 1} of ${pages}

MEETING NOTES - TECHSTART INC. - FINAL v12

Date: ${new Date().toLocaleDateString()}
Attendees: Vikram (CEO), Rahul (Marketing), Sales Team

${i % 3 === 0 ? `
DISCUSSION POINTS:
- Client mentioned they want the website to be "viral"
- Rahul suggested using AI in some capacity
- Timeline discussed: "as soon as possible"
- Budget: vague, need to follow up
- Technical requirements: TBD
- Brand colors: "vibrant but professional"
- Target audience: "everyone who needs this"
` : i % 3 === 1 ? `
ACTION ITEMS (UNCLEAR):
□ Follow up with Vikram about the thing
□ Check if Rahul can send those files
□ Maybe look into that platform we discussed
□ Coordinate with someone about deliverables
□ Review contract terms (which section?)
□ Set up another meeting to clarify scope
` : `
RANDOM CONTEXT:
- Vikram's dog barked during call (unrelated)
- Coffee break taken at 3:15 PM
- Discussed weather briefly
- Someone's camera wasn't working
- Rahul had to step out for 5 minutes
- Wi-Fi dropped twice, had to reconnect
- Meeting ended 10 minutes early
`}

---
            `.trim()
        }));
    };

    const pdfContent = generateFakePDFContent();

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
            {/* Metrics Bar */}
            <div className="bg-gray-900 border-b border-gray-700 p-4 flex justify-between items-center">
                <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm font-mono">📄 {filename}</span>
                    <span className="text-gray-500 text-xs">{pages} pages</span>
                </div>
                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <div className="text-xs text-gray-500">PM Confusion Time</div>
                        <div className="text-2xl font-mono text-red-400 font-bold">
                            {Math.floor(timeElapsed / 60)}:{(timeElapsed % 60).toString().padStart(2, '0')}
                        </div>
                    </div>
                    <div className="text-4xl">
                        {pmEmotion}
                    </div>
                </div>
            </div>

            {/* PDF Viewer */}
            <div
                className="flex-1 overflow-y-auto bg-gray-800 p-8"
                onScroll={handleScroll}
            >
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", damping: 15, stiffness: 100 }}
                    className="max-w-4xl mx-auto"
                >
                    <div className="bg-white text-gray-900 shadow-2xl">
                        {pdfContent.map((page) => (
                            <div
                                key={page.page}
                                className="p-12 border-b-4 border-gray-300 min-h-[800px]"
                            >
                                <div className="text-xs text-gray-400 mb-8">{page.page}</div>
                                <pre className="font-mono text-xs leading-relaxed whitespace-pre-wrap">
                                    {page.content}
                                </pre>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Scroll Progress */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
                <motion.div
                    className="h-full bg-red-500"
                    style={{ width: `${scrollProgress}%` }}
                />
            </div>

            {/* Escape Button */}
            <AnimatePresence>
                {showEscape && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2"
                    >
                        <button
                            onClick={onEscape}
                            className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-full font-medium shadow-2xl shadow-blue-500/50 transition-all hover:scale-105"
                        >
                            There's another way...
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
