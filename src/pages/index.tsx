import type { NextPage } from "next";
import Head from "next/head";
import IndexMain from "../components/IndexMain";
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
      <IndexMain />
    </>
  );
};

export default Home;
