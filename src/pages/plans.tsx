import { uuidv4 } from "@firebase/util";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PlansLabel from "../components/PlansLabel";
import { auth } from "../utils/firebase-config";
import supabase from "../utils/supabase-config";
const plans: NextPage = () => {
  const [user, loading] = useAuthState(auth);
  const [plans, setPlans] = useState<any>([]);

  const fetchPlans = async () => {
    let userGameIds = null;
    if (!user) return;
    const { data, error } = await supabase.from("user_info").select();

    if (error) {
      toast.error("Unable To Fetch Data ...");
      return;
    }

    for (let i of data) {
      if (i.user_id == user.uid) {
        userGameIds = JSON.parse(i.user_plans);
        break;
      }
    }
    if (!userGameIds) return;
    let gameData: any[] = [];
    for (let plan of userGameIds) {
      const { data: forData, error } = await supabase
        .from("user_plans")
        .select()
        .eq("plan_id", plan);

      if (!forData) {
        continue;
      }
      gameData.push(forData);
    }
    setPlans(gameData);
  };

  useEffect(() => {
    if (!loading) fetchPlans();
  }, [loading]);

  return (
    <div className='h-screen w-screen overflow-scroll bg-gradient-to-bl from-indigo-500 via-purple-500 to-pink-500'>
      <Head>
        <title>LS Time Planner / Plans</title>
      </Head>
      <Navbar />
      <div className='flex w-full h-full p-4 space-x-5'>
        {plans.map((data: string[]) => {
          return <PlansLabel key={uuidv4()} data={data[0]} />;
        })}
      </div>
      <Footer />
    </div>
  );
};

export default plans;
