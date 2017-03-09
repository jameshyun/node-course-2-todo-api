require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');


var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json()); // parse application/json
/**
 * Configure routes
 */
 /*#################  CREATE ###################################################*/
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
})

/*#################  GET all ###################################################*/
app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

/*#################  GET with id ###################################################*/
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send(); // send back an empty body
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send(); // send back an empty body
    }

    res.send({todo}); // send obj rather than array for more flexibility
  }).catch((e) => {
    res.status(400).send();
  })
});

/*#################  DELETE ###################################################*/
app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send(); // send back an empty body
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send(); // send back an empty body
    }

    res.send({todo: todo}); // send obj rather than array for more flexibility
  }).catch((e) => {
    res.status(400).send(e);
  })
});

/*#################  PATCH ###################################################*/
app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send(); // send back an empty body
  }

  // check if body.completed is boolean && body.completed is true
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime(); // getTime() returns js timestamp num of milliseconds since midnight on jan 1 of year 1970
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  // we can pass body since is's already generated as obj above
  // {new: true} - return new obj back. the updated one.
  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
})


app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};


/**
 * /todos <- resources
 * bodyParser.json() parse json data frm user into obj
 * test case 1. valid 2. invalid
   (expct, mocha, supertest, nodemon)
 * when send response back to the customer use obj rather than just array
   because we can't add other properties in array.make it more flexible future
 * save() returns a Promise
 * JSON.stringify(doc, undefined, 2) is just used to print out pretty
 * type casting does exist inside mongoose therefore e.g. if type is String, then
   32 or true can be used. becomes "32", "true"
 * when patch. be careful about user's inputs. we must update what we need to update only. using lodash pick()
 * Deployment on Heroku:
     process.env.PORT
     "engines": {
       "node": "6.10.0"
     },
     "start": "node server/server.js",
     process.env.MONGODB_URI
 * in package.js. export NODE_ENV=test || SET \"NODE_ENV=test\"  && mocha ..... line means run either export or set based on os and chain mocha command to it.
 */
