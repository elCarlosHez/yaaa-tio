### Yaa tio

### Frontend Setup

1. `cd frontend`
1. `npm install`
1. `npm run dev`

### Backend setup

1. Download pockbase version 0.22.*
  - https://pocketbase.io/docs
  - https://github.com/pocketbase/pocketbase/releases
2. Move the executable to the backend folder
1. `cd backend`
1. `./pocketbase serve`

### Terraform first time setup

1. Download terraform
1. Download and configure aws cli
1. `cd tf`
1. `terraform init`

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
    time start_time 
    time end_time "NULL"
    int goals_blue "NULL"
    int goals_red "NULL"
    int event_count
  }

  teams {
    uuid id PK
    uuid match_id FK 
    date switch_time 
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
    time goal_time 
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
    time start_time 
    int event_number
  }

  teams ||--|{ goals : has
  matches ||--|{ teams : has
  matches ||--|{ goals : has
  matches ||--|{ kickoffs : has
  teams ||--|{ kickoffs : has
  goals ||--|| kickoffs : has
```
