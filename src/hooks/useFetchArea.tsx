import { useQuery } from "@tanstack/react-query";
import useDebounce from "./useDebounce";
const fetchAreaID = async ({ queryKey }: any) => {
  const areaData = await fetch(`/api/lsplannerId/${queryKey[1]}`);
  const jsonAreaData = await areaData.json();
  return jsonAreaData;
};

export default function useFetchArea(pArea: string) {
  const myDebounce = useDebounce(pArea, 2000);
  return useQuery([`areaData`, myDebounce], fetchAreaID, {
    refetchOnWindowFocus: false,
    enabled: myDebounce.length > 0,
    staleTime: Infinity,
  });
}
