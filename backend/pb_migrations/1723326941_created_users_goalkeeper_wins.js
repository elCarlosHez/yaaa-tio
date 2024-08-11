/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "3mjdfw7a0r3dlvy",
    "created": "2024-08-10 21:55:41.524Z",
    "updated": "2024-08-10 21:55:41.524Z",
    "name": "users_goalkeeper_wins",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "y8yjlbex",
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
        "id": "twgvtifd",
        "name": "wins",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
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
      "query": "SELECT\n    (ROW_NUMBER() OVER()) as id,\n    u.id AS user,\n    COUNT(*) AS wins\nFROM\n    matches m\nLEFT JOIN\n    users u ON CASE\n        WHEN m.winner = 'red' THEN m.red_goal_keeper\n        ELSE m.blue_goal_keeper\n    END = u.id\nGROUP BY\n    u.name\nORDER BY\n    wins DESC;\n"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("3mjdfw7a0r3dlvy");

  return dao.deleteCollection(collection);
})
