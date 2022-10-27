import { CiEdit } from "react-icons/ci";
import { GrFormView } from "react-icons/gr";
import { MdDelete } from "react-icons/md";
const SavedDatesLabel = ({ date, cb, delTime, editCb }: any) => {
  return (
    <div className='flex flex-col w-full bg-white font-Inter rounded-sm items-center border-red-700 border-2 p-2'>
      <div className='flex w-full items-center justify-center space-x-2'>
        <h1 className='font-black'>{date}</h1>
      </div>
      <div className='flex space-x-4 h-[40px] w-full justify-center items-center'>
        <span
          title='delete'
          className='text-black transition-all duration-200 hover:text-red-700'
        >
          <MdDelete
            className='cursor-pointer'
            onClick={() => delTime(date)}
            size={30}
          />
        </span>
        <span className='cursor-pointer'>
          <CiEdit
            onClick={() => editCb(date)}
            size={30}
            className='text-black transition-all duration-200 hover:text-cblue'
          />
        </span>
        <span
          title='view'
          className='text-black transition-all duration-200 hover:text-red-700'
        >
          <GrFormView
            onClick={() => cb(date)}
            className='cursor-pointer'
            size={40}
          />
        </span>
      </div>
    </div>
  );
};

export default SavedDatesLabel;
