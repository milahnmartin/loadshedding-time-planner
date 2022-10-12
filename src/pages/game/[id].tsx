import { NextPage } from "next";
import Head from "next/head";
import { createContext } from "react";
import Footer from "../../components/Footer";
import GameSpecific from "../../components/GameSpecific";
import Navbar from "../../components/Navbar";
export const getServerSideProps = async (context: any) => {
  const { id } = context.query;
  return { props: { id } };
};
export const GameidContext = createContext("create");

const IdPage: NextPage = ({ id }: any) => {
  return (
    <div className='h-screen w-screen overflow-scroll bg-gradient-to-bl from-indigo-500 via-purple-500 to-pink-500'>
      <Head>
        <title>Eskom Gaming Calc / #{id}</title>
        <link rel='icon' href='/Light-bulb.png' />
      </Head>
      <Navbar />
      <GameidContext.Provider value={id}>
        <GameSpecific />
      </GameidContext.Provider>
      <Footer />
    </div>
  );
};

export default IdPage;
