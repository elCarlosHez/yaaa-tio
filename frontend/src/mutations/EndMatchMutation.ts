import { useMutation } from "react-query";
import { pb, queryClient } from "../lib";
import { Match } from "../types";
import { GET_MATCH_KEY } from "../queries";
import { GET_PRE_EXISTED_TEAMS_KEY } from "../queries/GetPreExistedTeams";

export const useEndMatch = () =>
  useMutation(
    async (data: Partial<Match>) => {
      return await pb.collection("matches").update(data.id!, {
        winner: data.winner,
        streak: data?.streak || 0,
        completed_at: new Date().toISOString(),
      });
    },
    {
      onSuccess: (_) => {
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === GET_MATCH_KEY,
        });
        queryClient.invalidateQueries({
          predicate: (query) =>
            query.queryKey[0] === GET_PRE_EXISTED_TEAMS_KEY,
        });
      },
    }
  );
