import Navbar from "@comps/navbar/Navbar";
import PlanMain from "@comps/plan/PlanMain";
import { NextPage } from "next";
import Head from "next/head";

const IdPage: NextPage = () => {
  return (
    <div className='h-screen w-screen overflow-scroll '>
      <Head>
        <title>LS Planner / Plan</title>
      </Head>
      <Navbar />
      {/* <GameidContext.Provider > */}
      <PlanMain />
      {/* \ */}
    </div>
  );
};

export default IdPage;
