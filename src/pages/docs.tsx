import DocsContent from "@comps/DocsContent";
import Footer from "@comps/Footer";
import Navbar from "@comps/Navbar";
import Head from "next/head";

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
