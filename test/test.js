const DB     = require("../lib/db");
const path   = require('path');
const assert = require('assert');
const os     = require('os');

function fakeDBLocation(){
  return path.join(__dirname, "fake-db.json");
}

function nonexistentDBPath(){
  return path.join(os.tmpdir(),
                   "" + Math.random() + "fake-db.json");
}

describe('DB', function() {
  describe('read', function() {
    it('returns the content of a file', function() {
      return DB.read({dbPath: fakeDBLocation()})
        .then(function(data){
          assert.deepEqual({tasks: ['tell daddy I have to go poopy']}, data);
        });
    });
    it('makes a default db if file does not exist', function(){
      return DB.read({dbPath: nonexistentDBPath()})
        .then(function(data){
          assert.deepEqual({tasks: []}, data);
        });
    });
  });

  describe('write', function() {
    it('saves the db', function() {
      var tempdb = nonexistentDBPath();
      var settings = {dbPath: tempdb};
      var dbVal = mkDB({tasks: ['scoots']});

      return DB.write(settings, dbVal)
        .then(function(){
          return DB.read(settings).then(function(data2){
            assert.deepEqual({tasks: ['scoots']}, data2);
          });
        });
    });

    it('makes a default db if file does not exist', function(){
      return DB.read({dbPath: nonexistentDBPath()})
        .then(function(data){
          assert.deepEqual({tasks: []}, data);
        });
    });
  });

  describe('adding a task', function() {
    it("works", function(){
      var emptyDB = mkDB({tasks: []});
      var addedTask = DB.addTask(emptyDB, "poop");

      assertDBEqual(addedTask, {tasks: ['poop']});
    });
  });

  function mkDB(json) { return DB.dbFromJSON(json); }
  function assertDBEqual(db, json) {
    assert.deepEqual(
      DB.dbToJSON(db),
      json
    );
  }
});
