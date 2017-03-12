const db     = require("../lib/db");
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

describe('db', function() {
    describe('read', function() {
        it('returns the content of a file', function() {
            return db.read({dbPath: fakeDBLocation()})
                .then(function(data){
                    assert.deepEqual({tasks: ['tell daddy I have to go poopy']}, data);
                });
        });
        it('makes a default db if file does not exist', function(){
            return db.read({dbPath: nonexistentDBPath()})
                .then(function(data){
                    assert.deepEqual({tasks: []}, data);
                });
        });
    });

    describe('write', function() {
        it('saves the db', function() {
            return db.write({dbPath: fakeDBLocation()}, {tasks: ['scoots']} )
                .then(function(data){
                    assert.deepEqual({tasks: ['tell daddy I have to go poopy']}, data);
                });
        });
        it('makes a default db if file does not exist', function(){
            return db.read({dbPath: nonexistentDBPath()})
                .then(function(data){
                    assert.deepEqual({tasks: []}, data);
                });
        });
    });
});
