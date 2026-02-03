import { Github, Mail } from "lucide-react";
import { Button } from "../ui/button";

export default function ContinueWith() {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button variant="outline">
          <Github className="h-4 w-4" />
          GitHub
        </Button>
        <Button variant="outline">
          <Mail className="h-4 w-4" />
          Google
        </Button>
      </div>
    </>
  );
}
