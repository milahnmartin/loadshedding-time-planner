import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
const Instructions = () => {
  return (
    <div className='h-screen w-screen overflow-scroll bg-gradient-to-bl from-indigo-500 via-purple-500 to-pink-500'>
      <Head>
        <title>LS Time Planner / Instructions</title>
      </Head>
      <Navbar />
      <Footer />
    </div>
  );
};

export default Instructions;
