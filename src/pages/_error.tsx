import ErrorJSON from "@assets/119776-table-fan-404-error.json";
import Footer from "@comps/ui/Footer";
import Navbar from "@comps/ui/Navbar";
import Head from "next/head";
import Router from "next/router";
import Lottie from "react-lottie-player";
const ErrorPage = () => {
  return (
    <div className='h-screen w-screen overflow-hidden'>
      <Head>
        <title>LS Planner / 404</title>
      </Head>
      <Navbar />
      <div className='h-[90%] w-full flex-col flex items-center justify-center'>
        <Lottie loop animationData={ErrorJSON} play style={{ width: 400, height: 400 }} />
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPage;
