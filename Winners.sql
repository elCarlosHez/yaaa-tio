SELECT 
  (ROW_NUMBER() OVER()) as id,
  u.id as user, 
  COALESCE(w.wins, 0) as wins
FROM users u
LEFT JOIN (
    SELECT player_id, COUNT(*) as wins
    FROM (
        -- Subquery to select all players from the blue team who won
        SELECT blue_striker AS player_id
        FROM matches
        WHERE winner = 'blue'

        UNION ALL

        SELECT blue_goal_keeper AS player_id
        FROM matches
        WHERE winner = 'blue'

        UNION ALL

        -- Subquery to select all players from the red team who won
        SELECT red_striker AS player_id
        FROM matches
        WHERE winner = 'red'

        UNION ALL

        SELECT red_goal_keeper AS player_id
        FROM matches
        WHERE winner = 'red'
    ) as all_wins
    GROUP BY player_id
) w ON u.id = w.player_id
ORDER BY wins DESC;