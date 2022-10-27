import Footer from "@comps/Footer";
import LoadsheddingProfile from "@comps/LoadsheddingProfile";
import Navbar from "@comps/Navbar";
import ProfileIndex from "@comps/ProfileIndex";
import TeamProfile from "@comps/TeamProfile";
import { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";

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
      <div className='w-full h-[90%] flex border-2 border-red-700'>
        <div className='w-1/4 h-full flex flex-col items-center justify-center space-y-8 p-5 border-2'>
          <div
            id='profile'
            onClick={() => setCurrentPage("profile")}
            className={
              currentPage === "profile"
                ? "w-fit h-fit px-4 py-2 rounded-lg cursor-pointer transition-all duration-500 bg-gradient-to-r from-c2aqua via-c2blue to-c2purple"
                : "w-fit h-fit px-4 py-2 rounded-lg cursor-pointer transition-all duration-500 hover:bg-gradient-to-r from-c2aqua via-c2blue to-c2purple"
            }
          >
            <h1 className='font-Inter font-black text-white'>PROFILE DETAILS</h1>
          </div>
          <div
            id='loadshedding'
            onClick={() => setCurrentPage("loadshedding")}
            className={
              currentPage === "loadshedding"
                ? "w-fit h-fit px-4 py-2 rounded-lg cursor-pointer transition-all duration-500 bg-gradient-to-r from-c2aqua via-c2blue to-c2purple"
                : "w-fit h-fit px-4 py-2 rounded-lg cursor-pointer transition-all duration-500 hover:bg-gradient-to-r from-c2aqua via-c2blue to-c2purple"
            }
          >
            <h1 className='font-Inter font-black text-white'>
              LOADSHEDDING SETTINGS
            </h1>
          </div>
          <div
            id='team'
            onClick={() => setCurrentPage("team")}
            className={
              currentPage === "team"
                ? "w-fit h-fit px-4 py-2 rounded-lg cursor-pointer transition-all duration-500 bg-gradient-to-r from-c2aqua via-c2blue to-c2purple"
                : "w-fit h-fit px-4 py-2 rounded-lg cursor-pointer transition-all duration-500 hover:bg-gradient-to-r from-c2aqua via-c2blue to-c2purple"
            }
          >
            <h1 className='font-Inter font-black text-white'>TEAM SETTINGS</h1>
          </div>
        </div>
        <div className='w-3/4 h-full flex'>{handlePageRender(currentPage)}</div>
      </div>
      <Footer />
    </div>
  );
};

export default plans;
