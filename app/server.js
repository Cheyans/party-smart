import {readDocument, readDocumentLength, getLimitedDBDump} from './database.js';

export function getAuthorData(id, cb) {
  return emulateServerReturn(readDocument('users', id), cb);
}

export function getUserName(id, cb) {
  var user = readDocument('users', id);
  var info = {
    fname:"",
    lname:""
  }
  info.fname = user.fname;
  info.lname = user.lname;
  return emulateServerReturn(info, cb);
}

export function getParty(id,cb){
  return emulateServerReturn(readDocument('parties',id),cb);
}

export function getHostedParties(id, cb){
  var size = readDocumentLength('parties');
  var hosts = [];
  var index = 0;
  for(var i = 0;i<size;i++){
    var curParty = readDocument('parties',i);
    for(var z = 0; z < curParty.invited.length;z++){
      if(curParty.host===parseInt(id)){
        hosts[index]=curParty._id;
        index++;
      }
    }
  }
  return emulateServerReturn(hosts,cb);
}

export function getInviteInfo(id,cb){
  var size = readDocumentLength('parties');
  var inv = [];
  var index = 0;
  for(var i = 0;i<size;i++){
    var curParty = readDocument('parties',i);
    for(var z = 0; z < curParty.invited.length;z++){
      if(curParty.invited[z]===parseInt(id)){
        inv[index]=curParty._id;
        index++;
      }
    }
  }
  return emulateServerReturn(inv.map((id) => readDocument('parties',id)),cb);
}

export function getDeclinedInfo(id,cb){
  var size = readDocumentLength('parties');
  var inv = [];
  var index = 0;
  for(var i = 0;i<size;i++){
    var curParty = readDocument('parties',i);
    for(var z = 0; z < curParty.notattending.length;z++){
      if(curParty.notattending[z]===parseInt(id)){
        inv[index]=curParty._id;
        index++;
      }
    }
  }
  return emulateServerReturn(inv.map((id) => readDocument('parties',id)),cb);
}

export function getGoingInfo(id,cb){
  var size = readDocumentLength('parties');
  var inv = [];
  var index = 0;
  for(var i = 0;i<size;i++){
    var curParty = readDocument('parties',i);
    for(var z = 0; z < curParty.attending.length;z++){
      if(curParty.attending[z]===parseInt(id)){
        inv[index]=curParty._id;
        index++;
      }
    }
  }
  return emulateServerReturn(inv.map((id) => readDocument('parties',id)),cb);
}

export function getPrevParties(id,cb){
  var size = readDocumentLength('parties');
  var index = 0;
  var curDate = new Date(Date.now());
  var parDate = new Date();
  var prevParties = {
    attended:[],
    notattended:[],
    invited:[]
  }
  for(var i = 0;i<size;i++){
    var curParty = readDocument('parties',i);
    for(var z = 0; z < curParty.attending.length;z++){
      if(curParty.attending[z]===parseInt(id)){
        parDate = new Date(curParty.dateTime);
        if(parDate.getTime() < curDate.getTime()){
        prevParties.attended[index]=curParty._id;
        index++;
        }
      }
    }
    index = 0;
    for(z = 0; z < curParty.notattending.length;z++){
      if(curParty.notattending[z]===parseInt(id)){
        parDate = new Date(curParty.dateTime);
        if(parDate.getTime() < curDate.getTime()){
        prevParties.notattended[index]=curParty._id;
        index++;
        }
      }
    }
    index = 0;
    for(z = 0; z < curParty.invited.length;z++){
      if(curParty.invited[z]===parseInt(id)){
        parDate = new Date(curParty.dateTime);
        if(parDate.getTime() < curDate.getTime()){
        prevParties.invited[index]=curParty._id;
        index++;
        }
      }
    }
  }
  prevParties.attended = prevParties.attended.map((att) => readDocument('parties',att));
  prevParties.notattended = prevParties.notattended.map((nat) => readDocument('parties',nat));
  prevParties.invited = prevParties.invited.map((inv) => readDocument('parties',inv));
  return emulateServerReturn(prevParties,cb);
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

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */

function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}
