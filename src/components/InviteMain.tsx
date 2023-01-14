import useFetchUserInvites from "@hooks/useFetchUserInvites";
import { Player } from "@lottiefiles/react-lottie-player";
import { IInviteData } from "@lstypes/types";
import { useQueryClient } from "@tanstack/react-query";
import { auth } from "@utils/firebase-config";
import supabase from "@utils/supabase-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import InviteLabel from "./labels/InviteLabel";
const InviteMain = () => {
  const queryClient = useQueryClient();
  const [user, loading] = useAuthState(auth);
  const {
    data: inviteData,
    isLoading: inviteLoading,
    isFetching: inviteFetching,
    refetch: refetchInvites,
  } = useFetchUserInvites(user?.uid!);

  // todo - plan_InvitedData needs to be updated for both decline and accept

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

    return removeError ? false : true;
  };

  const handleDeclinceInvite = async (plan_id: string) => {
    if (!plan_id) {
      toast.error("Could not decline invite");
      return;
    }
    const removeAcceptedPlanStatus = await handleRemoveAcceptedPlan(plan_id, inviteData);

    const { data: user_plan_data, error: user_plan_error } = await supabase
      .from("user_plans")
      .select(`plan_authorizedUsers,plan_authorizedTeams,plan_InvitedData`)
      .eq(`plan_id`, plan_id);
    if (user_plan_error) {
      console.log(user_plan_error);
      return;
    }
    if (!user_plan_data[0]) {
      toast.error("Plan was possibly deleted, we removed it for you...");
      await refetchInvites();
      return;
    }
    const { plan_InvitedData } = user_plan_data[0] as any;
    const { error: removeInviteFromPlan } = await supabase
      .from("user_plans")
      .update({
        plan_InvitedData: plan_InvitedData.filter((invite: string) => {
          return invite !== user?.uid;
        }),
      })
      .eq(`plan_id`, plan_id);

    if (removeAcceptedPlanStatus && !removeInviteFromPlan) {
      toast.success("Invite declined");
      await refetchInvites();
      return;
    }

    toast.error("Could not decline invite");
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
    if (!user_plan_data[0]) {
      const { error: RemoveInvitePlan } = await supabase
        .from("user_info")
        .update({
          user_plan_Invites: inviteData.filter(
            (invite: IInviteData) => invite.plan_id !== plan_id
          ),
        })
        .eq("user_id", user?.uid);
      toast.error("Plan was possibly deleted, we removed it for you...");
      await refetchInvites();
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
      queryClient.invalidateQueries({ queryKey: ["savedplans"] });
      await refetchInvites();
      return;
    }
    toast.error("Could not accept invite");
  };
  return (
    <div className='flex min-h-[90vh] max-h-fit w-full flex-wrap content-center items-center justify-center overflow-y-scroll gap-2 py-4'>
      {inviteFetching && (
        <Player
          src='https://assets2.lottiefiles.com/private_files/lf30_3vhjjbex.json'
          className='player w-[30%] h-[30%] '
          autoplay
          loop
          speed={0.5}
        />
      )}
      {inviteData &&
        inviteData.length > 0 &&
        inviteData.map((invite: IInviteData) => (
          <InviteLabel
            key={invite.plan_id}
            data={invite}
            cbAccept={handleInviteAccept}
            cbDecline={handleDeclinceInvite}
          />
        ))}
      {!inviteFetching && inviteData.length === 0 && (
        <div className='rounded-xl w-[20rem] h-fit bg-gradient-to-r p-[3px] from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]'>
          <div className='flex flex-col h-full w-full bg-slate-800 text-white rounded-lg'>
            <span className='flex flex-col items-center w-full h-fit pt-2'>
              <Player
                src='https://assets3.lottiefiles.com/private_files/lf30_17bvu2tk.json'
                className='player w-[110px] h-[110px] '
                autoplay
                loop
                speed={0.5}
              />
              <h1 className='text-2xl font-bold pb-4'>NO INVITES</h1>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default InviteMain;
