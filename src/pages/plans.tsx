import Footer from "@comps/Footer";
import Navbar from "@comps/Navbar";
import PlansLabel from "@comps/PlansLabel";
import { uuidv4 } from "@firebase/util";
import { NextPage } from "next";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import { ThreeDots } from "react-loading-icons";
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
    <div className='h-screen w-screen overflow-scroll bg-black'>
      <Head>
        <title>LS Time Planner / Plans</title>
      </Head>
      <Navbar />
      <div className='w-full h-[90%] p-2 grid grid-cols-2 grid-rows-1'>
        <div className='flex justify-start flex-col'>
          <div className='pt-5 flex text-2xl text-white font-bold h-fit align-center justify-center content-center'>
            MY PLANS
          </div>
          <div className='flex h-[90%] overflow-y-scroll flex-wrap content-center items-center justify-center space-x-2'>
            {/* HERE COMES PLANS */}
            {isFetching ? (
              <ThreeDots fill='#3c79f0' />
            ) : (
              savedPlans?.map((plan: any) => {
                return <PlansLabel plan={plan} key={uuidv4()} />;
              })
            )}
          </div>
        </div>
        <div className='flex justify-start flex-col'>
          <div className='pt-5 flex text-2xl text-white font-bold h-fit aling-center justify-center content-center'>
            INVITED PLANS
          </div>
          <div className='flex h-[90%] overflow-y-scroll flex-wrap content-center items-center justify-center text-center'>
            {isFetching ? (
              <ThreeDots fill='#3c79f0' />
            ) : (
              savedPlans?.map((plan: any) => {
                return <PlansLabel plan={plan} key={uuidv4()} />;
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
