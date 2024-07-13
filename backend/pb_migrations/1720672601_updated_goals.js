/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0bpck6fomdb1tx6")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vfl0xt3h",
    "name": "type",
    "type": "select",
    "required": false,
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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0bpck6fomdb1tx6")

  // remove
  collection.schema.removeField("vfl0xt3h")

  return dao.saveCollection(collection)
})
