import { Player } from "@lottiefiles/react-lottie-player";
import classNames from "classnames";
function Introduction() {
  const gline = classNames(
    " w-[33%] h-[0.25rem] bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] rounded border-0 "
    // " w-[30%] h-[0.25rem] bg-gradient-to-r from-[#9333EA] via-[#3B82F6] to-[#6EE7B7] rounded border-0 "
    // " w-[30%] h-[0.25rem] bg-gradient-to-r from-[#9333EA] via-[#3B82F6] to-[#6EE7B7] rounded border-0 "
  );
  return (
    <div className='flex flex-col h-full w-full pl-8 pr-8'>
      <span className='flex flex-col items-center w-full h-fit pb-10'>
        <Player
          src='https://assets1.lottiefiles.com/packages/lf20_fifomona.json'
          className='player w-[250px] h-[250px] '
          autoplay
          loop
          speed={0.8}
        />
      </span>
      <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple font-satoshiBold text-2xl'>
        WHAT IS LS PLANNER?
      </h1>
      <p className='text-white font-satoshi text-lg pb-4'>
        LS PLANNER is a tool that makes it simple and easy to schedule meetings and gaming
        sessions around loadshedding.
      </p>
      <hr className={gline} />
      <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple font-satoshiBold text-2xl pt-4'>
        HOW DOES LS PLANNER WORK?
      </h1>
      <p className='text-white font-satoshi text-lg pb-4'>
        Users set their loadshedding location. LS PLANNER then automatically tracks their
        loadshedding schedule through an API. The user then creates a "plan" where they
        can choose a date, start and end time and invite other users or teams to their
        plan. Other users then accept the invite and get added to the "plan". LS PLANNER
        then compares all the users on the "plan's" loadshedding times and then shows all
        available times where nobody on the "plan" has loadshedding in the chosen
        timeframe.
      </p>
      <hr className={gline} />
      <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple font-satoshiBold text-2xl pt-4'>
        WHY USE LS PLANNER?
      </h1>
      <p className='text-white font-satoshi text-lg pb-4'>
        There is nothing more frustrating than trying to do something productive or
        playing some games with friends just for loadshedding to end it. It is predicted
        that loadshedding will continue till 2027 if not longer. LS PLANNER can't do
        anything about that, but we can make it easier for you to schedule meetings and
        gaming sessions with friends.
      </p>
    </div>
  );
}

export default Introduction;
