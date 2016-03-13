import {
  readDocument,
  writeDocument,
  addDocument,
  readDocumentLength,
  getLimitedDBDump,
  readCollection
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

export function getUserName(id, cb) {
  var user = readDocument('users', id);
  var info = {
    fname: "",
    lname: ""
  }
  info.fname = user.fname;
  info.lname = user.lname;
  return emulateServerReturn(info, cb);
}

export function getParty(id, cb) {
  return emulateServerReturn(readDocument('parties', id), cb);
}

export function getHostedParties(id, cb) {
  var size = readDocumentLength('parties');
  var hosts = [];
  var index = 0;
  for (var i = 0; i < size; i++) {
    var curParty = readDocument('parties', i);
    if (curParty.host === parseInt(id)) {
      hosts[index] = curParty._id;
      index++;
    }
  }
  return emulateServerReturn(hosts, cb);

}

export function getInviteInfo(id, cb) {
  var size = readDocumentLength('parties');
  var inv = [];
  var index = 0;
  for (var i = 0; i < size; i++) {
    var curParty = readDocument('parties', i);
    for (var z = 0; z < curParty.invited.length; z++) {
      if (curParty.invited[z] === parseInt(id)) {
        inv[index] = curParty._id;
        index++;
      }
    }
  }
  return emulateServerReturn(inv.map((id) => readDocument('parties', id)), cb);
}

export function getDeclinedInfo(id, cb) {
  var inv = [];
  var index = 0;
  var parties = readCollection('parties');
  for (var party of parties) {
    for (var z = 0; z < party["not attending"].length; z++) {
      if (party["not attending"][z] === parseInt(id)) {
        inv[index] = party._id;
        index++;
      }
    }
  }
  return emulateServerReturn(inv.map((id) => readDocument('parties', id)), cb);
}

export function getGoingInfo(id, cb) {
  var inv = [];
  var index = 0;
  var parties = readCollection('parties');
  for (var party of parties) {
    for (var z = 0; z < party.attending.length; z++) {
      if (party.attending[z] === parseInt(id)) {
        inv[index] = party._id;
        index++;
      }
    }
  }
  return emulateServerReturn(inv.map((id) => readDocument('parties', id)), cb);
}

export function getPrevParties(id, cb) {
  var parties = readCollection('parties');
  var index = 0;
  var curDate = new Date();
  var parDate = new Date();
  var prevParties = {
    attended: [],
    "not attending": [],
    invited: []
  }
  for (var party of parties) {
    for (var z = 0; z < party.attending.length; z++) {
      if (party.attending[z] === parseInt(id)) {
        parDate = new Date(party.dateTime);
        if (parDate.getTime() < curDate.getTime()) {
          prevParties.attended[index] = party._id;
          index++;
        }
      }
    }
    index = 0;
    for (z = 0; z < party["not attending"].length; z++) {
      if (party["not attending"][z] === parseInt(id)) {
        parDate = new Date(party.dateTime);
        if (parDate.getTime() < curDate.getTime()) {
          prevParties["not attending"][index] = party._id;
          index++;
        }
      }
    }
    index = 0;
    for (z = 0; z < party.invited.length; z++) {
      if (party.invited[z] === parseInt(id)) {
        parDate = new Date(party.dateTime);
        if (parDate.getTime() < curDate.getTime()) {
          prevParties.invited[index] = party._id;
          index++;
        }
      }
    }
  }
  prevParties.attended = prevParties.attended.map((att) => readDocument('parties', att));
  prevParties["not attending"] = prevParties["not attending"].map((nat) => readDocument('parties', nat));
  prevParties.invited = prevParties.invited.map((inv) => readDocument('parties', inv));
  return emulateServerReturn(prevParties, cb);
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
      }
    }
  }
  return emulateServerReturn(data, cb);
}

export function getPartyData(id, cb) {
  return emulateServerReturn(readDocument('parties', id), cb);
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
