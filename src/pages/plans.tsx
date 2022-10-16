import { uuidv4 } from "@firebase/util";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PlansLabel from "../components/PlansLabel";
import { auth } from "../utils/firebase-config";
import supabase from "../utils/supabase-config";

const plans: NextPage = () => {
  const [user, loading] = useAuthState(auth);
  const [plans, setPlans] = useState<any>([]);

  const fetchPlans = async () => {
    if (!user) return;
    const { data, error } = await supabase.from("plans").select("*");

    if (error) {
      console.log(error);
      return;
    }
    setPlans(data);
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
        {plans &&
          plans.map((data: any) => <PlansLabel key={uuidv4()} data={data} />)}
      </div>
      <Footer />
    </div>
  );
};

export default plans;
