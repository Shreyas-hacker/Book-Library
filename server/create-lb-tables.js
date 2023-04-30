// eslint-disable-next-line strict
'use strict';

var server = require('./sever');
var ds = server.dataSources.db;
var lbTables = ['User', 'AccessToken', 'ACL', 'RoleMapping', 'Role', 'Author'];
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  // eslint-disable-next-line max-len
  console.log('Loopback tables [' + lbTables + '] created in ', ds.adapter.name);
  ds.disconnect();
});

