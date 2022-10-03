const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config();

const uri = process.env.DB_CONN;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

exports.handler = async function (event, context) {
  try {
    await client.connect();
    await client.db("users").command({ ping: 1 });
    console.log("Connected successfully to users db");
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Connected successfully to users db..." }),
  };
};
