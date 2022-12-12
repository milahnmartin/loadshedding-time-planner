import Logo from "@assets/Logov3.png";
import { Gradient } from "@helpers/Gradient.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppType } from "next/dist/shared/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import { Player } from "@lottiefiles/react-lottie-player";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import "../styles/satoshi.css";
const gradient = new Gradient() as any;
const queryClient = new QueryClient();
const MyApp: AppType = ({ Component, pageProps }) => {
  const [isLoading, setisLoading] = useState<boolean>(true);

  const ref = useRef() as any;

  useEffect(() => {
    const mytimeout = setTimeout(() => {
      setisLoading(false);
    }, 1000);
    return () => clearTimeout(mytimeout);
  }, []);

  useEffect(() => {
    if (ref.current && !isLoading) {
      gradient.initGradient("#gradient-canvas");
    }
  }, [ref, isLoading]);

  if (isLoading) {
    return (
      <div className='w-screen h-screen flex flex-col items-center justify-center bg-slate-800 gap-4'>
        <span className='flex flex-col items-center w-full h-fit '>
          {/* <Image
            className='cursor-pointer animate-spin'
            height={225}
            width={225}
            src={Logo}
            alt='Image of Logo'
          /> */}
          <Player
            src='https://assets2.lottiefiles.com/private_files/lf30_3vhjjbex.json'
            className='player w-[300px] h-[300px] '
            autoplay
            loop
            speed={0.5}
          />
          {/* <h1 className='font-satoshiBold text-transparent bg-clip-text bg-gradient-to-r from-c2aqua via-c2blue to-c2purple text-8xl animate-pulse pt-8'> */}
          <h1 className='font-satoshiBold text-white text-7xl animate-pulse tracking-wider pt-8'>
            LS PLANNER
          </h1>
        </span>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div ref={ref} className='w-full h-[90vh]'>
        <canvas
          className='w-full h-[100%] absolute'
          id='gradient-canvas'
          data-transition-in
        />

        <ToastContainer position='bottom-right' />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </div>
    </QueryClientProvider>
  );
};

export default MyApp;
