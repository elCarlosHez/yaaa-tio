import { useQuery } from "react-query";
import { pb } from "../lib";
import { Match, TeamPlayerStat, User } from "../types";

export const GET_USER_STATS_KEY = "GET_USER_STATS_KEY";

export const useGetUserStats = () =>
  useQuery({
    queryKey: [GET_USER_STATS_KEY],
    queryFn: async () => {
      const user = pb.authStore.model;
      // Calculate user matches
      const matches = await pb.collection("matches").getFullList<Match>({
        filter: `(red_goal_keeper = "${user!.id}" || red_striker = "${
          user!.id
        }" || blue_goal_keeper = "${user!.id}" || blue_striker = "${
          user!.id
        }") && winner != null`,
        sort: "-created",
      });
      // Get User goals
      const goals = await pb.collection("goals").getFullList<Match>({
        filter: `scorer = "${user!.id}" && type = "goal"`,
      });
      const ownGoals = await pb.collection("goals").getFullList<Match>({
        filter: `scorer = "${user!.id}" && type = "own-goal"`,
      });
      // Get number of time user played as striker and goalkeeper
      const numberOfStriker = matches.filter(
        (match) =>
          match.red_striker === user!.id || match.blue_striker === user!.id
      ).length;
      const numberOfGoalkeeper = matches.filter(
        (match) =>
          match.red_goal_keeper === user!.id ||
          match.blue_goal_keeper === user!.id
      ).length;
      // Get total wins
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
      // Get wins by each team player
      const users = await pb.collection("users").getFullList<User>({
        orderBy: "username",
      });
      const teamPlayers = users.filter(
        (user) => user.id != pb.authStore.model?.id
      );
      const matchesByTeamPlayer = teamPlayers.reduce(
        (matchesByPlayer, teamPlayer) => {
          const listOfMatches = matches.filter((match) => {
            if (
              match.red_striker === user!.id ||
              match.red_goal_keeper === user!.id
            ) {
              return (
                match.red_striker === teamPlayer!.id ||
                match.red_goal_keeper === teamPlayer!.id
              );
            }
            if (
              match.blue_striker === user!.id ||
              match.blue_goal_keeper === user!.id
            ) {
              return (
                match.blue_striker === teamPlayer!.id ||
                match.blue_goal_keeper === teamPlayer!.id
              );
            }
            return false;
          });
          const numberOfWins = listOfMatches.filter((match) => {
            if (match.winner === "red") {
              return (
                match.red_striker === user!.id ||
                match.red_goal_keeper === user!.id
              );
            }
            if (match.winner === "blue") {
              return (
                match.blue_striker === user!.id ||
                match.blue_goal_keeper === user!.id
              );
            }
            return false;
          });
          const numberPlayerAsStriker = listOfMatches.filter((match) => {
            if (
              match.red_striker === teamPlayer!.id ||
              match.blue_striker === teamPlayer!.id
            ) {
              return true;
            }
            return false;
          });
          const numberPlayerAsGoalkeeper = listOfMatches.filter((match) => {
            if (
              match.red_goal_keeper === teamPlayer!.id ||
              match.blue_goal_keeper === teamPlayer!.id
            ) {
              return true;
            }
            return false;
          });
          return [
            ...matchesByPlayer,
            {
              player: teamPlayer,
              matches: listOfMatches,
              wins: numberOfWins.length,
              winRate: (numberOfWins.length / listOfMatches.length) * 100,
              striker: numberPlayerAsStriker.length,
              goalkeeper: numberPlayerAsGoalkeeper.length,
            },
          ];
        },
        [] as TeamPlayerStat[]
      );

      return {
        striker: numberOfStriker,
        goalkeeper: numberOfGoalkeeper,
        totalMatches: matches.length,
        mainPosition:
          numberOfStriker > numberOfGoalkeeper ? "striker" : "goalkeeper",
        wins: totalWins,
        goals: goals.length,
        ownGoals: ownGoals.length,
        winRate: (totalWins / matches.length) * 100,
        matches,
        matchesByTeamPlayer,
      };
    },
    enabled: !!pb.authStore.model?.id,
  });
