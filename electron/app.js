const { ipcMain } = require('electron')

ipcMain.handle('example', (e, action) => {
	console.log(e)
	console.log(action)
})

console.log('ipcMain is ready')

//you can use this to calculate things in the background
