const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu} = electron;


let mainWindow;
// listen for app to be ready

app.on('ready', function(){
    // create new window 
    const {width, height} = electron.screen.getPrimaryDisplay().workArea;
    mainWindow = new BrowserWindow({width,height,webPreferences: {
        nodeIntegration: true
    }});

    // load html here
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file',
        slashes: true
    }));

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    Menu.setApplicationMenu(mainMenu);

});

const mainMenuTemplate = [
    {
        label: 'File',
        submenu:[
            {
                label: 'Empty text',
            },
            {
                label:'Quit',
                click(){
                    app.quit();
                },
                accelerator: process.platform == "darwin" ? "Command+Q": "Ctrl+Q", 
            }
        ]
    }
];

// Developer tools when app is not in production

if(process.env.NODE_ENV !== 'production'){
    mainMenuTemplate.push({
        label: "Developer tools",
        submenu:[
            {
                label:'toogle Dev tools',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                },
                accelerator: process.platform == "darwin" ? "Command+I": "Ctrl+I", 
            },
            {
                role:'reload'
            }
        ]
    });
}