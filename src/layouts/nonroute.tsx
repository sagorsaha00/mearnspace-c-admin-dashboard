import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store";

export default function Nonroute() {
  const { user } = useAuthStore();
  if (user !== null) {
    return <Navigate to={"/"} replace={true} />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
}
