import Footer from "@comps/Footer";
import Navbar from "@comps/Navbar";
import PlansLabel from "@comps/PlansLabel";
import { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ThreeDots } from "react-loading-icons";
import { toast } from "react-toastify";
import { auth } from "../utils/firebase-config";
import supabase from "../utils/supabase-config";
const plans: NextPage = () => {
  const [user, loading] = useAuthState(auth);
  const [myplans, setMyPlans] = useState<any>([]);
  const [loadingPlans, setLoadingPlans] = useState<boolean>(true);

  const fetchUserPlans = async () => {
    if (!user) {
      toast.error("Login to view your plans", {
        autoClose: 4000,
      });
      Router.push("/auth/login");
      return;
    }
    const { data: UserDataInfo, error } = await supabase
      .from("user_plans")
      .select(
        `
      plan_id,plan_lsTimes,plan_authorizedUsers,plan_authorizedTeams,plan_createdAt
      `
      )
      .eq("user_id", user?.uid);

    if (UserDataInfo?.length == 0) {
      toast.error("No plans found");
      setLoadingPlans(false);
      return;
    }
    setMyPlans(UserDataInfo);
    setLoadingPlans(false);
  };

  useEffect(() => {
    if (loading) return;
    fetchUserPlans();
  }, [loading]);

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
          <div className='flex h-[90%] overflow-y-scroll flex-wrap content-center items-center justify-center'>
            {/* here it comes */}
            {loadingPlans ? (
              <ThreeDots />
            ) : (
              myplans.map((plan: any) => {
                return <PlansLabel plan={plan} />;
              })
            )}
          </div>
        </div>
        <div className='flex justify-start flex-col'>
          <div className='flex text-2xl text-white font-bold h-[10%] aling-center justify-center content-center'>
            INVITED PLANS
          </div>
          <div className='flex h-[90%] overflow-y-scroll flex-wrap content-center items-center justify-center'>
            {/* here it comes */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default plans;
