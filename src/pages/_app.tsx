import { Gradient } from "@helpers/Gradient.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppType } from "next/dist/shared/lib/utils";
import { useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import "../styles/satoshi.css";
const gradient = new Gradient() as any;
const MyApp: AppType = ({ Component, pageProps }) => {
  const queryClient = new QueryClient();

  const ref = useRef() as any;
  useEffect(() => {
    if (ref.current) {
      console.log(ref);
      gradient.initGradient("#gradient-canvas");
    }
  }, [ref]);

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
