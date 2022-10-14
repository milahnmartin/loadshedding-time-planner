import Router from "next/router";
import { useRef } from "react";
const PlansLabel = ({ data }: any) => {
  const currentRefGame = useRef(null);
  return (
    <div className='flex flex-col cursor-pointer text-black font-bold items-center jusfify-center p-2 w-[25%] h-[30%] rounded-xl bg-gray-300 transition-all duration-20 overflow-scroll'>
      <div className='flex w-full h-full items-start justify-center flex-col space-y-4'>
        <h1>CreatedBy: {data?.createdBy}</h1>
        <h1>GameID: {data?.gameuuid}</h1>
        <h1>
          CurrentTimes:{" "}
          {data?.lsTimes &&
            data?.lsTimes.map((item: any) => {
              return item;
            })}
        </h1>
      </div>
      <div className='mt-10 h-[5%] w-full flex items-center justify-center pb-5'>
        <button
          onClick={() => Router.push(`/game/${data?.gameuuid}`)}
          className='px-2 py-1 rounded-xl text-white text-center bg-sky-700 transition-all duration-200 hover:bg-sky-600'
        >
          VIEW PLAN
        </button>
      </div>
    </div>
  );
};

export default PlansLabel;
