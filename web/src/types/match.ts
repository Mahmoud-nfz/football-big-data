import { Team } from "./team";

export interface Match {
    homeTeam: Team;
    awayTeam: Team;
    homeTeamScore: number;
    awayTeamScore: number;
    date: string;
}