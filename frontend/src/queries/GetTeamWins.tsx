import { useQuery } from "react-query";
import { pb } from "../lib";
import { Match } from "../types";
import { getTodayUTC } from "../utils/getTodayUTC";

export const GET_TEAM_WINS_KEY = "GET_TEAM_WINS_KEY";

export const useGetTeamWins = (
  player_1: string | undefined,
  player_2: string | undefined,
) =>
  useQuery({
    placeholderData: 0,
    queryKey: [GET_TEAM_WINS_KEY, player_1, player_2],
    queryFn: async () => {
      const [today, endOfDay] = getTodayUTC();
      const matches = await pb.collection("matches").getFullList<Match>({
        filter: `created >= "${today}" && created <= "${endOfDay}"`,
        sort: '-created',
      });
      let wins = 0;
      for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
        if (player_1 && player_2 && match.winner === 'red') {
          const redTeam = [match.red_striker, match.red_goal_keeper];
          if (
            redTeam.includes(player_1) && redTeam.includes(player_2)
          ) {
            wins += 1;
            continue;
          }
        }
        if (player_1 && player_2 && match.winner === 'blue') {
          const blueTeam = [match.blue_striker, match.blue_goal_keeper];
          if (
            blueTeam.includes(player_1) && blueTeam.includes(player_2)
          ) {
            wins += 1;
            continue;
          }
        }
        break;
      }
      // const wins = matches.reduce((winsCount, match) => {
      //   if (player_1 && player_2 && match.winner === 'red') {
      //     const redTeam = [match.red_striker, match.red_goal_keeper];
      //     if (
      //       redTeam.includes(player_1) && redTeam.includes(player_2)
      //     ) {
      //       return winsCount + 1;
      //     }
      //   }
      //   if (player_1 && player_2 && match.winner === 'blue') {
      //     const blueTeam = [match.blue_striker, match.blue_goal_keeper];
      //     if (
      //       blueTeam.includes(player_1) && blueTeam.includes(player_2)
      //     ) {
      //       return winsCount + 1;
      //     }
      //   }
      //   return 0;
      // }, 0);
      return wins;
    },
  });
