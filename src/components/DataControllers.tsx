import { useEffect, useMemo, useRef, useState } from "react";
import { IStartEndTimes } from "../types/types";
import GreenLabel from "./GreenLabel";
import RedLabel from "./RedLabel";

function DataControllers() {
  // const [users, setUsers] = useState([
  //   {
  //     name: "milahn",
  //     gamertag: "ultrafy",
  //     loadsheddingInfo: {
  //       group: 4,
  //       location: "Waterkloof Glen",
  //       time: ["14:00-16:00", "18:00-20:00"],
  //     },
  //   },
  //   {
  //     name: "Pieter",
  //     gamertag: "scorpion",
  //     loadsheddingInfo: {
  //       group: 1,
  //       location: "CapeTown",
  //       time: ["16:00-18:00", "20:00-22:00"],
  //     },
  //   },
  // ]);
  const [users, setUsers] = useState([]);
  const [time, setTime] = useState<IStartEndTimes>({
    startTime: null,
    endTime: null,
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const startTimeRef = useRef<HTMLInputElement>(null);
  const endTimeRef = useRef<HTMLInputElement>(null);

  const calcUnavailibleTimes = (): string[] => {
    const unsortedTimes = Array.from(new Set(users));
    const sortedTimes = unsortedTimes.sort();
    return sortedTimes;
  };

  const removeTime = (id: number) => {
    const specificTime = users.findIndex((item) => item == id);
    const newUsers = users.filter((item) => item !== users[id]);
    setUsers(newUsers);
  };

  const calcAvailibleTimes = () => {
    let MinLoadsheddingTime: string | undefined = calcUnavailibleTimes()[0];
    const MinRefTime = startTimeRef.current?.value;
    if (!MinRefTime || !MinLoadsheddingTime) return;
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

    console.log(`MiniMumLoadsheddingTime: ${MiniMumLoadsheddingTime.getTime()}`);
    console.log(`MiniMumRefTime: ${MiniMumRefTime.getTime()}`);
    let diff = (MiniMumLoadsheddingTime.getTime() - MiniMumRefTime.getTime()) / 1000;
    return (
      <GreenLabel
        data={`@ ${MinLoadsheddingTime} - ${Math.abs((diff /= 60)) + " Min"}`}
      />
    );
  };

  const calcMemoTimes = useMemo(() => calcUnavailibleTimes, [users]);
  const calcAvailibleMemoTimes = useMemo(() => calcAvailibleTimes, [users]);

  const checkTimeRangeChange = () => {
    const startTime = startTimeRef.current?.value;
    const endTime = endTimeRef.current?.value;

    if (startTime) {
      setTime(({ endTime }) => {
        return { startTime, endTime };
      });
    }
    if (endTime) {
      setTime(({ startTime }) => {
        return { startTime, endTime };
      });
    }

    if (startTime && endTime) {
      setTime({ startTime, endTime });
    }
  };

  const handleAddPlayer = () => {
    const name = inputRef.current?.value;
    if (!name) return;
    const parsedNames = name.split(",");
    setUsers((prev: string[]) => {
      if (!prev.length) return [...parsedNames];
      return [...prev, ...parsedNames];
    });
    inputRef.current!.value = "";
  };

  useEffect(() => {
    calcAvailibleMemoTimes();
  }, [time, users]);

  return (
    <div className='w-[90%] flex items-center justify-center flex-col space-y-5'>
      <h1 className='text-white text-2xl tracking-widest font-roboto'>
        Player Times Added:{" "}
        <span className='text-transparent animate-pulse bg-clip-text bg-gradient-to-r from-red-700 via-purple-700 to-primary text-2xl font-extrabold underline'>
          {users.length}
        </span>
      </h1>
      <label className='text-2xl text-white font-roboto font-extralight'>
        Start Time
      </label>
      <input
        onInput={checkTimeRangeChange}
        ref={startTimeRef}
        className='py-2 px-4 outline-none focus:ring-2 focus:ring-primary rounded-md'
        type='time'
      />
      <label className='text-2xl text-white font-roboto font-extralight'>
        End Time
      </label>
      <input
        onInput={checkTimeRangeChange}
        ref={endTimeRef}
        className='py-2 px-4 outline-none focus:ring-2 focus:ring-primary rounded-md'
        type='time'
      />
      <input
        placeholder='Enter Loadshedding Schedule eg. 13:00-15:00, 17:00-19:00'
        className='text-black font-roboto rounded px-2 py-1 w-[60%] outline-none focus:ring-4 focus:ring-red-700'
        type='text'
        id='loadsheddingdata'
        name='loadsheddingdata'
        ref={inputRef}
        required
      />
      <label className='text-white font-roboto text-2xl'>
        Please Enter Day's Loadshedding Seperated By A Comma'
      </label>
      <button
        onClick={handleAddPlayer}
        className='px-5 py-3 text-white bg-gradient-to-r from-purple-700 to-red-700 rounded hover:from-red-700 hover:to-purple-700'
      >
        Add Player Time
      </button>
      <h1 className='text-red-600 underline font-roboto font-extrabold text-2xl'>
        Unavalible Times:
      </h1>
      <div className='flex flex-wrap justify-center items-center space-x-6 py-5'>
        {users.length > 0 &&
          calcMemoTimes().map((item, index) => (
            <RedLabel data={item} pKey={index} RemoveData={removeTime} />
          ))}
      </div>
      <h1 className='text-lime-200 underline font-roboto font-extrabold text-2xl'>
        Possible Availible Times:
      </h1>
      {calcAvailibleTimes()}
    </div>
  );
}

export default DataControllers;
