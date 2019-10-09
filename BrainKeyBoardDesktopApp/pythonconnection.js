function alarm(){
    var {PythonShell} = require('python-shell')
    var path = require("path")
    var abc = path.join(__dirname,'../Prediction Module');
    console.log("Path: "+path.join(__dirname,'../Prediction Module'))
    var options = {
        scriptPath : path.join(__dirname,'../Prediction Module'),
    }

    var runpython = new PythonShell("playAlarm.py", options);

    runpython.on('message', function(message){
        console.log(message) 
    });
}

