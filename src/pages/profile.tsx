import Logo from "@assets/Logov3.png";
import LoadsheddingProfile from "@comps/profile/LoadsheddingProfile";
import ProfileIndex from "@comps/profile/ProfileIndex";
import TeamProfile from "@comps/profile/TeamProfile";
import Footer from "@comps/ui/Footer";
import Navbar from "@comps/ui/Navbar";
import classNames from "classnames";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";

enum Pages {
  Profile,
  Loadshedding,
  Team,
}
const plans: NextPage = () => {
  const [currentPage, setCurrentPage] = useState<Pages>(Pages.Profile);
  const handlePageRender = (page: Pages) => {
    switch (page) {
      case Pages.Profile:
        return <ProfileIndex />;
      case Pages.Loadshedding:
        return <LoadsheddingProfile />;
      case Pages.Team:
        return <TeamProfile />;
      default:
        return <ProfileIndex />;
    }
  };

  const pagesStyle = classNames(
    "w-full h-fit px-4 py-2 rounded-lg cursor-pointer transition-all duration-500 hover:bg-gradient-to-r from-c2aqua via-c2blue to-c2purple",
    {
      "bg-gradient-to-r from-c2aqua via-c2blue to-c2purple":
        currentPage === Pages.Profile,
    }
  );
  return (
    <div className='h-screen w-screen overflow-scroll'>
      <Head>
        <title>LS Planner / Profile</title>
      </Head>
      <Navbar />
      <div className='h-[80%] flex mt-[3.5rem]  '>
        <div className='w-1/5 justify-end px-5 hidden md:flex '>
          <div className='w-full h-full flex flex-col items-center justify-center space-y-8 p-5 '>
            <div
              id='profile'
              onClick={() => setCurrentPage(Pages.Profile)}
              className={classNames(
                "w-full h-fit px-4 py-2 rounded-lg cursor-pointer transition-all duration-500 hover:bg-gradient-to-r from-c2aqua via-c2blue to-c2purple",
                {
                  "bg-gradient-to-r from-c2aqua via-c2blue to-c2purple":
                    currentPage === Pages.Profile,
                }
              )}
            >
              <h1 className='font-satoshiBold text-white text-center'>PROFILE DETAILS</h1>
            </div>

            <div
              id='loadshedding'
              onClick={() => setCurrentPage(Pages.Loadshedding)}
              className={classNames(
                "w-full h-fit px-4 py-2 rounded-lg cursor-pointer transition-all duration-500 hover:bg-gradient-to-r from-c2aqua via-c2blue to-c2purple",
                {
                  "bg-gradient-to-r from-c2aqua via-c2blue to-c2purple":
                    currentPage === Pages.Loadshedding,
                }
              )}
            >
              <h1 className='font-satoshiBold text-white text-center'>
                LOADSHEDDING SETTINGS
              </h1>
            </div>

            <div
              id='team'
              onClick={() => setCurrentPage(Pages.Team)}
              className={classNames(
                "w-full h-fit px-4 py-2 rounded-lg cursor-pointer transition-all duration-500 hover:bg-gradient-to-r from-c2aqua via-c2blue to-c2purple",
                {
                  "bg-gradient-to-r from-c2aqua via-c2blue to-c2purple":
                    currentPage === Pages.Team,
                }
              )}
            >
              <h1 className='font-satoshiBold text-white text-center'>TEAM SETTINGS</h1>
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
