const electron = require('electron')
const {app, BrowserWindow, globalShortcut} = require('electron')
const path = require('path')
const url = require('url')
const start = require('./start.js');
const dgram = require('./dgram.js')
const storage = require('./storage.js');
const socket = require('./socket.js')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let shown = false;


function createWindow () {
  // Create the browser window.
  mousePos = electron.screen.getCursorScreenPoint();
  win = new BrowserWindow({width : 800, height : 400,alwaysOnTop : true, show : false, frame : false, x : mousePos.x, y : mousePos.y})

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'app.html'),
    protocol: 'file:',
    slashes: true
  }))


  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    storage.clearClient()
    start.shutDown()

    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })

  win.on('show', () =>{
      shown = true;
      win.setPosition(electron.screen.getCursorScreenPoint().x,electron.screen.getCursorScreenPoint().y)
  })

  win.on('hide', () =>{
      shown = false;
      win.loadURL(url.format({
        pathname: path.join(__dirname, 'app.html'),
        protocol: 'file:',
        slashes: true
      }))
  })
}

exports.changePage = function(){
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'html/list.html'),
    protocol: 'file:',
    slashes: true
  }))
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready',() =>{
  createWindow()
  globalShortcut.register('CmdOrCtrl+Shift+X', () => {
    if(shown == false){
      win.show();
      show = true
    }else if(shown == true){
      win.hide();
      show = false
    }
  })

})

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
