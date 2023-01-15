import { Variants } from "@lstypes/types";
import classNames from "classnames";

type LabelProps = {
  variant: Variants;
  data: string;
};

const GreenLabel = ({ data, variant }: LabelProps) => {
  const lscolorClassName = classNames("text-white text-1xl rounded-lg px-4 py-2", {
    "bg-red-700": variant === "ls",
    "bg-cblue": variant === "availible",
    "bg-yellow-500": variant === "buffer",
  });

  return <span className={lscolorClassName}>{data}</span>;
};

export default GreenLabel;
