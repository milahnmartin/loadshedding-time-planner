import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth } from "../utils/firebase-config";
const ProfileIndex = () => {
  const [user, loading] = useAuthState(auth);
  return (
    <div className='p-5 flex items-center flex-col w-full h-full'>
      <div className='flex h-1/3 w-full flex-col'>
        <div className='pt-5 flex items-start justify-center w-full h-full'>
          <h1 className='font-extrabold mb-5 text-4xl animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple py-4 md:text-6xl'>
            PROFILE INFORMATION
          </h1>
        </div>
        <div className='p-5 flex items-center flex-col borde-solid w-full h-full'>
          {/* Testing profile Card */}
          <div className='flex h-screen w-full items-center justify-center'>
            <div className='max-w-md rounded-xl shadow-lg backdrop-blur-2xl bg-white/10'>
              <div className='flex items-center justify-center w-full h-full space-x-5 pt-8 pb-0 -mb-4'>
                {user && (
                  <Image
                    className='rounded-full'
                    height={90}
                    width={90}
                    src={user?.photoURL as string}
                    alt='Image of Lightbulb'
                  />
                )}
              </div>

              <div className='flex flex-row items-center gap-6 p-8'>
                <h3 className='text-2xl font-bold text-slate-300'>Username:</h3>
                <p className='text-2xl font-bold text-slate-300'>
                  {user?.displayName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileIndex;
