/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "48z5adbm07vfuf7",
    "created": "2024-08-10 04:44:10.530Z",
    "updated": "2024-08-10 04:44:10.530Z",
    "name": "users_wins",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "mclookcg",
        "name": "user",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "qot9doyu",
        "name": "wins",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      },
      {
        "system": false,
        "id": "kmnuahrk",
        "name": "losses",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      },
      {
        "system": false,
        "id": "giy52qkq",
        "name": "win_percentage",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSize": 1
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT \n    (ROW_NUMBER() OVER()) as id,\n    u.id as user, \n    COALESCE(w.wins, 0) as wins, \n    COALESCE(l.losses, 0) as losses,\n    (CASE \n        WHEN COALESCE(w.wins, 0) + COALESCE(l.losses, 0) = 0 THEN 0\n        ELSE ROUND(100.0 * COALESCE(w.wins, 0) / (COALESCE(w.wins, 0) + COALESCE(l.losses, 0)), 2)\n    END) as win_percentage\nFROM users u\nLEFT JOIN (\n    SELECT player_id, COUNT(*) as wins\n    FROM (\n        -- Subquery to select all players from the blue team who won\n        SELECT blue_striker AS player_id\n        FROM matches\n        WHERE winner = 'blue'\n\n        UNION ALL\n\n        SELECT blue_goal_keeper AS player_id\n        FROM matches\n        WHERE winner = 'blue'\n\n        UNION ALL\n\n        -- Subquery to select all players from the red team who won\n        SELECT red_striker AS player_id\n        FROM matches\n        WHERE winner = 'red'\n\n        UNION ALL\n\n        SELECT red_goal_keeper AS player_id\n        FROM matches\n        WHERE winner = 'red'\n    ) as all_wins\n    GROUP BY player_id\n) w ON u.id = w.player_id\nLEFT JOIN (\n    SELECT player_id, COUNT(*) as losses\n    FROM (\n        -- Subquery to select all players from the blue team who lost\n        SELECT red_striker AS player_id\n        FROM matches\n        WHERE winner = 'blue'\n\n        UNION ALL\n\n        SELECT red_goal_keeper AS player_id\n        FROM matches\n        WHERE winner = 'blue'\n\n        UNION ALL\n\n        -- Subquery to select all players from the red team who lost\n        SELECT blue_striker AS player_id\n        FROM matches\n        WHERE winner = 'red'\n\n        UNION ALL\n\n        SELECT blue_goal_keeper AS player_id\n        FROM matches\n        WHERE winner = 'red'\n    ) as all_losses\n    GROUP BY player_id\n) l ON u.id = l.player_id\nORDER BY win_percentage DESC, wins DESC;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("48z5adbm07vfuf7");

  return dao.deleteCollection(collection);
})
