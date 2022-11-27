import { useQuery } from "@tanstack/react-query";
import Router from "next/router";
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

  return data[0];
};

export default function useFetchPlanData(planID: string) {
  return useQuery(["specificPlan", planID], fetchPlanData, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
    enabled: !!planID,
  });
}
