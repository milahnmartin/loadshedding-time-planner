import { onValue, ref, set, update } from "firebase/database";
import Router from "next/router";
import { useContext, useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { GameidContext } from "../pages/game/[id]";
import type { IStartEndTimes } from "../types/types";
import { auth, db } from "../utils/firebase-config";
import GreenLabel from "./GreenLabel";
import RedLabel from "./RedLabel";

function DataControllers() {
  const IdContext = useContext(GameidContext);
  const [users, setUsers] = useState<Array<string>>([]);
  const [time, setTime] = useState<IStartEndTimes>({
    startTime: "10:00",
    endTime: "00:00",
  });
  const [currentUser, loading] = useAuthState(auth);
  const [minGameTimeRef, setGameTimeRef] = useState<number>(40);

  const inputRef = useRef<HTMLInputElement>(null);

  const calcUnavailibleTimes = (): string[] => {
    const unsortedTimes = Array.from(new Set(users));
    const sortedTimes = unsortedTimes.sort();
    return sortedTimes;
  };

  const calcBeginTimes = () => {
    let MinLoadsheddingTime: string | undefined = calcUnavailibleTimes()[0];
    const MinRefTime = time.startTime;
    if (!MinLoadsheddingTime) return;
    MinLoadsheddingTime = MinLoadsheddingTime.split("-")[0];
    const MiniMumLoadsheddingTime = new Date(
      2022,
      new Date().getMonth(),
      1,
      Number(MinLoadsheddingTime?.split(":")[0]),
      Number(MinLoadsheddingTime?.split(":")[1])
    );
    const MiniMumRefTime = new Date(
      2022,
      new Date().getMonth(),
      1,
      Number(MinRefTime?.split(":")[0]),
      Number(MinRefTime?.split(":")[1])
    );

    let diff = (MiniMumLoadsheddingTime.getTime() - MiniMumRefTime.getTime()) / 1000;
    let pStart = (diff /= 60);
    return (
      pStart >= minGameTimeRef && (
        <GreenLabel data={`@ ${MinRefTime} - ${pStart + " min "}`} />
      )
    );
  };

  const calcEndTimes = () => {
    let LastLoadSheddingTime: string[] | string | undefined = calcUnavailibleTimes();
    LastLoadSheddingTime = LastLoadSheddingTime[LastLoadSheddingTime.length - 1];
    const MaxRefTime = time.endTime;
    if (!LastLoadSheddingTime) return;
    LastLoadSheddingTime = LastLoadSheddingTime.split("-")[1];
    const MaximumLoadsheddingTime = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
      Number(LastLoadSheddingTime?.split(":")[0]),
      Number(LastLoadSheddingTime?.split(":")[1])
    );
    const HighestRefTime = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      Number(MaxRefTime?.split(":").join()) < 2359
        ? new Date().getDate()
        : new Date().getDate() + 1,
      Number(MaxRefTime?.split(":")[0]),
      Number(MaxRefTime?.split(":")[1])
    );

    let diff = (HighestRefTime.getTime() - MaximumLoadsheddingTime.getTime()) / 1000;
    let pStart = (diff /= 60);
    return (
      pStart >= minGameTimeRef && (
        <GreenLabel data={`@ ${LastLoadSheddingTime} - ${pStart + " min "}`} />
      )
    );
  };

  const calcInbetweenTimes = (): JSX.Element[] | undefined => {
    let times: string[] = [];
    const sortedTimes = calcUnavailibleTimes();
    if (sortedTimes.length < 2) return;
    for (let i = 0; i < sortedTimes.length; i++) {
      const startTime = sortedTimes[i]?.split("-")[1];
      const endTime = sortedTimes[i + 1]?.split("-")[0];
      if (!endTime) break;
      const start = new Date(
        2022,
        new Date().getMonth(),
        1,
        Number(startTime?.split(":")[0]),
        Number(startTime?.split(":")[1])
      );
      const end = new Date(
        2022,
        new Date().getMonth(),
        1,
        Number(endTime?.split(":")[0]),
        Number(endTime?.split(":")[1])
      );
      let diff = (end.getTime() - start.getTime()) / 1000;
      let pStart = (diff /= 60);
      pStart >= minGameTimeRef && times.push(`@ ${startTime} - ${pStart + " min "}`);
    }
    return times.map((time) => <GreenLabel data={time} key={uuidv4()} />);
  };

  const handleCloudSaveCreate = async () => {
    const toastStatus = toast.loading("Saving...");
    const gameRefUUID = uuidv4();
    try {
      await set(ref(db, `/${currentUser?.uid}/${gameRefUUID}`), {
        createdBy: currentUser?.email
          ? currentUser?.email
          : currentUser?.displayName,
        gameuuid: gameRefUUID,
        lsTimes: users,
      });
      toast.update(toastStatus, {
        render: "Saved to Cloud",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.update(toastStatus, {
        render: "Error Saving to Cloud",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };
  const handleCloudSaveRef = async () => {
    const toastStatus = toast.loading("Saving...");
    try {
      await update(ref(db, `/${currentUser?.uid}/${IdContext}`), {
        gameuuid: IdContext,
        lsTimes: users,
      });
      toast.update(toastStatus, {
        render: "Saved to Cloud",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      console.log(error);
      toast.update(toastStatus, {
        render: "Error Saving to Cloud",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  // const calcMemoTimes = useMemo(() => calcUnavailibleTimes, [users]);
  // const calcBeginMemoTimes = useMemo(
  //   () => calcBeginTimes,
  //   [users, time, minGameTimeRef]
  // );
  // const calcInbetweenTimesMemo = useMemo(
  //   () => calcInbetweenTimes,
  //   [users, time, minGameTimeRef]
  // );
  // const calcEndtimesMemo = useMemo(
  //   () => calcEndTimes,
  //   [users, time, minGameTimeRef]
  // );

  const handleAddPlayer = async () => {
    const name = inputRef.current?.value;
    if (!name) return;
    const parsedNames = name.split(",");
    setUsers((prev): any => {
      if (!prev.length) return [...parsedNames];
      return [...prev, ...parsedNames];
    });
    inputRef.current!.value = "";
  };
  useEffect(() => {
    const gatherData = async () => {
      if (IdContext !== "create" && currentUser && !loading) {
        try {
          await onValue(ref(db), (snapshot) => {
            const data = snapshot.val();
            if (!data) return;
            const gameData = data[currentUser?.uid][IdContext];
            if (gameData) {
              if (gameData?.lsTimes) {
                setUsers(gameData?.lsTimes);
              }
              return;
            }
            toast.error("Game not found, Redirecting to plans");
            Router.push("/plans");
          });
        } catch {
          toast.error("Error loading game", { autoClose: 2000 });
          setTimeout(() => {
            Router.push("/game/create");
          }, 4000);
        }
      }
    };

    gatherData();
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
              calcUnavailibleTimes().map((item, index) => (
                <RedLabel
                  data={item}
                  key={uuidv4()}
                  pKey={index}
                  state={{ users, setUsers }}
                />
              ))}
          </div>
        </div>
        <div className='flex items-center justify-start flex-col w-full h-[50%]'>
          <h1 className='text-lime-400 underline font-roboto font-extrabold text-2xl mb-2'>
            AVAILIBLE TIMES
          </h1>
          <div className='flex flex-wrap justify-center items-center space-x-6 py-5'>
            {calcBeginTimes()}
            {calcInbetweenTimes()}
            {calcBeginTimes()}
          </div>
          <button
            onClick={
              IdContext === "create" ? handleCloudSaveCreate : handleCloudSaveRef
            }
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
