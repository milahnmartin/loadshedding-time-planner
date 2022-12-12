import { useQuery } from "@tanstack/react-query";
import supabase from "@utils/supabase-config";
import { toast } from "react-toastify";
const fetchUserInvites = async ({ queryKey }: any) => {
  const { data: invitedPlanData, error } = await supabase
    .from("user_info")
    .select(`user_plan_Invites`)
    .eq("user_id", queryKey[1]);

  if (error) {
    toast.error("Error Occured When trying to fetch saved plans");
    console.log(error);
    return [];
  }

  if (invitedPlanData?.length == 0) {
    return [];
  }
  return invitedPlanData[0]?.user_plan_Invites;
};

export default function useFetchUserInvites(userID: string) {
  return useQuery(["userInvites", userID], fetchUserInvites, {
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 1,
    enabled: userID ? true : false,
  });
}
