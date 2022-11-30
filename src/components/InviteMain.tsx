import useFetchUserInvites from "@hooks/useFetchUserInvites";
import { IInviteData } from "@lstypes/types";
import { auth } from "@utils/firebase-config";
import supabase from "@utils/supabase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import InviteLabel from "./labels/InviteLabel";
const InviteMain = () => {
  const [user, loading] = useAuthState(auth);
  const { data: inviteData, isLoading: inviteLoading } = useFetchUserInvites();
  const handleInviteAccept = async (plan_id: string) => {
    if (!plan_id) {
      toast.error("Could not accept invite");
      return;
    }
    const { data: user_plan_data, error: user_plan_error } = await supabase
      .from("user_plans")
      .select(`plan_authorizedUsers,plan_authorizedTeams,plan_InvitedData`)
      .eq(`plan_id`, plan_id);
    if (user_plan_error) {
      console.log(user_plan_error);
      return;
    }
    const { plan_authorizedUsers, plan_authorizeTeams, plan_InvitedData }: any =
      user_plan_data[0];
    const oldInvitedUsers = plan_InvitedData.filter(
      (invite: string) => invite !== user?.uid
    );
    const { error: updatedUserPlanError } = await supabase
      .from("user_plans")
      .update({
        plan_InvitedData: oldInvitedUsers,
        plan_authorizedUsers: [...plan_authorizedUsers, user?.uid],
      })
      .eq(`plan_id`, plan_id);

    if (!updatedUserPlanError) {
      toast.success("Invite accepted");
      return;
    }
    console.log(updatedUserPlanError);
    toast.error("Could not accept invite");
  };
  return (
    <div className='h-[90%] w-full border-2 p-2 flex'>
      {inviteLoading && <p>Loading...</p>}
      {inviteData &&
        inviteData.length > 0 &&
        inviteData.map((invite: IInviteData) => (
          <InviteLabel
            key={invite.plan_id}
            data={invite}
            cbAccept={handleInviteAccept}
            cbDecline={handleInviteAccept}
          />
        ))}
      {inviteData && inviteData.length === 0 && <p>No Invites</p>}
    </div>
  );
};

export default InviteMain;
