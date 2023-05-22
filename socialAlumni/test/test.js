const test = require('tape');
const { exec } = require('child_process');
const { MongoClient } = require('mongodb');

const mongoose = require("mongoose");

const db_url = `mongodb+srv://admin:fipa4WmSVajHYl3ID@cluster0.hei7umz.mongodb.net/?retryWrites=true&w=majority`
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

//Test to make sure continous integration checking works
test('My Test', (t) => {
  t.equal(1 + 1, 2, '1+1 should equal 2');
  t.end();
});

test('MongoDB Connection Test', async (t) => {
  try {
    const client = new MongoClient(db_url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();

    // Check if the connection is established
    t.ok(client.isConnected(), 'MongoDB connection is successful');

    // Close the MongoDB connection
    await client.close();
    t.end();
  } catch (error) {
    t.fail(`Failed to connect to MongoDB: ${error.message}`);
    t.end();
  }
});

test('Retrieve objects from MongoDB', async (t) => {
  const collection = db.collection('test.users'); // Replace with the name of your collection

  // Find objects matching a query
  const query = {first_name:'max'};
  const objects = await collection.find(query).toArray();

  t.ok(objects.length > 0, 'Objects should be retrieved from MongoDB');
  t.end();
});

test('User object should have the expected properties', (t) => {
  const users = db.collection('test.users');
  const query = {first_name:'max'};
  const objects =  users.find(query).toArray();

  t.ok(obj.hasOwnProperty('first_name'), 'Object should have first name');
  t.ok(obj.hasOwnProperty('last_name'), 'Object should have last name');
  t.end();
});

// test('Project Runs Without Errors', (t) => {
//   exec('npm start', (error, stdout, stderr) => {
//     t.notOk(error, 'Project should run without errors');
//     t.end();
//   });
// });

