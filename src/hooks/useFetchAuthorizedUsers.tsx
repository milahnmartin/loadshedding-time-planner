import { useQuery } from "@tanstack/react-query";
import supabase from "@utils/supabase-config";
import { toast } from "react-toastify";
const handleFetchAuthedUserLSTimes = async (pUsers: string[]) => {
  const { data, error } = await supabase
    .from("user_info")
    .select("user_id,user_weekLSTimes")
    .contains("user_email", pUsers);
  if (error) {
    toast.error("Error fetching authorized users");
    return;
  }
  console.log(data);
  return data;
};

export default function useFetchAuthorizedUsers(aUsers: string[]) {
  if (!aUsers) {
    toast.error("OOPS LOL");
    return {
      data: null,
      error: null,
      isLoading: false,
      isFetching: false,
    };
  }
  return useQuery(["authedUserLSTimes"], () => handleFetchAuthedUserLSTimes(aUsers), {
    refetchOnWindowFocus: false,
    enabled: !!aUsers,
  });
}
