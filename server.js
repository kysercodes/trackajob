const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
app.use(express.json());
require('dotenv').config();


const bodyParser = require('body-parser');

// const jobDatabase = [];

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('dist'));
MongoClient.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.urtu5cf.mongodb.net/?retryWrites=true&w=majority`, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    
    app.get('/', function (req, res) {
        res.sendFile(__dirname +'/dist/index.html')
       })
     
       app.post('/jobs', (req, res) => {
        console.log(req.body)
       })
     
     app.listen(3000, function () {
         console.log('listening on 3000')
       })
  
  })
  .catch(error => console.error(error))

    

  
