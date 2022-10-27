import RedLabel from "@comps/RedLabel";
import SavedDatesLabel from "@comps/SavedDatesLabel";
import { uuidv4 } from "@firebase/util";
import classNames from "classnames";
import Router from "next/router";
import { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { auth } from "../utils/firebase-config";
import supabase from "../utils/supabase-config";

const spanStyles = classNames(
  "text-white text-center font-Inter font-black text-xl"
);

const ViewDateTimes = ({ info }: any) => {
  return <h1 className='text-white text-xl'>{info}</h1>;
};

const LoadsheddingProfile = () => {
  const [user, loading] = useAuthState(auth);
  const [savedLsTimes, setsavedLsTimes] = useState<Array<string>>([]);
  const [savedLsDates, setSavedLsDates] = useState<Array<string>>([
    "2022-02-23",
    "2023-05-17",
  ]);
  const [debounceSave, setDebounceSave] = useState<boolean>(false);
  const [dateInfo, setdateInfo] = useState<string>("PENIS");
  const newTimeRef = useRef<HTMLInputElement>(null);
  const newDateRef = useRef<HTMLInputElement>(null);
  const handleRemoveLsTime = (cbTime: string) => {
    const newLsTimes = savedLsTimes.filter((time) => time !== cbTime);
    setsavedLsTimes(newLsTimes);
  };
  const handleRemoveDates = (cbDate: string) => {};
  const fetchSavedLsTimes = async () => {
    const { data, error } = await supabase
      .from("user_info")
      .select(`saved_lsData`)
      .eq("user_id", user?.uid);
    if (error) {
      toast.error("something went wrong");
      return;
    }
    console.log(data);
    if (data[0]?.saved_lsData) {
      setsavedLsTimes(data[0].saved_lsData?.lsTimes);
    }
  };
  useEffect(() => {
    if (!user) {
      Router.push("/login");
      toast.error("Please login to view your profile");
      return;
    }
    fetchSavedLsTimes();
  }, []);

  const handleSaveData = async () => {
    if (!user) {
      toast.error("Please login to save your data");
      Router.push("/login");
      return;
    }
    if (debounceSave) {
      toast.warning("You saved your times recently, please wait");
      return;
    }
    //  insert update query here

    setDebounceSave(true);
    setTimeout(() => {
      setDebounceSave(false);
    }, 10000);
  };

  const handleShowDateInfo = (cb: string) => {
    setdateInfo(cb);
  };
  return (
    <div className='p-5 w-full h-full flex items-center flex-col'>
      <div className='w-full flex flex-col items-center justify-start'>
        <h1 className='font-extrabold mb-5 text-4xl animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple pt-4 md:text-6xl'>
          LOADSHEDDING SETTINGS
        </h1>
        <hr className='my-0 mx-auto w-[60%] h-[0.3rem] bg-gradient-to-r from-caqua via-cblue to-cpurple rounded border-0 md:my-2' />
      </div>
      <div className='flex h-full w-full border-2 border-pink-400'>
        <div className='flex flex-col border-2 w-1/4'>
          <div className='flex items-center flex-col justify-center h-3/4 w-full space-y-4'>
            <label className='flex flex-col w-full px-2 py-2'>
              <span className={spanStyles}>Set LS Date:</span>
              <input
                ref={newDateRef}
                type='date'
                className='px-4 py-2 w-full rounded-md outline-none border-none ring-none text-cblue font-Inter font-black focus:ring-2 focus:ring-red-500 text-center'
              />
            </label>
            <label className='flex flex-col w-full px-2 py-2'>
              <span className={spanStyles}>Set LS Time:</span>
              <input
                ref={newTimeRef}
                className='px-4 py-2 w-full rounded-md outline-none border-none ring-none text-cblue font-Inter font-black focus:ring-2 focus:ring-red-500 text-center'
                type='time'
              />
            </label>
          </div>
          <div className='flex justify-center items-center h-1/4 w-full'>
            <button
              onClick={handleSaveData}
              className='text-black py-2 px-4 bg-white rounded-lg font-Inter font-black transition-all duration-200 hover:bg-cpurple hover:text-white'
            >
              UPDATE SETTINGS
            </button>
          </div>
        </div>
        <div className='border-2 w-3/4 flex flex-col h-full'>
          <div className='flex text-center flex-col justify-start items-center h-1/2 p-2'>
            <h1 className='text-white text-4xl font-Inter font-black mb-5'>
              Saved Loadshedding Times
            </h1>
            <div className='flex space-x-2'>
              {savedLsTimes.map((time) => {
                return (
                  <RedLabel key={uuidv4()} data={time} cb={handleRemoveLsTime} />
                );
              })}
            </div>
          </div>
          <div className='flex h-1/2 border-2'>
            <div className='flex w-1/2 flex-col items-center justify-start p-2 overflow-y-scroll overflow-x-hidden'>
              {savedLsDates.map((date) => (
                <SavedDatesLabel date={date} cb={handleShowDateInfo} />
              ))}
            </div>
            <div className='flex w-1/2 p-2 border-2 border-pink-600'>
              {<ViewDateTimes info={dateInfo} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadsheddingProfile;
