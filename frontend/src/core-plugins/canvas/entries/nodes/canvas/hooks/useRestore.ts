import { useEffect } from "react";
import { useApi } from "../definition";

export const useRestore = () => {
  const api = useApi();

  useEffect(() => {
    api.restore();
  }, [api]);
};
