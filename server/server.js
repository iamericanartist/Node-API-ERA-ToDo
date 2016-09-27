"use strict"

const { json } = require("body-parser")                               //returns middleware that only parses json
const express = require("express")                                    //pull Express in
const mongoose = require('mongoose');                                 //pull Mongoose in

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
const Message = mongoose.model('message', {
  task: String,
}) 


app.get("/api/messages", (req, res, err) =>
  Message
    .find()
    .then(messages => res.json({ messages }))
    .catch(err)
)

app.post("/api/messages", (req, res, err) => {
  const msg = req.body
  Message
    .create(msg)
    .then(msg => res.json(msg))
    .catch(err)
})

mongoose.promise = Promise
mongoose.connect(MONGODB_URL, () =>
  app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`))     //server/server.js console.log()
)
