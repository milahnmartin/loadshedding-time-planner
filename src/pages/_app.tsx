import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { AppType } from "next/dist/shared/lib/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  const queryClient = new QueryClient();
  return (
    <div className='bg-slate-800'>
      <QueryClientProvider client={queryClient}>
        <ToastContainer position='bottom-right' />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
};

export default MyApp;
