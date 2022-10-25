import {
  GoogleAuthProvider,
  signInWithPopup,
  TwitterAuthProvider,
} from "firebase/auth";
import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import { FcGoogle } from "react-icons/fc";
import { SiTwitter } from "react-icons/si";
import { toast } from "react-toastify";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { auth } from "../../utils/firebase-config";
import Logo from "../assets/Logov3.png";
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
    <div className='h-screen w-screen overflow-scroll bg-black'>
      <Head>
        <title>LS Game Planner | Login</title>
        <meta name='description' content='Login to LS Game Planner' />
      </Head>
      <Navbar />

      <div className='h-[80%] flex mt-5'>
        <div className='w-1/3 flex justify-end px-5'>
          <div className='h-full flex-col items-center justify-center '>
            <div className='h-[45%]  w-full flex justify-center'>
              <span className='h-full w-[3px] bg-white'></span>
            </div>
            <div className='h-[10%] w-full flex items-center justify-center'>
              <Image
                className='w-fit'
                width={60}
                height={60}
                src={Logo}
                alt='Image of Logo'
              />
            </div>
            <div className='h-[45%] w-full flex justify-center'>
              <span className='h-full w-[3px] bg-white'></span>
            </div>
          </div>
        </div>
        <div className='w-2/3 flex items-center justify-center flex-col border-2'>
          <div className=' h-2/4 p-2 flex items-center justify-center text-center'>
            <h1 className=' text-center font-extrabold text-4xl animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple py-4 md:text-6xl'>
              TIME TO LOG IN!
            </h1>
          </div>
          <div className='h-2/4 flex items-center justify-center'>
            <div className='w-fit h-fit p-24 rounded-xl shadow-lg backdrop-blur-2xl bg-white/10'>
              <div className='h-auto w-full flex flex-col items-center justify-center space-y-8'>
                <button
                  onClick={handleGoogleLogin}
                  className='bg-white px-3 py-1 text-black font-bold flex items-center justify-center w-32 rounded-md outline-none border-none transition-all duration-200 hover:bg-white/25'
                >
                  <FcGoogle className='h-8 w-8' /> GOOGLE
                </button>
                <button
                  onClick={handleTwitterLogin}
                  className='bg-white px-3 py-1 text-black font-bold flex items-center justify-center w-32 rounded-md outline-none border-none transition-all duration-200 hover:bg-white/25'
                >
                  <SiTwitter className='h-8 w-8' /> Twitter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default login;
