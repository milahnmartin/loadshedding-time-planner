import { auth } from "@utils/firebase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { Player } from "@lottiefiles/react-lottie-player";
const TeamProfile = () => {
  const [user, loading] = useAuthState(auth);
  return (
    <div className='p-5 w-full h-full flex items-center '>
      <div className='w-full flex flex-col items-center justify-center'>
        <div className='rounded-xl w-[45rem] h-fit bg-gradient-to-r p-[3px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
          <div className='flex flex-col h-full w-full bg-slate-800 text-white rounded-lg'>
            <span className='flex flex-col items-center w-full h-fit pt-4 pb-4'>
              <h1 className='text-3xl font-satoshiBlack pt-6 pb-4'>
                TEAM SETTINGS COMMING SOON
              </h1>
              <Player
                src='https://assets4.lottiefiles.com/packages/lf20_oo3N9WVAgU.json'
                className='player w-[300px] h-[300px] '
                autoplay
                loop
                speed={0.5}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamProfile;
