import { Check, Minus } from "lucide-react";

interface SplitRowProps {
  problemName: string;
  splitTime: string;
  delta?: string;
  isCompleted: boolean;
  isCurrent?: boolean;
  pbTime?: string;
}

const SplitRow = ({ problemName, splitTime, delta, isCompleted, isCurrent, pbTime }: SplitRowProps) => {
  const getDeltaColor = (delta?: string) => {
    if (!delta) return "text-muted-foreground";
    if (delta.startsWith("-")) return "text-emerald-400";
    if (delta.startsWith("+")) return "text-red-400";
    return "text-muted-foreground";
  };

  return (
    <div 
      className={`flex items-center justify-between py-3 px-4 rounded-lg transition-all duration-300 ${
        isCurrent 
          ? 'bg-primary/10 border border-primary/30' 
          : isCompleted 
            ? 'bg-secondary/50' 
            : 'bg-card'
      }`}
    >
      <div className="flex items-center gap-3">
        {/* Status indicator */}
        <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
          isCompleted 
            ? 'bg-emerald-500/20 text-emerald-400' 
            : isCurrent 
              ? 'bg-primary/20 text-primary pulse-live' 
              : 'bg-secondary text-muted-foreground'
        }`}>
          {isCompleted ? <Check className="h-3.5 w-3.5" /> : <Minus className="h-3.5 w-3.5" />}
        </div>
        
        <span className={`font-medium ${isCurrent ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
          {problemName}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Delta */}
        {isCompleted && delta && (
          <span className={`split-time ${getDeltaColor(delta)}`}>
            {delta}
          </span>
        )}
        
        {/* Split time */}
        <span className={`split-time min-w-[70px] text-right ${
          isCompleted ? 'text-foreground' : 'text-muted-foreground'
        }`}>
          {isCompleted ? splitTime : pbTime || '--:--'}
        </span>
      </div>
    </div>
  );
};

export default SplitRow;
