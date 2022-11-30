import useFetchUserInvites from "@hooks/useFetchUserInvites";
import { IInviteData } from "@lstypes/types";
import { auth } from "@utils/firebase-config";
import supabase from "@utils/supabase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import InviteLabel from "./labels/InviteLabel";
const InviteMain = () => {
  const [user, loading] = useAuthState(auth);
  const {
    data: inviteData,
    isLoading: inviteLoading,
    refetch: refetchInvites,
  } = useFetchUserInvites();

  const handleRemoveAcceptedPlan = async (
    plan_id: string,
    old_plan_invites: IInviteData[]
  ): Promise<boolean> => {
    if (!plan_id) {
      return false;
    }
    const oldInvites = old_plan_invites.filter((invite: IInviteData) => {
      return invite.plan_id !== plan_id;
    });
    const { error: removeError } = await supabase
      .from("user_info")
      .update({ user_plan_Invites: oldInvites })
      .eq("user_id", user?.uid);

    if (removeError) {
      return false;
    }

    return true;
  };
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

    const removePlanStatus = await handleRemoveAcceptedPlan(plan_id, inviteData);
    if (removePlanStatus && !updatedUserPlanError) {
      toast.success("Invite Accepted");
      await refetchInvites();
      return;
    }
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
