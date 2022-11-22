import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import supabase from "../utils/supabase-config";

const handleFetchUserData = async (
  user_id: string,
  lstimes: string[],
  setlstimes: Function
) => {
  if (!user_id[1]) return null;
  const { data, error } = await supabase
    .from("user_info")
    .select("user_sepushID->id")
    .or(`user_id.eq.${user_id[1]},user_email.eq.${user_id[1].toLowerCase()}`);
  if (error) {
    toast.error("Error Occured When trying to fetch user data");
    return null;
  }
  if (data.length === 0) {
    toast.warning("No user found with that email or id");
    return [];
  }

  const { id }: any = data[0];

  if (!id) {
    toast.warning("User has not linked Their Area In Profile Settings");
    return null;
  }

  const response = await fetch(`/api/sepush/${id}`).then((res) => res.json());
  setlstimes(response);
  return response;
};

function useFetchUserData(
  user_id: string,
  state_current_times: string[],
  setting_new_times: Function
) {
  return useQuery(
    ["fetchedUserEskomSePush", user_id],
    () => handleFetchUserData(user_id, state_current_times, setting_new_times),
    {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      enabled: !!user_id,
    }
  );
}

export default useFetchUserData;
