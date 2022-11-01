import { IAreaData } from "@lstypes/types";
import classNames from "classnames";
import { useState } from "react";
import { FcExpand } from "react-icons/fc";
const AreaLabels = ({ id, name, region }: IAreaData) => {
  const [extraInfo, setExtraInfo] = useState<boolean>(false);
  return (
    <div className='w-full h-fit flex-col border-2'>
      <div className='font-black font-Inter flex items-center justify-end'>
        <h1 className='w-full flex justify-start text-white'>{id}</h1>
        <span className='w-[10%] h-full flex justify-center items-center'>
          <FcExpand
            className={
              extraInfo
                ? classNames("transition-all duration-500 rotate-180 cursor-pointer")
                : classNames("transition-all duration-500 cursor-pointer")
            }
            onClick={() => setExtraInfo((prev) => !prev)}
            size={20}
          />
        </span>
      </div>
      {extraInfo && (
        <div className='h-fit flex justify-evenly items-center text-white font-Inter overflow-y-scroll'>
          {name}
          {region}
        </div>
      )}
    </div>
  );
};

export default AreaLabels;
