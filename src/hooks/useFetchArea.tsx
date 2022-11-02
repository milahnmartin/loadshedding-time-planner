import { useQuery } from "@tanstack/react-query";
import useDebounce from "./useDebounce";
const fetchAreaID = async (pArea: string) => {
  const areaData = await fetch(`/api/lsplannerId/${pArea}`);
  const jsonAreaData = await areaData.json();
  return jsonAreaData;
};

export default function useFetchArea(pArea: string) {
  return useQuery([`areaData`, useDebounce(pArea, 3000)], () => fetchAreaID(pArea), {
    refetchOnWindowFocus: false,
    enabled: pArea.length > 0,
  });
}
