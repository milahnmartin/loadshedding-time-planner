import { useQuery } from "@tanstack/react-query";
import Router from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { auth } from "../utils/firebase-config";
import supabase from "../utils/supabase-config";
const fetchAreaFromSupabase = async ({ queryKey }: any) => {
  const { data, error } = await supabase
    .from("user_info")
    .select("user_sepushID")
    .eq("user_id", queryKey[1]);
  if (error) {
    toast.error("We were unable to fetch your saved area");
    return;
  }
  const { user_sepushID }: any = data[0];
  if (user_sepushID) {
    return user_sepushID;
  }

  return null;
};

export default function useFetchSavedArea() {
  const [user, loading] = useAuthState(auth);
  if (!loading) {
    if (!user) {
      toast.error("You must be logged in to view this page");
      Router.push("/auth/login");
    }
  }
  return useQuery([`savedAreaData`, user?.uid], fetchAreaFromSupabase, {
    refetchOnWindowFocus: true,
    staleTime: Infinity,
    enabled: user?.uid ? true : false,
  });
}
