import { useMutation } from "@tanstack/react-query";
import supabase from "../utils/supabase-config";
type PostPlanArgs = {
  users: string[];
  planID: string;
};
const postPlanUsers = async (args: PostPlanArgs) => {
  if (!args.planID) return;
  const { data, error } = await supabase
    .from("user_plans")
    .update({
      plan_authorisedUsers: args.users as string[],
    })
    .eq("plan_id", args.planID);

  if (error) {
    throw new Error("An error occured while updating the plan");
  }
};

export default function usePostPlanUsers(users: string[], planID: string) {
  return useMutation([`postPlanUsers`, planID], () => postPlanUsers({ users, planID }));
}
