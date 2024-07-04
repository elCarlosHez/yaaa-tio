import { User } from "./User";

export type GoalsType = 'goal' | 'own-goal';

export type Positions = 'Goalkeeper' | 'Striker';

export interface Match {
    id: number;
    team_red: User[];
    team_blue: User[];
    created_at: string;
}
