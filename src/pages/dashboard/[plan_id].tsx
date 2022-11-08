import Navbar from "@comps/Navbar";
import PlanMain from "@comps/PlanMain";
import { NextPage } from "next";
import Head from "next/head";

const IdPage: NextPage = () => {
  return (
    <div className='h-screen w-screen overflow-scroll bg-black'>
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
