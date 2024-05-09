import Image from "next/image";
import { TopLists } from "~/components/home/TopLists";
import { LatestMatchesList } from "~/components/home/LatestMatchesList";
import messiImage from "public/images/player.png";

export const dynamic = "force-dynamic";

export default function HomeScreen() {
  return (
    <div
      className="relative min-h-screen bg-cover bg-fixed bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("/images/football-stadium-1.jpg")' }}
    >
      {/* Semi-transparent overlay */}
      <div className="absolute inset-0 h-full w-full bg-white bg-opacity-90">
        <div className="z-10 flex h-full items-center justify-between px-5">
          {/* Left Div */}
          <TopLists className="h-full w-1/3 py-4 text-left" />

          {/* Center Image */}
          <div className="flex-shrink-0">
            <Image
              src={messiImage}
              alt="Center Image"
              width={300}
              height={300}
            />
          </div>

          {/* Right Div */}
          <LatestMatchesList className="h-full w-1/3 py-4 text-left" />
        </div>
      </div>
    </div>
  );
}
