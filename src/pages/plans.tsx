import { NextPage } from "next";
import Head from "next/head";
import { createContext } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export const GameidContext = createContext("create");

const plans: NextPage = () => {
  return (
    <div className='h-screen w-screen overflow-scroll bg-gradient-to-bl from-indigo-500 via-purple-500 to-pink-500'>
      <Head>
        <title>Eskom Gaming Calc / Plans</title>
        <link rel='icon' href='/Light-bulb.png' />
      </Head>
      <Navbar />
      <div className='w-full h-full'></div>
      <Footer />
    </div>
  );
};

export default plans;
