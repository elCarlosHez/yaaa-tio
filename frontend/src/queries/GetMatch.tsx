import { useQuery } from "react-query";
import { pb } from "../lib";
import { Match } from "../types";

export const GET_MATCH_KEY = "GET_MATCH";

export const useGetMatch = (matchId: string | undefined) =>
  useQuery(
    [GET_MATCH_KEY, matchId],
    async () => {
      if(matchId) {
        return await pb.collection("matches").getOne<Match>(matchId || "");
      }
      return Promise.resolve(undefined);
    }
  );
