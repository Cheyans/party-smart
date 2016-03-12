import {readDocument, writeDocument, addDocument, getLimitedDBDump, getNextCollectionID} from './database.js';


export function getAuthorData(id, cb) {
  return emulateServerReturn(readDocument('users', id), cb);
}

export function getAdminInformation(page, pageSize, cb) {
  pageSize = pageSize > 1000? 1000 : pageSize;
  var data = getLimitedDBDump(page, pageSize);
  for(var user of data['users']) {
    user['total_complaints'] = 0;
    for(var party of data['parties']) {
      if(party['host'] === user['_id']) {
        user['total_complaints']++;
      }
    }
  }
  return emulateServerReturn(data, cb);
}

export function getPartyData(id, cb) {
  return emulateServerReturn(readDocument('parties', id), cb);
}


export function createNewParty(party){
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
          "supplies" : party.supplies
        };
        console.log(newParty);
        addDocument("parties", newParty);

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
