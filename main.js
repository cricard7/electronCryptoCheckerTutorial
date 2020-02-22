const { Menu, app, BrowserWindow } = require('electron')
//require('electron-reload')(__dirname)

//following: https://www.youtube.com/watch?v=2RxHQoiDctI&feature=youtu.be
//https://coursetro.com/courses/22/Creating-Desktop-Apps-with-Electron-Tutorial


//allows you to follow links outside of electron in your default browser
const shell = require('electron').shell

//allows seperate windows to communicate
//https://coursetro.com/posts/code/122/Electron-IPC-Tutorial---Communication-within-your-Electron-App
const ipc = require('electron').ipcMain

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('src/index.html')

  // Open the DevTools.
  win.webContents.openDevTools()


  //enable communication between add window and main app window

ipc.on('update-notify-value', function(event, arg){
  win.webContents.send('targetPriceVal', arg)
})


}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

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
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.


//create a menu

var menu = Menu.buildFromTemplate([

    {
        label: 'Menu',
        submenu: [
            {label: 'adjuste Notification Value'},
            {
                label: 'CoinMarketCap',
                click(){
                    
                    //how to open an external link
                    shell.openExternal("http://coinmarketcap.com")
                }
            },
            {
                type: 'separator'
            },
            {
                label: 'Exit',
                click(){
                    app.quit()
                }
            
            }
        ]
    },
    {
        label: 'A Second Menu'
    }
])

Menu.setApplicationMenu(menu);

