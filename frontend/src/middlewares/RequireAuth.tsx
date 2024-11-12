import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { pb } from "../lib";
import { useEffect } from "react";

export const RequireAuth = () => {
  const { isAuthRecord, isValid } = pb.authStore;
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthRecord || !isValid) {
      navigate('/', {
        state:  location,
        replace: true
      });
    }
  },[isAuthRecord])

  return <Outlet />;
};
