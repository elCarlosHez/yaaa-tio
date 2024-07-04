import { useQuery } from "react-query";
import { pb } from "../lib";
import { Collection, User } from "../types";

export const GET_USERS_KEY = "GET_USERS";

export const useGetUsers = () =>
  useQuery(GET_USERS_KEY, async () => {
    return await pb.collection("users").getFullList<User>();
  });
