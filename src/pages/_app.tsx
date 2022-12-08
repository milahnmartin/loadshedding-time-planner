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

  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      console.log(ref);
      gradient.initGradient("#gradient-canvas");
    }
  }, [ref]);

  return (
    <canvas className='w-full h-[90%]' id='gradient-canvas' data-transition-in>
      <div ref={ref} className='ref'>
        <QueryClientProvider client={queryClient}>
          <ToastContainer position='bottom-right' />
          <Component ref={ref} {...pageProps} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </div>
    </canvas>
  );
};

export default MyApp;
