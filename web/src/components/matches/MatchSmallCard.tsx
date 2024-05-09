import type { Match } from "~/types/match";
import Image from "next/image";
import { formatDate } from "~/utils/date";

interface MatchSmallCardProps {
  match: Match;
}

export const MatchSmallCard: React.FC<MatchSmallCardProps> = (props) => {
  const match = props.match;
  return (
    <div className="m-2 my-3 flex flex-col p-1">
      {match.utcDate && <p className="text-sm text-gray-500">{formatDate(match.utcDate)}</p>}
      <div className="grid grid-cols-5 w-full items-center justify-between rounded-lg bg-slate-100 px-3 py-2">
        <div className="col-span-2 ml-3 flex flex-row items-center rounded-md text-sm font-bold">
          <Image
            src={match.homeTeam.crest ?? ""}
            width={100}
            height={100}
            alt={match.homeTeam.name}
            className="mr-3 h-8 w-8"
          />
          <div className="text-sm text-center">{match.homeTeam.name}</div>
        </div>
        <div className="font-bold col-span-1 text-center">
          {match.score.fullTime.home} - {match.score.fullTime.away}
        </div>
        <div className="justify-end col-span-2 ml-3 flex flex-row items-center rounded-md text-sm font-bold">
          <div className="text-sm text-center">{match.awayTeam.name}</div>
          <Image
            src={match.awayTeam.crest ?? ""}
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
