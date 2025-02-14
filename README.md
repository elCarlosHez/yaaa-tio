1. `cd backend`
1. `./pocketbase serve`


### Notes

If you run `npm run build`, the output directory will point to pb_bublic in the backend folder.

### ER Diagram Ver. 2

```mermaid
---
title: Futbolito DB
---
erDiagram
  users {
    uuid id PK
    string email
    string name 
    bool active
  }
  matches {
    uuid id PK
    time created "start_time"
    time completed_at "NULL"
    int goals_blue "NULL"
    int goals_red "NULL"
    int event_count
  }
  teams {
    uuid id PK
    uuid match_id FK 
    date created "switch_time"
    uuid striker_id FK 
    uuid keeper_id FK 
    string color "blue|red"
    int event_number
  }
  goals {
    uuid id PK
    uuid match_id FK
    uuid team_id FK 
    uuid kickoff_id FK 
    time created "goal_time" 
    uuid scorer_id FK
    string trick
    bool own_goal
    int event_number
  }
  kickoffs {
    uuid id PK
    uuid match_id FK
    uuid team_id FK
    uuid starter_id FK
    bool jiribilla 
    time created "start_time" 
    int event_number
  }
  teams ||--|{ goals : has
  matches ||--|{ teams : has
  matches ||--|{ goals : has
  matches ||--|{ kickoffs : has
  teams ||--|{ kickoffs : has
  goals ||--|| kickoffs : has
```
