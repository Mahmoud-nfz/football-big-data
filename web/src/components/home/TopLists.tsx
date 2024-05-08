import Image from "next/image";
import { leagues } from "~/data/leagues";
import { DetailsQuad } from "../players/DetailsQuad";
import { TopPlayers } from "./TopPlayers";
import { TopTeams } from "./TopTeams";

interface TopListsProps {
  className?: string;
}

export const TopLists: React.FC<TopListsProps> = (props: TopListsProps) => {
  return (
    <div className={props.className}>
      <Image src="/logo.png" alt="Center Image" width={300} height={300} />
      <div className="flex flex-col p-4">
        <DetailsQuad
          details={leagues.map((league) => ({
            icon: ({ className }) => (
              <Image
                src={league.logo}
                alt={league.name}
                width={100}
                height={100}
                className={`object-contain ${className}`}
              />
            ),
            text: league.name,
          }))}
        />

        <TopPlayers />
        <TopTeams />
      </div>
    </div>
  );
};
