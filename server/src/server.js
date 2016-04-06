var express = require("express");
var bodyParser = require("body-parser");
var validate = require("express-jsonschema").validate;
var database = require("./database");
var partySchema = require("./schemas/party.json");
//var messageService = require("./message");

var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var deleteDocument = database.deleteDocument;
var getCollection = database.getCollection;


var app = express();
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(express.static("../client/build"));

// Fetch user information
app.get("/users/:id", function(req, res) {
  var userIdRequesting = getUserIdFromToken(req.get("Authorization"));
  var userIdRequested = parseInt(req.params.id);
  if (userIdRequested === userIdRequesting) {
    try {
      var user = readDocument("users", userIdRequested);
    } catch (err) {
      res.status(404).end();
    }
    user.friends = user.friends.map(getBasicUserInfo);
    user.id = user._id.toString();

    delete user.admin;
    delete user._id;
    res.send(user);
  } else {
    res.status(401).end();
  }
});

// Fetch list of basic party information for user
app.get("/users/:id/parties", function(req, res) {
  var userIdRequesting = getUserIdFromToken(req.get("Authorization"));
  var userIdRequested = parseInt(req.params.id);
  if (userIdRequested === userIdRequesting) {
    try {
      var partyInfo = getBasicPartyInfo(userIdRequested);
    } catch (err) {
      res.status(404).end();
    }
    res.send(partyInfo);
  } else {
    res.status(401).end();
  }
});

app.get("/users/:id/profile", function(req, res) {
  var userIdRequesting = getUserIdFromToken(req.get("Authorization"));
  var userIdRequested = parseInt(req.params.id);
  if (userIdRequested === userIdRequesting) {
    var parties = getCollection("parties");
    var indexPrev = 0;
    var indexFuture = 0;
    var indexHost = 0;
    var curDate = new Date();
    var parDate = new Date();
    var profileParties = {
      prevParties: {
        attended: [],
        "not attending": [],
        declined: [],
        invited: []
      },
      futureParties: {
        attended: [],
        "not attending": [],
        declined: [],
        invited: []
      },
      hostingParties: []
    }
    for (var party of parties) {
      indexFuture = 0;
      indexPrev = 0;
      for (var z = 0; z < party.attending.length; z++) {
        if (party.attending[z] === userIdRequesting) {
          parDate = new Date(party.datetime);
          if (parDate.getTime() < curDate.getTime()) {
            profileParties.prevParties.attended[indexPrev] = party._id;
            indexPrev++;
          } else
          if (parDate.getTime() > curDate.getTime()) {
            profileParties.futureParties.attended[indexFuture] = party._id;
            indexFuture++;
          }
        }
      }
      indexFuture = 0;
      indexPrev = 0;
      for (z = 0; z < party.declined.length; z++) {
        if (party.declined[z] === userIdRequesting) {
          parDate = new Date(party.datetime);
          if (parDate.getTime() < curDate.getTime()) {
            profileParties.prevParties["not attending"][indexPrev] = party._id;
            indexPrev++;
          } else
          if (parDate.getTime() > curDate.getTime()) {
            profileParties.futureParties["not attending"][indexFuture] = party._id;
            indexFuture++;
          }
        }
      }
      indexFuture = 0;
      indexPrev = 0;
      for (z = 0; z < party.invited.length; z++) {
        if (party.invited[z] === userIdRequesting) {
          parDate = new Date(party.datetime);
          if (parDate.getTime() < curDate.getTime()) {
            profileParties.prevParties.invited[indexPrev] = party._id;
            indexPrev++;
          } else
          if (parDate.getTime() > curDate.getTime()) {
            profileParties.futureParties.invited[indexFuture] = party._id;
            indexFuture++;
          }
        }
      }
      if (party.host === userIdRequesting) {
        profileParties.hostingParties[indexHost] = party._id;
        indexHost++;
      }
    }
    profileParties.hostingParties = profileParties.hostingParties.map((host) => readDocument("parties", host));
    profileParties.futureParties.attended = profileParties.futureParties.attended.map((att) => readDocument("parties", att));
    profileParties.futureParties["not attending"] = profileParties.futureParties["not attending"].map((nat) => readDocument("parties", nat));
    profileParties.futureParties.invited = profileParties.futureParties.invited.map((inv) => readDocument("parties", inv));
    profileParties.prevParties.attended = profileParties.prevParties.attended.map((att) => readDocument("parties", att));
    profileParties.prevParties["not attending"] = profileParties.prevParties["not attending"].map((nat) => readDocument("parties", nat));
    profileParties.prevParties.invited = profileParties.prevParties.invited.map((inv) => readDocument("parties", inv));
    res.send(profileParties);
  } else {
    res.status(401).end();
  }
});

