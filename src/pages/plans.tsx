import Footer from "@comps/Footer";
import Navbar from "@comps/Navbar";
import PlansLabel from "@comps/PlansLabel";
import { uuidv4 } from "@firebase/util";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import { ThreeDots } from "react-loading-icons";
import { toast } from "react-toastify";
import { auth } from "../utils/firebase-config";
import supabase from "../utils/supabase-config";

const plans: NextPage = () => {
  const [user, loading] = useAuthState(auth);

  const fetchUserPlans = async () => {
    const { data: UserDataInfo } = await supabase
      .from("user_plans")
      .select(
        `
      plan_id,plan_lsTimes,plan_authorizedUsers,plan_authorizedTeams,plan_createdAt
      `
      )
      .eq("user_id", user?.uid);

    if (UserDataInfo?.length == 0) {
      return [];
    }
    return UserDataInfo;
  };
  const {
    data: planData,
    isLoading,
    isError,
  } = useQuery([`plans${user?.uid}`], fetchUserPlans, {
    refetchOnWindowFocus: true,
  });

  if (isError) {
    toast.error("Error fetching plans");
  }
  return (
    <div className='h-screen w-screen overflow-scroll bg-black'>
      <Head>
        <title>LS Time Planner / Plans</title>
      </Head>
      <Navbar />
      <div className='w-full h-full border-white border-2 p-2 grid grid-cols-1 grid-rows-2'>
        <div className='flex justify-start flex-col'>
          <div className='flex text-2xl text-white font-bold h-[10%] align-center justify-center content-center'>
            MY PLANS
          </div>
          <div className='flex h-[90%] overflow-y-scroll flex-wrap content-center items-center justify-center space-x-2'>
            {/* HERE COMES PLANS */}
            {isLoading ? (
              <ThreeDots />
            ) : (
              planData?.map((plan: any) => {
                return <PlansLabel plan={plan} key={uuidv4()} />;
              })
            )}
          </div>
        </div>
        <div className='flex justify-start flex-col'>
          <div className='flex text-2xl text-white font-bold h-[10%] aling-center justify-center content-center'>
            INVITED PLANS
          </div>
          <div className='flex h-[90%] overflow-y-scroll flex-wrap content-center items-center justify-center text-center'>
            {/* here it comes */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default plans;
