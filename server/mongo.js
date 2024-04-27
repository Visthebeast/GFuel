const { MongoClient } = require("mongodb");

// Connection URI
const uri =
  "mongodb+srv://vishnuprakash222042:varun@cluster0.kkfxmlq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a new MongoClient
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("gfuel");
    const collection = db.collection("registeredemployee");

    const dbdata = await collection.find().toArray();
    //console.log(dbdata);
  } finally {
    // Close the database connection when finished or an error occurs
    await client.close();
  }
}
run().catch(console.error); 
