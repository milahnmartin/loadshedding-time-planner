import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../utils/firebase-config";

function NotificationModal() {
  const [user, loading] = useAuthState(auth);
  const [invited, setInvited] = useState<Array<string>>([]);
  const handleShowInvited = () => {
    if (invited.length === 0) {
      return (
        <p className='noti-data text-black font-Inter font-black'>NO INVITES</p>
      );
    }
  };
  return (
    <div className='noti-data h-[10rem] w-[9rem] text-black text-Inter absolute bg-white -left-[5rem] top-10 rounded-md flex items-center justify-start flex-col text-center z-50 p-2'>
      {handleShowInvited()}
    </div>
  );
}

export default NotificationModal;
