import { useQuery } from "@tanstack/react-query";
import Router from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { auth } from "../utils/firebase-config";
import supabase from "../utils/supabase-config";
const fetchUserTimesViaAPI = async (AreaID: string, date: string) => {
  if (!AreaID || !date) return;
  const fetchedData = await fetch(`/api/${date}/${AreaID}`);
  const JSONDATA = await fetchedData.json();
  return JSONDATA;
};
const fetchUserAreaData = async ({ queryKey }: any) => {
  const { data, error } = await supabase
    .from("user_info")
    .select("user_sepushID")
    .or(`user_id.eq.${queryKey[1]},user_email.eq.${queryKey[1]}`);
  if (error) {
    toast.error("We were unable to fetch your saved area");
    return;
  }
  const { user_sepushID }: any = data[0];
  if (user_sepushID) {
    const sepushAPIDATA = await fetchUserTimesViaAPI(user_sepushID, queryKey[1]);
    return sepushAPIDATA;
  }

  return null;
};

export default function useFetchUserDataplans(date: string, userID: string) {
  const [user, loading] = useAuthState(auth);
  if (!loading) {
    if (!user) {
      toast.error("You must be logged in to view this page");
      Router.push("/auth/login");
    }
  }
  return useQuery([`userAreaData`, date, userID], () => fetchUserAreaData, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}
