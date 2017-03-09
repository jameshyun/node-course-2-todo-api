const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

// var id = '58c099c8297c180b4856a57911';
//
// if (!ObjectID.isValid(id)) {
//   console.log('ID not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// })

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo By Id', todo);
// }).catch((e) => console.log(e));

User.findById('58bfa853314c421d64bfe246').then((user) => {
  if (!user) {
    return console.log('Unable to find user')
  }

  console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
  console.log(e);
})



/**
 * u don't need to use ObjectID in mongoose. mongoose does that for us
 * use mongodb's native ObjectID to check if id is valid e.g.ObjectID.isValid(id)
 */
