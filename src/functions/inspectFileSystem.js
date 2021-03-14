const fs = window.require('fs').promises
const path = window.require('path')

let files = [] 

export const getFiles = () => files

const inspectFileSystem = (dir,par=null) => {
	const p = path.resolve(dir)
	const directory = {
		path: p,
		name: path.basename(p),
		type: 'directory',
		size: 0,
		contains: [],
		parent: par,
		increaseSize: ((amount)=>{
			const selfIndex = files.findIndex(i=>i.path===p)
			files[selfIndex] = {...files[selfIndex], size: files[selfIndex].size + amount}
			const parent = files[selfIndex].parent
			if(parent){
				const parentIndex = files.findIndex(i=>i.path===parent)
				files[parentIndex].increaseSize(amount)
			}
			
		}),
		addChild: ((child)=>{
			const selfIndex = files.findIndex(i=>i.path===p)
			files[selfIndex] = {...files[selfIndex], contains: [...files[selfIndex].contains, child]}
		})
	}
	files.push(directory)
	fs.readdir(p).then(contents=>{
		contents.forEach(item => {
			const itemPath = path.resolve(p,item)
			fs.stat(itemPath).then(stat=>{
				directory.addChild(itemPath)
				const isDir = stat.isDirectory()
				if(isDir){
					inspectFileSystem(itemPath,p)
				} else {
					const file = {
						path: itemPath,
						name: item,
						type: 'file',
						size: stat.size,
						parent: p
					}
					files.push(file)
					directory.increaseSize(file.size)
				}
			})
		});
	})
}
export default inspectFileSystem