import MobileErrorJson from "@assets/4386-connection-error.json";
import LottieLoadJson from "@assets/90918-charging-electricity.json";
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
  const [isLoading, setisLoading] = useState<{ timeOut: boolean; font: boolean }>({
    timeOut: true,
    font: true,
  });
  const [mobile, setMobile] = useState<boolean>(false);
  const ref = useRef() as any;

  useEffect(() => {
    (async () => {
      try {
        await document.fonts.ready;
        setisLoading((prev) => ({ ...prev, font: false }));
      } catch (error) {
        console.log(error);
        console.log(`DEV-FONT LOAD ERROR`);
      }
    })();
  }, []);

  useEffect(() => {
    const mytimeout = setTimeout(() => {
      setisLoading((prev) => ({ ...prev, timeOut: false }));
    }, 2000);
    return () => clearTimeout(mytimeout);
  }, []);

  useEffect(() => {
    if ((ref.current && !isLoading.timeOut) || !isLoading.font) {
      gradient.initGradient("#gradient-canvas");
    }
  }, [ref, isLoading.timeOut, isLoading.font]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setMobile(true);
    }
  }, []);

  if (isLoading.font || isLoading.timeOut) {
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

  if (mobile) {
    return (
      <div ref={ref} className='w-full h-[90vh]'>
        <canvas
          className='w-full h-[100%] absolute'
          id='gradient-canvas'
          data-transition-in
        />
        <div className='w-full h-full flex flex-col items-center justify-center space-y-2'>
          <Lottie
            loop
            animationData={MobileErrorJson}
            play
            style={{ width: 300, height: 300 }}
          />

          <h1 className='font-satoshiBlack text-white text-4xl animate-pulse tracking-wide text-center gap-y-4 flex flex-col'>
            LS PLANNER IS UNAVAILIBLE ON MOBILE. <br />
            <span>LS PLANNER APP COMING SOON</span>
          </h1>
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
