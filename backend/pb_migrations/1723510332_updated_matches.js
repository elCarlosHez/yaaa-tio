/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("12rb7j1yn46tn16")

  // remove
  collection.schema.removeField("s1jdt7ov")

  // remove
  collection.schema.removeField("e39nwcx2")

  // remove
  collection.schema.removeField("utfm8sto")

  // remove
  collection.schema.removeField("4xtj5afn")

  // remove
  collection.schema.removeField("diiguaxp")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xhwmojda",
    "name": "goals_blue",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null,
      "noDecimal": true
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nvnaiusf",
    "name": "goals_red",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": null,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("12rb7j1yn46tn16")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "s1jdt7ov",
    "name": "red_goal_keeper",
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
    "id": "e39nwcx2",
    "name": "red_striker",
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
    "id": "utfm8sto",
    "name": "blue_goal_keeper",
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
    "id": "4xtj5afn",
    "name": "blue_striker",
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
    "id": "diiguaxp",
    "name": "winner",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "red",
        "blue"
      ]
    }
  }))

  // remove
  collection.schema.removeField("xhwmojda")

  // remove
  collection.schema.removeField("nvnaiusf")

  return dao.saveCollection(collection)
})
