import { Player } from "~/types/player";
import Image from "next/image";
import { DetailsQuad } from "./DetailsQuad";
import {
  AgeIcon,
  FacebookIcon,
  HeightIcon,
  InstagramIcon,
  ShoeIcon,
  ValueIcon,
  XIcon,
} from "~/assets/icons";

interface PlayerInfoCardProps {
  player: Player;
  className?: string;
}

export const PlayerInfoCard: React.FC<PlayerInfoCardProps> = (
  props: PlayerInfoCardProps,
) => {
  const player = props.player;
  return (
    <div className={props.className}>
      <Image src="/logo.png" alt="Center Image" width={300} height={300} />
      <div className="flex flex-col p-4">
        <div className="mb-5 flex flex-row justify-between">
          <div className="flex flex-col">
            <h3 className="text-xl font-bold">
              {player.name}
              <span className="pl-5 text-sm text-gray-500">
                #{player.number}
              </span>
            </h3>
            <p className="text-sm text-gray-500">{player.position}</p>
          </div>
          <div className="flex flex-row">
            {/* club icon and country flag */}
            <div className="flex flex-row">
              <div className="mx-1 flex h-16 w-16 items-center justify-center rounded-md bg-white p-4">
                <Image
                  src={player.clubIcon}
                  alt="Club Icon"
                  width={50}
                  height={50}
                />
              </div>
              <div className="mx-1 flex h-16 w-16 items-center justify-center rounded-md bg-white p-3">
                <Image
                  src={player.countryFlag}
                  alt="Country Flag"
                  width={50}
                  height={50}
                />
              </div>
            </div>
          </div>
        </div>

        <DetailsQuad
          details={[
            { icon: ShoeIcon, text: `${player.preferredFoot} Foot` },
            { icon: HeightIcon, text: `${player.height} cm` },
            { icon: AgeIcon, text: `${player.age} Years` },
            { icon: ValueIcon, text: player.value },
          ]}
        />

        <p className="mt-5 text-sm text-gray-500">{player.description}</p>

        {/* social media hadlers */}
        <div className="mt-5 flex flex-row">
          <FacebookIcon className="mx-1 h-8 w-8" />
          <XIcon className="mx-1 h-8 w-8" />
          <InstagramIcon className="mx-1 h-8 w-8" />
        </div>
      </div>
    </div>
  );
};
