// Your startup's initial mock objects go here
var initialData = {
  "users": [{
    "_id": 0,
    "fname": "Cheyan",
    "lname": "Setayesh",
    "phone_number": "7818799033",
    "email": "a@umass.edu",
    "picture": "img/guy.jpg",
    "admin": "true",
    "friends": [1, 2]
  }, {
    "_id": 1,
    "fname": "Tim",
    "lname": "Richards",
    "phone_number": "999999999",
    "email": "c@umass.edu",
    "picture": "img/guy.jpg",
    "admin": "true",
    "friends": [2, 3]
  }, {
    "_id": 2,
    "fname": "Alex",
    "lname": "Redden",
    "phone_number": "999999999",
    "email": "e@umass.edu",
    "picture": "img/guy.jpg",
    "admin": "true",
    "friends": [0, 3]
  }, {
    "_id": 3,
    "fname": "John",
    "lname": "Vilk",
    "phone_number": "999999999",
    "email": "g@umass.edu",
    "picture": "img/guy.jpg",
    "admin": "true",
    "friends": []
  }],

  "parties": [{
    "_id": 0,
    "title": "testParty1",
    "description": "This is a test party, don't forget to check for very long descriptions to see if they look good.",
    "private_status": "false",
    "address": "96 N Pleasant Street",
    "city": "Amherst",
    "zip": "01003",
    "state": "MA",
    "country": "USA",
    "coordinates": {
      "latitude": 42.3771197,
      "longitude": -72.520304
    },
    "datetime": "Thu Jul 03 2016 23:33:59 GMT-0500 (EST)",
    "host": 0,
    "attending": [
      1, 2, 3
    ],
    "invited": [],
    "declined": [],
    "complaints": [{
      "datetime": "Thu Mar 03 2016 23:33:59 GMT-0500 (EST)",
      "message": null
    }, {
      "datetime": "Thu Mar 03 2016 23:33:59 GMT-0500 (EST)",
      "message": "turn your shit down bruh"
    }],
    "supplies": [{
      "supply_id": 1,
      "claimed_by": 2
    }, {
      "supply_id": 1,
      "claimed_by": 2
    }, {
      "supply_id": 2,
      "claimed_by": 3
    }, {
      "supply_id": 3,
      "claimed_by": null
    }, {
      "supply_id": 3,
      "claimed_by": 2
    }]
  }, {
    "_id": 1,
    "title": "testParty2",
    "description": "This is a test party 2, don't forget to check for very long descriptions to see if they look good.",
    "private_status": "false",
    "address": "95 N Pleasant Street",
    "city": "Amherst",
    "zip": "01003",
    "state": "MA",
    "country": "USA",
    "coordinates": {
      "latitude": 42.3771091,
      "longitude": -72.5198894
    },
    "datetime": "Thu Jul 22 2016 01:33:59 GMT-0500 (EST)",
    "host": 2,
    "attending": [1],
    "invited": [
      0, 1, 3
    ],
    "declined": [3],
    "complaints": [],
    "supplies": [{
      "supply_id": 1,
      "claimed_by": 2
    }, {
      "supply_id": 1,
      "claimed_by": 2
    }, {
      "supply_id": 2,
      "claimed_by": 3
    }, {
      "supply_id": 3,
      "claimed_by": null
    }, {
      "supply_id": 3,
      "claimed_by": 2
    }]
  }, {
    "_id": 2,
    "title": "testParty3",
    "description": "This is a test party 2, don't forget to check for very long descriptions to see if they look good.",
    "private_status": "false",
    "address": "94 N Pleasant Street",
    "city": "Amherst",
    "zip": "01003",
    "state": "MA",
    "country": "USA",
    "coordinates": {
      "latitude": 42.3771017,
      "longitude": -72.51992679999999
    },
    "datetime": "Thu Mar 13 2016 01:33:59 GMT-0500 (EST)",
    "host": 1,
    "attending": [0],
    "invited": [
      2, 3
    ],
    "declined": [3],
    "complaints": [],
    "supplies": [{
      "supply_id": 1,
      "claimed_by": 2
    }, {
      "supply_id": 1,
      "claimed_by": 2
    }, {
      "supply_id": 2,
      "claimed_by": 3
    }, {
      "supply_id": 3,
      "claimed_by": null
    }, {
      "supply_id": 3,
      "claimed_by": 2
    }]
  }, {
    "_id": 3,
    "title": "testParty4",
    "description": "This is a test party 2, don't forget to check for very long descriptions to see if they look good.",
    "private_status": "false",
    "address": "W. E. B. Du Bois Library",
    "city": "Amherst",
    "zip": "01002",
    "state": "MA",
    "country": "USA",
    "coordinates": {
      "latitude": 42.3897007,
      "longitude": -72.5281613
    },
    "datetime": "Thu Mar 04 2016 01:33:59 GMT-0500 (EST)",
    "host": 2,
    "attending": [1, 2, 3],
    "invited": [],
    "declined": [0],
    "complaints": [],
    "supplies": [{
      "supply_id": 1,
      "claimed_by": 2
    }, {
      "supply_id": 1,
      "claimed_by": 2
    }, {
      "supply_id": 2,
      "claimed_by": 3
    }, {
      "supply_id": 3,
      "claimed_by": null
    }, {
      "supply_id": 3,
      "claimed_by": 2
    }]
  }, {
    "_id": 4,
    "title": "testParty5",
    "description": "This is a test party 2, don't forget to check for very long descriptions to see if they look good.",
    "private_status": "false",
    "address": "140 Governors Dr",
    "city": "Amherst",
    "zip": "01002",
    "state": "MA",
    "country": "USA",
    "coordinates": {
      "latitude": 42.39508,
      "longitude": -72.531313
    },
    "datetime": "Thu Mar 29 2016 01:33:59 GMT-0500 (EST)",
    "host": 2,
    "attending": [
      1, 3
    ],
    "invited": [],
    "declined": [0],
    "complaints": [],
    "supplies": []
  }],

  "supplies": [{
    "_id": 0,
    "name": "New Amsterdam",
    "picture": ""
  }, {
    "_id": 1,
    "name": "Ballast Point",
    "picture": ""
  }, {
    "_id": 2,
    "name": "Blue Label",
    "picture": ""
  }, {
    "_id": 3,
    "name": "Tennessee Fire",
    "picture": ""
  }]
};

