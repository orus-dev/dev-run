export interface Problem {
  name: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  bestTime?: string;
  attempts: number;
}
