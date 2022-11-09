import { uuidv4 } from "@firebase/util";
import Link from "next/link";

const PlansLabel = ({ plan }: any) => {
  let {
    plan_id,
    plan_lsTimes,
    plan_authorizedTeams,
    plan_authorizedUsers,
    plan_createdAt,
  } = plan;
  return (
    <div className='overflow-y-scroll flex flex-col bg-gradient-to-r from-cblue via-cpurple to-c2purple p-1 w-[25rem] h-[20rem] rounded-xl'>
      <span className='flex flex-col w-full h-full bg-black rounded-xl'>
        <div className='w-full h-full flex items-center justify-center flex-col space-y-2 overflow-y-scroll'>
          <pre className='text-white text-center'>{plan_id}</pre>
          <pre className='text-white text-center'>
            {new Date(plan_createdAt).toUTCString()}
          </pre>
          {plan_lsTimes.map((time: string) => {
            return (
              <pre className='text-white text-center' key={uuidv4()}>
                {time}
              </pre>
            );
          })}
          {plan_authorizedUsers.map((user: string) => {
            return <pre className='text-white text-center'>{user}</pre>;
          })}
          {plan_authorizedTeams.map((user: string) => {
            return <pre className='text-white text-center'>{user}</pre>;
          })}
        </div>
        <Link href={`/dashboard/${plan_id}`}>
          <button className='relative w-full inline-flex items-center justify-center px-[2px] py-[2px]  h-[3rem] overflow-hidden text-sm font-medium text-gray-900 rounded-xl group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white '>
            <span className='text-center flex items-center justify-center relative transition-all ease-in duration-200 w-full h-full bg-white dark:bg-gray-900 rounded-xl group-hover:bg-opacity-0'>
              VISIT
            </span>
          </button>
        </Link>
      </span>
    </div>
  );
};

export default PlansLabel;
