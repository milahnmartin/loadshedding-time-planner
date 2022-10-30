import classNames from "classnames";
import { useState } from "react";
import { FcExpand } from "react-icons/fc";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
function InviteData({ data, cbAccept, cbDecline }: any) {
  const [showinfo, setShowInfo] = useState<boolean>(false);
  return (
    <div className='w-full h-fit m-1 flex-col border-2'>
      <div className='font-black font-Inter flex items-center justify-end'>
        <h1 className='w-full flex justify-start'>{data.invitedBy[1]}</h1>
        <span className='w-fit h-full flex justify-end items-center'>
          <FcExpand
            className={
              showinfo
                ? classNames("transition-all duration-500 rotate-180")
                : classNames("transition-all duration-500")
            }
            onClick={() => setShowInfo((prev) => !prev)}
            size={20}
          />
        </span>
      </div>
      {showinfo && (
        <div className=' h-fit flex justify-evenly items-center'>
          <IoMdCheckmarkCircleOutline
            onClick={() => cbAccept(data?.plan_id)}
            fill='lime'
            className='animation-all duration-700 hover:rotate-[360deg]'
            size={25}
          />
          <MdOutlineCancel
            onClick={() => cbDecline(data?.plan_id)}
            fill='red'
            size={25}
            className='animation-all duration-700 hover:rotate-[360deg]'
          />
        </div>
      )}
    </div>
  );
}

export default InviteData;
