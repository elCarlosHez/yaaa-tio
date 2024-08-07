import { useMutation } from "react-query";
import { pb, queryClient } from "../lib";
import { GET_MATCH_KEY } from "../queries";

export const useDeleteMatch = () =>
  useMutation(
    async (matchId: string) => {
      if (!matchId) {
        throw new Error('Match id not found');
      }
      return await pb.collection("matches").delete(matchId);
    },
    {
      onSuccess: (_, matchId) => {
        queryClient.invalidateQueries({
          queryKey: [GET_MATCH_KEY, matchId],
        });
      },
    }
  );
