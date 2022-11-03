import NotificationModal from "@comps/NotificationModal";
import UserProfile from "@comps/UserProfile";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { IoMdNotificationsOutline } from "react-icons/io";
import { toast } from "react-toastify";
import Logo from "../pages/assets/Logov3.png";
import { auth } from "../utils/firebase-config";
import supabase from "../utils/supabase-config";
function Navbar() {
  const [user, loading] = useAuthState(auth);
  const [loginState, setLoginState] = useState<string>("CHECKING");
  const [notimodal, setShowNotiModal] = useState<boolean>(false);
  const [invites, setInvites] = useState<Array<any>>([]);

  const fetchUserInvites = async () => {
    if (!user) {
      toast.error("You need to be signed in");
      Router.push("/auth/login");
      return;
    }
    const { data, error }: any = await supabase
      .from("user_info")
      .select(`user_plan_Invites`)
      .eq(`user_id`, user?.uid);

    if (error) {
      toast.error("Something went wrong with invites");
      return;
    }

    if (!data[0]) {
      const { data: newAccData, error: newAccError } = await supabase
        .from("user_info")
        .insert({
          user_id: user?.uid,
          user_email: user?.email ? user?.email : user?.displayName,
          account_created: new Date().toISOString(),
        })
        .select("user_id");
      console.log(`dev log, account`);
      return;
    }

    const { user_plan_Invites } = data[0];

    if (!user_plan_Invites || user_plan_Invites.length === 0) {
      setInvites([]);
      return;
    }

    setInvites(user_plan_Invites);

    const { data: somedata, error: somerror } = await supabase
      .from("user_plans")
      .select("plan_authorizedUsers")
      .contains("plan_authorizedUsers", {
        plan_authorizeUsers: [user?.uid],
      });
    if (somerror) {
      throw new Error("Something went wrong");
    }
  };
  useEffect(() => {
    if (user && !loading) return setLoginState("LOGOUT");
    if (!user && !loading) return setLoginState("LOGIN");
  }, [user, loading]);

  useEffect(() => {
    if (!user || loading) return;
    fetchUserInvites();
  }, [loading]);

  useEffect(() => {
    document.addEventListener("click", (e: any) => {
      let nodeList = [...e.target.classList];
      if (e.target.id !== "bell-icon" && !nodeList.includes("noti-data")) {
        setShowNotiModal(false);
      }
    });
    return () => {
      document.removeEventListener("click", () => {});
    };
  }, []);

  return (
    <div className='sticky top-0 z-10 bg-black'>
      <div className='h-[5rem] flex place-items-center'>
        <div className='noti-data h-full w-[20%] flex items-center justify-start pl-5 md:w-[50%]'>
          <Link href='/'>
            <Image
              className='cursor-pointer'
              height={55}
              width={55}
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
              invites.length === 0
                ? classNames(
                    "not-modal h-fit w-fit cursor-pointer text-white transition-all duration-200 hover:text-cblue relative"
                  )
                : classNames(
                    "noti-modal h-fit w-fit cursor-pointer text-red-700 transition-transform duration-200 relative"
                  )
            }
          >
            {
              <IoMdNotificationsOutline
                id='bell-icon'
                onClick={() => setShowNotiModal((prev) => !prev)}
                className={
                  invites.length > 0
                    ? classNames(
                        "transition-all animate-[wiggle_1.5s_ease-in-out_infinite] duration-500"
                      )
                    : classNames("")
                }
                size={25}
              />
            }

            {notimodal && <NotificationModal inviteArray={invites} />}
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
      <hr className='mt-0 mx-auto w-[100%] h-[0.2rem] bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] rounded border-0 md:mt-2' />
    </div>
  );
}

export default Navbar;
