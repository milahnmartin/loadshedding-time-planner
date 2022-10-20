import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import Logo from "../pages/assets/Light-bulb.png";
import { auth } from "../utils/firebase-config";
const ProfileIndex = () => {
  const [user, loading] = useAuthState(auth);
  return (
    <div className='p-5 flex items-center flex-col w-full h-full relative'>
      <Image
        className='opacity-5 absolute'
        layout='fill'
        src={Logo}
        alt='Image of Lightbulb'
      />
      <div className='flex h-1/3 w-full flex-col'>
        <div className='pt-5 flex items-start justify-center w-full h-full'>
          <h1 className='font-extrabold mb-5 text-4xl animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-primary to-amber-300 py-4 md:text-8xl'>
            Profile Information
          </h1>
        </div>
        <div className='p-5 flex items-center flex-col borde-solid w-full h-full'>
          {/* Testing profile Card */}
          <div className='flex h-screen w-full items-center justify-center'>
            <div className='max-w-md rounded-xl bg-white shadow-lg'>
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
                <label className='text-2xl font-bold text-slate-800' ><i className='fa-solid fa-user pr-4'></i>Username:</label>
                <label className='text-2xl font-bold text-slate-600'>
                  {user?.displayName}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileIndex;
