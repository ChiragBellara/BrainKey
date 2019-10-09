

var {PythonShell} = require('python-shell')
var path = require("path")

var options = {
    scriptPath : path.join(__dirname,'../Reference Codes/Neurosky Telnet Conn'),
}

var runpython = new PythonShell("recordEEGdata.py", options);

var i =0
var t =0
runpython.on('message', function(message){
    if(message=="Connected" && t===0){
        document.getElementById("isconnected").innerHTML = "Connected";
        document.getElementById("isconnected").style.color = "lightgreen";
        console.log("Its working")
        t=1;
    }
    else if(i===0){
        callFromPython();
        console.log("Working Python1")
        i=1;
    }
    else if(i===1){
        callFromPython2();
        console.log("Working Python2");
        i=2;
    }
    else if(i===2){
        callFromPython3();
        console.log("Working Python3")
        i=0;
    }
});

