import { useMutation } from "react-query";
import { pb, queryClient } from "../lib";
import { Goal } from "../types";
import { GET_MATCH_GOALS_KEY } from "../queries";

export const useCreateGoal = () =>
  useMutation(
    async (data: Goal) => {
      return await pb.collection("goals").create(data);
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: [GET_MATCH_GOALS_KEY, variables.match]
        });
      },
    }
  );
