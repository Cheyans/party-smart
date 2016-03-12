import {
  readDocument,
  writeDocument,
  addDocument,
  getLimitedDBDump,
  getCollection
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
  var supplies = getCollection('supplies');
  var users = data['users'];
  for (var user of users) {
    user['total complaints'] = 0;
    user['friends'] = user['friends'].map((friend) => {
      var user = users[friend];
      return {name: [user.fname, user.lname].join(" ")}
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

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */

function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}
