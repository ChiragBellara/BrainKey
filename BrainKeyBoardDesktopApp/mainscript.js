var {PythonShell} = require('python-shell')
var path = require("path")
var internal = null;
var secInternal = null;
var thirdInternal = null;
var predictInterval = null;
let divrow = "firstrow";
let old = "sixthrow";
var firstRowChild = [];
var secRowChild = [];
var eachButton = []
var predict=null
var old1=null
var data1=null
var num =0


function prediction(){
    console.log("In prediction")
    isPredict = true;
    num =0
    console.log(predict)
    if(! predictInterval){
    predictInterval=setInterval(function(){
        if(num==0){
            
            if(old1){
                document.getElementById(old1).style.backgroundColor = null;
                document.getElementById(old1).style.boxShadow=null;
            }
            document.getElementById(predict[0]).style.backgroundColor = "blue";
            document.getElementById(predict[0]).style.boxShadow="0 10px 6px -4px";
            old1 = predict[0]
            data1 = predict[0]
        }
        else{
            console.log(num+" inside else")
            console.log(old1+" inside else")
            document.getElementById(old1).style.backgroundColor = null;
            document.getElementById(predict[num]).style.backgroundColor = "blue";
            document.getElementById(old1).style.boxShadow=null;
            document.getElementById(predict[num]).style.boxShadow="0 10px 6px -4px";
        }
        old1 = predict[num];
        data1 = old1;
        num = (num+1)%(predict.length);
    },2000);
}
}
function makePredict(){
    isPredict = false;
    
    clearInterval(predictInterval);
    var ans = document.getElementById("textscreen").value
    var lastIndex = ans.lastIndexOf(" ");
    console.log("data1:"+data1)
    var msg = new SpeechSynthesisUtterance(data1);
    document.getElementById("textscreen").value= ans.substring(0, lastIndex+1) + data1 +" "
    window.speechSynthesis.speak(msg);
    
    // Append in csv
    var options = {
        args : [data1],
        scriptPath : path.join(__dirname,'../Prediction Module'),
    }
    var runpython = new PythonShell("appendInCSV.py", options);
    runpython.on('message',function(message){
        
    })


    makeUL(" ");
    num1=0
    old1=null
    internal = null;
    secInternal = null;
    thirdInternal = null;
    predictInterval = null;
    divrow = "firstrow";
    old = "sixthrow";
    firstRowChild = []
    eachButton = []
    data= null
    console.log("This second")
    first_opt();
}

function alarm(){
    var audio = new Audio('alarm.mp3');
    audio.play()
}

function callFromPython(){
    clearInterval(internal)
    document.getElementById(old).style.backgroundColor=null;
    document.getElementById(old).style.boxShadow=null;
    var children =document.getElementById(old).children;
    for(i=0; i<children.length;i++ ){
        firstRowChild.push(children[i].id);
    }

    old = firstRowChild[0];
    divrow = firstRowChild[1];
    if(! secInternal){
        accept=2
        secInternal = setInterval(function(){
            document.getElementById(old).style.backgroundColor=null;
            document.getElementById(divrow).style.backgroundColor="blue";
            document.getElementById(old).style.boxShadow=null
            document.getElementById(divrow).style.boxShadow="0 10px 6px -4px";

            if(true){
                var n = divrow
                divrow = old
                old = n
            }
            
        }, 2000);
    }

}

function callFromPython2(){
    clearInterval( secInternal );
    document.getElementById(old).style.backgroundColor=null;
    document.getElementById(old).style.boxShadow=null;
    var children =document.getElementById(old).children;
    for(i=0; i<children.length;i++ ){
        eachButton.push(children[i].id);
    }
    if (! thirdInternal){
        accept =3
        var count =0
        var btn = null
        data = eachButton[0]
        thirdInternal = setInterval(function(){
            document.getElementById(data).style.backgroundColor=null;
            document.getElementById(data).style.boxShadow=null;
            btn= count%3
            count= count+1;
            data = eachButton[btn]
           
            document.getElementById(data).style.backgroundColor="green";
            document.getElementById(data).style.boxShadow="0 10px 6px -4px";
        },2000);
    }

}

