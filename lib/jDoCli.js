var jDo = require("./jDo");
var cli = require("cli");
var db = require("./db");

const settings = {
    dbPath: "~/jdo.json"
}

function list() {

}

var commands = [
    {
        name: {}
    }
]

function start(){
    var options = cli.parse({
        list: [false, 'list tasks']
    });

    if(options.list) {
        return list();
    } else {
        db.read(settings).then(function(db){
            console.log(db);
        });
    }
    return null;
}

module.exports = {
    start: start
}
