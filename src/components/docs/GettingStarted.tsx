import { Player } from "@lottiefiles/react-lottie-player";
import classNames from "classnames";

function GettingStarted() {
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
      <hr className={gline} />=
    </div>
  );
}

export default GettingStarted;
