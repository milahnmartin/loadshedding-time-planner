import axios from "axios";
import { useEffect, useState } from "react";
import type { IuseFetch } from "../types/types";
function useFetch({ endpoint }: { endpoint: string }): IuseFetch {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(endpoint);
      setData(response.data);
      setLoading(false);
    }

    fetchData();
  }, [endpoint]);

  return { data, loading };
}

export default useFetch;
