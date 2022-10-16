import { onValue, ref } from "firebase/database";
import { useContext, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import TimeCalculations from "../helpers/TimeCalculations.module";
import { GameidContext } from "../pages/game/[id]";
import type { IStartEndTimes } from "../types/types";
import { auth, db } from "../utils/firebase-config";
import supabase from "../utils/supabase-config";
import GreenLabel from "./GreenLabel";
import RedLabel from "./RedLabel";

function DataControllers() {
  const [currentUser, loading] = useAuthState(auth);
  const [minGameTimeRef, setGameTimeRef] = useState<number>(40);
  const [users, setUsers] = useState<Array<string>>([]);
  const [time, setTime] = useState<IStartEndTimes>({
    startTime: "10:00",
    endTime: "00:00",
  });

  const IdContext = useContext(GameidContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const StartTimeCalc = TimeCalculations.getInitialStartTime(
    users,
    time?.startTime,
    minGameTimeRef
  );
  const InbetweenTimeCalc = TimeCalculations.getInbetweenTimes(
    users,
    minGameTimeRef
  );
  const EndTimesCalc = TimeCalculations.getInitialEndTimes(
    users,
    time?.endTime,
    minGameTimeRef
  );

  const fetchGameData = () => {
    const currentUserRef = ref(db, `plans/${currentUser?.uid}/${IdContext}`);
    onValue(currentUserRef, (snapshot) => {
      if (!snapshot.exists()) {
        toast.error("Game not found");
        return;
      }
      const data = snapshot.val();
      if (!data?.lsTimes) return;
      setUsers(data?.lsTimes);
    });
  };

  const handleInvalidGame = () => {
    toast.error("Game ID is invalid or not Authorized");
  };

  const saveToDatabase = async () => {
    if (!IdContext) return;
    if (!currentUser) {
      toast.warning("You need to be logged in to save your game");
      return;
    }
    const { data, error } = await supabase
      .from("plans")
      .insert({
        id: uuidv4(),
        lsTimes: JSON.stringify(users),
      })
      .select();
    if (error) {
      console.log(error);
      toast.error("Error occured when inserting");
      return;
    }
    console.log(data);
    toast.success("Game Saved");
  };

  const handleAddPlayer = () => {
    const name = inputRef.current?.value;
    if (!name) return;
    const parsedNames = name.split(",");
    setUsers((prev): any => {
      if (!prev.length) return [...parsedNames];
      return [...prev, ...parsedNames];
    });
    inputRef.current!.value = "";
  };

  const handleRemovePlayer = (val: string) => {
    const newUsers = users.filter((user, i) => user !== val);
    setUsers(newUsers);
  };
  useEffect(() => {
    if (IdContext === "create") return;
    if (currentUser && !loading) fetchGameData();
  }, [loading]);
  return (
    <div className='w-full flex items-center pt-16'>
      <div className='flex flex-col space-y-8 items-center align-center justify-center w-[50%] p-2'>
        <h1 className='text-white text-2xl tracking-widest font-roboto'>
          LS Times Added:{" "}
          <span className='text-transparent animate-pulse bg-clip-text bg-gradient-to-r from-red-700 via-purple-700 to-primary text-2xl font-extrabold underline'>
            {users.length}
          </span>
        </h1>
        <label className='text-2xl text-white font-roboto font-extralight'>
          Start Time
        </label>
        <input
          onChange={(e) =>
            setTime({ endTime: time.endTime, startTime: e.currentTarget.value })
          }
          className='text-center py-2 px-4 outline-none focus:ring-4 focus:ring-primary rounded-sm bg-white w-fit font-robot font-bold'
          type='time'
          value={time.startTime}
          required
        />
        <label className='text-2xl text-white font-roboto font-extralight'>
          End Time
        </label>
        <input
          onChange={(e) =>
            setTime({ startTime: time.startTime, endTime: e.currentTarget.value })
          }
          className='py-2 px-4 outline-none focus:ring-4 focus:ring-primary rounded-sm bg-white w-fit font-robot font-bold'
          type='time'
          value={time.endTime}
          required
        />
        <label className='text-2xl text-white font-roboto font-extralight'>
          Min Game Time (min)
        </label>
        <input
          onChange={(e) => setGameTimeRef(Number(e.currentTarget.value))}
          className='py-2 px-4 rounded-md font-roboto font-bold text-center outline-none focus:ring-4 focus:ring-primary'
          type='number'
          value={minGameTimeRef}
        />
        <input
          placeholder='Enter Loadshedding Schedule eg. 13:00-15:00, 17:00-19:00'
          className='text-black font-roboto rounded px-2 py-1 w-[60%] outline-none focus:ring-4 focus:ring-tersier'
          type='text'
          id='loadsheddingdata'
          name='loadsheddingdata'
          ref={inputRef}
          required
        />

        <button
          onClick={handleAddPlayer}
          className='px-5 py-3 text-white bg-gradient-to-r from-purple-700 to-red-700 rounded hover:from-red-700 hover:to-purple-700'
        >
          Add Player Time
        </button>
      </div>
      <div className='w-[50%] h-full flex flex-col items-center justify-start px-5'>
        <div className='flex items-center justify-start flex-col w-full h-[50%]'>
          <h1 className='text-red-600 underline font-roboto font-extrabold text-2xl'>
            LOADSHEDDING TIMES:
          </h1>
          <div
            id='bubbled-red-label-container'
            className='flex flex-wrap justify-center items-center space-x-6 py-5'
          >
            {users.length > 0 &&
              TimeCalculations.sortLoadSheddingTime(users).map((item, index) => (
                <RedLabel data={item} key={uuidv4()} cb={handleRemovePlayer} />
              ))}
          </div>
        </div>
        <div className='flex items-center justify-start flex-col w-full h-[50%]'>
          <h1 className='text-lime-400 underline font-roboto font-extrabold text-2xl mb-2'>
            AVAILIBLE TIMES
          </h1>
          <div className='flex flex-wrap justify-center items-center space-x-6 py-5'>
            {users.length > 0 && StartTimeCalc && (
              <GreenLabel data={StartTimeCalc} />
            )}
            {users.length > 0 &&
              InbetweenTimeCalc.map((item) => {
                return <GreenLabel key={uuidv4()} data={item} />;
              })}
            {users.length > 0 && EndTimesCalc && <GreenLabel data={EndTimesCalc} />}
          </div>
          <button
            onClick={saveToDatabase}
            className='px-5 py-3 text-white bg-gradient-to-r from-purple-700 to-red-700 rounded hover:from-red-700 hover:to-purple-700'
          >
            SAVE TO CLOUD
          </button>
        </div>
      </div>
    </div>
  );
}

export default DataControllers;
