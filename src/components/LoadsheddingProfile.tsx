import RedLabel from "@comps/RedLabel";
import { uuidv4 } from "@firebase/util";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { auth } from "../utils/firebase-config";
import supabase from "../utils/supabase-config";
const LoadsheddingProfile = () => {
  const [user, loading] = useAuthState(auth);
  const [savedLsTimes, setsavedLsTimes] = useState<Array<string>>([]);
  const [savedLsDate, setSavedLsDate] = useState<string>("");
  const [debounceSave, setDebounceSave] = useState<boolean>(false);

  const handleRemoveLsTime = (cbTime: string) => {
    const newLsTimes = savedLsTimes.filter((time) => time !== cbTime);
    setsavedLsTimes(newLsTimes);
  };
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
      setSavedLsDate(data[0].saved_lsData?.lsDate);
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
    const { data, error } = await supabase
      .from("user_info")
      .update({ saved_lsData: { lsTimes: savedLsTimes, lsDate: savedLsDate } })
      .eq("user_id", user?.uid)
      .select(`saved_lsData`);
    if (!error) {
      toast.success("data updated");
    }
    setDebounceSave(true);
    setTimeout(() => {
      setDebounceSave(false);
    }, 10000);
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
          <div className='flex items-center flex-col justify-center h-3/4 w-full'>
            <input
              value={savedLsDate}
              onChange={(e) => setSavedLsDate(e.target?.value)}
              type='date'
            />
            <input type='time' />
          </div>
          <div className='flex justify-center items-center h-1/4 w-full'>
            <button
              onClick={handleSaveData}
              className='text-black py-2 px-4 bg-white rounded-lg font-Inter font-black transition-all duration-200 hover:bg-white/30'
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
          <div className='flex h-1/2'></div>
        </div>
      </div>
    </div>
  );
};

export default LoadsheddingProfile;
