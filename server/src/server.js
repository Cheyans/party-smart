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

// Fetch user id
app.get(`/users/:id`, undefined, function(req, res) {
  var userIdRequesting = getUserIdFromToken(req.get('Authorization'));
  var userIdRequested = parseInt(req.params.userid);
  if(userIdRequested === userIdRequesting) {

  }
});

function getBasicUserInfo(userId) {
  var user = readDocument('users', userId);
  return {
    id: user._id,
    fname: user.fname,
    lname: user.lname,
    picture: user.picture
  }
}

/**
 * Get the user ID from a token. Returns -1 (an invalid ID) if it fails.
 */
function getUserIdFromToken(authorizationLine) {
  try {
    // Cut off "Bearer " from the header value.
    var token = authorizationLine.slice(7);
    // Convert the base64 string to a UTF-8 string.
    var regularString = new Buffer(token, 'base64').toString('utf8');
    // Convert the UTF-8 string into a JavaScript object.
    var tokenObj = JSON.parse(regularString);
    var id = tokenObj['id'];
    // Check that id is a number.
    if (typeof id === 'number') {
      return id;
    } else {
      // Not a number. Return -1, an invalid ID.
      return -1;
    }
  } catch (e) {
    // Return an invalid ID.
    return -1;
  }
}

app.use(function(err, req, res, next) {
  if (err.name === 'JsonSchemaValidation') {
    res.status(400).end();
  } else {
    next(err);
  }
});

// Reset database.
app.post('/resetdb', function(req, res) {
  console.log("Resetting database...");
  database.resetDatabase();
  res.send();
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});