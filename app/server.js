import {readDocument, writeDocument, addDocument, getLimitedDBDump} from './database.js';

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
  pageSize = pageSize > 1000? 1000 : pageSize;
  var data = getLimitedDBDump(page, pageSize);
  for(var user of data['users']) {
    user['total complaints'] = 0;
    for(var party of data['parties']) {
      if(party['host'] === user['_id']) {
        party['host'] = [user['fname'], user['lname']].join(" ");
        party['attending length'] = party['attending'].length;
        party['complaints length'] = party['complaints'].length;
        user['total complaints'] += party['complaints length'];
        party['dateTime'] = new Date(party['dateTime']).toLocaleString();
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

export function getInvitedData(idList, cb) {
  var people = [];
  for (var i = 0; i < idList.length; i++) {
    people.push(readDocument('users', idList[i]));
  }
  return emulateServerReturn(people, cb);
}

export function setPartyPrivate(partyId, cb) {
  var party = readDocument('parties', partyId);
  party["private status"] = "true";
  writeDocument('parties', party);
  return emulateServerReturn("true", cb);
}

export function setPartyOpen(partyId, cb) {
  var party = readDocument('parties', partyId);
  party["private status"] = "false";
  writeDocument('parties', party);
  return emulateServerReturn("false", cb);
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
