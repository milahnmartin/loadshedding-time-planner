import { useQuery } from "@tanstack/react-query";
import { auth } from "@utils/firebase-config";
import Router from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import supabase from "../utils/supabase-config";
const fetchPlanData = async ({ queryKey }: any) => {
  console.log(`FETCHING PLAN DATA FOR ${queryKey[1]}`);
  const { data, error } = await supabase
    .from("user_plans")
    .select(
      `plan_lsTimes,plan_authorizedUsers,plan_InvitedData,user_id,plan_authorizedTeams,plan_createdAt`
    )
    .eq("plan_id", queryKey[1]);

  if (error || !data || data.length === 0) {
    toast.error("Plan not found, redirecting to plans...");
    Router.push("/plans");
    return null;
  }

  const { user_id, plan_authorizedUsers }: any = data[0];

  if (user_id !== queryKey[2] && !plan_authorizedUsers.includes(queryKey[2])) {
    toast.error("You are not authorized to view this plan");
    Router.push("/plans");
  }

  return data[0];
};

export default function useFetchPlanData(planID: string) {
  const [user, loading] = useAuthState(auth);
  if (!loading) {
    if (!user) {
      Router.push("/auth/login");
      toast.warning("You need to be logged in to view this page");
    }
  }
  return useQuery(["specificPlan", planID, user?.uid], fetchPlanData, {
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 5,
    enabled: !!planID && !!user?.uid,
  });
}
