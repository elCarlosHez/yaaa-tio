/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0bpck6fomdb1tx6")

  // remove
  collection.schema.removeField("71kblqca")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qkyrkd7e",
    "name": "match",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "12rb7j1yn46tn16",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rugpgipi",
    "name": "scorer",
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
    "id": "bxetxlae",
    "name": "goalkeper",
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
    "id": "phwyxrmy",
    "name": "team",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "blue",
        "red"
      ]
    }
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lthkuh8w",
    "name": "scorer_position",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "goal_keeper",
        "striker"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0bpck6fomdb1tx6")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("qkyrkd7e")

  // remove
  collection.schema.removeField("rugpgipi")

  // remove
  collection.schema.removeField("bxetxlae")

  // remove
  collection.schema.removeField("phwyxrmy")

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
