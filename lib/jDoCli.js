var jDo = require("./jDo");
var cli = require("cli");
var db = require("./db");

const settings = {
    dbPath: "~/jdo.json"
};

var commands = {
  list: function(settings){
    db.read(settings).then(function(db){
      console.log(db);
    });
  }
};

function start(){
  var options = cli.parse({
    list: [false, 'list tasks']
  });

  if(options.list) {
    return commands.list(settings);
  } else {
    cli.getUsage();
  }
  return null;
}

module.exports = {
  start: start,
  commands: commands
};
