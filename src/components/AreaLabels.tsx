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
            className='p-2 bg-cblue rounded-full h-fit w-[50%] font-Inter font-black'
          >
            SET
          </button>
        </div>
      )}
    </div>
  );
};

export default AreaLabels;
