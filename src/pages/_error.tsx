import Footer from "@comps/Footer";
import Navbar from "@comps/Navbar";
import Head from "next/head";
import Router from "next/router";
const ErrorPage = () => {
  return (
    <div className='h-screen w-screen overflow-scroll bg-black'>
      <Head>
        <title>LS Time Planner / 404</title>
      </Head>
      <Navbar />
      <div className='h-[90%] w-ful flex-col space-y-8 flex items-center justify-center'>
        <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-cblue via-cpurple to-caqua font-Inter text-6xl font-black'>
          404 PAGE NOT FOUND
        </h1>
        <button
          onClick={() => Router.push("/")}
          className='hover:bg-sky-400 px-4 py-2 animation-all duration-200 text-white font-Inter font-black bg-cblue rounded-xl'
        >
          RETURN HOME
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPage;
