import Logo from "@assets/Logov3.png";
import UserProfile from "@comps/profile/UserProfile";
import { Gradient } from "@helpers/Gradient.js";
import { auth } from "@utils/firebase-config";
import supabase from "@utils/supabase-config";
import classNames from "classnames";
import Image from "next/image";
import Link from "next/link";
import Router from "next/router";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BiHide, BiShow } from "react-icons/bi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { toast } from "react-toastify";

type NavbarProps = {
  dashboard?: boolean;
  filterState?: {
    filter: boolean;
    setshowfilter: React.Dispatch<React.SetStateAction<boolean>>;
  };
};
const gradient = new Gradient() as any;
function Navbar({ dashboard, filterState }: NavbarProps) {
  const ref = useRef() as any;
  const [user, loading] = useAuthState(auth);
  const [loginState, setLoginState] = useState<string>("CHECKING");

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
    if (user && !loading) return setLoginState("Sign Out");
    if (!user && !loading) return setLoginState("Sign In");
  }, [user, loading]);

  useEffect(() => {
    if (!user || loading) return;
    fetchUserInvites();
  }, [loading]);

  useEffect(() => {
    if (ref.current) {
      gradient.initGradient("#gradient-canvas-nav");
    }
  }, [ref]);

  return (
    <header ref={ref} className='sticky top-0 z-10 '>
      <canvas
        className='w-full h-[100%] absolute'
        id='gradient-canvas-nav'
        data-transition-in
      />
      <div className='h-[5rem] flex '>
        <div className='noti-data h-full w-[30%] flex items-center justify-start pl-5 md:w-[50%]'>
          <Link href='/'>
            <Image
              className='cursor-pointer'
              height={55}
              width={55}
              src={Logo}
              alt='Image of Logo'
            />
          </Link>
          <h1 className='hidden font-satoshiBold text-white tracking-tight text-3xl ml-2 md:inline pl-2'>
            LS PLANNER
          </h1>
        </div>
        <div className='h-full w-[70%] flex items-center space-x-5 navbarfont justify-evenly md:justify-end md:w-[50%] md:space-x-8 md:pr-5'>
          <h1 className='font-bold font-satoshiBold text-white tracking-wide transition-all duration-150 hover:text-cblue'>
            <Link href='/'>Home</Link>
          </h1>
          <h1 className='font-bold font-satoshiBold text-white transition-all duration-150 hover:text-cblue'>
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
                onClick={() => Router.push("/invites")}
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
          </span>
          {dashboard ? (
            !filterState?.filter ? (
              <BiShow
                title='Filter Data'
                className='text-white cursor-pointer hover:text-cblue transition-all duration-150'
                size={20}
                onClick={() => filterState?.setshowfilter(!filterState?.filter)}
              />
            ) : (
              <BiHide
                title='Filter Data'
                className='text-white cursor-pointer hover:text-cblue transition-all duration-150'
                size={20}
                onClick={() => filterState?.setshowfilter(!filterState?.filter)}
              />
            )
          ) : null}
          {user && !loading && user?.photoURL ? (
            <UserProfile src={user?.photoURL} />
          ) : (
            <Link href='/auth/login'>
              <button className='px-5 py-[5px] ring-2 outline-none ring-cblue text-white font-satoshiBold rounded-full text-center hover:bg-cblue animation-all duration-500'>
                {loginState}
              </button>
            </Link>
          )}
        </div>
      </div>
      <hr className='mt-0 mx-auto w-[100%] h-[0.2rem] bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] rounded border-0 md:mt-2' />
    </header>
  );
}

export default Navbar;
