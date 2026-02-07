export type ProblemValidator = (submission: any) => boolean;

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: "easy" | "medium" | "hard";
  language:
    | "rust"
    | "go"
    | "java"
    | "javascript"
    | "typescript"
    | "python"
    | null;
}

export interface ProblemDefinition extends Problem {
  /* Any% validator */
  validateAny: ProblemValidator;
  /* 100% validator */
  validate100: ProblemValidator;
  metadata?: Record<string, any>; // optional extra info like time limits, refs
}
