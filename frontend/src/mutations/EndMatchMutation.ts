import { useMutation } from "react-query";
import { pb, queryClient } from "../lib";
import { Match } from "../types";
import { GET_MATCH_KEY } from "../queries";

export const useEndMatch = () =>
  useMutation(
    async (data: Partial<Match>) => {
      return await pb.collection("matches").update(data.id!, {
        winner: data.winner,
        completed_at: new Date().toISOString(),
      });
    },
    {
      onSuccess: (_, variables) =>
        queryClient.invalidateQueries([[GET_MATCH_KEY, variables.id]]),
    }
  );
