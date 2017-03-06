// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, res) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(res.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'James',
  //   age: 20,
  //   location: 'Sydney'
  // }, (err, res) => {
  //   if (err) return console.log('Unable to insert user', err);
  //   // console.log(JSON.stringify(res.ops, undefined, 2));
  //   console.log(res.ops[0]._id.getTimestamp());
  // });

  db.close();
})



/**
 * use .ops property to get document(s)
 * id is ObjectId type
    _id: 57ac8d47878a299e5dc21bc8
        a 4-byte value representing the seconds since the Unix epoch,
        a 3-byte machine identifier,
        a 2-byte process id, and
        a 3-byte counter, starting with a random value.
    But u can use anything else for _id creation e.g. _id: 123
  *
 */
