import classNames from "classnames";
import { useState } from "react";
import { FcExpand } from "react-icons/fc";
const AreaLabels = ({ id, name, region, cbSetArea }: any) => {
  const [extraInfo, setExtraInfo] = useState<boolean>(false);
  return (
    <div className='w-full h-fit flex-col'>
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
        <div className='h-fit flex flex-col justify-evenly items-center text-white font-Inter overflow-y-scroll space-y-3'>
          <pre>Name: {name}</pre>
          <pre>Region: {region}</pre>
          <button
            onClick={() => cbSetArea({ id, name, region })}
            className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 w-[10rem] h-[3rem] overflow-hidden text-sm font-medium text-gray-900 rounded-2xl group bg-gradient-to-br from-c2aqua via-c2blue to-c2purple group-hover:from-c2aqua group-hover:via-c2blue group-hover:to-c2purple hover:text-white dark:text-white '
          >
            {/* className='p-2 bg-cblue rounded-full h-fit w-[50%] font-Inter font-black' */}
            <span className='relative px-5 py-2.5 transition-all ease-in duration-200 w-[9.5rem] h-[2.5rem] bg-white dark:bg-gray-900 rounded-2xl group-hover:bg-opacity-0 font-bold'>
              SET AREA
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default AreaLabels;
