/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "nxutlo6li42nvu7",
    "created": "2024-08-07 04:17:01.807Z",
    "updated": "2024-08-07 04:17:01.807Z",
    "name": "users_goals",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "oyftapsi",
        "name": "scorer",
        "type": "relation",
        "required": true,
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
        "id": "vstwuyye",
        "name": "goal_count",
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
      "query": "SELECT scorer, COUNT(*) AS goal_count, id\nFROM goals\nWHERE type != 'own-goal'\nGROUP BY scorer\nORDER BY goal_count DESC;"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("nxutlo6li42nvu7");

  return dao.deleteCollection(collection);
})
