import Logo from "@assets/Logov3.png";
import Introduction from "@docs/Introduction";
import classNames from "classnames";
import Image from "next/image";
import { useState } from "react";
import GettingStarted from "@docs/GettingStarted";
import HowToUse from "@docs/HowToUse";
enum DocPages {
  Introduction,
  GettingStarted,
  HowToUse,
}

function DocsContent() {
  const [docpage, setdocPage] = useState<DocPages>(DocPages.Introduction);
  const handleDocPage = (page: DocPages) => {
    switch (page) {
      case DocPages.Introduction:
        return <Introduction />;
      case DocPages.GettingStarted:
        return <GettingStarted />;
      case DocPages.HowToUse:
        return <HowToUse />;
      default:
        return <Introduction />;
    }
  };
  return (
    <div className='h-[80%] flex mt-[3.5rem] pr-4 '>
      <div className='w-1/3 justify-end px-5 hidden md:flex '>
        <div className='w-full h-full flex flex-col items-center justify-center space-y-8 p-5 '>
          <div
            onClick={() => {
              setdocPage(DocPages.Introduction);
            }}
            className={classNames(
              "w-[60%] h-fit px-4 py-2 rounded-lg cursor-pointer transition-all duration-500 hover:bg-gradient-to-r from-c2aqua via-c2blue to-c2purple",
              {
                "bg-gradient-to-r from-c2aqua via-c2blue to-c2purple":
                  docpage === DocPages.Introduction,
              }
            )}
          >
            <h1 className='font-satoshiBold text-white text-center'>INTRODUCTION</h1>
          </div>
          <div
            onClick={() => {
              setdocPage(DocPages.GettingStarted);
            }}
            className={classNames(
              "w-[60%] h-fit px-4 py-2 rounded-lg cursor-pointer transition-all duration-500 hover:bg-gradient-to-r from-c2aqua via-c2blue to-c2purple",
              {
                "bg-gradient-to-r from-c2aqua via-c2blue to-c2purple":
                  docpage === DocPages.GettingStarted,
              }
            )}
          >
            <h1 className='font-satoshiBold text-white text-center'>GETTING STARTED</h1>
          </div>
          <div
            onClick={() => {
              setdocPage(DocPages.HowToUse);
            }}
            className={classNames(
              "w-[60%] h-fit px-4 py-2 rounded-lg cursor-pointer transition-all duration-500 hover:bg-gradient-to-r from-c2aqua via-c2blue to-c2purple",
              {
                "bg-gradient-to-r from-c2aqua via-c2blue to-c2purple":
                  docpage === DocPages.HowToUse,
              }
            )}
          >
            <h1 className='font-satoshiBold text-white text-center'>HOW TO USE</h1>
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
      <div className='w-full flex items-center justify-center flex-col md:3/4 border-0'>
        {handleDocPage(docpage)}
      </div>
    </div>
  );
}

export default DocsContent;
