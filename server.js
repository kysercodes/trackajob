const express = require('express');
require('dotenv').config();
// const multer  = require('multer')
// const upload = multer()
const app = express();
app.set('view engine', 'ejs')
const bodyParser = require('body-parser');



app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('dist'));
app.use(express.json());
const MongoClient = require('mongodb').MongoClient;

// handles multi form

// handles .env file




MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.urtu5cf.mongodb.net/?retryWrites=true&w=majority`, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
     const db = client.db('traked-jobs');
     const jobsCollection = db.collection('jobs');
    //  jobsCollection.find().toArray()
    //  .then(result => {
    //   console.log(result)
    //  })
      
  //   app.get("/jobs", (req, res) => {
  //     console.log("hello")
  //      jobsCollection.find().toArray()
  //    .then(result => {
  //     console.log(result)
  //    })
  // });
  app.get('/', (req, res) => {
    jobsCollection.find().toArray()
    .then(jobs => {
        console.log("Jobs fetched:", jobs);
        res.json(jobs);  // Send jobs data as JSON
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        res.status(500).send('Error fetching data');
    });
});

  
    // upload.none(),
     
       app.post('/jobs', (req, res) => {
        jobsCollection.insertOne(req.body)
        .then(result => {
            console.log(result)
          })
          .catch(error => console.error(error))
       })
     
     app.listen(2000, function () {
         console.log('listening on 155165 foo')
       })
  
  })
  .catch(error => console.error(error))

    

  
