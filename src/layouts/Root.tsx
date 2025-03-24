import  { useEffect } from "react";
import { self } from "../http/api";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store";
import { Outlet } from "react-router";
import { AxiosError } from "axios";

export default function Root() {
  const getself = async () => {
    const data = await self();
    return data;
  };

  const { setUser } = useAuthStore();
  const { data } = useQuery({
    queryKey: ["self"],
    queryFn: getself,
    retry: (failurCount: number, error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        return false;
      }
      return failurCount < 3
    },
  });
  useEffect(() => {
    if (data?.data) {
      setUser(data?.data);
    }
  }, [data, setUser]);

  return (
    <div>
      <Outlet />
    </div>
  );
}
