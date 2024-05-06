import { Match } from "~/types/match";
import Image from "next/image";

interface MatchCardProps {
  match: Match;
}

export const MatchCard: React.FC<MatchCardProps> = (props: MatchCardProps) => {
  const match = props.match;
  return (
    <div className="m-2 my-3 flex flex-col p-1">
      <p className="text-sm text-gray-500">{match.date}</p>
      <div className="flex w-full flex-row items-center justify-between rounded-lg bg-slate-100 px-3 py-2">
        <div className="ml-3 flex flex-row items-center rounded-md text-sm font-bold">
          <Image
            src={match.homeTeam.logo}
            width={100}
            height={100}
            alt={match.homeTeam.name}
            className="mr-3 h-8 w-8"
          />
          <div className="text-sm">{match.homeTeam.name}</div>
        </div>
        <div className="font-bold">
          {match.homeTeamScore} - {match.awayTeamScore}
        </div>
        <div className="ml-3 flex flex-row items-center rounded-md text-sm font-bold">
          <div className="text-sm">{match.awayTeam.name}</div>
          <Image
            src={match.awayTeam.logo}
            width={100}
            height={100}
            alt={match.awayTeam.name}
            className="ml-3 h-8 w-8"
          />
        </div>
      </div>
    </div>
  );
};
