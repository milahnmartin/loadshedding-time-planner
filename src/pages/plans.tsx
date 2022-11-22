import Footer from "@comps/Footer";
import Navbar from "@comps/Navbar";
import PlansLabel from "@comps/PlansLabel";
import { v1 as uuidv1 } from "uuid";
import { Player } from "@lottiefiles/react-lottie-player";
import { NextPage } from "next";
import Head from "next/head";
import useFetchSavedPlans from "../hooks/useFetchSavedPlans";
import { toast } from "react-toastify";
import supabase from "../utils/supabase-config";

const plans: NextPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {
    data: savedPlans,
    isFetching: savedPlansIsFetching,
    refetch: refetchSavedPlans,
    // eslint-disable-next-line react-hooks/rules-of-hooks
  } = useFetchSavedPlans();
  const handlePlanDelete = async (plan_id: string) => {
    if (!plan_id) {
      toast.error("No Plan Id Provided");
      return;
    }
    const { error } = await supabase
      .from("user_plans")
      .delete()
      .eq("plan_id", plan_id);

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
        {savedPlansIsFetching ? (
          <Player
            src='https://assets2.lottiefiles.com/private_files/lf30_3vhjjbex.json'
            className='player w-[30%] h-[30%] '
            autoplay
            loop
            speed={0.5}
          />
        ) : (
          savedPlans?.map((plan: any) => {
            return (
              <PlansLabel plan={plan} key={uuidv1()} deleteCB={handlePlanDelete} />
            );
          })
        )}
      </div>
      <Footer />
    </div>
  );
};

export default plans;
