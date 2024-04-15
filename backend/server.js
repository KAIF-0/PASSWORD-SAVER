const express = require('express')
const app = express()
const dotenv = require('dotenv')
const port = 2000
const cors = require('cors')
const { MongoClient } = require('mongodb')
const bodyparser = require('body-parser')
// console.log(process.env.MONGO_URI)

dotenv.config()
app.use(bodyparser.json())
app.use(cors())

//connecting URL...
const url = process.env.MONGO_URI;
const client = new MongoClient(url)
client.connect();


const dbName = process.env.DB_NAME 


//Get all the passwords...
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResults = await collection.find({}).toArray(); 
  res.json(findResults)
})

//Save all the passwords...
app.post('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResults = await collection.insertOne(req.body); 
  res.send({success: true, result: findResults})
})

// Delete all the passwords by id...
app.delete('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords')
  const findResults = await collection.deleteOne(req.body) 
  res.send({success: true, result: findResults})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})