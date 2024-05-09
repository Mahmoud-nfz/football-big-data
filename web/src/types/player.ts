export interface Player {
  id: number;
  name: string;
  position: string;
  number: number;
  team: string;
  image: string;
  clubIcon: string;
  club?: string;
  countryFlag: string;
  preferredFoot: string;
  height: string;
  age: number;
  value: string;
  description: string;
  updatedAt: string;
  goals: number;
  assists: number;
  matches: number;
  matchesWon: number;
  shotsOnTargetPercentage: number;
}
