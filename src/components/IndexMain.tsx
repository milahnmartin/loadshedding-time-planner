import Globe from "@helpers/Globe";
import { useQueryClient } from "@tanstack/react-query";
import { auth } from "@utils/firebase-config";
import supabase from "@utils/supabase-config";
import Link from "next/link";
import Router from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { IoIosArrowForward, IoMdArrowRoundForward } from "react-icons/io";
import { Typewriter } from "react-simple-typewriter";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
const IndexMain = () => {
  const queryClient = useQueryClient();
  const [user, loading] = useAuthState(auth);
  const handleNewPlan = async () => {
    if (!user) {
      Router.push("/auth/login");
      toast.error("You Need To be Logged In To Create A Plan");
      return;
    }
    const newPlanUUID = uuidv4();
    const { error } = await supabase.from("user_plans").insert({
      plan_id: newPlanUUID,
      user_id: user?.uid,
      plan_createdAt: new Date().toISOString(),
    });
    if (error) {
      console.log(error);
      toast.error("Error Creating Plan");
      return;
    }
    queryClient.invalidateQueries({ queryKey: ["savedplans"] });
    Router.push(`/dashboard/${newPlanUUID}`);
  };

  return (
    <div className='px-5 h-[90%] flex justify-center items-center flex-col space-y-9 overflow-hidden'>
      <h1
        id='index-main-trying'
        className='text-center font-satoshiBold text-5xl  text-white md:text-8xl md:tracking-tighter z-[1]'
      >
        TRYING TO PLAN
      </h1>
      <div className='flex flex-col w-full items-center justify-center md:flex-row relative '>
        <Globe />
        <div className='w-full h-full flex items-center justify-center ml-4 md:justify-end md:w-1/2 md:ml-0'>
          <span
            id='index-type-writer'
            className='text-transparent  w-fit bg-clip-text font-satoshi text-6xl font-black bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 md:text-8xl md:tracking-wide'
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
            className='px-2  font-satoshiBold w-fit text-6xl text-yellow-500 md:text-8xl md:tracking-widest'
          >
            AROUND
          </span>
        </div>
      </div>

      <h1
        id='index-main-loadshedding'
        className='text-center font-satoshiBold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple px-2 md:text-8xl md:font-satoshiBlack drop-shadow-lg'
      >
        LOADSHEDDING ?
      </h1>
      <div className='flex w-full h-auto items-center justify-center pt-10 flex-col md:flex-row '>
        <button
          onClick={handleNewPlan}
          className='relative inline-flex font-satoshiBold items-center justify-evenly p-0.5 mb-2 mr-2 w-[10rem] h-[3rem] overflow-hidden text-sm font-black text-gray-900 rounded-full group bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]  hover:text-white dark:text-white '
        >
          New Plan
          <div className='group h-full flex items-center'>
            <IoMdArrowRoundForward
              id='my-arrow'
              size={20}
              className='hidden group-hover:inline transition-all duration-250'
            />
            <IoIosArrowForward
              id='normal-arrow'
              size={20}
              className='group-hover:hidden transition-all duration-250'
            />
          </div>
        </button>

        <Link href='/plans'>
          <button className='font-satoshiBold relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 w-[10rem] h-[3rem] overflow-hidden text-sm font-black text-gray-900 rounded-full group bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white '>
            <span className='relative px-5 py-2.5 transition-all ease-in duration-200 w-[9.5rem] h-[2.5rem] bg-white dark:bg-slate-800 rounded-full group-hover:bg-opacity-0'>
              Saved Plans
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default IndexMain;
