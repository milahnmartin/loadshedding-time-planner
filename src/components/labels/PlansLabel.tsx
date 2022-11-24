import { Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";
import { BiRightArrowAlt } from "react-icons/bi";
import { BsCalendar } from "react-icons/bs";
import { HiOutlineKey } from "react-icons/hi";
import { MdDeleteForever } from "react-icons/md";
import { v1 as uuidv1 } from "uuid";
type planData = {
  plan_id: string;
  plan_lsTimes: string[];
  plan_authorizedUsers: string[];
  plan_authorizedTeams: string[];
  plan_createdAt: string;
};
type PlansLabelProps = {
  plan: planData;
  deleteCB: (plan_id: string) => void;
};

const PlansLabel = ({ plan, deleteCB }: PlansLabelProps) => {
  const {
    plan_id,
    plan_lsTimes,
    plan_authorizedTeams,
    plan_authorizedUsers,
    plan_createdAt,
  } = plan;

  return (
    // <div className='overflow-y-scroll flex flex-col bg-gradient-to-r from-cblue via-cpurple to-c2purple p-1 w-[25rem] h-[20rem] rounded-xl border-2'>
    <div className='rounded-xl w-[25rem] h-[26rem] bg-gradient-to-r p-[3px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
      <div className='flex flex-col h-full w-full bg-slate-800 text-white rounded-lg'>
        <span className='flex flex-col items-center w-full h-fit pt-2'>
          <Player
            src='https://assets10.lottiefiles.com/packages/lf20_qwATcU.json'
            className='player w-[110px] h-[110px] '
            autoplay
            loop
            speed={0.8}
          />
        </span>
        <div className='w-full h-full flex items-center justify-center flex-wrap content-center overflow-y-scroll overflow-x-hidden flex-col'>
          <span className='flex items-center justify-center  flex-col'>
            <HiOutlineKey className='text-[1.15rem] align-center justify-center' />
            <h1 className='text-blue-500 text-center font-Inter font-black text-lg'>
              PLAN ID:
            </h1>
            <h1 className='text-blue-200 text-center text-lg font-bold pb-5'>
              {plan_id}
            </h1>
          </span>

          <span className='flex items-center justify-center flex-col'>
            <BsCalendar className='text-[1.075rem] align-center justify-center' />
            <h1 className='text-blue-500 text-center font-Inter font-black text-lg'>
              PLAN CREATED:
            </h1>
            <h1 className='text-blue-200 text-center text-lg font-bold '>
              {new Date(plan_createdAt).toUTCString()}
            </h1>
          </span>

          {plan_lsTimes.map((time: string) => {
            return (
              <h1 className='text-blue-500 text-center font-black text-lg' key={uuidv1()}>
                {time}
              </h1>
            );
          })}
          {plan_authorizedUsers.map((user: string) => {
            return (
              <pre key={uuidv1()} className='text-white text-center'>
                {user}
              </pre>
            );
          })}
          {plan_authorizedTeams.map((user: string) => {
            return (
              <pre key={uuidv1()} className='text-white text-center'>
                {user}
              </pre>
            );
          })}
        </div>
        <div className='flex items-center justify-center w-full h-fit pb-4 space-x-4'>
          <Link href={`/dashboard/${plan_id}`}>
            <button className='relative flex items-center justify-center  w-[10rem] h-[3rem] text-sm font-black text-gray-900 rounded-full group bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white '>
              <span className='relative px-5 py-2.5 group-hover:px-0 transition-all ease-in duration-200 w-[9.5rem] h-[2.5rem] bg-white dark:bg-slate-800 rounded-full group-hover:bg-opacity-0'>
                <span className='flex items-center justify-around'>
                  View Plan
                  <BiRightArrowAlt className='text-xl align-center justify-center relative top-[1px] group-hover:text-cpurple' />
                </span>
              </span>
            </button>
          </Link>

          <button
            onClick={() => deleteCB(plan_id)}
            className='group relative flex items-center justify-center  w-[5rem] h-[3rem] text-sm font-black text-gray-900 rounded-full group bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white '
          >
            <span className='relative px-5 py-2.5 group-hover:px-0 transition-all ease-in duration-200 w-[4.5rem] h-[2.5rem] bg-white dark:bg-slate-800 rounded-full group-hover:bg-opacity-0'>
              <span className='flex items-center justify-around'>
                <MdDeleteForever
                  title='Delete Plan'
                  // onClick={() => deleteCB(plan_id)}
                  className='cursor-pointer text-[1.3rem] align-center justify-center group-hover:text-red-700 transition-all duration-300'
                />
              </span>
            </span>
          </button>
          {/* <MdDeleteForever
            title='Delete Plan'
            onClick={() => deleteCB(plan_id)}
            className='cursor-pointer text-[1.5rem] align-center justify-center hover:text-red-700 transition-all duration-300'
          /> */}
        </div>
      </div>
    </div>
  );
};

export default PlansLabel;
