import AreaLabelV2 from "@comps/labels/AreaLabelV2";
import useFetchArea from "@hooks/useFetchArea";
import useFetchSavedArea from "@hooks/useFetchSavedArea";
import { Player } from "@lottiefiles/react-lottie-player";
import { IAreaData } from "@lstypes/types";
import { auth } from "@utils/firebase-config";
import supabase from "@utils/supabase-config";
import classNames from "classnames";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiOutlineSearch } from "react-icons/ai";
import { BiMap } from "react-icons/bi";
import { HiOutlineKey, HiOutlineMap } from "react-icons/hi";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
const gline = classNames(
  " w-[100%] h-[0.25rem] bg-gradient-to-r from-[#9333EA] via-[#3B82F6] to-[#6EE7B7] rounded border-0 "
);

const inputStyles = classNames(
  "bg-transparent border-none w-full pt-4 pb-1 text-gray-400 text-center font-satoshi focus:outline-none tracking-wide focus:text-white "
);
const LoadsheddingProfile = () => {
  const [user, loading] = useAuthState(auth);
  const [areaInput, setareaInput] = useState<string>("");

  const setUpdateWeekTimes = async (pAreaID: string) => {
    const areaWeekLSTimes = await fetch(`/api/sepush/${pAreaID}`).then((resp) =>
      resp.json()
    );
    if (!areaWeekLSTimes) {
      toast.error("Error Occured When Trying To Update LS Times");
      return;
    }

    const { data, error } = await supabase
      .from("user_info")
      .update({ user_weekLSTimes: areaWeekLSTimes?.lsdata })
      .eq("user_id", user?.uid)
      .select();

    if (error) {
      console.log(error);
      toast.error("Error Occured When Trying To Update LS Times");
      return;
    }
    console.log("DEV LOG: NEW LS TIMES", data);
  };

  const handleSetArea = async (newArea: IAreaData) => {
    if (!newArea) {
      toast.error("We were unable to set your area");
      return;
    }

    if (SavedAreaData?.id === newArea?.id) {
      toast.warning("You are already using this area");
      return;
    }
    const { error } = await supabase
      .from("user_info")
      .update({ user_sepushID: newArea })
      .eq("user_id", user?.uid);

    if (error) {
      console.log(error);
      toast.error("We were unable to set your area");
      return;
    }
    await setAreaRefetch();
    setUpdateWeekTimes(newArea?.id!);
  };

  const {
    data: AreaData,
    isFetching: AreaDataLoading,
  }: { data: any; isFetching: boolean } = useFetchArea(areaInput.trim());

  const {
    data: SavedAreaData,
    isFetching: FetchingSavedAreaData,
    refetch: setAreaRefetch,
  } = useFetchSavedArea();

  return (
    <div className='flex w-full h-full overflow-y-scroll p-2'>
      <div className='w-2/6 h-full flex items-center justify-center'>
        <div className='rounded-xl w-full h-full mx-auto bg-gradient-to-r p-[5px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
          <div className='flex flex-col items-center h-full bg-slate-800 text-white rounded-lg p-4'>
            <h1 className='w-full text-center font-satoshiBold tracking-tight pb-8 text-2xl '>
              CURRENT SET AREA:
            </h1>
            <Player
              src='https://assets4.lottiefiles.com/packages/lf20_sj0skmmg.json'
              // className='player w-[200px] h-[200px] '
              style={{ width: "50%" }}
              autoplay
              loop
              speed={0.5}
            />
            {FetchingSavedAreaData ? (
              <div className='w-full h-full flex items-center justify-center'>
                <Player
                  src='https://assets2.lottiefiles.com/private_files/lf30_3vhjjbex.json'
                  // className='player w-[30%] h-[30%] '
                  style={{ height: "30%", width: "30%" }}
                  autoplay
                  loop
                  speed={0.5}
                />
              </div>
            ) : SavedAreaData ? (
              <div className='w-full h-full flex items-center flex-col space-y-6 justify-center text-center tracking-wide'>
                <div>
                  <span className='flex items-center justify-center space-x-1'>
                    <HiOutlineKey className='text-2xl align-center justify-center text-yellow-600' />
                    <h1 className='text-blue-500 text-xl font-satoshiBlack tracking-wide'>
                      AREA ID:
                    </h1>
                  </span>
                  <h1 className='text-blue-200 text-xl font-satoshiBold tracking-wide'>
                    {SavedAreaData.id}
                  </h1>
                </div>
                <div>
                  <span className='flex items-center justify-center space-x-1'>
                    <BiMap className='text-2xl align-center justify-center text-red-500' />
                    <h1 className='text-blue-500 text-xl font-satoshiBlack tracking-wide'>
                      AREA REGION:
                    </h1>
                  </span>
                  <h1 className='text-blue-200 text-xl font-satoshiBold'>
                    {SavedAreaData.region}
                  </h1>
                </div>
                <div>
                  <span className='flex items-center justify-center space-x-1'>
                    <HiOutlineMap className='text-2xl align-center justify-center text-transparent text-green-300' />
                    <h1 className='text-blue-500 text-xl font-satoshiBlack tracking-wide'>
                      AREA NAME:
                    </h1>
                  </span>
                  <h1 className='text-blue-200 text-xl font-satoshiBold'>
                    {SavedAreaData.name}
                  </h1>
                </div>
              </div>
            ) : (
              <div className='w-full h-full flex items-center flex-col space-y-11 justify-center text-center font-Inter font-black tracking-wide'>
                <span className='flex flex-col items-center w-full h-fit pt-2 pb-4'>
                  <Player
                    src='https://assets3.lottiefiles.com/private_files/lf30_17bvu2tk.json'
                    className='player w-[110px] h-[110px] '
                    autoplay
                    loop
                    speed={0.5}
                  />
                  <h1 className='text-2xl font-satoshiBlack pb-4'>NO SAVED AREA</h1>
                  <button
                    onClick={() => document.getElementById("areaSearch")?.focus()}
                    className='relative inline-flex items-center justify-center p-0.5  w-[10rem] h-[3rem] overflow-hidden text-sm font-medium text-gray-900 rounded-[1.15rem] group bg-gradient-to-br from-c2aqua via-c2blue to-c2purple group-hover:from-c2aqua group-hover:via-c2blue group-hover:to-c2purple hover:text-white dark:text-white '
                  >
                    <span className='relative px-5 py-2.5 transition-all ease-in duration-200  w-[9.5rem] h-[2.5rem] bg-white dark:bg-slate-800 rounded-[1rem] group-hover:bg-opacity-0 font-bold'>
                      SET AREA
                    </span>
                  </button>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='w-3/4 h-full flex flex-col items-center justify-center space-y-2 px-2'>
        <span className='w-full px-1 py-1  relative'>
          <span className='absolute flex items-center h-full w-fit px-2 -top-[0px]'>
            <AiOutlineSearch size={25} fill='white' />
          </span>
          <input
            id='areaSearch'
            className={inputStyles}
            type='text'
            name='loadshedding-area'
            placeholder='Search Your Area: Waterkloof, Durbanville etc...'
            value={areaInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setareaInput(e.currentTarget.value)
            }
          />
          <hr className={gline} />
        </span>

        <div className='overflow-y-scroll w-full h-full flex flex-wrap justify-center content-start items-start gap-2'>
          {AreaDataLoading && (
            <div className='w-full h-full flex items-center justify-center'>
              <Player
                src='https://assets2.lottiefiles.com/private_files/lf30_3vhjjbex.json'
                // className='player w-[30%] h-[30%] '
                style={{ height: "30%", width: "30%" }}
                autoplay
                loop
                speed={0.5}
              />
            </div>
          )}
          {AreaData &&
            AreaData?.map((area: IAreaData) => {
              return (
                <AreaLabelV2
                  key={uuidv4()}
                  id={area.id!}
                  name={area.name!}
                  region={area.region!}
                  cbSetArea={handleSetArea}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default LoadsheddingProfile;
