import { Player } from "@lottiefiles/react-lottie-player";
import Image from "next/image";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { MdContentCopy } from "react-icons/md";
import { toast } from "react-toastify";
import { auth } from "../utils/firebase-config";
const ProfileIndex = () => {
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    const myBubble = document.getElementById("bubble-test");
    myBubble?.addEventListener("click", (e) => {
      console.log(`Target: ${e.target}`);
      console.log(`Current Target: ${e.currentTarget}`);
    });
  }, []);
  return (
    <div className='w-full h-full flex items-center flex-row overflow-y-hidden'>
      <div className='w-full flex flex-col items-center justify-start'>
        <h1 className='font-extrabold text-4xl animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple pt-4 md:text-6xl'>
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
      <div className='h-full w-full'>
        {/* bg-gradient-to-r p-[6px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] */}
        <div className='rounded-xl w-full h-full mx-auto'>
          <div className='flex flex-col items-center justify-center h-full bg-black text-white rounded-lg p-4'>
            <div className='flex items-center justify-center h-full w-[50%]'>
              {user && (
                <Image
                  className='rounded-full'
                  height={120}
                  width={120}
                  src={user?.photoURL as string}
                  alt='Image of Lightbulb'
                />
              )}
            </div>

            <div className='h-full flex flex-col items-center justify-center gap-8 text-center'>
              <div className='flex space-x-2 items-center justify-start text-center w-full'>
                <h3 className='text-2xl font-bold text-slate-300'>Username:</h3>
                <p className='text-2xl font-bold text-cblue'>{user?.displayName}</p>
              </div>
              <div className='flex space-x-2 items-center justify-start text-center w-full'>
                <h3 className='text-2xl font-bold text-slate-300'>UUID:</h3>
                <p className='text-xl font-bold text-cblue'>{user?.uid}</p>
                <span>
                  <MdContentCopy
                    className='cursor-pointer h-full w-[20px]'
                    onClick={() => {
                      navigator.clipboard.writeText(user?.uid as string);
                      toast.success("UID Copied to Clipboard");
                    }}
                  />
                </span>
              </div>
              <div className='flex space-x-2 items-center justify-start text-center w-full'>
                <h3 className='text-2xl font-bold text-slate-300'>Email:</h3>
                <p className='text-2xl font-bold text-cblue'>
                  {user?.email ? user?.email : "No Email Provided"}
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
