import { uuidv4 } from "@firebase/util";
import Link from "next/link";

const PlansLabel = ({ plan }: any) => {
  let {
    plan_id,
    plan_lsTimes,
    plan_authorizedTeams,
    plan_authorizedUsers,
    plan_created,
  } = plan;
  plan_lsTimes = JSON.parse(plan_lsTimes);
  plan_authorizedTeams = JSON.parse(plan_authorizedTeams);
  plan_authorizedUsers = JSON.parse(plan_authorizedUsers);

  return (
    <div className='flex flex-col bg-slate-900 w-[40%] min-h-fit rounded-lg text-white font-sans text-center'>
      <div className='h-full w-full flex flex-col items-center justify-evenly p-2 text-md font-black'>
        <h1>Plan ID: {plan_id}</h1>
        <h1>
          Loadshedding Times:{" "}
          {plan_lsTimes.map((time: any) => {
            return <p key={uuidv4()}>{time}</p>;
          })}
        </h1>
        <h1>
          Authed Users:{" "}
          {plan_authorizedUsers.length == 0
            ? "No Teams Autorized"
            : plan_authorizedUsers.map((user: any) => {
                return <p key={uuidv4()}>{user}</p>;
              })}
        </h1>
        <h1>
          Authed Teams:{" "}
          {plan_authorizedTeams.length == 0
            ? "No Teams Autorized"
            : plan_authorizedTeams.map((team: any) => {
                return <p key={uuidv4()}>{team}</p>;
              })}
        </h1>
        <h1>Time Created: {plan_created}</h1>
      </div>
      <div className='h-[15%] flex w-full justify-center'>
        <Link href={`/plan/${plan_id}`}>
          <button className='w-full p-2 text-white font-bold bg-sky-500 rounded-sm border-none tracking-wide transition-color duration-300 hover:bg-primary'>
            VIEW PLAN
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PlansLabel;
