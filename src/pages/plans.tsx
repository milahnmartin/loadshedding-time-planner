import Footer from "@comps/Footer";
import Navbar from "@comps/Navbar";
import PlansLabel from "@comps/PlansLabel";
import { uuidv4 } from "@firebase/util";
import { Player } from "@lottiefiles/react-lottie-player";
import { NextPage } from "next";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import useFetchSavedPlans from "../hooks/useFetchSavedPlans";
import { auth } from "../utils/firebase-config";
const plans: NextPage = () => {
  const [user, loading] = useAuthState(auth);
  const {
    data: savedPlans,
    isLoading: savedPlansLoading,
    isError,
    isFetching: savedPlansIsFetching,
  } = useFetchSavedPlans();

  return (
    <div className='h-screen w-screen overflow-y-scroll overflow-x-hidden'>
      <Head>
        <title>LS Planner / Plans</title>
      </Head>
      <Navbar />
      <div className='flex flex-col h-[90%] w-full p-4'>
        <h1 className='text-white text-center text-5xl font-black tracking-wide'>
          ACCESSED PLANS
        </h1>
        <div className='flex h-full w-full flex-wrap content-center items-center justify-center overflow-sroll'>
          {savedPlansIsFetching ? (
            <Player
              src='https://assets2.lottiefiles.com/private_files/lf30_3vhjjbex.json'
              className='player w-[30%] h-[30%] '
              autoplay
              loop
              speed={0.5}
            />
          ) : (
            savedPlans?.map((plan: any) => {
              return <PlansLabel plan={plan} key={uuidv4()} />;
            })
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default plans;
