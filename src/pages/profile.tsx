import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Footer from "../components/Footer";
import LoadsheddingProfile from "../components/LoadsheddingProfile";
import Navbar from "../components/Navbar";
import ProfileIndex from "../components/ProfileIndex";
import TeamProfile from "../components/TeamProfile";

const plans: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<string>("profile");

  const handlePageRender = (page: string) => {
    switch (page) {
      case "profile":
        return <ProfileIndex />;
      case "loadshedding":
        return <LoadsheddingProfile />;
      case "team":
        return <TeamProfile />;
      default:
        return <ProfileIndex />;
    }
  };

  return (
    <div className='h-screen w-screen overflow-scroll bg-gradient-to-bl from-indigo-500 via-purple-500 to-pink-500'>
      <Head>
        <title>LS Time Planner / Profile</title>
      </Head>
      <Navbar />
      <div className='w-full h-full flex'>
        <div className='w-1/3 h-full border-2 border-solid border-black flex flex-col items-center justify-start space-y-8 p-5'>
          <div
            id='profile'
            onClick={() => setCurrentPage("profile")}
            className='active px-2 py-1 font-roboto font-bold text-white cursor-pointer transition-all duration-500 hover:bg-gray-600 rounded-2xl'
          >
            <h1 className='tracking-wide'>Profile Details</h1>
          </div>
          <div
            id='loadshedding'
            onClick={() => setCurrentPage("loadshedding")}
            className='font-roboto text-white font-bold cursor-pointer transition-all duration-500 hover:bg-gray-600 rounded-2xl'
          >
            <h1 className='px-2 py-1 tracking-wide'>Loadshedding Details</h1>
          </div>
          <div
            id='team'
            onClick={() => setCurrentPage("team")}
            className='px-2 py-1 font-roboto text-white font-bold cursor-pointer transition-all duration-500 hover:bg-gray-600 rounded-2xl'
          >
            <h1 className='tracking-wide font-main'>Team Settings</h1>
          </div>
        </div>
        <div className='w-2/3 h-full border-2 border-solid border-sky-700 flex'>
          {handlePageRender(currentPage)}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default plans;
