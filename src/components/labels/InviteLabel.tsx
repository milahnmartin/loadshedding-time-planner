import { uuidv4 } from "@firebase/util";
import { Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";

const InviteLabel = ({ plan }: any) => {
  let {
    plan_id,
    plan_lsTimes,
    plan_authorizedTeams,
    plan_authorizedUsers,
    plan_createdAt,
  } = plan;
  return (
    <div className='rounded-xl w-[25rem] h-[20rem] bg-gradient-to-r p-[5px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
      <div className='flex flex-col items-center justify-center h-full bg-slate-800 text-white rounded-lg p-2'>
        <span className='flex flex-col items-center w-full h-full rounded-xl'>
          <Player
            src='https://assets10.lottiefiles.com/packages/lf20_9ti102vm.json'
            className='player w-[90px] h-[90px] '
            autoplay
            loop
            speed={0.4}
          />
          <div className='w-full h-full flex items-center justify-center flex-col space-y-1 overflow-y-scroll'>
            <h1 className='text-blue-500 text-center font-Inter font-black text-lg'>
              PLAN ID
            </h1>
            <h1 className='text-blue-200 text-center text-lg font-bold '>
              {plan_id}
            </h1>

            <h1 className='text-blue-500 text-center font-black text-lg'>
              PLAN CREATED:
            </h1>
            <h1 className='text-blue-200 text-center text-lg font-bold '>
              {new Date(plan_createdAt).toUTCString()}
            </h1>
            {plan_lsTimes.map((time: string) => {
              return (
                <h1
                  className='text-blue-500 text-center font-black text-lg'
                  key={uuidv4()}
                >
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
              <button className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 w-[10rem] h-[3rem] overflow-hidden text-sm font-black text-gray-900 rounded-full group bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white '>
                <span className='relative px-5 py-2.5 transition-all ease-in duration-200 w-[9.5rem] h-[2.5rem] bg-white dark:bg-slate-800 rounded-full group-hover:bg-opacity-0'>
                  View Plan
                </span>
              </button>
            </Link>
          </div>
        </span>
      </div>
    </div>
  );
};

export default InviteLabel;
