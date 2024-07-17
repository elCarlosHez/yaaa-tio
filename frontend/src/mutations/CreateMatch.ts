import { useMutation } from "react-query";
import { pb } from "../lib";
import { MatchesBody } from "../types";

export const useCreateMatch = () =>
  useMutation(async (data: MatchesBody) => {
    return await pb.collection("matches").create(data);
  });
