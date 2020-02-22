const electron = require('electron')
const path = require('path')
const remote = electron.remote
const closeBtn = document.getElementById('closeBtn')

//enable communication between windows
const ipc = electron.ipcRenderer

console.log("add.js loaded")

closeBtn.addEventListener('click', function (event) {
    var window = remote.getCurrentWindow();
    window.close();
})


const updateBtn = document.getElementById('updateBtn')

updateBtn.addEventListener('click', function () {
  ipc.send('update-notify-value', document.getElementById('notifyVal').value)

  // Close this window
  var window = remote.getCurrentWindow();
  window.close();
})