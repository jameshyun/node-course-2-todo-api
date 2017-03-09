const {ObjectID} = require('mongodb');

const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/todo');
const {User} = require('../server/models/user');

Todo.remove({}).then((res) => {
  console.log(res);
});

Todo.findOneAndRemove({_id: '58c0f61dc7183e62c80712bf'}).then((todo) => {
  console.log(todo);
});

Todo.findByIdAndRemove('58c0f61dc7183e62c80712bf').then((todo) => {
  console.log(todo);
});


/**
 * remove() we don't get docs back that got removed
   with findOneAndRemove or findByIdAndRemove we do get docs back
 */
