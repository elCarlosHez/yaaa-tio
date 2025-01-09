/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("12rb7j1yn46tn16")

  collection.listRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("12rb7j1yn46tn16")

  collection.listRule = "@request.auth.id != \"\""

  return dao.saveCollection(collection)
})
