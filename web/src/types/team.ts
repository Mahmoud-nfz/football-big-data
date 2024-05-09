export interface Team {
  id: number;
  name: string;
  logo: string;
  country: string;
  goals?: number;
  goalsPerGame?: number;
  goalsAgainst?: number;
  yellowCards: number;
}
