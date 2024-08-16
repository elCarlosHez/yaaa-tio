/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2hvzxzvvwok00xv")

  collection.options = {
    "query": "SELECT\n    (ROW_NUMBER() OVER()) as id,\n    u.id AS user,\n    COUNT(*) AS wins\nFROM\n    matches m\nLEFT JOIN\n    users u ON CASE\n        WHEN m.winner = 'red' THEN m.red_striker\n        ELSE m.blue_striker\n    END = u.id\nGROUP BY\n    u.id\nORDER BY\n    wins DESC;"
  }

  // remove
  collection.schema.removeField("czzjlqzo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gp7z9twy",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e0vxcnay",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2hvzxzvvwok00xv")

  collection.options = {
    "query": "SELECT\n    u.id AS id,\n    COUNT(*) AS wins\nFROM\n    matches m\nLEFT JOIN\n    users u ON CASE\n        WHEN m.winner = 'red' THEN m.red_striker\n        ELSE m.blue_striker\n    END = u.id\nGROUP BY\n    u.id\nORDER BY\n    wins DESC;"
  }

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("gp7z9twy")

  // remove
  collection.schema.removeField("e0vxcnay")

  return dao.saveCollection(collection)
})
