import { IAreaData } from '@lstypes/types';
import { BiMap } from 'react-icons/bi';
import { HiOutlineMap } from 'react-icons/hi';
type AreaLabelsProps = {
  id: string;
  name: string;
  region: string;
  cbSetArea: (newArea: IAreaData) => void;
};
function AreaLabelV2({ id, name, region, cbSetArea }: AreaLabelsProps) {
  return (
    <div className="rounded-xl w-[20rem] h-[20rem] bg-gradient-to-r p-[4px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]">
      <div className="flex flex-col h-full w-full items-center justify-evenly bg-slate-800 text-white rounded-lg px-4">
        <span className="flex items-center justify-center ">
          <BiMap className="text-xl align-center justify-center pt-[3px] text-red-500" />
          <h1 className="pt-1 font-satoshiBlack text-blue-500 text-md ">
            AREA REGION:
          </h1>
        </span>
        <h1 className="mb-2 font-satoshi text-blue-200 tracking-wider text-center">
          {region}
        </h1>

        <span className="flex items-center justify-center space-x-1">
          <HiOutlineMap className="text-xl align-center justify-center pt-[3px] text-green-300" />
          <h1 className="pt-1 font-satoshiBlack text-blue-500">AREA NAME:</h1>
        </span>
        <h1 className="mb-3 font-satoshi text-blue-200 tracking-wider text-center">
          {name}
        </h1>

        <button
          onClick={() => cbSetArea({ id, name, region })}
          className="relative inline-flex items-center justify-center p-0.5  w-[10rem] h-[3rem] overflow-hidden text-sm font-medium text-slate-800 rounded-[1.15rem] group bg-gradient-to-br from-c2aqua via-c2blue to-c2purple group-hover:from-c2aqua group-hover:via-c2blue group-hover:to-c2purple hover:text-white dark:text-white ">
          <span className="relative px-5 py-2.5 transition-all ease-in duration-200  w-[9.5rem] h-[2.5rem] bg-white dark:bg-slate-800 rounded-[1rem] group-hover:bg-opacity-0 font-satoshi tracking-wide">
            SET AREA
          </span>
        </button>
      </div>
    </div>
  );
}

export default AreaLabelV2;
