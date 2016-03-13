import {
  readDocument,
  writeDocument,
  addDocument,
  getLimitedDBDump,
  readCollection,
  getNextCollectionID
} from './database.js';

export function updateUserData(data) {
  var updatedUser = {
    "_id": data.id,
    "fname": data.fname,
    "lname": data.lname,
    "phone_number": data.phone_number,
    "email": data.email,
    "picture": data.picture,
    "admin": data.admin,
    "friends": data.friends
  }
  writeDocument('users', updatedUser);
}

export function getAuthorData(id, cb) {
  return emulateServerReturn(readDocument('users', id), cb);
}

export function getAdminInformation(page, pageSize, cb) {
  pageSize = pageSize > 1000 ? 1000 : pageSize;
  var data = getLimitedDBDump(page, pageSize);
  var supplies = readCollection('supplies');
  var users = data['users'];
  for (var user of users) {
    user['total complaints'] = 0;
    user['friends'] = user['friends'].map((friend) => {
      var user = users[friend];
      return {
        name: [user.fname, user.lname].join(" ")
      }
    })
    for (var party of data['parties']) {
      if (party['host'] === user['_id']) {
        party['host'] = [user['fname'], user['lname']].join(" ");
        party['attending length'] = party['attending'].length;
        party['complaints length'] = party['complaints'].length;
        user['total complaints'] += party['complaints length'];
        party['dateTime'] = new Date(party['dateTime']).toLocaleString();
        party['attending'] = party['attending'].map((attendee, i) => {
          var user = users[i];
          return {
            id: i,
            name: [user.fname, user.lname].join(" ")
          };
        });
        party['supplies'] = party['supplies'].map((supply) => {
          var user = users[supply.claimed_by];
          var userInfo = {};
          if (user) {
            userInfo.name = [user.fname, user.lname].join(" ")
          }
          return Object.assign(userInfo, supplies[supply.supply_id]);
        });
        delete party['invited'];
        delete party['not attending'];
        break;
      }
    }
  }
  return emulateServerReturn(data, cb);
}

export function getPartyData(id, cb) {
  return emulateServerReturn(readDocument('parties', id), cb);
}

export function createNewParty(party) {
  var dateTime = [party.time, party.date].join(" ");
  var newParty = {
    "_id": getNextCollectionID("parties"),
    "title": party.title,
    "description": party.description,
    "private status": false,
    "address": party.address,
    "city": party.city,
    "zip": party.zip,
    "state": party.state,
    "country": party.country,
    "dateTime": new Date(dateTime).toString(),
    "host": party.host,
    "attendees": party.attendees,
    "complaints": party.complaints,
    "supplies": party.supplies
  };
  addDocument("parties", newParty);
}

export function addComplaint(partyId, complaint, cb) {
  var party = readDocument('parties', partyId);
  party.complaints.push({
    dateTime: new Date().toString(),
    message: complaint
  })
  return emulateServerReturn(writeDocument('parties', party), cb);
}

export function getNearByParties(coordinates, cb) {
  //need to loop through party objects and match our address
  //we are going to chage the formatting of the database so we are actually goign to
  //compare our coordinates with GPScoordinates and output the address as well
  var parties = readCollection('parties');
  var nearByParties = [];
  for (var party of parties) {
    var address = party['address'];
    if (address === coordinates) {
      nearByParties.push({
        'id': party['_id'],
        'address': party['address'],
        'city': party['city'],
        'zip': party['zip'],
        'state': party['state']
      });
    }
  }
  return emulateServerReturn(nearByParties, cb);
}

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */

function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}
