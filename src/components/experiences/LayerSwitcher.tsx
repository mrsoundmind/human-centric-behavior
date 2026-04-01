import { motion } from "framer-motion";
import { useGlobalExperience, Layer } from "./GlobalExperienceContext";

interface LayerSwitcherProps {
  className?: string;
}

/**
 * Global layer switcher - lens change, not navigation.
 * Allows users to move between Layer 1, 1.5, and 2 at any time.
 * State persists across layers.
 */
export const LayerSwitcher = ({ className = "" }: LayerSwitcherProps) => {
  return null;
  // Previously rendered the Feel | Understand | Apply menu
  const { state, setCurrentLayer, getLayerProgress, canAccessLayer } = useGlobalExperience();

  const layers: { id: Layer; label: string; description: string }[] = [
    { id: "layer1", label: "Feel", description: "Experience friction" },
    { id: "layer1.5", label: "Understand", description: "Recognize patterns" },
    { id: "layer2", label: "Apply", description: "See delivery impact" },
  ];

  const getProgressColor = (layer: Layer) => {
    const progress = getLayerProgress(layer);
    if (progress === "completed") return "bg-relief";
    if (progress === "in-progress") return "bg-clarity";
    return "bg-muted-foreground/30";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 ${className}`}
    >
      <div className="flex items-center gap-1 bg-void/90 backdrop-blur-md border border-border/50 rounded-full px-2 py-1.5">
        {layers.map((layer, index) => {
          const isActive = state.currentLayer === layer.id;
          const isAccessible = canAccessLayer(layer.id);
          const progress = getLayerProgress(layer.id);
          
          return (
            <div key={layer.id} className="flex items-center">
              <button
                onClick={() => isAccessible && setCurrentLayer(layer.id)}
                disabled={!isAccessible}
                className={`relative group flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 ${
                  isActive
                    ? "bg-primary/20 text-primary"
                    : isAccessible
                      ? "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                      : "text-muted-foreground/40 cursor-not-allowed"
                }`}
              >
                {/* Progress indicator */}
                <span className={`w-1.5 h-1.5 rounded-full ${getProgressColor(layer.id)}`} />
                
                {/* Label */}
                <span className="text-xs font-display font-medium">
                  {layer.label}
                </span>
                
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeLayer"
                    className="absolute inset-0 border border-primary/40 rounded-full"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
                
                {/* Tooltip on hover */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-card border border-border rounded-md px-3 py-2 shadow-deep whitespace-nowrap">
                    <p className="text-xs text-foreground font-medium">{layer.description}</p>
                    {!isAccessible && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {layer.id === "layer1.5" && "Complete more experiences first"}
                        {layer.id === "layer2" && "Finish understanding phase first"}
                      </p>
                    )}
                    {progress === "completed" && (
                      <p className="text-xs text-relief mt-1">Completed</p>
                    )}
                    {progress === "in-progress" && (
                      <p className="text-xs text-clarity mt-1">In progress</p>
                    )}
                  </div>
                </div>
              </button>
              
              {/* Connector line between layers */}
              {index < layers.length - 1 && (
                <div className={`w-4 h-px ${
                  canAccessLayer(layers[index + 1].id) 
                    ? "bg-border" 
                    : "bg-border/30"
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
