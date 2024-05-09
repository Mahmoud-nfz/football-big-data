"use client";

import { ChevronLeftIcon, ChevronRightIcon, SeasonIcon } from "~/assets/icons";
import { MatchCard } from "../matches/MatchCard";
import { useState } from "react";
import { clientSideApi } from "~/trpc/react";
import type { Match } from "~/types/match";

interface LatestMatchesListProps {
  className?: string;
}

export const LatestMatchesList: React.FC<LatestMatchesListProps> = (
  props: LatestMatchesListProps,
) => {
  const [matches, setMatches] = useState<Match[]>([]);

  clientSideApi.streaming.latestMatches.useSubscription(undefined, {
    onData(newMatch) {
      setMatches((matches) => {
        const index = matches.findIndex(({ id }) => newMatch.id === id);
        if (index >= 0)
          return [...matches].map((oldMatch, i) =>
            i === index ? newMatch : oldMatch,
          );
        else
          return matches.length > 3
            ? [newMatch, ...matches.slice(0, -1)]
            : [newMatch, ...matches];
      });
    },
  });

  console.log(matches);

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
        {matches.map((match, idx) => (
          <MatchCard match={match} key={idx} />
        ))}
      </div>
    </div>
  );
};
