import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export type ChatMessage = {
  user: string;
  message: string;
  time: string;
};

export default function RunChat({
  chatMessages,
}: {
  chatMessages: ChatMessage[];
}) {
  return (
    <Card className="flex flex-col flex-1">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Chat</CardTitle>
          <span className="text-xs text-muted-foreground">
            {chatMessages.length} messages
          </span>
        </div>
      </CardHeader>

      <Separator />

      <CardContent className="flex flex-col flex-1 gap-3">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {chatMessages.map((msg, i) => (
            <div key={i} className="rounded-lg bg-secondary/50 p-2 text-sm">
              <span className="font-semibold text-foreground">{msg.user}</span>:{" "}
              <span className="text-muted-foreground">{msg.message}</span>
              <span className="ml-2 text-xs text-muted-foreground">
                {msg.time}
              </span>
            </div>
          ))}
        </div>

        {/* Input */}
        <Input placeholder="Type a message…" />
      </CardContent>
    </Card>
  );
}
