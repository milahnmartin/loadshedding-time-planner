import { useMemo, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { IStartEndTimes } from "../types/types";
import GreenLabel from "./GreenLabel";
import RedLabel from "./RedLabel";

function DataControllers() {
  const [users, setUsers] = useState<Array<string>>([]);
  const [time, setTime] = useState<IStartEndTimes>({
    startTime: "10:00",
    endTime: "00:00",
  });
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
    let LastLoadSheddingTime: string | undefined =
      calcUnavailibleTimes()[calcUnavailibleTimes().length - 1];
    const MaxRefTime = time.endTime;
    console.log(`SORTED ARR ${LastLoadSheddingTime}, REF TIME - ${MaxRefTime}`);
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
    console.log(pStart);
    return (
      pStart >= minGameTimeRef && (
        <GreenLabel data={`@ ${LastLoadSheddingTime} - ${pStart + " min "}`} />
      )
    );
  };

  const calcInbetweenTimes = () => {
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
    return (
      times.length >= 0 &&
      times.map((time) => <GreenLabel data={time} key={uuidv4()} />)
    );
  };

  const calcMemoTimes = useMemo(() => calcUnavailibleTimes, [users]);
  const calcBeginMemoTimes = useMemo(
    () => calcBeginTimes,
    [users, time, minGameTimeRef]
  );
  const calcInbetweenTimesMemo = useMemo(
    () => calcInbetweenTimes,
    [users, time, minGameTimeRef]
  );
  const calcEndtimesMemo = useMemo(
    () => calcEndTimes,
    [users, time, minGameTimeRef]
  );

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

  return (
    <div className='w-full flex items-center pt-16'>
      <div className='flex flex-col space-y-8 items-center align-center justify-center w-[50%] p-2'>
        <h1 className='text-white text-2xl tracking-widest font-roboto font-bold'>
          LS Times Added:{" "}
          <span className='text-transparent animate-pulse bg-clip-text bg-gradient-to-r from-red-700 via-purple-700 to-primary text-2xl font-extrabold underline'>
            {users.length}
          </span>
        </h1>
        <label className='text-2xl text-white font-roboto font-extralight'>
          Start Time
        </label>
        <input
          onInput={(e) => setTime({ ...time, startTime: e.currentTarget.value })}
          className='text-center py-2 px-4 outline-none focus:ring-4 focus:ring-primary rounded-sm bg-white w-fit font-robot font-bold'
          type='time'
          value={time.startTime}
          required
        />
        <label className='text-2xl text-white font-roboto font-extralight'>
          End Time
        </label>
        <input
          onInput={(e) => setTime({ ...time, endTime: e.currentTarget.value })}
          className='py-2 px-4 outline-none focus:ring-4 focus:ring-primary rounded-sm bg-white w-fit font-robot font-bold'
          type='time'
          value={time.endTime}
          required
        />
        <label className='text-2xl text-white font-roboto font-extralight'>
          Min Game Time (min)
        </label>
        <input
          onInput={(e) => setGameTimeRef(Number(e.currentTarget.value))}
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
              calcMemoTimes().map((item, index) => (
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
            {calcBeginMemoTimes()}
            {calcInbetweenTimesMemo()}
            {calcEndtimesMemo()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DataControllers;
