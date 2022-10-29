import { useAuthState } from "react-firebase-hooks/auth";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import { auth } from "../utils/firebase-config";
function NotificationModal({ inviteArray }: any) {
  const [user, loading] = useAuthState(auth);

  const handleInviteAccept = async (e: any) => {};
  const handleInviteDecline = async (e: any) => {};

  return (
    <div className='noti-data h-[10rem] w-[9rem] text-black text-Inter absolute bg-white -left-[5rem] top-10 rounded-md flex items-center justify-start flex-col text-center z-50 p-2'>
      {inviteArray.length > 0 ? (
        inviteArray.map((invite: string) => {
          return (
            <div className='w-full border-2 noti-data text-black font-Inter font-black flex items-center justify-evenly'>
              <p>{invite.invitedByUserName[1]}</p>
              <IoMdCheckmarkCircleOutline
                fill='lime'
                size={20}
                className='hover:scale-110 transition-all duration-200 cursor-pointer'
                onClick={handleInviteAccept}
              />
              <MdOutlineCancel
                fill='red'
                size={20}
                className='hover:scale-110 transition-all duration-200 cursor-pointer'
                onClick={handleInviteDecline}
              />
            </div>
          );
        })
      ) : (
        <p className='noti-data text-black font-Inter font-black'>No Invites</p>
      )}
    </div>
  );
}

export default NotificationModal;
