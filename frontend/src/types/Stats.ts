import { Match } from "./Api"
import { User } from "./User"

export interface TeamPlayerStat {
    player: User;
    matches: Match[];
    wins: number;
    winRate: number;
    striker: number;
    goalkeeper: number;
}
