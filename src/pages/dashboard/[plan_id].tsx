import PlanMain from '@comps/plan/PlanMain';
import Navbar from '@comps/ui/Navbar';
import { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
const IdPage: NextPage = () => {
  const [filter, setshowfilter] = useState<boolean>(true);
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Head>
        <title>LS Planner / Dashboard</title>
      </Head>
      <Navbar dashboard={true} filterState={{ filter, setshowfilter }} />
      <PlanMain filterState={{ filter, setshowfilter }} />
    </div>
  );
};

export default IdPage;
