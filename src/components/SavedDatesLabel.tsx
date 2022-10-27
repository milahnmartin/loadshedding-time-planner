import { useState } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
const SavedDatesLabel = ({ date, cb }: any) => {
  const [showInfo, setShowInfo] = useState<boolean>(false);

  return (
    <div className='flex flex-col w-full bg-white font-Inter rounded-sm items-center'>
      <div className='flex border-2 w-full border-pink-600 items-center justify-center space-x-2'>
        <h1 className='font-black'>Date: {date}</h1>
        {
          <AiOutlineArrowDown
            fill='black'
            className='cursor-pointer'
            onClick={() => setShowInfo(!showInfo)}
          />
        }
      </div>
      {showInfo && (
        <div className='h-full p-2 text-white flex flex-col items-center justify-end'>
          <h1 className='text-black'>THIS IS DATA</h1>
          <button
            onClick={() => cb(date)}
            className='h-fit w-full text-white font-Inter font-black p-2 bg-black'
          >
            Show Info
          </button>
        </div>
      )}
    </div>
  );
};

export default SavedDatesLabel;
