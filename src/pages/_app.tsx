import type { AppType } from "next/dist/shared/lib/utils";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <ToastContainer position='bottom-right' />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
