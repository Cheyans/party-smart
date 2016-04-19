var express = require("express");
var bodyParser = require("body-parser");
var validate = require("express-jsonschema").validate;
var database = require("./database");

var mongo_express = require('mongo-express/lib/middleware');
var mongo_express_config = require('mongo-express/config.default.js');

var partySchema = require("./schemas/party.json");
var coordinatesSchema = require("./schemas/coordinates.json");
var complaintSchema = require("./schemas/complaint.json");

var messageService = require("./message");

var readDocument = database.readDocument;
var writeDocument = database.writeDocument;
var addDocument = database.addDocument;
var deleteDocument = database.deleteDocument;
var getCollection = database.getCollection;


var app = express();


var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/PartySmart';


MongoClient.connect(url, function(err, db) {

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(express.static("../client/build"));
app.use('/mongo_express', mongo_express(mongo_express_config));

function sendDatabaseError(res, err) {
  res.status(500).send("A database error occurred: " + err);
}



// Fetch user information
app.get("/users/:id", function(req, res) {
  var userid = getUserIdFromToken(req.get("Authorization"));
  var userIdRequested = req.params.id;
  if (userIdRequested === userid) {
    db.collection('users').findOne({
      _id: new ObjectID(userid)
    },function(err, user) {
      if (err) {
        // An error occurred.
        return res.status(500);
      } else if (user === null) {
        // Feed item not found!
        return res.status(400);
      }
        getBasicUserInfo(user.friends,res,function(err,friends){
          if(err){
            return res.status(500).send();
          }
          user.friends = friends;
          res.send(user);
        });
      });
  } else {
    res.status(401).end();
  }
});

function getBasicUserInfo(userList,res,cb){
  var query = {
    $or: userList.map((id) => { return {_id: id } })
  };
  db.collection('users').find(query).toArray(function(err, users) {
    if (err) {
      return cb(err,null);
    }
    var userMap = [];
    users.forEach((user) => {
      userMap.push(user);
    });
    cb(null,userMap);
  })
}
// Fetch list of basic party information for user
app.get("/users/:id/parties", function(req, res) {
  var userid = getUserIdFromToken(req.get("Authorization"));
  var userIdRequested = parseInt(req.params.id);
  if (userIdRequested === userid) {
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
  var userid = getUserIdFromToken(req.get("Authorization"));
  var userIdRequested = req.params.id;
  if (userIdRequested === userid) {
    db.collection("parties").find(
              {$or:[
                      { invi :
                          { $in :[ new ObjectID(userid) ]
                          }
                      },
                      { attending :
                          { $in :[ new ObjectID(userid) ]
                          }
                      },
                      { host :
                          { $in :[ new ObjectID(userid) ]
                          }
                      },
                      { declined :
                          { $in :[ new ObjectID(userid) ]
                          }
                      }
                  ]}
    ).toArray(function(err,parties){
      if(err){
        res.send(err);
      }
      if(parties!=null){
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
        for (var i = 0; i < parties.length; i++) {
          var party = parties[i];
          var list = party.attending;
          list = list.map((id)=>(id.toString()));
            if (list.indexOf({userid}.userid)!=-1) {
              parDate = new Date(party.datetime);
              if (parDate.getTime() < curDate.getTime()) {
                profileParties.prevParties.attended.push(party);
              } else{
                profileParties.futureParties.attended.push(party);
                }
            }
            list = party.declined;
            list = list.map((id)=>(id.toString()));
            if (list.indexOf({userid}.userid)!=-1) {
              parDate = new Date(party.datetime);
              if (parDate.getTime() < curDate.getTime()) {
                profileParties.prevParties["not attending"].push(party);
              } else
              {
                profileParties.futureParties["not attending"].push(party);
              }
            }
            list = party.invited;
            list = list.map((id)=>(id.toString()));
            if (list.indexOf({userid}.userid)!=-1) {
              parDate = new Date(party.datetime);
              if (parDate.getTime() < curDate.getTime()) {
                profileParties.prevParties.invited.push(party);
              } else
              {
                profileParties.futureParties.invited.push(party);
              }
            }
            list = party.host;
            list = list.toString();
          if (list === {userid}.userid) {
            profileParties.hostingParties.push(party);
          }
      }
      //the following may seem useless but Alex is going to use it for reference:

      // var par = parties[1];
      // profileParties.things.push(par);
      // list = par.attending;
      // list = list.map((id)=>(id.toString()));
      // profileParties.things.push(list);
      // profileParties.things.push(list.indexOf({userid}.userid));
      // profileParties.things.push({userid}.userid);
      // profileParties.things.push(par.attending[0]);
      // profileParties.things.push(parties);
      res.send(profileParties);
    }
    });
  } else {
    res.status(401).end();
  }});

// Fetch party information
app.get("/parties/:id", function(req, res) {
  var userid = getUserIdFromToken(req.get("Authorization"));
  var partyIdRequested = parseInt(req.params.id);
  try {
    var party = readDocument("parties", partyIdRequested);
  } catch (err) {
    res.status(404).end();
  }
  if (verifyPartyAccess(party, userid)) {
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

app.get("/admin", function(req, res) {
  var userid = getUserIdFromToken(req.get("Authorization"));
  var users = getCollection("users");
  var userRequesting = users[userid];
  if (userRequesting && userRequesting.admin === "true") {
    var parties = getCollection("parties");
    var admin = {
      parties: parties.map((party) => {
        party.id = party._id.toString();
        delete party._id;

        var host = readDocument("users", party.host);
        party.host_id = party.host.toString();
        party.host = [host.fname, host.lname].join(" ");

        party.attending = party.attending.map(getBasicUserInfo);
        party.invited = party.invited.map(getBasicUserInfo);
        party.declined = party.declined.map(getBasicUserInfo);
        party.supplies = party.supplies.map((supply) => {
          return getSupplyInfo(supply.supply_id, supply.claimed_by)
        });
        return party;
      }),
      users: users.map((user) => {
        user.id = user._id.toString();
        delete user._id;
        user.friends = user.friends.map(getBasicUserInfo);
        return user;
      })
    }
    res.send(admin);
  } else {
    res.status(401).end();
  }
});

app.post("/complaints", validate({
  body: complaintSchema
}), function(req, res) {
  var body = req.body;
  try {
    var party = readDocument("parties", body.id);
  } catch (err) {
    res.status(404).end();
  }
  delete body.id;
  party.complaints.push(body);
  writeDocument("parties", party);

  var user = readDocument("users", party.host);
  messageService.sendSMS(user.phone_number, body.message);
  res.status(201).end();
});

app.post("/nearby_parties", validate({
  body: coordinatesSchema
}), function(req, res) {
  var latitude = req.body.latitude;
  var longitude = req.body.longitude;
  var parties = getCollection("parties");
  var nearbyParties = [];

  parties.forEach((party) => {
    var coordinates = party.coordinates;
    if (withinRange(18, coordinates.latitude, coordinates.longitude, latitude, longitude)) {
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
});

app.put("/parties/:id/private_status",function(req, res){
  var userid = getUserIdFromToken(req.get("Authorization"));
  var partyHost = readDocument("parties",req.params.id).host;
  if (userid === partyHost) {
    var party = readDocument("parties", req.params.id);
    party["private status"] = req.value;
    writeDocument("parties", party);
    res.send(party["private status"]);
  }else{
    res.status(401).end();
  }
});

app.post("/users/:userid/removefriend/:friendid",function(req, res) {
  var userid = getUserIdFromToken(req.get("Authorization"));
  var userIdRequested = parseInt(req.params.userid);
  if (userIdRequested === userid) {
    var user = readDocument("users",userid);
    var userfriends = user.friends;
    var friendIndex = userfriends.indexOf(parseInt(req.params.friendid));
    user.friends.splice(friendIndex,1);
    writeDocument("users",user);
    user.friends = user.friends.map((id) => getBasicUserInfo(id));
    user.id = user._id;
    res.send(user);
  } else {
    res.status(401).end();
  }
});

app.post("/users/:userid/addfriend/:friendid",function(req, res) {
  var userid = getUserIdFromToken(req.get("Authorization"));
  var userIdRequested = parseInt(req.params.userid);
  if (userIdRequested === userid) {
    var user = readDocument("users",userid);
    var friend = readDocument("users",parseInt(req.params.friendid));
    user.friends.push(friend._id);
    writeDocument("users",user);
    user.friends = user.friends.map((id) => getBasicUserInfo(id))
    user.id = user._id;
    res.send(user);
  } else {
    res.status(401).end();
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

function containsUser(users, user) {
  for (var u of users) {
    if (u._id == user._id) {
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

    var friends = userdata.friends.map((userid) => readDocument("users", userid));
    var allusers = getCollection("users");
    var searchedFriendUsers = [];
    var searchedAllUsers = [];
    for (var user of allusers) {
      user.name = (user.fname + " " + user.lname).toLowerCase();
      if (user.name.search(query) != -1 && !containsUser(friends, user)) {
        searchedAllUsers.push(user);
      }
    }
    for (var friend of friends) {
      friend.name = (friend.fname + " " + friend.lname).toLowerCase();
      if (friend.name.search(query) != -1) {
        searchedFriendUsers.push(friend);
      }
    }
    var search = {
      searchedAllUsers: [],
      searchedFriendUsers: []
    };
    search.searchedAllUsers = searchedAllUsers.map((id) => getBasicUserInfo(id._id));
    search.searchedFriendUsers = searchedFriendUsers.map((id) => getBasicUserInfo(id._id));
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

// update supply list for a party
app.put('/parties/:id/supplies', function(req, res) {
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
    for (var supply of party.supplies) {
      if (req.body.indexOf([supply.supplyId, supply.claimed_by].toString()) == -1) {
        index = party.supplies.indexOf(supply);
        party.supplies.splice(index, 1);
      }
    }

    writeDocument("parties", party)
    var updatedParty = {
      supplies: []
    };
    //updatedParty.host = getBasicUserInfo(party.host);
    updatedParty.supplies = party.supplies.map((supply) => {
      return getSupplyInfo(supply.supply_id, supply.claimed_by);
    });
    res.send(updatedParty);
  } else {
    // 401: Unauthorized.
    res.status(401).end();
  }
})

app.delete("/parties/:id", function(req, res) {
  var userid = getUserIdFromToken(req.get("Authorization"));
  var partyIdRequested = parseInt(req.params.id);
  try {
    var party = readDocument("parties", partyIdRequested);
  } catch (err) {
    res.status(404).end();
  }
  if (verifyPartyAccess(party, userid)) {
    deleteDocument("parties", party._id);
    res.status(204).end();
  } else {
    res.status(401).end();
  }
});

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
    claimed_by: null,
    userId: null
  };

  if (claimedById != null) {
    var claimedBy = readDocument("users", claimedById);
    supplyInfo.claimed_by = [claimedBy.fname, claimedBy.lname].join(" ");
    supplyInfo.userId = claimedBy._id;
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

function getUserIdFromToken(authorizationLine) {
  try {
    // Cut off "Bearer " from the header value.
    var token = authorizationLine.slice(7);
    // Convert the base64 string to a UTF-8 string.
    var regularString = new Buffer(token, 'base64').toString('utf8');
    // Convert the UTF-8 string into a JavaScript object.
    var tokenObj = JSON.parse(regularString);
    var id = tokenObj['id'];
    // Check that id is a string.
    if (typeof id === 'string') {
      return id;
    } else {
      // Not a number. Return "", an invalid ID.
      return "";
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
    console.log(err);
    console.log(err.message);
    res.status(400).end();
  } else {
    next(err);
  }
});

app.listen(3000, function() {
  console.log("Listening on port 3000");
});
 });
