import { Player } from "@lottiefiles/react-lottie-player";
import { IAreaData } from "@lstypes/types";
import classNames from "classnames";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ThreeDots } from "react-loading-icons";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import useFetchArea from "../hooks/useFetchArea";
import useFetchSavedArea from "../hooks/useFetchSavedArea";
import { auth } from "../utils/firebase-config";
import supabase from "../utils/supabase-config";
import AreaLabels from "./AreaLabels";
const spanStyles = classNames(
  "text-white text-center font-Inter font-black text-xl"
);

const LoadsheddingProfile = () => {
  const [user, loading] = useAuthState(auth);
  const [areaInput, setareaInput] = useState<string>("");

  const handleSetArea = async (newArea: IAreaData) => {
    if (!newArea) {
      toast.error("We were unable to set your area");
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
    setAreaRefetch();
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
    <>
      <div className='flex w-full h-full overflow-y-scroll p-2'>
        <div className='w-1/4 h-full flex items-center justify-center '>
          <div className='rounded-xl w-full h-full mx-auto bg-gradient-to-r p-[5px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
            <div className='flex flex-col items-center h-full bg-black text-white rounded-lg p-4'>
              <h1 className=' w-full text-center font-Inter font-black pb-8 tracking-wide text-xl '>
                CURRENT SAVED AREA:
              </h1>
              <Player
                src='https://assets4.lottiefiles.com/packages/lf20_sj0skmmg.json'
                className='player w-[200px] h-[200px] '
                autoplay
                loop
                speed={1}
                // style={{ height: "200px", width: "200px" }}
              />
              {FetchingSavedAreaData ? (
                <div className='w-full h-full flex items-center justify-center'>
                  <ThreeDots fill='#3c79f0' />
                </div>
              ) : SavedAreaData ? (
                <div className='w-full h-full flex items-center flex-col space-y-6 justify-center text-center font-Inter tracking-wide'>
                  <div>
                    <h1 className='text-blue-500 text-xl font-black'>AREA ID:</h1>
                    <h1 className='text-blue-200 font-bold'>{SavedAreaData.id}</h1>
                  </div>
                  <div>
                    <h1 className='text-blue-500 text-xl font-black'>
                      AREA REGION:
                    </h1>
                    <h1 className='text-blue-200 font-bold'>
                      {SavedAreaData.region}
                    </h1>
                  </div>
                  <div>
                    <h1 className='text-blue-500 text-xl font-black'>AREA NAME:</h1>
                    <h1 className='text-blue-200 font-bold'>{SavedAreaData.name}</h1>
                  </div>
                </div>
              ) : (
                <div className='w-full h-full flex items-center flex-col space-y-11 justify-center text-center font-Inter font-black tracking-wide'>
                  <h1 className='text-cblue font-Inter font-black text-xl tracking-wide'>
                    NO SAVED AREA
                  </h1>
                  <button
                    onClick={() => document.getElementById("areaSearch")?.focus()}
                    className='relative inline-flex items-center justify-center p-0.5  w-[10rem] h-[3rem] overflow-hidden text-sm font-medium text-gray-900 rounded-[1.15rem] group bg-gradient-to-br from-c2aqua via-c2blue to-c2purple group-hover:from-c2aqua group-hover:via-c2blue group-hover:to-c2purple hover:text-white dark:text-white '
                  >
                    <span className='relative px-5 py-2.5 transition-all ease-in duration-200  w-[9.5rem] h-[2.5rem] bg-white dark:bg-gray-900 rounded-[1rem] group-hover:bg-opacity-0 font-bold'>
                      SET AREA
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className='w-3/4 h-full flex flex-col items-center justify-center space-y-2 px-4 py-2'>
          {/* <h1 className='text-white font-Inter font-black text-2xl tracking-widest '>
            Search Your Area:
          </h1> */}
          <span className='w-full px-1 py-1 bg-gradient-to-t from-cpurple via-pink-600 to-cblue rounded-md'>
            <input
              id='areaSearch'
              className='bg-black px-4 py-2 w-full text-lg rounded-md outline-none font-black text-white tracking-wide font-inter focus:ring-4 focus:ring-c2aqua placeholder:bg-clip-text placeholder:text-transparent placeholder:bg-gradient-to-r placeholder:from-pink-500 placeholder:via-red-500 placeholder:to-yellow-500 placeholder:text-center placeholder:font-Inter placeholder:font-black'
              type='text'
              name='loadshedding-area'
              placeholder='Search Your Area: Waterkloof, Durbanville etc...'
              value={areaInput}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setareaInput(e.currentTarget.value)
              }
            />
          </span>

          <div className='overflow-y-scroll w-full h-full  items-center justify-center'>
            {/* <div className='overflow-y-scroll w-full h-full'> */}
            {AreaDataLoading && (
              <div className='w-full h-full flex items-center justify-center'>
                <ThreeDots fill='#3c79f0' />
              </div>
            )}
            {AreaData &&
              AreaData?.map((area: IAreaData) => {
                return (
                  <AreaLabels
                    key={uuidv4()}
                    id={area.id!}
                    name={area.name!}
                    region={area.region!}
                    cbSetArea={handleSetArea}
                  />
                );
              })}
            {/* <AreaLabels
              key={uuidv4()}
              id={"nelsonmandelabay-15-waterkloofwkkarea30"}
              name={"nelsonmandelabay-15-waterkloofwkkarea30"}
              region={"Nelson Mandela Bay Municipality"}
              cbSetArea={() => console.log("YES")}
            />
            <AreaLabels
              key={uuidv4()}
              id={"tshwane-6-nieuwmuckleneuk"}
              name={"tshwane-6-nieuwmuckleneuk"}
              region={"Nelson Mandela Bay Municipality"}
              cbSetArea={() => console.log("YES")}
            />
            <AreaLabels
              key={uuidv4()}
              id={"nelsonmandelabay-15-waterkloofwkkarea30"}
              name={"nelsonmandelabay-15-waterkloofwkkarea30"}
              region={"Nelson Mandela Bay Municipality"}
              cbSetArea={() => console.log("YES")}
            />
            <AreaLabels
              key={uuidv4()}
              id={"tshwane-6-nieuwmuckleneuk"}
              name={"tshwane-6-nieuwmuckleneuk"}
              region={"Nelson Mandela Bay Municipality"}
              cbSetArea={() => console.log("YES")}
            /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoadsheddingProfile;
