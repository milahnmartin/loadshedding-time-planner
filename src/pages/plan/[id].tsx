import DataControllers from "@comps/DataControllers";
import Footer from "@comps/Footer";
import Navbar from "@comps/Navbar";
import { NextPage } from "next";
import Head from "next/head";

const IdPage: NextPage = ({ id }: any) => {
  return (
    <div className='h-screen w-screen overflow-scroll bg-black'>
      <Head>
        <title>LS Time Planner / Plan</title>
      </Head>
      <Navbar />
      {/* <GameidContext.Provider > */}
      <DataControllers />
      {/* \ */}
      <Footer />
    </div>
  );
};

export default IdPage;
