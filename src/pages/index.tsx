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
        <meta
          name='description'
          content='Struggling To Schedule Gaming Sessions With your Friends ? Sign Up and Add your loadshedding Schedules and sit back and enjoy your stress free gaming planning.'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta name='image' content='/Light-buld.png' />
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
