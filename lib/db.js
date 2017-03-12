const fs = require('fs');
const path = require('path');
const Promise = require('promise');
const { Map, List } = require('immutable');

const stat = Promise.denodeify(fs.stat);
const readFile = Promise.denodeify(fs.readFile);
const writeFile = Promise.denodeify(fs.writeFile);

function resolveHome(filepath) {
    if (filepath[0] === '~') {
        return path.join(process.env.HOME, filepath.slice(1));
    }
    return filepath;
}

function initial() {
    return {
        tasks: []
    };
}

function write(settings, db) {
    return
}

function read(settings) {
    const jdoPath = path.normalize(resolveHome(settings.dbPath));
    return readFile(jdoPath).
        then(JSON.parse).
        catch(()=>{
            return initial();
        });
}

function addTask(db, taskText) {

}

function dbFromJSON(json) {
}

function dbToJSON(db) {
}

module.exports = {
    read: read,
    write: write,
    addTask: addTask
}
