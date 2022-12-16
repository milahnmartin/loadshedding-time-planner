import DocsContent from "@comps/docs/DocsContent";
import Footer from "@comps/ui/Footer";
import Navbar from "@comps/ui/Navbar";
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
