import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Eskom time Calc</title>
        <meta name='description' content='this is Eskom Thingy' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Navbar />
      <main className='h-auto flex items-center justify-center border-2 border-red-200 p-5'>
        <button className='p-5 font-mono text-white bg-gradient-to-r from-primary to-secondary rounded-lg'>
          CONTINUE
        </button>
      </main>
    </>
  );
};

export default Home;
