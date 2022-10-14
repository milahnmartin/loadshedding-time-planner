import { NextPage } from "next";
import Head from "next/head";
import { createContext } from "react";
import Footer from "../../components/Footer";
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
        <title>LS Time Planner / Plan</title>
      </Head>
      <Navbar />
      <GameidContext.Provider value={id}>
        <div className='w-full h-full flex items-center justify-start flex-col pt-10'>
          <h1 className='font-extrabold text-center pb-5 text-4xl animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-primary to-amber-300 md:text-7xl'>
            Start Adding New Players !
          </h1>
          {/* <DataControllers /> */}
        </div>
      </GameidContext.Provider>
      <Footer />
    </div>
  );
};

export default IdPage;
