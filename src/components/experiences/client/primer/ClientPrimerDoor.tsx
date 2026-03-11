import { motion } from "framer-motion";
import { useState } from "react";

interface ClientPrimerDoorProps {
    onComplete: () => void;
}

export const ClientPrimerDoor = ({ onComplete }: ClientPrimerDoorProps) => {
    const [attempts, setAttempts] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [showHint, setShowHint] = useState(false);

    const handlePush = () => {
        if (!isOpen) {
            setAttempts(prev => prev + 1);
            // Shake animation trigger
        }
    };

    const handleDrag = (event: any, info: any) => {
        if (info.offset.x > 50) {
            setIsOpen(true);
            setTimeout(onComplete, 2000);
        }
    };

    return (
        <div className="max-w-4xl mx-auto text-center space-y-12 py-12">
            <div className="space-y-4">
                <div className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-bold tracking-widest text-indigo-300 font-mono mb-4">
                    EXAMPLE 1: THE ACQUISITION FAIL
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-light text-white">
                    The "Norman Door"
                </h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    You see a handle. What do you do?
                </p>
            </div>

            <div className="relative h-[400px] w-full max-w-md mx-auto bg-[#1A1A1A] rounded-xl border-4 border-[#333] overflow-hidden shadow-2xl flex items-center justify-center">
                {/* The Door */}
                <motion.div
                    className="absolute inset-4 bg-[#2A2A2A] rounded-lg flex items-center justify-end pr-4 cursor-grab active:cursor-grabbing border-r-4 border-black/20"
                    animate={isOpen ? { x: 200, rotateY: -45 } : { x: 0, rotateY: 0 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDragEnd={handleDrag}
                    onClick={handlePush}
                    style={{ transformOrigin: "left center" }}
                >
                    {/* The "Handle" (looks like a pull handle but plays on push expectation) */}
                    <div className="w-4 h-32 bg-gradient-to-b from-gray-300 to-gray-500 rounded-full shadow-lg" />
                </motion.div>

                {!isOpen && (
                    <motion.div
                        className="absolute pointer-events-none"
                        animate={attempts > 0 ? { x: [0, -10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                    >
                        {attempts > 0 && (
                            <div className="text-red-500 font-bold text-xl drop-shadow-md">
                                LOCKED
                            </div>
                        )}
                    </motion.div>
                )}
            </div>

            {attempts > 2 && !isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-pink-500 font-mono text-sm"
                >
                    Hint: It looks like a handle, but... maybe drag it?
                </motion.div>
            )}


        </div>
    );
};
