var express = require('express');
var bodyParser = require('body-parser');
var validate = require('express-jsonschema').validate;
var database = require('./database');

var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;

var app = express();
app.use(bodyParser.text());
app.use(bodyParser.json());

app.use(express.static('../../client/build'));



// app.use(function(err, req, res, next) {
//   if (err.name === 'JsonSchemaValidation') {
//     res.status(400).end();
//   } else {
//     next(err);
//   }
// });

// Reset database.
app.post('/resetdb', function(req, res) {
  console.log("Resetting database...");
  // This is a debug route, so don't do any validation.
  database.resetDatabase();
  // res.send() sends an empty response with status code 200
  res.send();
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
