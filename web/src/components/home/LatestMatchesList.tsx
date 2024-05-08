import Image from "next/image";
import { latestMatches } from "~/data/matches";
import { ChevronLeftIcon, ChevronRightIcon, SeasonIcon } from "~/assets/icons";
import { MatchCard } from "../matches/MatchCard";

interface LatestMatchesListProps {
  className?: string;
}

export const LatestMatchesList: React.FC<LatestMatchesListProps> = (
  props: LatestMatchesListProps,
) => {
  return (
    <div className={`${props.className}`}>
      <div className="mt-10 flex w-full flex-col">
        <div className="flex flex-row justify-between rounded-t-xl bg-white p-3 text-center">
          <div className="flex flex-row items-center">
            <ChevronLeftIcon className="h-5 w-5" />
            <div className="mx-3 font-semibold">Matchweek</div>
            <ChevronRightIcon className="h-5 w-5" />
          </div>
          <SeasonIcon className="h-6 w-6" />
        </div>
        {latestMatches.map((match, idx) => (
          <MatchCard match={match} key={idx} />
        ))}
      </div>
    </div>
  );
};
