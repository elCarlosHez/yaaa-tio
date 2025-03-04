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
        
        // Helper function to check if a team combination exists
        const isTeamExists = (striker: string, goalkeeper: string) => {
          return prevTeams.some(team => 
            (team.striker === striker && team.goalkeeper === goalkeeper) ||
            (team.striker === goalkeeper && team.goalkeeper === striker)
          );
        };

        // Helper function to check if a player is selected
        const isPlayerSelected = (player: string) => {
          return player === player_1 || player === player_2;
        };

        // Check red team
        const redStriker = match.red_striker;
        const redGoalkeeper = match.red_goal_keeper;
        if (!isPlayerSelected(redStriker) && 
            !isPlayerSelected(redGoalkeeper) && 
            !isTeamExists(redStriker, redGoalkeeper)) {
          newTeams.push({
            striker: redStriker,
            goalkeeper: redGoalkeeper,
          });
        }

        // Check blue team
        const blueStriker = match.blue_striker;
        const blueGoalkeeper = match.blue_goal_keeper;
        if (!isPlayerSelected(blueStriker) && 
            !isPlayerSelected(blueGoalkeeper) && 
            !isTeamExists(blueStriker, blueGoalkeeper)) {
          newTeams.push({
            striker: blueStriker,
            goalkeeper: blueGoalkeeper,
          });
        }

        return newTeams;
      }, [] as { striker: string; goalkeeper: string }[]);
      
      return teams;
    },
  });
