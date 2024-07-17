import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { pb } from "../lib";
import { useEffect } from "react";

export const RequireAuth = () => {
  const { isAuthRecord } = pb.authStore;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthRecord) {
      navigate('/', {
        state:  location,
        replace: true
      });
    }
  },[isAuthRecord])

  return <Outlet />;
};
