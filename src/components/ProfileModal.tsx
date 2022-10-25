import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BiBookAlt } from "react-icons/bi";
import { CgLogOut, CgProfile } from "react-icons/cg";
import { auth } from "../utils/firebase-config";

function ProfileModal() {
  const [user, loading] = useAuthState(auth);
  const [signOutStatus, setSignOutStatus] = useState<boolean>(false);
  const handleSignOut = async (): Promise<void> => {
    if (!user) return;
    setSignOutStatus(true);
    auth.signOut();
    setSignOutStatus(false);
    Router.push("/");
  };
  return (
    <div
      id='profile-modal'
      className='h-[10rem] w-[9rem]  text-black text-Inter absolute bg-white -left-[5rem] top-14 rounded-md flex items-center justify-start flex-col text-center z-50'
    >
      <>
        <Link href='/profile' legacyBehavior>
          <div className='h-[50%] w-full transition-all duration-300 hover:bg-cblue cursor-pointer py-2 px-1 rounded-t-md outline-none border-none flex items-center justify-center'>
            {<CgProfile className='pl-3 h-9 w-9' />}
            <h1 className='modal-data w-full font-bold tracking-wide font-Inter'>
              PROFILE
            </h1>
          </div>
        </Link>
      </>
      <>
        <Link href='/plans' legacyBehavior>
          <div className='h-[50%] w-full transition-all duration-300 hover:bg-cblue cursor-pointer py-2 px-1 rounded-b-md outline-none border-none flex items-center justify-center text-center'>
            {<BiBookAlt className='pl-3 h-9 w-9' />}
            <h1 className='modal-data w-full font-bold tracking-wide font-Inter'>
              PLANS
            </h1>
          </div>
        </Link>
      </>

      <div
        onClick={handleSignOut}
        className='h-[50%] w-full transition-all duration-300 hover:bg-cblue cursor-pointer py-2 px-1 rounded-b-md outline-none border-none flex items-center justify-center text-center'
      >
        {<CgLogOut className='pl-3 h-8 w-9' />}
        <h1 className='modal-data w-full font-bold tracking-wide font-Inter'>
          {signOutStatus ? "LOGGING OUT ..." : "LOGOUT"}
        </h1>
      </div>
    </div>
  );
}

export default ProfileModal;
