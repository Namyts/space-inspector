const { ipcMain } = require('electron')

ipcMain.handle('example', (e, action) => {
	console.log(e)
	console.log(action)
})

console.log('ipcMain is ready')

/*
	you can use this to do things in the background
	in the react code, try: 

	const { ipcRenderer } = window.require('electron')
	ipcRenderer.invoke('example', {data: 'rootString'})
*/


