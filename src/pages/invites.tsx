import InviteMain from "@comps/InviteMain";
import Footer from "@comps/ui/Footer";
import Navbar from "@comps/ui/Navbar";
import { NextPage } from "next";
import Head from "next/head";
const invites: NextPage = () => {
  return (
    <div className='h-screen w-screen overflow-y-scroll'>
      <Head>
        <title>LS Planner / Invites</title>
      </Head>
      <Navbar />
      <InviteMain />
      <Footer />
    </div>
  );
};

export default invites;
