import { Player } from "@lottiefiles/react-lottie-player";
import { useQueryClient } from "@tanstack/react-query";
import classNames from "classnames";
import { toast } from "react-toastify";
import Router from "next/router";
import { v4 as uuidv4 } from "uuid";
import supabase from "@utils/supabase-config";
import { auth } from "@utils/firebase-config";
import { IoIosArrowForward, IoMdArrowRoundForward } from "react-icons/io";
import { useAuthState } from "react-firebase-hooks/auth";
function HowToUse() {
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
  const gline = classNames(
    " w-[33%] h-[0.25rem] bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] rounded border-0 "
  );
  return (
    <div className='flex flex-col overflow-y-scroll h-full w-full pl-8 pr-8'>
      <span className='flex flex-col items-center w-full h-fit pb-10'>
        <Player
          src='https://assets1.lottiefiles.com/packages/lf20_fifomona.json'
          className='player w-[250px] h-[250px] '
          autoplay
          loop
          speed={0.8}
        />
      </span>
      <span className='flex space-x-0 h-[50px] items-center'>
        <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-c2purple font-satoshiBold text-[1.75rem]'>
          HOW TO USE LS PLANNER
        </h1>
        <Player
          src='https://assets10.lottiefiles.com/packages/lf20_8xw4cfyj.json'
          className='player w-[50px] h-[50px] '
          autoplay
          loop
          speed={0.8}
        />
      </span>
      <p className='text-white font-satoshi text-lg pb-4'>
        The following steps will show you how to use LS PLANNER
      </p>
      <hr className={gline} />

      <h2 className='flex text-white font-satoshi text-lg pt-4  '>
        <span className='font-satoshiBold'>1.</span>&ensp;Navigate to the
        <button
          onClick={handleNewPlan}
          className='relative inline-flex font-satoshiBold items-center justify-evenly p-0.5  ml-2 mr-2 w-[8rem] h-[2rem] overflow-hidden text-sm font-black text-gray-900 rounded-full group bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]  hover:text-white dark:text-white '
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
        </button>{" "}
        button on the home page
      </h2>

      <h2 className='text-white font-satoshi text-lg'>
        <span className='font-satoshiBold'>2.</span> When clicking the button, you will be
        redirected to a <span className='font-satoshiBold'>dashboard</span> and a "LS
        plan" will be created.
      </h2>
      <h2 className='text-white font-satoshi text-lg'>
        <span className='font-satoshiBold'>3.</span> You will see a{" "}
        <span className='font-satoshiBold'>filter slide</span> in from the right, where
        you can customize or invite other users to your "LS plan" settings
      </h2>
      <h2 className='text-white font-satoshi text-lg'>
        <span className='font-satoshiBold'>4.</span> After applying your{" "}
        <span className='font-satoshiBold text-green-600'>filters</span>, your dashboard
        will update and show you a{" "}
        <span className='font-satoshiBold'>variety of information.</span> <br /> The left
        column will display current and upcoming stages for{" "}
        <span className='font-satoshiBold text-orange-700'>Cape Town</span>
        {" and "}
        <span className='font-satoshiBold text-red-500'>Eskom regions.</span>
        The middle <br />
        column will display your{" "}
        <span className='font-satoshiBold text-blue-500'>available times</span>{" "}
        {"(This is all the timeframes where nobody on your plan has any loadshedding)"},{" "}
        <br />
        <span className='font-satoshiBold text-yellow-500'>buffer times</span>{" "}
        {
          "(These are timeframes where 30 min are added before and after your available times)"
        }
        {" and "}
        <span className='font-satoshiBold text-red-600'>LS times</span> <br />
        {"(These are all the times that everyone on your plan has loadshedding)"}
      </h2>
      <h2 className='flex text-white font-satoshi text-lg'>
        <span className='font-satoshiBold'>5. </span> &nbsp;You can view all your
        different plans by clicking on the{" "}
        <span className='font-satoshiBold text-white'> &nbsp;saved plans&nbsp;</span>{" "}
        button on the home page.
      </h2>
    </div>
  );
}
export default HowToUse;
