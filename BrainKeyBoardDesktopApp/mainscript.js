var {PythonShell} = require('python-shell')
var path = require("path")



var internal = null;
var secInternal = null;
var thirdInternal = null;
let divrow = "firstrow";
let old = "fifthrow";
var firstRowChild = [];
var secRowChild = [];
// var current = null;
// var second = null;
var eachButton = []
// var accept = 0;
// var data = null

// function reset(){
//     clearInterval(thirdInternal);
//     document.getElementById(data).style.backgroundColor=null;
//     document.getElementById(data).style.boxShadow=null;
//     accept = 1;
//     document.getElementById("textscreen").value+=data
//     reset();
//     first_opt();
//     internal = null;
//     secInternal = null;
//     thirdInternal = null;
//     divrow = "firstrow";
//     old = "fifthrow";
//     firstRowChild = []
//     current = null;
//     second = null;
//     eachButton = []
//     accept = 0;
//     data= null
// }
// // function myFunction(){
// //     if(accept===1){
        
// //         firstChild();
// //     }
// //     else if(accept===2){
        
// //         eachBtn();

// //     }
// //     else if(accept===3){
        
// //     }
// // }

// //Button selection
// function eachBtn(){
//     clearInterval( secInternal );
//     document.getElementById(second).style.backgroundColor=null;
//     document.getElementById(second).style.boxShadow=null;
//     var children =document.getElementById(second).children;
//     for(i=0; i<children.length;i++ ){
//         eachButton.push(children[i].id);
//     }
//     console.log(eachButton);
//     if (! thirdInternal){
//         accept =3
//         var count =0
//         var btn = null
//         data = eachButton[0]
//         thirdInternal = setInterval(function(){
//             document.getElementById(data).style.backgroundColor=null;
//             document.getElementById(data).style.boxShadow=null;
//             btn= count%3
//             count= count+1;
//             data = eachButton[btn]
//             console.log(data)
//             document.getElementById(data).style.backgroundColor="green";
//             document.getElementById(data).style.boxShadow="0 15px 8px -6px #666";
//         },2000);
//     }
// }

// // Two row selection
// function firstChild(){
//     clearInterval( internal );
//     document.getElementById(old).style.backgroundColor=null;
//     document.getElementById(old).style.boxShadow=null;
//     var children =document.getElementById(old).children;
//     for(i=0; i<children.length;i++ ){
//         firstRowChild.push(children[i].id);
//     }
//     current = firstRowChild[0];
//     second = firstRowChild[1];
//     if(! secInternal){
//         accept=2
//         secInternal = setInterval(function(){
//             document.getElementById(second).style.backgroundColor=null;
//             document.getElementById(current).style.backgroundColor="blue";
//             document.getElementById(second).style.boxShadow=null
//             document.getElementById(current).style.boxShadow="0 15px 8px -6px #666";

//             if(true){
//                 var n = current
//                 current = second
//                 second = n
//             }
//         }, 3000);
//     }
    
// }

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
            document.getElementById(divrow).style.boxShadow="0 15px 8px -6px #666";

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
            document.getElementById(data).style.boxShadow="0 15px 8px -6px #666";
        },2000);
    }

}

function callFromPython3(){
    clearInterval(thirdInternal);
    document.getElementById(data).style.backgroundColor=null;
    document.getElementById(data).style.boxShadow=null;
    if(data=="space"){
        var msg = new SpeechSynthesisUtterance("Space");
        document.getElementById("textscreen").value+=" "
        window.speechSynthesis.speak(msg);
        internal = null;
        secInternal = null;
        thirdInternal = null;
        divrow = "firstrow";
        old = "fifthrow";
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
        old = "fifthrow";
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
        old = "fifthrow";
        firstRowChild = []
        eachButton = []
        data= null
        first_opt();
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
            old = "fifthrow";
            firstRowChild = []
            eachButton = []
            first_opt();
        })

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
            old = "fifthrow";
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
    console.log(typeof(array))
    console.log(array)
    
    for (n = 0; n < array.length; n += 1){
        m[n] = '<li>' + array[n] + '</li>';
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
            document.getElementById(divrow).style.boxShadow="0 15px 8px -6px #666";
            
            
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
                divrow = "firstrow"
            }
        }, 2000);
    }
}


// function always(){
//     var {PythonShell} = require('python-shell')
//     var path = require("path")
//     setInterval(function(){
//     document.getElementById("textscreen").value+=data  
//     var ans = document.getElementById("textscreen").value
//     var options = {
//         args : [path.join(__dirname,'../Prediction Module/Wordlists/mostusedwords.csv'),ans.split(" ").splice(-1)[0]],
//         scriptPath : path.join(__dirname,'../Prediction Module'),
//     }
//     var runpython = new PythonShell("Predictive_Keyboard.py", options);
//     runpython.on('message', function(message){
//         console.log(message)
//         var a = '<ul>',
//         b = '</ul>',
//         m = [];

//         for (i = 0; i < message[0].length; i += 1){
//             console.log(message[0][i])
//             m[i] = '<li>' + message[0][i] + '</li>';
//         }
//             document.getElementById('prediction').innerHTML = a + m + b;
//         })
//     }, 2000)
    
// }