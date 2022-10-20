import Head from "next/head";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
const Instructions = () => {
  return (
    <div className='h-screen w-screen overflow-scroll bg-black'>
      <Head>
        <title>LS Time Planner / Instructions</title>
      </Head>
      <Navbar />
      <Footer />
    </div>
  );
};

export default Instructions;
