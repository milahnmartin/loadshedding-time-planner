import { IInviteData } from "@lstypes/types";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import { auth } from "../../utils/firebase-config";
import InviteData from "../InviteData";
function NotificationModal({ inviteArray }: any) {
  const [user, loading] = useAuthState(auth);
  const [dropdown, setDropdown] = useState<boolean>(false);

  const handleInviteDecline = async (plan_id: string) => {
    if (!plan_id) {
      toast.error("Could not decline invite");
      return;
    }
  };

  return (
    <div className='noti-data overflow-y-scroll noti-data h-[10rem] w-[9rem] text-black text-Inter absolute bg-white -left-[5rem] top-10 rounded-md flex items-center justify-start flex-col text-center z-50 p-2'>
      {inviteArray.length > 0 ? (
        inviteArray.map((invite: IInviteData) => (
          <InviteData
            key={uuidv4()}
            cbAccept={() => console.log("YES")}
            cbDecline={handleInviteDecline}
            data={invite}
          />
        ))
      ) : (
        <p className='font-satoshiBlack font-black text-xl'>NO INVITES</p>
      )}
    </div>
  );
}

export default NotificationModal;
