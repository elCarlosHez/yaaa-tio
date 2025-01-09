/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("12rb7j1yn46tn16")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "r32utdqk",
    "name": "streak",
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
  const collection = dao.findCollectionByNameOrId("12rb7j1yn46tn16")

  // remove
  collection.schema.removeField("r32utdqk")

  return dao.saveCollection(collection)
})
