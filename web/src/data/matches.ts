import { Match } from '~/types/match'
import { team1, team2, team3 } from './teams'

export const latestMatches : Match[] = [
    {
        homeTeam: team1,
        awayTeam: team2,
        homeTeamScore: 2,
        awayTeamScore: 1,
        date: '2021-10-15',
    },
    {
        homeTeam: team2,
        awayTeam: team1,
        homeTeamScore: 0,
        awayTeamScore: 3,
        date: '2021-10-20',
    },
    {
        homeTeam: team1,
        awayTeam: team3,
        homeTeamScore: 1,
        awayTeamScore: 1,
        date: '2021-10-25',
    },
]