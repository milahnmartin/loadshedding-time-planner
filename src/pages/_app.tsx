import type { AppType } from "next/dist/shared/lib/utils";
import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className='h-screen w-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
