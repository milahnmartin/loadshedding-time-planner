import Footer from "@comps/Footer";
import PlansLabel from "@comps/labels/PlansLabel";
import Navbar from "@comps/navbar/Navbar";
import useFetchSavedPlans from "@hooks/useFetchSavedPlans";
import { Player } from "@lottiefiles/react-lottie-player";
import supabase from "@utils/supabase-config";
import { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import { toast } from "react-toastify";
import { v1 as uuidv1 } from "uuid";

const plans: NextPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {
    data: savedPlans,
    isLoading: savedPlansLoading,
    isFetching: savedPlansIsFetching,
    refetch: refetchSavedPlans,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useFetchSavedPlans();
  const handlePlanDelete = async (plan_id: string) => {
    if (!plan_id) {
      toast.error("No Plan Id Provided");
      return;
    }
    const { error } = await supabase.from("user_plans").delete().eq("plan_id", plan_id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(`Plan ${plan_id} Deleted Successfully`);
    await refetchSavedPlans();
  };
  return (
    <div className='h-screen w-screen overflow-y-scroll'>
      <Head>
        <title>LS Planner / Plans</title>
      </Head>
      <Navbar />
      <div className='flex min-h-[90vh] max-h-fit w-full flex-wrap content-center items-center justify-center overflow-y-scroll gap-2 py-4'>
        {savedPlansLoading ? (
          <Player
            src='https://assets2.lottiefiles.com/private_files/lf30_3vhjjbex.json'
            className='player w-[30%] h-[30%] '
            autoplay
            loop
            speed={0.5}
          />
        ) : (
          savedPlans?.map((plan: any) => {
            return <PlansLabel plan={plan} key={uuidv1()} deleteCB={handlePlanDelete} />;
          })
        )}
        {savedPlans?.length === 0 && (
          <div className='rounded-xl w-[20rem] h-fit bg-gradient-to-r p-[3px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
            <div className='flex flex-col h-full w-full bg-slate-800 text-white rounded-lg'>
              <span className='flex flex-col items-center w-full h-fit pt-2 pb-4'>
                <Player
                  src='https://assets3.lottiefiles.com/private_files/lf30_17bvu2tk.json'
                  className='player w-[110px] h-[110px] '
                  autoplay
                  loop
                  speed={0.5}
                />
                <h1 className='text-2xl font-satoshiBlack pb-4'>NO PLANS</h1>
                <button
                  className='relative flex items-center justify-center  w-[10rem] h-[3rem] text-sm font-black text-gray-900 rounded-full group bg-gradient-to-br from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white '
                  onClick={() => Router.push("/")}
                >
                  <span className='relative px-5 py-2.5 group-hover:px-0 transition-all ease-in duration-200 w-[9.5rem] h-[2.5rem] bg-white dark:bg-slate-800 rounded-full group-hover:bg-opacity-0'>
                    <span className='flex items-center justify-around font-satoshiBlack'>
                      Create Plan
                    </span>
                  </span>
                </button>
              </span>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default plans;
