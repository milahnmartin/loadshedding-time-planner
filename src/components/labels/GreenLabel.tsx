import { Variants } from "@lstypes/types";
import classNames from "classnames";

type LabelProps = {
  variant: Variants;
  data: string;
};

const GreenLabel = ({ data, variant }: LabelProps) => {
  const lsColor = classNames(
    "text-white text-1xl rounded-full bg-red-700 flex items-center justify-center px-4 py-2 font-Inter font-black"
  );
  const avColor = classNames(
    "text-white text-1xl rounded-full bg-cblue flex items-center justify-center px-4 py-2 font-Inter font-black"
  );
  const bufferColor = classNames(
    "text-white text-1xl rounded-full bg-yellow-500 flex items-center justify-center px-4 py-2 font-Inter font-black"
  );

  const theColor = () => {
    switch (variant) {
      case "ls":
        return lsColor;
      case "availible":
        return avColor;
      case "buffer":
        return bufferColor;
    }
  };
  console.log(data);
  return (
    <div className={theColor()}>
      <pre className='text-white'>{JSON.stringify(data)}</pre>
    </div>
  );
};

export default GreenLabel;
