const mongodb = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const packageRouter = require('./routes/package')

require('dotenv').config();

//express app
const express = require('express'); //install b4 requiring
const app = express();

//routes
app.use('/api/packages', packageRouter)

//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
});

//express static


//connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('SK has connected to DB', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    });






// Create an endpoint (or route) called /read
app.get('/read', (req, res) => {
    // Access the query parameter that the user will send to us
    const term = req.query.term;
    Show.find({
        $text: {
            $search: term

        }
    })
        .then(docs => {

            res.send(docs)
        })
});

// Create an endpoint for object ID
app.get('/getById', (req, res) => {
    // Access the query parameter that the user will send to us
    const id = req.query.id;
    Show.findById(id)
        .then(doc => {

            res.send(doc)
        })
});

