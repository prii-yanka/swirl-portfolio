const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
            // Verify we got a good "db" object
            if (db) {
                _db = db.db("portfolio");
                console.log("Successfully connected to MongoDB.");
            }
            return callback(err);
        });
  },
 
  getDb: function () {
    return _db;
  },
};

// async function run() {
//     try {
//       // Connect the client to the server (optional starting in v4.7)
//       await client.connect();
//       // Establish and verify connection
//       await client.db("admin").command({ ping: 1 });
//       console.log("Connected successfully to server");
//     } finally {
//       // Ensures that the client will close when you finish/error
//       await client.close();
//     }
//   }
//   run().catch(console.dir);