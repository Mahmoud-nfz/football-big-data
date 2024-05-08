import { IconProps } from "~/assets/icons";
import { DetailCard } from "./DetailCard";

interface DetailsQuadProps {
  details: {
    icon: React.FC<IconProps>;
    text: string;
  }[];
}

export const DetailsQuad: React.FC<DetailsQuadProps> = (
  props: DetailsQuadProps,
) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row my-1">
        {props.details.slice(0, 2).map((detail, index) => (
          <DetailCard key={index} icon={detail.icon} text={detail.text} />
        ))}
      </div>
      <div className="flex flex-row my-1">
        {props.details.slice(2, 4).map((detail, index) => (
          <DetailCard key={index} icon={detail.icon} text={detail.text} />
        ))}
      </div>
    </div>
  );
};
