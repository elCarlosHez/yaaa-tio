SELECT 
    (ROW_NUMBER() OVER()) as id,
    u.id as user, 
    COALESCE(w.wins, 0) as wins, 
    COALESCE(l.losses, 0) as losses,
    (CASE 
        WHEN COALESCE(w.wins, 0) + COALESCE(l.losses, 0) = 0 THEN 0
        ELSE ROUND(100.0 * COALESCE(w.wins, 0) / (COALESCE(w.wins, 0) + COALESCE(l.losses, 0)), 2)
    END) as win_percentage
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
LEFT JOIN (
    SELECT player_id, COUNT(*) as losses
    FROM (
        -- Subquery to select all players from the blue team who lost
        SELECT red_striker AS player_id
        FROM matches
        WHERE winner = 'blue'

        UNION ALL

        SELECT red_goal_keeper AS player_id
        FROM matches
        WHERE winner = 'blue'

        UNION ALL

        -- Subquery to select all players from the red team who lost
        SELECT blue_striker AS player_id
        FROM matches
        WHERE winner = 'red'

        UNION ALL

        SELECT blue_goal_keeper AS player_id
        FROM matches
        WHERE winner = 'red'
    ) as all_losses
    GROUP BY player_id
) l ON u.id = l.player_id
ORDER BY win_percentage DESC, wins DESC;