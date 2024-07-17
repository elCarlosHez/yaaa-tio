import { useMutation } from "react-query";
import { pb, queryClient } from "../lib";
import { GET_MATCH_GOALS_KEY } from "../queries";
import { Goal } from "../types";

export const useDeleteGoal = () =>
  useMutation(
    async (goal: Goal) => {
      if (!goal?.id) {
        throw new Error('Goal id not found');
      }
      return await pb.collection("goals").delete(goal.id);
    },
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: [GET_MATCH_GOALS_KEY, variables.match],
        });
      },
    }
  );
