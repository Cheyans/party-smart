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

export function putPartySupplies(partyId, party, supplyId, userId, cb) {
  var body = party.supplies.map((supply) => [(supply).id, (supply).userId]);
  var index = body.indexOf([supplyId, userId]);
  body.splice(index, 1);
  sendXHR("PUT", "/parties/" + partyId + "/supplies", body, (xhr) => {
    // Call the callback with the data.
    (cb(JSON.parse(xhr.responseText)));
  });
}

export function searchProfile(id, queryText, cb) {
  sendXHR("POST", "/search/" + id + "/user", {query: queryText}, (xhr) => {
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

export function addProfileFriend(userId,friendId, cb){
  sendXHR("POST", "/users/" + userId +"/addfriend/" + friendId, undefined, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
}

export function removeProfileFriend(userId,friendId, cb){
  sendXHR("POST", "/users/" + userId +"/removefriend/" + friendId, undefined, (xhr) => {
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

export function getAdminInformation(cb) {
  sendXHR("GET", "/admin", undefined, (xhr) => {
    var data = JSON.parse(xhr.responseText);
    data.users.forEach((user) => {
      user["total complaints"] = 0;
      data.parties.forEach((party) => {
         if (party.host_id === user.id) {
           party["attending length"] = party["attending"].length;
           party["complaints length"] = party["complaints"].length;
           user["total complaints"] += party["complaints length"];
         }
      })
    })
    cb(data);
  });
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

export function setPartyStatus(partyId, value, cb) {
  sendXHR("PUT", "/parties/" + partyId + "/private_status" , value, (xhr) => {
    cb(JSON.parse(xhr.responseText));
  });
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

var token = "eyJpZCI6IjAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMCJ9"; // <-- Put your base64"d JSON token here
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
