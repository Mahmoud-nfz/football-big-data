export interface Team {
  id: number;
  name: string;
  logo: string;
  crest: string;
  country: string;
  goals?: number;
  goalsPerGame?: number;
  goalsAgainst?: number;
}
