"use strict"

const { json } = require("body-parser")                               //returns middleware that only parses json
const express = require("express")                                    //pull Express in
const mongoose = require('mongoose')                                 //pull Mongoose in

const app = express()                                                 //initialize Express
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/meantodo'
const PORT = process.env.PORT || 3000                                 //set up ports

/////////////////////////////////  Middleware  /////////////////////////////////
app.use(express.static('client'))                                     //express base directory is the ROOT, not the folder where the server is - established in package.JSON
app.use(json())

app.get("/api/title", (req, res) =>
  res.json({ title: "MEAN TO DO / From Node! (Now Bootstraped!)" })   //use objects here NOT STRINGS 
)


////////////////////////////////////  MODEL  ////////////////////////////////////
const Item = mongoose.model('item', {
  task: String
}) 


app.get("/api/items", (req, res, err) =>
  Item
    .find()
    .then(items => res.json({ items }))
    .catch(err)
)

app.post("/api/items", (req, res, err) => {
  const task = req.body
  console.log("||SERVER NEW Task: ", req.body);
  Item
    .create(task)
    .then(task => res.status(201).json(task))
    .catch(err)
})

app.delete('/api/items/:id', (req, res, err) => {
  const id = req.params.id
  console.log("||SERVER REMOVE ID: ", id)
  Item
    .find({_id: id})
    .remove({_id: id})
    .then(() => res.status(204))
    .catch(err)
})
///////////////////////////////////////////////////////  GOOOOOOOD  ///////////////////////////////////////////////////////



app.get('/api/taskDescription/:id', (req, res, err) => {
  const id = req.params.id
  // console.log("||SERVER EDIT THIS ID from api req.body: ", id)
  Item
    .find({_id: id})
    .then(task => res.json(task))
    .catch(err)
})

app.put('/api/items/:id', (req, res, err) => {
  const id = req.params.id
  // console.log("||SERVER Edited Task: ", req.body)
  // console.log("||SERVER Edited ID: ", id)

  Item
    .findOneAndUpdate({_id: id}, req.body, { upsert: true })
    .then(data => res.status(200).json(data))
    .then(reloadPage())
    .catch(err)
})




app.use('/api', (req, res) =>
  res.status(404).send({ code: 404, status: 'Not Found' })
)

app.use((err, req, res, next) =>
  res.status(500).send({ code: 500, status: 'Internal Server Error', detail: err.stack })
)

mongoose.Promise = Promise
mongoose.connect(MONGODB_URL, () =>
  app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))     //server/server.js console.log()
)
