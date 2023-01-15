import { Variants } from "@lstypes/types";
import classNames from "classnames";

type LabelProps = {
  variant: Variants;
  data: string;
};

const GreenLabel = ({ data, variant }: LabelProps) => {
  const lscolorClassName = classNames(
    "text-white text-1xl rounded-lg flex items-center justify-center px-4 py-2 self-center",
    {
      "bg-red-700": variant === "ls",
      "bg-cblue": variant === "availible",
      "bg-yellow-500": variant === "buffer",
    }
  );

  return (
    <div className={lscolorClassName}>
      <h1 className='font-satoshiBold'>{data}</h1>
    </div>
  );
};

export default GreenLabel;
