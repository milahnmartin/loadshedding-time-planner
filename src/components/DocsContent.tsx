import { NextPage } from "next";
import { useState } from "react";
import Image from "next/image";
import Logo from "../pages/assets/Logov3.png";

function DocsContent() {
  return (
    <div className="h-[80%] flex mt-[3.5rem]  ">
      <div className="w-1/3 justify-end px-5 hidden md:flex ">
        <div className="w-full h-full flex flex-col items-center justify-center space-y-8 p-5 ">
          <div className="w-fit h-fit px-4 py-2 rounded-lg cursor-pointer transition-all duration-500 bg-gradient-to-r from-c2aqua via-c2blue to-c2purple">
            <h1 className="font-Inter font-black text-white text-center">
              Example 1
            </h1>
          </div>
          <div className="w-fit h-fit px-4 py-2 rounded-lg cursor-pointer transition-all duration-500 bg-gradient-to-r from-c2aqua via-c2blue to-c2purple">
            <h1 className="font-Inter font-black text-white text-center">
              Example 2
            </h1>
          </div>
          <div className="w-fit h-fit px-4 py-2 rounded-lg cursor-pointer transition-all duration-500 bg-gradient-to-r from-c2aqua via-c2blue to-c2purple">
            <h1 className="font-Inter font-black text-white text-center">
              Example 3
            </h1>
          </div>
        </div>
        {/* Vertical Div */}
        <div className="h-full items-center justify-center ">
          <div className="h-[45%] w-full flex justify-center">
            <span className="h-full w-[1px] bg-gradient-to-t from-caqua via-cblue to-cpurple"></span>
          </div>
          <div className="h-[10%] w-full flex items-center justify-center">
            <Image
              className="w-fit"
              width={60}
              height={60}
              src={Logo}
              alt="Image of Logo"
            />
          </div>
          <div className="h-[45%] w-full flex justify-center">
            <span className="h-full w-[1px] bg-gradient-to-b from-caqua via-cblue to-cpurple"></span>
          </div>
        </div>
        {/* Vertical Div end */}
      </div>
      <div className="w-full flex items-center justify-center flex-col md:3/4 ">
        <div className="w-3/4 h-full flex items-center justify-center">
          <p className="font-bold text-white">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text ever
            since the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book. It has survived not only five
            centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the release
            of Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including versions
            of Lorem Ipsum
          </p>
        </div>
      </div>
    </div>
  );
}

export default DocsContent;
