import type { NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import IndexMain from "../components/IndexMain";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <div className='h-screen w-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 max-h-screen overflow-scroll'>
      <Head>
        <title>LS Time Planner / Home</title>
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
        <meta property='og:image' content='/Light-bulb.png' />
        <link rel='icon' href='/Light-bulb.png' />
        <link
          href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;1,100&display=swap'
          rel='stylesheet'
        />
      </Head>
      <Navbar />
      <IndexMain />
      <Footer />
    </div>
  );
};

export default Home;
