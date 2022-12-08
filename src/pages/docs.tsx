import DocsContent from "@comps/docs/DocsContent";
import Footer from "@comps/Footer";
import Navbar from "@comps/navbar/Navbar";
import Head from "next/head";

function docs() {
  return (
    <div className='h-screen w-screen overflow-scroll'>
      <Head>
        <title>LS Planner / Docs</title>
      </Head>
      <Navbar />
      <DocsContent />
      <Footer />
    </div>
  );
}

export default docs;
