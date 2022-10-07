import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Logo from "../pages/assets/Light-bulb.png";
import { auth } from "../utils/firebase-config";
import UserProfile from "./UserProfile";
function Navbar() {
  const [user, loading] = useAuthState(auth);
  const [loginState, setLoginState] = useState<string>("CHECKING");
  useEffect(() => {
    if (user && !loading) return setLoginState("LOGOUT");
    if (!user && !loading) return setLoginState("LOGIN");
  }, [user, loading]);
  return (
    <div className='h-[5rem] flex place-items-center'>
      <div className='h-auto w-[50%] flex items-center justify-start pl-5'>
        <Image height={30} width={30} src={Logo} alt='Image of Lightbulb' />
        <h1 className='hidden font-rajad text-white text-3xl tracking-wide ml-2 md:inline'>
          LS GAME PLANNER
        </h1>
      </div>
      <div className='h-fit w-[50%] flex items-center justify-end pr-5'>
        <h1 className='font-bold text-white text-1xl tracking-wide ml-5'>
          <Link href='/docs'>DOCS</Link>
        </h1>
        <h1 className='font-bold text-white text-1xl tracking-wide ml-5'>
          <Link href='/instructions'>INSTRUCTION</Link>
        </h1>
        {user && !loading ? (
          <UserProfile src={user.photoURL} />
        ) : (
          <Link href='/auth/login'>
            <button className='px-4 py-1 bg-primary text-white font-bold rounded-lg text-center ml-5'>
              {loginState}
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Navbar;
