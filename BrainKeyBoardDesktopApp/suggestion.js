var {PythonShell} = require('python-shell')
var path = require("path")

var options = {
    scriptPath : path.join(__dirname,'../Reference Codes/Neurosky Telnet Conn'),
}
var runpython = new PythonShell("recordEEGdata.py", options);