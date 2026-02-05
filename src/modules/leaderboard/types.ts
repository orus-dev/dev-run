export type Leaderboard = LeaderboardRank[];

export interface LeaderboardRank {
  rank: number;
  username: string;
  pb: string;
  runsCount: number;
  category: string;
}