var data;
// If 'true', the in-memory object representing the database has changed,
// and we should flush it to disk.
var updated = false;
// Pull in Node's file system and path modules.
var fs = require('fs'),
  path = require('path');

try {
  // ./database.json may be missing. The comment below prevents ESLint from
  // complaining about it.
  // Read more about configuration comments at the following URL:
  // http://eslint.org/docs/user-guide/configuring#configuring-rules
  /* eslint "node/no-missing-require": "off" */
  data = require('./database.json');
} catch (e) {
  // ./database.json is missing. Use the seed data defined above
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  var collectionObj = data[collection];
  if (!collectionObj) {
    throw new Error(`Object collection ${collection} does not exist in the database!`);
  }
  var obj = collectionObj[id];
  if (obj === undefined) {
    throw new Error(`Object ${id} does not exist in object collection ${collection} in the database!`);
  }
  return JSONClone(data[collection][id]);
}
module.exports.readDocument = readDocument;

/**
 * Emulates writing a "document" to a NoSQL database.
 */
function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  if (id === undefined) {
    throw new Error(`You cannot write a document to the database without an _id! Use AddDocument if this is a new object.`);
  }
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  updated = true;
}
module.exports.writeDocument = writeDocument;

/**
 * Adds a new document to the NoSQL database.
 */
function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  if (newDoc.hasOwnProperty('_id')) {
    throw new Error(`You cannot add a document that already has an _id. addDocument is for new documents that do not have an ID yet.`);
  }
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}
module.exports.addDocument = addDocument;

/**
 * Deletes a document from an object collection.
 */
function deleteDocument(collectionName, id) {
  var collection = data[collectionName];
  if (!collection[id]) {
    throw new Error(`Collection ${collectionName} lacks an item with id ${id}!`);
  }
  delete collection[id];
  updated = true;
}
module.exports.deleteDocument = deleteDocument;

/**
 * Returns an entire object collection.
 */
function getCollection(collectionName) {
  return JSONClone(data[collectionName]);
}
module.exports.getCollection = getCollection;

/**
 * Reset the database.
 */
function resetDatabase() {
  data = JSONClone(initialData);
  updated = true;
}
module.exports.resetDatabase = resetDatabase;

// Periodically updates the database on the hard drive
// when changed.
setInterval(function() {
  if (updated) {
    fs.writeFileSync(path.join(__dirname, 'database.json'), JSON.stringify(data), {
      encoding: 'utf8'
    });
    updated = false;
  }
}, 200);
