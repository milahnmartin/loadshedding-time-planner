import Globe from "@helpers/Globe";
import { auth } from "@utils/firebase-config";
import supabase from "@utils/supabase-config";
import Link from "next/link";
import Router from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { Typewriter } from "react-simple-typewriter";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
const IndexMain = () => {
  const [user, loading] = useAuthState(auth);
  const handleNewPlan = async () => {
    if (!user) {
      Router.push("/auth/login");
      toast.error("You Need To be Logged In To Create A Plan");
      return;
    }
    const newPlanUUID = uuidv4();
    const { data, error } = await supabase.from("user_plans").insert({
      plan_id: newPlanUUID,
      user_id: user?.uid,
      plan_createdAt: new Date().toISOString(),
    });
    if (error) {
      console.log(error);
      toast.error("Error Creating Plan");
      return;
    }
    Router.push(`/dashboard/${newPlanUUID}`);
  };
  const arrowIcon = (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentcolor'
      className='w-6 h-6'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3'
      />
    </svg>
  );
  return (
    <div className='px-5 h-[90%] flex justify-center items-center flex-col space-y-9 overflow-hidden'>
      <h1
        id='index-main-trying'
        className='text-center font-Inter text-5xl font-bold text-white md:text-8xl z-[1]'
      >
        TRYING TO PLAN
      </h1>
      <div className='flex flex-col w-full items-center justify-center md:flex-row relative '>
        <Globe />
        <div className='w-full h-full flex items-center justify-center ml-4 md:justify-end md:w-1/2 md:ml-0'>
          <span
            id='index-type-writer'
            className='text-transparent tracking-tightest w-fit bg-clip-text font-Inter text-6xl font-black bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 md:text-8xl'
          >
            <Typewriter
              typeSpeed={200}
              cursor={true}
              loop={false}
              words={["GAMING", "MEETINGS"]}
            />
          </span>
        </div>
        <div className='w-full h-full flex items-center justify-center md:w-1/2 md:justify-start'>
          <span
            id='index-around'
            className='px-2 tracking-widest w-fit italic font-Inter text-6xl font-black text-yellow-500 md:text-8xl'
          >
            AROUND
          </span>
        </div>
      </div>

      <h1
        id='index-main-loadshedding'
        className='font-extrabold text-center font-Inter text-5xl text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple px-2 md:text-8xl'
      >
        LOADSHEDDING ?
      </h1>
      <div className='flex w-full h-auto items-center justify-center pt-10 flex-col md:flex-row '>
        <button
          onClick={handleNewPlan}
          className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 w-[10rem] h-[3rem] overflow-hidden text-sm font-black text-gray-900 rounded-full group bg-gradient-to-br from-cpurple to-caqua  hover:text-white dark:text-white '
        >
          NEW PLAN
          <div className='relative left-[6px] top-[.5px] transition-all duration-250 group-hover:text-yellow-500 '>
            {arrowIcon}
          </div>
        </button>

        <Link href='/plans'>
          <button className='relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 w-[10rem] h-[3rem] overflow-hidden text-sm font-black text-gray-900 rounded-full group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white '>
            <span className='relative px-5 py-2.5 transition-all ease-in duration-200 w-[9.5rem] h-[2.5rem] bg-white dark:bg-slate-800 rounded-full group-hover:bg-opacity-0'>
              SAVED PLANS
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default IndexMain;
