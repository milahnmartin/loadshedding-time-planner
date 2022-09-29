import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../../components/Footer";
import GameSpecific from "../../components/GameSpecific";
import Navbar from "../../components/Navbar";
const IdPage: NextPage = () => {
  const {
    query: { id },
  } = useRouter();

  return (
    <div className='h-screen w-screen overflow-scroll bg-gradient-to-bl from-indigo-500 via-purple-500 to-pink-500'>
      <Head>
        <title>Eskom Gaming Calc / #{id}</title>
        <link rel='icon' href='/Light-bulb.png' />
      </Head>
      <Navbar />
      <GameSpecific />
      <Footer />
    </div>
  );
};

export default IdPage;
