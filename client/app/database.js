import React from 'react';

// Modify with your startup's name!
var startupName = "Party Smart";

// Put your mock objects here, as in Workshop 4
var initialData = {
  "users": [
    {
      "_id": 0,
      "fname": "Cheyan",
      "lname": "Setayesh",
      "phone_number": "999999999",
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
    }
  ],

  "parties": [
    {
      "_id": 0,
      "title": "testParty1",
      "description": "This is a test party, don't forget to check for very long descriptions to see if they look good.",
      "private status": "false",
      "address": "96 Pleasant Street",
      "city": "Amherst",
      "zip": "01003",
      "state": "MA",
      "country": "USA",
      "dateTime": "Thu July 03 2016 23:33:59 GMT-0500 (EST)",
      "host": 0,
      "attending": [
        1, 2, 3
      ],
      "invited": [4],
      "not attending": [],
      "complaints": [
        {
          "dateTime": "Thu Mar 03 2016 23:33:59 GMT-0500 (EST)",
          "message": null
        }, {
          "dateTime": "Thu Mar 03 2016 23:33:59 GMT-0500 (EST)",
          "message": "turn your shit down bruh"
        }
      ],
      "supplies": [
        {
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
          "supply_id": 4,
          "claimed_by": 2
        }
      ]
    }, {
      "_id": 1,
      "title": "testParty2",
      "description": "This is a test party 2, don't forget to check for very long descriptions to see if they look good.",
      "private status": "false",
      "address": "95 Pleasant Street",
      "city": "Amherst",
      "zip": "01003",
      "state": "MA",
      "country": "USA",
      "dateTime": "Thu Mar 22 2016 01:33:59 GMT-0500 (EST)",
      "host": 2,
      "attending": [1],
      "invited": [
        0, 1, 3
      ],
      "not attending": [3],
      "complaints": [],
      "supplies": [
        {
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
          "supply_id": 4,
          "claimed_by": 2
        }
      ]
    }, {
      "_id": 2,
      "title": "testParty3",
      "description": "This is a test party 2, don't forget to check for very long descriptions to see if they look good.",
      "private status": "false",
      "address": "94 Pleasant Street",
      "city": "Amherst",
      "zip": "01003",
      "state": "MA",
      "country": "USA",
      "dateTime": "Thu Mar 13 2016 01:33:59 GMT-0500 (EST)",
      "host": 1,
      "attending": [0],
      "invited": [
        2, 3
      ],
      "not attending": [3],
      "complaints": [],
      "supplies": [
        {
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
          "supply_id": 4,
          "claimed_by": 2
        }
      ]
    }, {
      "_id": 3,
      "title": "testParty4",
      "description": "This is a test party 2, don't forget to check for very long descriptions to see if they look good.",
      "private status": "false",
      "address": "94 Pleasant Street",
      "city": "Amherst",
      "zip": "01003",
      "state": "MA",
      "country": "USA",
      "dateTime": "Thu Mar 04 2016 01:33:59 GMT-0500 (EST)",
      "host": 2,
      "attending": [1, 2, 3],
      "invited": [],
      "not attending": [0],
      "complaints": [],
      "supplies": [
        {
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
          "supply_id": 4,
          "claimed_by": 2
        }
      ]
    }, {
      "_id": 4,
      "title": "testParty5",
      "description": "This is a test party 2, don't forget to check for very long descriptions to see if they look good.",
      "private status": "false",
      "address": "94 Pleasant Street",
      "city": "Amherst",
      "zip": "01003",
      "state": "MA",
      "country": "USA",
      "dateTime": "Thu Mar 29 2016 01:33:59 GMT-0500 (EST)",
      "host": 2,
      "attending": [
        1, 3
      ],
      "invited": [],
      "not attending": [0],
      "complaints": [],
      "supplies": []
    }
  ],

  "supplies": [
    {
      "_id": 0,
      "description": "New Amsterdam",
      "picture": ""
    }, {
      "_id": 1,
      "description": "Ballast Point",
      "picture": ""
    }, {
      "_id": 2,
      "description": "Blue Label",
      "picture": ""
    }, {
      "_id": 3,
      "description": "Tennessee Fire",
      "picture": ""
    }
  ]
};

var data = JSON.parse(localStorage.getItem(startupName));
if (data === null) {
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

export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection][id]);
}

export function readDocumentLength(collection) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.

  return JSONClone(data[collection].length);
}

/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem(startupName, JSON.stringify(data));
}

/**
 * Adds a new document to the NoSQL database.
 */
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;
  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

export function getNextCollectionID(collectionName){
  return data[collectionName].length;
}

/**
 * Reset our browser-local database.
 */
export function resetDatabase() {
  localStorage.setItem(startupName, JSON.stringify(initialData));
  data = JSONClone(initialData);
}

/*
*Returns a cloned collection
*/
export function readCollection(collection) {
  return JSONClone(data[collection]);
}

export function getLimitedDBDump(page, pageSize) {
  var users = readCollection('users');
  var parties = readCollection('parties');
  var requestedUsers = [];
  var requestedParties = [];
  var index = pageSize * page
  for (var i = index; (i < users.length && i < (index + pageSize)); i++) {
    requestedUsers.push((users[i]));
  }

  for (var j = index; (j < parties.length && j < (index + pageSize)); j++) {
    requestedParties.push((parties[j]));
  }
  return JSONClone({users: requestedUsers, parties: requestedParties});
}
