import { IAreaData } from "@lstypes/types";
import classNames from "classnames";
import { useRef, useState } from "react";
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
  const areaSearchRef = useRef<any>();

  const handleSetArea = async (newArea: IAreaData) => {
    if (!newArea) {
      toast.error("We were unable to set your area");
      return;
    }
    const { data, error } = await supabase
      .from("user_info")
      .update({ user_sepushID: newArea })
      .eq("user_id", user?.uid)
      .select("user_sepushID->id,user_sepushID->name,user_sepushID->region");

    if (error) {
      console.log(error);
      toast.error("We were unable to set your area");
      return;
    }

    const { id, name, region }: any = data[0];
    setAreaRefetch();
  };

  const {
    data: AreaData,
    isLoading,
    isFetching: AreaDataLoading,
  } = useFetchArea(areaInput.trim());

  const {
    data: SavedAreaData,
    isFetching: FetchingSavedAreaData,
    refetch: setAreaRefetch,
  } = useFetchSavedArea();

  return (
    <div className='p-2 w-full h-full flex items-center flex-col'>
      <div className='w-full flex flex-col items-center justify-start'>
        <h1 className='font-extrabold  text-4xl animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple pt-4 md:text-6xl'>
          LOADSHEDDING SETTINGS
        </h1>
      </div>
      <div className='flex w-full h-full overflow-y-scroll'>
        <div className='w-1/2 h-full flex items-center justify-center'>
          <div className='rounded-xl w-[22rem] h-[20rem] mx-auto bg-gradient-to-r p-[5px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
            <div className='flex flex-col items-center h-full bg-black text-white rounded-lg p-6 '>
              <h1 className=' w-full text-center font-Inter font-black pb-2 tracking-wide text-xl '>
                CURRENT SAVED AREA:
              </h1>
              {FetchingSavedAreaData ? (
                <ThreeDots fill='#3c79f0' />
              ) : SavedAreaData ? (
                <div className='w-full h-full flex items-center flex-col space-y-2 justify-center text-center font-Inter font-black tracking-wide'>
                  <h1 className='text-blue-500 text-lg'>AREA ID:</h1>
                  <h1 className='text-blue-200 '>{SavedAreaData.id}</h1>

                  <h1 className='text-blue-500 text-lg'>AREA REGION:</h1>
                  <h1 className='text-blue-200 '>{SavedAreaData.region}</h1>

                  <h1 className='text-blue-500 text-lg'>AREA NAME:</h1>
                  <h1 className='text-blue-200 '>{SavedAreaData.name}</h1>
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
        <div className='w-1/2 h-full flex flex-col items-center justify-center space-y-2 p-2'>
          <h1 className='text-white font-Inter font-black text-xl'>
            Search For Your Loadshedding Area:
          </h1>
          <input
            id='areaSearch'
            className='p-2 w-full rounded-xl outline-none focus:ring-2 focus:ring-cblue placeholder:text-cblue placeholder:text-center placeholder:font-Inter'
            type='text'
            name='loadshedding-area'
            placeholder='Waterkloof, Durbanville, etc...'
            value={areaInput}
            onChange={(e) => setareaInput(e.target.value)}
            autoFocus
            ref={areaSearchRef}
          />

          <div className='overflow-y-scroll w-full h-full  items-center justify-center'>
            {/* <div className='overflow-y-scroll w-full h-full'> */}
            {AreaDataLoading ? (
              <div className='w-full h-full flex items-center justify-center'>
                <ThreeDots fill='#3c79f0' />
              </div>
            ) : (
              AreaData?.map((area: IAreaData) => {
                return (
                  <AreaLabels
                    key={uuidv4()}
                    id={area.id}
                    name={area.name}
                    region={area.region}
                    cbSetArea={handleSetArea}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadsheddingProfile;
