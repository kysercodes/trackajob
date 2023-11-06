const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
app.use(express.json());
// handles multi form
const multer  = require('multer')
const upload = multer()
// handles .env file
require('dotenv').config();


const bodyParser = require('body-parser');

// const jobDatabase = [];

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('dist'));
MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.urtu5cf.mongodb.net/?retryWrites=true&w=majority`, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
     const db = client.db('traked-jobs');
     const jobsCollection = db.collection('jobs');
    app.get('/', function (req, res) {
        res.sendFile(__dirname +'/dist/index.html')
       })
     
       app.post('/jobs',upload.none(), (req, res) => {
        jobsCollection.insertOne(req.body)
        .then(result => {
            console.log(result)
          })
          .catch(error => console.error(error))
       })
     
     app.listen(3000, function () {
         console.log('listening on 3000')
       })
  
  })
  .catch(error => console.error(error))

    

  