function callFromPython3(){
    clearInterval(thirdInternal);
    document.getElementById(data).style.backgroundColor=null;
    document.getElementById(data).style.boxShadow=null;
    if(data=="space"){
        var msg = new SpeechSynthesisUtterance("Space");
        // Append in csv
        var n =  document.getElementById("textscreen").value.split(" ");
        lastWord =  n[n.length - 1];
        document.getElementById("textscreen").value+=" "
        window.speechSynthesis.speak(msg);
         // Append in csv
        var options = {
            args : [lastWord],
            scriptPath : path.join(__dirname,'../Prediction Module'),
        }
        var runpython = new PythonShell("appendInCSV.py", options);
        runpython.on('message',function(message){
            
        })


        internal = null;
        secInternal = null;
        thirdInternal = null;
        divrow = "firstrow";
        old = "sixthrow";
        firstRowChild = []
        eachButton = []
        data= null
        console.log("This second")
        first_opt();
    }
    else if(data=="help"){
        alarm();
        internal = null;
        secInternal = null;
        thirdInternal = null;
        divrow = "firstrow";
        old = "sixthrow";
        firstRowChild = []
        eachButton = []
        data= null
        console.log("This second")
        first_opt();
    }
    else if(data=="clear"){
        var msg = new SpeechSynthesisUtterance("Clearing");
        window.speechSynthesis.speak(msg);
        document.getElementById("textscreen").value=""
        internal = null;
        secInternal = null;
        thirdInternal = null;
        divrow = "firstrow";
        old = "sixthrow";
        firstRowChild = []
        eachButton = []
        data= null
        first_opt();
    }
    else if(data=="switch"){
        internal = null;
        secInternal = null;
        thirdInternal = null;
        divrow = "firstrow";
        old = "sixthrow";
        firstRowChild = []
        eachButton = []
        prediction();
    }
    else if(data=="deleteWord"){
        var ans = document.getElementById("textscreen").value
        ans = ans.substring(0, ans.length - 1);
        document.getElementById("textscreen").value = ans
        var options = {
            args : [path.join(__dirname,'../Prediction Module/Wordlists/mostusedwords.csv'),ans.split(" ").splice(-1)[0]],
            scriptPath : path.join(__dirname,'../Prediction Module'),
        }
        var runpython = new PythonShell("Predictive_Keyboard.py", options);
        runpython.on('message',function(message){
            // console.log(typeof(message))
            makeUL(message);
            internal = null;
            secInternal = null;
            thirdInternal = null;
            divrow = "firstrow";
            old = "sixthrow";
            firstRowChild = []
            eachButton = []
            first_opt();
        })

    }
    else if(data=="speak"){
        var ans = document.getElementById("textscreen").value
        var msg = new SpeechSynthesisUtterance(ans);
        window.speechSynthesis.speak(msg);
        internal = null;
        secInternal = null;
        thirdInternal = null;
        divrow = "firstrow";
        old = "sixthrow";
        firstRowChild = []
        eachButton = []
        data= null
        first_opt()
    }
    else if(data=="s1"){
        var msg = new SpeechSynthesisUtterance("Hello. How are you?");
        window.speechSynthesis.speak(msg);
        internal = null;
        secInternal = null;
        thirdInternal = null;
        divrow = "firstrow";
        old = "sixthrow";
        firstRowChild = []
        eachButton = []
        data= null
        first_opt()
    }
    else if(data=="s2"){
        var msg = new SpeechSynthesisUtterance("I need some food");
        window.speechSynthesis.speak(msg);
        internal = null;
        secInternal = null;
        thirdInternal = null;
        divrow = "firstrow";
        old = "sixthrow";
        firstRowChild = []
        eachButton = []
        data= null
        first_opt()
    }
    else if(data=="s3"){
        var msg = new SpeechSynthesisUtterance("I need water");
        window.speechSynthesis.speak(msg);
        internal = null;
        secInternal = null;
        thirdInternal = null;
        divrow = "firstrow";
        old = "sixthrow";
        firstRowChild = []
        eachButton = []
        data= null
        first_opt()
    }
    else if(data=="s4"){
        var msg = new SpeechSynthesisUtterance("want to go Washroom");
        window.speechSynthesis.speak(msg);
        internal = null;
        secInternal = null;
        thirdInternal = null;
        divrow = "firstrow";
        old = "sixthrow";
        firstRowChild = []
        eachButton = []
        data= null
        first_opt()
    }
    else{
        var msg = new SpeechSynthesisUtterance(data);
        document.getElementById("textscreen").value+=data  
        window.speechSynthesis.speak(msg);
        var ans = document.getElementById("textscreen").value
        var options = {
            args : [path.join(__dirname,'../Prediction Module/Wordlists/mostusedwords.csv'),ans.split(" ").splice(-1)[0]],
            scriptPath : path.join(__dirname,'../Prediction Module'),
        }
        var runpython = new PythonShell("Predictive_Keyboard.py", options);
        runpython.on('message',function(message){
            // console.log(typeof(message))
            makeUL(message);
            internal = null;
            secInternal = null;
            thirdInternal = null;
            divrow = "firstrow";
            old = "sixthrow";
            firstRowChild = []
            eachButton = []
            first_opt();
        })
        
    }
    
    
}

function makeUL(data){
    console.log(data)
    data = data.replace(/[^a-zA-Z0-9,]/g, '');
    console.log(data)
    var a = '<ul>'
        b = '</ul>'
        m = [];
    //'d','do','da','de','di'
    var array = data.split(",")
    predict = array;
    console.log(typeof(array))
    console.log(array)
    
    for (n = 0; n < array.length; n += 1){
        m[n] = '<li id='+array[n]+'>' + array[n] + '</li>';
    }
    document.getElementById('prediction').innerHTML = a + m + b;
    
}

function first_opt(){
    console.log("Inside first_opt")
    if (! internal){
        internal = setInterval(function(){ 
            document.getElementById(old).style.backgroundColor=null;
            document.getElementById(divrow).style.backgroundColor="blue";
            document.getElementById(old).style.boxShadow=null
            document.getElementById(divrow).style.boxShadow="0 10px 6px -4px";
            
            
            if(divrow === "firstrow"){
                old =  "firstrow"
                divrow = "secondrow"
                
            }
            else if(divrow === "secondrow"){
                old =  "secondrow"
                divrow = "thirdrow"
            }
            else if(divrow === "thirdrow"){
                old = "thirdrow"
                divrow = "forthrow"
            }
            else if(divrow === "forthrow"){
                old =  "forthrow"
                divrow = "fifthrow"
            }
            else if(divrow === "fifthrow"){
                old =  "fifthrow"
                divrow = "sixthrow"
            }
            else if(divrow === "sixthrow"){
                old =  "sixthrow"
                divrow = "firstrow"
            }
        }, 2000);
    }
}
