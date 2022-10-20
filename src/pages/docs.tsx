import Head from "next/head";
import DocsContent from "../components/DocsContent";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function docs() {
  return (
    <div className='h-screen w-screen overflow-scroll bg-black'>
      <Head>
        <title>LS Time Planner / Docs</title>
      </Head>
      <Navbar />
      <DocsContent />
      <Footer />
    </div>
  );
}

export default docs;
