import LottieLoadJson from "@assets/97171-loading-plane.json";
import { Gradient } from "@helpers/Gradient.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppType } from "next/dist/shared/lib/utils";
import { useEffect, useRef, useState } from "react";
import Lottie from "react-lottie-player";
import { ToastContainer } from "react-toastify";
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
    }, 2000);
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
          <Lottie
            loop
            animationData={LottieLoadJson}
            play
            style={{ width: 200, height: 200 }}
          />

          <h1 className='font-satoshiBold text-white text-5xl animate-pulse tracking-wider pt-8'>
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
