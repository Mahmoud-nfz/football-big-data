"use client";

import { Player } from "~/types/player";
import Image from "next/image";
import { DetailsQuad } from "./DetailsQuad";
import {
  SeasonIcon,
  BallIcon,
  AssistIcon,
  MatchIcon,
  TrophyIcon,
} from "~/assets/icons";
import { DropDownSelector } from "../general/DropdownSelector";
import { useState } from "react";
import { Match } from "~/types/match";
import { MatchesList } from "../matches/MatchesList";
import { latestMatches } from "~/data/matches";

interface PlayerStatsCardProps {
  player: Player;
  latestMatches: Match[];
  className?: string;
}

const otherPlayers = ["Cristiano Ronaldo", "Neymar Jr", "Kylian Mbappe"];

export const PlayerStatsCard: React.FC<PlayerStatsCardProps> = (
  props: PlayerStatsCardProps,
) => {
  const [cuurentSeason, setCurrentSeason] = useState<string | null>(null);
  const player = props.player;

  return (
    <div className={props.className}>
      <div className="flex flex-row justify-end pt-5">
        <DropDownSelector
          icon={
            <div className="h-10 w-10">
              <Image
                src={player.image}
                alt={player.name}
                width={50}
                height={50}
              />
            </div>
          }
          current={player.name}
          options={otherPlayers}
          onSelect={(option) => {
            // navigate to other player
          }}
        />
      </div>

      <div className="mt-10 flex flex-col p-4">
        <div className="mb-5 flex flex-row justify-between">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold">Statistics</h3>
            <p className="text-sm text-gray-500">
              Last update: {player.updatedAt}
            </p>
          </div>

          <DropDownSelector
            icon={<SeasonIcon className="h-5 w-5" />}
            current={cuurentSeason || "Select Season"}
            options={["2020/2021", "2021/2022", "2022/2023"]}
            onSelect={(option) => {
              setCurrentSeason(option);
            }}
          />
        </div>

        <DetailsQuad
          details={[
            { icon: BallIcon, text: `${player.goals} Goals` },
            { icon: AssistIcon, text: `${player.assists} Assists` },
            { icon: MatchIcon, text: `${player.matches} games played` },
            { icon: TrophyIcon, text: `${player.matchesWon} games won` },
          ]}
        />

        <div className="mx-1 mt-5 flex flex-row bg-white">
          <MatchesList matches={latestMatches} title="Latest Matches" />
        </div>
        <div className="p-3 justify-end text-right flex flex-row">
          <DropDownSelector
            icon={
              <div className="h-4 w-4">
                <Image
                  src={player.image}
                  alt={player.name}
                  width={50}
                  height={50}
                />
              </div>
            }
            current={"Compare"}
            options={otherPlayers}
            onSelect={(option) => {
                // compare with other player
            }}
            // className="mx-2 w-1/3"
            dropDirection="up"
          />
        </div>
      </div>
    </div>
  );
};
