import { Player } from "@lottiefiles/react-lottie-player";
import classNames from "classnames";

function HowToUse() {
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
      <span className='flex space-x-0 h-[50px] items-center'>
        <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-c2purple font-satoshiBold text-[1.75rem]'>
          HOW TO USE LS PLANNER
        </h1>
        <Player
          src='https://assets10.lottiefiles.com/packages/lf20_8xw4cfyj.json'
          className='player w-[50px] h-[50px] '
          autoplay
          loop
          speed={0.8}
        />
      </span>
      <p className='text-white font-satoshi text-lg pb-4'>
        Follow the steps below to start using LS PLANNER
      </p>
      <hr className={gline} />
      <h2 className='text-white font-satoshi text-lg pt-2'>
        1.&ensp;Navigate to the{" "}
        <a className='underline font-satoshiBold' href='/auth/login'>
          SIGN IN
        </a>{" "}
        button on the top right of the screen
      </h2>
    </div>
  );
}
export default HowToUse;
