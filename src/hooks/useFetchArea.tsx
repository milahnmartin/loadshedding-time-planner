import useDebounce from "@hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import { analytics } from "@utils/firebase-config";
import { logEvent } from "firebase/analytics";
const fetchAreaID = async ({ queryKey }: any) => {
  logEvent(analytics, "area_search", {
    area: queryKey[1],
  });
  const areaData = await fetch(`/api/lsplannerId/${queryKey[1]}`);
  const jsonAreaData = await areaData.json();
  return jsonAreaData;
};

export default function useFetchArea(pArea: string) {
  const myDebounce = useDebounce(pArea, 2000);
  return useQuery([`areaData`, myDebounce], fetchAreaID, {
    refetchOnWindowFocus: false,
    enabled: typeof myDebounce === "string" && myDebounce.length > 0,
    staleTime: Infinity,
    cacheTime: 1000 * 60 * 60,
  });
}
