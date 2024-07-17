import { useQuery } from "react-query";
import { pb } from "../lib";
import { Goal } from "../types";

export const GET_MATCH_GOALS_KEY = "GET_MATCH_GOALS";

export const useGetMatchGoals = (matchId: string | undefined) =>
  useQuery(
    [GET_MATCH_GOALS_KEY, matchId],
    async () => {
      const goals = await pb.collection("goals").getFullList<Goal>({
        filter: pb.filter(`match = '${matchId}'`),
        expand: 'scorer, match',
        sort: '-created',
      });
      return goals;
    },
    {
      enabled: !!matchId,
    }
  );
