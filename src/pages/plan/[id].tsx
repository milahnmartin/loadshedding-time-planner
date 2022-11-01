import DataControllers from "@comps/DataControllers";
import Footer from "@comps/Footer";
import Navbar from "@comps/Navbar";
import { NextPage } from "next";
import Head from "next/head";
import { createContext } from "react";
import { toast } from "react-toastify";
import supabase from "../../utils/supabase-config";
export const getServerSideProps = async (context: any) => {
  const { id } = context.query;
  const { data, error } = await supabase
    .from("user_plans")
    .select(
      `plan_lsTimes,plan_authorizedUsers,user_id,plan_authorizedTeams,plan_createdAt`
    )
    .eq("plan_id", id);

  if (error) {
    toast.error("An error occured while fetching the plan data");
    return;
  }

  return {
    props: { id, data },
  };
};
export const GameidContext = createContext({ id: "create", data: [] });

const IdPage: NextPage = ({ id, data }: any) => {
  console.log(data);
  return (
    <div className='h-screen w-screen overflow-scroll bg-black'>
      <Head>
        <title>LS Time Planner / Plan</title>
      </Head>
      <Navbar />
      <GameidContext.Provider value={{ id, data }}>
        <DataControllers />
      </GameidContext.Provider>
      <Footer />
    </div>
  );
};

export default IdPage;
