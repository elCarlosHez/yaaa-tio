import { User } from "./User";

export interface Collection<T> {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: T[];
}

export interface MatchesBody {
  red_goal_keeper: User;
  red_striker: User;
  blue_goal_keeper: User;
  blue_striker: User;
}

export interface Match { 
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  red_goal_keeper: string;
  red_striker: string;
  blue_goal_keeper: string;
  blue_striker: string;
}

export interface Goal {
  id?: string;
  match: string;
  scorer: string;
  scorer_position: "goal_keeper" | "striker";
  goal_keeper: string;
  team: "red" | "blue";
  type: 'goal' | 'own-goal';
  created?: string;
  updated?: string;
  expand?: {
    scorer: User;
  }
}
