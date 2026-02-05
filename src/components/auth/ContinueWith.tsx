"use client";

import { Github, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { signInWithGitHub } from "@/modules/account/actions";

export default function ContinueWith() {
  const continueWithGithub = () => {
    signInWithGitHub();
  };
  const continueWithGoogle = () => {};

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

      <div className="grid grid-cols-2 gap-3 animate-fade-in stagger-4">
        <Button variant="outline" onClick={continueWithGithub}>
          <Github className="h-4 w-4" />
          GitHub
        </Button>
        <Button
          variant="outline"
          className="animate-fade-in stagger-5"
          onClick={continueWithGoogle}
        >
          <Mail className="h-4 w-4" />
          Google
        </Button>
      </div>
    </>
  );
}
