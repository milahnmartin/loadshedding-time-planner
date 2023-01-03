import { Variants } from "@lstypes/types";
import classNames from "classnames";

type LabelProps = {
  variant: Variants;
  data: string;
};

const GreenLabel = ({ data, variant }: LabelProps) => {
  const lscolorClassName = classNames(
    "text-white text-1xl rounded-full flex items-center justify-center px-4 py-2 font-SatoshiBlack",
    {
      "bg-red-700": variant === "ls",
      "bg-cblue": variant === "availible",
      "bg-yellow-500": variant === "buffer",
    }
  );

  return (
    <div className={lscolorClassName}>
      <pre className='text-white'>{JSON.stringify(data)}</pre>
    </div>
  );
};

export default GreenLabel;
