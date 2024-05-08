import { Match } from "~/types/match";
import Image from "next/image";
import { formatDate } from "~/utils/date";

interface MatchCardProps {
  match: Match;
  className?: string;
}

export const MatchCard: React.FC<MatchCardProps> = (props) => {
  const match = props.match;
  return (
    <div className={`my-3 flex flex-col bg-white p-1 ${props.className}`}>
      <h4 className="text-center text-lg font-bold text-black">
        {formatDate(match.date)}
      </h4>
      <p className="mb-5 text-center text-sm font-semibold text-gray-500">
        Premier League
      </p>
      <div className="grid w-full grid-cols-5 items-center justify-between rounded-lg bg-slate-100 px-3 py-2">
        <div className="col-span-2 row-span-1 ml-3 flex flex-row items-center rounded-l-md bg-blue-800 p-1 text-sm font-bold">
          <Image
            src={match.homeTeam.logo}
            width={100}
            height={100}
            alt={match.homeTeam.name}
            className="-my-2 mx-3 h-10 w-10"
          />
          <div className="text-center text-sm text-white">
            {match.homeTeam.name}
          </div>
        </div>
        <div className="col-span-1 row-span-2 rounded-b-xl bg-purple-700 pb-4 text-center font-bold">
          {match.homeTeamScore} - {match.awayTeamScore}
        </div>
        <div className="col-span-2 row-span-1 flex flex-row items-center justify-end rounded-r-md bg-red-300 p-1 text-sm font-bold">
          <div className="text-center text-sm">{match.awayTeam.name}</div>
          <Image
            src={match.awayTeam.logo}
            width={100}
            height={100}
            alt={match.awayTeam.name}
            className="-my-2 mx-3 h-10 w-10"
          />
        </div>
      </div>
      <p className="text-md text-center text-gray-500">{match.competition}</p>
    </div>
  );
};
