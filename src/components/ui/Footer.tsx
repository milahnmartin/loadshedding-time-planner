import Logo from "@assets/Logov3.png";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const Footer = React.memo(() => {
  return (
    <footer className='w-full h-full flex flex-col mb-10'>
      <div className='flex flex-col items-center justify-end w-full h-full text-white'>
        <div className='w-[70%] flex flex-col items-center font-Inter space-y-10 md:flex-row md:justify-start md:space-y-0'>
          <div className='flex flex-col items-center w-[75%] space-y-5'>
            <h1 className='font-satoshiBold text-transparent bg-clip-text bg-gradient-to-r from-c2aqua via-c2blue to-c2purple'>
              SOCIAL MEDIA
            </h1>
            <h1 className='font-satoshi hover:font-bold hover:animate-pulse'>
              <Link href='/'>Discord</Link>
            </h1>
            <h1 className='font-satoshi hover:font-bold hover:animate-pulse'>
              <Link href='/'>Twitter</Link>
            </h1>
            <h1 className='font-satoshi hover:font-bold hover:animate-pulse'>
              <Link href='/'>Instagram</Link>
            </h1>
          </div>
          <div className='flex flex-col items-center w-[75%] space-y-5'>
            <h1 className='font-satoshiBold text-transparent bg-clip-text bg-gradient-to-r from-c2aqua via-c2blue to-c2purple'>
              NAVIGATE
            </h1>
            <h1 className='font-satoshi hover:font-bold hover:animate-pulse'>
              <Link href='/'>Home</Link>
            </h1>
            <h1 className='font-satoshi hover:font-bold hover:animate-pulse'>
              <Link href='/plan/create'>Create New Plan</Link>
            </h1>
            <h1 className='font-satoshi hover:font-bold hover:animate-pulse'>
              <Link href='/docs'>Docs</Link>
            </h1>
          </div>
        </div>
        <hr className='my-4 mx-auto w-[60%] h-[0.2rem] bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] rounded border-0 md:my-8' />
        <div className='flex flex-col w-full items-center justify-center space-y-5 md:space-x-8 md:flex-row md:space-y-0'>
          <Image width={60} height={60} src={Logo} alt='Image Of logo' />
          <h1 className='font-satoshiBlack text-xl tracking-widest text-center'>
            &#169; LS PLANNER 2022
          </h1>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
