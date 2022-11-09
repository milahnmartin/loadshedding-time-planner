import { useQuery } from "@tanstack/react-query";

const fetchUserInvites = async ({ queryKey }: any) => {};

const useFetchUserInvites = (userId: string) => {
  return useQuery(["userInvites", userId], () => fetchUserInvites);
};

export default useFetchUserInvites;
