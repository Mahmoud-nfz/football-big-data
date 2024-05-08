import { IconProps } from "~/assets/icons";

interface DetailCardProps {
  icon: React.FC<IconProps>;
  text: string;
}

export const DetailCard: React.FC<DetailCardProps> = (
  props: DetailCardProps,
) => {
  return (
    <div className="mx-1 flex w-1/2 flex-row items-center text-left rounded-lg bg-white p-3">
        {props.icon({ className: "h-8 w-10 mx-3" })}
      <div className="ml-3 text-sm font-bold">{props.text}</div>
    </div>
  );
};
