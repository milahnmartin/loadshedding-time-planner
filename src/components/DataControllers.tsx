import { useMemo, useRef, useState } from "react";
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

  const inputRef = useRef<HTMLInputElement>(null);

  const calcUnavailibleTimes = () => {
    const unsortedTimes = Array.from(new Set(users));
    const sortedTimes = unsortedTimes.sort();
    console.log(sortedTimes);
    return sortedTimes;
  };

  const removeTime = (id: number) => {
    const specificTime = users.findIndex((item) => item == id);
    const newUsers = users.filter((item) => item !== users[id]);
    setUsers(newUsers);
  };

  const calcMemoTimes = useMemo(() => calcUnavailibleTimes, [users]);

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

  return (
    <div className='w-[90%] flex items-center justify-center flex-col space-y-5'>
      <h1 className='text-white text-2xl tracking-widest font-roboto'>
        Players Added: {users.length}
      </h1>
      <input
        placeholder='Enter Loadshedding Schedule eg. 13:00-15:00, 17:00-19:00'
        className='text-black font-roboto rounded px-2 py-1 w-[60%] outline-none focus:ring-4 focus:ring-red-700'
        type='text'
        id='loadsheddingdata'
        name='loadsheddingdata'
        ref={inputRef}
        required
      ></input>
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
    </div>
  );
}

export default DataControllers;
