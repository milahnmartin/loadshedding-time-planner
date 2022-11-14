import { uuidv4 } from "@firebase/util";
import Link from "next/link";

const arrowIcon = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
    strokeWidth={1.5}
    stroke='currentcolor'
    className='w-6 h-6'
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
    />
  </svg>
);
const PlansLabel = ({ plan }: any) => {
  let {
    plan_id,
    plan_lsTimes,
    plan_authorizedTeams,
    plan_authorizedUsers,
    plan_createdAt,
  } = plan;
  return (
    // <div className='overflow-y-scroll flex flex-col bg-gradient-to-r from-cblue via-cpurple to-c2purple p-1 w-[25rem] h-[20rem] rounded-xl border-2'>
    <div className='rounded-xl w-[25rem] h-[20rem] bg-gradient-to-r p-[5px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
      <div className='flex flex-col items-center h-full bg-slate-800 text-white rounded-lg p-4'>
        <span className='flex flex-col w-full h-full rounded-xl'>
          <div className='w-full h-full flex items-center justify-center flex-col space-y-2 overflow-y-scroll'>
            <h1>Plan ID</h1>
            <h1 className='text-white text-center font-Inter font-bold'>
              {plan_id}
            </h1>

            <h1>Plan Created On:</h1>
            <pre className='text-white text-center font-bold'>
              {new Date(plan_createdAt).toUTCString()}
            </pre>
            {plan_lsTimes.map((time: string) => {
              return (
                <h1 className='text-white text-center font-bold' key={uuidv4()}>
                  {time}
                </h1>
              );
            })}
            {plan_authorizedUsers.map((user: string) => {
              return <pre className='text-white text-center'>{user}</pre>;
            })}
            {plan_authorizedTeams.map((user: string) => {
              return <pre className='text-white text-center'>{user}</pre>;
            })}
          </div>
          <div className='flex items-center justify-center'>
            <Link href={`/dashboard/${plan_id}`}>
              {/* <button className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 w-[10rem] h-[3rem] overflow-hidden text-sm font-black text-gray-900 rounded-full group bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white '>
                <span className='relative px-5 py-2.5 transition-all ease-in duration-200 w-[9.5rem] h-[2.5rem] bg-white dark:bg-slate-800 rounded-full group-hover:bg-opacity-0'>
                  View Plan
                  <BiRightArrowAlt className='text-2xl' />
                </span>
              </button> */}
              <button className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 w-[10rem] h-[3rem] overflow-hidden text-sm font-black text-gray-900 rounded-full group bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] hover:text-white dark:text-white '>
                NEW PLAN
                <div className='relative left-[6px] top-[.5px] transition-all duration-250 group-hover:text-yellow-500 '>
                  {arrowIcon}
                </div>
              </button>
            </Link>
          </div>
        </span>
      </div>
    </div>
  );
};

export default PlansLabel;
