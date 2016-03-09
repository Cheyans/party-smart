import {readDocument, writeDocument, addDocument} from './database.js';

export function getAuthorData(id, cb) {
  return emulateServerReturn(readDocument('users', id), cb);
}


export function getParty(id,cb){
  debugger;
  return emulateServerReturn(readDocument('parties',id),cb);
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
