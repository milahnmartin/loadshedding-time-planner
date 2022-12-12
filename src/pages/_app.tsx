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
        <div className='rounded-xl w-[25rem] h-[20rem] bg-gradient-to-r p-[4px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
          <div className='flex flex-col h-full w-full justify-center bg-slate-800 text-white rounded-lg'>
            <span className='flex flex-col items-center w-full h-fit '>
              <Image
                className='cursor-pointer animate-spin'
                height={155}
                width={155}
                src={Logo}
                alt='Image of Logo'
              />
              <h1 className='text-3xl font-satoshiBlack pt-6'>LS PLANNER</h1>
            </span>
          </div>
        </div>
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
