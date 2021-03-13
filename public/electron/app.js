const { ipcMain } = require('electron')

ipcMain.handle('example-action', (e, action) => {
	console.log(e)
	console.log(action.text)
	console.log(action)
})

console.log('testing refresh')
console.log('testing refresh')
console.log('testing refresh')
console.log('testing refresh')
console.log('testing refresh')
console.log('testing refresh')
console.log('testing refresh')
console.log('testing refresh')