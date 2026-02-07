export type Leaderboard = LeaderboardRank[];

export interface LeaderboardRank {
  rank: number;
  username: string;
  pb: string;
  runsCount: number;
  problem: string;
  category: "any%" | "100%";
  assisted: boolean;
}
