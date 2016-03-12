import {readDocument, readDocumentLength, getLimitedDBDump} from './database.js';

export function getAuthorData(id, cb) {
  return emulateServerReturn(readDocument('users', id), cb);
}

export function getParty(id,cb){
  return emulateServerReturn(readDocument('parties',id),cb);
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
  return emulateServerReturn(inv,cb);
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
  return emulateServerReturn(inv,cb);
}

export function getPrevParties(id,cb){
  var size = readDocumentLength('parties');
  var inv = [];
  var index = 0;
  var curDate = new Date(Date.now());
  var parDate = new Date();
  for(var i = 0;i<size;i++){
    var curParty = readDocument('parties',i);
    for(var z = 0; z < curParty.attending.length;z++){
      if(curParty.attending[z]===parseInt(id)){
        parDate = new Date(curParty.dateTime);
        if(parDate.getTime() < curDate.getTime()){
        inv[index]=curParty._id;
        index++;
        }
      }
    }
    for(z = 0; z < curParty.notattending.length;z++){
      if(curParty.notattending[z]===parseInt(id)){
        parDate = new Date(curParty.dateTime);
        if(parDate.getTime() < curDate.getTime()){
        inv[index]=curParty._id;
        index++;
        }
      }
    }
    for(z = 0; z < curParty.invited.length;z++){
      if(curParty.invited[z]===parseInt(id)){
        parDate = new Date(curParty.dateTime);
        if(parDate.getTime() < curDate.getTime()){
        inv[index]=curParty._id;
        index++;
        }
      }
    }
  }
  debugger;
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
  return emulateServerReturn(inv,cb);
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
