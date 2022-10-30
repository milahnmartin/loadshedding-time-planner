import InviteData from "@comps/InviteData";
import { IInviteData } from "@lstypes/types";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { auth } from "../utils/firebase-config";
import supabase from "../utils/supabase-config";
function NotificationModal({ inviteArray }: any) {
  const [user, loading] = useAuthState(auth);
  const [dropdown, setDropdown] = useState<boolean>(false);

  const handleInviteAccept = async (plan_id: string) => {
    if (!plan_id) {
      toast.error("Could not accept invite");
      return;
    }
    const { data: user_plan_data, error: user_plan_error } = await supabase
      .from("user_plans")
      .select(`plan_authorizedUsers,plan_authorizedTeams,plan_InvitedUsers`)
      .eq(`plan_id`, plan_id);

    if (user_plan_error) {
      toast.warning("Plan Error, Please try again");
      return;
    }
    if (user_plan_data.length === 0) {
      toast.error("Plan does not exist");
      return;
    }
    const { plan_authorizedUsers, plan_authorizedTeams, plan_InvitedUsers }: any =
      user_plan_data[0];
    const newAuthorizedUsers = [...plan_authorizedUsers, user?.uid];
    const newPlanInvitedUsers = plan_InvitedUsers.filter((invite: string) => {
      return (
        invite !== user?.uid ||
        invite !== user?.email ||
        invite !== user?.displayName
      );
    });
    const { data: updated_user_plan_data, error: updated_user_plan_error } =
      await supabase
        .from("user_plans")
        .update({
          plan_authorizedUsers: newAuthorizedUsers,
          plan_InvitedUsers: newPlanInvitedUsers,
        })
        .select("*");

    if (updated_user_plan_error) {
      toast.error("Error accepting invite, please try again");
      return;
    }
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
