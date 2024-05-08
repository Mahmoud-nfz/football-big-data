"use client";

import { latestMatches } from "~/data/matches";
import { ChevronLeftIcon, ChevronRightIcon, SeasonIcon } from "~/assets/icons";
import { MatchCard } from "../matches/MatchCard";
import { useState } from "react";
import { clientSideApi } from "~/trpc/react";

interface LatestMatchesListProps {
  className?: string;
}

export const LatestMatchesList: React.FC<LatestMatchesListProps> = (
  props: LatestMatchesListProps,
) => {
  const [num, setNumber] = useState(-1);

  clientSideApi.streaming.latestMatches.useSubscription(undefined, {
    onData(n) {
      setNumber(n);
    },
  });

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
        {num}
      </div>
    </div>
  );
};
