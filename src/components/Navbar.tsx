import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { IoMdNotificationsOutline } from "react-icons/io";
import Logo from "../pages/assets/Logov3.png";
import { auth } from "../utils/firebase-config";
import NotificationModal from "./NotificationModal";
import UserProfile from "./UserProfile";
function Navbar() {
  const [user, loading] = useAuthState(auth);
  const [loginState, setLoginState] = useState<string>("CHECKING");
  const [notifications, setNotifications] = useState<boolean>(false);
  const [notimodal, setShowNotiModal] = useState<boolean>(false);
  useEffect(() => {
    if (user && !loading) return setLoginState("LOGOUT");
    if (!user && !loading) return setLoginState("LOGIN");
  }, [user, loading]);

  useEffect(() => {
    document.addEventListener(
      "click",
      (e: any) => {
        let nodeList = [...e.target.classList];
        if (e.target.id !== "bell-icon" && !nodeList.includes("noti-data")) {
          setShowNotiModal(false);
        }
      },
      { capture: true }
    );
    return () => {
      document.removeEventListener("click", () => {}, { capture: true });
    };
  }, []);

  return (
    <div className='sticky top-0 z-10 bg-black'>
      <div className='h-[5rem] flex place-items-center'>
        <div className='h-full w-[20%] flex items-center justify-start pl-5 md:w-[50%]'>
          <Link href='/'>
            <Image
              className='cursor-pointer'
              height={50}
              width={50}
              src={Logo}
              alt='Image of Logo'
            />
          </Link>
          <h1 className='hidden font-bold text-white text-3xl tracking-wide ml-2 md:inline pl-2'>
            LS TIME PLANNER
          </h1>
        </div>
        <div className='h-full w-[80%] flex items-center space-x-5 navbarfont justify-end md:w-[50%] md:space-x-8 mr-6'>
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
                    "h-fit w-fit cursor-pointer text-white transition-all duration-200 hover:text-cblue relative"
                  )
                : classNames(
                    "h-fit w-fit cursor-pointer text-red-700 transition-transform duration-200 relative"
                  )
            }
          >
            {
              <IoMdNotificationsOutline
                id='bell-icon'
                onClick={() => setShowNotiModal((prev) => !prev)}
                className={
                  notifications
                    ? classNames(
                        "transition-all animate-[wiggle_1.5s_ease-in-out_infinite] duration-500"
                      )
                    : classNames("")
                }
                size={25}
              />
            }

            {notimodal && <NotificationModal />}
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
      <hr className='mt-0 mx-auto w-[100%] h-[0.2rem] bg-gradient-to-r from-caqua via-cblue to-cpurple rounded border-0 md:mt-2' />
    </div>
  );
}

export default Navbar;
