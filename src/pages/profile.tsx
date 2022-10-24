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
    <div className='h-screen w-screen overflow-scroll bg-black'>
      <Head>
        <title>LS Time Planner / Profile</title>
      </Head>
      <Navbar />
      <div className='w-full h-full flex border-2 border-red-700'>
        <div className='w-1/4 h-full flex flex-col items-center justify-center space-y-8 p-5 border-2'>
          <div
            id='profile'
            onClick={() => setCurrentPage("profile")}
            className='px-2 py-1 text-white cursor-pointer transition-all duration-500 hover:bg-sky-700 rounded-2xl'
          >
            <h1 className='font-bold text-white text-2xl'>Profile Details</h1>
          </div>
          <div
            id='loadshedding'
            onClick={() => setCurrentPage("loadshedding")}
            className='text-white cursor-pointer transition-all duration-500 hover:bg-sky-700 rounded-2xl'
          >
            <h1 className='font-bold text-white text-2xl'>Loadshedding Details</h1>
          </div>
          <div
            id='team'
            onClick={() => setCurrentPage("team")}
            className='px-2 py-1 text-white cursor-pointer transition-all duration-500 hover:bg-sky-700 rounded-2xl'
          >
            <h1 className='font-bold text-white text-2xl'>Team Settings</h1>
          </div>
        </div>
        <div className='w-3/4 h-full flex boder-2'>
          {handlePageRender(currentPage)}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default plans;
