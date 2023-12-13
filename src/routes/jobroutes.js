const express = require('express');
const router = express.Router();
const connectToDatabase = require('../db');
const { ObjectId } = require('mongodb');

// Middleware to handle database connection
async function dbMiddleware(req, res, next) {
    try {
        req.db = await connectToDatabase();
        next();
    } catch (error) {
        console.error('Database connection error:', error);
        res.status(500).send('Database connection error');
    }
}

router.use(dbMiddleware); // Apply database middleware to all routes

router.get('/', async (req, res) => {
    try {
        const jobs = await req.db.collection('jobs').find().toArray();
        res.render('index.ejs', { jobsCollection: jobs });
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).send('Error fetching jobs');
    }
});

router.post('/', async (req, res) => { // Changed from '/jobs' to '/'
    try {
        await req.db.collection('jobs').insertOne(req.body);
        res.redirect('/');
    } catch (error) {
        console.error('Error adding job:', error);
        res.status(500).send('Error adding job');
    }
});


router.delete('/jobs/:jobId', async (req, res) => { // Changed from '/jobs' to '/'
    try {
        const { jobId } = req.params;
        await req.db.collection('jobs').deleteOne({ _id: new ObjectId(jobId) })
        res.json({ message: 'Job deleted successfully' });
        res.redirect('/');
    } catch (error) {
        console.error('Error adding job:', error);
        res.status(500).send('Error deleting job');
    }
});







// Other routes (POST, DELETE) would go here...

module.exports = router;
