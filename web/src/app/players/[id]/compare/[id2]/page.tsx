import Image from "next/image";
import { PlayerInfoCard } from "~/components/players/PlayerInfoCard";
import { PlayerStatsCard } from "~/components/players/PlayerStatsCard";
import { player1, player2 } from "~/data/players";

export default function PlayerScreen() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-fixed bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/images/football-stadium-1.jpg")' }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 h-screen max-h-screen w-full overflow-auto bg-white bg-opacity-90">
        <div className="z-10 flex h-screen max-h-screen overflow-auto items-center justify-between px-5">
          {/* Left Div */}
          <PlayerInfoCard
            player={player1}
            className="h-full w-1/4 py-4 text-left"
          />

          {/* Center Image */}
          <div className="flex h-full flex-row items-end">
            <div
              style={{
                width: "300px",
                height: "600px",
                display: "flex",
                alignItems: "flex-end",
                position: "relative",
              }}
            >
              <Image
                src={player1.image}
                alt="Player 1"
                layout="fill" // Changed to 'fill' to better control positioning
                objectFit="contain" // Keeps the image within the bounds of the div without stretching
                objectPosition="bottom" // Aligns the image to the bottom of the div
              />
            </div>
            <div
              style={{
                width: "300px",
                height: "600px",
                display: "flex",
                alignItems: "flex-end",
                position: "relative",
              }}
            >
              <Image
                src={player2.image}
                alt="Player 2"
                layout="fill" // Changed to 'fill' to better control positioning
                objectFit="contain" // Keeps the image within the bounds of the div without stretching
                objectPosition="bottom" // Aligns the image to the bottom of the div
              />
            </div>
          </div>

          {/* Right Div */}
          <PlayerInfoCard
            player={player2}
            className="h-full w-1/4 py-4 text-left"
          />
        </div>
      </div>
    </div>
  );
}
