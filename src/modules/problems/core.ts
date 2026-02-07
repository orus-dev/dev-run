"use server";

import "server-only";
import { ProblemDefinition } from "./types";

const problems: ProblemDefinition[] = [
  {
    id: "fix-auth-callback",
    title: "Fix the Broken Auth Callback",
    description:
      "Users can log in with OAuth, but sessions aren't persisted. Fix it.",
    language: "typescript",
    difficulty: "easy",
    validate100: () => true,
    validateAny: () => true,
  },
  {
    id: "fix-prod-build",
    title: "Patch a Failing Production Build",
    description:
      "Production build fails while development works. Fix the build.",
    language: "javascript",
    difficulty: "easy",
    validate100: () => true,
    validateAny: () => true,
  },
  {
    id: "add-user-profile-endpoint",
    title: "Implement Missing API Endpoint",
    description: "The frontend expects `/api/me`. Implement it correctly.",
    language: "go",
    difficulty: "easy",
    validate100: () => true,
    validateAny: () => true,
  },
];

export async function getProblems() {
  return problems.map((def) => ({
    id: def.id,
    title: def.title,
    description: def.description,
    difficulty: def.difficulty,
    language: def.language,
  }));
}
