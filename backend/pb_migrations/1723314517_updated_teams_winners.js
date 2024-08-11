/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("f678xl5j4ay2a0r")

  collection.options = {
    "query": "SELECT\n   (ROW_NUMBER() OVER()) as id,\n    u1.id AS player_1,\n    u2.id AS player_2,\n    COUNT(*) AS wins\nFROM\n    matches m\nLEFT JOIN\n    users u1 ON CASE\n        WHEN m.winner = 'red' THEN m.red_goal_keeper\n        ELSE m.blue_goal_keeper\n    END = u1.id\nLEFT JOIN\n    users u2 ON CASE\n        WHEN m.winner = 'red' THEN m.red_striker\n        ELSE m.blue_striker\n    END = u2.id\nGROUP BY\n    u1.id, u2.id\nORDER BY\n    wins DESC;"
  }

  // remove
  collection.schema.removeField("qefcxwz6")

  // remove
  collection.schema.removeField("jlkca1v4")

  // remove
  collection.schema.removeField("az69hgis")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "b9gswig7",
    "name": "player_1",
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
    "id": "bh60xaim",
    "name": "player_2",
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
    "id": "nfv81atp",
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
  const collection = dao.findCollectionByNameOrId("f678xl5j4ay2a0r")

  collection.options = {
    "query": "SELECT\n    (ROW_NUMBER() OVER()) as id,\n    (CASE\n        WHEN winner = 'red' THEN red_goal_keeper\n        ELSE blue_goal_keeper\n    END) AS player1,\n    (CASE\n        WHEN winner = 'red' THEN red_striker\n        ELSE blue_striker\n    END) AS player2,\n    COUNT(*) AS wins\nFROM\n    matches\nGROUP BY\n    (CASE\n        WHEN winner = 'red' THEN red_goal_keeper\n        ELSE blue_goal_keeper\n    END),\n    (CASE\n        WHEN winner = 'red' THEN red_striker\n        ELSE blue_striker\n    END)\nORDER BY\n    wins DESC;"
  }

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("b9gswig7")

  // remove
  collection.schema.removeField("bh60xaim")

  // remove
  collection.schema.removeField("nfv81atp")

  return dao.saveCollection(collection)
})
