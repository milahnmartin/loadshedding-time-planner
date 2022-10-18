import { uuidv4 } from "@firebase/util";
import { NextPage } from "next";
import Head from "next/head";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ThreeDots } from "react-loading-icons";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PlansLabel from "../components/PlansLabel";
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
      Router.push("auth/login");
      return;
    }
    const { data: UserDataInfo, error } = await supabase
      .from("user_plans")
      .select(
        `
      plan_id,plan_lsTimes,plan_authorizedUsers,plan_authorizedTeams,plan_created
      `
      )
      .eq("user_id", user?.uid);

    if (UserDataInfo?.length == 0) {
      toast.error("No plans found");
      return;
    }
    setMyPlans(UserDataInfo);
    setLoadingPlans(false);
  };

  useEffect(() => {
    if (loading || !user) return;
    fetchUserPlans();
  }, [loading]);

  return (
    <div className='h-screen w-screen overflow-scroll bg-gradient-to-bl from-indigo-500 via-purple-500 to-pink-500'>
      <Head>
        <title>LS Time Planner / Plans</title>
      </Head>
      <Navbar />
      <div className='flex flex-wrap w-full h-full p-2'>
        <div className='w-1/2 flex flex-col p-2'>
          <div className='w-full h-fit flex items-center justify-center'>
            <h1 className='text-2xl bg-clip-text bg-gradient-to-br from-sky-600 via-purple-700 to-primary text-transparent animate-pulse tracking-widest font-bold text-center'>
              MY PLANS
            </h1>
          </div>
          {loadingPlans ? (
            <ThreeDots />
          ) : (
            <div className='h-full w-full content-start items-start gap-2 justify-start p-2 flex flex-wrap overflow-y-scroll'>
              {myplans.length > 0 &&
                myplans.map((data: any) => {
                  return <PlansLabel key={uuidv4()} plan={data} />;
                })}
            </div>
          )}
        </div>
        <div className='w-1/2 flex flex-col p-2'>
          <div className='w-full h-fit flex items-center justify-center'>
            <h1 className='text-2xl bg-clip-text bg-gradient-to-br from-sky-600 via-purple-700 to-primary text-transparent animate-pulse tracking-widest font-bold text-center'>
              INVITED PLANS
            </h1>
          </div>
          <div className='h-full w-full content-start items-start gap-2 justify-start p-3 flex overflow-y-scroll flex-wrap'>
            {/* THIS IS WHERE INVITED PLANS WILL GO */}
            {loadingPlans ? (
              <ThreeDots />
            ) : (
              <div className='h-full w-full content-start items-start gap-2 justify-start p-2 flex flex-wrap overflow-y-scroll'>
                {myplans.length > 0 &&
                  myplans.map((data: any) => {
                    return <PlansLabel key={uuidv4()} plan={data} />;
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default plans;
