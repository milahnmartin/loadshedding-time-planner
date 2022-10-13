import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase-config";
function ProfileModal() {
  const [user, loading] = useAuthState(auth);
  const [signOutStatus, setSignOutStatus] = useState<boolean>(false);
  const handleSignOut = async (): Promise<void> => {
    if (!user) return alert("NO USER LOGGED IN");
    setSignOutStatus(true);
    auth.signOut();
    setSignOutStatus(false);
    Router.push("/");
  };
  return (
    <div
      id='profile-modal'
      className='h-[8rem] w-[8rem] text-black text-roboto absolute bg-white -left-[5rem] top-12 rounded-md flex items-center justify-start flex-col text-center z-50'
    >
      <Link href='/profile'>
        <div className='h-[50%] w-full hover:bg-gray-300 cursor-pointer py-2 px-1 rounded-t-md outline-none border-none flex items-center justify-center'>
          <h1 className='w-full font-roboto tracking-wide'>PROFILE</h1>
        </div>
      </Link>

      <Link href='/plans'>
        <div className='h-[50%] w-full hover:bg-gray-300 cursor-pointer py-2 px-1 rounded-b-md outline-none border-none flex items-center justify-center text-center'>
          <h1 className='w-full font-roboto tracking-wide'>PLANS</h1>
        </div>
      </Link>
      <div
        onClick={handleSignOut}
        className='h-[50%] w-full hover:bg-gray-300 cursor-pointer py-2 px-1 rounded-b-md outline-none border-none flex items-center justify-center text-center'
      >
        <h1 className='w-full font-roboto tracking-wide'>
          {signOutStatus ? "LOGGING OUT ..." : "LOGOUT"}
        </h1>
      </div>
    </div>
  );
}

export default ProfileModal;
