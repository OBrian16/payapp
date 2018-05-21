const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
 
// Connection URL
const url = 'mongodb://localhost:27017';
let dbName = 'payapp'

let collections = {}
 
MongoClient.connect(url, function(e, client) {
  if(e) {
      console.log('Database connected')
      throw {error:'Database connection failed'}
  }
  

  let db = client.db(dbName);
  collections.users = db.collection('users')
  collections.courses = db.collection('courses')
});

module.exports = collections
 

