var express = require("express");
var bodyParser = require("body-parser");
var validate = require("express-jsonschema").validate;
var database = require("./database");
var ResetDatabase = require("./resetdatabase");
var https = require("https");

var mongo_express = require("mongo-express/lib/middleware");
var mongo_express_config = require("mongo-express/config.default.js");

var partySchema = require("./schemas/party.json");
var coordinatesSchema = require("./schemas/coordinates.json");
var complaintSchema = require("./schemas/complaint.json");
var searchSchema = require("./schemas/search.json");

var messageService = require("./message");
var config = require("./config")
var Async = require("async");

var writeDocument = database.writeDocument;
var getCollection = database.getCollection;

var app = express();

var MongoDB = require("mongodb");

var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = "mongodb://localhost:27017/PartySmart";


MongoClient.connect(url, function(err, db) {

  app.use(bodyParser.text());
  app.use(bodyParser.json());
  app.use(express.static("../client/build"));
  app.use("/mongo_express", mongo_express(mongo_express_config));

  function sendDatabaseError(res, err) {
    res.status(500).send("A database error occurred: " + err);
  }

  db.collection("users").createIndex({
    full_name: "text"
  });

  // Fetch user information
  app.get("/users/:id", function(req, res) {
    var userid = getUserIdFromToken(req.get("Authorization"));
    var userIdRequested = req.params.id;
    if (userIdRequested === userid) {
      db.collection("users").findOne({
        _id: new ObjectID(userid)
      }, function(err, user) {
        if (err) {
          // An error occurred.
          return res.status(500);
        } else if (user === null) {
          // Feed item not found!
          return res.status(400);
        }
        getBasicUserInfo(user.friends, res, function(err, friends) {
          if (err) {
            return res.status(500).end();
          }
          user.id = user._id;
          delete user._id;
          user.friends = friends;
          res.send(user);
        });
      });
    } else {
      res.status(401).end();
    }
  });

  function getBasicUserInfo(userList, res, cb) {
    if (userList == null || userList.length == 0) {
      return cb(null, []);
    }
    var query = {
      $or: userList.map((id) => {
        return {
          _id: id
        }
      })
    };
    db.collection("users").find(query).toArray(function(err, users) {
      if (err) {
        return cb(err, null);
      }
      var userMap = [];
      users.forEach((user) => {
        user.id = user._id;
        delete user._id;
        userMap.push(user);
      });
      cb(null, userMap);
    });
  }
  // Fetch list of basic party information for user
  app.get("/users/:id/parties", function(req, res) {
    var userid = getUserIdFromToken(req.get("Authorization"));
    var userIdRequested = req.params.id;
    if (userIdRequested === userid) {
      getBasicPartyInfo(userIdRequested, res, (partyInfo) => {
        res.send(partyInfo);
      });
    } else {
      res.status(401).end();
    }
  });

  app.get("/users/:id/profile", function(req, res) {
    var userid = getUserIdFromToken(req.get("Authorization"));
    var userIdRequested = req.params.id;
    if (userIdRequested === userid) {
      db.collection("parties").find({
        $or: [{
          invi: {
            $in: [new ObjectID(userid)]
          }
        }, {
          attending: {
            $in: [new ObjectID(userid)]
          }
        }, {
          host: {
            $in: [new ObjectID(userid)]
          }
        }, {
          declined: {
            $in: [new ObjectID(userid)]
          }
        }]
      }).toArray(function(err, parties) {
        if (err) {
          res.send(err);
        }
        if (parties != null) {
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
            list = list.map((id) => (id.toString()));
            if (list.indexOf({
                userid
              }.userid) != -1) {
              parDate = new Date(party.datetime);
              if (parDate.getTime() < curDate.getTime()) {
                profileParties.prevParties.attended.push(party);
              } else {
                profileParties.futureParties.attended.push(party);
              }
            }
            list = party.declined;
            list = list.map((id) => (id.toString()));
            if (list.indexOf({
                userid
              }.userid) != -1) {
              parDate = new Date(party.datetime);
              if (parDate.getTime() < curDate.getTime()) {
                profileParties.prevParties["not attending"].push(party);
              } else {
                profileParties.futureParties["not attending"].push(party);
              }
            }
            list = party.invited;
            list = list.map((id) => (id.toString()));
            if (list.indexOf({
                userid
              }.userid) != -1) {
              parDate = new Date(party.datetime);
              if (parDate.getTime() < curDate.getTime()) {
                profileParties.prevParties.invited.push(party);
              } else {
                profileParties.futureParties.invited.push(party);
              }
            }
            list = party.host;
            list = list.toString();
            if (list === {
                userid
              }.userid) {
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
    }
  });

  // Fetch party information
  app.get("/parties/:id", function(req, res) {
    //var userid = getUserIdFromToken(req.get("Authorization"));
    var partyIdRequested = req.params.id;
    db.collection("parties").findOne({
      _id: new ObjectID(partyIdRequested)
    }, function(err, party) {
      if (err) {
        res.status(501).end();
      }
      if (party === null) {
        res.status(400).end();
      }
      getBasicUserInfo(party.attending, res, function(err, att) {
        if (err) {
          return res.status(502).end();
        }
        party.attending = att;
        getBasicUserInfo(party.declined, res, function(err, dec) {
          if (err) {
            return res.status(503).end();
          }
          party.declined = dec;
          getBasicUserInfo(party.invited, res, function(err, inv) {
            if (err) {
              return res.status(504).end();
            }
            party.invited = inv;
            getBasicUserInfo([party.host], res, function(err, host) {
              if (err) {
                return res.status(505).end();
              }
              party.host = host[0];
              getSupplyInfo(party.supplies, res, function(err, supplies) {
                if (err) {
                  return res.status(505).end();
                }
                party.supplies = supplies;
                party.id = party._id;
                delete party._id;
                res.send(party);
              }); //get supplies
            }); //get host
          }); // get inv
        }); //get dec
      }); //get att
    }); //find party
  }); //app

  //CALLBACK HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEELLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLL
  app.post("/search/:userId/user", validate({
    body: searchSchema
  }), function(req, res) {
    var fromUser = getUserIdFromToken(req.get("Authorization"));
    db.collection("users").findOne({
      _id: new ObjectID(fromUser)
    }, function(err, searchingUser) {
      if (err) {
        res.status(400).end();
      } else if (searchingUser._id.toString() === fromUser) {
        db.collection("users").find({
          $text: {
            $search: req.body.query
          }
        }, function(err, result) {
          var searchedFriendUsers = [];
          var searchedAllUsers = [];
          result.toArray(function(err, users) {
            if (err) {
              sendDatabaseError(err, res);
            } else {
              users.forEach(function(resultUser) {
                var friends = [];
                searchingUser.friends.forEach((friend) => {
                  if (friend.toString() == resultUser._id.toString()) {
                    friends.push(friend);
                  }
                });
                getBasicUserInfo(friends, res, function(err, result) {
                  if (err) {
                    sendDatabaseError(err, res);
                  }
                  searchedFriendUsers = searchedFriendUsers.concat(result);
                  users.forEach(function(resultUser) {
                    var others = [];
                    searchingUser.friends.forEach((friend) => {
                      if (friend.toString() != resultUser._id.toString()) {
                        others.push(friend);
                      }
                    });
                    getBasicUserInfo(others, res, function(err, result) {
                      if (err) {
                        sendDatabaseError(err, res);
                      }
                      searchedAllUsers = searchedAllUsers.concat(result);
                      res.send({
                        searchedFriendUsers: searchedFriendUsers,
                        searchedAllUsers: searchedAllUsers
                      });
                    });
                  });
                });
              });
            }
          });
        })
      } else {
        // 400: Bad Request.
        res.status(401).end();
      }
    });
  });

  //OH my god, I lied, that last callback hell, wasn't callback hell, this bullshit is callback hell
  app.get("/admin", function(req, res) {
    var userid = getUserIdFromToken(req.get("Authorization"));
    db.collection("users").findOne({
      _id: new ObjectID(userid),
      admin: "true"
    }, (err, result) => {
      if (err) {
        sendDatabaseError(err, res);
      } else if (result) {
        db.collection("users").find((err, usersCursor) => {
          if (err) {
            sendDatabaseError(err, res);
          } else {
            usersCursor.toArray((err, users) => {
              if (err) {
                sendDatabaseError(err, res);
              } else {
                db.collection("parties").find((err, partiesCursor) => {
                    if (err) {
                      sendDatabaseError(err, res);
                    } else {
                      partiesCursor.toArray((err, parties) => {
                        if (err) {
                          sendDatabaseError(err, res);
                        } else {
                          var verboseParties = [];
                          var verboseUsers = [];
                          var asyncTasks = [];
                          parties.forEach((party) => {
                            asyncTasks.push((callback) => {
                              party.id = party._id.toString();
                              delete party._id;
                              db.collection("users").findOne({
                                _id: new ObjectID(party.host)
                              }, (err, host) => {
                                party.host_id = party.host.toString();
                                party.host = [host.fname, host.lname].join(" ");
                                getBasicUserInfo(party.attending, res, (err, attendingList) => {
                                  if (err) {
                                    sendDatabaseError(err, res);
                                  }
                                  party.attending = attendingList;
                                  getBasicUserInfo(party.invited, res, (err, invitedList) => {
                                    if (err) {
                                      sendDatabaseError(err, res);
                                    }
                                    party.invited = invitedList;
                                    getBasicUserInfo(party.declined, res, (err, declinedList) => {
                                      if (err) {
                                        sendDatabaseError(err, res);
                                      }
                                      party.declined = declinedList;
                                      getSupplyInfo(party.supplies, res, function(err, supplies) {
                                        if (err) {
                                          sendDatabaseError(err, res);
                                        }
                                        party.supplies = supplies;
                                        verboseParties.push(party);
                                        callback();
                                      });
                                    });
                                  });
                                });
                              });
                            })
                          });
                          users.forEach((user) => {
                            asyncTasks.push((callback) => {
                              user.id = user._id.toString();
                              delete user._id;
                              getBasicUserInfo(user.friends, res, (err, friendsList) => {
                                if (err) {
                                  sendDatabaseError(err, res);
                                }
                                user.friends = friendsList;
                                verboseUsers.push(user);
                                callback();
                              });
                            });
                          });
                          Async.parallel(asyncTasks, () => {
                            res.send({
                              parties: verboseParties,
                              users: verboseUsers
                            });
                          });
                        }
                      });
                    } //Get your braces here, plenty of braces
                  }) //Have you heard of our lord and savior closure
              }
            })
          }
        })
      } else {
        res.status(401).end();
      }
    });
  });

  app.post("/complaints", validate({
    body: complaintSchema
  }), function(req, res) {
    var body = req.body;
    //console.log(req.body);
    //console.log(new ObjectID(body.id));
    db.collection('parties').findOne({
      _id: new ObjectID(body.id)
    }, function(err, party) {
      if (err) {
        return sendDatabaseError(res, err);
      }
      //console.log(party);
      //console.log(party._id);
      db.collection('parties').updateOne({
          _id: new ObjectID(party._id)
        }, {
          $push: {
            complaints: {
              $each: [body],
              $position: 0
            }
          }
        },
        function(err) {
          if (err) {
            res.status(500).end();
          }
          var user = new Object(party.host);
          messageService.sendSMS(user.phone_number, body.message);
          res.status(201).end();
        }
      );
    });

  });

  app.post("/nearby_parties", validate({
    body: coordinatesSchema
  }), function(req, res) {
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;

    db.collection("parties").find().toArray(function(err, allParties) {
      if (err) {
        sendDatabaseError(err, res);
      } else {
        var nearbyParties = [];
        allParties.forEach((party) => {
          var coordinates = party.coordinates;
          if (withinRange(1800, coordinates.latitude, coordinates.longitude, latitude, longitude)) {
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
      }
    });
  });

  app.put("/parties/:id/private_status", function(req, res) {
    var userid = new ObjectID(getUserIdFromToken(req.get("Authorization")));
    db.collection("parties").findOne({
      _id: new ObjectID(req.params.id)
    }, function(err, party) {
      if (err) {
        return sendDatabaseError(res, err);
      }
      var partyHost = new ObjectID(party.host);

      if (userid.toString() === partyHost.toString()) {

        db.collection("parties").updateOne({
            _id: new ObjectID(req.params.id)
          }, {
            $set: {
              "private_status": req.body.toString()
            }
          },
          function(err) {
            if (err) {
              return sendDatabaseError(res, err);
            }
            res.send(req.body);
          });
      } else {
        res.status(401).end();
      }

    });
  });

  app.post("/users/:userid/removefriend/:friendid", function(req, res) {
    var userid = getUserIdFromToken(req.get("Authorization"));
    var userIdRequested = req.params.userid;
    if (userIdRequested === userid) {
      db.collection("users").updateOne({
        _id: new ObjectID(userid)
      }, {
        $pull: {
          friends: new ObjectID(req.params.friendid)
        }
      }, function(err, result) {
        if (err) {
          return res.status(500).end()
        }
        if (result.modifiedCount >= 1) {
          getBasicUserInfo([new ObjectID(userid)], res, function(err, user) {
            if (err) {
              return res.status(500);
            }
            if (user.length < 1) {
              return res.status(400);
            }
            getBasicUserInfo(user[0].friends, res, function(err, friends) {
              if (err) {
                return res.status(500).end();
              }
              user[0].id = user[0]._id;
              delete user[0]._id;
              user[0].friends = friends.map((friend) => {
                friend.id = friend._id;
                return friend
              });
              res.send(user[0]);
            });
          })
        }
      });
    } else {
      res.status(401).end();
    }
  });

  app.post("/users/:userid/addfriend/:friendid", function(req, res) {
    var userid = getUserIdFromToken(req.get("Authorization"));
    var userIdRequested = req.params.userid;
    if (userIdRequested === userid) {
      db.collection("users").updateOne({
        _id: new ObjectID(userid)
      }, {
        $push: {
          friends: new ObjectID(req.params.friendid)
        }
      }, function(err, result) {
        if (err) {
          return res.status(500).end()
        }
        if (result.modifiedCount >= 1) {
          getBasicUserInfo([new ObjectID(userid)], res, function(err, user) {
            if (err) {
              return res.status(500);
            }
            if (user.length < 1) {
              return res.status(400);
            }
            getBasicUserInfo(user[0].friends, res, function(err, friends) {
              if (err) {
                return res.status(500).end();
              }
              user[0].id = user[0]._id;
              delete user[0]._id;
              user[0].friends = friends.map((friend) => {
                friend.id = friend._id;
                return friend
              });
              res.send(user[0]);
            });
          })
        }
      });
    } else {
      res.status(401).end();
    }
  });

  //creating a new party server route
  app.post("/parties", validate({
    body: partySchema
  }), (req, res) => {

    //If this function runs, req.body passed JSON validation
    var party = req.body;
    var fromUser = getUserIdFromToken(req.get("Authorization"));

    var address = [party.address, party.city, party.state, party.zip].join(" ");
    https.get("https://maps.googleapis.com/maps/api/geocode/json?key=" +
      config.gmaps + "&address=" + address, (googleRes) => {
        var body = "";
        googleRes.on("data", function(data) {
          body += data;
        });
        googleRes.on("end", () => {
          var locations = JSON.parse(body);
          if (locations.status == "ZERO_RESULTS") {
            res.status(400).end();
          } else {
            var coord = locations.results[0].geometry.location;
            var newParty = {
              "title": party.title,
              "description": party.description,
              "private_status": party.status,
              "address": party.address,
              "city": party.city,
              "zip": party.zip,
              "state": party.state,
              "country": party.country,
              "coordinates": {
                "latitude": coord.lat,
                "longitude": coord.lng
              },
              "date": new Date([party.date, party.time].join("")).toString(),
              "host": new ObjectID(fromUser),
              "attending": [],
              "declined": [],
              "complaints": []
            };
            newParty.supplies = party.supplies.map((id) => {
              return {
                "supply_id": id,
                "claimed_by": null
              }
            });
            //adding a party
            db.collection("parties").insertOne(newParty, (err) => {
              if (err) {
                sendDatabaseError(err, res);
              } else {
                res.status(201).end();
              }
            });
          }
        });
      });
  })

  // update invited list for a party
  app.put("/parties/:id/invited", function(req, res) {
    var fromUser = getUserIdFromToken(req.get("Authorization"));
    db.collection("parties").findOne({
        _id: new ObjectID(req.params.id)
      },
      function(err, party) {
        if (err) {
          return res.status(500).end();
        }
        if (party.host.toString() != fromUser.toString()) {
          res.status(401).end();
        }
        var index;
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
        db.collection("parties").update({
            _id: new ObjectID(req.params.id)
          }, {
            "title": party.title,
            "description": party.description,
            "private_status": party.private_status,
            "address": party.address,
            "city": party.city,
            "zip": party.zip,
            "state": party.state,
            "country": party.country,
            "coordinates": party.coordinates,
            "datetime": party.datetime,
            "host": party.host,
            "attending": party.attending,
            "invited": party.invited,
            "declined": party.declined,
            "complaints": party.complaints,
            "supplies": party.supplies
          },
          function(err, result) {
            if (err) {
              console.log(err);
              return res.status(500).end();
            }
            if (result.modifiedCount < 1) {
              return res.status(400).end();
            }
            getBasicUserInfo(party.attending, res, function(err, att) {
              if (err) {
                return res.status(502).end();
              }
              party.attending = att;
              getBasicUserInfo(party.declined, res, function(err, dec) {
                if (err) {
                  return res.status(503).end();
                }
                party.declined = dec;
                getBasicUserInfo(party.invited, res, function(err, inv) {
                  if (err) {
                    return res.status(504).end();
                  }
                  party.invited = inv;
                  getBasicUserInfo([party.host], res, function(err, host) {
                    if (err) {
                      return res.status(505).end();
                    }
                    party.host = host[0];
                    party.id = party._id;
                    delete party._id;
                    res.send(party);
                  }); //get host
                }); // get inv
              }); //get dec
            }); //get att
          })
      }
    )
  })



     // update supply list for a party
      app.put("/parties/:id/supplies", function(req, res) {
        var fromUser = getUserIdFromToken(req.get("Authorization"));
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
          if (req.body.indexOf([supply.supplyId, supply.claimed_by].toString()) == -1) {
              index = party.supplies.indexOf(supply);
              party.supplies.splice(index, 1);
            }
          }

        db.collection('supplies').updateOne({_id: supply.supplyID}),
          {
            $addToSet:{
              supply: new ObjectID(supply.supplyID)
            }
          }, function(err){
            if(err){
              return sendDatabaseError(res, err);
            }
            //grab the supply item we have collected
            db.collection('supplies').findOne({_id: supply.supplyID}, function(err, supply){
              if(err){
                return sendDatabaseError(res, err);
              }
              resolveUserObject(supply.supplyID.supply, function(err, userMap){
                if(err){
                  return sendDatabaseError(res,err);
                }
          var updatedParty = {
            supplies: []
          };
          //updatedParty.host = getBasicUserInfo(party.host);
          updatedParty.supplies = party.supplies.map((supply) => {
            return getSupplyInfo(supply.supply_id, supply.claimed_by);
          });
          res.send(updatedParty);
        });
        // else {
        //   // 401: Unauthorized.
        //   res.status(401).end();
        // }
      });
    };
  });

  app.delete("/parties/:id", function(req, res) {
    var userid = getUserIdFromToken(req.get("Authorization"));
    var partyIdRequested = req.params.id;
    var query = {
      _id: new ObjectID(partyIdRequested)
    };
    db.collection("parties").findOne(query, (err, party) => {
      if (err) {
        sendDatabaseError(err, res);
      }
      if (!party) {
        res.status(404).end();
      } else if (party.host.toString() == new ObjectID(userid)) {
        db.collection("parties").remove(query, {
          justOne: true
        }, (err) => {
          if (err) {
            sendDatabaseError(err, res);
          }
          res.status(200).end();
        });
      } else {
        res.status(401).end();
      }
    });
  });

  function getBasicPartyInfo(userId, res, callback) {
    db.collection("parties").find({
      $or: [{
        host: new ObjectID(userId)
      }, {
        attending: new ObjectID(userId)
      }, {
        declined: new ObjectID(userId)
      }, {
        invited: new ObjectID(userId)
      }]
    }, (err, partiesCursor) => {
      if (err) {
        sendDatabaseError(err, res);
      } else {
        var partiesList = [];
        partiesCursor.toArray((err, parties) => {
          var asyncTasks = [];
          parties.forEach((party) => {
            asyncTasks.push((finished) => {
              var userStatus;
              if (party.attending.indexOf(userId) != -1) {
                userStatus = "attending";
              } else if (party.declined.indexOf(userId) != -1) {
                userStatus = "declined";
              } else {
                userStatus = "invited";
              }
              db.collection("users").findOne({
                _id: new ObjectID(party.host)
              }, (err, host) => {
                if (err) {
                  sendDatabaseError(err, res);
                } else {
                  partiesList.push({
                    id: party._id.toString(),
                    title: party.title,
                    dateTime: party.dateTime,
                    host: [host.fname, host.lname].join(" "),
                    status: userStatus
                  });
                  finished();
                }
              });
            })
          });
          Async.parallel(asyncTasks, () => {
            callback(partiesList);
          })
        });
      }
    });
  }

  function getSupplyInfo(supplyList, res, cb) {
    if (supplyList == null || supplyList.length == 0) {
      return cb(null, []);
    }
    var query = {
      $or: supplyList.map((id) => {
        return {
          _id: id.supply_id
        }
      })
    };
    db.collection('supplies').find(query).toArray(function(err, supplies) {
      if (err) {
        return cb(err, null);
      }
      var supplyMap = [];
      supplies.forEach((supply) => {
        for (var i = 0; i < supplyList.length; i++) {
          if (parseInt(supplyList[i].supply_id) === parseInt(supply._id)) {
            supply.claimed_by = supplyList[i].claimed_by;
          }
        }

      });
      supplies.forEach((supply) => {
        supplyMap.push(supply);
      });
      cb(null, supplyMap);
    })
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
      var regularString = new Buffer(token, "base64").toString("utf8");
      // Convert the UTF-8 string into a JavaScript object.
      var tokenObj = JSON.parse(regularString);
      var id = tokenObj["id"];
      // Check that id is a string.
      if (typeof id === "string") {
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
    ResetDatabase(db, function() {
      res.send();
    });
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
