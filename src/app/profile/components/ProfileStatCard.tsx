import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  index?: number;
}

export default function ProfileStatCard({
  label,
  value,
  icon: Icon,
  trend,
  index = 0,
}: StatCardProps) {
  return (
    <div
      className="bg-card border border-border rounded-xl p-5 card-hover animate-fade-in opacity-0"
      style={{
        animationDelay: `${index * 0.1}s`,
        animationFillMode: "forwards",
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        {trend && (
          <span
            className={`text-xs font-medium ${
              trend.startsWith("+")
                ? "text-emerald-400"
                : "text-muted-foreground"
            }`}
          >
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-foreground font-mono">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  );
}
