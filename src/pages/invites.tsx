import Footer from "@comps/Footer";
import InviteMain from "@comps/InviteMain";
import Navbar from "@comps/Navbar";
import Head from "next/head";
const invites = () => {
  return (
    <div className='h-screen w-screen overflow-y-scroll bg-black'>
      <Head>
        <title>LS Time Planner / Invites</title>
      </Head>
      <Navbar />
      <InviteMain />
      <Footer />
    </div>
  );
};

export default invites;