import { uuidv4 } from "@firebase/util";
import Router from "next/router";
import { useRef } from "react";
const PlansLabel = ({ data }: any) => {
  const currentRefGame = useRef(null);
  console.log(data);
  return (
    <div className='flex-col cursor-pointer text-black font-bold flex items-center jusfify-center p-4 w-fit h-fit rounded-xl bg-gray-300 transition-all duration-200 '>
      <div className='flex items-start justify-center flex-col space-y-4'>
        <h1>CreatedBy: {data?.initiatedUser}</h1>
        <h1>GameID: {data?.uuidv4}</h1>
        <h1>
          CurrentTimes:{" "}
          {data?.lsTimes.map((item: any) => (
            <h2 key={uuidv4()}>{item}</h2>
          ))}
        </h1>
        <h1>
          AuthorizedUsers:{" "}
          {data?.usersAuthorized?.map((data: any) => (
            <h2 key={uuidv4()}>{data}</h2>
          ))}
        </h1>
      </div>
      <div className='mt-10'>
        <button
          onClick={() => Router.push(`/game/${data?.uuidv4}`)}
          id={data?.uuidv4}
          className='px-2 py-1 rounded-xl text-white text-center bg-sky-700 transition-all duration-200 hover:scale-110'
        >
          VIEW PLAN
        </button>
      </div>
    </div>
  );
};

export default PlansLabel;
