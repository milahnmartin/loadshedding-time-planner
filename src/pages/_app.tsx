import Logo from "@assets/Logov3.png";
import { Gradient } from "@helpers/Gradient.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppType } from "next/dist/shared/lib/utils";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import "../styles/satoshi.css";
const gradient = new Gradient() as any;
const MyApp: AppType = ({ Component, pageProps }) => {
  const [isLoading, setisLoading] = useState<boolean>(true);
  const queryClient = new QueryClient();

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
        <Image
          className='cursor-pointer animate-spin'
          height={155}
          width={155}
          src={Logo}
          alt='Image of Logo'
        />
        <h1 className='font-satoshiBold text-white tracking-widest text-5xl animate-pulse'>
          LS PLANNER
        </h1>
      </div>
    );
  }

  return (
    <div ref={ref} className='w-full h-[90vh]'>
      <canvas
        className='w-full h-[100%] absolute'
        id='gradient-canvas'
        data-transition-in
      />
      <QueryClientProvider client={queryClient}>
        <ToastContainer position='bottom-right' />
        <Component ref={ref} {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
};

export default MyApp;
