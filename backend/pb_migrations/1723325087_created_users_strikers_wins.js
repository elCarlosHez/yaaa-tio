/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "2hvzxzvvwok00xv",
    "created": "2024-08-10 21:24:47.471Z",
    "updated": "2024-08-10 21:24:47.471Z",
    "name": "users_strikers_wins",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "czzjlqzo",
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
      "query": "SELECT\n    u.id AS id,\n    COUNT(*) AS wins\nFROM\n    matches m\nLEFT JOIN\n    users u ON CASE\n        WHEN m.winner = 'red' THEN m.red_striker\n        ELSE m.blue_striker\n    END = u.id\nGROUP BY\n    u.id\nORDER BY\n    wins DESC;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("2hvzxzvvwok00xv");

  return dao.deleteCollection(collection);
})
