import { Player } from "@lottiefiles/react-lottie-player";
import { IInviteData } from "@lstypes/types";
import { useState } from "react";
import { BsCalendar } from "react-icons/bs";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { HiOutlineKey } from "react-icons/hi";
import { ImCross } from "react-icons/im";
type InviteLabelProps = {
  cbAccept: (plan_id: string) => void;
  cbDecline: (plan_id: string) => void;
  data: IInviteData;
};
const InviteLabel = ({
  data: { plan_id, invitedBy },
  cbAccept,
  cbDecline,
}: InviteLabelProps) => {
  const [isWaiting, setIsWaiting] = useState(false);
  return (
    <div className='rounded-xl w-[26rem] h-[32rem] bg-gradient-to-r p-[3px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
      <div className='flex flex-col h-full w-full bg-slate-800 text-white rounded-lg'>
        <span className='flex flex-col items-center w-full h-fit pt-2'>
          <Player
            src='https://assets4.lottiefiles.com/packages/lf20_cD9T3LPg2R.json'
            className='player w-[110px] h-[110px] '
            autoplay
            loop
            speed={0.8}
          />
        </span>
        <div className='w-full h-full flex items-center justify-center flex-wrap content-center overflow-y-scroll overflow-x-hidden flex-col'>
          <span className='flex items-center justify-center  flex-col'>
            <HiOutlineKey className='text-[1.15rem] align-center justify-center' />
            {/* <h1 className='text-blue-500 text-center font-Inter font-black text-lg'> */}
            <h1 className='text-center font-Inter font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-c2aqua via-c2blue to-c2purple'>
              PLAN ID:
            </h1>
            <h1 className='text-blue-200 text-center text-lg font-bold pb-5'>
              {plan_id}
            </h1>
          </span>

          <span className='flex items-center justify-center  flex-col'>
            <FaUserCircle className='text-[1.15rem] align-center justify-center' />
            {/* <h1 className='text-blue-500 text-center font-Inter font-black text-lg'> */}
            <h1 className='text-center font-Inter font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-c2aqua via-c2blue to-c2purple'>
              INVITED BY:
            </h1>
            <h1 className='text-blue-200 text-center text-lg font-bold pb-2'>
              {invitedBy[1]}
            </h1>
            <h1 className='text-blue-200 text-center text-lg font-bold pb-5'>
              {invitedBy[0]}
            </h1>
          </span>

          <span className='flex items-center justify-center flex-col'>
            <BsCalendar className='text-[1.075rem] align-center justify-center' />
            {/* <h1 className='text-blue-500 text-center font-Inter font-black text-lg'> */}
            <h1 className='text-center font-Inter font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-c2aqua via-c2blue to-c2purple'>
              PLAN CREATED:
            </h1>
            <h1 className='text-blue-200 text-center text-lg font-bold pb-2 '>
              Wed, 30 Nov 2022 10:56:11 GMT
            </h1>
          </span>
        </div>
        <div className='flex items-center justify-center w-full h-fit pb-4 space-x-4'>
          <button
            className='relative flex items-center justify-center  w-[6rem] h-[3rem] text-sm font-black text-gray-900 rounded-full group bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white '
            onClick={() => {
              setIsWaiting(true);
              cbAccept(plan_id);
              setTimeout(() => {
                setIsWaiting(false);
              }, 4000);
            }}
            disabled={isWaiting}
          >
            <span className='relative px-5 py-2.5 group-hover:px-0 transition-all ease-in duration-200 w-[5.5rem] h-[2.5rem] bg-white dark:bg-slate-800 rounded-full group-hover:bg-opacity-0'>
              <span className='flex items-center justify-around'>
                <FaCheck className='text-xl align-center justify-center relative top-[1px] group-hover:text-green-500' />
              </span>
            </span>
          </button>

          <button
            onClick={() => {
              setIsWaiting(true);
              cbDecline(plan_id);
              setTimeout(() => {
                setIsWaiting(false);
              }, 4000);
            }}
            className='group relative flex items-center justify-center  w-[6rem] h-[3rem] text-sm font-black text-gray-900 rounded-full group bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white '
            disabled={isWaiting}
          >
            <span className='relative px-5 py-2.5 group-hover:px-0 transition-all ease-in duration-200 w-[5.5rem] h-[2.5rem] bg-white dark:bg-slate-800 rounded-full group-hover:bg-opacity-0'>
              <span className='flex items-center justify-around'>
                <ImCross className='cursor-pointer text-xl align-center justify-center group-hover:text-red-700 transition-all duration-300' />
              </span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteLabel;