// Fetch party information
app.get("/parties/:id", function(req, res) {
  var userIdRequesting = getUserIdFromToken(req.get("Authorization"));
  var partyIdRequested = parseInt(req.params.id);
  try {
    var party = readDocument("parties", partyIdRequested);
  } catch (err) {
    res.status(404).end();
  }
  if (verifyPartyAccess(party, userIdRequesting)) {
    party.id = party._id.toString();
    delete party._id;

    party.host = getBasicUserInfo(party.host);
    party.attending = party.attending.map((id) => getBasicUserInfo(id));
    party.invited = party.invited.map((id) => getBasicUserInfo(id));
    party.declined = party.declined.map((id) => getBasicUserInfo(id));
    party.supplies = party.supplies.map((supply) => {
      return getSupplyInfo(supply.supply_id, supply.claimed_by);
    });
    res.send(party);
  } else {
    res.status(401).end();
  }
});

app.get("/nearby_parties", function(req, res) {
  var latitude = req.get("Latitude");
  var longitude = req.get("Longitude");
  if (latitude && longitude) {
    var parties = getCollection("parties");
    var nearbyParties = [];
    parties.forEach((party) => {
      var coordinates = party.coordinates;
      if (withinRange(0.25, coordinates.latitude, coordinates.longitude, latitude, longitude)) {
        nearbyParties.push({
          id: party._id.toString(),
          address: party.address,
          city: party.city,
          state: party.state,
          zip: party.zip
        });
      }
    });
    res.send(nearbyParties);
  } else {
    res.status(400).end();
  }
});

//creating a new party server route
app.post('/parties', validate({
  body: partySchema
}), function(req, res) {
  // If this function runs, `req.body` passed JSON validation!
  var newParty = req.body;
  newParty.host = getUserIdFromToken(req.get('Authorization'));
  newParty.coordinates = {
    "latitude": null,
    "longitude": null
  }
  newParty.dateTime = new Date([newParty.date, newParty.time].join(" ")).toString();
  delete newParty.time;
  delete newParty.date;

  newParty.attending = [];
  newParty.declined = [];
  newParty.compaints = [];
  newParty.supplies = newParty.supplies.map((id) => {
    return {
      "supply_id": id,
      "claimed_by": null
    }
  });
  addDocument('parties', newParty);
  var body = "Your party at " + newParty.address + " has been registered.";
  messageService.sendSMS(newParty.phone_number, body);
  res.status(201).end();
});

function containsUser(users,user){
  for(var u of users){
    if(u._id==user._id){
      return true;
    }
  }
  return false;
}

app.post("/search/:userId/user", function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var userdata = readDocument('users', fromUser);
  if (typeof(req.body) === 'string') {
    var query = req.body;

    var friends = userdata.friends.map((userid)=>readDocument("users",userid));
    var allusers = getCollection("users");
        var searchedFriendUsers = [];
        var searchedAllUsers = [];
    for(var user of allusers){
      user.name = (user.fname + " " + user.lname).toLowerCase();
      if(user.name.search(query)!=-1 && !containsUser(friends,user)){
        searchedAllUsers.push(user);
      }
    }
    for(var friend of friends){
      friend.name = (friend.fname+ " "+friend.lname).toLowerCase();
      if(friend.name.search(query)!=-1){
        searchedFriendUsers.push(friend);
      }
    }
    var search = {
      searchedAllUsers:[],
      searchedFriendUsers:[]
    };
    search.searchedAllUsers = searchedAllUsers;
    search.searchedFriendUsers = searchedFriendUsers;
    res.send(search);
  } else {
    // 400: Bad Request.
    res.status(400).end();
  }
});



