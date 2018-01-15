const electron = require('electron')
const path = require('path')
const url = require('url')

let sendingWin

exports.createSendingWin = function(){
  w = 400
  h = 150
  dimensions = electron.screen.getPrimaryDisplay().size
  sendingWin = new electron.remote.BrowserWindow({width : w, height : h,alwaysOnTop : true, show : true, frame : false, x : dimensions.width, y : dimensions.height})
  sendingWin.loadURL(url.format({
    pathname: path.join(__dirname, 'page.html'),
    protocol: 'file:',
    slashes: true
  }))
  //sendingWin.webContents.openDevTools()

}

exports.increment = function(n){
  tot=0
  sendingWin.webContents.executeJavaScript(`document.getElementById("progressbar").getAttribute("count")`, function (result) {
    tot = parseInt(n)+parseInt(result)
    console.log(tot)
    if(parseInt(result)!=100){
      sendingWin.webContents.executeJavaScript(`document.getElementById("progressbar").setAttribute("count",`+tot+`)`, function () {})
      sendingWin.webContents.executeJavaScript(`document.getElementById("progressbar").style.width = "`+tot+`%"`, function () {})
    }


  })

}
