import "server-only";

import { Problem, ProblemDefinition } from "./types";

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
    difficulty: "hard",
    validate100: () => true,
    validateAny: () => true,
  },
  {
    id: "add-user-profile-endpoint",
    title: "Implement Missing API Endpoint",
    description: "The frontend expects `/api/me`. Implement it correctly.",
    language: "go",
    difficulty: "medium",
    validate100: () => true,
    validateAny: () => true,
  },
];

export async function getProblems(): Promise<Problem[]> {
  return problems.map((def) => ({
    id: def.id,
    title: def.title,
    description: def.description,
    difficulty: def.difficulty,
    language: def.language,
  }));
}

export async function getProblem(id: string): Promise<Problem | undefined> {
  const problem = problems.find((p) => p.id === id);

  if (!problem) return;

  return {
    id: problem.id,
    title: problem.title,
    description: problem.description,
    difficulty: problem.difficulty,
    language: problem.language,
  };
}
