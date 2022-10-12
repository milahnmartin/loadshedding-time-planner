import Head from "next/head";
import DocsContent from "../components/DocsContent";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function docs() {
  return (
    <div className='h-screen w-screen overflow-scroll bg-gradient-to-bl from-indigo-500 via-purple-500 to-pink-500'>
      <Head>
        <title>LS Time Planner / Docs</title>
        <link rel='icon' href='/Light-bulb.png' />
      </Head>
      <Navbar />
      <DocsContent />
      <Footer />
    </div>
  );
}

export default docs;
