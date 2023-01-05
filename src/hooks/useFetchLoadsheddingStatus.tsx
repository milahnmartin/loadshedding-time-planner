import { useQuery } from "@tanstack/react-query";
function handleFetchLoadsheddingStatus() {
  return fetch("/api/sepush/status").then((stagesData: any) => stagesData.json());
}

function useFetchLoadsheddingStatus() {
  return useQuery(["loadsheddingstages"], handleFetchLoadsheddingStatus, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
  });
}

export default useFetchLoadsheddingStatus;
