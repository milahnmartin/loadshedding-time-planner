import { IAreaData } from "@lstypes/types";
import classNames from "classnames";
import { useState } from "react";
import { BiMap } from "react-icons/bi";
import { FcExpand } from "react-icons/fc";
import { HiOutlineMap } from "react-icons/hi";
type AreaLabelsProps = {
  id: string;
  name: string;
  region: string;
  cbSetArea: (newArea: IAreaData) => void;
};

const AreaLabels = ({ id, name, region, cbSetArea }: AreaLabelsProps) => {
  const [extraInfo, setExtraInfo] = useState<boolean>(false);

  return (
    <div className='w-full h-fit p-1 rounded-lg relative cursor-pointer'>
      <div onClick={() => setExtraInfo((prev) => !prev)} className='flex items-center'>
        <h1 className='w-full flex justify-start text-white font-satoshi tracking-widest text-md'>
          {region}
        </h1>
        <span className='w-[10%] h-full flex justify-center items-center'>
          <FcExpand
            className={
              extraInfo
                ? classNames("transition-transform duration-500 rotate-30 cursor-pointer")
                : classNames(
                    "transition-transform duration-500 -rotate-90 cursor-pointer"
                  )
            }
            size={20}
          />
        </span>
      </div>
      {extraInfo && (
        <div className='h-fit flex flex-col justify-center items-center text-white font-sathoshi overflow-y-scroll pb-3 rounded-2xl'>
          <span className='flex items-center justify-center '>
            <BiMap className='text-xl align-center justify-center pt-[3px] text-red-500' />
            <h1 className='pt-1 font-satoshiBlack text-blue-500 text-md '>
              AREA REGION:
            </h1>
          </span>
          <h1 className='mb-2 font-satoshi text-blue-200 tracking-wider'>{region}</h1>

          <span className='flex items-center justify-center space-x-1'>
            <HiOutlineMap className='text-xl align-center justify-center pt-[3px] text-green-300' />
            <h1 className='pt-1 font-satoshiBlack text-blue-500 '>AREA NAME:</h1>
          </span>
          <h1 className='mb-3 font-satoshi text-blue-200 tracking-wider'>{name}</h1>

          <button
            onClick={() => cbSetArea({ id, name, region })}
            className='relative inline-flex items-center justify-center p-0.5  w-[10rem] h-[3rem] overflow-hidden text-sm font-medium text-slate-800 rounded-[1.15rem] group bg-gradient-to-br from-c2aqua via-c2blue to-c2purple group-hover:from-c2aqua group-hover:via-c2blue group-hover:to-c2purple hover:text-white dark:text-white '
          >
            <span className='relative px-5 py-2.5 transition-all ease-in duration-200  w-[9.5rem] h-[2.5rem] bg-white dark:bg-slate-800 rounded-[1rem] group-hover:bg-opacity-0 font-satoshi tracking-wide'>
              SET AREA
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AreaLabels;
