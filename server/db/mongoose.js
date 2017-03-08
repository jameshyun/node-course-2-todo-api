var mongoose = require('mongoose');

// these done just once
mongoose.Promise = global.Promise; // built-in Promise
mongoose.connect('mongodb://localhost:27017:TodoApp');

module.exports = {mongoose};
