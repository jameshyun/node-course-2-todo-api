var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json()); // parse application/json
/**
 * Configure routes
 */
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


app.listen(3000, () => {
  console.log('Started on port 3000');
});

module.exports = {app};


/**
 * /todos <- resources
 * bodyParser.json() parse json data frm user into obj
 * test case 1. valid 2. invalid
   (expct, mocha, supertest, nodemon)
 *
 * save() returns a Promise
 * JSON.stringify(doc, undefined, 2) is just used to print out pretty
 * type casting does exist inside mongoose therefore e.g. if type is String, then
   32 or true can be used. becomes "32", "true"
 */
