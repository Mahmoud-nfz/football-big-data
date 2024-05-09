import { Team } from "./team";

export interface Match {
  id: number;
  area: {
    id: number;
    code: string;
    flag: string;
    name: string;
  };
  competition: {
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string;
  };
  season: {
    id: number;
    startDate: Date;
    endDate: Date;
    currentMatchday: number;
    winner: unknown;
  };
  homeTeam: Team;
  awayTeam: Team;
  league: string;
  status: string;
  utcDate: string;
  stage: string;
  group: string;
  lastUpdated: Date;
  score: {
    winner: "HOME_TEAM" | "AWAY_TEAM";
    duration: string;
    fullTime: {
      home: number;
      away: number;
    };
    halfTime: {
      home: number;
      away: number;
    };
  };
}
