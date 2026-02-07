import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

export default function ProfileCard({
  user,
}: {
  user: { username: string; rank: number };
}) {
  return (
    <Card className="relative w-full h-full overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-transparent" />

      <CardContent className="relative flex flex-row gap-6 w-full h-full">
        {/* Avatar */}
        <div className="relative shrink-0 w-1/4 h-full flex items-center justify-center">
          <img
            src="http://github.com/selimaj-dev.png"
            alt="Img"
            className="rounded-2xl aspect-square max-h-full w-auto object-contain"
          />

          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-lg rank-gold flex items-center justify-center text-xs font-bold glow-gold">
            #{user.rank}
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 flex flex-col justify-center w-full">
          <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
          <Badge>World Record Holder</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
