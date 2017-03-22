const fs = require('fs');
const path = require('path');
const Promise = require('promise');
const { fromJS, Map, List } = require('immutable');

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
  const jdoPath = path.normalize(resolveHome(settings.dbPath));
  return writeFile(jdoPath, JSON.stringify(db.toJS()));
}

function read(settings) {
  const jdoPath = path.normalize(resolveHome(settings.dbPath));

  return readFile(jdoPath).
    then(JSON.parse).
    catch((err)=>{
      return initial();
    });

}

function addTask(db, taskText) {
  var newTasks = db.get('tasks').unshift(taskText);
  return db.merge({
    tasks: newTasks
  });
}

function dbFromJSON(json) {
  return fromJS(json);
}

function dbToJSON(db) {
  return db.toJS();
}

module.exports = {
  read: read,
  write: write,
  addTask: addTask,
  dbFromJSON: dbFromJSON,
  dbToJSON: dbToJSON
}
