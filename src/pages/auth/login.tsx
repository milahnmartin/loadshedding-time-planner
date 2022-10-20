import {
  GoogleAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
} from "firebase/auth";
import Head from "next/head";
import Router from "next/router";
import { FcGoogle } from "react-icons/fc";
import { SiTwitter } from "react-icons/si";
import { toast } from "react-toastify";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { auth } from "../../utils/firebase-config";

function login() {
  const googleProvider = new GoogleAuthProvider();
  const twitterProvider = new TwitterAuthProvider();
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      Router.push("/");
    } catch {
      toast.error("Login failed");
    }
  };

  const handleTwitterLogin = async () => {
    try {
      const result = await signInWithPopup(auth, twitterProvider);
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
      </Head>
      <Navbar />

      <div className='h-full w-full flex items-center justify-start flex-col space-y-11 p-6'>
        <h1 className='font-extrabold text-4xl animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-primary to-amber-300 py-4 md:text-8xl'>
          Time to Log In !
        </h1>
        <div className='w-fit h-fit p-24 rounded-xl shadow-lg backdrop-blur-2xl bg-white/10'>
          <div className='h-auto w-full flex flex-col items-center justify-center space-y-8'>
            <button
              onClick={handleGoogleLogin}
              className='bg-white px-3 py-1 text-black font-bold flex items-center justify-center w-32 rounded-md outline-none border-none transition-all duration-200 hover:bg-white/25'
            >
              <FcGoogle className='mr-2 h-5 w-5' /> GOOGLE
            </button>
            <button
              onClick={handleTwitterLogin}
              className='bg-white px-3 py-1 text-black font-bold flex items-center justify-center w-32 rounded-md outline-none border-none transition-all duration-200 hover:bg-white/25'
            >
              <SiTwitter className='mr-2 h-5 w-5' /> Twitter
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default login;
