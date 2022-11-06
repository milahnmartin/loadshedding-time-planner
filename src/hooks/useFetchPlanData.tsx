import { useQuery } from "@tanstack/react-query";
import Router from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { auth } from "../utils/firebase-config";
import supabase from "../utils/supabase-config";
const fetchPlanData = async ({ queryKey }: any) => {
  const { data, error } = await supabase
    .from("user_plans")
    .select(
      `plan_lsTimes,plan_authorizedUsers,user_id,plan_authorizedTeams,plan_createdAt`
    )
    .eq("plan_id", queryKey[1]);
  if (error) {
    toast.error("We were unable to fetch your saved area");
    return;
  }

  if (data?.length === 0) {
    Router.push("/plans");
    toast.warning("LMAO");
  }

  return data[0];
};

export default function useFetchPlanData(planID: string) {
  const [user, loading] = useAuthState(auth);
  if (!loading) {
    if (!user) {
      toast.error("You must be logged in to view this page");
      Router.push("/auth/login");
    }
  }
  return useQuery([`specificPlan`, planID], fetchPlanData, {
    refetchOnWindowFocus: true,
    staleTime: 120000,
    retry: 0,
    enabled: !!planID && !loading,
  });
}
