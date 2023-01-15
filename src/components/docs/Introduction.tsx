import { Player } from "@lottiefiles/react-lottie-player";
import classNames from "classnames";
function Introduction() {
  const gline = classNames(
    " w-[33%] h-[0.25rem] bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] rounded border-0 "
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
      <span className='flex space-x-2 h-[50px] items-center'>
        <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-c2purple font-satoshiBold text-[1.75rem]'>
          WHAT IS LS PLANNER?
        </h1>
        <Player
          src='https://assets4.lottiefiles.com/packages/lf20_oo3N9WVAgU.json'
          className='player w-[45px] h-[45px] '
          autoplay
          loop
          speed={0.8}
        />
      </span>
      <p className='text-white font-satoshi text-lg pb-4'>
        LS PLANNER is a tool that makes it simple and easy to schedule meetings and gaming
        sessions around loadshedding.
      </p>
      <hr className={gline} />
      <span className='flex space-x-2 h-[50px] items-center'>
        <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-c2purple font-satoshiBold text-[1.75rem]'>
          HOW DOES LS PLANNER WORK?
        </h1>
        <Player
          src='https://assets4.lottiefiles.com/private_files/lf30_3vhjjbex.json'
          className='player w-[35px] h-[35px] '
          autoplay
          loop
          speed={0.3}
        />
      </span>
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
      <span className='flex space-x-2 h-fit items-center'>
        <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-c2purple font-satoshiBold text-[1.75rem]'>
          WHY USE LS PLANNER?
        </h1>
        <Player
          src='https://assets2.lottiefiles.com/packages/lf20_jjvdmajt.json'
          className='player w-[50px] h-[50px] '
          autoplay
          loop
          speed={0.5}
        />
      </span>
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
