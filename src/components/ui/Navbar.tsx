import Logo from '@assets/Logov3.png';
import UserProfile from '@comps/profile/UserProfile';
import { Gradient } from '@helpers/Gradient.js';
import useFetchUserInvites from '@hooks/useFetchUserInvites';
import { useQueryClient } from '@tanstack/react-query';
import { auth } from '@utils/firebase-config';
import supabase from '@utils/supabase-config';
import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import Router from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BsToggle2Off, BsToggle2On } from 'react-icons/bs';

type NavbarProps = {
  dashboard?: boolean;
  filterState?: {
    filter: boolean;
    setshowfilter: React.Dispatch<React.SetStateAction<boolean>>;
  };
};
const gradient = new Gradient() as any;

const Navbar = React.memo(({ dashboard, filterState }: NavbarProps) => {
  const query = useQueryClient();
  const ref = useRef() as any;
  const [user, loading] = useAuthState(auth);
  const [loginState, setLoginState] = useState<string>('CHECKING');
  const [bounceToggle, setbounceToggle] = useState<boolean>(
    !localStorage.getItem('seen')
  );
  const { isLoading: inviteLoading, data: invites } = useFetchUserInvites(
    user?.uid!
  );

  useEffect(() => {
    if (!loading) {
      (async () => {
        await useCheckUserAccount(user);
      })();
    }
    if (user && !loading) return setLoginState('Sign Out');
    if (!user && !loading) return setLoginState('Sign In');
  }, [user, loading]);

  useEffect(() => {
    if (ref.current) {
      gradient.initGradient('#gradient-canvas-nav');
    }
  }, [ref]);

  useEffect(() => {
    if (!bounceToggle) return;
    setTimeout(() => {
      setbounceToggle(!bounceToggle);
    }, 5000);
  }, []);

  const bellClassname = classNames('transition-all duration-500', {
    'animate-[wiggle_1.5s_ease-in-out_infinite]': invites?.length > 0,
  });
  const toggleClassNames = classNames(
    'text-white cursor-pointer hover:text-cblue transition-all duration-150',
    {
      'text-red-700 animate-move scale-105': bounceToggle,
    }
  );
  return (
    <header ref={ref} className="sticky top-0 z-10 ">
      <canvas
        className="w-full h-[100%] absolute"
        id="gradient-canvas-nav"
        data-transition-in
      />
      <div className="h-[5rem] flex ">
        <div className="noti-data h-full w-[30%] flex items-center justify-start pl-5 md:w-[50%]">
          <Link href="/">
            <Image
              className="cursor-pointer"
              height={55}
              width={55}
              src={Logo}
              alt="Image of Logo"
            />
          </Link>
          <h1 className="hidden font-satoshiBold text-white tracking-wide text-3xl ml-2 md:inline pl-2">
            LS PLANNER
          </h1>
        </div>
        <div className="h-full w-[70%] flex items-center space-x-5 navbarfont justify-evenly md:justify-end md:w-[50%] md:space-x-8 md:pr-5">
          <h1 className="font-bold font-satoshiBold text-white tracking-wide transition-all duration-150 hover:text-cblue">
            <Link href="/">Home</Link>
          </h1>
          <h1 className="font-bold font-satoshiBold text-white transition-all duration-150 hover:text-cblue">
            <Link href="/instructions">Instructions</Link>
          </h1>

          {!inviteLoading && (
            <span
              title="Invites"
              className={classNames(
                'noti-modal h-fit w-fit cursor-pointer duration-200 relative transition-all',
                {
                  'text-white hover:text-cblue': !invites.length,
                  'text-red-700': invites.length,
                }
              )}>
              {
                <IoMdNotificationsOutline
                  id="bell-icon"
                  onClick={() => {
                    query.invalidateQueries(['userInvites']);
                    Router.push('/invites');
                  }}
                  className={bellClassname}
                  size={25}
                />
              }
            </span>
          )}
          {dashboard &&
            (!filterState?.filter ? (
              <BsToggle2Off
                title="Filter Data"
                className={toggleClassNames}
                size={20}
                onClick={() => {
                  filterState?.setshowfilter(!filterState?.filter);
                  setbounceToggle(false);
                  localStorage.setItem('seen', 'true');
                }}
              />
            ) : (
              <BsToggle2On
                title="Filter Data"
                className={toggleClassNames}
                size={20}
                onClick={() => {
                  filterState?.setshowfilter(!filterState?.filter);
                  setbounceToggle(false);
                  localStorage.setItem('seen', 'true');
                }}
              />
            ))}
          {user && !loading && user?.photoURL ? (
            <UserProfile src={user?.photoURL} />
          ) : (
            <Link href="/auth/login">
              <button className="px-5 py-[5px] ring-2 outline-none ring-cblue text-white font-satoshiBold rounded-full text-center hover:bg-cblue duration-500">
                {loginState}
              </button>
            </Link>
          )}
        </div>
      </div>
      <hr className="mt-0 mx-auto w-[100%] h-[0.2rem] bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] rounded border-0 md:mt-2" />
    </header>
  );
});

export default Navbar;

const useCheckUserAccount = async (user: any): Promise<void> => {
  if (!user) return;

  const { data, error } = await supabase
    .from('user_info')
    .select()
    .eq('user_id', user?.uid);

  if (error) {
    console.log('DEV ACC CHECKING IN NAV');
    return;
  }

  if (!data[0]) {
    const { error: newAccError } = await supabase
      .from('user_info')
      .insert({
        user_id: user?.uid,
        user_email: user?.email ? user?.email : user?.displayName,
        account_created: new Date().toISOString(),
      })
      .select('user_id');
    if (newAccError) {
      console.error('Something went wrong with creating new account');
      return;
    }
    console.log('DEV NEW ACC CREATED');
    return;
  }
};
function checkToggleAlreadySeen() {
  const seen = localStorage.getItem('seen');
  if (seen === 'true') {
    return true;
  } else {
    return false;
  }
}
