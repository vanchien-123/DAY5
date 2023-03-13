// const MongoClient = require('mongodb').MongoClient;
// const fs = require('fs');
// const dbName = 'information';
// const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });

// client.connect(function (err) {
//     //assert.equal(null, err);
//     console.log('Connected successfully to server');
//     const db = client.db(dbName);

//     getDocuments(db, function (docs) {

//         console.log('Closing connection.');
//         client.close();

//         // Write to file
//         try {
//             fs.writeFileSync('out_file.json', JSON.stringify(docs));
//             console.log('Done writing to file.');
//         }
//         catch (err) {
//             console.log('Error writing to file', err)
//         }
//     });
// }

//     const getDocuments = function (db, callback) {
//     const query = "SELECT * FROM users";  // this is your query criteria
//     db.collection("inCollection")
//         .find(query)
//         .toArray(function (err, result) {
//             if (err) throw err;
//             callback(result);
//         });
// };

// client.connect(function (err) {

//     const db = client.db(dbName);
//     const data = fs.readFileSync('out_file.json');
//     const docs = JSON.parse(data.toString());

//     db.collection('outCollection')
//         .insertMany(docs, function (err, result) {
//             if (err) throw err;
//             console.log('Inserted docs:', result.insertedCount);
//             client.close();
//         });
// });