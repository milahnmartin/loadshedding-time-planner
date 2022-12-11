import { Player } from "@lottiefiles/react-lottie-player";
import { auth } from "@utils/firebase-config";
import supabase from "@utils/supabase-config";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";
import { BsCalendar, BsPeople, BsPerson } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { HiOutlineKey } from "react-icons/hi";

import { IoIosArrowForward, IoMdArrowRoundForward } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { toast } from "react-toastify";
import { v1 as uuidv1 } from "uuid";
type planData = {
  plan_id: string;
  plan_lsTimes: string[];
  plan_authorizedUsers: string[];
  plan_authorizedTeams: string[];
  plan_createdAt: string;
};
type PlansLabelProps = {
  plan: planData;
  deleteCB: (plan_id: string) => void;
  refetchPlans: () => void;
};

const PlansLabel = ({ plan, deleteCB, refetchPlans }: PlansLabelProps) => {
  const [user, loading] = useAuthState(auth);
  const {
    plan_id,
    plan_lsTimes,
    plan_authorizedTeams,
    plan_authorizedUsers,
    plan_createdAt,
  } = plan;

  const handleRevokePlanAccess = async () => {
    const newAuthorizedMembners = plan_authorizedUsers?.filter(
      (currentMember: string) => {
        return currentMember !== user?.uid;
      }
    );
    const { error } = await supabase
      .from("user_plans")
      .update({ plan_authorizedUsers: newAuthorizedMembners })
      .eq("plan_id", plan_id);

    if (error) {
      toast.error("Error revoking access");
      return;
    }
    toast.success(`Access Revoked For Plan ${plan_id}`);
    await refetchPlans();
  };

  return (
    <div className='rounded-xl w-[25rem] h-[29.2rem] bg-gradient-to-r p-[4px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
      <div className='flex flex-col h-full w-full bg-slate-800 text-white rounded-lg'>
        {plan_authorizedUsers.includes(user?.uid!) ? (
          <span className='flex flex-col items-center w-full h-fit pt-2 pb-4'>
            <Player
              src='https://assets10.lottiefiles.com/packages/lf20_qwATcU.json'
              className='player w-[115px] h-[115px]'
              autoplay
              loop
              speed={0.8}
            />
            <span className='flex items-center justify-center flex-col'>
              <BsPeople className='text-[1.25rem] align-center justify-center' />
              <h1 className='text-center font-satoshiBlack text-lg text-transparent bg-clip-text bg-gradient-to-r from-c2aqua via-c2blue to-c2purple'>
                PLAN TYPE:
              </h1>
              <h1 className='text-blue-200 text-center text-lg font-satoshiBold'>
                INVITED
              </h1>
            </span>
          </span>
        ) : (
          <span className='flex flex-col items-center w-full h-fit pt-2 pb-4'>
            <Player
              src='https://assets4.lottiefiles.com/packages/lf20_oo3N9WVAgU.json'
              className='player w-[115px] h-[115px] pb-3 pt-2'
              autoplay
              loop
              speed={0.8}
            />
            <span className='flex items-center justify-center flex-col'>
              <BsPerson className='text-[1.25rem] align-center justify-center' />
              <h1 className='text-center font-satoshiBlack text-lg text-transparent bg-clip-text bg-gradient-to-r from-c2aqua via-c2blue to-c2purple'>
                PLAN TYPE:
              </h1>
              <h1 className='text-blue-200 text-center text-lg font-satoshiBold '>
                PERSONAL
              </h1>
            </span>
          </span>
        )}

        <div className='w-full h-fit flex items-center  flex-wrap content-center overflow-y-scroll overflow-x-hidden flex-col '>
          <span className='flex items-center justify-center  flex-col pb-4'>
            <HiOutlineKey className='text-[1.15rem] align-center justify-center ' />

            <h1 className='text-center font-satoshiBlack text-lg text-transparent bg-clip-text bg-gradient-to-r from-c2aqua via-c2blue to-c2purple'>
              PLAN ID:
            </h1>
            <h1 className='text-blue-200 text-center text-lg font-satoshiBold '>
              {plan_id}
            </h1>
          </span>

          <span className='flex items-center justify-center flex-col pb-4'>
            <BsCalendar className='text-[1.075rem] align-center justify-center' />

            <h1 className='text-center font-satoshiBlack font-black text-lg text-transparent bg-clip-text bg-gradient-to-r from-c2aqua via-c2blue to-c2purple'>
              PLAN CREATED:
            </h1>
            <h1 className='text-blue-200 text-center text-lg font-satoshiBold '>
              {new Date(plan_createdAt).toUTCString()}
            </h1>
          </span>

          {plan_lsTimes.map((time: string) => {
            return (
              <h1 className='text-blue-500 text-center font-black text-lg' key={uuidv1()}>
                {time}
              </h1>
            );
          })}
        </div>

        <div className='flex items-center justify-center w-full h-fit pb-4 space-x-4'>
          <Link href={`/dashboard/${plan_id}`}>
            <button className='relative flex items-center justify-center  w-[10rem] h-[3rem] text-sm font-black text-gray-900 rounded-full group bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white '>
              <span className='relative px-5 py-2.5 group-hover:px-0 transition-all ease-in duration-200 w-[9.5rem] h-[2.5rem] bg-white dark:bg-slate-800 rounded-full group-hover:bg-opacity-0'>
                <span className='flex items-center justify-around font-satoshiBlack'>
                  View Plan
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
                </span>
              </span>
            </button>
          </Link>

          {plan_authorizedUsers.includes(user?.email! || user?.uid!) ? (
            <button
              onClick={handleRevokePlanAccess}
              className='group relative flex items-center justify-center  w-[5rem] h-[3rem] text-sm font-black text-gray-900 rounded-full group bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white '
            >
              <span className='relative px-5 py-2.5 group-hover:px-0 transition-all ease-in duration-200 w-[4.5rem] h-[2.5rem] bg-white dark:bg-slate-800 rounded-full group-hover:bg-opacity-0'>
                <span className='flex items-center justify-around'>
                  <FiLogOut
                    title='Revoke Access'
                    className='cursor-pointer text-[1.3rem] align-center justify-center group-hover:text-red-700 transition-all duration-300'
                  />
                </span>
              </span>
            </button>
          ) : (
            <button
              onClick={() => deleteCB(plan_id)}
              className='group relative flex items-center justify-center  w-[5rem] h-[3rem] text-sm font-black text-gray-900 rounded-full group bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white '
            >
              <span className='relative px-5 py-2.5 group-hover:px-0 transition-all ease-in duration-200 w-[4.5rem] h-[2.5rem] bg-white dark:bg-slate-800 rounded-full group-hover:bg-opacity-0'>
                <span className='flex items-center justify-around'>
                  <MdDeleteForever
                    title='Delete Plan'
                    className='cursor-pointer text-[1.3rem] align-center justify-center group-hover:text-red-700 transition-all duration-300'
                  />
                </span>
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlansLabel;
