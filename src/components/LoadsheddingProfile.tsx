import { uuidv4 } from "@firebase/util";
import { IAreaData } from "@lstypes/types";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { ThreeDots } from "react-loading-icons";
import { toast } from "react-toastify";
import { auth } from "../utils/firebase-config";
import supabase from "../utils/supabase-config";
import AreaLabels from "./AreaLabels";
const spanStyles = classNames(
  "text-white text-center font-Inter font-black text-xl"
);

const LoadsheddingProfile = () => {
  const [user, loading] = useAuthState(auth);
  const [areaInput, setareaInput] = useState<string>("");
  const [debounce, setDebounce] = useState<boolean>(false);
  const [loadingArea, setLoadingArea] = useState<boolean>(false);
  const [areaData, setAreaData] = useState<Array<IAreaData>>([]);
  const [savedUserArea, setSavedUserArea] = useState<IAreaData>({
    id: null,
    name: null,
    region: null,
  });
  const handleAreaSearch = async () => {
    if (debounce) {
      toast.warning("You are searching too fast, please wait a bit");
      return;
    }
    if (areaInput.length === 0) {
      toast.warning("Please enter a valid area name");
      return;
    }
    setLoadingArea(true);
    areaInput.trim();
    setDebounce(true);
    setTimeout(() => {
      setDebounce(false);
    }, 30000);
    const fetchArea = await fetch(`/api/lsplannerId/${areaInput}`);
    const areaData = await fetchArea.json();
    setLoadingArea(false);
    setAreaData(areaData);
  };
  useEffect(() => {
    if (!user || loading) return;
    (async () => {
      const { data, error } = await supabase
        .from("user_info")
        .select("user_sepushID->id,user_sepushID->name,user_sepushID->region")
        .eq("user_id", user?.uid);
      if (error) {
        toast.error("We were unable to fetch your saved area");
        return;
      }

      const { id, name, region }: any = data[0];
      if (id && name && region) {
        setSavedUserArea({ id, name, region });
      }
    })();
  }, [loading]);
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
    setSavedUserArea({ id, name, region });
  };

  return (
    <div className='p-2 w-full h-full flex items-center flex-col'>
      <div className='w-full flex flex-col items-center justify-start'>
        <h1 className='font-extrabold mb-5 text-4xl animate-pulse text-transparent bg-clip-text bg-gradient-to-r from-caqua via-cblue to-cpurple pt-4 md:text-6xl'>
          LOADSHEDDING SETTINGS
        </h1>
      </div>
      <div className='flex w-full h-full overflow-y-scroll'>
        <div className='w-1/2 h-full flex items-center justify-center'>
          <div className='rounded-xl w-[22rem] h-auto mx-auto bg-gradient-to-r p-[5px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
            <div className='flex flex-col items-center h-full bg-black text-white rounded-lg p-6 '>
              <h1 className=' w-full text-center font-Inter font-black tracking-wide text-lg'>
                CURRENT SAVED AREA:
              </h1>
              {savedUserArea.id ? (
                <div className='w-full h-full flex items-center flex-col space-y-2 justify-center text-center font-Inter font-black tracking-wide'>
                  <h1>
                    <pre className='text-xl'>Area ID:</pre>
                    {savedUserArea.id}
                  </h1>
                  <h1>
                    <pre className='text-xl'>Area Region:</pre>
                    {savedUserArea.region}
                  </h1>
                  <h1>
                    <pre className='text-xl'>Area Name:</pre>
                    {savedUserArea.name}
                  </h1>
                </div>
              ) : (
                <h1 className='text-cblue font-Inter'>
                  You have not saved any area yet
                </h1>
              )}
            </div>
          </div>
        </div>
        <div className='w-1/2 h-full flex flex-col items-center justify-start space-y-2 p-2'>
          <h1 className='text-white font-Inter font-black text-xl'>
            Search For Your Loadshedding Area:
          </h1>
          <input
            className='p-2 w-full rounded-xl outline-none focus:ring-2 focus:ring-cblue placeholder:text-cblue placeholder:text-center'
            type='text'
            name='loadshedding-area'
            placeholder='Waterkloof, Johannesburg'
            value={areaInput}
            onChange={(e) => setareaInput(e.target.value)}
          />
          <button
            onClick={handleAreaSearch}
            className='w-full h-[3.5rem] flex justify-center items-center bg-transparent fon-Inter font-black outline-none text-white border-cblue border-2 rounded-xl px-2 py-2 hover:bg-cblue hover:text-white animation-all duration-500'
          >
            {loadingArea ? <ThreeDots height={20} /> : "SEARCH"}
          </button>
          <div className='overflow-y-scroll w-full h-full'>
            {areaData.map((area: IAreaData) => {
              return (
                <AreaLabels
                  key={uuidv4()}
                  id={area.id}
                  name={area.name}
                  region={area.region}
                  cbSetArea={handleSetArea}
                />
              );
            })}
            {/* <AreaLabels
              key={uuidv4()}
              id={"nelsonmandelabay-15-waterkloofwkkarea30"}
              name={"nelsonmandelabay-15-waterkloofwkkarea30"}
              region={"Nelson Mandela Bay Municipality"}
              cbSetArea={handleSetArea}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadsheddingProfile;
