/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "f678xl5j4ay2a0r",
    "created": "2024-08-10 18:21:17.102Z",
    "updated": "2024-08-10 18:21:17.102Z",
    "name": "teams_winners",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qefcxwz6",
        "name": "player1",
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
        "id": "jlkca1v4",
        "name": "player2",
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
        "id": "az69hgis",
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
      "query": "SELECT\n    (ROW_NUMBER() OVER()) as id,\n    (CASE\n        WHEN winner = 'red' THEN red_goal_keeper\n        ELSE blue_goal_keeper\n    END) AS player1,\n    (CASE\n        WHEN winner = 'red' THEN red_striker\n        ELSE blue_striker\n    END) AS player2,\n    COUNT(*) AS wins\nFROM\n    matches\nGROUP BY\n    (CASE\n        WHEN winner = 'red' THEN red_goal_keeper\n        ELSE blue_goal_keeper\n    END),\n    (CASE\n        WHEN winner = 'red' THEN red_striker\n        ELSE blue_striker\n    END)\nORDER BY\n    wins DESC;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("f678xl5j4ay2a0r");

  return dao.deleteCollection(collection);
})
