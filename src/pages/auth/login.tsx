import Logo from '@assets/Logov3.png';
import Footer from '@comps/ui/Footer';
import Navbar from '@comps/ui/Navbar';
import { Player } from '@lottiefiles/react-lottie-player';
import { auth } from '@utils/firebase-config';
import classNames from 'classnames';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Head from 'next/head';
import Image from 'next/image';
import Router from 'next/router';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
function login() {
  const gline = classNames(
    ' mx-auto w-[80%] h-[0.3rem] my-4 bg-gradient-to-r from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] rounded border-0 '
  );

  const handleGoogleLogin = async () => {
    const googleProvider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, googleProvider);
      Router.push('/');
    } catch {
      toast.error('Login failed');
    }
  };

  return (
    <div className="h-screen w-screen overflow-scroll">
      <Head>
        <title>LS Planner | Login</title>
        <meta name="description" content="Login to LS Game Planner" />
      </Head>
      <Navbar />
      <div className="h-[80%] flex mt-[3.5rem]">
        <div className="w-2/5 justify-end px-5 hidden md:flex">
          <div className="w-full h-full flex items-center justify-center">
            <Player
              src="https://assets10.lottiefiles.com/packages/lf20_xaxnRHNB4U.json"
              // className='player w-[400px] h-[400px] '
              style={{ height: '100%', width: '100%' }}
              autoplay
              loop
              speed={0.6}
            />
          </div>
          <div className="h-full items-center justify-center ">
            <div className="h-[45%] w-full flex justify-center">
              <span className="h-full w-[1px] bg-gradient-to-t from-caqua via-cblue to-cpurple"></span>
            </div>
            <div className="h-[10%] w-full flex items-center justify-center">
              <Image
                className="w-fit"
                width={60}
                height={60}
                src={Logo}
                alt="Image of Logo"
              />
            </div>
            <div className="h-[45%] w-full flex justify-center">
              <span className="h-full w-[1px] bg-gradient-to-b from-caqua via-cblue to-cpurple"></span>
            </div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center flex-col md:3/4">
          {/* <div className=' h-fit pb-2 flex items-center justify-center text-center'>
            <h1 className=' text-center font-extrabold text-4xl animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple pb-4 md:text-6xl'>
              TIME TO LOG IN
            </h1>
          </div> */}
          <div className="h-2/4 flex items-center justify-center">
            <div className="rounded-xl w-[20rem] h-[20rem] mx-auto bg-gradient-to-r p-[6px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]">
              <div className="h-full bg-slate-800 text-white rounded-lg p-4">
                <div className="h-full w-full flex flex-col items-center justify-evenly">
                  <button
                    onClick={handleGoogleLogin}
                    className="bg-white px-3 py-1 text-black font-satoshiBold flex items-center justify-evenly w-32 h-10 rounded-md outline-none border-none transition-all duration-200 hover:bg-white/75">
                    <FcGoogle size={20} /> Google
                  </button>
                </div>
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
