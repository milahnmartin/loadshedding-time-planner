import { useQuery } from "@tanstack/react-query";
import Router from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { auth } from "../utils/firebase-config";
import supabase from "../utils/supabase-config";
const fetchSavedPlans = async ({ queryKey }: any) => {
  const { data: UserDataInfo } = await supabase
    .from("user_plans")
    .select(
      `
      plan_id,plan_lsTimes,plan_authorizedUsers,plan_authorizedTeams,plan_createdAt
      `
    )
    .eq("user_id", queryKey[1]);

  if (UserDataInfo?.length == 0) {
    return [];
  }
  return UserDataInfo;
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
    staleTime: 180000,
    enabled: !loading && !!user,
  });
}
