import { useQuery } from "react-query";
import { pb } from "../lib";
import { Match } from "../types";
import { getTodayUTC } from "../utils/getTodayUTC";

export const GET_PRE_EXISTED_TEAMS_KEY = "GET_PRE_EXISTED_TEAMS_KEY";

export const useGetPreExistedTeams = (player_1?: string, player_2?: string) =>
  useQuery({
    placeholderData: [],
    queryKey: [GET_PRE_EXISTED_TEAMS_KEY, player_1, player_2],
    queryFn: async () => {
      const [today, endOfDay] = getTodayUTC();
      const matches = await pb.collection("matches").getFullList<Match>({
        filter: `created >= "${today}" && created <= "${endOfDay}"`,
      });
      const teams = matches.reduce((prevTeams, match) => {
        let newTeams = [...prevTeams];
        if (
          match.red_striker !== player_1 &&
          match.red_goal_keeper !== player_2 &&
          !prevTeams.some(
            (team) =>
              team.striker === match.red_striker &&
              team.goalkeeper === match.red_goal_keeper
          )
        ) {
          newTeams = [
            ...newTeams,
            {
              striker: match.red_striker,
              goalkeeper: match.red_goal_keeper,
            },
          ];
        }
        if (
          match.blue_striker !== player_1 &&
          match.blue_goal_keeper !== player_2 &&
          !prevTeams.some(
            (team) =>
              team.striker === match.blue_striker &&
              team.goalkeeper === match.blue_goal_keeper
          )
        ) {
          newTeams = [
            ...newTeams,
            {
              striker: match.blue_striker,
              goalkeeper: match.blue_goal_keeper,
            },
          ];
        }
        return newTeams;
      }, [] as { striker: string; goalkeeper: string }[]);
      return teams;
    },
  });