// update invited list for a party
app.put('/parties/:id/invited', function(req, res) {
  var fromUser = getUserIdFromToken(req.get('Authorization'));
  var parties = getCollection("parties");
  var isHost = false;
  for (var party of parties) {
    if (party.host == fromUser && party._id == req.params.id) {
      isHost = true;
      break;
    }
  }
  var index;
  if (isHost) {
    for (var user of party.attending) {
      if (req.body.indexOf(user.toString()) == -1) {
        index = party.attending.indexOf(user);
        party.attending.splice(index, 1);
      }
    }
    for (user of party.declined) {
      if (req.body.indexOf(user.toString()) == -1) {
        index = party.declined.indexOf(user);
        party.declined.splice(index, 1);
      }
    }
    for (user of party.invited) {
      if (req.body.indexOf(user.toString()) == -1) {
        index = party.invited.indexOf(user);
        party.invited.splice(index, 1);
      }
    }
    writeDocument("parties", party)
    var updatedParty = {
      host: [],
      attending: [],
      invited: [],
      declined: []
    };
    updatedParty.host = getBasicUserInfo(party.host);
    updatedParty.attending = party.attending.map((id) => getBasicUserInfo(id));
    updatedParty.invited = party.invited.map((id) => getBasicUserInfo(id));
    updatedParty.declined = party.declined.map((id) => getBasicUserInfo(id));
    res.send(updatedParty);
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
})

app.delete("/parties/:id", function(req, res) {
  var userIdRequesting = getUserIdFromToken(req.get("Authorization"));
  var partyIdRequested = parseInt(req.params.id);
  try {
    var party = readDocument("parties", partyIdRequested);
  } catch (err) {
    res.status(404).end();
  }
  if (verifyPartyAccess(party, userIdRequesting)) {
    deleteDocument("parties", party._id);
    res.status(204).end();
  } else {
    res.status(401).end();
  }
});

function getBasicUserInfo(userId) {
  var user = readDocument("users", userId);
  return {
    id: user._id.toString(),
    fname: user.fname,
    lname: user.lname,
    picture: user.picture
  }
}

function getBasicPartyInfo(userId) {
  var parties = getCollection("parties");
  var userStatus;
  return parties.map((party) => {
    var host = readDocument("users", party.host);

    if (party.attending.indexOf(userId) != -1) {
      userStatus = "attending";
    } else if (party.declined.indexOf(userId) != -1) {
      userStatus = "declined";
    } else {
      userStatus = "invited";
    }

    return {
      id: party._id.toString(),
      title: party.title,
      dateTime: party.dateTime,
      host: [host.fname, host.lname].join(" "),
      status: userStatus
    }
  });
}

function getSupplyInfo(supplyId, claimedById) {
  var supply = readDocument("supplies", supplyId);
  var supplyInfo = {
    id: supply._id.toString(),
    name: supply.name,
    picture: supply.picture,
    claimed_by: null
  };

  if (claimedById != null) {
    var claimedBy = readDocument("users", claimedById);
    supplyInfo.claimed_by = [claimedBy.fname, claimedBy.lname].join(" ");
  }
  return supplyInfo;
}

function verifyPartyAccess(party, userId) {
  return userId === party.host ||
    party.attending.indexOf(userId) != -1 ||
    party.invited.indexOf(userId) != -1 ||
    party.declined.indexOf(userId) != -1;
}

/*
  Return if two coordinates are within provided range in miles of each other
  Calculations are done using Haversine equation
  http://www.movable-type.co.uk/scripts/latlong.html
*/
function withinRange(range, lat1, lon1, lat2, lon2) {
  var R = 6371000; // meters
  var φ1 = lat1;
  var φ2 = lat2;
  var Δφ = (lat2 - lat1);
  var Δλ = (lon2 - lon1);

  var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var d = R * c;

  //1609.34 converrts meters to miles
  return range < 0 || d / 1609.34 < range;
}

/**
 * Get the user ID from a token. Returns -1 (an invalid ID) if it fails.
 */
function getUserIdFromToken(authorizationLine) {
  try {
    // Cut off "Bearer " from the header value.
    var token = authorizationLine.slice(7);
    // Convert the base64 string to a UTF-8 string.
    var regularString = new Buffer(token, "base64").toString("utf8");
    // Convert the UTF-8 string into a JavaScript object.
    var tokenObj = JSON.parse(regularString);
    var id = tokenObj["id"];
    // Check that id is a number.
    if (typeof id === "number") {
      return id;
    } else {
      // Not a number. Return -1, an invalid ID.
      return -1;
    }
  } catch (e) {
    // Return an invalid ID.
    return -1;
  }
}

// Reset database.
app.post("/resetdb", function(req, res) {
  console.log("Resetting database...");
  database.resetDatabase();
  res.send();
});

app.use(function(err, req, res, next) {
  if (err.name === "JsonSchemaValidation") {
    console.log(err.message);
    res.status(400).end();
  } else {
    next(err);
  }
});

app.listen(3000, function() {
  console.log("Listening on port 3000");
});
