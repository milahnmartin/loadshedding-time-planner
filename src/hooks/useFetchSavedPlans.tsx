import { useQuery } from "@tanstack/react-query";
import { auth } from "@utils/firebase-config";
import supabase from "@utils/supabase-config";
import Router from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
const fetchSavedPlans = async ({ queryKey }: any) => {
  const { data: UserDataInfo, error } = await supabase
    .from("user_plans")
    .select(
      `
      plan_id,plan_lsTimes,plan_authorizedUsers,user_id,plan_authorizedTeams,plan_createdAt
      `
    )
    .eq("user_id", queryKey[1]);

  const { data: InvitedPlans, error: InvitedPlansError } = await supabase
    .from("user_plans")
    .select(
      `
    plan_id,plan_lsTimes,plan_authorizedUsers,user_id,plan_authorizedTeams,plan_createdAt
    `
    )
    .contains("plan_authorizedUsers", JSON.stringify([queryKey[1]]));

  if (InvitedPlansError || error) {
    console.log(InvitedPlansError);
    toast.error("Error fetching plans");
    return;
  }
  if (InvitedPlans.length === 0 && UserDataInfo.length === 0) return [];
  return [...InvitedPlans, ...UserDataInfo];
};

export default function useFetchSavedPlans() {
  const [user, loading] = useAuthState(auth);
  if (!loading) {
    if (!user) {
      toast.error("You must be logged in to view this page");
      Router.push("/auth/login");
    }
  }
  return useQuery([`savedplans`, user?.uid], fetchSavedPlans, {
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 2,
    enabled: !loading && !!user,
  });
}
