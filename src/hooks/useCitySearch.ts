import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export function useCitySearch(query: string | null) {
  return useQuery({
    queryKey: [query],
    queryFn: async () => {
      try {
        const res = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5`
        );
        return res.data.results;
      } catch (err) {
        const error = err as Error;
        toast.error(error.message, {
          duration: Infinity,
          closeButton: true,
        });
        throw error;
      }
    },
    enabled: !!query,
    retry: false,
  });
}
