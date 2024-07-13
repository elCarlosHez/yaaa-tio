import { useMutation } from "react-query";
import { pb } from "../lib";
import { MatchesBody } from "../types";

export const useCreateMatch = () =>
  useMutation(async (data: MatchesBody) => {
    return await pb.collection("matches").create({
      red_goal_keeper: data.red_goal_keeper.id,
      red_striker: data.red_striker.id,
      blue_goal_keeper: data.blue_goal_keeper.id,
      blue_striker: data.blue_striker.id,
    });
  });
