import { useQuery } from "react-query";
import { pb } from "../lib";

export const GET_AUTH_METHODS = "GET_AUTH_METHODS";

export const useGetAuthMethods = () =>
  useQuery(
    [GET_AUTH_METHODS],
    async () => {
      return await pb.collection('users').listAuthMethods();
    },
    {
      enabled: !!pb,
    }
  );
