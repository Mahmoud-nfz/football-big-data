import type { Player } from "~/types/player";

export const player1: Player = {
  id: 1,
  name: "Lionel Messi",
  position: "Forward",
  number: 10,
  team: "Inter Miami",
  image: "/images/player.png",
  clubIcon:
    "https://logodownload.org/wp-content/uploads/2020/11/Inter-miami-cf-logo-1.png",
  countryFlag: "https://flagpedia.net/data/flags/w1160/ar.webp",
  preferredFoot: "Left",
  height: "169",
  age: 34,
  value: "€80M",
  description: `
      Lionel Messi is an Argentine professional footballer who plays as a forward for Major League Soccer club Inter Miami and the Argentina national team. Often considered the best player in the world and widely regarded as one of the greatest players of all time, Messi has won seven Ballon d'Or awards, a record seven European Golden Shoes, and has been included in the UEFA Team of the Year 11 times. He has spent his entire professional career with Barcelona, where he won numerous accolades including ten La Liga titles, seven Copa del Rey titles and four UEFA Champions Leagues. Messi holds the records for most goals in a calendar year (91), a single season (73), and a club season (73), as well as the most goals scored in a calendar year for the Argentina national team (12). He is also the first player to win three European Golden Shoes.
    `,
  updatedAt: "2021-10-15",
  goals: 672,
  assists: 305,
  matches: 778,
  matchesWon: 500,
  shotsOnTargetPercentage: 20
};

export const player2: Player = {
  id: 2,
  name: "Cristiano Ronaldo",
  position: "Forward",
  number: 7,
  team: "Manchester United",
  image: "https://www.footyrenders.com/render/Cristiano-Ronaldo28.png",
  clubIcon:
    "https://1.bp.blogspot.com/-tjh8FkQ9s8U/X5lGA9s5UcI/AAAAAAABBUE/zNrqZM8KdVYife99OHaHKIufkZixA8JfQCLcBGAsYHQ/s696/Al%2BNassr-KSA%2B2020.png",
  countryFlag: "https://flagpedia.net/data/flags/w1160/pt.webp",
  preferredFoot: "Right",
  height: "187",
  age: 36,
  value: "€60M",
  description: `
          Cristiano Ronaldo is a Portuguese professional footballer who plays as a forward for Premier League club Manchester United and the Portugal national team. Often considered the best player in the world and widely regarded as one of the greatest players of all time, Ronaldo has won five Ballon d'Or awards and four European Golden Shoes, both of which are records for a European player. He has won 32 trophies in his career, including seven league titles, five UEFA Champions Leagues, one UEFA European Championship, and one UEFA Nations League. Ronaldo holds the records for most appearances, most goals and assists in the UEFA Champions League, most goals in the UEFA European Championship, and most international
      `,
  updatedAt: "2021-10-15",
  goals: 680,
  assists: 220,
  matches: 900,
  matchesWon: 600,
  shotsOnTargetPercentage: 30
};
