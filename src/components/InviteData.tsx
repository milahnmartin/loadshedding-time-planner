import classNames from "classnames";
import { useState } from "react";
import { FcExpand } from "react-icons/fc";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
function InviteData({ data, cbAccept, cbDecline }: any) {
  const [showinfo, setShowInfo] = useState<boolean>(false);
  return (
    <div className='noti-data w-full h-fit my-1 flex-col'>
      <div className='noti-data font-black font-Inter flex items-center justify-end'>
        <h1 className='noti-data w-full flex justify-start'>{data.invitedBy[1]}</h1>
        <span className='noti-data w-fit h-full flex justify-end items-center'>
          <FcExpand
            className={
              showinfo
                ? classNames("noti-data transition-all duration-500 rotate-180")
                : classNames("noti-data transition-all duration-500")
            }
            onClick={() => setShowInfo((prev) => !prev)}
            size={20}
          />
        </span>
      </div>
      {showinfo && (
        <div className='noti-data h-fit flex justify-evenly items-center'>
          <IoMdCheckmarkCircleOutline
            onClick={() => cbAccept(data?.plan_id)}
            fill='lime'
            className='noti-data animation-all duration-700 hover:rotate-[360deg]'
            size={25}
          />
          <MdOutlineCancel
            onClick={() => cbDecline(data?.plan_id)}
            fill='red'
            size={25}
            className='noti-data animation-all duration-700 hover:rotate-[360deg]'
          />
        </div>
      )}
    </div>
  );
}

export default InviteData;
