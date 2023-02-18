import DocsContent from "@comps/docs/DocsContent";
import Footer from "@comps/ui/Footer";
import Navbar from "@comps/ui/Navbar";
import Head from "next/head";

const Docs = () => {
  return (
    <div className='h-screen w-screen overflow-scroll'>
      <Head>
        <title>LS Planner / Docs</title>
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
        <meta property='og:image' content='@assets/Logov3.png' />
      </Head>
      <Navbar />
      <DocsContent />
      <Footer />
    </div>
  );
};

export default Docs;
