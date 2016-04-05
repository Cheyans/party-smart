var express = require("express");
var bodyParser = require("body-parser");
var validate = require("express-jsonschema").validate;
var database = require("./database");

var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
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
    var user = readDocument("users", userIdRequested);

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
    res.send(getBasicPartyInfo(userIdRequested));
  } else {
    res.status(401).end();
  }
});

// Fetch party information
app.get("/parties/:id", function(req, res) {
  var userIdRequesting = getUserIdFromToken(req.get("Authorization"));
  var partyIdRequested = parseInt(req.params.id);
  var party = readDocument("parties", partyIdRequested);

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
          id : party._id.toString(),
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
    res.status(400).end();
  } else {
    next(err);
  }
});

app.listen(3000, function() {
  console.log("Listening on port 3000");
});
