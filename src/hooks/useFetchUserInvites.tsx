import { useQuery } from "@tanstack/react-query";
import { auth } from "@utils/firebase-config";
import supabase from "@utils/supabase-config";
import Router from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
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

export default function useFetchUserInvites() {
  const [user, loading] = useAuthState(auth);
  if (!loading) {
    if (!user) {
      toast.error("You must be logged in to view this page");
      Router.push("/auth/login");
    }
  }
  return useQuery(["userInvites", user?.uid], fetchUserInvites, {
    refetchOnWindowFocus: true,
    enabled: !loading && !!user,
    staleTime: 1000 * 60 * 1,
  });
}
