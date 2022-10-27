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
import GreenLabel from "./GreenLabel";
const spanStyles = classNames(
  "text-white text-center font-Inter font-black text-xl"
);

const ViewDateTimes = ({ info }: any) => {
  return (
    <>
      <h1 className='text-white font-Inter text-xl font-black text-center h-fit'>
        Saved LS Times:
      </h1>
      <div className='flex w-full justify-center gap-2 flex-wrap content-center'>
        {info.map((time: string) => {
          return (
            <GreenLabel key={uuidv4()} data={time} cb={() => console.log("PENIS")} />
          );
        })}
      </div>
    </>
  );
};

const LoadsheddingProfile = () => {
  const [user, loading] = useAuthState(auth);
  const [savedLsTimes, setsavedLsTimes] = useState<Array<string>>([]);
  const [savedLsDates, setSavedLsDates] = useState<Array<string>>([]);
  const [debounceSave, setDebounceSave] = useState<boolean>(false);
  const [dateTimes, setDateTimes] = useState<Array<string>>([]);
  const [selectDateIndex, setSelectStateIndex] = useState<number>(0);
  const LSStartTimeRef = useRef<HTMLInputElement>(null);
  const LSEndTimeRef = useRef<HTMLInputElement>(null);
  const newDateRef = useRef<HTMLInputElement>(null);

  const handleRemoveLsTime = (cbTime: string) => {
    const newLsTimes = savedLsTimes.filter((time) => time !== cbTime);
    setsavedLsTimes(newLsTimes);
  };

  const handleRemoveDates = (cbDate: string) => {
    const newLsDates = savedLsDates.filter((date) => date !== cbDate);
    setSavedLsDates(newLsDates);
  };
  const handleAddTime = () => {
    if (
      !LSStartTimeRef.current?.value ||
      !LSEndTimeRef.current?.value ||
      !newDateRef.current?.value
    ) {
      toast.warning("Please Enter A Valid Time and Date");
      return;
    }
    setsavedLsTimes((prev) => [
      ...prev,
      [LSStartTimeRef.current!.value, LSEndTimeRef.current!.value].join("-"),
    ]);
  };
  const fetchSavedLsTimes = async () => {
    if (!user) {
      toast.warning("Log In to Add Times");
      return;
    }
    const { data, error } = await supabase
      .from("user_info")
      .select(
        `user_scheduled_Data->dates,
        user_scheduled_Data->times`
      )
      .eq("user_id", user?.uid);

    if (error) {
      toast.error("Something Happened Sorry...");
      return;
    }

    if (data[0]) {
      const { dates, times }: any = data[0];
      setSavedLsDates(dates);
      setDateTimes(times);
    }
  };
  useEffect(() => {
    if (!user) {
      Router.push("/login");
      toast.error("Please login to view your profile");
      return;
    }
    fetchSavedLsTimes();
  }, [selectDateIndex]);

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
    const exclusiveTimes = dateTimes.filter(
      (time, index) => index !== selectDateIndex
    );
    const exclusiveDates = savedLsDates.filter(
      (date) => date !== newDateRef.current?.value
    );

    const { data, error } = await supabase
      .from("user_info")
      .update({
        user_scheduled_Data: {
          dates: [...exclusiveDates, newDateRef.current?.value],
          times: [...exclusiveTimes, savedLsTimes],
        },
      })
      .eq("user_id", user?.uid);

    setDebounceSave(true);
    setTimeout(() => {
      setDebounceSave(false);
    }, 10000);
  };

  const handleShowDateInfo = (cb: string) => {
    const index = savedLsDates.findIndex((date) => date === cb);
    setSelectStateIndex(index);
  };

  const handleEditDate = (date: string) => {
    const dateIndex: number = savedLsDates.findIndex((d) => d === date);
    const filteredTimes: any = dateTimes[dateIndex];
    const filteredDate: any = savedLsDates[dateIndex];
    setsavedLsTimes(filteredTimes);
    newDateRef.current!.value = filteredDate;
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
          <div className='flex items-center flex-col justify-start h-3/4 w-full space-y-4'>
            <label className='flex flex-col w-full px-2 py-2'>
              <span className={spanStyles}>Set LS Date:</span>
              <input
                ref={newDateRef}
                type='date'
                className='px-4 py-2 w-full rounded-md outline-none border-none ring-none text-cblue font-Inter font-black focus:ring-2 focus:ring-red-500 text-center'
              />
            </label>
            <label className='flex flex-col w-full px-2 py-2'>
              <span className={spanStyles}>Set LS Start Time:</span>
              <input
                ref={LSStartTimeRef}
                className='px-4 py-2 w-full rounded-md outline-none border-none ring-none text-cblue font-Inter font-black focus:ring-2 focus:ring-red-500 text-center'
                type='time'
              />
            </label>
            <label className='flex flex-col w-full px-2 py-2'>
              <span className={spanStyles}>Set LS End Time:</span>
              <input
                ref={LSEndTimeRef}
                className='px-4 py-2 w-full rounded-md outline-none border-none ring-none text-cblue font-Inter font-black focus:ring-2 focus:ring-red-500 text-center'
                type='time'
              />
            </label>
          </div>
          <div className='flex flex-col justify-end items-center h-1/4 w-full space-y-2 p-2'>
            <button
              onClick={handleAddTime}
              className='text-black py-2 px-4 bg-white rounded-lg font-Inter font-black transition-all duration-200 hover:bg-cblue hover:text-white'
            >
              ADD TIME
            </button>
            <button
              onClick={handleSaveData}
              className='text-black py-2 px-4 bg-white rounded-lg font-Inter font-black transition-all duration-200 hover:bg-cpurple hover:text-white'
            >
              UPDATE SETTINGS
            </button>
          </div>
        </div>
        <div className='border-2 w-3/4 flex flex-col h-full'>
          <div className='flex text-center flex-col justify-start items-center h-1/2 p-2 flex-wrap content-center space-y-2'>
            <h1 className='text-white text-2xl font-Inter font-black'>LS TIMES:</h1>
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
                <SavedDatesLabel
                  date={date}
                  cb={handleShowDateInfo}
                  delTime={handleRemoveDates}
                  editCb={handleEditDate}
                />
              ))}
            </div>
            <div className='flex w-1/2 flex-col p-2 space-y-2 border-2 justify-start border-pink-600'>
              {dateTimes.length > 0 ? (
                <ViewDateTimes info={dateTimes[selectDateIndex]} />
              ) : (
                <h1 className='text-white text-4xl font-Inter font-black mb-5'>
                  Select A Schedule
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadsheddingProfile;
