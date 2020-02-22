
const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow
const axios = require('axios');
//enable communication between windows
const ipc = electron.ipcRenderer

const notifyBtn = document.getElementById('notifyBtn')

var price = document.querySelector('h1');
var targetPriceVal;
var targetPrice = document.getElementById('targetPrice')

const notification = {
  title: 'BTC Alert',
  body: "Price just beat your set point!",
  icon: path.join(__dirname, '../assets/images/btc.ico')
}

function getBTC(){
    axios.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC&tsyms=USD')
    .then(res =>{
        const cryptos = res.data.BTC.USD
        price.innerHTML = "$" + cryptos.toLocaleString('en')

        if(targetPrice.innerHTML != '' && targetPriceVal < res.data.BTC.USD){
          const myNotification = new window.Notification(notification.title, notification)
        }
    })
}

getBTC()
setInterval(getBTC, 1000);

notifyBtn.addEventListener('click', function (event) {
    const modalPath = path.join('file://', __dirname, 'add.html')
    let win = new BrowserWindow({ webPreferences: { nodeIntegration: true}, frame: false, transparent: true, width: 400, height: 200 })
    win.on('close', function () { win = null })
    win.loadURL(modalPath)
    win.show()
  })

  ipc.on('targetPriceVal', function(event, arg){
    targetPriceVal = Number(arg)
    targetPrice.innerHTML = "$" +targetPriceVal.toLocaleString('en')

  })