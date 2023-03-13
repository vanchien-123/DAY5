const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://127.0.0.1:27017/node-demo");
// const nameSchema = new mongoose.Schema({
//     firstName: String,
//     lastName: String
// });
// const User = mongoose.model("User", nameSchema);

const mongoose = require("mongoose");
const assert = require('assert');
mongoose.Promise = global.Promise;
const url = mongoose.connect("mongodb://127.0.0.1:27017/information");
const nameSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    city: String,
    phone: Number
});
const User = mongoose.model("User", nameSchema);

// const { MongoClient } = require('mongodb');
//or as an es module:
//import { MongoClient } from 'mongodb'
//Connection URL
// const url = 'mongodb://localhost:27017'; // # 127.0.0.1:27017
// const client = new MongoClient(url);
// // Database Name
// const dbName = 'myProject';
// async function main() {
// Use connect method to connect to the server
// await client.connect();
// console.log('Connected successfully to server');
// const db = client.db(dbName);
// const collection = db.collection('users');
// //     // the following code examples can be pasted here...

// //     // insert a document
// const insertResult = await collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }]);
// console.log('Inserted documents =>', insertResult);

//     //Find All Documents
//     // const findResult = await collection.find({}).toArray();
//     // console.log('Found documents =>', findResult);

//     //Find Documents with a Query Filter
//     //Add a query filter to find only documents which meet the query criteria.
//     // const filteredDocs = await collection.find({ a: 3 }).toArray();
//     // console.log('Found documents filtered by { a: 3 } =>', filteredDocs);

//     //Update a document
//     // const updateResult = await collection.updateOne({ a: 3 }, { $set: { b: 1 } });
//     // console.log('Updated documents =>', updateResult);

//     //Delete a document
//     // const deleteResult = await collection.deleteMany({ a: 3 });
//     // console.log('Deleted documents =>', deleteResult);

//     return 'done.';
// // }
// main()
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());

// app.get("/", (req, res) => {
//     res.send("Hello World");
// });

// app.use("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/info", (req, res) => {
    res.sendFile(__dirname + "/info.html");
});

app.post("/addname", async (req, res) => {
    const myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

app.post("/info", async (req, res) => {
    const myData = new User(req.body);
    myData.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

app.get('/info', function(res, req, next){
    const resultArray = [];
    mongoose.connect(url, function(err, db){
        assert.equal(null, err);
        const cursor = db.collection('information').find();
        cursor.forEach(function(doc, err){
            assert.equal(null, err);
            resultArray.push(doc);
        },function(){
            db.close();
            res.render('info', {items: resultArray});
        });
    })
});


app.listen(port, () => {
    console.log("Server listening on port " + port);
});