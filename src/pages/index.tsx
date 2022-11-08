import Footer from "@comps/Footer";
import IndexMain from "@comps/IndexMain";
import Navbar from "@comps/Navbar";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className='h-screen w-screen bg-black max-h-screen overflow-scroll'>
      <Head>
        <title>LS Planner / Home</title>
        <meta property='og:title' content='Loadshedding Time Calculator / Home' />
        <meta property='og:type' content='website' />
        <meta
          property='og:description'
          content='Struggling to schedule game time with the boys due to loadshedding ? Look no Further, simply make an account, add your corresponding loadshedding area and add your friends ! Then sit back and let the LS Calculator due the stressful work for you !'
        />
        <meta
          name='description'
          content='Struggling to schedule game time with the boys due to loadshedding ? Look no Further, simply make an account, add your corresponding loadshedding area and add your friends ! Then sit back and let the LS Calculator due the stressful work for you !'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta property='og:image' content='/Logov3.png' />
      </Head>
      <Navbar />
      <IndexMain />
      <div
        id='middle-screen'
        className='w-full h-[50rem] flex items-center justify-center'
      >
        {/* <h1 className='px-2 text-transparent tracking-tight w-fit bg-clip-text text-center font-Inter text-5xl font-black bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 md:text-7xl'>
          WHAT IS LOADSHEDDING ?
        </h1> */}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
