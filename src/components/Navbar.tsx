import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { IoMdNotificationsOutline } from "react-icons/io";
import Logo from "../pages/assets/Logov3.png";
import { auth } from "../utils/firebase-config";
import UserProfile from "./UserProfile";
function Navbar() {
  const [user, loading] = useAuthState(auth);
  const [loginState, setLoginState] = useState<string>("CHECKING");
  const [notifications, setNotifications] = useState<boolean>(false);
  useEffect(() => {
    if (user && !loading) return setLoginState("LOGOUT");
    if (!user && !loading) return setLoginState("LOGIN");
  }, [user, loading]);

  return (
    <div className='sticky top-0 bg-black z-10'>
      <div className='h-[5rem] flex place-items-center'>
        <div className='h-full w-[20%] flex items-center justify-start pl-5 md:w-[50%]'>
          <Link href='/'>
            <Image height={50} width={50} src={Logo} alt='Image of Logo' />
          </Link>
          <h1 className='hidden font-bold text-white text-3xl tracking-wide ml-2 md:inline pl-2'>
            LS GAME PLANNER
          </h1>
        </div>
        <div className='h-full w-[80%] space-x-8 flex items-center navbarfont justify-end md:w-[50%] mr-6'>
          <h1 className='font-bold font-Inter text-white tracking-wide transition-all duration-150 hover:text-cblue'>
            <Link href='/'>Home</Link>
          </h1>
          <h1 className='font-bold font-Inter text-white tracking-wide transition-all duration-150 hover:text-cblue'>
            <Link href='/docs'>Docs</Link>
          </h1>

          <span
            title='Invites'
            className={
              !notifications
                ? classNames(
                    "h-fit w-fit cursor-pointer text-white transition-all duration-200 hover:text-cblue"
                  )
                : classNames(
                    "h-fit w-fit cursor-pointer text-red-700 animate-bounce transition-transform duration-200 "
                  )
            }
          >
            {
              <IoMdNotificationsOutline
                className={
                  notifications
                    ? classNames("transition-all hover:rotate-[360deg] duration-700")
                    : classNames("")
                }
                size={25}
              />
            }
          </span>
          {user && !loading ? (
            <UserProfile src={user?.photoURL} />
          ) : (
            <Link href='/auth/login'>
              <button className='px-4 py-1 bg-primary text-white font-black tracking-wide font-Inter rounded-lg text-center'>
                {loginState}
              </button>
            </Link>
          )}
        </div>
      </div>
      <hr className='my-0 mx-auto w-[100%] h-[0.2rem] bg-gradient-to-r from-caqua via-cblue to-cpurple rounded border-0 md:my-2' />
    </div>
  );
}

export default Navbar;
