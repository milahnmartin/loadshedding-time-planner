import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Head from "next/head";
import Router from "next/router";
import { FcGoogle } from "react-icons/fc";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { auth } from "../../utils/firebase-config";

function login() {
  const googleProvider = new GoogleAuthProvider();
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      Router.push("/");
    } catch {
      console.log("Error");
    }
  };
  return (
    <div className='h-screen w-screen overflow-scroll bg-gradient-to-bl from-indigo-500 via-purple-500 to-pink-500'>
      <Head>
        <title>LS Game Planner | Login</title>
        <meta name='description' content='Login to LS Game Planner' />
        <link rel='icon' href='/Light-bulb.png' />
      </Head>
      <Navbar />
      <div className='h-full w-full flex items-center justify-center'>
        <button
          onClick={handleGoogleLogin}
          className='shadow-xl shadow-black bg-white px-3 py-1 text-black font-bold flex items-center justify-center w-fit  rounded-md outline-none border-none hover:bg-gray-500 hover:text-white'
        >
          <FcGoogle className='mr-2 h-5 w-5' /> GOOGLE
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default login;
