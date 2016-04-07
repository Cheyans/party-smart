import {
  readDocument,
  writeDocument,
  getLimitedDBDump,
  readCollection
} from "./database.js";

export function getAuthorData(user, cb) {
  // We don"t need to send a body, so pass in "undefined" for the body.
  sendXHR("GET", "/users/" + user, undefined, (xhr) => {
    // Call the callback with the data.
    cb(JSON.parse(xhr.responseText));
  });
}

export function getPartyInfoData(partyId, cb) {
  sendXHR("GET", "/parties/" + partyId, undefined, (xhr) => {
    // Call the callback with the data.
    cb(JSON.parse(xhr.responseText));
  });
}

export function putPartyInvited(partyId, party, userId, cb) {
  var spliceParty = {
    invited: party.attending.concat(party.declined.concat(party.invited))
  }
  var body = spliceParty.invited.map((user) => (user).id);
  var index = body.indexOf(userId);
  body.splice(index, 1);
  sendXHR("PUT", "/parties/" + partyId + "/invited", body, (xhr) => {
    // Call the callback with the data.
    (cb(JSON.parse(xhr.responseText)));
  });
}

export function searchProfile(id, queryText, cb) {
  sendXHR("POST", "/search/" + id + "/user", queryText, (xhr) => {
    // Call the callback with the data.
    cb(JSON.parse(xhr.responseText));
  });
}

export function getProfileParties(id, cb) {
  sendXHR("GET", "/users/" + id + "/profile", undefined, (xhr) => {
    // Call the callback with the data.
    cb(JSON.parse(xhr.responseText));
  });
}

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
  writeDocument("users", updatedUser);
}

/*
 * Get complaints from the server
 */
export function getComplaints(coordinates, cb) {
  sendXHR("POST", "/nearby_parties", {
    longitude: coordinates.longitude,
    latitude: coordinates.latitude
  }, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

/*
 * Post complaints from the server
 */
export function postComplaints(complaint, cb) {
  sendXHR("POST", "/complaints", complaint, () => {
    cb();
  });
}

export function getUserName(id, cb) {
  var user = readDocument("users", parseInt(id));
  var info = {
    fname: "",
    lname: ""
  }
  info.fname = user.fname;
  info.lname = user.lname;
  return emulateServerReturn(info, cb);
}

export function getParty(id, cb) {
  return emulateServerReturn(readDocument("parties", id), cb);
}

export function getAdminInformation(page, pageSize, cb) {
  pageSize = pageSize > 1000 ? 1000 : pageSize;
  var data = getLimitedDBDump(page, pageSize);
  var supplies = readCollection("supplies");
  var users = data["users"];
  for (var user of users) {
    user["total complaints"] = 0;
    user["friends"] = user["friends"].map((friend) => {
      var user = users[friend];
      return {
        name: [user.fname, user.lname].join(" ")
      }
    })
    for (var party of data["parties"]) {
      if (party["host"] === user["_id"]) {
        party["host"] = [user["fname"], user["lname"]].join(" ");
        party["attending length"] = party["attending"].length;
        party["complaints length"] = party["complaints"].length;
        user["total complaints"] += party["complaints length"];
        party["dateTime"] = new Date(party["dateTime"]).toLocaleString();
        party["attending"] = party["attending"].map((attendee, i) => {
          var user = users[i];
          return {
            id: i,
            name: [user.fname, user.lname].join(" ")
          };
        });
        party["supplies"] = party["supplies"].map((supply) => {
          var user = users[supply.claimed_by];
          var userInfo = {};
          if (user) {
            userInfo.name = [user.fname, user.lname].join(" ")
          }
          return Object.assign(userInfo, supplies[supply.supply_id]);
        });
        delete party["invited"];
        delete party["not attending"];
      }
    }
  }
  return emulateServerReturn(data, cb);
}

export function getPartyData(id, cb) {
  return emulateServerReturn(readDocument("parties", id), cb);
}

export function createNewParty(party) {
  var newParty = {
    "title": party.title,
    "description": party.description,
    "private_status": party.private,
    "address": party.address,
    "city": party.city,
    "zip": party.zip,
    "state": party.state,
    "country": party.country,
    "date": party.date,
    "time": party.time,
    "invited": party.invited,
    "supplies": party.supplies,
    "phone_number": party.phone_number
  };
  sendXHR("POST", "/parties", newParty);
}

export function getInvitedData(idList, cb) {
  var people = [];
  for (var i = 0; i < idList.length; i++) {
    people.push(readDocument("users", idList[i]));
  }
  return emulateServerReturn(people, cb);
}

export function setPartyPrivate(partyId, cb) {
  var party = readDocument("parties", partyId);
  party["private status"] = "true";
  writeDocument("parties", party);
  return emulateServerReturn("true", cb);
}

export function setPartyOpen(partyId, cb) {
  var party = readDocument("parties", partyId);
  party["private status"] = "false";
  writeDocument("parties", party);
  return emulateServerReturn("false", cb);
}

export function resetDatabase() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/resetdb");
  xhr.addEventListener("load", function() {
    window.alert("Database reset! Refreshing the page now...");
    document.location.reload(false);
  });
  xhr.send();
}

var token = "eyJpZCI6MH0="; // <-- Put your base64"d JSON token here
/**
 * Properly configure+send an XMLHttpRequest with error handling, authorization token,
 * and other needed properties.
 */
function sendXHR(verb, resource, body, cb) {
  var xhr = new XMLHttpRequest();
  xhr.open(verb, resource);
  xhr.setRequestHeader("Authorization", "Bearer " + token);

  /* global ErrorBanner */

  // Response received from server. It could be a failure, though!
  xhr.addEventListener("load", function() {
    var statusCode = xhr.status;
    if (statusCode >= 200 && statusCode < 300) {
      // Success: Status code is in the [200, 300) range.
      // Call the callback with the final XHR object.
      cb(xhr);
    } else {
      // Client or server error.
      ErrorBanner();
    }
  });

  // Time out the request if it takes longer than 10,000 milliseconds (10 seconds)
  xhr.timeout = 10000;

  // Network failure: Could not connect to server.
  xhr.addEventListener("error", function() {
    ErrorBanner();
  });

  // Network failure: request took too long to complete.
  xhr.addEventListener("timeout", function() {
    ErrorBanner();
  });

  switch (typeof(body)) {
    case "undefined":
      // No body to send.
      xhr.send();
      break;
    case "string":
      // Tell the server we are sending text.
      xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
      xhr.send(body);
      break;
    case "object":
      // Tell the server we are sending JSON.
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      // Convert body into a JSON string.
      xhr.send(JSON.stringify(body));
      break;
    default:
      throw new Error("Unknown body type: " + typeof(body));
  }
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
