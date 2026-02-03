import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function StatCard({
  icon: Icon,
  label,
  value,
  index = 0,
}: {
  icon: any;
  label: string;
  value: string;
  index?: number;
}) {
  return (
    <Card
      className="opacity-0 animate-fade-in"
      style={{
        animationDelay: `${index * 0.1}s`,
        animationFillMode: "forwards",
      }}
    >
      <CardHeader className="pb-2 text-center">
        <Icon className="mx-auto h-5 w-5 text-primary" />
        <CardTitle className="font-mono text-2xl">{value}</CardTitle>
        <p className="text-xs text-muted-foreground">{label}</p>
      </CardHeader>
    </Card>
  );
}
