import { collection, onSnapshot, query, where } from "firebase/firestore";
import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { auth, db } from "../utils/firebase-config";
const plans: NextPage = () => {
  const [user, loading] = useAuthState(auth);
  const [plans, setPlans] = useState<any>([]);

  useEffect(() => {
    const handleGetGames = () => {
      const collectionRef = collection(db, `plans`);
      const q = query(
        collectionRef,
        where("games", "==", "742ff5cd-cf8d-4ea8-be3b-f1e84bd3610e")
      );
      onSnapshot(q, (querySnapshot) => {
        let plans = [] as any[];
        querySnapshot.forEach((doc) => {
          plans.push(doc.data());
        });
        console.log(plans);
        setPlans(plans);
      });
    };

    handleGetGames();
  }, [loading]);

  return (
    <div className='h-screen w-screen overflow-scroll bg-gradient-to-bl from-indigo-500 via-purple-500 to-pink-500'>
      <Head>
        <title>LS Time Planner / Plans</title>
        <link rel='icon' href='/Light-bulb.png' />
      </Head>
      <Navbar />
      <div className='w-full h-full'></div>
      <Footer />
    </div>
  );
};

export default plans;
