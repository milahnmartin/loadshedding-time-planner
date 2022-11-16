import { IAreaData } from "@lstypes/types";
import classNames from "classnames";
import { useState } from "react";
import { FcExpand } from "react-icons/fc";
type AreaLabelsProps = {
  id: string;
  name: string;
  region: string;
  cbSetArea: (newArea: IAreaData) => void;
};
const AreaLabels = ({ id, name, region, cbSetArea }: AreaLabelsProps) => {
  const [extraInfo, setExtraInfo] = useState<boolean>(false);
  return (
    <div className='w-full h-fit flex-col'>
      <div className='font-black font-Inter flex items-center justify-end'>
        <h1 className='w-full flex justify-start text-white pb-1 tracking-wide'>
          {id}
        </h1>
        <span className='w-[10%] h-full flex justify-center items-center'>
          <FcExpand
            className={
              extraInfo
                ? classNames("transition-all duration-500 rotate-30 cursor-pointer")
                : classNames("transition-all duration-500 -rotate-90 cursor-pointer")
            }
            onClick={() => setExtraInfo((prev) => !prev)}
            size={20}
          />
        </span>
      </div>
      {extraInfo && (
        <div className='h-fit flex flex-col justify-center items-center text-white font-Inter overflow-y-scroll pb-3 rounded-2xl'>
          <h1 className='pt-1 font-extrabold text-blue-500 '>AREA NAME:</h1>
          <h1 className='mb-2 font-bold text-blue-200'>{name}</h1>

          <h1 className='pt-1 font-extrabold text-blue-500 '>AREA REGION:</h1>
          <h1 className='mb-3 font-bold text-blue-200'>{region}</h1>

          <button
            onClick={() => cbSetArea({ id, name, region })}
            className='relative inline-flex items-center justify-center p-0.5  w-[10rem] h-[3rem] overflow-hidden text-sm font-medium text-gray-900 rounded-[1.15rem] group bg-gradient-to-br from-c2aqua via-c2blue to-c2purple group-hover:from-c2aqua group-hover:via-c2blue group-hover:to-c2purple hover:text-white dark:text-white '
          >
            <span className='relative px-5 py-2.5 transition-all ease-in duration-200  w-[9.5rem] h-[2.5rem] bg-white dark:bg-gray-900 rounded-[1rem] group-hover:bg-opacity-0 font-bold'>
              SET AREA
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AreaLabels;
