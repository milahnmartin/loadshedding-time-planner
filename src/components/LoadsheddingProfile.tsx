import { IAreaData } from "@lstypes/types";
import classNames from "classnames";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ThreeDots } from "react-loading-icons";
import { v4 as uuidv4 } from "uuid";
import useFetchArea from "../hooks/useFetchArea";
import { auth } from "../utils/firebase-config";
import AreaLabels from "./AreaLabels";
const spanStyles = classNames(
  "text-white text-center font-Inter font-black text-xl"
);

const LoadsheddingProfile = () => {
  const [user, loading] = useAuthState(auth);
  const [areaInput, setareaInput] = useState<string>("");

  const { data: AreaData, isFetching: AreaDataLoading } = useFetchArea(
    areaInput.trim()
  );

  return (
    <div className='p-2 w-full h-full flex items-center flex-col'>
      <div className='w-full flex flex-col items-center justify-start'>
        <h1 className='font-extrabold  text-4xl animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple pt-4 md:text-6xl'>
          LOADSHEDDING SETTINGS
        </h1>
      </div>
      <div className='flex w-full h-full overflow-y-scroll'>
        <div className='w-1/2 h-full flex items-center justify-center'>
          <div className='rounded-xl w-[22rem] h-auto mx-auto bg-gradient-to-r p-[5px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
            <div className='flex flex-col items-center h-full bg-black text-white rounded-lg p-6 '>
              <h1 className=' w-full text-center font-Inter font-black pb-2 tracking-wide text-xl'>
                CURRENT SAVED AREA:
              </h1>
              {/* card data */}
            </div>
          </div>
        </div>
        <div className='w-1/2 h-full flex flex-col items-center justify-center space-y-2 p-2'>
          <h1 className='text-white font-Inter font-black text-xl'>
            Search For Your Loadshedding Area:
          </h1>
          <input
            className='p-2 w-full rounded-xl outline-none focus:ring-2 focus:ring-cblue placeholder:text-cblue placeholder:text-center placeholder:font-Inter'
            type='text'
            name='loadshedding-area'
            placeholder='Waterkloof, Johannesburg'
            value={areaInput}
            onChange={(e) => setareaInput(e.target.value)}
          />

          <div className='overflow-y-scroll w-full h-full  items-center justify-center'>
            {/* <div className='overflow-y-scroll w-full h-full'> */}
            {AreaDataLoading ? (
              <div className='w-full h-full flex items-center justify-center border-2'>
                <ThreeDots />
              </div>
            ) : (
              AreaData?.map((area: IAreaData) => {
                return (
                  <AreaLabels
                    key={uuidv4()}
                    id={area.id}
                    name={area.name}
                    region={area.region}
                    cbSetArea={() => console.log("YES")}
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
