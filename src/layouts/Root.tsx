import React, { useEffect } from "react";
import { self } from "../http/api";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store";
import { Outlet } from "react-router";

export default function Root() {
  const getself = async () => {
    const data = await self();
    return data;
  };

  const { setUser } = useAuthStore();
  const { data } = useQuery({
    queryKey: ["self"],
    queryFn: getself,
  });
  useEffect(() => {
    console.log(data);
    if(  data?.data) {
      setUser(data?.data)
    }
  }, [data,setUser,]);

  return <div>Root file
    <Outlet/> 
  </div>;
}
