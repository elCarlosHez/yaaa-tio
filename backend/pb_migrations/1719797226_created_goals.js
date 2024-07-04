/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "0bpck6fomdb1tx6",
    "created": "2024-07-01 01:27:06.680Z",
    "updated": "2024-07-01 01:27:06.680Z",
    "name": "goals",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "71kblqca",
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
        "id": "lthkuh8w",
        "name": "position",
        "type": "select",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "values": [
            "goalkeeper",
            "forward"
          ]
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("0bpck6fomdb1tx6");

  return dao.deleteCollection(collection);
})
