var jDo = require("./jDo");

var cli = require("cli");

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
        list()
    } else {
        console.log("no idea")
    }
}


module.exports = {
    start: start
}
