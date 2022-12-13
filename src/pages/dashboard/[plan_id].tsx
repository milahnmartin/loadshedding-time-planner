import Navbar from "@comps/navbar/Navbar";
import PlanMain from "@comps/plan/PlanMain";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
const IdPage: NextPage = () => {
  const [filter, setshowfilter] = useState<boolean>(true);
  return (
    <div className='h-screen w-screen overflow-hidden'>
      <Head>
        <title>LS Planner / Dashboard</title>
      </Head>
      <Navbar dashboard={true} filterState={{ filter, setshowfilter }} />
      {/* <GameidContext.Provider > */}
      <PlanMain filterState={{ filter, setshowfilter }} />
      {/* \ */}
    </div>
  );
};

export default IdPage;
