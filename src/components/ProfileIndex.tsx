import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import Logo from "../pages/assets/Light-bulb.png";
import { auth } from "../utils/firebase-config";
const ProfileIndex = () => {
  const [user, loading] = useAuthState(auth);
  return (
    <div className='flex items-center flex-col border-2 borde-solid border-white w-full h-full'>
      <div className='flex h-1/3 w-full flex-col'>
        <div className='pt-5 flex items-start justify-center w-full'>
          <Image height={90} width={90} src={Logo} alt='Image of Lightbulb' />
        </div>
        <div className='flex items-center justify-center w-full h-full border-2 border-red-900 space-x-5'>
          {user && (
            <Image
              className='rounded-full'
              height={90}
              width={90}
              src={user?.photoURL as string}
              alt='Image of Lightbulb'
            />
          )}
          <div className='p-2 text-white font-arial tracking-wide'>
            <h1>{user?.displayName}</h1>
            <h1>{user?.email}</h1>
          </div>
        </div>
      </div>
      <div className='flex h-2/3'>
        <div className='m'></div>
      </div>
    </div>
  );
};

export default ProfileIndex;
