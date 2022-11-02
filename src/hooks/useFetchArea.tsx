import { useQuery } from "@tanstack/react-query";
import useDebounce from "./useDebounce";
const fetchAreaID = async (pArea: string) => {
  const areaData = await fetch(`/api/lsplannerId/${pArea}`);
  const jsonAreaData = await areaData.json();
  return jsonAreaData;
};

export default function useFetchArea(pArea: string) {
  const myDebounce = useDebounce(pArea, 2000);
  return useQuery([`areaData`, myDebounce], () => fetchAreaID(pArea), {
    refetchOnWindowFocus: false,
    enabled: myDebounce.length > 0,
  });
}
