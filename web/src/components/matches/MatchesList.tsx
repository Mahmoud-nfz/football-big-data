import { IconProps, MatchesIcon } from "~/assets/icons";
import { MatchCard } from "./MatchCard";
import { Match } from "~/types/match";

interface MatchesListProps {
    matches: Match[];
    title: string;
    className?: string;
}

export const MatchesList: React.FC<MatchesListProps> = (
  props: MatchesListProps,
) => {
  return (
    <div className="flex flex-col w-full">
        <div className="flex flex-row mt-3 mx-3 items-center">
            <MatchesIcon className="h-8 w-8"/>
            <div className="ml-3 font-semibold">{props.title}</div>
        </div>
        {props.matches.map((match, idx) => (
            <MatchCard key={idx} match={match} />
        ))}
    </div>
  );
};
