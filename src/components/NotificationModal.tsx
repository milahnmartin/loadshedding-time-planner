import { IInviteData } from "@lstypes/types";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { auth } from "../utils/firebase-config";
import supabase from "../utils/supabase-config";
import InviteData from "./InviteData";
function NotificationModal({ inviteArray }: any) {
  const [user, loading] = useAuthState(auth);
  const [dropdown, setDropdown] = useState<boolean>(false);

  const handleInviteAccept = async (plan_id: string) => {
    if (!plan_id) {
      toast.error("Could not accept invite");
      return;
    }
    const { data: user_plan_data, error: user_plan_error } = await supabase
      .from("user_info")
      .select(`plan_authorizedUsers,plan_authorizedTeams,plan_InvitedUsers`)
      .eq(`plan_id`, plan_id);
  };
  const handleInviteDecline = async (plan_id: string) => {
    if (!plan_id) {
      toast.error("Could not decline invite");
      return;
    }
  };

  return (
    <div className='overflow-y-scroll noti-data h-[10rem] w-[9rem] text-black text-Inter absolute bg-white -left-[5rem] top-10 rounded-md flex items-center justify-start flex-col text-center z-50 p-2'>
      {inviteArray.length > 0 ? (
        inviteArray.map((invite: IInviteData) => (
          <InviteData
            cbAccept={handleInviteAccept}
            cbDecline={handleInviteDecline}
            data={invite}
          />
        ))
      ) : (
        <p className='font-Inter font-black text-xl'>NO INVITES</p>
      )}
    </div>
  );
}

export default NotificationModal;
