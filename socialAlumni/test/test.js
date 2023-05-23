const test = require('tape');
const { exec } = require('child_process');
const dotenv = require('dotenv');
const { MongoClient } = require('mongodb');
const collection = require('../models/user');
const mongoose = require("mongoose");

/* load .env*/
dotenv.config();

const user = process.env.ATLAS_USER;
const password = process.env.ATLAS_PASSWORD;
const db_url = `mongodb+srv://${user}:${password}@cluster0.hei7umz.mongodb.net/?retryWrites=true&w=majority`
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}



//Test to make sure continous integration checking works
test('My Test', (t) => {
  t.equal(1 + 1, 2, '1+1 should equal 2');
  t.end();
});


// // Setup function to establish the MongoDB connection
// async function setup() {
//   try {
//     const client = new MongoClient(db_url, options);
//     await client.connect();
//     return client;
//   } catch (error) {
//     console.error('Failed to connect to MongoDB:', error);
//     throw error;
//   }
// }

// // Teardown function to close the MongoDB connection
// async function teardown(client) {
//   try {
//     await client.close();
//   } catch (error) {
//     console.error('Failed to close MongoDB connection:', error);
//     throw error;
//   }
// }

// test('MongoDB Connection Test', (t) => {
//   let client;

//   t.test('Setup', async (t) => {
//     client = await setup();
//     t.ok(client, 'MongoDB connection is successful');
//     t.end();
//   });

//   t.test('Retrieve objects from MongoDB', async (t) => {
//     try {
//       const collection = require('../models/user');
//       // Find objects matching a query
//       const query = { first_name: 'test1' };
//       const totalDocuments = await collection.countDocuments(query);
//       console.log(totalDocuments)
//       const objects = await collection.find(query);

//       t.ok(objects.length > 0, 'Objects should be retrieved from MongoDB');
//     } catch (error) {
//       console.error('Failed to retrieve objects from MongoDB:', error);
//       t.fail('Failed to retrieve objects from MongoDB');
//     } finally {
//       t.end();
//     }
//   });

//   t.test('User object should have the expected properties', async (t) => {
//     try {
//       // Find objects matching a query
//       const query = { first_name: 'test1' };
//       const objects = await collection.find(query);
//       const obj = await collection.findOne({ first_name: 'test1' });

//       t.ok(obj.hasOwnProperty('first_name'), 'Object should have first name');
//       t.ok(obj.hasOwnProperty('last_name'), 'Object should have last name');
//       t.ok(obj.hasOwnProperty('username'), 'Object should have username');
//       t.ok(obj.hasOwnProperty('email'), 'Object should have email');
//       t.ok(obj.hasOwnProperty('phone_number'), 'Object should have phone number');
//     } catch (error) {
//       console.error('Failed to retrieve user object from MongoDB:', error);
//       t.fail('Failed to retrieve user object from MongoDB');
//     } finally {
//       t.end();
//     }
//   });

//   t.test('Teardown', async (t) => {
//     await teardown(client);
//     t.end();
//   });
// });


test('MongoDB Connection Test', async (t) => {
  try {
    const client = new MongoClient(db_url, options);
    await client.connect();
    // Check if the connection is established
    t.ok(client, 'MongoDB connection is successful');
    // Close the MongoDB connection
    await client.close();
    t.end();
  } catch (error) {
    t.fail(`Failed to connect to MongoDB: ${error.message}`);
    t.end();
  }
});

test('Retrieve objects from MongoDB', async (t) => {
  await mongoose.connect(db_url, options).then(() => {
  }).catch((e) => {
    console.error(e, 'could not connect!')
  });

  // Find objects matching a query
  const query = {first_name:'max'};
  const objects = await collection.find(query);

  t.ok(objects.length > 0, 'Objects should be retrieved from MongoDB');
      // Close the MongoDB connection
  await mongoose.disconnect();
  t.end();
});

test('User object should have the expected properties', async (t) => {
  await mongoose.connect(db_url, options).then(() => {
  }).catch((e) => {
    console.error(e, 'could not connect!')
  });
    // Find objects matching a query
  const query = {first_name:'test1'};
  const objects = await collection.find(query);
  const obj = await collection.findOne({ first_name: 'test1' });
  console.log(obj)
  let actualProperties = [];
  const expectedProperties = ['test1', 'test2', 'test1@1', 'test1@1', 111];
  actualProperties[0] = obj.first_name;
  actualProperties[1] = obj.last_name;
  actualProperties[2] = obj.email;
  actualProperties[3] = obj.username;
  actualProperties[4] = obj.phone_number;
  t.deepEqual(actualProperties, expectedProperties, 'Object should have expected properties');
  await mongoose.disconnect()
  t.end();
});

// test('Project Runs Without Errors', (t) => {
//   exec('npm start', (error, stdout, stderr) => {
//     t.notOk(error, 'Project should run without errors');
//     t.end();
//   });
// });

