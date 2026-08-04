import { useMutation } from "@tanstack/react-query";
import { useApi } from "../definition";

export const useSave = () => {
  const api = useApi();

  return useMutation({
    mutationFn: () => api.save(),

    onError: (error) => console.log(error),
  });
};
