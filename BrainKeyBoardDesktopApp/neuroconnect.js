

var {PythonShell} = require('python-shell')
var path = require("path")

var options = {
    scriptPath : path.join(__dirname,'../Reference Codes/Neurosky Telnet Conn'),
}

var runpython = new PythonShell("recordEEGdata.py", options);

var i =0
runpython.on('message', function(message){
    if(message=="Connected"){
        document.getElementById("isconnected").innerHTML = "Connected";
        console.log("Its working")
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

