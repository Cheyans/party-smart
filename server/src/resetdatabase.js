var ObjectID = require('mongodb').ObjectID;

// Put your startup's name here (only letters and numbers -- no spaces, apostrophes, or special characters!)
var databaseName = "PartySmart";
// Put the initial mock objects here.
// Your startup's initial mock objects go here
var initialData = {
  "users": [{
    "_id": new ObjectID("000000000000000000000000"),
    "full_name": "Cheyan Setayesh",
    "fname": "Cheyan",
    "lname": "Setayesh",
    "phone_number": "7818799033",
    "email": "a@umass.edu",
    "picture": "img/guy.jpg",
    "admin": "true",
    "friends": [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002")]
  }, {
    "_id": new ObjectID("000000000000000000000001"),
    "full_name": "Tim Richards",
    "fname": "Tim",
    "lname": "Richards",
    "phone_number": "999999999",
    "email": "c@umass.edu",
    "picture": "img/guy.jpg",
    "admin": "true",
    "friends": [new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000003")]
  }, {
    "_id": new ObjectID("000000000000000000000002"),
    "full_name": "Alex Redden",
    "fname": "Alex",
    "lname": "Redden",
    "phone_number": "999999999",
    "email": "e@umass.edu",
    "picture": "img/guy.jpg",
    "admin": "true",
    "friends": [new ObjectID("000000000000000000000000"), new ObjectID("000000000000000000000003")]
  }, {
    "_id": new ObjectID("000000000000000000000003"),
    "full_name": "John Vilk",
    "fname": "John",
    "lname": "Vilk",
    "phone_number": "999999999",
    "email": "g@umass.edu",
    "picture": "img/guy.jpg",
    "admin": "true",
    "friends": []
  }],

  "parties": [{
    "_id": new ObjectID("000000000000000000000000"),
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
    "host": new ObjectID("000000000000000000000000"),
    "attending": [
      new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000003")
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
      "supply_id": new ObjectID("000000000000000000000001"),
      "claimed_by": new ObjectID("000000000000000000000002")
    }, {
      "supply_id": new ObjectID("000000000000000000000001"),
      "claimed_by": new ObjectID("000000000000000000000002")
    }, {
      "supply_id": new ObjectID("000000000000000000000002"),
      "claimed_by": new ObjectID("000000000000000000000003")
    }, {
      "supply_id": new ObjectID("000000000000000000000003"),
      "claimed_by": null
    }, {
      "supply_id": new ObjectID("000000000000000000000003"),
      "claimed_by": new ObjectID("000000000000000000000002")
    }]
  }, {
    "_id": new ObjectID("000000000000000000000001"),
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
    "host": new ObjectID("000000000000000000000002"),
    "attending": [new ObjectID("000000000000000000000001")],
    "invited": [
      new ObjectID("000000000000000000000000"), new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000003")
    ],
    "declined": [new ObjectID("000000000000000000000003")],
    "complaints": [],
    "supplies": [{
      "supply_id": new ObjectID("000000000000000000000001"),
      "claimed_by": new ObjectID("000000000000000000000002")
    }, {
      "supply_id": new ObjectID("000000000000000000000001"),
      "claimed_by": new ObjectID("000000000000000000000002")
    }, {
      "supply_id": new ObjectID("000000000000000000000002"),
      "claimed_by": new ObjectID("000000000000000000000003")
    }, {
      "supply_id": new ObjectID("000000000000000000000003"),
      "claimed_by": null
    }, {
      "supply_id": new ObjectID("000000000000000000000003"),
      "claimed_by": new ObjectID("000000000000000000000002")
    }]
  }, {
    "_id": new ObjectID("000000000000000000000002"),
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
    "host": new ObjectID("000000000000000000000001"),
    "attending": [new ObjectID("000000000000000000000000")],
    "invited": [
      new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000003")
    ],
    "declined": [new ObjectID("000000000000000000000003")],
    "complaints": [],
    "supplies": [{
      "supply_id": new ObjectID("000000000000000000000001"),
      "claimed_by": new ObjectID("000000000000000000000002")
    }, {
      "supply_id": new ObjectID("000000000000000000000001"),
      "claimed_by": new ObjectID("000000000000000000000002")
    }, {
      "supply_id": new ObjectID("000000000000000000000002"),
      "claimed_by": new ObjectID("000000000000000000000003")
    }, {
      "supply_id": new ObjectID("000000000000000000000003"),
      "claimed_by": null
    }, {
      "supply_id": new ObjectID("000000000000000000000003"),
      "claimed_by": new ObjectID("000000000000000000000002")
    }]
  }, {
    "_id": new ObjectID("000000000000000000000003"),
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
    "host": new ObjectID("000000000000000000000002"),
    "attending": [new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000002"), new ObjectID("000000000000000000000003")],
    "invited": [],
    "declined": [new ObjectID("000000000000000000000000")],
    "complaints": [],
    "supplies": [{
      "supply_id": new ObjectID("000000000000000000000001"),
      "claimed_by": new ObjectID("000000000000000000000002")
    }, {
      "supply_id": new ObjectID("000000000000000000000001"),
      "claimed_by": new ObjectID("000000000000000000000002")
    }, {
      "supply_id": new ObjectID("000000000000000000000002"),
      "claimed_by": new ObjectID("000000000000000000000003")
    }, {
      "supply_id": new ObjectID("000000000000000000000003"),
      "claimed_by": null
    }, {
      "supply_id": new ObjectID("000000000000000000000003"),
      "claimed_by": new ObjectID("000000000000000000000002")
    }]
  }, {
    "_id": new ObjectID("000000000000000000000004"),
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
    "host": new ObjectID("000000000000000000000002"),
    "attending": [
      new ObjectID("000000000000000000000001"), new ObjectID("000000000000000000000003")
    ],
    "invited": [],
    "declined": [new ObjectID("000000000000000000000000")],
    "complaints": [],
    "supplies": []
  }],

  "supplies": [{
    "_id": new ObjectID("000000000000000000000000"),
    "name": "New Amsterdam",
    "picture": ""
  }, {
    "_id": new ObjectID("000000000000000000000001"),
    "name": "Ballast Point",
    "picture": ""
  }, {
    "_id": new ObjectID("000000000000000000000002"),
    "name": "Blue Label",
    "picture": ""
  }, {
    "_id": new ObjectID("000000000000000000000003"),
    "name": "Tennessee Fire",
    "picture": ""
  }]
};

/**
 * Resets a collection.
 */
function resetCollection(db, name, cb) {
  // Drop / delete the entire object collection.
  db.collection(name).drop(function() {
    // Get all of the mock objects for this object collection.
    var collection = initialData[name];
    var objects = Object.keys(collection).map(function(key) {
      return collection[key];
    });
    // Insert objects into the object collection.
    db.collection(name).insertMany(objects, cb);
  });
}

/**
 * Reset the MongoDB database.
 * @param db The database connection.
 */
function resetDatabase(db, cb) {
  // The code below is a bit complex, but it basically emulates a
  // "for" loop over asynchronous operations.
  var collections = Object.keys(initialData);
  var i = 0;

  // Processes the next collection in the collections array.
  // If we have finished processing all of the collections,
  // it triggers the callback.
  function processNextCollection() {
    if (i < collections.length) {
      var collection = collections[i];
      i++;
      // Use myself as a callback.
      resetCollection(db, collection, processNextCollection);
    } else {
      cb();
    }
  }

  // Start processing the first collection!
  processNextCollection();
}

// Check if called directly via 'node', or required() as a module.
// http://stackoverflow.com/a/6398335
if(require.main === module) {
  // Called directly, via 'node src/resetdatabase.js'.
  // Connect to the database, and reset it!
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/' + databaseName;
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw new Error("Could not connect to database: " + err);
    } else {
      console.log("Resetting database...");
      resetDatabase(db, function() {
        console.log("Database reset!");
        // Close the database connection so NodeJS closes.
        db.close();
      });
    }
  });
} else {
  // require()'d.  Export the function.
  module.exports = resetDatabase;
}
