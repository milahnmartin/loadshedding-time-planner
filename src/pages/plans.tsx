import Footer from "@comps/Footer";
import Navbar from "@comps/Navbar";
import PlansLabel from "@comps/PlansLabel";
import PlansLabelInvite from "@comps/PlansLabelInvite";
import { uuidv4 } from "@firebase/util";
import { Player } from "@lottiefiles/react-lottie-player";
import { NextPage } from "next";
import { BiRightArrowAlt } from "react-icons/bi";
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
    isFetching,
  } = useFetchSavedPlans();

  return (
    <div className='h-screen w-screen overflow-scroll'>
      <Head>
        <title>LS Planner / Plans</title>
      </Head>
      <Navbar />
      <div className='w-full h-[90%] p-2 grid grid-cols-2 grid-rows-1'>
        <div className='flex justify-start flex-col'>
          <div className='pt-5 flex text-3xl text-white font-bold h-fit align-center justify-center content-center'>
            MY PLANS
          </div>

          <div className='flex h-[90%] overflow-y-scroll flex-wrap content-center items-center justify-center gap-3'>
            {/* HERE COMES PLANS */}
            {isFetching ? (
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
        <div className='flex justify-start flex-col'>
          <div className='pt-5 flex text-3xl text-white font-bold h-fit aling-center justify-center content-center'>
            INVITED PLANS
          </div>
          <div className='flex h-[90%] overflow-y-scroll flex-wrap content-center items-center justify-center gap-3'>
            {isFetching ? (
              <Player
                src='https://assets2.lottiefiles.com/private_files/lf30_3vhjjbex.json'
                className='player w-[30%] h-[30%] '
                autoplay
                loop
                speed={0.5}
              />
            ) : (
              savedPlans?.map((plan: any) => {
                return <PlansLabelInvite plan={plan} key={uuidv4()} />;
              })
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default plans;
