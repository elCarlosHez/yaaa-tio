import { useQuery } from "react-query";
import { pb } from "../lib";
import { Match } from "../types";

export const GET_MAIN_POSITION_KEY = "GET_MAIN_POSITION_KEY";

export const useGetMainPosition = () =>
  useQuery({
    queryKey: [GET_MAIN_POSITION_KEY],
    queryFn: async () => {
      const user = pb.authStore.model;
      const matches = await pb.collection("matches").getFullList<Match>({
        filter: `(red_goal_keeper = "${user!.id}" || red_striker = "${
          user!.id
        }" || blue_goal_keeper = "${user!.id}" || blue_striker = "${
          user!.id
        }") && winner != null`,
        sort: "-created",
      });
      const goals = await pb.collection("goals").getFullList<Match>({
        filter: `scorer = "${user!.id}"`,
      });
      const numberOfStriker = matches.filter(
        (match) =>
          match.red_striker === user!.id || match.blue_striker === user!.id
      ).length;
      const numberOfGoalkeeper = matches.filter(
        (match) =>
          match.red_goal_keeper === user!.id ||
          match.blue_goal_keeper === user!.id
      ).length;
      const totalWins = matches.reduce((countWins, match) => {
        if (
          (match.winner === "red" && match.red_striker === user!.id) ||
          match.red_goal_keeper === user!.id
        ) {
          return countWins + 1;
        }
        if (
          (match.winner === "blue" && match.blue_striker === user!.id) ||
          match.blue_goal_keeper === user!.id
        ) {
          return countWins + 1;
        }
        return countWins;
      }, 0);
      return {
        striker: numberOfStriker,
        goalkeeper: numberOfGoalkeeper,
        totalMatches: matches.length,
        mainPosition:
          numberOfStriker > numberOfGoalkeeper ? "striker" : "goalkeeper",
        wins: totalWins,
        goals: goals.length,
        winRate: (totalWins / matches.length) * 100,
        matches,
      };
    },
    enabled: !!pb.authStore.model?.id,
  });
