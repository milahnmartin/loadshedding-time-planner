import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase-config";
import { Player } from "@lottiefiles/react-lottie-player";
const ProfileIndex = () => {
  const [user, loading] = useAuthState(auth);
  return (
    <div className='p-5 w-full h-full flex items-center flex-col'>
      <div className='w-full flex flex-col items-center justify-start'>
        <h1 className='font-extrabold mb-5 text-4xl animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple pt-4 md:text-6xl'>
          PROFILE INFORMATION
        </h1>
        <Player
          src='https://assets7.lottiefiles.com/packages/lf20_xyadoh9h.json'
          className='player w-[300px] h-[300px] '
          autoplay
          loop
          speed={0.5}
        />
      </div>
      <div className='flex h-full w-full items-start justify-center pt-7'>
        <div className='rounded-xl w-[30rem] h-auto mx-auto bg-gradient-to-r p-[6px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
          <div className='flex flex-col items-center h-full bg-black text-white rounded-lg p-4 '>
            {user && (
              <Image
                className='rounded-full'
                height={90}
                width={90}
                src={user?.photoURL as string}
                alt='Image of Lightbulb'
              />
            )}
            <div className='flex flex-row items-center gap-4 p-6 pb-1'>
              <h3 className='text-2xl font-bold text-slate-300'>Username:</h3>
              <p className='text-2xl font-bold text-slate-300'>
                {user?.displayName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileIndex;
