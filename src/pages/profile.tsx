import Footer from "@comps/Footer";
import LoadsheddingProfile from "@comps/LoadsheddingProfile";
import Navbar from "@comps/Navbar";
import ProfileIndex from "@comps/ProfileIndex";
import TeamProfile from "@comps/TeamProfile";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Logo from "./assets/Logov3.png";

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

      <div className='h-[80%] flex mt-[3.5rem]  '>
        <div className='w-1/5 justify-end px-5 hidden md:flex '>
          <div className='w-full h-full flex flex-col items-center justify-center space-y-8 p-5 '>
            <div
              id='profile'
              onClick={() => setCurrentPage("profile")}
              className={
                currentPage === "profile"
                  ? "w-fit h-fit px-4 py-2 rounded-lg cursor-pointer transition-all duration-500 bg-gradient-to-r from-c2aqua via-c2blue to-c2purple"
                  : "w-fit h-fit px-4 py-2 rounded-lg cursor-pointer transition-all duration-500 hover:bg-gradient-to-r from-c2aqua via-c2blue to-c2purple"
              }
            >
              <h1 className='font-Inter font-black text-white text-center'>
                PROFILE DETAILS
              </h1>
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
              <h1 className='font-Inter font-black text-white text-center'>
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
              <h1 className='font-Inter font-black text-white text-center'>
                TEAM SETTINGS
              </h1>
            </div>
          </div>
          {/* Vertical Div */}
          <div className='h-full items-center justify-center '>
            <div className='h-[45%] w-full flex justify-center'>
              <span className='h-full w-[1px] bg-gradient-to-t from-caqua via-cblue to-cpurple'></span>
            </div>
            <div className='h-[10%] w-full flex items-center justify-center'>
              <Image
                className='w-fit'
                width={60}
                height={60}
                src={Logo}
                alt='Image of Logo'
              />
            </div>
            <div className='h-[45%] w-full flex justify-center'>
              <span className='h-full w-[1px] bg-gradient-to-b from-caqua via-cblue to-cpurple'></span>
            </div>
          </div>
          {/* Vertical Div end */}
        </div>
        <div className='w-full flex items-center justify-center flex-col md:w-4/5'>
          {handlePageRender(currentPage)}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default plans;
