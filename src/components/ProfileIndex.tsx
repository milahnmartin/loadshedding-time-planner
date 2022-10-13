import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import Logo from "../pages/assets/Light-bulb.png";
import { auth } from "../utils/firebase-config";
const ProfileIndex = () => {
  const [user, loading] = useAuthState(auth);
  return (
    <div className='p-5 flex items-center flex-col border-2 borde-solid border-white w-full h-full relative'>
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
        <div className='flex items-center justify-center w-full h-full space-x-5'>
          {user && (
            <Image
              className='rounded-full'
              height={90}
              width={90}
              src={user?.photoURL as string}
              alt='Image of Lightbulb'
            />
          )}
          <div className='p-2 text-white tracking-wide font-roboto'>
            <h1>
              <span className='font-extrabold'>UserName:</span> {user?.displayName}
            </h1>
            {user?.email && (
              <h1>
                <span className='font-extrabold'>Email:</span> {user?.email}
              </h1>
            )}
          </div>
        </div>
      </div>
      <div className='flex h-2/3 w-full'>
        <div className='flex'></div>
      </div>
    </div>
  );
};

export default ProfileIndex;
