/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("12rb7j1yn46tn16")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "awqss8kp",
    "name": "completed_at",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("12rb7j1yn46tn16")

  // remove
  collection.schema.removeField("awqss8kp")

  return dao.saveCollection(collection)
})
