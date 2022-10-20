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
    <div className='min-w-[20rem] h-[20rem] bg-white border-slate-600 border-2 rounded-md flex flex-col'>
      <div className='flex items-center content-center justify-start flex-col h-[90%] overflow-y-scroll p-2'>
        <h1 className='text-black font-bold'>
          <span className='text-red-700'>PLAN ID:</span>
          {plan_id}
        </h1>
        <h1 className='text-black font-bold w-full text-center'>
          <span className='text-red-700'>LS TIMES:</span>
          {plan_lsTimes.map((time: any) => {
            return <p className='text-center'>{time}</p>;
          })}
        </h1>
        <h1 className='font-bold text-black w-full text-center'>
          <span className='text-red-700'>AUTHORIZED USERS:</span>
          {plan_authorizedUsers.length === 0 ? (
            <p>No Users</p>
          ) : (
            plan_authorizedUsers.map((user: any) => {
              return <p>{user}</p>;
            })
          )}
        </h1>
        <h1 className='font-bold text-black w-full text-center'>
          <span className='text-red-700'>AUTHORIZED TEAMS:</span>
          {plan_authorizedTeams.length === 0 ? (
            <p>No Teams</p>
          ) : (
            plan_authorizedTeams.map((team: any) => {
              return <p>{team}</p>;
            })
          )}
        </h1>
        <h1 className='font-bold text-black w-full text-center'>
          <span className='text-red-700'>Date Created:</span>
          <p>{plan_created}</p>
        </h1>
      </div>
      <Link href={`/plan/${plan_id}`}>
        <div className='cursor-pointer flex h-[10%] content-center items-center justify-center text-white bg-black tranistion-all duration-200 hover:bg-slate-700'>
          VIEW PLAN
        </div>
      </Link>
    </div>
  );
};

export default PlansLabel;
