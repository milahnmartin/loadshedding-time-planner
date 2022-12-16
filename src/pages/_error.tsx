import Logo from "@assets/Logov3.png";
import Footer from "@comps/ui/Footer";
import Navbar from "@comps/ui/Navbar";
import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
const ErrorPage = () => {
  return (
    <div className='h-screen w-screen overflow-hidden'>
      <Head>
        <title>LS Planner / 404</title>
      </Head>
      <Navbar />
      <div className='h-[90%] w-ful flex-col space-y-14 flex items-center justify-center'>
        <Image
          className='animate-bounce'
          src={Logo}
          alt='Logo'
          width={200}
          height={200}
        />
        <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-cblue via-cpurple to-caqua font-satoshiBold text-6xl font-black'>
          THIS PAGE DOES NOT EXIST
        </h1>
        <button
          onClick={() => Router.push("/")}
          className='hover:bg-cpurple px-4 py-2 animation-all duration-200 text-white font-satoshiBold bg-cblue rounded-xl'
        >
          RETURN HOME
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPage;
