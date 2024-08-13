/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0bpck6fomdb1tx6")

  // remove
  collection.schema.removeField("lthkuh8w")

  // remove
  collection.schema.removeField("bxetxlae")

  // remove
  collection.schema.removeField("phwyxrmy")

  // remove
  collection.schema.removeField("vfl0xt3h")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wdddv5i7",
    "name": "team",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "v9ccut9yu6dmhi7",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7koqm0wp",
    "name": "kickoff",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "cv6zfc00hc0lai5",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ezhsum2i",
    "name": "trick",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6fxc3qbo",
    "name": "own_goal",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0bpck6fomdb1tx6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "lthkuh8w",
    "name": "scorer_position",
    "type": "select",
    "required": true,
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bxetxlae",
    "name": "goal_keeper",
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
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "phwyxrmy",
    "name": "team",
    "type": "select",
    "required": true,
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

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vfl0xt3h",
    "name": "type",
    "type": "select",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 1,
      "values": [
        "goal",
        "own-goal"
      ]
    }
  }))

  // remove
  collection.schema.removeField("wdddv5i7")

  // remove
  collection.schema.removeField("7koqm0wp")

  // remove
  collection.schema.removeField("ezhsum2i")

  // remove
  collection.schema.removeField("6fxc3qbo")

  return dao.saveCollection(collection)
})
